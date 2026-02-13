import * as React from "react";
import {
  Avatar,
  Box,
  Card,
  Container,
  Grid,
  Stack,
  Typography,
  Zoom,
} from "@mui/material";

import AutoFixHighRoundedIcon from "@mui/icons-material/AutoFixHighRounded";
import ConstructionRoundedIcon from "@mui/icons-material/ConstructionRounded";
import QueryStatsRoundedIcon from "@mui/icons-material/QueryStatsRounded";
import SettingsSuggestRoundedIcon from "@mui/icons-material/SettingsSuggestRounded";
import SupportAgentRoundedIcon from "@mui/icons-material/SupportAgentRounded";
import ThumbUpAltRoundedIcon from "@mui/icons-material/ThumbUpAltRounded";
import SmartToyRoundedIcon from "@mui/icons-material/SmartToyRounded";
import InsightsRoundedIcon from "@mui/icons-material/InsightsRounded";
import CloudQueueRoundedIcon from "@mui/icons-material/CloudQueueRounded";

import { blue, green, pink, purple, red, yellow } from "@mui/material/colors";
import aboutus from "../assets/about.png"; // make sure this path is correct
import { deepOrange, indigo } from "@mui/material/colors";

const items = [
  {
    icon: <SettingsSuggestRoundedIcon sx={{ color: pink[900], fontSize: 34 }} />,
    title: "Expert Engineering",
    description:
      "We build reliable, scalable network and SaaS solutions for modern enterprises.",
  },
  {
    icon: <ConstructionRoundedIcon sx={{ color: blue[900], fontSize: 34 }} />,
    title: "Infrastructure Ready",
    description: "Deploy SD-WAN, LTE/5G, and secure datacenter networks with ease.",
  },
  {
    icon: <CloudQueueRoundedIcon sx={{ color: blue[700], fontSize: 34 }} />,
    title: "Cloud & Platform Engineering",
    description: "Deep expertise in public/private cloud, Kubernetes, and container orchestration.",
  },
  {
    icon: <SmartToyRoundedIcon sx={{ color: deepOrange[700], fontSize: 34 }} />,
    title: "AI-Powered Chatbot",
    description: "Enhance customer engagement with conversational AI tailored to your services.",
  },
  {
    icon: <InsightsRoundedIcon sx={{ color: indigo[700], fontSize: 34 }} />,
    title: "AI-Enabled Use Cases",
    description: "Implement predictive analytics, intelligent automation, and anomaly detection at scale.",
  },
  {
    icon: <ThumbUpAltRoundedIcon sx={{ color: green[900], fontSize: 34 }} />,
    title: "User-first SaaS Design",
    description:
      "Modern full-stack development with great UX and backend strength.",
  },
  {
    icon: <AutoFixHighRoundedIcon sx={{ color: red[900], fontSize: 34 }} />,
    title: "Innovative Observability",
    description:
      "Real-time metrics, eBPF-based telemetry, and ML-powered analytics.",
  },
  {
    icon: <SupportAgentRoundedIcon sx={{ color: purple[900], fontSize: 34 }} />,
    title: "End-to-end Support",
    description:
      "From setup to scaling — we stay with you through the lifecycle.",
  },
  {
    icon: <QueryStatsRoundedIcon sx={{ color: yellow[900], fontSize: 34 }} />,
    title: "Performance Optimization",
    description:
      "Your system, tuned for maximum throughput, visibility, and reliability.",
  },
];

export default function AboutPage() {
  const [isVisible, setIsVisible] = React.useState(false);
  const containerRef = React.useRef(null);

  React.useEffect(() => {
    const node = containerRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (node) observer.observe(node);
    return () => node && observer.unobserve(node);
  }, []);

  return (
    <Box id="about" sx={{ pt: 4, pb: 6, backgroundColor: "#f9fafb" }} ref={containerRef}>
      {/* Intro Section */}
      <Container sx={{ mb: 6 }}>
        <Stack direction={{ xs: "column", md: "row" }} spacing={4} alignItems="center">
          <Avatar
            src={aboutus}
            alt="About us"
            sx={{ borderRadius: 2, width: { md: "50%" }, height: "auto" }}
            variant="rounded"
          />
          <Stack spacing={2}>
            <Typography component="h2" variant="h4" gutterBottom>
              About Us
            </Typography>
            <Typography color="text.secondary" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
              Netrivium empowers dynamic enterprise environments with high-performance connectivity and bespoke SaaS solutions. Our comprehensive offerings span LTE/5G infrastructure, WAN optimization, and Next-Gen secure access (SASE/Zero Trust).
            </Typography>
            <Typography color="text.secondary" sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
              Beyond connectivity, we bring deep expertise across modern platform infrastructure—spanning public cloud, private cloud, and Kubernetes & Containers—to ensure your digital foundation is scalable, secure, and future-ready.
            </Typography>
          </Stack>
        </Stack>
      </Container>

      {/* Highlights Section */}
      <Container>
        <Typography component="h3" variant="h5" align="center" gutterBottom>
          What Sets Us Apart
        </Typography>
        <Grid container spacing={3} >
          {items.map((item, index) => (
            <Zoom in={isVisible} style={{ transitionDelay: `${index * 200}ms` }} key={index}>
              <Grid item xs={12} sm={6} md={4} style={{ paddingTop: "42px" }}>
                <Stack
                  direction="column"
                  component={Card}
                  spacing={1}
                  sx={{
                    p: 2,
                    height: "100%",
                    transition: "0.3s",
                    backgroundColor: "#ffffffdd",
                    "&:hover": {
                      backgroundColor: "#d4f2f2",
                    },
                  }}
                >
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Box sx={{ opacity: 0.5 }}>{item.icon}</Box>
                    <Typography fontWeight="bold">{item.title}</Typography>
                  </Stack>
                  <Typography color="text.secondary">{item.description}</Typography>
                </Stack>
              </Grid>
            </Zoom>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

