"use client";
import Image from "next/image";
import Link from "next/link";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Logo + nombre */}
        <div className={styles.logo}>
          <Image src="/globe.svg" alt="logo" width={28} height={28} />
          <span className={styles.brand}>SolidarIA</span>
        </div>

        {/* Menú principal */}
        <nav className={styles.nav}>
          <Link href="/">Inicio</Link>
          <Link href="/ong">ONG</Link>
          <Link href="/voluntariado">Voluntariado</Link>
          <Link href="/donar">Donar</Link>
          <Link href="/educacion">Educación</Link>
        </nav>

        {/* Botón login */}
        <div>
          <button className={styles.btnLogin}>Iniciar sesión</button>
        </div>
      </div>
    </header>
  );
}
