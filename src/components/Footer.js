import { Container, Fade, Grid2, IconButton, Stack, Typography, Box } from "@mui/material"
import React from "react";
import { Link } from "react-scroll";
import { EmailRounded, Facebook, Instagram, LinkedIn, PinDrop, SupportAgentRounded, Twitter } from "@mui/icons-material";
import { SUPPORT_EMAIL_ADDRESS } from "../utils/consants";

const Footer = () => {
    const [isVisible, setIsVisible] = React.useState(false);
    const containerRef = React.useRef(null);
    // const { mode } = useThemeMode(); // Removed unused mode

    React.useEffect(() => {
        const x = containerRef.current
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            {
                threshold: 0.1, // Trigger when 10% of the container is visible
            }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => {
            if (x) {
                observer.unobserve(x);
            }
        };
    }, []);
    return <footer style={{ backgroundColor: "#0f172a", color: "#94a3b8" }}>
        <Container
            maxWidth="xl"
            sx={{
                gap: { xs: 3, sm: 6 },
            }}
            ref={containerRef}
        >
            <Fade appear in={isVisible} style={{ transitionDelay: `${200}ms` }}>
                <Grid2 container pt={8} pb={6} justifyContent={'space-between'} spacing={4} >
                    <Grid2 size={{ xs: 12, md: 4 }} item>
                        <Stack direction={'column'} gap={3}>
                            <Box
                                component="img"
                                src="/logo-horizontal-dark.svg"
                                alt="Netrivium Technologies"
                                sx={{
                                    height: 40,
                                    width: 'auto',
                                    mb: 1
                                }}
                            />
                            <Typography textAlign={'left'} sx={{ lineHeight: 1.8 }}>
                                Netrivium is a leading services company focused on delivering innovative connectivity solutions, cutting-edge SaaS products, and advanced AI/ML technologies.
                            </Typography>
                            <Stack direction={'row'} spacing={1}>
                                <IconButton size="small" sx={{ color: "#94a3b8", '&:hover': { color: "#1DA1F2" } }}><Twitter /></IconButton>
                                <IconButton size="small" sx={{ color: "#94a3b8", '&:hover': { color: "#cd486b" } }}><Instagram /></IconButton>
                                <IconButton size="small" sx={{ color: "#94a3b8", '&:hover': { color: "#4267B2" } }}><Facebook /></IconButton>
                                <IconButton size="small" onClick={() => {
                                    window.open("https://www.linkedin.com/company/connect-beacon/", '_blank')
                                }} sx={{ color: "#94a3b8", '&:hover': { color: "#004182" } }}><LinkedIn /></IconButton>
                            </Stack>
                        </Stack>
                    </Grid2 >

                    <Grid2 size={{ xs: 12, sm: 6, md: 2 }} item>
                        <Stack direction={'column'} gap={2.5}>
                            <Typography variant="h6" color="white" fontWeight={700}>
                                Explore
                            </Typography>
                            <Link to="home" smooth={true} duration={500} style={{ cursor: 'pointer', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = '#fff'} onMouseLeave={(e) => e.target.style.color = 'inherit'}>Home</Link>
                            <Link to="about" smooth={true} duration={500} offset={-80} style={{ cursor: 'pointer', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = '#fff'} onMouseLeave={(e) => e.target.style.color = 'inherit'}>About</Link>
                            <Link to="services" smooth={true} duration={500} style={{ cursor: 'pointer', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = '#fff'} onMouseLeave={(e) => e.target.style.color = 'inherit'}>Services</Link>
                        </Stack>
                    </Grid2 >

                    <Grid2 size={{ xs: 12, sm: 6, md: 2 }} item>
                        <Stack direction={'column'} gap={2.5}>
                            <Typography variant="h6" color="white" fontWeight={700}>
                                Legal
                            </Typography>
                            <Link to="terms" smooth={true} duration={500} style={{ cursor: 'pointer', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = '#fff'} onMouseLeave={(e) => e.target.style.color = 'inherit'}>Terms</Link>
                            <Link to="privacy" smooth={true} duration={500} style={{ cursor: 'pointer', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = '#fff'} onMouseLeave={(e) => e.target.style.color = 'inherit'}>Privacy</Link>
                            <Link to="contact" smooth={true} duration={500} offset={-80} style={{ cursor: 'pointer', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = '#fff'} onMouseLeave={(e) => e.target.style.color = 'inherit'}>Contact</Link>
                        </Stack>
                    </Grid2 >

                    <Grid2 size={{ xs: 12, sm: 6, md: 3 }} item>
                        <Stack direction={'column'} gap={2.5}>
                            <Typography variant="h6" color="white" fontWeight={700}>
                                Get In Touch
                            </Typography>
                            <Stack direction={'row'} alignItems={'center'} gap={2}>
                                <PinDrop sx={{ color: '#6366f1' }} />
                                <Typography>Hitech City, Hyderabad, India</Typography>
                            </Stack>
                            <Stack direction={'row'} alignItems={'center'} gap={2}>
                                <SupportAgentRounded sx={{ color: '#6366f1' }} />
                                <Typography>+91-40-49983275</Typography>
                            </Stack>
                            <Stack direction={'row'} alignItems={'center'} gap={2}>
                                <EmailRounded sx={{ color: '#6366f1' }} />
                                <Typography>{SUPPORT_EMAIL_ADDRESS}</Typography>
                            </Stack>
                        </Stack>
                    </Grid2 >
                </Grid2>
            </Fade>
        </Container>
        <Box sx={{ borderTop: '1px solid #1e293b', py: 3, mt: 4 }}>
            <Container maxWidth="xl">
                <Typography textAlign="center" variant="body2" sx={{ opacity: 0.8 }}>
                    Copyright &#169; {new Date().getFullYear()} NETRIVIUM TECHNOLOGIES. All Rights Reserved.
                </Typography>
            </Container>
        </Box>
    </footer>
}

export default Footer
