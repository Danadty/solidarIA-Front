"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./Header.module.css";
import { useRouter } from "next/navigation";

// interface HeaderProps {
//   isLoggedIn?: boolean;
// }

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState<string | null>(null);
  const [foundationId, setFoundationId] = useState<string | null>(null);
  const [userProfileId, setUserProfileId] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
  const interval = setInterval(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    setIsLoggedIn(!!token);
    setRole(role);
  }, 1500);

  return () => clearInterval(interval);
}, []);

  useEffect(() => {
    const token = localStorage.getItem("token"); // Esto SÍ corre en el cliente
    setIsLoggedIn(!!token);
    setRole(localStorage.getItem("role")); // obtener rol
    setFoundationId(localStorage.getItem("foundationId"));

    // Opcional: revisar cambios cada 500ms si querés que se actualice al login
    const interval = setInterval(() => {
      const tokenCheck = localStorage.getItem("token");
  //     const storedUserProfileId = localStorage.getItem("userProfileId");
  // const storedFoundationId = localStorage.getItem("foundationId");
      setIsLoggedIn(!!tokenCheck);
      setRole(localStorage.getItem("role")); // obtener rol
      // setFoundationId(storedFoundationId);
      // setUserProfileId(storedUserProfileId);

    }, 500);
    // 🚀 Traer foundationId si el rol es FOUNDATION
    const fetchFoundationId = async () => {
      if (localStorage.getItem("role") === "FOUNDATION" && token) {
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/foundation/me/foundation`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const json = await res.json();
          if (json.data?.foundation?.id) setFoundationId(json.data.foundation.id);
        } catch (err) {
          console.error("Error fetching foundation:", err);
        }
      }
    };
    // 🚀 Traer userProfileId si el rol es USER
    const fetchUserProfileId = async () => {
      if (localStorage.getItem("role") === "USER" && token) {
        try {
          // Decodificar token para obtener userId
          const payloadBase64 = token.split(".")[1];
          const decoded = JSON.parse(atob(payloadBase64));
          const userId = decoded.id;

          const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user-profile`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const json = await res.json();
          const profiles = json.data || [];
          const myProfile = profiles.find((p: any) => p.userId === userId);
          if (myProfile) setUserProfileId(myProfile.id);
        } catch (err) {
          console.error("Error fetching user profile:", err);
        }
      }
    };
    fetchFoundationId();
    fetchUserProfileId();
    return () => clearInterval(interval);
  }, [isLoggedIn]);
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("email");
    localStorage.removeItem("userId");
    setIsLoggedIn(false);
    window.location.href = "/login";
  };
  const handleViewPublicProfileFoundation = () => {
    if (!foundationId) return alert("No se encontró la fundación");
    router.push(`/foundation/${foundationId}`);
  };

  const handleViewPublicProfileUser = () => {
    if (!userProfileId) return alert("No se encontró tu perfil");
    router.push(`/volunteers/${userProfileId}`);
  };



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
          <Link href="/contact">Contacto</Link>
          {/* {isLoggedIn && <Link href="/edit-profile">Editar perfil</Link>} Solo si está logueado */}

        </nav>
        <div className={styles.sessionBtnsContainer}>

          {isLoggedIn && (
            <button
              className={styles.viewProfileButton}
              onClick={() => router.push("/edit-profile")}
            >
              Editar perfil
            </button>
          )}
          {/* Botón perfil público para FUNDATION */}
          {/* Ver perfil público de la fundación */}
          {role === "USER" && userProfileId && (
            <button className={styles.viewProfileButton} 
            onClick={handleViewPublicProfileUser}
            >Ver mi perfil
            </button>)}

          {/* Botón perfil público para FUNDATION */} 
          {role === "FOUNDATION" && foundationId && (
            <button className={styles.viewProfileButton} 
            onClick={handleViewPublicProfileFoundation}
            >Ver mi perfil
            </button>)}


          <div className={styles.sessionBtn}>
            <button
              className={styles.btnLogin}
              onClick={isLoggedIn ? handleLogout : () => window.location.href = "/login"}
            >
              {isLoggedIn ? "Cerrar sesión" : "Iniciar sesión"}
            </button>
          </div>
        </div>

      </div>
    </header>
  );
}
