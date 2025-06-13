import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Button, Grid } from '@mui/material';
import { Rocket, TrendingUp, Timer } from '@mui/icons-material';

export default function CTASection() {
  const [timeLeft, setTimeLeft] = useState({ days: 14, hours: 23, minutes: 59 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { days, hours, minutes } = prev;
        
        if (minutes > 0) {
          minutes--;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
        } else if (days > 0) {
          days--;
          hours = 23;
          minutes = 59;
        }
        
        return { days, hours, minutes };
      });
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  return (
    <Box 
      id="cta" 
      sx={{
        py: { xs: 10, md: 16 },
        position: 'relative',
        background: 'linear-gradient(180deg, rgba(24,24,43,0.98) 0%, rgba(24,24,43,1) 100%)',
        overflow: 'hidden',
      }}
    >
      {/* Background effects */}
      <Box
        sx={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          background: 'radial-gradient(circle at 50% 50%, rgba(123,66,246,0.15) 0%, transparent 60%)',
          zIndex: 0,
        }}
      />
      
      {/* Animated particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <Box
          key={i}
          sx={{
            position: 'absolute',
            width: Math.random() * 4 + 2,
            height: Math.random() * 4 + 2,
            borderRadius: '50%',
            background: i % 3 === 0 ? '#00ffc6' : i % 3 === 1 ? '#3a86ff' : '#7B42F6',
            opacity: Math.random() * 0.3 + 0.1,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `float ${Math.random() * 20 + 20}s ease-in-out infinite`,
            '@keyframes float': {
              '0%, 100%': { 
                transform: `translateY(0) translateX(0)`,
                opacity: 0.1,
              },
              '50%': { 
                transform: `translateY(${Math.random() * 100 - 50}px) translateX(${Math.random() * 100 - 50}px)`,
                opacity: 0.3,
              },
            }
          }}
        />
      ))}

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box
          sx={{
            textAlign: 'center',
            p: { xs: 6, md: 10 },
            borderRadius: '32px',
            background: 'linear-gradient(135deg, rgba(40,20,70,0.6) 0%, rgba(20,10,40,0.8) 100%)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3), 0 0 100px rgba(123,66,246,0.1)',
            border: '1px solid rgba(123,66,246,0.2)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Glow effect */}
          <Box
            sx={{
              position: 'absolute',
              width: '150%',
              height: '150%',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(0,255,198,0.1) 0%, transparent 70%)',
              top: '-50%',
              left: '-25%',
              zIndex: 0,
            }}
          />

          <Box sx={{ position: 'relative', zIndex: 1 }}>
            {/* Urgency Timer */}
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 1,
                backgroundColor: 'rgba(255,107,107,0.1)',
                border: '1px solid rgba(255,107,107,0.3)',
                borderRadius: '100px',
                px: 3,
                py: 1.5,
                mb: 4,
              }}
            >
              <Timer sx={{ color: '#ff6b6b', fontSize: 20 }} />
              <Typography
                sx={{
                  fontFamily: "'DM Sans', Arial, sans-serif",
                  color: '#ff6b6b',
                  fontWeight: 500,
                  fontSize: '0.95rem',
                }}
              >
                Limited Time Offer: {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m
              </Typography>
            </Box>

            <Typography
              variant="h2"
              sx={{
                fontFamily: "'Space Grotesk', Arial, sans-serif",
                fontWeight: 800,
                fontSize: { xs: '2.5rem', md: '4rem' },
                mb: 3,
                background: 'linear-gradient(90deg, #00ffc6 0%, #3a86ff 50%, #7B42F6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textShadow: '0 4px 20px rgba(0,255,198,0.2)',
                lineHeight: 1.1,
              }}
            >
              Your Next Chapter Starts With One Decision
            </Typography>
            
            <Typography
              variant="h5"
              sx={{
                fontFamily: "'DM Sans', Arial, sans-serif",
                color: 'rgba(255,255,255,0.9)',
                mb: 5,
                fontSize: { xs: '1.2rem', md: '1.5rem' },
                maxWidth: 800,
                mx: 'auto',
                lineHeight: 1.5,
              }}
            >
              You've spent years perfecting your craft. You've embraced technology that others feared. 
              Now it's time to apply that same forward-thinking approach to your business intelligence.
            </Typography>

            {/* Value Props */}
            <Grid container spacing={4} sx={{ mb: 6, maxWidth: 900, mx: 'auto' }}>
              <Grid item xs={12} md={4}>
                <Box sx={{ textAlign: 'center' }}>
                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: '20px',
                      background: 'linear-gradient(135deg, #00ffc6 0%, #00d4a8 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mx: 'auto',
                      mb: 2,
                      boxShadow: '0 8px 24px rgba(0,255,198,0.3)',
                    }}
                  >
                    <TrendingUp sx={{ fontSize: 40, color: '#0a0a0a' }} />
                  </Box>
                  <Typography
                    variant="h6"
                    sx={{
                      fontFamily: "'Space Grotesk', Arial, sans-serif",
                      fontWeight: 600,
                      color: '#fff',
                      mb: 1,
                    }}
                  >
                    47% Faster Deals
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: "'DM Sans', Arial, sans-serif",
                      color: 'rgba(255,255,255,0.7)',
                      fontSize: '0.95rem',
                    }}
                  >
                    Close deals nearly twice as fast with AI-powered insights
                  </Typography>
                </Box>
              </Grid>
              
              <Grid item xs={12} md={4}>
                <Box sx={{ textAlign: 'center' }}>
                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: '20px',
                      background: 'linear-gradient(135deg, #3a86ff 0%, #2968db 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mx: 'auto',
                      mb: 2,
                      boxShadow: '0 8px 24px rgba(58,134,255,0.3)',
                    }}
                  >
                    <Rocket sx={{ fontSize: 40, color: '#fff' }} />
                  </Box>
                  <Typography
                    variant="h6"
                    sx={{
                      fontFamily: "'Space Grotesk', Arial, sans-serif",
                      fontWeight: 600,
                      color: '#fff',
                      mb: 1,
                    }}
                  >
                    3x More Qualified Leads
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: "'DM Sans', Arial, sans-serif",
                      color: 'rgba(255,255,255,0.7)',
                      fontSize: '0.95rem',
                    }}
                  >
                    Our AI identifies the highest-value prospects instantly
                  </Typography>
                </Box>
              </Grid>
              
              <Grid item xs={12} md={4}>
                <Box sx={{ textAlign: 'center' }}>
                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: '20px',
                      background: 'linear-gradient(135deg, #7B42F6 0%, #5B32D6 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mx: 'auto',
                      mb: 2,
                      boxShadow: '0 8px 24px rgba(123,66,246,0.3)',
                    }}
                  >
                    <Timer sx={{ fontSize: 40, color: '#fff' }} />
                  </Box>
                  <Typography
                    variant="h6"
                    sx={{
                      fontFamily: "'Space Grotesk', Arial, sans-serif",
                      fontWeight: 600,
                      color: '#fff',
                      mb: 1,
                    }}
                  >
                    15 Hours Saved Weekly
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: "'DM Sans', Arial, sans-serif",
                      color: 'rgba(255,255,255,0.7)',
                      fontSize: '0.95rem',
                    }}
                  >
                    Automate research and admin tasks, focus on selling
                  </Typography>
                </Box>
              </Grid>
            </Grid>

            {/* CTA Buttons */}
            <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button
                variant="contained"
                size="large"
                href="#pricing"
                sx={{
                  px: 8,
                  py: 2.5,
                  fontWeight: 800,
                  fontFamily: "'Space Grotesk', Arial, sans-serif",
                  fontSize: { xs: '1.2rem', md: '1.3rem' },
                  borderRadius: '30px',
                  background: 'linear-gradient(90deg, #00ffc6 0%, #00d4a8 100%)',
                  boxShadow: '0 8px 32px rgba(0,255,198,0.3), 0 0 80px rgba(0,255,198,0.1)',
                  color: '#0a0a0a',
                  letterSpacing: '0.02em',
                  textTransform: 'none',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  position: 'relative',
                  overflow: 'hidden',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: '-100%',
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                    transition: 'left 0.5s',
                  },
                  '&:hover': {
                    background: 'linear-gradient(90deg, #00ffc6 0%, #00b894 100%)',
                    boxShadow: '0 12px 40px rgba(0,255,198,0.4), 0 0 100px rgba(0,255,198,0.15)',
                    transform: 'translateY(-3px) scale(1.05)',
                    '&::before': {
                      left: '100%',
                    },
                  },
                }}
              >
                Schedule Strategic Consultation
              </Button>
              
              <Button
                variant="outlined"
                size="large"
                href="#demo"
                sx={{
                  px: 6,
                  py: 2.4,
                  fontWeight: 700,
                  fontFamily: "'Space Grotesk', Arial, sans-serif",
                  fontSize: { xs: '1.1rem', md: '1.2rem' },
                  borderRadius: '30px',
                  border: '2px solid rgba(255,255,255,0.3)',
                  color: '#fff',
                  letterSpacing: '0.02em',
                  textTransform: 'none',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    border: '2px solid rgba(255,255,255,0.5)',
                    backgroundColor: 'rgba(255,255,255,0.05)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 24px rgba(255,255,255,0.1)',
                  },
                }}
              >
                See RepSpheres in Action
              </Button>
            </Box>

            {/* Trust text */}
            <Typography
              sx={{
                mt: 4,
                fontFamily: "'DM Sans', Arial, sans-serif",
                color: 'rgba(255,255,255,0.6)',
                fontSize: '0.95rem',
              }}
            >
              No credit card required • 14-day free trial • Cancel anytime
            </Typography>
          </Box>
        </Box>

        {/* Bottom urgency message */}
        <Box sx={{ textAlign: 'center', mt: 8 }}>
          <Typography
            variant="h5"
            sx={{
              fontFamily: "'Space Grotesk', Arial, sans-serif",
              fontWeight: 600,
              fontSize: { xs: '1.3rem', md: '1.8rem' },
              color: '#ff6b6b',
              mb: 2,
            }}
          >
            ⚡ While you're reading this, your competitors are closing deals
          </Typography>
          <Typography
            sx={{
              fontFamily: "'DM Sans', Arial, sans-serif",
              color: 'rgba(255,255,255,0.8)',
              fontSize: '1.1rem',
              maxWidth: 600,
              mx: 'auto',
            }}
          >
            The medical aesthetics market is evolving at lightning speed. 
            Don't get left behind with outdated tools and manual processes.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
