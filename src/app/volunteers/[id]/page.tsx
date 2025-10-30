"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { UserProfileAPI } from "../../../lib/api/userProfile.api";
import UserProfileCard from "./components/UserProfileCard";
import styles from "./volunteer-profile.module.css";
import UserActivitiesSection from "./components/UserActivitiesSection";
import DonationsTable from "./components/DonationsTable";

interface UserProfileData {
  id: string;
  description: string;
  photoUrl: string | null;
  phone: string;
  address: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export default function VolunteerProfilePage() {
  const params = useParams();
  const userProfileId = params.id as string;
  const [userProfile, setUserProfile] = useState<UserProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (userProfileId) {
      loadVolunteerData();
    }
  }, [userProfileId]);

  const loadVolunteerData = async () => {
    try {
      console.log("Cargando perfil con userProfile ID:", userProfileId);
      
      const response = await UserProfileAPI.getByUserId(userProfileId);
      console.log("Respuesta completa:", response);
      
      const profileData = response.data?.data || response.data;
      
      console.log("Datos del perfil:", profileData);
      
      if (!profileData) {
        setError("Perfil de voluntario no encontrado");
        return;
      }

      console.log("UserProfile userId:", profileData.userId);
      setUserProfile(profileData);
      
    } catch (error) {
      console.error("Error loading volunteer:", error);
      setError("Error al cargar el perfil");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Cargando perfil...</p>
      </div>
    );
  }

  if (error || !userProfile) {
    return (
      <div className={styles.errorContainer}>
        <h2>Error</h2>
        <p>{error || "Perfil no encontrado"}</p>
      </div>
    );
  }

  console.log("Renderizando con userProfile:", userProfile);

  return (
    <div className={styles.container}>
      <UserProfileCard profile={userProfile} />
      
      <h2 className={styles.title}>Ultimas actividades</h2>
      
      {userProfile.userId && (
        <UserActivitiesSection userId={userProfile.userId} />
      )}
      
      <div style={{ marginTop: '2rem', width: '100%', maxWidth: '800px' }}>
        <h2 style={{ 
          color: 'var(--color-1)', 
          marginBottom: '1rem',
          
        }}>
          Ultimas donaciones
        </h2>
        {userProfile.userId && (
          <DonationsTable userId={userProfile.userId} />
        )}
      </div>
    </div>
  );
}