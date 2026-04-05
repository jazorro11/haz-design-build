import Link from 'next/link';
import { ArrowLeft, MapPin, Calendar, Ruler, Users } from 'lucide-react';
import { InteriorPageHero } from '@/components/layout/InteriorPageHero';
import { OptimizedImage } from '@/components/OptimizedImage';
import { ProjectGallery } from '@/components/projects/ProjectGallery';
import { Button } from '@/components/ui/button';
import type { Project, ProjectStatus } from '@/data/projects';

const statusLabels: Record<ProjectStatus, string> = {
  completed: 'Terminado',
  'in-progress': 'En obra',
};

const roleLabels: Record<string, string> = {
  design: 'Diseño',
  execution: 'Ejecución',
  'design-execution': 'Diseño + Ejecución',
};

const typeLabels: Record<string, string> = {
  residential: 'Residencial',
  commercial: 'Comercial',
  institutional: 'Institucional',
  industrial: 'Industrial',
};

export function ProjectNotFound() {
  return (
    <div className="section-padding container-wide text-center">
      <h1 className="text-2xl font-semibold mb-4">Proyecto no encontrado</h1>
      <Button asChild>
        <Link href="/proyectos">Volver a proyectos</Link>
      </Button>
    </div>
  );
}

export default function ProjectDetail({ project }: { project: Project }) {
  return (
    <>
      <div className="container-wide py-6">
        <Link
          href="/proyectos"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft size={18} />
          Volver a proyectos
        </Link>
      </div>

      <InteriorPageHero title={project.name}>
        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-1 text-caption font-medium rounded-full bg-primary text-primary-foreground">
            {typeLabels[project.type]}
          </span>
          <span className="px-3 py-1 text-caption font-medium rounded-full bg-muted text-foreground">
            {roleLabels[project.role]}
          </span>
          <span className="px-3 py-1 text-caption font-medium rounded-full bg-muted text-foreground">
            {statusLabels[project.status]}
          </span>
        </div>
      </InteriorPageHero>

      <section className="border-b border-border bg-background py-8 md:py-12">
        <div className="container-wide">
          <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-muted">
            <OptimizedImage
              src={project.coverImage}
              alt={project.name}
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="image-cover"
              eager
            />
          </div>
        </div>
      </section>

      <section className="section-padding-sm">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-semibold mb-6">Descripción</h2>
              <p className="text-body-lg text-muted-foreground mb-8 leading-relaxed">
                {project.description}
              </p>

              {(project.challenge || project.solution || project.result) && (
                <div className="space-y-6 mb-12">
                  {project.challenge && (
                    <div>
                      <h3 className="font-semibold mb-2">Reto</h3>
                      <p className="text-muted-foreground">{project.challenge}</p>
                    </div>
                  )}
                  {project.solution && (
                    <div>
                      <h3 className="font-semibold mb-2">Solución</h3>
                      <p className="text-muted-foreground">{project.solution}</p>
                    </div>
                  )}
                  {project.result && (
                    <div>
                      <h3 className="font-semibold mb-2">Resultado</h3>
                      <p className="text-muted-foreground">{project.result}</p>
                    </div>
                  )}
                </div>
              )}

              {project.deliverables && project.deliverables.length > 0 && (
                <div className="mb-12">
                  <h3 className="font-semibold mb-4">Qué entregamos</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {project.deliverables.map((item, index) => (
                      <li
                        key={index}
                        className="flex items-center gap-2 text-muted-foreground"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {project.images.length > 0 && (
                <ProjectGallery projectName={project.name} images={project.images} />
              )}
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-28 space-y-8">
                <div className="p-6 rounded-lg bg-card border border-border">
                  <h3 className="font-semibold mb-6">Ficha técnica</h3>
                  <dl className="space-y-4">
                    <div className="flex items-start gap-3">
                      <MapPin size={18} className="text-primary shrink-0 mt-0.5" />
                      <div>
                        <dt className="text-micro text-muted-foreground uppercase tracking-wide">
                          Ubicación
                        </dt>
                        <dd className="font-medium">{project.location}</dd>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Calendar size={18} className="text-primary shrink-0 mt-0.5" />
                      <div>
                        <dt className="text-micro text-muted-foreground uppercase tracking-wide">
                          Año
                        </dt>
                        <dd className="font-medium">{project.yearLabel ?? project.year}</dd>
                      </div>
                    </div>
                    {project.area && (
                      <div className="flex items-start gap-3">
                        <Ruler size={18} className="text-primary shrink-0 mt-0.5" />
                        <div>
                          <dt className="text-micro text-muted-foreground uppercase tracking-wide">
                            Área
                          </dt>
                          <dd className="font-medium">{project.area}</dd>
                        </div>
                      </div>
                    )}
                    {project.client && (
                      <div className="flex items-start gap-3">
                        <Users size={18} className="text-primary shrink-0 mt-0.5" />
                        <div>
                          <dt className="text-micro text-muted-foreground uppercase tracking-wide">
                            Cliente
                          </dt>
                          <dd className="font-medium">{project.client}</dd>
                        </div>
                      </div>
                    )}
                  </dl>
                </div>

                <div className="p-6 rounded-lg bg-primary text-primary-foreground">
                  <h3 className="font-semibold mb-3">¿Un proyecto similar?</h3>
                  <p className="text-sm opacity-80 mb-4">
                    Conversemos sobre cómo podemos ayudarle.
                  </p>
                  <Button
                    variant="outline"
                    className="w-full border-primary-foreground/30 text-primary hover:bg-primary-foreground hover:text-primary"
                    asChild
                  >
                    <Link href="/contacto">Hablemos</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
