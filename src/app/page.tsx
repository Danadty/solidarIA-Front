import PasarelaPagos from "./components/PasarelaPagos/PasarelaPagos";
import ongsData from "@/app/components/ProfileOng/ProfileOngPrueba.json";
import ProfileOng from "./components/ProfileOng/ProfileOng";

export default function Home() {
  return (
    <>
      <ProfileOng
        ProfileOngPrueba={ongsData}
      />
      
      {/* <PasarelaPagos /> */}
    </>
  );
}
