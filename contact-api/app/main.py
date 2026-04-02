"""
FastAPI service: append contact form rows to Google Sheets.
Credentials: Application Default Credentials (Cloud Run service account or local GOOGLE_APPLICATION_CREDENTIALS).
"""

from __future__ import annotations

import os
import re
from datetime import datetime, timezone
from typing import Optional

import httpx
from fastapi import FastAPI, HTTPException
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from google.auth import default as google_auth_default
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from pydantic import BaseModel, EmailStr, Field, field_validator

ALLOWED_PROJECT_TYPES = frozenset(
    {"residential", "commercial", "institutional", "industrial", "other"}
)

WS_RE = re.compile(r"\s+")
CTRL_RE = re.compile(r"[\x00-\x08\x0b\x0c\x0e-\x1f]")


def _strip_clean(s: str, max_len: int) -> str:
    s = CTRL_RE.sub("", s)
    s = WS_RE.sub(" ", s).strip()
    return s[:max_len]


def _sheet_text_cell(s: str) -> str:
    """Avoid formula injection in Sheets (leading =, +, -, @)."""
    if s and s[0] in ("=", "+", "-", "@"):
        return "'" + s
    return s


class ContactPayload(BaseModel):
    name: str = Field(..., max_length=200)
    company: Optional[str] = Field(None, max_length=200)
    email: EmailStr
    phone: Optional[str] = Field(None, max_length=80)
    project_type: Optional[str] = Field(None, max_length=40)
    message: str = Field(..., max_length=8000)
    recaptcha_token: Optional[str] = Field(None, max_length=4000)

    @field_validator("name", "company", "phone", "message", mode="before")
    @classmethod
    def strip_strings(cls, v: object) -> object:
        if v is None or not isinstance(v, str):
            return v
        return v.strip()

    @field_validator("project_type", mode="before")
    @classmethod
    def normalize_project_type(cls, v: object) -> object:
        if v is None or v == "":
            return None
        if not isinstance(v, str):
            return v
        v = v.strip().lower()
        if v not in ALLOWED_PROJECT_TYPES:
            raise ValueError("project_type inválido")
        return v


def _allowed_origins() -> list[str]:
    raw = os.environ.get("ALLOWED_ORIGINS", "")
    return [o.strip() for o in raw.split(",") if o.strip()]


app = FastAPI(title="HAZ contact API", version="1.0.0")

_origins = _allowed_origins()
if _origins:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=_origins,
        allow_credentials=False,
        allow_methods=["POST", "OPTIONS"],
        allow_headers=["Content-Type", "Accept"],
    )


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(
    _request: object, _exc: RequestValidationError
) -> JSONResponse:
    return JSONResponse(
        status_code=422,
        content={"detail": "Datos del formulario no válidos"},
    )


async def _verify_recaptcha(token: str, secret: str) -> bool:
    async with httpx.AsyncClient() as client:
        try:
            resp = await client.post(
                "https://www.google.com/recaptcha/api/siteverify",
                data={"secret": secret, "response": token},
                timeout=10.0,
            )
            resp.raise_for_status()
            data = resp.json()
        except httpx.HTTPError:
            return False
    if not data.get("success"):
        return False
    score = data.get("score")
    if score is not None and float(score) < 0.5:
        return False
    return True


def _append_row(payload: ContactPayload) -> None:
    sid = os.environ.get("SPREADSHEET_ID", "").strip()
    rng = os.environ.get("SHEET_RANGE", "Leads!A:G").strip()
    if not sid:
        raise HTTPException(status_code=500, detail="Configuración del servidor incompleta")

    credentials, _ = google_auth_default(scopes=["https://www.googleapis.com/auth/spreadsheets"])
    service = build("sheets", "v4", credentials=credentials, cache_discovery=False)

    now = datetime.now(timezone.utc).isoformat(timespec="seconds")
    row = [
        now,
        _sheet_text_cell(_strip_clean(payload.name, 200)),
        _sheet_text_cell(_strip_clean(payload.company or "", 200)),
        _sheet_text_cell(str(payload.email)[:320]),
        _sheet_text_cell(_strip_clean(payload.phone or "", 80)),
        _sheet_text_cell(payload.project_type or ""),
        _sheet_text_cell(_strip_clean(payload.message, 8000)),
    ]

    try:
        (
            service.spreadsheets()
            .values()
            .append(
                spreadsheetId=sid,
                range=rng,
                valueInputOption="USER_ENTERED",
                insertDataOption="INSERT_ROWS",
                body={"values": [row]},
            )
            .execute()
        )
    except HttpError as e:
        raise HTTPException(status_code=502, detail="No se pudo guardar el mensaje") from e


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


@app.post("/contact")
async def contact(body: ContactPayload) -> dict[str, str]:
    secret = os.environ.get("RECAPTCHA_SECRET_KEY", "").strip() or None
    if secret:
        if not body.recaptcha_token:
            raise HTTPException(status_code=400, detail="Falta verificación anti-spam")
        if not await _verify_recaptcha(body.recaptcha_token, secret):
            raise HTTPException(status_code=400, detail="Verificación anti-spam fallida")

    _append_row(body)
    return {"ok": "true", "message": "Recibido"}
