export interface Client {
  id: string;
  name: string;
  logo?: string;
  featured: boolean;
}

export const clients: Client[] = [
  { id: '1', name: 'Grupo Empresarial Andino', featured: true },
  { id: '2', name: 'Constructora Urbana S.A.', featured: true },
  { id: '3', name: 'Ministerio de Cultura', featured: true },
  { id: '4', name: 'Grupo Hotelero Nacional', featured: true },
  { id: '5', name: 'Fondo de Inversión Tecnológico', featured: true },
  { id: '6', name: 'Inversiones Norte S.A.', featured: true },
  { id: '7', name: 'Fundación Educativa', featured: true },
  { id: '8', name: 'Bavaria S.A.', featured: true },
  { id: '9', name: 'Bancolombia', featured: true },
  { id: '10', name: 'Grupo Éxito', featured: true },
  { id: '11', name: 'Ecopetrol', featured: true },
  { id: '12', name: 'Alpina', featured: true },
  { id: '13', name: 'Cemex Colombia', featured: false },
  { id: '14', name: 'Colcerámica', featured: false },
  { id: '15', name: 'Cementos Argos', featured: false },
  { id: '16', name: 'ISA', featured: false },
  { id: '17', name: 'Grupo Bolívar', featured: false },
  { id: '18', name: 'Avianca', featured: false },
  { id: '19', name: 'Universidad de los Andes', featured: false },
  { id: '20', name: 'Pontificia Universidad Javeriana', featured: false },
  { id: '21', name: 'Clínica del Country', featured: false },
  { id: '22', name: 'Fundación Cardioinfantil', featured: false },
  { id: '23', name: 'Grupo Aval', featured: false },
  { id: '24', name: 'Suramericana', featured: false },
  { id: '25', name: 'Grupo Nutresa', featured: false },
];

export const getFeaturedClients = (): Client[] => {
  return clients.filter(c => c.featured);
};

export const getAllClients = (): Client[] => {
  return clients;
};
