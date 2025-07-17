
import React, { useState } from 'react';
import './index.css';
import { 
  Button, 
  Input, 
  Card, 
  Badge, 
  Avatar, 
  Modal, 
  ThemeProvider, 
  ThemeToggle, 
  Navigation, 
  Header, 
  Sidebar, 
  SidebarItem,
  Layout, 
  Tooltip, 
  Dropdown 
} from './components';
import reactLogo from './assets/react.svg';
import qtoLogo from './assets/qto-logo.svg';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
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

  // Sample navigation items
  const navigationItems = (
    <Navigation.List>
      <Navigation.Item>
        <Navigation.Link href="#home" active>
          Home
        </Navigation.Link>
      </Navigation.Item>
      <Navigation.Item>
        <Navigation.Link href="#about">
          About
        </Navigation.Link>
      </Navigation.Item>
      <Navigation.Item>
        <Navigation.Link href="#services">
          Services
        </Navigation.Link>
      </Navigation.Item>
      <Navigation.Item>
        <Navigation.Link href="#contact">
          Contact
        </Navigation.Link>
      </Navigation.Item>
    </Navigation.List>
  );

  const sidebarItems = [
    {
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9,22 9,12 15,12 15,22"/></svg>,
      text: 'Dashboard',
      href: '#dashboard',
      active: true,
    },
    {
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/></svg>,
      text: 'Components',
      href: '#components',
      badge: '12',
      collapsible: true,
      defaultExpanded: true,
      children: [
        { text: 'Buttons', href: '#buttons' },
        { text: 'Inputs', href: '#inputs' },
        { text: 'Cards', href: '#cards' },
        { text: 'Badges', href: '#badges' },
      ]
    },
    {
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>,
      text: 'Layout',
      href: '#layout',
      collapsible: true,
      children: [
        { text: 'Header', href: '#header' },
        { text: 'Sidebar', href: '#sidebar' },
        { text: 'Grid', href: '#grid' },
      ]
    },
    {
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
      text: 'Theme',
      href: '#theme',
      badge: 'New',
    },
    {
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12.22 2h-.44a2 2 0 00-2 2v.18a2 2 0 01-1 1.73l-.43.25a2 2 0 01-2 0l-.15-.08a2 2 0 00-2.73.73l-.22.38a2 2 0 000 2l.08.15a2 2 0 010 2l-.08.15a2 2 0 000 2l.22.38a2 2 0 002.73.73l.15-.08a2 2 0 012 0l.43.25a2 2 0 011 1.73V20a2 2 0 002 2h.44a2 2 0 002-2v-.18a2 2 0 011-1.73l.43-.25a2 2 0 012 0l.15.08a2 2 0 002.73-.73l.22-.39a2 2 0 000-2l-.08-.15a2 2 0 010-2l.08-.15a2 2 0 000-2l-.22-.38a2 2 0 00-2.73-.73l-.15.08a2 2 0 01-2 0l-.43-.25a2 2 0 01-1-1.73V4a2 2 0 00-2-2z"/><circle cx="12" cy="12" r="3"/></svg>,
      text: 'Settings',
      href: '#settings',
    },
  ];

  return (
    <ThemeProvider>
      <Layout>
        <Layout.Header>
          <Header
            title="QTO House Theme"
            navigation={navigationItems}
            actions={
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <Dropdown
                  trigger={
                    <Button variant="outline" size="sm">
                      <Avatar name="John Doe" size="sm" />
                      User Menu
                    </Button>
                  }
                >
                  <Dropdown.Item>Profile</Dropdown.Item>
                  <Dropdown.Item>Settings</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item>Logout</Dropdown.Item>
                </Dropdown>
                <ThemeToggle size="sm" />
              </div>
            }
            sticky
          />
        </Layout.Header>
        
        <Layout.Content>
          <Layout.Sidebar>
            <Sidebar 
              logo={qtoLogo}
              title="QTO Theme"
              subtitle="Component Library"
              variant="sleek"
              width="300px" 
              collapsed={sidebarCollapsed}
              onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
              collapsible
            >
              <div className="sidebar-section">
                <div className="sidebar-section-header">
                  <svg className="sidebar-section-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
                  </svg>
                  <h3 className="sidebar-section-title">Main Menu</h3>
                </div>
                <div className="sidebar-section-content">
                  {sidebarItems.map((item, index) => (
                    <SidebarItem
                      key={index}
                      icon={item.icon}
                      text={item.text}
                      href={item.href}
                      active={item.active}
                      badge={item.badge}
                      collapsible={item.collapsible}
                      defaultExpanded={item.defaultExpanded}
                      tooltip={item.text}
                    >
                      {item.children && item.children.map((child, childIndex) => (
                        <SidebarItem
                          key={childIndex}
                          text={child.text}
                          href={child.href}
                          tooltip={child.text}
                        />
                      ))}
                    </SidebarItem>
                  ))}
                </div>
              </div>
            </Sidebar>
          </Layout.Sidebar>
          
          <Layout.Main>
            <div style={{ padding: '2rem' }}>
              <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <h1 style={{ color: 'var(--color-primary)', marginBottom: '1rem' }}>
                  QTO House Theme Components
                </h1>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.125rem' }}>
                  A comprehensive design system with enhanced sidebar and theme toggling support
                </p>
              </div>

              {/* Enhanced Sidebar Demo */}
              <Card style={{ marginBottom: '2rem' }}>
                <Card.Header>
                  <h2 className="card-title">Enhanced Sidebar</h2>
                  <p className="card-subtitle">Sleek sidebar with logo integration and collapsible sections</p>
                </Card.Header>
                <Card.Body>
                  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
                    <Button variant="primary" onClick={() => setSidebarCollapsed(!sidebarCollapsed)}>
                      Toggle Sidebar
                    </Button>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <Badge variant="primary">Logo Support</Badge>
                      <Badge variant="secondary">Collapsible</Badge>
                      <Badge variant="success">Responsive</Badge>
                      <Badge variant="info">Sleek Design</Badge>
                    </div>
                  </div>
                </Card.Body>
              </Card>

              {/* Theme Toggle Demo */}
              <Card style={{ marginBottom: '2rem' }}>
                <Card.Header>
                  <h2 className="card-title">Theme Toggle</h2>
                  <p className="card-subtitle">Switch between light and dark themes</p>
                </Card.Header>
                <Card.Body>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <ThemeToggle size="sm" />
                    <ThemeToggle size="md" showLabel />
                    <ThemeToggle size="lg" showLabel />
                  </div>
                </Card.Body>
              </Card>

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
                    <Tooltip content="This is a tooltip!">
                      <Button variant="primary" size="sm">
                        Hover me
                      </Button>
                    </Tooltip>
                    <Button variant="primary" onClick={() => setIsModalOpen(true)}>
                      Open Modal
                    </Button>
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
            </div>
          </Layout.Main>
        </Layout.Content>
      </Layout>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Enhanced Sidebar Demo"
        size="md"
      >
        <div style={{ padding: '1rem 0' }}>
          <p style={{ marginBottom: '1rem' }}>
            This demonstrates the enhanced sidebar component with:
          </p>
          <ul style={{ listStyle: 'disc', paddingLeft: '1.5rem', marginBottom: '1rem' }}>
            <li>QTO logo integration</li>
            <li>Sleek variant styling</li>
            <li>Collapsible sections</li>
            <li>Responsive design</li>
            <li>Theme support</li>
            <li>NPM publication ready</li>
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
    </ThemeProvider>
  );
}

