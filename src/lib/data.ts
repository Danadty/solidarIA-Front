
import { } from 'next/server';

// --- Llamado a la api---

const fechtData = async (endpoint: string) => {
  try{
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/${endpoint}`, { 
      method: 'GET',
      headers:{
        'Content-Type': 'application/json',
      },
      cache: "no-store",
    });

      if(!response.ok){
        const errorMessage = await response.json().catch(() => ({}));
        throw new Error (errorMessage || "Error a obtener datos");
      };

      const data = await response.json();
      return data;

  } catch (error: any){
    throw new Error(error.message || "Error de conexión");
  }
}

/*Fetch con token */


const fechtDataWithToken = async (endpoint: string, token: string) => {
  try{
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/${endpoint}`, { 
      method: 'GET',
      headers:{
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      cache: "no-store",
    });

      if(!response.ok){
        const errorMessage = await response.json().catch(() => ({}));
        throw new Error (errorMessage || "Error a obtener datos");
      };

      const data = await response.json();
      return data;

  } catch (error: any){
    throw new Error(error.message || "Error de conexión");
  }
}


//POST MP

const PostMp = async (body: any, endpoint: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await res.json().catch(() => null);
    if (!res.ok) {
      // retornar error para que el llamador lo maneje
      throw new Error(data?.error || `Error ${res.status}`);
    }
    return data;
  } catch (err: any) {
    // relanzar para manejo en UI
    throw new Error(err?.message || 'Error en PostMp');
  }
}


export { fechtData, fechtDataWithToken, PostMp };