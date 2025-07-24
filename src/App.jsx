/**
 * QTO Theme System - Main App
 * Showcases the complete design system
 */
import React, { useState } from 'react';
import QTOThemeDemo from './examples/Demo';
import ComponentVariantsShowcase from './examples/ComponentVariantsShowcase';
import InteractiveDemo from './examples/InteractiveDemo';
import Button from './components/Button';
import Typography from './components/Typography';
import './styles/tokens.css';
import './styles/base.css';

function App() {
  const [currentView, setCurrentView] = useState('showcase');

  const views = [
    { id: 'showcase', label: 'Component Showcase', component: ComponentVariantsShowcase },
    { id: 'interactive', label: 'Interactive Demo', component: InteractiveDemo },
    { id: 'demo', label: 'Original Demo', component: QTOThemeDemo }
  ];

  const CurrentComponent = views.find(view => view.id === currentView)?.component || ComponentVariantsShowcase;

  return (
    <div className="app">
      <div style={{ 
        padding: '1rem', 
        textAlign: 'center', 
        background: 'var(--surface-color, #f8f9fa)',
        borderBottom: '1px solid var(--border-color, #e9ecef)',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <Typography variant="h4" style={{ marginBottom: '1rem' }}>
          QTO Theme System
        </Typography>
        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          {views.map((view) => (
            <Button
              key={view.id}
              variant={currentView === view.id ? 'primary' : 'outline-primary'}
              size="sm"
              onClick={() => setCurrentView(view.id)}
            >
              {view.label}
            </Button>
          ))}
        </div>
      </div>
      
      <CurrentComponent />
    </div>
  );
}

export default App;
