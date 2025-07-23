import React, { useState } from 'react';
import Alert from '../components/Alert';

const AlertExample = () => {
  const [alerts, setAlerts] = useState({
    success: true,
    warning: true,
    error: true,
    info: true,
  });

  const dismissAlert = (type) => {
    setAlerts(prev => ({ ...prev, [type]: false }));
  };

  const resetAlerts = () => {
    setAlerts({
      success: true,
      warning: true,
      error: true,
      info: true,
    });
  };

  return (
    <div className="alert-examples" style={{ 
      padding: '2rem', 
      maxWidth: '800px', 
      margin: '0 auto',
      fontFamily: 'var(--font-base)'
    }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '2rem' 
      }}>
        <h1 style={{ fontSize: 'var(--text-3xl)', margin: 0 }}>
          Alert Component Examples
        </h1>
        <button 
          onClick={resetAlerts}
          style={{
            padding: '0.5rem 1rem',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--color-border)',
            background: 'var(--color-bg-primary)',
            cursor: 'pointer'
          }}
        >
          Reset All Alerts
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        
        {/* Basic Alerts */}
        <section>
          <h2 style={{ marginBottom: '1rem', fontSize: 'var(--text-xl)' }}>
            Basic Alerts (Soft Variant)
          </h2>
          
          {alerts.success && (
            <Alert
              type="success"
              title="Success!"
              description="Your operation was completed successfully."
              onClose={() => dismissAlert('success')}
              style={{ marginBottom: '1rem' }}
            />
          )}

          {alerts.warning && (
            <Alert
              type="warning"
              title="Warning"
              description="Please review your settings before proceeding."
              onClose={() => dismissAlert('warning')}
              style={{ marginBottom: '1rem' }}
            />
          )}

          {alerts.error && (
            <Alert
              type="error"
              title="Error occurred"
              description="Unable to save changes. Please try again."
              onClose={() => dismissAlert('error')}
              style={{ marginBottom: '1rem' }}
            />
          )}

          {alerts.info && (
            <Alert
              type="info"
              title="Information"
              description="New features are available in this update."
              onClose={() => dismissAlert('info')}
              style={{ marginBottom: '1rem' }}
            />
          )}
        </section>

        {/* Outlined Variants */}
        <section>
          <h2 style={{ marginBottom: '1rem', fontSize: 'var(--text-xl)' }}>
            Outlined Variants
          </h2>
          
          <Alert
            type="success"
            variant="outlined"
            title="Outlined Success"
            description="This is an outlined success alert."
            style={{ marginBottom: '1rem' }}
          />

          <Alert
            type="error"
            variant="outlined"
            title="Outlined Error"
            description="This is an outlined error alert."
            style={{ marginBottom: '1rem' }}
          />
        </section>

        {/* Filled Variants */}
        <section>
          <h2 style={{ marginBottom: '1rem', fontSize: 'var(--text-xl)' }}>
            Filled Variants
          </h2>
          
          <Alert
            type="info"
            variant="filled"
            title="Filled Info"
            description="This is a filled info alert with white text."
            style={{ marginBottom: '1rem' }}
          />

          <Alert
            type="warning"
            variant="filled"
            title="Filled Warning"
            description="This is a filled warning alert."
            style={{ marginBottom: '1rem' }}
          />
        </section>

        {/* Title Only */}
        <section>
          <h2 style={{ marginBottom: '1rem', fontSize: 'var(--text-xl)' }}>
            Title Only
          </h2>
          
          <Alert
            type="success"
            title="Task completed successfully"
            style={{ marginBottom: '1rem' }}
          />

          <Alert
            type="error"
            title="Connection failed"
            style={{ marginBottom: '1rem' }}
          />
        </section>

        {/* Custom Content */}
        <section>
          <h2 style={{ marginBottom: '1rem', fontSize: 'var(--text-xl)' }}>
            Custom Content
          </h2>
          
          <Alert
            type="info"
            title="Update Available"
            style={{ marginBottom: '1rem' }}
          >
            A new version of the application is available. 
            <a href="#" style={{ textDecoration: 'underline', marginLeft: '0.25rem' }}>
              Click here to update
            </a>
          </Alert>
        </section>

        {/* Non-dismissible */}
        <section>
          <h2 style={{ marginBottom: '1rem', fontSize: 'var(--text-xl)' }}>
            Non-dismissible Alert
          </h2>
          
          <Alert
            type="warning"
            title="System Maintenance"
            description="Scheduled maintenance will occur tonight from 2 AM - 4 AM EST."
            dismissible={false}
            style={{ marginBottom: '1rem' }}
          />
        </section>

        {/* Different Responsive Behavior */}
        <section>
          <h2 style={{ marginBottom: '1rem', fontSize: 'var(--text-xl)' }}>
            Desktop-only Width (No Mobile Full-width)
          </h2>
          
          <Alert
            type="info"
            title="Desktop Alert"
            description="This alert doesn't expand to full width on mobile."
            fullWidthOnMobile={false}
            style={{ marginBottom: '1rem' }}
          />
        </section>

      </div>
    </div>
  );
};

export default AlertExample;
