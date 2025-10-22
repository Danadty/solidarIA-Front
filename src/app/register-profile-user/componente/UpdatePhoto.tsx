'use client';

import { useState } from 'react';
import { UserProfileAPI } from 'src/lib';

interface UpdatePhotoProps {
  profileId: string;
}

export default function UpdatePhoto({ profileId }: UpdatePhotoProps) {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
      setSuccess(false);
      setError(null);
    }
  };

  const handleUpdate = async () => {
    if (!file) return;
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await UserProfileAPI.updatePhoto(profileId, file);
      setSuccess(true);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6 border-t border-gray-200 pt-4">
      <label className="block text-sm font-medium mb-1 text-gray-700">Actualizar Foto de Perfil</label>
      <div className="flex items-center space-x-3">
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button
          onClick={handleUpdate}
          disabled={loading || !file}
          className="bg-blue-600 text-white py-1 px-3 rounded hover:bg-blue-700 transition disabled:opacity-60"
        >
          {loading ? 'Actualizando...' : 'Actualizar Foto'}
        </button>
      </div>

      {success && <p className="text-green-600 mt-2">Foto actualizada correctamente!</p>}
      {error && <p className="text-red-600 mt-2">Error: {error}</p>}
    </div>
  );
}
