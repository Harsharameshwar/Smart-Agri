import React, { useState } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import { HiOutlineUser, HiOutlineMail, HiOutlineChatAlt } from 'react-icons/hi';
import { ReactComponent as Icon1 } from '../../assets/contact_us.svg';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

const ContactUsPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add logic to handle form submission here
    console.log(formData);
    // Reset form data
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <>
      <Header />
      <Box sx={{ mt: 8, ml: 3, display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'center' }}>
        <Box sx={{ flex: 1, mr: { xs: 3, sm: 5 } }}>
          <Typography variant="h4" sx={{ mb: 4 }}>
            Contact Us
          </Typography>
          <Box sx={{ maxWidth: 400 }}>
            <Typography variant="body1" sx={{ mb: 4 }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sit amet justo lacinia, tempus lectus
              vitae. Integer a felis et dui aliquet gravida vel non ante. Nullam et placerat elit. Aliquam nec
              fermentum sapien.
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                margin="normal"
                InputProps={{
                  startAdornment: <HiOutlineUser />,
                }}
              />
              <TextField
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                margin="normal"
                InputProps={{
                  startAdornment: <HiOutlineMail />,
                }}
              />
              <TextField
                label="Message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                margin="normal"
                multiline
                rows={4}
                InputProps={{
                  startAdornment: <HiOutlineChatAlt />,
                }}
              />
              <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                Send Message
              </Button>
            </form>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: { xs: 4, sm: 0},mr: { xs: 4, sm: 2}, width: '100%', maxWidth: { xs: '100%', sm: '70%' } }}>
          <Icon1 width={600} height={600} sx={{ maxWidth: '100%', height: 'auto' }}  />
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default ContactUsPage;
