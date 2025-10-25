<<<<<<< HEAD
// import PasarelaPagos from "./components/PasarelaPagos/PasarelaPagos";
// import OngProfile from "./components/ProfileOng/ProfileOng";
import ongData from '@/app/ProfileOng.json';
// import PasarelaPagos from "./components/PasarelaPagos/PasarelaPagos";
import HomePage from "./components/Home/HomePage";
=======
"use client";
import { useEffect, useState } from "react";
import { fechtData } from '@/lib/data'; // Importa tus funciones

const myToken = process.env.NEXT_PUBLIC_TOKEN_ACCESS!;
>>>>>>> 18026b43fa94a0851cb15f62f9b538861f731bec


export default function MiPaginaDePrueba() {
    const [ongs, setOngs] = useState<any[]>([]);
    const [error, setError] = useState<string>("");

<<<<<<< HEAD
  const datosDeLaOng: any = ongData;
  
  return (
    <>
      <HomePage />
    </>
=======

  // Agrega los console.log aquí
  useEffect(() => {
    const obtenerOngs = async () => {
    try {
      console.log("--- [SERVIDOR] Iniciando fetch de datos... ---");
      const dataOng = await fechtData("foundation", myToken);
      
      console.log("--- [SERVIDOR] Datos recibidos: ---");
      console.log(dataOng);

    } catch (error: any) {
      console.error("--- [SERVIDOR] Hubo un error al hacer fetch ---", error);
      setError(error.message);
    }}
obtenerOngs();

  }, []);
  
  


  return (
    <div>
      <h1>Metodos para la API</h1>
      <p>{}</p>
    </div>
>>>>>>> 18026b43fa94a0851cb15f62f9b538861f731bec
  );
}