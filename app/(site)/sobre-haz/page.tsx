import type { Metadata } from "next";
import About from "@/views/About";
import { buildPageMetadata } from "@/lib/site-metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Sobre HAZ",
  description:
    "Historia, valores y trayectoria de HAZ Arquitectura: más de 30 años integrando diseño y ejecución de obra en Colombia y el exterior.",
  path: "/sobre-haz",
});

export default function SobreHazPage() {
  return <About />;
}
