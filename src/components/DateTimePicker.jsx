import React, { useState, useRef, useEffect, forwardRef } from 'react';
import PropTypes from 'prop-types';
import Calendar from './CalendarEnhanced';
import '../styles/datepicker.css';

const DateTimePicker = forwardRef(({ 
  label,
  value,
  onChange,
  type = 'date', // 'date', 'time', 'datetime-local'
  min,
  max,
  step,
  error,
  helperText,
  required = false,
  disabled = false,
  size = 'md',
  fullWidth = false,
  rounded = false,
  placeholder,
  className = '',
  showCalendar = true,
  ...props 
}, ref) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [inputValue, setInputValue] = useState(value || '');
  const containerRef = useRef(null);
  const inputRef = useRef(null);
  
  const pickerId = props.id || `qto-datepicker-${Math.random().toString(36).substr(2, 9)}`;

  useEffect(() => {
    setInputValue(value || '');
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsCalendarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getPickerClasses = () => {
    const baseClasses = 'qto-datepicker__field';
    const sizeClasses = `qto-datepicker__field--${size}`;
    const errorClasses = error ? 'qto-datepicker__field--error' : '';
    const disabledClasses = disabled ? 'qto-datepicker__field--disabled' : '';
    const focusedClasses = isFocused ? 'qto-datepicker__field--focused' : '';
    const roundedClasses = rounded ? 'qto-datepicker__field--rounded' : '';
    const fullWidthClasses = fullWidth ? 'qto-datepicker__field--full-width' : '';
    
    return [
      baseClasses,
      sizeClasses,
      errorClasses,
      disabledClasses,
      focusedClasses,
      roundedClasses,
      fullWidthClasses,
      className
    ].filter(Boolean).join(' ');
  };

  const getContainerClasses = () => {
    const baseClasses = 'qto-datepicker';
    const fullWidthClasses = fullWidth ? 'qto-datepicker--full-width' : '';
    
    return [
      baseClasses,
      fullWidthClasses
    ].filter(Boolean).join(' ');
  };

  const handleFocus = (e) => {
    setIsFocused(true);
    props.onFocus?.(e);
  };

  const handleBlur = (e) => {
    setIsFocused(false);
    props.onBlur?.(e);
  };

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onChange?.(newValue, e);
  };

  const handleCalendarChange = (selectedDate) => {
    setInputValue(selectedDate);
    onChange?.(selectedDate);
    setIsCalendarOpen(false);
  };

  const handleIconClick = () => {
    if (disabled) return;
    if (type === 'date' && showCalendar) {
      setIsCalendarOpen(!isCalendarOpen);
    } else {
      inputRef.current?.focus();
    }
  };

  const getInputType = () => {
    if (!showCalendar || type !== 'date') {
      const typeMap = {
        'date': 'date',
        'time': 'time',
        'datetime-local': 'datetime-local',
        'datetime': 'datetime-local'
      };
      return typeMap[type] || 'date';
    }
    return 'text';
  };

  const getPlaceholder = () => {
    if (placeholder) return placeholder;
    
    const placeholderMap = {
      'date': 'YYYY-MM-DD',
      'time': 'HH:MM',
      'datetime-local': 'YYYY-MM-DD HH:MM',
      'datetime': 'YYYY-MM-DD HH:MM'
    };
    return placeholderMap[type] || 'Select date';
  };

  const formatDisplayValue = (val) => {
    if (!val) return '';
    
    if (type === 'date' && showCalendar) {
      try {
        const date = new Date(val);
        return date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        });
      } catch {
        return val;
      }
    }
    
    return val;
  };

  return (
    <div className={getContainerClasses()} ref={containerRef}>
      {label && (
        <label htmlFor={pickerId} className="qto-datepicker__label">
          {label}
          {required && <span className="qto-datepicker__required">*</span>}
        </label>
      )}
      
      <div className="qto-datepicker__wrapper">
        <input
          ref={inputRef}
          id={pickerId}
          type={getInputType()}
          value={showCalendar && type === 'date' ? formatDisplayValue(inputValue) : inputValue}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          required={required}
          placeholder={getPlaceholder()}
          className={getPickerClasses()}
          readOnly={showCalendar && type === 'date'}
          {...props}
        />
        
        <button
          type="button"
          className="qto-datepicker__icon"
          onClick={handleIconClick}
          disabled={disabled}
          aria-label="Open calendar"
        >
          {type === 'time' ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12,6 12,12 16,14"/>
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
              <line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8" y1="2" x2="8" y2="6"/>
              <line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
          )}
        </button>

        {isCalendarOpen && type === 'date' && showCalendar && (
          <div className="qto-datepicker__calendar">
            <Calendar
              value={inputValue}
              onChange={handleCalendarChange}
              minDate={min}
              maxDate={max}
            />
          </div>
        )}
      </div>
      
      {error && (
        <span className="qto-datepicker__error" role="alert">
          {error}
        </span>
      )}
      
      {helperText && !error && (
        <span className="qto-datepicker__helper">
          {helperText}
        </span>
      )}
    </div>
  );
});

