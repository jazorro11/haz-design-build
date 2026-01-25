import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  ChevronLeft, 
  Search, 
  Menu, 
  X,
  Copy,
  Check,
  Eye,
  EyeOff,
  Loader2,
  AlertCircle,
  CheckCircle,
  Info,
  AlertTriangle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from '@/components/ui/textarea';

// Navigation sections
const navSections = [
  { 
    id: 'overview', 
    label: 'Overview',
    items: [
      { id: 'principles', label: 'Principios' },
      { id: 'usage', label: 'Cómo usar' },
    ]
  },
  { 
    id: 'foundations', 
    label: 'Foundations',
    items: [
      { id: 'colors', label: 'Colors' },
      { id: 'typography', label: 'Typography' },
      { id: 'spacing', label: 'Spacing' },
      { id: 'radius-shadows', label: 'Radius & Shadows' },
      { id: 'icons', label: 'Iconography' },
    ]
  },
  { 
    id: 'components', 
    label: 'Components',
    items: [
      { id: 'buttons', label: 'Buttons' },
      { id: 'inputs', label: 'Inputs' },
      { id: 'forms', label: 'Form Patterns' },
      { id: 'alerts', label: 'Alerts & Toasts' },
      { id: 'modals', label: 'Modals & Dialogs' },
      { id: 'tabs', label: 'Tabs & Navigation' },
      { id: 'cards', label: 'Cards' },
      { id: 'badges', label: 'Badges & Chips' },
      { id: 'loaders', label: 'Loaders & Skeletons' },
    ]
  },
  { 
    id: 'accessibility', 
    label: 'Accessibility',
    items: [
      { id: 'a11y-contrast', label: 'Contraste' },
      { id: 'a11y-focus', label: 'Focus visible' },
      { id: 'a11y-keyboard', label: 'Navegación teclado' },
      { id: 'a11y-aria', label: 'ARIA labels' },
    ]
  },
  { 
    id: 'microcopy', 
    label: 'Copy & Microcopy',
    items: [
      { id: 'tone', label: 'Tono' },
      { id: 'patterns', label: 'Patrones' },
      { id: 'validation', label: 'Validaciones' },
    ]
  },
];

// Color token definitions
const colorTokens = {
  background: [
    { name: 'background', token: '--background', value: '45 20% 98%', role: 'Fondo principal de la aplicación' },
    { name: 'card', token: '--card', value: '45 15% 96%', role: 'Fondo de tarjetas y superficies elevadas' },
    { name: 'popover', token: '--popover', value: '45 20% 98%', role: 'Fondo de popovers y dropdowns' },
    { name: 'muted', token: '--muted', value: '40 15% 94%', role: 'Fondos sutiles y deshabilitados' },
  ],
  text: [
    { name: 'foreground', token: '--foreground', value: '0 0% 11%', role: 'Texto principal' },
    { name: 'muted-foreground', token: '--muted-foreground', value: '0 0% 40%', role: 'Texto secundario' },
    { name: 'card-foreground', token: '--card-foreground', value: '0 0% 11%', role: 'Texto en tarjetas' },
  ],
  action: [
    { name: 'primary', token: '--primary', value: '195 45% 25%', role: 'Acción principal / CTA' },
    { name: 'primary-foreground', token: '--primary-foreground', value: '45 20% 98%', role: 'Texto en botones primarios' },
    { name: 'secondary', token: '--secondary', value: '35 20% 92%', role: 'Acción secundaria' },
    { name: 'accent', token: '--accent', value: '20 25% 45%', role: 'Acentos y highlights' },
    { name: 'destructive', token: '--destructive', value: '0 84.2% 60.2%', role: 'Acciones destructivas' },
  ],
  border: [
    { name: 'border', token: '--border', value: '40 15% 88%', role: 'Bordes estándar' },
    { name: 'input', token: '--input', value: '40 15% 88%', role: 'Bordes de inputs' },
    { name: 'ring', token: '--ring', value: '195 45% 25%', role: 'Anillo de focus' },
  ],
  brand: [
    { name: 'petrol', token: '--petrol', value: '195 45% 25%', role: 'Azul petróleo principal' },
    { name: 'petrol-light', token: '--petrol-light', value: '195 35% 40%', role: 'Azul petróleo claro' },
    { name: 'terracotta', token: '--terracotta', value: '20 35% 45%', role: 'Terracota (acento cálido)' },
    { name: 'stone', token: '--stone', value: '40 10% 75%', role: 'Gris piedra' },
    { name: 'cream', token: '--cream', value: '45 30% 96%', role: 'Crema / off-white' },
    { name: 'charcoal', token: '--charcoal', value: '0 0% 15%', role: 'Carbón (textos oscuros)' },
  ],
};

