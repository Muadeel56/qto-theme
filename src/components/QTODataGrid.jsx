import React, { useState, useCallback, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { DataGrid } from '@mui/x-data-grid';
import {
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarQuickFilter,
} from '@mui/x-data-grid';
import { Button, IconButton, Tooltip, Box, Typography } from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  MoreVert as MoreIcon,
  Download as DownloadIcon,
  FileUpload as ImportIcon,
  Add as AddIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material';
import QTOMuiThemeProvider from './MuiThemeProvider';
import { useTheme } from './ThemeProvider';
import '../styles/mui-datagrid.css';

// Custom Toolbar Component
const CustomToolbar = ({
  showQuickFilter = true,
  showExport = true,
  showColumns = true,
  showFilter = true,
  showDensity = true,
  customActions = [],
  title,
  subtitle,
}) => {
  return (
    <GridToolbarContainer className="qto-datagrid__toolbar">
      <Box className="qto-datagrid__toolbar-left">
        {title && (
          <Box className="qto-datagrid__title-section">
            <Typography variant="h6" className="qto-datagrid__title">
              {title}
            </Typography>
            {subtitle && (
              <Typography variant="body2" className="qto-datagrid__subtitle">
                {subtitle}
              </Typography>
            )}
          </Box>
        )}
        
        <Box className="qto-datagrid__toolbar-controls">
          {showColumns && <GridToolbarColumnsButton />}
          {showFilter && <GridToolbarFilterButton />}
          {showDensity && <GridToolbarDensitySelector />}
          {showExport && <GridToolbarExport />}
        </Box>
      </Box>

      <Box className="qto-datagrid__toolbar-right">
        {showQuickFilter && <GridToolbarQuickFilter />}
        
        {customActions.map((action, index) => (
          <Tooltip key={index} title={action.tooltip || action.label}>
            <Button
              variant={action.variant || 'outlined'}
              size="small"
              onClick={action.onClick}
              startIcon={action.icon}
              disabled={action.disabled}
              className={`qto-datagrid__action-btn ${action.className || ''}`}
            >
              {action.label}
            </Button>
          </Tooltip>
        ))}
      </Box>
    </GridToolbarContainer>
  );
};

// Action Cell Renderer
const ActionCell = ({ row, actions = [], onAction }) => {
  const handleAction = (action) => {
    if (onAction) {
      onAction(action, row);
    }
  };

  return (
    <Box className="qto-datagrid__action-cell">
      {actions.map((action, index) => (
        <Tooltip key={index} title={action.tooltip || action.label}>
          <IconButton
            size="small"
            onClick={() => handleAction(action)}
            disabled={action.disabled && action.disabled(row)}
            className={`qto-datagrid__action-icon ${action.className || ''}`}
            color={action.color || 'default'}
          >
            {action.icon}
          </IconButton>
        </Tooltip>
      ))}
    </Box>
  );
};

// Status Cell Renderer
const StatusCell = ({ value, statusConfig = {} }) => {
  const config = statusConfig[value] || { color: 'default', label: value };
  
  return (
    <Box
      className={`qto-datagrid__status-cell qto-datagrid__status-cell--${config.color}`}
    >
      <Box className="qto-datagrid__status-indicator" />
      <Typography variant="body2">{config.label}</Typography>
    </Box>
  );
};

// Main DataGrid Component
const QTODataGrid = ({
  data = [],
  columns = [],
  loading = false,
  error = null,
  
  // Pagination
  pagination = true,
  pageSize = 25,
  pageSizeOptions = [10, 25, 50, 100],
  
  // Selection
  checkboxSelection = false,
  onSelectionChange,
  
  // Sorting
  sortModel,
  onSortModelChange,
  
  // Filtering
  filterModel,
  onFilterModelChange,
  
  // Actions
  rowActions = [],
  onRowAction,
  
  // Toolbar
  toolbar = true,
  toolbarProps = {},
  
  // Customization
  title,
  subtitle,
  height = 600,
  autoHeight = false,
  density = 'standard', // 'compact' | 'standard' | 'comfortable'
  
  // Events
  onRowClick,
  onRowDoubleClick,
  onCellClick,
  
  // Server-side features
  serverSide = false,
  rowCount,
  onPageChange,
  onPageSizeChange,
  
  // Export
  csvExport = true,
  printExport = true,
  
  // Custom
  customToolbarActions = [],
  statusConfig = {},
  
  ...other
}) => {
  const { actualTheme } = useTheme();
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: pageSize,
  });
  const [themeKey, setThemeKey] = useState(0);

  // Force re-render when theme changes to ensure proper MUI theme updates
  useEffect(() => {
    setThemeKey(prev => prev + 1);
  }, [actualTheme]);

  // Enhance columns with action column if rowActions provided
  const enhancedColumns = useMemo(() => {
    let cols = [...columns];
    
    // Add status cell renderer to status columns
    cols = cols.map(col => {
      if (col.type === 'status' || col.field === 'status') {
        return {
          ...col,
          renderCell: (params) => (
            <StatusCell value={params.value} statusConfig={statusConfig} />
          ),
        };
      }
      return col;
    });
    
    // Add actions column if rowActions provided
    if (rowActions.length > 0) {
      cols.push({
        field: 'actions',
        headerName: 'Actions',
        type: 'actions',
        width: rowActions.length * 50 + 20,
        sortable: false,
        filterable: false,
        renderCell: (params) => (
          <ActionCell
            row={params.row}
            actions={rowActions}
            onAction={onRowAction}
          />
        ),
      });
    }
    
    return cols;
  }, [columns, rowActions, onRowAction, statusConfig]);

  // Handle pagination changes
  const handlePaginationModelChange = useCallback((newModel) => {
    setPaginationModel(newModel);
    
    if (serverSide) {
      if (onPageChange) onPageChange(newModel.page);
      if (onPageSizeChange) onPageSizeChange(newModel.pageSize);
    }
  }, [serverSide, onPageChange, onPageSizeChange]);

  // Default toolbar actions
  const defaultToolbarActions = [
    {
      label: 'Add New',
      icon: <AddIcon />,
      onClick: () => console.log('Add new item'),
      variant: 'contained',
      color: 'primary',
      tooltip: 'Add new item',
    },
    {
      label: 'Import',
      icon: <ImportIcon />,
      onClick: () => console.log('Import data'),
      variant: 'outlined',
      tooltip: 'Import data from file',
    },
    {
      label: 'Refresh',
      icon: <RefreshIcon />,
      onClick: () => console.log('Refresh data'),
      variant: 'outlined',
      tooltip: 'Refresh data',
    },
  ];

  const toolbarActions = customToolbarActions.length > 0 
    ? customToolbarActions 
    : defaultToolbarActions;

  // Error state
  if (error) {
    return (
      <Box className="qto-datagrid__error">
        <Typography color="error" variant="h6">
          Error loading data
        </Typography>
        <Typography color="textSecondary" variant="body2">
          {error.message || 'An unexpected error occurred'}
        </Typography>
      </Box>
    );
  }

  return (
    <Box className="qto-datagrid">
      <DataGrid
        rows={data}
        columns={enhancedColumns}
        loading={loading}
        
        // Pagination
        pagination={pagination}
        paginationModel={paginationModel}
        onPaginationModelChange={handlePaginationModelChange}
        pageSizeOptions={pageSizeOptions}
        
        // Server-side
        paginationMode={serverSide ? 'server' : 'client'}
        sortingMode={serverSide ? 'server' : 'client'}
        filterMode={serverSide ? 'server' : 'client'}
        rowCount={serverSide ? rowCount : undefined}
        
        // Selection
        checkboxSelection={checkboxSelection}
        onRowSelectionModelChange={onSelectionChange}
        
        // Sorting
        sortModel={sortModel}
        onSortModelChange={onSortModelChange}
        
        // Filtering
        filterModel={filterModel}
        onFilterModelChange={onFilterModelChange}
        
        // Layout
        autoHeight={autoHeight}
        density={density}
        
        // Events
        onRowClick={onRowClick}
        onRowDoubleClick={onRowDoubleClick}
        onCellClick={onCellClick}
        
        // Toolbar
        slots={{
          toolbar: toolbar ? CustomToolbar : null,
        }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            showExport: csvExport || printExport,
            customActions: toolbarActions,
            title,
            subtitle,
            ...toolbarProps,
          },
        }}
        
        // Styling
        sx={{
          height: autoHeight ? 'auto' : height,
          '& .MuiDataGrid-root': {
            fontFamily: 'var(--font-family)',
          },
          '& .MuiDataGrid-cell': {
            textAlign: 'center', // Center all cells by default
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          },
          '& .MuiDataGrid-columnHeader': {
            textAlign: 'center', // Center all headers by default
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          },
          '& .MuiDataGrid-columnHeaderTitle': {
            textAlign: 'center',
            width: '100%',
          },
        }}
        
        {...other}
      />
    </Box>
  );
};

