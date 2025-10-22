'use client';

import { useEffect } from 'react';
import { UserAPI } from 'src/lib';

export default function Page() {
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await UserAPI.getAll();
        console.log('Users fetched:', res.data);
      } catch (err) {
        console.error('Error fetching users:', err);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Usuarios</h1>
      <p>Revisá la consola para ver los resultados de getAll()</p>
    </div>
  );
}
