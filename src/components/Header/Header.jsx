import { useTheme } from '@emotion/react';
import { AppBar, Button, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { tokens } from '../../theme';
import { Link } from 'react-router-dom';

export default function Header() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
  return (
    <AppBar style={{backgroundColor:`${colors.primary[400]}`}} position="static" >
    <Toolbar>
      <Typography variant="h6" component={Link} to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
        SMART AGRI
      </Typography>
      <Button color="inherit" component={Link} to="/" style={{ marginLeft: 'auto' }}>
        Home
      </Button>
      <Button color="inherit" component={Link} to="/about-us" >
        About Us
      </Button>
      <Button color="inherit" id="contact-us" component={Link} to="/contact-us">
        Contact Us
      </Button>
      <Button color="inherit" id="login-url" component={Link} to="/login">
        Login
      </Button>
    </Toolbar>
  </AppBar>
  )
}
