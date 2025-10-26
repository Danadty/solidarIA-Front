"use client";
import { useEffect, useState } from "react";
import { FoundationAPI } from "../../lib/api/foundation.api";
import HeroSection from "./components/HeroSection";
import FiltersSection from "./components/FiltersSection";
import FoundationsGrid from "./components/FoundationsGrid";
import CTASection from "./components/CTASection";
import styles from "./ongs.module.css";

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

export default function OngsPage() {
  const [foundations, setFoundations] = useState<Foundation[]>([]);
  const [filteredFoundations, setFilteredFoundations] = useState<Foundation[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    loadFoundations();
  }, []);

  useEffect(() => {
    filterFoundations();
  }, [foundations, searchTerm, selectedCategory]);

  const loadFoundations = async () => {
    try {
      const response = await FoundationAPI.getAll();
      console.log("Respuesta API:", response);
      
      const foundationsData = response.data?.data || [];
      console.log("Fundaciones cargadas:", foundationsData);
      
      setFoundations(foundationsData);
      
    } catch (error) {
      console.error("Error loading foundations:", error);
      setFoundations([]);
    } finally {
      setLoading(false);
    }
  };

  const filterFoundations = () => {
    let filtered = foundations;

    if (searchTerm) {
      filtered = filtered.filter(foundation =>
        foundation.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        foundation.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter(foundation =>
        foundation.description?.toLowerCase().includes(selectedCategory)
      );
    }

    setFilteredFoundations(filtered);
  };

  return (
    <>
      <main className={styles.container}>
        <HeroSection />
        
        <FiltersSection
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          resultsCount={filteredFoundations.length}
          totalCount={foundations.length}
        />

        <FoundationsGrid foundations={filteredFoundations} />

        <CTASection />
      </main>
    </>
  );
}