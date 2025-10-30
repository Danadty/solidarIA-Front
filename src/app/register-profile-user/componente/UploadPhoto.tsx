'use client';
import { useState } from 'react';
import { UserProfileAPI } from '../../../lib/api/userProfile.api';

interface UploadPhotoProps {
  profileId: string;
}

export default function UploadPhoto({ profileId }: UploadPhotoProps) {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    setError(null);

    try {
      await UserProfileAPI.uploadPhoto(profileId, file);
      setSuccess(true);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6">
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button
        onClick={handleUpload}
        disabled={loading || !file}
        className="ml-2 bg-green-600 text-white py-1 px-3 rounded hover:bg-green-700 transition disabled:opacity-60"
      >
        {loading ? 'Subiendo...' : 'Subir Foto'}
      </button>
      {success && <p className="text-green-600 mt-2">Foto subida correctamente!</p>}
      {error && <p className="text-red-600 mt-2">Error: {error}</p>}
    </div>
  );
}
