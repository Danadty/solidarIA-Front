import LoginForm from "./LoginForm";
import styles from "../../../styles/FormLayout.module.css";
import Chatbot from "src/app/components/chatbot";

export default function LoginPage() {
  return (
    <main className={styles.container}>
      <section className={styles.card}>

        <LoginForm />
      </section>
      <section>
        <Chatbot />
      </section>
    </main>
  );
}
