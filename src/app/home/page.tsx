'use client';

import HeroDecision from './components/HeroDecision';
import PathSelector from './components/PathSelector';
import FeaturedNGOs from './components/FeaturedNGOs';
import VolunteerSection from './components/VolunteerSection';
import EducationSection from './components/EducationSection';
import styles from "./home.module.css";

export default function Home() {
  return (
    <div className={styles.homeContainer}>
      <HeroDecision />
      <PathSelector />
      <FeaturedNGOs />
      <VolunteerSection />
      <EducationSection />
    </div>
  );
}
