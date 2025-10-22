import { redirect } from "next/navigation";

export default function HomePage() {
  // 🔥 Redirige automáticamente a /login
  redirect("/login");
  return null; // 👈 esto evita el error del componente vacío
}
