"use client"
import "./PasarelaPagos.css";
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import { useState } from "react";

initMercadoPago('APP_USR-5fa1ad26-4140-4dd7-8583-7cdadd3b3c96');

const ongs = [
    "La Nazarena",
    "Casa del niño",
    "Integrar",
    "Empujar"
];


const PasarelaPagos = () => {

//Llamando a la API para crear la preferencia de pago
    const [preferenceId, setPreferenceId] = useState<string | null>(null);
    const [ong, setOng] = useState(ongs[0]);
    const [monto, setMonto] = useState(100);


    const createPreference = async (e: React.FormEvent) => {
        e.preventDefault();
        setPreferenceId(null);
        
        try {           
            const response = await fetch("http://localhost:8080/create_preference",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        items: [
                            {
                                id: "donation",
                                title: `Donación a: ${ong}`,
                                quantity: 1,
                                unit_price: Number(monto),
                            }
                        ],
                    })
                }
            )
            console.log("Enviando al backend:", response.body);

            if (response.ok) {
                const data = await response.json();
                setPreferenceId(data.preferenceId)
              
                console.log("Respuesta del backend:", data);
            }

        } catch (error) {
            console.error("Error creating preference:", error);
        }
    };

    

    return (
            <div className="container-pasarela">
                <div className="pasarela-title">
                    Realizar donación
                </div>
                <div className="pasarela-form">
                    <form onSubmit={createPreference}>
                        <label>ONG
                            <select
                                value={ong}
                                onChange={e => setOng(e.target.value)}
                                style={{ marginLeft: 8, marginBottom: 18, padding: 6, borderRadius: 6 }}
                                >
                                {ongs.map(o => (
                                    <option key={o} value={o}>{o}</option>
                                ))}
                            </select>
                        </label>
                       <label>
                            Monto:
                            <input
                            type="number"
                            min={1}
                            value={monto}
                            onChange={e => setMonto(Number(e.target.value))}
                            style={{ marginLeft: 8, marginBottom: 18, padding: 6, borderRadius: 6, width: 100 }}
                            required
                            />
                        </label>
                        <button className="pasarela-button" type="submit">
                        Generar enlace de donación
                        </button>
                        {preferenceId &&
                            <div style={{ width: '300px', marginTop: 18 }}>
                            <Wallet initialization={{ preferenceId: preferenceId }} />
                            </div>
                        }
                    </form>
                </div>
            </div>   
    )
}

export default PasarelaPagos;