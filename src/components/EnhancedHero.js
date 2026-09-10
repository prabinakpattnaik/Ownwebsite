import React from 'react';
import { Box, Container, Typography, Button, Stack, Chip, useTheme } from '@mui/material';
import { Link } from 'react-scroll';
import { CheckCircle, TrendingUp, Security, Speed } from '@mui/icons-material';
import FlowingNetwork from './FlowingNetwork';
import { keyframes } from '@mui/system';

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0px); }
`;

const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const EnhancedHero = () => {
  const theme = useTheme();

  return (
    <Box
      id="home"
      sx={{
        position: 'relative',
        minHeight: '100vh',
        background: theme.palette.mode === 'dark'
          ? 'linear-gradient(-45deg, #04101F, #08213D, #0A3D8F, #0A5BD3)'
          : 'linear-gradient(-45deg, #08213D, #0A3D8F, #0A5BD3, #00B7E3)',
        backgroundSize: '400% 400%',
        animation: `${gradientShift} 15s ease infinite`,
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        pt: 10,
      }}
    >
      {/* Animated Background Circles */}
      <Box
        sx={{
          position: 'absolute',
          top: '10%',
          left: '10%',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.1)',
          animation: `${float} 6s ease-in-out infinite`,
          filter: 'blur(40px)',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '10%',
          right: '10%',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.1)',
          animation: `${float} 8s ease-in-out infinite`,
          filter: 'blur(60px)',
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            gap: 6,
          }}
        >
          {/* Left Content */}
          <Box
            sx={{
              flex: 1,
              animation: `${fadeInUp} 1s ease-out`,
            }}
          >
            {/* Badge */}
            <Chip
              icon={<TrendingUp />}
              label="Trusted by 50+ Enterprises"
              sx={{
                mb: 3,
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                color: 'white',
                backdropFilter: 'blur(10px)',
              }}
              data-testid="trust-badge"
            />

            <Typography
              component="h1"
              variant="h1"
              sx={{
                color: 'white',
                mb: 2,
              }}
              data-testid="hero-title"
            >
              Netrivium Technologies
            </Typography>

            <Typography
              component="p"
              variant="h5"
              sx={{
                color: 'rgba(255, 255, 255, 0.95)',
                mb: 2,
              }}
            >
              Empowering Businesses with Intelligent Connectivity
            </Typography>

            <Typography
              component="p"
              variant="body1"
              sx={{
                color: 'rgba(255, 255, 255, 0.85)',
                mb: 4,
              }}
            >
              Scalable, secure, and innovative networking solutions—built for the modern digital landscape.
            </Typography>

            {/* Trust Indicators */}
            <Stack direction="row" spacing={3} mb={4} flexWrap="wrap" gap={2}>
              {[
                { icon: <CheckCircle />, text: '99.9% Uptime' },
                { icon: <Security />, text: 'Enterprise Security' },
                { icon: <Speed />, text: 'Lightning Fast' },
              ].map((item, index) => (
                <Stack key={index} direction="row" alignItems="center" spacing={1}>
                  <Box sx={{ color: 'rgba(255, 255, 255, 0.9)' }}>{item.icon}</Box>
                  <Typography sx={{ color: 'rgba(255, 255, 255, 0.9)', fontWeight: 500 }}>
                    {item.text}
                  </Typography>
                </Stack>
              ))}
            </Stack>

            {/* CTA Buttons */}
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <Link to="about" smooth={true} duration={500} style={{ textDecoration: 'none' }}>
                <Button
                  variant="contained"
                  color="inherit"
                  size="large"
                  data-testid="hero-cta-primary"
                >
                  Get Started
                </Button>
              </Link>

              <Link to="contact" smooth={true} duration={500} style={{ textDecoration: 'none' }}>
                <Button
                  variant="outlined"
                  color="inherit"
                  size="large"
                  data-testid="hero-cta-secondary"
                >
                  Contact Sales
                </Button>
              </Link>
            </Stack>
          </Box>

          {/* Right Animation */}
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              justifyContent: 'center',
              minHeight: { xs: 300, md: 500 },
            }}
          >
            <FlowingNetwork />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default EnhancedHero;
