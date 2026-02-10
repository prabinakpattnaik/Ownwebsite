import React from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Avatar,
  Rating,
  Stack,
  useTheme,
  Grid,
} from '@mui/material';
import { FormatQuote } from '@mui/icons-material';

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'CTO, TechCorp',
    avatar: 'SJ',
    rating: 5,
    text: 'Netrivium transformed our network infrastructure. Their expertise in 5G and SD-WAN implementation exceeded our expectations.',
    company: 'Fortune 500 Technology Company',
  },
  {
    name: 'Michael Chen',
    role: 'VP Engineering, DataFlow',
    avatar: 'MC',
    rating: 5,
    text: 'The AI-powered analytics and observability solutions have given us unprecedented visibility into our systems. Highly recommended!',
    company: 'Leading SaaS Platform',
  },
  {
    name: 'Emily Rodriguez',
    role: 'Head of IT, GlobalNet',
    avatar: 'ER',
    rating: 5,
    text: 'Outstanding support and innovative solutions. Netrivium helped us scale our connectivity infrastructure seamlessly across 15 countries.',
    company: 'International Enterprise',
  },
];

const Testimonials = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        py: 10,
        background: theme.palette.mode === 'dark'
          ? 'linear-gradient(180deg, #0f172a 0%, #1e293b 100%)'
          : 'linear-gradient(180deg, #f8fafc 0%, #e0e7ff 100%)',
      }}
      id="testimonials"
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
            TESTIMONIALS
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
            What Our Clients Say
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ maxWidth: 600, mx: 'auto' }}
          >
            Trusted by leading enterprises worldwide
          </Typography>
        </Box>

        {/* Testimonials Grid */}
        <Grid container spacing={4}>
          {testimonials.map((testimonial, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card
                sx={{
                  height: '100%',
                  background: theme.palette.background.paper,
                  borderRadius: 3,
                  boxShadow: theme.palette.mode === 'dark'
                    ? '0 4px 20px rgba(0,0,0,0.3)'
                    : '0 4px 20px rgba(0,0,0,0.08)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: theme.palette.mode === 'dark'
                      ? '0 12px 40px rgba(0,0,0,0.4)'
                      : '0 12px 40px rgba(0,0,0,0.12)',
                  },
                }}
                data-testid={`testimonial-card-${index}`}
              >
                <CardContent sx={{ p: 4 }}>
                  {/* Quote Icon */}
                  <FormatQuote
                    sx={{
                      fontSize: 40,
                      color: theme.palette.primary.main,
                      opacity: 0.3,
                      mb: 2,
                    }}
                  />

                  {/* Rating */}
                  <Rating value={testimonial.rating} readOnly sx={{ mb: 2 }} />

                  {/* Testimonial Text */}
                  <Typography
                    variant="body1"
                    sx={{
                      mb: 3,
                      lineHeight: 1.8,
                      fontStyle: 'italic',
                      color: theme.palette.text.primary,
                    }}
                  >
                    "{testimonial.text}"
                  </Typography>

                  {/* Author Info */}
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar
                      sx={{
                        width: 56,
                        height: 56,
                        background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                        fontWeight: 700,
                        fontSize: '1.2rem',
                      }}
                    >
                      {testimonial.avatar}
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle1" fontWeight={600}>
                        {testimonial.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {testimonial.role}
                      </Typography>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ fontStyle: 'italic' }}
                      >
                        {testimonial.company}
                      </Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Testimonials;
