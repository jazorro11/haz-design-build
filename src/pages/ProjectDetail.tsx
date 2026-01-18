import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Calendar, Ruler, Users } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { getProjectById, Project } from '@/data/projects';
import { cn } from '@/lib/utils';

const statusLabels: Record<string, string> = {
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

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const project = id ? getProjectById(id) : undefined;

  if (!project) {
    return (
      <Layout>
        <div className="section-padding container-wide text-center">
          <h1 className="text-2xl font-semibold mb-4">Proyecto no encontrado</h1>
          <Button asChild>
            <Link to="/proyectos">Volver a proyectos</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Back link */}
      <div className="container-wide py-6">
        <Link
          to="/proyectos"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft size={18} />
          Volver a proyectos
        </Link>
      </div>

      {/* Hero */}
      <section className="relative h-[50vh] md:h-[60vh] bg-muted">
        <img
          src={project.coverImage}
          alt={project.name}
          className="image-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 container-wide pb-8 md:pb-12">
          <h1 className="text-display-md md:text-display-lg font-semibold text-foreground mb-4">
            {project.name}
          </h1>
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
            {project.published && (
              <span className="px-3 py-1 text-caption font-medium rounded-full bg-accent text-accent-foreground">
                Publicado
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding-sm">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
            {/* Main content */}
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

              {/* Gallery */}
              {project.images.length > 0 && (
                <div>
                  <h2 className="text-2xl font-semibold mb-6">Galería</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {project.images.map((image, index) => (
                      <div
                        key={index}
                        className="relative aspect-project rounded-lg overflow-hidden bg-muted"
                      >
                        <img
                          src={image.url}
                          alt={image.caption || `${project.name} - Imagen ${index + 1}`}
                          className="image-cover"
                        />
                        <div className="absolute top-3 right-3">
                          <span
                            className={cn(
                              'px-2 py-1 text-micro font-medium rounded',
                              image.stage === 'completed'
                                ? 'bg-primary/90 text-primary-foreground'
                                : 'bg-accent/90 text-accent-foreground'
                            )}
                          >
                            {image.stage === 'completed' ? 'Terminado' : 'En obra'}
                          </span>
                        </div>
                        {image.caption && (
                          <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-background/80 to-transparent">
                            <p className="text-caption text-foreground">
                              {image.caption}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar - Technical info */}
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
                        <dd className="font-medium">{project.year}</dd>
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

                {/* CTA */}
                <div className="p-6 rounded-lg bg-primary text-primary-foreground">
                  <h3 className="font-semibold mb-3">¿Un proyecto similar?</h3>
                  <p className="text-sm opacity-80 mb-4">
                    Conversemos sobre cómo podemos ayudarle.
                  </p>
                  <Button
                    variant="outline"
                    className="w-full border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                    asChild
                  >
                    <Link to="/contacto">Hablemos</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
