import React, { useEffect, useRef, useState } from 'react';
import { Box } from '@mui/material';

const RevealOnScroll = ({ children, threshold = 0.1, delay = 0 }) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect(); // Only animate once
                }
            },
            { threshold }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) observer.disconnect();
        };
    }, [threshold]);

    return (
        <Box
            ref={ref}
            sx={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
                transition: `opacity 0.8s cubic-bezier(0.5, 0, 0, 1) ${delay}ms, transform 0.8s cubic-bezier(0.5, 0, 0, 1) ${delay}ms`,
                willChange: 'opacity, transform',
            }}
        >
            {children}
        </Box>
    );
};

export default RevealOnScroll;
