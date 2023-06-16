import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { HiOutlineMail, HiOutlinePhone, HiOutlineLocationMarker } from 'react-icons/hi';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import { useTheme } from '@emotion/react';
import { tokens } from '../../theme';

const Footer = () => {
  const theme = useTheme();
    const colors = tokens(theme.palette.mode);
  return (
    <Box sx={{ backgroundColor: `${colors.primary[400]}`, py: 4, mt: 4 }}>
      <Box sx={{ maxWidth: 600, mx: 'auto', px: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <HiOutlineLocationMarker style={{ marginRight: '8px' }} />
          <Typography variant="body2">
            123 Main Street, City, Country
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <HiOutlinePhone style={{ marginRight: '8px' }} />
          <Typography variant="body2">
            +1234567890
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <HiOutlineMail style={{ marginRight: '8px' }} />
          <Typography variant="body2">
            info@smartagriculture.com
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <IconButton sx={{ mr: 2 }} color="primary">
            <FaFacebook style={{ color: 'white' }} />
          </IconButton>
          <IconButton sx={{ mr: 2 }} color="primary">
            <FaTwitter style={{ color: 'white' }} />
          </IconButton>
          <IconButton color="primary">
            <FaInstagram style={{ color: 'white' }} />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
