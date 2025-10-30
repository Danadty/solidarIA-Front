import styles from "../voluntariado.module.css";

export default function LoadingState() {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.spinner}></div>
      <p>Cargando voluntarios...</p>
    </div>
  );
}