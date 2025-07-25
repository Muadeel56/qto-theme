import React, { useState, useMemo, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from './ThemeProvider';
import '../styles/datagrid.css';

const DataGrid = ({ 
  columns = [],
  data = [],
  pagination = true,
  pageSize = 10,
  sortable = true,
  filterable = true,
  selectable = false,
  multiSelect = false,
  loading = false,
  emptyMessage = 'No data available',
  searchPlaceholder = 'Search...',
  onRowClick,
  onSelectionChange,
  onSort,
  onFilter,
  className = '',
  ...props 
}) => {
  const { actualTheme } = useTheme();
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [globalFilter, setGlobalFilter] = useState('');
  const [columnFilters, setColumnFilters] = useState({});
  const [themeKey, setThemeKey] = useState(0); // Force re-render on theme change

  // Force re-render when theme changes to ensure proper CSS variable updates
  useEffect(() => {
    setThemeKey(prev => prev + 1);
  }, [actualTheme]);

  // Filter data based on global and column filters
  const filteredData = useMemo(() => {
    let filtered = [...data];

    // Global filter
    if (globalFilter) {
      filtered = filtered.filter(row =>
        columns.some(column =>
          String(row[column.key] || '').toLowerCase().includes(globalFilter.toLowerCase())
        )
      );
    }

    // Column filters
    Object.entries(columnFilters).forEach(([key, value]) => {
      if (value) {
        filtered = filtered.filter(row =>
          String(row[key] || '').toLowerCase().includes(value.toLowerCase())
        );
      }
    });

    return filtered;
  }, [data, globalFilter, columnFilters, columns]);

  // Sort filtered data
  const sortedData = useMemo(() => {
    if (!sortable || !sortConfig.key) return filteredData;
    
    return [...filteredData].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      
      if (aValue == null) return sortConfig.direction === 'asc' ? 1 : -1;
      if (bValue == null) return sortConfig.direction === 'asc' ? -1 : 1;
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortConfig.direction === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      
      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortConfig, sortable]);

  // Paginate sorted data
  const paginatedData = useMemo(() => {
    if (!pagination) return sortedData;
    
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return sortedData.slice(startIndex, endIndex);
  }, [sortedData, currentPage, pageSize, pagination]);

  const totalPages = Math.ceil(filteredData.length / pageSize);
  const totalRecords = filteredData.length;

  const handleSort = useCallback((columnKey) => {
    if (!sortable) return;
    
    setSortConfig(prevConfig => ({
      key: columnKey,
      direction: prevConfig.key === columnKey && prevConfig.direction === 'asc' ? 'desc' : 'asc'
    }));
    
    onSort?.({ key: columnKey, direction: sortConfig.direction });
  }, [sortable, sortConfig.direction, onSort]);

  const handleRowSelect = useCallback((rowId, isSelected) => {
    let newSelectedRows;
    
    if (multiSelect) {
      newSelectedRows = new Set(selectedRows);
      if (isSelected) {
        newSelectedRows.add(rowId);
      } else {
        newSelectedRows.delete(rowId);
      }
    } else {
      newSelectedRows = isSelected ? new Set([rowId]) : new Set();
    }
    
    setSelectedRows(newSelectedRows);
    onSelectionChange?.(Array.from(newSelectedRows));
  }, [selectedRows, multiSelect, onSelectionChange]);

  const handleSelectAll = useCallback((isSelected) => {
    const newSelectedRows = isSelected 
      ? new Set(paginatedData.map(row => row.id || JSON.stringify(row)))
      : new Set();
    
    setSelectedRows(newSelectedRows);
    onSelectionChange?.(Array.from(newSelectedRows));
  }, [paginatedData, onSelectionChange]);

  const handleColumnFilter = useCallback((columnKey, value) => {
    setColumnFilters(prev => ({
      ...prev,
      [columnKey]: value
    }));
    setCurrentPage(1);
    onFilter?.({ [columnKey]: value });
  }, [onFilter]);

  const getSortIcon = (columnKey) => {
    if (sortConfig.key !== columnKey) {
      return (
        <svg className="qto-datagrid__sort-icon" viewBox="0 0 16 16">
          <path d="M8 3l3 3H5l3-3z" fill="currentColor" opacity="0.3"/>
          <path d="M8 13L5 10h6l-3 3z" fill="currentColor" opacity="0.3"/>
        </svg>
      );
    }
    
    return (
      <svg className={`qto-datagrid__sort-icon qto-datagrid__sort-icon--${sortConfig.direction}`} viewBox="0 0 16 16">
        {sortConfig.direction === 'asc' ? (
          <path d="M8 3l3 3H5l3-3z" fill="currentColor"/>
        ) : (
          <path d="M8 13L5 10h6l-3 3z" fill="currentColor"/>
        )}
      </svg>
    );
  };

  const renderPagination = () => {
    if (!pagination || totalPages <= 1) return null;

    const pages = [];
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return (
      <div className="qto-datagrid__pagination">
        <div className="qto-datagrid__pagination-info">
          Showing {((currentPage - 1) * pageSize) + 1} to {Math.min(currentPage * pageSize, totalRecords)} of {totalRecords} entries
        </div>
        <div className="qto-datagrid__pagination-controls">
          <button 
            className="qto-datagrid__pagination-button"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(1)}
          >
            First
          </button>
          <button 
            className="qto-datagrid__pagination-button"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => prev - 1)}
          >
            Previous
          </button>
          {pages.map(page => (
            <button
              key={page}
              className={`qto-datagrid__pagination-button ${currentPage === page ? 'qto-datagrid__pagination-button--active' : ''}`}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          ))}
          <button 
            className="qto-datagrid__pagination-button"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(prev => prev + 1)}
          >
            Next
          </button>
          <button 
            className="qto-datagrid__pagination-button"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(totalPages)}
          >
            Last
          </button>
        </div>
      </div>
    );
  };

  return (
    <div 
      key={themeKey} 
      className={`qto-datagrid ${className}`} 
      data-theme={actualTheme}
      {...props}
    >
      {/* Toolbar */}
      <div className="qto-datagrid__toolbar">
        {filterable && (
          <div className="qto-datagrid__search">
            <svg className="qto-datagrid__search-icon" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
            <input
              type="text"
              className="qto-datagrid__search-input"
              placeholder={searchPlaceholder}
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
            />
          </div>
        )}
        
        {selectedRows.size > 0 && (
          <div className="qto-datagrid__selection-info">
            {selectedRows.size} row{selectedRows.size > 1 ? 's' : ''} selected
          </div>
        )}
      </div>

      {/* Data Table */}
      <div className="qto-datagrid__container">
        {loading ? (
          <div className="qto-datagrid__loading">
            <div className="qto-datagrid__spinner"></div>
            <span>Loading data...</span>
          </div>
        ) : (
          <table className="qto-datagrid__table">
            <thead className="qto-datagrid__header">
              <tr>
                {selectable && (
                  <th className="qto-datagrid__header-cell qto-datagrid__header-cell--checkbox">
                    {multiSelect && (
                      <input
                        type="checkbox"
                        className="qto-datagrid__checkbox"
                        checked={selectedRows.size === paginatedData.length && paginatedData.length > 0}
                        onChange={(e) => handleSelectAll(e.target.checked)}
                      />
                    )}
                  </th>
                )}
                {columns.map((column) => (
                  <th
                    key={column.key}
                    className={`qto-datagrid__header-cell ${column.sortable !== false && sortable ? 'qto-datagrid__header-cell--sortable' : ''} ${column.align ? `qto-datagrid__header-cell--${column.align}` : 'qto-datagrid__header-cell--center'}`}
                    style={{ width: column.width, minWidth: column.minWidth }}
                    onClick={() => column.sortable !== false && handleSort(column.key)}
                  >
                    <div className="qto-datagrid__header-content">
                      <span className="qto-datagrid__header-title">{column.title}</span>
                      {column.sortable !== false && sortable && getSortIcon(column.key)}
                    </div>
                    {filterable && column.filterable !== false && (
                      <div className="qto-datagrid__column-filter">
                        <input
                          type="text"
                          className="qto-datagrid__column-filter-input"
                          placeholder={`Filter ${column.title}...`}
                          value={columnFilters[column.key] || ''}
                          onChange={(e) => handleColumnFilter(column.key, e.target.value)}
                          onClick={(e) => e.stopPropagation()}
                        />
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="qto-datagrid__body">
              {paginatedData.length === 0 ? (
                <tr>
                  <td 
                    className="qto-datagrid__cell qto-datagrid__cell--empty" 
                    colSpan={columns.length + (selectable ? 1 : 0)}
                  >
                    <div className="qto-datagrid__empty">
                      <svg className="qto-datagrid__empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                        <line x1="9" y1="9" x2="15" y2="15"/>
                        <line x1="15" y1="9" x2="9" y2="15"/>
                      </svg>
                      <span>{emptyMessage}</span>
                    </div>
                  </td>
                </tr>
              ) : (
                paginatedData.map((row, rowIndex) => {
                  const rowId = row.id || JSON.stringify(row);
                  const isSelected = selectedRows.has(rowId);
                  
                  return (
                    <tr
                      key={rowId}
                      className={`qto-datagrid__row ${isSelected ? 'qto-datagrid__row--selected' : ''} ${onRowClick ? 'qto-datagrid__row--clickable' : ''}`}
                      onClick={() => onRowClick?.(row, rowIndex)}
                    >
                      {selectable && (
                        <td className="qto-datagrid__cell qto-datagrid__cell--checkbox">
                          <input
                            type="checkbox"
                            className="qto-datagrid__checkbox"
                            checked={isSelected}
                            onChange={(e) => handleRowSelect(rowId, e.target.checked)}
                            onClick={(e) => e.stopPropagation()}
                          />
                        </td>
                      )}
                      {columns.map((column) => (
                        <td
                          key={`${rowId}-${column.key}`}
                          className={`qto-datagrid__cell ${column.align ? `qto-datagrid__cell--${column.align}` : 'qto-datagrid__cell--center'}`}
                        >
                          {column.render ? column.render(row[column.key], row, rowIndex) : row[column.key]}
                        </td>
                      ))}
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      {renderPagination()}
    </div>
  );
};

DataGrid.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      width: PropTypes.string,
      minWidth: PropTypes.string,
      align: PropTypes.oneOf(['left', 'center', 'right']),
      sortable: PropTypes.bool,
      filterable: PropTypes.bool,
      render: PropTypes.func
    })
  ).isRequired,
  data: PropTypes.array.isRequired,
  pagination: PropTypes.bool,
  pageSize: PropTypes.number,
  sortable: PropTypes.bool,
  filterable: PropTypes.bool,
  selectable: PropTypes.bool,
  multiSelect: PropTypes.bool,
  loading: PropTypes.bool,
  emptyMessage: PropTypes.string,
  searchPlaceholder: PropTypes.string,
  onRowClick: PropTypes.func,
  onSelectionChange: PropTypes.func,
  onSort: PropTypes.func,
  onFilter: PropTypes.func,
  className: PropTypes.string
};

export default DataGrid;
