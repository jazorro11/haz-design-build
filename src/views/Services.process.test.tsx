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

  it("la sección incluye imagen de fondo maqueta", () => {
    render(
      <AppTestShell>
        <Services />
      </AppTestShell>,
    );

    const title = screen.getByRole("heading", {
      level: 2,
      name: "Cómo trabajamos",
    });
    const section = title.closest("section");
    expect(section).toBeTruthy();

    // Imagen decorativa (alt="") no expone rol img accesible; comprobamos el DOM.
    const imgs = (section as HTMLElement).querySelectorAll("img");
    const hasMaqueta = [...imgs].some((img) =>
      (img.getAttribute("src") ?? "").toLowerCase().includes("maqueta"),
    );
    expect(hasMaqueta).toBe(true);
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

  it("superpone gradientes de lectura sobre la imagen de fondo", () => {
    render(
      <AppTestShell>
        <Services />
      </AppTestShell>,
    );

    const section = screen.getByTestId("services-process-section");
    const backdrop = section.querySelector("[aria-hidden='true']");
    expect(backdrop).toBeTruthy();

    const gradientEls = (backdrop as HTMLElement).querySelectorAll(
      "div[class*='bg-gradient-to-']",
    );
    expect(gradientEls.length).toBeGreaterThanOrEqual(1);
    const horizontal = [...gradientEls].find((el) =>
      el.className.includes("bg-gradient-to-r"),
    );
    expect(horizontal).toBeTruthy();
    expect(horizontal?.className).toMatch(/from-background\/95/);
    expect(horizontal?.className).toMatch(/via-background\/70/);
    expect(horizontal?.className).toMatch(/to-background\/30/);
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
