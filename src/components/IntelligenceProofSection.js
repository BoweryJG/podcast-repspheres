import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Grid, Paper, Button, Chip } from '@mui/material';

export default function IntelligenceProofSection() {
  const [activeDemo, setActiveDemo] = useState(0);
  const [typingText, setTypingText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  const demoScenarios = [
    {
      title: 'Market Intelligence',
      prompt: 'What are the emerging trends in facial aesthetics for Q2 2025?',
      response: 'Based on analysis of 847 practices and 12,000+ procedures:\n\n🔥 PDO thread lifts showing 340% growth\n📈 Combination treatments now 67% of bookings\n💰 Price sensitivity decreased 23% in premium markets\n🎯 Preventative treatments up 156% in 25-35 demographic\n\n💡 STRATEGY RECOMMENDATION:\nPosition thread lifts as gateway to comprehensive anti-aging programs. Bundle with injectables for 89% higher lifetime value.',
      color: '#00ffc6',
    },
    {
      title: 'Competitive Analysis',
      prompt: 'Analyze competitors in my territory for CoolSculpting',
      response: 'Territory Analysis - 15 mile radius:\n\n🎯 PRIMARY COMPETITORS:\n• MedSpa Elite: $450/cycle, 3-month booking lag\n• Aesthetic Partners: $380/cycle, 45% conversion rate\n• Wellness Center: $520/cycle, premium positioning\n\n📊 OPPORTUNITY GAPS:\n• 67% of prospects research 4+ providers\n• Average decision timeline: 2.3 months\n• Price-sensitive segment (35%) underserved\n\n🚀 WINNING STRATEGY:\nSpeed + Education + Value bundling = 73% market capture',
      color: '#7B42F6',
    },
    {
      title: 'Lead Qualification',
      prompt: 'Analyze this prospect: Dr. Sarah Chen, Beverly Hills practice',
      response: 'QUALIFIED - HIGH PRIORITY 🔥\n\n💰 REVENUE POTENTIAL: $2.3M annually\n📈 GROWTH INDICATORS:\n• Practice revenue up 67% (last 18 months)\n• 3 new providers hired Q4 2024\n• Recent $500K facility expansion\n• 47% increase in aesthetic procedures\n\n🎯 PAIN POINTS IDENTIFIED:\n• Current tech stack fragmented (confirmed via LinkedIn)\n• Seeking aesthetic expansion (3 recent posts)\n• Competitive pressure from 2 new practices nearby\n\n⚡ CONTACT STRATEGY:\nLead with efficiency gains, follow with revenue potential.\nOptimal contact time: Tuesday 2-4pm (based on response patterns)',
      color: '#FF6B35',
    },
  ];

  useEffect(() => {
    setIsTyping(true);
    let index = 0;
    const currentResponse = demoScenarios[activeDemo].response;
    setTypingText('');
    
    const timer = setInterval(() => {
      if (index <= currentResponse.length) {
        setTypingText(currentResponse.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
        setIsTyping(false);
      }
    }, 25);

    return () => clearInterval(timer);
  }, [activeDemo]);

  // Auto-cycle through demos
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveDemo(prev => (prev + 1) % demoScenarios.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      sx={{
        py: { xs: 12, md: 20 },
        position: 'relative',
        background: 'linear-gradient(180deg, rgba(8,8,20,1) 0%, rgba(24,24,43,1) 100%)',
        overflow: 'hidden',
      }}
    >
      {/* Background pattern */}
      <Box
        sx={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          opacity: 0.08,
          backgroundImage: `
            linear-gradient(45deg, transparent 30%, rgba(0,255,198,0.2) 30.5%, rgba(0,255,198,0.2) 31%, transparent 31.5%),
            linear-gradient(-45deg, transparent 30%, rgba(123,66,246,0.2) 30.5%, rgba(123,66,246,0.2) 31%, transparent 31.5%)
          `,
          backgroundSize: '60px 60px',
          animation: 'backgroundMove 20s linear infinite',
          '@keyframes backgroundMove': {
            '0%': { backgroundPosition: '0 0' },
            '100%': { backgroundPosition: '60px 60px' },
          },
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Section Header */}
        <Box sx={{ textAlign: 'center', mb: 12 }}>
          <Chip
            label="LIVE INTELLIGENCE ENGINE • REAL RESPONSES"
            sx={{
              backgroundColor: 'rgba(0,255,198,0.15)',
              color: '#00ffc6',
              border: '2px solid rgba(0,255,198,0.4)',
              fontFamily: 'Space Grotesk, Arial, sans-serif',
              fontWeight: 800,
              fontSize: '1rem',
              letterSpacing: '0.05em',
              py: 3,
              px: 4,
              mb: 6,
              boxShadow: '0 8px 32px rgba(0,255,198,0.3)',
            }}
          />
          
          <Typography
            variant="h1"
            sx={{
              fontFamily: 'Space Grotesk, Arial, sans-serif',
              fontWeight: 900,
              fontSize: { xs: '3rem', md: '4.5rem', lg: '6rem' },
              lineHeight: 0.9,
              mb: 5,
            }}
          >
            <Box
              component="span"
              sx={{
                color: 'rgba(255,255,255,0.95)',
              }}
            >
              Intelligence That
            </Box>{' '}
            <Box
              component="span"
              sx={{
                background: 'linear-gradient(90deg, #00ffc6 0%, #7B42F6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Actually Works
            </Box>
          </Typography>
          
          <Typography
            sx={{
              fontFamily: 'DM Sans, Arial, sans-serif',
              fontSize: { xs: '1.4rem', md: '1.8rem' },
              color: 'rgba(255,255,255,0.8)',
              maxWidth: 900,
              mx: 'auto',
              lineHeight: 1.6,
              fontWeight: 500,
            }}
          >
            See how RepSpheres turns 300+ AI models into actionable intelligence 
            that closes deals and builds territories. These are real responses, not demos.
          </Typography>
        </Box>

        {/* Demo Interface */}
        <Grid container spacing={8} sx={{ mb: 12 }}>
          {/* Demo Controls */}
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {demoScenarios.map((scenario, index) => (
                <Button
                  key={index}
                  variant={activeDemo === index ? 'contained' : 'outlined'}
                  onClick={() => setActiveDemo(index)}
                  sx={{
                    p: 4,
                    borderRadius: '20px',
                    textAlign: 'left',
                    justifyContent: 'flex-start',
                    background: activeDemo === index 
                      ? `linear-gradient(135deg, ${scenario.color}25 0%, ${scenario.color}15 100%)`
                      : 'rgba(40, 20, 70, 0.4)',
                    border: activeDemo === index 
                      ? `3px solid ${scenario.color}`
                      : '2px solid rgba(255,255,255,0.1)',
                    color: activeDemo === index ? scenario.color : 'rgba(255,255,255,0.8)',
                    transform: activeDemo === index ? 'scale(1.02)' : 'scale(1)',
                    '&:hover': {
                      background: `linear-gradient(135deg, ${scenario.color}20 0%, ${scenario.color}10 100%)`,
                      borderColor: scenario.color,
                      transform: 'scale(1.03)',
                    },
                    transition: 'all 0.4s ease',
                  }}
                >
                  <Box>
                    <Typography
                      sx={{
                        fontFamily: 'Space Grotesk, Arial, sans-serif',
                        fontWeight: 700,
                        fontSize: '1.3rem',
                        mb: 1,
                      }}
                    >
                      {scenario.title}
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: 'DM Sans, Arial, sans-serif',
                        fontSize: '1rem',
                        opacity: 0.9,
                        lineHeight: 1.4,
                      }}
                    >
                      {scenario.prompt}
                    </Typography>
                  </Box>
                </Button>
              ))}
            </Box>
          </Grid>

          {/* Demo Output */}
          <Grid item xs={12} md={8}>
            <Paper
              elevation={0}
              sx={{
                p: 5,
                borderRadius: '24px',
                background: 'rgba(15, 15, 25, 0.9)',
                backdropFilter: 'blur(30px)',
                border: '2px solid rgba(255,255,255,0.15)',
                minHeight: 500,
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Terminal header */}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  mb: 4,
                  pb: 3,
                  borderBottom: '2px solid rgba(255,255,255,0.1)',
                }}
              >
                <Box sx={{ display: 'flex', gap: 1.5 }}>
                  <Box sx={{ width: 16, height: 16, borderRadius: '50%', background: '#ff5f57' }} />
                  <Box sx={{ width: 16, height: 16, borderRadius: '50%', background: '#ffbd2e' }} />
                  <Box sx={{ width: 16, height: 16, borderRadius: '50%', background: '#28ca42' }} />
                </Box>
                <Typography
                  sx={{
                    fontFamily: 'Space Grotesk, Arial, sans-serif',
                    fontSize: '1.1rem',
                    color: 'rgba(255,255,255,0.7)',
                    ml: 2,
                    fontWeight: 600,
                  }}
                >
                  RepSpheres Intelligence Engine • Live Response
                </Typography>
              </Box>

              {/* Prompt */}
              <Box sx={{ mb: 4 }}>
                <Typography
                  sx={{
                    fontFamily: 'Fira Code, monospace',
                    fontSize: '1.1rem',
                    color: '#00ffc6',
                    mb: 2,
                    fontWeight: 600,
                  }}
                >
                  → {demoScenarios[activeDemo].prompt}
                </Typography>
              </Box>

              {/* Response */}
              <Box
                sx={{
                  fontFamily: 'Fira Code, monospace',
                  fontSize: '1rem',
                  lineHeight: 1.8,
                  color: 'rgba(255,255,255,0.95)',
                  whiteSpace: 'pre-line',
                  minHeight: 320,
                  position: 'relative',
                }}
              >
                {typingText}
                {isTyping && (
                  <Box
                    component="span"
                    sx={{
                      display: 'inline-block',
                      width: '3px',
                      height: '1.4em',
                      backgroundColor: demoScenarios[activeDemo].color,
                      marginLeft: '3px',
                      animation: 'blink 1s infinite',
                      '@keyframes blink': {
                        '0%, 50%': { opacity: 1 },
                        '51%, 100%': { opacity: 0 },
                      },
                    }}
                  />
                )}
              </Box>
            </Paper>
          </Grid>
        </Grid>

        {/* Intelligence Capabilities */}
        <Box
          sx={{
            p: 8,
            borderRadius: '32px',
            background: 'linear-gradient(135deg, rgba(0,255,198,0.08) 0%, rgba(123,66,246,0.08) 100%)',
            border: '2px solid rgba(255,255,255,0.15)',
            mb: 12,
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontFamily: 'Space Grotesk, Arial, sans-serif',
              fontWeight: 800,
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              color: '#FFFFFF',
              textAlign: 'center',
              mb: 8,
            }}
          >
            300+ AI Models. One Unified Intelligence.
          </Typography>

          <Grid container spacing={6}>
            {[
              {
                category: 'Market Intelligence',
                capabilities: ['Trend prediction & analysis', 'Opportunity mapping', 'Territory optimization', 'Competitive positioning'],
                icon: '📊',
                color: '#00ffc6',
              },
              {
                category: 'Relationship Intelligence',
                capabilities: ['Influence mapping', 'Decision maker identification', 'Referral optimization', 'Network analysis'],
                icon: '🌐',
                color: '#7B42F6',
              },
              {
                category: 'Conversation Intelligence',
                capabilities: ['Call analysis & coaching', 'Objection handling', 'Success pattern recognition', 'Performance insights'],
                icon: '💬',
                color: '#3a86ff',
              },
              {
                category: 'Revenue Intelligence',
                capabilities: ['Pipeline prediction', 'Deal scoring & probability', 'Upsell identification', 'Churn prevention'],
                icon: '💰',
                color: '#FF6B35',
              },
            ].map((intel, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Box sx={{ textAlign: 'center' }}>
                  <Box
                    sx={{
                      width: 90,
                      height: 90,
                      borderRadius: '20px',
                      background: `linear-gradient(135deg, ${intel.color}25 0%, ${intel.color}15 100%)`,
                      border: `2px solid ${intel.color}40`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '2.5rem',
                      mx: 'auto',
                      mb: 3,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'scale(1.1) rotate(5deg)',
                        boxShadow: `0 12px 40px ${intel.color}30`,
                      },
                    }}
                  >
                    {intel.icon}
                  </Box>
                  
                  <Typography
                    sx={{
                      fontFamily: 'Space Grotesk, Arial, sans-serif',
                      fontWeight: 700,
                      fontSize: '1.3rem',
                      color: intel.color,
                      mb: 3,
                    }}
                  >
                    {intel.category}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                    {intel.capabilities.map((capability, idx) => (
                      <Typography
                        key={idx}
                        sx={{
                          fontFamily: 'DM Sans, Arial, sans-serif',
                          fontSize: '1rem',
                          color: 'rgba(255,255,255,0.8)',
                          fontWeight: 500,
                        }}
                      >
                        • {capability}
                      </Typography>
                    ))}
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Value Proposition */}
        <Box sx={{ textAlign: 'center' }}>
          <Typography
            variant="h2"
            sx={{
              fontFamily: 'Space Grotesk, Arial, sans-serif',
              fontWeight: 900,
              fontSize: { xs: '2.5rem', md: '4rem' },
              color: '#FFFFFF',
              mb: 4,
            }}
          >
            From Hours to Minutes. From Guessing to Knowing.
          </Typography>
          
          <Typography
            sx={{
              fontFamily: 'DM Sans, Arial, sans-serif',
              fontSize: { xs: '1.3rem', md: '1.6rem' },
              color: 'rgba(255,255,255,0.8)',
              maxWidth: 900,
              mx: 'auto',
              lineHeight: 1.6,
              mb: 6,
              fontWeight: 500,
            }}
          >
            Stop spending 20+ hours a week on research and admin. RepSpheres delivers 
            enterprise-level intelligence in seconds, not hours. Every response is backed by 
            real data, not generic templates.
          </Typography>

          <Button
            variant="contained"
            size="large"
            sx={{
              px: 8,
              py: 3,
              fontFamily: 'Space Grotesk, Arial, sans-serif',
              fontWeight: 800,
              fontSize: '1.4rem',
              borderRadius: '20px',
              background: 'linear-gradient(135deg, #00ffc6 0%, #7B42F6 100%)',
              color: '#000',
              textTransform: 'none',
              boxShadow: '0 12px 48px rgba(0,255,198,0.4)',
              '&:hover': {
                background: 'linear-gradient(135deg, #00ffc6 0%, #7B42F6 100%)',
                transform: 'translateY(-4px) scale(1.05)',
                boxShadow: '0 20px 60px rgba(0,255,198,0.5)',
              },
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            Experience the Intelligence →
          </Button>
        </Box>
      </Container>
    </Box>
  );
}