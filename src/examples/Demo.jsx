import React, { useState } from 'react';
import { ThemeProvider } from '../components/ThemeProvider';
import ThemeToggle from '../components/ThemeToggle';
import AlertExample from './AlertExample';
import ModalExample from './ModalExample';
import ChartExample from './ChartExample';
import CalendarExample from './CalendarExample';
import './Demo.css';

const QTOThemeDemo = () => {
  const [activeSection, setActiveSection] = useState('calendar');

  const navStyle = {
    display: 'flex',
    gap: '1rem',
    marginBottom: '2rem',
    borderBottom: '1px solid var(--color-border)',
    paddingBottom: '1rem',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
  };

  const navButtonsStyle = {
    display: 'flex',
    gap: '1rem',
    flexWrap: 'wrap',
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
    <ThemeProvider defaultTheme="light">
      <div className="qto-theme-demo">
        <header className="demo-header">
          <h1>QTO House Theme System</h1>
          <p>Comprehensive design system with responsive components and multi-theme support</p>
        </header>
        
        <nav style={navStyle}>
          <div style={navButtonsStyle}>
            <button
              style={navButtonStyle(activeSection === 'calendar')}
              onClick={() => setActiveSection('calendar')}
            >
              📅 Calendar
            </button>
            <button
              style={navButtonStyle(activeSection === 'alerts')}
              onClick={() => setActiveSection('alerts')}
            >
              🚨 Alerts
            </button>
            <button
              style={navButtonStyle(activeSection === 'modals')}
              onClick={() => setActiveSection('modals')}
            >
              💬 Modals
            </button>
            <button
              style={navButtonStyle(activeSection === 'charts')}
              onClick={() => setActiveSection('charts')}
            >
              📊 Charts
            </button>
            <button
              style={navButtonStyle(activeSection === 'themes')}
              onClick={() => setActiveSection('themes')}
            >
              🎨 Theme Demo
            </button>
          </div>
          
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <ThemeToggle variant="tabs" size="sm" showLabel={false} />
          </div>
        </nav>
        
        <main className="demo-content">
          {activeSection === 'calendar' && (
            <section>
              <CalendarExample />
            </section>
          )}
          
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

          {activeSection === 'themes' && (
            <section>
              <ThemeShowcase />
            </section>
          )}
        </main>
      </div>
    </ThemeProvider>
  );
};

const ThemeShowcase = () => {
  return (
    <div className="theme-showcase">
      <h2>Theme System Demo</h2>
      <p>Test different theme toggle variants and see how they work across components.</p>
      
      <div className="theme-variants">
        <div className="theme-variant">
          <h3>Button Variant</h3>
          <ThemeToggle variant="button" size="md" showLabel={true} />
        </div>
        
        <div className="theme-variant">
          <h3>Dropdown Variant</h3>
          <ThemeToggle variant="dropdown" size="md" />
        </div>
        
        <div className="theme-variant">
          <h3>Tabs Variant</h3>
          <ThemeToggle variant="tabs" size="md" showLabel={true} />
        </div>
        
        <div className="theme-variant">
          <h3>Compact Tabs</h3>
          <ThemeToggle variant="tabs" size="sm" showLabel={false} />
        </div>
      </div>
      
      <div className="theme-demo-grid">
        <div className="demo-card">
          <h4>Sample Card</h4>
          <p>This card demonstrates how themes affect component appearance.</p>
          <button className="demo-button">Sample Button</button>
        </div>
        
        <div className="demo-card">
          <h4>Another Card</h4>
          <p>Notice how colors, borders, and shadows change with themes.</p>
          <button className="demo-button demo-button--primary">Primary Button</button>
        </div>
      </div>
    </div>
  );
};

export default QTOThemeDemo;