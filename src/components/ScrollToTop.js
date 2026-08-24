import React, { useState, useEffect } from 'react';
import { Fab, Zoom } from '@mui/material';
import { KeyboardArrowUp } from '@mui/icons-material';

const ScrollToTop = () => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.pageYOffset > 300) {
                setShow(true);
            } else {
                setShow(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleClick = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <Zoom in={show}>
            <Fab
                onClick={handleClick}
                color="primary"
                size="small"
                aria-label="scroll back to top"
                sx={{
                    position: 'fixed',
                    bottom: 32,
                    right: 32,
                    zIndex: 9999,
                    background: 'linear-gradient(135deg, #0A5BD3 0%, #00B7E3 100%)',
                    boxShadow: '0 8px 20px rgba(10, 91, 211, 0.3)',
                    '&:hover': {
                        transform: 'translateY(-2px)',
                    }
                }}
                data-testid="scroll-to-top-button"
            >
                <KeyboardArrowUp />
            </Fab>
        </Zoom>
    );
};

export default ScrollToTop;
