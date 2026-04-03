import Link from 'next/link';
import { SITE_TAGLINE } from '@/lib/site';

const navigation = {
  main: [
    { name: 'Proyectos', href: '/proyectos' },
    { name: 'Servicios', href: '/servicios' },
    { name: 'Sobre HAZ', href: '/sobre-haz' },
    { name: 'Contacto', href: '/contacto' },
  ],
};

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-background">
      <div className="container-wide section-padding-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block text-2xl font-semibold tracking-tight mb-4">
              HAZ
              <span className="font-light ml-1">Arquitectura</span>
            </Link>
            <p className="text-background/70 max-w-md mb-6">
              Más de 30 años integrando diseño arquitectónico y ejecución de obra para 
              entregar proyectos sólidos y funcionales.
            </p>
            <p className="text-caption text-background/50">
              {SITE_TAGLINE}.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-caption font-semibold uppercase tracking-wider mb-4 text-background/50">
              Navegación
            </h4>
            <ul className="space-y-3">
              {navigation.main.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-background/70 hover:text-background transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-caption font-semibold uppercase tracking-wider mb-4 text-background/50">
              Contacto
            </h4>
            <div>
              <p className="text-caption text-background/50 mb-2">Bogotá, Colombia</p>
              <a
                href="mailto:contacto@hazarquitectura.com"
                className="text-background/70 hover:text-background transition-colors"
              >
                contacto@hazarquitectura.com
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-background/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-micro text-background/50">
            © {currentYear} HAZ Arquitectura. Todos los derechos reservados.
          </p>
          <div className="flex gap-6">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-micro text-background/50 hover:text-background transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-micro text-background/50 hover:text-background transition-colors"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
