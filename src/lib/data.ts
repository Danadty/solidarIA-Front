// lib/data.ts
// import { Ong, Project, User, Donation } from './definitions'; // Importa todos tus tipos

const API_BASE_URL = 'http://35.172.181.207:3000';


// --- Funciones para Ongs ---
const fechtData = async (endpoint: string, token: string) => {

  try{
    const response = await fetch(`${API_BASE_URL}/${endpoint}`, { 
      method: 'GET',
      headers:{
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      cache: "no-store",
    });

      if(!response.ok){
        const errorMessage = await response.json().catch(() => ({}));
        throw new Error (errorMessage);
      };

      const data = await response.json();
      console.log(data);
      return data;

  } catch (error: any){
    Error(error.message || "Error de conexión");
  }
}

export { fechtData };

// // --- Funciones para USUARIOS (Ejemplo) ---

// /**
//  * Obtiene un Usuario por su ID.
//  */
// export async function getUserById(id: string): Promise<User> {
//   try {
//     // Asumimos que tu API tiene un endpoint /users/[id]
//     const response = await fetch(`${API_BASE_URL}/user/${id}`, { cache: 'no-store' });

//     if (!response.ok) {
//       throw new Error(`Error en el fetch de Usuario: ${response.statusText}`);
//     }

//     const data: User = await response.json();
//     return data;

//   } catch (error) {
//     console.error("Error fetching data: ", error);
//     throw new Error("No se pudo obtener la información del Usuario.");
//   }
// }


// // --- Funciones para DONACIONES (Ejemplo) ---

// /**
//  * Obtiene las donaciones de una ONG específica.
//  */
// export async function getDonationsByOng(ongId: string): Promise<Donation[]> {
//   try {
//     // Asumimos un endpoint como /donations?ongId=[ongId]
//     const response = await fetch(`${API_BASE_URL}/donations`, { 
//       cache: 'no-store' 
//     });

//     if (!response.ok) {
//       throw new Error(`Error en el fetch de Donaciones: ${response}`);
//     }
    
//     const data: Donation[] = await response.json();
//     return data;

//   } catch (error) {
//     console.error("Error fetching data: ", error);
//     throw new Error("No se pudieron obtener las donaciones.");
//   }
// }

// // ...y así sucesivamente para Proyectos, Perfiles, etc.