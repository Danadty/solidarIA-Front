import Link from "next/link";
import styles from "../ongs.module.css";

export default function CTASection() {
  return (
    <section className={styles.ctaSection}>
      <div className={styles.ctaContent}>
        <h2>¿Tenés una fundación?</h2>
        <p>Unite a nuestra plataforma y llegá a más personas dispuestas a ayudar</p>
        <Link 
          href="/foundations/register"
          className={styles.ctaButton}
        >
          Registrar Mi Fundación
        </Link>
      </div>
    </section>
  );
}