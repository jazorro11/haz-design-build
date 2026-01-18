import { Compass, FileStack, HardHat, Users, Wrench } from 'lucide-react';

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
}

export const services: Service[] = [
  {
    id: 'design',
    title: 'Diseño Arquitectónico',
    description: 'Conceptualización y desarrollo de proyectos que equilibran estética, funcionalidad y viabilidad constructiva.',
    icon: 'Compass',
    features: [
      'Estudios de factibilidad y anteproyecto',
      'Diseño esquemático y desarrollo',
      'Visualización 3D y renders',
    ],
  },
  {
    id: 'documentation',
    title: 'Desarrollo Técnico',
    description: 'Documentación completa para construcción con coordinación integral de especialidades.',
    icon: 'FileStack',
    features: [
      'Planos de construcción detallados',
      'Especificaciones técnicas',
      'Coordinación BIM multidisciplinaria',
    ],
  },
  {
    id: 'construction',
    title: 'Dirección de Obra',
    description: 'Supervisión y ejecución de proyectos con control de calidad, cronograma y presupuesto.',
    icon: 'HardHat',
    features: [
      'Gerencia de construcción',
      'Control de calidad y avance',
      'Gestión de proveedores',
    ],
  },
  {
    id: 'coordination',
    title: 'Interventoría',
    description: 'Supervisión técnica independiente para asegurar cumplimiento de estándares y especificaciones.',
    icon: 'Users',
    features: [
      'Control técnico de obra',
      'Verificación de calidad',
      'Informes de seguimiento',
    ],
  },
  {
    id: 'renovation',
    title: 'Remodelaciones',
    description: 'Adecuaciones y renovaciones de espacios existentes con enfoque en optimización y actualización.',
    icon: 'Wrench',
    features: [
      'Diagnóstico y propuesta',
      'Diseño de intervención',
      'Ejecución controlada',
    ],
  },
];

export const processSteps = [
  {
    number: '01',
    title: 'Consulta Inicial',
    description: 'Entendemos sus necesidades, objetivos y restricciones del proyecto.',
    duration: '1-2 semanas',
  },
  {
    number: '02',
    title: 'Concepto y Anteproyecto',
    description: 'Desarrollamos opciones de diseño con estimaciones preliminares.',
    duration: '4-8 semanas',
  },
  {
    number: '03',
    title: 'Desarrollo Técnico',
    description: 'Documentación completa para licencias y construcción.',
    duration: '8-16 semanas',
  },
  {
    number: '04',
    title: 'Construcción',
    description: 'Ejecución de obra con supervisión permanente y control de calidad.',
    duration: 'Variable',
  },
  {
    number: '05',
    title: 'Entrega',
    description: 'Recepción final, documentación as-built y garantías.',
    duration: '2-4 semanas',
  },
];
