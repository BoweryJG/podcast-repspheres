import React, { useRef, useEffect, useState } from 'react';
import { Box, Typography, Container, Button, Grid } from '@mui/material';
// AnimatedOrbHeroBG removed - now only in HeroSectionV2

export default function HeroSection() {
  const heroRef = useRef();
  const [showOrb, setShowOrb] = useState(true);

  useEffect(() => {
    const obs = new window.IntersectionObserver(
      ([entry]) => setShowOrb(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (heroRef.current) obs.observe(heroRef.current);
    return () => obs.disconnect();
  }, []);

  // Removed useEffect for letter explosion visibility

  return (
    <>
      <Box
        ref={heroRef}
        data-hero-section
        sx={{
          position: 'relative',
          minHeight: { xs: '90vh', md: '90vh' },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          textAlign: 'center',
          zIndex: 1,
          background: 'transparent',
          pt: { xs: 14, md: 22 },
          pb: { xs: 8, md: 14 },
          overflow: 'hidden',
        }}
      >
      {/* ORBS REMOVED - NOW ONLY IN HeroSectionV2 */}
      <Container maxWidth="md" sx={{ mt: { xs: 20, md: 24 } }}>
  <Typography
    variant="h1"
    sx={{
      fontFamily: "'Space Grotesk', 'Montserrat Alternates', Arial, sans-serif",
      fontWeight: 900,
      fontSize: { xs: '2.8rem', md: '4.5rem', lg: '5.5rem' },
      mb: 3,
      letterSpacing: '-0.03em',
      lineHeight: 1.1,
      position: 'relative',
      zIndex: 2,
    }}
  >
    <Box
      component="span"
      sx={{
        display: 'block',
        background: 'linear-gradient(135deg, #00ffc6 0%, #3a86ff 25%, #7B42F6 50%, #ff006e 75%, #00ffc6 100%)',
        backgroundSize: '200% 200%',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        animation: 'gradientShift 8s ease infinite, textGlow 3s ease-in-out infinite alternate',
        textShadow: '0 0 80px rgba(0,255,198,0.5), 0 0 120px rgba(123,66,246,0.3)',
        filter: 'drop-shadow(0 4px 16px rgba(0,255,198,0.4))',
        '@keyframes gradientShift': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' }
        },
        '@keyframes textGlow': {
          '0%': { 
            filter: 'drop-shadow(0 4px 16px rgba(0,255,198,0.4)) brightness(1)',
            transform: 'translateY(0) scale(1)'
          },
          '100%': { 
            filter: 'drop-shadow(0 8px 32px rgba(0,255,198,0.8)) brightness(1.2)',
            transform: 'translateY(-2px) scale(1.02)'
          }
        }
      }}
    >
      The Intelligence Revolution
    </Box>
    <Box
      component="span"
      sx={{
        display: 'block',
        mt: 1,
        position: 'relative',
      }}
    >
      <Box
        component="span"
        sx={{
          background: 'linear-gradient(90deg, #fff 0%, #00ffc6 50%, #fff 100%)',
          backgroundSize: '200% 100%',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          fontWeight: 900,
          letterSpacing: '-0.02em',
          animation: 'shimmer 3s linear infinite',
          textShadow: '0 0 40px rgba(255,255,255,0.8)',
          filter: 'drop-shadow(0 0 20px rgba(255,255,255,0.5))',
          '@keyframes shimmer': {
            '0%': { backgroundPosition: '200% 50%' },
            '100%': { backgroundPosition: '-200% 50%' }
          }
        }}
      >
        Has Arrived.
      </Box>
    </Box>
    <Box
      component="span"
      sx={{
        display: 'block',
        fontSize: { xs: '0.75em', md: '0.8em' },
        mt: 2,
        background: 'linear-gradient(270deg, #7B42F6 0%, #ff006e 50%, #00ffc6 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        fontWeight: 800,
        letterSpacing: '0.02em',
        animation: 'pulse 2s ease-in-out infinite',
        '@keyframes pulse': {
          '0%, 100%': { opacity: 0.8, transform: 'scale(1)' },
          '50%': { opacity: 1, transform: 'scale(1.05)' }
        }
      }}
    >
      Which Side Are You On?
    </Box>
  </Typography>
  <Typography
    variant="h5"
    sx={{
      fontFamily: "'DM Sans', Arial, sans-serif",
      mb: 3,
      maxWidth: 800,
      mx: 'auto',
      fontWeight: 500,
      fontSize: { xs: '1.1rem', md: '1.3rem', lg: '1.5rem' },
      letterSpacing: '0.01em',
      position: 'relative',
      zIndex: 2,
      lineHeight: 1.5,
      color: 'rgba(255,255,255,0.9)',
    }}
  >
    Sales reps and physicians have embraced high-end technology for years. Now it's time to bring that same sophistication to your business intelligence.
  </Typography>
  
  <Typography
    variant="h6"
    sx={{
      fontFamily: "'Space Grotesk', Arial, sans-serif",
      mb: 5,
      maxWidth: 700,
      mx: 'auto',
      fontWeight: 600,
      fontSize: { xs: '1.15rem', md: '1.35rem', lg: '1.5rem' },
      letterSpacing: '0.02em',
      position: 'relative',
      zIndex: 2,
      lineHeight: 1.4,
    }}
  >
    <Box
      component="span"
      sx={{
        color: '#00ffc6',
        fontWeight: 800,
        textShadow: '0 0 20px rgba(0,255,198,0.6)',
        animation: 'numberGlow 2s ease-in-out infinite alternate',
        '@keyframes numberGlow': {
          '0%': { textShadow: '0 0 20px rgba(0,255,198,0.6)' },
          '100%': { textShadow: '0 0 30px rgba(0,255,198,0.9), 0 0 40px rgba(0,255,198,0.4)' }
        }
      }}
    >
      300+ AI models
    </Box>
    <Box component="span" sx={{ color: 'rgba(255,255,255,0.7)', mx: 1 }}>•</Box>
    <Box
      component="span"
      sx={{
        color: '#3a86ff',
        fontWeight: 800,
        textShadow: '0 0 20px rgba(58,134,255,0.6)',
        animation: 'numberGlow2 2s ease-in-out infinite alternate',
        animationDelay: '0.5s',
        '@keyframes numberGlow2': {
          '0%': { textShadow: '0 0 20px rgba(58,134,255,0.6)' },
          '100%': { textShadow: '0 0 30px rgba(58,134,255,0.9), 0 0 40px rgba(58,134,255,0.4)' }
        }
      }}
    >
      15 years of pivotal data
    </Box>
    <Box component="span" sx={{ color: 'rgba(255,255,255,0.7)', mx: 1 }}>•</Box>
    <Box
      component="span"
      sx={{
        background: 'linear-gradient(90deg, #7B42F6 0%, #ff006e 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        fontWeight: 800,
        textShadow: '0 0 20px rgba(123,66,246,0.6)',
        animation: 'revolutionPulse 3s ease-in-out infinite',
        '@keyframes revolutionPulse': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' }
        }
      }}
    >
      One system that thinks
    </Box>
  </Typography>
  <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center', flexWrap: 'wrap', mt: 4 }}>
    <Button
      variant="contained"
      size="large"
      href="#pricing"
      sx={{
        px: 7,
        py: 2.5,
        fontWeight: 900,
        fontFamily: "'Space Grotesk', 'Montserrat Alternates', Arial, sans-serif",
        fontSize: { xs: '1.2rem', md: '1.35rem' },
        borderRadius: '50px',
        background: 'linear-gradient(135deg, #00ffc6 0%, #3a86ff 50%, #7B42F6 100%)',
        backgroundSize: '200% 200%',
        boxShadow: '0 8px 32px rgba(0,255,198,0.4), 0 4px 16px rgba(123,66,246,0.3)',
        color: '#fff',
        letterSpacing: '0.05em',
        textTransform: 'uppercase',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        position: 'relative',
        overflow: 'hidden',
        zIndex: 2,
        '&:before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(135deg, #00ffc6 0%, #ff006e 50%, #7B42F6 100%)',
          opacity: 0,
          transition: 'opacity 0.3s ease',
          borderRadius: '50px',
        },
        '&:hover': {
          backgroundPosition: '100% 50%',
          boxShadow: '0 12px 48px rgba(0,255,198,0.5), 0 6px 24px rgba(123,66,246,0.4)',
          transform: 'translateY(-3px) scale(1.05)',
          '&:before': {
            opacity: 1,
          }
        },
        '&:active': {
          transform: 'translateY(-1px) scale(1.02)',
        }
      }}
    >
      <Box component="span" sx={{ position: 'relative', zIndex: 1 }}>
        Claim Your Competitive Edge
      </Box>
      <Box
        component="span"
        sx={{
          position: 'relative',
          zIndex: 1,
          ml: 1,
          display: 'inline-block',
          animation: 'arrowBounce 1.5s ease-in-out infinite',
          '@keyframes arrowBounce': {
            '0%, 100%': { transform: 'translateX(0)' },
            '50%': { transform: 'translateX(5px)' }
          }
        }}
      >
        →
      </Box>
    </Button>
    <Button
      variant="outlined"
      size="large"
      href="#demo"
      sx={{
        px: 6,
        py: 2.4,
        fontWeight: 800,
        fontFamily: "'Space Grotesk', Arial, sans-serif",
        fontSize: { xs: '1.15rem', md: '1.25rem' },
        borderRadius: '50px',
        border: '3px solid transparent',
        borderImage: 'linear-gradient(135deg, #00ffc6, #3a86ff, #7B42F6) 1',
        color: '#fff',
        letterSpacing: '0.04em',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        position: 'relative',
        zIndex: 2,
        background: 'rgba(24,24,43,0.4)',
        backdropFilter: 'blur(10px)',
        overflow: 'hidden',
        '&:before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(135deg, rgba(0,255,198,0.2), rgba(123,66,246,0.2))',
          opacity: 0,
          transition: 'opacity 0.3s ease',
          borderRadius: '50px',
        },
        '&:hover': {
          transform: 'translateY(-3px)',
          boxShadow: '0 8px 32px rgba(0,255,198,0.3), 0 4px 16px rgba(123,66,246,0.2)',
          borderImage: 'linear-gradient(135deg, #00ffc6, #ff006e, #7B42F6) 1',
          '&:before': {
            opacity: 1,
          }
        },
        '&:active': {
          transform: 'translateY(-1px)',
        }
      }}
    >
      <Box
        component="span"
        sx={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          alignItems: 'center',
          gap: 1,
        }}
      >
        Calculate Your ROI
      </Box>
    </Button>
  </Box>
