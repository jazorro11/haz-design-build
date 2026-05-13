import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { InteriorPageHero } from '@/components/layout/InteriorPageHero';
import { OptimizedImage } from '@/components/OptimizedImage';
import designExecutionPhoto from '@/assets/celta-1.png';
import aboutHeroImg from '@/assets/about-hero.jpg';

const milestones = [
  { year: '1993', event: 'Fundación de HAZ Arquitectura en Bogotá' },
  { year: '2000', event: 'Primer proyecto institucional de gran escala' },
  { year: '2008', event: 'Expansión al sector corporativo y retail' },
  { year: '2015', event: 'Implementación de metodología BIM en proyectos complejos' },
  { year: '2020', event: 'Certificación en construcción sostenible' },
  { year: '2023', event: 'Más de 100 proyectos completados en todo el territorio nacional' },
];

const values = [
  {
    title: 'Integridad',
    description: 'Compromiso con la honestidad y transparencia en cada proyecto y relación.',
  },
  {
    title: 'Excelencia',
    description: 'Búsqueda constante de la calidad en diseño, ejecución y servicio.',
  },
  {
    title: 'Colaboración',
    description: 'Trabajo en equipo con clientes, consultores y constructores.',
  },
  {
    title: 'Responsabilidad',
    description: 'Compromiso con los plazos, presupuestos y el impacto ambiental.',
  },
];

export default function About() {
  return (
    <>
      <InteriorPageHero
        title="Sobre HAZ"
        textClassName="max-w-3xl"
        bgImage={aboutHeroImg}
        description={
          <p className="leading-relaxed">
            HAZ Arquitectura es una firma colombiana con más de 30 años de experiencia
            integrando diseño arquitectónico y ejecución de obra. Nuestra propuesta de
            valor se centra en la capacidad de llevar proyectos desde el concepto hasta
            la entrega, garantizando coherencia, calidad y control.
          </p>
        }
      />

      {/* Diferenciador — split text + imagen */}
      <section className="section-padding-after-hero">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="haz-label text-muted-foreground mb-6">Nuestra propuesta</p>
              <h2 className="text-display-md font-light tracking-[-0.01em] mb-6">
                Diseño + Ejecución
              </h2>
              <p className="text-body-lg text-muted-foreground mb-8">
                A diferencia de firmas que solo diseñan o constructoras que solo
                ejecutan, en HAZ integramos ambas disciplinas:
              </p>
              <ul className="space-y-5">
                {[
                  ['Coherencia', 'El proyecto construido refleja fielmente la visión original.'],
                  ['Control', 'Un solo responsable del diseño al acabado.'],
                  ['Eficiencia', 'Optimización de tiempos y costos desde el diseño.'],
                ].map(([label, text]) => (
                  <li key={label} className="flex items-start gap-4">
                    <span className="w-4 h-px bg-accent flex-shrink-0 mt-[14px]" />
                    <span className="text-muted-foreground">
                      <strong className="text-foreground font-medium">{label}:</strong>{' '}
                      {text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative aspect-square w-full overflow-hidden">
              <OptimizedImage
                src={designExecutionPhoto}
                alt="Ejecución de obra: coordinación en sitio."
                sizes="(min-width: 1024px) min(50vw, 40rem), 100vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Trayectoria — lista editorial, sin imagen de fondo */}
      <section
        data-testid="about-trajectory-section"
        className="bg-card section-padding"
      >
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <p className="haz-label text-muted-foreground mb-4">Historia</p>
              <h2 className="text-display-md font-light tracking-[-0.01em]">
                Nuestra trayectoria
              </h2>
            </div>
            <div className="divide-y divide-border">
              {milestones.map((milestone) => (
                <div key={milestone.year} className="py-5 flex gap-8 items-baseline">
                  <span className="text-lg font-light text-accent tabular-nums shrink-0 w-12">
                    {milestone.year}
                  </span>
                  <p className="text-muted-foreground">{milestone.event}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Valores — lista plana sin cards */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="mb-16">
            <p className="haz-label text-muted-foreground mb-4">Cultura</p>
            <h2 className="text-display-md font-light tracking-[-0.01em]">
              Nuestros valores
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 border-t border-l border-border">
            {values.map((value) => (
              <div key={value.title} className="p-8 md:p-10 border-r border-b border-border">
                <h3 className="text-lg font-medium mb-3">{value.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-foreground text-background">
        <div className="container-wide">
          <div className="max-w-2xl">
            <p className="haz-label text-background/40 mb-6">Conversemos</p>
            <h2 className="text-display-md font-light tracking-[-0.01em] text-background mb-4">
              Conózcanos personalmente
            </h2>
            <p className="text-body-lg text-background/60 mb-8">
              Agende una reunión para conocer nuestro equipo y metodología de trabajo.
            </p>
            <Link href="/contacto" className="haz-link-arrow text-background">
              Agendar reunión <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
