import React, { useState } from 'react';

const DebugModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  console.log('DebugModal rendering, isOpen:', isOpen);

  const handleOpen = () => {
    console.log('Button clicked, setting modal open to true');
    setIsOpen(true);
    
    // Check if modal is visible after state update
    setTimeout(() => {
      const modalOverlay = document.querySelector('.qto-modal__overlay');
      console.log('Modal overlay element found:', modalOverlay);
      if (modalOverlay) {
        console.log('Modal overlay styles:', getComputedStyle(modalOverlay));
      }
    }, 100);
  };

  const handleClose = () => {
    console.log('Closing modal');
    setIsOpen(false);
  };

  // Simple modal implementation without complex dependencies
  return (
    <div style={{ padding: '2rem' }}>
      <h2>Debug Modal Test</h2>
      <p>Modal state: {isOpen ? 'OPEN' : 'CLOSED'}</p>
      
      <button 
        onClick={handleOpen}
        style={{
          padding: '0.75rem 1.5rem',
          backgroundColor: '#f2b60f',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: '500'
        }}
      >
        Open Debug Modal
      </button>

      {/* Simple modal without complex styling first */}
      {isOpen && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1050
          }}
          onClick={handleClose}
        >
          <div 
            style={{
              backgroundColor: 'white',
              padding: '2rem',
              borderRadius: '8px',
              maxWidth: '500px',
              width: '90%',
              maxHeight: '90vh',
              overflow: 'auto'
            }}
            onClick={e => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ margin: 0 }}>Debug Modal</h3>
              <button 
                onClick={handleClose}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '24px',
                  cursor: 'pointer',
                  padding: '0',
                  width: '30px',
                  height: '30px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                ×
              </button>
            </div>
            <p>This is a simple debug modal with inline styles.</p>
            <p>If you can see this, React state management is working correctly.</p>
            <button 
              onClick={handleClose}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: '#6b7280',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                marginTop: '1rem'
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DebugModal; 