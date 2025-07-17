import React from 'react';
import PropTypes from 'prop-types';
import '../styles/alert.css';

const Alert = ({ 
  variant = 'info', 
  title,
  children,
  onClose,
  dismissible = false,
  className = '',
  ...props 
}) => {
  const getAlertClasses = () => {
    const baseClasses = 'alert';
    const variantClasses = `alert-${variant}`;
    const dismissibleClass = dismissible ? 'alert-dismissible' : '';
    
    return [
      baseClasses,
      variantClasses,
      dismissibleClass,
      className
    ].filter(Boolean).join(' ');
  };

  const getIcon = () => {
    switch (variant) {
      case 'success':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 12l2 2 4-4"/>
            <circle cx="12" cy="12" r="10"/>
          </svg>
        );
      case 'warning':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
            <line x1="12" y1="9" x2="12" y2="13"/>
            <line x1="12" y1="17" x2="12.01" y2="17"/>
          </svg>
        );
      case 'error':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
            <line x1="15" y1="9" x2="9" y2="15"/>
            <line x1="9" y1="9" x2="15" y2="15"/>
          </svg>
        );
      default:
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="16" x2="12" y2="12"/>
            <line x1="12" y1="8" x2="12.01" y2="8"/>
          </svg>
        );
    }
  };

  const CloseIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="18" y1="6" x2="6" y2="18"/>
      <line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  );

  return (
    <div className={getAlertClasses()} {...props}>
      <div className="alert-content">
        <div className="alert-icon">
          {getIcon()}
        </div>
        <div className="alert-body">
          {title && <div className="alert-title">{title}</div>}
          <div className="alert-message">{children}</div>
        </div>
        {dismissible && (
          <button 
            className="alert-close" 
            onClick={onClose}
            aria-label="Close alert"
          >
            <CloseIcon />
          </button>
        )}
      </div>
    </div>
  );
};

Alert.propTypes = {
  variant: PropTypes.oneOf(['info', 'success', 'warning', 'error']),
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func,
  dismissible: PropTypes.bool,
  className: PropTypes.string,
};

export default Alert;
