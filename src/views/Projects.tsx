'use client';

import Link from 'next/link';
import { InteriorPageHero } from '@/components/layout/InteriorPageHero';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { OptimizedImage } from '@/components/OptimizedImage';
import { getProjectsByFilter } from '@/data/projects';
import projectsHeroImg from '@/assets/projects-hero.jpg';

export default function Projects() {
  const allProjects = getProjectsByFilter();

  return (
    <>
      <InteriorPageHero
        title="Proyectos"
        description={
          <>
            Obras que reflejan nuestra capacidad integral de diseño y ejecución en Colombia.
          </>
        }
        bgImage={projectsHeroImg}
      />
      <section className="section-padding-after-hero">
        <div className="container-wide">
          {allProjects.length > 0 ? (
            <div className="space-y-10">
              {Array.from({ length: Math.ceil(allProjects.length / 2) }, (_, rowIdx) => {
                const first = allProjects[rowIdx * 2];
                const second = allProjects[rowIdx * 2 + 1];
                const reversed = rowIdx % 2 === 1;

                const largeProj = reversed ? second : first;
                const smallProj = reversed ? first : second;

                const largeCard = largeProj && (
                  <div key={`large-${largeProj.id}`} className="md:col-span-2">
                    <Link
                      href={`/proyectos/${largeProj.id}`}
                      className="group block focus-ring"
                    >
                      <div
                        className="relative overflow-hidden bg-muted"
                        style={{ aspectRatio: '4/3' }}
                      >
                        <OptimizedImage
                          src={largeProj.coverImage}
                          alt={largeProj.name}
                          sizes="(max-width: 768px) 100vw, 66vw"
                          className="image-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        />
                      </div>
                      <div className="pt-4 pb-6 border-b border-border">
                        <p className="haz-label text-muted-foreground mb-2">
                          {largeProj.location} · {largeProj.yearLabel ?? largeProj.year}
                        </p>
                        <h3 className="text-2xl font-light tracking-[-0.01em] text-foreground">
                          <span className="group-hover:bg-accent group-hover:text-white transition-[color,background-color] duration-300 -mx-1 px-1">
                            {largeProj.name}
                          </span>
                        </h3>
                      </div>
                    </Link>
                  </div>
                );

                const smallCard = smallProj && (
                  <div key={`small-${smallProj.id}`} className="md:col-span-1">
                    <ProjectCard project={smallProj} />
                  </div>
                );

                return (
                  <div key={rowIdx} className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {reversed ? <>{smallCard}{largeCard}</> : <>{largeCard}{smallCard}</>}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="py-24 text-center border-t border-border">
              <p className="text-muted-foreground">No hay proyectos por el momento.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
