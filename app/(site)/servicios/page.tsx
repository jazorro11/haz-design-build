import type { Metadata } from "next";
import Services from "@/views/Services";
import { buildPageMetadata } from "@/lib/site-metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Servicios",
  description:
    "Servicios integrales de arquitectura: diseño arquitectónico, ejecución de obra, gerencia de proyectos, consultoría técnica y remodelaciones.",
  path: "/servicios",
});

export default function ServiciosPage() {
  return <Services />;
}
