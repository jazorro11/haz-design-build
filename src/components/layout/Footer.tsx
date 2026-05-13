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
    <footer className="bg-[#111111] text-white">
      <div className="container-wide section-padding-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-8">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-block mb-5">
              <span className="text-[18px] tracking-[-0.01em]">
                <span className="font-semibold">HAZ</span>
                <span className="font-light ml-1">Arquitectura</span>
              </span>
            </Link>
            <p className="text-[14px] text-white/70 max-w-sm leading-[1.7] mb-5">
              Más de 30 años integrando diseño arquitectónico y ejecución de obra en Colombia
              para entregar proyectos sólidos y funcionales.
            </p>
            <p className="text-[12px] tracking-[0.12em] uppercase text-white/50">
              {SITE_TAGLINE}.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.12em] mb-5 text-white/50">
              Navegación
            </h4>
            <ul className="space-y-3">
              {navigation.main.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-[14px] text-white/70 hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.12em] mb-5 text-white/50">
              Contacto
            </h4>
            <ul className="space-y-3">
              <li className="text-[14px] text-white/70">Bogotá, Colombia</li>
              <li className="text-[14px] text-white/70">contacto@hazarquitectura.co</li>
              <li className="text-[14px] text-white/70">+57 (601) 555 0123</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-[11px] tracking-[0.08em] uppercase text-white/50">
            © {currentYear} HAZ Arquitectura. Todos los derechos reservados.
          </p>
          <div className="flex gap-6">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] tracking-[0.08em] uppercase text-white/50 hover:text-white transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] tracking-[0.08em] uppercase text-white/50 hover:text-white transition-colors"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
