# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Dev server on http://localhost:8080
npm run build      # Production build
npm run lint       # ESLint
npm run test       # Vitest (single run)
npm run test:watch # Vitest watch mode
```

Run a single test file:
```bash
npx vitest run src/path/to/file.test.tsx
```

The contact API route (`/api/contact`) requires `vercel dev` to work locally — `npm run dev` alone does not serve serverless functions.

## Architecture

**Next.js 15 App Router** with a clean separation between routing and UI:

- `app/` — thin routing shell only. The `(site)` route group wraps all public pages in `src/components/layout/Layout.tsx` (Header + Footer). `app/api/contact/route.ts` is the only server-side endpoint.
- `src/views/` — all real page logic lives here as `'use client'` components. App pages just import and re-export these.
- `src/components/` — reusable components: `layout/` (Header, Footer, Layout, InteriorPageHero), `projects/` (ProjectCard, ProjectGallery), `sections/` (ProcessStepsSection), `ui/` (shadcn/ui primitives).
- `src/data/` — static typed data: `projects.ts` exports `projects[]` with filter/query helpers; `services.ts` exports the services list. No CMS — all content is in these files.
- `src/lib/` — utilities: `utils.ts` (cn), `site.ts` (site name constants), `site-metadata.ts` (SEO), `project-gallery-layout.ts` (gallery grid logic).

**Contact form flow**: `ContactForm` → `POST /api/contact` → Google Sheets via service account JWT. Required env vars: `GOOGLE_SERVICE_ACCOUNT_EMAIL`, `GOOGLE_PRIVATE_KEY`, `GOOGLE_SHEET_ID`, `GOOGLE_SHEET_RANGE`. See `.env.example` for sheet column setup.

## Design System

The HAZ design system uses Inter exclusively, zero border-radius, no box shadows. Key tokens (defined in `app/globals.css`):

- Accent: `hsl(var(--accent))` = slate blue `#2B4C7E`; hover: `#1E3A63`
- Backgrounds: `--background` (white), `--card` (warm off-white `#F5F3EF`), `--haz-bg-dark` (`#111111`)
- Typography scale: `text-display-xl/lg/md`, `text-body-lg`, `haz-label` (12px uppercase 0.12em tracked)

Custom utility classes to use instead of raw Tailwind: `container-wide`, `section-padding`, `section-padding-sm`, `haz-label`, `haz-link-arrow`, `haz-nav-active`, `image-cover`.

`/internal/design-system` renders all tokens and components — use it when adjusting the visual system.

## Testing

Vitest + jsdom + Testing Library. Setup file: `src/test/setup.ts` — it globally mocks `next/image`, `next/link`, `next/navigation` (usePathname/useRouter), and `IntersectionObserver`.

Wrap page-level tests in `AppTestShell` from `src/test/wrapAppShell.tsx` (provides TooltipProvider, Toasters, and Layout). Control `usePathname` via `mockUsePathname` from `src/test/next-navigation-mock.ts`.

Test files live alongside source: `Component.aspect.test.tsx` (e.g. `Footer.nav.test.tsx`, `Index.process.test.tsx`). Path alias `@` resolves to `src/`.

## Agent Workflow

For features and bugs, use these three agents **in series** (each after the previous is closed or skipped by trivialness):

1. **`haz-web-design-expert`** — when the change touches UI, layout, forms, interactions or visible copy. Reviews design, UX, responsive, states, microcopy.
2. **`haz-scope-code-review`** — always for features/bugs that touch public routes, navigation, data models, SEO or the contact flow. Validates against the brief in `.cursor/docs/technical-brief-haz-arquitectura-v6.md`. Also closes `README.md` updates once design + QA are green.
3. **`qa-test-engineer`** — before closing any feature or fix. Runs `npm run test`, `npm run lint`, `npm run build` as needed and proposes 1-2 targeted tests per iteration.

**MVP public routes:** `/`, `/proyectos`, `/proyectos/:id`, `/servicios`, `/sobre-haz`, `/contacto`.
**Never link** `/clientes` or `/prensa` in any public page, header, or footer.

Trivial changes (typos, internal comments, TS-only refactors with no visible surface change) may skip the relevant agent — when in doubt, invoke it.

## Adding a Project

Edit `src/data/projects.ts`: add images to `src/assets/projects/`, import them, and append a new entry to the `projects` array. All filter/sort logic (`getProjectsByFilter`, `getFeaturedProjects`, `getProjectById`) derives from that array automatically.
