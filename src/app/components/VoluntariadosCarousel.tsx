"use client";

import { useEffect, useMemo, useState } from "react";
import { Box, Card, CardContent, Typography, Button } from "@mui/material";

type Vol = { id: number | string; titulo: string; descripcion: string; imagen: string };

type Props = { voluntariados: Vol[] };

export default function VoluntariadosCarousel({ voluntariados }: Props) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideCount = Math.ceil(voluntariados.length / 2);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!slideCount || paused) return;
    const id = setInterval(() => setCurrentSlide((p) => (p + 1) % slideCount), 5000);
    return () => clearInterval(id);
  }, [slideCount, paused]);

  const groups = useMemo(() => {
    const arr: Vol[][] = [];
    for (let i = 0; i < voluntariados.length; i += 2) arr.push(voluntariados.slice(i, i + 2));
    return arr;
  }, [voluntariados]);

  const next = () => setCurrentSlide((p) => (slideCount ? (p + 1) % slideCount : 0));
  const prev = () => setCurrentSlide((p) => (slideCount ? (p - 1 + slideCount) % slideCount : 0));

  return (
    <Box sx={{ py: 6, px: { xs: 2, md: 8 } }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 700, textAlign: 'center' }}>Últimos voluntariados</Typography>
      <Box sx={{ position: 'relative' }}
           onMouseEnter={() => setPaused(true)}
           onMouseLeave={() => setPaused(false)}>
        <Box sx={{ overflow: 'hidden', borderRadius: 3 }}>
          <Box sx={{ display: 'flex', transition: 'transform 0.5s ease', transform: `translateX(-${currentSlide * 100}%)`, width: `${slideCount * 100}%` }}>
            {groups.map((group, idx) => (
              <Box key={idx} sx={{ flex: '0 0 100%', px: { xs: 0, md: 1 } }}>
                <Box sx={{ display: 'flex', gap: { xs: 1.5, md: 2 }, flexDirection: 'row' }}>
                  {group.map((v) => (
                    <Card
                      key={v.id}
                      sx={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: { xs: 'column', md: 'row' },
                        gap: { xs: 1.5, md: 2 },
                        p: { xs: 1.5, md: 2 },
                        alignItems: { xs: 'stretch', md: 'center' },
                        borderRadius: 3,
                        overflow: 'hidden',
                        boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                        transition: 'transform 0.3s',
                        '&:hover': { transform: 'translateY(-5px)' },
                      }}
                      onMouseEnter={() => setPaused(true)}
                      onMouseLeave={() => setPaused(false)}
                    >
                      <Box
                        component="img"
                        src={v.imagen}
                        alt={v.titulo}
                        sx={{
                          width: { xs: '100%', md: 140 },
                          height: { xs: 'auto', md: 120 },
                          aspectRatio: { xs: '4 / 3', md: 'auto' } as any,
                          objectFit: 'cover',
                          borderRadius: 2,
                        }}
                      />
                      <CardContent sx={{ p: 0, minWidth: 0 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 700, fontSize: { xs: '0.95rem', md: '1rem' } }}>{v.titulo}</Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            mt: 0.75,
                            fontSize: { xs: '0.85rem', md: '0.9rem' },
                            display: '-webkit-box',
                            WebkitLineClamp: { xs: 3, md: 2 } as any,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden'
                          }}
                        >
                          {v.descripcion}
                        </Typography>
                      </CardContent>
                    </Card>
                  ))}
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2, mt: 2, flexWrap: 'wrap' }}>
        <Button className="shadow-inset-center" variant="contained" onClick={prev} sx={{ backgroundColor: 'var(--color-secundario)', color: 'var(--color-primario)', minWidth: 36, px: 1, '&:hover': { backgroundColor: 'var(--color-verde-oscuro)' } }}>‹</Button>
        <Box sx={{ display: 'flex', gap: 1 }}>
          {Array.from({ length: slideCount }).map((_, idx) => (
            <Box key={idx} onClick={() => setCurrentSlide(idx)} sx={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: idx === currentSlide ? 'var(--text-color)' : 'var(--color-verde-oscuro)', cursor: 'pointer' }} />
          ))}
        </Box>
        <Button className="shadow-inset-center" variant="contained" onClick={next} sx={{ backgroundColor: 'var(--color-secundario)', color: 'var(--color-primario)', minWidth: 36, px: 1, '&:hover': { backgroundColor: 'var(--color-verde-oscuro)' } }}>›</Button>
      </Box>
    </Box>
  );
}

