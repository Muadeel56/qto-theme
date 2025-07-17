import React, { useState } from 'react';
import { 
  ThemeProvider, 
  ThemeToggle, 
  Button, 
  Card, 
  Badge, 
  Input,
  Avatar,
  Modal,
  Alert,
  Tooltip,
  Dropdown
} from './components';
import './index.css';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [alertVisible, setAlertVisible] = useState(true);

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">QTO Design System</h1>
            <ThemeToggle />
          </div>
          
          {/* Alert Section */}
          {alertVisible && (
            <div className="mb-6">
              <Alert 
                variant="info" 
                title="Welcome to QTO Design System"
                dismissible
                onClose={() => setAlertVisible(false)}
              >
                This is a showcase of all the components available in the QTO design system.
              </Alert>
            </div>
          )}
          
          <div className="grid gap-6">
            {/* Button Examples */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Buttons</h2>
              <div className="flex gap-4 flex-wrap">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="danger">Danger</Button>
                <Button variant="primary" onClick={() => setIsModalOpen(true)}>
                  Open Modal
                </Button>
              </div>
            </Card>

            {/* Input Examples */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Input</h2>
              <div className="max-w-md">
                <Input 
                  label="Email"
                  type="email"
                  placeholder="Enter your email"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
              </div>
            </Card>

            {/* Badge Examples */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Badges</h2>
              <div className="flex gap-2 flex-wrap">
                <Badge variant="primary">Primary</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="success">Success</Badge>
                <Badge variant="warning">Warning</Badge>
                <Badge variant="error">Error</Badge>
              </div>
            </Card>

            {/* Avatar Examples */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Avatars</h2>
              <div className="flex gap-4 items-center flex-wrap">
                <Avatar size="sm" name="John Doe" />
                <Avatar size="md" name="Jane Smith" />
                <Avatar size="lg" name="Bob Johnson" />
                <Avatar size="xl" name="Alice Brown" />
              </div>
            </Card>

            {/* Interactive Components */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Interactive Components</h2>
              <div className="flex gap-4 flex-wrap">
                <Tooltip content="This is a tooltip">
                  <Button variant="outline">Hover for tooltip</Button>
                </Tooltip>
                
                <Dropdown
                  trigger={<Button variant="outline">Dropdown Menu</Button>}
                >
                  <div className="py-1">
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Option 1
                    </a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Option 2
                    </a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Option 3
                    </a>
                  </div>
                </Dropdown>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Example Modal"
      >
        <div className="p-4">
          <p className="text-gray-600 mb-4">
            This is an example modal from the QTO design system.
          </p>
          <div className="flex gap-3 justify-end">
            <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={() => setIsModalOpen(false)}>
              Confirm
            </Button>
          </div>
        </div>
      </Modal>
    </ThemeProvider>
  );
}

export default App;