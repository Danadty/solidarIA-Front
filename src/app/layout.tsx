"use client";
import "./globals.css";
import Header from "./components/Header";
import { usePathname } from "next/navigation";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isProfilePage = pathname?.includes("profile-user");

  return (
    <html lang="es">
      <body>
        <Header isLoggedIn={isProfilePage} />
        {children}
      </body>
    </html>
  );
}
