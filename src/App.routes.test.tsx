import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { AppTestShell } from "@/test/wrapAppShell";
import { mockUsePathname } from "@/test/next-navigation-mock";
import Index from "@/views/Index";
import Projects from "@/views/Projects";
import Services from "@/views/Services";
import About from "@/views/About";
import Contact from "@/views/Contact";
import DesignSystem from "@/views/DesignSystem";
import ProjectDetail, { ProjectNotFound } from "@/views/ProjectDetail";
import { getProjectById } from "@/data/projects";
import NotFound from "@/views/NotFound";

describe("Rutas MVP (páginas)", () => {
  let errorSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    mockUsePathname.mockReturnValue("/");
  });

  afterEach(() => {
    errorSpy.mockRestore();
  });

  it.each([
    ["/clientes"],
    ["/prensa"],
  ])("ruta no registrada %s: NotFound con 404", (path) => {
    mockUsePathname.mockReturnValue(path);
    render(
      <AppTestShell>
        <NotFound />
      </AppTestShell>,
    );
    expect(screen.getByRole("heading", { name: "404" })).toBeInTheDocument();
  });

  it.each([
    [Index, /HAZ Arquitectura/i],
    [Projects, /^Proyectos destacados$/],
    [Services, /^Servicios$/],
    [About, /^Sobre HAZ$/],
    [Contact, /^Contacto$/],
  ])("página MVP renderiza h1 esperado", (Page, nameMatcher) => {
    render(
      <AppTestShell>
        <Page />
      </AppTestShell>,
    );
    expect(
      screen.getByRole("heading", { level: 1, name: nameMatcher }),
    ).toBeInTheDocument();
  });

  it("ruta interna design-system responde", () => {
    render(
      <AppTestShell>
        <DesignSystem />
      </AppTestShell>,
    );
    expect(
      screen.getByRole("heading", { name: /HAZ Design System/i }),
    ).toBeInTheDocument();
  });

  it("ruta /proyectos/:id válida muestra el nombre del proyecto en h1", () => {
    const project = getProjectById("aposentos");
    expect(project).toBeDefined();
    render(
      <AppTestShell>
        <ProjectDetail project={project!} />
      </AppTestShell>,
    );
    expect(
      screen.getByRole("heading", { level: 1, name: /^Aposentos$/ }),
    ).toBeInTheDocument();
  });

  it("ruta /proyectos/:id inválida muestra estado no encontrado", () => {
    render(
      <AppTestShell>
        <ProjectNotFound />
      </AppTestShell>,
    );
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /Proyecto no encontrado/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Volver a proyectos/i }),
    ).toHaveAttribute("href", "/proyectos");
  });
});
