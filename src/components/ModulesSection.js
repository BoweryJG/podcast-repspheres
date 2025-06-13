import React, { useState } from 'react';
import { Box, Container, Typography, Grid, Button } from '@mui/material';
import { 
  TrendingUp, 
  Psychology, 
  RecordVoiceOver, 
  Hub,
  AutoAwesome,
  Speed,
  Analytics,
  CloudSync
} from '@mui/icons-material';

const modules = [
  {
    id: 'market-insights',
    title: 'Market Insights',
    subtitle: 'Real-Time Intelligence Engine',
    description: 'Track market sizes, growth percentages, and breaking news with city-level granularity. 15 years of proprietary data at your fingertips.',
    icon: TrendingUp,
    color: '#00ffc6',
    features: [
      'Real-time market data',
      'City-level insights',
      'Growth tracking',
      'Competitive analysis'
    ],
    gradient: 'linear-gradient(135deg, #00ffc6 0%, #00d4a8 100%)',
  },
  {
    id: 'ai-workspace',
    title: 'AI Workspace',
    subtitle: '300+ Models, Infinite Intelligence',
    description: 'Pre-configured prompts instantly generate deep research reports, competitive analyses, and personalized strategies based on doctor, location, and product.',
    icon: Psychology,
    color: '#3a86ff',
    features: [
      '300+ AI models',
      'Custom research reports',
      'Competitive analysis',
      'Instant insights'
    ],
    gradient: 'linear-gradient(135deg, #3a86ff 0%, #2968db 100%)',
  },
  {
    id: 'linguistics',
    title: 'Linguistics Analyzer',
    subtitle: 'Professional Conversation Intelligence',
    description: 'Upload, transcribe, and analyze sales conversations with professional-grade insights. Features Harvey Specter mode for elite closing strategies.',
    icon: RecordVoiceOver,
    color: '#7B42F6',
    features: [
      'Instant transcription',
      'Conversation analysis',
      'Harvey Specter mode',
      'Cloud storage'
    ],
    gradient: 'linear-gradient(135deg, #7B42F6 0%, #5B32D6 100%)',
  },
  {
    id: 'crm',
    title: 'RepSphere OS',
    subtitle: 'The CRM That Thinks',
    description: 'Unified command center with 150+ psychological indicators, Twilio integration, custom automations, and seamless workflow management.',
    icon: Hub,
    color: '#ff6b6b',
    features: [
      '150+ indicators',
      'Twilio integration',
      'Custom automations',
      'Instagram posting'
    ],
    gradient: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)',
  }
];

