import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../styles/menu.css';

const Menu = ({
  trigger,
  items = [],
  placement = 'bottom-start',
  offset = 4,
  disabled = false,
  className = '',
  onSelect,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const menuRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
        setSelectedIndex(-1);
      }
    };

    const handleKeyDown = (event) => {
      if (!isOpen) return;

      switch (event.key) {
        case 'Escape':
          setIsOpen(false);
          setSelectedIndex(-1);
          triggerRef.current?.focus();
          break;
        case 'ArrowDown':
          event.preventDefault();
          setSelectedIndex(prev => 
            prev < items.length - 1 ? prev + 1 : 0
          );
          break;
        case 'ArrowUp':
          event.preventDefault();
          setSelectedIndex(prev => 
            prev > 0 ? prev - 1 : items.length - 1
          );
          break;
        case 'Enter':
        case ' ':
          event.preventDefault();
          if (selectedIndex >= 0 && selectedIndex < items.length) {
            handleItemClick(items[selectedIndex]);
          }
          break;
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, selectedIndex, items]);

  const handleTriggerClick = () => {
    if (disabled) return;
    setIsOpen(!isOpen);
    setSelectedIndex(-1);
  };

  const handleItemClick = (item) => {
    if (item.disabled) return;
    
    onSelect?.(item);
    item.onClick?.(item);
    setIsOpen(false);
    setSelectedIndex(-1);
  };

  const getMenuPosition = () => {
    const [verticalPlacement, horizontalPlacement] = placement.split('-');
    const styles = {};

    switch (verticalPlacement) {
      case 'top':
        styles.bottom = '100%';
        styles.marginBottom = `${offset}px`;
        break;
      case 'bottom':
      default:
        styles.top = '100%';
        styles.marginTop = `${offset}px`;
        break;
    }

    switch (horizontalPlacement) {
      case 'start':
        styles.left = 0;
        break;
      case 'end':
        styles.right = 0;
        break;
      case 'center':
      default:
        styles.left = '50%';
        styles.transform = 'translateX(-50%)';
        break;
    }

    return styles;
  };

  const renderMenuItem = (item, index) => {
    if (item.type === 'divider') {
      return <div key={index} className="qto-menu__divider" />;
    }

    const isSelected = index === selectedIndex;
    const itemClasses = [
      'qto-menu__item',
      item.disabled ? 'qto-menu__item--disabled' : '',
      isSelected ? 'qto-menu__item--selected' : '',
      item.danger ? 'qto-menu__item--danger' : '',
      item.className || ''
    ].filter(Boolean).join(' ');

    return (
      <button
        key={index}
        type="button"
        className={itemClasses}
        onClick={() => handleItemClick(item)}
        disabled={item.disabled}
        role="menuitem"
        aria-selected={isSelected}
      >
        {item.icon && (
          <span className="qto-menu__item-icon">
            {item.icon}
          </span>
        )}
        
        <span className="qto-menu__item-content">
          <span className="qto-menu__item-label">{item.label}</span>
          {item.description && (
            <span className="qto-menu__item-description">{item.description}</span>
          )}
        </span>

        {item.shortcut && (
          <span className="qto-menu__item-shortcut">{item.shortcut}</span>
        )}

        {item.badge && (
          <span className="qto-menu__item-badge">{item.badge}</span>
        )}
      </button>
    );
  };

  return (
    <div className={`qto-menu ${className}`} ref={menuRef} {...props}>
      <div
        ref={triggerRef}
        className="qto-menu__trigger"
        onClick={handleTriggerClick}
        role="button"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        tabIndex={disabled ? -1 : 0}
      >
        {trigger}
      </div>

      {isOpen && (
        <div
          className="qto-menu__dropdown"
          style={getMenuPosition()}
          role="menu"
          aria-orientation="vertical"
        >
          <div className="qto-menu__content">
            {items.map((item, index) => renderMenuItem(item, index))}
          </div>
        </div>
      )}
    </div>
  );
};

// Menu Item component for building complex menus
const MenuItem = ({ 
  label, 
  icon, 
  description, 
  shortcut, 
  badge,
  disabled = false,
  danger = false,
  onClick,
  className = '',
  ...props 
}) => {
  return {
    label,
    icon,
    description,
    shortcut,
    badge,
    disabled,
    danger,
    onClick,
    className,
    ...props
  };
};

// Menu Divider component
const MenuDivider = () => {
  return { type: 'divider' };
};

Menu.propTypes = {
  trigger: PropTypes.node.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      icon: PropTypes.node,
      description: PropTypes.string,
      shortcut: PropTypes.string,
      badge: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      disabled: PropTypes.bool,
      danger: PropTypes.bool,
      onClick: PropTypes.func,
      className: PropTypes.string,
      type: PropTypes.oneOf(['divider'])
    })
  ).isRequired,
  placement: PropTypes.oneOf([
    'top-start', 'top-center', 'top-end',
    'bottom-start', 'bottom-center', 'bottom-end'
  ]),
  offset: PropTypes.number,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  onSelect: PropTypes.func,
};

MenuItem.propTypes = {
  label: PropTypes.string.isRequired,
  icon: PropTypes.node,
  description: PropTypes.string,
  shortcut: PropTypes.string,
  badge: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  disabled: PropTypes.bool,
  danger: PropTypes.bool,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

export default Menu;
export { MenuItem, MenuDivider };
