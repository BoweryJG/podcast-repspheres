import React, { createContext, useState, useContext, useEffect } from 'react';

// Create a context for orb colors
export const OrbContext = createContext({
  gradientColors: {
    start: '#00E5FF',
    end: '#5B3CFF'
  },
  updateGradientColors: () => {}
});

// Custom hook to use the orb context
export const useOrbContext = () => useContext(OrbContext);

// Provider component
export default function OrbContextProvider({ children }) {
  const [gradientColors, setGradientColors] = useState({
    start: '#00E5FF',
    end: '#5B3CFF'
  });

  const updateGradientColors = (colors) => {
    setGradientColors(colors);
  };

  return (
    <OrbContext.Provider value={{ gradientColors, updateGradientColors }}>
      {children}
    </OrbContext.Provider>
  );
}
