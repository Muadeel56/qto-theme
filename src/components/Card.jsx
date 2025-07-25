import React from 'react';
import PropTypes from 'prop-types';
import '../styles/card.css';

const Card = ({ 
  variant = 'default',
  shadow = 'md',
  padding = 'md',
  rounded = 'md',
  hover = false,
  clickable = false,
  loading = false,
  fullWidth = false,
  children,
  className = '',
  onClick,
  ...props 
}) => {
  const getCardClasses = () => {
    const baseClasses = 'qto-card';
    const variantClasses = `qto-card--${variant}`;
    const shadowClasses = `qto-card--shadow-${shadow}`;
    const paddingClasses = `qto-card--padding-${padding}`;
    const roundedClasses = `qto-card--rounded-${rounded}`;
    const hoverClasses = hover ? 'qto-card--hover' : '';
    const clickableClasses = clickable || onClick ? 'qto-card--clickable' : '';
    const loadingClasses = loading ? 'qto-card--loading' : '';
    const fullWidthClasses = fullWidth ? 'qto-card--full-width' : '';
    
    return [
      baseClasses,
      variantClasses,
      shadowClasses,
      paddingClasses,
      roundedClasses,
      hoverClasses,
      clickableClasses,
      loadingClasses,
      fullWidthClasses,
      className
    ].filter(Boolean).join(' ');
  };

  const CardComponent = onClick ? 'button' : 'div';

  return (
    <CardComponent 
      className={getCardClasses()} 
      onClick={onClick}
      disabled={loading}
      {...props}
    >
      {loading && (
        <div className="qto-card__loading">
          <div className="qto-card__spinner"></div>
        </div>
      )}
      <div className={`qto-card__content ${loading ? 'qto-card__content--loading' : ''}`}>
        {children}
      </div>
    </CardComponent>
  );
};

const CardHeader = ({ 
  title,
  subtitle,
  action,
  avatar,
  children, 
  className = '', 
  ...props 
}) => {
  return (
    <div className={`qto-card__header ${className}`} {...props}>
      {avatar && (
        <div className="qto-card__avatar">
          {avatar}
        </div>
      )}
      <div className="qto-card__header-content">
        {title && (
          <h3 className="qto-card__title">
            {title}
          </h3>
        )}
        {subtitle && (
          <p className="qto-card__subtitle">
            {subtitle}
          </p>
        )}
        {children}
      </div>
      {action && (
        <div className="qto-card__action">
          {action}
        </div>
      )}
    </div>
  );
};

const CardBody = ({ children, className = '', ...props }) => {
  return (
    <div className={`qto-card__body ${className}`} {...props}>
      {children}
    </div>
  );
};

const CardFooter = ({ 
  children, 
  actions,
  align = 'right',
  className = '', 
  ...props 
}) => {
  return (
    <div className={`qto-card__footer qto-card__footer--${align} ${className}`} {...props}>
      {children}
      {actions && (
        <div className="qto-card__actions">
          {actions}
        </div>
      )}
    </div>
  );
};

const CardImage = ({ 
  src, 
  alt, 
  height = '200px',
  objectFit = 'cover',
  className = '', 
  ...props 
}) => {
  return (
    <div className={`qto-card__image ${className}`} style={{ height }} {...props}>
      <img 
        src={src} 
        alt={alt} 
        style={{ 
          width: '100%', 
          height: '100%', 
          objectFit,
          display: 'block'
        }} 
      />
    </div>
  );
};

Card.propTypes = {
  variant: PropTypes.oneOf([
    'default', 
    'outlined', 
    'elevated', 
    'filled', 
    'gradient',
    'primary',
    'secondary',
    'success',
    'danger',
    'warning',
    'info'
  ]),
  shadow: PropTypes.oneOf(['none', 'sm', 'md', 'lg', 'xl', '2xl']),
  padding: PropTypes.oneOf(['none', 'xs', 'sm', 'md', 'lg', 'xl']),
  rounded: PropTypes.oneOf(['none', 'sm', 'md', 'lg', 'xl', '2xl', 'full']),
  hover: PropTypes.bool,
  clickable: PropTypes.bool,
  loading: PropTypes.bool,
  fullWidth: PropTypes.bool,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func
};

CardHeader.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  action: PropTypes.node,
  avatar: PropTypes.node,
  children: PropTypes.node,
  className: PropTypes.string
};

CardBody.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};

CardFooter.propTypes = {
  children: PropTypes.node,
  actions: PropTypes.node,
  align: PropTypes.oneOf(['left', 'center', 'right']),
  className: PropTypes.string
};

CardImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  height: PropTypes.string,
  objectFit: PropTypes.oneOf(['cover', 'contain', 'fill', 'none', 'scale-down']),
  className: PropTypes.string
};

Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;
Card.Image = CardImage;

export default Card;
export { CardHeader, CardBody, CardFooter, CardImage };
