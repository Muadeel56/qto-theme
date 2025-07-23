import React, { useState } from 'react';
import Modal from '../components/Modal';
import Button from '../components/Button';

const ModalExample = () => {
  const [modals, setModals] = useState({
    basic: false,
    sizes: false,
    variants: false,
    actions: false,
    fullscreen: false,
  });

  const openModal = (modalKey) => {
    setModals(prev => ({ ...prev, [modalKey]: true }));
  };

  const closeModal = (modalKey) => {
    setModals(prev => ({ ...prev, [modalKey]: false }));
  };

  return (
    <div className="modal-examples" style={{ 
      padding: '2rem', 
      maxWidth: '800px', 
      margin: '0 auto',
      fontFamily: 'var(--font-base)'
    }}>
      <h1 style={{ fontSize: 'var(--text-3xl)', marginBottom: '2rem' }}>
        Modal Component Examples
      </h1>

      <div style={{ display: 'grid', gap: '2rem' }}>
        
        {/* Basic Modals */}
        <section>
          <h2 style={{ fontSize: 'var(--text-xl)', marginBottom: '1rem' }}>
            Basic Modal
          </h2>
          <Button onClick={() => openModal('basic')}>
            Open Basic Modal
          </Button>
          
          <Modal
            open={modals.basic}
            onClose={() => closeModal('basic')}
            title="Basic Modal"
            actions={
              <>
                <Button variant="outline" onClick={() => closeModal('basic')}>
                  Cancel
                </Button>
                <Button onClick={() => closeModal('basic')}>
                  Confirm
                </Button>
              </>
            }
          >
            <p>This is a basic modal with title, content, and action buttons.</p>
            <p>It automatically handles focus management, keyboard navigation, and accessibility features.</p>
          </Modal>
        </section>

        {/* Size Variants */}
        <section>
          <h2 style={{ fontSize: 'var(--text-xl)', marginBottom: '1rem' }}>
            Size Variants
          </h2>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            {['xs', 'sm', 'md', 'lg', 'xl'].map(size => (
              <Button
                key={size}
                variant="outline"
                onClick={() => {
                  setModals(prev => ({ 
                    ...prev, 
                    [`size-${size}`]: true 
                  }));
                }}
              >
                {size.toUpperCase()} Modal
              </Button>
            ))}
          </div>
          
          {['xs', 'sm', 'md', 'lg', 'xl'].map(size => (
            <Modal
              key={size}
              open={modals[`size-${size}`]}
              onClose={() => setModals(prev => ({ ...prev, [`size-${size}`]: false }))}
              size={size}
              title={`${size.toUpperCase()} Size Modal`}
            >
              <p>This is a {size} sized modal.</p>
              <p>The modal automatically adjusts its width based on the size prop while maintaining responsive behavior.</p>
            </Modal>
          ))}
        </section>

        {/* Visual Variants */}
        <section>
          <h2 style={{ fontSize: 'var(--text-xl)', marginBottom: '1rem' }}>
            Visual Variants
          </h2>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            {['soft', 'glass', 'outlined'].map(variant => (
              <Button
                key={variant}
                variant="outline"
                onClick={() => {
                  setModals(prev => ({ 
                    ...prev, 
                    [`variant-${variant}`]: true 
                  }));
                }}
              >
                {variant.charAt(0).toUpperCase() + variant.slice(1)} Modal
              </Button>
            ))}
          </div>
          
          {['soft', 'glass', 'outlined'].map(variant => (
            <Modal
              key={variant}
              open={modals[`variant-${variant}`]}
              onClose={() => setModals(prev => ({ ...prev, [`variant-${variant}`]: false }))}
              variant={variant}
              title={`${variant.charAt(0).toUpperCase() + variant.slice(1)} Variant`}
            >
              <p>This modal uses the <strong>{variant}</strong> visual variant.</p>
              <p>Each variant provides a different visual styling while maintaining the same functionality.</p>
            </Modal>
          ))}
        </section>

        {/* Padding Variants */}
        <section>
          <h2 style={{ fontSize: 'var(--text-xl)', marginBottom: '1rem' }}>
            Padding Variants
          </h2>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            {['sm', 'md', 'lg'].map(padding => (
              <Button
                key={padding}
                variant="outline"
                onClick={() => {
                  setModals(prev => ({ 
                    ...prev, 
                    [`padding-${padding}`]: true 
                  }));
                }}
              >
                {padding.toUpperCase()} Padding
              </Button>
            ))}
          </div>
          
          {['sm', 'md', 'lg'].map(padding => (
            <Modal
              key={padding}
              open={modals[`padding-${padding}`]}
              onClose={() => setModals(prev => ({ ...prev, [`padding-${padding}`]: false }))}
              padding={padding}
              title={`${padding.toUpperCase()} Padding`}
            >
              <p>This modal uses <strong>{padding}</strong> padding.</p>
              <p>Notice how the spacing around the content changes based on the padding variant.</p>
            </Modal>
          ))}
        </section>

        {/* Complex Modal */}
        <section>
          <h2 style={{ fontSize: 'var(--text-xl)', marginBottom: '1rem' }}>
            Complex Modal with Form
          </h2>
          <Button onClick={() => openModal('complex')}>
            Open Form Modal
          </Button>
          
          <Modal
            open={modals.complex}
            onClose={() => closeModal('complex')}
            title="User Settings"
            size="lg"
            actions={
              <>
                <Button variant="outline" onClick={() => closeModal('complex')}>
                  Cancel
                </Button>
                <Button onClick={() => closeModal('complex')}>
                  Save Changes
                </Button>
              </>
            }
          >
            <form style={{ display: 'grid', gap: '1rem' }}>
              <div>
                <label htmlFor="username" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>
                  Username
                </label>
                <input 
                  type="text" 
                  id="username" 
                  defaultValue="john_doe"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-md)',
                    fontSize: 'var(--text-sm)'
                  }}
                />
              </div>
              <div>
                <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>
                  Email
                </label>
                <input 
                  type="email" 
                  id="email" 
                  defaultValue="john@example.com"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-md)',
                    fontSize: 'var(--text-sm)'
                  }}
                />
              </div>
              <div>
                <label htmlFor="bio" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>
                  Bio
                </label>
                <textarea 
                  id="bio" 
                  rows="4"
                  defaultValue="Software developer passionate about creating beautiful user experiences."
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-md)',
                    fontSize: 'var(--text-sm)',
                    resize: 'vertical'
                  }}
                />
              </div>
            </form>
          </Modal>
        </section>

        {/* No Close Button */}
        <section>
          <h2 style={{ fontSize: 'var(--text-xl)', marginBottom: '1rem' }}>
            Modal Without Close Button
          </h2>
          <Button onClick={() => openModal('noclose')}>
            Open Modal (No X)
          </Button>
          
          <Modal
            open={modals.noclose}
            onClose={() => closeModal('noclose')}
            title="Confirmation Required"
            showCloseButton={false}
            closeOnBackdrop={false}
            actions={
              <>
                <Button variant="outline" onClick={() => closeModal('noclose')}>
                  Cancel
                </Button>
                <Button onClick={() => closeModal('noclose')}>
                  Proceed
                </Button>
              </>
            }
          >
            <p>This modal has no close button and won't close when clicking the backdrop.</p>
            <p>You must use one of the action buttons to close it.</p>
          </Modal>
        </section>

      </div>
    </div>
  );
};

export default ModalExample;
