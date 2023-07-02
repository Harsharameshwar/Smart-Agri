import React from 'react';
import { Box, Typography } from '@mui/material';
import { ReactComponent as AboutIcon } from '../../assets/about_us.svg';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

const AboutUsPage = () => {
  return (
    <>
      <Header />
      <Box sx={{ mt: 8, mx: 5, display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'center' }}>
        <Box sx={{ flex: 1, mb: { xs: 4, sm: 0 }, mr: { xs: 0, sm: 5 } }}>
          <Typography variant="h4" sx={{ mb: 4 }}>
            About Us
          </Typography>
          <Typography variant="body1" sx={{ mb: 4 }}>
            Welcome to our company! We are dedicated to providing exceptional products and services to our valued customers. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sit amet justo lacinia, tempus lectus vitae. Integer a felis et dui aliquet gravida vel non ante. Nullam et placerat elit. Aliquam nec fermentum sapien.
          </Typography>
          <Typography variant="body1" sx={{ mb: 4 }}>
            Our mission is to deliver high-quality solutions that meet the needs of our customers. We strive to continuously improve and innovate, ensuring that our products and services remain at the forefront of the industry. We are committed to providing excellent customer support and building long-lasting relationships with our clients.
          </Typography>
          <Typography variant="body1">
            At our company, we value integrity, professionalism, and customer satisfaction. We work tirelessly to exceed expectations and make a positive impact in the market. Our dedicated team of experts is passionate about what they do and is driven to deliver outstanding results. We believe in teamwork, collaboration, and a customer-centric approach.
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: { xs: 4, sm: 0 }, width: '100%', maxWidth: { xs: '100%', sm: '50%' } }}>
          <AboutIcon width={600} height={600} sx={{ maxWidth: '100%', height: 'auto' }} />
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default AboutUsPage;
