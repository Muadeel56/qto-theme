import React, { useMemo } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import { useTheme } from './ThemeProvider';

// MUI Theme Provider that integrates with QTO theme system
const QTOMuiThemeProvider = ({ children }) => {
  const { theme: qtoTheme } = useTheme();
  
  const muiTheme = useMemo(() => {
    // Get CSS custom properties values
    const getCSSVar = (varName) => {
      if (typeof window !== 'undefined') {
        return getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
      }
      return '';
    };

    // Convert CSS custom properties to MUI theme values
    const isDark = qtoTheme === 'dark';
    
    return createTheme({
      palette: {
        mode: isDark ? 'dark' : 'light',
        primary: {
          main: getCSSVar('--color-primary') || '#2563eb',
          dark: getCSSVar('--color-primary-dark') || '#1d4ed8',
          light: getCSSVar('--color-primary-light') || '#3b82f6',
        },
        secondary: {
          main: getCSSVar('--color-secondary') || '#64748b',
          dark: getCSSVar('--color-secondary-dark') || '#475569',
          light: getCSSVar('--color-secondary-light') || '#94a3b8',
        },
        error: {
          main: getCSSVar('--color-danger') || '#ef4444',
          dark: getCSSVar('--color-danger-dark') || '#dc2626',
          light: getCSSVar('--color-danger-light') || '#f87171',
        },
        warning: {
          main: getCSSVar('--color-warning') || '#f59e0b',
          dark: getCSSVar('--color-warning-dark') || '#d97706',
          light: getCSSVar('--color-warning-light') || '#fbbf24',
        },
        info: {
          main: getCSSVar('--color-info') || '#06b6d4',
          dark: getCSSVar('--color-info-dark') || '#0891b2',
          light: getCSSVar('--color-info-light') || '#22d3ee',
        },
        success: {
          main: getCSSVar('--color-success') || '#10b981',
          dark: getCSSVar('--color-success-dark') || '#059669',
          light: getCSSVar('--color-success-light') || '#34d399',
        },
        background: {
          default: getCSSVar('--color-bg-primary') || (isDark ? '#0f172a' : '#ffffff'),
          paper: getCSSVar('--color-bg-secondary') || (isDark ? '#1e293b' : '#f8fafc'),
        },
        text: {
          primary: getCSSVar('--color-text') || (isDark ? '#f1f5f9' : '#0f172a'),
          secondary: getCSSVar('--color-text-secondary') || (isDark ? '#94a3b8' : '#64748b'),
        },
        divider: getCSSVar('--color-border') || (isDark ? '#334155' : '#e2e8f0'),
      },
      typography: {
        fontFamily: getCSSVar('--font-family') || 'Inter, system-ui, sans-serif',
        fontSize: 14,
        h1: { fontSize: getCSSVar('--text-4xl') || '2.25rem' },
        h2: { fontSize: getCSSVar('--text-3xl') || '1.875rem' },
        h3: { fontSize: getCSSVar('--text-2xl') || '1.5rem' },
        h4: { fontSize: getCSSVar('--text-xl') || '1.25rem' },
        h5: { fontSize: getCSSVar('--text-lg') || '1.125rem' },
        h6: { fontSize: getCSSVar('--text-md') || '1rem' },
        body1: { fontSize: getCSSVar('--text-sm') || '0.875rem' },
        body2: { fontSize: getCSSVar('--text-xs') || '0.75rem' },
      },
      shape: {
        borderRadius: parseInt(getCSSVar('--radius-md')?.replace('px', '')) || 8,
      },
      spacing: 8, // Base spacing unit
      components: {
        MuiDataGrid: {
          styleOverrides: {
            root: {
              border: `1px solid ${getCSSVar('--color-border')}`,
              borderRadius: getCSSVar('--radius-lg') || '12px',
              fontFamily: getCSSVar('--font-family') || 'Inter, system-ui, sans-serif',
              fontSize: getCSSVar('--text-sm') || '0.875rem',
              '& .MuiDataGrid-columnHeaders': {
                backgroundColor: getCSSVar('--color-bg-secondary'),
                borderBottom: `2px solid ${getCSSVar('--color-border')}`,
                fontSize: getCSSVar('--text-xs') || '0.75rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              },
              '& .MuiDataGrid-columnHeader': {
                '&:focus': {
                  outline: `2px solid ${getCSSVar('--color-primary')}`,
                  outlineOffset: '-2px',
                },
              },
              '& .MuiDataGrid-cell': {
                borderBottom: `1px solid ${getCSSVar('--color-border')}`,
                padding: getCSSVar('--spacing-md') || '12px',
                '&:focus': {
                  outline: `2px solid ${getCSSVar('--color-primary')}`,
                  outlineOffset: '-2px',
                },
              },
              '& .MuiDataGrid-row': {
                '&:hover': {
                  backgroundColor: getCSSVar('--color-bg-secondary'),
                },
                '&.Mui-selected': {
                  backgroundColor: `rgba(${getCSSVar('--color-primary-rgb') || '37, 99, 235'}, 0.1)`,
                  '&:hover': {
                    backgroundColor: `rgba(${getCSSVar('--color-primary-rgb') || '37, 99, 235'}, 0.15)`,
                  },
                },
              },
              '& .MuiDataGrid-footerContainer': {
                borderTop: `1px solid ${getCSSVar('--color-border')}`,
                backgroundColor: getCSSVar('--color-bg-secondary'),
              },
              '& .MuiDataGrid-toolbarContainer': {
                padding: getCSSVar('--spacing-lg') || '16px',
                borderBottom: `1px solid ${getCSSVar('--color-border')}`,
                backgroundColor: getCSSVar('--color-bg-secondary'),
              },
            },
            columnHeader: {
              '& .MuiDataGrid-sortIcon': {
                color: getCSSVar('--color-primary'),
              },
              '& .MuiDataGrid-menuIcon': {
                color: getCSSVar('--color-text-secondary'),
              },
            },
          },
        },
        MuiCheckbox: {
          styleOverrides: {
            root: {
              color: getCSSVar('--color-text-secondary'),
              '&.Mui-checked': {
                color: getCSSVar('--color-primary'),
              },
            },
          },
        },
        MuiButton: {
          styleOverrides: {
            root: {
              textTransform: 'none',
              borderRadius: getCSSVar('--radius-md') || '8px',
              fontSize: getCSSVar('--text-sm') || '0.875rem',
              fontWeight: 500,
            },
          },
        },
        MuiTextField: {
          styleOverrides: {
            root: {
              '& .MuiOutlinedInput-root': {
                borderRadius: getCSSVar('--radius-md') || '8px',
                '& fieldset': {
                  borderColor: getCSSVar('--color-border'),
                },
                '&:hover fieldset': {
                  borderColor: getCSSVar('--color-primary'),
                },
                '&.Mui-focused fieldset': {
                  borderColor: getCSSVar('--color-primary'),
                },
              },
            },
          },
        },
      },
    });
  }, [qtoTheme]);

  return (
    <MuiThemeProvider theme={muiTheme}>
      {children}
    </MuiThemeProvider>
  );
};

export default QTOMuiThemeProvider;
