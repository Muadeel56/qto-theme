import React, { useState } from 'react';
import DatePicker from '../components/DatePicker';
import DateRangePicker from '../components/DateRangePicker';
import { Card } from '../components';
import '../index.css';

const DatePickerDemo = () => {
  const [basicDate, setBasicDate] = useState('');
  const [responsiveDate, setResponsiveDate] = useState('');
  const [quickDate, setQuickDate] = useState('');
  const [clearableDate, setClearableDate] = useState('');
  const [variantDates, setVariantDates] = useState({
    default: '',
    outline: '',
    filled: ''
  });

  // Date Range states
  const [basicRange, setBasicRange] = useState({ start: '', end: '' });
  const [responsiveRange, setResponsiveRange] = useState({ start: '', end: '' });
  const [presetRange, setPresetRange] = useState({ start: '', end: '' });
  const [customRange, setCustomRange] = useState({ start: '', end: '' });

  const customPresets = [
    { label: 'Today', action: 'today' },
    { label: 'Next Monday', onClick: () => {
      const today = new Date();
      const daysUntilMonday = (1 + 7 - today.getDay()) % 7 || 7;
      const nextMonday = new Date(today);
      nextMonday.setDate(today.getDate() + daysUntilMonday);
      setQuickDate(nextMonday.toISOString().split('T')[0]);
    }},
    { label: 'End of Month', onClick: () => {
      const today = new Date();
      const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
      setQuickDate(endOfMonth.toISOString().split('T')[0]);
    }}
  ];

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '2rem', textAlign: 'center' }}>
        Responsive DatePicker Components
      </h1>

      <div style={{ 
        display: 'grid', 
        gap: '2rem',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))'
      }}>
        
        {/* Basic DatePicker */}
        <Card>
          <Card.Header>
            <h3>Basic DatePicker</h3>
            <p>Standard date picker with responsive design</p>
          </Card.Header>
          <Card.Body>
            <DatePicker
              label="Select Date"
              value={basicDate}
              onChange={setBasicDate}
              placeholder="Choose a date"
              helperText="Pick any date you prefer"
              required
            />
            <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: '#666' }}>
              Selected: {basicDate || 'None'}
            </p>
          </Card.Body>
        </Card>

        {/* Responsive Features */}
        <Card>
          <Card.Header>
            <h3>Responsive Features</h3>
            <p>Adaptive behavior across devices</p>
          </Card.Header>
          <Card.Body>
            <DatePicker
              label="Responsive Date"
              value={responsiveDate}
              onChange={setResponsiveDate}
              responsive={true}
              fullWidthOnMobile={true}
              nativeOnMobile={true}
              mobileBreakpoint="md"
              helperText="Uses native picker on mobile devices"
            />
            <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: '#666' }}>
              Selected: {responsiveDate || 'None'}
            </p>
          </Card.Body>
        </Card>

        {/* Quick Actions */}
        <Card>
          <Card.Header>
            <h3>Quick Actions</h3>
            <p>Preset date options for convenience</p>
          </Card.Header>
          <Card.Body>
            <DatePicker
              label="Quick Date Selection"
              value={quickDate}
              onChange={setQuickDate}
              quickActions={true}
              presets={customPresets}
              helperText="Use quick actions for common dates"
            />
            <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: '#666' }}>
              Selected: {quickDate || 'None'}
            </p>
          </Card.Body>
        </Card>

        {/* Clearable DatePicker */}
        <Card>
          <Card.Header>
            <h3>Clearable DatePicker</h3>
            <p>With clear functionality</p>
          </Card.Header>
          <Card.Body>
            <DatePicker
              label="Clearable Date"
              value={clearableDate}
              onChange={setClearableDate}
              clearable={true}
              size="lg"
              helperText="Click X to clear the selected date"
            />
            <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: '#666' }}>
              Selected: {clearableDate || 'None'}
            </p>
          </Card.Body>
        </Card>

        {/* Size Variants */}
        <Card>
          <Card.Header>
            <h3>Size Variants</h3>
            <p>Different sizes for various use cases</p>
          </Card.Header>
          <Card.Body style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <DatePicker
              label="Small Size"
              size="sm"
              placeholder="Small date picker"
            />
            <DatePicker
              label="Medium Size (Default)"
              size="md"
              placeholder="Medium date picker"
            />
            <DatePicker
              label="Large Size"
              size="lg"
              placeholder="Large date picker"
            />
          </Card.Body>
        </Card>

        {/* Variant Styles */}
        <Card>
          <Card.Header>
            <h3>Style Variants</h3>
            <p>Different visual styles</p>
          </Card.Header>
          <Card.Body style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <DatePicker
              label="Default Variant"
              variant="default"
              value={variantDates.default}
              onChange={(date) => setVariantDates(prev => ({ ...prev, default: date }))}
              placeholder="Default styling"
            />
            <DatePicker
              label="Outline Variant"
              variant="outline"
              value={variantDates.outline}
              onChange={(date) => setVariantDates(prev => ({ ...prev, outline: date }))}
              placeholder="Outlined styling"
            />
            <DatePicker
              label="Filled Variant"
              variant="filled"
              value={variantDates.filled}
              onChange={(date) => setVariantDates(prev => ({ ...prev, filled: date }))}
              placeholder="Filled styling"
            />
          </Card.Body>
        </Card>

        {/* Error State */}
        <Card>
          <Card.Header>
            <h3>Error State</h3>
            <p>Validation and error handling</p>
          </Card.Header>
          <Card.Body>
            <DatePicker
              label="Required Date"
              error="This field is required"
              required
              placeholder="Please select a date"
            />
          </Card.Body>
        </Card>

        {/* Disabled State */}
        <Card>
          <Card.Header>
            <h3>Disabled State</h3>
            <p>Non-interactive state</p>
          </Card.Header>
          <Card.Body>
            <DatePicker
              label="Disabled Date"
              disabled
              value="2024-12-25"
              helperText="This field is disabled"
            />
          </Card.Body>
        </Card>

        {/* Time Picker */}
        <Card>
          <Card.Header>
            <h3>Time Picker</h3>
            <p>Time selection functionality</p>
          </Card.Header>
          <Card.Body>
            <DatePicker
              label="Select Time"
              type="time"
              placeholder="Choose time"
              helperText="Pick a time of day"
            />
          </Card.Body>
        </Card>

        {/* DateTime Picker */}
        <Card>
          <Card.Header>
            <h3>DateTime Picker</h3>
            <p>Combined date and time selection</p>
          </Card.Header>
          <Card.Body>
            <DatePicker
              label="Select Date & Time"
              type="datetime-local"
              placeholder="Choose date and time"
              helperText="Select both date and time"
            />
          </Card.Body>
        </Card>

        {/* Advanced Features */}
        <Card>
          <Card.Header>
            <h3>Advanced Features</h3>
            <p>Min/max dates and constraints</p>
          </Card.Header>
          <Card.Body>
            <DatePicker
              label="Date Range Constraint"
              min="2024-01-01"
              max="2024-12-31"
              helperText="Only dates in 2024 are allowed"
              clearable={true}
              quickActions={true}
            />
          </Card.Body>
        </Card>

        {/* Rounded Style */}
        <Card>
          <Card.Header>
            <h3>Rounded Style</h3>
            <p>Fully rounded corners</p>
          </Card.Header>
          <Card.Body>
            <DatePicker
              label="Rounded DatePicker"
              rounded={true}
              placeholder="Rounded styling"
              helperText="Fully rounded border radius"
            />
          </Card.Body>
        </Card>
      </div>

      {/* DateRangePicker Examples Section */}
      <h1 style={{ marginTop: '4rem', marginBottom: '2rem', textAlign: 'center', color: 'var(--color-primary)' }}>
        DateRangePicker Components
      </h1>

      <div style={{ 
        display: 'grid', 
        gap: '2rem',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))'
      }}>
        
        {/* Basic DateRangePicker */}
        <Card>
          <Card.Header>
            <h3>Basic DateRangePicker</h3>
            <p>Standard date range picker</p>
          </Card.Header>
          <Card.Body>
            <DateRangePicker
              label="Select Date Range"
              startDate={basicRange.start}
              endDate={basicRange.end}
              onChange={(start, end) => setBasicRange({ start, end })}
              helperText="Pick a start and end date"
              required
            />
            <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: '#666' }}>
              Selected: {basicRange.start || 'None'} → {basicRange.end || 'None'}
            </p>
          </Card.Body>
        </Card>

        {/* Responsive DateRangePicker */}
        <Card>
          <Card.Header>
            <h3>Responsive Features</h3>
            <p>Stacks on mobile devices</p>
          </Card.Header>
          <Card.Body>
            <DateRangePicker
              label="Responsive Date Range"
              startDate={responsiveRange.start}
              endDate={responsiveRange.end}
              onChange={(start, end) => setResponsiveRange({ start, end })}
              responsive={true}
              stackOnMobile={true}
              fullWidthOnMobile={true}
              showClearButton={true}
              helperText="Stacks vertically on mobile"
            />
            <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: '#666' }}>
              Selected: {responsiveRange.start || 'None'} → {responsiveRange.end || 'None'}
            </p>
          </Card.Body>
        </Card>

        {/* Preset DateRangePicker */}
        <Card>
          <Card.Header>
            <h3>With Presets</h3>
            <p>Quick range selection options</p>
          </Card.Header>
          <Card.Body>
            <DateRangePicker
              label="Quick Range Selection"
              startDate={presetRange.start}
              endDate={presetRange.end}
              onChange={(start, end) => setPresetRange({ start, end })}
              showPresets={true}
              showClearButton={true}
              helperText="Use preset buttons for common ranges"
            />
            <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: '#666' }}>
              Selected: {presetRange.start || 'None'} → {presetRange.end || 'None'}
            </p>
          </Card.Body>
        </Card>

        {/* Custom Labels */}
        <Card>
          <Card.Header>
            <h3>Custom Labels</h3>
            <p>Booking-style date range</p>
          </Card.Header>
          <Card.Body>
            <DateRangePicker
              label="Booking Dates"
              startLabel="Check-in"
              endLabel="Check-out"
              separatorText="until"
              startDate={customRange.start}
              endDate={customRange.end}
              onChange={(start, end) => setCustomRange({ start, end })}
              allowSameDate={false}
              autoSelectEndDate={true}
              helperText="Perfect for hotel bookings"
            />
            <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: '#666' }}>
              Selected: {customRange.start || 'None'} → {customRange.end || 'None'}
            </p>
          </Card.Body>
        </Card>

        {/* Size Variants */}
        <Card>
          <Card.Header>
            <h3>Size Variants</h3>
            <p>Different sizes available</p>
          </Card.Header>
          <Card.Body style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <DateRangePicker
              label="Small Size"
              size="sm"
              separatorText="to"
            />
            <DateRangePicker
              label="Large Size"
              size="lg"
              separatorText="to"
            />
          </Card.Body>
        </Card>

        {/* Style Variants */}
        <Card>
          <Card.Header>
            <h3>Style Variants</h3>
            <p>Different visual styles</p>
          </Card.Header>
          <Card.Body style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <DateRangePicker
              label="Outline Variant"
              variant="outline"
              separatorText="→"
            />
            <DateRangePicker
              label="Filled Variant"
              variant="filled"
              separatorText="—"
            />
          </Card.Body>
        </Card>

        {/* Validation */}
        <Card>
          <Card.Header>
            <h3>Validation Features</h3>
            <p>Built-in validation rules</p>
          </Card.Header>
          <Card.Body>
            <DateRangePicker
              label="Validated Range"
              error="Please select a valid date range"
              allowSameDate={false}
              required
              helperText="Start date must be before end date"
            />
          </Card.Body>
        </Card>

        {/* Advanced Features */}
        <Card>
          <Card.Header>
            <h3>Advanced Features</h3>
            <p>All features combined</p>
          </Card.Header>
          <Card.Body>
            <DateRangePicker
              label="Feature-Rich Range Picker"
              showPresets={true}
              showClearButton={true}
              highlightRange={true}
              autoSelectEndDate={true}
              stackOnMobile={true}
              responsive={true}
              helperText="All features enabled"
            />
          </Card.Body>
        </Card>
      </div>

      {/* Responsive Testing Guide */}
      <Card style={{ marginTop: '3rem' }}>
        <Card.Header>
          <h3>📱 Responsive Testing Guide</h3>
          <p>Test these features at different screen sizes</p>
        </Card.Header>
        <Card.Body>
          <div style={{ 
            display: 'grid', 
            gap: '1rem',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))'
          }}>
            <div>
              <h4>Mobile (&lt; 640px)</h4>
              <ul style={{ fontSize: '0.875rem', lineHeight: '1.5' }}>
                <li>Native picker on mobile devices</li>
                <li>Fullscreen calendar overlay</li>
                <li>Larger touch targets (44px min)</li>
                <li>Optimized font sizes</li>
                <li><strong>DateRange:</strong> Inputs stack vertically</li>
                <li><strong>DateRange:</strong> Selection info displayed</li>
              </ul>
            </div>
            <div>
              <h4>Tablet (641px - 1024px)</h4>
              <ul style={{ fontSize: '0.875rem', lineHeight: '1.5' }}>
                <li>Responsive calendar sizing</li>
                <li>Adaptive layout changes</li>
                <li>Touch-friendly interactions</li>
                <li><strong>DateRange:</strong> Side-by-side layout</li>
              </ul>
            </div>
            <div>
              <h4>Desktop (&gt; 1024px)</h4>
              <ul style={{ fontSize: '0.875rem', lineHeight: '1.5' }}>
                <li>Enhanced hover states</li>
                <li>Keyboard navigation support</li>
                <li>Optimized dropdown positioning</li>
                <li><strong>DateRange:</strong> Full feature set</li>
              </ul>
            </div>
          </div>
        </Card.Body>
      </Card>

      {/* Feature Comparison */}
      <Card style={{ marginTop: '3rem' }}>
        <Card.Header>
          <h3>🔥 DateRangePicker Features</h3>
          <p>Comprehensive feature set for all use cases</p>
        </Card.Header>
        <Card.Body>
          <div style={{ 
            display: 'grid', 
            gap: '2rem',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))'
          }}>
            <div>
              <h4>📱 Mobile Optimizations</h4>
              <ul style={{ fontSize: '0.875rem', lineHeight: '1.6' }}>
                <li>Automatic stacking on mobile</li>
                <li>Touch-friendly action buttons</li>
                <li>Clear date range display</li>
                <li>Responsive preset dropdown</li>
              </ul>
            </div>
            <div>
              <h4>✨ Smart Features</h4>
              <ul style={{ fontSize: '0.875rem', lineHeight: '1.6' }}>
                <li>Auto-focus end date after start selection</li>
                <li>Intelligent date validation</li>
                <li>Range highlighting and indication</li>
                <li>Quick preset ranges</li>
              </ul>
            </div>
            <div>
              <h4>🎨 Customization</h4>
              <ul style={{ fontSize: '0.875rem', lineHeight: '1.6' }}>
                <li>Multiple style variants</li>
                <li>Custom labels and separators</li>
                <li>Flexible sizing options</li>
                <li>Theme support (light/dark)</li>
              </ul>
            </div>
          </div>
        </Card.Body>
      </Card>

      {/* Responsive Testing Guide */}
      <Card style={{ marginTop: '3rem', display: 'none' }}>
        <Card.Header>
          <h3>📱 Responsive Testing Guide</h3>
          <p>Test these features at different screen sizes</p>
        </Card.Header>
        <Card.Body>
          <div style={{ 
            display: 'grid', 
            gap: '1rem',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))'
          }}>
            <div>
              <h4>Mobile (&lt; 640px)</h4>
              <ul style={{ fontSize: '0.875rem', lineHeight: '1.5' }}>
                <li>Native picker on mobile devices</li>
                <li>Fullscreen calendar overlay</li>
                <li>Larger touch targets (44px min)</li>
                <li>Optimized font sizes</li>
              </ul>
            </div>
            <div>
              <h4>Tablet (641px - 1024px)</h4>
              <ul style={{ fontSize: '0.875rem', lineHeight: '1.5' }}>
                <li>Responsive calendar sizing</li>
                <li>Adaptive layout changes</li>
                <li>Touch-friendly interactions</li>
              </ul>
            </div>
            <div>
              <h4>Desktop (&gt; 1024px)</h4>
              <ul style={{ fontSize: '0.875rem', lineHeight: '1.5' }}>
                <li>Enhanced hover states</li>
                <li>Keyboard navigation support</li>
                <li>Optimized dropdown positioning</li>
              </ul>
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default DatePickerDemo;
