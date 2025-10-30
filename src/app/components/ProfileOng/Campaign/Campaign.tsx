"use client";
import { fechtData } from "@/lib/data";
import { useEffect, useState } from "react";
import styles from "./Campaign.module.css";


const myToken = process.env.NEXT_PUBLIC_TOKEN_ACCESS!;

interface Campaign {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    id_ong: string;
}

interface CampaignComponentProps {
    ongId: string;
}

const CampaignComponent = ({ ongId }: CampaignComponentProps) => {
    const [campaigns, setCampaigns] = useState<Campaign[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!ongId) return;

        const fetchCampaigns = async () => {
            setLoading(true);
            try {
                const response = await fechtData(`campaign`);
                const list = Array.isArray(response?.data) ? response.data : [];
                console.log("Campañas fetched (sin filtrar):", list);
                // Filtrar localmente solo las campañas que pertenezcan a la ONG actual
                const filtered = list.filter((c: any) => String(c.foundationId) === String(ongId));
                console.log("Campañas fetched (filtradas):", filtered);
                setCampaigns(filtered);
            } catch (err) {
                setError("Error al cargar las campañas de la ONG.");
            } finally {
                setLoading(false);
            }
        };

        fetchCampaigns();
    }, [ongId]);

    if (error) return <div>{error}</div>;
    if (loading) return <div>Cargando campañas...</div>;

    return (
        <div>
            {campaigns.length === 0 ? (
                <p>No hay campañas registradas.</p>
            ) : (
                <ul>
                    {campaigns.map((campaign: Campaign) => (
                        <li key={campaign.id} className={styles.campaingCard}>
                            <div className={styles.contentImgCam}>
                                <img src={campaign.imageUrl} alt={campaign.title} />
                            </div>
                            <div className={styles.contentInfoCam}>
                                <h3>{campaign.title}</h3>
                                <p>{campaign.description}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default CampaignComponent;