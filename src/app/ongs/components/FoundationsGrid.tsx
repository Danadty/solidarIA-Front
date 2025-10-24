"use client";
import { useRouter } from "next/navigation";
import FoundationCard from "./FoundationCard";
import styles from "../ongs.module.css";

interface Foundation {
  id: string;
  name: string;
  description: string;
  logo_url: string | null;
  logoPublicId: string | null;
  contact_phone: string;
  contact_email: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

interface FoundationsGridProps {
  foundations?: Foundation[];
}

export default function FoundationsGrid({ foundations = [] }: FoundationsGridProps) {
  const router = useRouter();

  // Validación robusta
  const safeFoundations = Array.isArray(foundations) ? foundations : [];
  
  const handleFoundationClick = (foundationId: string) => {
    router.push(`/ongs/${foundationId}`);
  };

  const handleDonateClick = (foundationId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/donations/create?foundationId=${foundationId}`);
  };

  if (!safeFoundations || safeFoundations.length === 0) {
    return (
      <section className={styles.foundationsGrid}>
        <div className={styles.noResults}>
          <h3>No se encontraron fundaciones</h3>
          <p>Intentá ajustar tus filtros de búsqueda</p>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.foundationsGrid}>
      {safeFoundations.map((foundation) => (
        <FoundationCard
          key={foundation.id}
          foundation={foundation}
          onViewDetails={handleFoundationClick}
          onDonate={handleDonateClick}
        />
      ))}
    </section>
  );
}