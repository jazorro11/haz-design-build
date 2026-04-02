import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Footer } from "./Footer";

describe("Footer — navegación MVP", () => {
  it("no enlaza a /clientes ni /prensa", () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>,
    );

    const hrefs = screen
      .getAllByRole("link")
      .map((el) => el.getAttribute("href"))
      .filter(Boolean);

    expect(hrefs.some((h) => h?.includes("/clientes"))).toBe(false);
    expect(hrefs.some((h) => h?.includes("/prensa"))).toBe(false);
  });

  it("mantiene enlaces de navegación principal", () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>,
    );

    expect(screen.getByRole("link", { name: /^Proyectos$/ })).toHaveAttribute("href", "/proyectos");
    expect(screen.getByRole("link", { name: /^Contacto$/ })).toHaveAttribute("href", "/contacto");
  });
});
