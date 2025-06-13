import React, { useState } from 'react';
import { Box, Container, Typography, Grid, Collapse } from '@mui/material';

export default function SocraticMethodSection() {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const questions = [
    {
      question: "What if you knew which procedures were growing 40% year-over-year in your territory?",
      answer: "You'd focus your efforts on the highest-growth opportunities, positioning yourself as the expert in emerging treatments.",
      icon: "📊",
      color: "#00ffc6",
    },
    {
      question: "How would your close rate change if you understood each physician's decision-making psychology?",
      answer: "You'd tailor every interaction to resonate with their specific values and priorities, dramatically increasing your influence.",
      icon: "🧠",
      color: "#3a86ff",
    },
    {
      question: "What would happen if every follow-up was perfectly timed and contextually relevant?",
      answer: "You'd build trust through consistency and relevance, becoming their go-to resource rather than just another vendor.",
      icon: "⏰",
      color: "#7B42F6",
    },
  ];

  return (
    <Box
      sx={{
        py: { xs: 10, md: 16 },
        position: 'relative',
        background: 'linear-gradient(180deg, rgba(24,24,43,0.98) 0%, rgba(24,24,43,1) 100%)',
        overflow: 'hidden',
      }}
    >
      {/* Question mark pattern background */}
      <Box
        sx={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          opacity: 0.03,
        }}
      >
        {Array.from({ length: 20 }).map((_, i) => (
          <Box
            key={i}
            sx={{
              position: 'absolute',
              fontSize: `${Math.random() * 40 + 20}px`,
              color: '#fff',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              transform: `rotate(${Math.random() * 360}deg)`,
              animation: `float ${Math.random() * 20 + 20}s ease-in-out infinite`,
              '@keyframes float': {
                '0%, 100%': { 
                  transform: `translateY(0) rotate(${Math.random() * 360}deg)`,
                },
                '50%': { 
                  transform: `translateY(${Math.random() * 30 - 15}px) rotate(${Math.random() * 360}deg)`,
                },
              },
            }}
          >
            ?
          </Box>
        ))}
      </Box>

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Main headline */}
        <Box sx={{ textAlign: 'center', mb: 10 }}>
          <Typography
            variant="h2"
            sx={{
              fontFamily: "'Space Grotesk', Arial, sans-serif",
              fontWeight: 800,
              fontSize: { xs: '2.5rem', md: '3.5rem', lg: '4rem' },
              mb: 4,
              background: 'linear-gradient(90deg, #00ffc6 0%, #7B42F6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Questions That Close Deals
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
            The best sales professionals don't push—they pull through strategic inquiry. RepSpheres amplifies this Socratic approach with data-driven insights that help you ask the right questions at the perfect moment.
          </Typography>
        </Box>

        {/* Interactive questions */}
        <Grid container spacing={4}>
          {questions.map((item, index) => (
            <Grid item xs={12} key={index}>
              <Box
                onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                sx={{
                  p: 4,
                  borderRadius: '20px',
                  background: 'rgba(40, 20, 70, 0.3)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  border: '2px solid',
                  borderColor: expandedIndex === index ? item.color : 'rgba(255,255,255,0.1)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  overflow: 'hidden',
                  '&:hover': {
                    transform: 'translateY(-3px)',
                    borderColor: `${item.color}66`,
                    boxShadow: `0 10px 30px ${item.color}22`,
                  },
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                  <Box
                    sx={{
                      width: 60,
                      height: 60,
                      borderRadius: '15px',
                      background: `linear-gradient(135deg, ${item.color}33, ${item.color}11)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '2rem',
                      flexShrink: 0,
                    }}
                  >
                    {item.icon}
                  </Box>
                  
                  <Box sx={{ flex: 1 }}>
                    <Typography
                      variant="h5"
                      sx={{
                        fontFamily: "'Space Grotesk', Arial, sans-serif",
                        fontWeight: 600,
                        fontSize: { xs: '1.3rem', md: '1.6rem' },
                        color: 'rgba(255,255,255,0.95)',
                        mb: 1,
                      }}
                    >
                      {item.question}
                    </Typography>
                    
                    <Collapse in={expandedIndex === index}>
                      <Typography
                        sx={{
                          fontFamily: "'DM Sans', Arial, sans-serif",
                          fontSize: '1.1rem',
                          color: item.color,
                          mt: 2,
                          lineHeight: 1.6,
                        }}
                      >
                        {item.answer}
                      </Typography>
                    </Collapse>
                  </Box>
                  
                  <Box
                    sx={{
                      fontSize: '1.5rem',
                      color: item.color,
                      transform: expandedIndex === index ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.3s ease',
                    }}
                  >
                    ▼
                  </Box>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* The power of questions */}
        <Box
          sx={{
            mt: 10,
            p: 6,
            borderRadius: '30px',
            background: 'linear-gradient(135deg, rgba(0,255,198,0.05) 0%, rgba(123,66,246,0.05) 100%)',
            border: '1px solid rgba(255,255,255,0.1)',
            textAlign: 'center',
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontFamily: "'Space Grotesk', Arial, sans-serif",
              fontWeight: 700,
              fontSize: { xs: '2rem', md: '2.5rem' },
              mb: 3,
              color: 'rgba(255,255,255,0.95)',
            }}
          >
            The Power of the Right Question
          </Typography>
          
          <Grid container spacing={4} sx={{ mt: 2 }}>
            {[
              { number: '73%', label: 'Higher engagement when leading with questions' },
              { number: '2.4x', label: 'More likely to close when using Socratic method' },
              { number: '91%', label: 'Of top performers use question-based selling' },
            ].map((stat, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Box>
                  <Typography
                    sx={{
                      fontFamily: "'Space Grotesk', Arial, sans-serif",
                      fontSize: '3rem',
                      fontWeight: 800,
                      background: 'linear-gradient(90deg, #00ffc6 0%, #7B42F6 100%)',
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
                      color: 'rgba(255,255,255,0.7)',
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
