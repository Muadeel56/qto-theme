import React, { useState } from 'react';
import {
  Button,
  Input,
  Select,
  DatePicker,
  DateRangePicker,
  DateTimePicker,
  QuickDatePicker,
  Badge,
  Card,
  DataGrid,
  Progress,
  CircularProgress,
  Alert,
  Avatar,
  Modal,
  Calendar,
  Chart,
  Menu,
  MenuItem,
  MenuDivider,
  ThemeToggle,
  ThemeProvider
} from './components';
import DatePickerExample from './examples/DatePickerExample';
import './index.css';

const sampleTableData = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User', status: 'Inactive' },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Editor', status: 'Active' },
];

const tableColumns = [
  { key: 'name', title: 'Full Name', sortable: true, width: '200px' },
  { key: 'email', title: 'Email Address', sortable: true, width: '250px' },
  { key: 'role', title: 'Role', sortable: true, width: '120px' },
  { key: 'status', title: 'Status', sortable: false, width: '100px' },
];

const selectOptions = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
  { value: 'option4', label: 'Option 4' },
];

function App() {
  const [currentView, setCurrentView] = useState('main'); // 'main' or 'datepicker-demo'
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    text: '',
    email: '',
    select: '',
    date: '',
    quickDate: '',
    startDate: '',
    endDate: ''
  });

  const handleInputChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTableRowClick = (row) => {
    console.log('Row clicked:', row);
  };

  // If viewing DatePicker demo, render that component
  if (currentView === 'datepicker-demo') {
    return (
      <ThemeProvider>
        <div style={{ minHeight: '100vh', background: 'var(--color-bg-primary)' }}>
          <header style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '1rem 2rem',
            borderBottom: '1px solid var(--color-border)',
            background: 'var(--color-bg-primary)',
            position: 'sticky',
            top: 0,
            zIndex: 100
          }}>
            <Button 
              variant="outline" 
              onClick={() => setCurrentView('main')}
            >
              ← Back to Main Demo
            </Button>
            <ThemeToggle />
          </header>
          <DatePickerExample />
        </div>
      </ThemeProvider>
    );
  }

  const handleFormSubmit = (data) => {
    console.log('Form submitted:', data);
    // Here you would typically send the data to your API
  };

  // Chart data
  const chartData = [
    { label: 'Jan', value: 65 },
    { label: 'Feb', value: 59 },
    { label: 'Mar', value: 80 },
    { label: 'Apr', value: 81 },
    { label: 'May', value: 56 },
    { label: 'Jun', value: 55 },
    { label: 'Jul', value: 40 }
  ];

  const pieChartData = [
    { label: 'Desktop', value: 45 },
    { label: 'Mobile', value: 35 },
    { label: 'Tablet', value: 20 }
  ];

  // Menu items
  const menuItems = [
    { label: 'New File', icon: '📄', shortcut: 'Ctrl+N', onClick: () => console.log('New file') },
    { label: 'Open File', icon: '📁', shortcut: 'Ctrl+O', onClick: () => console.log('Open file') },
    { label: 'Save', icon: '💾', shortcut: 'Ctrl+S', onClick: () => console.log('Save') },
    MenuDivider(),
    { label: 'Cut', icon: '✂️', shortcut: 'Ctrl+X', onClick: () => console.log('Cut') },
    { label: 'Copy', icon: '📋', shortcut: 'Ctrl+C', onClick: () => console.log('Copy') },
    { label: 'Paste', icon: '📄', shortcut: 'Ctrl+V', onClick: () => console.log('Paste') },
    MenuDivider(),
    { label: 'Delete', icon: '🗑️', danger: true, onClick: () => console.log('Delete') },
  ];

  return (
    <ThemeProvider>
      <div className="qto-app">
      {/* Header */}
      <header style={{ 
        padding: '1.5rem 2rem', 
        background: 'linear-gradient(135deg, var(--color-bg-secondary) 0%, var(--color-bg-tertiary) 100%)', 
        borderBottom: '1px solid var(--color-border)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div>
          <h1 style={{ 
            margin: 0, 
            color: 'var(--color-primary)',
            fontFamily: 'var(--font-display)',
            fontSize: '2.5rem',
            fontWeight: '800',
            letterSpacing: '-0.025em',
            background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-hover) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            QTO Theme Library
          </h1>
          <p style={{
            margin: '0.5rem 0 0 0',
            color: 'var(--color-text-secondary)',
            fontFamily: 'var(--font-base)',
            fontSize: 'var(--text-base)',
            fontWeight: '500'
          }}>
            Beautiful, modern, and accessible React components
          </p>
        </div>
        <ThemeToggle />
      </header>

      {/* Main Content */}
      <main style={{ 
        padding: '3rem 2rem', 
        maxWidth: '1400px', 
        margin: '0 auto',
        background: 'var(--color-bg-primary)',
        minHeight: 'calc(100vh - 140px)'
      }}>

        {/* Demo Navigation */}
        <section style={{ marginBottom: '3rem' }}>
          <div style={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: '1rem', 
            justifyContent: 'center',
            padding: '2rem',
            background: 'var(--color-bg-secondary)',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--color-border)'
          }}>
            <Button 
              variant="outline" 
              onClick={() => setCurrentView('datepicker-demo')}
            >
              📅 View Full DatePicker Demo
            </Button>
            <Button variant="outline">
              📋 View All Components
            </Button>
            <Button variant="outline">
              🎨 Theme Customization
            </Button>
          </div>
        </section>
        
        {/* Alert Examples */}
        <section style={{ marginBottom: '4rem' }}>
          <h2 style={{ 
            marginBottom: '2rem', 
            color: 'var(--color-text)',
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-2xl)',
            fontWeight: '700',
            letterSpacing: '-0.025em'
          }}>
            Alert Components
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Alert type="success" title="Success!" dismissible>
              Your form has been submitted successfully.
            </Alert>
            <Alert type="warning" title="Warning">
              Please review your information before proceeding.
            </Alert>
            <Alert type="error" title="Error" dismissible>
              There was an error processing your request.
            </Alert>
            <Alert type="info" title="Info">
              This is some helpful information for you.
            </Alert>
          </div>
        </section>

        {/* Button Examples */}
        <section style={{ marginBottom: '4rem' }}>
          <h2 style={{ 
            marginBottom: '2rem', 
            color: 'var(--color-text)',
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-2xl)',
            fontWeight: '700',
            letterSpacing: '-0.025em'
          }}>
            Button Components
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="success">Success</Button>
            <Button variant="warning">Warning</Button>
            <Button variant="error">Error</Button>
            <Button variant="info">Info</Button>
          </div>
          
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
            <Button variant="primary" size="sm">Small</Button>
            <Button variant="primary" size="md">Medium</Button>
            <Button variant="primary" size="lg">Large</Button>
          </div>
          
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
            <Button variant="primary" rounded>Rounded</Button>
            <Button variant="primary" gradient>Gradient</Button>
            <Button variant="primary" outline>Outline</Button>
            <Button variant="primary" loading>Loading</Button>
          </div>
        </section>

        {/* Badge Examples */}
        <section style={{ marginBottom: '4rem' }}>
          <h2 style={{ 
            marginBottom: '2rem', 
            color: 'var(--color-text)',
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-2xl)',
            fontWeight: '700',
            letterSpacing: '-0.025em'
          }}>
            Badge Components
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* Standard Badges */}
            <div>
              <h3 style={{ 
                marginBottom: '1rem', 
                color: 'var(--color-text)',
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-lg)',
                fontWeight: '600'
              }}>
                Standard Badges
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
                <Badge variant="primary">New</Badge>
                <Badge variant="secondary">Draft</Badge>
                <Badge variant="success">Published</Badge>
                <Badge variant="warning">Pending</Badge>
                <Badge variant="error">Rejected</Badge>
                <Badge variant="info">Review</Badge>
              </div>
            </div>

            {/* Size Variations */}
            <div>
              <h3 style={{ 
                marginBottom: '1rem', 
                color: 'var(--color-text)',
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-lg)',
                fontWeight: '600'
              }}>
                Size Variations
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
                <Badge variant="primary" size="xs">Extra Small</Badge>
                <Badge variant="primary" size="sm">Small</Badge>
                <Badge variant="primary" size="md">Medium</Badge>
                <Badge variant="primary" size="lg">Large</Badge>
              </div>
            </div>

            {/* Interactive Badges */}
            <div>
              <h3 style={{ 
                marginBottom: '1rem', 
                color: 'var(--color-text)',
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-lg)',
                fontWeight: '600'
              }}>
                Interactive Badges
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
                <Badge variant="primary" closable onClose={() => console.log('Badge closed')}>
                  Closable Badge
                </Badge>
                <Badge variant="success" rounded>Rounded</Badge>
                <Badge variant="info" outline>Outline Style</Badge>
                <Badge variant="dot" />
                <span style={{ marginLeft: '0.5rem', color: 'var(--color-text-secondary)' }}>Dot indicator</span>
              </div>
            </div>
          </div>
        </section>

        {/* Form Components */}
        <section style={{ marginBottom: '4rem' }}>
          <h2 style={{ 
            marginBottom: '2rem', 
            color: 'var(--color-text)',
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-2xl)',
            fontWeight: '700',
            letterSpacing: '-0.025em'
          }}>
            Form Components
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {/* Input Examples */}
            <div>
              <h3 style={{ marginBottom: '1rem', color: 'var(--color-text)' }}>Inputs</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <Input
                  label="Text Input"
                  placeholder="Enter text..."
                  value={formData.text}
                  onChange={(value) => handleInputChange('text', value)}
                />
                <Input
                  label="Email Input"
                  type="email"
                  placeholder="Enter email..."
                  value={formData.email}
                  onChange={(value) => handleInputChange('email', value)}
                  required
                />
                <Input
                  label="With Icon"
                  placeholder="Search..."
                  icon="🔍"
                />
                <Input
                  label="Error State"
                  placeholder="Enter value..."
                  error="This field is required"
                />
              </div>
            </div>

            {/* Select Examples */}
            <div>
              <h3 style={{ marginBottom: '1rem', color: 'var(--color-text)' }}>Select Dropdowns</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <Select
                  label="Basic Select"
                  options={selectOptions}
                  value={formData.select}
                  onChange={(value) => handleInputChange('select', value)}
                  placeholder="Choose an option..."
                />
                <Select
                  label="Searchable Select"
                  options={selectOptions}
                  searchable
                  placeholder="Search options..."
                />
                <Select
                  label="Multi Select"
                  options={selectOptions}
                  multiple
                  placeholder="Choose multiple..."
                />
                <Select
                  label="Clearable Select"
                  options={selectOptions}
                  clearable
                  placeholder="Select with clear..."
                />
              </div>
            </div>

            {/* Date Picker Examples */}
            <div>
              <h3 style={{ marginBottom: '1rem', color: 'var(--color-text)' }}>Date Pickers</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <DateTimePicker
                  label="Date Picker"
                  type="date"
                  value={formData.date}
                  onChange={(value) => handleInputChange('date', value)}
                />
                <DateTimePicker
                  label="Date Time Picker"
                  type="datetime-local"
                />
                <QuickDatePicker
                  label="Quick Date Picker"
                  value={formData.quickDate}
                  onChange={(value) => handleInputChange('quickDate', value)}
                />
                <DateRangePicker
                  label="Date Range Picker"
                  startDate={formData.startDate}
                  endDate={formData.endDate}
                  onStartDateChange={(value) => handleInputChange('startDate', value)}
                  onEndDateChange={(value) => handleInputChange('endDate', value)}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Progress Examples */}
        <section style={{ marginBottom: '4rem' }}>
          <h2 style={{ 
            marginBottom: '2rem', 
            color: 'var(--color-text)',
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-2xl)',
            fontWeight: '700',
            letterSpacing: '-0.025em'
          }}>
            Progress Indicators
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            <div>
              <h3 style={{ marginBottom: '1rem', color: 'var(--color-text)' }}>Linear Progress</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <Progress value={30} label="30% Complete" />
                <Progress value={60} variant="success" label="Success Progress" />
                <Progress value={80} variant="warning" label="Warning Progress" />
                <Progress value={45} striped animated label="Animated Striped" />
              </div>
            </div>
            <div>
              <h3 style={{ marginBottom: '1rem', color: 'var(--color-text)' }}>Circular Progress</h3>
              <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                <CircularProgress value={75} size="lg" showValue />
                <CircularProgress value={50} variant="success" />
                <CircularProgress value={25} variant="warning" size="sm" />
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced DataGrid Example */}
        <section style={{ marginBottom: '4rem' }}>
          <h2 style={{ 
            marginBottom: '2rem', 
            color: 'var(--color-text)', 
            fontFamily: 'var(--font-display)', 
            fontSize: 'var(--text-2xl)',
            fontWeight: '700',
            letterSpacing: '-0.025em'
          }}>
            Enhanced DataGrid
          </h2>
          <DataGrid
            data={sampleTableData}
            columns={tableColumns.map(col => ({
              ...col,
              render: col.key === 'status' ? (value) => (
                <Badge 
                  variant={value === 'Active' ? 'success' : 'error'}
                  size="sm"
                >
                  {value}
                </Badge>
              ) : undefined
            }))}
            selectable
            multiSelect
            pagination
            pageSize={3}
            filterable
            sortable
            onRowClick={handleTableRowClick}
            onSelectionChange={(selected) => console.log('Selected rows:', selected)}
          />
        </section>

        {/* Card Examples */}
        <section style={{ marginBottom: '4rem' }}>
          <h2 style={{ 
            marginBottom: '2rem', 
            color: 'var(--color-text)',
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-2xl)',
            fontWeight: '700',
            letterSpacing: '-0.025em'
          }}>
            Card Components
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            <Card>
              <Card.Header>
                <h3 style={{ margin: 0 }}>Basic Card</h3>
              </Card.Header>
              <Card.Body>
                <p>This is a basic card with header and body content.</p>
              </Card.Body>
            </Card>

            <Card elevated>
              <Card.Header>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Avatar name="John Doe" size="sm" />
                  <h3 style={{ margin: 0 }}>User Profile</h3>
                </div>
              </Card.Header>
              <Card.Body>
                <p>Elevated card with avatar in header.</p>
              </Card.Body>
              <Card.Footer>
                <Button size="sm" variant="primary">View Profile</Button>
              </Card.Footer>
            </Card>

            <Card 
              clickable 
              onClick={() => console.log('Card clicked')}
              style={{ cursor: 'pointer' }}
            >
              <Card.Body>
                <h3>Clickable Card</h3>
                <p>Click anywhere on this card to trigger an action.</p>
              </Card.Body>
            </Card>

            <Card loading>
              <Card.Body>
                <h3>Loading Card</h3>
                <p>This card shows a loading state.</p>
              </Card.Body>
            </Card>
          </div>
        </section>

        {/* Modal Example */}
        <section style={{ marginBottom: '4rem' }}>
          <h2 style={{ 
            marginBottom: '2rem', 
            color: 'var(--color-text)',
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-2xl)',
            fontWeight: '700',
            letterSpacing: '-0.025em'
          }}>
            Modal Components
          </h2>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Button onClick={() => setIsModalOpen(true)}>Open Basic Modal</Button>
            <Button onClick={() => setIsFormModalOpen(true)} variant="secondary">Open Form Modal</Button>
          </div>
          
          <Modal 
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title="Example Modal"
          >
            <p>This is the modal content. You can put any components here.</p>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
              <Button 
                variant="primary" 
                onClick={() => {
                  console.log('Confirmed');
                  setIsModalOpen(false);
                }}
              >
                Confirm
              </Button>
              <Button 
                variant="secondary" 
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </Button>
            </div>
          </Modal>

          <Modal
            isOpen={isFormModalOpen}
            onClose={() => setIsFormModalOpen(false)}
            title="Create New User"
            footer={
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                <Button variant="secondary" onClick={() => setIsFormModalOpen(false)}>
                  Cancel
                </Button>
                <Button variant="primary" onClick={() => {
                  handleFormSubmit({ name: 'New User', email: 'user@example.com', role: 'User' });
                }}>
                  Create User
                </Button>
              </div>
            }
          >
            <p>This would be a form for creating a new user.</p>
          </Modal>
        </section>

        {/* Chart Examples */}
        <section style={{ marginBottom: '4rem' }}>
          <h2 style={{ 
            marginBottom: '2rem', 
            color: 'var(--color-text)',
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-2xl)',
            fontWeight: '700',
            letterSpacing: '-0.025em'
          }}>
            Chart Components
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
            <Chart 
              type="line" 
              data={chartData} 
              title="Monthly Sales" 
              width={400} 
              height={250}
            />
            <Chart 
              type="bar" 
              data={chartData} 
              title="Revenue by Month" 
              width={400} 
              height={250}
            />
            <Chart 
              type="pie" 
              data={pieChartData} 
              title="Device Usage" 
              width={400} 
              height={250}
            />
            <Chart 
              type="doughnut" 
              data={pieChartData} 
              title="Traffic Sources" 
              width={400} 
              height={250}
            />
          </div>
        </section>

        {/* Menu Examples */}
        <section style={{ marginBottom: '4rem' }}>
          <h2 style={{ 
            marginBottom: '2rem', 
            color: 'var(--color-text)',
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-2xl)',
            fontWeight: '700',
            letterSpacing: '-0.025em'
          }}>
            Menu Components
          </h2>
          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
            <Menu 
              trigger={<Button variant="secondary">File Menu</Button>}
              items={menuItems}
            />
            <Menu 
              trigger={
                <Button variant="outline">
                  Options ▼
                </Button>
              }
              items={[
                { label: 'Settings', icon: '⚙️', onClick: () => console.log('Settings') },
                { label: 'Profile', icon: '👤', badge: 'New', onClick: () => console.log('Profile') },
                { label: 'Help', icon: '❓', description: 'Get help and support', onClick: () => console.log('Help') },
                MenuDivider(),
                { label: 'Sign Out', icon: '🚪', danger: true, onClick: () => console.log('Sign out') }
              ]}
              placement="bottom-end"
            />
          </div>
        </section>

        {/* DatePicker Examples */}
        <section style={{ marginBottom: '4rem' }}>
          <h2 style={{ 
            marginBottom: '2rem', 
            color: 'var(--color-text)',
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-2xl)',
            fontWeight: '700',
            letterSpacing: '-0.025em'
          }}>
            Enhanced DatePicker Components
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', marginBottom: '2rem' }}>
            <div style={{ flex: '1', minWidth: '280px' }}>
              <DatePicker
                label="Responsive DatePicker"
                value={formData.date}
                onChange={(date) => handleInputChange('date', date)}
                placeholder="Select a date"
                responsive={true}
                fullWidthOnMobile={true}
                clearable={true}
                helperText="Fully responsive with mobile optimizations"
              />
            </div>
            <div style={{ flex: '1', minWidth: '280px' }}>
              <DatePicker
                label="Quick Actions DatePicker"
                quickActions={true}
                clearable={true}
                placeholder="Pick with quick options"
                helperText="Includes preset date options"
                size="lg"
              />
            </div>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
            <div style={{ flex: '1', minWidth: '280px' }}>
              <DatePicker
                label="Time Picker"
                type="time"
                placeholder="Select time"
                helperText="Time selection component"
              />
            </div>
            <div style={{ flex: '1', minWidth: '280px' }}>
              <DatePicker
                label="DateTime Picker"
                type="datetime-local"
                placeholder="Select date and time"
                helperText="Combined date and time picker"
              />
            </div>
          </div>
          <div style={{ 
            marginTop: '2rem', 
            padding: '1rem', 
            background: 'var(--color-bg-secondary)', 
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--color-border)'
          }}>
            <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
              🎯 <strong>Pro Tip:</strong> Try resizing your browser window or testing on different devices to see the responsive behavior in action!
            </p>
          </div>
        </section>

        {/* DateRangePicker Examples */}
        <section style={{ marginBottom: '4rem' }}>
          <h2 style={{ 
            marginBottom: '2rem', 
            color: 'var(--color-text)',
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-2xl)',
            fontWeight: '700',
            letterSpacing: '-0.025em'
          }}>
            Enhanced DateRangePicker Components
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', marginBottom: '2rem' }}>
            <div style={{ flex: '1', minWidth: '320px' }}>
              <DateRangePicker
                label="Responsive Date Range"
                startDate={formData.startDate}
                endDate={formData.endDate}
                onChange={(start, end) => {
                  handleInputChange('startDate', start);
                  handleInputChange('endDate', end);
                }}
                responsive={true}
                fullWidthOnMobile={true}
                stackOnMobile={true}
                showClearButton={true}
                helperText="Responsive date range with mobile stacking"
              />
            </div>
            <div style={{ flex: '1', minWidth: '320px' }}>
              <DateRangePicker
                label="Quick Preset Range"
                showPresets={true}
                showClearButton={true}
                helperText="Includes preset range options"
                size="lg"
              />
            </div>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
            <div style={{ flex: '1', minWidth: '320px' }}>
              <DateRangePicker
                label="Custom Labels Range"
                startLabel="Check-in Date"
                endLabel="Check-out Date"
                separatorText="until"
                allowSameDate={false}
                helperText="Custom labels and validation"
              />
            </div>
            <div style={{ flex: '1', minWidth: '320px' }}>
              <DateRangePicker
                label="Outline Variant"
                variant="outline"
                highlightRange={true}
                autoSelectEndDate={true}
                helperText="Auto-focus end date after start selection"
              />
            </div>
          </div>
          <div style={{ 
            marginTop: '2rem', 
            padding: '1rem', 
            background: 'var(--color-info-light)', 
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--color-info)'
          }}>
            <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--color-info-dark)' }}>
              💡 <strong>Mobile Features:</strong> On mobile devices, inputs stack vertically for better usability, and range info is displayed clearly below the inputs.
            </p>
          </div>
        </section>

        {/* Calendar Example */}
        <section style={{ marginBottom: '4rem' }}>
          <h2 style={{ 
            marginBottom: '2rem', 
            color: 'var(--color-text)',
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-2xl)',
            fontWeight: '700',
            letterSpacing: '-0.025em'
          }}>
            Calendar Component
          </h2>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Calendar 
              value={formData.date}
              onChange={(date) => handleInputChange('date', date)}
              showWeekNumbers
              highlightedDates={['2025-07-25', '2025-07-30']}
            />
          </div>
        </section>

      </main>
    </div>
    </ThemeProvider>
    
  );
}

export default App;
