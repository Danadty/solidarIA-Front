// src/app/register/page.tsx
import RegisterForm from "./RegisterForm";
import styles from "../../styles/FormLayout.module.css";

export default function RegisterPage() {
  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Crear cuenta</h1>
      <RegisterForm />
    </main>
  );
}
