import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useResponsive } from '../hooks/useResponsive';
import '../styles/alert.css';

const Alert = ({ 
  variant = 'info', 
  title,
  children,
  onClose,
  dismissible = false,
  className = '',
  collapsible = false,
  defaultCollapsed = false,
  maxWidth,
  fullWidthOnMobile = true,
  actions,
  ...props 
}) => {
  const { isMobile, breakpoint } = useResponsive();
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);

  const getAlertClasses = () => {
    const baseClasses = 'qto-alert';
    const variantClasses = `qto-alert--${variant}`;
    const dismissibleClass = dismissible ? 'qto-alert--dismissible' : '';
    const collapsibleClass = collapsible ? 'qto-alert--collapsible' : '';
    const collapsedClass = isCollapsed ? 'qto-alert--collapsed' : '';
    const responsiveClass = `qto-alert--${breakpoint}`;
    const fullWidthClass = fullWidthOnMobile && isMobile ? 'qto-alert--full-width' : '';
    
    return [
      baseClasses,
      variantClasses,
      dismissibleClass,
      collapsibleClass,
      collapsedClass,
      responsiveClass,
      fullWidthClass,
      className
    ].filter(Boolean).join(' ');
  };

  const getIcon = () => {
    switch (variant) {
      case 'success':
        return (
          <svg className="qto-alert__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 12l2 2 4-4"/>
            <circle cx="12" cy="12" r="10"/>
          </svg>
        );
      case 'warning':
        return (
          <svg className="qto-alert__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
            <line x1="12" y1="9" x2="12" y2="13"/>
            <line x1="12" y1="17" x2="12.01" y2="17"/>
          </svg>
        );
      case 'error':
        return (
          <svg className="qto-alert__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
            <line x1="15" y1="9" x2="9" y2="15"/>
            <line x1="9" y1="9" x2="15" y2="15"/>
          </svg>
        );
      case 'info':
      default:
        return (
          <svg className="qto-alert__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="16" x2="12" y2="12"/>
            <line x1="12" y1="8" x2="12.01" y2="8"/>
          </svg>
        );
    }
  };

  return (
    <div 
      className={getAlertClasses()} 
      style={maxWidth && !isMobile ? { maxWidth } : undefined}
      role="alert" 
      {...props}
    >
      <div className="qto-alert__content">
        <div className="qto-alert__header">
          <div className="qto-alert__icon-title">
            {getIcon()}
            {title && (
              <div className="qto-alert__title-section">
                <h4 className="qto-alert__title">{title}</h4>
              </div>
            )}
          </div>
          
          <div className="qto-alert__controls">
            {collapsible && (
              <button
                className="qto-alert__toggle"
                onClick={() => setIsCollapsed(!isCollapsed)}
                aria-label={isCollapsed ? 'Expand alert' : 'Collapse alert'}
                aria-expanded={!isCollapsed}
              >
                <svg 
                  className={`qto-alert__toggle-icon ${isCollapsed ? 'qto-alert__toggle-icon--collapsed' : ''}`}
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2"
                >
                  <polyline points="6,9 12,15 18,9"></polyline>
                </svg>
              </button>
            )}
            
            {dismissible && (
              <button
                className="qto-alert__close"
                onClick={onClose}
                aria-label="Close alert"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            )}
          </div>
        </div>

        {(!collapsible || !isCollapsed) && (
          <div className="qto-alert__body">
            {children && (
              <div className="qto-alert__message">
                {children}
              </div>
            )}
            
            {actions && (
              <div className="qto-alert__actions">
                {actions}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

Alert.propTypes = {
  variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']),
  title: PropTypes.string,
  children: PropTypes.node,
  onClose: PropTypes.func,
  dismissible: PropTypes.bool,
  className: PropTypes.string,
  collapsible: PropTypes.bool,
  defaultCollapsed: PropTypes.bool,
  maxWidth: PropTypes.string,
  fullWidthOnMobile: PropTypes.bool,
  actions: PropTypes.node,
};

export default Alert;
