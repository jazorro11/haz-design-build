'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import logoMark from '@/assets/logo.png';

const navigation = [
  { name: 'Proyectos', href: '/proyectos' },
  { name: 'Servicios', href: '/servicios' },
  { name: 'Sobre HAZ', href: '/sobre-haz' },
  { name: 'Contacto', href: '/contacto' },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-border'
          : 'bg-transparent'
      )}
    >
      <div className="container-wide">
        <nav className="flex items-center justify-between h-20">
          {/* Brand */}
          <Link
            href="/"
            className="flex items-center gap-3 text-foreground hover:text-foreground/80 transition-colors"
          >
            <Image
              src={logoMark}
              alt=""
              width={logoMark.width}
              height={logoMark.height}
              priority
              className="h-7 w-auto shrink-0 object-contain"
            />
            <span className="text-[18px] tracking-[-0.01em]">
              <span className="font-semibold">HAZ</span>
              <span className="font-light ml-1">Arquitectura</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-9">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'text-[12px] font-semibold tracking-[0.12em] uppercase transition-colors',
                  pathname === item.href
                    ? 'haz-nav-active'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* CTA + Mobile Menu Toggle */}
          <div className="flex items-center gap-4">
            <Button
              variant="cta"
              size="sm"
              className="hidden sm:inline-flex bg-accent text-accent-foreground hover:bg-[#1E3A63] rounded-none shadow-none text-[12px] font-semibold tracking-[0.12em] uppercase px-5 py-[10px] h-auto"
              asChild
            >
              <Link href="/contacto">Hablemos</Link>
            </Button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-foreground hover:text-muted-foreground transition-colors focus-ring"
              aria-label={isMobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          'lg:hidden absolute top-full left-0 right-0 bg-white border-b border-border transition-all duration-300 overflow-hidden',
          isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <div className="container-wide py-6 space-y-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'block py-3 text-[14px] font-semibold tracking-[0.08em] uppercase transition-colors',
                pathname === item.href
                  ? 'text-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {item.name}
            </Link>
          ))}
          <div className="pt-4">
            <Button
              variant="cta"
              className="w-full bg-accent text-accent-foreground hover:bg-[#1E3A63] rounded-none shadow-none text-[12px] font-semibold tracking-[0.12em] uppercase py-[15px] h-auto"
              asChild
            >
              <Link href="/contacto">Hablemos</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
