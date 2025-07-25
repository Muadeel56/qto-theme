import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import Table from './Table';
import Button from './Button';
import '../styles/sortable-table.css';

const SortableTable = ({
  data = [],
  columns = [],
  defaultSort = null,
  multiSort = false,
  onSort,
  sortIcons = true,
  customSortFunctions = {},
  ...tableProps
}) => {
  const [sortConfig, setSortConfig] = useState(() => {
    if (defaultSort) {
      return multiSort ? [defaultSort] : defaultSort;
    }
    return multiSort ? [] : { key: null, direction: 'asc' };
  });

  // Custom sort function for different data types
  const getDefaultSortFunction = (columnKey) => {
    if (customSortFunctions[columnKey]) {
      return customSortFunctions[columnKey];
    }

    return (a, b, direction) => {
      const aValue = a[columnKey];
      const bValue = b[columnKey];

      // Handle null/undefined values
      if (aValue === null || aValue === undefined) {
        if (bValue === null || bValue === undefined) return 0;
        return direction === 'asc' ? 1 : -1;
      }
      if (bValue === null || bValue === undefined) {
        return direction === 'asc' ? -1 : 1;
      }

      // Detect data type and sort accordingly
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return direction === 'asc' ? aValue - bValue : bValue - aValue;
      }

      if (aValue instanceof Date && bValue instanceof Date) {
        return direction === 'asc' ? aValue - bValue : bValue - aValue;
      }

      // Try to parse as dates
      const aDate = new Date(aValue);
      const bDate = new Date(bValue);
      if (!isNaN(aDate.getTime()) && !isNaN(bDate.getTime())) {
        return direction === 'asc' ? aDate - bDate : bDate - aDate;
      }

      // String comparison
      const aStr = String(aValue).toLowerCase();
      const bStr = String(bValue).toLowerCase();
      
      if (aStr < bStr) return direction === 'asc' ? -1 : 1;
      if (aStr > bStr) return direction === 'asc' ? 1 : -1;
      return 0;
    };
  };

  // Sort data based on current sort configuration
  const sortedData = React.useMemo(() => {
    if (!data || data.length === 0) return [];

    let result = [...data];

    if (multiSort) {
      // Multi-column sort
      if (sortConfig.length === 0) return result;

      result.sort((a, b) => {
        for (const sort of sortConfig) {
          const sortFn = getDefaultSortFunction(sort.key);
          const comparison = sortFn(a, b, sort.direction);
          if (comparison !== 0) return comparison;
        }
        return 0;
      });
    } else {
      // Single column sort
      if (!sortConfig.key) return result;

      const sortFn = getDefaultSortFunction(sortConfig.key);
      result.sort((a, b) => sortFn(a, b, sortConfig.direction));
    }

    return result;
  }, [data, sortConfig, customSortFunctions, multiSort]);

  const handleSort = useCallback((columnKey) => {
    if (multiSort) {
      setSortConfig(prevConfig => {
        const newConfig = [...prevConfig];
        const existingIndex = newConfig.findIndex(sort => sort.key === columnKey);

        if (existingIndex > -1) {
          // Column already being sorted - cycle through directions
          const currentSort = newConfig[existingIndex];
          if (currentSort.direction === 'asc') {
            newConfig[existingIndex] = { key: columnKey, direction: 'desc' };
          } else {
            // Remove this sort
            newConfig.splice(existingIndex, 1);
          }
        } else {
          // Add new sort
          newConfig.push({ key: columnKey, direction: 'asc' });
        }

        // Call external handler
        if (onSort) {
          onSort(newConfig);
        }

        return newConfig;
      });
    } else {
      setSortConfig(prevConfig => {
        const direction = 
          prevConfig.key === columnKey && prevConfig.direction === 'asc' 
            ? 'desc' 
            : 'asc';
        
        const newConfig = { key: columnKey, direction };

        // Call external handler
        if (onSort) {
          onSort(newConfig);
        }

        return newConfig;
      });
    }
  }, [multiSort, onSort]);

  const clearSort = () => {
    const newConfig = multiSort ? [] : { key: null, direction: 'asc' };
    setSortConfig(newConfig);
    
    if (onSort) {
      onSort(newConfig);
    }
  };

  const getSortInfo = (columnKey) => {
    if (multiSort) {
      const sortIndex = sortConfig.findIndex(sort => sort.key === columnKey);
      if (sortIndex === -1) return { active: false, direction: null, index: null };
      
      return {
        active: true,
        direction: sortConfig[sortIndex].direction,
        index: sortConfig.length > 1 ? sortIndex + 1 : null
      };
    } else {
      return {
        active: sortConfig.key === columnKey,
        direction: sortConfig.key === columnKey ? sortConfig.direction : null,
        index: null
      };
    }
  };

  // Enhance columns with sort functionality
  const enhancedColumns = columns.map(column => {
    if (column.sortable === false) return column;

    const sortInfo = getSortInfo(column.key);

    return {
      ...column,
      sortable: true,
      sortInfo,
      onSort: () => handleSort(column.key)
    };
  });

  const hasActiveSort = () => {
    if (multiSort) {
      return sortConfig.length > 0;
    }
    return sortConfig.key !== null;
  };

  const renderSortControls = () => {
    if (!hasActiveSort()) return null;

    return (
      <div className="qto-sortable-table__controls">
        <div className="qto-sortable-table__sort-info">
          {multiSort ? (
            <span>
              Sorted by {sortConfig.length} column{sortConfig.length !== 1 ? 's' : ''}
            </span>
          ) : (
            <span>
              Sorted by {columns.find(col => col.key === sortConfig.key)?.label || sortConfig.key} 
              ({sortConfig.direction === 'asc' ? 'A-Z' : 'Z-A'})
            </span>
          )}
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={clearSort}
          className="qto-sortable-table__clear-sort"
        >
          Clear Sort
        </Button>
      </div>
    );
  };

  return (
    <div className="qto-sortable-table">
      <Table
        {...tableProps}
        data={sortedData}
        columns={enhancedColumns}
        sortable={true}
        onSort={handleSort}
        actions={
          <div className="qto-sortable-table__actions">
            {renderSortControls()}
            {tableProps.actions}
          </div>
        }
      />
    </div>
  );
};

SortableTable.propTypes = {
  data: PropTypes.array,
  columns: PropTypes.array,
  defaultSort: PropTypes.oneOfType([
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      direction: PropTypes.oneOf(['asc', 'desc']).isRequired,
    }),
    PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.string.isRequired,
        direction: PropTypes.oneOf(['asc', 'desc']).isRequired,
      })
    )
  ]),
  multiSort: PropTypes.bool,
  onSort: PropTypes.func,
  sortIcons: PropTypes.bool,
  customSortFunctions: PropTypes.objectOf(PropTypes.func),
};

export default SortableTable;
