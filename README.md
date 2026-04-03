# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## Variables de entorno (formulario de contacto → Google Sheets)

El envío del formulario de contacto usa una **función serverless** (`POST /api/contact`) que escribe filas en Google Sheets. Las credenciales **no van en el front** (no uses prefijo `VITE_*` para secretos).

### Archivos

| Archivo        | Uso |
|----------------|-----|
| `.env.example` | Plantilla documentada (sí va al repo). |
| `.env`         | Tus valores locales; está en `.gitignore` — rellénalo tú y no lo subas. |

Opcional en local: `.env.local` (también ignorado por `*.local`) o `vercel env pull .env.local` si usas la CLI de Vercel.

### Desarrollo local

1. Rellena `.env` con los cuatro valores `GOOGLE_*` (pasos abajo).
2. Para probar la API en local hace falta **`vercel dev`**. Un `npm run dev` normal de Vite **no** expone `/api`.

### Producción / preview (Vercel)

1. **Project → Settings → Environment Variables**.
2. Añade las mismas variables `GOOGLE_*` para Preview y/o Production.
3. **Redeploy** para que la función reciba los valores.

### Cómo obtener cada variable

1. **`GOOGLE_SHEET_ID`**  
   Abre la hoja en Google Sheets. En la URL, el id es el segmento entre `/d/` y `/edit`.  
   Ejemplo: `https://docs.google.com/spreadsheets/d/ESTE_ES_EL_ID/edit`

2. **`GOOGLE_SHEET_RANGE`**  
   Nombre de la pestaña y rango de columnas, p. ej. `Respuestas!A:G`.  
   La pestaña debe existir con ese nombre (o ajusta el valor).  
   Fila **1** (A1:G1): Fecha \| Nombre \| Empresa \| Correo \| Teléfono \| Tipo de proyecto \| Mensaje (orden alineado con `api/contact.ts`).

3. **`GOOGLE_SERVICE_ACCOUNT_EMAIL`** y **`GOOGLE_PRIVATE_KEY`**  
   - [Google Cloud Console](https://console.cloud.google.com): proyecto → habilita **Google Sheets API**.  
   - **IAM y administración → Cuentas de servicio → Crear cuenta de servicio**.  
   - **Claves → Añadir clave → JSON**; en el archivo descargado:  
     - `client_email` → `GOOGLE_SERVICE_ACCOUNT_EMAIL`  
     - `private_key` → `GOOGLE_PRIVATE_KEY` (el código reemplaza `\n` escapados por saltos de línea reales).  
   - En la hoja de cálculo: **Compartir** y añade el `client_email` de la cuenta de servicio con permiso de **Editor**.

### Verificación opcional

El script `scripts/verify-contact-api.mjs` puede usar `CONTACT_PREVIEW_URL` (base URL del despliegue) para probar el endpoint contra preview; no es obligatorio para el funcionamiento básico.

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
