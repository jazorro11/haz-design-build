import type { Metadata } from "next";
import { SITE_DEFAULT_PAGE_TITLE, SITE_NAME } from "@/lib/site";

export const BASE_URL = "https://hazarquitectura.com";

export const DEFAULT_PAGE_DESCRIPTION =
  "Más de 30 años integrando arquitectura y ejecución para entregar obras sólidas y funcionales. Diseño + Ejecución bajo un solo techo.";

/** Metadatos por ruta (Next Metadata API). */
export function buildPageMetadata(options: {
  title?: string;
  description?: string;
  path: string;
  noindex?: boolean;
}): Metadata {
  const { title, description = DEFAULT_PAGE_DESCRIPTION, path, noindex } = options;
  const canonical = `${BASE_URL}${path === "/" ? "" : path}`;

  if (noindex) {
    return {
      title: title ? `${title} | ${SITE_NAME}` : "Página no encontrada",
      description,
      robots: { index: false, follow: false },
    };
  }

  const pageTitle = title ? `${title} | ${SITE_NAME}` : SITE_DEFAULT_PAGE_TITLE;

  return {
    ...(title
      ? { title: `${title} | ${SITE_NAME}` }
      : { title: { absolute: SITE_DEFAULT_PAGE_TITLE } }),
    description,
    alternates: { canonical },
    openGraph: {
      title: pageTitle,
      description,
      url: canonical,
      type: "website",
      siteName: SITE_NAME,
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description,
    },
  };
}
