"use client";

import { Box, Typography, Card, CardContent, CardActions, Button } from "@mui/material";
import Link from "next/link";

type Ong = { id: number|string; nombre: string; descripcion: string; imagen: string };

type Props = { ongs: Ong[] };

export default function OngsGrid({ ongs }: Props) {
  return (
    <Box sx={{ py: 8, px: { xs: 3, md: 8 }, textAlign: 'center' }}>
      <Typography variant="h5" sx={{ mb: 5, fontWeight: 700, textShadow: '0 1px 2px rgba(0,0,0,0.2)' }}>ONGs destacadas</Typography>
      <Box sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
        gap: 24,
        justifyItems: 'center'
      }}>
        {ongs.map((ong) => (
          <Card key={ong.id} sx={{ width: '100%', borderRadius: 3, overflow: 'hidden', boxShadow: '0 4px 10px rgba(0,0,0,0.1)', '&:hover': { transform: 'translateY(-5px)', transition: '0.3s' }, height: '25rem', maxWidth: 420 }}>
            <Box component="img" src={ong.imagen} alt={ong.nombre} sx={{ width: '100%', height: 200, objectFit: 'cover' }} />
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>{ong.nombre}</Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>{ong.descripcion.length > 99
                                ? `${ong.descripcion.substring(0, 100)}...`
                                : ong.descripcion}</Typography>
            </CardContent>
            <CardActions sx={{ px: 2, pb: 2, gap: 1 }}>
<<<<<<< HEAD
              <Link href="/ongs"><Button className="shadow-inset-center" size="small" variant="contained" sx={{ background: 'var(--color-secundario)', color: 'var(--color-primario)', '&:hover': { background: 'var(--color-verde-oscuro)' } }}>Ver más</Button></Link>
              <Link href="/volunteers"><Button className="shadow-inset-center" size="small" variant="outlined" sx={{ borderColor: 'var(--color-text)', color: 'var(--color-text)', '&:hover': { borderColor: 'var(--color-secundario)', color: 'var(--color-secundario)' } }}>Donar</Button></Link>
=======
              <Link href="/ongs"><Button className="shadow-inset-center" size="small" variant="contained" sx={{ backgroundColor: 'var(--color-secundario)', color: 'var(--color-primario)', '&:hover': { backgroundColor: 'var(--color-verde-oscuro)' } }}>Ver más</Button></Link>
              <Link href="/volunteers"><Button className="shadow-inset-center" size="small" variant="outlined" sx={{ borderColor: 'var(--color-secundario)', color: 'var(--color-secundario)', borderWidth: 2, '&:hover': { borderColor: 'var(--color-verde-oscuro)', color: 'var(--color-verde-oscuro)' } }}>Donar</Button></Link>
>>>>>>> feature/homepage
            </CardActions>
          </Card>
        ))}
      </Box>
    </Box>
  );
}
