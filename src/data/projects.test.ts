import { describe, it, expect } from "vitest";
import {
  projects,
  getProjectById,
  getProjectsByFilter,
  getFeaturedProjects,
} from "./projects";

describe("projects data helpers", () => {
  it("getProjectById devuelve el proyecto cuando el id existe", () => {
    const p = getProjectById("aposentos");
    expect(p).toBeDefined();
    expect(p?.name).toBe("Aposentos");
  });

  it("getProjectById devuelve undefined para id desconocido", () => {
    expect(getProjectById("no-existe")).toBeUndefined();
  });

  it("getProjectsByFilter con featuredOnly solo incluye destacados", () => {
    const featured = getProjectsByFilter(
      undefined,
      undefined,
      undefined,
      true,
    );
    expect(featured.length).toBeGreaterThan(0);
    expect(featured.every((p) => p.featured)).toBe(true);
  });

  it("getProjectsByFilter por tipología reduce el listado", () => {
    const industrial = getProjectsByFilter(["industrial"]);
    expect(industrial.length).toBeGreaterThan(0);
    expect(industrial.every((p) => p.type === "industrial")).toBe(true);
  });

  it("getProjectsByFilter combina tipología y estado", () => {
    const filtered = getProjectsByFilter(
      ["residential"],
      undefined,
      ["completed"],
    );
    expect(filtered.every((p) => p.type === "residential")).toBe(true);
    expect(filtered.every((p) => p.status === "completed")).toBe(true);
  });

  it("getProjectsByFilter con En obra no rompe si no hay coincidencias", () => {
    const inObra = getProjectsByFilter(
      undefined,
      undefined,
      ["in-progress"],
    );
    expect(Array.isArray(inObra)).toBe(true);
    expect(inObra.every((p) => p.status === "in-progress")).toBe(true);
  });

  it("getProjectsByFilter ordena por año descendente cuando el estado coincide", () => {
    const list = getProjectsByFilter(undefined, undefined, ["completed"]);
    const years = list.map((p) => p.year);
    const sortedYears = [...years].sort((a, b) => b - a);
    expect(years).toEqual(sortedYears);
  });

  it("getFeaturedProjects no supera 12 ítems y solo incluye destacados", () => {
    const featured = getFeaturedProjects();
    expect(featured.length).toBeLessThanOrEqual(12);
    expect(featured.every((p) => p.featured)).toBe(true);
    const fromFilter = getProjectsByFilter(
      undefined,
      undefined,
      undefined,
      true,
    ).slice(0, 12);
    expect(featured.map((p) => p.id)).toEqual(fromFilter.map((p) => p.id));
  });

  it("el arreglo projects tiene ids únicos", () => {
    const ids = projects.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
