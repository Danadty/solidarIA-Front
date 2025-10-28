"use client"
import { useState } from "react";
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import "./PasarelaPagos.css";

interface PasarelaPagosProps{
    ongId: string;
    ongName: string;
    contact_email:string;
    contact_phone:string;
    monto?:number;

}
//Accedemos a la clave pública de MercadoPago desde las variables de entorno

initMercadoPago(process.env.NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY || "");

const PasarelaPagos = ({ ongId, ongName, contact_email, contact_phone }: PasarelaPagosProps) => {

//Llamando a la API para crear la preferencia de pago
    const [preferenceId, setPreferenceId] = useState<string | null>(null);
    const [paymentUrl, setPaymentUrl] = useState('');
    const [ong, setOng] = useState(ongName);
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
                        title: `Donación a: ${ongName ?? ong}`,
                        quantity: 1,
                        unit_price: Number(monto),
                        id_ong: ongId ?? null
                    }
                ],
                // enviar metadata para que el backend tenga todos los datos relevantes
                metadata: {
                  foundationId: ongId ?? null,
                  foundationName: ongName ?? ong,
                  contact_email: contact_email ?? null,
                  contact_phone: contact_phone ?? null
                }
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
            <div className="profile-section">
                <h2 className="section-title">Donar a {ongName}</h2>
                <div className="pasarela-form">
                    <form onSubmit={createPreference}>
                            <div className="form-montos">
                                <button className="montos-radio" name="2500" id="" onClick={() => setMonto(2500)}>2500</button>
                                <button className="montos-radio" name="5000" id="" onClick={() => setMonto(5000)}>5000</button>
                                <button className="montos-radio" name="10000" id="" onClick={() => setMonto(10000)}>10000</button>
                                <label htmlFor="">Otro: 
                                    <input
                                        type="number"
                                        min={1}
                                        value={monto}
                                        onChange={e => setMonto(Number(e.target.value))}
                                        className="monto-otro"
                                        required
                                    />
                                </label>
                            </div>
                            
                            
                        <button className="pasarela-button" type="submit">
                            Clic aqui para donar {monto} ARS
                        </button>
                        {preferenceId &&
                            <div style={{ width: '100%', marginTop: 18 }}>
                            <Wallet 
                                
                                initialization={{ preferenceId }}
                            
                            />
                            </div>
                        }
                    </form>
                </div>
            </div>   
    )
}

export default PasarelaPagos;