import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Table from './Table';
import Button from './Button';
import Modal from './Modal';
import '../styles/table-with-actions.css';

const TableWithActions = ({
  data = [],
  columns = [],
  actions = [],
  bulkActions = [],
  onRowAction,
  onBulkAction,
  confirmActions = [],
  loading = false,
  ...tableProps
}) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);

  // Add actions column to the table columns
  const columnsWithActions = [
    ...columns,
    {
      key: 'actions',
      label: 'Actions',
      sortable: false,
      render: (value, row, index) => (
        <div className="qto-table-actions__row-actions">
          {actions.map((action) => (
            <Button
              key={action.key}
              variant={action.variant || 'ghost'}
              size="sm"
              onClick={() => handleRowAction(action, row, index)}
              disabled={action.disabled && action.disabled(row)}
              className={`qto-table-actions__action-btn ${action.className || ''}`}
              icon={action.icon}
            >
              {action.label}
            </Button>
          ))}
        </div>
      ),
    },
  ];

  const handleRowAction = (action, row, index) => {
    if (confirmActions.includes(action.key)) {
      setPendingAction({ action, row, index, type: 'row' });
      setShowConfirmModal(true);
    } else {
      if (onRowAction) {
        onRowAction(action, row, index);
      }
    }
  };

  const handleBulkAction = (action) => {
    if (selectedRows.length === 0) return;

    if (confirmActions.includes(action.key)) {
      setPendingAction({ action, rows: selectedRows, type: 'bulk' });
      setShowConfirmModal(true);
    } else {
      if (onBulkAction) {
        onBulkAction(action, selectedRows);
      }
    }
  };

  const handleConfirmAction = () => {
    if (pendingAction) {
      if (pendingAction.type === 'row') {
        if (onRowAction) {
          onRowAction(pendingAction.action, pendingAction.row, pendingAction.index);
        }
      } else if (pendingAction.type === 'bulk') {
        if (onBulkAction) {
          onBulkAction(pendingAction.action, pendingAction.rows);
        }
      }
    }
    setShowConfirmModal(false);
    setPendingAction(null);
  };

  const handleCancelAction = () => {
    setShowConfirmModal(false);
    setPendingAction(null);
  };

  const handleRowSelect = (selectedRowIds) => {
    setSelectedRows(selectedRowIds);
  };

  const renderBulkActions = () => {
    if (bulkActions.length === 0 || selectedRows.length === 0) return null;

    return (
      <div className="qto-table-actions__bulk-actions">
        <span className="qto-table-actions__selected-count">
          {selectedRows.length} item{selectedRows.length !== 1 ? 's' : ''} selected
        </span>
        <div className="qto-table-actions__bulk-buttons">
          {bulkActions.map((action) => (
            <Button
              key={action.key}
              variant={action.variant || 'outline'}
              size="sm"
              onClick={() => handleBulkAction(action)}
              disabled={action.disabled && action.disabled(selectedRows)}
              className={`qto-table-actions__bulk-btn ${action.className || ''}`}
              icon={action.icon}
            >
              {action.label}
            </Button>
          ))}
        </div>
      </div>
    );
  };

  const getConfirmMessage = () => {
    if (!pendingAction) return '';

    if (pendingAction.type === 'row') {
      return pendingAction.action.confirmMessage || 
        `Are you sure you want to ${pendingAction.action.label.toLowerCase()} this item?`;
    } else {
      return pendingAction.action.confirmMessage || 
        `Are you sure you want to ${pendingAction.action.label.toLowerCase()} ${pendingAction.rows.length} item${pendingAction.rows.length !== 1 ? 's' : ''}?`;
    }
  };

  return (
    <div className="qto-table-actions">
      <Table
        {...tableProps}
        data={data}
        columns={columnsWithActions}
        selectable={bulkActions.length > 0}
        onRowSelect={handleRowSelect}
        loading={loading}
        actions={renderBulkActions()}
      />

      {showConfirmModal && (
        <Modal
          isOpen={true}
          onClose={handleCancelAction}
          title="Confirm Action"
          size="sm"
        >
          <div className="qto-table-actions__confirm">
            <p className="qto-table-actions__confirm-message">
              {getConfirmMessage()}
            </p>
            <div className="qto-table-actions__confirm-buttons">
              <Button
                variant="outline"
                onClick={handleCancelAction}
              >
                Cancel
              </Button>
              <Button
                variant={pendingAction?.action?.dangerAction ? 'danger' : 'primary'}
                onClick={handleConfirmAction}
              >
                Confirm
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

TableWithActions.propTypes = {
  data: PropTypes.array,
  columns: PropTypes.array,
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      icon: PropTypes.string,
      variant: PropTypes.string,
      className: PropTypes.string,
      disabled: PropTypes.func,
      confirmMessage: PropTypes.string,
      dangerAction: PropTypes.bool,
    })
  ),
  bulkActions: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      icon: PropTypes.string,
      variant: PropTypes.string,
      className: PropTypes.string,
      disabled: PropTypes.func,
      confirmMessage: PropTypes.string,
      dangerAction: PropTypes.bool,
    })
  ),
  onRowAction: PropTypes.func,
  onBulkAction: PropTypes.func,
  confirmActions: PropTypes.arrayOf(PropTypes.string),
  loading: PropTypes.bool,
};

export default TableWithActions;
