import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import DataGrid from './DataGrid';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  MoreVert as MoreIcon,
} from '@mui/icons-material';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

const DataGridWithActions = ({
  data = [],
  columns = [],
  actions = [],
  bulkActions = [],
  onRowAction,
  onBulkAction,
  confirmationConfig = {},
  ...props
}) => {
  const [confirmDialog, setConfirmDialog] = useState({
    open: false,
    action: null,
    row: null,
    selectedRows: null,
  });

  // Default row actions
  const defaultActions = [
    {
      key: 'view',
      label: 'View',
      icon: <ViewIcon />,
      color: 'primary',
      tooltip: 'View details',
    },
    {
      key: 'edit',
      label: 'Edit',
      icon: <EditIcon />,
      color: 'primary',
      tooltip: 'Edit item',
    },
    {
      key: 'delete',
      label: 'Delete',
      icon: <DeleteIcon />,
      color: 'error',
      tooltip: 'Delete item',
      requiresConfirmation: true,
    },
  ];

  const rowActions = actions.length > 0 ? actions : defaultActions;

  // Handle action click
  const handleActionClick = useCallback((action, row, selectedRows = null) => {
    const actionConfig = confirmationConfig[action.key];
    const requiresConfirmation = action.requiresConfirmation || actionConfig?.requiresConfirmation;

    if (requiresConfirmation) {
      setConfirmDialog({
        open: true,
        action,
        row,
        selectedRows,
      });
    } else {
      if (selectedRows) {
        onBulkAction?.(action, selectedRows);
      } else {
        onRowAction?.(action, row);
      }
    }
  }, [onRowAction, onBulkAction, confirmationConfig]);

  // Handle confirmation
  const handleConfirm = useCallback(() => {
    const { action, row, selectedRows } = confirmDialog;
    
    if (selectedRows) {
      onBulkAction?.(action, selectedRows);
    } else {
      onRowAction?.(action, row);
    }
    
    setConfirmDialog({ open: false, action: null, row: null, selectedRows: null });
  }, [confirmDialog, onRowAction, onBulkAction]);

  // Handle cancel
  const handleCancel = useCallback(() => {
    setConfirmDialog({ open: false, action: null, row: null, selectedRows: null });
  }, []);

  // Get confirmation message
  const getConfirmationMessage = () => {
    const { action, row, selectedRows } = confirmDialog;
    const actionConfig = confirmationConfig[action?.key];

    if (selectedRows) {
      return actionConfig?.bulkMessage || 
        `Are you sure you want to ${action.label.toLowerCase()} ${selectedRows.length} item${selectedRows.length !== 1 ? 's' : ''}?`;
    } else {
      return actionConfig?.message || 
        `Are you sure you want to ${action.label.toLowerCase()} this item?`;
    }
  };

  // Custom toolbar actions for bulk operations
  const toolbarActions = bulkActions.map(action => ({
    ...action,
    onClick: () => {
      // Get selected rows (this would need to be passed from the parent component)
      // For now, we'll just log it
      console.log('Bulk action:', action.key);
    },
  }));

  return (
    <>
      <DataGrid
        {...props}
        data={data}
        columns={columns}
        rowActions={rowActions}
        onRowAction={handleActionClick}
        customToolbarActions={toolbarActions}
        checkboxSelection={bulkActions.length > 0}
      />

      {/* Confirmation Dialog */}
      <Dialog
        open={confirmDialog.open}
        onClose={handleCancel}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          Confirm {confirmDialog.action?.label}
        </DialogTitle>
        <DialogContent>
          <Typography>
            {getConfirmationMessage()}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} variant="outlined">
            Cancel
          </Button>
          <Button 
            onClick={handleConfirm} 
            variant="contained"
            color={confirmDialog.action?.color === 'error' ? 'error' : 'primary'}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

DataGridWithActions.propTypes = {
  data: PropTypes.array,
  columns: PropTypes.array,
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      icon: PropTypes.node,
      color: PropTypes.string,
      tooltip: PropTypes.string,
      requiresConfirmation: PropTypes.bool,
      disabled: PropTypes.func,
    })
  ),
  bulkActions: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      icon: PropTypes.node,
      variant: PropTypes.string,
      color: PropTypes.string,
      requiresConfirmation: PropTypes.bool,
    })
  ),
  onRowAction: PropTypes.func,
  onBulkAction: PropTypes.func,
  confirmationConfig: PropTypes.objectOf(
    PropTypes.shape({
      requiresConfirmation: PropTypes.bool,
      message: PropTypes.string,
      bulkMessage: PropTypes.string,
    })
  ),
};

export default DataGridWithActions;
