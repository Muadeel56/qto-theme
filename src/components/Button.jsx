import React from 'react';
import PropTypes from 'prop-types';
import { useResponsive } from '../hooks/useResponsive';
import '../styles/button.css';

const Button = ({ 
  variant = 'primary', 
  size = 'md', 
  disabled = false, 
  loading = false,
  fullWidth = false,
  children, 
  className = '',
  startIcon,
  endIcon,
  rounded = false,
  gradient = false,
  responsive = false,
  ...props 
}) => {
  const { isMobile, breakpoint } = useResponsive();
  
  // Responsive size adjustment
  const getResponsiveSize = () => {
    if (!responsive) return size;
    
    // Auto-adjust size on different breakpoints
    if (isMobile) {
      return size === 'xs' ? 'sm' : size === 'sm' ? 'md' : size;
    }
    return size;
  };

  const actualSize = getResponsiveSize();
  
  const getButtonClasses = () => {
    const baseClasses = 'qto-btn';
    const variantClasses = `qto-btn--${variant}`;
    const sizeClasses = `qto-btn--${actualSize}`;
    const fullWidthClass = fullWidth ? 'qto-btn--full-width' : '';
    const disabledClass = disabled || loading ? 'qto-btn--disabled' : '';
    const loadingClass = loading ? 'qto-btn--loading' : '';
    const roundedClass = rounded ? 'qto-btn--rounded' : '';
    const gradientClass = gradient ? 'qto-btn--gradient' : '';
    const responsiveClass = responsive ? 'qto-btn--responsive' : '';
    const breakpointClass = `qto-btn--${breakpoint}`;
    
    return [
      baseClasses,
      variantClasses,
      sizeClasses,
      fullWidthClass,
      disabledClass,
      loadingClass,
      roundedClass,
      gradientClass,
      responsiveClass,
      breakpointClass,
      className
    ].filter(Boolean).join(' ');
  };

  return (
    <button
      className={getButtonClasses()}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <span className="qto-btn__spinner" aria-hidden="true">
          <svg className="qto-btn__spinner-icon" viewBox="0 0 24 24">
            <circle 
              className="qto-btn__spinner-circle" 
              cx="12" 
              cy="12" 
              r="10" 
              stroke="currentColor" 
              strokeWidth="4" 
              fill="none"
            />
            <path 
              className="qto-btn__spinner-path" 
              fill="currentColor" 
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        </span>
      )}
      {startIcon && !loading && (
        <span className="qto-btn__icon qto-btn__icon--start" aria-hidden="true">
          {startIcon}
        </span>
      )}
      <span className="qto-btn__content">{children}</span>
      {endIcon && !loading && (
        <span className="qto-btn__icon qto-btn__icon--end" aria-hidden="true">
          {endIcon}
        </span>
      )}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node,
  variant: PropTypes.oneOf([
    'primary', 
    'secondary', 
    'success', 
    'danger', 
    'warning', 
    'info',
    'outline-primary',
    'outline-secondary', 
    'outline-success', 
    'outline-danger', 
    'outline-warning', 
    'outline-info',
    'ghost', 
    'link'
  ]),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  onClick: PropTypes.func,
  className: PropTypes.string,
  gradient: PropTypes.bool,
  icon: PropTypes.node,
  iconPosition: PropTypes.oneOf(['left', 'right']),
  fullWidth: PropTypes.bool,
  rounded: PropTypes.bool
};

export default Button;
