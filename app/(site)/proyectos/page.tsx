import type { Metadata } from "next";
import Projects from "@/views/Projects";
import { buildPageMetadata } from "@/lib/site-metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Proyectos",
  description:
    "Proyectos de arquitectura e interiorismo: residencial, comercial, institucional e industrial. Trayectoria en diseño y ejecución de obra.",
  path: "/proyectos",
});

export default function ProyectosPage() {
  return <Projects />;
}
