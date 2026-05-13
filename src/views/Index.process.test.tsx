import { describe, it, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { AppTestShell } from "@/test/wrapAppShell";
import Index from "@/views/Index";
import { processSteps } from "@/data/services";

describe("Index — sección Del concepto a la obra", () => {
  it("muestra el título, la nota legal y cada duración de proceso", () => {
    render(
      <AppTestShell>
        <Index />
      </AppTestShell>,
    );

    expect(
      screen.getByRole("heading", { level: 2, name: "Del concepto a la obra" }),
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        /Los tiempos son estimados y varían según la complejidad del proyecto/i,
      ),
    ).toBeInTheDocument();

    for (const step of processSteps) {
      expect(screen.getByText(step.duration, { exact: false })).toBeInTheDocument();
    }
  });

  it("la sección proceso usa fondo bg-card sin imagen decorativa", () => {
    render(
      <AppTestShell>
        <Index />
      </AppTestShell>,
    );

    const section = screen.getByTestId("home-process-section");
    expect(section.className).toMatch(/bg-card/);
    const imgs = (section as HTMLElement).querySelectorAll("img");
    expect(imgs.length).toBe(0);
  });

  it("expone anclas de prueba para la sección proceso", () => {
    render(
      <AppTestShell>
        <Index />
      </AppTestShell>,
    );

    expect(screen.getByTestId("home-process-section")).toBeInTheDocument();
    expect(screen.getByTestId("home-process-intro")).toBeInTheDocument();
    expect(screen.getByTestId("home-process-footnote")).toBeInTheDocument();
  });

  it("la sección proceso no tiene overlay de gradiente decorativo", () => {
    render(
      <AppTestShell>
        <Index />
      </AppTestShell>,
    );

    const section = screen.getByTestId("home-process-section");
    const gradientEls = (section as HTMLElement).querySelectorAll(
      "div[class*='bg-gradient-to-']",
    );
    expect(gradientEls.length).toBe(0);
  });

  it("prioriza gradientes y sombras de texto sin panel vidrio en intro y nota", () => {
    render(
      <AppTestShell>
        <Index />
      </AppTestShell>,
    );

    const intro = screen.getByTestId("home-process-intro");
    const footnote = screen.getByTestId("home-process-footnote");

    expect(intro.className).not.toMatch(/backdrop-blur/);
    expect(footnote.className).not.toMatch(/backdrop-blur/);
    expect(intro.className).not.toMatch(/bg-background\//);
    expect(footnote.className).not.toMatch(/bg-background\//);

    const note = footnote.querySelector("p");
    expect(note?.className).toMatch(/text-muted-foreground/);
  });

  it("alinea tipografía del bloque intro con el patrón de servicios", () => {
    render(
      <AppTestShell>
        <Index />
      </AppTestShell>,
    );

    const intro = screen.getByTestId("home-process-intro");
    const title = within(intro).getByRole("heading", { level: 2 });
    const lead = intro.querySelector("p");

    expect(title.className).not.toMatch(/text-shadow/);
    expect(title.className).toMatch(/text-foreground/);
    expect(lead?.className).toMatch(/text-muted-foreground/);
  });
});
