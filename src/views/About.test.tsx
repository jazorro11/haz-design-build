import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { AppTestShell } from "@/test/wrapAppShell";
import About from "@/views/About";

describe("About — sección Nuestra trayectoria", () => {
  it("muestra el título h2 y al menos un hito del timeline", () => {
    render(
      <AppTestShell>
        <About />
      </AppTestShell>,
    );

    expect(
      screen.getByRole("heading", { level: 2, name: "Nuestra trayectoria" }),
    ).toBeInTheDocument();

    expect(
      screen.getByText("Fundación de HAZ Arquitectura en Bogotá"),
    ).toBeInTheDocument();
  });

  it("la sección trayectoria no tiene imagen de fondo (diseño editorial limpio)", () => {
    render(
      <AppTestShell>
        <About />
      </AppTestShell>,
    );

    const section = screen.getByTestId("about-trajectory-section");
    const imgs = (section as HTMLElement).querySelectorAll("img");
    expect(imgs.length).toBe(0);
  });
});
