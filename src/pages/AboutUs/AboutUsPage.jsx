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
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sit amet justo lacinia, tempus lectus
            vitae. Integer a felis et dui aliquet gravida vel non ante. Nullam et placerat elit. Aliquam nec
            fermentum sapien.
          </Typography>
          <Typography variant="body1" sx={{ mb: 4 }}>
            Sed tincidunt nunc et mauris ullamcorper, at tempus mauris lobortis. Duis nec semper mauris, sit amet
            facilisis ex. Vivamus a nulla eget tortor lobortis suscipit. Vestibulum at efficitur leo. Cras luctus
            convallis justo. Nulla at orci sed nulla semper fringilla a et lectus. Ut viverra augue eget nunc
            ultrices vulputate. Suspendisse vitae justo vestibulum, mollis tellus ac, tincidunt erat.
          </Typography>
          <Typography variant="body1">
            Etiam ut risus scelerisque, scelerisque eros non, dignissim lectus. Duis dictum massa nec neque
            convallis, in dignissim ligula facilisis. Nam consectetur sagittis felis, id varius lectus venenatis a.
            Aenean ullamcorper leo id est feugiat, sit amet eleifend est hendrerit.
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
