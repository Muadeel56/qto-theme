import React, { useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import Table from './Table';
import Input from './Input';
import Select from './Select';
import Button from './Button';
import '../styles/searchable-table.css';

const SearchableTable = ({
  data = [],
  columns = [],
  searchableColumns = [],
  searchPlaceholder = 'Search...',
  showQuickFilters = false,
  quickFilters = [],
  showAdvancedSearch = false,
  advancedSearchFields = [],
  onSearch,
  onFilter,
  debounceDelay = 300,
  globalSearch = true,
  ...tableProps
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [quickFilterValues, setQuickFilterValues] = useState({});
  const [advancedSearchValues, setAdvancedSearchValues] = useState({});
  const [showAdvancedPanel, setShowAdvancedPanel] = useState(false);
  const [filteredData, setFilteredData] = useState(data);

  // Determine which columns are searchable
  const searchableColumnKeys = useMemo(() => {
    if (searchableColumns.length > 0) {
      return searchableColumns;
    }
    // If no specific columns defined, use all columns except those marked as non-searchable
    return columns
      .filter(col => col.searchable !== false)
      .map(col => col.key);
  }, [columns, searchableColumns]);

  // Debounced search effect
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      performSearch();
    }, debounceDelay);

    return () => clearTimeout(timeoutId);
  }, [searchTerm, quickFilterValues, advancedSearchValues, data]);

  const performSearch = () => {
    let result = [...data];

    // Global search
    if (globalSearch && searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();
      result = result.filter(row => 
        searchableColumnKeys.some(key => {
          const value = row[key];
          if (value === null || value === undefined) return false;
          return String(value).toLowerCase().includes(searchLower);
        })
      );
    }

    // Quick filters
    Object.entries(quickFilterValues).forEach(([key, value]) => {
      if (value && value !== '') {
        result = result.filter(row => {
          const rowValue = row[key];
          if (rowValue === null || rowValue === undefined) return false;
          return String(rowValue).toLowerCase().includes(String(value).toLowerCase());
        });
      }
    });

    // Advanced search filters
    Object.entries(advancedSearchValues).forEach(([key, value]) => {
      if (value && value !== '') {
        const field = advancedSearchFields.find(f => f.key === key);
        if (field) {
          result = result.filter(row => {
            const rowValue = row[key];
            
            switch (field.type) {
              case 'exact':
                return rowValue === value;
              case 'range':
                if (value.min !== undefined && rowValue < value.min) return false;
                if (value.max !== undefined && rowValue > value.max) return false;
                return true;
              case 'date':
                // Basic date filtering - can be enhanced
                const rowDate = new Date(rowValue);
                const filterDate = new Date(value);
                return rowDate.toDateString() === filterDate.toDateString();
              case 'select':
                return rowValue === value;
              default:
                // Text search
                if (rowValue === null || rowValue === undefined) return false;
                return String(rowValue).toLowerCase().includes(String(value).toLowerCase());
            }
          });
        }
      }
    });

    setFilteredData(result);

    // Call external handlers
    if (onSearch) {
      onSearch(searchTerm, result);
    }
    if (onFilter) {
      onFilter({ quick: quickFilterValues, advanced: advancedSearchValues }, result);
    }
  };

  const handleSearchChange = (value) => {
    setSearchTerm(value);
  };

  const handleQuickFilterChange = (key, value) => {
    setQuickFilterValues(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleAdvancedSearchChange = (key, value) => {
    setAdvancedSearchValues(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const clearAllFilters = () => {
    setSearchTerm('');
    setQuickFilterValues({});
    setAdvancedSearchValues({});
  };

  const hasActiveFilters = () => {
    return searchTerm.trim() || 
           Object.values(quickFilterValues).some(v => v && v !== '') ||
           Object.values(advancedSearchValues).some(v => v && v !== '');
  };

  const renderQuickFilters = () => {
    if (!showQuickFilters || quickFilters.length === 0) return null;

    return (
      <div className="qto-searchable-table__quick-filters">
        {quickFilters.map(filter => (
          <div key={filter.key} className="qto-searchable-table__filter-item">
            <label className="qto-searchable-table__filter-label">
              {filter.label}
            </label>
            {filter.type === 'select' ? (
              <Select
                value={quickFilterValues[filter.key] || ''}
                onChange={(value) => handleQuickFilterChange(filter.key, value)}
                options={filter.options}
                placeholder={filter.placeholder || 'All'}
                size="sm"
              />
            ) : (
              <Input
                value={quickFilterValues[filter.key] || ''}
                onChange={(value) => handleQuickFilterChange(filter.key, value)}
                placeholder={filter.placeholder}
                size="sm"
              />
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderAdvancedSearch = () => {
    if (!showAdvancedSearch || advancedSearchFields.length === 0) return null;

    return (
      <div className={`qto-searchable-table__advanced-search ${showAdvancedPanel ? 'qto-searchable-table__advanced-search--open' : ''}`}>
        <div className="qto-searchable-table__advanced-header">
          <Button
            variant="ghost"
            onClick={() => setShowAdvancedPanel(!showAdvancedPanel)}
            className="qto-searchable-table__advanced-toggle"
          >
            Advanced Search
            <span className={`qto-searchable-table__chevron ${showAdvancedPanel ? 'qto-searchable-table__chevron--up' : ''}`}>
              ▼
            </span>
          </Button>
        </div>

        {showAdvancedPanel && (
          <div className="qto-searchable-table__advanced-panel">
            <div className="qto-searchable-table__advanced-fields">
              {advancedSearchFields.map(field => (
                <div key={field.key} className="qto-searchable-table__advanced-field">
                  <label className="qto-searchable-table__field-label">
                    {field.label}
                  </label>
                  
                  {field.type === 'select' ? (
                    <Select
                      value={advancedSearchValues[field.key] || ''}
                      onChange={(value) => handleAdvancedSearchChange(field.key, value)}
                      options={field.options}
                      placeholder={field.placeholder}
                      size="sm"
                    />
                  ) : field.type === 'range' ? (
                    <div className="qto-searchable-table__range-inputs">
                      <Input
                        type="number"
                        value={advancedSearchValues[field.key]?.min || ''}
                        onChange={(value) => handleAdvancedSearchChange(field.key, {
                          ...advancedSearchValues[field.key],
                          min: value
                        })}
                        placeholder="Min"
                        size="sm"
                      />
                      <span className="qto-searchable-table__range-separator">-</span>
                      <Input
                        type="number"
                        value={advancedSearchValues[field.key]?.max || ''}
                        onChange={(value) => handleAdvancedSearchChange(field.key, {
                          ...advancedSearchValues[field.key],
                          max: value
                        })}
                        placeholder="Max"
                        size="sm"
                      />
                    </div>
                  ) : (
                    <Input
                      type={field.type || 'text'}
                      value={advancedSearchValues[field.key] || ''}
                      onChange={(value) => handleAdvancedSearchChange(field.key, value)}
                      placeholder={field.placeholder}
                      size="sm"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const tableActions = (
    <div className="qto-searchable-table__controls">
      <div className="qto-searchable-table__search-bar">
        <Input
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder={searchPlaceholder}
          icon="search"
          className="qto-searchable-table__search-input"
        />
        
        {hasActiveFilters() && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="qto-searchable-table__clear-btn"
          >
            Clear Filters
          </Button>
        )}
      </div>

      {renderQuickFilters()}
      {renderAdvancedSearch()}

      <div className="qto-searchable-table__results-info">
        {hasActiveFilters() && (
          <span className="qto-searchable-table__results-count">
            Showing {filteredData.length} of {data.length} results
          </span>
        )}
      </div>
    </div>
  );

  return (
    <div className="qto-searchable-table">
      <Table
        {...tableProps}
        data={filteredData}
        columns={columns}
        actions={tableActions}
      />
    </div>
  );
};

SearchableTable.propTypes = {
  data: PropTypes.array,
  columns: PropTypes.array,
  searchableColumns: PropTypes.arrayOf(PropTypes.string),
  searchPlaceholder: PropTypes.string,
  showQuickFilters: PropTypes.bool,
  quickFilters: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      type: PropTypes.oneOf(['text', 'select']),
      placeholder: PropTypes.string,
      options: PropTypes.array,
    })
  ),
  showAdvancedSearch: PropTypes.bool,
  advancedSearchFields: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      type: PropTypes.oneOf(['text', 'select', 'number', 'date', 'range', 'exact']),
      placeholder: PropTypes.string,
      options: PropTypes.array,
    })
  ),
  onSearch: PropTypes.func,
  onFilter: PropTypes.func,
  debounceDelay: PropTypes.number,
  globalSearch: PropTypes.bool,
};

export default SearchableTable;
