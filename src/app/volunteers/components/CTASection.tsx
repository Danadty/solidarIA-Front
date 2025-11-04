import Link from "next/link";
import styles from "../voluntariado.module.css";
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
    <section className={styles.ctaSection} id="Sumarme">
      <div className={styles.ctaContent}>
        <h2>¿Querés ser voluntario?</h2>
        <p>Unite a nuestra comunidad y ayudá a transformar vidas</p>
        <Link 
          href="/register"
          className={styles.ctaButton}
        >
          Completar Mi Perfil
        </Link>
      </div>
    </section>
  );
}
