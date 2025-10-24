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

interface FoundationCardProps {
  foundation: Foundation;
  onViewDetails: (foundationId: string) => void;
  onDonate: (foundationId: string, e: React.MouseEvent) => void;
}

export default function FoundationCard({
  foundation,
  onViewDetails,
  onDonate
}: FoundationCardProps) {
  return (
    <div
      className={styles.foundationCard}
      onClick={() => onViewDetails(foundation.id)}
    >
      <div className={styles.cardHeader}>
        <div className={styles.logoContainer}>
          {foundation.logo_url ? (
            <img
              src={foundation.logo_url}
              alt={`Logo de ${foundation.name}`}
              className={styles.logo}
            />
          ) : (
            <div className={styles.logoPlaceholder}>
              {foundation.name.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        <div className={styles.foundationInfo}>
          <h3 className={styles.foundationName}>{foundation.name}</h3>
          <p className={styles.contactEmail}>{foundation.contact_email}</p>
        </div>
      </div>

      <div className={styles.cardBody}>
        <p className={styles.description}>
          {foundation.description.length > 150
            ? `${foundation.description.substring(0, 150)}...`
            : foundation.description}
        </p>
      </div>

      <div className={styles.cardFooter}>
        <div className={styles.metaInfo}>
          <span className={styles.contactInfo}>
            📞 {foundation.contact_phone}
          </span>
          <span className={styles.createdDate}>
            Creada: {new Date(foundation.createdAt).toLocaleDateString()}
          </span>
        </div>
        <div className={styles.actionButtons}>
          <button
            className={styles.viewButton}
            onClick={() => onViewDetails(foundation.id)}
          >
            Ver Detalles
          </button>
          <button
            className={styles.donateButton}
            onClick={(e) => onDonate(foundation.id, e)}
          >
            Donar
          </button>
        </div>
      </div>
    </div>
  );
}