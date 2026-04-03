import { Layout } from "@/components/layout/Layout";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Layout>{children}</Layout>;
}
