'use client';

import { ScrollReveal } from '@/components/ScrollReveal';
import { processSteps } from '@/data/services';

export interface ProcessStepsSectionTestIds {
  section: string;
  intro: string;
  footnote: string;
}

export interface ProcessStepsSectionProps {
  title: string;
  description: React.ReactNode;
  testIds: ProcessStepsSectionTestIds;
  animateIntro?: boolean;
}

export function ProcessStepsSection({
  title,
  description,
  testIds,
  animateIntro = false,
}: ProcessStepsSectionProps) {
  const introInner = (
    <div data-testid={testIds.intro} className="mb-16">
      <p className="haz-label text-muted-foreground mb-4">Proceso</p>
      <h2 className="text-display-md font-light tracking-[-0.01em] mb-4 text-foreground">{title}</h2>
      <p className="text-body-lg text-muted-foreground max-w-2xl leading-relaxed">
        {description}
      </p>
    </div>
  );

  return (
    <section data-testid={testIds.section} className="bg-card section-padding">
      <div className="container-wide">
        {animateIntro ? <ScrollReveal>{introInner}</ScrollReveal> : introInner}

        <div className="grid grid-cols-1 gap-0 md:grid-cols-5 divide-y md:divide-y-0 md:divide-x divide-border">
          {processSteps.map((step) => (
            <div key={step.number} className="py-8 md:py-0 md:px-8 first:md:pl-0 last:md:pr-0">
              <div className="text-6xl font-light text-accent opacity-20 leading-none mb-6 tabular-nums">
                {step.number}
              </div>
              <h3 className="text-base font-semibold mb-2">{step.title}</h3>
              <p className="text-caption text-muted-foreground leading-relaxed mb-4">
                {step.description}
              </p>
              <p className="haz-label text-accent">{step.duration}</p>
            </div>
          ))}
        </div>

        <div
          data-testid={testIds.footnote}
          className="mt-10 border-t border-border pt-6"
        >
          <p className="text-caption text-muted-foreground">
            * Los tiempos son estimados y varían según la complejidad del proyecto.
          </p>
        </div>
      </div>
    </section>
  );
}
