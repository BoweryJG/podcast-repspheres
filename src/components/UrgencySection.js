import React from 'react';
import { Box, Container, Typography, Grid } from '@mui/material';

export default function UrgencySection() {
  return (
    <Box
      sx={{
        py: { xs: 10, md: 16 },
        position: 'relative',
        background: 'linear-gradient(180deg, rgba(24,24,43,1) 0%, rgba(24,24,43,0.98) 100%)',
        overflow: 'hidden',
      }}
    >
      {/* Animated clock/time effect in background */}
      <Box
        sx={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          opacity: 0.05,
        }}
      >
        {/* Moving time indicators */}
        {Array.from({ length: 10 }).map((_, i) => (
          <Box
            key={i}
            sx={{
              position: 'absolute',
              width: '2px',
              height: '100%',
              background: 'linear-gradient(180deg, transparent 0%, #00ffc6 50%, transparent 100%)',
              left: `${i * 10}%`,
              animation: `timeFlow ${10 + i * 2}s linear infinite`,
              '@keyframes timeFlow': {
                '0%': { transform: 'translateY(-100%)' },
                '100%': { transform: 'translateY(100%)' },
              },
            }}
          />
        ))}
      </Box>

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Main content */}
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
                background: 'linear-gradient(90deg, #ff006e 0%, #00ffc6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              The Future Has Already Started
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
            While others debate AI's potential, forward-thinking teams are already closing deals with intelligence their competitors can't match. The infrastructure you build in 2025 determines your position for the next decade.
          </Typography>
        </Box>

        {/* Timeline visualization */}
        <Box sx={{ position: 'relative', mb: 10 }}>
          <Box
            sx={{
              position: 'absolute',
              width: '100%',
              height: '2px',
              background: 'linear-gradient(90deg, #ff006e 0%, #00ffc6 50%, #7B42F6 100%)',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 0,
            }}
          />
          
          <Grid container spacing={4} sx={{ position: 'relative', zIndex: 1 }}>
            {[
              {
                time: 'Yesterday',
                title: 'Manual processes',
                description: 'Spreadsheets, cold calls, hoping for the best',
                status: 'past',
                color: 'rgba(255,255,255,0.3)',
              },
              {
                time: 'Today',
                title: 'The turning point',
                description: 'Early adopters gaining exponential advantage',
                status: 'present',
                color: '#00ffc6',
              },
              {
                time: 'Tomorrow',
                title: 'AI-powered dominance',
                description: 'Those with data win. Those without become irrelevant',
                status: 'future',
                color: '#7B42F6',
              },
            ].map((phase, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Box
                  sx={{
                    textAlign: 'center',
                    position: 'relative',
                  }}
                >
                  {/* Timeline dot */}
                  <Box
                    sx={{
                      width: 24,
                      height: 24,
                      borderRadius: '50%',
                      background: phase.status === 'present' 
                        ? 'linear-gradient(135deg, #00ffc6 0%, #7B42F6 100%)'
                        : phase.color,
                      margin: '0 auto 3rem',
                      position: 'relative',
                      boxShadow: phase.status === 'present' 
                        ? '0 0 30px rgba(0,255,198,0.6)'
                        : 'none',
                      '&:before': phase.status === 'present' ? {
                        content: '""',
                        position: 'absolute',
                        inset: -8,
                        borderRadius: '50%',
                        border: '2px solid',
                        borderColor: '#00ffc6',
                        animation: 'pulse 2s ease-in-out infinite',
                        '@keyframes pulse': {
                          '0%, 100%': { opacity: 0, transform: 'scale(1)' },
                          '50%': { opacity: 1, transform: 'scale(1.2)' },
                        },
                      } : {},
                    }}
                  />
                  
                  <Typography
                    variant="overline"
                    sx={{
                      fontFamily: "'Space Grotesk', Arial, sans-serif",
                      fontSize: '0.9rem',
                      fontWeight: 600,
                      color: phase.color,
                      letterSpacing: '0.1em',
                      mb: 1,
                      display: 'block',
                    }}
                  >
                    {phase.time}
                  </Typography>
                  
                  <Typography
                    variant="h5"
                    sx={{
                      fontFamily: "'Space Grotesk', Arial, sans-serif",
                      fontWeight: 700,
                      fontSize: '1.5rem',
                      color: phase.status === 'past' ? 'rgba(255,255,255,0.5)' : '#fff',
                      mb: 1,
                      textDecoration: phase.status === 'past' ? 'line-through' : 'none',
                    }}
                  >
                    {phase.title}
                  </Typography>
                  
                  <Typography
                    sx={{
                      fontFamily: "'DM Sans', Arial, sans-serif",
                      fontSize: '1rem',
                      color: phase.status === 'past' ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.8)',
                      lineHeight: 1.5,
                    }}
                  >
                    {phase.description}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Urgency message */}
        <Box
          sx={{
            p: 6,
            borderRadius: '30px',
            background: 'linear-gradient(135deg, rgba(255,0,110,0.1) 0%, rgba(0,255,198,0.1) 100%)',
            border: '2px solid',
            borderImage: 'linear-gradient(135deg, #ff006e, #00ffc6) 1',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              background: 'radial-gradient(circle at 50% 50%, rgba(255,0,110,0.1) 0%, transparent 70%)',
              animation: 'urgencyPulse 3s ease-in-out infinite',
              '@keyframes urgencyPulse': {
                '0%, 100%': { opacity: 0.3, transform: 'scale(1)' },
                '50%': { opacity: 0.6, transform: 'scale(1.1)' },
              },
            }}
          />
          
          <Typography
            variant="h3"
            sx={{
              fontFamily: "'Space Grotesk', Arial, sans-serif",
              fontWeight: 700,
              fontSize: { xs: '2rem', md: '2.8rem' },
              mb: 3,
              position: 'relative',
              zIndex: 1,
              color: '#fff',
            }}
          >
            Every Day You Wait, The Gap Widens
          </Typography>
          
          <Grid container spacing={4} sx={{ position: 'relative', zIndex: 1 }}>
            {[
              { number: '47%', label: 'Of sales teams already using AI tools' },
              { number: '3.2x', label: 'Performance gap between AI users and non-users' },
              { number: '18mo', label: 'Average time to catch up once behind' },
            ].map((stat, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Box>
                  <Typography
                    sx={{
                      fontFamily: "'Space Grotesk', Arial, sans-serif",
                      fontSize: '3.5rem',
                      fontWeight: 800,
                      background: 'linear-gradient(90deg, #ff006e 0%, #00ffc6 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      mb: 1,
                    }}
                  >
                    {stat.number}
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: "'DM Sans', Arial, sans-serif",
                      fontSize: '1rem',
                      color: 'rgba(255,255,255,0.8)',
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
