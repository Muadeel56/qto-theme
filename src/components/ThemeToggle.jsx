import React from 'react';
import PropTypes from 'prop-types';
import { useThemeSafe } from './ThemeProvider';
import '../styles/theme-toggle.css';

const ThemeToggle = ({ 
  size = 'md', 
  className = '', 
  showLabel = false,
  // Props for external theme control (for micro-frontend usage)
  theme: externalTheme,
  onToggle: externalOnToggle,
  isDark: externalIsDark,
  ...props 
}) => {
  // Use external props if provided, otherwise use context
  let theme, toggleTheme, isDark;
  
  if (externalTheme !== undefined && externalOnToggle) {
    // Use external theme control (for micro-frontend)
    theme = externalTheme;
    toggleTheme = externalOnToggle;
    isDark = externalIsDark !== undefined ? externalIsDark : theme === 'dark';
  } else {
    // Use context (for standalone usage)
    const themeContext = useThemeSafe();
    if (themeContext) {
      theme = themeContext.theme;
      toggleTheme = themeContext.toggleTheme;
      isDark = themeContext.isDark;
    } else {
      // Fallback if no context is available
      console.warn('ThemeToggle: No ThemeProvider context found, using fallback values');
      theme = 'light';
      toggleTheme = () => console.warn('ThemeToggle: No theme toggle function available');
      isDark = false;
    }
  }

  const getToggleClasses = () => {
    const baseClasses = 'theme-toggle';
    const sizeClasses = `theme-toggle-${size}`;
    
    return [
      baseClasses,
      sizeClasses,
      className
    ].filter(Boolean).join(' ');
  };

  const SunIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="5"/>
      <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
    </svg>
  );

  const MoonIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  );

  return (
    <button
      className={getToggleClasses()}
      onClick={toggleTheme}
      title={`Switch to ${isDark ? 'light' : 'dark'} theme`}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
      {...props}
    >
      <span className="theme-toggle-icon">
        {isDark ? <SunIcon /> : <MoonIcon />}
      </span>
      {showLabel && (
        <span className="theme-toggle-label">
          {isDark ? 'Light' : 'Dark'}
        </span>
      )}
    </button>
  );
};

ThemeToggle.propTypes = {
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  className: PropTypes.string,
  showLabel: PropTypes.bool,
  // Props for external theme control
  theme: PropTypes.oneOf(['light', 'dark']),
  onToggle: PropTypes.func,
  isDark: PropTypes.bool,
};

export default ThemeToggle;
