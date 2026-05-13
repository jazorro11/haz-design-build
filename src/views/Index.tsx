'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { OptimizedImage } from '@/components/OptimizedImage';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { ProcessStepsSection } from '@/components/sections/ProcessStepsSection';
import { ScrollReveal } from '@/components/ScrollReveal';
import { Button } from '@/components/ui/button';
import { getFeaturedProjects } from '@/data/projects';
import { services } from '@/data/services';
import heroImage from '@/assets/portada-1.png';

const stats = [
  { value: '+30', label: 'años de experiencia' },
  { value: 'Diseño + Ejecución', label: 'servicio integral' },
  { value: '+20', label: 'ciudades en Colombia' },
  { value: 'Grandes compañías', label: 'Arturo Calle, Alcaldía de Bogotá' },
];

export default function Index() {
  const featuredProjects = getFeaturedProjects();

  return (
    <>
      {/* Hero — split 50/50: texto izquierda, imagen derecha sin overlay */}
      <section className="grid grid-cols-1 lg:grid-cols-2 min-h-[78vh] items-stretch border-b border-border">
        {/* Texto */}
        <div className="flex flex-col justify-center px-8 md:px-12 lg:px-16 py-24 lg:py-[120px]">
          <span className="w-16 h-px bg-accent block mb-6" />
          <p className="haz-label text-foreground mb-6">HAZ Arquitectura — Bogotá, Colombia</p>
          <h1 className="text-display-xl font-light leading-[1.02] tracking-[-0.02em] mb-6">
            Diseño que
            <br />
            <em className="not-italic font-light text-muted-foreground">se construye.</em>
          </h1>
          <p className="text-body-lg text-muted-foreground mb-10 max-w-xl leading-[1.6]">
            Más de 30 años integrando arquitectura y ejecución en Colombia para entregar
            obras sólidas y funcionales.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button
              variant="default"
              className="rounded-none shadow-none border-0 bg-foreground text-background hover:bg-accent text-[12px] font-semibold tracking-[0.12em] uppercase px-6 py-[15px] h-auto"
              asChild
            >
              <Link href="/proyectos">Ver proyectos</Link>
            </Button>
            <Button
              variant="outline"
              className="rounded-none shadow-none border border-foreground bg-transparent text-foreground hover:bg-foreground hover:text-background text-[12px] font-semibold tracking-[0.12em] uppercase px-6 py-[15px] h-auto"
              asChild
            >
              <Link href="/contacto">Hablemos</Link>
            </Button>
          </div>
        </div>

        {/* Imagen a sangre — sin overlay */}
        <div className="relative hidden lg:block bg-card">
          <OptimizedImage
            src={heroImage}
            alt="HAZ Arquitectura — obra arquitectónica"
            sizes="50vw"
            className="image-cover"
            eager
          />
        </div>
      </section>

      {/* Stats bar — numerales oversized, hairlines verticales */}
      <section className="border-b border-border bg-background">
        <div className="container-wide p-0">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border items-start">
            {stats.map((stat, index) => (
              <div key={index} className="px-8 py-14 overflow-hidden">
                <div
                  className={`font-light leading-[0.9] tracking-[-0.04em] text-accent tabular-nums ${
                    stat.value.length <= 4 ? 'text-7xl' : 'text-3xl'
                  }`}
                >
                  {stat.value}
                </div>
                <div className="haz-label text-muted-foreground mt-4 leading-snug">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Proyectos destacados — grilla asimétrica editorial */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="flex items-end justify-between mb-16">
            <div>
              <ScrollReveal>
                <p className="haz-label text-muted-foreground mb-4">Proyectos</p>
                <h2 className="text-display-md font-light tracking-[-0.01em]">
                  Proyectos destacados
                </h2>
              </ScrollReveal>
            </div>
            <Link href="/proyectos" className="hidden md:inline-flex haz-link-arrow">
              Ver proyectos <ArrowRight size={16} />
            </Link>
          </div>

          {/* Grilla asimétrica: primer proyecto grande (2 cols), resto normales */}
          {featuredProjects.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {/* Proyecto principal — ocupa 2 columnas, más alto */}
              {featuredProjects[0] && (
                <div className="md:col-span-2">
                  <Link
                    href={`/proyectos/${featuredProjects[0].id}`}
                    className="group block focus-ring"
                  >
                    <div className="relative overflow-hidden bg-muted" style={{ aspectRatio: '4/3' }}>
                      <OptimizedImage
                        src={featuredProjects[0].coverImage}
                        alt={featuredProjects[0].name}
                        sizes="(max-width: 768px) 100vw, 66vw"
                        className="image-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        eager
                      />
                    </div>
                    <div className="pt-4 pb-6 border-b border-border">
                      <p className="haz-label text-muted-foreground mb-2">
                        {featuredProjects[0].location} · {featuredProjects[0].yearLabel ?? featuredProjects[0].year}
                      </p>
                      <h3 className="text-2xl font-light tracking-[-0.01em] text-foreground">
                        <span className="group-hover:bg-accent group-hover:text-white transition-[color,background-color] duration-300 -mx-1 px-1">
                          {featuredProjects[0].name}
                        </span>
                      </h3>
                    </div>
                  </Link>
                </div>
              )}

              {/* Columna derecha: 2 proyectos apilados */}
              <div className="flex flex-col gap-10">
                {featuredProjects.slice(1, 3).map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </div>
          )}

          <div className="mt-10 md:hidden">
            <Link href="/proyectos" className="haz-link-arrow">
              Ver proyectos <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Proceso */}
      <ProcessStepsSection
        title="Del concepto a la obra"
        description={
          <>
            Nuestro proceso integrado garantiza coherencia entre la visión
            arquitectónica y la realidad construida.
          </>
        }
        testIds={{
          section: 'home-process-section',
          intro: 'home-process-intro',
          footnote: 'home-process-footnote',
        }}
        animateIntro
      />

      {/* Servicios — grilla con hairlines */}
      <section className="section-padding">
        <div className="container-wide">
          <ScrollReveal>
            <div className="mb-16">
              <p className="haz-label text-muted-foreground mb-4">Servicios</p>
              <h2 className="text-display-md font-light tracking-[-0.01em] max-w-2xl">
                Servicios completos de arquitectura y construcción.
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-border">
            {services.slice(0, 3).map((service, index) => (
              <div key={service.id} className="p-10 border-r border-b border-border">
                <div className="text-6xl font-light text-accent opacity-20 mb-4 leading-none tabular-nums">
                  {String(index + 1).padStart(2, '0')}
                </div>
                <h3 className="text-[22px] font-medium leading-snug mb-3">
                  {service.title}
                </h3>
                <p className="text-[14px] text-muted-foreground leading-[1.6] mb-6">
                  {service.description}
                </p>
                <ul className="space-y-3">
                  {service.features.map((feature, fIndex) => (
                    <li key={fIndex} className="text-[13px] text-foreground flex items-start gap-4">
                      <span className="w-4 h-px bg-foreground flex-shrink-0 mt-[10px]" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <Link href="/servicios" className="haz-link-arrow">
              Ver todos los servicios <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA final — fondo oscuro */}
      <section className="py-[160px] bg-haz-dark">
        <ScrollReveal>
          <div className="container-wide">
            <div className="max-w-2xl">
              <p className="haz-label text-white/60 mb-6">Conversemos</p>
              <h2 className="text-[56px] font-light leading-[1.05] tracking-[-0.02em] text-white mb-6">
                ¿Tiene un proyecto
                <br />en mente?
              </h2>
              <p className="text-body-lg text-white/70 mb-10 max-w-xl leading-[1.6]">
                Conversemos sobre cómo podemos ayudarle a materializar su visión
                arquitectónica con la solidez de más de tres décadas de experiencia.
              </p>
              <Link
                href="/contacto"
                className="inline-flex items-center gap-3 text-white border-b border-white/40 pb-1 hover:border-white transition-colors text-[13px] font-medium tracking-[0.08em] uppercase"
              >
                Cotizar / Hablemos <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}
