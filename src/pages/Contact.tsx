import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { submitContactForm } from "@/lib/contactSubmit";

export default function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const form = e.currentTarget;
    const fd = new FormData(form);

    const name = String(fd.get("name") ?? "").trim();
    const company = String(fd.get("company") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    const phone = String(fd.get("phone") ?? "").trim();
    const projectTypeRaw = String(fd.get("project-type") ?? "").trim();
    const message = String(fd.get("message") ?? "").trim();

    try {
      await submitContactForm({
        name,
        company: company || undefined,
        email,
        phone: phone || undefined,
        project_type: projectTypeRaw || undefined,
        message,
      });
      toast({
        title: "Mensaje enviado",
        description: "Nos pondremos en contacto con usted pronto.",
      });
      form.reset();
    } catch (err) {
      toast({
        variant: "destructive",
        title: "No se pudo enviar",
        description:
          err instanceof Error
            ? err.message
            : "Intente de nuevo más tarde o use otro canal de contacto.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <SEO
        title="Contacto"
        description="Contáctenos para cotizar su proyecto. HAZ Arquitectura: diseño y ejecución de obra con más de 30 años de experiencia."
        path="/contacto"
      />
      {/* Header */}
      <section className="section-padding-sm bg-card border-b border-border">
        <div className="container-wide">
          <h1 className="text-display-md font-semibold mb-4">Contacto</h1>
          <p className="text-body-lg text-muted-foreground max-w-2xl">
            ¿Tiene un proyecto en mente? Cuéntenos sobre él y le responderemos
            a la brevedad.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-semibold mb-6">Envíenos un mensaje</h2>
            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
              Los datos que envíe con este formulario se usan solo para
              responder a su consulta y se registran de forma segura en nuestros
              sistemas. No los compartimos con terceros para fines comerciales.
              Puede solicitar corrección o eliminación escribiéndonos al correo
              de contacto del estudio.
            </p>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre *</Label>
                  <Input
                    id="name"
                    name="name"
                    required
                    placeholder="Su nombre"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Empresa</Label>
                  <Input
                    id="company"
                    name="company"
                    placeholder="Su empresa"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Correo electrónico *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="correo@ejemplo.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Teléfono</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+57 300 000 0000"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="project-type">Tipo de proyecto</Label>
                <select
                  id="project-type"
                  name="project-type"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <option value="">Seleccione una opción</option>
                  <option value="residential">Residencial</option>
                  <option value="commercial">Comercial</option>
                  <option value="institutional">Institucional</option>
                  <option value="industrial">Industrial</option>
                  <option value="other">Otro</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Mensaje *</Label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  placeholder="Cuéntenos sobre su proyecto..."
                />
              </div>

              <Button type="submit" size="lg" disabled={isSubmitting}>
                {isSubmitting ? "Enviando..." : "Enviar mensaje"}
              </Button>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
}
