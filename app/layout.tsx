import type { Metadata } from "next";
import { Providers } from "./providers";
import "./globals.css";
import { SITE_DEFAULT_PAGE_TITLE, SITE_NAME } from "@/lib/site";
import { DEFAULT_PAGE_DESCRIPTION } from "@/lib/site-metadata";

export const metadata: Metadata = {
  metadataBase: new URL("https://hazarquitectura.com"),
  title: {
    default: SITE_DEFAULT_PAGE_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_PAGE_DESCRIPTION,
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
