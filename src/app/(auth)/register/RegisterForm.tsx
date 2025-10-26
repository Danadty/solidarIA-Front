"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../../../styles/FormLayout.module.css";
import { UserAPI } from "src/lib";

type FormState = {
  name: string;
  email: string;
  password: string;
  confirm: string;
  accept: boolean;
};

export default function RegisterForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    password: "",
    confirm: "",
    accept: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  const validate = () => {
    if (!form.name.trim()) return "El nombre es obligatorio.";
    if (!/\S+@\S+\.\S+/.test(form.email)) return "Email inválido.";
    if (form.password.length < 6)
      return "La contraseña debe tener al menos 6 caracteres.";
    if (form.password !== form.confirm)
      return "Las contraseñas no coinciden.";
    if (!form.accept)
      return "Debes aceptar los términos y condiciones.";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const msg = validate();
    if (msg) {
      setErrors(msg);
      return;
    }

    setErrors(null);
    setLoading(true);

    try {
      const res = await UserAPI.create({
        name: form.name,
        email: form.email,
        password: form.password,
      });

      const data = res.data?.data;
      if (!data?.id) throw new Error("No se recibió el usuario del servidor");

      localStorage.setItem("userId", data.id);
      localStorage.setItem("email", data.email);
      localStorage.setItem("role", data.role);

      alert("Cuenta creada con éxito. Ahora podés iniciar sesión.");
      router.push("/login?registered=1");
    } catch (err: any) {
      setErrors(
        err.response?.data?.message ||
        err.message ||
        "Error de conexión o datos inválidos"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      {!!errors && <div className={styles.error}>{errors}</div>}

      <label className={styles.label} htmlFor="name">Nombre y apellido</label>
      <input
        id="name"
        name="name"
        type="text"
        placeholder="Ej: Ana Pérez"
        value={form.name}
        onChange={handleChange}
        className={styles.input}
        required
      />

      <label className={styles.label} htmlFor="email">Email</label>
      <input
        id="email"
        name="email"
        type="email"
        placeholder="tuemail@gmail.com"
        value={form.email}
        onChange={handleChange}
        className={styles.input}
        required
      />

      <label className={styles.label} htmlFor="password">Contraseña</label>
      <input
        id="password"
        name="password"
        type="password"
        placeholder="Mínimo 6 caracteres"
        value={form.password}
        onChange={handleChange}
        className={styles.input}
        required
      />

      <label className={styles.label} htmlFor="confirm">Confirmar contraseña</label>
      <input
        id="confirm"
        name="confirm"
        type="password"
        placeholder="Repetí tu contraseña"
        value={form.confirm}
        onChange={handleChange}
        className={styles.input}
        required
      />

      <label className={styles.checkRow}>
        <input
          type="checkbox"
          name="accept"
          checked={form.accept}
          onChange={handleChange}
        />
        <span>
          Acepto los <a href="#">términos y condiciones</a>
        </span>
      </label>

      <button className={styles.button} disabled={loading}>
        {loading ? "Creando cuenta..." : "Crear cuenta"}
      </button>

      <p className={styles.text}>
        ¿Ya tenés cuenta? <a href="/login">Iniciar sesión</a>
      </p>
    </form>
  );
}
