import type { StaticImageData } from 'next/image';
import aposentos1Img from '@/assets/projects/aposentos-1.png';
import aposentos2Img from '@/assets/projects/aposentos-2.png';
import aposentos8Img from '@/assets/projects/aposentos-8.png';
import arturoCalle7Img from '@/assets/projects/arturo-calle-7.png';
import celta7Img from '@/assets/projects/celta-7.png';
import casaUnifamiliar2Img from '@/assets/projects/casa-unifamiliar-2.png';
import centroPenitenciarioImg from '@/assets/projects/centro-penitenciario.png';
import mro3Img from '@/assets/projects/mro-3.png';
import parqueLosLocos1Img from '@/assets/projects/parque-los-locos-1.png';
import parqueLosLocos2Img from '@/assets/projects/parque-los-locos-2.png';
import parqueLosLocos3Img from '@/assets/projects/parque-los-locos-3.png';
import parqueLosLocos4Img from '@/assets/projects/parque-los-locos-4.png';
import parqueLosLocos5Img from '@/assets/projects/parque-los-locos-5.png';
import villetaSamanes2Img from '@/assets/projects/villeta-samanes-2.png';

export type ProjectStatus = 'completed' | 'in-progress';
export type ProjectRole = 'design' | 'execution' | 'design-execution';
export type ProjectType = 'residential' | 'commercial' | 'institutional' | 'industrial';

/** Ruta o import estático (Next.js / bundler). */
export type ProjectImageSrc = string | StaticImageData;

export interface Project {
  id: string;
  name: string;
  location: string;
  /** Año para ordenación; si hay rango, usar el año final aquí y `yearLabel` para mostrar. */
  year: number;
  /** Texto mostrado en UI en lugar de `year` (p. ej. "2016-2020"). */
  yearLabel?: string;
  type: ProjectType;
  role: ProjectRole;
  status: ProjectStatus;
  featured: boolean;
  coverImage: ProjectImageSrc;
  images: {
    url: ProjectImageSrc;
    caption?: string;
    stage: 'completed' | 'in-progress';
  }[];
  client?: string;
  area?: string;
  team?: string[];
  description: string;
  challenge?: string;
  solution?: string;
  result?: string;
  deliverables?: string[];
}

