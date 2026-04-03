import { InteriorPageHero } from '@/components/layout/InteriorPageHero';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { getFeaturedProjects } from '@/data/projects';

export default function Projects() {
  const featuredProjects = getFeaturedProjects();

  return (
    <>
      <InteriorPageHero
        title="Proyectos destacados"
        description={
          <>
            Selección de obras que reflejan nuestra capacidad integral.
          </>
        }
      />
      <section className="section-padding-after-hero">
        <div className="container-wide">
          {featuredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {featuredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground">
                No hay proyectos destacados por el momento.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
