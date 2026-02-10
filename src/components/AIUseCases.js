import { Box, Container, Grid, Paper, Typography } from '@mui/material';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import InsightsIcon from '@mui/icons-material/Insights';
import TimelineIcon from '@mui/icons-material/Timeline';
import AI from "../assets/AI-amico.png"; // Make sure this path is correct

const useCases = [
  {
    icon: <SmartToyIcon fontSize="large" color="primary" />,
    title: 'AI Chatbot for Support',
    desc: 'Provide real-time answers and ticket routing using natural language processing.',
  },
  {
    icon: <InsightsIcon fontSize="large" color="success" />,
    title: 'Predictive Maintenance',
    desc: 'Forecast faults or anomalies in network traffic using ML models trained on InfluxDB metrics.',
  },
  {
    icon: <TimelineIcon fontSize="large" color="secondary" />,
    title: 'Usage Pattern Analysis',
    desc: 'Optimize SaaS operations based on intelligent behavior analytics from eBPF traces.',
  },
];

export default function AIUseCases() {
  return (
    <Box sx={{ py: 10, backgroundColor: '#fff' }} id="ai-use-cases">
      <Container maxWidth="lg">
        <Grid container spacing={6} alignItems="center">
          {/* Left side: Illustration */}
          <Grid item xs={12} md={5}>
            <Box display="flex" justifyContent="center">
              <img
                src={AI}
                alt="AI Illustration"
                style={{ maxWidth: "100%", height: "auto", borderRadius: 16 }}
              />
            </Box>
          </Grid>

          {/* Right side: Use Cases */}
          <Grid item xs={12} md={7}>
            <Typography variant="h4" fontWeight="bold" mb={4}>
              AI Use Cases We Deliver
            </Typography>
            <Grid container spacing={4}>
              {useCases.map((item, i) => (
                <Grid item xs={12} sm={6} key={i}>
                  <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
                    {item.icon}
                    <Typography variant="h6" mt={2} fontWeight="bold">
                      {item.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" mt={1}>
                      {item.desc}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
