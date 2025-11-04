import Link from "next/link";
import styles from "../ongs.module.css";
import { useEffect, useState } from "react";

export default function CTASection() {
  const [showCTA, setShowCTA] = useState(false);

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (!role) {
      setShowCTA(true);
    }
  }, []);

  if (!showCTA) return null;

  return (
    <section className={styles.ctaSection}>
      <div className={styles.ctaContent}>
        <h2>¿Tenés una fundación?</h2>
        <p>Unite a nuestra plataforma y llegá a más personas dispuestas a ayudar</p>
        <Link 
          href="/register"
          className={styles.ctaButton}
        >
          Registrar Mi Fundación
        </Link>
      </div>
    </section>
  );
}