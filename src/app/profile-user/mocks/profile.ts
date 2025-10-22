export interface User {
    id: string;
    email: string;
    name: string;
    role: 'donor' | 'volunteer' | 'both';
    created_at: string;
}
  
export interface UserProfile {
    id: string;
    user_id: string;
    description: string;
    photo_url: string;
    phone: string;
    address: string;
    created_at: string;
    updated_at: string;
    user?: User;
    stats?: {
      donations: number;
      projects: number;
      volunteers: number;
    };
}

//############################################################

export const mockUserProfile: UserProfile = {
  id: 'user-profile-123',
  user_id: 'user-123',
  description: 'Apasionado por ayudar a la comunidad.',
  photo_url: '/globe.svg',
  phone: '+1 (555) 123-4567',
  address: 'Av. Principal 123, Ciudad, País',
  created_at: '2023-05-15T10:30:00Z',
  updated_at: '2024-01-20T14:25:00Z',
  user: {
    id: 'user-123',
    email: 'maria.garcia@email.com',
    name: 'María García',
    role: 'both',
    created_at: '2023-05-15T10:30:00Z'
  },
  stats: {
    donations: 24,
    projects: 8,
    volunteers: 15
  }
};

export const mockDonorProfile: UserProfile = {
  id: 'user-profile-124',
  user_id: 'user-124',
  description: 'Creo en el poder de la solidaridad y apoyo causas educativas para niños y jóvenes.',
  photo_url: '/static/images/avatars/donor-avatar.jpg',
  phone: '+1 (555) 987-6543',
  address: 'Calle Secundaria 456, Ciudad, País',
  created_at: '2023-08-22T09:15:00Z',
  updated_at: '2024-01-18T11:45:00Z',
  user: {
    id: 'user-124',
    email: 'carlos.rodriguez@email.com',
    name: 'Carlos Rodríguez',
    role: 'donor',
    created_at: '2023-08-22T09:15:00Z'
  },
  stats: {
    donations: 42,
    projects: 3,
    volunteers: 2
  }
};

export const mockVolunteerProfile: UserProfile = {
  id: 'user-profile-125',
  user_id: 'user-125',
  description: 'Voluntario activo en proyectos ambientales y de ayuda humanitaria. Siempre listo para ayudar.',
  photo_url: '/static/images/avatars/volunteer-avatar.jpg',
  phone: '+1 (555) 456-7890',
  address: 'Plaza Central 789, Ciudad, País',
  created_at: '2023-02-10T08:00:00Z',
  updated_at: '2024-01-22T16:30:00Z',
  user: {
    id: 'user-125',
    email: 'ana.martinez@email.com',
    name: 'Ana Martínez',
    role: 'volunteer',
    created_at: '2023-02-10T08:00:00Z'
  },
  stats: {
    donations: 5,
    projects: 12,
    volunteers: 28
  }
};