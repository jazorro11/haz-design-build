'use client';

import Link from 'next/link';
import { ArrowRight, Compass, FileStack, HardHat, Users, Wrench } from 'lucide-react';
import { OptimizedImage } from '@/components/OptimizedImage';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { ProcessStepsSection } from '@/components/sections/ProcessStepsSection';
import { ScrollReveal } from '@/components/ScrollReveal';
import { Button } from '@/components/ui/button';
import { getFeaturedProjects } from '@/data/projects';
import { services } from '@/data/services';
import heroImage from '@/assets/portada-1.png';

const iconMap: Record<string, React.ElementType> = {
  Compass,
  FileStack,
  HardHat,
  Users,
  Wrench,
};

const stats = [
  { value: '+30', label: 'años de experiencia' },
  { value: 'Diseño + Ejecución', label: 'servicio integral' },
  { value: '+20', label: 'ciudades en todo el territorio' },
  { value: 'Grandes compañías', label: 'Arturo Calle, Alcaldía de Bogotá' },
];

export default function Index() {
  const featuredProjects = getFeaturedProjects();

  return (
    <>
      {/* Hero — split grid */}
      <section className="grid grid-cols-1 lg:grid-cols-2 min-h-[78vh] items-stretch border-b border-border">
        {/* Left: text */}
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
              variant="hero"
              className="bg-accent text-accent-foreground hover:bg-[#A4521E] rounded-none shadow-none border-0 text-[12px] font-semibold tracking-[0.12em] uppercase px-6 py-[15px] h-auto"
              asChild
            >
              <Link href="/proyectos">Ver proyectos</Link>
            </Button>
            <Button
              variant="hero-outline"
              className="border border-foreground bg-transparent text-foreground hover:bg-foreground hover:text-white rounded-none shadow-none text-[12px] font-semibold tracking-[0.12em] uppercase px-6 py-[15px] h-auto"
              asChild
            >
              <Link href="/contacto">Hablemos</Link>
            </Button>
          </div>
        </div>

        {/* Right: full-bleed photo */}
        <div className="relative hidden lg:block bg-card">
          <OptimizedImage
            src={heroImage}
            alt="HAZ Arquitectura — proyecto arquitectónico"
            sizes="50vw"
            className="image-cover"
            eager
          />
        </div>
      </section>

      {/* Stats bar — oversized numerals, vertical hairlines */}
      <section className="border-b border-border bg-background">
        <div className="container-wide p-0">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border">
            {stats.map((stat, index) => (
              <div key={index} className="px-8 py-14">
                <div className="text-[72px] font-light leading-[0.9] tracking-[-0.04em] text-accent tabular-nums">
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

      {/* Featured Projects */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="flex items-end justify-between mb-16">
            <div>
              <ScrollReveal>
                <p className="haz-label text-muted-foreground mb-4">Proyectos</p>
                <h2 className="text-display-md font-normal tracking-[-0.01em]">
                  Proyectos destacados
                </h2>
              </ScrollReveal>
            </div>
            <Link href="/proyectos" className="hidden md:inline-flex haz-link-arrow">
              Ver proyectos <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-14 md:gap-x-10">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          <div className="mt-10 md:hidden">
            <Link href="/proyectos" className="haz-link-arrow">
              Ver proyectos <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Process — alt background */}
      <div className="bg-card">
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
      </div>

      {/* Services — hairline grid */}
      <section className="section-padding">
        <div className="container-wide">
          <ScrollReveal>
            <div className="mb-16">
              <p className="haz-label text-muted-foreground mb-4">Servicios</p>
              <h2 className="text-display-md font-normal tracking-[-0.01em] max-w-2xl">
                Servicios completos de arquitectura y construcción.
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-border">
            {services.slice(0, 3).map((service) => {
              const Icon = iconMap[service.icon];
              return (
                <div
                  key={service.id}
                  className="p-10 border-r border-b border-border"
                >
                  <Icon className="w-7 h-7 text-foreground mb-7" />
                  <h3 className="text-[22px] font-medium leading-snug mb-3">
                    {service.title}
                  </h3>
                  <p className="text-[14px] text-muted-foreground leading-[1.6] mb-6">
                    {service.description}
                  </p>
                  <ul className="space-y-3">
                    {service.features.map((feature, index) => (
                      <li
                        key={index}
                        className="text-[13px] text-foreground flex items-start gap-4"
                      >
                        <span className="w-4 h-px bg-foreground flex-shrink-0 mt-[10px]" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          <div className="mt-10">
            <Link href="/servicios" className="haz-link-arrow">
              Ver todos los servicios <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA — dark moment */}
      <section className="py-[160px] bg-[#111111]">
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
              <Button
                variant="hero-outline"
                className="border border-white/60 bg-transparent text-white hover:bg-white hover:text-foreground rounded-none shadow-none text-[12px] font-semibold tracking-[0.12em] uppercase px-6 py-[15px] h-auto"
                asChild
              >
                <Link href="/contacto">Cotizar / Hablemos</Link>
              </Button>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}
