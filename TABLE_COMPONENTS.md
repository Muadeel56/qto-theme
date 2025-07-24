# Table Components Documentation

## Overview

The QTO Theme System provides a comprehensive set of table components designed to handle various data display scenarios. Each component is built with responsive design, accessibility, and theming in mind.

## Component Types

### 1. Table (Base Component)
The foundational table component with basic features.

```jsx
import { Table } from '@qto/theme';

<Table
  data={data}
  columns={columns}
  pagination={true}
  pageSize={10}
  sortable={true}
  selectable={true}
  loading={false}
  onRowSelect={(selectedRows) => console.log(selectedRows)}
  mobileLayout="cards" // 'cards' | 'scroll' | 'stack'
/>
```

**Props:**
- `data`: Array of row objects
- `columns`: Array of column definitions
- `pagination`: Enable pagination
- `pageSize`: Number of rows per page
- `sortable`: Enable column sorting
- `selectable`: Enable row selection
- `loading`: Show loading state
- `mobileLayout`: Mobile display mode
- `onRowSelect`: Selection callback

### 2. TableWithActions
Table with row and bulk actions, including confirmation dialogs.

```jsx
import { TableWithActions } from '@qto/theme';

<TableWithActions
  data={data}
  columns={columns}
  actions={[
    { key: 'edit', label: 'Edit', icon: '✏️', variant: 'outline' },
    { key: 'delete', label: 'Delete', icon: '🗑️', variant: 'danger', dangerAction: true }
  ]}
  bulkActions={[
    { key: 'bulkDelete', label: 'Delete Selected', variant: 'danger' }
  ]}
  onRowAction={(action, row, index) => handleAction(action, row)}
  onBulkAction={(action, selectedRows) => handleBulkAction(action, selectedRows)}
  confirmActions={['delete', 'bulkDelete']}
/>
```

**Props:**
- `actions`: Array of row action definitions
- `bulkActions`: Array of bulk action definitions
- `onRowAction`: Row action callback
- `onBulkAction`: Bulk action callback
- `confirmActions`: Actions requiring confirmation

### 3. SearchableTable
Table with global search, quick filters, and advanced search capabilities.

```jsx
import { SearchableTable } from '@qto/theme';

<SearchableTable
  data={data}
  columns={columns}
  searchPlaceholder="Search users..."
  showQuickFilters={true}
  quickFilters={[
    {
      key: 'department',
      label: 'Department',
      type: 'select',
      options: [
        { value: '', label: 'All Departments' },
        { value: 'Engineering', label: 'Engineering' }
      ]
    }
  ]}
  showAdvancedSearch={true}
  advancedSearchFields={[
    { key: 'salary', label: 'Salary Range', type: 'range' },
    { key: 'joinDate', label: 'Join Date', type: 'date' }
  ]}
  onSearch={(term, results) => console.log('Search:', term, results)}
  onFilter={(filters, results) => console.log('Filter:', filters, results)}
/>
```

**Props:**
- `searchableColumns`: Columns to include in search
- `searchPlaceholder`: Search input placeholder
- `showQuickFilters`: Enable quick filter bar
- `quickFilters`: Quick filter definitions
- `showAdvancedSearch`: Enable advanced search panel
- `advancedSearchFields`: Advanced search field definitions
- `debounceDelay`: Search debounce delay (default: 300ms)

### 4. SortableTable
Table with enhanced sorting capabilities including multi-column sorting.

```jsx
import { SortableTable } from '@qto/theme';

<SortableTable
  data={data}
  columns={columns}
  defaultSort={{ key: 'name', direction: 'asc' }}
  multiSort={true}
  onSort={(sortConfig) => console.log('Sort:', sortConfig)}
  customSortFunctions={{
    customField: (a, b, direction) => {
      // Custom sorting logic
      return direction === 'asc' ? a.customField - b.customField : b.customField - a.customField;
    }
  }}
/>
```

**Props:**
- `defaultSort`: Initial sort configuration
- `multiSort`: Enable multi-column sorting
- `customSortFunctions`: Custom sort functions by column key
- `onSort`: Sort change callback

### 5. ExpandableTable
Table with expandable rows and nested data support.

```jsx
import { ExpandableTable } from '@qto/theme';

<ExpandableTable
  data={data}
  columns={columns}
  expandedRowRender={(row, index) => (
    <div>
      <h4>Details for {row.name}</h4>
      <p>Additional information...</p>
    </div>
  )}
  defaultExpandedRows={[1, 2]}
  expandOnRowClick={true}
  nestedData={true}
  nestedKey="children"
  onRowExpand={(row, index) => console.log('Expanded:', row)}
  onRowCollapse={(row, index) => console.log('Collapsed:', row)}
/>
```

**Props:**
- `expandedRowRender`: Function to render expanded content
- `defaultExpandedRows`: Initially expanded row IDs
- `expandIcon`/`collapseIcon`: Custom expand/collapse icons
- `expandOnRowClick`: Allow row click to toggle expansion
- `nestedData`: Enable nested data display
- `nestedKey`: Key for nested data array
- `maxNestingLevel`: Maximum nesting depth

