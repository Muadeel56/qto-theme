import React, { useState, useRef, useEffect, forwardRef } from 'react';
import PropTypes from 'prop-types';
import { useResponsive } from '../hooks/useResponsive';
import Calendar from './CalendarEnhanced';
import '../styles/datepicker.css';

const DatePicker = forwardRef(({ 
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
  fullWidthOnMobile = true,
  rounded = false,
  placeholder,
  className = '',
  showCalendar = true,
  variant = 'default',
  responsive = true,
  autoFocus = false,
  clearable = false,
  // Mobile-specific props
  nativeOnMobile = true,
  mobileBreakpoint = 'md',
  // Quick actions
  quickActions = false,
  presets = [],
  // Accessibility
  ariaLabel,
  ariaDescribedBy,
  ...props 
}, ref) => {
  const { isMobile, isTablet, breakpoint, screenSize } = useResponsive();
  const [isFocused, setIsFocused] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [inputValue, setInputValue] = useState(value || '');
  const [showQuickActions, setShowQuickActions] = useState(false);
  const containerRef = useRef(null);
  const inputRef = useRef(null);
  
  const pickerId = props.id || `qto-datepicker-${Math.random().toString(36).substr(2, 9)}`;

  // Determine if we should use native input based on breakpoint
  const shouldUseNative = nativeOnMobile && (
    breakpoint === 'xs' || 
    breakpoint === 'sm' || 
    (mobileBreakpoint === 'md' && breakpoint === 'md')
  );

  // Auto full-width on mobile if enabled
  const isFullWidth = responsive && fullWidthOnMobile && isMobile ? true : fullWidth;

  useEffect(() => {
    setInputValue(value || '');
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsCalendarOpen(false);
        setShowQuickActions(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsCalendarOpen(false);
        setShowQuickActions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  // Auto-focus on mount if specified
  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  const getPickerClasses = () => {
    const baseClasses = 'qto-datepicker__field';
    const sizeClasses = `qto-datepicker__field--${size}`;
    const variantClasses = `qto-datepicker__field--${variant}`;
    const errorClasses = error ? 'qto-datepicker__field--error' : '';
    const disabledClasses = disabled ? 'qto-datepicker__field--disabled' : '';
    const focusedClasses = isFocused ? 'qto-datepicker__field--focused' : '';
    const roundedClasses = rounded ? 'qto-datepicker__field--rounded' : '';
    const fullWidthClasses = isFullWidth ? 'qto-datepicker__field--full-width' : '';
    const nativeClasses = shouldUseNative ? 'qto-datepicker__field--native' : '';
    const responsiveClasses = responsive ? 'qto-datepicker__field--responsive' : '';
    
    return [
      baseClasses,
      sizeClasses,
      variantClasses,
      errorClasses,
      disabledClasses,
      focusedClasses,
      roundedClasses,
      fullWidthClasses,
      nativeClasses,
      responsiveClasses,
      className
    ].filter(Boolean).join(' ');
  };

  const getContainerClasses = () => {
    const baseClasses = 'qto-datepicker';
    const fullWidthClasses = isFullWidth ? 'qto-datepicker--full-width' : '';
    const mobileClasses = isMobile ? 'qto-datepicker--mobile' : '';
    const tabletClasses = isTablet ? 'qto-datepicker--tablet' : '';
    const responsiveClasses = responsive ? 'qto-datepicker--responsive' : '';
    const variantClasses = `qto-datepicker--${variant}`;
    
    return [
      baseClasses,
      fullWidthClasses,
      mobileClasses,
      tabletClasses,
      responsiveClasses,
      variantClasses
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
    
    if (shouldUseNative) {
      inputRef.current?.showPicker?.();
    } else if (type === 'date' && showCalendar) {
      setIsCalendarOpen(!isCalendarOpen);
    } else {
      inputRef.current?.focus();
    }
  };

  const handleClear = (e) => {
    e.stopPropagation();
    setInputValue('');
    onChange?.('');
    setIsCalendarOpen(false);
  };

  const handleQuickAction = (action) => {
    const today = new Date();
    let newDate;

    switch (action) {
      case 'today':
        newDate = today.toISOString().split('T')[0];
        break;
      case 'tomorrow':
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        newDate = tomorrow.toISOString().split('T')[0];
        break;
      case 'yesterday':
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        newDate = yesterday.toISOString().split('T')[0];
        break;
      case 'nextWeek':
        const nextWeek = new Date(today);
        nextWeek.setDate(nextWeek.getDate() + 7);
        newDate = nextWeek.toISOString().split('T')[0];
        break;
      case 'nextMonth':
        const nextMonth = new Date(today);
        nextMonth.setMonth(nextMonth.getMonth() + 1);
        newDate = nextMonth.toISOString().split('T')[0];
        break;
      default:
        return;
    }

    setInputValue(newDate);
    onChange?.(newDate);
    setShowQuickActions(false);
  };

  const getInputType = () => {
    if (shouldUseNative || !showCalendar || type !== 'date') {
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
      'date': 'Select date',
      'time': 'Select time',
      'datetime-local': 'Select date & time',
      'datetime': 'Select date & time'
    };
    return placeholderMap[type] || 'Select date';
  };

  const formatDisplayValue = (val) => {
    if (!val) return '';
    
    if (type === 'date' && showCalendar && !shouldUseNative) {
      try {
        const date = new Date(val);
        if (isMobile) {
          // Shorter format for mobile
          return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
          });
        }
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

  const getCalendarPosition = () => {
    if (!containerRef.current) return {};
    
    const rect = containerRef.current.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;
    const spaceRight = window.innerWidth - rect.right;
    const spaceLeft = rect.left;
    
    // On mobile, always position at center with fullscreen overlay
    if (isMobile && screenSize.width < 640) {
      return {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 9999,
        width: '90vw',
        maxWidth: '320px',
        maxHeight: '80vh'
      };
    }
    
    // Smart positioning for larger screens
    let position = {};
    
    // Vertical positioning
    if (spaceBelow < 300 && spaceAbove > 300) {
      position.bottom = '100%';
      position.marginBottom = '4px';
    } else {
      position.top = '100%';
      position.marginTop = '4px';
    }
    
    // Horizontal positioning for better screen utilization
    if (spaceRight < 320 && spaceLeft > 320) {
      position.right = '0';
      position.left = 'auto';
    } else {
      position.left = '0';
      position.right = 'auto';
    }
    
    // Ensure minimum width
    position.minWidth = '280px';
    position.maxWidth = '320px';
    position.width = 'max-content';
    
    return position;
  };

  const defaultQuickActions = [
    { label: 'Today', action: 'today' },
    { label: 'Tomorrow', action: 'tomorrow' },
    { label: 'Yesterday', action: 'yesterday' },
    { label: 'Next Week', action: 'nextWeek' },
    { label: 'Next Month', action: 'nextMonth' }
  ];

  const actionsList = presets.length > 0 ? presets : defaultQuickActions;

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
          value={shouldUseNative || type !== 'date' ? inputValue : formatDisplayValue(inputValue)}
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
          readOnly={showCalendar && type === 'date' && !shouldUseNative}
          aria-label={ariaLabel || label}
          aria-describedby={ariaDescribedBy}
          aria-expanded={isCalendarOpen}
          aria-haspopup={showCalendar && !shouldUseNative ? 'dialog' : undefined}
          {...props}
        />
        
        <div className="qto-datepicker__actions">
          {clearable && inputValue && (
            <button
              type="button"
              className="qto-datepicker__clear"
              onClick={handleClear}
              disabled={disabled}
              aria-label="Clear date"
              tabIndex={-1}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          )}
          
          {quickActions && !shouldUseNative && (
            <button
              type="button"
              className="qto-datepicker__quick-toggle"
              onClick={() => setShowQuickActions(!showQuickActions)}
              disabled={disabled}
              aria-label="Quick date selection"
              tabIndex={-1}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6,9 12,15 18,9"/>
              </svg>
            </button>
          )}
          
          <button
            type="button"
            className="qto-datepicker__icon"
            onClick={handleIconClick}
            disabled={disabled}
            aria-label={type === 'time' ? 'Select time' : 'Select date'}
            tabIndex={-1}
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
        </div>

        {/* Calendar Dropdown */}
        {isCalendarOpen && type === 'date' && showCalendar && !shouldUseNative && (
          <div 
            className="qto-datepicker__calendar" 
            style={getCalendarPosition()}
            role="dialog"
            aria-modal="true"
            aria-label="Calendar"
          >
            {isMobile && screenSize.width < 640 && (
              <div className="qto-datepicker__calendar-header">
                <h3>Select Date</h3>
                <button
                  type="button"
                  className="qto-datepicker__calendar-close"
                  onClick={() => setIsCalendarOpen(false)}
                  aria-label="Close calendar"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
            )}
            <Calendar
              value={inputValue}
              onChange={handleCalendarChange}
              minDate={min}
              maxDate={max}
            />
            {isMobile && screenSize.width < 640 && (
              <div className="qto-datepicker__calendar-footer">
                <button
                  type="button"
                  className="qto-datepicker__calendar-today"
                  onClick={() => handleQuickAction('today')}
                >
                  Today
                </button>
                <button
                  type="button"
                  className="qto-datepicker__calendar-cancel"
                  onClick={() => setIsCalendarOpen(false)}
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        )}

        {/* Quick Actions Dropdown */}
        {showQuickActions && !shouldUseNative && (
          <div className="qto-datepicker__quick-actions">
            {actionsList.map((item, index) => (
              <button
                key={index}
                type="button"
                className="qto-datepicker__quick-action"
                onClick={() => item.action ? handleQuickAction(item.action) : item.onClick?.()}
              >
                {item.label}
              </button>
            ))}
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

DatePicker.displayName = 'DatePicker';

DatePicker.propTypes = {
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
  fullWidthOnMobile: PropTypes.bool,
  rounded: PropTypes.bool,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  variant: PropTypes.oneOf(['default', 'outline', 'filled']),
  placeholder: PropTypes.string,
  className: PropTypes.string,
  showCalendar: PropTypes.bool,
  responsive: PropTypes.bool,
  autoFocus: PropTypes.bool,
  clearable: PropTypes.bool,
  nativeOnMobile: PropTypes.bool,
  mobileBreakpoint: PropTypes.oneOf(['sm', 'md', 'lg']),
  quickActions: PropTypes.bool,
  presets: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      action: PropTypes.string,
      onClick: PropTypes.func
    })
  ),
  ariaLabel: PropTypes.string,
  ariaDescribedBy: PropTypes.string,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func
};

export default DatePicker;
