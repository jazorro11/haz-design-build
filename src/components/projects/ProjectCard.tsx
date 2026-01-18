import { Link } from 'react-router-dom';
import { Project } from '@/data/projects';
import { cn } from '@/lib/utils';

interface ProjectCardProps {
  project: Project;
  className?: string;
}

const statusLabels: Record<string, { label: string; className: string }> = {
  completed: { label: 'Terminado', className: 'bg-primary/10 text-primary' },
  'in-progress': { label: 'En obra', className: 'bg-accent/10 text-accent' },
  published: { label: 'Publicado', className: 'bg-primary/10 text-primary' },
};

const roleLabels: Record<string, string> = {
  design: 'Diseño',
  execution: 'Ejecución',
  'design-execution': 'Diseño + Ejecución',
};

export function ProjectCard({ project, className }: ProjectCardProps) {
  return (
    <Link
      to={`/proyectos/${project.id}`}
      className={cn(
        'group block overflow-hidden rounded-lg bg-card transition-all duration-300',
        'hover:shadow-elevated hover:-translate-y-1',
        'focus-ring',
        className
      )}
    >
      {/* Image */}
      <div className="relative aspect-project overflow-hidden bg-muted">
        <img
          src={project.coverImage}
          alt={`${project.name} - ${project.status === 'in-progress' ? 'en obra' : 'terminado'}`}
          className="image-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        
        {/* Tags overlay */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          {project.published && (
            <span className="px-2 py-1 text-micro font-medium rounded bg-background/90 text-foreground">
              Publicado
            </span>
          )}
          <span
            className={cn(
              'px-2 py-1 text-micro font-medium rounded',
              statusLabels[project.status].className
            )}
          >
            {statusLabels[project.status].label}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="text-lg font-medium text-foreground group-hover:text-primary transition-colors line-clamp-1">
            {project.name}
          </h3>
          <span className="text-caption text-muted-foreground shrink-0">
            {project.year}
          </span>
        </div>
        
        <p className="text-caption text-muted-foreground mb-3">
          {project.location}
        </p>

        <div className="flex flex-wrap gap-2">
          <span className="px-2 py-0.5 text-micro text-muted-foreground bg-muted rounded">
            {roleLabels[project.role]}
          </span>
        </div>
      </div>
    </Link>
  );
}
