import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { BASE_URL } from "@/lib/site-metadata";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const staticPaths = [
    "",
    "/proyectos",
    "/servicios",
    "/sobre-haz",
    "/contacto",
  ] as const;

  const staticEntries: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: path === "" ? BASE_URL : `${BASE_URL}${path}`,
    lastModified,
  }));

  const projectEntries: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${BASE_URL}/proyectos/${p.id}`,
    lastModified,
  }));

  return [...staticEntries, ...projectEntries];
}
