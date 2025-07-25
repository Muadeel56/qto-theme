import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';

const StyledTypography = styled('span')(({ theme, variant = 'body1', color = 'text.primary' }) => ({
  ...(variant === 'h1' && theme.typography.h1),
  ...(variant === 'h2' && theme.typography.h2),
  ...(variant === 'h3' && theme.typography.h3),
  ...(variant === 'h4' && theme.typography.h4),
  ...(variant === 'h5' && theme.typography.h5),
  ...(variant === 'h6' && theme.typography.h6),
  ...(variant === 'subtitle1' && theme.typography.subtitle1),
  ...(variant === 'subtitle2' && theme.typography.subtitle2),
  ...(variant === 'body1' && theme.typography.body1),
  ...(variant === 'body2' && theme.typography.body2),
  ...(variant === 'caption' && theme.typography.caption),
  ...(variant === 'button' && theme.typography.button),
  ...(variant === 'overline' && theme.typography.overline),
  color: theme.palette[color]?.main || color,
  display: 'inline-block',
}));

const Typography = ({ children, component = 'span', ...props }) => {
  return (
    <StyledTypography as={component} {...props}>
      {children}
    </StyledTypography>
  );
};

Typography.propTypes = {
  children: PropTypes.node,
  component: PropTypes.elementType,
  variant: PropTypes.oneOf([
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'subtitle1',
    'subtitle2',
    'body1',
    'body2',
    'caption',
    'button',
    'overline',
  ]),
  color: PropTypes.string,
};

export default Typography;
