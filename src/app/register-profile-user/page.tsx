'use client';

import { useState } from 'react';
import { UserProfileAPI } from 'src/lib';
import UploadPhoto from './componente/UploadPhoto';
import UpdatePhoto from './componente/UpdatePhoto';

function decodeJwtPayload(token: string) {
  try {
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload));
  } catch {
    return null;
  }
}

export default function CreateProfilePage() {
  const [form, setForm] = useState({ description: '', phone: '', address: '' });
  const [loading, setLoading] = useState(false);
  const [profileId, setProfileId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No hay token disponible');

      const payload = decodeJwtPayload(token);
      if (!payload?.id) throw new Error('Token inválido o no contiene userId');

      const body = { userId: payload.id, ...form };

      const res = await UserProfileAPI.create(body);

      // 🔹 Log para validar la respuesta de la API
      console.log('Respuesta API crear perfil:', res.data);

      const createdProfileId = res.data?.data?.userProfile?.id;
      console.log('ProfileId obtenido:', createdProfileId);

      if (!createdProfileId) throw new Error('No se obtuvo profileId de la API');

      // ✅ Guardamos el id del perfil recién creado
      setProfileId(createdProfileId);

    } catch (err: any) {
      console.error('Error creando perfil:', err);
      setError(err.response?.data?.message || err.message || 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Crear Perfil de Usuario</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">Descripción</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Descripción del usuario"
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            maxLength={500}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">Teléfono</label>
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            type="tel"
            placeholder="+5491123456789"
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">Dirección</label>
          <input
            name="address"
            value={form.address}
            onChange={handleChange}
            type="text"
            placeholder="Calle 123"
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-60"
        >
          {loading ? 'Creando...' : 'Crear Perfil'}
        </button>
      </form>

      {/* 🔹 Renderizamos UploadPhoto o UpdatePhoto solo si ya tenemos profileId */}
      {profileId && (
        <div className="mt-6">
          <UploadPhoto profileId={profileId} />
          <UpdatePhoto profileId={profileId} />
        </div>
      )}

      {error && <p className="text-red-600 mt-4 font-semibold">Error: {error}</p>}
    </div>
  );
}
