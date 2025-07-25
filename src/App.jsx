/**
 * QTO Theme System - Main App
 * Showcases the complete design system
 */
import React from 'react';
import ComponentVariantsShowcase from './examples/ComponentVariantsShowcase';
import Typography from './components/Typography';
import './styles/tokens.css';
import './styles/base.css';

function App() {
  return (
    <div>      
      <ComponentVariantsShowcase />
    </div>
  );
}

export default App;
