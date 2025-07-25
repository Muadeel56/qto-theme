import { useState, useEffect } from 'react';

/**
 * Custom hook for responsive design
 * Returns current breakpoint and screen size utilities
 */
export const useResponsive = () => {
  const [screenSize, setScreenSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1280,
    height: typeof window !== 'undefined' ? window.innerHeight : 720,
  });

  const [breakpoint, setBreakpoint] = useState('lg');

  const getBreakpoint = (width) => {
    if (width < 640) return 'xs';
    if (width < 768) return 'sm';
    if (width < 1024) return 'md';
    if (width < 1280) return 'lg';
    if (width < 1536) return 'xl';
    return '2xl';
  };

  const updateScreenSize = () => {
    const newWidth = window.innerWidth;
    const newHeight = window.innerHeight;
    
    setScreenSize({ width: newWidth, height: newHeight });
    setBreakpoint(getBreakpoint(newWidth));
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;

    updateScreenSize();
    
    let timeoutId = null;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateScreenSize, 150);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  // Utility functions
  const isMobile = breakpoint === 'xs' || breakpoint === 'sm';
  const isTablet = breakpoint === 'md';
  const isDesktop = breakpoint === 'lg' || breakpoint === 'xl' || breakpoint === '2xl';
  const isSmallScreen = breakpoint === 'xs' || breakpoint === 'sm' || breakpoint === 'md';
  const isLargeScreen = breakpoint === 'xl' || breakpoint === '2xl';

  // Responsive value selector
  const responsive = (values) => {
    if (typeof values === 'object' && values !== null) {
      return values[breakpoint] || values.default || Object.values(values)[0];
    }
    return values;
  };

  // Grid columns calculator
  const getGridCols = (mobile = 1, tablet = 2, desktop = 3, ultrawide = 4) => {
    switch (breakpoint) {
      case 'xs':
      case 'sm':
        return mobile;
      case 'md':
        return tablet;
      case 'lg':
        return desktop;
      case 'xl':
      case '2xl':
      default:
        return ultrawide;
    }
  };

  return {
    screenSize,
    breakpoint,
    isMobile,
    isTablet,
    isDesktop,
    isSmallScreen,
    isLargeScreen,
    responsive,
    getGridCols,
  };
};

/**
 * Hook for media queries
 */
export const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia(query);
    const handleChange = (event) => setMatches(event.matches);

    mediaQuery.addEventListener('change', handleChange);
    setMatches(mediaQuery.matches);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [query]);

  return matches;
};

/**
 * Predefined responsive breakpoint hooks
 */
export const useBreakpoint = {
  sm: () => useMediaQuery('(min-width: 640px)'),
  md: () => useMediaQuery('(min-width: 768px)'),
  lg: () => useMediaQuery('(min-width: 1024px)'),
  xl: () => useMediaQuery('(min-width: 1280px)'),
  '2xl': () => useMediaQuery('(min-width: 1536px)'),
  mobile: () => useMediaQuery('(max-width: 767px)'),
  tablet: () => useMediaQuery('(min-width: 768px) and (max-width: 1023px)'),
  desktop: () => useMediaQuery('(min-width: 1024px)'),
};

export default useResponsive;
