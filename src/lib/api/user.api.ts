import API from './client';
import type { CreateUserDto, UpdateUserDto } from '../types/user.types';

export const UserAPI = {
  create: (data: CreateUserDto) => API.post('/user', data),
  getAll: () => API.get('/user'),
  getById: (id: string) => API.get(`/user/${id}`),
  update: (id: string, data: UpdateUserDto) => API.patch(`/user/${id}`, data),
  delete: (id: string) => API.delete(`/user/${id}`),
};
