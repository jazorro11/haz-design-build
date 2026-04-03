import type { Metadata } from "next";
import DesignSystem from "@/views/DesignSystem";
import { buildPageMetadata } from "@/lib/site-metadata";

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: "Design System (interno)",
    description: "Documentación interna del sistema de diseño HAZ.",
    path: "/_internal/design-system",
    noindex: true,
  }),
};

export default function DesignSystemPage() {
  return <DesignSystem />;
}
