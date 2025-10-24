"use client";
import { useEffect, useState } from "react";
import { UserProfileAPI } from "src/lib";
import HeroSection from "./components/HeroSection";
import FiltersSection from "./components/FiltersSection";
import VolunteersGrid from "./components/VolunteersGrid";
import CTASection from "./components/CTASection";
import LoadingState from "./components/LoadingState";
import styles from "./voluntariado.module.css";

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

export default function VoluntariadoPage() {
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [filteredVolunteers, setFilteredVolunteers] = useState<Volunteer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadVolunteers();
  }, []);

  useEffect(() => {
    filterVolunteers();
  }, [volunteers, searchTerm]);

  const loadVolunteers = async () => {
    try {
      const response = await UserProfileAPI.getAll();
      const volunteersData = response.data?.data || [];
      setVolunteers(volunteersData);
    } catch (error) {
      console.error("Error loading volunteers:", error);
      setVolunteers([]);
    } finally {
      setLoading(false);
    }
  };

  const filterVolunteers = () => {
    let filtered = volunteers;

    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(volunteer =>
        // Búsqueda por DIRECCIÓN (ubicación)
        volunteer.address?.toLowerCase().includes(searchLower) ||
        // Búsqueda por DESCRIPCIÓN (intereses)
        volunteer.description?.toLowerCase().includes(searchLower)
      );
    }

    setFilteredVolunteers(filtered);
  };

  if (loading) {
    return (
      <>
        <LoadingState />
      </>
    );
  }

  return (
    <>      
      <main className={styles.container}>
        <HeroSection />
        
        <FiltersSection
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          resultsCount={filteredVolunteers.length}
          totalCount={volunteers.length}
        />

        <VolunteersGrid volunteers={filteredVolunteers} />

        <CTASection />
      </main>
    </>
  );
}