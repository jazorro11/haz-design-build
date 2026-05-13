import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { InteriorPageHero } from '@/components/layout/InteriorPageHero';
import { ProcessStepsSection } from '@/components/sections/ProcessStepsSection';
import { services } from '@/data/services';
import servicesHeroImg from '@/assets/services-hero.jpg';

export default function Services() {
  return (
    <>
      <InteriorPageHero
        title="Servicios"
        description={
          <>
            Servicio integral desde el diseño conceptual hasta la entrega de obra terminada.
          </>
        }
        bgImage={servicesHeroImg}
      />

      {/* Lista editorial de servicios */}
      <section className="section-padding-after-hero">
        <div className="container-wide">
          <div className="divide-y divide-border">
            {services.map((service, index) => (
              <div key={service.id} className="py-12 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
                {/* Número */}
                <div className="md:col-span-1">
                  <span className="text-5xl font-light text-accent opacity-20 leading-none tabular-nums">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
                {/* Título */}
                <div className="md:col-span-3">
                  <h2 className="text-xl font-medium leading-snug">{service.title}</h2>
                </div>
                {/* Descripción + features */}
                <div className="md:col-span-8">
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  <ul className="space-y-3">
                    {service.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-start gap-4 text-foreground text-[14px]">
                        <span className="w-4 h-px bg-border flex-shrink-0 mt-[10px]" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ProcessStepsSection
        title="Cómo trabajamos"
        description={
          <>
            Nuestro proceso está diseñado para garantizar claridad, control y
            resultados predecibles.
          </>
        }
        testIds={{
          section: 'services-process-section',
          intro: 'services-process-intro',
          footnote: 'services-process-footnote',
        }}
      />

      {/* CTA */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="max-w-2xl border-l-2 border-accent pl-6">
            <p className="haz-label text-muted-foreground mb-4">Siguiente paso</p>
            <h2 className="text-display-md font-light tracking-[-0.01em] mb-4">
              ¿Listo para comenzar?
            </h2>
            <p className="text-body-lg text-muted-foreground mb-8">
              Cuéntenos sobre su proyecto y le daremos una propuesta personalizada.
            </p>
            <Link href="/contacto" className="haz-link-arrow">
              Solicitar cotización <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
