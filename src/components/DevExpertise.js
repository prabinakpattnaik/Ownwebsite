import React from "react";
import { Box, Card, CardContent, Container, Grid, Stack, Typography } from "@mui/material";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import WebIcon from "@mui/icons-material/Web";
import CloudQueueIcon from "@mui/icons-material/CloudQueue";
import StorageRoundedIcon from "@mui/icons-material/StorageRounded";

const devSkills = [
  {
    icon: <PhoneIphoneIcon color="primary" sx={{ fontSize: 40 }} />,
    title: "Mobile App Development",
    desc: "Custom Android & iOS apps built with modern frameworks like Flutter and React Native.",
  },
  {
    icon: <WebIcon color="secondary" sx={{ fontSize: 40 }} />,
    title: "Web Application Development",
    desc: "Responsive, secure, and high-performance web platforms with React, Vue, and Next.js.",
  },
  {
    icon: <CloudQueueIcon color="success" sx={{ fontSize: 40 }} />,
    title: "Full-Stack Engineering",
    desc: "Complete frontend-backend integration using Node.js, Python, Go, and cloud-native stacks.",
  },
  {
    icon: <StorageRoundedIcon color="warning" sx={{ fontSize: 40 }} />,
    title: "Cloud & DevOps",
    desc: "Scalable infrastructure with Kubernetes, Docker, and CI/CD pipelines on AWS/Azure/GCP.",
  },
];

export default function DevExpertise() {
  return (
    <Box id="expertise" sx={{ py: 10, backgroundColor: "#f8fbff" }}>
      <Container maxWidth="lg">
        <Grid container spacing={6} alignItems="stretch">
          <Grid item xs={12} md={7}>
            <Typography component="h2" variant="h2" mb={4}>
              Our Development Expertise
            </Typography>
            <Grid container spacing={3}>
              {devSkills.map((skill, i) => (
                <Grid item xs={12} sm={6} key={i}>
                  <Card sx={{ height: "100%" }}>
                    <CardContent sx={{ p: 3, textAlign: "center" }}>
                      <Stack spacing={2} alignItems="center">
                        {skill.icon}
                        <Typography component="h3" variant="h6">
                          {skill.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">{skill.desc}</Typography>
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>

          <Grid item xs={12} md={5}>
            <Box display="flex" justifyContent="center" alignItems="center" height="100%">
              <img
                src="/assets/dev_expertise.svg"
                alt="Illustration of software development expertise"
                style={{ maxWidth: "100%", height: "auto", borderRadius: 12 }}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
