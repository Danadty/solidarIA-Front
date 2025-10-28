'use client'

import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import { DonationsAPI } from '../../../../lib';

enum TITLE_LAST_DONATIONS {
  FOUNDATION = "Fundación",
  DATE = "Fecha",
  AMOUNT = "Cantidad",
  STATUS = "Estado",
  PAYMENT_METHOD = "Método de Pago"
}

interface Column {
  id: 'foundation' | 'date' | 'amount' | 'status' | 'paymentMethod';
  label: string;
  minWidth?: number;
  align?: 'right' | 'left' | 'center';
  format?: (value: any) => string;
}

const columns: readonly Column[] = [
  { id: 'foundation', label: TITLE_LAST_DONATIONS.FOUNDATION, minWidth: 170 },
  { id: 'date', label: TITLE_LAST_DONATIONS.DATE, minWidth: 120 },
  {
    id: 'amount',
    label: TITLE_LAST_DONATIONS.AMOUNT,
    minWidth: 100,
    align: 'right',
    format: (value: string) => `$${parseFloat(value).toLocaleString('es-ES')}`,
  },
  { 
    id: 'status', 
    label: TITLE_LAST_DONATIONS.STATUS, 
    minWidth: 120,
    align: 'center',
    format: (value: string) => {
      const statusMap: { [key: string]: string } = {
        'PENDING': 'Pendiente',
        'COMPLETED': 'Completado',
        'FAILED': 'Fallido',
        'CANCELLED': 'Cancelado'
      };
      return statusMap[value] || value;
    }
  },
  { 
    id: 'paymentMethod', 
    label: TITLE_LAST_DONATIONS.PAYMENT_METHOD, 
    minWidth: 130,
    align: 'center',
    format: (value: string) => {
      const methodMap: { [key: string]: string } = {
        'MERCADO_PAGO': 'Mercado Pago',
        'CREDIT_CARD': 'Tarjeta Crédito',
        'DEBIT_CARD': 'Tarjeta Débito',
        'BANK_TRANSFER': 'Transferencia'
      };
      return methodMap[value] || value;
    }
  }
];

interface Donation {
  id: string;
  amount: string;
  isAnonymous: boolean;
  donorName: string;
  donorEmail: string;
  status: string;
  paymentMethod: string;
  transactionCode: string;
  createdAt: string;
  foundation: {
    id: string;
    name: string;
    description: string;
  };
}

interface DonationsTableProps {
  userId: string;
}

export default function DonationsTable({ userId }: DonationsTableProps) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [donations, setDonations] = React.useState<Donation[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (userId) {
      loadUserDonations();
    }
  }, [userId]);

  const loadUserDonations = async () => {
    try {
      setLoading(true);
      console.log("Cargando donaciones para userId:", userId);
      
      const response = await DonationsAPI.getByUser(userId);
      console.log("Respuesta de donaciones:", response);
      
      // Los datos vienen en response.data.data.donations
      const donationsData = response.data?.data?.donations || [];
      console.log("Donaciones encontradas:", donationsData);
      
      setDonations(donationsData);
      
    } catch (error) {
      console.error("Error loading donations:", error);
      setError("Error al cargar las donaciones");
    } finally {
      setLoading(false);
    }
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <Paper sx={{ width: '100%', p: 3, textAlign: 'center' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
          <CircularProgress sx={{ color: 'var(--color-2)' }} />
          <Typography sx={{ color: 'var(--color-1)' }}>
            Cargando donaciones...
          </Typography>
        </Box>
      </Paper>
    );
  }

  if (error) {
    return (
      <Paper sx={{ width: '100%', py: 3, textAlign: 'center' }}>
        <Typography sx={{ color: 'var(--color-1)' }}>
          {error}
        </Typography>
      </Paper>
    );
  }

  if (donations.length === 0) {
    return (
      <Paper sx={{ width: '100%',
        maxWidth: '800px',
         py: 3, 
         textAlign: 'center' }}>
        <Typography sx={{ color: 'var(--color-1)', opacity: 0.8 }}>
          No se encontraron donaciones
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper sx={{ 
      width: '100%', 
      overflow: 'hidden',
      backgroundColor: 'var(#fff)',
      border: `1px solid var(--color-3)`
    }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="tabla de donaciones">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ 
                    minWidth: column.minWidth,
                    backgroundColor: 'var(--color-3)',
                    color: 'var(--color-1)',
                    fontWeight: 'bold'
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {donations
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((donation) => {
                return (
                  <TableRow 
                    hover 
                    role="checkbox" 
                    tabIndex={-1} 
                    key={donation.id}
                    sx={{ 
                      '&:last-child td, &:last-child th': { border: 0 },
                      '&:hover': {
                        backgroundColor: 'var(--color-3)',
                        opacity: 0.9
                      }
                    }}
                  >
                    {columns.map((column) => {
                      let value: any;
                      
                      switch (column.id) {
                        case 'foundation':
                          value = donation.foundation?.name || 'N/A';
                          break;
                        case 'date':
                          value = formatDate(donation.createdAt);
                          break;
                        case 'amount':
                          value = donation.amount;
                          break;
                        case 'status':
                          value = donation.status;
                          break;
                        case 'paymentMethod':
                          value = donation.paymentMethod;
                          break;
                        default:
                          value = '';
                      }

                      return (
                        <TableCell 
                          key={column.id} 
                          align={column.align}
                          sx={{ color: 'var(--color-1)' }}
                        >
                          {column.format ? column.format(value) : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={donations.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{
          color: 'var(--color-1)',
          '& .MuiTablePagination-selectIcon': {
            color: 'var(--color-1)'
          }
        }}
      />
    </Paper>
  );
}