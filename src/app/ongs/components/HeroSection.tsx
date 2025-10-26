import styles from "../ongs.module.css";

export default function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <h1 className={styles.heroTitle}>
          Descubrí Fundaciones que <span>Transforman Vidas</span>
        </h1>
        <p className={styles.heroSubtitle}>
          Conectá con organizaciones que trabajan incansablemente por causas sociales. 
          Tu apoyo puede marcar la diferencia.
        </p>
      </div>
    </section>
  );
}