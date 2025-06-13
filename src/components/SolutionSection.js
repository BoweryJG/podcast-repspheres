import React from 'react';
import { Box, Container, Typography, Button } from '@mui/material';

const solutions = [
  {
    icon: '⚡',
    title: 'Lead Qualification in Seconds',
    content: 'Your hundred most qualified prospects delivered instantly—no more manual research.'
  },
  {
    icon: '📊',
    title: 'Procedure Intelligence',
    content: 'Interactive dashboard mapping 300+ CDT/CPT codes with pricing and market growth.'
  },
  {
    icon: '🚀',
    title: 'Automated Outreach',
    content: 'Trigger personalized emails and tasks the moment new intelligence lands.'
  }
];

export default function SolutionSection() {
  return (
    <Box id="solution" sx={{
      py: { xs: 8, md: 12 },
      px: 0,
      position: 'relative',
      zIndex: 1,
      background: 'radial-gradient(circle at 30% 50%, rgba(0, 255, 198, 0.1), transparent 70%), radial-gradient(circle at 70% 50%, rgba(123, 66, 246, 0.1), transparent 70%)',
    }}>
      <Container maxWidth="md">
        <Typography variant="h2" sx={{ fontWeight: 800, textAlign: 'center', mb: 2 }}>
          Give Your Sales Team an Unfair Advantage
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
          Automate research, surface procedure insights, and send targeted outreach—all from one streamlined hub.
        </Typography>
        <Box sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: { xs: 4, md: 5 },
          justifyContent: 'center',
          alignItems: 'stretch',
          mb: 5
        }}>
          {solutions.map((s, idx) => (
            <Box
              key={s.title}
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
              <Box sx={{ fontSize: 42, mb: 1.5 }}>{s.icon}</Box>
              <Typography variant="h5" fontWeight={700} mb={1}>{s.title}</Typography>
              <Typography sx={{ color: 'rgba(255,255,255,0.90)' }}>{s.content}</Typography>
            </Box>
          ))}
        </Box>
        <Box sx={{ textAlign: 'center', mt: 6 }}>
          <Button
            variant="contained"
            href="#schedule"
            size="large"
            sx={{
              px: 5,
              py: 1.7,
              fontWeight: 700,
              fontSize: '1.1rem',
              borderRadius: '30px',
              background: 'linear-gradient(90deg, #7B42F6 0%, #00ffc6 100%)',
              boxShadow: '0 4px 24px rgba(123,66,246,0.18)',
              color: '#fff',
              transition: 'all 0.22s',
              '&:hover': {
                background: 'linear-gradient(90deg, #5B3CFF 0%, #00ffc6 100%)',
                boxShadow: '0 8px 36px rgba(123,66,246,0.22)',
                color: '#fff',
                transform: 'translateY(-2px) scale(1.04)'
              }
            }}
          >
            Start Winning More Deals
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
