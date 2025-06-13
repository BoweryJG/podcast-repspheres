import React from 'react';
import Box from '@mui/material/Box';

const STAR_COUNT = 120;

function randomBetween(a, b) {
  return Math.random() * (b - a) + a;
}

const twinkleKeyframes = {
  '@keyframes twinkle': {
    '0%, 100%': { opacity: 0.2, transform: 'scale(0.8)' },
    '50%': { opacity: 0.8, transform: 'scale(1.2)' },
  }
};

export default function StarryBackground() {
  const stars = React.useMemo(() => {
    return Array.from({ length: STAR_COUNT }).map((_, i) => {
      const left = `${randomBetween(0, 100)}vw`;
      const top = `${randomBetween(0, 100)}vh`;
      const size = randomBetween(1, 3);
      const duration = `${randomBetween(2, 5)}s`;
      const delay = `${randomBetween(0, 4)}s`;
      return (
        <Box
          key={i}
          sx={{
            position: 'absolute',
            left,
            top,
            width: size,
            height: size,
            bgcolor: '#fff',
            borderRadius: '50%',
            opacity: 0.2 + Math.random() * 0.6,
            pointerEvents: 'none',
            animation: `twinkle ${duration} infinite ease-in-out ${delay}`,
            ...twinkleKeyframes,
          }}
        />
      );
    });
  }, []);

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
        bgcolor: 'var(--dark-bg, #0B0B20)',
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    >
      {stars}
    </Box>
  );
}
