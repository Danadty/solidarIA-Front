'use client';

import styles from '../home.module.css';

export default function FeaturedNGOs() {
  const featuredNGOs = [
    { id: 1, name: "EcoPlaneta", description: "Conservación de bosques y educación ambiental.", image: "/ong-eco-planeta.jpg" },
    { id: 2, name: "Manos Solidarias", description: "Apoyo a comunidades vulnerables con educación y alimentación.", image: "/ong-manos-solidarias.jpg" },
    { id: 3, name: "Futuro Brillante", description: "Acceso a educación tecnológica para jóvenes.", image: "/ong-futuro-brillante.jpg" }
  ];

  return (
    <section className={styles.featuredNgos}>
      <h2 className={styles.sectionTitle}>ONG destacadas</h2>
      <div className={styles.ngosGrid}>
        {featuredNGOs.map(ngo => (
          <div key={ngo.id} className={styles.ngoCard}>
            <div className={styles.ngoImageContainer}>
              <img src={ngo.image} alt={ngo.name} className={styles.ngoImage} />
            </div>
            <div className={styles.ngoContent}>
              <h3 className={styles.ngoName}>{ngo.name}</h3>
              <p className={styles.ngoDescription}>{ngo.description}</p>
              <div className={styles.cardActions}>
                <button className={styles.btnOutline}>Ver más</button>
                <button className={styles.btnPrimary}>Donar</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
