import React, { useState, useEffect, useMemo } from 'react';
import { 
  Calendar, Table, AlertCircle, MessageSquare, BarChart3, FileText, Settings,
  Square, Type, Menu, Search, User, Bell, Star, Play, Download, Upload,
  Check, ArrowRight, Loader2, Eye, Mail, Edit, Copy, Share, Trash2,
  ChevronDown, Plus, X, Info, AlertTriangle, Users, Zap, HelpCircle,
  ExternalLink, Lock, CreditCard, Heart, Hash, Code, Palette, Layout, Box, Clock,
  Filter, Grid, List, ChevronLeft, ChevronRight, Home, Sparkles, Layers,
  // CircularProgress is imported from components
} from 'lucide-react';
import { ThemeProvider } from '../components/ThemeProvider';
import ThemeToggle from '../components/ThemeToggleNew';
import Button from '../components/Button';
import Card from '../components/Card';
import Input from '../components/Input';
import Dropdown from '../components/Dropdown';
import Badge from '../components/Badge';
import Avatar from '../components/Avatar';
import Typography from '../components/Typography';
import Progress, { CircularProgress } from '../components/Progress';
import AlertExample from './AlertExample';
import ModalExample from './ModalExample';
import ChartExample from './ChartExample';
import CalendarExample from './CalendarExample';
import MuiDataGridExample from './MuiDataGridExample';
import FileHandlingExample from './FileHandlingExample';
import './ComponentShowcase.css';

