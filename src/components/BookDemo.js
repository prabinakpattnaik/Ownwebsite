import { Box, Button, Container, Stack, Typography } from '@mui/material';

export default function BookDemo() {
  return (
    <Box sx={{ py: 10, backgroundColor: '#f0f4ff' }} id="book-demo">
      <Container maxWidth="md">
        <Stack spacing={4} alignItems="center" textAlign="center">
          <Typography variant="h4" fontWeight="bold">
            Schedule a Call with our Experts
          </Typography>
          <Typography variant="body1" color="text.secondary" maxWidth="sm">
            Discover how Netrivium can streamline your connectivity, enhance observability, and unlock the power of AI across your network.
          </Typography>
          <Button
            variant="contained"
            size="large"
            color="primary"
            href="https://calendly.com/prabina-pattnaik" // Replace with actual link
            target="_blank"
          >
            Book a Demo Session
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}

