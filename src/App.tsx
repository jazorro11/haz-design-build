import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import Services from "./pages/Services";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import DesignSystem from "./pages/DesignSystem";

/** Rutas de la app; exportado para pruebas con `MemoryRouter`. */
export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/proyectos" element={<Projects />} />
      <Route path="/proyectos/:id" element={<ProjectDetail />} />
      <Route path="/servicios" element={<Services />} />
      <Route path="/sobre-haz" element={<About />} />
      <Route path="/contacto" element={<Contact />} />
      {/* Internal route - not listed in navigation */}
      <Route path="/_internal/design-system" element={<DesignSystem />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

const App = () => (
  <TooltipProvider>
    <Toaster />
    <Sonner />
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  </TooltipProvider>
);

export default App;
