"use client";

import { Box, Typography, TextField, Button, CircularProgress, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

type Props = {
  query: string;
  setQuery: (v: string) => void;
  loading: boolean;
  onSearch: (e: React.FormEvent) => void;
};

export default function SearchAI({ query, setQuery, loading, onSearch }: Props) {
  return (
    <Box component="section" sx={{ textAlign: 'center', py: { xs: 4, md: 5 } }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 600, textShadow: '0 1px 2px rgba(0,0,0,0.2)' }}>Buscador con IA</Typography>
      <Box component="form" onSubmit={onSearch} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2 }}>
        <TextField
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar voluntariados u ONGs..."
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: 'var(--text-color)' }} />
              </InputAdornment>
            ),
          }}
          sx={{
            width: { xs: '90%', md: '60%' },
            backgroundColor: '#fff',
            borderRadius: '9999px',
            '& .MuiOutlinedInput-root': { borderRadius: '9999px' },
          }}
        />
        <Button type="submit" className="shadow-inset-center" sx={{ backgroundColor: 'var(--color-secundario)', color: 'var(--color-primario)', height: 56, px: 3, '&:hover': { backgroundColor: 'var(--color-verde-oscuro)' } }}>
          {loading ? <CircularProgress size={20} sx={{ color: 'var(--color-primario)' }} /> : 'Buscar'}
        </Button>
      </Box>
    </Box>
  );
}
