import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { X, CheckCircle, AlertTriangle, XCircle, Info } from 'lucide-react';
import { useResponsive } from '../hooks/useResponsive';
import '../styles/alert.css';

const Alert = ({ 
  type = 'info', 
  variant = 'soft',
  title,
  description,
  children,
  onClose,
  dismissible = true,
  className = '',
  fullWidthOnMobile = true,
  icon: customIcon,
  animate = true,
  ...props 
}) => {
  const { isMobile } = useResponsive();
  const [isVisible, setIsVisible] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  // Handle dismiss functionality
  const handleClose = () => {
    if (!onClose) return;
    
    if (animate) {
      setIsAnimating(true);
      setTimeout(() => {
        setIsVisible(false);
        onClose();
      }, 300); // Match transition duration
    } else {
      setIsVisible(false);
      onClose();
    }
  };

  // Auto-animate on mount
  useEffect(() => {
    if (animate) {
      setIsAnimating(false);
    }
  }, [animate]);

  const getAlertClasses = () => {
    const baseClasses = 'qto-alert';
    const typeClass = `qto-alert--${type}`;
    const variantClass = variant !== 'soft' ? `qto-alert--${variant}` : '';
    const responsiveClass = fullWidthOnMobile && isMobile ? 'qto-alert--mobile' : 'qto-alert--desktop';
    const animationClass = animate ? (isAnimating ? 'qto-alert--animate-out' : 'qto-alert--animate-in') : '';
    
    return [
      baseClasses,
      typeClass,
      variantClass,
      responsiveClass,
      animationClass,
      className
    ].filter(Boolean).join(' ');
  };

  const getDefaultIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="qto-alert__icon" />;
      case 'warning':
        return <AlertTriangle className="qto-alert__icon" />;
      case 'error':
        return <XCircle className="qto-alert__icon" />;
      case 'info':
      default:
        return <Info className="qto-alert__icon" />;
    }
  };

  const renderIcon = () => {
    if (customIcon) {
      return React.cloneElement(customIcon, { 
        className: `qto-alert__icon ${customIcon.props?.className || ''}` 
      });
    }
    return getDefaultIcon();
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div 
      className={getAlertClasses()} 
      role="alert" 
      aria-live="polite"
      {...props}
    >
      <div className="qto-alert__content">
        {renderIcon()}
        
        <div className="qto-alert__text-content">
          {title && (
            <div className="qto-alert__title">{title}</div>
          )}
          {description && (
            <div className="qto-alert__description">{description}</div>
          )}
          {children && !description && (
            <div className="qto-alert__description">{children}</div>
          )}
        </div>
        
        {dismissible && (
          <button
            className="qto-alert__close"
            onClick={handleClose}
            aria-label="Dismiss alert"
            type="button"
          >
            <X />
          </button>
        )}
      </div>
    </div>
  );
};

Alert.propTypes = {
  /** Alert type/severity - affects color scheme */
  type: PropTypes.oneOf(['success', 'warning', 'error', 'info']),
  /** Visual variant of the alert */
  variant: PropTypes.oneOf(['soft', 'outlined', 'filled']),
  /** Bold title text */
  title: PropTypes.string,
  /** Optional description text */
  description: PropTypes.string,
  /** Content to display (alternative to description) */
  children: PropTypes.node,
  /** Callback fired when alert is dismissed */
  onClose: PropTypes.func,
  /** Whether the alert can be dismissed */
  dismissible: PropTypes.bool,
  /** Additional CSS class names */
  className: PropTypes.string,
  /** Whether to use full width on mobile devices */
  fullWidthOnMobile: PropTypes.bool,
  /** Custom icon to override default type icon */
  icon: PropTypes.element,
  /** Whether to animate the alert appearance/disappearance */
  animate: PropTypes.bool,
};

export default Alert;
