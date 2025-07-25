import React, { useState, useMemo } from 'react';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Business as BusinessIcon,
  Add as AddIcon,
  Upload as UploadIcon,
  Download as DownloadIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material';
import { Avatar, Chip, Box, Typography } from '@mui/material';
import DataGrid from '../components/DataGrid';

// Sample data generators
const generateUserData = (count = 100) => {
  const departments = ['Engineering', 'Marketing', 'Sales', 'HR', 'Finance', 'Design'];
  const roles = ['Manager', 'Senior', 'Junior', 'Lead', 'Director'];
  const statuses = ['active', 'inactive', 'pending'];
  
  return Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    name: `User ${index + 1}`,
    email: `user${index + 1}@example.com`,
    phone: `+1 (555) ${String(Math.floor(Math.random() * 900) + 100)} ${String(Math.floor(Math.random() * 9000) + 1000)}`,
    department: departments[Math.floor(Math.random() * departments.length)],
    role: roles[Math.floor(Math.random() * roles.length)],
    status: statuses[Math.floor(Math.random() * statuses.length)],
    salary: Math.floor(Math.random() * 100000) + 40000,
    joinDate: new Date(2020 + Math.floor(Math.random() * 4), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1),
    lastLogin: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000),
    avatar: `https://api.dicebear.com/7.x/initials/svg?seed=User${index + 1}`,
  }));
};

const generateProductData = (count = 50) => {
  const categories = ['Electronics', 'Clothing', 'Books', 'Home', 'Sports'];
  const statuses = ['in_stock', 'out_of_stock', 'discontinued'];
  
  return Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    name: `Product ${index + 1}`,
    sku: `SKU${String(index + 1).padStart(4, '0')}`,
    category: categories[Math.floor(Math.random() * categories.length)],
    price: Math.floor(Math.random() * 500) + 10,
    stock: Math.floor(Math.random() * 100),
    status: statuses[Math.floor(Math.random() * statuses.length)],
    rating: (Math.random() * 5).toFixed(1),
    createdAt: new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1),
  }));
};

// Column definitions
const userColumns = [
  {
    field: 'avatar',
    headerName: 'Avatar',
    width: 80,
    sortable: false,
    filterable: false,
    renderCell: (params) => (
      <Avatar
        src={params.value}
        alt={params.row.name}
        sx={{ width: 32, height: 32 }}
      >
        <PersonIcon />
      </Avatar>
    ),
  },
  {
    field: 'name',
    headerName: 'Name',
    width: 150,
    flex: 1,
  },
  {
    field: 'email',
    headerName: 'Email',
    width: 200,
    flex: 1,
    renderCell: (params) => (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <EmailIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
        <Typography variant="body2">{params.value}</Typography>
      </Box>
    ),
  },
  {
    field: 'phone',
    headerName: 'Phone',
    width: 150,
    renderCell: (params) => (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <PhoneIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
        <Typography variant="body2">{params.value}</Typography>
      </Box>
    ),
  },
  {
    field: 'department',
    headerName: 'Department',
    width: 120,
    renderCell: (params) => (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <BusinessIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
        <Typography variant="body2">{params.value}</Typography>
      </Box>
    ),
  },
  {
    field: 'role',
    headerName: 'Role',
    width: 100,
    renderCell: (params) => (
      <Chip
        label={params.value}
        size="small"
        variant="outlined"
        color={params.value === 'Manager' ? 'primary' : 'default'}
      />
    ),
  },
  {
    field: 'status',
    headerName: 'Status',
    width: 100,
    type: 'status',
    renderCell: (params) => (
      <Chip
        label={params.value}
        size="small"
        color={
          params.value === 'active' ? 'success' :
          params.value === 'inactive' ? 'error' : 'warning'
        }
      />
    ),
  },
  {
    field: 'salary',
    headerName: 'Salary',
    width: 120,
    type: 'number',
    valueFormatter: (params) => `$${params.value?.toLocaleString() || 0}`,
  },
  {
    field: 'joinDate',
    headerName: 'Join Date',
    width: 120,
    type: 'date',
    valueFormatter: (params) => params.value?.toLocaleDateString() || '',
  },
  {
    field: 'lastLogin',
    headerName: 'Last Login',
    width: 150,
    type: 'dateTime',
    valueFormatter: (params) => params.value?.toLocaleString() || '',
  },
];

