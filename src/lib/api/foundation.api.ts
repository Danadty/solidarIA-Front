import API from './client';
import type { CreateFoundationDto, UpdateFoundationDto } from '../types/foundation.types';

export const FoundationAPI = {
  create: (data: CreateFoundationDto) => API.post('/foundation', data),
  getAll: () => API.get('/foundation'),
  getPublic: () => API.get('/foundation/public'),
  getById: (id: string) => API.get(`/foundation/${id}`),
  update: (id: string, data: UpdateFoundationDto) => API.patch(`/foundation/${id}`, data),
  delete: (id: string) => API.delete(`/foundation/${id}`),
  uploadLogo: (foundationId: string, file: File) => {
    const fd = new FormData();
    fd.append('file', file);
    return API.post(`/foundation/${foundationId}/upload-logo`, fd, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
};
