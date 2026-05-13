import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { InteriorPageHero } from '@/components/layout/InteriorPageHero';
import { OptimizedImage } from '@/components/OptimizedImage';
import { ProjectGallery } from '@/components/projects/ProjectGallery';
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
    <div className="section-padding container-wide">
      <h1 className="text-display-md font-light mb-6">Proyecto no encontrado</h1>
      <Link href="/proyectos" className="haz-link-arrow">
        Volver a proyectos <span aria-hidden>→</span>
      </Link>
    </div>
  );
}

export default function ProjectDetail({ project }: { project: Project }) {
  return (
    <>
      {/* Breadcrumb */}
      <div className="container-wide py-6 border-b border-border">
        <Link
          href="/proyectos"
          className="inline-flex items-center gap-2 text-caption text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft size={16} />
          Proyectos
        </Link>
      </div>

      {/* Page header */}
      <InteriorPageHero title={project.name}>
        <div className="flex flex-wrap gap-3 mt-4">
          <span className="haz-label text-foreground">{typeLabels[project.type]}</span>
          <span className="text-muted-foreground">·</span>
          <span className="haz-label text-muted-foreground">{roleLabels[project.role]}</span>
          <span className="text-muted-foreground">·</span>
          <span className="haz-label text-muted-foreground">{statusLabels[project.status]}</span>
        </div>
      </InteriorPageHero>

      {/* Imagen cover */}
      <section className="border-b border-border bg-background py-12">
        <div className="container-wide">
          <div className="relative aspect-video w-full overflow-hidden bg-muted">
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

      {/* Contenido principal */}
      <section className="section-padding-sm">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* Columna principal */}
            <div className="lg:col-span-2">
              <h2 className="haz-label text-muted-foreground mb-6">Descripción</h2>
              <p className="text-body-lg text-foreground mb-10 leading-[1.7]">
                {project.description}
              </p>

              {(project.challenge || project.solution || project.result) && (
                <div className="space-y-8 mb-12 border-t border-border pt-8">
                  {project.challenge && (
                    <div>
                      <h3 className="haz-label text-muted-foreground mb-3">Reto</h3>
                      <p className="text-muted-foreground">{project.challenge}</p>
                    </div>
                  )}
                  {project.solution && (
                    <div>
                      <h3 className="haz-label text-muted-foreground mb-3">Solución</h3>
                      <p className="text-muted-foreground">{project.solution}</p>
                    </div>
                  )}
                  {project.result && (
                    <div>
                      <h3 className="haz-label text-muted-foreground mb-3">Resultado</h3>
                      <p className="text-muted-foreground">{project.result}</p>
                    </div>
                  )}
                </div>
              )}

              {project.deliverables && project.deliverables.length > 0 && (
                <div className="mb-12 border-t border-border pt-8">
                  <h3 className="haz-label text-muted-foreground mb-6">Qué entregamos</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {project.deliverables.map((item, index) => (
                      <li key={index} className="flex items-start gap-4 text-foreground">
                        <span className="w-4 h-px bg-accent flex-shrink-0 mt-[10px]" />
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

            {/* Sidebar técnico */}
            <div className="lg:col-span-1">
              <div className="sticky top-28">
                {/* Ficha técnica — editorial, sin card */}
                <div className="border-t border-border pt-6 mb-12">
                  <h3 className="haz-label text-muted-foreground mb-6">Ficha técnica</h3>
                  <dl className="space-y-5">
                    <div>
                      <dt className="haz-label text-muted-foreground mb-1">Ubicación</dt>
                      <dd className="text-foreground">{project.location}</dd>
                    </div>
                    <div>
                      <dt className="haz-label text-muted-foreground mb-1">Año</dt>
                      <dd className="text-foreground">{project.yearLabel ?? project.year}</dd>
                    </div>
                    {project.area && (
                      <div>
                        <dt className="haz-label text-muted-foreground mb-1">Área</dt>
                        <dd className="text-foreground">{project.area}</dd>
                      </div>
                    )}
                    {project.client && (
                      <div>
                        <dt className="haz-label text-muted-foreground mb-1">Cliente</dt>
                        <dd className="text-foreground">{project.client}</dd>
                      </div>
                    )}
                  </dl>
                </div>

                {/* CTA sin card */}
                <div className="border-t border-border pt-6">
                  <h3 className="text-base font-medium mb-2">¿Un proyecto similar?</h3>
                  <p className="text-caption text-muted-foreground mb-4">
                    Conversemos sobre cómo podemos ayudarle.
                  </p>
                  <Link href="/contacto" className="haz-link-arrow">
                    Hablemos <span aria-hidden>→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
