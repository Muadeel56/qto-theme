import React, { useState } from 'react';
import { 
  ThemeProvider,
  Button,
  Input,
  Modal,
  Alert,
  Container,
  Stack,
  Grid,
  Card,
  ThemeToggle,
  useResponsive
} from './index.js';

const ResponsiveDemo = () => {
  const { isMobile, isTablet, breakpoint, getGridCols } = useResponsive();
  const [showModal, setShowModal] = useState(false);
  const [showAlert, setShowAlert] = useState(true);

  return (
    <ThemeProvider>
      <Container padding>
        <Stack spacing="xl">
          {/* Header */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <div>
              <h1 style={{ margin: 0 }}>QTO Theme - Responsive Demo</h1>
              <p style={{ margin: '0.5rem 0 0 0', color: 'var(--color-text-secondary)' }}>
                Current breakpoint: <strong>{breakpoint}</strong> | 
                Device: <strong>{isMobile ? 'Mobile' : isTablet ? 'Tablet' : 'Desktop'}</strong>
              </p>
            </div>
            <ThemeToggle />
          </div>

          {/* Alert Demo */}
          {showAlert && (
            <Alert
              variant="info"
              title="Responsive Alert"
              dismissible
              onClose={() => setShowAlert(false)}
              fullWidthOnMobile
            >
              This alert automatically adapts to different screen sizes. On mobile, it becomes full-width 
              and stacks content vertically for better readability.
            </Alert>
          )}

          {/* Button Demo */}
          <div>
            <h2>Responsive Buttons</h2>
            <Stack spacing="md">
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <Button size="sm" responsive>Small</Button>
                <Button size="md" responsive>Medium</Button>
                <Button size="lg" responsive>Large</Button>
                <Button variant="outline" responsive>Outline</Button>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <Button 
                  startIcon={<span>→</span>} 
                  responsive
                  onClick={() => setShowModal(true)}
                >
                  Open Modal
                </Button>
                <Button 
                  variant="secondary" 
                  endIcon={<span>↗</span>} 
                  responsive
                >
                  External Link
                </Button>
              </div>
              {isMobile && (
                <Button fullWidth variant="primary" size="lg">
                  Full Width on Mobile
                </Button>
              )}
            </Stack>
          </div>

          {/* Form Demo */}
          <div>
            <h2>Responsive Forms</h2>
            <Stack spacing="md">
              <Input 
                label="Email Address"
                type="email"
                placeholder="Enter your email"
                fullWidthOnMobile
                startIcon={<span>@</span>}
              />
              <Input 
                label="Password"
                type="password"
                placeholder="Enter password"
                fullWidthOnMobile
                endIcon={<span>👁</span>}
              />
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <Button type="submit" responsive>
                  Sign In
                </Button>
                <Button variant="outline" responsive>
                  Cancel
                </Button>
              </div>
            </Stack>
          </div>

          {/* Grid Demo */}
          <div>
            <h2>Responsive Grid</h2>
            <p style={{ color: 'var(--color-text-secondary)', margin: '0 0 1rem 0' }}>
              Showing {getGridCols(1, 2, 3, 4)} columns on current screen size
            </p>
            <Grid cols={{ xs: 1, sm: 2, md: 3, lg: 4 }} gap="md">
              {[1, 2, 3, 4, 5, 6].map(num => (
                <Card key={num} style={{ padding: '1rem' }}>
                  <h4>Card {num}</h4>
                  <p>This card adapts to the responsive grid layout.</p>
                </Card>
              ))}
            </Grid>
          </div>

          {/* Typography Demo */}
          <div>
            <h2>Responsive Typography</h2>
            <Stack spacing="md">
              <div>
                <h1>Heading 1 - Scales with viewport</h1>
                <h2>Heading 2 - Beautiful and readable</h2>
                <h3>Heading 3 - Outfit font family</h3>
                <p>
                  Body text that maintains great readability across all device sizes. 
                  The Outfit font family provides excellent legibility and a modern appearance.
                  Text scales smoothly using clamp() functions for optimal reading experience.
                </p>
              </div>
            </Stack>
          </div>

          {/* Modal Demo */}
          <Modal 
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            title="Responsive Modal"
            fullScreenOnMobile
          >
            <Stack spacing="md">
              <p>
                This modal automatically becomes full-screen on mobile devices for better usability.
                On larger screens, it maintains a centered layout with proper spacing.
              </p>
              <Input 
                label="Your Name"
                placeholder="Enter your name"
                fullWidthOnMobile
              />
              <div style={{ 
                display: 'flex', 
                gap: '0.5rem', 
                justifyContent: 'flex-end',
                flexWrap: 'wrap'
              }}>
                <Button variant="outline" onClick={() => setShowModal(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setShowModal(false)}>
                  Save
                </Button>
              </div>
            </Stack>
          </Modal>
        </Stack>
      </Container>
    </ThemeProvider>
  );
};

export default ResponsiveDemo;
