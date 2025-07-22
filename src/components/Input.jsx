import React, { forwardRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useResponsive } from '../hooks/useResponsive';
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
  startIcon,
  endIcon,
  fullWidth = false,
  fullWidthOnMobile = true,
  rounded = false,
  floating = false,
  className = '',
  onFocus,
  onBlur,
  ...props 
}, ref) => {
  const { isMobile, breakpoint } = useResponsive();
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(Boolean(props.value || props.defaultValue));
  
  const inputId = props.id || `qto-input-${Math.random().toString(36).substr(2, 9)}`;

  // Auto full-width on mobile if enabled
  const isFullWidth = fullWidth || (fullWidthOnMobile && isMobile);

  const getInputClasses = () => {
    const baseClasses = 'qto-input__field';
    const sizeClasses = `qto-input__field--${size}`;
    const variantClasses = `qto-input__field--${variant}`;
    const errorClasses = error ? 'qto-input__field--error' : '';
    const disabledClasses = disabled ? 'qto-input__field--disabled' : '';
    const focusedClasses = isFocused ? 'qto-input__field--focused' : '';
    const roundedClasses = rounded ? 'qto-input__field--rounded' : '';
    const fullWidthClasses = isFullWidth ? 'qto-input__field--full-width' : '';
    const responsiveClass = `qto-input__field--${breakpoint}`;
    
    return [
      baseClasses,
      sizeClasses,
      variantClasses,
      errorClasses,
      disabledClasses,
      focusedClasses,
      roundedClasses,
      fullWidthClasses,
      responsiveClass,
      className
    ].filter(Boolean).join(' ');
  };

  const getContainerClasses = () => {
    const baseClasses = 'qto-input';
    const fullWidthClasses = isFullWidth ? 'qto-input--full-width' : '';
    const floatingClasses = floating ? 'qto-input--floating' : '';
    const focusedClasses = isFocused ? 'qto-input--focused' : '';
    const hasValueClasses = hasValue ? 'qto-input--has-value' : '';
    
    return [
      baseClasses,
      fullWidthClasses,
      floatingClasses,
      focusedClasses,
      hasValueClasses
    ].filter(Boolean).join(' ');
  };

  const handleFocus = (e) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e) => {
    setIsFocused(false);
    setHasValue(Boolean(e.target.value));
    onBlur?.(e);
  };

  return (
    <div className={getContainerClasses()}>
      {label && !floating && (
        <label htmlFor={inputId} className="qto-input__label">
          {label}
          {required && <span className="qto-input__required">*</span>}
        </label>
      )}
      
      <div className="qto-input__wrapper">
        {startIcon && (
          <span className="qto-input__icon qto-input__icon--start">
            {startIcon}
          </span>
        )}
        
        <input
          ref={ref}
          id={inputId}
          type={type}
          placeholder={floating ? '' : placeholder}
          disabled={disabled}
          required={required}
          className={getInputClasses()}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        />
        
        {floating && label && (
          <label htmlFor={inputId} className="qto-input__label qto-input__label--floating">
            {label}
            {required && <span className="qto-input__required">*</span>}
          </label>
        )}
        
        {endIcon && (
          <span className="qto-input__icon qto-input__icon--end">
            {endIcon}
          </span>
        )}
      </div>
      
      {error && (
        <span className="qto-input__error" role="alert">
          {error}
        </span>
      )}
      
      {helperText && !error && (
        <span className="qto-input__helper">
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
  fullWidth: PropTypes.bool,
  fullWidthOnMobile: PropTypes.bool,
  rounded: PropTypes.bool,
  floating: PropTypes.bool,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  variant: PropTypes.oneOf(['default', 'filled', 'minimal']),
  startIcon: PropTypes.node,
  endIcon: PropTypes.node,
  className: PropTypes.string,
  id: PropTypes.string,
};

export default Input;
