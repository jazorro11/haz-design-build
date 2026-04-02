import torreAndinaImg from '@/assets/projects/torre-andina.jpg';
import residenciasParqueImg from '@/assets/projects/residencias-parque.jpg';
import centroCulturalImg from '@/assets/projects/centro-cultural.jpg';
import bodegaIndustrialImg from '@/assets/projects/bodega-industrial.jpg';
import hotelBoutiqueImg from '@/assets/projects/hotel-boutique.jpg';
import techHubImg from '@/assets/projects/tech-hub.jpg';
import aposentos8Img from '@/assets/projects/aposentos-8.png';
import arturoCalle7Img from '@/assets/projects/arturo-calle-7.png';
import celta7Img from '@/assets/projects/celta-7.png';

export type ProjectStatus = 'completed' | 'in-progress' | 'published';
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
  published: boolean;
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
    id: 'torre-andina',
    name: 'Torre Andina',
    location: 'Bogotá, Colombia',
    year: 2023,
    type: 'commercial',
    role: 'design-execution',
    status: 'completed',
    featured: true,
    published: true,
    coverImage: torreAndinaImg,
    images: [
      { url: torreAndinaImg, caption: 'Vista principal', stage: 'completed' },
      { url: torreAndinaImg, caption: 'Lobby de acceso', stage: 'completed' },
    ],
    client: 'Grupo Empresarial Andino',
    area: '45,000 m²',
    team: ['Arq. Director Principal', 'Ing. Estructural'],
    description: 'Edificio corporativo de 25 pisos que redefine el skyline del norte de Bogotá. El diseño integra espacios de trabajo flexibles con áreas verdes y tecnología de punta.',
    challenge: 'Crear un edificio que maximice eficiencia energética sin sacrificar la experiencia del usuario.',
    solution: 'Fachada de doble piel con control solar activo y sistemas de ventilación natural.',
    result: 'Certificación LEED Gold y 30% de ahorro energético respecto a edificios similares.',
    deliverables: ['Diseño arquitectónico completo', 'Dirección de obra', 'Coordinación MEP'],
  },
  {
    id: 'residencias-parque-central',
    name: 'Residencias Parque Central',
    location: 'Medellín, Colombia',
    year: 2022,
    type: 'residential',
    role: 'design-execution',
    status: 'completed',
    featured: true,
    published: true,
    coverImage: residenciasParqueImg,
    images: [
      { url: residenciasParqueImg, caption: 'Fachada principal', stage: 'completed' },
      { url: residenciasParqueImg, caption: 'Áreas comunes', stage: 'completed' },
    ],
    client: 'Constructora Urbana S.A.',
    area: '28,000 m²',
    description: 'Complejo residencial de alta gama con 120 unidades distribuidas en tres torres, integrando el paisaje natural del valle.',
    challenge: 'Maximizar vistas y ventilación natural en un terreno con pendiente pronunciada.',
    solution: 'Diseño escalonado que aprovecha la topografía para crear terrazas privadas en cada unidad.',
    result: 'Ventas completadas 6 meses antes de la entrega.',
    deliverables: ['Diseño integral', 'Construcción llave en mano', 'Paisajismo'],
  },
  {
    id: 'centro-cultural-libertad',
    name: 'Centro Cultural Libertad',
    location: 'Cartagena, Colombia',
    year: 2023,
    type: 'institutional',
    role: 'design',
    status: 'completed',
    featured: true,
    published: true,
    coverImage: centroCulturalImg,
    images: [
      { url: centroCulturalImg, caption: 'Vista del patio central', stage: 'completed' },
    ],
    client: 'Ministerio de Cultura',
    area: '8,500 m²',
    description: 'Espacio cultural que dialoga con el patrimonio colonial de la ciudad amurallada, incorporando materiales contemporáneos con técnicas tradicionales.',
    deliverables: ['Diseño arquitectónico', 'Documentación técnica', 'Supervisión de obra'],
  },
  {
    id: 'bodega-industrial-zona-franca',
    name: 'Bodega Industrial Zona Franca',
    location: 'Barranquilla, Colombia',
    year: 2024,
    type: 'industrial',
    role: 'execution',
    status: 'in-progress',
    featured: true,
    published: false,
    coverImage: bodegaIndustrialImg,
    images: [
      { url: bodegaIndustrialImg, caption: 'Avance estructural', stage: 'in-progress' },
    ],
    client: 'Confidencial',
    area: '35,000 m²',
    description: 'Centro logístico de clase A con capacidad para operaciones de almacenamiento y distribución a gran escala.',
    deliverables: ['Dirección de obra', 'Coordinación de contratistas'],
  },
  {
    id: 'hotel-boutique-santafe',
    name: 'Hotel Boutique Santa Fe',
    location: 'Bogotá, Colombia',
    year: 2021,
    type: 'commercial',
    role: 'design-execution',
    status: 'completed',
    featured: true,
    published: false,
    coverImage: hotelBoutiqueImg,
    images: [
      { url: hotelBoutiqueImg, caption: 'Lobby del hotel', stage: 'completed' },
      { url: hotelBoutiqueImg, caption: 'Área de recepción', stage: 'completed' },
    ],
    client: 'Grupo Hotelero Nacional',
    area: '4,200 m²',
    description: 'Restauración y adecuación de casona patrimonial del siglo XIX para uso hotelero de lujo, preservando elementos históricos.',
    deliverables: ['Diseño interior', 'Restauración patrimonial', 'Construcción'],
  },
  {
    id: 'oficinas-tech-hub',
    name: 'Oficinas Tech Hub',
    location: 'Bogotá, Colombia',
    year: 2024,
    type: 'commercial',
    role: 'design-execution',
    status: 'in-progress',
    featured: true,
    published: false,
    coverImage: techHubImg,
    images: [
      { url: techHubImg, caption: 'Estructura en progreso', stage: 'in-progress' },
    ],
    client: 'Fondo de Inversión Tecnológico',
    area: '15,000 m²',
    description: 'Campus de oficinas diseñado para empresas de tecnología, con espacios colaborativos y amenidades de bienestar.',
    deliverables: ['Diseño arquitectónico', 'Dirección de obra'],
  },
  {
    id: 'vivienda-unifamiliar-el-poblado',
    name: 'Casa El Poblado',
    location: 'Medellín, Colombia',
    year: 2022,
    type: 'residential',
    role: 'design',
    status: 'completed',
    featured: false,
    published: false,
    coverImage: residenciasParqueImg,
    images: [
      { url: residenciasParqueImg, stage: 'completed' },
    ],
    area: '850 m²',
    description: 'Vivienda unifamiliar contemporánea con diseño bioclimático integrado al paisaje montañoso.',
    deliverables: ['Diseño arquitectónico', 'Interiorismo'],
  },
  {
    id: 'centro-comercial-norte',
    name: 'Centro Comercial Norte',
    location: 'Bucaramanga, Colombia',
    year: 2020,
    type: 'commercial',
    role: 'design-execution',
    status: 'completed',
    featured: false,
    published: true,
    coverImage: torreAndinaImg,
    images: [
      { url: torreAndinaImg, stage: 'completed' },
    ],
    client: 'Inversiones Norte S.A.',
    area: '52,000 m²',
    description: 'Centro comercial con enfoque en experiencia del visitante, incorporando plazas abiertas y circulación natural.',
    deliverables: ['Diseño completo', 'Construcción', 'Coordinación de locatarios'],
  },
  {
    id: 'colegio-internacional',
    name: 'Colegio Internacional del Valle',
    location: 'Cali, Colombia',
    year: 2019,
    type: 'institutional',
    role: 'design-execution',
    status: 'completed',
    featured: false,
    published: true,
    coverImage: centroCulturalImg,
    images: [
      { url: centroCulturalImg, stage: 'completed' },
    ],
    client: 'Fundación Educativa',
    area: '18,000 m²',
    description: 'Campus educativo bilingüe con instalaciones deportivas, laboratorios y espacios de aprendizaje innovadores.',
    deliverables: ['Diseño arquitectónico', 'Paisajismo', 'Construcción por fases'],
  },
  {
    id: 'edificio-apartamentos-chapinero',
    name: 'Edificio Chapinero 72',
    location: 'Bogotá, Colombia',
    year: 2021,
    type: 'residential',
    role: 'design',
    status: 'completed',
    featured: false,
    published: false,
    coverImage: residenciasParqueImg,
    images: [
      { url: residenciasParqueImg, stage: 'completed' },
    ],
    area: '6,800 m²',
    description: 'Edificio de apartamentos con diseño contemporáneo enfocado en eficiencia espacial.',
    deliverables: ['Diseño arquitectónico', 'Documentación técnica'],
  },
  {
    id: 'nave-industrial-siberia',
    name: 'Nave Industrial Siberia',
    location: 'Cundinamarca, Colombia',
    year: 2023,
    type: 'industrial',
    role: 'execution',
    status: 'completed',
    featured: false,
    published: false,
    coverImage: bodegaIndustrialImg,
    images: [
      { url: bodegaIndustrialImg, stage: 'completed' },
    ],
    area: '22,000 m²',
    description: 'Bodega industrial con altura libre de 12 metros y sistemas logísticos automatizados.',
    deliverables: ['Dirección de obra', 'Control de calidad'],
  },
  {
    id: 'restaurante-terraza',
    name: 'Restaurante La Terraza',
    location: 'Santa Marta, Colombia',
    year: 2022,
    type: 'commercial',
    role: 'design-execution',
    status: 'completed',
    featured: false,
    published: false,
    coverImage: hotelBoutiqueImg,
    images: [
      { url: hotelBoutiqueImg, stage: 'completed' },
    ],
    area: '650 m²',
    description: 'Restaurante frente al mar con diseño que maximiza vistas y ventilación natural.',
    deliverables: ['Diseño interior', 'Construcción'],
  },
  {
    id: 'aposentos',
    name: 'Aposentos',
    location: 'Colombia',
    year: 2024,
    type: 'residential',
    role: 'design-execution',
    status: 'completed',
    featured: true,
    published: true,
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
    published: true,
    coverImage: arturoCalle7Img,
    images: [
      { url: arturoCalle7Img, caption: 'Interior comercial — zona de exhibición y accesorios', stage: 'completed' },
    ],
    client: 'Arturo Calle',
    description:
      'Diseño de espacio comercial para la marca: circuito de exhibición, materiales y luminarias que refuerzan la identidad retail y mejoran la experiencia de compra en zonas de ropa y accesorios.',
    deliverables: ['Diseño de interior comercial', 'Ejecución', 'Coordinación de mobiliario y vitrinas'],
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
    published: true,
    coverImage: celta7Img,
    images: [
      { url: celta7Img, caption: 'Interior comercial — exhibición y circulación', stage: 'completed' },
    ],
    client: 'Celta',
    description:
      'Diseño y ejecución de espacio comercial para la marca: layout de exhibición, iluminación y materiales que ordenan la experiencia de compra y refuerzan la identidad del punto de venta.',
    deliverables: ['Diseño de interior comercial', 'Ejecución', 'Coordinación de mobiliario y señalética'],
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
  
  // Sort: published first, then completed, then in-progress
  return filtered.sort((a, b) => {
    if (a.published !== b.published) return b.published ? 1 : -1;
    if (a.status !== b.status) {
      const order = { 'completed': 0, 'in-progress': 1, 'published': 2 };
      return order[a.status] - order[b.status];
    }
    return b.year - a.year;
  });
};

export const getFeaturedProjects = (): Project[] => {
  return getProjectsByFilter(undefined, undefined, undefined, true).slice(0, 6);
};

export const getProjectById = (id: string): Project | undefined => {
  return projects.find(p => p.id === id);
};
