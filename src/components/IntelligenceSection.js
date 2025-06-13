import React from 'react';
import { Box, Typography, Grid, Card, CardContent, Avatar } from '@mui/material';
import SecurityIcon from '@mui/icons-material/Security';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import InsightsIcon from '@mui/icons-material/Insights';

export default function IntelligenceSection() {
  return (
    <Box
      sx={{
        py: { xs: 10, md: 16 },
        px: { xs: 2, md: 0 },
        background: 'radial-gradient(circle at 60% 70%, rgba(0,255,198,0.06), transparent 70%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
        zIndex: 1,
      }}
    >
      {/* Transition Tagline */}
      <Box sx={{
        mb: 3,
        px: 3,
        py: 1,
        borderRadius: '18px',
        background: 'linear-gradient(90deg, #00ffc6 0%, #7B42F6 100%)',
        boxShadow: '0 2px 18px 0 rgba(30,30,60,0.10)',
        display: 'inline-block',
        fontWeight: 700,
        fontSize: { xs: '1.02rem', md: '1.11rem' },
        color: '#18182b',
        letterSpacing: '0.01em',
        textAlign: 'center',
        textShadow: '0 1.5px 8px #00ffc633',
        fontFamily: "'Space Grotesk', Arial, sans-serif",
        animation: 'gradientMove 5s ease-in-out infinite alternate',
      }}>
        Interactive dashboard with 300+ CDT/CPT codes.
      </Box>
      <Typography
        variant="h2"
        sx={{
          fontWeight: 900,
          fontFamily: "'Space Grotesk', Arial, sans-serif",
          textAlign: 'center',
          mb: 4,
          letterSpacing: '-0.02em',
          background: 'linear-gradient(90deg, #00ffc6 0%, #7B42F6 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          animation: 'gradientMove 5s ease-in-out infinite alternate',
        }}
      >
        Unmatched Intelligence & Instant Insights
      </Typography>
      <Typography
        sx={{
          color: 'rgba(255,255,255,0.93)',
          textAlign: 'center',
          fontSize: { xs: '1.22rem', md: '1.33rem' },
          maxWidth: 780,
          mb: 7,
          fontFamily: "'DM Sans', Arial, sans-serif",
        }}
      >
        Gain an unbeatable edge with real-time market intelligence and psychological enrichment. Our AI taps the nation’s largest dataset to deliver procedure volumes, pricing trends, and competitive intel down to the city level.<br /><br />
        Instantly qualify leads, generate email campaigns, and produce actionable physician reports—all from one command center.
      </Typography>
      <Grid container spacing={4} justifyContent="center" sx={{ mb: 5 }}>
        <Grid item xs={12} md={4}>
          <Card sx={{
            background: 'rgba(30,30,60,0.18)',
            borderRadius: '22px',
            boxShadow: '0 2px 18px 0 rgba(30,30,60,0.10)',
            backdropFilter: 'blur(8px)',
            p: 2,
            minHeight: 210,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            border: '1.5px solid #00ffc633',
          }}>
            <Avatar sx={{ bgcolor: '#00ffc6', width: 64, height: 64, mb: 2 }}>
              <AutoAwesomeIcon sx={{ color: '#7B42F6', fontSize: 38 }} />
            </Avatar>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: '#fff', textAlign: 'center' }}>
                Instant Psychological Enrichment
              </Typography>
              <Typography sx={{ color: 'rgba(255,255,255,0.85)', textAlign: 'center' }}>
                Profile every lead in seconds and surface the behavioral triggers that close deals.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{
            background: 'rgba(30,30,60,0.18)',
            borderRadius: '22px',
            boxShadow: '0 2px 18px 0 rgba(30,30,60,0.10)',
            backdropFilter: 'blur(8px)',
            p: 2,
            minHeight: 210,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            border: '1.5px solid #00ffc633',
          }}>
            <Avatar sx={{ bgcolor: '#7B42F6', width: 64, height: 64, mb: 2 }}>
              <InsightsIcon sx={{ color: '#00ffc6', fontSize: 38 }} />
            </Avatar>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: '#fff', textAlign: 'center' }}>
                Interactive Procedure Dashboard
              </Typography>
              <Typography sx={{ color: 'rgba(255,255,255,0.85)', textAlign: 'center' }}>
                Explore market size, pricing, and satisfaction for 300+ procedures—right inside your command center.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{
            background: 'rgba(30,30,60,0.18)',
            borderRadius: '22px',
            boxShadow: '0 2px 18px 0 rgba(30,30,60,0.10)',
            backdropFilter: 'blur(8px)',
            p: 2,
            minHeight: 210,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            border: '1.5px solid #00ffc633',
          }}>
            <Avatar sx={{ bgcolor: '#fff', width: 64, height: 64, mb: 2 }}>
              <SecurityIcon sx={{ color: '#18182b', fontSize: 38 }} />
            </Avatar>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: '#fff', textAlign: 'center' }}>
                Automated Email Outreach
              </Typography>
              <Typography sx={{ color: 'rgba(255,255,255,0.85)', textAlign: 'center' }}>
                Launch personalized campaigns and follow-ups directly from your Sphere and track engagement automatically.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
