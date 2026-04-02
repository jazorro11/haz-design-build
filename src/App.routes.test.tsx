import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { AppTestShell } from "@/test/wrapAppShell";

describe("App routes (MVP y post-MVP)", () => {
  let errorSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    errorSpy.mockRestore();
  });

  it.each(["/clientes", "/prensa"])(
    "ruta %s no está registrada: muestra 404",
    (path) => {
      render(<AppTestShell initialPath={path} />);
      expect(screen.getByRole("heading", { name: "404" })).toBeInTheDocument();
    },
  );

  it.each([
    ["/", /HAZ Arquitectura/i],
    ["/proyectos", /^Proyectos$/],
    ["/servicios", /^Servicios$/],
    ["/sobre-haz", /^Sobre HAZ$/],
    ["/contacto", /^Contacto$/],
  ])("ruta MVP %s renderiza h1 esperado", (path, nameMatcher) => {
    render(<AppTestShell initialPath={path} />);
    expect(screen.getByRole("heading", { level: 1, name: nameMatcher })).toBeInTheDocument();
  });

  it("ruta interna design-system responde", () => {
    render(<AppTestShell initialPath="/_internal/design-system" />);
    expect(
      screen.getByRole("heading", { name: /HAZ Design System/i }),
    ).toBeInTheDocument();
  });
});
