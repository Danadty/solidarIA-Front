"use client";

import { Box, Typography, Card, CardContent, CardActions, Button } from "@mui/material";
import { Grid } from "@mui/material";
import Link from "next/link";

type Path = { title: string; description: string; action: string; style: string; href: string };

type Props = {
  paths: Path[];
  recommended: string;
};

export default function PathSelector({ paths, recommended }: Props) {
  return (
    <Box
      sx={{
        py: 8,
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.25), rgba(0,0,0,0.25)), url('/imagepage (1).avif')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        borderRadius: 2,
        mx: { xs: 2, md: 6 },
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Typography
          variant="h5"
          sx={{
            textAlign: 'center',
            mb: 4,
            fontWeight: 800,
            color: 'var(--color-white)',
            px: 2,
            py: 1,
            borderRadius: 2,
            bgcolor: 'rgba(0,0,0,0.35)',
            backdropFilter: 'blur(2px)',
            textShadow: '0 2px 6px rgba(0,0,0,0.35)'
          }}
        >
          ¿Qué camino querés seguir?
        </Typography>
      </Box>
      <Grid container spacing={3} justifyContent="center">
        {paths.map((p, i) => (
          <Grid
            key={i}
            sx={{
              flex: { xs: '0 0 100%', sm: '0 0 50%', md: '0 0 25%' },
              maxWidth: { xs: '100%', sm: '50%', md: '25%' },
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Card sx={{
              borderRadius: 3,
              textAlign: 'center',
              maxWidth: 320,
              mx: 'auto',
              backgroundColor: recommended === p.title ? 'var(--color-text)' : 'var(--color-primario)',
              color: recommended === p.title ? 'var(--color-white)' : 'var(--color-text)',
              boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
              p: 2,
              transition: '0.3s',
              '&:hover': { transform: 'translateY(-5px)', boxShadow: '0 8px 20px rgba(0,0,0,0.15)' },
              height: '100%',
            }}>
              <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>{p.title}</Typography>
                <Typography variant="body2" sx={{ mt: 1, mb: 2, minHeight: 56 }}>{p.description}</Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: 'center' }}>
                <Link href={p.href}>
                  <Button className="shadow-inset-center"
                    variant={p.style === 'outline' ? 'outlined' : 'contained'}
                    sx={{
                      backgroundColor: p.style === 'var(--color-1)' ? 'var(--color-verde-oscuro)' : 'var(--color-texto)',
                      color: 'var(--color-white)',
                      borderColor: 'var(--color-white)',
                      '&:hover': { backgroundColor: 'var(--color-secundario)', color: 'var(--color-primario)' },
                    }}
                  >
                    {p.action}
                  </Button>
                </Link>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
