"use client";

import { useState } from "react";
import { UserProfileAPI } from "src/lib";
import UpdatePhoto from "./componente/UpdatePhoto";
import styles from "../../styles/FormLayout.module.css";

function decodeJwtPayload(token: string) {
  try {
    const payload = token.split(".")[1];
    return JSON.parse(atob(payload));
  } catch {
    return null;
  }
}

export default function CreateProfilePage() {
  const [form, setForm] = useState({
    description: "",
    phone: "",
    address: "",
  });
  const [loading, setLoading] = useState(false);
  const [profileId, setProfileId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No hay token disponible");

      const payload = decodeJwtPayload(token);
      if (!payload?.id) throw new Error("Token inválido o sin userId");

      const body = { userId: payload.id, ...form };
      const res = await UserProfileAPI.create(body);

      const createdProfileId = res.data?.data?.userProfile?.id;
      if (!createdProfileId) throw new Error("No se obtuvo profileId");

      setProfileId(createdProfileId);
      setSuccess("Perfil creado correctamente");
    } catch (err: any) {
      console.error("Error creando perfil:", err);
      setError(
        err.response?.data?.message || err.message || "Error desconocido"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.handLeft}></div>
      <div className={styles.handRight}></div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <h1 className={styles.title}>Crear Perfil de Usuario</h1>

        {error && <p className={styles.text} style={{ color: "red" }}>{error}</p>}
        {success && (
          <p className={styles.text} style={{ color: "green" }}>
            {success}
          </p>
        )}

        <label className={styles.label} htmlFor="description">
          Descripción
        </label>
        <textarea
          id="description"
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Cuéntanos sobre ti y tus intereses..."
          className={styles.input}
          maxLength={500}
          rows={4}
          required
        />

        <label className={styles.label} htmlFor="phone">
          Teléfono
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          value={form.phone}
          onChange={handleChange}
          placeholder="+5491123456789"
          className={styles.input}
          required
        />

        <label className={styles.label} htmlFor="address">
          Dirección
        </label>
        <input
          id="address"
          name="address"
          type="text"
          value={form.address}
          onChange={handleChange}
          placeholder="Calle 123, Ciudad, País"
          className={styles.input}
          required
        />

        <button type="submit" disabled={loading} className={styles.button}>
          {loading ? "Creando..." : "Crear Perfil"}
        </button>

        {profileId && (
          <UpdatePhoto profileId={profileId} />
        )}
      </form>
    </div>
  );
}