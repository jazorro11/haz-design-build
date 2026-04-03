import type { Metadata } from "next";
import Contact from "@/views/Contact";
import { buildPageMetadata } from "@/lib/site-metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Contacto",
  description:
    "Contáctenos para cotizar su proyecto. HAZ Arquitectura: diseño y ejecución de obra con más de 30 años de experiencia.",
  path: "/contacto",
});

export default function ContactoPage() {
  return <Contact />;
}
