import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Header } from "./Header";

describe("Header — navegación MVP", () => {
  it("no enlaza a /clientes ni /prensa", () => {
    render(<Header />);

    const hrefs = screen
      .getAllByRole("link")
      .map((el) => el.getAttribute("href"))
      .filter(Boolean);

    expect(hrefs.some((h) => h?.includes("/clientes"))).toBe(false);
    expect(hrefs.some((h) => h?.includes("/prensa"))).toBe(false);
  });

  it("incluye enlaces MVP principales", () => {
    render(<Header />);

    const proyectosLinks = screen.getAllByRole("link", { name: /^Proyectos$/ });
    expect(proyectosLinks.length).toBeGreaterThan(0);
    expect(
      proyectosLinks.every((el) => el.getAttribute("href") === "/proyectos"),
    ).toBe(true);

    const contactoLinks = screen.getAllByRole("link", { name: /^Contacto$/ });
    expect(
      contactoLinks.some((el) => el.getAttribute("href") === "/contacto"),
    ).toBe(true);
  });
});
