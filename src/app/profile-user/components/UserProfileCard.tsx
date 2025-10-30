import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { UserProfile } from '../mocks/profile';
import { mapUserProfile } from '../services/mapUserProfile';

import StarIcon from '@mui/icons-material/Star';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
  variants: [
    {
      props: ({ expand }) => !expand,
      style: {
        transform: 'rotate(0deg)',
      },
    },
    {
      props: ({ expand }) => !!expand,
      style: {
        transform: 'rotate(180deg)',
      },
    },
  ],
}));

interface UserProfileProps {
  profile: UserProfile;
}

export default function UserProfileCard({ profile }: UserProfileProps) {
  const [expanded, setExpanded] = React.useState(false);

  const { img_url, descripcion, user_name, donations,projects,volunters,text_donations,text_proyects,text_volunters } = mapUserProfile(profile);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card   sx={{
      margin: 'auto',
    }}>
      <CardHeader
        //-----------------------------img--------------------------------------
        avatar={
          <Avatar 
            sx={{ 
              bgcolor: '#fff',
              width: { xs: 100, sm: 120, md: 140, lg: 150, xl: 160 },
              height: { xs: 100, sm: 120, md: 140, lg: 150, xl: 160 },
              borderRadius: 1,
            }} 
            aria-label="profile"
            src={img_url} //-------------------------------------- img_url
          >
            {user_name}  //-------------------------------------- user_name
          </Avatar>
        }
        //--------------------------title-----------------------------------------
        title={
          <Typography variant="h6" component="div" fontWeight="bold"
          sx={{ 
            color: 'text.secondary', 
            mt: 0.5, 
            //fontSize: { xs: '1rem', sm: '2rem', md: '3rem', lm:'3rem' },
        
          }}
          >
            {user_name}
          </Typography>
        }
        //--------------------------descripcion-----------------------------------
        subheader={
          <Typography 
            //variant="body2" 
            sx={{ 
              color: 'text.secondary', 
              mt: 0.5, 
              //fontSize: { xs: '0.75rem', sm: '1rem', md: '1.5rem', lm:'1.5rem' },
          
            }}
          >
            {descripcion}
            <br />
          </Typography>
        }
      />

      <CardContent>

        <Box sx={{ textAlign: 'left' }}>


          <Grid container  sx={{ mb: 1 }} >

            <Grid container spacing={0.1} size={4}>
                <FavoriteIcon
                  sx={{
                      fontSize: { xs: '1rem', sm: '1.25rem', md: '1.8rem' },
                      p:0,
                      mt: '0.2rem',
                    }}  
                />
              {/* @ts-ignore */}
              <Grid item xs={6}>
                <Typography 
                  variant="body1" 
                  sx={{
                    fontSize: { xs: '0.75rem', sm: '1.25rem', md: '1.5rem' },
                    fontWeight: 600,
                  }}
                >
                  {donations}
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{
               
                    //fontSize: { xs: '0.5rem', sm: '0.75rem', md: '1.25rem' },
                    fontWeight: 500,
                  }}
                >
                  {text_donations}
                  <br />
                </Typography>
              </Grid>
            </Grid>
            


            <Grid container spacing={1} size={4}>
                <StarIcon
                  sx={{
                      fontSize: { xs: '1rem', sm: '1.25rem', md: '1.8rem' },
                      p:0,
                      mt: '0.2rem',
                    }}  
                />
                {/* @ts-ignore */}  
                <Grid item xs={6}>
                  <Typography 
                    variant="body1" 
                    sx={{
                      
                      fontSize: { xs: '0.75rem', sm: '1.25rem', md: '1.5rem' },
                      fontWeight: 600,
                    }}
                  >
                    {projects}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    sx={{
                      
                      //fontSize: { xs: '0.5rem', sm: '0.75rem', md: '1.25rem' },
                      fontWeight: 500,
                    }}
                  >
                    {text_proyects}
                    <br />
                  </Typography>
                </Grid>
            </Grid>
            



            <Grid container spacing={1} size={4}>
                <CheckCircleIcon
                  sx={{
                      fontSize: { xs: '1rem', sm: '1.25rem', md: '1.8rem' },
                      p:0,
                      mt: '0.2rem',
                    }}  
                />
                {/* @ts-ignore */}  
                <Grid item xs={6}>
                  <Typography 
                    variant="body1" 
                    sx={{
                      fontSize: { xs: '0.75rem', sm: '1.25rem', md: '1.5rem' },
                      fontWeight: 600,
                    }}
                  >
                    {volunters}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    sx={{
                      //fontSize: { xs: '0.5rem', sm: '0.75rem', md: '1.25rem' },
                      fontWeight: 500,
                    }}
                  >
                    {text_volunters}
                    <br />
                  </Typography>
                </Grid>
            </Grid>
            
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
}