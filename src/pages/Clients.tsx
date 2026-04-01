import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { SEO } from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { getFeaturedClients, getAllClients } from '@/data/clients';
import { cn } from '@/lib/utils';

export default function Clients() {
  const [showAll, setShowAll] = useState(false);
  const featuredClients = getFeaturedClients();
  const allClients = getAllClients();
  const nonFeaturedClients = allClients.filter(c => !c.featured);

  return (
    <Layout>
      {/* Header */}
      <section className="section-padding-sm bg-card border-b border-border">
        <div className="container-wide">
          <h1 className="text-display-md font-semibold mb-4">Clientes</h1>
          <p className="text-body-lg text-muted-foreground max-w-2xl">
            Relaciones de largo plazo con equipos locales y globales que confían 
            en nuestra capacidad de entregar.
          </p>
        </div>
      </section>

      {/* Featured Clients */}
      <section className="section-padding">
        <div className="container-wide">
          <h2 className="text-xl font-semibold mb-8">Clientes destacados</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredClients.map((client) => (
              <div
                key={client.id}
                className="h-24 flex items-center justify-center px-6 rounded-lg bg-card border border-border hover:shadow-card transition-shadow"
              >
                <span className="text-sm font-medium text-muted-foreground text-center">
                  {client.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* All Clients */}
      <section className="section-padding-sm bg-card">
        <div className="container-wide">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-semibold">Lista completa</h2>
            <Button
              variant="ghost"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? 'Ver menos' : 'Ver todos'}
            </Button>
          </div>

          <div
            className={cn(
              'overflow-hidden transition-all duration-500',
              showAll ? 'max-h-[2000px]' : 'max-h-64'
            )}
          >
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-8 gap-y-4">
              {allClients.map((client) => (
                <div key={client.id} className="py-2">
                  <span className={cn(
                    'text-sm',
                    client.featured ? 'text-foreground font-medium' : 'text-muted-foreground'
                  )}>
                    {client.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {!showAll && nonFeaturedClients.length > 0 && (
            <div className="mt-4 text-center">
              <button
                onClick={() => setShowAll(true)}
                className="text-primary hover:underline"
              >
                Ver los {allClients.length} clientes →
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Stats */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-semibold text-primary mb-2">
                {allClients.length}+
              </div>
              <div className="text-muted-foreground">Clientes atendidos</div>
            </div>
            <div>
              <div className="text-4xl font-semibold text-primary mb-2">85%</div>
              <div className="text-muted-foreground">Clientes recurrentes</div>
            </div>
            <div>
              <div className="text-4xl font-semibold text-primary mb-2">5+</div>
              <div className="text-muted-foreground">Países</div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
