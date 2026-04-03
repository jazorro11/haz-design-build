import type { Metadata } from "next";
import Index from "@/views/Index";
import { SITE_DEFAULT_PAGE_TITLE, SITE_NAME } from "@/lib/site";
import {
  BASE_URL,
  DEFAULT_PAGE_DESCRIPTION,
} from "@/lib/site-metadata";

export const metadata: Metadata = {
  title: { absolute: SITE_DEFAULT_PAGE_TITLE },
  description: DEFAULT_PAGE_DESCRIPTION,
  alternates: { canonical: BASE_URL },
  openGraph: {
    title: SITE_DEFAULT_PAGE_TITLE,
    description: DEFAULT_PAGE_DESCRIPTION,
    url: BASE_URL,
    type: "website",
    siteName: SITE_NAME,
  },
};

export default function HomePage() {
  return <Index />;
}
