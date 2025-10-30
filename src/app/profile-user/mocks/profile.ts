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