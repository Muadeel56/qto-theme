import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useResponsive } from '../hooks/useResponsive';
import '../styles/table.css';

const Table = ({
  data = [],
  columns = [],
  loading = false,
  pagination = false,
  pageSize = 10,
  sortable = true,
  selectable = false,
  onRowSelect,
  onSort,
  className = '',
  mobileLayout = 'cards', // 'cards' | 'scroll' | 'stack'
  emptyMessage = 'No data available',
  actions,
  ...props
}) => {
  const { isMobile, isTablet } = useResponsive();
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [selectedRows, setSelectedRows] = useState(new Set());

  // Sort data
  const sortedData = useMemo(() => {
    if (!sortConfig.key) return data;

    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      
      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [data, sortConfig]);

  // Paginate data
  const paginatedData = useMemo(() => {
    if (!pagination) return sortedData;
    
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return sortedData.slice(startIndex, endIndex);
  }, [sortedData, pagination, currentPage, pageSize]);

  const handleSort = (columnKey) => {
    if (!sortable) return;

    const direction = 
      sortConfig.key === columnKey && sortConfig.direction === 'asc' 
        ? 'desc' 
        : 'asc';
    
    setSortConfig({ key: columnKey, direction });
    
    if (onSort) {
      onSort({ key: columnKey, direction });
    }
  };

  const handleRowSelect = (rowId, selected) => {
    const newSelectedRows = new Set(selectedRows);
    
    if (selected) {
      newSelectedRows.add(rowId);
    } else {
      newSelectedRows.delete(rowId);
    }
    
    setSelectedRows(newSelectedRows);
    
    if (onRowSelect) {
      onRowSelect(Array.from(newSelectedRows));
    }
  };

  const handleSelectAll = (selected) => {
    if (selected) {
      const allIds = new Set(paginatedData.map((row, index) => row.id || index));
      setSelectedRows(allIds);
      if (onRowSelect) {
        onRowSelect(Array.from(allIds));
      }
    } else {
      setSelectedRows(new Set());
      if (onRowSelect) {
        onRowSelect([]);
      }
    }
  };

  const getTableClasses = () => {
    const baseClasses = 'qto-table';
    const responsiveClass = isMobile ? 'qto-table--mobile' : 
                           isTablet ? 'qto-table--tablet' : 'qto-table--desktop';
    const layoutClass = isMobile ? `qto-table--${mobileLayout}` : '';
    const loadingClass = loading ? 'qto-table--loading' : '';
    
    return [
      baseClasses,
      responsiveClass,
      layoutClass,
      loadingClass,
      className
    ].filter(Boolean).join(' ');
  };

  // Mobile card layout
  if (isMobile && mobileLayout === 'cards') {
    return (
      <div className={getTableClasses()} {...props}>
        {actions && (
          <div className="qto-table__actions">
            {actions}
          </div>
        )}
        
        {loading ? (
          <div className="qto-table__loading">
            <div className="qto-table__loading-spinner" />
            <p>Loading...</p>
          </div>
        ) : paginatedData.length === 0 ? (
          <div className="qto-table__empty">
            <p>{emptyMessage}</p>
          </div>
        ) : (
          <div className="qto-table__cards">
            {paginatedData.map((row, index) => (
              <div key={row.id || index} className="qto-table__card">
                {selectable && (
                  <div className="qto-table__card-select">
                    <input
                      type="checkbox"
                      checked={selectedRows.has(row.id || index)}
                      onChange={(e) => handleRowSelect(row.id || index, e.target.checked)}
                      aria-label={`Select row ${index + 1}`}
                    />
                  </div>
                )}
                
                {columns.map((column) => (
                  <div key={column.key} className="qto-table__card-field">
                    <div className="qto-table__card-label">
                      {column.label}
                    </div>
                    <div className="qto-table__card-value">
                      {column.render ? 
                        column.render(row[column.key], row, index) : 
                        row[column.key]
                      }
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

        {pagination && sortedData.length > pageSize && (
          <div className="qto-table__pagination">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
              className="qto-table__pagination-btn"
            >
              Previous
            </button>
            <span className="qto-table__pagination-info">
              Page {currentPage} of {Math.ceil(sortedData.length / pageSize)}
            </span>
            <button
              disabled={currentPage === Math.ceil(sortedData.length / pageSize)}
              onClick={() => setCurrentPage(currentPage + 1)}
              className="qto-table__pagination-btn"
            >
              Next
            </button>
          </div>
        )}
      </div>
    );
  }

  // Desktop/Tablet table layout
  return (
    <div className={getTableClasses()} {...props}>
      {actions && (
        <div className="qto-table__actions">
          {actions}
        </div>
      )}
      
      <div className="qto-table__container">
        <table className="qto-table__table">
          <thead className="qto-table__head">
            <tr className="qto-table__row qto-table__row--head">
              {selectable && (
                <th className="qto-table__cell qto-table__cell--select">
                  <input
                    type="checkbox"
                    checked={selectedRows.size === paginatedData.length && paginatedData.length > 0}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    aria-label="Select all rows"
                  />
                </th>
              )}
              
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`qto-table__cell qto-table__cell--head ${sortable && column.sortable !== false ? 'qto-table__cell--sortable' : ''}`}
                  onClick={() => column.sortable !== false && handleSort(column.key)}
                >
                  <div className="qto-table__head-content">
                    <span>{column.label}</span>
                    {sortable && column.sortable !== false && (
                      <div className="qto-table__sort-icon">
                        <svg
                          className={sortConfig.key === column.key && sortConfig.direction === 'asc' ? 'active' : ''}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <polyline points="18,15 12,9 6,15"></polyline>
                        </svg>
                        <svg
                          className={sortConfig.key === column.key && sortConfig.direction === 'desc' ? 'active' : ''}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <polyline points="6,9 12,15 18,9"></polyline>
                        </svg>
                      </div>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          
          <tbody className="qto-table__body">
            {loading ? (
              <tr>
                <td colSpan={columns.length + (selectable ? 1 : 0)} className="qto-table__loading">
                  <div className="qto-table__loading-spinner" />
                  <p>Loading...</p>
                </td>
              </tr>
            ) : paginatedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length + (selectable ? 1 : 0)} className="qto-table__empty">
                  <p>{emptyMessage}</p>
                </td>
              </tr>
            ) : (
              paginatedData.map((row, index) => (
                <tr
                  key={row.id || index}
                  className={`qto-table__row qto-table__row--body ${selectedRows.has(row.id || index) ? 'qto-table__row--selected' : ''}`}
                >
                  {selectable && (
                    <td className="qto-table__cell qto-table__cell--select">
                      <input
                        type="checkbox"
                        checked={selectedRows.has(row.id || index)}
                        onChange={(e) => handleRowSelect(row.id || index, e.target.checked)}
                        aria-label={`Select row ${index + 1}`}
                      />
                    </td>
                  )}
                  
                  {columns.map((column) => (
                    <td key={column.key} className="qto-table__cell qto-table__cell--body">
                      {column.render ? 
                        column.render(row[column.key], row, index) : 
                        row[column.key]
                      }
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {pagination && sortedData.length > pageSize && (
        <div className="qto-table__pagination">
          <div className="qto-table__pagination-info">
            Showing {((currentPage - 1) * pageSize) + 1} to {Math.min(currentPage * pageSize, sortedData.length)} of {sortedData.length} entries
          </div>
          
          <div className="qto-table__pagination-controls">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
              className="qto-table__pagination-btn"
            >
              Previous
            </button>
            
            {/* Page numbers */}
            {Array.from({ length: Math.ceil(sortedData.length / pageSize) }, (_, i) => i + 1)
              .filter(page => 
                page === 1 || 
                page === Math.ceil(sortedData.length / pageSize) ||
                Math.abs(page - currentPage) <= 2
              )
              .map((page, index, array) => (
                <React.Fragment key={page}>
                  {index > 0 && array[index - 1] !== page - 1 && (
                    <span className="qto-table__pagination-ellipsis">...</span>
                  )}
                  <button
                    onClick={() => setCurrentPage(page)}
                    className={`qto-table__pagination-btn ${currentPage === page ? 'qto-table__pagination-btn--active' : ''}`}
                  >
                    {page}
                  </button>
                </React.Fragment>
              ))
            }
            
            <button
              disabled={currentPage === Math.ceil(sortedData.length / pageSize)}
              onClick={() => setCurrentPage(currentPage + 1)}
              className="qto-table__pagination-btn"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

Table.propTypes = {
  data: PropTypes.array,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      sortable: PropTypes.bool,
      render: PropTypes.func,
    })
  ),
  loading: PropTypes.bool,
  pagination: PropTypes.bool,
  pageSize: PropTypes.number,
  sortable: PropTypes.bool,
  selectable: PropTypes.bool,
  onRowSelect: PropTypes.func,
  onSort: PropTypes.func,
  className: PropTypes.string,
  mobileLayout: PropTypes.oneOf(['cards', 'scroll', 'stack']),
  emptyMessage: PropTypes.string,
  actions: PropTypes.node,
};

export default Table;
