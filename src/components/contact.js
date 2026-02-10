import { Avatar, Container, Stack, Typography } from "@mui/material";
import contactus from "../assets/contact.jpg";
import { SUPPORT_EMAIL_ADDRESS } from "../utils/consants";

const Contact = () => {
  return (
    <Container id="contact" sx={{ py: 6 }}>
      <Stack direction={{ xs: "column", md: "row" }} spacing={4} alignItems="center">
        <Stack spacing={2} flex={1}>
          <Typography component="h2" variant="h4" gutterBottom>
            Get in Touch
          </Typography>
          <Typography color="text.secondary">
            Whether you have a question, a project, or just want to say hello—our team is ready to connect. We’re here to assist you with your connectivity, SaaS, and AI/ML needs. Whether you’re looking for collaboration opportunities, have inquiries, or want to explore how Netrivium can drive your business forward, we’d love to hear from you.
          </Typography>
          <Typography color="text.primary" fontWeight="bold">
            Email: <a href={`mailto:${SUPPORT_EMAIL_ADDRESS}`} style={{ textDecoration: "none", color: "inherit" }}>{SUPPORT_EMAIL_ADDRESS}</a>
          </Typography>
          <Typography color="primary" fontWeight="bold">
            Let’s innovate and connect seamlessly!
          </Typography>
        </Stack>
        <Avatar
          src={contactus}
          alt="Contact Us"
          sx={{ borderRadius: 2, width: { xs: '100%', md: '50%' }, height: 'auto' }}
          variant="rounded"
        />
      </Stack>
    </Container>
  );
};

export default Contact;
