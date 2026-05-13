# Technical Brief — Proyecto web profesional — HAZ Arquitectura

---

## 1. Título de la tarea

**Sitio web profesional — portafolio + servicios + contacto para el arquitecto Hugo**

Implementar y dejar en producción un sitio web **profesional y funcional** que sirva como **portafolio de proyectos** (fotografías y descripción breve por obra), **presentación de servicios**, **información del estudio/empresa** y **canal de contacto** para clientes. El contenido y las imágenes **ya fueron compartidos** por Hugo; el trabajo consiste en integrarlos en la base de código existente, **refactorizar la página de inicio** para que no promueva Clientes ni Prensa, y **ajustar cabecera, pie y rutas** al alcance acordado.

El repositorio puede conservar temporalmente librerías heredadas (p. ej. Radix/shadcn); su depuración es opcional y posterior.

El nombre comercial que se muestra en la interfaz (hoy “HAZ Arquitectura” en cabecera, pie y metadatos) debe **actualizarse** al nombre del estudio y al tono de copy que Hugo defina.

> **Pregunta guía:** ¿Se puede describir la tarea en una sola frase? Sí: *sustituir el contenido demo en las rutas del sitio por el material real de Hugo, eliminar Clientes y Prensa de toda la superficie pública (incluida la home), y desplegar el sitio listo para clientes.*

---

## 2. Contexto

Hugo, arquitecto, necesita una página web para **mostrar su obra**, **explicar qué servicios ofrece**, **dar contexto de su empresa/estudio** y **facilitar el contacto** de clientes potenciales. Los recursos (textos e imágenes) **ya están disponibles**; el resultado es una presencia **clara, profesional y mantenible** que representa de forma definitiva al estudio en producción.

### Cómo está el sistema hoy

El repositorio es una aplicación **Next.js (App Router) + React 19 + TypeScript**, con **Tailwind CSS** y componentes tipo **shadcn/ui** (primitivas Radix). Los datos de negocio viven en **`src/data/`** como módulos TypeScript; las imágenes de proyectos se referencian con **importaciones estáticas** (Next/bundler) desde **`src/assets/projects/`** (no solo desde `public/`).

La aplicación ya define **más rutas y enlaces** de los necesarios para el alcance acordado: existen páginas y enlaces a **Clientes** y **Prensa**, que **no forman parte** del alcance actual. Además, la página de inicio ([`src/views/Index.tsx`](src/views/Index.tsx)) incluyó en el pasado **secciones completas** de clientes y prensa con enlaces a `/clientes` y `/prensa`; eso contradice el alcance si solo se actualizan cabecera y pie. La cabecera ([`src/components/layout/Header.tsx`](src/components/layout/Header.tsx)) y el pie ([`src/components/layout/Footer.tsx`](src/components/layout/Footer.tsx)) deben alinearse al menú reducido, y la **home debe dejar de mostrar ni enlazar** esas secciones.

### Problema a resolver

Sin actualizar contenido y alcance, el sitio sigue mostrando **textos e imágenes de demostración** y una estructura **más amplia** que la acordada, lo que dispersa el mensaje y no refleja el estudio de Hugo.

### Objetivo de esta implementación

Sustituir el contenido demo por el **material entregado por Hugo** en todas las **rutas y bloques del sitio**, restringir la **experiencia pública** a **Inicio**, **Proyectos** (listado y ficha), **Servicios**, **Sobre el estudio** y **Contacto**, **sin ningún camino ni CTA hacia Clientes o Prensa** (ni en home, ni en cabecera, ni en pie, ni en cuerpo de otras páginas del sitio), y dejar el proyecto **listo para build y deploy** (por ejemplo en Vercel), con criterios de contacto e imágenes **verificables**.

### Estado actual del código (referencia rápida)

