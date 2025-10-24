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

        <button
          className={styles.menuButton}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        <nav className={`${styles.nav} ${menuOpen ? styles.open : ""}`}>
          <Link href="/">Inicio</Link>
          <Link href="/ongs">ONGs</Link>
          <Link href="/volunteers">Voluntariados</Link>
          <Link href="/donar">Donar</Link>
          <Link href="/educacion">Educación</Link>
        </nav>

        <div className={styles.sessionBtn}>
          <button
            className={styles.btnLogin}
            onClick={() => {
              if (isLoggedIn) {
                localStorage.removeItem("token");
                localStorage.removeItem("email");
                localStorage.removeItem("role");
                localStorage.removeItem("userId");

                window.location.href = "/login";
              } else {
                window.location.href = "/login";
              }
            }}
          >
            {isLoggedIn ? "Cerrar sesión" : "Iniciar sesión"}
          </button>
        </div>
      </div>
    </header>
  );
}
