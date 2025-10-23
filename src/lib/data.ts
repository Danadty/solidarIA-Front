// --- Llamado a la api---
const fechtData = async (endpoint: string, token: string) => {

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