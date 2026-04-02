import aposentos8Img from '@/assets/projects/aposentos-8.png';
import arturoCalle7Img from '@/assets/projects/arturo-calle-7.png';
import celta7Img from '@/assets/projects/celta-7.png';
import casaUnifamiliar2Img from '@/assets/projects/casa-unifamiliar-2.png';
import centroPenitenciarioImg from '@/assets/projects/centro-penitenciario.png';
import mro3Img from '@/assets/projects/mro-3.png';
import parqueLosLocos1Img from '@/assets/projects/parque-los-locos-1.png';
import villetaSamanes2Img from '@/assets/projects/villeta-samanes-2.png';

export type ProjectStatus = 'completed' | 'in-progress';
export type ProjectRole = 'design' | 'execution' | 'design-execution';
export type ProjectType = 'residential' | 'commercial' | 'institutional' | 'industrial';

export interface Project {
  id: string;
  name: string;
  location: string;
  year: number;
  type: ProjectType;
  role: ProjectRole;
  status: ProjectStatus;
  featured: boolean;
  coverImage: string;
  images: {
    url: string;
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
    location: 'Colombia',
    year: 2024,
    type: 'residential',
    role: 'design-execution',
    status: 'completed',
    featured: true,
    coverImage: aposentos8Img,
    images: [
      { url: aposentos8Img, caption: 'Interior principal', stage: 'completed' },
    ],
    description:
      'Proyecto residencial que articula la luz natural, los materiales y la circulación para crear espacios habitables cálidos y funcionales, con un enfoque en el detalle constructivo y la continuidad visual entre ambientes.',
    deliverables: ['Diseño arquitectónico', 'Interiorismo', 'Dirección de obra'],
  },
  {
    id: 'arturo-calle',
    name: 'Arturo Calle',
    location: 'Colombia',
    year: 2024,
    type: 'commercial',
    role: 'design-execution',
    status: 'completed',
    featured: true,
    coverImage: arturoCalle7Img,
    images: [
      {
        url: arturoCalle7Img,
        caption: 'Interior comercial — zona de exhibición y accesorios',
        stage: 'completed',
      },
    ],
    client: 'Arturo Calle',
    description:
      'Diseño de espacio comercial para la marca: circuito de exhibición, materiales y luminarias que refuerzan la identidad retail y mejoran la experiencia de compra en zonas de ropa y accesorios.',
    deliverables: [
      'Diseño de interior comercial',
      'Ejecución',
      'Coordinación de mobiliario y vitrinas',
    ],
  },
  {
    id: 'celta',
    name: 'Celta',
    location: 'Colombia',
    year: 2024,
    type: 'commercial',
    role: 'design-execution',
    status: 'completed',
    featured: true,
    coverImage: celta7Img,
    images: [
      {
        url: celta7Img,
        caption: 'Interior comercial — exhibición y circulación',
        stage: 'completed',
      },
    ],
    client: 'Celta',
    description:
      'Diseño y ejecución de espacio comercial para la marca: layout de exhibición, iluminación y materiales que ordenan la experiencia de compra y refuerzan la identidad del punto de venta.',
    deliverables: [
      'Diseño de interior comercial',
      'Ejecución',
      'Coordinación de mobiliario y señalética',
    ],
  },
  {
    id: 'casa-unifamiliar',
    name: 'Casa unifamiliar',
    location: 'Colombia',
    year: 2024,
    type: 'residential',
    role: 'design-execution',
    status: 'completed',
    featured: true,
    coverImage: casaUnifamiliar2Img,
    images: [{ url: casaUnifamiliar2Img, caption: 'Vivienda — espacios principales', stage: 'completed' }],
    description:
      'Vivienda unifamiliar donde la relación interior–exterior, la iluminación natural y la elección de materiales definen ambientes cómodos y duraderos, con énfasis en la funcionalidad de la familia.',
    deliverables: ['Diseño arquitectónico', 'Interiorismo', 'Dirección de obra'],
  },
  {
    id: 'centro-penitenciario',
    name: 'Centro penitenciario',
    location: 'Colombia',
    year: 2023,
    type: 'institutional',
    role: 'design-execution',
    status: 'completed',
    featured: true,
    coverImage: centroPenitenciarioImg,
    images: [
      { url: centroPenitenciarioImg, caption: 'Complejo — circulación y volumetría', stage: 'completed' },
    ],
    description:
      'Proyecto institucional de gran escala que organiza circulaciones, seguridad y servicios con criterios técnicos y normativos, integrando la volumetría del conjunto con el entorno.',
    deliverables: ['Diseño arquitectónico', 'Coordinación técnica', 'Ejecución'],
  },
  {
    id: 'mro-3',
    name: 'Instalación MRO y logística',
    location: 'Colombia',
    year: 2023,
    type: 'industrial',
    role: 'design-execution',
    status: 'completed',
    featured: true,
    coverImage: mro3Img,
    images: [{ url: mro3Img, caption: 'Nave e infraestructura de apoyo', stage: 'completed' }],
    description:
      'Infraestructura industrial para operaciones de mantenimiento, reparación y apoyo logístico, con módulos claros de circulación, almacenamiento y talleres.',
    deliverables: ['Diseño arquitectónico', 'Ingeniería de detalle', 'Dirección de obra'],
  },
  {
    id: 'parque-los-locos',
    name: 'Parque Los Locos',
    location: 'Colombia',
    year: 2024,
    type: 'residential',
    role: 'design-execution',
    status: 'completed',
    featured: true,
    coverImage: parqueLosLocos1Img,
    images: [{ url: parqueLosLocos1Img, caption: 'Conjunto — fachadas y espacio común', stage: 'completed' }],
    description:
      'Proyecto residencial que ordena unidades y áreas comunes en torno a paisaje y recorridos peatonales, priorizando confort, privacidad y coherencia formal del conjunto.',
    deliverables: ['Diseño arquitectónico', 'Paisajismo', 'Dirección de obra'],
  },
  {
    id: 'villeta-samanes',
    name: 'Villeta — conjunto Samanes',
    location: 'Villeta, Cundinamarca',
    year: 2024,
    type: 'residential',
    role: 'design-execution',
    status: 'completed',
    featured: true,
    coverImage: villetaSamanes2Img,
    images: [{ url: villetaSamanes2Img, caption: 'Vivienda — integración con el entorno', stage: 'completed' }],
    description:
      'Vivienda en contexto de clima cálido y vegetación, con soluciones de sombra, ventilación cruzada y materiales adecuados al lugar para reducir carga térmica y mantener confort interior.',
    deliverables: ['Diseño arquitectónico', 'Interiorismo', 'Dirección de obra'],
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
