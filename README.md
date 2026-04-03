# Portafolio HAZ — haz-design-build

Sitio del estudio **HAZ** (arquitectura y construcción): proyectos, servicios, sobre el estudio y contacto. Contenido en datos TypeScript locales (sin CMS en el alcance actual).

## Stack

- **Next.js 15** (App Router)
- **React 19** y **TypeScript**
- **Tailwind CSS**; componentes con **Radix UI** y patrones tipo shadcn
- Pruebas con **Vitest** y **Testing Library**

## Requisitos

- Node.js LTS y npm

## Puesta en marcha

```sh
git clone <URL_DEL_REPO>
cd haz-design-build
npm install
npm run dev
```

El servidor de desarrollo arranca en el puerto **8080** (ver `package.json`).

## Scripts

| Comando | Descripción |
|--------|-------------|
| `npm run dev` | Servidor de desarrollo Next.js |
| `npm run build` | Compilación de producción |
| `npm run start` | Servidor de producción (tras `build`) |
| `npm run lint` | ESLint |
| `npm run test` | Vitest en modo run |
| `npm run test:watch` | Vitest en modo watch |
| `npm run verify:contact-api` | Comprueba el endpoint de contacto (opcional; ver script) |

## Estructura relevante

- `app/` — rutas, layouts y **Route Handlers** (`app/api/…`)
- `src/views/` — vistas de página (UI por ruta)
- `src/data/` — datos estáticos (proyectos, textos, etc.)
- `src/components/` — componentes compartidos y layout
- `src/lib/` — utilidades y metadatos del sitio

## Rutas públicas principales

- `/` — inicio
- `/proyectos` y `/proyectos/[id]` — listado y detalle de proyecto
- `/servicios`, `/sobre-haz`, `/contacto`

La ruta interna de diseño (`/_internal/design-system`, reescrita en middleware hacia `app/internal/design-system`) es solo para desarrollo: no va en menú público ni en el sitemap del MVP.

## Variables de entorno (contacto → Google Sheets)

El formulario de **contacto** hace `POST` a `/api/contact` (handler en `app/api/contact/route.ts`). Las credenciales van **solo en servidor** (variables de entorno en Vercel o en local con `vercel dev`). **No uses el prefijo `VITE_*` para secretos** (ver `.env.example`).

### Archivos

| Archivo | Uso |
|--------|-----|
| `.env.example` | Plantilla documentada (sí va al repo); fuente de verdad de nombres y notas |
| `.env` | Valores locales; está en `.gitignore` — rellénalo tú y no lo subas |

Opcional en local: `.env.local` (también cubierto por `*.local`) o `vercel env pull .env.local` con la CLI de Vercel **logueada**, para replicar Preview y usar **`vercel dev`**.

### Desarrollo local (probar `/api/contact`)

1. Rellena `.env` con los cuatro valores `GOOGLE_*` (pasos abajo).
2. Para ejercitar `POST /api/contact` en local hace falta **`vercel dev`**. Un `npm run dev` normal **no** expone `/api`, según la convención documentada en `.env.example`.

### Producción / preview (Vercel)

1. **Project → Settings → Environment Variables**
2. Añade las mismas variables `GOOGLE_*` para Preview y/o Production
3. **Redeploy** para que la función reciba los valores

### Hoja de Google

Crea una pestaña cuyo nombre encaje con `GOOGLE_SHEET_RANGE` (por defecto la hoja **Respuestas**). La **fila 1** (A1:G1) debe coincidir con el orden de columnas del append en `api/contact.ts` (como indica `.env.example`):

**A** Fecha | **B** Nombre | **C** Empresa | **D** Correo | **E** Teléfono | **F** Tipo de proyecto | **G** Mensaje  

Comparte la hoja de cálculo con `GOOGLE_SERVICE_ACCOUNT_EMAIL` como **Editor** (cuenta de servicio en GCP).

### Cómo obtener cada variable

1. **`GOOGLE_SHEET_ID`**  
   En la URL de Google Sheets, el id es el segmento entre `/d/` y `/edit`.

2. **`GOOGLE_SHEET_RANGE`**  
   Nombre de la pestaña y rango de columnas, p. ej. `Respuestas!A:G`.

3. **`GOOGLE_SERVICE_ACCOUNT_EMAIL`** y **`GOOGLE_PRIVATE_KEY`**  
   - [Google Cloud Console](https://console.cloud.google.com): proyecto → habilita **Google Sheets API**.  
   - **IAM y administración → Cuentas de servicio → Crear cuenta de servicio**.  
   - **Claves → Añadir clave → JSON**; en el archivo descargado:  
     - `client_email` → `GOOGLE_SERVICE_ACCOUNT_EMAIL`  
     - `private_key` → `GOOGLE_PRIVATE_KEY` (el código reemplaza `\n` escapados por saltos de línea reales).

### Verificación opcional

El script `scripts/verify-contact-api.mjs` puede usar `CONTACT_PREVIEW_URL` (URL base del despliegue) para probar el endpoint; no es obligatorio para el flujo básico.

## Despliegue

El proyecto está pensado para desplegarse en **Vercel** (u otro hosting compatible con Next.js 15): conecta el repositorio, configura las variables de entorno y ejecuta `npm run build` en el pipeline.

Documentación de referencia del alcance y arquitectura: `.cursor/docs/technical-brief-haz-arquitectura-v6.md` (si trabajas en el repo con ese brief).
