// lib/definitions.ts

export interface Ong {
  id: string;
  name: string;
  // ...otros campos
}

export interface Project {
  id: string;
  title: string;
  // ...otros campos
}

// AÑADE ESTAS
export interface User {
  id: string;
  name: string;
  email: string;
  // ...otros campos
}

export interface Donation {
  id: string;
  amount: number;
  date: string;
  userId: string;
  ongId: string;
  // ...otros campos
}