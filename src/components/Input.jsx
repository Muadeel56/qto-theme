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
    
    return [
      baseClasses,
      className
    ].filter(Boolean).join(' ');
  };

  const getContainerClasses = () => {
    const baseClasses = 'qto-input';
    const sizeClasses = `qto-input--${size}`;
    const variantClasses = `qto-input--${variant}`;
    const errorClasses = error ? 'qto-input--error' : '';
    const successClasses = props.success ? 'qto-input--success' : '';
    const disabledClasses = disabled ? 'qto-input--disabled' : '';
    const fullWidthClasses = isFullWidth ? 'qto-input--full-width' : '';
    const startIconClasses = startIcon ? 'qto-input--with-start-icon' : '';
    const endIconClasses = endIcon ? 'qto-input--with-end-icon' : '';
    const bothIconsClasses = startIcon && endIcon ? 'qto-input--with-both-icons' : '';
    
    return [
      baseClasses,
      sizeClasses,
      variantClasses,
      errorClasses,
      successClasses,
      disabledClasses,
      fullWidthClasses,
      startIconClasses,
      endIconClasses,
      bothIconsClasses
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
          <span className="qto-input__start-icon">
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
          <span className="qto-input__end-icon">
            {endIcon}
          </span>
        )}
      </div>
      
      {(error || helperText) && (
        <span className="qto-input__helper-text">
          {error || helperText}
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
  success: PropTypes.bool,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  variant: PropTypes.oneOf(['default', 'outlined', 'filled', 'underlined']),
  startIcon: PropTypes.node,
  endIcon: PropTypes.node,
  className: PropTypes.string,
  id: PropTypes.string,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
};

export default Input;
