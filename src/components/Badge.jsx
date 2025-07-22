import React from 'react';
import PropTypes from 'prop-types';
import '../styles/badge.css';

const Badge = ({ 
  variant = 'primary',
  size = 'md',
  rounded = 'md',
  outline = false,
  dot = false,
  closable = false,
  icon,
  children,
  className = '',
  onClose,
  ...props 
}) => {
  const getBadgeClasses = () => {
    const baseClasses = 'qto-badge';
    const variantClasses = `qto-badge--${variant}`;
    const sizeClasses = `qto-badge--${size}`;
    const roundedClasses = `qto-badge--rounded-${rounded}`;
    const outlineClasses = outline ? 'qto-badge--outline' : '';
    const dotClasses = dot ? 'qto-badge--dot' : '';
    const iconClasses = icon ? 'qto-badge--with-icon' : '';
    const closableClasses = closable ? 'qto-badge--closable' : '';
    
    return [
      baseClasses,
      variantClasses,
      sizeClasses,
      roundedClasses,
      outlineClasses,
      dotClasses,
      iconClasses,
      closableClasses,
      className
    ].filter(Boolean).join(' ');
  };

  const handleClose = (e) => {
    e.stopPropagation();
    onClose?.(e);
  };

  if (dot) {
    return (
      <span className={getBadgeClasses()} {...props} />
    );
  }

  return (
    <span className={getBadgeClasses()} {...props}>
      {icon && (
        <span className="qto-badge__icon">
          {icon}
        </span>
      )}
      <span className="qto-badge__content">
        {children}
      </span>
      {closable && (
        <button
          type="button"
          className="qto-badge__close"
          onClick={handleClose}
          aria-label="Remove badge"
        >
          ×
        </button>
      )}
    </span>
  );
};

Badge.propTypes = {
  variant: PropTypes.oneOf(['primary', 'secondary', 'success', 'warning', 'error', 'info', 'neutral']),
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  rounded: PropTypes.oneOf(['sm', 'md', 'lg', 'full']),
  outline: PropTypes.bool,
  dot: PropTypes.bool,
  closable: PropTypes.bool,
  icon: PropTypes.node,
  children: PropTypes.node,
  className: PropTypes.string,
  onClose: PropTypes.func
};

export default Badge;
