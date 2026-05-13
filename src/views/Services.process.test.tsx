import { describe, it, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { AppTestShell } from "@/test/wrapAppShell";
import Services from "@/views/Services";
import { processSteps } from "@/data/services";

describe("Services — sección Cómo trabajamos", () => {
  it("muestra el título, la nota legal y cada duración de proceso", () => {
    render(
      <AppTestShell>
        <Services />
      </AppTestShell>,
    );

    expect(
      screen.getByRole("heading", { level: 2, name: "Cómo trabajamos" }),
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
        <Services />
      </AppTestShell>,
    );

    const section = screen.getByTestId("services-process-section");
    expect(section.className).toMatch(/bg-card/);
    const imgs = (section as HTMLElement).querySelectorAll("img");
    expect(imgs.length).toBe(0);
  });

  it("expone anclas de prueba para la sección proceso", () => {
    render(
      <AppTestShell>
        <Services />
      </AppTestShell>,
    );

    expect(screen.getByTestId("services-process-section")).toBeInTheDocument();
    expect(screen.getByTestId("services-process-intro")).toBeInTheDocument();
    expect(screen.getByTestId("services-process-footnote")).toBeInTheDocument();
  });

  it("la sección proceso no tiene overlay de gradiente decorativo", () => {
    render(
      <AppTestShell>
        <Services />
      </AppTestShell>,
    );

    const section = screen.getByTestId("services-process-section");
    const gradientEls = (section as HTMLElement).querySelectorAll(
      "div[class*='bg-gradient-to-']",
    );
    expect(gradientEls.length).toBe(0);
  });

  it("prioriza gradientes y sombras de texto sin panel vidrio en intro y nota", () => {
    render(
      <AppTestShell>
        <Services />
      </AppTestShell>,
    );

    const intro = screen.getByTestId("services-process-intro");
    const footnote = screen.getByTestId("services-process-footnote");

    expect(intro.className).not.toMatch(/backdrop-blur/);
    expect(footnote.className).not.toMatch(/backdrop-blur/);
    expect(intro.className).not.toMatch(/bg-background\//);
    expect(footnote.className).not.toMatch(/bg-background\//);

    const note = footnote.querySelector("p");
    expect(note?.className).toMatch(/text-muted-foreground/);
  });

  it("alinea tipografía del bloque intro con el hero (sin sombras artificiales)", () => {
    render(
      <AppTestShell>
        <Services />
      </AppTestShell>,
    );

    const intro = screen.getByTestId("services-process-intro");
    const title = within(intro).getByRole("heading", { level: 2 });
    const lead = intro.querySelector("p");

    expect(title.className).not.toMatch(/text-shadow/);
    expect(title.className).toMatch(/text-foreground/);
    expect(lead?.className).toMatch(/text-muted-foreground/);
  });
});
