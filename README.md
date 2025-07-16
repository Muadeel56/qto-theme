# QTO House Theme Components

A comprehensive React component library built specifically for QTO House websites, featuring a cohesive design system based on the brand's color palette.

## Features

- **Brand-consistent colors**: Based on QTO House logo colors (#f2b60f gold, #808080 gray, #ffffff white)
- **Fully responsive**: Mobile-first design with responsive breakpoints
- **Accessible**: WCAG compliant with proper ARIA attributes
- **Modern CSS**: Uses CSS custom properties for theming
- **TypeScript ready**: PropTypes validation included
- **Dark mode support**: Automatic dark mode detection

## Components

### Button
Versatile button component with multiple variants and sizes.

```jsx
import { Button } from './components';

<Button variant="primary" size="md">Click me</Button>
<Button variant="outline" loading>Loading...</Button>
<Button variant="ghost" disabled>Disabled</Button>
```

**Props:**
- `variant`: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
- `size`: 'sm' | 'md' | 'lg'
- `loading`: boolean
- `disabled`: boolean
- `fullWidth`: boolean
- `leftIcon`: React.ReactNode
- `rightIcon`: React.ReactNode

### Input
Flexible input component with labels, validation, and icons.

```jsx
import { Input } from './components';

<Input 
  label="Email" 
  type="email" 
  placeholder="Enter your email"
  required
  error="Please enter a valid email"
/>
```

**Props:**
- `label`: string
- `type`: string (default: 'text')
- `placeholder`: string
- `error`: string
- `helperText`: string
- `required`: boolean
- `disabled`: boolean
- `size`: 'sm' | 'md' | 'lg'
- `variant`: 'default' | 'filled' | 'minimal'
- `leftIcon`: React.ReactNode
- `rightIcon`: React.ReactNode

### Card
Container component for organizing content with header, body, and footer sections.

```jsx
import { Card } from './components';

<Card variant="outlined" shadow="md">
  <Card.Header>
    <h3 className="card-title">Card Title</h3>
    <p className="card-subtitle">Card subtitle</p>
  </Card.Header>
  <Card.Body>
    <p>Card content goes here...</p>
  </Card.Body>
  <Card.Footer>
    <Button variant="primary">Action</Button>
  </Card.Footer>
</Card>
```

**Props:**
- `variant`: 'default' | 'outlined' | 'elevated' | 'filled'
- `shadow`: 'none' | 'sm' | 'md' | 'lg' | 'xl'
- `padding`: 'none' | 'sm' | 'md' | 'lg' | 'xl'
- `rounded`: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full'

### Badge
Small status indicators and labels.

```jsx
import { Badge } from './components';

<Badge variant="primary">New</Badge>
<Badge variant="success" size="sm">Active</Badge>
<Badge variant="warning" rounded="full">⚠️</Badge>
```

**Props:**
- `variant`: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info'
- `size`: 'sm' | 'md' | 'lg'
- `rounded`: 'sm' | 'md' | 'lg' | 'full'

### Avatar
User profile pictures and initials display.

```jsx
import { Avatar } from './components';

<Avatar src="/path/to/image.jpg" alt="User" size="md" />
<Avatar name="John Doe" size="lg" variant="square" />
<Avatar fallback="JD" size="xl" variant="rounded" />
```

**Props:**
- `src`: string (image URL)
- `alt`: string
- `name`: string (generates initials)
- `size`: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
- `variant`: 'circular' | 'square' | 'rounded'
- `fallback`: React.ReactNode

### Modal
Dialog component for overlays and popup content.

```jsx
import { Modal } from './components';

<Modal 
  isOpen={isModalOpen} 
  onClose={() => setIsModalOpen(false)}
  title="Confirmation"
  size="md"
>
  <p>Are you sure you want to proceed?</p>
  <Modal.Footer>
    <Button variant="outline" onClick={() => setIsModalOpen(false)}>
      Cancel
    </Button>
    <Button variant="primary" onClick={handleConfirm}>
      Confirm
    </Button>
  </Modal.Footer>
</Modal>
```

**Props:**
- `isOpen`: boolean (required)
- `onClose`: function (required)
- `title`: string
- `size`: 'sm' | 'md' | 'lg' | 'xl' | 'full'
- `closeOnBackdrop`: boolean (default: true)
- `showCloseButton`: boolean (default: true)

## Color Palette

The theme uses QTO House brand colors:

- **Primary Gold**: `#f2b60f` - Main brand color
- **Secondary Gray**: `#808080` - Supporting neutral
- **White**: `#ffffff` - Clean backgrounds
- **Semantic Colors**: Success, warning, error, and info variants

## CSS Custom Properties

All components use CSS custom properties for easy customization:

```css
:root {
  --color-primary: #f2b60f;
  --color-secondary: #808080;
  --color-text: #171717;
  --color-bg-primary: #ffffff;
  --spacing-sm: 0.5rem;
  --radius-md: 0.375rem;
  --transition-fast: 150ms ease-in-out;
}
```

## Usage

1. Import the components you need:
```jsx
import { Button, Input, Card, Badge, Avatar, Modal } from './components';
```

2. Include the CSS in your main CSS file:
```css
@import './styles/tokens.css';
@import './styles/base.css';
@import './styles/button.css';
@import './styles/input.css';
@import './styles/card.css';
@import './styles/badge.css';
@import './styles/avatar.css';
@import './styles/modal.css';
```

3. Use the components in your React application:
```jsx
function App() {
  return (
    <div className="container">
      <Card>
        <Card.Header>
          <h1>Welcome to QTO House</h1>
        </Card.Header>
        <Card.Body>
          <Button variant="primary">Get Started</Button>
        </Card.Body>
      </Card>
    </div>
  );
}
```

## Responsive Design

All components are built with mobile-first responsive design:

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: > 1024px

Components automatically adjust sizing, spacing, and layout for different screen sizes.

## Accessibility

- Semantic HTML elements
- ARIA attributes for screen readers
- Keyboard navigation support
- Focus indicators
- Color contrast compliance
- Reduced motion support

## Development

To run the development server:

```bash
npm run dev
```

To build for production:

```bash
npm run build
```

## License

This theme is proprietary to QTO House and is not open source.
- **Accent Color**: `#ffca28` (Light Golden)
- **Gray Palette**: Based on `#808080` from the logo

## 🚀 Components

### Core Components

#### Button
A versatile button component with multiple variants and sizes.

```jsx
import { Button } from 'qto-theme';

<Button variant="primary" size="md" icon="🚀" loading={false}>
  Click Me
</Button>
```

**Props:**
- `variant`: `primary` | `secondary` | `outline` | `ghost` | `link` | `danger`
- `size`: `xs` | `sm` | `md` | `lg` | `xl`
- `icon`: React node for icon
- `iconPosition`: `left` | `right`
- `loading`: boolean
- `disabled`: boolean
- `fullWidth`: boolean

#### Input
Enhanced input field with icons, validation, and multiple variants.

```jsx
import { Input } from 'qto-theme';

<Input
  label="Email"
  placeholder="Enter your email"
  type="email"
  leftIcon="📧"
  rightIcon="👁️"
  helperText="This field is required"
  errorText="Invalid email"
  required
/>
```

**Props:**
- `variant`: `default` | `filled` | `outline`
- `size`: `sm` | `md` | `lg`
- `label`: string
- `helperText`: string
- `errorText`: string
- `leftIcon`: React node
- `rightIcon`: React node
- `onRightIconClick`: function

#### Typography
Flexible typography component for consistent text styling.

```jsx
import { Typography } from 'qto-theme';

<Typography variant="heading" size="2xl" weight="bold" color="primary">
  Welcome to QTO
</Typography>
```

**Props:**
- `variant`: `heading` | `body` | `caption` | `code`
- `size`: `xs` | `sm` | `base` | `lg` | `xl` | `2xl` | `3xl` | `4xl`
- `weight`: `light` | `normal` | `medium` | `semibold` | `bold`
- `color`: `text` | `secondary` | `muted` | `primary` | `success` | `warning` | `error` | `info`
- `align`: `left` | `center` | `right` | `justify`

### Layout Components

#### Container
Responsive container with different max-widths.

```jsx
import { Container } from 'qto-theme';

<Container size="lg" padding>
  Your content here
</Container>
```

#### Stack
Flexible layout component for vertical or horizontal stacking.

```jsx
import { Stack } from 'qto-theme';

<Stack direction="vertical" spacing="md" align="center">
  <Button>Button 1</Button>
  <Button>Button 2</Button>
</Stack>
```

#### Grid
CSS Grid layout component.

```jsx
import { Grid } from 'qto-theme';

<Grid columns={3} gap="md">
  <Card>Item 1</Card>
  <Card>Item 2</Card>
  <Card>Item 3</Card>
</Grid>
```

#### Flex
Flexbox layout component.

```jsx
import { Flex } from 'qto-theme';

<Flex justify="between" align="center" gap="md">
  <Button>Left</Button>
  <Button>Right</Button>
</Flex>
```

### UI Components

#### Avatar
User avatar component with status indicators.

```jsx
import { Avatar } from 'qto-theme';

<Avatar
  src="/path/to/image.jpg"
  alt="User Avatar"
  size="md"
  shape="circle"
  status="online"
  initials="JD"
/>
```

#### Logo
QTO logo component with multiple variants.

```jsx
import { Logo } from 'qto-theme';

<Logo size="lg" variant="full" />
<Logo size="md" variant="icon" />
```

#### Badge
Status and notification badges.

```jsx
import { Badge } from 'qto-theme';

<Badge variant="primary" size="md">
  New
</Badge>
```

#### Card
Container component with elevation and border radius.

```jsx
import { Card } from 'qto-theme';

<Card padding="lg" elevated>
  <Typography variant="heading">Card Title</Typography>
  <Typography>Card content goes here.</Typography>
</Card>
```

#### Alert
Notification and alert messages.

```jsx
import { Alert } from 'qto-theme';

<Alert type="success" title="Success!" dismissible>
  Your action was completed successfully.
</Alert>
```

#### Modal
Modal dialog component.

```jsx
import { Modal } from 'qto-theme';

<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Modal Title"
  size="md"
>
  Modal content
</Modal>
```

#### Spinner
Loading spinner component.

```jsx
import { Spinner } from 'qto-theme';

<Spinner size="md" color="primary" />
```

#### Tooltip
Hover tooltip component.

```jsx
import { Tooltip } from 'qto-theme';

<Tooltip content="This is a tooltip" position="top">
  <Button>Hover me</Button>
</Tooltip>
```

#### Dropdown
Dropdown menu component.

```jsx
import { Dropdown } from 'qto-theme';

const items = [
  { text: 'Profile', icon: '👤' },
  { text: 'Settings', icon: '⚙️' },
  { text: 'Sign out', icon: '🚪', danger: true },
];

<Dropdown
  trigger={<Button>Menu</Button>}
  items={items}
  placement="bottom-start"
  onItemClick={(item) => console.log(item)}
/>
```

#### Tabs
Tab navigation component.

```jsx
import { Tabs } from 'qto-theme';

const tabs = [
  {
    label: 'Dashboard',
    icon: '📊',
    content: <div>Dashboard content</div>,
  },
  {
    label: 'Settings',
    icon: '⚙️',
    content: <div>Settings content</div>,
  },
];

<Tabs tabs={tabs} defaultActiveTab={0} variant="default" />
```

### Theme Components

#### ThemeToggle
Toggle between light and dark themes.

```jsx
import { ThemeToggle } from 'qto-theme';

<ThemeToggle />
```

## 🎯 Usage in QTO Shell

After creating all these components, you can use them in your QTO Shell project by importing them:

```jsx
import {
  Button,
  Input,
  Typography,
  Container,
  Stack,
  Grid,
  Flex,
  Avatar,
  Logo,
  Badge,
  Card,
  Alert,
  Modal,
  Spinner,
  Tooltip,
  Dropdown,
  Tabs,
  ThemeToggle,
} from 'qto-theme';

function MyApp() {
  return (
    <Container>
      <Stack spacing="lg">
        <Flex justify="between" align="center">
          <Logo size="lg" />
          <ThemeToggle />
        </Flex>
        
        <Typography variant="heading" size="2xl">
          Welcome to QTO Shell
        </Typography>
        
        <Grid columns={2} gap="md">
          <Card>
            <Typography variant="heading" size="lg">Card 1</Typography>
            <Button variant="primary">Action</Button>
          </Card>
          <Card>
            <Typography variant="heading" size="lg">Card 2</Typography>
            <Button variant="secondary">Action</Button>
          </Card>
        </Grid>
      </Stack>
    </Container>
  );
}
```

## 🌙 Dark Mode

All components support dark mode out of the box. Toggle dark mode by:

1. Using the `ThemeToggle` component
2. Manually setting the `data-theme` attribute:

```javascript
document.documentElement.setAttribute('data-theme', 'dark');
```

## 🛠️ Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 📦 Package Structure

```
qto-theme/
├── src/
│   ├── components/          # React components
│   ├── styles/             # CSS files
│   ├── index.js            # Main export file
│   └── App.jsx             # Demo app
├── package.json
└── README.md
```

## 🎨 Customization

The theme system uses CSS custom properties (variables) for easy customization. You can override any design token by modifying the CSS variables in `styles/tokens.css`.

## 📄 License

This project is part of the QTO ecosystem and follows the same licensing terms.+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
