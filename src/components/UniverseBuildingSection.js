import React, { useState, useRef, useEffect } from 'react';
import { Box, Container, Typography, Grid, Button, Paper } from '@mui/material';

export default function UniverseBuildingSection() {
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [activeUniverse, setActiveUniverse] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
        });
      }
    };

    const section = sectionRef.current;
    if (section) {
      section.addEventListener('mousemove', handleMouseMove);
      return () => section.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  // Auto-cycle through universe components
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveUniverse(prev => (prev + 1) % 4);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const universeComponents = [
    {
      title: 'Intelligence Layer',
      subtitle: '300+ AI Models',
      description: 'Real-time market intelligence, competitive analysis, and predictive insights that give you an unfair advantage over every competitor.',
      features: ['Market trend prediction', 'Competitive intelligence', 'Customer behavior analysis', 'Territory optimization'],
      gradient: 'linear-gradient(135deg, #00ffc6 0%, #00d4a8 100%)',
      icon: '🧠',
    },
    {
      title: 'Relationship Universe',
      subtitle: 'RepSphere OS',
      description: 'Not just contact management. Complete relationship intelligence that maps every connection and influence pathway in your market.',
      features: ['Relationship mapping', 'Influence tracking', 'Decision maker identification', 'Referral optimization'],
      gradient: 'linear-gradient(135deg, #7B42F6 0%, #5B32D6 100%)',
      icon: '🌐',
    },
    {
      title: 'Conversation Engine',
      subtitle: 'AI-Powered Analysis',
      description: 'Turn every conversation into actionable intelligence. Understand what works, what doesn\'t, and exactly why deals close or die.',
      features: ['Conversation analysis', 'Objection patterns', 'Success indicators', 'Coaching insights'],
      gradient: 'linear-gradient(135deg, #3a86ff 0%, #2968db 100%)',
      icon: '💬',
    },
    {
      title: 'Execution Framework',
      subtitle: 'Automated Workflows',
      description: 'Stop managing tasks. Start executing strategies. RepSpheres handles the admin while you handle the selling and relationship building.',
      features: ['Automated follow-ups', 'Pipeline management', 'Performance tracking', 'Goal alignment'],
      gradient: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)',
      icon: '⚡',
    },
  ];

  return (
    <Box
      ref={sectionRef}
      sx={{
        py: { xs: 16, md: 24 },
        position: 'relative',
        background: 'linear-gradient(180deg, rgba(16,16,30,1) 0%, rgba(8,8,20,1) 100%)',
        overflow: 'hidden',
      }}
    >
      {/* Dynamic Background */}
      <Box
        sx={{
          position: 'absolute',
          width: '60vw',
          height: '60vw',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,255,198,0.2) 0%, transparent 70%)',
          filter: 'blur(150px)',
          left: `${mousePosition.x - 30}%`,
          top: `${mousePosition.y - 30}%`,
          transform: 'translate(-50%, -50%)',
          transition: 'all 0.5s ease',
          zIndex: 0,
        }}
      />
      
      <Box
        sx={{
          position: 'absolute',
          width: '40vw',
          height: '40vw',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(123,66,246,0.15) 0%, transparent 70%)',
          filter: 'blur(120px)',
          right: `${100 - mousePosition.x - 15}%`,
          bottom: `${100 - mousePosition.y - 15}%`,
          transform: 'translate(50%, 50%)',
          transition: 'all 0.6s ease',
          zIndex: 0,
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Section Header */}
        <Box sx={{ textAlign: 'center', mb: 16 }}>
          <Typography
            variant="h1"
            sx={{
              fontFamily: 'Space Grotesk, Arial, sans-serif',
              fontWeight: 900,
              fontSize: { xs: '3.5rem', md: '5rem', lg: '7rem' },
              lineHeight: 0.9,
              mb: 6,
            }}
          >
            <Box
              component="span"
              sx={{
                color: 'rgba(255,255,255,0.95)',
              }}
            >
              We're Not Building Software.
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
              We're Building Universes.
            </Box>
          </Typography>
          
          <Typography
            sx={{
              fontFamily: 'DM Sans, Arial, sans-serif',
              fontSize: { xs: '1.5rem', md: '2rem' },
              color: 'rgba(255,255,255,0.8)',
              maxWidth: 1100,
              mx: 'auto',
              lineHeight: 1.6,
              mb: 8,
              fontWeight: 500,
            }}
          >
            RepSpheres isn't just another CRM or sales tool. It's the first complete 
            <strong style={{ color: '#00ffc6', fontWeight: 700 }}> Intelligence Operating System</strong> designed 
            specifically for medical sales professionals who refuse to lose.
          </Typography>

          <Button
            variant="text"
            sx={{
              color: '#00ffc6',
              fontFamily: 'Space Grotesk, Arial, sans-serif',
              fontSize: '1.3rem',
              fontWeight: 700,
              textDecoration: 'underline',
              textTransform: 'none',
              '&:hover': {
                backgroundColor: 'rgba(0,255,198,0.08)',
                textDecoration: 'underline',
                transform: 'scale(1.05)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            See the Complete Universe →
          </Button>
        </Box>

        {/* Universe Components */}
        <Grid container spacing={8} sx={{ mb: 16 }}>
          {universeComponents.map((component, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Paper
                elevation={0}
                onMouseEnter={() => setActiveUniverse(index)}
                sx={{
                  p: 6,
                  borderRadius: '32px',
                  background: activeUniverse === index 
                    ? 'rgba(40, 20, 70, 0.6)' 
                    : 'rgba(40, 20, 70, 0.3)',
                  backdropFilter: 'blur(30px)',
                  border: activeUniverse === index 
                    ? '2px solid rgba(0,255,198,0.4)' 
                    : '1px solid rgba(255,255,255,0.1)',
                  height: '100%',
                  transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                  transform: activeUniverse === index ? 'translateY(-12px) scale(1.02)' : 'translateY(0)',
                  '&:hover': {
                    transform: 'translateY(-16px) scale(1.03)',
                    borderColor: 'rgba(0,255,198,0.5)',
                    boxShadow: '0 25px 80px rgba(0,0,0,0.5)',
                  },
                }}
              >
                {/* Hover glow effect */}
                <Box
                  sx={{
                    position: 'absolute',
                    width: '200%',
                    height: '200%',
                    borderRadius: '50%',
                    background: component.gradient,
                    opacity: activeUniverse === index ? 0.15 : 0.05,
                    filter: 'blur(80px)',
                    top: '-50%',
                    left: '-50%',
                    transition: 'opacity 0.5s ease',
                    zIndex: 0,
                  }}
                />

                <Box sx={{ position: 'relative', zIndex: 1 }}>
                  {/* Icon */}
                  <Box
                    sx={{
                      width: 90,
                      height: 90,
                      borderRadius: '20px',
                      background: component.gradient,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '2.5rem',
                      mb: 4,
                      boxShadow: '0 12px 40px rgba(0,0,0,0.4)',
                      transform: activeUniverse === index ? 'scale(1.1) rotate(5deg)' : 'scale(1)',
                      transition: 'transform 0.4s ease',
                    }}
                  >
                    {component.icon}
                  </Box>

                  {/* Title */}
                  <Typography
                    variant="h3"
                    sx={{
                      fontFamily: 'Space Grotesk, Arial, sans-serif',
                      fontWeight: 800,
                      fontSize: '2.2rem',
                      color: '#FFFFFF',
                      mb: 1,
                    }}
                  >
                    {component.title}
                  </Typography>

                  {/* Subtitle */}
                  <Typography
                    sx={{
                      fontFamily: 'Space Grotesk, Arial, sans-serif',
                      fontWeight: 700,
                      fontSize: '1.2rem',
                      background: component.gradient,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      mb: 4,
                    }}
                  >
                    {component.subtitle}
                  </Typography>

                  {/* Description */}
                  <Typography
                    sx={{
                      fontFamily: 'DM Sans, Arial, sans-serif',
                      fontSize: '1.2rem',
                      color: 'rgba(255,255,255,0.9)',
                      lineHeight: 1.6,
                      mb: 5,
                      fontWeight: 500,
                    }}
                  >
                    {component.description}
                  </Typography>

                  {/* Features */}
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {component.features.map((feature, idx) => (
                      <Box
                        key={idx}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 3,
                        }}
                      >
                        <Box
                          sx={{
                            width: 8,
                            height: 8,
                            borderRadius: '50%',
                            background: component.gradient,
                            flexShrink: 0,
                          }}
                        />
                        <Typography
                          sx={{
                            fontFamily: 'DM Sans, Arial, sans-serif',
                            fontSize: '1.1rem',
                            color: 'rgba(255,255,255,0.8)',
                            fontWeight: 500,
                          }}
                        >
                          {feature}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Category Definition */}
        <Box
          sx={{
            p: 10,
            borderRadius: '40px',
            background: 'linear-gradient(135deg, rgba(0,255,198,0.08) 0%, rgba(123,66,246,0.08) 100%)',
            border: '2px solid rgba(255,255,255,0.15)',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
            mb: 12,
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontFamily: 'Space Grotesk, Arial, sans-serif',
              fontWeight: 900,
              fontSize: { xs: '3rem', md: '5rem' },
              color: '#FFFFFF',
              mb: 5,
            }}
          >
            Introducing: Intelligence-as-a-Service
          </Typography>
          
          <Typography
            sx={{
              fontFamily: 'DM Sans, Arial, sans-serif',
              fontSize: { xs: '1.4rem', md: '1.8rem' },
              color: 'rgba(255,255,255,0.9)',
              maxWidth: 1000,
              mx: 'auto',
              lineHeight: 1.6,
              mb: 8,
              fontWeight: 500,
            }}
          >
            We're creating an entirely new category. Not software you use, but intelligence that 
            flows through every aspect of your sales process. Like having a team of analysts, 
            strategists, and industry experts working 24/7 exclusively for you.
          </Typography>

          <Grid container spacing={6} justifyContent="center">
            {[
              { label: 'Traditional CRM', value: 'Data Storage', color: '#FF6B35' },
              { label: 'RepSpheres', value: 'Intelligence Engine', color: '#00ffc6' },
            ].map((comparison, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Box
                  sx={{
                    p: 4,
                    borderRadius: '20px',
                    background: index === 0 
                      ? 'rgba(255,107,53,0.15)' 
                      : 'rgba(0,255,198,0.15)',
                    border: index === 0 
                      ? '2px solid rgba(255,107,53,0.3)' 
                      : '2px solid rgba(0,255,198,0.3)',
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: 'Space Grotesk, Arial, sans-serif',
                      fontWeight: 700,
                      fontSize: '1.3rem',
                      color: comparison.color,
                      mb: 2,
                    }}
                  >
                    {comparison.label}
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: 'DM Sans, Arial, sans-serif',
                      fontSize: '1.1rem',
                      color: 'rgba(255,255,255,0.9)',
                      fontWeight: 600,
                    }}
                  >
                    {comparison.value}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Vision Statement */}
        <Box sx={{ textAlign: 'center' }}>
          <Typography
            sx={{
              fontFamily: 'Playfair Display, Georgia, serif',
              fontStyle: 'italic',
              fontSize: { xs: '2.2rem', md: '3.2rem' },
              lineHeight: 1.3,
              color: 'rgba(255,255,255,0.95)',
              maxWidth: 1000,
              mx: 'auto',
              fontWeight: 600,
            }}
          >
            "We're not just building better tools. We're creating the future 
            where every sales professional has access to enterprise-level intelligence."
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}