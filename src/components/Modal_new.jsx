import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useResponsive } from '../hooks/useResponsive';
import '../styles/modal.css';

const Modal = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  size = 'md',
  closeOnBackdrop = true,
  showCloseButton = true,
  className = '',
  footer,
  maxWidth,
  fullScreenOnMobile = true,
  preventClose = false,
  ...props 
}) => {
  const { isMobile, isTablet, breakpoint } = useResponsive();
  const modalRef = useRef(null);
  const previousActiveElement = useRef(null);

  const handleBackdropClick = (e) => {
    if (closeOnBackdrop && !preventClose && e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleEscapeKey = (e) => {
    if (e.key === 'Escape' && isOpen && !preventClose) {
      onClose();
    }
  };

  // Focus management for accessibility
  useEffect(() => {
    if (isOpen) {
      previousActiveElement.current = document.activeElement;
      
      // Focus the modal
      const focusableElements = modalRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      
      if (focusableElements?.length > 0) {
        focusableElements[0].focus();
      }

      // Add event listeners
      document.addEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'hidden';
      
      // Add modal-open class to body for additional styling
      document.body.classList.add('modal-open');
    } else {
      document.body.style.overflow = '';
      document.body.classList.remove('modal-open');
      
      // Restore focus
      if (previousActiveElement.current) {
        previousActiveElement.current.focus();
      }
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = '';
      document.body.classList.remove('modal-open');
    };
  }, [isOpen, preventClose]);

  // Trap focus within modal
  const handleTabKey = (e) => {
    if (e.key !== 'Tab') return;

    const focusableElements = modalRef.current?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    if (!focusableElements?.length) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      }
    } else {
      if (document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  };

  if (!isOpen) return null;

  const getModalClasses = () => {
    const baseClasses = 'modal-content';
    const sizeClasses = `modal-${size}`;
    const responsiveClass = `modal--${breakpoint}`;
    const fullScreenClass = fullScreenOnMobile && isMobile ? 'modal--fullscreen' : '';
    
    return [
      baseClasses,
      sizeClasses,
      responsiveClass,
      fullScreenClass,
      className
    ].filter(Boolean).join(' ');
  };

  const getOverlayClasses = () => {
    const baseClasses = 'modal-overlay';
    const responsiveClass = isMobile ? 'modal-overlay--mobile' : 
                           isTablet ? 'modal-overlay--tablet' : 'modal-overlay--desktop';
    
    return [baseClasses, responsiveClass].filter(Boolean).join(' ');
  };

  return (
    <div 
      className={getOverlayClasses()} 
      onClick={handleBackdropClick} 
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'modal-title' : undefined}
      {...props}
    >
      <div 
        ref={modalRef}
        className={getModalClasses()} 
        style={maxWidth && !isMobile ? { maxWidth } : undefined}
        onKeyDown={handleTabKey}
      >
        {(title || showCloseButton) && (
          <div className="modal-header">
            {title && (
              <h2 id="modal-title" className="modal-title">
                {title}
              </h2>
            )}
            {showCloseButton && !preventClose && (
              <button 
                className="modal-close-button" 
                onClick={onClose}
                aria-label="Close modal"
                type="button"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            )}
          </div>
        )}
        
        <div className="modal-body">
          {children}
        </div>

        {footer && (
          <div className="modal-footer">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

// Compound components for better reusability
const ModalHeader = ({ children, className = '', ...props }) => {
  return (
    <div className={`modal-header ${className}`} {...props}>
      {children}
    </div>
  );
};

const ModalBody = ({ children, className = '', scrollable = false, ...props }) => {
  const bodyClasses = `modal-body ${scrollable ? 'modal-body--scrollable' : ''} ${className}`;
  
  return (
    <div className={bodyClasses} {...props}>
      {children}
    </div>
  );
};

const ModalFooter = ({ 
  children, 
  className = '', 
  justify = 'end',
  stackOnMobile = true,
  ...props 
}) => {
  const { isMobile } = useResponsive();
  
  const footerClasses = [
    'modal-footer',
    `modal-footer--justify-${justify}`,
    stackOnMobile && isMobile ? 'modal-footer--stacked' : '',
    className
  ].filter(Boolean).join(' ');
  
  return (
    <div className={footerClasses} {...props}>
      {children}
    </div>
  );
};

// Export compound components
Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.node,
  children: PropTypes.node.isRequired,
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl', 'full']),
  closeOnBackdrop: PropTypes.bool,
  showCloseButton: PropTypes.bool,
  className: PropTypes.string,
  footer: PropTypes.node,
  maxWidth: PropTypes.string,
  fullScreenOnMobile: PropTypes.bool,
  preventClose: PropTypes.bool,
};

ModalHeader.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

ModalBody.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  scrollable: PropTypes.bool,
};

ModalFooter.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  justify: PropTypes.oneOf(['start', 'center', 'end', 'between']),
  stackOnMobile: PropTypes.bool,
};

export default Modal;
