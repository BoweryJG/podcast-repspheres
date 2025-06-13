import React from 'react';
import { Box, Container, Typography } from '@mui/material';

const deploymentPhases = [
  {
    marker: '1',
    phase: 'Weeks 1-2',
    title: 'Phase 1: Stack Audit & Trigger Mapping',
    content: "We analyze your existing tools and map your ideal customer's psychological triggers."
  },
  {
    marker: '2',
    phase: 'Weeks 3-4',
    title: 'Phase 2: Territory Intelligence Sync',
    content: 'We connect your data sources and begin enriching leads with psychological insights.'
  },
  {
    marker: '3',
    phase: 'Week 5',
    title: 'Phase 3: Automations & Reporting',
    content: 'Link outreach channels and generate actionable physician reports from your data.'
  },
  {
    marker: '4',
    phase: 'Week 6',
    title: 'Phase 4: Sales Coaching & Launch',
    content: 'Train your team and start deploying trigger-based campaigns.'
  },
  {
    marker: '5',
    phase: 'Ongoing',
    title: 'Phase 5: Continuous Optimization',
    content: ".We monitor results, refine triggers, and continuously improve the system's effectiveness."
  },
];

export default function DeploymentSection() {
  return (
    <Box id="deployment" sx={{
      py: { xs: 8, md: 12 },
      px: 0,
      position: 'relative',
      zIndex: 1,
    }}>
      <Container maxWidth="md">
        <Typography variant="h2" sx={{ fontWeight: 800, textAlign: 'center', mb: 2 }}>
          Deployment Timeline
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
          {deploymentPhases.map((phase, idx) => (
            <Box key={phase.marker} sx={{
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
              }}>{phase.marker}</Box>
              <Box sx={{
                flex: 1,
                bgcolor: 'rgba(40, 20, 70, 0.55)',
                borderRadius: 4,
                boxShadow: '0 4px 24px rgba(123,66,246,0.10)',
                p: { xs: 2.5, md: 3.5 },
                mb: 0,
                border: '1.5px solid rgba(123,66,246,0.13)',
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                  <Box sx={{
                    display: 'inline-block',
                    bgcolor: 'rgba(0,255,198,0.13)',
                    color: '#00ffc6',
                    fontWeight: 700,
                    fontSize: '1rem',
                    px: 2,
                    py: 0.5,
                    borderRadius: 2,
                    letterSpacing: 1,
                  }}>{phase.phase}</Box>
                </Box>
                <Typography variant="h5" fontWeight={700} mb={1}>{phase.title}</Typography>
                <Typography sx={{ color: 'rgba(255,255,255,0.92)' }}>{phase.content}</Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
