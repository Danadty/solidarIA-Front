import API from './client';

export const DonationsAPI = {
  create: (data: any) => API.post('/donations', data),
  getAll: () => API.get('/donations'),
  getById: (id: string) => API.get(`/donations/${id}`),
  getByUser: (userId: string) => API.get(`/donations/user/${userId}`),
  delete: (id: string) => API.delete(`/donations/${id}`),
  updateStatus: (id: string, status: any) => API.patch(`/donations/${id}/status`, { status }),
};
