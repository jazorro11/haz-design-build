import { InteriorPageHero } from '@/components/layout/InteriorPageHero';
import ProjectsClient from '@/views/ProjectsClient';

export default function Projects() {
  return (
    <>
      <InteriorPageHero
        title="Proyectos"
        description={
          <>
            Trabajo arquitectónico desde el concepto hasta la entrega de obra, en
            proyectos residenciales, comerciales, institucionales e industriales.
          </>
        }
      />
      <ProjectsClient />
    </>
  );
}
