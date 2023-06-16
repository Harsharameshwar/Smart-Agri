import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { ReactComponent as FarmIcon } from '../../assets/drome.svg';
import { ReactComponent as AgricultureIcon } from '../../assets/plant auto.svg';
import { ReactComponent as PlantIcon } from '../../assets/increaseyield.svg';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';

const LandingPage = () => {
  return (
    <>
      <Header />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mt: 8,
          padding: '0 2rem',
        }}
      >
        <Typography variant="h2" sx={{ mb: 4, textAlign: 'center' }}>
          Welcome to SMART AGRI
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
            gap: '2rem',
            mb: 4,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              maxWidth: '200px',
              margin: '0 auto',
            }}
          >
            <FarmIcon width={100} height={100} />
            <Typography variant="h5" sx={{ mt: 2, textAlign: 'center' }}>
              Sustainable Farming
            </Typography>
            <Typography variant="body1" sx={{ textAlign: 'center', mt: 2 }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sit
              amet justo lacinia, tempus lectus vitae.
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              maxWidth: '200px',
              margin: '0 auto',
            }}
          >
            <AgricultureIcon width={100} height={100} />
            <Typography variant="h5" sx={{ mt: 2, textAlign: 'center' }}>
              Advanced Technology
            </Typography>
            <Typography variant="body1" sx={{ textAlign: 'center', mt: 2 }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sit
              amet justo lacinia, tempus lectus vitae.
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              maxWidth: '200px',
              margin: '0 auto',
            }}
          >
            <PlantIcon width={100} height={100} />
            <Typography variant="h5" sx={{ mt: 2, textAlign: 'center' }}>
              Increased Yield
            </Typography>
            <Typography variant="body1" sx={{ textAlign: 'center', mt: 2 }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sit
              amet justo lacinia, tempus lectus vitae.
            </Typography>
          </Box>
        </Box>
        <Button variant="contained" color="primary" size="large">
          Get Started
        </Button>
      </Box>
      <Footer />
    </>
  );
};

export default LandingPage;
