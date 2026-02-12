import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  Stack,
  Alert,
  useTheme,
} from '@mui/material';
import {
  Email,
  Phone,
  LocationOn,
  Send,
  AccessTime,
} from '@mui/icons-material';
import emailjs from '@emailjs/browser';
import toast from 'react-hot-toast';

const ContactForm = () => {
  const theme = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Loading toast
    const toastId = toast.loading('Sending message...');

    try {
      // Replace these with your actual Service ID, Template ID, and Public Key
      const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID';
      const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID';
      const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY';

      if (serviceId === 'YOUR_SERVICE_ID') {
        // Fallback if not configured, just to show it works UI-wise
        console.warn('EmailJS not configured. Using mock success.');
        await new Promise(resolve => setTimeout(resolve, 1500));
        toast.success('Message sent! (Mock mode - Config required)', { id: toastId });
        setSubmitted(true);
      } else {
        await emailjs.send(
          serviceId,
          templateId,
          {
            from_name: formData.name,
            from_email: formData.email,
            company: formData.company,
            phone: formData.phone,
            message: formData.message,
          },
          publicKey
        );
        toast.success('Message sent successfully!', { id: toastId });
        setSubmitted(true);
      }

      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        message: '',
      });

      // Hide success message after 5 seconds
      setTimeout(() => {
        setSubmitted(false);
      }, 5000);

    } catch (error) {
      console.error('EmailJS Error:', error);
      toast.error('Failed to send message. Please try again.', { id: toastId });
    }
  };

  const contactInfo = [
    {
      icon: <Email />,
      title: 'Email Us',
      content: 'info@netrivium.com',
      link: 'mailto:info@netrivium.com',
    },
    {
      icon: <Phone />,
      title: 'Call Us',
      content: '+91-40-49983275',
      link: 'tel:+914049983275',
    },
    {
      icon: <LocationOn />,
      title: 'Visit Us',
      content: 'Hitech City, Hyderabad',
      link: null,
    },
    {
      icon: <AccessTime />,
      title: 'Business Hours',
      content: 'Mon-Fri: 9AM-6PM IST',
      link: null,
    },
  ];

  return (
    <Box
      sx={{
        py: 10,
        background: theme.palette.mode === 'dark'
          ? 'linear-gradient(180deg, #1e293b 0%, #0f172a 100%)'
          : 'linear-gradient(180deg, #e0e7ff 0%, #f8fafc 100%)',
      }}
    >
      <Container maxWidth="lg">
        {/* Header */}
        <Box textAlign="center" mb={8}>
          <Typography
            variant="overline"
            sx={{
              color: theme.palette.primary.main,
              fontWeight: 700,
              fontSize: '0.9rem',
              letterSpacing: 2,
            }}
          >
            GET IN TOUCH
          </Typography>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              mt: 1,
              mb: 2,
              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Let's Start a Conversation
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ maxWidth: 700, mx: 'auto' }}
          >
            Have a project in mind? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {/* Contact Information */}
          <Grid item xs={12} md={5}>
            <Stack spacing={3}>
              {contactInfo.map((info, index) => (
                <Paper
                  key={index}
                  sx={{
                    p: 3,
                    borderRadius: 2,
                    background: theme.palette.background.paper,
                    boxShadow: theme.palette.mode === 'dark'
                      ? '0 2px 10px rgba(0,0,0,0.3)'
                      : '0 2px 10px rgba(0,0,0,0.05)',
                    transition: 'transform 0.2s ease',
                    '&:hover': {
                      transform: 'translateX(8px)',
                    },
                    cursor: info.link ? 'pointer' : 'default',
                  }}
                  onClick={() => info.link && window.open(info.link, '_self')}
                  data-testid={`contact-info-${index}`}
                >
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                        color: 'white',
                      }}
                    >
                      {info.icon}
                    </Box>
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">
                        {info.title}
                      </Typography>
                      <Typography variant="body1" fontWeight={600}>
                        {info.content}
                      </Typography>
                    </Box>
                  </Stack>
                </Paper>
              ))}

              {/* Map Placeholder */}
              <Paper
                sx={{
                  height: 200,
                  borderRadius: 2,
                  background: theme.palette.mode === 'dark'
                    ? 'linear-gradient(135deg, #1e293b 0%, #312e81 100%)'
                    : 'linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <LocationOn sx={{ fontSize: 60, opacity: 0.3 }} />
              </Paper>
            </Stack>
          </Grid>

          {/* Contact Form */}
          <Grid item xs={12} md={7}>
            <Paper
              sx={{
                p: 4,
                borderRadius: 3,
                background: theme.palette.background.paper,
                boxShadow: theme.palette.mode === 'dark'
                  ? '0 4px 20px rgba(0,0,0,0.3)'
                  : '0 4px 20px rgba(0,0,0,0.08)',
              }}
            >
              {submitted && (
                <Alert severity="success" sx={{ mb: 3 }}>
                  Thank you! We'll get back to you soon.
                </Alert>
              )}

              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Your Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      variant="outlined"
                      data-testid="contact-name-input"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Email Address"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      variant="outlined"
                      data-testid="contact-email-input"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Company Name"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      variant="outlined"
                      data-testid="contact-company-input"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Phone Number"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      variant="outlined"
                      data-testid="contact-phone-input"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Your Message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      multiline
                      rows={6}
                      variant="outlined"
                      data-testid="contact-message-input"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      endIcon={<Send />}
                      fullWidth
                      sx={{
                        py: 1.5,
                        fontSize: '1rem',
                        fontWeight: 600,
                        textTransform: 'none',
                        background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                        '&:hover': {
                          background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                        },
                      }}
                      data-testid="contact-submit-button"
                    >
                      Send Message
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ContactForm;
