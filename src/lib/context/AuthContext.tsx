'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { AuthAPI } from '../api';
import type { LoginDto } from '../types/auth.types';

interface AuthContextProps {
  token: string | null;
  login: (data: LoginDto) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

function extractTokenFromResponse(res: any): string | null {
  return res?.data?.token ?? res?.data?.data?.token ?? null;
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const t = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (t) setToken(t);
  }, []);

  const login = async (data: LoginDto) => {
    const res = await AuthAPI.login(data);
    const newToken = extractTokenFromResponse(res);
    if (!newToken) throw new Error('No token in login response');
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };

  const logout = () => {
    if (typeof window !== 'undefined') localStorage.removeItem('token');
    setToken(null);
  };

  return <AuthContext.Provider value={{ token, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
