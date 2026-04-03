import { InteriorPageHero } from '@/components/layout/InteriorPageHero';
import { ContactForm } from '@/views/ContactForm';

export default function Contact() {
  return (
    <>
      <InteriorPageHero
        title="Contacto"
        description={
          <>
            ¿Tiene un proyecto en mente? Cuéntenos sobre él y le responderemos a la
            brevedad.
          </>
        }
      />
      <ContactForm />
    </>
  );
}
