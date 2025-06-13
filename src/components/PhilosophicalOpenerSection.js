import React from 'react';
import { Box, Container, Typography } from '@mui/material';

export default function PhilosophicalOpenerSection() {
  return (
    <Box
      sx={{
        py: { xs: 10, md: 16 },
        position: 'relative',
        background: 'linear-gradient(180deg, rgba(24,24,43,0.98) 0%, rgba(24,24,43,1) 100%)',
        overflow: 'hidden',
      }}
    >
      {/* Background gradient orb */}
      <Box
        sx={{
          position: 'absolute',
          width: '60vw',
          height: '60vw',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(123,66,246,0.1) 0%, rgba(0,255,198,0.05) 50%, transparent 70%)',
          filter: 'blur(100px)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 0,
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box sx={{ textAlign: 'center', maxWidth: 900, mx: 'auto' }}>
          {/* Quote */}
          <Typography
            variant="h3"
            sx={{
              fontFamily: 'Playfair Display, Georgia, serif',
              fontWeight: 400,
              fontSize: { xs: '2rem', md: '3rem', lg: '3.5rem' },
              mb: 6,
              lineHeight: 1.3,
              color: 'rgba(255,255,255,0.95)',
              fontStyle: 'italic',
              position: 'relative',
              '&:before': {
                content: '"\\201C"',
                position: 'absolute',
                left: { xs: -20, md: -60 },
                top: -20,
                fontSize: { xs: '4rem', md: '6rem' },
                color: 'rgba(0,255,198,0.2)',
                fontFamily: 'Georgia, serif',
                zIndex: -1,
              },
              '&:after': {
                content: '"\\201D"',
                position: 'absolute',
                right: { xs: -20, md: -60 },
                bottom: -40,
                fontSize: { xs: '4rem', md: '6rem' },
                color: 'rgba(123,66,246,0.2)',
                fontFamily: 'Georgia, serif',
                zIndex: -1,
              },
            }}
          >
            I don't want AI to make art so I can do the dishes. I want AI to do the dishes so I can make art.
          </Typography>

          {/* Divider */}
          <Box
            sx={{
              width: 100,
              height: 3,
              background: 'linear-gradient(90deg, #00ffc6 0%, #7B42F6 100%)',
              borderRadius: 3,
              margin: '0 auto 4rem',
              boxShadow: '0 0 20px rgba(0,255,198,0.5)',
            }}
          />

          {/* Transition Statement */}
          <Typography
            variant="h5"
            sx={{
              fontFamily: 'DM Sans, Arial, sans-serif',
              fontWeight: 500,
              fontSize: { xs: '1.3rem', md: '1.6rem', lg: '1.8rem' },
              lineHeight: 1.6,
              color: 'rgba(255,255,255,0.9)',
              mb: 3,
            }}
          >
            In medical aesthetics and dental, you're the artist. RepSpheres handles the dishes—the data mining, pattern recognition, and narrative building—so you can focus on crafting relationships that matter.
          </Typography>

          {/* Supporting visual elements */}
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4, mt: 6 }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                opacity: 0.8,
              }}
            >
              <Box
                sx={{
                  width: 60,
                  height: 60,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, rgba(0,255,198,0.2) 0%, rgba(0,255,198,0.1) 100%)',
                  border: '2px solid rgba(0,255,198,0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mb: 2,
                  fontSize: '1.5rem',
                }}
              >
                🎨
              </Box>
              <Typography
                sx={{
                  fontFamily: 'Space Grotesk, Arial, sans-serif',
                  fontSize: '0.9rem',
                  color: 'rgba(255,255,255,0.7)',
                  fontWeight: 600,
                }}
              >
                Your Artistry
              </Typography>
            </Box>

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                color: 'rgba(255,255,255,0.3)',
                fontSize: '2rem',
              }}
            >
              +
            </Box>

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                opacity: 0.8,
              }}
            >
              <Box
                sx={{
                  width: 60,
                  height: 60,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, rgba(123,66,246,0.2) 0%, rgba(123,66,246,0.1) 100%)',
                  border: '2px solid rgba(123,66,246,0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mb: 2,
                  fontSize: '1.5rem',
                }}
              >
                🤖
              </Box>
              <Typography
                sx={{
                  fontFamily: 'Space Grotesk, Arial, sans-serif',
                  fontSize: '0.9rem',
                  color: 'rgba(255,255,255,0.7)',
                  fontWeight: 600,
                }}
              >
                Our Intelligence
              </Typography>
            </Box>

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                color: 'rgba(255,255,255,0.3)',
                fontSize: '2rem',
              }}
            >
              =
            </Box>

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                opacity: 0.8,
              }}
            >
              <Box
                sx={{
                  width: 60,
                  height: 60,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #00ffc6 0%, #7B42F6 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mb: 2,
                  fontSize: '1.5rem',
                  boxShadow: '0 4px 20px rgba(0,255,198,0.3)',
                }}
              >
                🚀
              </Box>
              <Typography
                sx={{
                  fontFamily: 'Space Grotesk, Arial, sans-serif',
                  fontSize: '0.9rem',
                  color: 'rgba(255,255,255,0.7)',
                  fontWeight: 600,
                }}
              >
                Exponential Growth
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
