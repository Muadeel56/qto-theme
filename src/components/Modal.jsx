import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { useResponsive } from '../hooks/useResponsive';
import '../styles/modal.css';

const Modal = ({ 
  open = false,
  onClose, 
  title, 
  children, 
  size = 'md',
  variant = 'soft',
  padding = 'md',
  closeOnBackdrop = true,
  showCloseButton = true,
  className = '',
  actions,
  fullScreenOnMobile = true,
  preventClose = false,
  animate = true,
  ...props 
}) => {
  const { isMobile, isTablet, breakpoint } = useResponsive();
  const modalRef = useRef(null);
  const previousActiveElement = useRef(null);

  const handleBackdropClick = (e) => {
    if (closeOnBackdrop && !preventClose && e.target === e.currentTarget) {
      onClose?.();
    }
  };

  const handleEscapeKey = (e) => {
    if (e.key === 'Escape' && open && !preventClose) {
      onClose?.();
    }
  };

  // Focus management for accessibility
  useEffect(() => {
    if (open) {
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
      document.body.classList.add('qto-modal-open');
    } else {
      document.body.style.overflow = '';
      document.body.classList.remove('qto-modal-open');
      
      // Restore focus
      if (previousActiveElement.current) {
        previousActiveElement.current.focus();
      }
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = '';
      document.body.classList.remove('qto-modal-open');
    };
  }, [open, preventClose, onClose]);

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

  if (!open) return null;

  // Size mapping for inline styles
  const getSizeStyles = () => {
    const sizeMap = {
      xs: { maxWidth: '320px' },
      sm: { maxWidth: '400px' },
      md: { maxWidth: '500px' },
      lg: { maxWidth: '600px' },
      xl: { maxWidth: '800px' },
      full: { maxWidth: '95vw', height: '95vh' }
    };
    return sizeMap[size] || sizeMap.md;
  };

  // Variant styling for inline styles
  const getVariantStyles = () => {
    switch (variant) {
      case 'glass':
        return {
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        };
      case 'outlined':
        return {
          backgroundColor: '#ffffff',
          border: '2px solid #f2b60f',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
        };
      default: // soft
        return {
          backgroundColor: '#ffffff',
          border: '1px solid #e5e5e5'
        };
    }
  };

  const modalContent = (
    <div 
      onClick={handleBackdropClick} 
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'qto-modal-title' : undefined}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1050,
        padding: fullScreenOnMobile && isMobile ? '0' : '1rem'
      }}
      {...props}
    >
      <div 
        ref={modalRef}
        onKeyDown={handleTabKey}
        tabIndex={-1}
        style={{
          ...getVariantStyles(),
          ...getSizeStyles(),
          borderRadius: fullScreenOnMobile && isMobile ? '0' : '12px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          maxHeight: fullScreenOnMobile && isMobile ? '100vh' : '90vh',
          width: fullScreenOnMobile && isMobile ? '100vw' : '100%',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          overflow: 'hidden'
        }}
      >
        {(title || showCloseButton) && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            padding: '1.5rem',
            borderBottom: '1px solid #e5e5e5',
            flexShrink: 0
          }}>
            {title && (
              <h2 id="qto-modal-title" style={{
                margin: 0,
                fontSize: '1.125rem',
                fontWeight: 600,
                lineHeight: 1.25,
                color: '#171717',
                flex: 1,
                minWidth: 0
              }}>
                {title}
              </h2>
            )}
            {showCloseButton && !preventClose && (
              <button 
                onClick={onClose}
                aria-label="Close modal"
                type="button"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '40px',
                  height: '40px',
                  border: 'none',
                  background: 'transparent',
                  color: '#525252',
                  cursor: 'pointer',
                  borderRadius: '6px',
                  transition: 'all 0.15s ease',
                  flexShrink: 0
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#f5f5f5';
                  e.target.style.color = '#171717';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.color = '#525252';
                }}
              >
                <X size={20} />
              </button>
            )}
          </div>
        )}
        
        <div style={{
          padding: '1.5rem',
          flex: 1,
          overflowY: 'auto',
          color: '#171717',
          lineHeight: 1.5
        }}>
          {children}
        </div>

        {actions && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            padding: '1.5rem',
            borderTop: '1px solid #e5e5e5',
            flexShrink: 0,
            justifyContent: 'flex-end'
          }}>
            {actions}
          </div>
        )}
      </div>
    </div>
  );

  // Render modal in a portal for better isolation
  return createPortal(modalContent, document.body);
};

// Compound components for better reusability
const ModalHeader = ({ children, className = '', ...props }) => {
  return (
    <div className={`qto-modal__header ${className}`} {...props}>
      {children}
    </div>
  );
};

const ModalBody = ({ children, className = '', scrollable = false, ...props }) => {
  const bodyClasses = `qto-modal__body ${scrollable ? 'qto-modal__body--scrollable' : ''} ${className}`;
  
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
    'qto-modal__footer',
    `qto-modal__footer--justify-${justify}`,
    stackOnMobile && isMobile ? 'qto-modal__footer--stacked' : '',
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
  /** Whether the modal is open */
  open: PropTypes.bool,
  /** Callback fired when the modal should close */
  onClose: PropTypes.func.isRequired,
  /** Modal title */
  title: PropTypes.node,
  /** Modal content */
  children: PropTypes.node.isRequired,
  /** Size of the modal */
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl', 'full']),
  /** Visual variant of the modal */
  variant: PropTypes.oneOf(['soft', 'glass', 'outlined']),
  /** Padding size */
  padding: PropTypes.oneOf(['sm', 'md', 'lg']),
  /** Whether clicking backdrop closes modal */
  closeOnBackdrop: PropTypes.bool,
  /** Whether to show close button */
  showCloseButton: PropTypes.bool,
  /** Additional CSS class names */
  className: PropTypes.string,
  /** Action buttons in footer */
  actions: PropTypes.node,
  /** Whether to go fullscreen on mobile */
  fullScreenOnMobile: PropTypes.bool,
  /** Whether to prevent closing */
  preventClose: PropTypes.bool,
  /** Whether to animate */
  animate: PropTypes.bool,
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
