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
          ? 'linear-gradient(-45deg, #1e293b, #312e81, #4c1d95, #1e3a8a)'
          : 'linear-gradient(-45deg, #667eea, #764ba2, #f093fb, #4facfe)',
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
                fontWeight: 600,
                backdropFilter: 'blur(10px)',
              }}
              data-testid="trust-badge"
            />

            {/* Heading */}
            <Typography
              variant="h2"
              sx={{
                fontWeight: 800,
                color: 'white',
                mb: 2,
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                lineHeight: 1.2,
              }}
              data-testid="hero-title"
            >
              NETRIVIUM TECHNOLOGIES
            </Typography>

            <Typography
              variant="h5"
              sx={{
                color: 'rgba(255, 255, 255, 0.95)',
                mb: 2,
                fontWeight: 500,
                fontSize: { xs: '1.25rem', md: '1.5rem' },
              }}
            >
              Empowering Businesses with Intelligent Connectivity
            </Typography>

            <Typography
              sx={{
                color: 'rgba(255, 255, 255, 0.85)',
                mb: 4,
                fontSize: '1.1rem',
                lineHeight: 1.7,
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
                  size="large"
                  sx={{
                    backgroundColor: 'white',
                    color: '#6366f1',
                    fontWeight: 700,
                    px: 4,
                    py: 1.5,
                    fontSize: '1rem',
                    textTransform: 'none',
                    borderRadius: 2,
                    boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 15px 50px rgba(0,0,0,0.3)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                  data-testid="hero-cta-primary"
                >
                  Get Started
                </Button>
              </Link>

              <Link to="contact" smooth={true} duration={500} style={{ textDecoration: 'none' }}>
                <Button
                  variant="outlined"
                  size="large"
                  sx={{
                    color: 'white',
                    borderColor: 'rgba(255, 255, 255, 0.5)',
                    fontWeight: 600,
                    px: 4,
                    py: 1.5,
                    fontSize: '1rem',
                    textTransform: 'none',
                    borderRadius: 2,
                    backdropFilter: 'blur(10px)',
                    '&:hover': {
                      borderColor: 'white',
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      transform: 'translateY(-2px)',
                    },
                    transition: 'all 0.3s ease',
                  }}
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
              animation: `${float} 6s ease-in-out infinite`,
            }}
          >
            <LighthouseAnimation />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default EnhancedHero;
