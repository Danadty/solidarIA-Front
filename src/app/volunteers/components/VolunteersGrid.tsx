import VolunteerCard from "./VolunteerCard";
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

interface VolunteersGridProps {
  volunteers?: Volunteer[];
}

export default function VolunteersGrid({ volunteers = [] }: VolunteersGridProps) {
  const safeVolunteers = Array.isArray(volunteers) ? volunteers : [];
  
  if (!safeVolunteers || safeVolunteers.length === 0) {
    return (
      <section className={styles.volunteersGrid}>
        <div className={styles.noResults}>
          <h3>No se encontraron voluntarios</h3>
          <p>Intentá ajustar tus filtros de búsqueda</p>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.volunteersGrid}>
      {safeVolunteers.map((volunteer) => (
        <VolunteerCard
          key={volunteer.id}
          volunteer={volunteer}
        />
      ))}
    </section>
  );
}