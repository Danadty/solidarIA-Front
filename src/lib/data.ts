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


export { fechtData, fechtDataWithToken };