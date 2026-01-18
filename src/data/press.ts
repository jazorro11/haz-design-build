export interface PressItem {
  id: string;
  title: string;
  publication: string;
  year: number;
  projectId?: string;
  coverImage?: string;
  link?: string;
}

export const pressItems: PressItem[] = [
  {
    id: '1',
    title: 'Torre Andina: El nuevo referente corporativo de Bogotá',
    publication: 'Revista Proyecto Diseño',
    year: 2023,
    projectId: 'torre-andina',
  },
  {
    id: '2',
    title: 'Arquitectura y patrimonio en Cartagena',
    publication: 'Archdaily Colombia',
    year: 2023,
    projectId: 'centro-cultural-libertad',
  },
  {
    id: '3',
    title: 'Residencias que dialogan con el paisaje',
    publication: 'Axxis Magazine',
    year: 2022,
    projectId: 'residencias-parque-central',
  },
  {
    id: '4',
    title: 'HAZ Arquitectura: 30 años de trayectoria',
    publication: 'El Tiempo - Suplemento de Construcción',
    year: 2023,
  },
  {
    id: '5',
    title: 'Centros comerciales del futuro',
    publication: 'Revista Semana',
    year: 2020,
    projectId: 'centro-comercial-norte',
  },
];
