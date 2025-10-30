import styles from "../voluntariado.module.css";

interface FiltersSectionProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  resultsCount: number;
  totalCount: number;
}

export default function FiltersSection({
  searchTerm,
  onSearchChange,
  resultsCount,
  totalCount
}: FiltersSectionProps) {
  return (
    <section className={styles.filtersSection}>
      <div className={styles.searchBar}>
        <div className={styles.searchInputContainer}>
          <input
            type="text"
            placeholder="Buscar por ubicación o intereses..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className={styles.searchInput}
          />
          <span className={styles.searchIcon}>:)</span>
        </div>
      </div>

      <div className={styles.resultsInfo}>
        <p>
          Mostrando <strong>{resultsCount}</strong> de{" "}
          <strong>{totalCount}</strong> voluntarios
        </p>
      </div>
    </section>
  );
}