## Column Definition

```jsx
const columns = [
  {
    key: 'name',
    label: 'Name',
    sortable: true, // Default: true
    searchable: true, // Default: true
    render: (value, row, index) => (
      <div className="user-cell">
        <Avatar src={row.avatar} />
        <span>{value}</span>
      </div>
    )
  },
  {
    key: 'status',
    label: 'Status',
    render: (value) => (
      <Badge variant={value === 'active' ? 'success' : 'secondary'}>
        {value}
      </Badge>
    )
  }
];
```

## Action Definition

```jsx
const actions = [
  {
    key: 'edit',
    label: 'Edit',
    icon: '✏️',
    variant: 'outline', // 'primary' | 'outline' | 'ghost' | 'danger'
    className: 'custom-class',
    disabled: (row) => row.status === 'locked',
    confirmMessage: 'Are you sure?',
    dangerAction: true
  }
];
```

## Filter Definition

```jsx
// Quick Filter
{
  key: 'department',
  label: 'Department',
  type: 'select', // 'text' | 'select'
  placeholder: 'All Departments',
  options: [
    { value: '', label: 'All' },
    { value: 'eng', label: 'Engineering' }
  ]
}

// Advanced Search Field
{
  key: 'salary',
  label: 'Salary Range',
  type: 'range', // 'text' | 'select' | 'number' | 'date' | 'range' | 'exact'
  placeholder: 'Enter range'
}
```

## Responsive Behavior

All table components are fully responsive with three mobile layouts:

1. **Cards Layout** (Default): Transforms table rows into card format
2. **Scroll Layout**: Maintains table structure with horizontal scroll
3. **Stack Layout**: Stacks cell content vertically within cards

```jsx
<Table
  mobileLayout="cards" // 'cards' | 'scroll' | 'stack'
  data={data}
  columns={columns}
/>
```

## Theming

Tables automatically adapt to the current theme (light/dark/custom) and support:

- CSS custom properties for colors and spacing
- High contrast mode support
- Reduced motion preferences
- Print-friendly styles

## Accessibility Features

- Full keyboard navigation
- ARIA labels and roles
- Screen reader announcements
- Focus management
- High contrast support

## Performance Considerations

- Virtualization for large datasets (coming soon)
- Debounced search and filtering
- Optimized re-renders with React.memo
- Lazy loading support

## Advanced Usage

### Combining Multiple Features

```jsx
import { SearchableTable, TableWithActions } from '@qto/theme';

// You can combine features by wrapping components
<SearchableTable
  data={data}
  columns={columns}
  showQuickFilters={true}
  quickFilters={quickFilters}
  actions={
    <TableWithActions
      data={filteredData} // Use filtered data from SearchableTable
      columns={columns}
      actions={rowActions}
      bulkActions={bulkActions}
      onRowAction={handleRowAction}
      onBulkAction={handleBulkAction}
    />
  }
/>
```

### Custom Cell Renderers

```jsx
const columns = [
  {
    key: 'avatar',
    label: 'Photo',
    render: (value, row) => (
      <Avatar
        src={value}
        alt={row.name}
        size="sm"
        fallback={row.name?.charAt(0)}
      />
    )
  },
  {
    key: 'actions',
    label: 'Actions',
    sortable: false,
    render: (value, row, index) => (
      <div className="action-buttons">
        <Button size="sm" onClick={() => editRow(row)}>Edit</Button>
        <Button size="sm" variant="danger" onClick={() => deleteRow(row)}>Delete</Button>
      </div>
    )
  }
];
```

### Server-Side Integration

```jsx
const [data, setData] = useState([]);
const [loading, setLoading] = useState(false);
const [pagination, setPagination] = useState({ page: 1, pageSize: 10, total: 0 });

const handleSearch = async (searchTerm, filters) => {
  setLoading(true);
  try {
    const response = await api.searchUsers({
      search: searchTerm,
      filters,
      page: pagination.page,
      pageSize: pagination.pageSize
    });
    setData(response.data);
    setPagination(prev => ({ ...prev, total: response.total }));
  } catch (error) {
    console.error('Search failed:', error);
  } finally {
    setLoading(false);
  }
};

<SearchableTable
  data={data}
  columns={columns}
  loading={loading}
  pagination={true}
  pageSize={pagination.pageSize}
  onSearch={handleSearch}
/>
```

## Best Practices

1. **Column Configuration**: Always provide meaningful labels and consider sortability
2. **Performance**: Use pagination for large datasets
3. **Accessibility**: Provide descriptive action labels and ARIA attributes
4. **Mobile**: Test all three mobile layouts to find the best fit
5. **Loading States**: Always handle loading and error states
6. **Actions**: Group related actions and use confirmation for destructive operations

## Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## Migration Guide

If migrating from a previous table implementation, refer to the migration guide in the main documentation.