const productColumns = [
  {
    field: 'id',
    headerName: 'ID',
    width: 70,
  },
  {
    field: 'name',
    headerName: 'Product Name',
    width: 200,
    flex: 1,
  },
  {
    field: 'sku',
    headerName: 'SKU',
    width: 120,
  },
  {
    field: 'category',
    headerName: 'Category',
    width: 120,
  },
  {
    field: 'price',
    headerName: 'Price',
    width: 100,
    type: 'number',
    valueFormatter: (params) => `$${params.value}`,
  },
  {
    field: 'stock',
    headerName: 'Stock',
    width: 100,
    type: 'number',
  },
  {
    field: 'status',
    headerName: 'Status',
    width: 120,
    type: 'status',
    renderCell: (params) => (
      <Chip
        label={params.value.replace('_', ' ')}
        size="small"
        color={
          params.value === 'in_stock' ? 'success' :
          params.value === 'out_of_stock' ? 'error' : 'warning'
        }
      />
    ),
  },
  {
    field: 'rating',
    headerName: 'Rating',
    width: 100,
    type: 'number',
    renderCell: (params) => (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
        <Typography variant="body2">{params.value}</Typography>
        <Typography variant="body2" color="warning.main">★</Typography>
      </Box>
    ),
  },
  {
    field: 'createdAt',
    headerName: 'Created',
    width: 120,
    type: 'date',
    valueFormatter: (params) => params.value?.toLocaleDateString() || '',
  },
];

// Status configurations
const statusConfig = {
  active: { color: 'success', label: 'Active' },
  inactive: { color: 'error', label: 'Inactive' },
  pending: { color: 'warning', label: 'Pending' },
  in_stock: { color: 'success', label: 'In Stock' },
  out_of_stock: { color: 'error', label: 'Out of Stock' },
  discontinued: { color: 'warning', label: 'Discontinued' },
};

