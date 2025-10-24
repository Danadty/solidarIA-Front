import Link from "next/link";
import styles from "../voluntariado.module.css";

interface Volunteer {
  id: string;
  description: string;
  photoUrl: string | null;
  phone: string;
  address: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

interface VolunteerCardProps {
  volunteer: Volunteer;
}

export default function VolunteerCard({
  volunteer
}: VolunteerCardProps) {
  return (
    <div className={styles.volunteerCard}>
      <div className={styles.cardHeader}>
        <div className={styles.photoContainer}>
          {volunteer.photoUrl ? (
            <img
              src={volunteer.photoUrl}
              alt={`Foto de perfil`}
              className={styles.photo}
            />
          ) : (
            <div className={styles.photoPlaceholder}>
              V
            </div>
          )}
        </div>
        <div className={styles.volunteerInfo}>
          <h3 className={styles.volunteerName}>Voluntario</h3>
          <p className={styles.joinDate}>
            Se unió: {new Date(volunteer.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      <div className={styles.cardBody}>
        <p className={styles.description}>
          {volunteer.description}
        </p>
      </div>

      <div className={styles.cardFooter}>
        <div className={styles.actionButtons}>
          <Link 
            href={`/volunteers/${volunteer.id}`}
            className={styles.inviteButton}
          >
            Ver Perfil
          </Link>
        </div>
      </div>
    </div>
  );
}