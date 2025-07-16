import React from 'react';
import PropTypes from 'prop-types';
import '../styles/badge.css';

const Badge = ({ 
  variant = 'primary',
  size = 'md',
  rounded = 'md',
  children,
  className = '',
  ...props 
}) => {
  const getBadgeClasses = () => {
    const baseClasses = 'badge';
    const variantClasses = `badge-${variant}`;
    const sizeClasses = `badge-${size}`;
    const roundedClasses = `badge-rounded-${rounded}`;
    
    return [
      baseClasses,
      variantClasses,
      sizeClasses,
      roundedClasses,
      className
    ].filter(Boolean).join(' ');
  };

  return (
    <span className={getBadgeClasses()} {...props}>
      {children}
    </span>
  );
};

Badge.propTypes = {
  variant: PropTypes.oneOf(['primary', 'secondary', 'success', 'warning', 'error', 'info']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  rounded: PropTypes.oneOf(['sm', 'md', 'lg', 'full']),
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Badge;
