import { describe, it, expect } from "vitest";
import { buildPageMetadata } from "./site-metadata";
import { SITE_DEFAULT_PAGE_TITLE, SITE_NAME } from "@/lib/site";

describe("buildPageMetadata", () => {
  it("sin title usa título absoluto del sitio", () => {
    const m = buildPageMetadata({ path: "/" });
    expect(m.title).toEqual({ absolute: SITE_DEFAULT_PAGE_TITLE });
  });

  it("con title compone título con nombre del sitio", () => {
    const m = buildPageMetadata({ title: "Contacto", path: "/contacto" });
    expect(m.title).toBe(`Contacto | ${SITE_NAME}`);
  });

  it("expone description y canonical", () => {
    const m = buildPageMetadata({
      title: "Proyectos",
      description: "Descripción de prueba",
      path: "/proyectos",
    });
    expect(m.description).toBe("Descripción de prueba");
    expect(m.alternates?.canonical).toBe(
      "https://hazarquitectura.com/proyectos",
    );
  });

  it("noindex añade robots", () => {
    const m = buildPageMetadata({
      title: "404",
      noindex: true,
      path: "/ruta-fantasma",
    });
    expect(m.robots).toEqual({ index: false, follow: false });
  });
});
