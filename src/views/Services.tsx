import Link from 'next/link';
import { InteriorPageHero } from '@/components/layout/InteriorPageHero';
import { OptimizedImage } from '@/components/OptimizedImage';
import { Button } from '@/components/ui/button';
import { services, processSteps } from '@/data/services';
import processSectionBg from '@/assets/maqueta.png';
import { Compass, FileStack, HardHat, Users, Wrench, ArrowRight } from 'lucide-react';

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

      {/* Process */}
      <section
        data-testid="services-process-section"
        className="relative overflow-hidden section-padding"
      >
        <div
          className="pointer-events-none absolute inset-0 z-0"
          aria-hidden
        >
          <OptimizedImage
            src={processSectionBg}
            alt=""
            sizes="100vw"
            className="scale-[1.02] object-cover"
          />
          {/* Mismo patrón que InteriorPageHero: wash claro a la izquierda, imagen más visible a la derecha */}
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-background/30" />
        </div>

        <div className="relative z-10 container-wide">
          <div
            data-testid="services-process-intro"
            className="mx-auto mb-16 max-w-5xl px-4 text-center sm:px-8"
          >
            <h2 className="text-display-md font-semibold mb-4 text-foreground">
              Cómo trabajamos
            </h2>
            <p className="text-body-lg mx-auto max-w-3xl leading-relaxed text-muted-foreground">
              Nuestro proceso está diseñado para garantizar claridad, control y
              resultados predecibles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {processSteps.map((step, index) => (
              <div
                key={step.number}
                className="relative flex h-full flex-col rounded-lg border border-border bg-background p-6"
              >
                <div className="text-5xl font-light text-primary/20 mb-4">
                  {step.number}
                </div>
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="flex-1 text-caption text-muted-foreground">
                  {step.description}
                </p>
                <span className="mt-auto block border-t border-border/50 pt-3 text-center text-micro font-semibold uppercase tracking-wide text-primary tabular-nums">
                  {step.duration}
                </span>
                
                {index < processSteps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 text-border z-10">
                    <ArrowRight size={24} />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div
            data-testid="services-process-footnote"
            className="mx-auto mt-10 max-w-3xl px-4 text-center sm:px-6"
          >
            <p className="text-caption leading-relaxed text-muted-foreground">
              * Los tiempos son estimados y varían según la complejidad del proyecto.
            </p>
          </div>
        </div>
      </section>

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
