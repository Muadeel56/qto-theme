# QTO Theme Library - Component Usage Guide

## Overview

The QTO Theme Library is a comprehensive React component library designed for creating modern, responsive micro frontends. It features the Inter font family and an attractive color scheme based on the QTO logo (#f2b60f).

## Quick Start

```jsx
import React from 'react';
import { 
  Button, 
  Input, 
  Card, 
  ThemeToggle,
  Alert 
} from 'qto-theme';

function App() {
  return (
    <div>
      <ThemeToggle />
      <Alert type="success" title="Welcome!">
        QTO Theme Library is ready to use!
      </Alert>
      <Card>
        <Card.Header>
          <h3>Example Form</h3>
        </Card.Header>
        <Card.Body>
          <Input label="Name" placeholder="Enter your name..." />
          <Button variant="primary">Submit</Button>
        </Card.Body>
      </Card>
    </div>
  );
}
```

## Available Components

### Buttons
Enhanced with 6 variants, 3 sizes, and special props:

```jsx
// Variants
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="success">Success</Button>
<Button variant="warning">Warning</Button>
<Button variant="error">Error</Button>
<Button variant="info">Info</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>

// Special styles
<Button rounded>Rounded</Button>
<Button gradient>Gradient</Button>
<Button outline>Outline</Button>
<Button loading>Loading</Button>
<Button disabled>Disabled</Button>
```

### Inputs
Modern input fields with floating labels and enhanced UX:

```jsx
<Input
  label="Email"
  type="email"
  placeholder="Enter email..."
  value={email}
  onChange={setEmail}
  required
  icon="📧"
  helperText="We'll never share your email"
/>

// Variants
<Input variant="primary" />
<Input variant="success" />
<Input variant="error" />

// States
<Input error="This field is required" />
<Input disabled />
<Input loading />
```

### Select Dropdowns
Advanced select components with search and multi-select:

```jsx
const options = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
];

<Select
  label="Choose Option"
  options={options}
  value={selectedValue}
  onChange={setSelectedValue}
  searchable
  multiple
  clearable
  placeholder="Select options..."
/>
```

### Date & Time Pickers
Comprehensive date/time selection components:

```jsx
// Basic date picker
<DateTimePicker
  label="Select Date"
  type="date"
  value={date}
  onChange={setDate}
/>

// Quick date picker with presets
<QuickDatePicker
  label="Quick Date"
  value={quickDate}
  onChange={setQuickDate}
  presets={['Today', 'Tomorrow', 'Next Week']}
/>

// Date range picker
<DateRangePicker
  label="Date Range"
  startDate={startDate}
  endDate={endDate}
  onStartDateChange={setStartDate}
  onEndDateChange={setEndDate}
/>
```

### Badges
7 variants with special features:

```jsx
<Badge variant="primary">Primary</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="error">Error</Badge>
<Badge variant="info">Info</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="dot" />

// Special props
<Badge rounded>Rounded</Badge>
<Badge outline>Outline</Badge>
<Badge closable onClose={() => console.log('closed')}>
  Closable
</Badge>
<Badge icon="⭐">With Icon</Badge>
```

### Cards
Flexible card component with header, body, and footer:

```jsx
<Card elevated loading clickable>
  <Card.Header>
    <h3>Card Title</h3>
  </Card.Header>
  <Card.Body>
    <p>Card content goes here</p>
  </Card.Body>
  <Card.Footer>
    <Button size="sm">Action</Button>
  </Card.Footer>
</Card>

// With image
<Card>
  <Card.Image src="/image.jpg" alt="Card image" />
  <Card.Body>
    <h3>Image Card</h3>
    <p>Card with image</p>
  </Card.Body>
</Card>
```

### Progress Indicators
Linear and circular progress bars:

```jsx
// Linear progress
<Progress 
  value={75} 
  variant="success" 
  label="75% Complete"
  striped
  animated
/>

// Circular progress
<CircularProgress 
  value={60} 
  size="lg" 
  variant="primary"
  showValue
/>
```

### Data Tables
Full-featured data table with sorting and selection:

```jsx
const columns = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'email', label: 'Email', sortable: true },
  { key: 'role', label: 'Role', sortable: false },
];

const data = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
];

<Table
  data={data}
  columns={columns}
  selectable
  striped
  hoverable
  onRowClick={(row) => console.log(row)}
  renderCell={(column, row) => {
    if (column.key === 'role') {
      return <Badge variant="primary">{row.role}</Badge>;
    }
    return row[column.key];
  }}
/>
```

### Alerts
Informational alerts with dismissible option:

```jsx
<Alert type="success" title="Success!" dismissible onClose={handleClose}>
  Your operation completed successfully.
</Alert>

<Alert type="warning" title="Warning">
  Please review your input.
</Alert>

<Alert type="error" title="Error" dismissible>
  Something went wrong.
</Alert>

<Alert type="info" title="Info">
  Here's some helpful information.
</Alert>
```

### Modals
Modal dialogs with overlay:

```jsx
<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Modal Title"
  size="md"
>
  <p>Modal content goes here</p>
  <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
    <Button variant="primary" onClick={handleConfirm}>
      Confirm
    </Button>
    <Button variant="secondary" onClick={() => setIsOpen(false)}>
      Cancel
    </Button>
  </div>
</Modal>
```

### Theme System
Dark/light theme toggle with system-wide theming:

```jsx
import { ThemeProvider, useTheme } from 'qto-theme';

function App() {
  return (
    <ThemeProvider>
      <div>
        <ThemeToggle />
        {/* Your app components */}
      </div>
    </ThemeProvider>
  );
}

// Use theme in components
function MyComponent() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <div>
      Current theme: {theme}
      <Button onClick={toggleTheme}>Toggle Theme</Button>
    </div>
  );
}
```

## Design Tokens

The library uses CSS custom properties for consistent theming:

```css
/* Primary colors based on QTO logo */
--color-primary: #f2b60f;
--color-primary-light: #f4c441;
--color-primary-dark: #d4a00d;

/* Font family */
--font-base: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;

/* Spacing scale */
--spacing-xs: 0.25rem;
--spacing-sm: 0.5rem;
--spacing-md: 1rem;
--spacing-lg: 1.5rem;
--spacing-xl: 2rem;

/* Border radius */
--radius-sm: 0.25rem;
--radius-md: 0.5rem;
--radius-lg: 0.75rem;
--radius-full: 9999px;
```

## Responsive Design

All components are built with mobile-first responsive design:

- Touch-friendly target sizes (44px minimum on mobile)
- Responsive breakpoints
- Adaptive layouts
- Proper spacing and typography scaling

## Accessibility

Components include comprehensive accessibility features:

- ARIA labels and descriptions
- Keyboard navigation support
- Focus management
- Screen reader compatibility
- High contrast support
- Reduced motion preferences

## Micro Frontend Integration

Perfect for micro frontend architectures:

- Standalone component library
- CSS-in-JS or external CSS support
- Tree-shakeable exports
- TypeScript support (PropTypes included)
- Consistent design system across apps

## Installation

```bash
npm install qto-theme
# or
yarn add qto-theme
```

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## TypeScript

While the library is built in JavaScript with PropTypes, it's designed to work seamlessly with TypeScript projects.
