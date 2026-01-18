import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Layout } from '@/components/layout/Layout';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { getFeaturedProjects } from '@/data/projects';
import { getFeaturedClients } from '@/data/clients';
import { services, processSteps } from '@/data/services';
import { pressItems } from '@/data/press';
import { 
  Compass, 
  FileStack, 
  HardHat, 
  Users, 
  Wrench,
  Building2,
  Globe,
  Award,
  Clock
} from 'lucide-react';
import heroImage from '@/assets/hero-architecture.jpg';

const iconMap: Record<string, React.ElementType> = {
  Compass,
  FileStack,
  HardHat,
  Users,
  Wrench,
};

const stats = [
  { icon: Clock, value: '+30', label: 'años de experiencia' },
  { icon: Building2, value: 'Diseño + Ejecución', label: 'servicio integral' },
  { icon: Globe, value: 'Clientes', label: 'internacionales' },
  { icon: Award, value: 'Proyectos', label: 'publicados' },
];

export default function Index() {
  const featuredProjects = getFeaturedProjects();
  const featuredClients = getFeaturedClients();

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt="Arquitectura moderna - HAZ Arquitectura"
            className="image-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-background/30" />
        </div>

        {/* Content */}
        <div className="container-wide relative z-10 py-20">
          <div className="max-w-2xl">
            <h1 className="text-display-lg md:text-display-xl font-semibold mb-6 animate-fade-in-up">
              HAZ Arquitectura —
              <br />
              <span className="text-primary">Diseño que se construye.</span>
            </h1>
            <p className="text-body-lg text-muted-foreground mb-8 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              Más de 30 años integrando arquitectura y ejecución para entregar 
              obras sólidas y funcionales.
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <Button variant="hero" asChild>
                <Link to="/proyectos">Ver proyectos</Link>
              </Button>
              <Button variant="hero-outline" asChild>
                <Link to="/contacto">Hablemos</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-card border-y border-border">
        <div className="container-wide py-12 md:py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <stat.icon className="w-8 h-8 mx-auto mb-3 text-primary" />
                <div className="text-xl md:text-2xl font-semibold text-foreground mb-1">
                  {stat.value}
                </div>
                <div className="text-caption text-muted-foreground">
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
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-display-md font-semibold mb-3">
                Proyectos destacados
              </h2>
              <p className="text-body-lg text-muted-foreground">
                Selección de obras que reflejan nuestra capacidad integral.
              </p>
            </div>
            <Link
              to="/proyectos"
              className="hidden md:inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all"
            >
              Ver todos <ArrowRight size={18} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {featuredProjects.slice(0, 6).map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Button variant="outline" asChild>
              <Link to="/proyectos">Ver todos los proyectos</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Differentiator - Process */}
      <section className="section-padding bg-card">
        <div className="container-wide">
          <div className="text-center mb-16">
            <h2 className="text-display-md font-semibold mb-4">
              Del concepto a la obra
            </h2>
            <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto">
              Nuestro proceso integrado garantiza coherencia entre la visión 
              arquitectónica y la realidad construida.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 lg:gap-6">
            {processSteps.map((step, index) => (
              <div
                key={step.number}
                className="relative bg-background rounded-lg p-6 border border-border"
              >
                <div className="text-4xl font-light text-primary/30 mb-4">
                  {step.number}
                </div>
                <h3 className="text-lg font-medium mb-2">{step.title}</h3>
                <p className="text-caption text-muted-foreground mb-3">
                  {step.description}
                </p>
                <span className="text-micro text-primary font-medium">
                  {step.duration}
                </span>
                
                {/* Arrow connector */}
                {index < processSteps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 text-muted-foreground/30">
                    <ArrowRight size={20} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="text-display-md font-semibold mb-4">Servicios</h2>
            <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto">
              Ofrecemos servicios completos de arquitectura y construcción, 
              adaptados a las necesidades de cada proyecto.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.slice(0, 3).map((service) => {
              const Icon = iconMap[service.icon];
              return (
                <div
                  key={service.id}
                  className="p-6 rounded-lg border border-border bg-card hover:shadow-elevated transition-shadow"
                >
                  <Icon className="w-10 h-10 text-primary mb-4" />
                  <h3 className="text-xl font-medium mb-3">{service.title}</h3>
                  <p className="text-muted-foreground mb-4">
                    {service.description}
                  </p>
                  <ul className="space-y-2">
                    {service.features.map((feature, index) => (
                      <li
                        key={index}
                        className="text-caption text-muted-foreground flex items-center gap-2"
                      >
                        <span className="w-1 h-1 rounded-full bg-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-8">
            <Button variant="outline" asChild>
              <Link to="/servicios">Ver todos los servicios</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Clients */}
      <section className="section-padding bg-card">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="text-display-md font-semibold mb-4">
              Clientes que confían en nosotros
            </h2>
            <p className="text-body-lg text-muted-foreground">
              Relaciones de largo plazo con equipos locales y globales.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center">
            {featuredClients.slice(0, 12).map((client) => (
              <div
                key={client.id}
                className="h-16 flex items-center justify-center px-4 rounded bg-background border border-border"
              >
                <span className="text-caption font-medium text-muted-foreground text-center">
                  {client.name}
                </span>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              to="/clientes"
              className="text-primary font-medium hover:underline"
            >
              Ver lista completa →
            </Link>
          </div>
        </div>
      </section>

      {/* Press */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-display-md font-semibold mb-3">Prensa</h2>
              <p className="text-body-lg text-muted-foreground">
                Nuestros proyectos en publicaciones especializadas.
              </p>
            </div>
            <Link
              to="/prensa"
              className="hidden md:inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all"
            >
              Ver todas <ArrowRight size={18} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pressItems.slice(0, 3).map((item) => (
              <div
                key={item.id}
                className="p-6 rounded-lg border border-border bg-card hover:shadow-elevated transition-shadow"
              >
                <div className="text-micro text-muted-foreground mb-2">
                  {item.publication} • {item.year}
                </div>
                <h3 className="text-lg font-medium line-clamp-2">
                  {item.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section-padding bg-foreground text-background">
        <div className="container-narrow text-center">
          <h2 className="text-display-md font-semibold mb-4">
            ¿Tiene un proyecto en mente?
          </h2>
          <p className="text-body-lg text-background/70 mb-8 max-w-xl mx-auto">
            Conversemos sobre cómo podemos ayudarle a materializar su visión 
            arquitectónica con la solidez de más de tres décadas de experiencia.
          </p>
          <Button
            variant="outline"
            size="xl"
            className="border-background/30 text-background hover:bg-background hover:text-foreground"
            asChild
          >
            <Link to="/contacto">Cotizar / Hablemos</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
}
