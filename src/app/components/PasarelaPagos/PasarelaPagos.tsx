"use client"
import { useState } from "react";
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import "./PasarelaPagos.css";

const ongs = [
    "La Nazarena",
    "Casa del niño",
    "Integrar",
    "Empujar"
];
//Accedemos a la clave pública de MercadoPago desde las variables de entorno
console.log("USANDO CLAVE PÚBLICA:", process.env.NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY);
initMercadoPago(process.env.NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY || "");

const PasarelaPagos = () => {

//Llamando a la API para crear la preferencia de pago
    const [preferenceId, setPreferenceId] = useState<string | null>(null);
    const [paymentUrl, setPaymentUrl] = useState('');
    const [ong, setOng] = useState(ongs[0]);
    const [monto, setMonto] = useState(100);

    console.log("Componente PasarelaPagos se ha renderizado.");

const createPreference = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Botón presionado. Iniciando creación de preferencia...");

        // Limpiamos el ID viejo para que desaparezca el botón anterior si se genera uno nuevo
        setPreferenceId(null);
        
        try {           
            
            const requestBody = {
                items: [
                    {
                        id: "donation",
                        title: `Donación a: ${ong}`,
                        quantity: 1,
                        unit_price: Number(monto),
                    }
                ],
            };

            console.log("Enviando al backend:", requestBody);

            const response = await fetch('/api/create-preference', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(requestBody)
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Respuesta del backend:", data);
               

                setPreferenceId(data.id)
                setPaymentUrl(data.init_point);
              
            } else{
                console.error("Error en la respuesta del servidor:", response.statusText);
            }

        } catch (error) {
            console.error("Error creating preference:", error);
        }
    
    }
    
    
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
                            <Wallet 
                                initialization={{ preferenceId: preferenceId }}
                            
                            />
                            </div>
                        }
                    </form>
                </div>
            </div>   
    )
}

export default PasarelaPagos;