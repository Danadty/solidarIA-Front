import { fechtData } from "@/lib/data";
import OngProfile from "../../components/ProfileOng/ProfileOng";

const myToken = process.env.NEXT_PUBLIC_TOKEN_ACCESS!;

interface OngParams {
  params: { id: string };
}

export default async function OngPage({ params }: OngParams) {
   const resolvedParams = await params;
    const { id } = resolvedParams;


try {
    // 🔹 Fetch de la ONG específica
    const ongData = await fechtData(`foundation/${id}`, myToken);
    console.log("ONG Data fetched:", ongData);
    // 🔹 Mapeo a props esperadas por OngProfile
    const profileProps = {            
            contact_email: ongData.data.contact_email || "Mail no disponible",
            contact_phone: ongData.data.contact_phone || "Número no disponible",
            profileImage: ongData.data.profileImage,
            description: ongData.data.description || "Vacío",
            id: ongData.data.id,
            createdAt: ongData.data.createdAt || "",
            logoPublicId: ongData.data. logoPublicId || null,
            logo_url: ongData.data.logo_url || null,
            name: ongData.data.name || "Fundación Sin Nombre",
            updatedAt: ongData.data.updatedAt || "",
            userId: ongData.data.userId || "",
        //   stats: {
        //     donors: f.stats?.donors || 0,
        //     volunteers: f.stats?.volunteers || 0,
        //     projects: f.stats?.projects || 0,
        //   },
        //   mission: f.mission || "Nuestra misión es ayudar.",
        //   vision: f.vision || "Nuestra visión es generar un cambio real.",
        //   values: f.values || ["Compromiso", "Solidaridad", "Transparencia"],
        //   socialImpact: f.socialImpact || "Estamos generando impacto positivo cada día.",
        //   latestProjects: f.latestProjects || [],
        //   latestDonations: f.latestDonations || [],
        //   alliances: f.alliances || [],
        //   location: f.location || "Argentina",
        //   websiteUrl: f.websiteUrl || "#",
        //   socialLinks: f.socialLinks || {},
        };

    console.log(profileProps);
    return <OngProfile {...profileProps} 
    
    />;
  } catch (error) {
    console.error("Error al obtener ONG:", error);
    return <p>Error al cargar el perfil de la ONG.</p>;
  }
}