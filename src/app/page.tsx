import { redirect } from "next/navigation";

export default function HomePage() {
  // 🔥 Redirige automáticamente a /login
  redirect("/login");
  return null; // 👈 esto evita el error del componente vacío
}



//NO BORRAR - CÓDIGO DE PRUEBA PARA TESTEAR LA API EN EL HOME - ATTE ESTEBAN
// "use client";
// import { useEffect, useState } from "react";
// import { fechtData } from '@/lib/data'; // Importa tus funciones

// const myToken = process.env.NEXT_PUBLIC_TOKEN_ACCESS!;


// export default function MiPaginaDePrueba() {
//     const [ongs, setOngs] = useState<any[]>([]);
//     const [error, setError] = useState<string>("");


//   // Agrega los console.log aquí
//   useEffect(() => {
//     const obtenerOngs = async () => {
//     try {
//       console.log("--- [SERVIDOR] Iniciando fetch de datos... ---");
//       const dataOng = await fechtData("foundation", myToken);
      
//       console.log("--- [SERVIDOR] Datos recibidos: ---");
//       console.log(dataOng);

//     } catch (error: any) {
//       console.error("--- [SERVIDOR] Hubo un error al hacer fetch ---", error);
//       setError(error.message);
//     }}
// obtenerOngs();

//   }, []);
  
  


//   return (
//     <div>
//       <h1>Metodos para la API</h1>
//       <p>{}</p>
//     </div>
//   );
// }
