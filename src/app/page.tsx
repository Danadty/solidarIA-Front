// import PasarelaPagos from "./components/PasarelaPagos/PasarelaPagos";
// import OngProfile from "./components/ProfileOng/ProfileOng";
import ongData from '@/app/ProfileOng.json';
// import PasarelaPagos from "./components/PasarelaPagos/PasarelaPagos";
import HomePage from "./components/Home/HomePage";


export default function Home() {

  const datosDeLaOng: any = ongData;
  
  return (
    <>
      <HomePage />
    </>
  );
}
