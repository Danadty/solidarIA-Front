'use client';

import { useState } from 'react';
import { UserProfileAPI } from '@/lib/api/userProfile.api';
import styles from './UpdatePhoto.module.css';

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
      const selectedFile = e.target.files[0];
      
      if (!selectedFile.type.startsWith('image/')) {
        setError('Por favor, selecciona un archivo de imagen válido');
        setFile(null);
        return;
      }
      
      if (selectedFile.size > 5 * 1024 * 1024) {
        setError('La imagen no debe superar los 5MB');
        setFile(null);
        return;
      }
      
      setFile(selectedFile);
      setSuccess(false);
      setError(null);
    }
  };

  const handleUpdate = async () => {
    if (!file) {
      setError('Por favor, selecciona una imagen');
      return;
    }
    
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await UserProfileAPI.updatePhoto(profileId, file);
      setSuccess(true);
      setFile(null);
      // Limpiar el input file
      const fileInput = document.getElementById('photoInput') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Error al actualizar la foto');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Foto de Perfil</h3>
      
      <div className={styles.uploadArea}>
        <input 
          id="photoInput"
          type="file" 
          accept="image/*" 
          onChange={handleFileChange}
          className={styles.fileInput}
        />
        
        {file && (
          <div className={styles.fileInfo}>
            Archivo seleccionado: {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
          </div>
        )}
        
        <button
          onClick={handleUpdate}
          disabled={loading || !file}
          className={styles.button}
        >
          {loading ? 'Actualizando...' : 'Actualizar Foto'}
        </button>
      </div>

      {success && (
        <div className={styles.success}>
          Foto actualizada correctamente
        </div>
      )}
      
      {error && (
        <div className={styles.error}>
          {error}
        </div>
      )}
    </div>
  );
}