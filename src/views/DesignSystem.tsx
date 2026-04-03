'use client';

import Link from 'next/link';
import { useState, useEffect, useSyncExternalStore } from 'react';

function subscribeHash(cb: () => void) {
  window.addEventListener('hashchange', cb);
  return () => window.removeEventListener('hashchange', cb);
}

function getHashSnapshot() {
  return typeof window !== 'undefined' ? window.location.hash : '';
}

function useHash() {
  return useSyncExternalStore(subscribeHash, getHashSnapshot, () => '');
}
import { 
  ChevronLeft, Search, Menu, X, Copy, Check, Loader2,
  AlertCircle, CheckCircle, Info
} from 'lucide-react';
import type { VariantProps } from 'class-variance-authority';
import { Button, buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Textarea } from '@/components/ui/textarea';

type ButtonPlaygroundVariant = NonNullable<VariantProps<typeof buttonVariants>['variant']>;
type ButtonPlaygroundSize = NonNullable<VariantProps<typeof buttonVariants>['size']>;

// --- NAV ---
const navItems = [
  { id: 'overview', label: 'Overview' },
  { id: 'colors', label: 'Colors' },
  { id: 'typography', label: 'Typography' },
  { id: 'spacing', label: 'Spacing & Layout' },
  { id: 'radius-shadows', label: 'Radius & Shadows' },
  { id: 'buttons', label: 'Buttons' },
  { id: 'inputs', label: 'Inputs & Forms' },
  { id: 'alerts', label: 'Alerts & Toasts' },
  { id: 'cards', label: 'Cards' },
  { id: 'badges', label: 'Badges' },
  { id: 'loaders', label: 'Loaders & Skeletons' },
  { id: 'accessibility', label: 'Accessibility' },
];

// --- TOKENS ---
const colorTokens = {
  background: [
    { name: 'background', token: '--background', value: '45 20% 98%', role: 'Fondo principal' },
    { name: 'card', token: '--card', value: '45 15% 96%', role: 'Superficies elevadas' },
    { name: 'muted', token: '--muted', value: '40 15% 94%', role: 'Fondos sutiles' },
  ],
  text: [
    { name: 'foreground', token: '--foreground', value: '0 0% 11%', role: 'Texto principal' },
    { name: 'muted-foreground', token: '--muted-foreground', value: '0 0% 40%', role: 'Texto secundario' },
  ],
  action: [
    { name: 'primary', token: '--primary', value: '195 45% 25%', role: 'CTA principal' },
    { name: 'secondary', token: '--secondary', value: '35 20% 92%', role: 'Acción secundaria' },
    { name: 'accent', token: '--accent', value: '20 25% 45%', role: 'Acentos' },
    { name: 'destructive', token: '--destructive', value: '0 84.2% 60.2%', role: 'Acciones destructivas' },
  ],
  border: [
    { name: 'border', token: '--border', value: '40 15% 88%', role: 'Bordes estándar' },
    { name: 'ring', token: '--ring', value: '195 45% 25%', role: 'Anillo de focus' },
  ],
  brand: [
    { name: 'petrol', token: '--petrol', value: '195 45% 25%', role: 'Azul petróleo' },
    { name: 'terracotta', token: '--terracotta', value: '20 35% 45%', role: 'Acento cálido' },
    { name: 'cream', token: '--cream', value: '45 30% 96%', role: 'Off-white' },
    { name: 'charcoal', token: '--charcoal', value: '0 0% 15%', role: 'Textos oscuros' },
  ],
};

const typographyTokens = [
  { name: 'display-xl', size: '4rem / 64px', lh: '1.1', usage: 'Hero headlines' },
  { name: 'display-lg', size: '3rem / 48px', lh: '1.15', usage: 'Títulos de sección' },
  { name: 'display-md', size: '2.25rem / 36px', lh: '1.2', usage: 'Subtítulos' },
  { name: 'body-lg', size: '1.125rem / 18px', lh: '1.7', usage: 'Texto destacado' },
  { name: 'body', size: '1rem / 16px', lh: '1.7', usage: 'Texto base' },
  { name: 'caption', size: '0.875rem / 14px', lh: '1.5', usage: 'Labels, ayudas' },
  { name: 'micro', size: '0.75rem / 12px', lh: '1.4', usage: 'Texto mínimo' },
];

