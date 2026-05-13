'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
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
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 bg-background transition-colors duration-200',
        isScrolled ? 'border-b border-border' : 'border-b border-transparent'
      )}
    >
      <div className="container-wide">
        <nav className="flex items-center justify-between h-18 md:h-22">
          {/* Logo / wordmark */}
          <Link
            href="/"
            className="flex items-center gap-2 md:gap-3 text-foreground hover:text-accent transition-colors"
          >
            <Image
              src={logoMark}
              alt=""
              width={logoMark.width}
              height={logoMark.height}
              priority
              className="h-7 w-auto md:h-8 shrink-0 object-contain"
            />
            <span className="text-xl md:text-2xl font-semibold tracking-tight">
              HAZ
              <span className="font-light ml-1">Arquitectura</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'text-caption font-medium tracking-wide uppercase transition-colors',
                  pathname === item.href
                    ? 'haz-nav-active'
                    : 'text-muted-foreground hover:text-foreground link-underline'
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-foreground hover:text-accent transition-colors focus-ring"
            aria-label={isMobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          'lg:hidden absolute top-full left-0 right-0 bg-background border-b border-border transition-all duration-300 overflow-hidden',
          isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <div className="container-wide py-6 space-y-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'block py-3 text-lg font-medium transition-colors',
                pathname === item.href
                  ? 'text-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
