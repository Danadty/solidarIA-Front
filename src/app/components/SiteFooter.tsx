"use client";

import { Box, Typography } from "@mui/material";
import Link from "next/link";

export default function SiteFooter() {
  return (
    <Box sx={{ backgroundColor: 'var(--color-primario)', borderTop: '1px solid rgba(0,0,0,0.08)', mt: 0, color: 'var(--color-verde-oscuro)' }}>
      <Box sx={{ px: { xs: 3, md: 8 }, py: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexBasis: { xs: '100%', md: '30%' } }}>
            <Box component="img" src="/logo-solidaria.png" alt="SolidarIA" sx={{ width: 28, height: 28, objectFit: 'contain' }} />
            <Typography variant="h6" sx={{ fontWeight: 700 }}>SolidarIA</Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 3, justifyContent: { xs: 'flex-start', md: 'flex-end' }, flexWrap: 'wrap', mt: { xs: 2, md: 0 }, flexBasis: { xs: '100%', md: '65%' } }}>
            <Link href="/" style={{ textDecoration: 'none' }}><Typography sx={{ cursor: 'pointer', fontWeight: 600, textDecoration: 'none', color: 'var(--color-verde-oscuro)' }}>Inicio</Typography></Link>
            <Link href="/ongs" style={{ textDecoration: 'none' }}><Typography sx={{ cursor: 'pointer', fontWeight: 600, textDecoration: 'none', color: 'var(--color-verde-oscuro)' }}>ONG</Typography></Link>
            <Link href="/volunteers" style={{ textDecoration: 'none' }}><Typography sx={{ cursor: 'pointer', fontWeight: 600, textDecoration: 'none', color: 'var(--color-verde-oscuro)' }}>Voluntariado</Typography></Link>
            <Link href="/contact" style={{ textDecoration: 'none' }}><Typography sx={{ cursor: 'pointer', fontWeight: 600, textDecoration: 'none', color: 'var(--color-verde-oscuro)' }}>Contacto</Typography></Link>
          </Box>
        </Box>
        <Box sx={{ mt: 1, textAlign: 'center', color: 'var(--color-verde-oscuro)', fontWeight: 600 }}>
          <Typography variant="body2"> 2025 SolidarIA. Todos los derechos reservados.</Typography>
        </Box>
      </Box>
    </Box>
  );
}


