'use client';

import { ArrowRight } from 'lucide-react';
import { OptimizedImage } from '@/components/OptimizedImage';
import { ScrollReveal } from '@/components/ScrollReveal';
import { processSteps } from '@/data/services';
import processSectionBg from '@/assets/maqueta.png';

export interface ProcessStepsSectionTestIds {
  section: string;
  intro: string;
  footnote: string;
}

export interface ProcessStepsSectionProps {
  title: string;
  description: React.ReactNode;
  testIds: ProcessStepsSectionTestIds;
  /** Envuelve el bloque de título y lead con animación al scroll (p. ej. en la home). */
  animateIntro?: boolean;
}

export function ProcessStepsSection({
  title,
  description,
  testIds,
  animateIntro = false,
}: ProcessStepsSectionProps) {
  const introInner = (
    <div
      data-testid={testIds.intro}
      className="mx-auto mb-16 max-w-5xl px-4 text-center sm:px-8"
    >
      <h2 className="text-display-md font-semibold mb-4 text-foreground">{title}</h2>
      <p className="text-body-lg mx-auto max-w-3xl leading-relaxed text-muted-foreground">
        {description}
      </p>
    </div>
  );

  return (
    <section
      data-testid={testIds.section}
      className="relative overflow-hidden section-padding"
    >
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
        <OptimizedImage
          src={processSectionBg}
          alt=""
          sizes="100vw"
          className="scale-[1.02] object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-background/30" />
      </div>

      <div className="relative z-10 container-wide">
        {animateIntro ? <ScrollReveal>{introInner}</ScrollReveal> : introInner}

        <div className="grid grid-cols-1 gap-6 md:grid-cols-5">
          {processSteps.map((step, index) => (
            <div
              key={step.number}
              className="relative flex h-full flex-col rounded-lg border border-border bg-background p-6"
            >
              <div className="mb-4 text-5xl font-light text-primary/20">{step.number}</div>
              <h3 className="mb-2 text-lg font-semibold">{step.title}</h3>
              <p className="flex-1 text-caption text-muted-foreground">{step.description}</p>
              <span className="mt-auto block border-t border-border/50 pt-3 text-center text-micro font-semibold uppercase tracking-wide text-primary tabular-nums">
                {step.duration}
              </span>

              {index < processSteps.length - 1 && (
                <div className="absolute top-1/2 -right-4 z-10 hidden -translate-y-1/2 transform text-border md:block">
                  <ArrowRight size={24} />
                </div>
              )}
            </div>
          ))}
        </div>

        <div
          data-testid={testIds.footnote}
          className="mx-auto mt-10 max-w-3xl px-4 text-center sm:px-6"
        >
          <p className="text-caption leading-relaxed text-muted-foreground">
            * Los tiempos son estimados y varían según la complejidad del proyecto.
          </p>
        </div>
      </div>
    </section>
  );
}
