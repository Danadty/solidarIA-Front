'use client';

import { useEffect } from 'react';
import { CampaignAPI } from 'src/lib/api/campaign.api';

export default function Page() {
  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const res = await CampaignAPI.getAll();
        console.log('Campaigns fetched:', res.data);
      } catch (err) {
        console.error('Error fetching campaigns:', err);
      }
    };

    fetchCampaigns();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Prueba Campaigns getAll()</h1>
      <p>------------revisar la consola para ver la respuesta de la API-------</p>
    </div>
  );
}
