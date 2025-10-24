import styles from "../voluntariado.module.css";

export default function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <h1 className={styles.heroTitle}>
          Encontrá Voluntarios Comprometidos
        </h1>
        <p className={styles.heroSubtitle}>
          Conectá con personas apasionadas que quieren marcar la diferencia. 
          Juntos podemos lograr un impacto real en la comunidad.
        </p>
      </div>
    </section>
  );
}