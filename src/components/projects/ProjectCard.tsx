import Link from 'next/link';
import { Project, ProjectStatus, ProjectType, ProjectRole } from '@/data/projects';
import { cn } from '@/lib/utils';
import { OptimizedImage } from '@/components/OptimizedImage';

interface ProjectCardProps {
  project: Project;
  className?: string;
}

const typeLabels: Record<ProjectType, string> = {
  residential: 'Residencial',
  commercial: 'Comercial',
  institutional: 'Institucional',
  industrial: 'Industrial',
};

const roleLabels: Record<ProjectRole, string> = {
  design: 'Diseño',
  execution: 'Ejecución',
  'design-execution': 'Diseño + Ejecución',
};

export function ProjectCard({ project, className }: ProjectCardProps) {
  return (
    <Link
      href={`/proyectos/${project.id}`}
      className={cn('group block focus-ring', className)}
    >
      {/* Imagen a sangre — sin contenedor card */}
      <div className="relative aspect-project overflow-hidden bg-muted">
        <OptimizedImage
          src={project.coverImage}
          alt={project.name}
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="image-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>

      {/* Info — separada por hairline */}
      <div className="pt-4 pb-6 border-b border-border">
        <p className="haz-label text-muted-foreground mb-2">
          {typeLabels[project.type]} · {roleLabels[project.role]}
        </p>
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="text-lg font-medium text-foreground leading-snug">
            <span className="group-hover:bg-accent group-hover:text-white transition-[color,background-color] duration-300 -mx-1 px-1">
              {project.name}
            </span>
          </h3>
          <span className="text-caption text-muted-foreground shrink-0 tabular-nums">
            {project.yearLabel ?? project.year}
          </span>
        </div>
        <p className="text-caption text-muted-foreground mt-1">{project.location}</p>
      </div>
    </Link>
  );
}
