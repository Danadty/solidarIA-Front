import Link from "next/link";
import styles from "./ActivityCard.module.css";

interface Campaign {
  id: string;
  title: string;
  description: string;
  start_Date: string;
  end_Date: string;
  foundationId?: string;
}

interface ActivityCardProps {
  campaign: Campaign;
  buttonText?: string;
}

export default function ActivityCard({
  campaign,
  buttonText = "Ver Campaña",
}: ActivityCardProps) {
  const { id, title, description, start_Date, end_Date } = campaign;

  const startDate = new Date(start_Date).toLocaleDateString('es-ES');
  const endDate = new Date(end_Date).toLocaleDateString('es-ES');

  const getCampaignIcon = (campaignTitle: string) => {
    const lowerTitle = campaignTitle.toLowerCase();
    return "c";
  };

  const campaignIcon = getCampaignIcon(title);

  return (
    <div className={styles.card}>
      <div className={styles.iconWrapper}>
        <span className={styles.icon}>{campaignIcon}</span>
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>
          {description && description.length > 120 
            ? `${description.substring(0, 120)}...` 
            : description || "Sin descripción disponible"
          }
        </p>
        
        <div className={styles.dates}>
          <span className={styles.dateRange}>
            {startDate} - {endDate}
          </span>
        </div>

        <Link href={`/campaigns/${id}`} className={styles.button}>
          {buttonText}
        </Link>
      </div>
    </div>
  );
}