import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { AppTestShell } from "@/test/wrapAppShell";
import Projects from "@/views/Projects";
import { getFeaturedProjects } from "@/data/projects";

describe("Projects — listado destacados", () => {
  it("muestra el título Proyectos destacados", () => {
    render(
      <AppTestShell>
        <Projects />
      </AppTestShell>,
    );

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /Proyectos destacados/i,
      }),
    ).toBeInTheDocument();
  });

  it("renderiza una tarjeta por cada proyecto destacado", () => {
    const { container } = render(
      <AppTestShell>
        <Projects />
      </AppTestShell>,
    );

    const expected = getFeaturedProjects().length;
    const projectLinks = container.querySelectorAll(
      'a[href^="/proyectos/"]',
    );
    expect(projectLinks.length).toBe(expected);
  });

  it("no muestra el conmutador ni filtros del listado anterior", () => {
    render(
      <AppTestShell>
        <Projects />
      </AppTestShell>,
    );

    expect(
      screen.queryByRole("button", { name: /Todos los proyectos/i }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /Selección destacada/i }),
    ).not.toBeInTheDocument();
  });
});
