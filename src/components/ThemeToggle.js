import React, { useState, useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import InvertColorsIcon from '@mui/icons-material/InvertColors';

/**
 * Floating theme toggle that inverts the page colors.
 */
export default function ThemeToggle() {
  const [active, setActive] = useState(false);

  // Initialize from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('invertedTheme') === 'true';
    setActive(stored);
  }, []);

  // Update DOM and storage whenever active changes
  useEffect(() => {
    if (active) {
      document.body.classList.add('inverted-theme');
    } else {
      document.body.classList.remove('inverted-theme');
    }
    localStorage.setItem('invertedTheme', active);
  }, [active]);

  const handleToggle = () => {
    setActive((prev) => !prev);
  };

  return (
    <IconButton
      onClick={handleToggle}
      color="inherit"
      aria-label="Toggle color theme"
      sx={{
        position: 'fixed',
        bottom: 16,
        left: 16,
        zIndex: 1500,
        color: '#fff',
        backgroundColor: 'rgba(255,255,255,0.15)',
        '&:hover': {
          backgroundColor: 'rgba(255,255,255,0.25)'
        }
      }}
    >
      <InvertColorsIcon />
    </IconButton>
  );
}
