"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./Register.module.css";
import {UserAPI} from "src/lib";

export default function RegisterForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
  
    try {
      const res = await UserAPI.create({ name, email, password });
      const data = res.data?.data;
      console.log("Usuario creado:", data);
  
      if (!data || !data.id) {
        throw new Error("No se recibió el usuario del servidor");
      }
  
      localStorage.setItem("userId", data.id);
      localStorage.setItem("email", data.email);
      localStorage.setItem("role", data.role);
  
      router.push("/login");
    } catch (err: any) {
      const msg =
        err.response?.data?.message ||
        err.message ||
        "Error de conexión o datos inválidos";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Crear cuenta</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        {error && <p className={styles.error}>{error}</p>}

        <div className={styles.inputGroup}>
          <label htmlFor="name" className={styles.label}>Nombre</label>
          <input
            id="name"
            type="text"
            placeholder="Tu nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={styles.input}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="email" className={styles.label}>Email</label>
          <input
            id="email"
            type="email"
            placeholder="Ej: tuemail@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="password" className={styles.label}>Contraseña</label>
          <input
            id="password"
            type="password"
            placeholder="*****"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
            required
          />
        </div>

        <button type="submit" className={styles.button} disabled={loading}>
          {loading ? "Creando..." : "Registrarme"}
        </button>

        <p className={styles.text}>
          ¿Ya tenés cuenta? <a href="/login">Inicia sesión aquí</a>
        </p>
      </form>
    </div>
  );
}
