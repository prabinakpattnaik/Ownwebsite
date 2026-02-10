import React, { useEffect, useRef } from 'react';
import { Box, useTheme } from '@mui/material';
import { keyframes } from '@mui/system';

const pulse = keyframes`
  0%, 100% { opacity: 0.6; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.1); }
`;

const flowParticle = keyframes`
  0% { opacity: 0; transform: translateY(0) translateX(0); }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { opacity: 0; transform: translateY(-100px) translateX(50px); }
`;

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const AnimatedLogo = () => {
  const theme = useTheme();
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width = 500;
    const height = canvas.height = 500;

    // Network node positions
    const nodes = [
      { x: 250, y: 250, r: 40, color: '#6366f1', pulse: 0 }, // Center
      { x: 150, y: 150, r: 25, color: '#8b5cf6', pulse: 0.2 },
      { x: 350, y: 150, r: 25, color: '#8b5cf6', pulse: 0.4 },
      { x: 150, y: 350, r: 25, color: '#8b5cf6', pulse: 0.6 },
      { x: 350, y: 350, r: 25, color: '#8b5cf6', pulse: 0.8 },
      { x: 250, y: 100, r: 20, color: '#a78bfa', pulse: 0.3 },
      { x: 250, y: 400, r: 20, color: '#a78bfa', pulse: 0.7 },
      { x: 100, y: 250, r: 20, color: '#a78bfa', pulse: 0.5 },
      { x: 400, y: 250, r: 20, color: '#a78bfa', pulse: 0.9 },
    ];

    // Data particles flowing between nodes
    const particles = [];
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        r: Math.random() * 2 + 1,
        opacity: Math.random(),
      });
    }

    let animationFrame;
    let time = 0;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.016;

      // Draw connections
      ctx.strokeStyle = theme.palette.mode === 'dark' 
        ? 'rgba(139, 92, 246, 0.3)' 
        : 'rgba(99, 102, 241, 0.2)';
      ctx.lineWidth = 2;

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[j].x - nodes[i].x;
          const dy = nodes[j].y - nodes[i].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 250) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw and animate particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.fillStyle = theme.palette.mode === 'dark'
          ? `rgba(167, 139, 250, ${p.opacity * 0.6})`
          : `rgba(99, 102, 241, ${p.opacity * 0.4})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw nodes with pulsing effect
      nodes.forEach((node, i) => {
        const pulseValue = Math.sin(time * 2 + node.pulse * Math.PI * 2) * 0.3 + 0.7;
        const gradient = ctx.createRadialGradient(
          node.x, node.y, 0,
          node.x, node.y, node.r
        );

        gradient.addColorStop(0, node.color);
        gradient.addColorStop(1, theme.palette.mode === 'dark' 
          ? 'rgba(99, 102, 241, 0.4)' 
          : 'rgba(139, 92, 246, 0.3)');

        ctx.fillStyle = gradient;
        ctx.globalAlpha = pulseValue;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;

        // Draw glow
        ctx.shadowBlur = 20;
        ctx.shadowColor = node.color;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.r * 0.7, 0, Math.PI * 2);
        ctx.fillStyle = 'white';
        ctx.fill();
        ctx.shadowBlur = 0;

        // Draw "N" in center node
        if (i === 0) {
          ctx.font = 'bold 48px Arial';
          ctx.fillStyle = '#6366f1';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('N', node.x, node.y);
        }
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
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          maxWidth: '500px',
          height: 'auto',
          filter: 'drop-shadow(0 0 30px rgba(99, 102, 241, 0.3))',
        }}
      />
    </Box>
  );
};

export default AnimatedLogo;
