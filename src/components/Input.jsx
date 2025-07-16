import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import '../styles/input.css';

const Input = forwardRef(({ 
  label,
  type = 'text',
  placeholder,
  error,
  helperText,
  required = false,
  disabled = false,
  size = 'md',
  variant = 'default',
  leftIcon,
  rightIcon,
  className = '',
  ...props 
}, ref) => {
  const inputId = props.id || `input-${Math.random().toString(36).substr(2, 9)}`;

  const getInputClasses = () => {
    const baseClasses = 'input-field';
    const sizeClasses = `input-${size}`;
    const variantClasses = `input-${variant}`;
    const errorClasses = error ? 'input-error' : '';
    const disabledClasses = disabled ? 'input-disabled' : '';
    const iconClasses = leftIcon || rightIcon ? 'input-with-icon' : '';
    
    return [
      baseClasses,
      sizeClasses,
      variantClasses,
      errorClasses,
      disabledClasses,
      iconClasses,
      className
    ].filter(Boolean).join(' ');
  };

  return (
    <div className="input-container">
      {label && (
        <label htmlFor={inputId} className="input-label">
          {label}
          {required && <span className="input-required-indicator">*</span>}
        </label>
      )}
      
      <div className="input-wrapper">
        {leftIcon && (
          <span className="input-icon input-icon-left">
            {leftIcon}
          </span>
        )}
        
        <input
          ref={ref}
          id={inputId}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          className={getInputClasses()}
          {...props}
        />
        
        {rightIcon && (
          <span className="input-icon input-icon-right">
            {rightIcon}
          </span>
        )}
      </div>
      
      {error && (
        <span className="input-error-message" role="alert">
          {error}
        </span>
      )}
      
      {helperText && !error && (
        <span className="input-helper-text">
          {helperText}
        </span>
      )}
    </div>
  );
});

Input.displayName = 'Input';

Input.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  helperText: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  variant: PropTypes.oneOf(['default', 'filled', 'minimal']),
  leftIcon: PropTypes.node,
  rightIcon: PropTypes.node,
  className: PropTypes.string,
  id: PropTypes.string,
};

export default Input;
