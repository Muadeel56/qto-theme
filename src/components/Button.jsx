import React from 'react';
import PropTypes from 'prop-types';
import '../styles/button.css';

const Button = ({ 
  variant = 'primary', 
  size = 'md', 
  disabled = false, 
  loading = false,
  fullWidth = false,
  children, 
  className = '',
  leftIcon,
  rightIcon,
  ...props 
}) => {
  const getButtonClasses = () => {
    const baseClasses = 'btn';
    const variantClasses = `btn-${variant}`;
    const sizeClasses = `btn-${size}`;
    const fullWidthClass = fullWidth ? 'btn-full-width' : '';
    const disabledClass = disabled || loading ? 'btn-disabled' : '';
    const loadingClass = loading ? 'btn-loading' : '';
    
    return [
      baseClasses,
      variantClasses,
      sizeClasses,
      fullWidthClass,
      disabledClass,
      loadingClass,
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
        <span className="btn-spinner" aria-hidden="true">
          <svg className="btn-spinner-icon" viewBox="0 0 24 24">
            <circle 
              className="btn-spinner-circle" 
              cx="12" 
              cy="12" 
              r="10" 
              stroke="currentColor" 
              strokeWidth="4" 
              fill="none"
            />
            <path 
              className="btn-spinner-path" 
              fill="currentColor" 
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        </span>
      )}
      {leftIcon && !loading && (
        <span className="btn-icon btn-icon-left">{leftIcon}</span>
      )}
      {children}
      {rightIcon && !loading && (
        <span className="btn-icon btn-icon-right">{rightIcon}</span>
      )}
    </button>
  );
};

Button.propTypes = {
  variant: PropTypes.oneOf(['primary', 'secondary', 'outline', 'ghost', 'danger']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  fullWidth: PropTypes.bool,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  leftIcon: PropTypes.node,
  rightIcon: PropTypes.node,
};

export default Button;
