import { describe, expect, it } from "vitest";
import { getGalleryCellClassName } from "./project-gallery-layout";

describe("getGalleryCellClassName", () => {
  it("con total 0 devuelve solo la base", () => {
    const c = getGalleryCellClassName(0, 0);
    expect(c).toContain("rounded-lg");
    expect(c).not.toContain("md:col-span-2");
  });

  it("con una imagen usa bloque protagonista", () => {
    const c = getGalleryCellClassName(0, 1);
    expect(c).toContain("aspect-video");
    expect(c).toContain("md:aspect-project");
  });

  it("con dos imágenes no usa bento", () => {
    const a = getGalleryCellClassName(0, 2);
    const b = getGalleryCellClassName(1, 2);
    expect(a).toContain("aspect-project");
    expect(b).toContain("aspect-project");
    expect(a).not.toContain("md:col-span-2");
  });

  it("con tres o más, la primera ocupa 2x2 en md", () => {
    const first = getGalleryCellClassName(0, 4);
    const rest = getGalleryCellClassName(2, 4);
    expect(first).toContain("md:col-span-2");
    expect(first).toContain("md:row-span-2");
    expect(rest).not.toContain("md:col-span-2");
  });
});