// Typography tokens
const typographyTokens = [
  { name: 'display-xl', size: '4rem / 64px', lineHeight: '1.1', tracking: '-0.02em', usage: 'Hero headlines' },
  { name: 'display-lg', size: '3rem / 48px', lineHeight: '1.15', tracking: '-0.02em', usage: 'Títulos de sección' },
  { name: 'display-md', size: '2.25rem / 36px', lineHeight: '1.2', tracking: '-0.01em', usage: 'Subtítulos principales' },
  { name: 'body-lg', size: '1.125rem / 18px', lineHeight: '1.7', tracking: 'normal', usage: 'Texto destacado' },
  { name: 'body', size: '1rem / 16px', lineHeight: '1.7', tracking: 'normal', usage: 'Texto base' },
  { name: 'caption', size: '0.875rem / 14px', lineHeight: '1.5', tracking: 'normal', usage: 'Etiquetas y ayudas' },
  { name: 'micro', size: '0.75rem / 12px', lineHeight: '1.4', tracking: 'normal', usage: 'Texto mínimo' },
];

// Spacing scale
const spacingTokens = [
  { name: '1', value: '0.25rem', px: '4px' },
  { name: '2', value: '0.5rem', px: '8px' },
  { name: '3', value: '0.75rem', px: '12px' },
  { name: '4', value: '1rem', px: '16px' },
  { name: '5', value: '1.25rem', px: '20px' },
  { name: '6', value: '1.5rem', px: '24px' },
  { name: '8', value: '2rem', px: '32px' },
  { name: '10', value: '2.5rem', px: '40px' },
  { name: '12', value: '3rem', px: '48px' },
  { name: '16', value: '4rem', px: '64px' },
  { name: '18', value: '4.5rem', px: '72px' },
  { name: '20', value: '5rem', px: '80px' },
  { name: '22', value: '5.5rem', px: '88px' },
  { name: '24', value: '6rem', px: '96px' },
  { name: '30', value: '7.5rem', px: '120px' },
];

// Copy button component
function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  
  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <button
      onClick={copy}
      className="p-1.5 rounded hover:bg-muted transition-colors"
      title="Copiar"
    >
      {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5 text-muted-foreground" />}
    </button>
  );
}

// Spec Card component
function SpecCard({ 
  title, 
  value, 
  description, 
  preview 
}: { 
  title: string; 
  value: string; 
  description?: string; 
  preview?: React.ReactNode;
}) {
  return (
    <div className="border border-border rounded-lg p-4 bg-card">
      <div className="flex items-start justify-between gap-2 mb-2">
        <h4 className="font-medium text-sm">{title}</h4>
        <CopyButton text={value} />
      </div>
      <code className="text-xs bg-muted px-2 py-1 rounded font-mono block mb-2 break-all">
        {value}
      </code>
      {description && (
        <p className="text-caption text-muted-foreground">{description}</p>
      )}
      {preview && (
        <div className="mt-3 pt-3 border-t border-border">
          {preview}
        </div>
      )}
    </div>
  );
}

// Color Swatch component
function ColorSwatch({ 
  name, 
  token, 
  value, 
  role 
}: { 
  name: string; 
  token: string; 
  value: string; 
  role: string;
}) {
  return (
    <div className="border border-border rounded-lg overflow-hidden bg-card">
      <div 
        className="h-16 w-full" 
        style={{ backgroundColor: `hsl(${value})` }}
      />
      <div className="p-3">
        <div className="flex items-center justify-between mb-1">
          <span className="font-medium text-sm">{name}</span>
          <CopyButton text={`hsl(var(${token}))`} />
        </div>
        <code className="text-xs text-muted-foreground font-mono block mb-1">
          {token}
        </code>
        <code className="text-xs text-muted-foreground font-mono block mb-2">
          hsl({value})
        </code>
        <p className="text-micro text-muted-foreground">{role}</p>
      </div>
    </div>
  );
}

// Component Playground
function ComponentPlayground({ 
  title,
  description,
  children,
  controls
}: { 
  title: string;
  description?: string;
  children: React.ReactNode;
  controls?: React.ReactNode;
}) {
  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <div className="p-4 border-b border-border bg-card">
        <h4 className="font-medium">{title}</h4>
        {description && (
          <p className="text-caption text-muted-foreground mt-1">{description}</p>
        )}
      </div>
      <div className="p-6 bg-background flex flex-wrap items-center gap-4">
        {children}
      </div>
      {controls && (
        <div className="p-4 border-t border-border bg-muted/30">
          {controls}
        </div>
      )}
    </div>
  );
}

