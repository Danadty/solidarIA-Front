'use client';

import { useEffect } from 'react';
import { UserProfileAPI } from 'src/lib';

export default function Page() {
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await UserProfileAPI.getAll();
        console.log('UserProfileAPI.getAll response:', res.data);
      } catch (err: any) {
        console.error('Error fetching user profiles:', err.response?.data || err.message);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Prueba UserProfileAPI.getAll</h1>
      <p>------------revisar la consola para ver la respuesta de la API-------</p>
    </div>
  );
}
