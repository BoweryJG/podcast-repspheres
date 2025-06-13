import React from 'react';
import { Box, Container, Typography } from '@mui/material';

const problems = [
  {
    icon: '🧩',
    title: 'Fragmented Tools',
    content: 'Juggling too many platforms leads to confusion, wasted time, and critical insights slipping through the cracks.'
  },
  {
    icon: '⏳',
    title: 'Momentum Killers',
    content: 'Every context switch and manual step drains energy and slows down the path from insight to closed deal.'
  },
  {
    icon: '🗣️',
    title: 'One-Size-Fits-None',
    content: 'Personalization is promised but rarely delivered—most outreach is bland, forgettable, and easy to ignore.'
  }
];

export default function ProblemSection() {
  return (
    <Box id="problem" sx={{
      py: { xs: 8, md: 12 },
      px: 0,
      position: 'relative',
      zIndex: 1,
    }}>
      <Container maxWidth="md">
        <Typography variant="h2" sx={{ fontWeight: 800, textAlign: 'center', mb: 2 }}>
          What's Holding Elite Sales Teams Back?
        </Typography>
        <Box sx={{
          display: 'block',
          width: 120,
          height: 5,
          background: 'linear-gradient(90deg, #7B42F6 0%, #00ffc6 100%)',
          borderRadius: 3,
          margin: '0.5rem auto 3rem',
          boxShadow: '0 0 18px rgba(138, 79, 255, 0.5)'
        }} />
        <Typography sx={{
          textAlign: 'center',
          maxWidth: 700,
          mx: 'auto',
          mb: 6,
          fontSize: { xs: '1.08rem', md: '1.22rem' },
          color: 'rgba(255,255,255,0.92)'
        }}>
          Even the best sales teams hit a wall—buried under disconnected tools, generic messaging, and missed opportunities. <Box component="span" fontWeight={700}>The real cost?</Box> Lost deals, wasted effort, and burnout.
        </Typography>
        <Box sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: { xs: 4, md: 5 },
          justifyContent: 'center',
          alignItems: 'stretch',
          mb: 5
        }}>
          {problems.map((p, idx) => (
            <Box
              key={p.title}
              sx={{
                flex: 1,
                bgcolor: 'rgba(40, 20, 70, 0.55)',
                borderRadius: 4,
                boxShadow: '0 4px 24px rgba(123,66,246,0.10)',
                p: { xs: 3, md: 4 },
                minWidth: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                border: '1.5px solid rgba(123,66,246,0.13)',
              }}
            >
              <Box sx={{ fontSize: 42, mb: 1.5 }}>{p.icon}</Box>
              <Typography variant="h5" fontWeight={700} mb={1}>{p.title}</Typography>
              <Typography sx={{ color: 'rgba(255,255,255,0.90)' }}>{p.content}</Typography>
            </Box>
          ))}
        </Box>
        <Typography sx={{
          textAlign: 'center',
          mt: 6,
          fontSize: { xs: '1.08rem', md: '1.22rem' },
          color: 'rgba(255,255,255,0.96)'
        }}>
          It's time to break through the plateau. <Box component="span" fontWeight={700}>RepSpheres</Box> unifies, personalizes, and accelerates every step.
        </Typography>
      </Container>
    </Box>
  );
}