const spacingScale = [
  { name: '1', px: '4' }, { name: '2', px: '8' }, { name: '3', px: '12' },
  { name: '4', px: '16' }, { name: '6', px: '24' }, { name: '8', px: '32' },
  { name: '12', px: '48' }, { name: '16', px: '64' }, { name: '24', px: '96' },
];

// --- SMALL COMPONENTS ---
function CopyBtn({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => { await navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 1500); };
  return (
    <button onClick={copy} className="p-1 rounded hover:bg-muted transition-colors" title="Copiar">
      {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5 text-muted-foreground" />}
    </button>
  );
}

function ColorSwatch({ name, token, value, role }: { name: string; token: string; value: string; role: string }) {
  return (
    <div className="border border-border rounded-lg overflow-hidden bg-card">
      <div className="h-14 w-full" style={{ backgroundColor: `hsl(${value})` }} />
      <div className="p-3">
        <div className="flex items-center justify-between">
          <span className="font-medium text-sm">{name}</span>
          <CopyBtn text={`hsl(var(${token}))`} />
        </div>
        <code className="text-xs text-muted-foreground font-mono">{token}</code>
        <p className="text-micro text-muted-foreground mt-1">{role}</p>
      </div>
    </div>
  );
}

function Playground({ title, children, controls }: { title: string; children: React.ReactNode; controls?: React.ReactNode }) {
  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <div className="px-4 py-3 border-b border-border bg-card">
        <h4 className="font-medium text-sm">{title}</h4>
      </div>
      <div className="p-6 bg-background flex flex-wrap items-center gap-4">{children}</div>
      {controls && <div className="p-4 border-t border-border bg-muted/30">{controls}</div>}
    </div>
  );
}