// Wrapped component with MUI Theme Provider
const WrappedQTODataGrid = (props) => {
  const { actualTheme } = useTheme();
  
  return (
    <QTOMuiThemeProvider key={actualTheme}>
      <QTODataGrid {...props} />
    </QTOMuiThemeProvider>
  );
};

QTODataGrid.propTypes = {
  data: PropTypes.array,
  columns: PropTypes.array,
  loading: PropTypes.bool,
  error: PropTypes.object,
  pagination: PropTypes.bool,
  pageSize: PropTypes.number,
  pageSizeOptions: PropTypes.array,
  checkboxSelection: PropTypes.bool,
  onSelectionChange: PropTypes.func,
  sortModel: PropTypes.array,
  onSortModelChange: PropTypes.func,
  filterModel: PropTypes.object,
  onFilterModelChange: PropTypes.func,
  rowActions: PropTypes.array,
  onRowAction: PropTypes.func,
  toolbar: PropTypes.bool,
  toolbarProps: PropTypes.object,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  height: PropTypes.number,
  autoHeight: PropTypes.bool,
  density: PropTypes.oneOf(['compact', 'standard', 'comfortable']),
  onRowClick: PropTypes.func,
  onRowDoubleClick: PropTypes.func,
  onCellClick: PropTypes.func,
  serverSide: PropTypes.bool,
  rowCount: PropTypes.number,
  onPageChange: PropTypes.func,
  onPageSizeChange: PropTypes.func,
  csvExport: PropTypes.bool,
  printExport: PropTypes.bool,
  customToolbarActions: PropTypes.array,
  statusConfig: PropTypes.object,
};

export default WrappedQTODataGrid;
export { ActionCell, StatusCell, CustomToolbar };
