"use client";
import { fechtData } from "@/lib/data";
import { useEffect, useState } from "react";
import styles from "./Campaign.module.css";
import feedbackStyles from "./Feedback.module.css";
import { UserCampaignAPI } from "@/lib/api/userCampaign.api";

interface Campaign {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    foundationId: string;
}

interface CampaignComponentProps {
    ongId: string;
}

interface FeedbackMessage {
    type: "success" | "error" | "info";
    text: string;
}

const CampaignComponent = ({ ongId }: CampaignComponentProps) => {
    const [campaigns, setCampaigns] = useState<Campaign[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [feedback, setFeedback] = useState<FeedbackMessage | null>(null);
    const [role, setRole] = useState<string | null>(null);
    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {
        setRole(localStorage.getItem("role"));
        setUserId(localStorage.getItem("userId"));
    }, []);

    useEffect(() => {
        if (!ongId) return;

        const fetchCampaigns = async () => {
            setLoading(true);
            try {
                const response = await fechtData(`campaign`);
                const list = Array.isArray(response?.data) ? response.data : [];
                const filtered = list.filter(
                    (c: any) => String(c.foundationId) === String(ongId)
                );
                setCampaigns(filtered);
            } catch (err) {
                setError("Error al cargar las campañas de la ONG.");
            } finally {
                setLoading(false);
            }
        };

        fetchCampaigns();
    }, [ongId]);

    const handleJoinCampaign = async (campaignId: string) => {
        if (!userId) {
            window.location.href = "/registrar";
            return;
        }

        try {
            await UserCampaignAPI.create({ userId, campaignId });
            setFeedback({
                type: "success",
                text: "Te has registrado como voluntario en esta campaña.",
            });
        } catch (err) {
            setFeedback({
                type: "info",
                text: "Ya te registraste como voluntario :) !",
            });
            console.warn("Error registrando usuario a campaña:", err);
        }

        setTimeout(() => setFeedback(null), 4000);
    };

    if (error) return <div>{error}</div>;
    if (loading) return <div>Cargando campañas...</div>;

    return (
        <div style={{ position: "relative" }}>
            {campaigns.length === 0 ? (
                <p>No hay campañas registradas.</p>
            ) : (
                <ul>
                    {campaigns.map((campaign) => (
                        <li key={campaign.id} className={styles.campaingCard}>
                            <div className={styles.contentImgCam}>
                                <img src={campaign.imageUrl} alt={campaign.title} />
                            </div>
                            <div className={styles.contentInfoCam}>
                                <h3>{campaign.title}</h3>
                                <p>{campaign.description}</p>
                                {role === "USER" && (
                                    <button
                                        className={styles.volunteerButton}
                                        onClick={() =>
                                            handleJoinCampaign(campaign.id)
                                        }
                                    >
                                        Ser voluntario
                                    </button>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            )}

            {feedback && (
                <div
                    className={`${feedbackStyles["feedback-message"]} ${feedbackStyles[feedback.type]}`}
                >
                    <div className={feedbackStyles["feedback-content"]}>
                        <span className={feedbackStyles["feedback-icon"]}>
                            {feedback.type === "success"
                                ? "✓"
                                : feedback.type === "error"
                                ? "✗"
                                : "ℹ"}
                        </span>
                        <span>{feedback.text}</span>
                    </div>
                    <button
                        className={feedbackStyles["feedback-close"]}
                        onClick={() => setFeedback(null)}
                    >
                        ×
                    </button>
                </div>
            )}
        </div>
    );
};

export default CampaignComponent;