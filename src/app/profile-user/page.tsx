"use client";

import ComponentExample from "./components/ComponentExample";

//export default function PerfilUserPage() {
//  return (
//    <div>
//      <ComponentExample/>
//    </div>
//  );
//}

import { Container, Typography, Box, Grid } from '@mui/material';
import UserProfileCard from './components/UserProfileCard';
import { mockUserProfile, mockDonorProfile, mockVolunteerProfile } from './mocks/profile';
import StickyHeadTable from "./components/TableLastDonations";

export default function ProfilePage() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <UserProfileCard profile={mockUserProfile} />


        <Typography variant="h6" component="div" fontWeight="bold"
          sx={{ 
            color: 'text.secondary', 
            mt: 0.5, 
            fontSize: { xs: '1rem', sm: '2rem', md: '3rem', lm:'3rem' },    
          }}
        >
           Ultimas actividades
        </Typography>


        <Typography 
          variant="h6" 
          component="h1" 
          gutterBottom 
          align="left"
          sx={{ mb: 1 }}
        >
          
        </Typography>

        <Typography variant="h6" component="div" fontWeight="bold"
          sx={{ 
            color: 'text.secondary', 
            mt: 0.5, 
            fontSize: { xs: '1rem', sm: '2rem', md: '3rem', lm:'3rem' },    
          }}
        >
          Ultimas donaciones
        </Typography>


        <StickyHeadTable/>
      </Box>
    </Container>
  );
}