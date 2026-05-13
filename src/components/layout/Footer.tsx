import Link from 'next/link';
import { SITE_TAGLINE } from '@/lib/site';

const navigation = [
  { name: 'Proyectos', href: '/proyectos' },
  { name: 'Servicios', href: '/servicios' },
  { name: 'Sobre HAZ', href: '/sobre-haz' },
  { name: 'Contacto', href: '/contacto' },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-background">
      <div className="container-wide section-padding-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Marca */}
          <div>
            <Link href="/" className="inline-block text-2xl font-semibold tracking-tight mb-4">
              HAZ
              <span className="font-light ml-1">Arquitectura</span>
            </Link>
            <p className="text-caption text-background/60 leading-relaxed">
              {SITE_TAGLINE}.
            </p>
          </div>

          {/* Navegación */}
          <div>
            <p className="haz-label text-background/40 mb-5">Navegación</p>
            <ul className="space-y-3">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-background/70 hover:text-background transition-colors text-caption"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <p className="haz-label text-background/40 mb-5">Contacto</p>
            <ul className="space-y-3 text-caption text-background/70">
              <li>Bogotá, Colombia</li>
              <li>
                <a
                  href="mailto:contacto@haz-arquitectura.com"
                  className="hover:text-background transition-colors"
                >
                  contacto@haz-arquitectura.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+5716000000"
                  className="hover:text-background transition-colors"
                >
                  +57 (1) 600 0000
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-background/10">
          <p className="text-micro text-background/40">
            © {currentYear} HAZ Arquitectura. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
