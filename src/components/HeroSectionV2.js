import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Button, Grid, Paper } from '@mui/material';

export default function HeroSectionV2() {
  const [typedText, setTypedText] = useState('');
  const [showReality, setShowReality] = useState(false);
  
  const competitorText = "Your competitors already have it.";
  
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= competitorText.length) {
        setTypedText(competitorText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
        setTimeout(() => setShowReality(true), 1000);
      }
    }, 100);
    
    return () => clearInterval(timer);
  }, []);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        position: 'relative',
        background: 'linear-gradient(135deg, #0A0A1A 0%, #1A1A2E 50%, #16213E 100%)',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      
      {/* Main Content */}
      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
        <Grid container spacing={8} alignItems="center">
          <Grid item xs={12} md={7}>
            {/* Opening Hook */}
            <Box sx={{ mb: 6 }}>
              <Typography
                variant="h1"
                sx={{
                  fontFamily: 'Space Grotesk, Arial, sans-serif',
                  fontWeight: 900,
                  fontSize: { xs: '3.5rem', md: '5rem', lg: '7rem' },
                  lineHeight: 0.85,
                  color: '#FFFFFF',
                  mb: 3,
                  textShadow: '0 4px 30px rgba(0,0,0,0.7)',
                }}
              >
                300+ AI Models.
                <br />
                15 Years of Data.
              </Typography>
              
              <Typography
                variant="h2"
                sx={{
                  fontFamily: 'Space Grotesk, Arial, sans-serif',
                  fontWeight: 500,
                  fontSize: { xs: '2rem', md: '3rem', lg: '4rem' },
                  color: 'rgba(255,255,255,0.8)',
                  mb: 2,
                  minHeight: { xs: '2.5rem', md: '4rem' },
                }}
              >
                {typedText}
                <Box
                  component="span"
                  sx={{
                    display: 'inline-block',
                    width: '4px',
                    height: { xs: '2rem', md: '3rem', lg: '4rem' },
                    backgroundColor: '#FF6B35',
                    marginLeft: '4px',
                    animation: 'blink 1.2s infinite',
                    '@keyframes blink': {
                      '0%, 50%': { opacity: 1 },
                      '51%, 100%': { opacity: 0 },
                    },
                  }}
                />
              </Typography>
            </Box>

            {/* Binary Choice */}
            <Box sx={{ mb: 8 }}>
              <Typography
                variant="h2"
                sx={{
                  fontFamily: 'Playfair Display, Georgia, serif',
                  fontWeight: 800,
                  fontSize: { xs: '3rem', md: '4.5rem', lg: '6rem' },
                  lineHeight: 0.9,
                  color: '#FFFFFF',
                  fontStyle: 'italic',
                  mb: 4,
                  textShadow: '0 4px 30px rgba(0,0,0,0.5)',
                }}
              >
                Which Side Are You On?
              </Typography>
              
              <Typography
                sx={{
                  fontFamily: 'DM Sans, Arial, sans-serif',
                  fontSize: { xs: '1.4rem', md: '1.8rem' },
                  color: 'rgba(255,255,255,0.9)',
                  lineHeight: 1.6,
                  maxWidth: '700px',
                  fontWeight: 500,
                  mb: 6,
                }}
              >
                While you perfect your technique, elite teams are closing deals with intelligence 
                you can't access. Every day you wait, the sophistication gap widens.
              </Typography>

              {/* Territory Stats */}
              <Grid container spacing={4} sx={{ mb: 6 }}>
                {[
                  { metric: '73%', label: 'Elite teams using AI', color: '#00ffc6' },
                  { metric: '4.2x', label: 'Performance advantage', color: '#7B42F6' },
                  { metric: '18mo', label: 'Time to catch up', color: '#FF6B35' },
                ].map((stat, index) => (
                  <Grid item xs={4} key={index}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography
                        sx={{
                          fontFamily: 'Space Grotesk, Arial, sans-serif',
                          fontWeight: 900,
                          fontSize: { xs: '2rem', md: '3rem' },
                          color: stat.color,
                          lineHeight: 1,
                          mb: 1,
                        }}
                      >
                        {stat.metric}
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: 'DM Sans, Arial, sans-serif',
                          fontSize: { xs: '0.9rem', md: '1.1rem' },
                          color: 'rgba(255,255,255,0.7)',
                          fontWeight: 600,
                          textTransform: 'uppercase',
                          letterSpacing: '1px',
                        }}
                      >
                        {stat.label}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>

            {/* CTAs */}
            <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
              <Button
                variant="contained"
                size="large"
                sx={{
                  background: 'linear-gradient(135deg, #00ffc6 0%, #7B42F6 100%)',
                  color: '#000',
                  fontFamily: 'Space Grotesk, Arial, sans-serif',
                  fontWeight: 800,
                  fontSize: '1.3rem',
                  px: 6,
                  py: 3,
                  borderRadius: 3,
                  textTransform: 'none',
                  boxShadow: '0 12px 40px rgba(0,255,198,0.4)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #00ffc6 0%, #7B42F6 100%)',
                    transform: 'translateY(-4px) scale(1.02)',
                    boxShadow: '0 20px 60px rgba(0,255,198,0.5)',
                  },
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              >
                Choose Your Side →
              </Button>
              
              <Button
                variant="outlined"
                size="large"
                sx={{
                  color: '#FFFFFF',
                  borderColor: 'rgba(255,255,255,0.4)',
                  borderWidth: '2px',
                  fontFamily: 'Space Grotesk, Arial, sans-serif',
                  fontWeight: 700,
                  fontSize: '1.3rem',
                  px: 6,
                  py: 3,
                  borderRadius: 3,
                  textTransform: 'none',
                  '&:hover': {
                    borderColor: '#00ffc6',
                    backgroundColor: 'rgba(0,255,198,0.1)',
                    color: '#00ffc6',
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                See The Intelligence
              </Button>
            </Box>
          </Grid>

          {/* Competitive Reality Panel */}
          <Grid item xs={12} md={5}>
            <Paper
              elevation={0}
              sx={{
                background: 'rgba(20,20,30,0.8)',
                backdropFilter: 'blur(30px)',
                border: '1px solid rgba(255,107,53,0.3)',
                borderRadius: 4,
                p: 5,
                color: '#FFFFFF',
                transform: showReality ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.95)',
                opacity: showReality ? 1 : 0,
                transition: 'all 1s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontFamily: 'Space Grotesk, Arial, sans-serif',
                  fontWeight: 800,
                  color: '#FF6B35',
                  mb: 4,
                  fontSize: '1.8rem',
                  textAlign: 'center',
                }}
              >
                ⚡ The Reality Check
              </Typography>
              
              {[
                {
                  stat: '73%',
                  desc: 'of elite sales teams already use AI for competitive advantage',
                  color: '#00ffc6'
                },
                {
                  stat: '4.2x',
                  desc: 'performance gap between AI users and manual processes',
                  color: '#7B42F6'
                },
                {
                  stat: '18mo',
                  desc: 'average time to catch up once you fall behind',
                  color: '#FF6B35'
                },
              ].map((item, index) => (
                <Box key={index} sx={{ mb: 4 }}>
                  <Typography
                    sx={{
                      fontFamily: 'Space Grotesk, Arial, sans-serif',
                      fontWeight: 900,
                      fontSize: '3rem',
                      color: item.color,
                      lineHeight: 1,
                      mb: 1,
                    }}
                  >
                    {item.stat}
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: 'DM Sans, Arial, sans-serif',
                      fontSize: '1.1rem',
                      color: 'rgba(255,255,255,0.9)',
                      lineHeight: 1.4,
                    }}
                  >
                    {item.desc}
                  </Typography>
                </Box>
              ))}

              <Box
                sx={{
                  mt: 5,
                  pt: 4,
                  borderTop: '1px solid rgba(255,255,255,0.2)',
                  textAlign: 'center',
                }}
              >
                <Typography
                  sx={{
                    fontFamily: 'Playfair Display, Georgia, serif',
                    fontSize: '1.3rem',
                    color: 'rgba(255,255,255,0.95)',
                    fontStyle: 'italic',
                    lineHeight: 1.4,
                  }}
                >
                  "Every day you wait, the gap widens."
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}