import LoginForm from "./LoginForm";
import styles from "./Login.module.css";

export default function LoginPage() {
  return (
    <main className={styles.container}>
      <section className={styles.card}>

        <LoginForm />
      </section>
    </main>
  );
}
