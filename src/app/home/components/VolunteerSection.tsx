'use client';

import styles from '../home.module.css';

export default function VolunteerSection() {
  const stats = [
    { number: "+120", label: "ONG activas" },
    { number: "+500", label: "Voluntarios" },
    { number: "+3000", label: "Donaciones realizadas" }
  ];

  return (
    <section className={styles.volunteerSection}>
      <h2 className={styles.sectionTitle}>Unite como voluntario</h2>
      <div className={styles.statsGrid}>
        {stats.map((stat, i) => (
          <div key={i} className={styles.statItem}>
            <div className={styles.statNumber}>{stat.number}</div>
            <div className={styles.statLabel}>{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