- **Rutas registradas** en [`app/`](app/) (App Router): `/`, `/proyectos`, `/proyectos/[id]`, `/servicios`, `/sobre-haz`, `/contacto`, `/_internal/design-system`; rutas no definidas → **`not-found`** (404). Las URLs `/clientes` y `/prensa` **no** están registradas.
- **Detalle de proyecto:** parámetro de ruta **`id`** (no `slug`), resolución con `getProjectById` en [`src/data/projects.ts`](src/data/projects.ts).
- **Metadatos por página:** API **`metadata` / `generateMetadata`** de Next en [`app/`](app/) y helper [`src/lib/site-metadata.ts`](src/lib/site-metadata.ts); layout raíz en [`app/layout.tsx`](app/layout.tsx).
- **Contacto:** [`src/views/Contact.tsx`](src/views/Contact.tsx) con formulario que **POST** a **`/api/contact`** ([`app/api/contact/route.ts`](app/api/contact/route.ts)); requiere variables de entorno del servidor (Google Sheets) en despliegue.
- **Deploy:** existe [`vercel.json`](vercel.json) con **headers** de seguridad (sin rewrite SPA; Next resuelve rutas por archivo).
- **`public/`:** [`public/robots.txt`](public/robots.txt) con `Sitemap:` y `Disallow: /_internal/`. Sitemap generado por Next: [`app/sitemap.ts`](app/sitemap.ts) → `/sitemap.xml` (rutas del sitio + fichas de proyecto).

### Páginas del sitio

| Incluido en el sitio | Ruta | Notas |
|----------------------|------|--------|
| Inicio | `/` | Hero, destacados de proyectos, servicios y proceso; **sin** secciones ni enlaces a Clientes o Prensa (contenido en [`src/views/Index.tsx`](src/views/Index.tsx)) |
| Proyectos | `/proyectos` | Listado; sin requisito de filtros avanzados salvo lo que ya implemente el código |
| Detalle de proyecto | `/proyectos/:id` | `id` coincide con el campo `id` de cada proyecto en datos |
| Servicios | `/servicios` | Contenido desde [`src/data/services.ts`](src/data/services.ts) (incluye `processSteps` si la página los usa) |
| Sobre el estudio | `/sobre-haz` | Información de empresa; ruta puede mantenerse aunque el slug cambie en una iteración posterior |
| Contacto | `/contacto` | Ver definición de “contacto funcional” en Constraints |

| Fuera del alcance actual (diferido o no enlazar) | Ruta |
|--------------------------------------------------|------|
| Clientes | `/clientes` |
| Prensa | `/prensa` |

**Política recomendada para `/clientes` y `/prensa`:** además de quitar enlaces, **no registrar** esas rutas en `app/` y responder con **404** (`not-found`) si alguien accede por URL antigua (o redirigir a `/` con criterio único documentado). Así el `sitemap.xml` y la realidad del sitio coinciden: esas URLs **no** son parte del producto.

La ruta pública acordada `/_internal/design-system` se sirve vía **rewrite** en [`middleware.ts`](middleware.ts) hacia el segmento interno `/internal/design-system` (las carpetas con prefijo `_` en `app/` son privadas en Next). **No** debe aparecer en menú público, pie ni sitemap del sitio.

### Gestión del contenido entregado por Hugo

| Tipo | Destino típico en código | Responsable |
|------|---------------------------|-------------|
| Textos de inicio, sobre, servicios | Páginas y/o `src/data/*.ts` según donde esté hoy cada bloque | Desarrollador |
| Proyectos (título, descripción, año, ubicación, imágenes, etc.) | [`src/data/projects.ts`](src/data/projects.ts) + assets bajo `src/assets/projects/` (o convención acordada) | Desarrollador |
| Servicios (títulos, descripciones, ítems, proceso) | [`src/data/services.ts`](src/data/services.ts) | Desarrollador |
| Datos de contacto reales | [`src/views/Contact.tsx`](src/views/Contact.tsx), pie y metadatos según diseño | Desarrollador |
| Clientes y Prensa | **No** forman parte del alcance actual: **no** hace falta sustituir `clients.ts` / `press.ts` por contenido real; basta con **dejar de importarlos y de mostrarlos** en la UI. Los archivos pueden permanecer en el repo para una fase posterior o eliminarse si el equipo prefiere evitar código muerto. | Desarrollador |

Dudas de contenido se resuelven **directamente con Hugo**.

### Objetivo de diseño

El sitio actual presenta un aspecto de plantilla genérica: paleta petrol/terracota, tipografía Playfair + Inter, tarjetas con sombra, esquinas redondeadas y patrones de sección predecibles (hero con overlay de gradiente, cards con iconos, footer oscuro). Para convertirlo en una presencia profesional distintiva se requiere un **rediseño total** guiado por referencias de estudios de arquitectura de referencia.

