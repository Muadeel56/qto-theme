import React, { useState } from 'react';
import { X } from 'lucide-react';

// Modal component WITHOUT createPortal for testing
const ModalWithoutPortal = ({ 
  open = false,
  onClose, 
  title, 
  children, 
  actions,
}) => {
  if (!open) return null;

  return (
    <div 
      className="qto-modal__overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose?.();
        }
      }}
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
        padding: '1rem',
      }}
    >
      <div 
        className="qto-modal__content"
        style={{
          backgroundColor: 'white',
          border: '1px solid #e5e5e5',
          borderRadius: '12px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          maxHeight: '90vh',
          width: '100%',
          maxWidth: '500px',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          fontFamily: 'var(--font-base)',
        }}
      >
        {title && (
          <div 
            className="qto-modal__header"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1rem',
              padding: '1.5rem',
              borderBottom: '1px solid #e5e5e5',
              flexShrink: 0,
            }}
          >
            <h2 
              style={{
                margin: 0,
                fontSize: '1.125rem',
                fontWeight: 600,
                lineHeight: 1.25,
                color: '#171717',
                flex: 1,
                minWidth: 0,
              }}
            >
              {title}
            </h2>
            <button 
              onClick={onClose}
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
                flexShrink: 0,
              }}
            >
              <X size={20} />
            </button>
          </div>
        )}
        
        <div 
          className="qto-modal__body"
          style={{
            padding: '1.5rem',
            flex: 1,
            overflowY: 'auto',
            color: '#171717',
            lineHeight: 1.5,
          }}
        >
          {children}
        </div>

        {actions && (
          <div 
            className="qto-modal__footer"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              padding: '1.5rem',
              borderTop: '1px solid #e5e5e5',
              flexShrink: 0,
              justifyContent: 'flex-end',
            }}
          >
            {actions}
          </div>
        )}
      </div>
    </div>
  );
};

const ModalTestWithoutPortal = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Modal Test Without Portal</h2>
      <p>This modal renders inline instead of using createPortal</p>
      <p>Modal state: {isOpen ? 'OPEN' : 'CLOSED'}</p>
      
      <button 
        onClick={() => setIsOpen(true)}
        style={{
          padding: '0.75rem 1.5rem',
          backgroundColor: '#f2b60f',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: '500',
          marginRight: '1rem'
        }}
      >
        Open Modal (No Portal)
      </button>
      
      <ModalWithoutPortal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        title="Test Modal Without Portal"
        actions={
          <>
            <button 
              onClick={() => setIsOpen(false)}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: 'transparent',
                color: '#f2b60f',
                border: '1px solid #f2b60f',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              Cancel
            </button>
            <button 
              onClick={() => setIsOpen(false)}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: '#f2b60f',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              OK
            </button>
          </>
        }
      >
        <p>This modal doesn't use createPortal and renders inline in the component tree.</p>
        <p>If this works but the regular modal doesn't, then the issue is with the portal implementation.</p>
      </ModalWithoutPortal>
    </div>
  );
};

export default ModalTestWithoutPortal; 