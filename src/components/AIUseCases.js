import { Box, Card, CardContent, Container, Grid, Typography } from '@mui/material';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import InsightsIcon from '@mui/icons-material/Insights';
import TimelineIcon from '@mui/icons-material/Timeline';
import AI from "../assets/AI-amico.png";

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
    <Box sx={{ py: 10, backgroundColor: 'background.paper' }} id="ai-use-cases">
      <Container maxWidth="lg">
        <Typography component="h2" variant="h2" mb={4}>
          AI Use Cases We Deliver
        </Typography>
        <Grid container spacing={4} alignItems="stretch">
          <Grid item xs={12} md={4}>
            <Box display="flex" justifyContent="center" alignItems="center" height="100%">
              <img
                src={AI}
                alt="Illustration of AI-powered connectivity and support"
                style={{ maxWidth: '100%', height: 'auto', borderRadius: 12 }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={8}>
            <Grid container spacing={3}>
              {useCases.map((item, i) => (
                <Grid item xs={12} sm={4} key={i}>
                  <Card sx={{ height: '100%' }}>
                    <CardContent sx={{ p: 3, textAlign: 'center' }}>
                      {item.icon}
                      <Typography component="h3" variant="h6" mt={2}>
                        {item.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" mt={1}>
                        {item.desc}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
