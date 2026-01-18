import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { pressItems } from '@/data/press';
import { getProjectById } from '@/data/projects';
import { ArrowUpRight } from 'lucide-react';

export default function Press() {
  return (
    <Layout>
      {/* Header */}
      <section className="section-padding-sm bg-card border-b border-border">
        <div className="container-wide">
          <h1 className="text-display-md font-semibold mb-4">Prensa</h1>
          <p className="text-body-lg text-muted-foreground max-w-2xl">
            Nuestros proyectos han sido destacados en publicaciones nacionales 
            e internacionales de arquitectura y diseño.
          </p>
        </div>
      </section>

      {/* Press Items */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pressItems.map((item) => {
              const project = item.projectId ? getProjectById(item.projectId) : undefined;
              
              return (
                <article
                  key={item.id}
                  className="group p-6 rounded-lg border border-border bg-card hover:shadow-elevated transition-shadow"
                >
                  {/* Publication cover placeholder */}
                  <div className="aspect-[3/4] rounded bg-muted mb-6 flex items-center justify-center">
                    <span className="text-4xl text-muted-foreground/30 font-display">
                      {item.publication.charAt(0)}
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div className="text-micro text-muted-foreground uppercase tracking-wide">
                      {item.publication} • {item.year}
                    </div>
                    <h2 className="text-lg font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                      {item.title}
                    </h2>
                    
                    {project && (
                      <Link
                        to={`/proyectos/${project.id}`}
                        className="inline-flex items-center gap-1 text-caption text-primary hover:underline"
                      >
                        Ver proyecto <ArrowUpRight size={14} />
                      </Link>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Media Contact */}
      <section className="section-padding bg-card">
        <div className="container-narrow text-center">
          <h2 className="text-2xl font-semibold mb-4">Contacto de prensa</h2>
          <p className="text-muted-foreground mb-6">
            Para solicitudes de material de prensa, entrevistas o información 
            sobre proyectos específicos.
          </p>
          <a
            href="mailto:prensa@hazarquitectura.com"
            className="text-primary hover:underline font-medium"
          >
            prensa@hazarquitectura.com
          </a>
        </div>
      </section>
    </Layout>
  );
}
