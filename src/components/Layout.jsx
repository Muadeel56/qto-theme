import React from 'react';
import PropTypes from 'prop-types';
import { useResponsive } from '../hooks/useResponsive';
import '../styles/layout.css';

/**
 * Responsive Container Component
 */
export const Container = ({ 
  children, 
  size = 'default', 
  className = '',
  fluid = false,
  padding = true,
  ...props 
}) => {
  const { isMobile, isTablet } = useResponsive();
  
  const getContainerClasses = () => {
    const baseClasses = 'qto-container';
    const sizeClasses = fluid ? 'qto-container--fluid' : `qto-container--${size}`;
    const paddingClass = padding ? 'qto-container--padded' : '';
    const responsiveClass = isMobile ? 'qto-container--mobile' : 
                           isTablet ? 'qto-container--tablet' : 'qto-container--desktop';
    
    return [
      baseClasses,
      sizeClasses,
      paddingClass,
      responsiveClass,
      className
    ].filter(Boolean).join(' ');
  };

  return (
    <div className={getContainerClasses()} {...props}>
      {children}
    </div>
  );
};

/**
 * Responsive Grid Component
 */
export const Grid = ({ 
  children, 
  cols = { xs: 1, sm: 2, md: 3, lg: 4 }, 
  gap = 'md',
  className = '',
  ...props 
}) => {
  const { responsive } = useResponsive();
  const currentCols = responsive(cols);
  
  const getGridClasses = () => {
    const baseClasses = 'qto-grid';
    const colsClass = `qto-grid--cols-${currentCols}`;
    const gapClass = `qto-grid--gap-${gap}`;
    
    return [
      baseClasses,
      colsClass,
      gapClass,
      className
    ].filter(Boolean).join(' ');
  };

  return (
    <div className={getGridClasses()} {...props}>
      {children}
    </div>
  );
};

/**
 * Responsive Flex Component
 */
export const Flex = ({ 
  children, 
  direction = 'row', 
  justify = 'start', 
  align = 'start',
  wrap = 'nowrap',
  gap = 'md',
  className = '',
  responsive = false,
  ...props 
}) => {
  const { isMobile } = useResponsive();
  
  // Auto-switch to column on mobile if responsive is enabled
  const actualDirection = responsive && isMobile ? 'column' : direction;
  
  const getFlexClasses = () => {
    const baseClasses = 'qto-flex';
    const directionClass = `qto-flex--${actualDirection}`;
    const justifyClass = `qto-flex--justify-${justify}`;
    const alignClass = `qto-flex--align-${align}`;
    const wrapClass = `qto-flex--wrap-${wrap}`;
    const gapClass = `qto-flex--gap-${gap}`;
    
    return [
      baseClasses,
      directionClass,
      justifyClass,
      alignClass,
      wrapClass,
      gapClass,
      className
    ].filter(Boolean).join(' ');
  };

  return (
    <div className={getFlexClasses()} {...props}>
      {children}
    </div>
  );
};

/**
 * Responsive Stack Component (Vertical Flex)
 */
export const Stack = ({ 
  children, 
  spacing = 'md', 
  align = 'stretch',
  className = '',
  ...props 
}) => {
  return (
    <Flex
      direction="column"
      align={align}
      gap={spacing}
      className={`qto-stack ${className}`}
      {...props}
    >
      {children}
    </Flex>
  );
};

/**
 * Page Container with responsive layout
 */
export const PageContainer = ({ 
  children, 
  title,
  subtitle,
  actions,
  breadcrumbs,
  className = '',
  ...props 
}) => {
  const { isMobile } = useResponsive();

  return (
    <Container className={`qto-page-container ${className}`} {...props}>
      {(title || breadcrumbs || actions) && (
        <div className="qto-page-header">
          {breadcrumbs && (
            <div className="qto-page-breadcrumbs">
              {breadcrumbs}
            </div>
          )}
          <div className={`qto-page-title-section ${isMobile ? 'qto-page-title-section--mobile' : ''}`}>
            <div className="qto-page-title-content">
              {title && <h1 className="qto-page-title">{title}</h1>}
              {subtitle && <p className="qto-page-subtitle">{subtitle}</p>}
            </div>
            {actions && (
              <div className="qto-page-actions">
                {actions}
              </div>
            )}
          </div>
        </div>
      )}
      <div className="qto-page-content">
        {children}
      </div>
    </Container>
  );
};

/**
 * Responsive Card Grid
 */
export const CardGrid = ({ 
  children, 
  minCardWidth = '280px',
  gap = 'lg',
  className = '',
  ...props 
}) => {
  const getCardGridClasses = () => {
    const baseClasses = 'qto-card-grid';
    const gapClass = `qto-card-grid--gap-${gap}`;
    
    return [
      baseClasses,
      gapClass,
      className
    ].filter(Boolean).join(' ');
  };

  return (
    <div 
      className={getCardGridClasses()} 
      style={{ '--min-card-width': minCardWidth }}
      {...props}
    >
      {children}
    </div>
  );
};

// PropTypes
Container.propTypes = {
  children: PropTypes.node.isRequired,
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl', 'default']),
  className: PropTypes.string,
  fluid: PropTypes.bool,
  padding: PropTypes.bool,
};

Grid.propTypes = {
  children: PropTypes.node.isRequired,
  cols: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.object,
  ]),
  gap: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  className: PropTypes.string,
};

Flex.propTypes = {
  children: PropTypes.node.isRequired,
  direction: PropTypes.oneOf(['row', 'column', 'row-reverse', 'column-reverse']),
  justify: PropTypes.oneOf(['start', 'end', 'center', 'between', 'around', 'evenly']),
  align: PropTypes.oneOf(['start', 'end', 'center', 'baseline', 'stretch']),
  wrap: PropTypes.oneOf(['nowrap', 'wrap', 'wrap-reverse']),
  gap: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  className: PropTypes.string,
  responsive: PropTypes.bool,
};

Stack.propTypes = {
  children: PropTypes.node.isRequired,
  spacing: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  align: PropTypes.oneOf(['start', 'end', 'center', 'baseline', 'stretch']),
  className: PropTypes.string,
};

PageContainer.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.node,
  subtitle: PropTypes.node,
  actions: PropTypes.node,
  breadcrumbs: PropTypes.node,
  className: PropTypes.string,
};

CardGrid.propTypes = {
  children: PropTypes.node.isRequired,
  minCardWidth: PropTypes.string,
  gap: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  className: PropTypes.string,
};
