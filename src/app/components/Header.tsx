"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import styles from "./Header.module.css";

interface HeaderProps {
  isLoggedIn?: boolean;
}

export default function Header({ isLoggedIn = false }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Logo */}
        <div className={styles.logo}>
          <Image src="/logo-solidaria.png" alt="SolidarIA logo" width={60} height={60} />
              <span className={styles.brand}>Solidar<span className={styles.brandAccent}>IA</span></span>
        </div>

        {/* Botón hamburguesa */}
        <button
          className={styles.menuButton}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        {/* Navegación */}
        <nav className={`${styles.nav} ${menuOpen ? styles.open : ""}`}>
          <Link href="/">Inicio</Link>
          <Link href="/ong">ONG</Link>
          <Link href="/voluntariado">Voluntariado</Link>
          <Link href="/donar">Donar</Link>
          <Link href="/educacion">Educación</Link>
        </nav>

        {/* Botón login/logout */}
        <div className={styles.sessionBtn}>
          <button className={styles.btnLogin}>
            {isLoggedIn ? "Cerrar sesión" : "Iniciar sesión"}
          </button>
        </div>
      </div>
    </header>
  );
}
