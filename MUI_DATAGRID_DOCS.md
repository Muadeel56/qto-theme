# MUI DataGrid Integration Documentation

## Overview

The QTO Theme System now includes comprehensive MUI DataGrid integration, providing powerful table functionality while maintaining design consistency with the QTO theme system. The integration offers multiple specialized components for different use cases.

## Components

### 1. QTODataGrid (Base Component)
The core DataGrid component with QTO theme integration.

```jsx
import { QTODataGrid } from '@qto/theme';

<QTODataGrid
  data={data}
  columns={columns}
  title="User Management"
  subtitle="Manage your users efficiently"
  pageSize={25}
  checkboxSelection
  rowActions={actions}
  onRowAction={handleRowAction}
  customToolbarActions={toolbarActions}
  statusConfig={statusConfig}
/>
```

### 2. DataGridWithActions
DataGrid with built-in row and bulk actions with confirmation dialogs.

```jsx
import { DataGridWithActions } from '@qto/theme';

<DataGridWithActions
  data={data}
  columns={columns}
  actions={[
    { key: 'edit', label: 'Edit', icon: <EditIcon />, color: 'primary' },
    { key: 'delete', label: 'Delete', icon: <DeleteIcon />, color: 'error', requiresConfirmation: true }
  ]}
  bulkActions={[
    { key: 'export', label: 'Export', icon: <DownloadIcon /> },
    { key: 'delete', label: 'Delete', icon: <DeleteIcon />, requiresConfirmation: true }
  ]}
  onRowAction={handleRowAction}
  onBulkAction={handleBulkAction}
  confirmationConfig={{
    delete: {
      message: 'Are you sure you want to delete this item?',
      bulkMessage: 'Are you sure you want to delete selected items?'
    }
  }}
/>
```

### 3. ServerSideDataGrid
DataGrid optimized for server-side data with automatic pagination, sorting, and filtering.

```jsx
import { ServerSideDataGrid } from '@qto/theme';

<ServerSideDataGrid
  fetchData={async ({ page, pageSize, sortModel, filterModel }) => {
    const response = await api.fetchUsers({
      page,
      pageSize,
      sort: sortModel,
      filters: filterModel
    });
    return {
      rows: response.data,
      totalRows: response.total
    };
  }}
  columns={columns}
  totalRows={totalCount}
  initialPageSize={25}
  debounceDelay={500}
/>
```

### 4. MuiThemeProvider
Theme provider that bridges QTO theme system with MUI components.

```jsx
import { MuiThemeProvider } from '@qto/theme';

<MuiThemeProvider>
  <YourMuiComponents />
</MuiThemeProvider>
```

## Features

### Built-in Functionality
- ✅ **Pagination**: Client and server-side pagination
- ✅ **Sorting**: Single and multi-column sorting
- ✅ **Filtering**: Column filters and quick search
- ✅ **Selection**: Row selection with bulk operations
- ✅ **Export**: CSV and print export capabilities
- ✅ **Responsive**: Mobile-optimized layouts
- ✅ **Accessibility**: Full keyboard navigation and screen reader support
- ✅ **Theming**: Automatic QTO theme integration
- ✅ **Virtualization**: Built-in row virtualization for performance
- ✅ **Column Management**: Show/hide columns, resize, reorder
- ✅ **Density Control**: Compact, standard, and comfortable layouts

### Advanced Features
- ✅ **Server-side Operations**: Pagination, sorting, filtering
- ✅ **Real-time Updates**: Live data refresh capabilities
- ✅ **Custom Cell Renderers**: Rich content in cells
- ✅ **Action Integration**: Row and bulk actions with confirmations
- ✅ **Status Indicators**: Visual status representations
- ✅ **Toolbar Customization**: Custom action buttons and controls
- ✅ **Error Handling**: Graceful error states and loading indicators

## Column Configuration

### Basic Column
```jsx
{
  field: 'name',
  headerName: 'Name',
  width: 150,
  flex: 1, // Flexible width
  sortable: true,
  filterable: true,
  editable: false,
}
```

### Custom Cell Renderer
```jsx
{
  field: 'avatar',
  headerName: 'Avatar',
  width: 80,
  sortable: false,
  renderCell: (params) => (
    <Avatar src={params.value} alt={params.row.name} />
  ),
}
```

### Status Column
```jsx
{
  field: 'status',
  headerName: 'Status',
  width: 120,
  type: 'status',
  renderCell: (params) => (
    <Chip
      label={params.value}
      color={params.value === 'active' ? 'success' : 'error'}
    />
  ),
}
```

### Formatted Number Column
```jsx
{
  field: 'salary',
  headerName: 'Salary',
  width: 120,
  type: 'number',
  valueFormatter: (params) => `$${params.value?.toLocaleString()}`,
}
```

### Date Column
```jsx
{
  field: 'createdAt',
  headerName: 'Created',
  width: 120,
  type: 'date',
  valueFormatter: (params) => params.value?.toLocaleDateString(),
}
```

## Action Configuration

### Row Actions
```jsx
const rowActions = [
  {
    key: 'view',
    label: 'View',
    icon: <ViewIcon />,
    color: 'primary',
    tooltip: 'View details',
    disabled: (row) => row.status === 'locked',
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
```

