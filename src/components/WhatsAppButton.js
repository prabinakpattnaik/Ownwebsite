import React, { useState, useEffect } from 'react';
import { Fab, Tooltip, Zoom } from '@mui/material';
import { WhatsApp } from '@mui/icons-material';

const WhatsAppButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show button after user scrolls down a bit
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const handleWhatsAppClick = () => {
    // Replace with your actual WhatsApp number
    const phoneNumber = '1234567890'; // Format: country code + number (no + or spaces)
    const message = encodeURIComponent('Hi! I\'d like to know more about Netrivium Technologies services.');
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <Zoom in={isVisible}>
      <Tooltip title="Chat with us on WhatsApp" placement="left" arrow>
        <Fab
          onClick={handleWhatsAppClick}
          sx={{
            position: 'fixed',
            bottom: { xs: 20, md: 30 },
            right: { xs: 20, md: 30 },
            backgroundColor: '#25D366',
            color: 'white',
            width: 60,
            height: 60,
            zIndex: 1000,
            boxShadow: '0 4px 20px rgba(37, 211, 102, 0.4)',
            '&:hover': {
              backgroundColor: '#128C7E',
              transform: 'scale(1.1)',
              boxShadow: '0 6px 30px rgba(37, 211, 102, 0.6)',
            },
            transition: 'all 0.3s ease',
          }}
          data-testid="whatsapp-button"
        >
          <WhatsApp sx={{ fontSize: 32 }} />
        </Fab>
      </Tooltip>
    </Zoom>
  );
};

export default WhatsAppButton;