Las señas de identidad del rediseño son:
- Tipografía editorial con contraste radical de pesos, sin mezcla de serifas decorativas.
- Paleta muy restringida (un acento, fondos neutros, sin sombras decorativas, radio cero o próximo a cero).
- Imágenes a sangre y grillas con proporciones matemáticas claras.
- Jerarquía de información por espaciado, no por sombras ni bordes.
- Cero patrones de plantilla: sin cards flotantes, sin iconos decorativos en estadísticas, sin gradientes sobre foto en el hero.

---

## 3. Requerimientos técnicos

### Lenguaje / Stack

> **Preguntas guía:** ¿Se continúa con el stack existente? Sí, salvo decisiones explícitas de refactor posterior.

- **Lenguaje:** TypeScript. El proyecto declara **`strict: false`** en [`tsconfig.json`](tsconfig.json) (ajustable); se exige **tipado en datos y componentes tocados** y **no introducir `any` innecesario** en código nuevo o modificado. Activar **`strict` de forma gradual** es objetivo diferido, salvo decisión explícita de alcance.
- **Runtime de desarrollo/build:** Node.js **18+** recomendado (compatible con Next.js 15).
- **Framework:** React 19.
- **Aplicación:** **Next.js 15** (App Router); `npm run dev` / `npm run build` / `npm run start`.
- **Enrutamiento:** segmentos en [`app/`](app/); vistas de UI en [`src/views/`](src/views/) (evitar carpeta `src/pages/` para no activar el Pages Router de Next).
- **Estilos:** Tailwind CSS; componentes UI basados en **Radix / shadcn** donde ya existan; estilos globales en [`app/globals.css`](app/globals.css).
- **Metadatos:** **`metadata` / `generateMetadata`** (Next) + [`src/lib/site-metadata.ts`](src/lib/site-metadata.ts).
- **Datos:** archivos TypeScript en `src/data/`; sin CMS en el alcance acordado. **API de contacto:** Route Handler en [`app/api/contact/route.ts`](app/api/contact/route.ts) (servidor).
- **Estado remoto / formularios:** sin requisito de librería global; la limpieza de dependencias no usadas puede planificarse cuando proceda.

### Calidad y verificación

- **ESLint:** el repositorio expone **`npm run lint`** ([`eslint.config.js`](eslint.config.js)). El cierre del proyecto debe completar **lint sin errores**.
- **Tests:** **Vitest** está integrado (`npm run test`, [`vitest.config.ts`](vitest.config.ts)); hay entorno **jsdom** y setup en [`src/test/setup.ts`](src/test/setup.ts). Se espera una **suite mínima útil** (p. ej. pruebas de helpers en [`src/data/projects.ts`](src/data/projects.ts) como `getProjectById` o lógica de proyectos publicados), no solo el test de ejemplo; el test placeholder **no** cuenta como cobertura significativa.
- **CI (recomendado):** en cuanto exista flujo con PRs, conviene un pipeline que ejecute **lint + test + build**; no se exige proveedor concreto.
- **Formato (diferido):** **Prettier** u otras reglas de formato unificadas son **recomendación posterior**; no están en las dependencias actuales del proyecto.

### Arquitectura

> **Pregunta guía:** ¿Patrón principal? **Next.js App Router:** `npm run build` genera salida optimizada para Node/serverless en Vercel; rutas definidas por archivos en `app/`.

- **Renderizado:** páginas mayormente estáticas donde aplica; API y datos dinámicos en Route Handlers.
- **Organización:**
  - [`app/`](app/) — rutas, layouts, `metadata`, API
  - [`src/views/`](src/views/) — vistas de pantalla importadas por `app/**/page.tsx`
  - [`src/components/layout/`](src/components/layout/) — layout, cabecera, pie
  - [`src/components/`](src/components/) — bloques reutilizables (p. ej. proyectos, imágenes)
  - [`src/data/`](src/data/) — datos de negocio
  - [`src/lib/`](src/lib/) — utilidades
- **Punto de entrada de rutas:** segmentos bajo `app/`, incluido el grupo de layout `(site)` para cabecera/pie compartidos.
- **404:** [`app/not-found.tsx`](app/not-found.tsx) y componente [`src/views/NotFound.tsx`](src/views/NotFound.tsx). Los textos deben estar en **español**. Un `id` de proyecto inexistente muestra mensaje propio en la vista de detalle (comportamiento actual).

Flujo de datos **objetivo** (la home consume varios módulos; no solo proyectos):

