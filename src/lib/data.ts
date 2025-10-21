// lib/data.ts
import { Ong, Project, User, Donation } from './definitions'; // Importa todos tus tipos

const API_BASE_URL = 'http://35.172.181.207:3000/api';

// --- Funciones para Ongs ---
export async function getOngById(id: string): Promise<Ong> {
  try {
    
    console.log(`Fetching data for ONG ID: ${id}`);
    const response = await fetch(`${API_BASE_URL}/foundation`, { cache: 'no-store' });

    if (!response.ok) {
      throw new Error(`Error en el fetch de ONGs: ${response}`);
    }

    const data: Ong[] = await response.json();
    const ong = data.find(ong => ong.id === id);

    if (!ong) {
     
      throw new Error(`ONG con id ${id} no encontrada.`);
    
    }
    
    return ong;

  } catch (error) {
    console.error("Error fetching data: ", error);
    throw new Error("No se pudo obtener la información de la ONG.");
  }
}


export async function getAllOngs(): Promise<Ong[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/foundation`, { cache: 'no-store' });
    if (!response.ok) {
      throw new Error(`Error en el fetch: ${response.statusText}`);
    }
    const data: Ong[] = await response.json();
    return data;

  } catch (error) {
    console.error("Error fetching data: ", error);
    throw new Error("No se pudo obtener la lista de ONGs.");
  }
}


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