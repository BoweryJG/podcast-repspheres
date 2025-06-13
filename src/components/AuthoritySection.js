import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Grid, Chip, Paper } from '@mui/material';

export default function AuthoritySection() {
  const [visibleStats, setVisibleStats] = useState([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setVisibleStats(prev => {
        if (prev.length < 4) {
          return [...prev, prev.length];
        }
        return prev;
      });
    }, 600);

    return () => clearInterval(timer);
  }, []);

  return (
    <Box
      sx={{
        py: { xs: 10, md: 16 },
        position: 'relative',
        background: 'linear-gradient(180deg, rgba(16,21,62,1) 0%, rgba(24,24,43,0.95) 100%)',
        overflow: 'hidden',
      }}
    >
      {/* Background effects */}
      <Box
        sx={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          background: 'radial-gradient(ellipse at 30% 50%, rgba(123,66,246,0.15) 0%, transparent 70%)',
          zIndex: 0,
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Authority Badge */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Chip
            label="CATEGORY CREATORS • NOT OUTSIDERS"
            sx={{
              backgroundColor: 'rgba(0,255,198,0.15)',
              color: '#00ffc6',
              border: '2px solid rgba(0,255,198,0.4)',
              fontFamily: 'Space Grotesk, Arial, sans-serif',
              fontWeight: 800,
              fontSize: '1rem',
              letterSpacing: '0.05em',
              py: 3,
              px: 4,
              mb: 5,
              boxShadow: '0 8px 32px rgba(0,255,198,0.2)',
            }}
          />
          
          <Typography
            variant="h1"
            sx={{
              fontFamily: 'Space Grotesk, Arial, sans-serif',
              fontWeight: 900,
              fontSize: { xs: '2.8rem', md: '4rem', lg: '5.5rem' },
              lineHeight: 0.9,
              color: '#FFFFFF',
              mb: 4,
              textShadow: '0 4px 30px rgba(0,0,0,0.7)',
            }}
          >
            Built by Industry
            <br />
            <Box
              component="span"
              sx={{
                background: 'linear-gradient(90deg, #00ffc6 0%, #7B42F6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Veterans
            </Box>
          </Typography>
          
          <Typography
            sx={{
              fontFamily: 'DM Sans, Arial, sans-serif',
              fontSize: { xs: '1.4rem', md: '1.8rem' },
              color: 'rgba(255,255,255,0.9)',
              maxWidth: 800,
              mx: 'auto',
              lineHeight: 1.5,
              fontWeight: 500,
            }}
          >
            While others guess what you need, we've lived it. 15 years building $2B+ categories 
            gives us insights no outside tech company can match.
          </Typography>
        </Box>

        {/* Authority Timeline */}
        <Grid container spacing={6} sx={{ mb: 10 }}>
          {[
            {
              year: '2010',
              title: 'Zeltiq/CoolSculpting Pioneer',
              description: 'Original founding team that built the aesthetic medicine revolution',
              metric: '$2B+',
              label: 'Category Created',
              gradient: 'linear-gradient(135deg, #00ffc6 0%, #00d4a8 100%)',
            },
            {
              year: '2010-2025',
              title: '15 Years Industry Data',
              description: 'Deep datasets spanning aesthetic medicine and dental markets',
              metric: '1M+',
              label: 'Data Points',
              gradient: 'linear-gradient(135deg, #7B42F6 0%, #5B32D6 100%)',
            },
            {
              year: '2023',
              title: 'AI Implementation at Scale',
              description: 'Advanced robotics and AI integration with Neocis + NVIDIA',
              metric: '300+',
              label: 'AI Models',
              gradient: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)',
            },
            {
              year: '2025',
              title: 'Intelligence Democratization',
              description: 'Making enterprise-level sales intelligence accessible to every rep',
              metric: 'NOW',
              label: 'RepSpheres',
              gradient: 'linear-gradient(135deg, #3a86ff 0%, #2968db 100%)',
            },
          ].map((milestone, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Paper
                elevation={0}
                sx={{
                  background: 'rgba(40, 20, 70, 0.4)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 4,
                  p: 4,
                  height: '100%',
                  transform: visibleStats.includes(index) ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.9)',
                  opacity: visibleStats.includes(index) ? 1 : 0,
                  transition: `all 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.2}s`,
                  '&:hover': {
                    transform: 'translateY(-8px) scale(1.02)',
                    borderColor: 'rgba(0,255,198,0.4)',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
                  },
                }}
              >
                <Typography
                  sx={{
                    fontFamily: 'Space Grotesk, Arial, sans-serif',
                    fontSize: '1rem',
                    fontWeight: 700,
                    color: '#00ffc6',
                    letterSpacing: '0.1em',
                    mb: 2,
                    textTransform: 'uppercase',
                  }}
                >
                  {milestone.year}
                </Typography>
                
                <Typography
                  variant="h5"
                  sx={{
                    fontFamily: 'Space Grotesk, Arial, sans-serif',
                    fontWeight: 800,
                    fontSize: '1.4rem',
                    color: 'rgba(255,255,255,0.95)',
                    mb: 2,
                    lineHeight: 1.2,
                  }}
                >
                  {milestone.title}
                </Typography>
                
                <Typography
                  sx={{
                    fontFamily: 'DM Sans, Arial, sans-serif',
                    fontSize: '1rem',
                    color: 'rgba(255,255,255,0.8)',
                    lineHeight: 1.5,
                    mb: 3,
                  }}
                >
                  {milestone.description}
                </Typography>
                
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    p: 2,
                    borderRadius: 2,
                    background: milestone.gradient,
                    color: '#000',
                  }}
                >
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography
                      sx={{
                        fontFamily: 'Space Grotesk, Arial, sans-serif',
                        fontWeight: 900,
                        fontSize: '1.8rem',
                        lineHeight: 1,
                        mb: 0.5,
                      }}
                    >
                      {milestone.metric}
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: 'DM Sans, Arial, sans-serif',
                        fontSize: '0.9rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                      }}
                    >
                      {milestone.label}
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Credibility Statement */}
        <Box
          sx={{
            p: 8,
            borderRadius: '32px',
            background: 'linear-gradient(135deg, rgba(0,255,198,0.08) 0%, rgba(123,66,246,0.08) 100%)',
            border: '2px solid rgba(255,255,255,0.15)',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontFamily: 'Space Grotesk, Arial, sans-serif',
              fontWeight: 800,
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              color: '#FFFFFF',
              mb: 4,
            }}
          >
            This Isn't Another Tech Company
          </Typography>
          
          <Typography
            sx={{
              fontFamily: 'DM Sans, Arial, sans-serif',
              fontSize: { xs: '1.3rem', md: '1.6rem' },
              color: 'rgba(255,255,255,0.9)',
              maxWidth: 900,
              mx: 'auto',
              mb: 6,
              lineHeight: 1.6,
              fontWeight: 500,
            }}
          >
            We didn't study your industry from the outside. We built it from the inside. 
            Every feature in RepSpheres comes from 15 years of real-world experience.
          </Typography>
          
          <Grid container spacing={6} justifyContent="center">
            {[
              { metric: '15+', label: 'Years in aesthetic & dental', color: '#00ffc6' },
              { metric: '$2B+', label: 'In category creation', color: '#7B42F6' },
              { metric: '300+', label: 'AI models integrated', color: '#FF6B35' },
              { metric: '1M+', label: 'Data points analyzed', color: '#3a86ff' },
            ].map((stat, index) => (
              <Grid item xs={6} sm={3} key={index}>
                <Box>
                  <Typography
                    sx={{
                      fontFamily: 'Space Grotesk, Arial, sans-serif',
                      fontSize: '3rem',
                      fontWeight: 900,
                      color: stat.color,
                      mb: 1,
                      lineHeight: 1,
                    }}
                  >
                    {stat.metric}
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: 'DM Sans, Arial, sans-serif',
                      fontSize: '1rem',
                      color: 'rgba(255,255,255,0.7)',
                      fontWeight: 600,
                    }}
                  >
                    {stat.label}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Trust Statement */}
        <Box sx={{ textAlign: 'center', mt: 6 }}>
          <Typography
            sx={{
              fontFamily: 'Playfair Display, Georgia, serif',
              fontStyle: 'italic',
              fontSize: { xs: '1.8rem', md: '2.3rem' },
              color: 'rgba(255,255,255,0.95)',
              maxWidth: 900,
              mx: 'auto',
              lineHeight: 1.4,
              fontWeight: 600,
            }}
          >
            "We didn't build RepSpheres because we understand technology. 
            We built it because we understand your world."
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}