```mermaid
flowchart LR
  subgraph routes [Rutas del producto]
    home["/"]
    proj["/proyectos"]
    detail["/proyectos/:id"]
    serv["/servicios"]
    about["/sobre-haz"]
    contact["/contacto"]
  end
  subgraph data [Datos]
    projects["projects.ts"]
    services["services.ts"]
    pagesInline["copy en páginas"]
  end
  home --> projects
  home --> services
  proj --> projects
  detail --> projects
  serv --> services
  about --> pagesInline
  contact --> pagesInline
```

### Input esperado

No hay API externa: el **input** es el **conjunto de datos y archivos** que el desarrollador incorpora al repo siguiendo las estructuras ya definidas.

**Proyectos** — tipos y campos definidos en [`src/data/projects.ts`](src/data/projects.ts) (resumen):

```typescript
// Modelo actual (simplificado; ver archivo fuente para el contrato completo)
interface Project {
  id: string;
  name: string;
  location: string;
  year: number;
  type: ProjectType;
  role: ProjectRole;
  status: ProjectStatus;
  featured: boolean;
  published: boolean;
  coverImage: ProjectImageSrc;  // string o import estático (Next `StaticImageData`)
  images: {
    url: string;
    caption?: string;
    stage: 'completed' | 'in-progress';
  }[];
  client?: string;
  area?: string;
  team?: string[];
  description: string;
  challenge?: string;
  solution?: string;
  result?: string;
  deliverables?: string[];
}
```

**Servicios** — en [`src/data/services.ts`](src/data/services.ts):

```typescript
interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;        // nombre alineado con iconos Lucide usados en la página
  features: string[];
}

// Además: processSteps[] (pasos de proceso) usados en la vista de servicios
```

**Origen:** textos e imágenes proporcionados por Hugo. Las imágenes nuevas deben integrarse respetando el mecanismo de build (importaciones desde `src/assets/...` o, si se acuerda otro patrón, documentar ese acuerdo en el PR/commit).

### Output esperado

- **Build:** `npm run build` (Next) sin errores de TypeScript.
- **Navegación del sitio:** todas las rutas incluidas responden con la vista esperada; **no** hay enlaces en **ninguna página del sitio** (incluida la home) ni en cabecera ni pie hacia `/clientes` ni `/prensa`.
- **SEO:** título y descripción globales en [`app/layout.tsx`](app/layout.tsx); por ruta vía `metadata` / `generateMetadata` y [`src/lib/site-metadata.ts`](src/lib/site-metadata.ts). El HTML inicial incluye metadatos por página donde Next pre-renderiza.
- **Pre-render / SSR:** el stack Next permite mejorar SEO frente a una SPA pura; afinar estrategias por ruta (estático vs dinámico) en iteraciones posteriores si el alcance lo exige.

---

## 4. Constraints (Restricciones)

### Idioma y alcance de contenido

- Todo el contenido visible orientado al usuario final debe estar en **español** (salvo nombres propios), **incluida la página 404** ([`src/views/NotFound.tsx`](src/views/NotFound.tsx)).
- En las **rutas y secciones del sitio**, sustituir el contenido demo por el material **real de Hugo**.
- **Clientes** y **Prensa** no forman parte del alcance actual: **no** se exige reemplazar sus datos demo por contenido real; se exige **que no formen parte del producto** (sin secciones, sin imports en la home, sin enlaces; ver tabla de gestión de contenido).

### Navegación y pie

- **Cabecera y pie:** solo enlaces a **Inicio** (marca), **Proyectos**, **Servicios**, **Sobre el estudio**, **Contacto** (más CTA a contacto si aplica). **Eliminar** enlaces a **Clientes** y **Prensa**.
- **Todas las páginas del sitio:** no deben contener `Link`, botones ni textos que envíen a `/clientes` o `/prensa` (revisar especialmente [`src/views/Index.tsx`](src/views/Index.tsx) y cualquier bloque reutilizado).
- **Rutas `/clientes` y `/prensa`:** **recomendado** eliminarlas del router y tratar URLs antiguas con **404** (o redirección acordada). Si por error temporal permanecieran registradas, tampoco deben aparecer en sitemap ni en la UI.

### Contacto funcional

