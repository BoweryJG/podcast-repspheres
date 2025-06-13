import React from 'react';
import { Box, Container, Typography, Grid } from '@mui/material';

export default function CrossroadsSection() {
  return (
    <Box
      sx={{
        py: { xs: 10, md: 16 },
        position: 'relative',
        background: 'linear-gradient(180deg, rgba(24,24,43,1) 0%, rgba(24,24,43,0.98) 100%)',
        overflow: 'hidden',
      }}
    >
      {/* Animated background elements */}
      <Box
        sx={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          opacity: 0.3,
        }}
      >
        {/* Crossroads visual effect */}
        <Box
          sx={{
            position: 'absolute',
            width: '200%',
            height: '2px',
            background: 'linear-gradient(90deg, transparent 0%, #00ffc6 50%, transparent 100%)',
            top: '50%',
            left: '-50%',
            transform: 'rotate(-45deg)',
            animation: 'slideRight 20s linear infinite',
            '@keyframes slideRight': {
              '0%': { transform: 'translateX(-100%) rotate(-45deg)' },
              '100%': { transform: 'translateX(100%) rotate(-45deg)' },
            },
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            width: '200%',
            height: '2px',
            background: 'linear-gradient(90deg, transparent 0%, #7B42F6 50%, transparent 100%)',
            top: '50%',
            left: '-50%',
            transform: 'rotate(45deg)',
            animation: 'slideLeft 20s linear infinite',
            '@keyframes slideLeft': {
              '0%': { transform: 'translateX(100%) rotate(45deg)' },
              '100%': { transform: 'translateX(-100%) rotate(45deg)' },
            },
          }}
        />
      </Box>

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Main headline */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography
            variant="h2"
            sx={{
              fontFamily: "'Space Grotesk', Arial, sans-serif",
              fontWeight: 800,
              fontSize: { xs: '2.5rem', md: '3.5rem', lg: '4.5rem' },
              mb: 4,
              background: 'linear-gradient(135deg, #ff006e 0%, #00ffc6 25%, #3a86ff 50%, #7B42F6 75%, #ff006e 100%)',
              backgroundSize: '200% 200%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              animation: 'gradientShift 8s ease infinite',
              '@keyframes gradientShift': {
                '0%': { backgroundPosition: '0% 50%' },
                '50%': { backgroundPosition: '100% 50%' },
                '100%': { backgroundPosition: '0% 50%' },
              },
            }}
          >
            2025: The Year Everything Changes
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
            We're at an exceptional crossroads. For the first time in our lifetimes, we have access to intelligence expanding exponentially, daily. The question isn't whether AI will transform your industry—it's whether you'll be using it, or losing to those who do.
          </Typography>
        </Box>

        {/* Supporting points */}
        <Grid container spacing={4} sx={{ mt: 4 }}>
          {[
            {
              icon: '📈',
              title: 'The efficiency gap compounds daily',
              color: '#00ffc6',
            },
            {
              icon: '💎',
              title: 'Those with data win. Those without fall behind.',
              color: '#3a86ff',
            },
            {
              icon: '⚡',
              title: 'Your competitors are already moving. Are you?',
              color: '#7B42F6',
            },
          ].map((point, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Box
                sx={{
                  textAlign: 'center',
                  p: 4,
                  borderRadius: '20px',
                  background: 'rgba(40, 20, 70, 0.3)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  border: '1px solid',
                  borderColor: `${point.color}33`,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    background: 'rgba(40, 20, 70, 0.5)',
                    borderColor: `${point.color}66`,
                    boxShadow: `0 10px 30px ${point.color}22`,
                  },
                }}
              >
                <Box
                  sx={{
                    fontSize: '3rem',
                    mb: 2,
                    filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))',
                  }}
                >
                  {point.icon}
                </Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: "'Space Grotesk', Arial, sans-serif",
                    fontWeight: 600,
                    fontSize: '1.3rem',
                    color: point.color,
                    textShadow: `0 0 20px ${point.color}66`,
                  }}
                >
                  {point.title}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* Visual separator with animated elements */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mt: 10,
            mb: 6,
            position: 'relative',
          }}
        >
          <Box
            sx={{
              width: '100%',
              height: '1px',
              background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)',
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              width: 20,
              height: 20,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #00ffc6 0%, #7B42F6 100%)',
              boxShadow: '0 0 30px rgba(0,255,198,0.6)',
              animation: 'pulse 2s ease-in-out infinite',
              '@keyframes pulse': {
                '0%, 100%': { transform: 'scale(1)', opacity: 0.8 },
                '50%': { transform: 'scale(1.2)', opacity: 1 },
              },
            }}
          />
        </Box>

        {/* Call to action question */}
        <Box sx={{ textAlign: 'center' }}>
          <Typography
            variant="h4"
            sx={{
              fontFamily: "'Space Grotesk', Arial, sans-serif",
              fontWeight: 700,
              fontSize: { xs: '1.8rem', md: '2.5rem' },
              color: 'rgba(255,255,255,0.95)',
              mb: 2,
            }}
          >
            Which side of history will you be on?
          </Typography>
          <Typography
            sx={{
              fontFamily: "'DM Sans', Arial, sans-serif",
              fontSize: '1.2rem',
              color: 'rgba(255,255,255,0.7)',
              fontStyle: 'italic',
            }}
          >
            The choice you make today defines your tomorrow.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
