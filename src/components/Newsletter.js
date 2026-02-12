import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Stack,
  Alert,
  useTheme,
} from '@mui/material';
import { EmailOutlined, Send } from '@mui/icons-material';
import emailjs from '@emailjs/browser';
import toast from 'react-hot-toast';

const Newsletter = () => {
  const theme = useTheme();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email) {
      const toastId = toast.loading('Subscribing...');
      try {
        const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID';
        const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID';
        const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY';

        if (serviceId === 'YOUR_SERVICE_ID') {
          // Fallback
          console.warn('EmailJS not configured.');
          await new Promise(resolve => setTimeout(resolve, 1000));
          toast.success('Subscribed! (Mock)', { id: toastId });
        } else {
          await emailjs.send(
            serviceId,
            templateId,
            {
              from_email: email,
              message: 'Newsletter Subscription Request',
            },
            publicKey
          );
          toast.success('Successfully subscribed!', { id: toastId });
        }

        setSubscribed(true);
        setEmail('');
        setTimeout(() => setSubscribed(false), 5000);
      } catch (error) {
        console.error('Newsletter Error:', error);
        toast.error('Subscription failed. Please try again.', { id: toastId });
      }
    }
  };

  return (
    <Box
      sx={{
        py: 8,
        background: theme.palette.mode === 'dark'
          ? 'linear-gradient(135deg, #312e81 0%, #1e293b 100%)'
          : 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
      }}
    >
      <Container maxWidth="md">
        <Stack spacing={3} alignItems="center" textAlign="center">
          {/* Icon */}
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backdropFilter: 'blur(10px)',
            }}
          >
            <EmailOutlined sx={{ fontSize: 40, color: 'white' }} />
          </Box>

          {/* Heading */}
          <Typography
            variant="h3"
            sx={{
              color: 'white',
              fontWeight: 700,
              fontSize: { xs: '2rem', md: '2.5rem' },
            }}
          >
            Stay Updated
          </Typography>

          <Typography
            variant="h6"
            sx={{
              color: 'rgba(255, 255, 255, 0.9)',
              maxWidth: 600,
            }}
          >
            Subscribe to our newsletter for the latest updates on connectivity solutions, industry insights, and technology trends.
          </Typography>

          {/* Success Message */}
          {subscribed && (
            <Alert
              severity="success"
              sx={{
                width: '100%',
                maxWidth: 500,
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
              }}
            >
              Thank you for subscribing! Check your email for confirmation.
            </Alert>
          )}

          {/* Subscription Form */}
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              width: '100%',
              maxWidth: 500,
            }}
          >
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(10px)',
                borderRadius: 2,
                p: 1,
              }}
            >
              <TextField
                fullWidth
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                required
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: 'white',
                    borderRadius: 1.5,
                    '& fieldset': {
                      border: 'none',
                    },
                  },
                  '& input': {
                    py: 1.5,
                  },
                }}
                data-testid="newsletter-email-input"
              />
              <Button
                type="submit"
                variant="contained"
                endIcon={<Send />}
                sx={{
                  px: 4,
                  py: 1.5,
                  backgroundColor: 'white',
                  color: '#6366f1',
                  fontWeight: 700,
                  textTransform: 'none',
                  fontSize: '1rem',
                  borderRadius: 1.5,
                  whiteSpace: 'nowrap',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  },
                }}
                data-testid="newsletter-subscribe-button"
              >
                Subscribe
              </Button>
            </Stack>
          </Box>

          {/* Privacy Note */}
          <Typography
            variant="caption"
            sx={{
              color: 'rgba(255, 255, 255, 0.7)',
              mt: 2,
            }}
          >
            We respect your privacy. Unsubscribe at any time.
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
};

export default Newsletter;
