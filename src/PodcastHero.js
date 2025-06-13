import React, { useEffect, useRef, useState } from 'react';
import { Box, Container, Typography, Button, useTheme, useMediaQuery } from '@mui/material';
import PodcastsIcon from '@mui/icons-material/Podcasts';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

// Audio-reactive animation component
const AudioWaveAnimation = () => {
  const canvasRef = useRef(null);
  const [animationActive, setAnimationActive] = useState(true);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width = window.innerWidth;
    const height = canvas.height = 500;
    
    // Set up animation parameters
    const barCount = 100;
    const barWidth = width / barCount;
    const maxBarHeight = height / 2;
    const minBarHeight = 5;
    
    // Animation frame
    let animationFrameId;
    let hue = 240; // Start with purple hue
    
    const render = () => {
      // Clear canvas
      ctx.clearRect(0, 0, width, height);
      
      // Update hue for color cycling
      hue = (hue + 0.1) % 360;
      
      // Draw bars
      for (let i = 0; i < barCount; i++) {
        // Calculate bar height using sine wave with varying frequencies
        const time = Date.now() * 0.001;
        const frequency1 = 0.5 + Math.sin(time * 0.2) * 0.2;
        const frequency2 = 0.3 + Math.cos(time * 0.1) * 0.1;
        
        const x = i * barWidth;
        const heightRatio = Math.abs(Math.sin(i * frequency1 + time) * Math.cos(i * frequency2));
        const barHeight = minBarHeight + heightRatio * maxBarHeight;
        
        // Create gradient for each bar
        const gradient = ctx.createLinearGradient(x, height / 2 - barHeight, x, height / 2 + barHeight);
        gradient.addColorStop(0, `hsla(${(hue + i) % 360}, 100%, 70%, 0.8)`);
        gradient.addColorStop(0.5, `hsla(${(hue + i + 40) % 360}, 100%, 60%, 0.6)`);
        gradient.addColorStop(1, `hsla(${(hue + i + 80) % 360}, 100%, 50%, 0.8)`);
        
        // Draw bar (centered vertically)
        ctx.fillStyle = gradient;
        ctx.fillRect(x, height / 2 - barHeight / 2, barWidth - 1, barHeight);
        
        // Add glow effect
        ctx.shadowColor = `hsla(${(hue + i) % 360}, 100%, 70%, 0.8)`;
        ctx.shadowBlur = 10;
      }
      
      // Continue animation loop
      if (animationActive) {
        animationFrameId = requestAnimationFrame(render);
      }
    };
    
    // Start animation
    render();
    
    // Handle window resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = 500;
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      setAnimationActive(false);
    };
  }, [animationActive]);
  
  return (
    <canvas 
      ref={canvasRef} 
      style={{ 
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        opacity: 0.7,
        pointerEvents: 'none'
      }} 
    />
  );
};

// Floating particles animation
const ParticlesAnimation = () => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width = window.innerWidth;
    const height = canvas.height = 500;
    
    // Particle class
    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        this.color = `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.1})`;
      }
      
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        // Bounce off edges
        if (this.x < 0 || this.x > width) this.speedX *= -1;
        if (this.y < 0 || this.y > height) this.speedY *= -1;
      }
      
      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    
    // Create particles
    const particleCount = 100;
    const particles = [];
    
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
    
    // Animation frame
    let animationFrameId;
    
    const render = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Update and draw particles
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      
      // Continue animation loop
      animationFrameId = requestAnimationFrame(render);
    };
    
    // Start animation
    render();
    
    // Handle window resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = 500;
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef} 
      style={{ 
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none'
      }} 
    />
  );
};

// Dental/aesthetics themed decorative elements
const ThemeElements = () => {
  return (
    <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
      {/* Stylized tooth icon - top left */}
      <Box 
        sx={{ 
          position: 'absolute', 
          top: '10%', 
          left: '5%',
          opacity: 0.2,
          transform: 'rotate(-15deg)',
          filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.5))'
        }}
      >
        <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C7.58 2 4 5.58 4 10C4 14.42 7.58 18 12 18C16.42 18 20 14.42 20 10C20 5.58 16.42 2 12 2ZM12 16C8.69 16 6 13.31 6 10C6 6.69 8.69 4 12 4C15.31 4 18 6.69 18 10C18 13.31 15.31 16 12 16Z" fill="white"/>
          <path d="M12 6C9.79 6 8 7.79 8 10C8 12.21 9.79 14 12 14C14.21 14 16 12.21 16 10C16 7.79 14.21 6 12 6ZM12 12C10.9 12 10 11.1 10 10C10 8.9 10.9 8 12 8C13.1 8 14 8.9 14 10C14 11.1 13.1 12 12 12Z" fill="white"/>
        </svg>
      </Box>
      
      {/* Stylized smile icon - bottom right */}
      <Box 
        sx={{ 
          position: 'absolute', 
          bottom: '15%', 
          right: '8%',
          opacity: 0.2,
          transform: 'rotate(10deg)',
          filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.5))'
        }}
      >
        <svg width="100" height="100" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" fill="white"/>
          <path d="M8 14C8.55 14 9 13.55 9 13C9 12.45 8.55 12 8 12C7.45 12 7 12.45 7 13C7 13.55 7.45 14 8 14Z" fill="white"/>
          <path d="M16 14C16.55 14 17 13.55 17 13C17 12.45 16.55 12 16 12C15.45 12 15 12.45 15 13C15 13.55 15.45 14 16 14Z" fill="white"/>
          <path d="M12 17C14.33 17 16.33 15.67 17 14H7C7.67 15.67 9.67 17 12 17Z" fill="white"/>
        </svg>
      </Box>
      
      {/* Stylized beauty icon - top right */}
      <Box 
        sx={{ 
          position: 'absolute', 
          top: '15%', 
          right: '10%',
          opacity: 0.2,
          transform: 'rotate(5deg)',
          filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.5))'
        }}
      >
        <svg width="70" height="70" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" fill="white"/>
          <path d="M12 6C9.79 6 8 7.79 8 10C8 12.21 9.79 14 12 14C14.21 14 16 12.21 16 10C16 7.79 14.21 6 12 6Z" fill="white"/>
        </svg>
      </Box>
    </Box>
  );
};