export default App;

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

  // Sample navigation items
  const navigationItems = (
    <Navigation.List>
      <Navigation.Item>
        <Navigation.Link href="#home" active>
          Home
        </Navigation.Link>
      </Navigation.Item>
      <Navigation.Item>
        <Navigation.Link href="#about">
          About
        </Navigation.Link>
      </Navigation.Item>
      <Navigation.Item>
        <Navigation.Link href="#services">
          Services
        </Navigation.Link>
      </Navigation.Item>
      <Navigation.Item>
        <Navigation.Link href="#contact">
          Contact
        </Navigation.Link>
      </Navigation.Item>
    </Navigation.List>
  );

  const sidebarContent = (
    <>
      <Sidebar.Header>
        <div style={{ textAlign: 'center' }}>
          <h3 style={{ color: 'var(--color-primary)', margin: 0 }}>QTO</h3>
          <p style={{ color: 'var(--color-text-secondary)', margin: 0, fontSize: '0.875rem' }}>
            Design System
          </p>
        </div>
      </Sidebar.Header>
      
      <Sidebar.Body>
        <Sidebar.Section title="Components">
          <Navigation style={{ flexDirection: 'column' }}>
            <Navigation.List style={{ flexDirection: 'column', gap: '4px', width: '100%' }}>
              <Navigation.Item>
                <Navigation.Link href="#buttons">Buttons</Navigation.Link>
              </Navigation.Item>
              <Navigation.Item>
                <Navigation.Link href="#inputs">Inputs</Navigation.Link>
              </Navigation.Item>
              <Navigation.Item>
                <Navigation.Link href="#cards">Cards</Navigation.Link>
              </Navigation.Item>
              <Navigation.Item>
                <Navigation.Link href="#badges">Badges</Navigation.Link>
              </Navigation.Item>
            </Navigation.List>
          </Navigation>
        </Sidebar.Section>
        
        <Sidebar.Section title="Layout">
          <Navigation style={{ flexDirection: 'column' }}>
            <Navigation.List style={{ flexDirection: 'column', gap: '4px', width: '100%' }}>
              <Navigation.Item>
                <Navigation.Link href="#header">Header</Navigation.Link>
              </Navigation.Item>
              <Navigation.Item>
                <Navigation.Link href="#sidebar">Sidebar</Navigation.Link>
              </Navigation.Item>
              <Navigation.Item>
                <Navigation.Link href="#layout">Layout</Navigation.Link>
              </Navigation.Item>
            </Navigation.List>
          </Navigation>
        </Sidebar.Section>
      </Sidebar.Body>
    </>
  );

  return (
    <ThemeProvider>
      <Layout>
        <Layout.Header>
          <Header
            title="QTO House Theme"
            navigation={navigationItems}
            actions={
              <Dropdown
                trigger={
                  <Button variant="outline" size="sm">
                    User Menu
                  </Button>
                }
              >
                <Dropdown.Item>Profile</Dropdown.Item>
                <Dropdown.Item>Settings</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item>Logout</Dropdown.Item>
              </Dropdown>
            }
            sticky
          />
        </Layout.Header>
        
        <Layout.Content>
          <Layout.Sidebar>
            <Sidebar width="300px" collapsible>
              {sidebarContent}
            </Sidebar>
          </Layout.Sidebar>
          
          <Layout.Main>
            <div style={{ padding: '2rem' }}>
              <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <h1 style={{ color: 'var(--color-primary)', marginBottom: '1rem' }}>
                  QTO House Theme Components
                </h1>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.125rem' }}>
                  A comprehensive design system with theme toggling support
                </p>
              </div>

              {/* Theme Toggle Demo */}
              <Card style={{ marginBottom: '2rem' }}>
                <Card.Header>
                  <h2 className="card-title">Theme Toggle</h2>
                  <p className="card-subtitle">Switch between light and dark themes</p>
                </Card.Header>
                <Card.Body>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <ThemeToggle size="sm" />
                    <ThemeToggle size="md" showLabel />
                    <ThemeToggle size="lg" showLabel />
                  </div>
                </Card.Body>
              </Card>

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
                    <Tooltip content="This is a tooltip!">
                      <Button variant="primary" size="sm">
                        Hover me
                      </Button>
                    </Tooltip>
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
            </div>
          </Layout.Main>
        </Layout.Content>
      </Layout>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Example Modal"
        size="md"
      >
        <div style={{ padding: '1rem 0' }}>
          <p>This is an example modal dialog with theme support!</p>
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
    </ThemeProvider>
  );
}

export default App;
