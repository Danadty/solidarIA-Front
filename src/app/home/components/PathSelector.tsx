'use client';

import { JSX, useEffect, useState } from 'react';
import Link from 'next/link';
import styles from '../home.module.css';

interface PathOption {
  title: string;
  description: string;
  action: string;
  style: 'btnPrimary' | 'btnSecondary' | 'btnOutline';
  href: string;
}

export default function PathSelector(): JSX.Element {
  const [recommended, setRecommended] = useState<string | null>(null);

  useEffect(() => {
    setRecommended('Voluntario');
  }, []);

  const paths: PathOption[] = [
    {
      title: 'Visitante',
      description: 'Explorá campañas y doná de forma anónima. Tus aportes no aparecerán en estadísticas.',
      action: 'Explorar ONGs',
      style: 'btnSecondary',
      href: '/ongs'
    },
    {
      title: 'Voluntario',
      description: 'Completá tu perfil y empezá a participar activamente. Tus acciones y donaciones serán registradas.',
      action: 'Extender mi perfil',
      style: 'btnPrimary',
      href: '/register-profile-user'
    },
    {
      title: 'Fundación',
      description: 'Creá campañas, gestioná tus voluntarios y generá impacto visible en la comunidad.',
      action: 'Registrar mi fundación',
      style: 'btnOutline',
      href: '/register-foundation'
    },
  ];

  return (
    <section id="path-selector" className={styles.pathSelector}>
      <h2 className={styles.sectionTitle}>¿Qué camino querés seguir?</h2>
      <div className={styles.pathGrid}>
        {paths.map((p, i) => (
          <div
            key={i}
            className={`${styles.pathCard} ${recommended === p.title ? styles.recommended : ''}`}
          >
            <h3 className={styles.pathTitle}>{p.title}</h3>
            <p className={styles.pathDescription}>{p.description}</p>
            <Link href={p.href} className={styles[p.style]}>
              {p.action}
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
