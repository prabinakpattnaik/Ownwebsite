import React, { useEffect, useRef } from 'react';
import { Box, useTheme } from '@mui/material';

const FlowingNetwork = () => {
  const theme = useTheme();
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width = 600;
    const height = canvas.height = 600;

    // Create network of nodes
    const nodeCount = 50;
    const nodes = [];
    
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        r: Math.random() * 3 + 2,
      });
    }

    // Create flowing particles
    const particleCount = 100;
    const particles = [];
    
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        r: Math.random() * 1.5 + 0.5,
        hue: Math.random() * 60 + 240, // Blue to purple range
      });
    }

    let animationFrame;

    const animate = () => {
      ctx.fillStyle = theme.palette.mode === 'dark'
        ? 'rgba(15, 23, 42, 0.1)'
        : 'rgba(248, 250, 252, 0.1)';
      ctx.fillRect(0, 0, width, height);

      // Draw connections between nearby nodes
      ctx.strokeStyle = theme.palette.mode === 'dark'
        ? 'rgba(139, 92, 246, 0.15)'
        : 'rgba(99, 102, 241, 0.1)';
      ctx.lineWidth = 1;

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[j].x - nodes[i].x;
          const dy = nodes[j].y - nodes[i].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            const opacity = (1 - distance / 120) * 0.5;
            ctx.strokeStyle = theme.palette.mode === 'dark'
              ? `rgba(139, 92, 246, ${opacity})`
              : `rgba(99, 102, 241, ${opacity})`;
            
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Update and draw nodes
      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        const gradient = ctx.createRadialGradient(
          node.x, node.y, 0,
          node.x, node.y, node.r
        );
        
        gradient.addColorStop(0, theme.palette.mode === 'dark'
          ? 'rgba(167, 139, 250, 0.8)'
          : 'rgba(99, 102, 241, 0.7)');
        gradient.addColorStop(1, 'rgba(99, 102, 241, 0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2);
        ctx.fill();
      });

      // Update and draw flowing particles (data flow effect)
      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0) particle.x = width;
        if (particle.x > width) particle.x = 0;
        if (particle.y < 0) particle.y = height;
        if (particle.y > height) particle.y = 0;

        ctx.fillStyle = theme.palette.mode === 'dark'
          ? `hsla(${particle.hue}, 80%, 70%, 0.6)`
          : `hsla(${particle.hue}, 70%, 50%, 0.5)`;
        
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.r, 0, Math.PI * 2);
        ctx.fill();

        // Draw trailing effect
        ctx.strokeStyle = theme.palette.mode === 'dark'
          ? `hsla(${particle.hue}, 80%, 70%, 0.2)`
          : `hsla(${particle.hue}, 70%, 50%, 0.2)`;
        ctx.lineWidth = particle.r;
        ctx.beginPath();
        ctx.moveTo(particle.x, particle.y);
        ctx.lineTo(particle.x - particle.vx * 5, particle.y - particle.vy * 5);
        ctx.stroke();
      });

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [theme.palette.mode]);

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          maxWidth: '600px',
          height: 'auto',
          borderRadius: '20px',
          boxShadow: theme.palette.mode === 'dark'
            ? '0 20px 60px rgba(99, 102, 241, 0.3)'
            : '0 20px 60px rgba(99, 102, 241, 0.2)',
        }}
      />
      
      {/* Overlay Logo */}
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 2,
        }}
      >
        <Box
          component="img"
          src="/logo-icon.svg"
          alt="Netrivium"
          sx={{
            width: { xs: 120, md: 160 },
            height: 'auto',
            filter: 'drop-shadow(0 10px 40px rgba(99, 102, 241, 0.5))',
            animation: 'pulse 3s ease-in-out infinite',
            '@keyframes pulse': {
              '0%, 100%': {
                transform: 'scale(1)',
              },
              '50%': {
                transform: 'scale(1.05)',
              },
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default FlowingNetwork;
