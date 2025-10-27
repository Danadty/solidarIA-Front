// ...existing code...
"use client";
import { useEffect, useState } from "react";
import { fechtData } from "@/lib/data";
import Link from "next/link";
import styles from "../ongs.module.css";

const myToken = process.env.NEXT_PUBLIC_TOKEN_ACCESS!;

interface RenderOngsProps {
  setFoundations?: (f: any[]) => void;
  onTotalChange?: (n: number) => void;
}

const RenderOngs = ({ setFoundations, onTotalChange }: RenderOngsProps) => {
    const [ongs, setOngs] = useState<any[]>([]);
    const [error, setError] = useState<string>("");

    useEffect(() => {
    const obtenerOngs = async () => {
        try {
            const dataOng = await fechtData("foundation/public");
            const list = dataOng.data || [];
            setOngs(list);
            if (setFoundations) setFoundations(list);
        } catch (error: any) {
            setError(error.message);
        }}
    obtenerOngs();
    }, [setFoundations]);

    /*Enviar total al padre cuando cambien ongs*/
    useEffect(() => {
      if (onTotalChange) onTotalChange(ongs.length);
    }, [ongs, onTotalChange]);
    
    if (error) return (
        <>
            <section className={styles.foundationsGrid}>
                <div className={styles.noResults}>
                    <h3>No se encontraron fundaciones</h3>
                    <p>{error}. Vuelva a intentarlo más tarde</p>
                    <p>Intentá ajustar tus filtros de búsqueda</p>
                </div>
            </section>
        </>
    )

    return (
        <>
        <section className={styles.ongsCotainer}>
            {  ongs.length === 0 ? (
                <p>Cargando ONGs...</p>
            ) : (
                ongs.map((ong:  any) => (
                    <div key={ong.id} className={styles.cardOng}>
                        <img
                            src={ong.logo_url || "/default-logo.png"}
                            alt={ong.name}
                            className={styles.cardOngImage}
                        />
                        <h2 className="card-ong-name">{ong.name}</h2>
                        <p className={styles.ongDescrition}>{ong.description.length > 99
                        ? `${ong.description.substring(0, 100)}...`
                        : ong.description}</p>

                        <Link
                            href={`/foundation/${ong.id}`}
                        >
                            <button
                            className={styles.cardOngButton}>Ver Perfil</button>
                        </Link>
                        <Link
                            href={`/foundation/${ong.id}`}
                        >
                            <button>
                                Donar
                            </button>
                        </Link>
                    </div>
                ))
            )}
        </section>
        </>
  );
};

export default RenderOngs;
// ...existing code...