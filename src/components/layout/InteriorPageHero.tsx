import type { ReactNode } from 'react';
import { OptimizedImage } from '@/components/OptimizedImage';
import { cn } from '@/lib/utils';
import heroImage from '@/assets/portada-1.png';

type InteriorPageHeroProps = {
  title: string;
  description?: ReactNode;
  children?: ReactNode;
  /** Applied to the text wrapper (e.g. max-w-3xl on About). */
  textClassName?: string;
};

export function InteriorPageHero({
  title,
  description,
  children,
  textClassName,
}: InteriorPageHeroProps) {
  return (
    <section
      className={cn(
        'relative overflow-hidden border-b border-border',
        'min-h-[max(11rem,min(26dvh,17rem))]'
      )}
    >
      <div className="absolute inset-0 z-0">
        <OptimizedImage
          src={heroImage}
          alt="Arquitectura moderna - HAZ Arquitectura"
          sizes="100vw"
          className="image-cover"
          eager
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-background/30" />
      </div>

      <div className="relative z-10 container-wide py-8 md:py-10 lg:py-12">
        <div className={cn('max-w-2xl', textClassName)}>
          <h1 className="text-display-md font-semibold mb-3">{title}</h1>
          {description != null ? (
            <div className="text-body-lg text-muted-foreground">{description}</div>
          ) : null}
          {children != null ? <div className="mt-4">{children}</div> : null}
        </div>
      </div>
    </section>
  );
}
