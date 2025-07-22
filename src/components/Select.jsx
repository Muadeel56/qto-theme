import React, { forwardRef, useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/select.css';

const Select = forwardRef(({ 
  label,
  placeholder = 'Select an option',
  options = [],
  error,
  helperText,
  required = false,
  disabled = false,
  size = 'md',
  variant = 'default',
  fullWidth = false,
  rounded = false,
  multiple = false,
  searchable = false,
  clearable = false,
  className = '',
  onFocus,
  onBlur,
  onChange,
  ...props 
}, ref) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedValue, setSelectedValue] = useState(props.value || props.defaultValue || (multiple ? [] : ''));
  
  const selectId = props.id || `qto-select-${Math.random().toString(36).substr(2, 9)}`;

  const getSelectClasses = () => {
    const baseClasses = 'qto-select__field';
    const sizeClasses = `qto-select__field--${size}`;
    const variantClasses = `qto-select__field--${variant}`;
    const errorClasses = error ? 'qto-select__field--error' : '';
    const disabledClasses = disabled ? 'qto-select__field--disabled' : '';
    const focusedClasses = isFocused ? 'qto-select__field--focused' : '';
    const roundedClasses = rounded ? 'qto-select__field--rounded' : '';
    const fullWidthClasses = fullWidth ? 'qto-select__field--full-width' : '';
    const openClasses = isOpen ? 'qto-select__field--open' : '';
    
    return [
      baseClasses,
      sizeClasses,
      variantClasses,
      errorClasses,
      disabledClasses,
      focusedClasses,
      roundedClasses,
      fullWidthClasses,
      openClasses,
      className
    ].filter(Boolean).join(' ');
  };

  const getContainerClasses = () => {
    const baseClasses = 'qto-select';
    const fullWidthClasses = fullWidth ? 'qto-select--full-width' : '';
    const openClasses = isOpen ? 'qto-select--open' : '';
    
    return [
      baseClasses,
      fullWidthClasses,
      openClasses
    ].filter(Boolean).join(' ');
  };

  const handleFocus = (e) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleOptionSelect = (optionValue) => {
    if (multiple) {
      const newValue = selectedValue.includes(optionValue)
        ? selectedValue.filter(v => v !== optionValue)
        : [...selectedValue, optionValue];
      setSelectedValue(newValue);
      onChange?.(newValue);
    } else {
      setSelectedValue(optionValue);
      setIsOpen(false);
      onChange?.(optionValue);
    }
  };

  const handleClear = (e) => {
    e.stopPropagation();
    const newValue = multiple ? [] : '';
    setSelectedValue(newValue);
    onChange?.(newValue);
  };

  const filteredOptions = searchable ? 
    options.filter(option => 
      option.label?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      option.value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    ) : options;

  const getDisplayValue = () => {
    if (multiple) {
      if (selectedValue.length === 0) return placeholder;
      if (selectedValue.length === 1) {
        const option = options.find(opt => opt.value === selectedValue[0]);
        return option?.label || selectedValue[0];
      }
      return `${selectedValue.length} items selected`;
    } else {
      if (!selectedValue) return placeholder;
      const option = options.find(opt => opt.value === selectedValue);
      return option?.label || selectedValue;
    }
  };

  return (
    <div className={getContainerClasses()}>
      {label && (
        <label htmlFor={selectId} className="qto-select__label">
          {label}
          {required && <span className="qto-select__required">*</span>}
        </label>
      )}
      
      <div className="qto-select__wrapper">
        <div
          className={getSelectClasses()}
          onClick={handleToggle}
          onFocus={handleFocus}
          onBlur={handleBlur}
          tabIndex={disabled ? -1 : 0}
          role="combobox"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-labelledby={label ? `${selectId}-label` : undefined}
        >
          <span className="qto-select__value">
            {getDisplayValue()}
          </span>
          
          <div className="qto-select__actions">
            {clearable && selectedValue && (multiple ? selectedValue.length > 0 : selectedValue) && (
              <button
                type="button"
                className="qto-select__clear"
                onClick={handleClear}
                aria-label="Clear selection"
              >
                ×
              </button>
            )}
            <span className="qto-select__arrow">
              <svg viewBox="0 0 20 20" fill="currentColor" className="qto-select__arrow-icon">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </span>
          </div>
        </div>
        
        {isOpen && (
          <div className="qto-select__dropdown">
            {searchable && (
              <div className="qto-select__search">
                <input
                  type="text"
                  className="qto-select__search-input"
                  placeholder="Search options..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            )}
            
            <ul className="qto-select__options" role="listbox">
              {filteredOptions.length === 0 ? (
                <li className="qto-select__option qto-select__option--empty">
                  No options available
                </li>
              ) : (
                filteredOptions.map((option, index) => {
                  const isSelected = multiple 
                    ? selectedValue.includes(option.value)
                    : selectedValue === option.value;
                  
                  return (
                    <li
                      key={option.value || index}
                      className={`qto-select__option ${isSelected ? 'qto-select__option--selected' : ''}`}
                      onClick={() => handleOptionSelect(option.value)}
                      role="option"
                      aria-selected={isSelected}
                    >
                      {multiple && (
                        <span className={`qto-select__checkbox ${isSelected ? 'qto-select__checkbox--checked' : ''}`}>
                          {isSelected && '✓'}
                        </span>
                      )}
                      <span className="qto-select__option-text">
                        {option.label || option.value}
                      </span>
                    </li>
                  );
                })
              )}
            </ul>
          </div>
        )}
      </div>
      
      {error && (
        <span className="qto-select__error" role="alert">
          {error}
        </span>
      )}
      
      {helperText && !error && (
        <span className="qto-select__helper">
          {helperText}
        </span>
      )}
    </div>
  );
});

Select.displayName = 'Select';

Select.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]).isRequired,
      label: PropTypes.string,
      disabled: PropTypes.bool
    })
  ).isRequired,
  error: PropTypes.string,
  helperText: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  fullWidth: PropTypes.bool,
  rounded: PropTypes.bool,
  multiple: PropTypes.bool,
  searchable: PropTypes.bool,
  clearable: PropTypes.bool,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  variant: PropTypes.oneOf(['default', 'outline', 'filled']),
  className: PropTypes.string,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func
};

export default Select;
