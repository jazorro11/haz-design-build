/**
 * POST /api/contact against a deployed origin (e.g. Vercel preview).
 * Usage (PowerShell): $env:CONTACT_PREVIEW_URL='https://your-app.vercel.app'; npm run verify:contact-api
 * Usage (bash): CONTACT_PREVIEW_URL=https://your-app.vercel.app npm run verify:contact-api
 */
const base = process.env.CONTACT_PREVIEW_URL?.replace(/\/$/, "");
if (!base) {
  console.error(
    "Set CONTACT_PREVIEW_URL to the deployment origin (no trailing slash), e.g. https://project-xxx.vercel.app",
  );
  process.exit(1);
}

const url = `${base}/api/contact`;
const body = {
  name: "Verify",
  email: "verify@example.com",
  message: "API verification from scripts/verify-contact-api.mjs",
};

const res = await fetch(url, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
});

let data;
try {
  data = await res.json();
} catch {
  data = { parseError: true };
}

console.log(`${res.status} ${res.statusText}`, JSON.stringify(data));

if (!res.ok || !data.ok) {
  process.exit(1);
}