export default function DesignSystem() {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState('principles');
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Button playground state
  const [buttonVariant, setButtonVariant] = useState<'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' | 'hero' | 'hero-outline' | 'subtle' | 'cta'>('default');
  const [buttonSize, setButtonSize] = useState<'default' | 'sm' | 'lg' | 'xl' | 'icon'>('default');
  const [buttonDisabled, setButtonDisabled] = useState(false);
  
  // Input state
  const [inputState, setInputState] = useState<'default' | 'focus' | 'error' | 'disabled'>('default');
  
  // Progress demo
  const [progress, setProgress] = useState(60);

  // Scroll to section
  useEffect(() => {
    const hash = location.hash.replace('#', '');
    if (hash) {
      setActiveSection(hash);
      const el = document.getElementById(hash);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [location.hash]);

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    setSidebarOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Filter nav items by search
  const filteredNav = navSections.map(section => ({
    ...section,
    items: section.items.filter(item => 
      item.label.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(section => section.items.length > 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile header */}
      <header className="lg:hidden sticky top-0 z-50 bg-background border-b border-border px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </Button>
          <h1 className="font-semibold">Design System</h1>
        </div>
        <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
          ← Volver
        </Link>
      </header>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed top-0 left-0 z-50 h-full w-72 bg-background border-r border-border transform transition-transform duration-300 lg:translate-x-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between mb-4">
            <Link to="/" className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1">
              <ChevronLeft className="w-4 h-4" /> Volver al sitio
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
          <h1 className="text-xl font-semibold mb-4">HAZ Design System</h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Buscar..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <nav className="p-4 overflow-y-auto h-[calc(100vh-140px)]">
          {filteredNav.map((section) => (
            <div key={section.id} className="mb-6">
              <h3 className="text-micro font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                {section.label}
              </h3>
              <ul className="space-y-1">
                {section.items.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => handleNavClick(item.id)}
                      className={cn(
                        "w-full text-left px-3 py-2 rounded-md text-sm transition-colors",
                        activeSection === item.id
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted"
                      )}
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <main className="lg:ml-72 min-h-screen">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          
          {/* Overview - Principles */}
          <section id="principles" className="mb-16">
            <h2 className="text-display-md font-semibold mb-4">Principios de diseño</h2>
            <p className="text-body-lg text-muted-foreground mb-8">
              El sistema de diseño de HAZ Arquitectura está construido sobre principios que reflejan 
              la esencia de la firma: solidez, claridad y ejecución impecable.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Sobriedad</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">
                    Interfaz limpia sin decoraciones innecesarias. Cada elemento tiene un propósito.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Credibilidad</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">
                    Tipografía legible, colores consistentes y jerarquía visual clara transmiten profesionalismo.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Funcionalidad</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">
                    Navegación intuitiva, estados claros y feedback inmediato. La forma sigue a la función.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Overview - Usage */}
          <section id="usage" className="mb-16">
            <h2 className="text-display-md font-semibold mb-4">Cómo usar este sistema</h2>
            <div className="prose prose-neutral max-w-none">
              <Alert>
                <Info className="h-4 w-4" />
                <AlertTitle>Tokens semánticos</AlertTitle>
                <AlertDescription>
                  Usa siempre los tokens semánticos (ej: <code>bg-primary</code>) en lugar de valores directos. 
                  Esto asegura consistencia y facilita futuras actualizaciones.
                </AlertDescription>
              </Alert>
              
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border border-green-200 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-2 text-green-700 font-medium mb-2">
                    <CheckCircle className="w-4 h-4" /> Correcto
                  </div>
                  <code className="text-sm bg-white px-2 py-1 rounded block">
                    className="bg-primary text-primary-foreground"
                  </code>
                </div>
                <div className="p-4 border border-red-200 bg-red-50 rounded-lg">
                  <div className="flex items-center gap-2 text-red-700 font-medium mb-2">
                    <AlertCircle className="w-4 h-4" /> Incorrecto
                  </div>
                  <code className="text-sm bg-white px-2 py-1 rounded block">
                    className="bg-[#1D4E5C] text-white"
                  </code>
                </div>
              </div>
            </div>
          </section>

          {/* Foundations - Colors */}
          <section id="colors" className="mb-16">
            <h2 className="text-display-md font-semibold mb-4">Colors</h2>
            <p className="text-body-lg text-muted-foreground mb-8">
              Sistema de colores organizado por roles, no por nombres de color. 
              Todos los valores están en HSL.
            </p>

            <Tabs defaultValue="background" className="mb-8">
              <TabsList>
                <TabsTrigger value="background">Background</TabsTrigger>
                <TabsTrigger value="text">Text</TabsTrigger>
                <TabsTrigger value="action">Action</TabsTrigger>
                <TabsTrigger value="border">Border</TabsTrigger>
                <TabsTrigger value="brand">Brand</TabsTrigger>
              </TabsList>
              
              {Object.entries(colorTokens).map(([category, tokens]) => (
                <TabsContent key={category} value={category}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {tokens.map((token) => (
                      <ColorSwatch key={token.name} {...token} />
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>

            <Alert className="mt-6">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Dark Mode</AlertTitle>
              <AlertDescription>
                El sistema soporta dark mode con tokens equivalentes. 
                Los valores se ajustan automáticamente con la clase <code>.dark</code>.
              </AlertDescription>
            </Alert>
          </section>

          {/* Foundations - Typography */}
          <section id="typography" className="mb-16">
            <h2 className="text-display-md font-semibold mb-4">Typography</h2>
            <p className="text-body-lg text-muted-foreground mb-8">
              Tipografía base: <strong>Inter</strong> para textos y <strong>Playfair Display</strong> para títulos display opcionales.
            </p>

            <div className="space-y-4">
              {typographyTokens.map((token) => (
                <div key={token.name} className="border border-border rounded-lg p-4 bg-card">
                  <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <code className="text-sm bg-muted px-2 py-0.5 rounded font-mono">
                          text-{token.name}
                        </code>
                        <CopyButton text={`text-${token.name}`} />
                      </div>
                      <p className={cn(
                        "text-foreground",
                        token.name === 'display-xl' && 'text-display-xl',
                        token.name === 'display-lg' && 'text-display-lg',
                        token.name === 'display-md' && 'text-display-md',
                        token.name === 'body-lg' && 'text-body-lg',
                        token.name === 'body' && 'text-body',
                        token.name === 'caption' && 'text-caption',
                        token.name === 'micro' && 'text-micro',
                      )}>
                        Ejemplo de texto
                      </p>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm text-muted-foreground">
                      <div>
                        <span className="block text-micro text-muted-foreground/60">Size</span>
                        {token.size}
                      </div>
                      <div>
                        <span className="block text-micro text-muted-foreground/60">Line Height</span>
                        {token.lineHeight}
                      </div>
                      <div>
                        <span className="block text-micro text-muted-foreground/60">Uso</span>
                        {token.usage}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Foundations - Spacing */}
          <section id="spacing" className="mb-16">
            <h2 className="text-display-md font-semibold mb-4">Spacing</h2>
            <p className="text-body-lg text-muted-foreground mb-8">
              Sistema basado en 8pt (0.5rem). Usa estos valores para padding, margin y gaps.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {spacingTokens.map((token) => (
                <div key={token.name} className="border border-border rounded-lg p-3 bg-card">
                  <div className="flex items-end gap-2 mb-2">
                    <div 
                      className="bg-primary" 
                      style={{ width: token.px, height: '8px', maxWidth: '100%' }}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <code className="text-sm font-mono">{token.name}</code>
                    <CopyButton text={`p-${token.name}`} />
                  </div>
                  <div className="text-micro text-muted-foreground mt-1">
                    {token.value} / {token.px}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
              <SpecCard
                title="Section Padding"
                value=".section-padding"
                description="py-16 md:py-24 lg:py-32"
              />
              <SpecCard
                title="Section Padding SM"
                value=".section-padding-sm"
                description="py-12 md:py-16 lg:py-20"
              />
              <SpecCard
                title="Container Wide"
                value=".container-wide"
                description="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
              />
              <SpecCard
                title="Container Narrow"
                value=".container-narrow"
                description="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8"
              />
            </div>
          </section>

          {/* Foundations - Radius & Shadows */}
          <section id="radius-shadows" className="mb-16">
            <h2 className="text-display-md font-semibold mb-4">Radius & Shadows</h2>
            
            <h3 className="text-xl font-semibold mb-4 mt-8">Border Radius</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className="border border-border rounded-lg p-4 bg-card">
                <div className="w-16 h-16 bg-primary rounded-sm mb-3" />
                <code className="text-sm font-mono">rounded-sm</code>
                <p className="text-micro text-muted-foreground mt-1">calc(0.375rem - 4px) = 2px</p>
              </div>
              <div className="border border-border rounded-lg p-4 bg-card">
                <div className="w-16 h-16 bg-primary rounded-md mb-3" />
                <code className="text-sm font-mono">rounded-md</code>
                <p className="text-micro text-muted-foreground mt-1">calc(0.375rem - 2px) = 4px</p>
              </div>
              <div className="border border-border rounded-lg p-4 bg-card">
                <div className="w-16 h-16 bg-primary rounded-lg mb-3" />
                <code className="text-sm font-mono">rounded-lg</code>
                <p className="text-micro text-muted-foreground mt-1">0.375rem = 6px</p>
              </div>
            </div>

            <h3 className="text-xl font-semibold mb-4 mt-8">Shadows</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 bg-background rounded-lg" style={{ boxShadow: 'var(--shadow-sm)' }}>
                <code className="text-sm font-mono block mb-2">shadow-sm</code>
                <p className="text-micro text-muted-foreground">Elevación mínima</p>
              </div>
              <div className="p-4 bg-background rounded-lg shadow-card">
                <code className="text-sm font-mono block mb-2">shadow-card</code>
                <p className="text-micro text-muted-foreground">Tarjetas</p>
              </div>
              <div className="p-4 bg-background rounded-lg shadow-elevated">
                <code className="text-sm font-mono block mb-2">shadow-elevated</code>
                <p className="text-micro text-muted-foreground">Elementos hover</p>
              </div>
              <div className="p-4 bg-background rounded-lg shadow-prominent">
                <code className="text-sm font-mono block mb-2">shadow-prominent</code>
                <p className="text-micro text-muted-foreground">Modales, dropdowns</p>
              </div>
            </div>
          </section>

          {/* Foundations - Icons */}
          <section id="icons" className="mb-16">
            <h2 className="text-display-md font-semibold mb-4">Iconography</h2>
            <p className="text-body-lg text-muted-foreground mb-8">
              Usamos <strong>Lucide React</strong> como librería de iconos. Tamaños estándar y stroke consistente.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="border border-border rounded-lg p-4 bg-card text-center">
                <AlertCircle className="w-4 h-4 mx-auto mb-3" />
                <code className="text-sm font-mono">w-4 h-4</code>
                <p className="text-micro text-muted-foreground mt-1">16px - Inline, botones SM</p>
              </div>
              <div className="border border-border rounded-lg p-4 bg-card text-center">
                <AlertCircle className="w-5 h-5 mx-auto mb-3" />
                <code className="text-sm font-mono">w-5 h-5</code>
                <p className="text-micro text-muted-foreground mt-1">20px - Botones, inputs</p>
              </div>
              <div className="border border-border rounded-lg p-4 bg-card text-center">
                <AlertCircle className="w-8 h-8 mx-auto mb-3" />
                <code className="text-sm font-mono">w-8 h-8</code>
                <p className="text-micro text-muted-foreground mt-1">32px - Features, cards</p>
              </div>
            </div>
          </section>

          {/* Components - Buttons */}
          <section id="buttons" className="mb-16">
            <h2 className="text-display-md font-semibold mb-4">Buttons</h2>
            <p className="text-body-lg text-muted-foreground mb-8">
              Variantes de botón para diferentes contextos y jerarquías de acción.
            </p>

            <ComponentPlayground
              title="Button Playground"
              description="Interactúa con las variantes y estados"
              controls={
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2">
                    <Label className="text-sm">Variant:</Label>
                    <Select value={buttonVariant} onValueChange={(v) => setButtonVariant(v as any)}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="default">default</SelectItem>
                        <SelectItem value="destructive">destructive</SelectItem>
                        <SelectItem value="outline">outline</SelectItem>
                        <SelectItem value="secondary">secondary</SelectItem>
                        <SelectItem value="ghost">ghost</SelectItem>
                        <SelectItem value="link">link</SelectItem>
                        <SelectItem value="hero">hero</SelectItem>
                        <SelectItem value="hero-outline">hero-outline</SelectItem>
                        <SelectItem value="subtle">subtle</SelectItem>
                        <SelectItem value="cta">cta</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center gap-2">
                    <Label className="text-sm">Size:</Label>
                    <Select value={buttonSize} onValueChange={(v) => setButtonSize(v as any)}>
                      <SelectTrigger className="w-24">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sm">sm</SelectItem>
                        <SelectItem value="default">default</SelectItem>
                        <SelectItem value="lg">lg</SelectItem>
                        <SelectItem value="xl">xl</SelectItem>
                        <SelectItem value="icon">icon</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={buttonDisabled}
                      onChange={(e) => setButtonDisabled(e.target.checked)}
                      className="rounded"
                    />
                    <span className="text-sm">Disabled</span>
                  </label>
                </div>
              }
            >
              <Button variant={buttonVariant} size={buttonSize} disabled={buttonDisabled}>
                {buttonSize === 'icon' ? <Check /> : 'Button'}
              </Button>
            </ComponentPlayground>

            <h3 className="text-xl font-semibold mt-8 mb-4">Todas las variantes</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {(['default', 'destructive', 'outline', 'secondary', 'ghost', 'link', 'hero', 'hero-outline', 'subtle', 'cta'] as const).map((variant) => (
                <div key={variant} className="text-center">
                  <Button variant={variant} className="mb-2">
                    {variant}
                  </Button>
                  <code className="text-micro text-muted-foreground block">{variant}</code>
                </div>
              ))}
            </div>

            <h3 className="text-xl font-semibold mt-8 mb-4">Estados</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="text-center">
                <Button className="mb-2">Default</Button>
                <p className="text-micro text-muted-foreground">Estado normal</p>
              </div>
              <div className="text-center">
                <Button className="mb-2 hover:bg-primary/90">Hover</Button>
                <p className="text-micro text-muted-foreground">Mouse sobre</p>
              </div>
              <div className="text-center">
                <Button className="mb-2 ring-2 ring-ring ring-offset-2">Focus</Button>
                <p className="text-micro text-muted-foreground">Foco visible</p>
              </div>
              <div className="text-center">
                <Button disabled className="mb-2">Disabled</Button>
                <p className="text-micro text-muted-foreground">Deshabilitado</p>
              </div>
            </div>
          </section>

          {/* Components - Inputs */}
          <section id="inputs" className="mb-16">
            <h2 className="text-display-md font-semibold mb-4">Inputs</h2>
            <p className="text-body-lg text-muted-foreground mb-8">
              Campos de entrada para formularios.
            </p>

            <ComponentPlayground
              title="Input States"
              description="Estados de campos de entrada"
            >
              <div className="w-full max-w-sm space-y-4">
                <div>
                  <Label>Default</Label>
                  <Input placeholder="Escribe aquí..." />
                </div>
                <div>
                  <Label>Focus</Label>
                  <Input placeholder="Con foco" className="ring-2 ring-ring ring-offset-2" />
                </div>
                <div>
                  <Label className="text-destructive">Error</Label>
                  <Input placeholder="Campo con error" className="border-destructive focus-visible:ring-destructive" />
                  <p className="text-sm text-destructive mt-1">Este campo es requerido</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Disabled</Label>
                  <Input placeholder="Deshabilitado" disabled />
                </div>
              </div>
            </ComponentPlayground>

            <h3 className="text-xl font-semibold mt-8 mb-4">Textarea</h3>
            <div className="max-w-lg">
              <Label>Mensaje</Label>
              <Textarea placeholder="Escribe un mensaje largo..." className="mt-1" />
            </div>

            <h3 className="text-xl font-semibold mt-8 mb-4">Select</h3>
            <div className="max-w-sm">
              <Label>Tipo de proyecto</Label>
              <Select>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Selecciona una opción" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="residential">Residencial</SelectItem>
                  <SelectItem value="commercial">Comercial</SelectItem>
                  <SelectItem value="institutional">Institucional</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </section>

          {/* Components - Forms */}
          <section id="forms" className="mb-16">
            <h2 className="text-display-md font-semibold mb-4">Form Patterns</h2>
            <p className="text-body-lg text-muted-foreground mb-8">
              Patrones de formulario consistentes con labels, helpers y mensajes de error.
            </p>

            <div className="max-w-md border border-border rounded-lg p-6 bg-card">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Nombre completo *</Label>
                  <Input id="name" placeholder="Tu nombre" className="mt-1" />
                  <p className="text-micro text-muted-foreground mt-1">Como aparece en documentos oficiales</p>
                </div>
                
                <div>
                  <Label htmlFor="email" className="text-destructive">Email *</Label>
                  <Input id="email" type="email" className="mt-1 border-destructive" defaultValue="email-invalido" />
                  <p className="text-sm text-destructive mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    Por favor ingresa un email válido
                  </p>
                </div>

                <div>
                  <Label htmlFor="success">Teléfono ✓</Label>
                  <Input id="success" className="mt-1 border-green-500" defaultValue="+52 55 1234 5678" />
                  <p className="text-sm text-green-600 mt-1 flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" />
                    Formato válido
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Components - Alerts */}
          <section id="alerts" className="mb-16">
            <h2 className="text-display-md font-semibold mb-4">Alerts & Toasts</h2>
            
            <h3 className="text-xl font-semibold mt-8 mb-4">Alerts</h3>
            <div className="space-y-4 max-w-2xl">
              <Alert>
                <Info className="h-4 w-4" />
                <AlertTitle>Información</AlertTitle>
                <AlertDescription>
                  Este es un mensaje informativo para el usuario.
                </AlertDescription>
              </Alert>
              
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                  Algo salió mal. Por favor intenta de nuevo.
                </AlertDescription>
              </Alert>
            </div>

            <h3 className="text-xl font-semibold mt-8 mb-4">Toast Variants</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
              <div className="border border-border rounded-md p-4 bg-background">
                <p className="font-semibold text-sm mb-1">Cambios guardados</p>
                <p className="text-sm text-muted-foreground">Tu información ha sido actualizada.</p>
              </div>
              <div className="border border-destructive rounded-md p-4 bg-destructive text-destructive-foreground">
                <p className="font-semibold text-sm mb-1">Error</p>
                <p className="text-sm opacity-90">No se pudo completar la acción.</p>
              </div>
            </div>
          </section>

          {/* Components - Modals */}
          <section id="modals" className="mb-16">
            <h2 className="text-display-md font-semibold mb-4">Modals & Dialogs</h2>
            <p className="text-body-lg text-muted-foreground mb-8">
              Ventanas modales para acciones importantes o formularios.
            </p>

            <div className="border border-border rounded-lg p-6 bg-muted/30">
              <div className="max-w-lg mx-auto bg-background border border-border rounded-lg shadow-prominent p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">Confirmar acción</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      ¿Estás seguro de que deseas continuar?
                    </p>
                  </div>
                  <button className="p-1 hover:bg-muted rounded">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex justify-end gap-2 mt-6">
                  <Button variant="outline">Cancelar</Button>
                  <Button>Confirmar</Button>
                </div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <SpecCard
                title="Modal Width"
                value="max-w-lg (512px)"
                description="Ancho estándar para modales de contenido"
              />
              <SpecCard
                title="Overlay"
                value="bg-black/80"
                description="Fondo oscuro semitransparente"
              />
            </div>
          </section>

          {/* Components - Tabs */}
          <section id="tabs" className="mb-16">
            <h2 className="text-display-md font-semibold mb-4">Tabs & Navigation</h2>
            
            <ComponentPlayground title="Tabs">
              <Tabs defaultValue="tab1" className="w-full max-w-md">
                <TabsList>
                  <TabsTrigger value="tab1">Pestaña 1</TabsTrigger>
                  <TabsTrigger value="tab2">Pestaña 2</TabsTrigger>
                  <TabsTrigger value="tab3">Pestaña 3</TabsTrigger>
                </TabsList>
                <TabsContent value="tab1" className="mt-4">
                  <p className="text-muted-foreground">Contenido de la primera pestaña.</p>
                </TabsContent>
                <TabsContent value="tab2" className="mt-4">
                  <p className="text-muted-foreground">Contenido de la segunda pestaña.</p>
                </TabsContent>
                <TabsContent value="tab3" className="mt-4">
                  <p className="text-muted-foreground">Contenido de la tercera pestaña.</p>
                </TabsContent>
              </Tabs>
            </ComponentPlayground>

            <h3 className="text-xl font-semibold mt-8 mb-4">Accordion</h3>
            <div className="max-w-lg">
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger>¿Cómo funciona?</AccordionTrigger>
                  <AccordionContent>
                    Contenido expandible que se muestra al hacer clic en el trigger.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>¿Cuánto cuesta?</AccordionTrigger>
                  <AccordionContent>
                    Los precios varían según el alcance del proyecto.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </section>

          {/* Components - Cards */}
          <section id="cards" className="mb-16">
            <h2 className="text-display-md font-semibold mb-4">Cards</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Card Estándar</CardTitle>
                  <CardDescription>Descripción breve del contenido</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Contenido de la tarjeta con información relevante.
                  </p>
                </CardContent>
              </Card>

              <Card className="card-hover cursor-pointer">
                <CardHeader>
                  <CardTitle>Card con Hover</CardTitle>
                  <CardDescription>Interactiva con elevación</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Pasa el mouse para ver el efecto de elevación.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Components - Badges */}
          <section id="badges" className="mb-16">
            <h2 className="text-display-md font-semibold mb-4">Badges & Chips</h2>
            
            <ComponentPlayground title="Badge Variants">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="destructive">Destructive</Badge>
              <Badge variant="outline">Outline</Badge>
            </ComponentPlayground>

            <h3 className="text-xl font-semibold mt-8 mb-4">Uso en contexto</h3>
            <div className="flex flex-wrap gap-2">
              <Badge>Publicado</Badge>
              <Badge variant="secondary">Terminado</Badge>
              <Badge variant="outline">En obra</Badge>
              <Badge className="bg-petrol text-primary-foreground">Diseño + Ejecución</Badge>
            </div>
          </section>

          {/* Components - Loaders */}
          <section id="loaders" className="mb-16">
            <h2 className="text-display-md font-semibold mb-4">Loaders & Skeletons</h2>
            
            <h3 className="text-xl font-semibold mt-8 mb-4">Loading Spinner</h3>
            <div className="flex items-center gap-4">
              <Loader2 className="w-4 h-4 animate-spin" />
              <Loader2 className="w-6 h-6 animate-spin" />
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
              <Button disabled>
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                Cargando...
              </Button>
            </div>

            <h3 className="text-xl font-semibold mt-8 mb-4">Progress Bar</h3>
            <div className="max-w-md space-y-4">
              <Progress value={progress} />
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => setProgress(Math.max(0, progress - 10))}>-10</Button>
                <Button size="sm" variant="outline" onClick={() => setProgress(Math.min(100, progress + 10))}>+10</Button>
              </div>
            </div>

            <h3 className="text-xl font-semibold mt-8 mb-4">Skeleton</h3>
            <div className="space-y-4 max-w-md">
              <div className="flex items-center gap-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              </div>
              <Skeleton className="h-32 w-full" />
            </div>
          </section>

          {/* Accessibility */}
          <section id="a11y-contrast" className="mb-16">
            <h2 className="text-display-md font-semibold mb-4">Accesibilidad: Contraste</h2>
            <p className="text-body-lg text-muted-foreground mb-8">
              Cumplimos con WCAG AA para contraste de texto (4.5:1 mínimo).
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-background border border-border rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="font-medium">Texto en fondo claro</span>
                </div>
                <p className="text-foreground">Ratio: ~12:1 ✓</p>
              </div>
              <div className="p-4 bg-primary text-primary-foreground rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="w-4 h-4" />
                  <span className="font-medium">Texto en primario</span>
                </div>
                <p>Ratio: ~8:1 ✓</p>
              </div>
            </div>
          </section>

          <section id="a11y-focus" className="mb-16">
            <h2 className="text-display-md font-semibold mb-4">Accesibilidad: Focus Visible</h2>
            <p className="text-body-lg text-muted-foreground mb-8">
              Todos los elementos interactivos tienen un anillo de focus visible.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button className="ring-2 ring-ring ring-offset-2">Botón con focus</Button>
              <Input className="max-w-xs ring-2 ring-ring ring-offset-2" placeholder="Input con focus" />
            </div>

            <SpecCard
              title="Focus Ring Style"
              value="ring-2 ring-ring ring-offset-2"
              description="Anillo de 2px con color primario y offset de 2px"
              preview={null}
            />
          </section>

          <section id="a11y-keyboard" className="mb-16">
            <h2 className="text-display-md font-semibold mb-4">Accesibilidad: Navegación por teclado</h2>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-center gap-2">
                <Badge variant="outline">Tab</Badge> Navegar entre elementos
              </li>
              <li className="flex items-center gap-2">
                <Badge variant="outline">Enter / Space</Badge> Activar botones y links
              </li>
              <li className="flex items-center gap-2">
                <Badge variant="outline">Escape</Badge> Cerrar modales y dropdowns
              </li>
              <li className="flex items-center gap-2">
                <Badge variant="outline">Arrow Keys</Badge> Navegar dentro de tabs, selects
              </li>
            </ul>
          </section>

          <section id="a11y-aria" className="mb-16">
            <h2 className="text-display-md font-semibold mb-4">Accesibilidad: ARIA Labels</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <SpecCard
                title="Imágenes"
                value='alt="Descripción del contenido"'
                description="Todas las imágenes tienen alt text descriptivo"
              />
              <SpecCard
                title="Botones de icono"
                value='aria-label="Cerrar menú"'
                description="Botones sin texto visible tienen aria-label"
              />
              <SpecCard
                title="Formularios"
                value='<Label htmlFor="campo">'
                description="Inputs asociados con labels mediante htmlFor/id"
              />
              <SpecCard
                title="Mensajes de error"
                value='aria-describedby="error-id"'
                description="Inputs conectados a sus mensajes de error"
              />
            </div>
          </section>

          {/* Microcopy */}
          <section id="tone" className="mb-16">
            <h2 className="text-display-md font-semibold mb-4">Copy: Tono</h2>
            <p className="text-body-lg text-muted-foreground mb-8">
              Comunicación profesional, clara y directa. Sin jerga innecesaria.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border border-green-200 bg-green-50 rounded-lg">
                <CheckCircle className="w-4 h-4 text-green-600 mb-2" />
                <p className="font-medium text-green-800 mb-2">Usar</p>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>"Guardar cambios"</li>
                  <li>"Enviar solicitud"</li>
                  <li>"Ver todos los proyectos"</li>
                </ul>
              </div>
              <div className="p-4 border border-red-200 bg-red-50 rounded-lg">
                <AlertCircle className="w-4 h-4 text-red-600 mb-2" />
                <p className="font-medium text-red-800 mb-2">Evitar</p>
                <ul className="text-sm text-red-700 space-y-1">
                  <li>"Click aquí!!!"</li>
                  <li>"Submit"</li>
                  <li>"Más info"</li>
                </ul>
              </div>
            </div>
          </section>

          <section id="patterns" className="mb-16">
            <h2 className="text-display-md font-semibold mb-4">Copy: Patrones</h2>
            
            <div className="space-y-4 max-w-2xl">
              <div className="border border-border rounded-lg p-4">
                <code className="text-sm bg-muted px-2 py-1 rounded">Botones de acción</code>
                <p className="mt-2 text-muted-foreground">Verbo + objeto: "Guardar proyecto", "Enviar mensaje", "Ver galería"</p>
              </div>
              <div className="border border-border rounded-lg p-4">
                <code className="text-sm bg-muted px-2 py-1 rounded">Títulos de sección</code>
                <p className="mt-2 text-muted-foreground">Sustantivos o frases nominales: "Proyectos destacados", "Nuestros servicios"</p>
              </div>
              <div className="border border-border rounded-lg p-4">
                <code className="text-sm bg-muted px-2 py-1 rounded">CTAs principales</code>
                <p className="mt-2 text-muted-foreground">Orientados a beneficio: "Hablemos", "Cotizar proyecto", "Ver portafolio"</p>
              </div>
            </div>
          </section>

          <section id="validation" className="mb-16">
            <h2 className="text-display-md font-semibold mb-4">Copy: Validaciones</h2>
            <p className="text-body-lg text-muted-foreground mb-8">
              Los mensajes de error deben indicar qué pasó y cómo resolverlo.
            </p>

            <div className="space-y-4 max-w-lg">
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Campo requerido</AlertTitle>
                <AlertDescription>Por favor ingresa tu email para continuar.</AlertDescription>
              </Alert>

              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Formato inválido</AlertTitle>
                <AlertDescription>El email debe tener formato válido (ej: nombre@empresa.com).</AlertDescription>
              </Alert>

              <Alert>
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertTitle className="text-green-600">Éxito</AlertTitle>
                <AlertDescription>Tu mensaje ha sido enviado. Te contactaremos pronto.</AlertDescription>
              </Alert>
            </div>
          </section>

          {/* Footer */}
          <footer className="mt-16 pt-8 border-t border-border text-center text-muted-foreground">
            <p className="text-caption">
              HAZ Arquitectura Design System • Uso interno • v1.0
            </p>
          </footer>
        </div>
      </main>
    </div>
  );
}
