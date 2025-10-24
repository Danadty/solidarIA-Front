import styles from "../ongs.module.css";

interface FiltersSectionProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  resultsCount: number;
  totalCount: number;
}

export default function FiltersSection({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  resultsCount,
  totalCount
}: FiltersSectionProps) {
  return (
    <section className={styles.filtersSection}>
      <div className={styles.searchBar}>
        <div className={styles.searchInputContainer}>
          <input
            type="text"
            placeholder="Buscar por nombre o descripción..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className={styles.searchInput}
          />
          <span className={styles.searchIcon}>:)</span>
        </div>
        
        <select 
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className={styles.categorySelect}
        >
          <option value="all">Todas las categorías</option>
          <option value="educación">Educación</option>
          <option value="medio ambiente">Medio Ambiente</option>
          <option value="salud">Salud</option>
          <option value="comunidad">Comunidad</option>
          <option value="animales">Animales</option>
        </select>
      </div>

      <div className={styles.resultsInfo}>
        <p>
          Mostrando <strong>{resultsCount}</strong> de{" "}
          <strong>{totalCount}</strong> fundaciones
        </p>
      </div>
    </section>
  );
}