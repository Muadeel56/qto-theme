import React, { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children, defaultTheme = 'light' }) => {
  const [theme, setTheme] = useState(() => {
    // Check localStorage first, then system preference, then defaultTheme
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('qto-theme');
      if (saved && ['light', 'dark', 'auto'].includes(saved)) return saved;
      
      // Check system preference
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
    }
    return defaultTheme;
  });

  const [systemTheme, setSystemTheme] = useState(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });

  const actualTheme = theme === 'auto' ? systemTheme : theme;

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => setSystemTheme(e.matches ? 'dark' : 'light');
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    
    // Remove existing theme classes
    root.classList.remove('light', 'dark');
    
    // Add current theme class
    root.classList.add(actualTheme);
    
    // Set data attribute for CSS selectors
    root.setAttribute('data-theme', actualTheme);
    
    // Save to localStorage
    localStorage.setItem('qto-theme', theme);
  }, [theme, actualTheme]);

  const toggleTheme = () => {
    setTheme(prev => {
      if (prev === 'light') return 'dark';
      if (prev === 'dark') return 'auto';
      return 'light';
    });
  };

  const setLightTheme = () => setTheme('light');
  const setDarkTheme = () => setTheme('dark');
  const setAutoTheme = () => setTheme('auto');

  const value = {
    theme,
    actualTheme,
    systemTheme,
    toggleTheme,
    setLightTheme,
    setDarkTheme,
    setAutoTheme,
    isLight: actualTheme === 'light',
    isDark: actualTheme === 'dark',
    isAuto: theme === 'auto',
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
  defaultTheme: PropTypes.oneOf(['light', 'dark']),
};
