"use client";

import { Box, Typography, Button } from "@mui/material";
import Link from "next/link";

export default function Hero() {
  return (
    <Box sx={{ px: { xs: 3, md: 8 }, pt: { xs: 2, md: 3 }, pb: { xs: 2, md: 3 } }}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '7fr 5fr' }, gap: 2, alignItems: 'center' }}>
        <Box>
          <Typography variant="h3" sx={{ fontWeight: 800, lineHeight: 1.2, mb: 2, textShadow: '0 2px 6px rgba(0,0,0,0.2)' }}>
            Conectamos personas y causas
          </Typography>
          <Typography variant="body1" sx={{ mb: 2, color: 'var(--text-color)', textShadow: '0 1px 2px rgba(0,0,0,0.15)' }}>
            Descubrí ONGs, participá como voluntario y generá impacto real.
          </Typography>
          <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
            <Link href="/ongs">
              <Button className="shadow-inset-center" variant="contained" sx={{ background: 'var(--color-verde-oscuro)', color: 'var(--color-primario)', '&:hover': { background: 'var(--color-secundario)' } }}>
                Descubrir ONG
              </Button>
            </Link>
            <Link href="/register-profile-user">
              <Button className="shadow-inset-center" variant="contained" sx={{ background: 'var(--color-texto)', color: 'var(--color-primario)', '&:hover': { background: 'var(--color-secundario)' } }}>
                Quiero ayudar
              </Button>
            </Link>
          </Box>
        </Box>
        <Box>
          <Box
            sx={{
              width: '100%',
              height: { xs: 110, md: 160 },
              borderRadius: 3,
              background: "url(''/imagepage (1).avif'') center/cover",
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}
