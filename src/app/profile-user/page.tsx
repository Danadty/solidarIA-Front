import Header from "../components/Header";
import ActivityCard from "./components/ActivityCard";

export default function ProfilePage() {
  return (
    <>
      <Header isLoggedIn={true} />

      <main style={{ padding: "2rem" }}>
        <h2>Últimas actividades</h2>

        <ActivityCard
          image="/globe.svg"
          title="Nombre del proyecto"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        />
      </main>
    </>
  );
}
