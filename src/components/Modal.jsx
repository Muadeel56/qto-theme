import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
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

  const getModalClasses = () => {
    const baseClasses = 'qto-modal__content';
    const sizeClass = `qto-modal--${size}`;
    const variantClass = `qto-modal--${variant}`;
    const paddingClass = `qto-modal--padding-${padding}`;
    const responsiveClass = `qto-modal--${breakpoint}`;
    const fullScreenClass = fullScreenOnMobile && isMobile ? 'qto-modal--fullscreen' : '';
    const animateClass = animate ? 'qto-modal--animate' : '';
    
    return [
      baseClasses,
      sizeClass,
      variantClass,
      paddingClass,
      responsiveClass,
      fullScreenClass,
      animateClass,
      className
    ].filter(Boolean).join(' ');
  };

  const getOverlayClasses = () => {
    const baseClasses = 'qto-modal__overlay';
    const responsiveClass = isMobile ? 'qto-modal__overlay--mobile' : 
                           isTablet ? 'qto-modal__overlay--tablet' : 'qto-modal__overlay--desktop';
    const animateClass = animate ? 'qto-modal__overlay--animate' : '';
    
    return [baseClasses, responsiveClass, animateClass].filter(Boolean).join(' ');
  };

  return (
    <div 
      className={getOverlayClasses()} 
      onClick={handleBackdropClick} 
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'qto-modal-title' : undefined}
      {...props}
    >
      <div 
        ref={modalRef}
        className={getModalClasses()} 
        onKeyDown={handleTabKey}
      >
        {(title || showCloseButton) && (
          <div className="qto-modal__header">
            {title && (
              <h2 id="qto-modal-title" className="qto-modal__title">
                {title}
              </h2>
            )}
            {showCloseButton && !preventClose && (
              <button 
                className="qto-modal__close" 
                onClick={onClose}
                aria-label="Close modal"
                type="button"
              >
                <X />
              </button>
            )}
          </div>
        )}
        
        <div className="qto-modal__body">
          {children}
        </div>

        {actions && (
          <div className="qto-modal__footer">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
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
