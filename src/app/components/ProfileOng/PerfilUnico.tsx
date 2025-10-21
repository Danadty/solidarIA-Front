// app/page.tsx (o donde quieras mostrar el perfil único)

import ongsData from "@/app/components/ProfileOng/ProfileOngPrueba.json";
import ProfileOng from "@/app/components/ProfileOng/ProfileOng"; // Revisa que la ruta sea correcta

const PaginaDePerfilUnico = () => {
  // 1. Usa .find() para buscar la ONG específica por su id.
  const ongEspecifica = ongsData.find(ong => ong.id === 3);

  // 2. (Importante) Verifica si la ONG fue encontrada.
  // Si no la encuentra, .find() devuelve `undefined` y es bueno manejar ese caso.
  if (!ongEspecifica) {
    return <h1>ONG no encontrada</h1>;
  }

  // 3. Pasa el resultado a tu componente.
  // ¡Ojo! Tu componente `ProfileOng` espera un array (ongs: Ong[]),
  // así que le pasamos el objeto que encontramos dentro de corchetes: `[ongEspecifica]`.
  return (
    <main>
      <h1>Perfil de la Fundación</h1>
      <ProfileOng ongs={[ongEspecifica]} />
      
    </main>
  );
};

export default PaginaDePerfilUnico;