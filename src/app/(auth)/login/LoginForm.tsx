"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "../../../styles/FormLayout.module.css";
import { AuthAPI } from "src/lib";

export default function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await AuthAPI.login({ email, password });
      const data = res.data?.data;

      if (!data || !data.token) {
        throw new Error("No se recibió el token del servidor");
      }

      const { token, email: userEmail, role } = data;

      localStorage.setItem("token", token);
      localStorage.setItem("email", userEmail);
      localStorage.setItem("role", role);

      router.push("/home");
    } catch (err: any) {
      const msg =
        err.response?.data?.message ||
        err.message ||
        "Error de conexión o credenciales inválidas";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      {/* ✋ Manos decorativas */}
      <Image
        src="/hand-left.png"
        alt="Mano izquierda solidaria"
        width={260}
        height={260}
        className={styles.handLeft}
      />
      <Image
        src="/hand-right.png"
        alt="Mano derecha solidaria"
        width={260}
        height={260}
        className={styles.handRight}
      />

      <h1 className={styles.title}>Iniciar sesión</h1>

      <form onSubmit={handleSubmit} className={styles.form}>
        {error && <p className={styles.error}>{error}</p>}

        <div className={styles.inputGroup}>
          <label htmlFor="email" className={styles.label}>
            Email
          </label>
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
          <label htmlFor="password" className={styles.label}>
            Contraseña
          </label>
          <input
            id="password"
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
            required
          />
        </div>

        <button type="submit" className={styles.button} disabled={loading}>
          {loading ? "Ingresando..." : "Ingresar"}
        </button>

        <p className={styles.text}>
          ¿No tenés cuenta? <a href="/register">Registrate aquí</a>
        </p>
      </form>
    </div>
  );
}
