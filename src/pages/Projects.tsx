import { useState, useMemo } from 'react';
import { Layout } from '@/components/layout/Layout';
import { SEO } from '@/components/SEO';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { ProjectFilters } from '@/components/projects/ProjectFilters';
import { getProjectsByFilter, ProjectType, ProjectRole, ProjectStatus } from '@/data/projects';
import { cn } from '@/lib/utils';

type ViewMode = 'featured' | 'all';

export default function Projects() {
  const [viewMode, setViewMode] = useState<ViewMode>('featured');
  const [activeTypes, setActiveTypes] = useState<ProjectType[]>([]);
  const [activeRoles, setActiveRoles] = useState<ProjectRole[]>([]);
  const [activeStatuses, setActiveStatuses] = useState<ProjectStatus[]>([]);

  const projects = useMemo(() => {
    const filtered = getProjectsByFilter(
      activeTypes.length > 0 ? activeTypes : undefined,
      activeRoles.length > 0 ? activeRoles : undefined,
      activeStatuses.length > 0 ? activeStatuses : undefined,
      viewMode === 'featured'
    );
    return viewMode === 'featured' ? filtered.slice(0, 12) : filtered;
  }, [viewMode, activeTypes, activeRoles, activeStatuses]);

  const clearFilters = () => {
    setActiveTypes([]);
    setActiveRoles([]);
    setActiveStatuses([]);
  };

  const hasFilters = activeTypes.length > 0 || activeRoles.length > 0 || activeStatuses.length > 0;

  return (
    <Layout>
      <SEO
        title="Proyectos"
        description="Catálogo de proyectos de arquitectura: residencial, comercial, institucional e industrial. Más de 30 años de experiencia en diseño y ejecución."
        path="/proyectos"
      />
      {/* Header */}
      <section className="section-padding-sm bg-card border-b border-border">
        <div className="container-wide">
          <h1 className="text-display-md font-semibold mb-4">Proyectos</h1>
          <p className="text-body-lg text-muted-foreground max-w-2xl">
            Más de tres décadas de trabajo arquitectónico, desde el concepto 
            hasta la entrega de obra.
          </p>
        </div>
      </section>

      {/* Controls */}
      <section className="py-8 border-b border-border">
        <div className="container-wide">
          {/* View Toggle */}
          <div className="flex items-center gap-2 mb-6">
            <button
              onClick={() => setViewMode('featured')}
              className={cn(
                'px-4 py-2 text-sm font-medium rounded-full transition-all focus-ring',
                viewMode === 'featured'
                  ? 'bg-foreground text-background'
                  : 'bg-muted text-muted-foreground hover:text-foreground'
              )}
            >
              Selección destacada
            </button>
            <button
              onClick={() => setViewMode('all')}
              className={cn(
                'px-4 py-2 text-sm font-medium rounded-full transition-all focus-ring',
                viewMode === 'all'
                  ? 'bg-foreground text-background'
                  : 'bg-muted text-muted-foreground hover:text-foreground'
              )}
            >
              Todos los proyectos
            </button>
          </div>

          {/* Filters */}
          <ProjectFilters
            activeTypes={activeTypes}
            activeRoles={activeRoles}
            activeStatuses={activeStatuses}
            onTypeChange={setActiveTypes}
            onRoleChange={setActiveRoles}
            onStatusChange={setActiveStatuses}
          />

          {hasFilters && (
            <button
              onClick={clearFilters}
              className="mt-4 text-caption text-primary hover:underline"
            >
              Limpiar filtros
            </button>
          )}
        </div>
      </section>

      {/* Projects Grid */}
      <section className="section-padding">
        <div className="container-wide">
          {projects.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {projects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
              <div className="mt-8 text-center text-muted-foreground">
                {projects.length} proyecto{projects.length !== 1 ? 's' : ''}
              </div>
            </>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground mb-4">
                No hay proyectos que coincidan con los filtros seleccionados.
              </p>
              <button
                onClick={clearFilters}
                className="text-primary hover:underline"
              >
                Limpiar filtros
              </button>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