// --- PAGE ---
export default function DesignSystem() {
  const hash = useHash();
  const [active, setActive] = useState('overview');
  const [search, setSearch] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [btnVariant, setBtnVariant] = useState<ButtonPlaygroundVariant>('default');
  const [btnSize, setBtnSize] = useState<ButtonPlaygroundSize>('default');
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [progress, setProgress] = useState(60);

  useEffect(() => {
    const id = hash.replace('#', '');
    if (id) {
      setActive(id);
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [hash]);

  const nav = (id: string) => { setActive(id); setSidebarOpen(false); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }); };
  const filtered = navItems.filter(i => i.label.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile header */}
      <header className="lg:hidden sticky top-0 z-50 bg-background border-b border-border px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(true)}><Menu className="w-5 h-5" /></Button>
          <span className="font-semibold">Design System</span>
        </div>
        <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">← Volver</Link>
      </header>

      {sidebarOpen && <div className="lg:hidden fixed inset-0 z-50 bg-background/80 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />}

      {/* Sidebar */}
      <aside className={cn(
        "fixed top-0 left-0 z-50 h-full w-64 bg-background border-r border-border transform transition-transform duration-300 lg:translate-x-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between mb-3">
            <Link href="/" className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1">
              <ChevronLeft className="w-4 h-4" /> Volver
            </Link>
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(false)}><X className="w-5 h-5" /></Button>
          </div>
          <h1 className="text-lg font-semibold mb-3">HAZ Design System</h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Buscar..." className="pl-9 h-9" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
        </div>
        <nav className="p-3 overflow-y-auto h-[calc(100vh-140px)]">
          <ul className="space-y-0.5">
            {filtered.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => nav(item.id)}
                  className={cn(
                    "w-full text-left px-3 py-2 rounded-md text-sm transition-colors",
                    active === item.id ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >{item.label}</button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main */}
      <main className="lg:ml-64 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 space-y-20">

          {/* OVERVIEW */}
          <section id="overview">
            <h2 className="text-display-md font-semibold mb-4">Overview</h2>
            <p className="text-body-lg text-muted-foreground mb-6">
              Sistema de diseño de HAZ Arquitectura. Tokens semánticos, componentes reutilizables y estándares de accesibilidad.
            </p>
            <Alert>
              <Info className="h-4 w-4" />
              <AlertTitle>Regla principal</AlertTitle>
              <AlertDescription>
                Usa siempre tokens semánticos (<code className="bg-muted px-1 rounded text-xs">bg-primary</code>) en lugar de valores directos (<code className="bg-muted px-1 rounded text-xs line-through">bg-[#1D4E5C]</code>).
              </AlertDescription>
            </Alert>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              {[
                { t: 'Sobriedad', d: 'Cada elemento tiene un propósito. Sin decoraciones innecesarias.' },
                { t: 'Credibilidad', d: 'Tipografía legible, colores consistentes y jerarquía visual clara.' },
                { t: 'Funcionalidad', d: 'Navegación intuitiva, estados claros y feedback inmediato.' },
              ].map(p => (
                <Card key={p.t}>
                  <CardHeader className="pb-2"><CardTitle className="text-base">{p.t}</CardTitle></CardHeader>
                  <CardContent><p className="text-sm text-muted-foreground">{p.d}</p></CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* COLORS */}
          <section id="colors">
            <h2 className="text-display-md font-semibold mb-4">Colors</h2>
            <p className="text-muted-foreground mb-6">Organizados por rol. Valores HSL. Dark mode soportado con clase <code className="bg-muted px-1 rounded text-xs">.dark</code>.</p>
            <Tabs defaultValue="action">
              <TabsList>
                <TabsTrigger value="action">Action</TabsTrigger>
                <TabsTrigger value="background">Background</TabsTrigger>
                <TabsTrigger value="text">Text</TabsTrigger>
                <TabsTrigger value="border">Border</TabsTrigger>
                <TabsTrigger value="brand">Brand</TabsTrigger>
              </TabsList>
              {Object.entries(colorTokens).map(([cat, tokens]) => (
                <TabsContent key={cat} value={cat}>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                    {tokens.map(t => <ColorSwatch key={t.name} {...t} />)}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </section>

          {/* TYPOGRAPHY */}
          <section id="typography">
            <h2 className="text-display-md font-semibold mb-4">Typography</h2>
            <p className="text-muted-foreground mb-6">
              <strong>Inter</strong> para textos · <strong>Playfair Display</strong> para display opcional.
            </p>
            <div className="space-y-3">
              {typographyTokens.map(t => (
                <div key={t.name} className="border border-border rounded-lg p-4 bg-card flex flex-col sm:flex-row sm:items-center gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <code className="text-xs bg-muted px-2 py-0.5 rounded font-mono">text-{t.name}</code>
                      <CopyBtn text={`text-${t.name}`} />
                    </div>
                    <p className={cn(
                      t.name === 'display-xl' && 'text-display-xl',
                      t.name === 'display-lg' && 'text-display-lg',
                      t.name === 'display-md' && 'text-display-md',
                      t.name === 'body-lg' && 'text-body-lg',
                      t.name === 'body' && 'text-body',
                      t.name === 'caption' && 'text-caption',
                      t.name === 'micro' && 'text-micro',
                    )}>Ejemplo de texto</p>
                  </div>
                  <div className="flex gap-6 text-sm text-muted-foreground">
                    <div><span className="text-micro opacity-60 block">Size</span>{t.size}</div>
                    <div><span className="text-micro opacity-60 block">LH</span>{t.lh}</div>
                    <div><span className="text-micro opacity-60 block">Uso</span>{t.usage}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* SPACING */}
          <section id="spacing">
            <h2 className="text-display-md font-semibold mb-4">Spacing & Layout</h2>
            <p className="text-muted-foreground mb-6">Sistema 8pt. Usa estos valores para padding, margin y gaps.</p>

            <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-3 mb-8">
              {spacingScale.map(s => (
                <div key={s.name} className="border border-border rounded-lg p-2 bg-card text-center">
                  <div className="bg-primary mx-auto mb-2" style={{ width: `${s.px}px`, height: '6px', maxWidth: '100%' }} />
                  <code className="text-xs font-mono">{s.name}</code>
                  <p className="text-micro text-muted-foreground">{s.px}px</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                { t: '.section-padding', d: 'py-16 md:py-24 lg:py-32' },
                { t: '.section-padding-sm', d: 'py-12 md:py-16 lg:py-20' },
                { t: '.container-wide', d: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8' },
                { t: '.container-narrow', d: 'max-w-5xl mx-auto px-4 sm:px-6 lg:px-8' },
              ].map(s => (
                <div key={s.t} className="border border-border rounded-lg p-3 bg-card">
                  <div className="flex items-center justify-between">
                    <code className="text-xs font-mono">{s.t}</code>
                    <CopyBtn text={s.t} />
                  </div>
                  <p className="text-micro text-muted-foreground mt-1">{s.d}</p>
                </div>
              ))}
            </div>
          </section>

          {/* RADIUS & SHADOWS */}
          <section id="radius-shadows">
            <h2 className="text-display-md font-semibold mb-4">Radius & Shadows</h2>

            <h3 className="text-lg font-semibold mb-3">Border Radius</h3>
            <div className="grid grid-cols-3 gap-4 mb-8">
              {[
                { cls: 'rounded-sm', val: '2px' },
                { cls: 'rounded-md', val: '4px' },
                { cls: 'rounded-lg', val: '6px' },
              ].map(r => (
                <div key={r.cls} className="border border-border rounded-lg p-4 bg-card flex items-center gap-3">
                  <div className={cn("w-12 h-12 bg-primary", r.cls)} />
                  <div>
                    <code className="text-sm font-mono">{r.cls}</code>
                    <p className="text-micro text-muted-foreground">{r.val}</p>
                  </div>
                </div>
              ))}
            </div>

            <h3 className="text-lg font-semibold mb-3">Shadows</h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { cls: 'shadow-sm', label: 'shadow-sm', desc: 'Elevación mínima', style: { boxShadow: 'var(--shadow-sm)' } },
                { cls: 'shadow-card', label: 'shadow-card', desc: 'Tarjetas' },
                { cls: 'shadow-elevated', label: 'shadow-elevated', desc: 'Hover' },
                { cls: 'shadow-prominent', label: 'shadow-prominent', desc: 'Modales' },
              ].map(s => (
                <div key={s.label} className={cn("p-4 bg-background rounded-lg", s.cls)} style={s.style}>
                  <code className="text-sm font-mono block mb-1">{s.label}</code>
                  <p className="text-micro text-muted-foreground">{s.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* BUTTONS */}
          <section id="buttons">
            <h2 className="text-display-md font-semibold mb-4">Buttons</h2>

            <Playground
              title="Playground"
              controls={
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2">
                    <Label className="text-sm">Variant:</Label>
                    <Select
                      value={btnVariant}
                      onValueChange={(v) =>
                        setBtnVariant(v as ButtonPlaygroundVariant)
                      }
                    >
                      <SelectTrigger className="w-28 h-8"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {['default','destructive','outline','secondary','ghost','link','hero','hero-outline','subtle','cta'].map(v => (
                          <SelectItem key={v} value={v}>{v}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center gap-2">
                    <Label className="text-sm">Size:</Label>
                    <Select
                      value={btnSize}
                      onValueChange={(v) =>
                        setBtnSize(v as ButtonPlaygroundSize)
                      }
                    >
                      <SelectTrigger className="w-20 h-8"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {['sm','default','lg','xl','icon'].map(v => (
                          <SelectItem key={v} value={v}>{v}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <label className="flex items-center gap-2 cursor-pointer text-sm">
                    <input type="checkbox" checked={btnDisabled} onChange={e => setBtnDisabled(e.target.checked)} className="rounded" />
                    Disabled
                  </label>
                </div>
              }
            >
              <Button variant={btnVariant} size={btnSize} disabled={btnDisabled}>
                {btnSize === 'icon' ? <Check /> : 'Button'}
              </Button>
            </Playground>

            <h3 className="text-lg font-semibold mt-6 mb-3">Variantes</h3>
            <div className="flex flex-wrap gap-3">
              {(['default','destructive','outline','secondary','ghost','link'] as const).map(v => (
                <div key={v} className="text-center">
                  <Button variant={v} size="sm">{v}</Button>
                </div>
              ))}
            </div>

            <h3 className="text-lg font-semibold mt-6 mb-3">Estados</h3>
            <div className="flex flex-wrap gap-4">
              <Button>Default</Button>
              <Button className="ring-2 ring-ring ring-offset-2">Focus</Button>
              <Button disabled>Disabled</Button>
              <Button disabled><Loader2 className="w-4 h-4 animate-spin mr-2" />Loading</Button>
            </div>
          </section>

          {/* INPUTS & FORMS */}
          <section id="inputs">
            <h2 className="text-display-md font-semibold mb-4">Inputs & Forms</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Estados</h3>
                <div><Label>Default</Label><Input placeholder="Escribe aquí..." className="mt-1" /></div>
                <div><Label>Focus</Label><Input placeholder="Con foco" className="mt-1 ring-2 ring-ring ring-offset-2" /></div>
                <div>
                  <Label className="text-destructive">Error</Label>
                  <Input placeholder="Campo con error" className="mt-1 border-destructive" />
                  <p className="text-sm text-destructive mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />Campo requerido</p>
                </div>
                <div><Label className="text-muted-foreground">Disabled</Label><Input placeholder="Deshabilitado" disabled className="mt-1" /></div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Otros campos</h3>
                <div>
                  <Label>Select</Label>
                  <Select>
                    <SelectTrigger className="mt-1"><SelectValue placeholder="Selecciona..." /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="a">Opción A</SelectItem>
                      <SelectItem value="b">Opción B</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Textarea</Label>
                  <Textarea placeholder="Mensaje largo..." className="mt-1" />
                </div>
                <div>
                  <Label>Con helper + validación</Label>
                  <Input className="mt-1 border-green-500" defaultValue="+52 55 1234 5678" />
                  <p className="text-sm text-green-600 mt-1 flex items-center gap-1"><CheckCircle className="w-3 h-3" />Formato válido</p>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-muted/50 rounded-lg">
              <h4 className="font-medium text-sm mb-2">Reglas de formularios</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Todos los inputs deben tener <code className="bg-muted px-1 rounded text-xs">Label</code> asociado con <code className="bg-muted px-1 rounded text-xs">htmlFor</code></li>
                <li>• Errores con <code className="bg-muted px-1 rounded text-xs">aria-describedby</code> conectado al mensaje</li>
                <li>• Mensajes de error: describir qué falló y cómo resolverlo</li>
                <li>• Campos requeridos marcados con asterisco (*)</li>
              </ul>
            </div>
          </section>

          {/* ALERTS */}
          <section id="alerts">
            <h2 className="text-display-md font-semibold mb-4">Alerts & Toasts</h2>
            <div className="space-y-4 max-w-2xl">
              <Alert>
                <Info className="h-4 w-4" />
                <AlertTitle>Información</AlertTitle>
                <AlertDescription>Mensaje informativo para el usuario.</AlertDescription>
              </Alert>
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>Algo salió mal. Por favor intenta de nuevo.</AlertDescription>
              </Alert>
            </div>
            <h3 className="text-lg font-semibold mt-6 mb-3">Toast (preview)</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg">
              <div className="border border-border rounded-md p-3 bg-background">
                <p className="font-medium text-sm">Cambios guardados</p>
                <p className="text-sm text-muted-foreground">Tu información ha sido actualizada.</p>
              </div>
              <div className="border border-destructive rounded-md p-3 bg-destructive text-destructive-foreground">
                <p className="font-medium text-sm">Error</p>
                <p className="text-sm opacity-90">No se pudo completar la acción.</p>
              </div>
            </div>
          </section>

          {/* CARDS */}
          <section id="cards">
            <h2 className="text-display-md font-semibold mb-4">Cards</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader><CardTitle className="text-base">Card estándar</CardTitle><CardDescription>Con borde y sombra sutil</CardDescription></CardHeader>
                <CardContent><p className="text-sm text-muted-foreground">Contenido de la tarjeta.</p></CardContent>
              </Card>
              <Card className="card-hover cursor-pointer">
                <CardHeader><CardTitle className="text-base">Card interactiva</CardTitle><CardDescription>Con efecto hover</CardDescription></CardHeader>
                <CardContent><p className="text-sm text-muted-foreground">Hover para ver elevación. Usa clase <code className="bg-muted px-1 rounded text-xs">card-hover</code>.</p></CardContent>
              </Card>
            </div>
          </section>

          {/* BADGES */}
          <section id="badges">
            <h2 className="text-display-md font-semibold mb-4">Badges</h2>
            <Playground title="Variantes">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="destructive">Destructive</Badge>
              <Badge variant="outline">Outline</Badge>
            </Playground>
          </section>

          {/* LOADERS */}
          <section id="loaders">
            <h2 className="text-display-md font-semibold mb-4">Loaders & Skeletons</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">Spinners</h3>
                <div className="flex items-center gap-4">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <Loader2 className="w-6 h-6 animate-spin text-primary" />
                  <Button disabled><Loader2 className="w-4 h-4 animate-spin mr-2" />Cargando...</Button>
                </div>
                <h3 className="text-lg font-semibold mt-6 mb-3">Progress</h3>
                <Progress value={progress} className="mb-2" />
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => setProgress(Math.max(0, progress - 20))}>-20</Button>
                  <Button size="sm" variant="outline" onClick={() => setProgress(Math.min(100, progress + 20))}>+20</Button>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3">Skeleton</h3>
                <div className="flex items-center gap-4 mb-4">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                </div>
                <Skeleton className="h-24 w-full" />
              </div>
            </div>
          </section>

          {/* ACCESSIBILITY */}
          <section id="accessibility">
            <h2 className="text-display-md font-semibold mb-4">Accessibility</h2>
            <p className="text-muted-foreground mb-6">Estándar WCAG AA. Contraste mínimo 4.5:1.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="p-4 bg-background border border-border rounded-lg">
                <div className="flex items-center gap-2 mb-1"><CheckCircle className="w-4 h-4 text-green-600" /><span className="font-medium text-sm">Texto en fondo claro</span></div>
                <p className="text-sm text-muted-foreground">Ratio ~12:1 ✓</p>
              </div>
              <div className="p-4 bg-primary text-primary-foreground rounded-lg">
                <div className="flex items-center gap-2 mb-1"><CheckCircle className="w-4 h-4" /><span className="font-medium text-sm">Texto en primario</span></div>
                <p className="text-sm">Ratio ~8:1 ✓</p>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Reglas</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { t: 'Focus visible', d: 'ring-2 ring-ring ring-offset-2 en todos los controles' },
                  { t: 'Teclado', d: 'Tab navegar · Enter/Space activar · Escape cerrar' },
                  { t: 'Imágenes', d: 'alt="Descripción del contenido" siempre presente' },
                  { t: 'Formularios', d: 'Label + htmlFor + aria-describedby para errores' },
                ].map(r => (
                  <div key={r.t} className="border border-border rounded-lg p-3 bg-card">
                    <h4 className="font-medium text-sm">{r.t}</h4>
                    <p className="text-micro text-muted-foreground mt-1">{r.d}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