export const projects: Project[] = [
  {
    id: 'aposentos',
    name: 'Aposentos',
    location: 'Sopó, Cundinamarca',
    year: 2015,
    type: 'residential',
    role: 'design-execution',
    status: 'completed',
    featured: true,
    coverImage: aposentos8Img,
    area: '2.500 m²',
    images: [
      { url: aposentos8Img, caption: 'Interior principal', stage: 'completed' },
      {
        url: aposentos1Img,
        caption: 'Espacios sociales y circulación',
        stage: 'completed',
      },
      {
        url: aposentos2Img,
        caption: 'Detalle de acabados y accesibilidad',
        stage: 'completed',
      },
    ],
    description:
      'Remodelación de gran envergadura en la que se logró el acceso para personas con movilidad reducida (PMR) a todas las instalaciones. El reto consistió en adaptar la construcción para el disfrute general sin exclusión. Se colaboró en diseño buscando la menor afectación estructural y espacial, en las distintas etapas y disciplinas. Área intervenida: 2.500 m², con cocina, comedor, piscina, sauna, turco, jacuzzi, baños, rampa, ascensor, terrazas, salón de juegos y salón de eventos.',
    deliverables: [
      'Coordinación de remodelación integral',
      'Accesibilidad PMR en todas las instalaciones',
      'Apoyo en diseño con mínima afectación estructural',
      'Coordinación de obra por etapas y disciplinas',
    ],
  },
  {
    id: 'arturo-calle',
    name: 'Arturo Calle',
    location: 'Cali, Medellín, Sincelejo, Bogotá y otras ciudades',
    year: 2020,
    yearLabel: '2016-2020',
    type: 'commercial',
    role: 'execution',
    status: 'completed',
    featured: true,
    coverImage: arturoCalle7Img,
    client: 'Payc S.A.S. (ahora Egis)',
    images: [
      {
        url: arturoCalle7Img,
        caption: 'Interior comercial: zona de exhibición y accesorios',
        stage: 'completed',
      },
      {
        url: arturoCalle7Img,
        caption: 'Lineal de atención y materialidad',
        stage: 'completed',
      },
    ],
    description:
      'Interventoría y construcción de locales con Payc S.A.S. (ahora Egis), superando desafíos en programación, presupuesto, acabados e instalaciones y el control general de cada disciplina. En el sector retail se ejecutaron y entregaron en promedio alrededor de 10.000 m² por año hasta la apertura en óptimas condiciones de funcionamiento. Gran ejercicio profesional en varias ciudades del país: Cali, Medellín, Sincelejo, Bogotá, entre otras.',
    deliverables: [
      'Interventoría de obra',
      'Construcción y entrega de locales',
      'Control de programa, presupuesto y calidad de acabados',
      'Coordinación de instalaciones y disciplinas',
    ],
  },
  {
    id: 'celta',
    name: 'Parque industrial Celta, Bodega 57',
    location: 'Cota, Cundinamarca',
    year: 2007,
    type: 'industrial',
    role: 'execution',
    status: 'completed',
    featured: true,
    coverImage: celta7Img,
    client: 'Armotec S.A.S. · Ingeniería de Vías',
    images: [
      {
        url: celta7Img,
        caption: 'Bodega industrial: cubierta y circulación',
        stage: 'completed',
      },
      {
        url: celta7Img,
        caption: 'Gran luz libre y montaje estructural',
        stage: 'completed',
      },
    ],
    description:
      'Con Armotec S.A.S. se desarrolló la construcción y el control de la Bodega 57 de Ingeniería de Vías. El reto fue superar la luz libre de cubierta de más de 50 m, junto con las dependencias, equipos de montaje y especialidades asociadas.',
    deliverables: [
      'Construcción y control de obra (bodega y anexos)',
      'Coordinación de montajes y especialidades',
      'Seguimiento de equipos e instalaciones',
    ],
  },
  {
    id: 'casa-unifamiliar',
    name: 'Vivienda unifamiliar',
    location: 'Chía, Cundinamarca',
    year: 2013,
    type: 'residential',
    role: 'design',
    status: 'completed',
    featured: true,
    coverImage: casaUnifamiliar2Img,
    images: [{ url: casaUnifamiliar2Img, caption: 'Vivienda: espacios principales', stage: 'completed' }],
    description:
      'Interpretación de las intenciones del cliente llevadas al espacio y a la funcionalidad. Diseño de vivienda desarrollado a través de la unión familiar en torno a la alimentación, potenciando la inversión.',
    deliverables: [
      'Diseño arquitectónico',
      'Desarrollo funcional y espacial',
      'Acompañamiento para potenciar la inversión',
    ],
  },
  {
    id: 'centro-penitenciario',
    name: 'Nuevo centro penal de Oriente',
    location: 'Acacías, Meta',
    year: 2000,
    type: 'institutional',
    role: 'execution',
    status: 'completed',
    featured: true,
    coverImage: centroPenitenciarioImg,
    area: '40.000 m²',
    images: [
      {
        url: centroPenitenciarioImg,
        caption: 'Complejo: circulación y volumetría',
        stage: 'completed',
      },
      {
        url: centroPenitenciarioImg,
        caption: 'Fachadas y orden del conjunto',
        stage: 'completed',
      },
      {
        url: centroPenitenciarioImg,
        caption: 'Módulos y espacios exteriores',
        stage: 'completed',
      },
      {
        url: centroPenitenciarioImg,
        caption: 'Detalle constructivo',
        stage: 'completed',
      },
    ],
    description:
      'Macroproyecto con dirección técnico-administrativa, control de contrato y contratistas, y residencia de obra para armado y vaciado de hormigón. Se concluyeron los 11 pabellones, pabellones aislados, garitas de guardia, áreas administrativas, talleres, cocina, módulos de máxima seguridad y demás infraestructura, en un área aproximada de 40.000 m².',
    deliverables: [
      'Dirección técnico-administrativa',
      'Control de contrato y contratistas',
      'Supervisión de obra civil y hormigón',
      'Coordinación de pabellones e infraestructura penitenciaria',
    ],
  },
  {
    id: 'mro-3',
    name: 'MRO Avianca, Aeropuerto JMC',
    location: 'Rionegro, Antioquia',
    year: 2021,
    type: 'industrial',
    role: 'execution',
    status: 'completed',
    featured: true,
    coverImage: mro3Img,
    client: 'Avianca (Payc S.A.S.)',
    images: [
      { url: mro3Img, caption: 'Hangar e infraestructura MRO', stage: 'completed' },
      {
        url: mro3Img,
        caption: 'Operación aeronáutica y soporte en pista',
        stage: 'completed',
      },
    ],
    description:
      'Con Payc S.A.S. se atendió al cliente Avianca en el MRO del aeropuerto José María Córdova (Rionegro): mantenimiento y ampliación del casino y el hangar, e interventoría para la implementación de almacenamiento vertical Modula. Ampliación de oficinas, inspección y supervisión de instalaciones eléctrica, sanitaria y RCI.',
    deliverables: [
      'Mantenimiento y ampliación de casino, hangar y oficinas',
      'Interventoría en implementación de almacenamiento Modula',
      'Inspección y supervisión de instalaciones eléctrica y sanitaria',
      'Supervisión de instalaciones RCI',
    ],
  },
  {
    id: 'parque-los-locos',
    name: 'Parque Los Locos',
    location: 'Soacha, Cundinamarca',
    year: 2022,
    type: 'institutional',
    role: 'execution',
    status: 'completed',
    featured: true,
    coverImage: parqueLosLocos1Img,
    area: '+22.000 m²',
    images: [
      {
        url: parqueLosLocos1Img,
        caption: 'Complejo deportivo: fachadas y espacios exteriores',
        stage: 'completed',
      },
      {
        url: parqueLosLocos2Img,
        caption: 'Equipamientos y cubiertas',
        stage: 'completed',
      },
      {
        url: parqueLosLocos3Img,
        caption: 'Relación con el entorno urbano',
        stage: 'completed',
      },
      {
        url: parqueLosLocos4Img,
        caption: 'Circulación y plazas exteriores',
        stage: 'completed',
      },
      {
        url: parqueLosLocos5Img,
        caption: 'Espacios deportivos y amenidades',
        stage: 'completed',
      },
    ],
    description:
      'Estructuración y dirección del proyecto desde el día cero hasta acabados, con control de etapas hasta su culminación. Infraestructura de más de 22.000 m²: auditorio; canchas de pádel, tenis, fútbol y squash; gimnasio; edificio administrativo; parqueadero; zona de juegos infantiles; skate park y teatrino.',
    deliverables: [
      'Estructuración y dirección de proyecto',
      'Control de etapas hasta acabados',
      'Coordinación de infraestructura deportiva y edificaciones',
      'Coordinación de especialidades e instalaciones',
    ],
  },
  {
    id: 'villeta-samanes',
    name: 'Casa Los Samanes',
    location: 'Villeta, Cundinamarca',
    year: 2015,
    type: 'residential',
    role: 'execution',
    status: 'completed',
    featured: true,
    coverImage: villetaSamanes2Img,
    area: '+750 m²',
    images: [
      {
        url: villetaSamanes2Img,
        caption: 'Vivienda campestre: integración con el entorno',
        stage: 'completed',
      },
      {
        url: villetaSamanes2Img,
        caption: 'Cubierta, piscina y zona exterior',
        stage: 'completed',
      },
    ],
    description:
      'Construcción de vivienda unifamiliar campestre, desde el descapote y la localización hasta la entrega. Un gran logro por la complejidad del terreno y la estructura con cubierta abovedada, la piscina y los acabados al detalle. Más de 750 m².',
    deliverables: [
      'Construcción y dirección de obra',
      'Desarrollo estructural y cubierta abovedada',
      'Piscina y obra exterior',
      'Acabados de detalle',
    ],
  },
];

