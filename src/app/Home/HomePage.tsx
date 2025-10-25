"use client";
import { useEffect, useState } from "react";
import OngProfile from "../components/ProfileOng/ProfileOng";
import { fechtData } from "@/lib/data";
import Link from "next/link";

const myToken = process.env.NEXT_PUBLIC_TOKEN_ACCESS!;


const HomePage = () => {
    const [ongs, setOngs] = useState<any[]>([]);
    const [error, setError] = useState<string>("");

    // const datosDeLaOng: any = ongData;

    useEffect(() => {
    const obtenerOngs = async () => {
        try {
            console.log("--- [SERVIDOR] Iniciando fetch de datos... ---");
            const dataOng = await fechtData("foundation", myToken);
            
            console.log("--- [SERVIDOR] Datos recibidos: ---");
            console.log(dataOng);
            setOngs(dataOng.data || []);
        } catch (error: any) {
            console.error("--- [SERVIDOR] Hubo un error al hacer fetch ---", error);
            setError(error.message);
        }}
    obtenerOngs();
    }, []);

    if (error) return <p>{error}. Vuelva a intentarlo más tarde</p>

    return (
        <>
        <div>
            <h1>Hola user</h1>
        </div>
        <div>
            <h2>Ongs para ver</h2>
            {  ongs.length === 0 ? (
                <p>Cargando ONGs...</p>
            ) : (
                ongs.map((ong:  any) => (
                    <div key={ong.id}>
                        <h2>{ong.name}</h2>
                        <p>{ong.description}</p>

                        <Link
                            href={`/foundation/${ong.id}`}
                        >
                            <button>Ver Perfil</button>
                        </Link>
                    </div>
                ))
            )}
        </div>
        </>
  );
};

export default HomePage;
