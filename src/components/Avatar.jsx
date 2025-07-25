import React from 'react';
import PropTypes from 'prop-types';
import '../styles/avatar.css';

const Avatar = ({ 
  src,
  alt,
  name,
  size = 'md',
  variant = 'circular',
  color = 'primary',
  fallback,
  className = '',
  ...props 
}) => {
  const getAvatarClasses = () => {
    const baseClasses = 'avatar';
    const sizeClasses = `avatar-${size}`;
    const variantClasses = `avatar-${variant}`;
    const colorClasses = `avatar-${color}`;
    
    return [
      baseClasses,
      sizeClasses,
      variantClasses,
      colorClasses,
      className
    ].filter(Boolean).join(' ');
  };

  const getInitials = (name) => {
    if (!name) return '';
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const renderContent = () => {
    if (src) {
      return (
        <img 
          src={src} 
          alt={alt || name || 'Avatar'} 
          className="avatar-image"
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
      );
    }
    
    if (fallback) {
      return <span className="avatar-fallback">{fallback}</span>;
    }
    
    if (name) {
      return <span className="avatar-initials">{getInitials(name)}</span>;
    }
    
    return (
      <svg className="avatar-icon" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
      </svg>
    );
  };

  return (
    <div className={getAvatarClasses()} {...props}>
      {renderContent()}
    </div>
  );
};

Avatar.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  name: PropTypes.string,
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl', '2xl']),
  variant: PropTypes.oneOf(['circular', 'square', 'rounded', 'gradient', 'outlined', 'soft']),
  color: PropTypes.oneOf(['primary', 'secondary', 'success', 'danger', 'warning', 'info']),
  fallback: PropTypes.node,
  className: PropTypes.string,
};

export default Avatar;
