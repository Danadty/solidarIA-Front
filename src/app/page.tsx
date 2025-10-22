"use client";
import { useEffect, useState } from "react";
import { fechtData } from '@/lib/data'; // Importa tus funciones

const myToken = process.env.NEXT_PUBLIC_TOKEN_ACCESS!;


export default function MiPaginaDePrueba() {
    const [ongs, setOngs] = useState<any[]>([]);
    const [error, setError] = useState<string>("");


  // Agrega los console.log aquí
  useEffect(() => {
    const obtenerOngs = async () => {
    try {
      console.log("--- [SERVIDOR] Iniciando fetch de datos... ---");
      const dataOng = await fechtData("foundation", myToken);
      
      console.log("--- [SERVIDOR] Datos de ONGs recibidos: ---");
      console.log(dataOng);

    } catch (error: any) {
      console.error("--- [SERVIDOR] Hubo un error al hacer fetch ---", error);
      setError(error.message);
    }}
obtenerOngs();

  }, []);
  // El componente debe devolver algo de JSX
  return (
    <div>
      <h1>Revisa tu terminal</h1>
      <p>Los datos de la API deberían haber aparecido en la terminal donde ejecutaste 'npm run dev'.</p>
    </div>
  );
}