// Quick date picker with preset options
const QuickDatePicker = ({ 
  value,
  onChange,
  presets = [
    { label: 'Today', value: () => new Date().toISOString().split('T')[0] },
    { label: 'Tomorrow', value: () => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      return tomorrow.toISOString().split('T')[0];
    }},
    { label: 'Next Week', value: () => {
      const nextWeek = new Date();
      nextWeek.setDate(nextWeek.getDate() + 7);
      return nextWeek.toISOString().split('T')[0];
    }},
    { label: 'Next Month', value: () => {
      const nextMonth = new Date();
      nextMonth.setMonth(nextMonth.getMonth() + 1);
      return nextMonth.toISOString().split('T')[0];
    }}
  ],
  ...props 
}) => {
  const [showPresets, setShowPresets] = useState(false);

  const handlePresetSelect = (preset) => {
    const newValue = typeof preset.value === 'function' ? preset.value() : preset.value;
    onChange?.(newValue);
    setShowPresets(false);
  };

  return (
    <div className="qto-datepicker-quick">
      <DateTimePicker 
        value={value}
        onChange={onChange}
        {...props}
      />
      
      <div className="qto-datepicker-quick__presets">
        <button
          type="button"
          className="qto-datepicker-quick__toggle"
          onClick={() => setShowPresets(!showPresets)}
          aria-label="Show quick date presets"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="6,9 12,15 18,9"/>
          </svg>
        </button>
        
        {showPresets && (
          <div className="qto-datepicker-quick__dropdown">
            {presets.map((preset, index) => (
              <button
                key={index}
                type="button"
                className="qto-datepicker-quick__preset"
                onClick={() => handlePresetSelect(preset)}
              >
                {preset.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Date range picker
const DateRangePicker = ({ 
  startDate,
  endDate,
  onChange,
  minDate,
  maxDate,
  label = 'Date Range',
  ...props 
}) => {
  const handleStartDateChange = (newStartDate) => {
    onChange?.(newStartDate, endDate);
  };

  const handleEndDateChange = (newEndDate) => {
    onChange?.(startDate, newEndDate);
  };

  return (
    <div className="qto-datepicker-range">
      {label && (
        <div className="qto-datepicker-range__label">
          {label}
        </div>
      )}
      
      <div className="qto-datepicker-range__inputs">
        <DateTimePicker
          label="Start Date"
          value={startDate}
          onChange={handleStartDateChange}
          max={endDate || maxDate}
          min={minDate}
          {...props}
        />
        
        <span className="qto-datepicker-range__separator">to</span>
        
        <DateTimePicker
          label="End Date"
          value={endDate}
          onChange={handleEndDateChange}
          min={startDate || minDate}
          max={maxDate}
          {...props}
        />
      </div>
    </div>
  );
};

DateTimePicker.displayName = 'DateTimePicker';

DateTimePicker.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  type: PropTypes.oneOf(['date', 'time', 'datetime-local', 'datetime']),
  min: PropTypes.string,
  max: PropTypes.string,
  step: PropTypes.string,
  error: PropTypes.string,
  helperText: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  fullWidth: PropTypes.bool,
  rounded: PropTypes.bool,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  placeholder: PropTypes.string,
  className: PropTypes.string,
  showCalendar: PropTypes.bool,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func
};

QuickDatePicker.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  presets: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired
    })
  )
};

DateRangePicker.propTypes = {
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  onChange: PropTypes.func,
  minDate: PropTypes.string,
  maxDate: PropTypes.string,
  label: PropTypes.string
};

export default DateTimePicker;
export { QuickDatePicker, DateRangePicker };
