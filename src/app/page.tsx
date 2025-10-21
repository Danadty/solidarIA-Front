// app/tu-pagina/page.tsx

import { getAllOngs } from '@/lib/data'; // Importa tus funciones
import { Ong, User } from '@/lib/definitions'; // Importa los tipos

export default async function MiPaginaDePrueba() {
  
  // Agrega los console.log aquí
  try {
    console.log("--- [SERVIDOR] Iniciando fetch de datos... ---");

    // Llama a tus funciones
    const ongs: Ong[] = await getAllOngs();
    
    console.log("--- [SERVIDOR] Datos de ONGs recibidos: ---");
    console.log(ongs);

    
    // console.log(JSON.stringify(ongs, null, 2)); // Alternativa para verlos "bonito"

  } catch (error) {
    console.error("--- [SERVIDOR] Hubo un error al hacer fetch ---", error);
  }

  // El componente debe devolver algo de JSX
  return (
    <div>
      <h1>Revisa tu terminal</h1>
      <p>Los datos de la API deberían haber aparecido en la terminal donde ejecutaste 'npm run dev'.</p>
    </div>
  );
}