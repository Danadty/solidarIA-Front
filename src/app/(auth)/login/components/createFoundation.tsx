'use client';
import { useState } from 'react';
import styles from "../../../../styles/FormLayout.module.css";
import "./createFoundation.css";


interface Props {
  token: string;
  userId: string;
  onCreated: () => void;
}

export default function CreateFoundationForm({ token, userId, onCreated }: Props) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/foundation`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          description,
          contact_phone: phone,
          contact_email: email,
          userId,
        }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || 'Error creating foundation');
      }

      onCreated(); // notifica que la fundación se creó
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <section className="caja">
          <h1 className={styles.title}>Crear Fundación</h1>
        </section>
      {error && <p className={styles.error}>{error}</p>}

      <div className={styles.inputGroup}>
        <label htmlFor="name">Nombre</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ej: Fundación Esperanza"
            required
          />
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="description">Descripción</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe la misión y objetivos"
            required
          />
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="phone">Teléfono</label>
          <input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Ej: +54 11 2345-6789"
            required
          />
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="contacto@fundacion.org"
            required
          />
      </div>

      <button className={styles.button} type="submit" disabled={loading}>
        {loading ? 'Creando...' : 'Crear Fundación'}
      </button>
    </form>
  );
}
