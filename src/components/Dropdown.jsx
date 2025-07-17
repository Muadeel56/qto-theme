import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../styles/dropdown.css';

const Dropdown = ({ 
  children, 
  trigger, 
  position = 'bottom-left',
  disabled = false,
  className = '',
  ...props 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const getDropdownClasses = () => {
    const baseClasses = 'dropdown';
    const positionClass = `dropdown-${position}`;
    const openClass = isOpen ? 'dropdown-open' : '';
    const disabledClass = disabled ? 'dropdown-disabled' : '';
    
    return [
      baseClasses,
      positionClass,
      openClass,
      disabledClass,
      className
    ].filter(Boolean).join(' ');
  };

  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeDropdown();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          closeDropdown();
        }
      });
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div 
      ref={dropdownRef}
      className={getDropdownClasses()}
      {...props}
    >
      <div 
        className="dropdown-trigger"
        onClick={toggleDropdown}
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-expanded={isOpen}
        aria-haspopup="true"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleDropdown();
          }
        }}
      >
        {trigger}
      </div>
      
      {isOpen && (
        <div className="dropdown-content">
          <div className="dropdown-menu">
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

const DropdownItem = ({ 
  children, 
  disabled = false,
  onClick,
  className = '',
  ...props 
}) => {
  const getItemClasses = () => {
    const baseClasses = 'dropdown-item';
    const disabledClass = disabled ? 'dropdown-item-disabled' : '';
    
    return [
      baseClasses,
      disabledClass,
      className
    ].filter(Boolean).join(' ');
  };

  const handleClick = (e) => {
    if (!disabled && onClick) {
      onClick(e);
    }
  };

  return (
    <div 
      className={getItemClasses()}
      onClick={handleClick}
      role="menuitem"
      tabIndex={disabled ? -1 : 0}
      {...props}
    >
      {children}
    </div>
  );
};

const DropdownDivider = ({ className = '', ...props }) => {
  return (
    <div className={`dropdown-divider ${className}`} {...props} />
  );
};

Dropdown.Item = DropdownItem;
Dropdown.Divider = DropdownDivider;

Dropdown.propTypes = {
  children: PropTypes.node.isRequired,
  trigger: PropTypes.node.isRequired,
  position: PropTypes.oneOf([
    'top-left', 'top-right', 'bottom-left', 'bottom-right',
    'left-top', 'left-bottom', 'right-top', 'right-bottom'
  ]),
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

DropdownItem.propTypes = {
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

DropdownDivider.propTypes = {
  className: PropTypes.string,
};

export default Dropdown;
