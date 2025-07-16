
import React, { useState } from 'react';
import './index.css';
import { Button, Input, Card, Badge, Avatar, Modal } from './components';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Form submitted! Check console for data.');
    console.log('Form data:', formData);
  };

  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ color: 'var(--color-primary)', marginBottom: '1rem' }}>
          QTO House Theme Components
        </h1>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.125rem' }}>
          A comprehensive design system based on the QTO House brand colors
        </p>
      </div>

      {/* Buttons Section */}
      <Card style={{ marginBottom: '2rem' }}>
        <Card.Header>
          <h2 className="card-title">Buttons</h2>
          <p className="card-subtitle">Various button styles and sizes</p>
        </Card.Header>
        <Card.Body>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="danger">Danger</Button>
          </div>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center', marginTop: '1rem' }}>
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
            <Button loading>Loading</Button>
            <Button disabled>Disabled</Button>
          </div>
        </Card.Body>
      </Card>

      {/* Form Section */}
      <Card style={{ marginBottom: '2rem' }}>
        <Card.Header>
          <h2 className="card-title">Form Components</h2>
          <p className="card-subtitle">Input fields and form elements</p>
        </Card.Header>
        <Card.Body>
          <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1rem' }}>
            <Input
              label="Full Name"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            <Input
              label="Email Address"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <Input
              label="Message"
              name="message"
              placeholder="Enter your message"
              value={formData.message}
              onChange={handleInputChange}
              helperText="Optional message or feedback"
            />
            <div style={{ display: 'flex', gap: '1rem' }}>
              <Button type="submit" variant="primary">Submit Form</Button>
              <Button type="button" variant="outline" onClick={() => setIsModalOpen(true)}>
                Open Modal
              </Button>
            </div>
          </form>
        </Card.Body>
      </Card>

      {/* Badges and Avatars Section */}
      <Card style={{ marginBottom: '2rem' }}>
        <Card.Header>
          <h2 className="card-title">Badges & Avatars</h2>
          <p className="card-subtitle">Status indicators and user representations</p>
        </Card.Header>
        <Card.Body>
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ marginBottom: '1rem', fontSize: '1rem', fontWeight: '600' }}>Badges</h3>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <Badge variant="primary">Primary</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="success">Success</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="error">Error</Badge>
              <Badge variant="info">Info</Badge>
            </div>
          </div>
          <div>
            <h3 style={{ marginBottom: '1rem', fontSize: '1rem', fontWeight: '600' }}>Avatars</h3>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
              <Avatar name="John Doe" size="sm" />
              <Avatar name="Jane Smith" size="md" />
              <Avatar name="Bob Johnson" size="lg" />
              <Avatar name="Alice Brown" size="xl" variant="square" />
              <Avatar name="Charlie Wilson" size="2xl" variant="rounded" />
            </div>
          </div>
        </Card.Body>
      </Card>

      {/* Cards Section */}
      <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', marginBottom: '2rem' }}>
        <Card variant="outlined">
          <Card.Header>
            <h3 className="card-title">Outlined Card</h3>
            <p className="card-subtitle">With border styling</p>
          </Card.Header>
          <Card.Body>
            <p>This card has an outlined variant with a visible border.</p>
          </Card.Body>
        </Card>

        <Card variant="filled">
          <Card.Header>
            <h3 className="card-title">Filled Card</h3>
            <p className="card-subtitle">With background color</p>
          </Card.Header>
          <Card.Body>
            <p>This card has a filled variant with a background color.</p>
          </Card.Body>
        </Card>

        <Card variant="elevated" shadow="lg">
          <Card.Header>
            <h3 className="card-title">Elevated Card</h3>
            <p className="card-subtitle">With shadow effect</p>
          </Card.Header>
          <Card.Body>
            <p>This card has an elevated variant with a shadow effect.</p>
          </Card.Body>
        </Card>
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Example Modal"
        size="md"
      >
        <div style={{ padding: '1rem 0' }}>
          <p>This is an example modal dialog. It demonstrates the modal component with:</p>
          <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
            <li>Title bar with close button</li>
            <li>Backdrop overlay</li>
            <li>Escape key support</li>
            <li>Responsive design</li>
          </ul>
        </div>
        <Modal.Footer>
          <Button variant="outline" onClick={() => setIsModalOpen(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => setIsModalOpen(false)}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Footer */}
      <div style={{ textAlign: 'center', marginTop: '3rem', padding: '2rem 0', borderTop: '1px solid var(--color-border)' }}>
        <p style={{ color: 'var(--color-text-secondary)' }}>
          QTO House Theme Components - Built with React
        </p>
        <div style={{ marginTop: '1rem' }}>
          <Badge variant="primary" rounded="full">v1.0.0</Badge>
        </div>
      </div>
    </div>
  );
}

export default App;
