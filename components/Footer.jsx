import React from 'react';
import { Box, Typography, Link } from '@mui/material';

const Footer = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: '#0080FF',
        color: 'white',
        padding: '16px',
        position: 'relative',
        bottom: 0,
        width: '100%',
        boxShadow: '0 -1px 5px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Typography variant="body2">
        © {new Date().getFullYear()} My Website. All Rights Reserved.
      </Typography>
      <Box sx={{ mx: 2 }}>
        <Link href="#" color="inherit" sx={{ mx: 1 }}>
          Privacy Policy
        </Link>
        |
        <Link href="#" color="inherit" sx={{ mx: 1 }}>
          Terms of Service
        </Link>
      </Box>
    </Box>
  );
};

export default Footer;