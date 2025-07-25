import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useResponsive } from '../hooks/useResponsive';
import DatePicker from './DatePicker';
import '../styles/datepicker.css';

const DateRangePicker = ({ 
  startDate,
  endDate,
  onChange,
  onStartDateChange,
  onEndDateChange,
  minDate,
  maxDate,
  label = 'Date Range',
  startLabel = 'Start Date',
  endLabel = 'End Date',
  error,
  helperText,
  required = false,
  disabled = false,
  size = 'md',
  variant = 'default',
  fullWidth = false,
  fullWidthOnMobile = true,
  responsive = true,
  stackOnMobile = true,
  mobileBreakpoint = 'md',
  showClearButton = true,
  allowSameDate = true,
  separatorText = 'to',
  className = '',
  // Preset ranges
  showPresets = false,
  presetRanges = [],
  // Advanced features
  autoSelectEndDate = true,
  highlightRange = true,
  // Accessibility
  ariaLabel,
  ariaDescribedBy,
  ...props 
}) => {
  const { isMobile, isTablet, breakpoint } = useResponsive();
  const [focusedInput, setFocusedInput] = useState(null); // 'start' | 'end' | null
  const [tempStartDate, setTempStartDate] = useState(startDate);
  const [tempEndDate, setTempEndDate] = useState(endDate);
  const [showPresetDropdown, setShowPresetDropdown] = useState(false);
  const containerRef = useRef(null);

  // Determine if we should stack inputs on mobile
  const shouldStack = responsive && stackOnMobile && (
    breakpoint === 'xs' || 
    breakpoint === 'sm' || 
    (mobileBreakpoint === 'md' && breakpoint === 'md')
  );

  // Auto full-width on mobile if enabled
  const isFullWidth = responsive && fullWidthOnMobile && isMobile ? true : fullWidth;

  useEffect(() => {
    setTempStartDate(startDate);
    setTempEndDate(endDate);
  }, [startDate, endDate]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setShowPresetDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getContainerClasses = () => {
    const baseClasses = 'qto-daterange';
    const fullWidthClasses = isFullWidth ? 'qto-daterange--full-width' : '';
    const stackedClasses = shouldStack ? 'qto-daterange--stacked' : '';
    const mobileClasses = isMobile ? 'qto-daterange--mobile' : '';
    const tabletClasses = isTablet ? 'qto-daterange--tablet' : '';
    const responsiveClasses = responsive ? 'qto-daterange--responsive' : '';
    const variantClasses = `qto-daterange--${variant}`;
    const errorClasses = error ? 'qto-daterange--error' : '';
    
    return [
      baseClasses,
      fullWidthClasses,
      stackedClasses,
      mobileClasses,
      tabletClasses,
      responsiveClasses,
      variantClasses,
      errorClasses,
      className
    ].filter(Boolean).join(' ');
  };

  const handleStartDateChange = (newStartDate) => {
    setTempStartDate(newStartDate);
    
    // If we have an end date and new start date is after it, clear end date
    if (tempEndDate && newStartDate && new Date(newStartDate) > new Date(tempEndDate)) {
      setTempEndDate('');
      onEndDateChange?.('');
    }
    
    onStartDateChange?.(newStartDate);
    onChange?.(newStartDate, tempEndDate);
    
    // Auto-focus end date input if start date is selected and autoSelectEndDate is true
    if (newStartDate && autoSelectEndDate && !tempEndDate) {
      setTimeout(() => setFocusedInput('end'), 100);
    }
  };

  const handleEndDateChange = (newEndDate) => {
    setTempEndDate(newEndDate);
    onEndDateChange?.(newEndDate);
    onChange?.(tempStartDate, newEndDate);
  };

  const handleClearRange = () => {
    setTempStartDate('');
    setTempEndDate('');
    onStartDateChange?.('');
    onEndDateChange?.('');
    onChange?.('', '');
  };

  const handlePresetSelect = (preset) => {
    const today = new Date();
    let start, end;

    switch (preset.value) {
      case 'today':
        start = end = today.toISOString().split('T')[0];
        break;
      case 'yesterday':
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        start = end = yesterday.toISOString().split('T')[0];
        break;
      case 'thisWeek':
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - today.getDay());
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);
        start = startOfWeek.toISOString().split('T')[0];
        end = endOfWeek.toISOString().split('T')[0];
        break;
      case 'lastWeek':
        const lastWeekStart = new Date(today);
        lastWeekStart.setDate(today.getDate() - today.getDay() - 7);
        const lastWeekEnd = new Date(lastWeekStart);
        lastWeekEnd.setDate(lastWeekStart.getDate() + 6);
        start = lastWeekStart.toISOString().split('T')[0];
        end = lastWeekEnd.toISOString().split('T')[0];
        break;
      case 'thisMonth':
        start = new Date(today.getFullYear(), today.getMonth(), 1).toISOString().split('T')[0];
        end = new Date(today.getFullYear(), today.getMonth() + 1, 0).toISOString().split('T')[0];
        break;
      case 'lastMonth':
        start = new Date(today.getFullYear(), today.getMonth() - 1, 1).toISOString().split('T')[0];
        end = new Date(today.getFullYear(), today.getMonth(), 0).toISOString().split('T')[0];
        break;
      case 'last7days':
        start = new Date(today.getTime() - 6 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
        end = today.toISOString().split('T')[0];
        break;
      case 'last30days':
        start = new Date(today.getTime() - 29 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
        end = today.toISOString().split('T')[0];
        break;
      default:
        if (preset.startDate && preset.endDate) {
          start = preset.startDate;
          end = preset.endDate;
        } else if (preset.onClick) {
          preset.onClick();
          return;
        }
    }

    if (start && end) {
      setTempStartDate(start);
      setTempEndDate(end);
      onStartDateChange?.(start);
      onEndDateChange?.(end);
      onChange?.(start, end);
    }
    
    setShowPresetDropdown(false);
  };

  const defaultPresets = [
    { label: 'Today', value: 'today' },
    { label: 'Yesterday', value: 'yesterday' },
    { label: 'This Week', value: 'thisWeek' },
    { label: 'Last Week', value: 'lastWeek' },
    { label: 'This Month', value: 'thisMonth' },
    { label: 'Last Month', value: 'lastMonth' },
    { label: 'Last 7 Days', value: 'last7days' },
    { label: 'Last 30 Days', value: 'last30days' }
  ];

  const presetsList = presetRanges.length > 0 ? presetRanges : defaultPresets;

  const getValidationError = () => {
    if (error) return error;
    
    if (tempStartDate && tempEndDate) {
      const start = new Date(tempStartDate);
      const end = new Date(tempEndDate);
      
      if (start > end) {
        return 'Start date cannot be after end date';
      }
      
      if (!allowSameDate && start.getTime() === end.getTime()) {
        return 'Start and end dates cannot be the same';
      }
    }
    
    return null;
  };

  const validationError = getValidationError();

  return (
    <div className={getContainerClasses()} ref={containerRef}>
      {label && (
        <div className="qto-daterange__label">
          {label}
          {required && <span className="qto-daterange__required">*</span>}
        </div>
      )}
      
      <div className="qto-daterange__wrapper">
        <div className="qto-daterange__inputs">
          <div className="qto-daterange__input-group">
            <DatePicker
              label={shouldStack ? startLabel : ''}
              placeholder={shouldStack ? startLabel : 'Start date'}
              value={tempStartDate}
              onChange={handleStartDateChange}
              onFocus={() => setFocusedInput('start')}
              onBlur={() => setFocusedInput(null)}
              min={minDate}
              max={tempEndDate || maxDate}
              disabled={disabled}
              required={required}
              size={size}
              variant={variant}
              fullWidth={isFullWidth}
              responsive={responsive}
              error={focusedInput === 'start' ? validationError : ''}
              aria-label={ariaLabel ? `${ariaLabel} start date` : `${startLabel}`}
              className="qto-daterange__start-input"
              {...props}
            />
          </div>
          
          {!shouldStack && (
            <div className="qto-daterange__separator">
              <span className="qto-daterange__separator-text">
                {separatorText}
              </span>
              {highlightRange && tempStartDate && tempEndDate && (
                <div className="qto-daterange__range-indicator" />
              )}
            </div>
          )}
          
          <div className="qto-daterange__input-group">
            <DatePicker
              label={shouldStack ? endLabel : ''}
              placeholder={shouldStack ? endLabel : 'End date'}
              value={tempEndDate}
              onChange={handleEndDateChange}
              onFocus={() => setFocusedInput('end')}
              onBlur={() => setFocusedInput(null)}
              min={tempStartDate || minDate}
              max={maxDate}
              disabled={disabled}
              required={required}
              size={size}
              variant={variant}
              fullWidth={isFullWidth}
              responsive={responsive}
              error={focusedInput === 'end' ? validationError : ''}
              aria-label={ariaLabel ? `${ariaLabel} end date` : `${endLabel}`}
              className="qto-daterange__end-input"
              {...props}
            />
          </div>
        </div>
        
        <div className="qto-daterange__actions">
          {showClearButton && (tempStartDate || tempEndDate) && (
            <button
              type="button"
              className="qto-daterange__clear"
              onClick={handleClearRange}
              disabled={disabled}
              aria-label="Clear date range"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          )}
          
          {showPresets && (
            <button
              type="button"
              className="qto-daterange__preset-toggle"
              onClick={() => setShowPresetDropdown(!showPresetDropdown)}
              disabled={disabled}
              aria-label="Quick date range presets"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6,9 12,15 18,9"/>
              </svg>
            </button>
          )}
        </div>

        {/* Preset Dropdown */}
        {showPresetDropdown && showPresets && (
          <div className="qto-daterange__presets">
            {presetsList.map((preset, index) => (
              <button
                key={index}
                type="button"
                className="qto-daterange__preset"
                onClick={() => handlePresetSelect(preset)}
              >
                {preset.label}
              </button>
            ))}
          </div>
        )}
      </div>
      
      {/* Display selected range info on mobile */}
      {shouldStack && (tempStartDate || tempEndDate) && (
        <div className="qto-daterange__selection-info">
          <span className="qto-daterange__selection-text">
            {tempStartDate ? new Date(tempStartDate).toLocaleDateString() : 'Start'} 
            {' → '} 
            {tempEndDate ? new Date(tempEndDate).toLocaleDateString() : 'End'}
          </span>
        </div>
      )}
      
      {validationError && (
        <span className="qto-daterange__error" role="alert">
          {validationError}
        </span>
      )}
      
      {helperText && !validationError && (
        <span className="qto-daterange__helper">
          {helperText}
        </span>
      )}
    </div>
  );
};

DateRangePicker.propTypes = {
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  onChange: PropTypes.func,
  onStartDateChange: PropTypes.func,
  onEndDateChange: PropTypes.func,
  minDate: PropTypes.string,
  maxDate: PropTypes.string,
  label: PropTypes.string,
  startLabel: PropTypes.string,
  endLabel: PropTypes.string,
  error: PropTypes.string,
  helperText: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  variant: PropTypes.oneOf(['default', 'outline', 'filled']),
  fullWidth: PropTypes.bool,
  fullWidthOnMobile: PropTypes.bool,
  responsive: PropTypes.bool,
  stackOnMobile: PropTypes.bool,
  mobileBreakpoint: PropTypes.oneOf(['sm', 'md', 'lg']),
  showClearButton: PropTypes.bool,
  allowSameDate: PropTypes.bool,
  separatorText: PropTypes.string,
  className: PropTypes.string,
  showPresets: PropTypes.bool,
  presetRanges: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string,
      startDate: PropTypes.string,
      endDate: PropTypes.string,
      onClick: PropTypes.func
    })
  ),
  autoSelectEndDate: PropTypes.bool,
  highlightRange: PropTypes.bool,
  ariaLabel: PropTypes.string,
  ariaDescribedBy: PropTypes.string
};

export default DateRangePicker;
