import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import AutoFixHighRoundedIcon from '@mui/icons-material/AutoFixHighRounded';
import ConstructionRoundedIcon from '@mui/icons-material/ConstructionRounded';
import QueryStatsRoundedIcon from '@mui/icons-material/QueryStatsRounded';
import SettingsSuggestRoundedIcon from '@mui/icons-material/SettingsSuggestRounded';
import SupportAgentRoundedIcon from '@mui/icons-material/SupportAgentRounded';
import ThumbUpAltRoundedIcon from '@mui/icons-material/ThumbUpAltRounded';
import { blue, green, pink, purple, red, yellow } from '@mui/material/colors';
import { Zoom } from '@mui/material';

const items = [
    {
        icon: <SettingsSuggestRoundedIcon sx={{ color: pink[900], fontSize: '34px' }} />,
        iconColor: "red",
        title: 'Adaptable performance',
        description:
            'Our product effortlessly adjusts to your needs, boosting efficiency and simplifying your tasks.',
    },
    {
        icon: <ConstructionRoundedIcon sx={{ color: blue[900], fontSize: '34px' }} />,
        title: 'Built to last',
        iconColor: "black",
        description:
            'Experience unmatched durability that goes above and beyond with lasting investment.',
    },
    {
        icon: <ThumbUpAltRoundedIcon sx={{ color: green[900], fontSize: '34px' }} />,
        title: 'Great user experience',
        description:
            'Integrate our product into your routine with an intuitive and easy-to-use interface.',
    },
    {
        icon: <AutoFixHighRoundedIcon sx={{ color: red[900], fontSize: '34px' }} />,
        title: 'Innovative functionality',
        description:
            'Stay ahead with features that set new standards, addressing your evolving needs better than the rest.',
    },
    {
        icon: <SupportAgentRoundedIcon sx={{ color: purple[900], fontSize: '34px' }} />,
        title: 'Reliable support',
        description:
            'Count on our responsive customer support, offering assistance that goes beyond the purchase.',
    },
    {
        icon: <QueryStatsRoundedIcon sx={{ color: yellow[900], fontSize: '34px' }} />,
        title: 'Precision in every detail',
        description:
            'Enjoy a meticulously crafted product where small touches make a significant impact on your overall experience.',
    },
];

export default function Highlights() {
    const [isVisible, setIsVisible] = React.useState(false);
    const containerRef = React.useRef(null);

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

    return (
        <Box
            id="highlights"
            ref={containerRef}
            sx={{
                pt: { xs: 2, sm: 3 },
                pb: { xs: 2, sm: 3 },
                color: '#18181b',
                // backgroundColor: '#d4e9ff3d'
                backgroundColor: '#c4d5e114'
            }}
        >
            <Container
                sx={{
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: { xs: 3, sm: 6 },
                }}
            >
                <Box
                    sx={{
                        width: { sm: '100%', md: '60%' },
                        textAlign: { sm: 'left', md: 'center' },
                    }}
                >
                    <Typography component="h2" variant="h4" gutterBottom>
                        Highlights
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#18181bcf' }}>
                        Explore why our product stands out: adaptability, durability,
                        user-friendly design, and innovation. Enjoy reliable customer support and
                        precision in every detail.
                    </Typography>
                </Box>
                <Grid container spacing={2}>
                    {items.map((item, index) => (
                        <Zoom in={isVisible} style={{ transitionDelay: `${index * 200}ms` }}>
                            <Grid size={{ xs: 12, sm: 6, md: 4 }} sx={{ pb: 4 }} key={index}>
                                <Stack
                                    direction="column"
                                    component={Card}
                                    spacing={1}
                                    useFlexGap

                                    sx={{
                                        ":hover": {
                                            background: "#b5efefcf"

                                        },
                                        color: 'inherit',
                                        p: 2,
                                        height: '100%',
                                        backgroundColor: "#dddddd26",

                                    }}
                                >
                                    <Stack direction={'row'} gap={2} useFlexGap alignItems={'center'}>
                                        <Box sx={{ opacity: '50%' }}>{item.icon}</Box>

                                        <Typography gutterBottom sx={{ fontWeight: '700' }}>
                                            {item.title}
                                        </Typography>
                                    </Stack>
                                    <Typography sx={{ color: 'grey.600' }}>
                                        {item.description}
                                    </Typography>

                                </Stack>
                            </Grid>
                        </Zoom>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
}
