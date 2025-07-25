import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Table from './Table';
import Button from './Button';
import Select from './Select';
import '../styles/expandable-table.css';

const ExpandableTable = ({
  data = [],
  columns = [],
  expandableRows = true,
  expandedRowRender,
  defaultExpandedRows = [],
  expandIcon = '▶',
  collapseIcon = '▼',
  expandAll = false,
  onRowExpand,
  onRowCollapse,
  expandOnRowClick = false,
  nestedData = false,
  nestedKey = 'children',
  maxNestingLevel = 3,
  ...tableProps
}) => {
  const [expandedRows, setExpandedRows] = useState(new Set(defaultExpandedRows));
  const [allExpanded, setAllExpanded] = useState(expandAll);

  useEffect(() => {
    if (expandAll && data.length > 0) {
      const allRowIds = data.map((row, index) => row.id || index);
      setExpandedRows(new Set(allRowIds));
      setAllExpanded(true);
    }
  }, [expandAll, data]);

  const toggleRow = (rowId, row, index) => {
    const newExpandedRows = new Set(expandedRows);
    
    if (expandedRows.has(rowId)) {
      newExpandedRows.delete(rowId);
      if (onRowCollapse) {
        onRowCollapse(row, index);
      }
    } else {
      newExpandedRows.add(rowId);
      if (onRowExpand) {
        onRowExpand(row, index);
      }
    }
    
    setExpandedRows(newExpandedRows);
  };

  const toggleAllRows = () => {
    if (allExpanded) {
      setExpandedRows(new Set());
      setAllExpanded(false);
    } else {
      const allRowIds = data.map((row, index) => row.id || index);
      setExpandedRows(new Set(allRowIds));
      setAllExpanded(true);
    }
  };

  const isRowExpanded = (rowId) => expandedRows.has(rowId);

  // Enhanced columns with expand/collapse functionality
  const enhancedColumns = [
    {
      key: '__expand',
      label: expandableRows ? (
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleAllRows}
          className="qto-expandable-table__toggle-all"
          aria-label={allExpanded ? 'Collapse all rows' : 'Expand all rows'}
        >
          {allExpanded ? collapseIcon : expandIcon}
        </Button>
      ) : '',
      sortable: false,
      render: (value, row, index) => {
        const rowId = row.id || index;
        const hasExpandableContent = expandedRowRender || (nestedData && row[nestedKey]?.length > 0);
        
        if (!hasExpandableContent) {
          return <span className="qto-expandable-table__spacer"></span>;
        }

        return (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => toggleRow(rowId, row, index)}
            className={`qto-expandable-table__toggle ${isRowExpanded(rowId) ? 'qto-expandable-table__toggle--expanded' : ''}`}
            aria-label={isRowExpanded(rowId) ? 'Collapse row' : 'Expand row'}
          >
            {isRowExpanded(rowId) ? collapseIcon : expandIcon}
          </Button>
        );
      },
    },
    ...columns,
  ];

  // Process data to include expanded rows
  const processedData = React.useMemo(() => {
    if (!expandableRows) return data;

    const result = [];
    
    data.forEach((row, index) => {
      const rowId = row.id || index;
      result.push(row);
      
      if (isRowExpanded(rowId)) {
        // Add expanded content row
        if (expandedRowRender) {
          result.push({
            __isExpandedRow: true,
            __parentId: rowId,
            __expandedContent: expandedRowRender(row, index),
            id: `${rowId}__expanded`
          });
        }
        
        // Add nested children if applicable
        if (nestedData && row[nestedKey] && row[nestedKey].length > 0) {
          row[nestedKey].forEach((child, childIndex) => {
            result.push({
              ...child,
              __isNestedRow: true,
              __nestingLevel: 1,
              __parentId: rowId,
              id: child.id || `${rowId}_child_${childIndex}`
            });
          });
        }
      }
    });
    
    return result;
  }, [data, expandedRows, expandedRowRender, nestedData, nestedKey]);

  // Custom row renderer to handle expanded content
  const customRowRender = (row, index, defaultRow) => {
    if (row.__isExpandedRow) {
      return (
        <tr key={row.id} className="qto-expandable-table__expanded-row">
          <td 
            colSpan={enhancedColumns.length} 
            className="qto-expandable-table__expanded-content"
          >
            {row.__expandedContent}
          </td>
        </tr>
      );
    }

    if (row.__isNestedRow) {
      const nestingClass = `qto-expandable-table__nested-row--level-${row.__nestingLevel}`;
      return (
        <tr 
          key={row.id} 
          className={`qto-expandable-table__nested-row ${nestingClass}`}
          onClick={expandOnRowClick ? () => {
            const rowId = row.id || index;
            toggleRow(rowId, row, index);
          } : undefined}
        >
          {enhancedColumns.map((column) => (
            <td key={column.key} className="qto-table__cell qto-table__cell--body">
              {column.key === '__expand' ? (
                <span 
                  className="qto-expandable-table__nesting-indicator"
                  style={{ paddingLeft: `${row.__nestingLevel * 20}px` }}
                >
                  {column.render ? column.render(row[column.key], row, index) : ''}
                </span>
              ) : column.render ? 
                column.render(row[column.key], row, index) : 
                row[column.key]
              }
            </td>
          ))}
        </tr>
      );
    }

    // Regular row with potential click handler
    const regularRow = defaultRow();
    if (expandOnRowClick) {
      return React.cloneElement(regularRow, {
        onClick: () => {
          const rowId = row.id || index;
          toggleRow(rowId, row, index);
        },
        className: `${regularRow.props.className || ''} qto-expandable-table__clickable-row`,
        style: { cursor: 'pointer' }
      });
    }

    return regularRow;
  };

  const renderControls = () => {
    const expandedCount = expandedRows.size;
    const totalExpandableRows = data.filter((row, index) => 
      expandedRowRender || (nestedData && row[nestedKey]?.length > 0)
    ).length;

    if (totalExpandableRows === 0) return null;

    return (
      <div className="qto-expandable-table__controls">
        <div className="qto-expandable-table__status">
          {expandedCount} of {totalExpandableRows} rows expanded
        </div>
        
        <div className="qto-expandable-table__actions">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setExpandedRows(new Set())}
            disabled={expandedCount === 0}
          >
            Collapse All
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              const allRowIds = data
                .map((row, index) => ({ row, index, id: row.id || index }))
                .filter(({ row }) => 
                  expandedRowRender || (nestedData && row[nestedKey]?.length > 0)
                )
                .map(({ id }) => id);
              setExpandedRows(new Set(allRowIds));
            }}
            disabled={expandedCount === totalExpandableRows}
          >
            Expand All
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="qto-expandable-table">
      <Table
        {...tableProps}
        data={processedData}
        columns={enhancedColumns}
        actions={
          <div className="qto-expandable-table__header">
            {renderControls()}
            {tableProps.actions}
          </div>
        }
        customRowRender={customRowRender}
      />
    </div>
  );
};

ExpandableTable.propTypes = {
  data: PropTypes.array,
  columns: PropTypes.array,
  expandableRows: PropTypes.bool,
  expandedRowRender: PropTypes.func,
  defaultExpandedRows: PropTypes.array,
  expandIcon: PropTypes.string,
  collapseIcon: PropTypes.string,
  expandAll: PropTypes.bool,
  onRowExpand: PropTypes.func,
  onRowCollapse: PropTypes.func,
  expandOnRowClick: PropTypes.bool,
  nestedData: PropTypes.bool,
  nestedKey: PropTypes.string,
  maxNestingLevel: PropTypes.number,
};

export default ExpandableTable;