export default function PodcastHero() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  return (
    <Box
      sx={{
        py: { xs: 12, md: 18 },
        textAlign: 'center',
        background: 'linear-gradient(135deg, rgba(123, 66, 246, 0.9) 0%, rgba(0, 255, 198, 0.9) 100%)',
        color: '#fff',
        position: 'relative',
        overflow: 'hidden',
        height: { xs: 'auto', md: '500px' },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      {/* Background animations */}
      <AudioWaveAnimation />
      <ParticlesAnimation />
      <ThemeElements />
      
      {/* Content */}
      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 2 }}>
        <Box 
          sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            animation: 'fadeIn 1.5s ease-out'
          }}
        >
          <Box 
            sx={{ 
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 3,
              position: 'relative'
            }}
          >
            <PodcastsIcon 
              sx={{ 
                fontSize: { xs: 100, md: 140 }, 
                color: '#fff',
                filter: 'drop-shadow(0 0 20px rgba(0, 255, 198, 0.7))',
                animation: 'pulse 2s infinite ease-in-out'
              }} 
            />
            <HeadphonesIcon 
              sx={{ 
                fontSize: { xs: 60, md: 80 }, 
                color: 'var(--secondary, #00ffc6)',
                position: 'absolute',
                right: -30,
                top: -20,
                transform: 'rotate(15deg)',
                filter: 'drop-shadow(0 0 15px rgba(0, 255, 198, 0.9))',
                animation: 'float 3s infinite ease-in-out'
              }} 
            />
          </Box>
          
          <Typography 
            variant="h2" 
            component="h1" 
            fontWeight={800} 
            gutterBottom
            sx={{
              fontSize: { xs: '2.5rem', md: '4rem' },
              textShadow: '0 0 30px rgba(0, 0, 0, 0.3)',
              letterSpacing: '-0.02em',
              background: 'linear-gradient(45deg, #fff 30%, var(--secondary, #00ffc6) 90%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              animation: 'shimmer 3s infinite linear'
            }}
          >
            RepSpheres Podcast
          </Typography>
          
          <Typography 
            variant="h6" 
            sx={{ 
              color: 'rgba(255,255,255,0.95)', 
              mb: 4,
              fontSize: { xs: '1rem', md: '1.25rem' },
              fontWeight: 300,
              letterSpacing: '0.05em',
              textShadow: '0 2px 10px rgba(0, 0, 0, 0.2)'
            }}
          >
            Cutting-edge insights for elite dental & aesthetic professionals
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
            <Button
              variant="contained"
              size="large"
              href="#episodes"
              sx={{
                fontWeight: 700,
                borderRadius: '50px',
                px: 5,
                py: 1.5,
                background: '#18182b',
                color: '#fff',
                fontSize: '1.1rem',
                textTransform: 'none',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  background: '#0b0b20',
                  transform: 'translateY(-3px)',
                  boxShadow: '0 15px 40px rgba(0, 0, 0, 0.4)',
                },
              }}
            >
              Explore Episodes
            </Button>
            
            <Button
              variant="outlined"
              size="large"
              href="#live"
              sx={{
                fontWeight: 700,
                borderRadius: '50px',
                px: 5,
                py: 1.5,
                color: '#fff',
                borderColor: '#fff',
                fontSize: '1.1rem',
                textTransform: 'none',
                transition: 'all 0.3s ease',
                '&:hover': {
                  borderColor: 'var(--secondary, #00ffc6)',
                  color: 'var(--secondary, #00ffc6)',
                  transform: 'translateY(-3px)',
                  boxShadow: '0 10px 30px rgba(0, 255, 198, 0.3)',
                },
              }}
            >
              Live & Trending
            </Button>
          </Box>
          
          {/* Scroll indicator */}
          <Box 
            sx={{ 
              position: 'absolute',
              bottom: 20,
              left: '50%',
              transform: 'translateX(-50%)',
              animation: 'bounce 2s infinite'
            }}
          >
            <KeyboardArrowDownIcon sx={{ fontSize: 40, color: 'rgba(255, 255, 255, 0.7)' }} />
          </Box>
        </Box>
      </Container>
      
      {/* CSS Animations */}
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(15deg);
          }
          50% {
            transform: translateY(-10px) rotate(15deg);
          }
        }
        
        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }
        
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0) translateX(-50%);
          }
          40% {
            transform: translateY(-10px) translateX(-50%);
          }
          60% {
            transform: translateY(-5px) translateX(-50%);
          }
        }
      `}</style>
    </Box>
  );
}
