import React, { useState } from 'react';
import AlertExample from './AlertExample';
import ModalExample from './ModalExample';
import ChartExample from './ChartExample';
import './Demo.css';

const QTOThemeDemo = () => {
  const [activeSection, setActiveSection] = useState('alerts');

  const navStyle = {
    display: 'flex',
    gap: '1rem',
    marginBottom: '2rem',
    borderBottom: '1px solid var(--color-border)',
    paddingBottom: '1rem',
  };

  const navButtonStyle = (isActive) => ({
    padding: '0.75rem 1.5rem',
    border: 'none',
    background: isActive ? 'var(--color-primary)' : 'transparent',
    color: isActive ? 'white' : 'var(--color-text)',
    cursor: 'pointer',
    borderRadius: 'var(--radius-md)',
    fontWeight: isActive ? 600 : 400,
    fontSize: 'var(--text-sm)',
    transition: 'all 0.2s ease',
  });

  return (
    <div className="qto-theme-demo">
      <header className="demo-header">
        <h1>QTO House Theme System</h1>
        <p>Comprehensive design system components with dark/light mode support</p>
      </header>
      
      <nav style={navStyle}>
        <button
          style={navButtonStyle(activeSection === 'alerts')}
          onClick={() => setActiveSection('alerts')}
        >
          Alerts
        </button>
        <button
          style={navButtonStyle(activeSection === 'modals')}
          onClick={() => setActiveSection('modals')}
        >
          Modals
        </button>
        <button
          style={navButtonStyle(activeSection === 'charts')}
          onClick={() => setActiveSection('charts')}
        >
          Charts
        </button>
      </nav>
      
      <main className="demo-content">
        {activeSection === 'alerts' && (
          <section>
            <AlertExample />
          </section>
        )}
        
        {activeSection === 'modals' && (
          <section>
            <ModalExample />
          </section>
        )}
        
        {activeSection === 'charts' && (
          <section>
            <ChartExample />
          </section>
        )}
      </main>
    </div>
  );
};

export default QTOThemeDemo;