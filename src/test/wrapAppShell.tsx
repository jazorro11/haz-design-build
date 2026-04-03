import type { ReactNode } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { Layout } from "@/components/layout/Layout";

/**
 * Proveedores + layout del sitio para pruebas de páginas (equivalente a la envoltura visible en Next).
 */
export function AppTestShell({ children }: { children: ReactNode }) {
  return (
    <TooltipProvider>
      <Toaster />
      <SonnerToaster />
      <Layout>{children}</Layout>
    </TooltipProvider>
  );
}
