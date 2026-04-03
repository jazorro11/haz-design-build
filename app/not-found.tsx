import type { Metadata } from "next";
import NotFound from "@/views/NotFound";
import { buildPageMetadata } from "@/lib/site-metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Página no encontrada",
  path: "/404",
  noindex: true,
});

export default function NotFoundPage() {
  return <NotFound />;
}
