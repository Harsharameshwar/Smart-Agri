import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { ReactComponent as FarmIcon } from '../../assets/drome.svg';
import { ReactComponent as AgricultureIcon } from '../../assets/plant auto.svg';
import { ReactComponent as PlantIcon } from '../../assets/increaseyield.svg';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate=useNavigate();
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
              Discover sustainable farming practices that promote environmental conservation and ensure long-term viability. 
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
              Explore cutting-edge agricultural technology solutions that optimize productivity, efficiency, and resource utilization. 
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
              Learn strategies and techniques to boost crop yields and optimize agricultural production for enhanced profitability.
            </Typography>
          </Box>
        </Box>
        <Button onClick={()=>navigate('/login')} variant="contained" color="primary" size="large">
          Get Started
        </Button>
      </Box>
      <Footer />
    </>
  );
};

export default LandingPage;
