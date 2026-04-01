import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { SEO } from '@/components/SEO';
import { Button } from '@/components/ui/button';

const milestones = [
  { year: '1993', event: 'Fundación de HAZ Arquitectura en Bogotá' },
  { year: '2000', event: 'Primer proyecto internacional' },
  { year: '2008', event: 'Expansión al sector corporativo' },
  { year: '2015', event: 'Implementación de metodología BIM' },
  { year: '2020', event: 'Certificación en construcción sostenible' },
  { year: '2023', event: '+100 proyectos completados' },
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
    <Layout>
      {/* Header */}
      <section className="section-padding bg-card border-b border-border">
        <div className="container-wide">
          <div className="max-w-3xl">
            <h1 className="text-display-md font-semibold mb-6">Sobre HAZ</h1>
            <p className="text-body-lg text-muted-foreground leading-relaxed">
              HAZ Arquitectura es una firma colombiana con más de 30 años de experiencia 
              integrando diseño arquitectónico y ejecución de obra. Nuestra propuesta 
              de valor se centra en la capacidad de llevar proyectos desde el concepto 
              hasta la entrega, garantizando coherencia, calidad y control.
            </p>
          </div>
        </div>
      </section>

      {/* Differentiator */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-display-md font-semibold mb-6">
                Diseño + Ejecución
              </h2>
              <p className="text-body-lg text-muted-foreground mb-6">
                A diferencia de firmas que solo diseñan o constructoras que solo 
                ejecutan, en HAZ integramos ambas disciplinas. Esto nos permite:
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-primary shrink-0 mt-2" />
                  <span className="text-muted-foreground">
                    <strong className="text-foreground">Coherencia:</strong> El proyecto 
                    construido refleja fielmente la visión original.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-primary shrink-0 mt-2" />
                  <span className="text-muted-foreground">
                    <strong className="text-foreground">Control:</strong> Un solo 
                    responsable del diseño al acabado.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-primary shrink-0 mt-2" />
                  <span className="text-muted-foreground">
                    <strong className="text-foreground">Eficiencia:</strong> Optimización 
                    de tiempos y costos desde el diseño.
                  </span>
                </li>
              </ul>
            </div>
            <div className="aspect-square rounded-lg bg-muted flex items-center justify-center">
              <span className="text-6xl font-light text-muted-foreground/50">HAZ</span>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding bg-card">
        <div className="container-wide">
          <h2 className="text-display-md font-semibold mb-12 text-center">
            Nuestra trayectoria
          </h2>
          <div className="max-w-3xl mx-auto">
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex gap-6">
                  <div className="w-16 shrink-0 text-right">
                    <span className="text-lg font-semibold text-primary">
                      {milestone.year}
                    </span>
                  </div>
                  <div className="relative pb-8">
                    <div className="absolute left-0 top-2 w-3 h-3 rounded-full bg-primary" />
                    {index < milestones.length - 1 && (
                      <div className="absolute left-1.5 top-5 w-px h-full bg-border" />
                    )}
                    <p className="pl-8 text-muted-foreground">{milestone.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding">
        <div className="container-wide">
          <h2 className="text-display-md font-semibold mb-12 text-center">
            Nuestros valores
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="p-6 rounded-lg border border-border">
                <h3 className="text-lg font-semibold mb-3">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-foreground text-background">
        <div className="container-narrow text-center">
          <h2 className="text-display-md font-semibold mb-4">
            Conózcanos personalmente
          </h2>
          <p className="text-body-lg text-background/70 mb-8">
            Agende una reunión para conocer nuestro equipo y metodología de trabajo.
          </p>
          <Button
            variant="hero-outline"
            size="xl"
            className="border-background/40 text-background hover:bg-background hover:text-foreground"
            asChild
          >
            <Link to="/contacto">Agendar reunión</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
}
