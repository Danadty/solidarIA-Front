import API from './client';
import type { LoginDto } from '../types/auth.types';

export const AuthAPI = {
  login: (data: LoginDto) => API.post('/auth/login', data),
};
