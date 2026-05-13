import { InteriorPageHero } from '@/components/layout/InteriorPageHero';
import { ContactForm } from '@/views/ContactForm';
import contactHeroImg from '@/assets/contact-hero.jpg';

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
        bgImage={contactHeroImg}
      />
      <ContactForm />
    </>
  );
}
