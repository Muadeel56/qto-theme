import React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from './ThemeProvider';
import '../styles/theme-toggle.css';

const ThemeToggle = ({ 
  variant = 'button',
  size = 'md', 
  className = '', 
  showLabel = true,
  ...props 
}) => {
  const { theme, actualTheme, toggleTheme, setLightTheme, setDarkTheme, setAutoTheme } = useTheme();

  if (variant === 'dropdown') {
    return (
      <div className={`qto-theme-toggle qto-theme-toggle--dropdown qto-theme-toggle--${size} ${className}`}>
        <select 
          value={theme} 
          onChange={(e) => {
            const value = e.target.value;
            if (value === 'light') setLightTheme();
            else if (value === 'dark') setDarkTheme();
            else setAutoTheme();
          }}
          className="qto-theme-toggle__select"
          aria-label="Select theme"
        >
          <option value="light">☀️ Light</option>
          <option value="dark">🌙 Dark</option>
          <option value="auto">🔄 Auto</option>
        </select>
      </div>
    );
  }

  if (variant === 'tabs') {
    return (
      <div className={`qto-theme-toggle qto-theme-toggle--tabs qto-theme-toggle--${size} ${className}`}>
        <div className="qto-theme-toggle__tabs">
          <button
            className={`qto-theme-toggle__tab ${theme === 'light' ? 'qto-theme-toggle__tab--active' : ''}`}
            onClick={setLightTheme}
            aria-label="Light theme"
            title="Light theme"
          >
            <span className="qto-theme-toggle__icon">☀️</span>
            {showLabel && <span className="qto-theme-toggle__label">Light</span>}
          </button>
          <button
            className={`qto-theme-toggle__tab ${theme === 'dark' ? 'qto-theme-toggle__tab--active' : ''}`}
            onClick={setDarkTheme}
            aria-label="Dark theme"
            title="Dark theme"
          >
            <span className="qto-theme-toggle__icon">🌙</span>
            {showLabel && <span className="qto-theme-toggle__label">Dark</span>}
          </button>
          <button
            className={`qto-theme-toggle__tab ${theme === 'auto' ? 'qto-theme-toggle__tab--active' : ''}`}
            onClick={setAutoTheme}
            aria-label="Auto theme"
            title="Auto theme (follows system)"
          >
            <span className="qto-theme-toggle__icon">🔄</span>
            {showLabel && <span className="qto-theme-toggle__label">Auto</span>}
          </button>
        </div>
      </div>
    );
  }

  // Default button variant
  const getThemeIcon = () => {
    if (theme === 'auto') return '🔄';
    return actualTheme === 'dark' ? '🌙' : '☀️';
  };

  const getThemeLabel = () => {
    if (theme === 'auto') return `Auto`;
    return actualTheme === 'dark' ? 'Dark' : 'Light';
  };

  return (
    <button
      onClick={toggleTheme}
      className={`qto-theme-toggle qto-theme-toggle--button qto-theme-toggle--${size} ${className}`}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : theme === 'dark' ? 'auto' : 'light'} theme`}
      title={`Current: ${getThemeLabel()}. Click to toggle.`}
      {...props}
    >
      <span className="qto-theme-toggle__icon">{getThemeIcon()}</span>
      {showLabel && <span className="qto-theme-toggle__label">{getThemeLabel()}</span>}
    </button>
  );
};

ThemeToggle.propTypes = {
  variant: PropTypes.oneOf(['button', 'dropdown', 'tabs']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  className: PropTypes.string,
  showLabel: PropTypes.bool,
};

export default ThemeToggle;
