import RegisterForm from "./RegisterForm";
import styles from "./Register.module.css";

export default function RegisterPage() {
  return (
    <main className={styles.container}>
      <section className={styles.card}>

        <RegisterForm />
      </section>
    </main>
  );
}