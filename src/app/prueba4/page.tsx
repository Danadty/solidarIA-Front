'use client';

import { useEffect } from 'react';
import { FoundationAPI } from 'src/lib';

export default function Page() {
  useEffect(() => {
    const fetchFoundations = async () => {
      try {
        const res = await FoundationAPI.getAll();
        console.log('FoundationAPI.getAll response:', res.data);
      } catch (err: any) {
        console.error('Error fetching foundations:', err.response?.data || err.message);
      }
    };

    fetchFoundations();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Prueba FoundationAPI.getAll</h1>
      <p>------------revisar la consola para ver la respuesta de la API-------</p>
    </div>
  );
}
