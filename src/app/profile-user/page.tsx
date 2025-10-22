'use client';

import ActivityCard from "./components/ActivityCard";
import TableLastDonations from "./components/TableLastDonations";
import UserProfileCard from "./components/UserProfileCard";
import {mockUserProfile} from "./mocks/profile"
import {lastsDonations} from "./mocks/donations"

export default function ProfilePage() {
  return (
    <main style={{ padding: "2rem" }}>
      <UserProfileCard 
        profile={mockUserProfile}
        key={mockUserProfile.id}
      />
      
      
      <h2>Últimas actividades</h2>



      <ActivityCard
        image="/globe.svg"
        title="Nombre del proyecto"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      />

      <h2>Ultimas donaciones</h2>

      <TableLastDonations
        key={null}
      />
    </main>
  );
}