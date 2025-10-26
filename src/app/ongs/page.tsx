"use client";
import { useEffect, useState } from "react";
import { FoundationAPI } from "../../lib/api/foundation.api";
import HeroSection from "./components/HeroSection";
import FiltersSection from "./components/FiltersSection";
// import FoundationsGrid from "./components/FoundationsGrid";
import CTASection from "./components/CTASection";
import styles from "./ongs.module.css";
import RenderOngs from "./components/renderOngs";

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
  const [totalOngs, setTotalOngs] = useState(0);

  // useEffect(() => {
  //   loadFoundations();
  // }, []);

  useEffect(() => {
    filterFoundations();
  }, [foundations, searchTerm, selectedCategory]);

  /*Recuperamos total Ong desde el storage*/
  useEffect(() => {
    const saved = Number(localStorage.getItem("totalOngs")) || 0;
    setTotalOngs(saved);
  }, []);
  
  /*Sincronizar localStorage cuando cambie totalOngs*/
  useEffect(() => {
    localStorage.setItem("totalOngs", totalOngs.toString());
  }, [totalOngs]);

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
          totalCount={totalOngs}
        />

        <RenderOngs setFoundations={setFoundations} onTotalChange={setTotalOngs} />
        
        <CTASection />
      </main>
    </>
  );
}