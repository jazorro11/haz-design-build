import Link from 'next/link';
import { InteriorPageHero } from '@/components/layout/InteriorPageHero';
import { ProcessStepsSection } from '@/components/sections/ProcessStepsSection';
import { Button } from '@/components/ui/button';
import { services } from '@/data/services';
import { Compass, FileStack, HardHat, Users, Wrench } from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  Compass,
  FileStack,
  HardHat,
  Users,
  Wrench,
};

export default function Services() {
  return (
    <>
      <InteriorPageHero
        title="Servicios"
        description={
          <>
            Ofrecemos un servicio integral que abarca desde el diseño conceptual
            hasta la entrega de obra terminada.
          </>
        }
      />

      {/* Services Grid */}
      <section className="section-padding-after-hero">
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => {
              const Icon = iconMap[service.icon];
              return (
                <div
                  key={service.id}
                  className="p-8 rounded-lg border border-border bg-card hover:shadow-elevated transition-shadow"
                >
                  <Icon className="w-12 h-12 text-primary mb-6" />
                  <h2 className="text-xl font-semibold mb-4">{service.title}</h2>
                  <p className="text-muted-foreground mb-6">{service.description}</p>
                  <ul className="space-y-3">
                    {service.features.map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-3 text-muted-foreground"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
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
        <div className="container-narrow text-center">
          <h2 className="text-display-md font-semibold mb-4">
            ¿Listo para comenzar?
          </h2>
          <p className="text-body-lg text-muted-foreground mb-8">
            Cuéntenos sobre su proyecto y le daremos una propuesta personalizada.
          </p>
          <Button variant="hero" asChild>
            <Link href="/contacto">Solicitar cotización</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