- Debe mostrarse **información de contacto real** de Hugo (correo, teléfono y/o enlaces acordados, ubicación si aplica), **coherente** en la página de contacto y en el pie (hoy el pie incluye un correo demo).
- El **formulario actual no envía datos a servidor.** Para el alcance acordado, o bien:
  - se **documenta** que el envío en servidor es **diferido** y se ofrece contacto vía **mailto**, teléfono clicable o WhatsApp; o
  - se retira el formulario y solo quedan canales directos.
  La opción elegida debe quedar **explícita** en el PR y cumplir el DoD.
- Si se **mantiene** el formulario sin backend: aplicar **validación en cliente** coherente con las librerías del proyecto (p. ej. **Zod**, ya presente en [`package.json`](package.json)). Cualquier **envío real** a API, sanitización en servidor y medidas como **rate limiting** quedan **diferidos** y deben diseñarse entonces de forma explícita.

### Imágenes

- Sustituir imágenes demo por las **entregadas por Hugo**, con **texto alternativo** (`alt`) descriptivo.
- Respetar el patrón técnico del proyecto (p. ej. imports desde `src/assets/projects/` para que el bundler de Next optimice en build).
- Evitar **CLS** grave: donde sea posible, reservar espacio (p. ej. aspect-ratio o altura mínima) en contenedores de imagen.

### Código y dependencias

- Mantener **tipado TypeScript** en datos y componentes tocados.
- **No** es obligatorio en el alcance actual eliminar shadcn/Radix ni `react-query`; una **fase posterior** puede reducir dependencias no usadas.

### Seguridad en despliegue y cliente

- **Headers HTTP** (configuración en [`vercel.json`](vercel.json) u host equivalente), además del rewrite SPA: definir políticas **verificables** en producción. Referencia mínima para el sitio:
  - **Content-Security-Policy** acorde a Next.js (scripts y estilos del runtime); afinar en iteraciones; se retiró CSP Report-Only genérico de la SPA para evitar falsos positivos hasta definir política explícita.
  - **X-Content-Type-Options: nosniff**
  - **Referrer-Policy** (p. ej. `strict-origin-when-cross-origin`)
  - **Permissions-Policy** mínima, deshabilitando APIs del navegador **no usadas** por el sitio.
  - **HSTS** (`Strict-Transport-Security`) solo si el dominio y el certificado HTTPS están bajo **control permanente** del proyecto; si no aplica, documentar la omisión.
- **Contenido renderizado:** no introducir **HTML crudo desde datos** sin sanitizar (p. ej. evitar `dangerouslySetInnerHTML` con cadenas no confiables). Con datos estáticos en TypeScript el riesgo actual es bajo; la regla protege iteraciones futuras (CMS, rich text).
- **Enlaces con `target="_blank"`:** usar **`rel="noopener noreferrer"`** para reducir riesgos de **tabnabbing** y filtrado de referrer.
- **Secretos y variables:** no commitear **API keys**, tokens ni archivos `.env` con secretos. Las variables expuestas al bundle (**`VITE_*`**) son **públicas**; usarlas solo para valores **no sensibles**.
- **Dependencias:** antes de un release relevante, ejecutar **`npm audit`** (o equivalente) y **documentar** en PR o nota breve las vulnerabilidades **aceptadas** por dependencia transitiva, si las hubiera.
- **Ruta `/_internal/design-system`:** además de excluirla del sitemap, es **recomendable** no enlazarla en producción y valorar **`Disallow`** en [`public/robots.txt`](public/robots.txt) para esa ruta si el equipo quiere limitar su descubrimiento por crawlers (no es obligación absoluta).

### Datos y enlaces (revisión)

- Revisar en PR los cambios en **`src/data/`** y en copy visible: coherencia, URLs rotas y enlaces externos esperados.

### Accesibilidad y responsive

- Sitio **responsive** (móvil, tablet, escritorio).
- Un solo **`h1`** por página donde aplique el patrón actual; imágenes con `alt`; contraste razonable en textos principales.

### Deploy

- Mantener **`vercel.json`** con los **headers** descritos en **Seguridad en despliegue y cliente** (sin rewrite SPA: Next gestiona rutas).

### Fuera del alcance actual / diferido

- Backend, CMS, autenticación, formulario con envío real sin proveedor acordado.
- Secciones **Clientes** y **Prensa** como parte del sitio público.
- Pre-render / SSG, i18n, analytics (salvo que se acuerde explícitamente).

---

