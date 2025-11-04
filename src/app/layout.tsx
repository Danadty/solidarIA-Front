"use client";
import "./globals.css";
import Header from "./components/Header";
import { usePathname } from "next/navigation";
import { AuthProvider } from '../lib';
import Chatbot from "./components/chatbot";
import SiteFooter from './components/SiteFooter';
import { Toaster } from "sonner"; // 👈 Importá Sonner

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isProfilePage = pathname?.includes("profile-user");

  return (
    <html lang="es">
      <body>
        <AuthProvider>
          {/* <Header isLoggedIn={isProfilePage} /> */}
          <Header />
          <Toaster richColors position="top-center" />

          {children}
          <Chatbot />
        </AuthProvider>
        <SiteFooter />

      </body>
    </html>
  );
}