### Bulk Actions
```jsx
const bulkActions = [
  {
    key: 'export',
    label: 'Export',
    icon: <DownloadIcon />,
    variant: 'outlined',
    tooltip: 'Export selected items',
  },
  {
    key: 'delete',
    label: 'Delete Selected',
    icon: <DeleteIcon />,
    variant: 'contained',
    color: 'error',
    requiresConfirmation: true,
  },
];
```

### Toolbar Actions
```jsx
const toolbarActions = [
  {
    label: 'Add New',
    icon: <AddIcon />,
    onClick: () => handleAddNew(),
    variant: 'contained',
    color: 'primary',
    tooltip: 'Add new item',
  },
  {
    label: 'Import',
    icon: <UploadIcon />,
    onClick: () => handleImport(),
    variant: 'outlined',
    tooltip: 'Import from file',
  },
];
```

## Status Configuration

```jsx
const statusConfig = {
  active: { color: 'success', label: 'Active' },
  inactive: { color: 'error', label: 'Inactive' },
  pending: { color: 'warning', label: 'Pending' },
  draft: { color: 'info', label: 'Draft' },
};
```

## Server-Side Integration

### API Response Format
```json
{
  "rows": [
    { "id": 1, "name": "User 1", "email": "user1@example.com" }
  ],
  "totalRows": 150,
  "page": 0,
  "pageSize": 25
}
```

### Fetch Function
```jsx
const fetchData = async ({ page, pageSize, sortModel, filterModel }) => {
  try {
    const params = new URLSearchParams({
      page: page.toString(),
      pageSize: pageSize.toString(),
    });

    // Add sorting
    if (sortModel.length > 0) {
      params.append('sortField', sortModel[0].field);
      params.append('sortOrder', sortModel[0].sort);
    }

    // Add filters
    if (filterModel.items.length > 0) {
      filterModel.items.forEach((filter, index) => {
        params.append(`filter[${index}][field]`, filter.field);
        params.append(`filter[${index}][operator]`, filter.operator);
        params.append(`filter[${index}][value]`, filter.value);
      });
    }

    const response = await fetch(`/api/users?${params}`);
    const data = await response.json();

    return {
      rows: data.users,
      totalRows: data.total,
    };
  } catch (error) {
    throw new Error('Failed to fetch data');
  }
};
```

## Event Handlers

### Row Events
```jsx
<QTODataGrid
  onRowClick={(params) => console.log('Row clicked:', params.row)}
  onRowDoubleClick={(params) => editItem(params.row)}
  onCellClick={(params) => console.log('Cell clicked:', params)}
  onSelectionModelChange={(selectionModel) => setSelectedRows(selectionModel)}
/>
```

### Action Events
```jsx
const handleRowAction = (action, row) => {
  switch (action.key) {
    case 'edit':
      openEditDialog(row);
      break;
    case 'delete':
      deleteItem(row.id);
      break;
    case 'view':
      navigate(`/users/${row.id}`);
      break;
  }
};

const handleBulkAction = (action, selectedRows) => {
  switch (action.key) {
    case 'export':
      exportItems(selectedRows);
      break;
    case 'delete':
      bulkDeleteItems(selectedRows);
      break;
  }
};
```

## Performance Optimization

### Large Datasets
```jsx
<QTODataGrid
  data={data}
  columns={columns}
  // Enable virtualization automatically for large datasets
  rowsPerPageOptions={[25, 50, 100]}
  // Use server-side for very large datasets
  serverSide={data.length > 1000}
/>
```

### Memory Management
```jsx
// Use React.memo for column definitions
const columns = React.useMemo(() => [
  { field: 'id', headerName: 'ID' },
  // ... other columns
], []);

// Optimize renders with useCallback
const handleRowAction = useCallback((action, row) => {
  // Action handler logic
}, []);
```

## Styling and Customization

### Custom Styling
```jsx
<QTODataGrid
  sx={{
    '& .custom-header': {
      backgroundColor: 'var(--color-primary)',
      color: 'white',
    },
    '& .custom-cell': {
      fontWeight: 'bold',
    },
  }}
/>
```

### Theme Integration
The DataGrid automatically inherits QTO theme variables:

- Colors from CSS custom properties
- Typography from theme configuration
- Spacing and border radius from design tokens
- Dark/light mode support

## Best Practices

1. **Column Configuration**
   - Set appropriate widths and flex values
   - Use meaningful header names
   - Implement proper sorting for custom data types

2. **Performance**
   - Use server-side operations for large datasets
   - Implement pagination appropriately
   - Optimize column renderers

3. **User Experience**
   - Provide loading states
   - Handle errors gracefully
   - Include helpful tooltips for actions

4. **Accessibility**
   - Use semantic column headers
   - Provide ARIA labels for actions
   - Ensure keyboard navigation works

5. **Responsive Design**
   - Test on mobile devices
   - Consider column priority for small screens
   - Use appropriate density settings

## Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## Dependencies

```json
{
  "@mui/x-data-grid": "^6.0.0",
  "@mui/material": "^5.0.0",
  "@emotion/react": "^11.0.0",
  "@emotion/styled": "^11.0.0",
  "@mui/icons-material": "^5.0.0"
}
```

## Migration from Custom Tables

If migrating from the custom table components, the MUI DataGrid provides significantly more features out of the box. Key differences:

- **More Built-in Features**: Sorting, filtering, export, column management
- **Better Performance**: Virtualization and optimized rendering
- **Enhanced Accessibility**: WCAG compliance and keyboard navigation
- **Professional UI**: Polished interface with consistent interactions

The QTO theme integration ensures visual consistency while providing enterprise-grade functionality.
