import React, { useState, useEffect, useRef } from 'react';
import { Box, Container, Typography, Grid, Paper } from '@mui/material';

export default function SophisticationGapSection() {
  const [visibleElements, setVisibleElements] = useState([]);
  const [gapWidth, setGapWidth] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Animate elements in sequence
          const sequence = [0, 1, 2, 3, 4];
          sequence.forEach((index, i) => {
            setTimeout(() => {
              setVisibleElements(prev => [...prev, index]);
            }, i * 400);
          });
          
          // Animate gap widening
          let width = 0;
          const gapTimer = setInterval(() => {
            width += 2;
            setGapWidth(width);
            if (width >= 100) clearInterval(gapTimer);
          }, 50);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const isVisible = (index) => visibleElements.includes(index);

  return (
    <Box
      ref={sectionRef}
      sx={{
        py: { xs: 12, md: 20 },
        position: 'relative',
        background: 'linear-gradient(180deg, rgba(24,24,43,0.95) 0%, rgba(16,16,30,1) 100%)',
        overflow: 'hidden',
      }}
    >
      {/* Dynamic Background Effects */}
      <Box
        sx={{
          position: 'absolute',
          width: '140%',
          height: '140%',
          background: 'radial-gradient(circle at 20% 80%, rgba(255,107,53,0.15) 0%, transparent 50%)',
          left: '-20%',
          top: '-20%',
          animation: 'pulse 8s ease-in-out infinite',
          '@keyframes pulse': {
            '0%, 100%': { opacity: 0.1 },
            '50%': { opacity: 0.2 },
          },
        }}
      />
      
      <Box
        sx={{
          position: 'absolute',
          width: '120%',
          height: '120%',
          background: 'radial-gradient(circle at 80% 20%, rgba(123,66,246,0.12) 0%, transparent 50%)',
          right: '-10%',
          bottom: '-10%',
          animation: 'pulse 6s ease-in-out infinite reverse',
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Main Heading */}
        <Box sx={{ textAlign: 'center', mb: 12 }}>
          <Typography
            variant="h1"
            sx={{
              fontFamily: 'Space Grotesk, Arial, sans-serif',
              fontWeight: 900,
              fontSize: { xs: '3rem', md: '4.5rem', lg: '6rem' },
              lineHeight: 0.9,
              mb: 5,
              transform: isVisible(0) ? 'translateY(0)' : 'translateY(50px)',
              opacity: isVisible(0) ? 1 : 0,
              transition: 'all 1s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            <Box
              component="span"
              sx={{
                color: 'rgba(255,255,255,0.95)',
              }}
            >
              The
            </Box>{' '}
            <Box
              component="span"
              sx={{
                background: 'linear-gradient(90deg, #FF6B35 0%, #F7931E 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Sophistication Gap
            </Box>
            <br />
            <Box
              component="span"
              sx={{
                color: 'rgba(255,255,255,0.95)',
              }}
            >
              Is Accelerating
            </Box>
          </Typography>
          
          <Typography
            sx={{
              fontFamily: 'DM Sans, Arial, sans-serif',
              fontSize: { xs: '1.4rem', md: '1.8rem' },
              color: 'rgba(255,255,255,0.8)',
              maxWidth: 1000,
              mx: 'auto',
              lineHeight: 1.6,
              fontWeight: 500,
              transform: isVisible(1) ? 'translateY(0)' : 'translateY(30px)',
              opacity: isVisible(1) ? 1 : 0,
              transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.3s',
            }}
          >
            While you perfect your technique, elite teams are closing deals with intelligence 
            you can't access. Every day you wait, the gap widens.
          </Typography>
        </Box>

        {/* Gap Visualization */}
        <Grid container spacing={8} sx={{ mb: 12 }}>
          {/* Manual Process Side */}
          <Grid item xs={12} md={6}>
            <Paper
              elevation={0}
              sx={{
                p: 6,
                borderRadius: '32px',
                background: 'rgba(60, 30, 30, 0.6)',
                border: '2px solid rgba(255,107,53,0.3)',
                height: '100%',
                transform: isVisible(2) ? 'translateX(0) scale(1)' : 'translateX(-50px) scale(0.9)',
                opacity: isVisible(2) ? 1 : 0,
                transition: 'all 1s cubic-bezier(0.4, 0, 0.2, 1) 0.6s',
              }}
            >
              <Typography
                variant="h3"
                sx={{
                  fontFamily: 'Space Grotesk, Arial, sans-serif',
                  fontWeight: 800,
                  fontSize: '2.5rem',
                  color: '#FF6B35',
                  mb: 4,
                  textAlign: 'center',
                }}
              >
                ⏳ Manual Processes
              </Typography>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {[
                  { task: 'Market Research', time: '6+ hours', efficiency: '20%' },
                  { task: 'Competitive Analysis', time: '4+ hours', efficiency: '15%' },
                  { task: 'Lead Qualification', time: '3+ hours', efficiency: '30%' },
                  { task: 'Proposal Creation', time: '5+ hours', efficiency: '25%' },
                  { task: 'Follow-up Strategy', time: '2+ hours', efficiency: '10%' },
                ].map((item, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      p: 3,
                      borderRadius: '16px',
                      background: 'rgba(255,107,53,0.15)',
                      border: '1px solid rgba(255,107,53,0.3)',
                    }}
                  >
                    <Typography
                      sx={{
                        fontFamily: 'DM Sans, Arial, sans-serif',
                        color: 'rgba(255,255,255,0.9)',
                        fontWeight: 600,
                        fontSize: '1.1rem',
                      }}
                    >
                      {item.task}
                    </Typography>
                    <Box sx={{ textAlign: 'right' }}>
                      <Typography
                        sx={{
                          fontFamily: 'Space Grotesk, Arial, sans-serif',
                          color: '#FF6B35',
                          fontWeight: 700,
                          fontSize: '1.1rem',
                        }}
                      >
                        {item.time}
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: 'DM Sans, Arial, sans-serif',
                          color: 'rgba(255,255,255,0.6)',
                          fontSize: '0.9rem',
                        }}
                      >
                        {item.efficiency} effective
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
              
              <Box sx={{ mt: 5, textAlign: 'center' }}>
                <Typography
                  sx={{
                    fontFamily: 'Space Grotesk, Arial, sans-serif',
                    fontSize: '2.5rem',
                    fontWeight: 900,
                    color: '#FF6B35',
                    mb: 1,
                  }}
                >
                  20+ hours/week
                </Typography>
                <Typography
                  sx={{
                    fontFamily: 'DM Sans, Arial, sans-serif',
                    color: 'rgba(255,255,255,0.7)',
                    fontSize: '1.1rem',
                    fontWeight: 600,
                  }}
                >
                  on admin tasks
                </Typography>
              </Box>
            </Paper>
          </Grid>

          {/* AI-Powered Side */}
          <Grid item xs={12} md={6}>
            <Paper
              elevation={0}
              sx={{
                p: 6,
                borderRadius: '32px',
                background: 'rgba(30, 60, 30, 0.6)',
                border: '2px solid rgba(0,255,198,0.3)',
                height: '100%',
                position: 'relative',
                overflow: 'hidden',
                transform: isVisible(3) ? 'translateX(0) scale(1)' : 'translateX(50px) scale(0.9)',
                opacity: isVisible(3) ? 1 : 0,
                transition: 'all 1s cubic-bezier(0.4, 0, 0.2, 1) 0.9s',
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  width: '200%',
                  height: '200%',
                  background: 'radial-gradient(circle, rgba(0,255,198,0.15) 0%, transparent 70%)',
                  top: '-50%',
                  left: '-50%',
                  animation: 'rotate 20s linear infinite',
                  '@keyframes rotate': {
                    '0%': { transform: 'rotate(0deg)' },
                    '100%': { transform: 'rotate(360deg)' },
                  },
                }}
              />
              
              <Box sx={{ position: 'relative', zIndex: 1 }}>
                <Typography
                  variant="h3"
                  sx={{
                    fontFamily: 'Space Grotesk, Arial, sans-serif',
                    fontWeight: 800,
                    fontSize: '2.5rem',
                    color: '#00ffc6',
                    mb: 4,
                    textAlign: 'center',
                  }}
                >
                  ⚡ RepSpheres Intelligence
                </Typography>
                
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  {[
                    { task: 'Market Research', time: '5 minutes', efficiency: '95%' },
                    { task: 'Competitive Analysis', time: '3 minutes', efficiency: '90%' },
                    { task: 'Lead Qualification', time: '30 seconds', efficiency: '98%' },
                    { task: 'Proposal Creation', time: '10 minutes', efficiency: '92%' },
                    { task: 'Follow-up Strategy', time: '2 minutes', efficiency: '88%' },
                  ].map((item, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        p: 3,
                        borderRadius: '16px',
                        background: 'rgba(0,255,198,0.15)',
                        border: '1px solid rgba(0,255,198,0.3)',
                        transform: visibleElements.includes(3) ? 'translateX(0)' : 'translateX(30px)',
                        opacity: visibleElements.includes(3) ? 1 : 0,
                        transition: `all 0.6s ease ${index * 0.1}s`,
                      }}
                    >
                      <Typography
                        sx={{
                          fontFamily: 'DM Sans, Arial, sans-serif',
                          color: 'rgba(255,255,255,0.9)',
                          fontWeight: 600,
                          fontSize: '1.1rem',
                        }}
                      >
                        {item.task}
                      </Typography>
                      <Box sx={{ textAlign: 'right' }}>
                        <Typography
                          sx={{
                            fontFamily: 'Space Grotesk, Arial, sans-serif',
                            color: '#00ffc6',
                            fontWeight: 700,
                            fontSize: '1.1rem',
                          }}
                        >
                          {item.time}
                        </Typography>
                        <Typography
                          sx={{
                            fontFamily: 'DM Sans, Arial, sans-serif',
                            color: 'rgba(255,255,255,0.6)',
                            fontSize: '0.9rem',
                          }}
                        >
                          {item.efficiency} effective
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Box>
                
                <Box sx={{ mt: 5, textAlign: 'center' }}>
                  <Typography
                    sx={{
                      fontFamily: 'Space Grotesk, Arial, sans-serif',
                      fontSize: '2.5rem',
                      fontWeight: 900,
                      color: '#00ffc6',
                      mb: 1,
                    }}
                  >
                    20 minutes/week
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: 'DM Sans, Arial, sans-serif',
                      color: 'rgba(255,255,255,0.7)',
                      fontSize: '1.1rem',
                      fontWeight: 600,
                    }}
                  >
                    for superior results
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>

        {/* Gap Stats */}
        <Box
          sx={{
            p: 8,
            borderRadius: '40px',
            background: 'linear-gradient(135deg, rgba(255,107,53,0.08) 0%, rgba(123,66,246,0.08) 100%)',
            border: '2px solid rgba(255,255,255,0.15)',
            textAlign: 'center',
            mb: 10,
            transform: isVisible(4) ? 'translateY(0) scale(1)' : 'translateY(50px) scale(0.95)',
            opacity: isVisible(4) ? 1 : 0,
            transition: 'all 1s cubic-bezier(0.4, 0, 0.2, 1) 1.2s',
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontFamily: 'Space Grotesk, Arial, sans-serif',
              fontWeight: 800,
              fontSize: { xs: '2.5rem', md: '4rem' },
              color: '#FFFFFF',
              mb: 6,
            }}
          >
            The Cost of Falling Behind
          </Typography>
          
          <Grid container spacing={6}>
            {[
              { 
                metric: '4.2x', 
                label: 'Performance Gap',
                description: 'AI users vs manual processes',
                color: '#FF6B35',
                width: `${gapWidth * 0.4}%`
              },
              { 
                metric: '18mo', 
                label: 'Catch-up Time',
                description: 'Average time to close gap',
                color: '#7B42F6',
                width: `${gapWidth * 0.6}%`
              },
              { 
                metric: '73%', 
                label: 'Already Using AI',
                description: 'Top-performing teams',
                color: '#00ffc6',
                width: `${gapWidth * 0.8}%`
              },
            ].map((stat, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Box>
                  <Typography
                    sx={{
                      fontFamily: 'Space Grotesk, Arial, sans-serif',
                      fontSize: '4rem',
                      fontWeight: 900,
                      color: stat.color,
                      mb: 2,
                      lineHeight: 1,
                    }}
                  >
                    {stat.metric}
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: 'Space Grotesk, Arial, sans-serif',
                      fontSize: '1.5rem',
                      fontWeight: 700,
                      color: 'rgba(255,255,255,0.9)',
                      mb: 2,
                    }}
                  >
                    {stat.label}
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: 'DM Sans, Arial, sans-serif',
                      fontSize: '1.1rem',
                      color: 'rgba(255,255,255,0.7)',
                      mb: 3,
                    }}
                  >
                    {stat.description}
                  </Typography>
                  <Box
                    sx={{
                      height: 8,
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      borderRadius: 4,
                      overflow: 'hidden',
                    }}
                  >
                    <Box
                      sx={{
                        height: '100%',
                        backgroundColor: stat.color,
                        width: stat.width,
                        transition: 'width 2s ease-out',
                        borderRadius: 4,
                      }}
                    />
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Urgency Message */}
        <Box sx={{ textAlign: 'center' }}>
          <Typography
            sx={{
              fontFamily: 'Playfair Display, Georgia, serif',
              fontStyle: 'italic',
              fontSize: { xs: '2rem', md: '2.8rem' },
              lineHeight: 1.3,
              color: 'rgba(255,255,255,0.95)',
              maxWidth: 900,
              mx: 'auto',
              mb: 4,
              fontWeight: 600,
            }}
          >
            "Every day you perfect your manual process is another day 
            your competitors pull further ahead with intelligence."
          </Typography>
          
          <Typography
            sx={{
              fontFamily: 'Space Grotesk, Arial, sans-serif',
              fontSize: '1.5rem',
              color: '#FF6B35',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
            }}
          >
            ⚡ The gap isn't closing. It's accelerating.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}