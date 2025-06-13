import React from 'react';
import { Box, Container, Typography } from '@mui/material';

const timelineSteps = [
  {
    marker: '1',
    title: 'Sphere Creation',
    content: 'Create a Sphere for any target, account, or opportunity—this becomes your workspace for focused intelligence and engagement.'
  },
  {
    marker: '2',
    title: 'Data Ingestion & Enrichment',
    content: 'Automatically pull in and enrich data from your CRM, web, email, and other connected sources.'
  },
  {
    marker: '3',
    title: 'Psychological Trigger Mapping',
    content: 'RepSpheres analyzes all available data to identify the psychological motivators and triggers most likely to drive action—leveraging a library of 150+ behavioral science principles.'
  },
  {
    marker: '4',
    title: 'Actionable Reports & Outreach',
    content: 'Generate physician-ready reports and schedule automated campaigns aligned to each target\'s psychological fingerprint.'
  },
  {
    marker: '5',
    title: 'Feedback & Optimization',
    content: 'Results and engagement data flow back into the Sphere, powering continuous learning and smarter future actions.'
  },
];

export default function TimelineSection() {
  return (
    <Box id="timeline" sx={{
      py: { xs: 8, md: 12 },
      px: 0,
      position: 'relative',
      zIndex: 1,
    }}>
      <Container maxWidth="md">
        <Typography variant="h2" sx={{ fontWeight: 800, textAlign: 'center', mb: 2 }}>
          How RepSpheres Works
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
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: { xs: 4, md: 5 },
          alignItems: 'stretch',
        }}>
          {timelineSteps.map((step, idx) => (
            <Box key={step.marker} sx={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 3,
              mb: 0,
            }}>
              <Box sx={{
                minWidth: 48,
                minHeight: 48,
                background: 'linear-gradient(135deg, #7B42F6 0%, #00ffc6 100%)',
                color: '#fff',
                fontWeight: 900,
                fontSize: 28,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 16px rgba(123,66,246,0.18)',
                mt: 1,
                mr: { xs: 2, md: 3 },
                flexShrink: 0,
              }}>{step.marker}</Box>
              <Box sx={{
                flex: 1,
                bgcolor: 'rgba(40, 20, 70, 0.55)',
                borderRadius: 4,
                boxShadow: '0 4px 24px rgba(123,66,246,0.10)',
                p: { xs: 2.5, md: 3.5 },
                mb: 0,
                border: '1.5px solid rgba(123,66,246,0.13)',
              }}>
                <Typography variant="h5" fontWeight={700} mb={1}>{step.title}</Typography>
                <Typography sx={{ color: 'rgba(255,255,255,0.92)' }}>{step.content}</Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
