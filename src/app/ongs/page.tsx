"use client";
import { useEffect, useState } from "react";
import HeroSection from "./components/HeroSection";
import FiltersSection from "./components/FiltersSection";
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
  const [searchTerm, setSearchTerm] = useState("");
  const [totalOngs, setTotalOngs] = useState(0);

  useEffect(() => {
    let filtered = foundations;

    if (searchTerm) {
      filtered = filtered.filter(foundation =>
        foundation.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        foundation.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredFoundations(filtered);
  }, [foundations, searchTerm]);

  // Recuperamos total Ong desde localStorage
  useEffect(() => {
    const saved = Number(localStorage.getItem("totalOngs")) || 0;
    setTotalOngs(saved);
  }, []);
  
  useEffect(() => {
    localStorage.setItem("totalOngs", totalOngs.toString());
  }, [totalOngs]);

  return (
    <main className={styles.container}>
      <HeroSection />
      {/* 
      <FiltersSection
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedCategory="all"
        onCategoryChange={() => {}}
        resultsCount={filteredFoundations.length}
        totalCount={totalOngs}
      />
       */}
      <RenderOngs setFoundations={setFoundations} onTotalChange={setTotalOngs} />

      <CTASection />
    </main>
  );
}