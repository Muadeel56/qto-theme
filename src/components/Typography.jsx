import React from 'react';
import PropTypes from 'prop-types';

const Typography = ({
  as: Component = 'p',
  variant = 'body1',
  weight = 'normal',
  align = 'left',
  color = 'default',
  gutterBottom = false,
  className = '',
  children,
  ...props
}) => {
  const baseClass = 'qto-typography';
  const classes = [
    baseClass,
    `${baseClass}--${variant}`,
    `${baseClass}--weight-${weight}`,
    `${baseClass}--align-${align}`,
    `${baseClass}--color-${color}`,
    gutterBottom && `${baseClass}--gutter-bottom`,
    className
  ].filter(Boolean).join(' ');

  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  );
};

Typography.propTypes = {
  as: PropTypes.elementType,
  variant: PropTypes.oneOf([
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
    'subtitle1', 'subtitle2',
    'body1', 'body2',
    'caption', 'overline',
    'display1', 'display2'
  ]),
  weight: PropTypes.oneOf([
    'thin', 'extralight', 'light', 'normal', 'medium', 'semibold', 'bold', 'extrabold', 'black'
  ]),
  align: PropTypes.oneOf(['left', 'center', 'right', 'justify']),
  color: PropTypes.oneOf([
    'default', 'primary', 'secondary', 'muted', 'light', 'inverse', 'success', 'warning', 'error', 'info'
  ]),
  gutterBottom: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node.isRequired
};

export default Typography;