const MuiDataGridExample = () => {
  const [activeExample, setActiveExample] = useState('basic');
  const [userData] = useState(() => generateUserData(100));
  const [productData] = useState(() => generateProductData(50));

  // Action handlers
  const handleRowAction = (action, row) => {
    console.log('Row action:', action.key, row);
    alert(`${action.label} action on: ${row.name || row.title || `Item ${row.id}`}`);
  };

  const handleBulkAction = (action, selectedRows) => {
    console.log('Bulk action:', action.key, selectedRows);
    alert(`${action.label} action on ${selectedRows.length} items`);
  };

  // Server-side data fetch simulation
  const fetchServerData = async ({ page, pageSize, sortModel, filterModel }) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    let data = [...userData];
    
    // Apply filters
    if (filterModel.items.length > 0) {
      filterModel.items.forEach(filter => {
        if (filter.value) {
          data = data.filter(row => {
            const value = row[filter.field];
            if (typeof value === 'string') {
              return value.toLowerCase().includes(filter.value.toLowerCase());
            }
            return String(value).includes(filter.value);
          });
        }
      });
    }
    
    // Apply sorting
    if (sortModel.length > 0) {
      const sort = sortModel[0];
      data.sort((a, b) => {
        const aValue = a[sort.field];
        const bValue = b[sort.field];
        
        if (aValue < bValue) return sort.sort === 'asc' ? -1 : 1;
        if (aValue > bValue) return sort.sort === 'asc' ? 1 : -1;
        return 0;
      });
    }
    
    // Apply pagination
    const startIndex = page * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedData = data.slice(startIndex, endIndex);
    
    return {
      rows: paginatedData,
      totalRows: data.length,
    };
  };

  // Row actions
  const userActions = [
    {
      key: 'view',
      label: 'View',
      icon: <ViewIcon />,
      color: 'primary',
      tooltip: 'View user details',
    },
    {
      key: 'edit',
      label: 'Edit',
      icon: <EditIcon />,
      color: 'primary',
      tooltip: 'Edit user',
    },
    {
      key: 'delete',
      label: 'Delete',
      icon: <DeleteIcon />,
      color: 'error',
      tooltip: 'Delete user',
      requiresConfirmation: true,
    },
  ];

  // Bulk actions
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
      label: 'Delete',
      icon: <DeleteIcon />,
      variant: 'contained',
      color: 'error',
      tooltip: 'Delete selected items',
      requiresConfirmation: true,
    },
  ];

  // Toolbar actions
  const toolbarActions = [
    {
      label: 'Add User',
      icon: <AddIcon />,
      onClick: () => alert('Add new user'),
      variant: 'contained',
      color: 'primary',
      tooltip: 'Add new user',
    },
    {
      label: 'Import',
      icon: <UploadIcon />,
      onClick: () => alert('Import users'),
      variant: 'outlined',
      tooltip: 'Import users from file',
    },
    {
      label: 'Refresh',
      icon: <RefreshIcon />,
      onClick: () => alert('Refresh data'),
      variant: 'outlined',
      tooltip: 'Refresh data',
    },
  ];

  const examples = [
    { key: 'basic', label: 'Basic DataGrid' },
    { key: 'actions', label: 'With Actions' },
    { key: 'server', label: 'Server-Side' },
    { key: 'products', label: 'Products Example' },
    { key: 'advanced', label: 'Advanced Features' },
  ];

  const renderExample = () => {
    switch (activeExample) {
      case 'basic':
        return (
          <DataGrid
            data={userData.slice(0, 20)}
            columns={userColumns}
            title="User Management"
            subtitle="Basic DataGrid with pagination and sorting"
            pageSize={10}
            checkboxSelection
            customToolbarActions={toolbarActions}
            statusConfig={statusConfig}
          />
        );

      case 'actions':
        return (
          <DataGrid
            data={userData.slice(0, 20)}
            columns={userColumns}
            title="User Management with Actions"
            subtitle="DataGrid with row and bulk actions"
            pageSize={10}
            rowActions={userActions}
            onRowAction={handleRowAction}
            checkboxSelection={true}
            height={500}
            statusConfig={statusConfig}
          />
        );

      case 'server':
        return (
          <DataGrid
            data={userData.slice(0, 15)}
            columns={userColumns}
            title="Server-Side DataGrid"
            subtitle="DataGrid with server-side pagination, sorting, and filtering"
            serverSide={true}
            rowCount={userData.length}
            pageSize={15}
            statusConfig={statusConfig}
          />
        );

      case 'products':
        return (
          <DataGrid
            data={productData}
            columns={productColumns}
            title="Product Inventory"
            subtitle="Product management with different data types"
            pageSize={15}
            checkboxSelection
            density="comfortable"
            customToolbarActions={[
              {
                label: 'Add Product',
                icon: <AddIcon />,
                onClick: () => alert('Add new product'),
                variant: 'contained',
                color: 'primary',
              },
              {
                label: 'Export Inventory',
                icon: <DownloadIcon />,
                onClick: () => alert('Export inventory'),
                variant: 'outlined',
              },
            ]}
            statusConfig={statusConfig}
          />
        );

      case 'advanced':
        return (
          <DataGrid
            data={userData}
            columns={userColumns}
            title="Advanced DataGrid Features"
            subtitle="All features enabled: filtering, sorting, export, etc."
            pageSize={20}
            checkboxSelection
            density="compact"
            autoHeight={false}
            height={700}
            customToolbarActions={toolbarActions}
            statusConfig={statusConfig}
            initialState={{
              sorting: {
                sortModel: [{ field: 'name', sort: 'asc' }],
              },
              filter: {
                filterModel: {
                  items: [],
                  quickFilterValues: [''],
                },
              },
            }}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="mui-datagrid-example">
      <div className="example-header">
        <h2>MUI DataGrid Examples</h2>
        <p>Comprehensive examples showcasing MUI DataGrid integration with QTO theme system.</p>
      </div>

      <div className="example-tabs">
        {examples.map(example => (
          <button
            key={example.key}
            onClick={() => setActiveExample(example.key)}
            className={`example-tab ${activeExample === example.key ? 'example-tab--active' : ''}`}
          >
            {example.label}
          </button>
        ))}
      </div>

      <div className="example-content">
        {renderExample()}
      </div>
    </div>
  );
};

export default MuiDataGridExample;
