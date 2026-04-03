"use client";

import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <TooltipProvider>
      <ScrollToTop />
      <Toaster />
      <Sonner />
      {children}
    </TooltipProvider>
  );
}
