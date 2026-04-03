import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { services, processSteps } from '@/data/services';
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
      {/* Header */}
      <section className="section-padding-sm bg-card border-b border-border">
        <div className="container-wide">
          <h1 className="text-display-md font-semibold mb-4">Servicios</h1>
          <p className="text-body-lg text-muted-foreground max-w-2xl">
            Ofrecemos un servicio integral que abarca desde el diseño conceptual 
            hasta la entrega de obra terminada.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding">
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
      <section className="section-padding bg-card">
        <div className="container-wide">
          <div className="text-center mb-16">
            <h2 className="text-display-md font-semibold mb-4">Cómo trabajamos</h2>
            <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto">
              Nuestro proceso está diseñado para garantizar claridad, control y 
              resultados predecibles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {processSteps.map((step, index) => (
              <div
                key={step.number}
                className="relative bg-background rounded-lg p-6 border border-border"
              >
                <div className="text-5xl font-light text-primary/20 mb-4">
                  {step.number}
                </div>
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-caption text-muted-foreground mb-4">
                  {step.description}
                </p>
                <span className="text-micro text-primary font-semibold uppercase tracking-wide">
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

          <p className="text-center text-caption text-muted-foreground mt-8">
            * Los tiempos son estimados y varían según la complejidad del proyecto.
          </p>
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
