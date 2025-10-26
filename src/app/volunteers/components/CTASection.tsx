import Link from "next/link";
import styles from "../voluntariado.module.css";

export default function CTASection() {
  return (
    <section className={styles.ctaSection}>
      <div className={styles.ctaContent}>
        <h2>¿Querés ser voluntario?</h2>
        <p>Unite a nuestra comunidad y ayudá a transformar vidas</p>
        <Link 
          href="/register-profile-user"
          className={styles.ctaButton}
        >
          Completar Mi Perfil
        </Link>
      </div>
    </section>
  );
}