export default function ModulesSection() {
  const [hoveredModule, setHoveredModule] = useState(null);

  return (
    <Box
      id="modules"
      sx={{
        py: { xs: 10, md: 16 },
        position: 'relative',
        background: 'linear-gradient(180deg, rgba(24,24,43,0.98) 0%, rgba(24,24,43,1) 100%)',
        overflow: 'hidden',
      }}
    >
      {/* Background orb effects */}
      <Box
        sx={{
          position: 'absolute',
          width: '60vw',
          height: '60vw',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(123,66,246,0.1) 0%, transparent 70%)',
          filter: 'blur(100px)',
          top: '20%',
          right: '-20%',
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          width: '50vw',
          height: '50vw',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,255,198,0.1) 0%, transparent 70%)',
          filter: 'blur(100px)',
          bottom: '10%',
          left: '-15%',
          zIndex: 0,
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Section Header */}
        <Box sx={{ textAlign: 'center', mb: 10 }}>
          <Typography
            variant="h2"
            sx={{
              fontFamily: "'Space Grotesk', Arial, sans-serif",
              fontWeight: 800,
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              mb: 3,
              background: 'linear-gradient(90deg, #00ffc6 0%, #3a86ff 50%, #7B42F6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: '0 4px 20px rgba(0,255,198,0.2)',
            }}
          >
            Built for How You Actually Sell
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontFamily: "'DM Sans', Arial, sans-serif",
              color: 'rgba(255,255,255,0.9)',
              maxWidth: 800,
              mx: 'auto',
              fontSize: { xs: '1.1rem', md: '1.3rem' },
              lineHeight: 1.6,
            }}
          >
            Modular intelligence that scales with your role. From territory managers to enterprise teams, RepSpheres adapts to your workflow.
          </Typography>
        </Box>

        {/* Modules Grid */}
        <Grid container spacing={4}>
          {modules.map((module, index) => {
            const Icon = module.icon;
            const isHovered = hoveredModule === module.id;
            
            return (
              <Grid item xs={12} md={6} key={module.id}>
                <Box
                  onMouseEnter={() => setHoveredModule(module.id)}
                  onMouseLeave={() => setHoveredModule(null)}
                  sx={{
                    height: '100%',
                    position: 'relative',
                    borderRadius: '24px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    transform: isHovered ? 'translateY(-8px) scale(1.02)' : 'translateY(0)',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      inset: 0,
                      borderRadius: '24px',
                      padding: '2px',
                      background: isHovered ? module.gradient : 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                      WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                      WebkitMaskComposite: 'xor',
                      maskComposite: 'exclude',
                      transition: 'all 0.4s ease',
                    },
                  }}
                >
                  <Box
                    sx={{
                      height: '100%',
                      backgroundColor: 'rgba(24,24,43,0.8)',
                      backdropFilter: 'blur(20px)',
                      WebkitBackdropFilter: 'blur(20px)',
                      borderRadius: '24px',
                      p: 4,
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                  >
                    {/* Module glow effect */}
                    <Box
                      sx={{
                        position: 'absolute',
                        width: '200px',
                        height: '200px',
                        borderRadius: '50%',
                        background: module.gradient,
                        opacity: isHovered ? 0.2 : 0.1,
                        filter: 'blur(60px)',
                        top: '-50px',
                        right: '-50px',
                        transition: 'opacity 0.4s ease',
                      }}
                    />

                    {/* Content */}
                    <Box sx={{ position: 'relative', zIndex: 1 }}>
                      {/* Icon and Title */}
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                        <Box
                          sx={{
                            width: 60,
                            height: 60,
                            borderRadius: '16px',
                            background: module.gradient,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mr: 3,
                            boxShadow: `0 8px 24px ${module.color}33`,
                            transform: isHovered ? 'rotate(-5deg) scale(1.1)' : 'rotate(0)',
                            transition: 'transform 0.4s ease',
                          }}
                        >
                          <Icon sx={{ fontSize: 32, color: '#fff' }} />
                        </Box>
                        <Box>
                          <Typography
                            variant="h4"
                            sx={{
                              fontFamily: "'Space Grotesk', Arial, sans-serif",
                              fontWeight: 700,
                              fontSize: { xs: '1.5rem', md: '1.8rem' },
                              color: '#fff',
                              mb: 0.5,
                            }}
                          >
                            {module.title}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              fontFamily: "'DM Sans', Arial, sans-serif",
                              color: module.color,
                              fontWeight: 500,
                              fontSize: '0.9rem',
                            }}
                          >
                            {module.subtitle}
                          </Typography>
                        </Box>
                      </Box>

                      {/* Description */}
                      <Typography
                        variant="body1"
                        sx={{
                          fontFamily: "'DM Sans', Arial, sans-serif",
                          color: 'rgba(255,255,255,0.85)',
                          mb: 3,
                          fontSize: '1.05rem',
                          lineHeight: 1.6,
                        }}
                      >
                        {module.description}
                      </Typography>

                      {/* Features */}
                      <Box sx={{ mb: 3 }}>
                        {module.features.map((feature, idx) => (
                          <Box
                            key={idx}
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              mb: 1.5,
                              opacity: isHovered ? 1 : 0.7,
                              transform: isHovered ? 'translateX(8px)' : 'translateX(0)',
                              transition: `all 0.3s ease ${idx * 0.05}s`,
                            }}
                          >
                            <Box
                              sx={{
                                width: 6,
                                height: 6,
                                borderRadius: '50%',
                                backgroundColor: module.color,
                                mr: 2,
                                boxShadow: `0 0 10px ${module.color}66`,
                              }}
                            />
                            <Typography
                              variant="body2"
                              sx={{
                                fontFamily: "'DM Sans', Arial, sans-serif",
                                color: 'rgba(255,255,255,0.9)',
                                fontSize: '0.95rem',
                              }}
                            >
                              {feature}
                            </Typography>
                          </Box>
                        ))}
                      </Box>

                      {/* Learn More Link */}
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          color: module.color,
                          fontFamily: "'DM Sans', Arial, sans-serif",
                          fontWeight: 500,
                          fontSize: '0.95rem',
                          opacity: isHovered ? 1 : 0,
                          transform: isHovered ? 'translateY(0)' : 'translateY(10px)',
                          transition: 'all 0.3s ease',
                        }}
                      >
                        Learn more
                        <Box
                          component="span"
                          sx={{
                            ml: 1,
                            transform: isHovered ? 'translateX(4px)' : 'translateX(0)',
                            transition: 'transform 0.3s ease',
                          }}
                        >
                          →
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Grid>
            );
          })}
        </Grid>

        {/* Integration Visual */}
        <Box sx={{ mt: 10, textAlign: 'center' }}>
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 2,
              backgroundColor: 'rgba(24,24,43,0.6)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              borderRadius: '100px',
              px: 4,
              py: 2,
              border: '1px solid rgba(255,255,255,0.1)',
              mb: 4,
            }}
          >
            <AutoAwesome sx={{ color: '#00ffc6', fontSize: 24 }} />
            <Typography
              variant="body1"
              sx={{
                fontFamily: "'DM Sans', Arial, sans-serif",
                color: 'rgba(255,255,255,0.9)',
                fontWeight: 500,
              }}
            >
              All modules work seamlessly together
            </Typography>
            <AutoAwesome sx={{ color: '#7B42F6', fontSize: 24 }} />
          </Box>

          <Typography
            variant="h5"
            sx={{
              fontFamily: "'Space Grotesk', Arial, sans-serif",
              fontWeight: 600,
              fontSize: { xs: '1.5rem', md: '2rem' },
              mb: 2,
              color: '#fff',
            }}
          >
            The Power of Integration
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontFamily: "'DM Sans', Arial, sans-serif",
              color: 'rgba(255,255,255,0.85)',
              maxWidth: 600,
              mx: 'auto',
              fontSize: '1.1rem',
              lineHeight: 1.6,
            }}
          >
            Each module amplifies the others. Market insights feed your AI workspace. 
            Conversation analysis enhances your CRM data. Together, they create a 
            sales intelligence system that's greater than the sum of its parts.
          </Typography>
        </Box>

        {/* Tiers Section */}
        <Box sx={{ mt: 12 }}>
          <Typography
            variant="h3"
            sx={{
              fontFamily: "'Space Grotesk', Arial, sans-serif",
              fontWeight: 700,
              fontSize: { xs: '2rem', md: '2.8rem' },
              mb: 6,
              textAlign: 'center',
              color: '#fff',
            }}
          >
            Intelligence That Scales With Your Role
          </Typography>
          
          <Grid container spacing={3}>
            {[
              {
                title: 'Territory Managers',
                description: 'Ground-level intelligence for daily wins',
                features: ['Real-time territory insights', 'AI-powered research', 'Conversation analytics'],
                color: '#00ffc6',
              },
              {
                title: 'Area Sales Managers',
                description: 'Regional insights that drive team performance',
                features: ['Team performance metrics', 'Territory optimization', 'Competitive intelligence'],
                color: '#3a86ff',
              },
              {
                title: 'Regional Sales Managers',
                description: 'Strategic oversight with predictive analytics',
                features: ['Market trend analysis', 'Predictive modeling', 'Multi-territory coordination'],
                color: '#7B42F6',
              },
              {
                title: 'Enterprise',
                description: 'Custom solutions for market domination',
                features: ['Custom integrations', 'Dedicated support', 'White-label options'],
                color: '#ff006e',
              },
            ].map((tier, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Box
                  sx={{
                    p: 3,
                    height: '100%',
                    borderRadius: '16px',
                    background: 'rgba(40, 20, 70, 0.3)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    border: '1px solid',
                    borderColor: `${tier.color}33`,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      borderColor: `${tier.color}66`,
                      boxShadow: `0 10px 30px ${tier.color}22`,
                    },
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontFamily: "'Space Grotesk', Arial, sans-serif",
                      fontWeight: 700,
                      fontSize: '1.3rem',
                      color: tier.color,
                      mb: 1,
                    }}
                  >
                    {tier.title}
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: "'DM Sans', Arial, sans-serif",
                      fontSize: '0.95rem',
                      color: 'rgba(255,255,255,0.8)',
                      mb: 2,
                      minHeight: 48,
                    }}
                  >
                    {tier.description}
                  </Typography>
                  <Box>
                    {tier.features.map((feature, idx) => (
                      <Box
                        key={idx}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          mb: 1,
                        }}
                      >
                        <Box
                          sx={{
                            width: 4,
                            height: 4,
                            borderRadius: '50%',
                            backgroundColor: tier.color,
                            mr: 1.5,
                            opacity: 0.7,
                          }}
                        />
                        <Typography
                          sx={{
                            fontFamily: "'DM Sans', Arial, sans-serif",
                            fontSize: '0.85rem',
                            color: 'rgba(255,255,255,0.7)',
                          }}
                        >
                          {feature}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}
