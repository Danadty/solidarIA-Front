'use client';

import { JSX } from 'react';
import styles from '../home.module.css';

export default function HeroDecision(): JSX.Element {
  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <h1 className={styles.heroTitle}>
          Conectamos personas, voluntades y causas con ayuda de la IA.
        </h1>
        <p className={styles.heroSubtitle}>
          Un ecosistema solidario donde cada acción cuenta, y la inteligencia artificial potencia tu impacto.
        </p>
        <div className={styles.heroButtons}>
          <button
            className={styles.btnPrimary}
            onClick={() => {
              const section = document.getElementById('path-selector');
              if (section) section.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Explorar caminos
          </button>
        </div>
      </div>
    </section>
  );
}