## 5. Definition of Done (DoD)

El trabajo se considera terminado cuando:

### Funcionalidad y alcance

- [ ] Las rutas del sitio (`/`, `/proyectos`, `/proyectos/:id`, `/servicios`, `/sobre-haz`, `/contacto`) renderizan sin errores y con **contenido real de Hugo** (sin textos/imágenes demo intencionales).
- [ ] La página de **inicio** ([`src/views/Index.tsx`](src/views/Index.tsx)) **no** importa ni muestra datos de **Clientes** ni **Prensa** y **no** enlaza a `/clientes` ni `/prensa`.
- [ ] **No** hay enlaces en **cabecera**, **pie** ni **ninguna vista del sitio** hacia `/clientes` ni `/prensa`.
- [ ] Las rutas `/clientes` y `/prensa` **no** están registradas en el router **o** quedan documentadas como redirección/404 explícita acordada con el equipo; en cualquier caso **no** son descubibles desde la UI.
- [ ] Los **servicios** mostrados corresponden a datos reales en [`src/data/services.ts`](src/data/services.ts) (incluido proceso si la página lo usa).
- [ ] Los **proyectos** publicados reflejan la obra entregada; cada proyecto visible cumple el modelo de [`src/data/projects.ts`](src/data/projects.ts).
- [ ] Un **`id` inexistente** en `/proyectos/:id` se maneja de forma clara para el usuario (mensaje y retorno al listado o equivalente).
- [ ] La ruta comodín muestra la **404** del proyecto para URLs no definidas; los textos de la 404 están en **español**.
- [ ] **Contacto:** datos de contacto reales visibles y criterio de formulario acordado cumplido (ver Constraints).
- [ ] **Pie de página:** correo, teléfono o enlaces de contacto mostrados coinciden con los **datos reales de Hugo** (no quedan valores placeholder tipo dominio genérico).

### Marca y metadatos

- [ ] Nombre y textos del estudio en cabecera, pie y **metadatos del layout** (`app/layout.tsx` / `site-metadata`) alineados con lo definido con Hugo.

### Build y calidad

- [ ] `npm run build` completa sin errores.
- [ ] `npm run lint` completa **sin errores**.
- [ ] `npm run test` pasa con una **suite mínima útil** (p. ej. lógica en `src/data/` o utilidades críticas acordadas); **no** basta dejar solo el test de ejemplo aislado.
- [ ] `tsc --noEmit` (o el chequeo TypeScript del pipeline / build) sin errores **respecto al `tsconfig` vigente** (hoy sin `strict` completo; ver sección 3).
- [ ] Sin errores en consola en flujo normal de navegación del sitio.

### SEO y archivos estáticos

- [ ] Existe **`sitemap.xml`** en `public/` **o** en el hosting, listando **solo** URLs que el sitio expone como producto (incluye `/servicios`; **no** incluye `/clientes`, `/prensa` ni `/_internal/design-system`). Debe ser coherente con las rutas realmente enlazadas y con la política de router (si `/clientes` y `/prensa` se eliminan, **no** aparecen en el sitemap), **o** documentación de sustituto equivalente aceptado por el equipo.
- [ ] [`public/robots.txt`](public/robots.txt) coherente con la URL del sitio y el sitemap.

### Deploy

- [ ] Sitio desplegado en el entorno acordado (p. ej. Vercel) con **`vercel.json`** (o equivalente) con **headers** de seguridad y proyecto configurado como **Next.js**.
- [ ] **Headers** verificables en producción, alineados con la sección *Seguridad en despliegue y cliente* (constraints), incluyendo como mínimo: **Content-Security-Policy** (o **Content-Security-Policy-Report-Only** durante el ajuste), **X-Content-Type-Options: nosniff**, **Referrer-Policy** (p. ej. `strict-origin-when-cross-origin`) y **Permissions-Policy** mínima. **HSTS** solo si aplica según criterio documentado allí.

### Verificación sugerida (opcional)

- [ ] Pase rápido de **Lighthouse** (rendimiento y accesibilidad) sin regresiones graves; si algún score es bajo, dejar **nota breve** con causa.

---

*v7 - 2026-05-13. Versión del brief alineada al template en [`.cursor/docs/template-brief.md`](.cursor/docs/template-brief.md) y al código del repositorio `haz-design-build`. El proyecto es un sitio web profesional completo en producción.*
