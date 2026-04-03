import type { Metadata } from "next";
import Projects from "@/views/Projects";
import { buildPageMetadata } from "@/lib/site-metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Proyectos",
  description:
    "Selección de obras de arquitectura e interiorismo que reflejan trayectoria en diseño y ejecución de obra.",
  path: "/proyectos",
});

export default function ProyectosPage() {
  return <Projects />;
}
