import React from "react";
import { Box, Container, Grid, Paper, Stack, Typography } from "@mui/material";
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
        <Grid container spacing={6} alignItems="center">
          {/* LEFT: Cards */}
          <Grid item xs={12} md={7} >
            <Typography variant="h4" fontWeight="bold" mb={4}>
              Our Development Expertise
            </Typography>
            <Grid container spacing={4} style={{ marginTop: "-80px" }}>
              {devSkills.map((skill, i) => (
                <Grid item xs={12} sm={6} key={i} style={{ paddingTop: "80px" }}>
                  <Paper elevation={3} sx={{ p: 4, textAlign: "center", height: "100%" }}>
                    <Stack spacing={2} alignItems="center">
                      {skill.icon}
                      <Typography variant="h6" fontWeight="bold">
                        {skill.title}
                      </Typography>
                      <Typography color="text.secondary">{skill.desc}</Typography>
                    </Stack>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Grid>

          {/* RIGHT: Illustration Image */}
          <Grid item xs={12} md={5}>
            <Box display="flex" justifyContent="center">
              <img
                src="/assets/dev_expertise.svg" // Image should be in public/assets/
                alt="Development Illustration"
                style={{ maxWidth: "100%", height: "auto", borderRadius: 12 }}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
