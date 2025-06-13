import React from 'react';
import { Box, Container, Typography, Grid } from '@mui/material';

export default function DataRichnessSection() {
  return (
    <Box
      sx={{
        py: { xs: 10, md: 16 },
        position: 'relative',
        background: 'linear-gradient(180deg, rgba(24,24,43,0.98) 0%, rgba(24,24,43,1) 100%)',
        overflow: 'hidden',
      }}
    >
      {/* Background data visualization effect */}
      <Box
        sx={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          opacity: 0.1,
        }}
      >
        {Array.from({ length: 50 }).map((_, i) => (
          <Box
            key={i}
            sx={{
              position: 'absolute',
              width: Math.random() * 3 + 1,
              height: Math.random() * 100 + 50,
              background: i % 3 === 0 ? '#00ffc6' : i % 3 === 1 ? '#3a86ff' : '#7B42F6',
              left: `${(i / 50) * 100}%`,
              bottom: 0,
              opacity: Math.random() * 0.5 + 0.2,
              animation: `dataFlow ${Math.random() * 10 + 10}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
              '@keyframes dataFlow': {
                '0%, 100%': { 
                  height: Math.random() * 100 + 50,
                  opacity: 0.2,
                },
                '50%': { 
                  height: Math.random() * 200 + 100,
                  opacity: 0.6,
                },
              },
            }}
          />
        ))}
      </Box>

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box sx={{ textAlign: 'center', mb: 10 }}>
          <Typography
            variant="h2"
            sx={{
              fontFamily: "'Space Grotesk', Arial, sans-serif",
              fontWeight: 800,
              fontSize: { xs: '2.5rem', md: '3.5rem', lg: '4rem' },
              mb: 4,
              lineHeight: 1.2,
            }}
          >
            <Box
              component="span"
              sx={{
                background: 'linear-gradient(90deg, #00ffc6 0%, #3a86ff 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Aesthetic & Dental:
            </Box>
            <br />
            <Box
              component="span"
              sx={{
                color: 'rgba(255,255,255,0.95)',
              }}
            >
              The Data Goldmines Hidden in Plain Sight
            </Box>
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
            These industries possess some of the richest datasets compared to any other sector. Yet the sophistication gap between clinical excellence and business intelligence has never been wider. Until now.
          </Typography>
        </Box>

        {/* Visual comparison */}
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                p: 4,
                borderRadius: '20px',
                background: 'rgba(40, 20, 70, 0.4)',
                border: '2px solid rgba(255,255,255,0.1)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  top: -50,
                  right: -50,
                  width: 150,
                  height: 150,
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(255,0,110,0.2) 0%, transparent 70%)',
                  filter: 'blur(40px)',
                }}
              />
              
              <Typography
                variant="h4"
                sx={{
                  fontFamily: "'Space Grotesk', Arial, sans-serif",
                  fontWeight: 700,
                  fontSize: { xs: '1.8rem', md: '2.2rem' },
                  mb: 3,
                  color: '#ff006e',
                }}
              >
                Clinical Excellence
              </Typography>
              
              <Box sx={{ mb: 3 }}>
                {[
                  'Cutting-edge surgical techniques',
                  'Advanced imaging technology',
                  'Precision robotics',
                  'AI-assisted diagnostics',
                  'Real-time patient monitoring',
                ].map((item, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      mb: 2,
                    }}
                  >
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        background: '#ff006e',
                        mr: 2,
                        boxShadow: '0 0 10px rgba(255,0,110,0.5)',
                      }}
                    />
                    <Typography
                      sx={{
                        fontFamily: "'DM Sans', Arial, sans-serif",
                        color: 'rgba(255,255,255,0.8)',
                        fontSize: '1.1rem',
                      }}
                    >
                      {item}
                    </Typography>
                  </Box>
                ))}
              </Box>
              
              <Typography
                sx={{
                  fontFamily: "'Space Grotesk', Arial, sans-serif",
                  fontSize: '2rem',
                  fontWeight: 700,
                  color: '#ff006e',
                  textAlign: 'center',
                  mt: 3,
                }}
              >
                10/10
              </Typography>
              <Typography
                sx={{
                  fontFamily: "'DM Sans', Arial, sans-serif",
                  fontSize: '0.9rem',
                  color: 'rgba(255,255,255,0.6)',
                  textAlign: 'center',
                }}
              >
                Sophistication Level
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box
              sx={{
                p: 4,
                borderRadius: '20px',
                background: 'rgba(40, 20, 70, 0.4)',
                border: '2px solid rgba(255,255,255,0.1)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  top: -50,
                  right: -50,
                  width: 150,
                  height: 150,
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(123,66,246,0.2) 0%, transparent 70%)',
                  filter: 'blur(40px)',
                }}
              />
              
              <Typography
                variant="h4"
                sx={{
                  fontFamily: "'Space Grotesk', Arial, sans-serif",
                  fontWeight: 700,
                  fontSize: { xs: '1.8rem', md: '2.2rem' },
                  mb: 3,
                  color: '#7B42F6',
                }}
              >
                Business Intelligence
              </Typography>
              
              <Box sx={{ mb: 3 }}>
                {[
                  'Manual spreadsheets',
                  'Outdated CRM systems',
                  'Fragmented data sources',
                  'Limited analytics',
                  'Reactive decision making',
                ].map((item, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      mb: 2,
                      opacity: 0.6,
                    }}
                  >
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        background: 'rgba(123,66,246,0.5)',
                        mr: 2,
                      }}
                    />
                    <Typography
                      sx={{
                        fontFamily: "'DM Sans', Arial, sans-serif",
                        color: 'rgba(255,255,255,0.5)',
                        fontSize: '1.1rem',
                        textDecoration: 'line-through',
                      }}
                    >
                      {item}
                    </Typography>
                  </Box>
                ))}
              </Box>
              
              <Typography
                sx={{
                  fontFamily: "'Space Grotesk', Arial, sans-serif",
                  fontSize: '2rem',
                  fontWeight: 700,
                  color: 'rgba(123,66,246,0.5)',
                  textAlign: 'center',
                  mt: 3,
                }}
              >
                3/10
              </Typography>
              <Typography
                sx={{
                  fontFamily: "'DM Sans', Arial, sans-serif",
                  fontSize: '0.9rem',
                  color: 'rgba(255,255,255,0.6)',
                  textAlign: 'center',
                }}
              >
                Sophistication Level
              </Typography>
            </Box>
          </Grid>
        </Grid>

        {/* Bridge the gap message */}
        <Box
          sx={{
            mt: 10,
            p: 6,
            borderRadius: '30px',
            background: 'linear-gradient(135deg, rgba(0,255,198,0.1) 0%, rgba(123,66,246,0.1) 100%)',
            border: '2px solid',
            borderImage: 'linear-gradient(135deg, #00ffc6, #7B42F6) 1',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              background: 'radial-gradient(circle at 50% 50%, rgba(0,255,198,0.1) 0%, transparent 70%)',
              animation: 'pulse 4s ease-in-out infinite',
              '@keyframes pulse': {
                '0%, 100%': { opacity: 0.3 },
                '50%': { opacity: 0.6 },
              },
            }}
          />
          
          <Typography
            variant="h3"
            sx={{
              fontFamily: "'Space Grotesk', Arial, sans-serif",
              fontWeight: 700,
              fontSize: { xs: '2rem', md: '2.8rem' },
              mb: 3,
              position: 'relative',
              zIndex: 1,
              background: 'linear-gradient(90deg, #00ffc6 0%, #7B42F6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            RepSpheres Bridges the Gap
          </Typography>
          
          <Typography
            variant="h6"
            sx={{
              fontFamily: "'DM Sans', Arial, sans-serif",
              fontSize: { xs: '1.1rem', md: '1.3rem' },
              color: 'rgba(255,255,255,0.9)',
              maxWidth: 700,
              mx: 'auto',
              position: 'relative',
              zIndex: 1,
            }}
          >
            High-end surgeons employ cutting-edge workflows in their procedures. RepSpheres brings that same level of sophistication to their business processes.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
