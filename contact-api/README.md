# API de contacto → Google Sheets (Cloud Run)

Servicio **FastAPI** que recibe el formulario del portafolio y añade una fila a una hoja de cálculo mediante la API de Google Sheets. Las credenciales **no** van nunca en el frontend.

## Requisitos en Google Cloud y Sheets

1. **Proyecto GCP:** crear o elegir un proyecto.
2. **APIs:** habilitar [Google Sheets API](https://console.cloud.google.com/apis/library/sheets.googleapis.com) y (opcional) [Secret Manager](https://console.cloud.google.com/apis/library/secretmanager.googleapis.com) si guardas secretos allí.
3. **Cuenta de servicio:** IAM → Cuentas de servicio → Crear. Asignar rol mínimo (no hace falta rol de proyecto para Sheets si compartes solo la hoja).
4. **Hoja de cálculo:** crear una pestaña (p. ej. `Leads`) con la primera fila como cabecera, por ejemplo:  
   `timestamp_utc | name | company | email | phone | project_type | message`  
   Compartir el archivo con el **correo de la cuenta de servicio** (`…@….iam.gserviceaccount.com`) como **Editor**.
5. **ID de la hoja:** está en la URL de Google Sheets entre `/d/` y `/edit`.

## Variables de entorno (Cloud Run)

| Variable | Descripción |
|----------|-------------|
| `SPREADSHEET_ID` | ID del documento (obligatorio). |
| `SHEET_RANGE` | Rango para append, p. ej. `Leads!A:G` (default en código: `Leads!A:G`). |
| `ALLOWED_ORIGINS` | Orígenes permitidos para CORS, separados por coma (obligatorio para el navegador). Ej.: `https://tudominio.com` |
| `RECAPTCHA_SECRET_KEY` | Opcional. Si está definida, el `POST /contact` exige `recaptcha_token` válido (reCAPTCHA v3). |

En Cloud Run, asigna la **misma cuenta de servicio** que tiene acceso a la hoja al servicio; no subas el JSON al repositorio. Para desarrollo local puedes usar `gcloud auth application-default login` o `GOOGLE_APPLICATION_CREDENTIALS` apuntando al JSON.

## Desarrollo local

```bash
cd contact-api
python -m venv .venv
.venv\Scripts\activate   # Windows
pip install -r requirements.txt
copy .env.example .env   # y rellena SPREADSHEET_ID, ALLOWED_ORIGINS
set GOOGLE_APPLICATION_CREDENTIALS=C:\ruta\sa.json
uvicorn app.main:app --reload --port 8787
```

Prueba: `GET http://127.0.0.1:8787/health`

## Imagen y despliegue en Cloud Run (resumen)

```bash
# Desde la raíz del repo o desde contact-api según tu registry
gcloud builds submit --tag REGION-docker.pkg.dev/PROJECT/REPO/haz-contact-api ./contact-api

gcloud run deploy haz-contact-api \
  --image REGION-docker.pkg.dev/PROJECT/REPO/haz-contact-api \
  --region REGION \
  --allow-unauthenticated \
  --set-env-vars "SPREADSHEET_ID=...,SHEET_RANGE=Leads!A:G,ALLOWED_ORIGINS=https://tusitio.com" \
  --service-account TU_SA@PROJECT.iam.gserviceaccount.com
```

Ajusta `--allow-unauthenticated` según tu política (si lo desactivas, el front necesitaría identidad; el MVP suele usar endpoint público + CORS + reCAPTCHA).

## Rate limiting (fase 2)

Para limitar abusos del endpoint público, Google recomienda **Cloud Armor** delante de un balanceador o **API Gateway**. Documentar límites en operaciones cuando los active.

## Contrato `POST /contact`

JSON:

```json
{
  "name": "…",
  "company": "…",
  "email": "…",
  "phone": "…",
  "project_type": "residential",
  "message": "…",
  "recaptcha_token": "…"
}
```

`company`, `phone`, `project_type` y `recaptcha_token` son opcionales. `project_type` debe ser uno de: `residential`, `commercial`, `institutional`, `industrial`, `other`.

Respuesta 200: `{"ok":"true","message":"Recibido"}`.