const ComponentVariantsShowcase = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Add scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const componentSections = [
    { 
      id: 'overview', 
      label: 'Overview', 
      icon: <Home size={20} />,
      category: 'general',
      description: 'Welcome to QTO Design System - Your complete component library',
      featured: true
    },
    { 
      id: 'buttons', 
      label: 'Buttons', 
      icon: <Square size={20} />, 
      category: 'basic',
      description: 'Interactive button components with various styles and states',
      component: ButtonVariants
    },
    { 
      id: 'cards', 
      label: 'Cards', 
      icon: <CreditCard size={20} />, 
      category: 'layout',
      description: 'Flexible card containers for organizing content',
      component: CardVariants
    },
    { 
      id: 'inputs', 
      label: 'Form Controls', 
      icon: <Edit size={20} />, 
      category: 'forms',
      description: 'Input fields, textareas, and form elements',
      component: InputVariants
    },
    { 
      id: 'dropdowns', 
      label: 'Dropdowns', 
      icon: <Menu size={20} />, 
      category: 'navigation',
      description: 'Dropdown menus and select components',
      component: DropdownVariants
    },
    { 
      id: 'badges', 
      label: 'Badges', 
      icon: <Bell size={20} />, 
      category: 'data',
      description: 'Status indicators and notification badges',
      component: BadgeVariants
    },
    { 
      id: 'avatars', 
      label: 'Avatars', 
      icon: <User size={20} />, 
      category: 'media',
      description: 'User profile pictures and avatar components',
      component: AvatarVariants
    },
    { 
      id: 'typography', 
      label: 'Typography', 
      icon: <Type size={20} />, 
      category: 'basic',
      description: 'Text styles, headings, and typography system',
      component: TypographyVariants
    },
    { 
      id: 'progress', 
      label: 'Progress', 
      icon: <Loader2 size={20} />, 
      category: 'feedback',
      description: 'Progress bars and loading indicators',
      component: ProgressVariants
    },
    { 
      id: 'alerts', 
      label: 'Alerts', 
      icon: <AlertCircle size={20} />, 
      category: 'feedback',
      description: 'Alert messages and notifications',
      component: () => <AlertExample />
    },
    { 
      id: 'modals', 
      label: 'Modals', 
      icon: <MessageSquare size={20} />, 
      category: 'overlay',
      description: 'Modal dialogs and popups',
      component: () => <ModalExample />
    },
    { 
      id: 'calendar', 
      label: 'Calendar', 
      icon: <Calendar size={20} />, 
      category: 'advanced',
      description: 'Date pickers and calendar components',
      component: () => <CalendarExample />
    },
    { 
      id: 'tables', 
      label: 'Data Tables', 
      icon: <Table size={20} />, 
      category: 'data',
      description: 'Advanced data grid and table components',
      component: () => <MuiDataGridExample />
    },
    { 
      id: 'charts', 
      label: 'Charts', 
      icon: <BarChart3 size={20} />, 
      category: 'data',
      description: 'Data visualization and chart components',
      component: () => <ChartExample />
    },
    { 
      id: 'files', 
      label: 'File Handling', 
      icon: <FileText size={20} />, 
      category: 'advanced',
      description: 'File upload, download, and management components',
      component: () => <FileHandlingExample />
    },
    { 
      id: 'themes', 
      label: 'Theme System', 
      icon: <Palette size={20} />, 
      category: 'theming',
      description: 'Theme configuration and customization',
      component: ThemeShowcase
    }
  ];

  const categories = [
    { id: 'all', label: 'All Components', icon: <Layers size={16} /> },
    { id: 'basic', label: 'Basic', icon: <Square size={16} /> },
    { id: 'forms', label: 'Forms', icon: <Edit size={16} /> },
    { id: 'layout', label: 'Layout', icon: <Layout size={16} /> },
    { id: 'navigation', label: 'Navigation', icon: <Menu size={16} /> },
    { id: 'data', label: 'Data Display', icon: <Table size={16} /> },
    { id: 'feedback', label: 'Feedback', icon: <AlertCircle size={16} /> },
    { id: 'media', label: 'Media', icon: <User size={16} /> },
    { id: 'overlay', label: 'Overlay', icon: <MessageSquare size={16} /> },
    { id: 'advanced', label: 'Advanced', icon: <Settings size={16} /> },
    { id: 'theming', label: 'Theming', icon: <Palette size={16} /> }
  ];

  const filteredSections = useMemo(() => {
    return componentSections.filter(section => {
      const matchesSearch = section.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          section.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || section.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const activeComponent = componentSections.find(section => section.id === activeSection);

  const renderHeader = () => (
    <header className={`showcase-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="header-content">
        <div className="header-brand">
          <div className="brand-logo">
            <Sparkles size={28} className="brand-icon" />
            <div className="brand-text">
              <h1>QTO Design System</h1>
              <span>Component Showcase</span>
            </div>
          </div>
          <button 
            className="sidebar-toggle"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            aria-label="Toggle sidebar"
          >
            {sidebarCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>

        <div className="header-controls">
          <div className="search-container">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder="Search components..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          
          <div className="view-controls">
            <button
              className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
              title="Grid view"
            >
              <Grid size={18} />
            </button>
            <button
              className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
              title="List view"
            >
              <List size={18} />
            </button>
          </div>

          <ThemeToggle size="md" showLabel={false} />
        </div>
      </div>
    </header>
  );

  const renderSidebar = () => (
    <aside className={`sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-content">
        <div className="category-filters">
          <Typography variant="h6" className="filter-title">Categories</Typography>
          <div className="category-list">
            {categories.map(category => (
              <button
                key={category.id}
                className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.icon}
                <span>{category.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="component-nav">
          <Typography variant="h6" className="nav-title">Components</Typography>
          <div className="component-list">
            {filteredSections.map(section => (
              <button
                key={section.id}
                className={`component-nav-item ${activeSection === section.id ? 'active' : ''} ${section.featured ? 'featured' : ''}`}
                onClick={() => setActiveSection(section.id)}
              >
                <div className="nav-item-icon">{section.icon}</div>
                <div className="nav-item-content">
                  <span className="nav-item-label">{section.label}</span>
                  <span className="nav-item-desc">{section.description}</span>
                </div>
                {section.featured && <Star size={14} className="featured-icon" />}
              </button>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );

  const renderMainContent = () => (
    <main className="main-content">
      <div className="content-container">
        {activeSection === 'overview' ? (
          <OverviewSection />
        ) : activeComponent?.component ? (
          <div className="component-showcase-content">
            <div className="component-header">
              <div className="component-title-section">
                <div className="component-icon">{activeComponent.icon}</div>
                <div>
                  <Typography variant="h2" className="component-title">
                    {activeComponent.label}
                  </Typography>
                  <Typography variant="body1" className="component-description">
                    {activeComponent.description}
                  </Typography>
                </div>
              </div>
              <div className="component-actions">
                <Button variant="outline" size="sm">
                  <Code size={16} />
                  View Code
                </Button>
                <Button variant="outline" size="sm">
                  <ExternalLink size={16} />
                  Open in New Tab
                </Button>
              </div>
            </div>
            <div className="component-content">
              {React.createElement(activeComponent.component)}
            </div>
          </div>
        ) : (
          <div className="section-placeholder">
            <div className="placeholder-content">
              <Box size={48} className="placeholder-icon" />
              <Typography variant="h3">Component not found</Typography>
              <Typography variant="body1">
                The selected component is not available. Please select another component from the sidebar.
              </Typography>
            </div>
          </div>
        )}
      </div>
    </main>
  );

  return (
    <ThemeProvider defaultTheme="light">
      <div className="showcase-app">
        {renderHeader()}
        <div className="showcase-layout">
          {renderSidebar()}
          {renderMainContent()}
        </div>
      </div>
    </ThemeProvider>
  );
};

// Overview Section Component
const OverviewSection = () => {
  const stats = [
    { label: 'Components', value: '15+', icon: <Square size={24} /> },
    { label: 'Variants', value: '100+', icon: <Layers size={24} /> },
    { label: 'Examples', value: '200+', icon: <Code size={24} /> },
    { label: 'Themes', value: '2', icon: <Palette size={24} /> }
  ];

  const features = [
    {
      title: 'Modern Design',
      description: 'Clean, contemporary aesthetics that work across all platforms',
      icon: <Sparkles size={32} />,
      color: 'blue'
    },
    {
      title: 'Fully Responsive',
      description: 'Components that adapt beautifully to any screen size',
      icon: <Layout size={32} />,
      color: 'green'
    },
    {
      title: 'Accessible',
      description: 'Built with accessibility best practices and ARIA compliance',
      icon: <Heart size={32} />,
      color: 'purple'
    },
    {
      title: 'Customizable',
      description: 'Extensive theming system for brand consistency',
      icon: <Settings size={32} />,
      color: 'orange'
    }
  ];

  return (
    <div className="overview-section">
      <div className="hero-section">
        <div className="hero-content">
          <Typography variant="h1" className="hero-title">
            Welcome to QTO Design System
          </Typography>
          <Typography variant="h4" className="hero-subtitle">
            A comprehensive collection of beautiful, reusable React components
          </Typography>
          <Typography variant="body1" className="hero-description">
            Build consistent, accessible, and beautiful user interfaces with our carefully crafted component library.
            Every component is designed to work seamlessly together while maintaining flexibility for your specific needs.
          </Typography>
          <div className="hero-actions">
            <Button variant="primary" size="lg">
              <Play size={20} />
              Get Started
            </Button>
            <Button variant="outline" size="lg">
              <FileText size={20} />
              Documentation
            </Button>
          </div>
        </div>
        <div className="hero-visual">
          <div className="component-preview">
            <div className="preview-item">
              <Button variant="primary">Primary Button</Button>
            </div>
            <div className="preview-item">
              <Card style={{ padding: '1rem', minWidth: '200px' }}>
                <Typography variant="h6">Sample Card</Typography>
                <Typography variant="body2">Card content preview</Typography>
              </Card>
            </div>
            <div className="preview-item">
              <Badge variant="success">New Feature</Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="stats-section">
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-icon">{stat.icon}</div>
              <div className="stat-content">
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="features-section">
        <Typography variant="h2" className="section-title">Why Choose QTO?</Typography>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className={`feature-card ${feature.color}`}>
              <div className="feature-icon">{feature.icon}</div>
              <Typography variant="h5" className="feature-title">{feature.title}</Typography>
              <Typography variant="body1" className="feature-description">{feature.description}</Typography>
            </div>
          ))}
        </div>
      </div>

      <div className="getting-started-section">
        <Typography variant="h2" className="section-title">Getting Started</Typography>
        <div className="getting-started-content">
          <div className="installation-section">
            <Typography variant="h5">Installation</Typography>
            <div className="code-block">
              <code>npm install @qto/design-system</code>
              <button className="copy-btn" title="Copy to clipboard">
                <Copy size={16} />
              </button>
            </div>
          </div>
          <div className="usage-section">
            <Typography variant="h5">Basic Usage</Typography>
            <div className="code-block">
              <pre>{`import { Button, Card } from '@qto/design-system';

function App() {
  return (
    <Card>
      <Button variant="primary">
        Click me!
      </Button>
    </Card>
  );
}`}</pre>
              <button className="copy-btn" title="Copy to clipboard">
                <Copy size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Button Variants Component
const ButtonVariants = () => {
  return (
    <div className="variants-showcase">
      <div className="showcase-header">
        <h2 className="showcase-title">Button Variants</h2>
        <p className="showcase-description">Explore different button styles, sizes, and states for various use cases</p>
      </div>
      
      {/* Color Variants Section */}
      <div className="variant-section">
        <div className="section-header">
          <h3 className="section-title">Color Variants</h3>
          <p className="section-description">Primary color variations for different actions and contexts</p>
        </div>
        <div className="button-demo-grid">
          <div className="button-demo-item">
            <Button variant="primary" size="md">
              <Settings size={16} />
              Primary
            </Button>
            <span className="demo-label">Primary</span>
          </div>
          <div className="button-demo-item">
            <Button variant="secondary" size="md">
              <Users size={16} />
              Secondary
            </Button>
            <span className="demo-label">Secondary</span>
          </div>
          <div className="button-demo-item">
            <Button variant="success" size="md">
              <Check size={16} />
              Success
            </Button>
            <span className="demo-label">Success</span>
          </div>
          <div className="button-demo-item">
            <Button variant="danger" size="md">
              <Trash2 size={16} />
              Danger
            </Button>
            <span className="demo-label">Danger</span>
          </div>
          <div className="button-demo-item">
            <Button variant="warning" size="md">
              <AlertTriangle size={16} />
              Warning
            </Button>
            <span className="demo-label">Warning</span>
          </div>
          <div className="button-demo-item">
            <Button variant="info" size="md">
              <Info size={16} />
              Info
            </Button>
            <span className="demo-label">Info</span>
          </div>
        </div>
      </div>

      {/* Size Variants Section */}
      <div className="variant-section">
        <div className="section-header">
          <h3 className="section-title">Size Variants</h3>
          <p className="section-description">Different sizes to match your design hierarchy</p>
        </div>
        <div className="button-size-demo">
          <div className="button-demo-item">
            <Button variant="primary" size="xs">
              <Zap size={12} />
              Extra Small
            </Button>
            <span className="demo-label">xs • 28px</span>
          </div>
          <div className="button-demo-item">
            <Button variant="primary" size="sm">
              <Zap size={14} />
              Small
            </Button>
            <span className="demo-label">sm • 32px</span>
          </div>
          <div className="button-demo-item">
            <Button variant="primary" size="md">
              <Zap size={16} />
              Medium
            </Button>
            <span className="demo-label">md • 36px</span>
          </div>
          <div className="button-demo-item">
            <Button variant="primary" size="lg">
              <Zap size={18} />
              Large
            </Button>
            <span className="demo-label">lg • 40px</span>
          </div>
          <div className="button-demo-item">
            <Button variant="primary" size="xl">
              <Zap size={20} />
              Extra Large
            </Button>
            <span className="demo-label">xl • 44px</span>
          </div>
        </div>
      </div>

      {/* Style Variants Section */}
      <div className="variant-section">
        <div className="section-header">
          <h3 className="section-title">Style Variants</h3>
          <p className="section-description">Different visual styles for various design needs</p>
        </div>
        <div className="button-demo-grid">
          <div className="button-demo-item">
            <Button variant="primary" size="md">
              <Play size={16} />
              Solid
            </Button>
            <span className="demo-label">Solid</span>
          </div>
          <div className="button-demo-item">
            <Button variant="outline" size="md">
              <Download size={16} />
              Outline
            </Button>
            <span className="demo-label">Outline</span>
          </div>
          <div className="button-demo-item">
            <Button variant="ghost" size="md">
              <Eye size={16} />
              Ghost
            </Button>
            <span className="demo-label">Ghost</span>
          </div>
          <div className="button-demo-item">
            <Button variant="link" size="md">
              <ExternalLink size={16} />
              Link
            </Button>
            <span className="demo-label">Link</span>
          </div>
        </div>
      </div>

      {/* Interactive States */}
      <div className="variant-section">
        <div className="section-header">
          <h3 className="section-title">Interactive States</h3>
          <p className="section-description">Different button states for user feedback</p>
        </div>
        <div className="button-demo-grid">
          <div className="button-demo-item">
            <Button variant="primary" size="md">
              <ArrowRight size={16} />
              Normal
            </Button>
            <span className="demo-label">Normal</span>
          </div>
          <div className="button-demo-item">
            <Button variant="primary" size="md" disabled>
              <Lock size={16} />
              Disabled
            </Button>
            <span className="demo-label">Disabled</span>
          </div>
          <div className="button-demo-item">
            <Button variant="primary" size="md" loading>
              <Loader2 size={16} />
              Loading
            </Button>
            <span className="demo-label">Loading</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Card Variants Component
const CardVariants = () => {
  return (
    <div className="variants-showcase">
      <div className="showcase-header">
        <h2 className="showcase-title">Card Variants</h2>
        <p className="showcase-description">Flexible card containers for organizing and displaying content</p>
      </div>
      
      {/* Basic Cards */}
      <div className="variant-section">
        <div className="section-header">
          <h3 className="section-title">Basic Cards</h3>
          <p className="section-description">Simple card layouts with different content structures</p>
        </div>
        <div className="card-grid">
          <Card>
            <Typography variant="h5">Basic Card</Typography>
            <Typography variant="body1">
              This is a simple card with basic content. Cards are flexible containers for organizing information.
            </Typography>
            <Button variant="primary" size="sm" style={{ marginTop: '1rem' }}>
              Learn More
            </Button>
          </Card>

          <Card>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <Avatar size="md" />
              <div>
                <Typography variant="h6">User Profile Card</Typography>
                <Typography variant="body2" style={{ color: 'var(--gray-500)' }}>
                  Software Engineer
                </Typography>
              </div>
            </div>
            <Typography variant="body1">
              Cards can contain user profiles, avatars, and personal information in an organized layout.
            </Typography>
          </Card>

          <Card>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <Typography variant="h5">Notification</Typography>
              <Badge variant="primary">New</Badge>
            </div>
            <Typography variant="body1">
              You have 3 new messages waiting for your review. Check your inbox for more details.
            </Typography>
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
              <Button variant="primary" size="sm">View</Button>
              <Button variant="ghost" size="sm">Dismiss</Button>
            </div>
          </Card>
        </div>
      </div>

      {/* Advanced Cards */}
      <div className="variant-section">
        <div className="section-header">
          <h3 className="section-title">Advanced Cards</h3>
          <p className="section-description">Complex card layouts with rich content and interactions</p>
        </div>
        <div className="card-grid">
          <Card>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <Typography variant="h5">Statistics Card</Typography>
              <BarChart3 size={24} color="var(--primary-500)" />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <div>
                <Typography variant="h2" style={{ margin: 0, color: 'var(--primary-500)' }}>1,234</Typography>
                <Typography variant="body2" style={{ color: 'var(--gray-500)' }}>Total Users</Typography>
              </div>
              <Badge variant="success">+12%</Badge>
            </div>
            <Progress value={75} max={100} />
            <Typography variant="body2" style={{ marginTop: '0.5rem', color: 'var(--gray-500)' }}>
              75% of monthly goal achieved
            </Typography>
          </Card>

          <Card>
            <Typography variant="h5" style={{ marginBottom: '1rem' }}>Feature Card</Typography>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <div style={{ 
                padding: '0.75rem', 
                background: 'var(--primary-50)', 
                borderRadius: '0.5rem',
                color: 'var(--primary-600)'
              }}>
                <Sparkles size={20} />
              </div>
              <div>
                <Typography variant="h6">Premium Feature</Typography>
                <Typography variant="body2" style={{ color: 'var(--gray-500)' }}>
                  Unlock advanced capabilities
                </Typography>
              </div>
            </div>
            <Typography variant="body1" style={{ marginBottom: '1rem' }}>
              Get access to advanced analytics, custom themes, and priority support.
            </Typography>
            <Button variant="primary" fullWidth>
              Upgrade Now
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

// Input Variants Component
const InputVariants = () => {
  const [inputValues, setInputValues] = React.useState({
    basic: '',
    email: '',
    password: '',
    search: '',
    textarea: ''
  });

  const handleInputChange = (field, value) => {
    setInputValues(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="variants-showcase">
      <div className="showcase-header">
        <h2 className="showcase-title">Form Controls</h2>
        <p className="showcase-description">Input fields, textareas, and form elements for data collection</p>
      </div>
      
      {/* Basic Inputs */}
      <div className="variant-section">
        <div className="section-header">
          <h3 className="section-title">Input Types</h3>
          <p className="section-description">Different input types for various data requirements</p>
        </div>
        <div className="input-grid">
          <div>
            <Input
              label="Basic Input"
              placeholder="Enter text..."
              value={inputValues.basic}
              onChange={(e) => handleInputChange('basic', e.target.value)}
            />
          </div>
          <div>
            <Input
              type="email"
              label="Email Input"
              placeholder="your@email.com"
              value={inputValues.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              icon={<Mail size={16} />}
            />
          </div>
          <div>
            <Input
              type="password"
              label="Password Input"
              placeholder="Enter password..."
              value={inputValues.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              icon={<Lock size={16} />}
            />
          </div>
          <div>
            <Input
              type="search"
              label="Search Input"
              placeholder="Search..."
              value={inputValues.search}
              onChange={(e) => handleInputChange('search', e.target.value)}
              icon={<Search size={16} />}
            />
          </div>
        </div>
      </div>

      {/* Input States */}
      <div className="variant-section">
        <div className="section-header">
          <h3 className="section-title">Input States</h3>
          <p className="section-description">Different states for user feedback and validation</p>
        </div>
        <div className="input-grid">
          <div>
            <Input
              label="Normal State"
              placeholder="Enter text..."
              value=""
              onChange={() => {}}
            />
          </div>
          <div>
            <Input
              label="Error State"
              placeholder="Enter text..."
              value=""
              onChange={() => {}}
              error="This field is required"
            />
          </div>
          <div>
            <Input
              label="Success State"
              placeholder="Enter text..."
              value="Valid input"
              onChange={() => {}}
              success="Looks good!"
            />
          </div>
          <div>
            <Input
              label="Disabled State"
              placeholder="Disabled input..."
              value=""
              onChange={() => {}}
              disabled
            />
          </div>
        </div>
      </div>

      {/* Size Variants */}
      <div className="variant-section">
        <div className="section-header">
          <h3 className="section-title">Size Variants</h3>
          <p className="section-description">Different input sizes for various layouts</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
          <Input
            size="sm"
            label="Small Input"
            placeholder="Small size..."
            value=""
            onChange={() => {}}
          />
          <Input
            size="md"
            label="Medium Input"
            placeholder="Medium size..."
            value=""
            onChange={() => {}}
          />
          <Input
            size="lg"
            label="Large Input"
            placeholder="Large size..."
            value=""
            onChange={() => {}}
          />
        </div>
      </div>
    </div>
  );
};

// Dropdown Variants Component
const DropdownVariants = () => {
  const [selectedValues, setSelectedValues] = React.useState({
    basic: '',
    multi: [],
    search: ''
  });

  const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
    { value: 'option4', label: 'Option 4' }
  ];

  return (
    <div className="variants-showcase">
      <div className="showcase-header">
        <h2 className="showcase-title">Dropdown Components</h2>
        <p className="showcase-description">Dropdown menus and select components for option selection</p>
      </div>
      
      {/* Basic Dropdowns */}
      <div className="variant-section">
        <div className="section-header">
          <h3 className="section-title">Basic Dropdowns</h3>
          <p className="section-description">Simple dropdown menus with various configurations</p>
        </div>
        <div className="dropdown-grid">
          <div>
            <Dropdown
              label="Basic Dropdown"
              options={options}
              value={selectedValues.basic}
              onChange={(value) => setSelectedValues(prev => ({ ...prev, basic: value }))}
              placeholder="Select an option..."
            />
          </div>
          <div>
            <Dropdown
              label="With Icons"
              options={[
                { value: 'users', label: 'Users', icon: <Users size={16} /> },
                { value: 'settings', label: 'Settings', icon: <Settings size={16} /> },
                { value: 'help', label: 'Help', icon: <HelpCircle size={16} /> }
              ]}
              value=""
              onChange={() => {}}
              placeholder="Select with icon..."
            />
          </div>
          <div>
            <Dropdown
              label="Disabled Dropdown"
              options={options}
              value=""
              onChange={() => {}}
              placeholder="Disabled dropdown..."
              disabled
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Badge Variants Component
const BadgeVariants = () => {
  return (
    <div className="variants-showcase">
      <div className="showcase-header">
        <h2 className="showcase-title">Badge Components</h2>
        <p className="showcase-description">Status indicators and notification badges for UI elements</p>
      </div>
      
      {/* Color Variants */}
      <div className="variant-section">
        <div className="section-header">
          <h3 className="section-title">Color Variants</h3>
          <p className="section-description">Different colors for various states and contexts</p>
        </div>
        <div className="badge-showcase">
          <Badge variant="primary">Primary</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="danger">Danger</Badge>
          <Badge variant="info">Info</Badge>
        </div>
      </div>

      {/* Size Variants */}
      <div className="variant-section">
        <div className="section-header">
          <h3 className="section-title">Size Variants</h3>
          <p className="section-description">Different badge sizes for various use cases</p>
        </div>
        <div className="badge-showcase">
          <Badge variant="primary" size="sm">Small</Badge>
          <Badge variant="primary" size="md">Medium</Badge>
          <Badge variant="primary" size="lg">Large</Badge>
        </div>
      </div>

      {/* Usage Examples */}
      <div className="variant-section">
        <div className="section-header">
          <h3 className="section-title">Usage Examples</h3>
          <p className="section-description">Real-world usage examples with other components</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div className="badge-example">
            <Button variant="outline" size="md">
              Messages
              <Badge variant="danger" size="sm">3</Badge>
            </Button>
          </div>
          <div className="badge-example">
            <Typography variant="h6">Project Status</Typography>
            <Badge variant="success">Active</Badge>
          </div>
          <div className="badge-example">
            <Avatar size="md" />
            <div style={{ position: 'relative' }}>
              <Typography variant="body1" style={{ marginLeft: '1rem' }}>John Doe</Typography>
              <Badge 
                variant="success" 
                size="sm" 
                style={{ position: 'absolute', top: '-8px', right: '-8px' }}
              >
                Online
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Avatar Variants Component
const AvatarVariants = () => {
  return (
    <div className="variants-showcase">
      <div className="showcase-header">
        <h2 className="showcase-title">Avatar Components</h2>
        <p className="showcase-description">User profile pictures and avatar components for identity</p>
      </div>
      
      {/* Size Variants */}
      <div className="variant-section">
        <div className="section-header">
          <h3 className="section-title">Size Variants</h3>
          <p className="section-description">Different avatar sizes for various layouts</p>
        </div>
        <div className="avatar-grid">
          <div style={{ textAlign: 'center' }}>
            <Avatar size="xs" />
            <Typography variant="body2" style={{ marginTop: '0.5rem' }}>Extra Small</Typography>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Avatar size="sm" />
            <Typography variant="body2" style={{ marginTop: '0.5rem' }}>Small</Typography>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Avatar size="md" />
            <Typography variant="body2" style={{ marginTop: '0.5rem' }}>Medium</Typography>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Avatar size="lg" />
            <Typography variant="body2" style={{ marginTop: '0.5rem' }}>Large</Typography>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Avatar size="xl" />
            <Typography variant="body2" style={{ marginTop: '0.5rem' }}>Extra Large</Typography>
          </div>
        </div>
      </div>

      {/* Avatar Types */}
      <div className="variant-section">
        <div className="section-header">
          <h3 className="section-title">Avatar Types</h3>
          <p className="section-description">Different types of avatars with various content</p>
        </div>
        <div className="avatar-grid">
          <div style={{ textAlign: 'center' }}>
            <Avatar size="lg" src="https://via.placeholder.com/100" />
            <Typography variant="body2" style={{ marginTop: '0.5rem' }}>Image Avatar</Typography>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Avatar size="lg" initials="JD" />
            <Typography variant="body2" style={{ marginTop: '0.5rem' }}>Initials Avatar</Typography>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Avatar size="lg" icon={<User size={24} />} />
            <Typography variant="body2" style={{ marginTop: '0.5rem' }}>Icon Avatar</Typography>
          </div>
        </div>
      </div>
    </div>
  );
};

// Typography Variants Component
const TypographyVariants = () => {
  return (
    <div className="variants-showcase">
      <div className="showcase-header">
        <h2 className="showcase-title">Typography System</h2>
        <p className="showcase-description">Text styles, headings, and typography hierarchy</p>
      </div>
      
      {/* Headings */}
      <div className="variant-section">
        <div className="section-header">
          <h3 className="section-title">Headings</h3>
          <p className="section-description">Hierarchical heading styles for content structure</p>
        </div>
        <div className="typography-grid">
          <Typography variant="h1">Heading 1 - Main Title</Typography>
          <Typography variant="h2">Heading 2 - Section Title</Typography>
          <Typography variant="h3">Heading 3 - Subsection</Typography>
          <Typography variant="h4">Heading 4 - Minor Heading</Typography>
          <Typography variant="h5">Heading 5 - Small Heading</Typography>
          <Typography variant="h6">Heading 6 - Tiny Heading</Typography>
        </div>
      </div>

      {/* Body Text */}
      <div className="variant-section">
        <div className="section-header">
          <h3 className="section-title">Body Text</h3>
          <p className="section-description">Different body text styles for content</p>
        </div>
        <div className="typography-grid">
          <Typography variant="body1">
            Body 1 - This is the main body text style used for most content. It provides good readability and is perfect for paragraphs and longer text content.
          </Typography>
          <Typography variant="body2">
            Body 2 - This is a smaller body text style, often used for secondary information, captions, or supporting text that needs to be less prominent.
          </Typography>
          <Typography variant="caption">
            Caption - This is caption text, typically used for image descriptions, form help text, or small notes.
          </Typography>
        </div>
      </div>

      {/* Text Styles */}
      <div className="variant-section">
        <div className="section-header">
          <h3 className="section-title">Text Styles</h3>
          <p className="section-description">Various text styling options and utilities</p>
        </div>
        <div className="typography-grid">
          <Typography variant="body1" weight="light">Light weight text</Typography>
          <Typography variant="body1" weight="normal">Normal weight text</Typography>
          <Typography variant="body1" weight="medium">Medium weight text</Typography>
          <Typography variant="body1" weight="semibold">Semibold weight text</Typography>
          <Typography variant="body1" weight="bold">Bold weight text</Typography>
        </div>
      </div>
    </div>
  );
};

// Progress Variants Component
const ProgressVariants = () => {
  const [progress, setProgress] = useState(0);
  const [animatedProgress, setAnimatedProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        const newProgress = oldProgress >= 100 ? 0 : oldProgress + 10;
        return newProgress;
      });
    }, 800);

    const animatedTimer = setInterval(() => {
      setAnimatedProgress((oldProgress) => {
        const newProgress = oldProgress >= 100 ? 0 : oldProgress + 5;
        return newProgress;
      });
    }, 200);

    return () => {
      clearInterval(timer);
      clearInterval(animatedTimer);
    };
  }, []);

  return (
    <div className="variants-showcase">
      <div className="showcase-header">
        <Typography variant="h2" className="showcase-title">Progress Components</Typography>
        <Typography variant="body1" className="showcase-description">
          Enhanced progress bars and circular indicators with beautiful animations and brand-aligned styling
        </Typography>
      </div>

      <div className="variant-section">
        <div className="section-header">
          <Typography variant="h4" className="section-title">Linear Progress Bars</Typography>
          <Typography variant="body2" className="section-description">
            Horizontal progress bars with different colors, sizes, and animations
          </Typography>
        </div>
        <div className="progress-grid">
          <div>
            <Typography variant="body2" weight="semibold" style={{ marginBottom: '8px' }}>
              Brand Primary (Animated)
            </Typography>
            <Progress value={progress} variant="primary" showLabel />
          </div>
          
          <div>
            <Typography variant="body2" weight="semibold" style={{ marginBottom: '8px' }}>
              Success Variant
            </Typography>
            <Progress value={75} variant="success" showLabel />
          </div>
          
          <div>
            <Typography variant="body2" weight="semibold" style={{ marginBottom: '8px' }}>
              Warning with Custom Label
            </Typography>
            <Progress value={45} variant="warning" label="Processing Files..." />
          </div>
          
          <div>
            <Typography variant="body2" weight="semibold" style={{ marginBottom: '8px' }}>
              Error State
            </Typography>
            <Progress value={30} variant="error" showLabel />
          </div>
          
          <div>
            <Typography variant="body2" weight="semibold" style={{ marginBottom: '8px' }}>
              Info Variant
            </Typography>
            <Progress value={85} variant="info" showLabel />
          </div>
          
          <div>
            <Typography variant="body2" weight="semibold" style={{ marginBottom: '8px' }}>
              Secondary (Neutral)
            </Typography>
            <Progress value={60} variant="secondary" showLabel />
          </div>
        </div>
      </div>

      <div className="variant-section">
        <div className="section-header">
          <Typography variant="h4" className="section-title">Size Variations</Typography>
          <Typography variant="body2" className="section-description">
            Different sizes for various use cases
          </Typography>
        </div>
        <div className="progress-grid">
          <div>
            <Typography variant="body2" weight="semibold" style={{ marginBottom: '8px' }}>
              Small (6px height)
            </Typography>
            <Progress value={progress} variant="primary" size="sm" showLabel />
          </div>
          
          <div>
            <Typography variant="body2" weight="semibold" style={{ marginBottom: '8px' }}>
              Medium (8px height)
            </Typography>
            <Progress value={progress} variant="primary" size="md" showLabel />
          </div>
          
          <div>
            <Typography variant="body2" weight="semibold" style={{ marginBottom: '8px' }}>
              Large (12px height)
            </Typography>
            <Progress value={progress} variant="primary" size="lg" showLabel />
          </div>
        </div>
      </div>

      <div className="variant-section">
        <div className="section-header">
          <Typography variant="h4" className="section-title">Striped & Animated</Typography>
          <Typography variant="body2" className="section-description">
            Progress bars with striped patterns and animations
          </Typography>
        </div>
        <div className="progress-grid">
          <div>
            <Typography variant="body2" weight="semibold" style={{ marginBottom: '8px' }}>
              Striped Pattern
            </Typography>
            <Progress value={70} variant="primary" striped showLabel />
          </div>
          
          <div>
            <Typography variant="body2" weight="semibold" style={{ marginBottom: '8px' }}>
              Animated Stripes
            </Typography>
            <Progress value={animatedProgress} variant="primary" striped animated showLabel />
          </div>
          
          <div>
            <Typography variant="body2" weight="semibold" style={{ marginBottom: '8px' }}>
              Success Animated
            </Typography>
            <Progress value={animatedProgress} variant="success" striped animated showLabel />
          </div>
        </div>
      </div>

      <div className="variant-section">
        <div className="section-header">
          <Typography variant="h4" className="section-title">Circular Progress</Typography>
          <Typography variant="body2" className="section-description">
            Circular progress indicators with brand colors
          </Typography>
        </div>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', 
          gap: '2rem',
          alignItems: 'center',
          justifyItems: 'center',
          padding: '2rem 0'
        }}>
          <div style={{ textAlign: 'center' }}>
            <CircularProgress value={progress} variant="primary" showLabel size={120} strokeWidth={8} />
            <Typography variant="caption" style={{ marginTop: '12px', display: 'block' }}>
              Primary Brand
            </Typography>
          </div>
          
          <div style={{ textAlign: 'center' }}>
            <CircularProgress value={75} variant="success" showLabel size={100} strokeWidth={6} />
            <Typography variant="caption" style={{ marginTop: '12px', display: 'block' }}>
              Success
            </Typography>
          </div>
          
          <div style={{ textAlign: 'center' }}>
            <CircularProgress value={45} variant="warning" showLabel size={100} strokeWidth={6} />
            <Typography variant="caption" style={{ marginTop: '12px', display: 'block' }}>
              Warning
            </Typography>
          </div>
          
          <div style={{ textAlign: 'center' }}>
            <CircularProgress value={30} variant="error" showLabel size={100} strokeWidth={6} />
            <Typography variant="caption" style={{ marginTop: '12px', display: 'block' }}>
              Error
            </Typography>
          </div>
          
          <div style={{ textAlign: 'center' }}>
            <CircularProgress value={85} variant="info" showLabel size={100} strokeWidth={6} />
            <Typography variant="caption" style={{ marginTop: '12px', display: 'block' }}>
              Info
            </Typography>
          </div>
        </div>
      </div>

      <div className="variant-section">
        <div className="section-header">
          <Typography variant="h4" className="section-title">Real-world Examples</Typography>
          <Typography variant="body2" className="section-description">
            Common usage patterns with contextual information
          </Typography>
        </div>
        <div className="progress-grid">
          <Card variant="default" padding="lg">
            <Typography variant="h6" style={{ marginBottom: '12px' }}>File Upload</Typography>
            <Progress 
              value={animatedProgress} 
              variant="primary" 
              label={`Uploading... ${Math.round(animatedProgress)}% complete`}
              size="md"
            />
            <Typography variant="caption" color="muted" style={{ marginTop: '8px', display: 'block' }}>
              {Math.round((animatedProgress / 100) * 2.4 * 10) / 10}MB of 2.4MB uploaded
            </Typography>
          </Card>
          
          <Card variant="default" padding="lg">
            <Typography variant="h6" style={{ marginBottom: '12px' }}>System Health</Typography>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <Typography variant="small" style={{ marginBottom: '4px' }}>CPU Usage</Typography>
                <Progress value={35} variant="success" size="sm" showLabel />
              </div>
              <div>
                <Typography variant="small" style={{ marginBottom: '4px' }}>Memory</Typography>
                <Progress value={68} variant="warning" size="sm" showLabel />
              </div>
              <div>
                <Typography variant="small" style={{ marginBottom: '4px' }}>Disk Space</Typography>
                <Progress value={92} variant="error" size="sm" showLabel />
              </div>
            </div>
          </Card>
          
          <Card variant="default" padding="lg">
            <Typography variant="h6" style={{ marginBottom: '12px' }}>Project Progress</Typography>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <CircularProgress value={68} variant="primary" showLabel size={80} strokeWidth={6} />
              <div>
                <Typography variant="body2" weight="semibold">Website Redesign</Typography>
                <Typography variant="caption" color="muted">15 of 22 tasks completed</Typography>
                <Typography variant="small" color="primary" style={{ marginTop: '4px', display: 'block' }}>
                  On track for delivery
                </Typography>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
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

export default ComponentVariantsShowcase;
