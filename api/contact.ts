import type { VercelRequest, VercelResponse } from "@vercel/node";
import { google } from "googleapis";

type ContactBody = {
  name?: unknown;
  company?: unknown;
  email?: unknown;
  phone?: unknown;
  projectType?: unknown;
  message?: unknown;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function parseBody(req: VercelRequest): ContactBody | null {
  if (req.body == null) return {};
  if (typeof req.body === "string") {
    try {
      return JSON.parse(req.body) as ContactBody;
    } catch {
      return null;
    }
  }
  if (typeof req.body === "object") {
    return req.body as ContactBody;
  }
  return null;
}

function str(v: unknown): string {
  if (typeof v !== "string") return "";
  return v.trim();
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
): Promise<void> {
  if (req.method !== "POST") {
    res.status(405).json({ ok: false, error: "Método no permitido" });
    return;
  }

  const parsed = parseBody(req);
  if (parsed === null) {
    res.status(400).json({ ok: false, error: "Cuerpo inválido" });
    return;
  }

  const name = str(parsed.name);
  const company = str(parsed.company);
  const email = str(parsed.email);
  const phone = str(parsed.phone);
  const projectType = str(parsed.projectType);
  const message = str(parsed.message);

  if (!name || !email || !message) {
    res
      .status(400)
      .json({ ok: false, error: "Faltan nombre, correo o mensaje" });
    return;
  }
  if (!EMAIL_RE.test(email)) {
    res.status(400).json({ ok: false, error: "Correo no válido" });
    return;
  }

  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;
  const range = process.env.GOOGLE_SHEET_RANGE;

  if (!clientEmail || !privateKey || !spreadsheetId || !range) {
    console.error("contact: missing server environment variables");
    res.status(500).json({ ok: false, error: "Error del servidor" });
    return;
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

    res.status(200).json({ ok: true });
  } catch (err) {
    console.error("contact: sheets append failed", err);
    res.status(500).json({ ok: false, error: "No se pudo registrar el mensaje" });
  }
}
