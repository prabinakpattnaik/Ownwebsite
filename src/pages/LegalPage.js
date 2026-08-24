import React from 'react';
import { Box, Container, Typography, Stack } from '@mui/material';
import PageSEO from '../components/PageSEO';
import Footer from '../components/Footer';
import { SUPPORT_EMAIL_ADDRESS } from '../utils/constants';

// Lightweight, honest placeholder pages so the footer's Terms/Privacy links are
// not dead. Replace the body copy with your reviewed legal text when ready.
const CONTENT = {
  privacy: {
    title: 'Privacy Policy',
    intro:
      'Your privacy matters to us. This policy explains what information Netrivium Technologies collects, how we use it, and the choices available to you.',
  },
  terms: {
    title: 'Terms of Service',
    intro:
      'These terms govern your use of the Netrivium Technologies website and services.',
  },
};

const LegalPage = ({ kind }) => {
  const c = CONTENT[kind] || CONTENT.privacy;
  return (
    <Box sx={{ pt: { xs: 12, md: 16 } }}>
      <PageSEO title={c.title} description={`${c.title} — Netrivium Technologies`} noindex />
      <Container maxWidth="md" sx={{ py: 6, minHeight: '60vh' }}>
        <Stack gap={3}>
          <Typography variant="h3">{c.title}</Typography>
          <Typography color="text.secondary" sx={{ lineHeight: 1.8 }}>{c.intro}</Typography>
          <Typography color="text.secondary" sx={{ lineHeight: 1.8 }}>
            Our full {c.title.toLowerCase()} is being finalised. For any questions in the
            meantime, please contact us at{' '}
            <Box
              component="a"
              href={`mailto:${SUPPORT_EMAIL_ADDRESS}`}
              sx={{ color: 'primary.main', textDecoration: 'none' }}
            >
              {SUPPORT_EMAIL_ADDRESS}
            </Box>
            .
          </Typography>
        </Stack>
      </Container>
      <Footer />
    </Box>
  );
};

export default LegalPage;
