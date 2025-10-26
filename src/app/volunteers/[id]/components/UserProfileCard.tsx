import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

interface UserProfileCardProps {
  profile: {
    description: string;
    photoUrl: string | null;
    phone: string;
    address: string;
    createdAt: string;
    userId: string;
    user: {
      name: string;
      email: string;
    };
  };
}

export default function UserProfileCard({ profile }: UserProfileCardProps) {
  console.log("UserProfileCard recibió profile:", profile); // Debug
  
  const { photoUrl, description, phone, address, createdAt, user } = profile;
  
  const userName = user?.name || "Voluntario";
  const userEmail = user?.email || "";

  console.log("createdAt value:", createdAt);

  const joinDate = createdAt && createdAt !== "Invalid Date" 
    ? new Date(createdAt).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : "Fecha no disponible";

  return (
    <Card sx={{ 
      margin: 'auto', 
      maxWidth: 'auto', 
      boxShadow: 3,
      backgroundColor: 'var(#ffff)',
      border: `1px solid var(--color-3)`
    }}>
      <CardHeader
        avatar={
          <Avatar 
            sx={{ 
              bgcolor: 'var(--color-3)',
              width: 120,
              height: 120,
              borderRadius: 2,
              fontSize: '2.5rem',
              fontWeight: 'bold',
              color: 'var(--color-1)'
            }} 
            src={photoUrl || undefined}
            alt={`Foto de ${userName}`}
          >
            {!photoUrl && userName.charAt(0).toUpperCase()}
          </Avatar>
        }
        title={
          <Typography variant="h5" fontWeight="bold" sx={{ color: 'var(--color-1)' }}>
            {userName}
          </Typography>
        }
        subheader={
          description ? (
            <Typography variant="body1" sx={{ 
              color: 'var(--color-1)', 
              mt: 1, 
              fontStyle: 'italic',
              opacity: 0.8
            }}>
              "{description}"
            </Typography>
          ) : null
        }
        sx={{ 
          padding: 3,
          alignItems: 'flex-start'
        }}
      />

      <CardContent sx={{ padding: 3, paddingTop: 0 }}>
        <Grid container spacing={3}>
          {/* Teléfono */}
          {phone && (
            <Grid item xs={12} sm={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, height: '100%' }}>
                <PhoneIcon sx={{ 
                  color: 'var(--color-2)', 
                  fontSize: 28 
                }} />
                <Box>
                  <Typography variant="body1" fontWeight="medium" sx={{ color: 'var(--color-1)' }}>
                    Teléfono
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'var(--color-1)', opacity: 0.8 }}>
                    {phone}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          )}

          {/* Email */}
          {userEmail && (
            <Grid item xs={12} sm={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, height: '100%' }}>
                <EmailIcon sx={{ 
                  color: 'var(--color-2)', 
                  fontSize: 28 
                }} />
                <Box>
                  <Typography variant="body1" fontWeight="medium" sx={{ color: 'var(--color-1)' }}>
                    Email
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'var(--color-1)', opacity: 0.8 }}>
                    {userEmail}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          )}

          {/* Dirección */}
          {address && (
            <Grid item xs={12} sm={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, height: '100%' }}>
                <LocationOnIcon sx={{ 
                  color: 'var(--color-2)', 
                  fontSize: 28 
                }} />
                <Box>
                  <Typography variant="body1" fontWeight="medium" sx={{ color: 'var(--color-1)' }}>
                    Ubicación
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'var(--color-1)', opacity: 0.8 }}>
                    {address}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          )}

          {/* Fecha de registro */}
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, height: '100%' }}>
              <CalendarTodayIcon sx={{ 
                color: 'var(--color-2)', 
                fontSize: 28 
              }} />
              <Box>
                <Typography variant="body1" fontWeight="medium" sx={{ color: 'var(--color-1)' }}>
                  Se unió
                </Typography>
                <Typography variant="body2" sx={{ color: 'var(--color-1)', opacity: 0.8 }}>
                  {joinDate}
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}