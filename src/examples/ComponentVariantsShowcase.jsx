import React, { useState } from 'react';
import { 
  Calendar, Table, AlertCircle, MessageSquare, BarChart3, FileText, Settings,
  Square, Type, Menu, Search, User, Bell, Star, Play, Download, Upload,
  Check, ArrowRight, Loader2, Eye, Mail, Edit, Copy, Share, Trash2,
  ChevronDown, Plus, X, Info, AlertTriangle, Users, Zap, HelpCircle,
  ExternalLink, Lock, CreditCard, Heart
} from 'lucide-react';
import { ThemeProvider } from '../components/ThemeProvider';
import ThemeToggle from '../components/ThemeToggle';
import Button from '../components/Button';
import Card from '../components/Card';
import Input from '../components/Input';
import Dropdown from '../components/Dropdown';
import Badge from '../components/Badge';
import Avatar from '../components/Avatar';
import Typography from '../components/Typography';
import Progress from '../components/Progress';
import AlertExample from './AlertExample';
import ModalExample from './ModalExample';
import ChartExample from './ChartExample';
import CalendarExample from './CalendarExample';
import MuiDataGridExample from './MuiDataGridExample';
import FileHandlingExample from './FileHandlingExample';
import './Demo.css';

const ComponentVariantsShowcase = () => {
  const [activeSection, setActiveSection] = useState('buttons');

  const sections = [
    { id: 'buttons', label: 'Buttons', icon: <Square size={16} /> },
    { id: 'cards', label: 'Cards', icon: <Square size={16} /> },
    { id: 'inputs', label: 'Inputs', icon: <Search size={16} /> },
    { id: 'dropdowns', label: 'Dropdowns', icon: <Menu size={16} /> },
    { id: 'badges', label: 'Badges', icon: <Bell size={16} /> },
    { id: 'avatars', label: 'Avatars', icon: <User size={16} /> },
    { id: 'typography', label: 'Typography', icon: <Type size={16} /> },
    { id: 'progress', label: 'Progress', icon: <Play size={16} /> },
    { id: 'calendar', label: 'Calendar', icon: <Calendar size={16} /> },
    { id: 'tables', label: 'Tables', icon: <Table size={16} /> },
    { id: 'alerts', label: 'Alerts', icon: <AlertCircle size={16} /> },
    { id: 'modals', label: 'Modals', icon: <MessageSquare size={16} /> },
    { id: 'charts', label: 'Charts', icon: <BarChart3 size={16} /> },
    { id: 'files', label: 'File Handling', icon: <FileText size={16} /> },
    { id: 'themes', label: 'Theme Demo', icon: <Settings size={16} /> }
  ];

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
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
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
            {sections.map((section) => (
              <button
                key={section.id}
                style={navButtonStyle(activeSection === section.id)}
                onClick={() => setActiveSection(section.id)}
              >
                {section.icon}
                {section.label}
              </button>
            ))}
          </div>
          
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <ThemeToggle variant="tabs" size="sm" showLabel={false} />
          </div>
        </nav>
        
        <main className="demo-content">
          {activeSection === 'buttons' && (
            <section>
              <ButtonVariants />
            </section>
          )}
          
          {activeSection === 'cards' && (
            <section>
              <CardVariants />
            </section>
          )}
          
          {activeSection === 'inputs' && (
            <section>
              <InputVariants />
            </section>
          )}
          
          {activeSection === 'dropdowns' && (
            <section>
              <DropdownVariants />
            </section>
          )}
          
          {activeSection === 'badges' && (
            <section>
              <BadgeVariants />
            </section>
          )}
          
          {activeSection === 'avatars' && (
            <section>
              <AvatarVariants />
            </section>
          )}
          
          {activeSection === 'typography' && (
            <section>
              <TypographyVariants />
            </section>
          )}
          
          {activeSection === 'progress' && (
            <section>
              <ProgressVariants />
            </section>
          )}
          
          {activeSection === 'calendar' && (
            <section>
              <CalendarExample />
            </section>
          )}
          
          {activeSection === 'tables' && (
            <section>
              <MuiDataGridExample />
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
          
          {activeSection === 'files' && (
            <section>
              <FileHandlingExample />
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

      {/* Outline Variants Section */}
      <div className="variant-section">
        <div className="section-header">
          <h3 className="section-title">Outline Variants</h3>
          <p className="section-description">Transparent background with colored borders and text</p>
        </div>
        <div className="button-demo-grid">
          <div className="button-demo-item">
            <Button variant="outline-primary">
              <Download size={16} />
              Outline Primary
            </Button>
            <span className="demo-label">Outline Primary</span>
          </div>
          <div className="button-demo-item">
            <Button variant="outline-secondary">
              <Share size={16} />
              Outline Secondary
            </Button>
            <span className="demo-label">Outline Secondary</span>
          </div>
          <div className="button-demo-item">
            <Button variant="outline-success">
              <Check size={16} />
              Outline Success
            </Button>
            <span className="demo-label">Outline Success</span>
          </div>
          <div className="button-demo-item">
            <Button variant="outline-danger">
              <X size={16} />
              Outline Danger
            </Button>
            <span className="demo-label">Outline Danger</span>
          </div>
          <div className="button-demo-item">
            <Button variant="outline-warning">
              <AlertCircle size={16} />
              Outline Warning
            </Button>
            <span className="demo-label">Outline Warning</span>
          </div>
          <div className="button-demo-item">
            <Button variant="outline-info">
              <HelpCircle size={16} />
              Outline Info
            </Button>
            <span className="demo-label">Outline Info</span>
          </div>
        </div>
      </div>

      {/* Special Variants Section */}
      <div className="variant-section">
        <div className="section-header">
          <h3 className="section-title">Special Variants</h3>
          <p className="section-description">Unique styles for specific use cases</p>
        </div>
        <div className="button-special-demo">
          <div className="button-demo-item">
            <Button variant="ghost">
              <Eye size={16} />
              Ghost
            </Button>
            <span className="demo-label">Ghost Button</span>
          </div>
          <div className="button-demo-item">
            <Button variant="link">
              <ExternalLink size={16} />
              Link Style
            </Button>
            <span className="demo-label">Link Button</span>
          </div>
          <div className="button-demo-item">
            <Button variant="primary" gradient>
              <Star size={16} />
              Gradient
            </Button>
            <span className="demo-label">Gradient Button</span>
          </div>
        </div>
      </div>

      {/* Interactive States Section */}
      <div className="variant-section">
        <div className="section-header">
          <h3 className="section-title">Interactive States</h3>
          <p className="section-description">Different states showing user interaction feedback</p>
        </div>
        <div className="button-states-demo">
          <div className="button-demo-item">
            <Button variant="primary">
              <Play size={16} />
              Normal
            </Button>
            <span className="demo-label">Normal State</span>
          </div>
          <div className="button-demo-item">
            <Button variant="primary" loading>
              <Loader2 size={16} className="animate-spin" />
              Loading
            </Button>
            <span className="demo-label">Loading State</span>
          </div>
          <div className="button-demo-item">
            <Button variant="primary" disabled>
              <Lock size={16} />
              Disabled
            </Button>
            <span className="demo-label">Disabled State</span>
          </div>
        </div>
      </div>

      {/* Icon Positions Section */}
      <div className="variant-section">
        <div className="section-header">
          <h3 className="section-title">Icon Positions</h3>
          <p className="section-description">Flexible icon placement options</p>
        </div>
        <div className="button-icon-demo">
          <div className="button-demo-item">
            <Button variant="primary" iconPosition="left">
              <Download size={16} />
              Download File
            </Button>
            <span className="demo-label">Icon Left</span>
          </div>
          <div className="button-demo-item">
            <Button variant="secondary" iconPosition="right">
              Upload File
              <Upload size={16} />
            </Button>
            <span className="demo-label">Icon Right</span>
          </div>
          <div className="button-demo-item">
            <Button variant="outline-primary" size="md" style={{ width: '44px', height: '44px', padding: '0' }}>
              <Plus size={20} />
            </Button>
            <span className="demo-label">Icon Only</span>
          </div>
        </div>
      </div>

      {/* Full Width Section */}
      <div className="variant-section">
        <div className="section-header">
          <h3 className="section-title">Layout Options</h3>
          <p className="section-description">Responsive layout configurations</p>
        </div>
        <div className="button-layout-demo">
          <div className="button-demo-item full-width">
            <Button variant="primary" fullWidth>
              <CreditCard size={16} />
              Full Width Button
            </Button>
            <span className="demo-label">Full Width</span>
          </div>
          <div className="button-demo-item">
            <Button variant="outline-primary" rounded>
              <Heart size={16} />
              Rounded
            </Button>
            <span className="demo-label">Rounded</span>
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
      <h2>Card Variants</h2>
      <p>Flexible containers for grouping and displaying content with various styles</p>
      
      <div className="variant-section">
        <h3>Style Variants</h3>
        <div className="card-variant-grid">
          <Card variant="default" className="demo-card">
            <h4>Default Card</h4>
            <p>Standard card with subtle shadow and clean borders.</p>
            <Button size="sm" variant="primary">View Details</Button>
          </Card>
          
          <Card variant="outlined" className="demo-card">
            <h4>Outlined Card</h4>
            <p>Clean outlined style with no shadow.</p>
            <Button size="sm" variant="outline-primary">Explore</Button>
          </Card>
          
          <Card variant="elevated" className="demo-card">
            <h4>Elevated Card</h4>
            <p>Enhanced shadow elevation for important content.</p>
            <Button size="sm" variant="success">Get Started</Button>
          </Card>
        </div>
      </div>

      <div className="variant-section">
        <h3>Interactive Cards</h3>
        <div className="card-variant-grid">
          <Card hover className="demo-card">
            <h4>Hover Effect</h4>
            <p>Hover over me to see smooth animations.</p>
            <span className="interaction-hint">🖱️ Hover me!</span>
          </Card>
          
          <Card clickable onClick={() => alert('Card clicked!')} className="demo-card">
            <h4>Clickable Card</h4>
            <p>I'm interactive! Click me to see what happens.</p>
            <span className="interaction-hint">👆 Click me!</span>
          </Card>
        </div>
      </div>
    </div>
  );
};

// Input Variants Component
const InputVariants = () => {
  return (
    <div className="variants-showcase">
      <h2>Input Variants</h2>
      <p>Various input field styles and configurations</p>
      
      <div className="variant-section">
        <h3>Basic Variants</h3>
        <div className="input-variant-grid">
          <Input placeholder="Default input" />
          <Input placeholder="Outlined input" variant="outlined" />
          <Input placeholder="Filled input" variant="filled" />
          <Input placeholder="Underlined input" variant="underlined" />
        </div>
      </div>

      <div className="variant-section">
        <h3>Sizes</h3>
        <div className="input-variant-grid">
          <Input size="sm" placeholder="Small input" />
          <Input size="md" placeholder="Medium input" />
          <Input size="lg" placeholder="Large input" />
        </div>
      </div>

      <div className="variant-section">
        <h3>With Icons</h3>
        <div className="input-variant-grid">
          <Input placeholder="Search..." startIcon={<Search size={16} />} />
          <Input placeholder="Password" type="password" endIcon={<Eye size={16} />} />
          <Input placeholder="Email" startIcon={<Mail size={16} />} endIcon={<Check size={16} />} />
        </div>
      </div>

      <div className="variant-section">
        <h3>States</h3>
        <div className="input-variant-grid">
          <Input placeholder="Normal state" />
          <Input placeholder="Error state" error />
          <Input placeholder="Success state" success />
          <Input disabled placeholder="Disabled state" />
        </div>
      </div>
    </div>
  );
};

// Dropdown Variants Component
const DropdownVariants = () => {
  return (
    <div className="variants-showcase">
      <h2>Dropdown Variants</h2>
      <p>Different dropdown styles and positions</p>
      
      <div className="variant-section">
        <h3>Position Variants</h3>
        <div className="dropdown-variant-grid">
          <Dropdown 
            trigger={<Button variant="primary">Bottom Left</Button>}
            position="bottom-left"
          >
            <div className="dropdown-content">
              <div className="dropdown-item">Option 1</div>
              <div className="dropdown-item">Option 2</div>
              <div className="dropdown-item">Option 3</div>
            </div>
          </Dropdown>

          <Dropdown 
            trigger={<Button variant="secondary">Bottom Right</Button>}
            position="bottom-right"
          >
            <div className="dropdown-content">
              <div className="dropdown-item">Option 1</div>
              <div className="dropdown-item">Option 2</div>
              <div className="dropdown-item">Option 3</div>
            </div>
          </Dropdown>
        </div>
      </div>

      <div className="variant-section">
        <h3>Menu Style Dropdowns</h3>
        <div className="dropdown-variant-grid">
          <Dropdown 
            trigger={<Button variant="outline-primary">User Menu</Button>}
          >
            <div className="dropdown-menu">
              <div className="dropdown-header">John Doe</div>
              <div className="dropdown-divider"></div>
              <div className="dropdown-item">Profile</div>
              <div className="dropdown-item">Settings</div>
              <div className="dropdown-item">Billing</div>
              <div className="dropdown-divider"></div>
              <div className="dropdown-item danger">Logout</div>
            </div>
          </Dropdown>

          <Dropdown 
            trigger={<Button variant="outline-secondary">Actions</Button>}
          >
            <div className="dropdown-menu">
              <div className="dropdown-item">
                <Edit size={16} className="dropdown-icon" />
                Edit
              </div>
              <div className="dropdown-item">
                <Copy size={16} className="dropdown-icon" />
                Copy
              </div>
              <div className="dropdown-item">
                <Share size={16} className="dropdown-icon" />
                Share
              </div>
              <div className="dropdown-divider"></div>
              <div className="dropdown-item danger">
                <Trash2 size={16} className="dropdown-icon" />
                Delete
              </div>
            </div>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

// Badge Variants Component
const BadgeVariants = () => {
  return (
    <div className="variants-showcase">
      <h2>Badge Variants</h2>
      <p>Small status indicators and labels</p>
      
      <div className="variant-section">
        <h3>Color Variants</h3>
        <div className="badge-variant-grid">
          <Badge variant="primary">Primary</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="danger">Danger</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="info">Info</Badge>
        </div>
      </div>

      <div className="variant-section">
        <h3>Sizes</h3>
        <div className="badge-variant-grid">
          <Badge size="sm">Small</Badge>
          <Badge size="md">Medium</Badge>
          <Badge size="lg">Large</Badge>
        </div>
      </div>

      <div className="variant-section">
        <h3>With Content</h3>
        <div className="badge-showcase-grid">
          <div className="badge-example">
            <Button variant="outline-primary">
              Notifications
              <Badge variant="danger">5</Badge>
            </Button>
          </div>
          <div className="badge-example">
            <Avatar size="md" name="John" />
            <Badge variant="success">●</Badge>
          </div>
          <div className="badge-example">
            <Typography>Messages</Typography>
            <Badge variant="info">99+</Badge>
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
      <h2>Avatar Variants</h2>
      <p>User profile images and placeholders</p>
      
      <div className="variant-section">
        <h3>Sizes</h3>
        <div className="avatar-variant-grid">
          <Avatar size="xs" name="John Doe" />
          <Avatar size="sm" name="Jane Smith" />
          <Avatar size="md" name="Mike Johnson" />
          <Avatar size="lg" name="Sarah Wilson" />
          <Avatar size="xl" name="David Brown" />
        </div>
      </div>

      <div className="variant-section">
        <h3>Types</h3>
        <div className="avatar-variant-grid">
          <Avatar name="John Doe" />
          <Avatar name="Jane Smith" />
          <Avatar icon={<User size={20} />} />
          <Avatar name="Team" />
        </div>
      </div>

      <div className="variant-section">
        <h3>Shapes</h3>
        <div className="avatar-variant-grid">
          <Avatar name="Round Avatar" shape="circle" />
          <Avatar name="Square Avatar" shape="square" />
          <Avatar name="Rounded Avatar" shape="rounded" />
        </div>
      </div>
    </div>
  );
};

// Typography Variants Component
const TypographyVariants = () => {
  return (
    <div className="variants-showcase">
      <h2>Typography Variants</h2>
      <p>Text styles and formatting options</p>
      
      <div className="variant-section">
        <h3>Headings</h3>
        <div className="typography-variant-grid">
          <Typography variant="h1">Heading 1</Typography>
          <Typography variant="h2">Heading 2</Typography>
          <Typography variant="h3">Heading 3</Typography>
          <Typography variant="h4">Heading 4</Typography>
          <Typography variant="h5">Heading 5</Typography>
          <Typography variant="h6">Heading 6</Typography>
        </div>
      </div>

      <div className="variant-section">
        <h3>Body Text</h3>
        <div className="typography-variant-grid">
          <Typography variant="body1">
            This is body1 text. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Typography>
          <Typography variant="body2">
            This is body2 text. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Typography>
          <Typography variant="caption">
            This is caption text. Ut enim ad minim veniam, quis nostrud exercitation.
          </Typography>
        </div>
      </div>

      <div className="variant-section">
        <h3>Colors</h3>
        <div className="typography-variant-grid">
          <Typography color="primary">Primary colored text</Typography>
          <Typography color="secondary">Secondary colored text</Typography>
          <Typography color="success">Success colored text</Typography>
          <Typography color="warning">Warning colored text</Typography>
          <Typography color="error">Error colored text</Typography>
          <Typography color="muted">Muted colored text</Typography>
        </div>
      </div>
    </div>
  );
};

// Progress Variants Component
const ProgressVariants = () => {
  return (
    <div className="variants-showcase">
      <h2>Progress Variants</h2>
      <p>Progress indicators and loading states</p>
      
      <div className="variant-section">
        <h3>Linear Progress</h3>
        <div className="progress-variant-grid">
          <Progress value={25} />
          <Progress value={50} />
          <Progress value={75} />
          <Progress value={100} />
        </div>
      </div>

      <div className="variant-section">
        <h3>Sizes</h3>
        <div className="progress-variant-grid">
          <Progress value={60} size="sm" />
          <Progress value={60} size="md" />
          <Progress value={60} size="lg" />
        </div>
      </div>

      <div className="variant-section">
        <h3>Colors</h3>
        <div className="progress-variant-grid">
          <Progress value={70} variant="primary" />
          <Progress value={70} variant="success" />
          <Progress value={70} variant="warning" />
          <Progress value={70} variant="danger" />
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
