import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { AppTestShell } from "@/test/wrapAppShell";
import Projects from "@/views/Projects";
import { projects } from "@/data/projects";

function projectSummaryLabel(count: number): string {
  return `${count} proyecto${count !== 1 ? "s" : ""}`;
}

describe("Projects — filtros", () => {
  it("filtrar por tipología reduce el listado y Limpiar filtros lo restablece", () => {
    render(
      <AppTestShell>
        <Projects />
      </AppTestShell>,
    );

    expect(
      screen.getByText(projectSummaryLabel(projects.length)),
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /^Industrial$/ }));

    expect(screen.getByText(projectSummaryLabel(1))).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /^Limpiar filtros$/ }));

    expect(
      screen.getByText(projectSummaryLabel(projects.length)),
    ).toBeInTheDocument();
  });

  it("alternar a Todos los proyectos mantiene el listado visible", () => {
    render(
      <AppTestShell>
        <Projects />
      </AppTestShell>,
    );

    fireEvent.click(
      screen.getByRole("button", { name: /Todos los proyectos/i }),
    );

    expect(
      screen.getByText(projectSummaryLabel(projects.length)),
    ).toBeInTheDocument();
  });
});
