import type { ReactNode } from "react";
import { HelmetProvider } from "react-helmet-async";
import { MemoryRouter } from "react-router-dom";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { AppRoutes } from "@/App";

/**
 * Misma envoltura lógica que `App`, con `MemoryRouter` para fijar la URL inicial en tests.
 */
export function AppTestShell({
  initialPath,
  children,
}: {
  initialPath: string;
  children?: ReactNode;
}) {
  return (
    <HelmetProvider>
      <TooltipProvider>
        <Toaster />
        <SonnerToaster />
        <MemoryRouter initialEntries={[initialPath]}>
          {children ?? <AppRoutes />}
        </MemoryRouter>
      </TooltipProvider>
    </HelmetProvider>
  );
}
