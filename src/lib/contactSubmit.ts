declare global {
  interface Window {
    grecaptcha?: {
      ready: (cb: () => void) => void;
      execute: (
        siteKey: string,
        options: { action: string },
      ) => Promise<string>;
    };
  }
}

function recaptchaSiteKey(): string | undefined {
  const k = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
  return typeof k === "string" && k.trim() ? k.trim() : undefined;
}

function loadRecaptchaScript(): Promise<void> {
  const siteKey = recaptchaSiteKey();
  if (!siteKey) return Promise.resolve();
  if (document.querySelector("script[data-recaptcha-v3]")) {
    return Promise.resolve();
  }
  return new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = `https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(siteKey)}`;
    s.async = true;
    s.dataset.recaptchaV3 = "1";
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("No se pudo cargar reCAPTCHA"));
    document.head.appendChild(s);
  });
}

async function getRecaptchaToken(): Promise<string | undefined> {
  const siteKey = recaptchaSiteKey();
  if (!siteKey) return undefined;
  await loadRecaptchaScript();
  return new Promise((resolve, reject) => {
    window.grecaptcha?.ready(async () => {
      try {
        const token = await window.grecaptcha!.execute(siteKey, {
          action: "contact",
        });
        resolve(token);
      } catch {
        reject(new Error("Verificación anti-spam no disponible"));
      }
    });
  });
}

export function getContactApiUrl(): string | undefined {
  const u = import.meta.env.VITE_CONTACT_API_URL;
  if (typeof u !== "string") return undefined;
  const t = u.trim();
  return t || undefined;
}

export type ContactFormBody = {
  name: string;
  company?: string;
  email: string;
  phone?: string;
  project_type?: string;
  message: string;
  recaptcha_token?: string;
};

/** Sin URL de API: simula envío (desarrollo). Con URL: POST al backend. */
export async function submitContactForm(body: ContactFormBody): Promise<void> {
  const base = getContactApiUrl();
  if (!base) {
    await new Promise((r) => setTimeout(r, 800));
    return;
  }

  let recaptcha_token = body.recaptcha_token;
  if (recaptchaSiteKey()) {
    recaptcha_token = await getRecaptchaToken();
  }

  const url = `${base.replace(/\/$/, "")}/contact`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ ...body, recaptcha_token }),
  });

  if (!res.ok) {
    let detail = "No se pudo enviar el mensaje. Intente de nuevo más tarde.";
    try {
      const j = (await res.json()) as { detail?: unknown };
      if (typeof j.detail === "string") detail = j.detail;
    } catch {
      /* ignore */
    }
    throw new Error(detail);
  }
}
