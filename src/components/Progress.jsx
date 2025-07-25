import React from 'react';
import PropTypes from 'prop-types';
import '../styles/progress.css';

const Progress = ({ 
  value = 0,
  max = 100,
  variant = 'primary',
  size = 'md',
  rounded = 'full',
  showLabel = false,
  label,
  striped = false,
  animated = false,
  className = '',
  ...props 
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  
  const getProgressClasses = () => {
    const baseClasses = 'qto-progress';
    const variantClasses = `qto-progress--${variant}`;
    const sizeClasses = `qto-progress--${size}`;
    const roundedClasses = `qto-progress--rounded-${rounded}`;
    const stripedClasses = striped ? 'qto-progress--striped' : '';
    const animatedClasses = animated ? 'qto-progress--animated' : '';
    
    return [
      baseClasses,
      variantClasses,
      sizeClasses,
      roundedClasses,
      stripedClasses,
      animatedClasses,
      className
    ].filter(Boolean).join(' ');
  };

  const displayLabel = label || (showLabel ? `${Math.round(percentage)}%` : null);

  return (
    <div className="qto-progress-container">
      {displayLabel && (
        <div className="qto-progress__label">
          <span>{displayLabel}</span>
          {showLabel && !label && (
            <span className="qto-progress__percentage">{Math.round(percentage)}%</span>
          )}
        </div>
      )}
      <div
        className={getProgressClasses()}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={displayLabel || 'Progress'}
        {...props}
      >
        <div
          className="qto-progress__bar"
          style={{ width: `${percentage}%` }}
        >
          {striped && <div className="qto-progress__stripes" />}
        </div>
      </div>
    </div>
  );
};

const CircularProgress = ({
  value = 0,
  max = 100,
  size = 120,
  strokeWidth = 8,
  variant = 'primary',
  showLabel = false,
  label,
  className = '',
  ...props
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  
  const getCircularClasses = () => {
    const baseClasses = 'qto-progress-circular';
    const variantClasses = `qto-progress-circular--${variant}`;
    
    return [
      baseClasses,
      variantClasses,
      className
    ].filter(Boolean).join(' ');
  };

  const displayLabel = label || (showLabel ? `${Math.round(percentage)}%` : null);

  return (
    <div className={getCircularClasses()} style={{ width: size, height: size }} {...props}>
      <svg width={size} height={size} className="qto-progress-circular__svg">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          className="qto-progress-circular__background"
          strokeWidth={strokeWidth}
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          className="qto-progress-circular__bar"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      {displayLabel && (
        <div className="qto-progress-circular__label">
          {displayLabel}
        </div>
      )}
    </div>
  );
};

Progress.propTypes = {
  value: PropTypes.number,
  max: PropTypes.number,
  variant: PropTypes.oneOf(['primary', 'secondary', 'success', 'warning', 'error', 'info']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  rounded: PropTypes.oneOf(['none', 'sm', 'md', 'lg', 'full']),
  showLabel: PropTypes.bool,
  label: PropTypes.string,
  striped: PropTypes.bool,
  animated: PropTypes.bool,
  className: PropTypes.string
};

CircularProgress.propTypes = {
  value: PropTypes.number,
  max: PropTypes.number,
  size: PropTypes.number,
  strokeWidth: PropTypes.number,
  variant: PropTypes.oneOf(['primary', 'secondary', 'success', 'warning', 'error', 'info']),
  showLabel: PropTypes.bool,
  label: PropTypes.string,
  className: PropTypes.string
};

export default Progress;
export { CircularProgress };
