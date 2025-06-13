import React from 'react';
import { Box, Typography, Link, Container } from '@mui/material';

const footerLinks = [
  { href: '/blog.html', label: 'Blog' },
  { href: '/podcast', label: 'Podcast' },
  { href: '/dashboard/vault.html', label: 'Intelligence Vault' },
  { href: '/workspace.html', label: 'Sphere OS' },
  { href: '/privacy.html', label: 'Privacy Policy' },
  { href: '/terms.html', label: 'Terms of Service' },
];

export default function Footer() {
  return (
    <Box component="footer" sx={{
      py: 6,
      px: 0,
      background: 'rgba(30, 20, 60, 0.90)',
      borderTop: '1.5px solid rgba(123,66,246,0.13)',
      mt: 8,
      position: 'relative',
      zIndex: 2,
    }}>
      <Container maxWidth="md">
        {/* Tagline */}
        <Typography
          sx={{
            fontFamily: "'Space Grotesk', Arial, sans-serif",
            fontSize: '1.5rem',
            fontWeight: 700,
            textAlign: 'center',
            mb: 4,
            background: 'linear-gradient(90deg, #00ffc6 0%, #7B42F6 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          RepSpheres: Where Intelligence Meets Influence
        </Typography>

        {/* Trust Signals */}
        <Box sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 4,
          mb: 4,
        }}>
          {[
            'HIPAA Compliant',
            'Exclusive Territorial Licensing',
            'Built by Industry Veterans, for Industry Leaders'
          ].map((signal, index) => (
            <Typography
              key={index}
              sx={{
                color: 'rgba(255,255,255,0.7)',
                fontSize: '0.9rem',
                fontWeight: 500,
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                '&:before': {
                  content: '"✓"',
                  color: '#00ffc6',
                  fontWeight: 700,
                }
              }}
            >
              {signal}
            </Typography>
          ))}
        </Box>
        <Box sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 3,
          mb: 2.5,
        }}>
          {footerLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              underline="hover"
              sx={{
                color: 'rgba(255,255,255,0.86)',
                fontWeight: 600,
                fontSize: '1.05rem',
                letterSpacing: 0.1,
                transition: 'color 0.18s',
                '&:hover': {
                  color: '#00ffc6',
                  textDecoration: 'underline',
                },
              }}
            >
              {link.label}
            </Link>
          ))}
        </Box>
        <Typography sx={{
          color: 'rgba(255,255,255,0.54)',
          fontSize: '0.98rem',
          textAlign: 'center',
          letterSpacing: 0.1,
        }}>
          © 2025 RepSpheres. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
}
