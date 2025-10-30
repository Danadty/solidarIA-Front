"use client"
import { useState} from "react";
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import { PostMp } from "@/lib/data";
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

const PasarelaPagos = ({ 
    ongId, 
    ongName, 
    contact_email, 
    contact_phone, 
    monto: initialMonto,
}: PasarelaPagosProps) => {

//Llamando a la API para crear la preferencia de pago
    const [preferenceId, setPreferenceId] = useState<string | null>(null);;
    const [monto, setMonto] = useState(100);
    const [paymentUrl, setPaymentUrl] = useState('');
    //  const [ong, setOng] = useState(ongs[0]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    console.log("Componente PasarelaPagos se ha renderizado.");

const createPreference = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        if (!ongId) {
            console.error("No Id de ong disponible");
            setError("ID de ONG no disponible");
            return;
        }

        setPreferenceId(null);
        setLoading(true);

        try {
            const requestBody = {
                items: [
                    {
                        id: "donation",
                        title: `Donación a: ${ongName ?? "Fundación"}`,
                        quantity: 1,
                        unit_price: Number(monto),
                        id_ong: ongId ?? null
                    }
                ],
                metadata: {
                    foundationId: ongId ?? null,
                    foundationName: ongName ?? null,
                    contact_email: contact_email ?? null,
                    contact_phone: contact_phone ?? null
                }
            };

            console.log("Enviando al backend:", requestBody);

            // PostMp ahora hace POST relativo a /api/{endpoint}
            const data = await PostMp(requestBody, "mercadopago/create-preference");
            console.log("Respuesta del backend:", data);
            
            if (data?.success && data.data) {
                const pref = data.data;
                setPreferenceId(pref.id ?? null);
                setPaymentUrl(pref.init_point ?? "");
            } else {
                setError("Respuesta inválida del servidor");
                console.error("Error en la respuesta del servidor:", data);
            }

            
            } catch (error: any) {
                setError(error?.message || "Error al crear preferencia");
            } finally {
                setLoading(false);
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
                            
                            
                        <button className="pasarela-button" type="submit" disabled={loading}>
                            {loading ? "Procesando..." : `Clic aqui para donar ${monto} ARS`}
                        </button>
                        
                        {error && <p className="pasarela-error" style={{ color: "red", marginTop: 8 }}>{error}</p>}

                        {preferenceId ? (
                            <div style={{ width: '100%', marginTop: 18 }}>
                            <Wallet 
                                
                                initialization={{ preferenceId: preferenceId || '' }}
                            
                            />
                            </div> 
                            ) : paymentUrl ? (
                            <div style={{ marginTop: 12 }}>
                                <a href={paymentUrl} target="_blank" rel="noreferrer">
                                    <button type="button" className="pasarela-button">Ir a pagar</button>
                                </a>
                            </div>
                        ) : null}
                    </form>
                </div>
            </div>   
    )
};


export default PasarelaPagos;