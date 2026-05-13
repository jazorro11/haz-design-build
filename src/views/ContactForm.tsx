'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

export function ContactForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [projectType, setProjectType] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setIsSubmitting(true);

    const fd = new FormData(form);
    const payload = {
      name: String(fd.get('name') ?? '').trim(),
      company: String(fd.get('company') ?? '').trim(),
      email: String(fd.get('email') ?? '').trim(),
      phone: String(fd.get('phone') ?? '').trim(),
      projectType: String(fd.get('project-type') ?? '').trim(),
      message: String(fd.get('message') ?? '').trim(),
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
      };

      if (!res.ok || !data.ok) {
        toast({
          variant: 'destructive',
          title: 'No se pudo enviar',
          description:
            data.error ??
            'Intente de nuevo más tarde o use los datos de contacto directos.',
        });
        return;
      }

      toast({
        title: 'Mensaje enviado',
        description: 'Nos pondremos en contacto con usted pronto.',
      });
      form.reset();
      setProjectType('');
    } catch {
      toast({
        variant: 'destructive',
        title: 'No se pudo enviar',
        description: 'Compruebe su conexión e intente de nuevo.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="section-padding-after-hero">
      <div className="container-wide">
        <div className="mx-auto w-full max-w-3xl">
          <h2 className="text-display-md font-light tracking-[-0.01em] mb-8">
            Envíenos un mensaje
          </h2>
          <form
            onSubmit={handleSubmit}
            className="space-y-6 rounded-none border border-border/80 bg-card/40 p-6 sm:p-8 md:p-10"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre *</Label>
                <Input id="name" name="name" required placeholder="Su nombre" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Empresa</Label>
                <Input id="company" name="company" placeholder="Su empresa" />
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
              <Select name="project-type" value={projectType} onValueChange={setProjectType}>
                <SelectTrigger id="project-type" className="rounded-none">
                  <SelectValue placeholder="Seleccione una opción" />
                </SelectTrigger>
                <SelectContent className="rounded-none">
                  <SelectItem value="residential">Residencial</SelectItem>
                  <SelectItem value="commercial">Comercial</SelectItem>
                  <SelectItem value="institutional">Institucional</SelectItem>
                  <SelectItem value="industrial">Industrial</SelectItem>
                  <SelectItem value="other">Otro</SelectItem>
                </SelectContent>
              </Select>
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

            <div className="flex justify-center pt-2 sm:justify-start">
              <Button type="submit" size="lg" disabled={isSubmitting}>
                {isSubmitting ? 'Enviando...' : 'Enviar mensaje'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
