import { Box, Container, Grid, Typography } from '@mui/material';

const metrics = [
  { label: 'POCs Delivered', value: '20+' },
  { label: 'Downtime Reduced', value: '30%' },
  { label: 'Industries Served', value: '5+' },
];

export default function SuccessMetrics() {
  return (
    <Box sx={{ py: 10, backgroundColor: '#f9fafb' }} id="success-metrics">
      <Container maxWidth="md">
        <Typography variant="h4" textAlign="center" fontWeight="bold" mb={6}>
          Our Impact in Numbers
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {metrics.map((item, i) => (
            <Grid item xs={6} sm={3} key={i}>
              <Typography variant="h3" fontWeight="bold" textAlign="center">
                {item.value}
              </Typography>
              <Typography variant="body1" color="text.secondary" textAlign="center">
                {item.label}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
