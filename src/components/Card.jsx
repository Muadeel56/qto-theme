import React from 'react';
import PropTypes from 'prop-types';
import '../styles/card.css';

const Card = ({ 
  variant = 'default',
  shadow = 'md',
  padding = 'md',
  rounded = 'md',
  children,
  className = '',
  ...props 
}) => {
  const getCardClasses = () => {
    const baseClasses = 'card';
    const variantClasses = `card-${variant}`;
    const shadowClasses = `card-shadow-${shadow}`;
    const paddingClasses = `card-padding-${padding}`;
    const roundedClasses = `card-rounded-${rounded}`;
    
    return [
      baseClasses,
      variantClasses,
      shadowClasses,
      paddingClasses,
      roundedClasses,
      className
    ].filter(Boolean).join(' ');
  };

  return (
    <div className={getCardClasses()} {...props}>
      {children}
    </div>
  );
};

const CardHeader = ({ children, className = '', ...props }) => {
  return (
    <div className={`card-header ${className}`} {...props}>
      {children}
    </div>
  );
};

const CardBody = ({ children, className = '', ...props }) => {
  return (
    <div className={`card-body ${className}`} {...props}>
      {children}
    </div>
  );
};

const CardFooter = ({ children, className = '', ...props }) => {
  return (
    <div className={`card-footer ${className}`} {...props}>
      {children}
    </div>
  );
};

Card.propTypes = {
  variant: PropTypes.oneOf(['default', 'outlined', 'elevated', 'filled']),
  shadow: PropTypes.oneOf(['none', 'sm', 'md', 'lg', 'xl']),
  padding: PropTypes.oneOf(['none', 'sm', 'md', 'lg', 'xl']),
  rounded: PropTypes.oneOf(['none', 'sm', 'md', 'lg', 'xl', 'full']),
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

CardHeader.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

CardBody.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

CardFooter.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;

export default Card;
