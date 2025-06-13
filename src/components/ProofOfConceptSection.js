import React from 'react';
import { Box, Container, Typography, Grid } from '@mui/material';

export default function ProofOfConceptSection() {
  return (
    <Box
      sx={{
        py: { xs: 10, md: 16 },
        position: 'relative',
        background: 'linear-gradient(180deg, rgba(24,24,43,0.98) 0%, rgba(24,24,43,1) 100%)',
        overflow: 'hidden',
      }}
    >
      {/* Background pattern */}
      <Box
        sx={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          opacity: 0.03,
          backgroundImage: `
            radial-gradient(circle at 20% 50%, rgba(0,255,198,0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 50%, rgba(123,66,246,0.3) 0%, transparent 50%)
          `,
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
              From Zeltiq Pioneer to
            </Box>
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
              Industry Architect
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
            Built by someone who's been in your shoes, understands your challenges, and has spent 15 years perfecting the solution.
          </Typography>
        </Box>

        {/* Journey timeline */}
        <Grid container spacing={6} sx={{ mb: 10 }}>
          {[
            {
              year: '2010',
              title: 'Original Coolsculpting Team',
              description: 'Part of the pioneering Zeltiq team that revolutionized aesthetic medicine',
              icon: '❄️',
              achievement: 'Helped build a $2B category',
            },
            {
              year: '2010-2025',
              title: '15 Years of Data Architecture',
              description: 'Building category-defining datasets and understanding what drives success',
              icon: '📊',
              achievement: '1M+ data points collected',
            },
            {
              year: '2023',
              title: 'Neocis Robotics + NVIDIA',
              description: 'Bringing cutting-edge AI to dental robotics and surgical precision',
              icon: '🤖',
              achievement: 'AI-powered surgical planning',
            },
            {
              year: 'Now',
              title: 'Democratizing Elite Intelligence',
              description: 'Making enterprise-level sales intelligence accessible to every rep',
              icon: '🚀',
              achievement: 'RepSpheres launches',
            },
          ].map((milestone, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Box
                sx={{
                  display: 'flex',
                  gap: 3,
                  p: 4,
                  borderRadius: '20px',
                  background: 'rgba(40, 20, 70, 0.3)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                    borderColor: 'rgba(0,255,198,0.3)',
                  },
                }}
              >
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: '20px',
                    background: 'linear-gradient(135deg, rgba(0,255,198,0.2) 0%, rgba(123,66,246,0.2) 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '2.5rem',
                    flexShrink: 0,
                  }}
                >
                  {milestone.icon}
                </Box>
                
                <Box>
                  <Typography
                    variant="overline"
                    sx={{
                      fontFamily: "'Space Grotesk', Arial, sans-serif",
                      fontSize: '0.9rem',
                      fontWeight: 600,
                      color: '#00ffc6',
                      letterSpacing: '0.1em',
                      display: 'block',
                      mb: 0.5,
                    }}
                  >
                    {milestone.year}
                  </Typography>
                  
                  <Typography
                    variant="h5"
                    sx={{
                      fontFamily: "'Space Grotesk', Arial, sans-serif",
                      fontWeight: 700,
                      fontSize: '1.5rem',
                      color: 'rgba(255,255,255,0.95)',
                      mb: 1,
                    }}
                  >
                    {milestone.title}
                  </Typography>
                  
                  <Typography
                    sx={{
                      fontFamily: "'DM Sans', Arial, sans-serif",
                      fontSize: '1rem',
                      color: 'rgba(255,255,255,0.7)',
                      lineHeight: 1.5,
                      mb: 2,
                    }}
                  >
                    {milestone.description}
                  </Typography>
                  
                  <Box
                    sx={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 1,
                      px: 2,
                      py: 0.5,
                      borderRadius: '100px',
                      background: 'rgba(0,255,198,0.1)',
                      border: '1px solid rgba(0,255,198,0.3)',
                    }}
                  >
                    <Box
                      sx={{
                        width: 6,
                        height: 6,
                        borderRadius: '50%',
                        background: '#00ffc6',
                      }}
                    />
                    <Typography
                      sx={{
                        fontFamily: "'DM Sans', Arial, sans-serif",
                        fontSize: '0.85rem',
                        color: '#00ffc6',
                        fontWeight: 500,
                      }}
                    >
                      {milestone.achievement}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* Credibility statement */}
        <Box
          sx={{
            p: 6,
            borderRadius: '30px',
            background: 'linear-gradient(135deg, rgba(0,255,198,0.05) 0%, rgba(123,66,246,0.05) 100%)',
            border: '1px solid rgba(255,255,255,0.1)',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
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
            Built by Industry Veterans, for Industry Leaders
          </Typography>
          
          <Typography
            sx={{
              fontFamily: "'DM Sans', Arial, sans-serif",
              fontSize: '1.2rem',
              color: 'rgba(255,255,255,0.8)',
              maxWidth: 800,
              mx: 'auto',
              mb: 4,
              lineHeight: 1.6,
            }}
          >
            This isn't another tech company trying to understand medical sales. This is deep industry expertise meeting cutting-edge technology.
          </Typography>
          
          <Grid container spacing={4} justifyContent="center">
            {[
              { metric: '15+', label: 'Years in aesthetic & dental' },
              { metric: '300+', label: 'AI models integrated' },
              { metric: '$2B+', label: 'In category creation' },
              { metric: '1M+', label: 'Data points analyzed' },
            ].map((stat, index) => (
              <Grid item xs={6} sm={3} key={index}>
                <Box>
                  <Typography
                    sx={{
                      fontFamily: "'Space Grotesk', Arial, sans-serif",
                      fontSize: '2.5rem',
                      fontWeight: 800,
                      background: 'linear-gradient(90deg, #00ffc6 0%, #7B42F6 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      mb: 0.5,
                    }}
                  >
                    {stat.metric}
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: "'DM Sans', Arial, sans-serif",
                      fontSize: '0.9rem',
                      color: 'rgba(255,255,255,0.6)',
                    }}
                  >
                    {stat.label}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}