export const getProjectsByFilter = (
  typeFilter?: ProjectType[],
  roleFilter?: ProjectRole[],
  statusFilter?: ProjectStatus[],
  featuredOnly?: boolean
): Project[] => {
  let filtered = [...projects];

  if (featuredOnly) {
    filtered = filtered.filter(p => p.featured);
  }

  if (typeFilter && typeFilter.length > 0) {
    filtered = filtered.filter(p => typeFilter.includes(p.type));
  }

  if (roleFilter && roleFilter.length > 0) {
    filtered = filtered.filter(p => roleFilter.includes(p.role));
  }

  if (statusFilter && statusFilter.length > 0) {
    filtered = filtered.filter(p => statusFilter.includes(p.status));
  }

  // Sort: terminado antes que en obra; mismo estado por año descendente
  return filtered.sort((a, b) => {
    if (a.status !== b.status) {
      const order: Record<ProjectStatus, number> = { completed: 0, 'in-progress': 1 };
      return order[a.status] - order[b.status];
    }
    return b.year - a.year;
  });
};

export const getFeaturedProjects = (): Project[] => {
  return getProjectsByFilter(undefined, undefined, undefined, true).slice(0, 12);
};

export const getProjectById = (id: string): Project | undefined => {
  return projects.find(p => p.id === id);
};
