import { google } from "googleapis";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

type ContactBody = {
  name?: unknown;
  company?: unknown;
  email?: unknown;
  phone?: unknown;
  projectType?: unknown;
  message?: unknown;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function str(v: unknown): string {
  if (typeof v !== "string") return "";
  return v.trim();
}

export async function POST(request: Request) {
  let parsed: ContactBody | null;
  try {
    const raw = await request.json();
    if (raw == null) parsed = {};
    else if (typeof raw === "object") parsed = raw as ContactBody;
    else parsed = null;
  } catch {
    parsed = null;
  }

  if (parsed === null) {
    return NextResponse.json(
      { ok: false, error: "Cuerpo inválido" },
      { status: 400 },
    );
  }

  const name = str(parsed.name);
  const company = str(parsed.company);
  const email = str(parsed.email);
  const phone = str(parsed.phone);
  const projectType = str(parsed.projectType);
  const message = str(parsed.message);

  if (!name || !email || !message) {
    return NextResponse.json(
      { ok: false, error: "Faltan nombre, correo o mensaje" },
      { status: 400 },
    );
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { ok: false, error: "Correo no válido" },
      { status: 400 },
    );
  }

  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;
  const range = process.env.GOOGLE_SHEET_RANGE;

  if (!clientEmail || !privateKey || !spreadsheetId || !range) {
    console.error("contact: missing server environment variables");
    return NextResponse.json(
      { ok: false, error: "Error del servidor" },
      { status: 500 },
    );
  }

  try {
    const auth = new google.auth.JWT({
      email: clientEmail,
      key: privateKey,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });
    const timestamp = new Date().toISOString();

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [
          [
            timestamp,
            name,
            company,
            email,
            phone,
            projectType,
            message,
          ],
        ],
      },
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("contact: sheets append failed", err);
    return NextResponse.json(
      { ok: false, error: "No se pudo registrar el mensaje" },
      { status: 500 },
    );
  }
}
