'use client';

import styles from '../home.module.css';

export default function EducationSection() {
  const articles = [
    { title: "Cómo elegir una ONG según tus valores" },
    { title: "Impacto real de tu ayuda" }
  ];

  return (
    <section className={styles.educationSection}>
      <h2 className={styles.sectionTitle}>Educación</h2>
      <div className={styles.articlesList}>
        {articles.map((article, i) => (
          <div key={i} className={styles.articleItem}>
            <h3 className={styles.articleTitle}>{article.title}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}
