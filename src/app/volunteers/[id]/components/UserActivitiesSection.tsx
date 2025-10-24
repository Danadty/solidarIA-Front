"use client";
import { useEffect, useState } from "react";
import { UserCampaignAPI } from "src/lib";
import ActivityCard from "./ActivityCard";
import styles from "./UserActivitiesSection.module.css";

interface Campaign {
  id: string;
  title: string;
  description: string;
  start_Date: string;
  end_Date: string;
  foundationId?: string;
}

interface UserActivitiesSectionProps {
  userId: string;
}

export default function UserActivitiesSection({ userId }: UserActivitiesSectionProps) {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadUserCampaigns();
  }, [userId]);

  const loadUserCampaigns = async () => {
    try {
      console.log("Cargando campañas para userId:", userId);
      const response = await UserCampaignAPI.getByUser(userId);
      console.log("Respuesta completa:", response);
      console.log("Response data:", response.data);
      console.log("Response data.data:", response.data?.data);
      
      const userCampaigns = response.data?.data?.campaigns || [];
      console.log("Campañas encontradas:", userCampaigns);
      
      setCampaigns(userCampaigns);
      
    } catch (error) {
      console.error("Error loading user campaigns:", error);
      setError("Error al cargar las campañas");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <p>Cargando actividades...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.error}>
        <p>{error}</p>
      </div>
    );
  }

  if (campaigns.length === 0) {
    return (
      <div className={styles.empty}>
        <p>No hay campañas activas</p>
        <p className={styles.emptySubtitle}>
          Este voluntario no se ha unido a ninguna campaña aún.
        </p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.campaignsGrid}>
        {campaigns.map((campaign) => (
          <ActivityCard
            key={campaign.id}
            campaign={campaign}
            buttonText="Ver Campaña"
          />
        ))}
      </div>
    </div>
  );
}