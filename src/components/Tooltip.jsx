import React from 'react';
import PropTypes from 'prop-types';
import '../styles/tooltip.css';

const Tooltip = ({ 
  children, 
  content, 
  position = 'top',
  delay = 0,
  className = '',
  ...props 
}) => {
  const getTooltipClasses = () => {
    const baseClasses = 'tooltip';
    const positionClass = `tooltip-${position}`;
    
    return [
      baseClasses,
      positionClass,
      className
    ].filter(Boolean).join(' ');
  };

  return (
    <div 
      className={getTooltipClasses()}
      style={{ '--tooltip-delay': `${delay}ms` }}
      {...props}
    >
      {children}
      <div className="tooltip-content" role="tooltip">
        {content}
      </div>
    </div>
  );
};

Tooltip.propTypes = {
  children: PropTypes.node.isRequired,
  content: PropTypes.node.isRequired,
  position: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
  delay: PropTypes.number,
  className: PropTypes.string,
};

export default Tooltip;