</Container>
      </Box>

      {/* Data Insights Section - Seamless Transition */}
      <Box
        sx={{
          background: 'linear-gradient(180deg, rgba(24,24,43,0.6) 0%, rgba(24,24,43,0.95) 100%)',
          pt: { xs: 10, md: 18 },
          pb: { xs: 10, md: 18 },
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Glowing orb decoration for continuous visual effect */}
        <Box
          sx={{
            position: 'absolute',
            width: '40vw',
            height: '40vw',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(123,66,246,0.15) 0%, rgba(0,255,198,0.05) 50%, rgba(24,24,43,0) 70%)',
            filter: 'blur(60px)',
            top: '-10%',
            right: '-5%',
            zIndex: 0,
            animation: 'pulse 8s ease-in-out infinite',
            '@keyframes pulse': {
              '0%': { opacity: 0.4, transform: 'scale(1)' },
              '50%': { opacity: 0.6, transform: 'scale(1.2)' },
              '100%': { opacity: 0.4, transform: 'scale(1)' }
            }
          }}
        />
        
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 6, position: 'relative', zIndex: 2 }}>
            <Typography 
              variant="h3"
              sx={{
                fontFamily: "'Space Grotesk', 'Montserrat Alternates', Arial, sans-serif",
                fontWeight: 700,
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                mb: 2,
                background: 'linear-gradient(90deg, #00ffc6 0%, #3a86ff 70%, #7B42F6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textShadow: '0 4px 20px rgba(0,255,198,0.2)',
              }}
            >
              15 Years of Industry Evolution at Your Fingertips
            </Typography>
          </Box>

          <Grid container spacing={6} alignItems="center">
            {/* Visual divider element */}
            <Box
              sx={{
                width: '100%',
                height: '1px',
                background: 'linear-gradient(90deg, rgba(0,255,198,0.1) 0%, rgba(123,66,246,0.4) 50%, rgba(0,255,198,0.1) 100%)',
                mb: 8,
                mx: 'auto',
                maxWidth: '85%',
                boxShadow: '0 0 10px rgba(123,66,246,0.3)',
              }}
            />
            
            <Grid item xs={12} md={7}>
              <Box sx={{ position: 'relative', zIndex: 2 }}>
                <Typography
                  variant="h4"
                  sx={{
                    fontFamily: "'Space Grotesk', Arial, sans-serif",
                    fontWeight: 600,
                    fontSize: { xs: '1.8rem', md: '2.2rem' },
                    mb: 3,
                    color: '#fff',
                  }}
                >
                  The Largest Dataset in Medical Aesthetics
                </Typography>
                
                <Typography
                  variant="body1"
                  sx={{
                    fontFamily: "'DM Sans', Arial, sans-serif",
                    color: 'rgba(255,255,255,0.9)',
                    mb: 3,
                    fontSize: { xs: '1.1rem', md: '1.2rem' },
                    lineHeight: 1.6,
                  }}
                >
                  From pioneering topical anesthetics at Zeltiq to revolutionizing aesthetics with Coolsculpting, our journey has been about one thing: transforming data into breakthrough results. Today, RepSpheres connects you to the most comprehensive dataset ever assembled for dental and aesthetic industries—putting 15 years of pivotal market insights directly in your hands.
                </Typography>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={5}>
              <Box
                sx={{
                  position: 'relative',
                  height: { xs: '250px', md: '320px' },
                  borderRadius: '20px',
                  overflow: 'hidden',
                  boxShadow: '0 12px 40px rgba(0,0,0,0.4), 0 4px 12px rgba(0,255,198,0.1)',
                  transform: { md: 'perspective(1000px) rotateY(-6deg) rotateX(2deg)' },
                  transition: 'transform 0.5s ease',
                  '&:hover': {
                    transform: { md: 'perspective(1000px) rotateY(-3deg) rotateX(1deg) scale(1.02)' },
                  },
                }}
              >
                <Box
                  sx={{
                    background: 'linear-gradient(135deg, rgba(58,134,255,0.2) 0%, rgba(123,66,246,0.4) 100%)',
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    padding: 3,
                  }}
                >
                  {/* Simulated data points as background decoration */}
                  {Array.from({ length: 30 }).map((_, i) => (
                    <Box
                      key={i}
                      sx={{
                        position: 'absolute',
                        width: Math.random() * 5 + 2,
                        height: Math.random() * 5 + 2,
                        borderRadius: '50%',
                        background: i % 3 === 0 ? '#00ffc6' : i % 3 === 1 ? '#3a86ff' : '#7B42F6',
                        opacity: Math.random() * 0.4 + 0.2,
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animation: `float ${Math.random() * 8 + 8}s ease-in-out infinite`,
                        '@keyframes float': {
                          '0%, 100%': { transform: 'translateY(0) translateX(0)' },
                          '50%': { transform: `translateY(${Math.random() * 15 - 8}px) translateX(${Math.random() * 15 - 8}px)` },
                        }
                      }}
                    />
                  ))}
                  
                  <Box sx={{ 
                    display: 'flex', 
                    flexDirection: 'column',
                    alignItems: 'center',
                    position: 'relative',
                    zIndex: 2,
                    background: 'rgba(24,24,43,0.4)',
                    backdropFilter: 'blur(8px)',
                    WebkitBackdropFilter: 'blur(8px)',
                    borderRadius: '12px',
                    padding: 2.5,
                    boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
                  }}>
                    <Typography
                      variant="body1"
                      sx={{
                        color: '#fff',
                        fontFamily: "'DM Sans', Arial, sans-serif",
                        fontWeight: 500,
                        textAlign: 'center',
                        fontSize: { xs: '0.9rem', md: '1rem' },
                        mb: 1.5,
                      }}
                    >
                      Available Data
                    </Typography>
                    
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 1 }}>
                      {['Practice Insights', 'Physician Data', 'Treatment Trends', 'Sales Metrics', 'Competitive Intelligence', 'Market Evolution'].map((feature, i) => (
                        <Box key={i} sx={{ 
                          display: 'flex', 
                          alignItems: 'center',
                          backgroundColor: 'rgba(24,24,43,0.6)',
                          borderRadius: '12px',
                          px: 1.5,
                          py: 0.7,
                          border: '1px solid',
                          borderColor: i % 2 === 0 ? 'rgba(0,255,198,0.3)' : 'rgba(58,134,255,0.3)',
                        }}>
                          <Typography
                            variant="body2"
                            sx={{
                              color: 'rgba(255,255,255,0.9)',
                              fontFamily: "'DM Sans', Arial, sans-serif",
                              fontSize: '0.8rem',
                              fontWeight: 500,
                            }}
                          >
                            {feature}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Industry Evolution Timeline Section */}
      <Box
        sx={{
          background: 'linear-gradient(180deg, rgba(24,24,43,0.95) 0%, rgba(24,24,43,0.98) 100%)',
          pt: { xs: 10, md: 14 },
          pb: { xs: 10, md: 16 },
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative elements */}
        <Box
          sx={{
            position: 'absolute',
            width: '50vw',
            height: '50vw',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0,255,198,0.08) 0%, rgba(123,66,246,0.12) 50%, rgba(24,24,43,0) 70%)',
            filter: 'blur(80px)',
            bottom: '-15%',
            left: '-10%',
            zIndex: 0,
            animation: 'pulseAlt 10s ease-in-out infinite',
            '@keyframes pulseAlt': {
              '0%': { opacity: 0.3, transform: 'scale(1)' },
              '50%': { opacity: 0.5, transform: 'scale(1.15)' },
              '100%': { opacity: 0.3, transform: 'scale(1)' }
            }
          }}
        />
        
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 8, position: 'relative', zIndex: 2 }}>
            <Typography 
              variant="h3"
              sx={{
                fontFamily: "'Space Grotesk', 'Montserrat Alternates', Arial, sans-serif",
                fontWeight: 700,
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                mb: 2.5,
                background: 'linear-gradient(90deg, #00ffc6 0%, #3a86ff 70%, #7B42F6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textShadow: '0 4px 20px rgba(0,255,198,0.2)',
              }}
            >
              From Revolutionary Beginnings to Industry Defining Future
            </Typography>
            
            <Typography
              variant="h6"
              sx={{
                fontFamily: "'DM Sans', Arial, sans-serif",
                color: 'rgba(255,255,255,0.9)',
                maxWidth: 800,
                mx: 'auto',
                mb: 5,
                fontSize: { xs: '1.1rem', md: '1.25rem' },
                lineHeight: 1.6,
              }}
            >
              The pivotal question isn't whether you're with the machines or against them—it's whether you have access to the data that powers them. RepSpheres puts you on the right side of that equation.
            </Typography>
          </Box>
          
          {/* Timeline */}
          <Box sx={{ position: 'relative', zIndex: 2, mb: 8 }}>
            {/* Timeline center line */}
            <Box
              sx={{
                position: 'absolute',
                width: '2px',
                height: '100%',
                backgroundColor: 'rgba(0,255,198,0.3)',
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 0,
                display: { xs: 'none', md: 'block' },
                boxShadow: '0 0 10px rgba(0,255,198,0.4)',
              }}
            />
            
            {/* Timeline items */}
            <Grid container spacing={3}>
              {/* Zeltiq - Early days */}
              <Grid item xs={12} md={6} sx={{ position: 'relative' }}>
                <Box
                  sx={{
                    backgroundColor: 'rgba(24,24,43,0.6)',
                    border: '1px solid rgba(0,255,198,0.3)',
                    borderRadius: '20px',
                    p: 4,
                    position: 'relative',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.2), 0 2px 8px rgba(0,255,198,0.1)',
                    '&:after': {
                      content: '""',
                      position: 'absolute',
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      backgroundColor: '#00ffc6',
                      right: { md: '-34px' },
                      top: '50%',
                      transform: 'translateY(-50%)',
                      display: { xs: 'none', md: 'block' },
                      boxShadow: '0 0 20px rgba(0,255,198,0.8)',
                      zIndex: 3,
                    },
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: '0 12px 48px rgba(0,0,0,0.25), 0 4px 16px rgba(0,255,198,0.15)',
                      transition: 'all 0.3s ease',
                    },
                    transition: 'all 0.3s ease',
                    ml: { md: 'auto' },
                    mr: { md: 4 },
                    width: { md: '90%' },
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{
                      fontFamily: "'Space Grotesk', Arial, sans-serif",
                      fontWeight: 600,
                      mb: 2,
                      color: '#00ffc6',
                    }}
                  >
                    The Zeltiq Beginnings
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      fontFamily: "'DM Sans', Arial, sans-serif",
                      color: 'rgba(255,255,255,0.9)',
                      mb: 2,
                      fontSize: '1.05rem',
                      lineHeight: 1.6,
                    }}
                  >
                    Being part of the original Coolsculpting team when it was called Zeltiq, we pioneered the use of the device for topical anesthetics, gathering unprecedented data on patient outcomes and market adoption.
                  </Typography>
                </Box>
              </Grid>
              
              <Grid item xs={12} md={6} sx={{ mt: { xs: 0, md: 12 } }}></Grid>
              
              {/* Medical Aesthetics Revolution */}
              <Grid item xs={12} md={6} sx={{ mt: { xs: 0, md: 12 } }}></Grid>
              
              <Grid item xs={12} md={6} sx={{ position: 'relative' }}>
                <Box
                  sx={{
                    backgroundColor: 'rgba(24,24,43,0.6)',
                    border: '1px solid rgba(58,134,255,0.3)',
                    borderRadius: '20px',
                    p: 4,
                    position: 'relative',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.2), 0 2px 8px rgba(58,134,255,0.1)',
                    '&:after': {
                      content: '""',
                      position: 'absolute',
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      backgroundColor: '#3a86ff',
                      left: { md: '-34px' },
                      top: '50%',
                      transform: 'translateY(-50%)',
                      display: { xs: 'none', md: 'block' },
                      boxShadow: '0 0 20px rgba(58,134,255,0.8)',
                      zIndex: 3,
                    },
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: '0 12px 48px rgba(0,0,0,0.25), 0 4px 16px rgba(58,134,255,0.15)',
                      transition: 'all 0.3s ease',
                    },
                    transition: 'all 0.3s ease',
                    ml: { md: 4 },
                    width: { md: '90%' },
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{
                      fontFamily: "'Space Grotesk', Arial, sans-serif",
                      fontWeight: 600,
                      mb: 2,
                      color: '#3a86ff',
                    }}
                  >
                    Medical Aesthetics Transformation
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      fontFamily: "'DM Sans', Arial, sans-serif",
                      color: 'rgba(255,255,255,0.9)',
                      mb: 2,
                      fontSize: '1.05rem',
                      lineHeight: 1.6,
                    }}
                  >
                    Over 15 years in healthcare and aesthetics, we've been privileged to be part of early breakthrough revolutionary technologies that redefined industry standards, establishing unprecedented datasets for treatment outcomes and market evolution.
                  </Typography>
                </Box>
              </Grid>
              
              {/* Robotics & Advanced Tech */}
              <Grid item xs={12} md={6} sx={{ position: 'relative' }}>
                <Box
                  sx={{
                    backgroundColor: 'rgba(24,24,43,0.6)',
                    border: '1px solid rgba(123,66,246,0.3)',
                    borderRadius: '20px',
                    p: 4,
                    position: 'relative',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.2), 0 2px 8px rgba(123,66,246,0.1)',
                    '&:after': {
                      content: '""',
                      position: 'absolute',
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      backgroundColor: '#7B42F6',
                      right: { md: '-34px' },
                      top: '50%',
                      transform: 'translateY(-50%)',
                      display: { xs: 'none', md: 'block' },
                      boxShadow: '0 0 20px rgba(123,66,246,0.8)',
                      zIndex: 3,
                    },
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: '0 12px 48px rgba(0,0,0,0.25), 0 4px 16px rgba(123,66,246,0.15)',
                      transition: 'all 0.3s ease',
                    },
                    transition: 'all 0.3s ease',
                    ml: { md: 'auto' },
                    mr: { md: 4 },
                    width: { md: '90%' },
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{
                      fontFamily: "'Space Grotesk', Arial, sans-serif",
                      fontWeight: 600,
                      mb: 2,
                      color: '#7B42F6',
                    }}
                  >
                    Advanced Robotics with Neocis
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      fontFamily: "'DM Sans', Arial, sans-serif",
                      color: 'rgba(255,255,255,0.9)',
                      mb: 2,
                      fontSize: '1.05rem',
                      lineHeight: 1.6,
                    }}
                  >
                    Most recently, our work with Neocis, funded by NVIDIA, has pushed the boundaries of robotics in healthcare, creating unprecedented datasets that bridge the gap between technology and patient outcomes.
                  </Typography>
                </Box>
              </Grid>
              
              <Grid item xs={12} md={6} sx={{ mt: { xs: 0, md: 12 } }}></Grid>
              
              {/* RepSpheres - The Future */}
              <Grid item xs={12} md={6} sx={{ mt: { xs: 0, md: 12 } }}></Grid>
              
              <Grid item xs={12} md={6} sx={{ position: 'relative' }}>
                <Box
                  sx={{
                    backgroundColor: 'rgba(24,24,43,0.6)',
                    backgroundImage: 'linear-gradient(135deg, rgba(0,255,198,0.05) 0%, rgba(123,66,246,0.1) 100%)',
                    border: '1px solid',
                    borderColor: 'transparent',
                    borderRadius: '20px',
                    p: 4,
                    position: 'relative',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.3), 0 4px 16px rgba(0,255,198,0.1)',
                    '&:before': {
                      content: '""',
                      position: 'absolute',
                      inset: 0,
                      borderRadius: '20px',
                      padding: '1px',
                      background: 'linear-gradient(135deg, #00ffc6, #3a86ff, #7B42F6)',
                      WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                      WebkitMaskComposite: 'xor',
                      maskComposite: 'exclude',
                    },
                    '&:after': {
                      content: '""',
                      position: 'absolute',
                      width: '25px',
                      height: '25px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #00ffc6, #3a86ff, #7B42F6)',
                      left: { md: '-39px' },
                      top: '50%',
                      transform: 'translateY(-50%)',
                      display: { xs: 'none', md: 'block' },
                      boxShadow: '0 0 25px rgba(0,255,198,0.8)',
                      zIndex: 3,
                    },
                    '&:hover': {
                      transform: 'translateY(-5px) scale(1.02)',
                      boxShadow: '0 16px 64px rgba(0,0,0,0.3), 0 8px 24px rgba(0,255,198,0.15)',
                      transition: 'all 0.3s ease',
                    },
                    transition: 'all 0.3s ease',
                    ml: { md: 4 },
                    width: { md: '90%' },
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{
                      fontFamily: "'Space Grotesk', Arial, sans-serif",
                      fontWeight: 700,
                      mb: 2,
                      background: 'linear-gradient(90deg, #00ffc6 0%, #3a86ff 70%, #7B42F6 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    RepSpheres: The Next Evolution
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      fontFamily: "'DM Sans', Arial, sans-serif",
                      color: 'rgba(255,255,255,0.9)',
                      mb: 2,
                      fontSize: '1.05rem',
                      lineHeight: 1.6,
                    }}
                  >
                    Today marks the most pivotal moment in our lifetime—where we take stock of where we are and how we want our futures to look. RepSpheres offers sales professionals automations, custom reports, and high-value insights powered by the largest dataset ever assembled for dental and aesthetic industries.
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      fontFamily: "'DM Sans', Arial, sans-serif",
                      color: '#00ffc6',
                      fontWeight: 500,
                      fontSize: '1.1rem',
                      mt: 2,
                    }}
                  >
                    Are you ready to be on the right side of this evolution?
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
          
          {/* Call to action */}
          <Box sx={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
            <Button
              variant="contained"
              size="large"
              href="#schedule"
              sx={{
                px: 6,
                py: 2.1,
                fontWeight: 800,
                fontFamily: "'Space Grotesk', 'Montserrat Alternates', Arial, sans-serif",
                fontSize: { xs: '1.14rem', md: '1.22rem' },
                borderRadius: '30px',
                background: 'linear-gradient(90deg, #00ffc6 0%, #7B42F6 100%)',
                boxShadow: '0 4px 24px rgba(123,66,246,0.18), 0 1.5px 18px #00ffc633',
                color: '#fff',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                transition: 'all 0.22s',
                mt: 2,
                position: 'relative',
                '&:hover': {
                  background: 'linear-gradient(270deg, #7B42F6 0%, #00ffc6 100%)',
                  boxShadow: '0 8px 36px rgba(123,66,246,0.22), 0 2px 24px #00ffc655',
                  color: '#fff',
                  transform: 'translateY(-2px) scale(1.045)'
                }
              }}
            >
              Transform Your Sales Performance
            </Button>
          </Box>
        </Container>
      </Box>
    </>
  );
}
