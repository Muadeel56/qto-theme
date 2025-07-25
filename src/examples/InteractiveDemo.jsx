import React, { useState } from 'react';
import Button from '../components/Button';
import Card from '../components/Card';
import Typography from '../components/Typography';
import './InteractiveDemo.css';

const InteractiveDemo = () => {
  const [buttonLoading, setButtonLoading] = useState({});
  const [selectedCard, setSelectedCard] = useState(null);

  const handleButtonClick = (id) => {
    setButtonLoading({ ...buttonLoading, [id]: true });
    setTimeout(() => {
      setButtonLoading({ ...buttonLoading, [id]: false });
    }, 2000);
  };

  const handleCardClick = (id) => {
    setSelectedCard(selectedCard === id ? null : id);
  };

  return (
    <div className="interactive-demo">
      <Typography variant="h1" className="demo-title">
        Interactive Component Demo
      </Typography>
      
      <Typography variant="body1" className="demo-description">
        Click and interact with components to see their different states and behaviors
      </Typography>

      {/* Button Interactive Demo */}
      <section className="demo-section">
        <Typography variant="h2">Interactive Buttons</Typography>
        <Typography variant="body2" color="muted">
          Click buttons to see loading states and different interactions
        </Typography>
        
        <div className="button-playground">
          <div className="button-group">
            <Typography variant="h4">Action Buttons</Typography>
            <div className="button-row">
              <Button 
                variant="primary"
                loading={buttonLoading.save}
                onClick={() => handleButtonClick('save')}
              >
                Save Document
              </Button>
              <Button 
                variant="success"
                loading={buttonLoading.submit}
                onClick={() => handleButtonClick('submit')}
                startIcon="✓"
              >
                Submit Form
              </Button>
              <Button 
                variant="danger"
                loading={buttonLoading.delete}
                onClick={() => handleButtonClick('delete')}
                startIcon="🗑️"
              >
                Delete Item
              </Button>
            </div>
          </div>

          <div className="button-group">
            <Typography variant="h4">Size Variations</Typography>
            <div className="button-row align-center">
              <Button size="xs" variant="outline-primary">Extra Small</Button>
              <Button size="sm" variant="outline-primary">Small</Button>
              <Button size="md" variant="outline-primary">Medium</Button>
              <Button size="lg" variant="outline-primary">Large</Button>
              <Button size="xl" variant="outline-primary">Extra Large</Button>
            </div>
          </div>

          <div className="button-group">
            <Typography variant="h4">Special Styles</Typography>
            <div className="button-row">
              <Button variant="primary" rounded gradient>
                Gradient Rounded
              </Button>
              <Button variant="secondary" fullWidth>
                Full Width Button
              </Button>
            </div>
          </div>

          <div className="button-group">
            <Typography variant="h4">Icon Combinations</Typography>
            <div className="button-row">
              <Button variant="info" startIcon="📊" endIcon="→">
                View Analytics
              </Button>
              <Button variant="warning" startIcon="⚠️">
                Warning Action
              </Button>
              <Button variant="success" endIcon="💾">
                Save & Continue
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Card Interactive Demo */}
      <section className="demo-section">
        <Typography variant="h2">Interactive Cards</Typography>
        <Typography variant="body2" color="muted">
          Click cards to see selection states and hover effects
        </Typography>
        
        <div className="card-playground">
          <div className="card-grid-demo">
            <Card 
              variant="default"
              hover
              clickable
              onClick={() => handleCardClick('basic')}
              className={selectedCard === 'basic' ? 'selected' : ''}
            >
              <Typography variant="h5">Basic Card</Typography>
              <Typography variant="body2" color="muted">
                Click to select this card. Notice the hover effects and selection state.
              </Typography>
              <div className="card-actions">
                <Button size="sm" variant="outline-primary">Action</Button>
              </div>
            </Card>

            <Card 
              variant="elevated"
              shadow="lg"
              hover
              clickable
              onClick={() => handleCardClick('elevated')}
              className={selectedCard === 'elevated' ? 'selected' : ''}
            >
              <Typography variant="h5">Elevated Card</Typography>
              <Typography variant="body2" color="muted">
                This card has enhanced shadow and elevation effects.
              </Typography>
              <div className="card-actions">
                <Button size="sm" variant="primary">Primary</Button>
                <Button size="sm" variant="outline-secondary">Secondary</Button>
              </div>
            </Card>

            <Card 
              variant="outlined"
              hover
              clickable
              onClick={() => handleCardClick('outlined')}
              className={selectedCard === 'outlined' ? 'selected' : ''}
            >
              <Typography variant="h5">Outlined Card</Typography>
              <Typography variant="body2" color="muted">
                Border-style card with clean outline design.
              </Typography>
              <div className="card-status">
                <span className="status-indicator active"></span>
                <Typography variant="caption">Active Status</Typography>
              </div>
            </Card>

            <Card 
              variant="gradient"
              hover
              clickable
              onClick={() => handleCardClick('gradient')}
              className={selectedCard === 'gradient' ? 'selected' : ''}
            >
              <Typography variant="h5" style={{ color: 'white' }}>Gradient Card</Typography>
              <Typography variant="body2" style={{ color: 'rgba(255,255,255,0.9)' }}>
                Beautiful gradient background with enhanced visual appeal.
              </Typography>
              <div className="card-actions">
                <Button size="sm" variant="light">Explore</Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Real-world Component Combinations */}
      <section className="demo-section">
        <Typography variant="h2">Real-world Examples</Typography>
        <Typography variant="body2" color="muted">
          See how components work together in practical scenarios
        </Typography>
        
        <div className="real-world-examples">
          <Card className="example-card">
            <Typography variant="h4">User Profile Card</Typography>
            <div className="profile-content">
              <div className="profile-avatar">
                <div className="avatar-placeholder">JD</div>
                <div className="status-indicator online"></div>
              </div>
              <div className="profile-info">
                <Typography variant="h5">John Doe</Typography>
                <Typography variant="body2" color="muted">Software Engineer</Typography>
                <Typography variant="caption" color="muted">Last seen 2 minutes ago</Typography>
              </div>
            </div>
            <div className="profile-actions">
              <Button variant="primary" size="sm" fullWidth>
                Send Message
              </Button>
              <div className="action-row">
                <Button variant="outline-secondary" size="sm">
                  View Profile
                </Button>
                <Button variant="outline-secondary" size="sm">
                  Add Friend
                </Button>
              </div>
            </div>
          </Card>

          <Card className="example-card">
            <Typography variant="h4">Notification Center</Typography>
            <div className="notification-list">
              <div className="notification-item">
                <div className="notification-icon success">✓</div>
                <div className="notification-content">
                  <Typography variant="body2">File uploaded successfully</Typography>
                  <Typography variant="caption" color="muted">2 minutes ago</Typography>
                </div>
              </div>
              <div className="notification-item">
                <div className="notification-icon warning">⚠️</div>
                <div className="notification-content">
                  <Typography variant="body2">Storage space running low</Typography>
                  <Typography variant="caption" color="muted">1 hour ago</Typography>
                </div>
              </div>
              <div className="notification-item">
                <div className="notification-icon info">ℹ️</div>
                <div className="notification-content">
                  <Typography variant="body2">System update available</Typography>
                  <Typography variant="caption" color="muted">3 hours ago</Typography>
                </div>
              </div>
            </div>
            <div className="notification-actions">
              <Button variant="outline-primary" size="sm" fullWidth>
                Mark All as Read
              </Button>
            </div>
          </Card>

          <Card className="example-card">
            <Typography variant="h4">Quick Actions</Typography>
            <div className="quick-actions-grid">
              <Button variant="outline-primary" className="quick-action">
                <div className="action-icon">📁</div>
                <span>New Folder</span>
              </Button>
              <Button variant="outline-primary" className="quick-action">
                <div className="action-icon">📄</div>
                <span>New Document</span>
              </Button>
              <Button variant="outline-primary" className="quick-action">
                <div className="action-icon">📊</div>
                <span>Create Report</span>
              </Button>
              <Button variant="outline-primary" className="quick-action">
                <div className="action-icon">⚙️</div>
                <span>Settings</span>
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* Component State Demonstrations */}
      <section className="demo-section">
        <Typography variant="h2">Component States</Typography>
        <Typography variant="body2" color="muted">
          Explore different states and variations of components
        </Typography>
        
        <div className="state-demos">
          <div className="state-group">
            <Typography variant="h4">Button States</Typography>
            <div className="state-row">
              <Button variant="primary">Normal</Button>
              <Button variant="primary" loading>Loading</Button>
              <Button variant="primary" disabled>Disabled</Button>
            </div>
          </div>

          <div className="state-group">
            <Typography variant="h4">Card Shadows</Typography>
            <div className="shadow-row">
              <Card shadow="none" className="shadow-demo">
                <Typography variant="body2">No Shadow</Typography>
              </Card>
              <Card shadow="sm" className="shadow-demo">
                <Typography variant="body2">Small</Typography>
              </Card>
              <Card shadow="md" className="shadow-demo">
                <Typography variant="body2">Medium</Typography>
              </Card>
              <Card shadow="lg" className="shadow-demo">
                <Typography variant="body2">Large</Typography>
              </Card>
              <Card shadow="xl" className="shadow-demo">
                <Typography variant="body2">Extra Large</Typography>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default InteractiveDemo;
