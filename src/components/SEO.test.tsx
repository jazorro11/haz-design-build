import { describe, it, expect } from "vitest";
import { render, waitFor } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import { SEO } from "./SEO";
import { SITE_DEFAULT_PAGE_TITLE, SITE_NAME } from "@/lib/site";

describe("SEO", () => {
  it("sin title usa el título por defecto del sitio", async () => {
    render(
      <HelmetProvider>
        <SEO path="/" />
      </HelmetProvider>,
    );
    await waitFor(() => {
      expect(document.title).toBe(SITE_DEFAULT_PAGE_TITLE);
    });
  });

  it("con title compone título con nombre del sitio", async () => {
    render(
      <HelmetProvider>
        <SEO title="Contacto" path="/contacto" />
      </HelmetProvider>,
    );
    await waitFor(() => {
      expect(document.title).toBe(`Contacto | ${SITE_NAME}`);
    });
  });

  it("expone description y canonical", async () => {
    render(
      <HelmetProvider>
        <SEO
          title="Proyectos"
          description="Descripción de prueba"
          path="/proyectos"
        />
      </HelmetProvider>,
    );
    await waitFor(() => {
      expect(
        document.querySelector('meta[name="description"]')?.getAttribute(
          "content",
        ),
      ).toBe("Descripción de prueba");
      expect(document.querySelector('link[rel="canonical"]')?.getAttribute("href")).toBe(
        "https://hazarquitectura.com/proyectos",
      );
    });
  });

  it("noindex añade meta robots", async () => {
    render(
      <HelmetProvider>
        <SEO title="404" noindex path="/ruta-fantasma" />
      </HelmetProvider>,
    );
    await waitFor(() => {
      expect(
        document.querySelector('meta[name="robots"]')?.getAttribute("content"),
      ).toBe("noindex, nofollow");
    });
  });
});
