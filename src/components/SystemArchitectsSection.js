import React from 'react';
import { Box, Container, Typography, Grid } from '@mui/material';

export default function SystemArchitectsSection() {
  return (
    <Box
      sx={{
        py: { xs: 10, md: 16 },
        position: 'relative',
        background: 'linear-gradient(180deg, rgba(24,24,43,1) 0%, rgba(24,24,43,0.98) 100%)',
        overflow: 'hidden',
      }}
    >
      {/* Architectural blueprint effect in background */}
      <Box
        sx={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          opacity: 0.05,
          backgroundImage: `
            linear-gradient(rgba(0,255,198,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,255,198,0.3) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          animation: 'drift 20s linear infinite',
          '@keyframes drift': {
            '0%': { transform: 'translate(0, 0)' },
            '100%': { transform: 'translate(50px, 50px)' },
          },
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Main headline */}
        <Box sx={{ textAlign: 'center', mb: 10 }}>
          <Typography
            variant="h2"
            sx={{
              fontFamily: "'Space Grotesk', Arial, sans-serif",
              fontWeight: 800,
              fontSize: { xs: '2.5rem', md: '3.5rem', lg: '4rem' },
              mb: 4,
              lineHeight: 1.2,
            }}
          >
            <Box
              component="span"
              sx={{
                color: 'rgba(255,255,255,0.95)',
              }}
            >
              We Don't Send Mass Emails.
            </Box>
            <br />
            <Box
              component="span"
              sx={{
                background: 'linear-gradient(90deg, #7B42F6 0%, #00ffc6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              We Build Universes.
            </Box>
          </Typography>

          <Typography
            variant="h5"
            sx={{
              fontFamily: "'DM Sans', Arial, sans-serif",
              fontWeight: 500,
              fontSize: { xs: '1.2rem', md: '1.5rem', lg: '1.7rem' },
              lineHeight: 1.6,
              color: 'rgba(255,255,255,0.9)',
              maxWidth: 900,
              mx: 'auto',
            }}
          >
            RepSpheres doesn't blast thousands of cold prospects. We're system architects who build narratives around the principles your clients hold true, creating entire universes that show repeated exponential growth through genuine rapport.
          </Typography>
        </Box>

        {/* Key differentiators */}
        <Grid container spacing={4}>
          {[
            {
              icon: '🎯',
              title: 'Narrative-driven engagement, not spray-and-pray',
              description: 'Every interaction is crafted around your client\'s unique story and values',
              gradient: 'linear-gradient(135deg, #00ffc6 0%, #00d4a8 100%)',
            },
            {
              icon: '🎮',
              title: 'Deep, long-game goal attainment',
              description: 'Strategic relationship building that compounds over months and years',
              gradient: 'linear-gradient(135deg, #3a86ff 0%, #2968db 100%)',
            },
            {
              icon: '🌟',
              title: '5-year spheres of influence with key opinion leaders',
              description: 'Build lasting connections with the people who shape your industry',
              gradient: 'linear-gradient(135deg, #7B42F6 0%, #5B32D6 100%)',
            },
            {
              icon: '📈',
              title: 'Intelligence that compounds, relationships that endure',
              description: 'Every data point strengthens your position and deepens your connections',
              gradient: 'linear-gradient(135deg, #ff006e 0%, #d4005a 100%)',
            },
          ].map((item, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Box
                sx={{
                  p: 4,
                  height: '100%',
                  borderRadius: '20px',
                  background: 'rgba(40, 20, 70, 0.3)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  overflow: 'hidden',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                    '& .icon-box': {
                      transform: 'scale(1.1) rotate(5deg)',
                    },
                  },
                }}
              >
                <Box
                  className="icon-box"
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: '20px',
                    background: item.gradient,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '2.5rem',
                    mb: 3,
                    boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
                    transition: 'transform 0.3s ease',
                  }}
                >
                  {item.icon}
                </Box>
                
                <Typography
                  variant="h5"
                  sx={{
                    fontFamily: "'Space Grotesk', Arial, sans-serif",
                    fontWeight: 700,
                    fontSize: '1.5rem',
                    mb: 2,
                    color: 'rgba(255,255,255,0.95)',
                  }}
                >
                  {item.title}
                </Typography>
                
                <Typography
                  sx={{
                    fontFamily: "'DM Sans', Arial, sans-serif",
                    fontSize: '1.1rem',
                    color: 'rgba(255,255,255,0.7)',
                    lineHeight: 1.6,
                  }}
                >
                  {item.description}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* Visual representation of universe building */}
        <Box
          sx={{
            mt: 10,
            p: 6,
            borderRadius: '30px',
            background: 'rgba(40, 20, 70, 0.4)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Orbiting elements */}
          <Box
            sx={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              top: 0,
              left: 0,
            }}
          >
            {[0, 1, 2].map((i) => (
              <Box
                key={i}
                sx={{
                  position: 'absolute',
                  width: 300,
                  height: 300,
                  borderRadius: '50%',
                  border: '1px solid',
                  borderColor: i === 0 ? 'rgba(0,255,198,0.2)' : i === 1 ? 'rgba(58,134,255,0.2)' : 'rgba(123,66,246,0.2)',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  animation: `orbit${i} ${20 + i * 5}s linear infinite`,
                  [`@keyframes orbit${i}`]: {
                    '0%': { transform: `translate(-50%, -50%) rotate(${i * 120}deg)` },
                    '100%': { transform: `translate(-50%, -50%) rotate(${i * 120 + 360}deg)` },
                  },
                }}
              >
                <Box
                  sx={{
                    position: 'absolute',
                    width: 20,
                    height: 20,
                    borderRadius: '50%',
                    background: i === 0 ? '#00ffc6' : i === 1 ? '#3a86ff' : '#7B42F6',
                    top: -10,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    boxShadow: `0 0 20px ${i === 0 ? '#00ffc6' : i === 1 ? '#3a86ff' : '#7B42F6'}`,
                  }}
                />
              </Box>
            ))}
          </Box>

          <Box sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
            <Typography
              variant="h3"
              sx={{
                fontFamily: "'Space Grotesk', Arial, sans-serif",
                fontWeight: 700,
                fontSize: { xs: '2rem', md: '2.5rem' },
                mb: 3,
                color: 'rgba(255,255,255,0.95)',
              }}
            >
              Your Universe Awaits
            </Typography>
            
            <Typography
              sx={{
                fontFamily: "'DM Sans', Arial, sans-serif",
                fontSize: '1.2rem',
                color: 'rgba(255,255,255,0.8)',
                maxWidth: 600,
                mx: 'auto',
              }}
            >
              Stop sending emails into the void. Start building gravitational pull that brings the right opportunities to you.
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
