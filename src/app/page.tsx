'use client';

import { useEffect, useState } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { FoundationAPI, CampaignAPI } from '../lib/api';
import Hero from './components/Hero';
import SearchAI from './components/SearchAI';
import PathSelector from './components/PathSelector';
import OngsGrid from './components/OngsGrid';
import VoluntariadosCarousel from './components/VoluntariadosCarousel';
import SiteFooter from './components/SiteFooter';

// 🎨 Colores vía CSS variables (globals.css)

export default function HomePage() {
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [recommended, setRecommended] = useState('Voluntario');
  const [ongs, setOngs] = useState<
    { id: number; nombre: string; descripcion: string; imagen: string }[]
  >([]);
  const [voluntariados, setVoluntariados] = useState<
    { id: number; titulo: string; descripcion: string; imagen: string }[]
  >([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideCount = Math.ceil(voluntariados.length / 2);

  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      try {
        setError(null);
        const [foundationsRes, campaignsRes] = await Promise.all([
          FoundationAPI.getAll(),
          CampaignAPI.getAll(),
        ]);

        const foundations = Array.isArray(foundationsRes.data) ? foundationsRes.data : (foundationsRes.data?.data || []);
        const campaigns = Array.isArray(campaignsRes.data) ? campaignsRes.data : (campaignsRes.data?.data || []);

        const mappedOngs = foundations.slice(0, 6).map((f: any, idx: number) => ({
          id: f.id ?? f._id ?? idx,
          nombre: f.name ?? f.nombre ?? 'Fundación',
          descripcion: f.description ?? f.descripcion ?? '',
          imagen: f.logoUrl ?? f.logo ?? f.imageUrl ?? '/vercel.svg',
        }));

        const toTime = (c: any) => new Date(
          c.updatedAt || c.createdAt || c.startDate || c.fecha || c.date || 0
        ).getTime();
        const sortedCampaigns = campaigns.slice().sort((a: any, b: any) => toTime(b) - toTime(a));
        const mappedVols = sortedCampaigns.slice(0, 10).map((c: any, idx: number) => ({
          id: c.id ?? c._id ?? idx,
          titulo: c.title ?? c.titulo ?? c.name ?? 'Campaña',
          descripcion: c.description ?? c.descripcion ?? '',
          imagen: c.coverUrl ?? c.portada ?? c.imageUrl ?? 'https://images.unsplash.com/photo-1523978591478-c753949ff840?q=80&w=1600&auto=format&fit=crop',
        }));

        if (isMounted) {
          setOngs(mappedOngs);
          setVoluntariados(mappedVols);
        }
      } catch (e) {
        if (isMounted) setError('No se pudo cargar la información');
      }
    };
    load();
    return () => { isMounted = false; };
  }, []);

  useEffect(() => {
    if (!initialLoading) return;
    const t = setTimeout(() => setInitialLoading(false), 0);
    return () => clearTimeout(t);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (slideCount ? (prev + 1) % slideCount : 0));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (slideCount ? (prev - 1 + slideCount) % slideCount : 0));
  };

  useEffect(() => {
    if (!slideCount) return;
    const id = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideCount);
    }, 5000);
    return () => clearInterval(id);
  }, [slideCount]);

  // 🔎 Búsqueda conectada al backend (filtro local simple)
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      const [foundationsRes, campaignsRes] = await Promise.all([
        FoundationAPI.getAll(),
        CampaignAPI.getAll(),
      ]);
      const foundations = Array.isArray(foundationsRes.data) ? foundationsRes.data : (foundationsRes.data?.data || []);
      const campaigns = Array.isArray(campaignsRes.data) ? campaignsRes.data : (campaignsRes.data?.data || []);

      const q = query.trim().toLowerCase();
      const filteredOngs = foundations
        .filter((f: any) => {
          const name = (f.name || f.nombre || '').toString().toLowerCase();
          const desc = (f.description || f.descripcion || '').toString().toLowerCase();
          return name.includes(q) || desc.includes(q);
        })
        .slice(0, 6)
        .map((f: any, idx: number) => ({
          id: f.id ?? f._id ?? idx,
          nombre: f.name ?? f.nombre ?? 'Fundación',
          descripcion: f.description ?? f.descripcion ?? '',
          imagen: f.logoUrl ?? f.logo ?? f.imageUrl ?? '/vercel.svg',
        }));

      const toTime = (c: any) => new Date(
        c.updatedAt || c.createdAt || c.startDate || c.fecha || c.date || 0
      ).getTime();
      const filteredVols = campaigns
        .filter((c: any) => {
          const t = (c.title || c.titulo || c.name || '').toString().toLowerCase();
          const d = (c.description || c.descripcion || '').toString().toLowerCase();
          return t.includes(q) || d.includes(q);
        })
        .sort((a: any, b: any) => toTime(b) - toTime(a))
        .slice(0, 10)
        .map((c: any, idx: number) => ({
          id: c.id ?? c._id ?? idx,
          titulo: c.title ?? c.titulo ?? c.name ?? 'Campaña',
          descripcion: c.description ?? c.descripcion ?? '',
          imagen: c.coverUrl ?? c.portada ?? c.imageUrl ?? 'https://images.unsplash.com/photo-1523978591478-c753949ff840?q=80&w=1600&auto=format&fit=crop',
        }));

      setOngs(filteredOngs);
      setVoluntariados(filteredVols);
    } catch (err) {
      console.error('Error buscando con IA/backend:', err);
      setError('Error al buscar. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  const paths = [
    {
      title: 'Visitante',
      description: 'Explorá campañas y doná de forma anónima. Tus aportes no aparecerán en estadísticas.',
      action: 'Explorar ONGs',
      style: 'secondary',
      href: '/ongs',
    },
    {
      title: 'Voluntario',
      description: 'Completá tu perfil y empezá a participar activamente. Tus acciones y donaciones serán registradas.',
      action: 'Extender mi perfil',
      style: 'primary',
      href: '/register-profile-user',
    },
    {
      title: 'Fundación',
      description: 'Creá campañas, gestioná tus voluntarios y generá impacto visible en la comunidad.',
      action: 'Registrar mi fundación',
      style: 'outline',
      href: '/register-foundation',
    },
  ];

  return (
    <Box sx={{ backgroundColor: 'transparent', minHeight: '100vh', color: 'var(--text-color)',
      display: 'flex', flexDirection: 'column',
      '& .MuiTypography-root': { fontFamily: 'inherit' }
    }}>
      <Box sx={{ backgroundColor: 'oklch(0.8169 0.0327 143.82 / 30.9%)', pb: 3, pt: 0, overflow: 'hidden', flex: 1,
        '& > *:last-child': { marginBottom: 0 }
      }}>
        <Hero />

        <SearchAI query={query} setQuery={setQuery} loading={loading} onSearch={handleSearch} />

        <PathSelector paths={paths} recommended={recommended} />

        {initialLoading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress size={28} sx={{ color: 'var(--color-secundario)' }} />
          </Box>
        )}

        {!!error && (
          <Typography sx={{ textAlign: 'center', color: 'var(--color-verde-oscuro)', fontWeight: 600, my: 2 }}>{error}</Typography>
        )}

        {ongs.length > 0 && <OngsGrid ongs={ongs} />}
        {voluntariados.length > 0 && <VoluntariadosCarousel voluntariados={voluntariados} />}
      </Box>

      <SiteFooter />
    </Box>
  );
}

