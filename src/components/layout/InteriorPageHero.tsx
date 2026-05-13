import type { ReactNode } from 'react';
import type { StaticImageData } from 'next/image';
import { OptimizedImage } from '@/components/OptimizedImage';
import { cn } from '@/lib/utils';

type InteriorPageHeroProps = {
  title: string;
  description?: ReactNode;
  children?: ReactNode;
  textClassName?: string;
  /** Si se pasa, muestra una foto de fondo a sangre (sin overlay). Para usarse con precaución: el texto debe contrastar por sí solo. */
  bgImage?: StaticImageData | string;
};

export function InteriorPageHero({
  title,
  description,
  children,
  textClassName,
  bgImage,
}: InteriorPageHeroProps) {
  if (bgImage) {
    return (
      <section className="relative overflow-hidden border-b border-border min-h-[max(14rem,min(30dvh,22rem))]">
        <div className="absolute inset-0 z-0">
          <OptimizedImage
            src={bgImage}
            alt=""
            sizes="100vw"
            className="image-cover"
            eager
          />
          {/* Overlay mínimo solo para legibilidad — sin gradiente decorativo */}
          <div className="absolute inset-0 bg-background/75" />
        </div>
        <div className="relative z-10 container-wide py-12 md:py-16">
          <div className={cn('max-w-2xl', textClassName)}>
            <h1 className="text-display-md font-light tracking-[-0.01em] mb-3">{title}</h1>
            {description != null && (
              <div className="text-body-lg text-muted-foreground">{description}</div>
            )}
            {children != null && <div className="mt-4">{children}</div>}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-card border-b border-border">
      <div className="container-wide py-12 md:py-16">
        <div className={cn('max-w-2xl border-l-2 border-accent pl-6', textClassName)}>
          <h1 className="text-display-md font-light tracking-[-0.01em] mb-3">{title}</h1>
          {description != null && (
            <div className="text-body-lg text-muted-foreground">{description}</div>
          )}
          {children != null && <div className="mt-4">{children}</div>}
        </div>
      </div>
    </section>
  );
}
