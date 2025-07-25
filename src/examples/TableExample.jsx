import React, { useState } from 'react';
import Table from '../components/Table';
import Button from '../components/Button';
import Badge from '../components/Badge';
import Avatar from '../components/Avatar';
import './ComponentShowcase.css';

const TableExample = () => {
  const [activeTab, setActiveTab] = useState('basic');

  // Sample data for all table examples
  const sampleData = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      role: 'Admin',
      status: 'Active',
      department: 'Engineering',
      salary: 75000,
      joinDate: '2023-01-15',
      lastLogin: '2024-07-20',
      children: [
        { id: 11, name: 'John Doe - Project A', role: 'Lead', status: 'Active' },
        { id: 12, name: 'John Doe - Project B', role: 'Member', status: 'Active' }
      ]
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      role: 'Manager',
      status: 'Active',
      department: 'Marketing',
      salary: 82000,
      joinDate: '2022-11-08',
      lastLogin: '2024-07-19',
      children: [
        { id: 21, name: 'Jane Smith - Campaign X', role: 'Lead', status: 'Inactive' }
      ]
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike.johnson@example.com',
      role: 'Developer',
      status: 'Inactive',
      department: 'Engineering',
      salary: 68000,
      joinDate: '2023-03-22',
      lastLogin: '2024-07-18',
      children: []
    },
    {
      id: 4,
      name: 'Sarah Wilson',
      email: 'sarah.wilson@example.com',
      role: 'Designer',
      status: 'Active',
      department: 'Design',
      salary: 65000,
      joinDate: '2023-05-10',
      lastLogin: '2024-07-21',
      children: [
        { id: 41, name: 'Sarah Wilson - UI Kit', role: 'Lead', status: 'Active' },
        { id: 42, name: 'Sarah Wilson - Brand Guide', role: 'Lead', status: 'Active' },
        { id: 43, name: 'Sarah Wilson - Website', role: 'Member', status: 'Inactive' }
      ]
    },
    {
      id: 5,
      name: 'David Brown',
      email: 'david.brown@example.com',
      role: 'Analyst',
      status: 'Active',
      department: 'Finance',
      salary: 71000,
      joinDate: '2022-09-14',
      lastLogin: '2024-07-22',
      children: []
    }
  ];

  const baseColumns = [
    {
      key: 'name',
      label: 'Name',
      render: (value, row) => (
        <div className="table-example__user">
          <Avatar
            src={`https://api.dicebear.com/7.x/initials/svg?seed=${value}`}
            alt={value}
            size="sm"
          />
          <span>{value}</span>
        </div>
      )
    },
    {
      key: 'email',
      label: 'Email'
    },
    {
      key: 'role',
      label: 'Role',
      render: (value) => (
        <Badge 
          variant={value === 'Admin' ? 'danger' : value === 'Manager' ? 'warning' : 'primary'}
        >
          {value}
        </Badge>
      )
    },
    {
      key: 'department',
      label: 'Department'
    },
    {
      key: 'status',
      label: 'Status',
      render: (value) => (
        <Badge variant={value === 'Active' ? 'success' : 'secondary'}>
          {value}
        </Badge>
      )
    },
    {
      key: 'salary',
      label: 'Salary',
      render: (value) => `$${value.toLocaleString()}`
    },
    {
      key: 'joinDate',
      label: 'Join Date',
      render: (value) => new Date(value).toLocaleDateString()
    }
  ];

  const handleRowAction = (action, row, index) => {
    console.log(`Action: ${action.key}`, row, index);
    
    switch (action.key) {
      case 'edit':
        alert(`Editing ${row.name}`);
        break;
      case 'delete':
        alert(`Deleting ${row.name}`);
        break;
      case 'view':
        alert(`Viewing details for ${row.name}`);
        break;
      default:
        break;
    }
  };

  const handleBulkAction = (action, selectedRows) => {
    console.log(`Bulk action: ${action.key}`, selectedRows);
    
    switch (action.key) {
      case 'bulkDelete':
        alert(`Deleting ${selectedRows.length} users`);
        break;
      case 'bulkExport':
        alert(`Exporting ${selectedRows.length} users`);
        break;
      case 'bulkDeactivate':
        alert(`Deactivating ${selectedRows.length} users`);
        break;
      default:
        break;
    }
  };

  const rowActions = [
    {
      key: 'view',
      label: 'View',
      icon: '👁️',
      variant: 'ghost'
    },
    {
      key: 'edit',
      label: 'Edit',
      icon: '✏️',
      variant: 'outline'
    },
    {
      key: 'delete',
      label: 'Delete',
      icon: '🗑️',
      variant: 'danger',
      dangerAction: true,
      confirmMessage: 'Are you sure you want to delete this user? This action cannot be undone.',
      disabled: (row) => row.role === 'Admin'
    }
  ];

  const bulkActions = [
    {
      key: 'bulkExport',
      label: 'Export',
      icon: '📊',
      variant: 'outline'
    },
    {
      key: 'bulkDeactivate',
      label: 'Deactivate',
      icon: '⏸️',
      variant: 'outline'
    },
    {
      key: 'bulkDelete',
      label: 'Delete',
      icon: '🗑️',
      variant: 'danger',
      dangerAction: true,
      confirmMessage: 'Are you sure you want to delete the selected users?'
    }
  ];

  const quickFilters = [
    {
      key: 'department',
      label: 'Department',
      type: 'select',
      options: [
        { value: '', label: 'All Departments' },
        { value: 'Engineering', label: 'Engineering' },
        { value: 'Marketing', label: 'Marketing' },
        { value: 'Design', label: 'Design' },
        { value: 'Finance', label: 'Finance' }
      ]
    },
    {
      key: 'status',
      label: 'Status',
      type: 'select',
      options: [
        { value: '', label: 'All Statuses' },
        { value: 'Active', label: 'Active' },
        { value: 'Inactive', label: 'Inactive' }
      ]
    }
  ];

  const advancedSearchFields = [
    {
      key: 'role',
      label: 'Role',
      type: 'select',
      options: [
        { value: '', label: 'All Roles' },
        { value: 'Admin', label: 'Admin' },
        { value: 'Manager', label: 'Manager' },
        { value: 'Developer', label: 'Developer' },
        { value: 'Designer', label: 'Designer' },
        { value: 'Analyst', label: 'Analyst' }
      ]
    },
    {
      key: 'salary',
      label: 'Salary Range',
      type: 'range',
      placeholder: 'Enter salary range'
    },
    {
      key: 'joinDate',
      label: 'Join Date',
      type: 'date'
    }
  ];

  const expandedRowRender = (row) => (
    <div className="table-example__expanded-content">
      <div className="table-example__details-grid">
        <div className="table-example__detail-item">
          <label>Employee ID:</label>
          <span>{row.id}</span>
        </div>
        <div className="table-example__detail-item">
          <label>Last Login:</label>
          <span>{new Date(row.lastLogin).toLocaleString()}</span>
        </div>
        <div className="table-example__detail-item">
          <label>Full Email:</label>
          <span>{row.email}</span>
        </div>
        <div className="table-example__detail-item">
          <label>Department:</label>
          <span>{row.department}</span>
        </div>
      </div>
      
      <div className="table-example__actions">
        <Button size="sm" variant="outline">View Profile</Button>
        <Button size="sm" variant="outline">Edit Details</Button>
        <Button size="sm" variant="outline">Send Message</Button>
      </div>
    </div>
  );

  const tabs = [
    { key: 'basic', label: 'Basic Table' },
    { key: 'actions', label: 'With Actions' },
    { key: 'searchable', label: 'Searchable' },
    { key: 'sortable', label: 'Sortable' },
    { key: 'expandable', label: 'Expandable' },
    { key: 'combined', label: 'All Features' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'basic':
        return (
          <div className="table-example__section">
            <h3>Basic Table</h3>
            <p>Simple table with pagination, responsive design, and loading states.</p>
            <Table
              data={sampleData}
              columns={baseColumns}
              pagination={true}
              pageSize={5}
              selectable={true}
              onRowSelect={(selectedRows) => console.log('Selected rows:', selectedRows)}
            />
          </div>
        );

      case 'actions':
        return (
          <div className="table-example__section">
            <h3>Table with Actions</h3>
            <p>Table with row actions, bulk actions, and confirmation dialogs.</p>
            <TableWithActions
              data={sampleData}
              columns={baseColumns}
              actions={rowActions}
              bulkActions={bulkActions}
              onRowAction={handleRowAction}
              onBulkAction={handleBulkAction}
              confirmActions={['delete', 'bulkDelete']}
              pagination={true}
              pageSize={5}
            />
          </div>
        );

      case 'searchable':
        return (
          <div className="table-example__section">
            <h3>Searchable Table</h3>
            <p>Table with global search, quick filters, and advanced search options.</p>
            <SearchableTable
              data={sampleData}
              columns={baseColumns}
              searchPlaceholder="Search users..."
              showQuickFilters={true}
              quickFilters={quickFilters}
              showAdvancedSearch={true}
              advancedSearchFields={advancedSearchFields}
              pagination={true}
              pageSize={5}
              onSearch={(term, results) => console.log('Search:', term, results)}
              onFilter={(filters, results) => console.log('Filter:', filters, results)}
            />
          </div>
        );

      case 'sortable':
        return (
          <div className="table-example__section">
            <h3>Sortable Table</h3>
            <p>Table with single and multi-column sorting capabilities.</p>
            <SortableTable
              data={sampleData}
              columns={baseColumns}
              defaultSort={{ key: 'name', direction: 'asc' }}
              multiSort={false}
              pagination={true}
              pageSize={5}
              onSort={(sortConfig) => console.log('Sort config:', sortConfig)}
            />
            
            <h4 style={{ marginTop: '2rem' }}>Multi-Column Sorting</h4>
            <SortableTable
              data={sampleData}
              columns={baseColumns}
              multiSort={true}
              pagination={true}
              pageSize={5}
              onSort={(sortConfig) => console.log('Multi-sort config:', sortConfig)}
            />
          </div>
        );

      case 'expandable':
        return (
          <div className="table-example__section">
            <h3>Expandable Table</h3>
            <p>Table with expandable rows and nested data support.</p>
            
            <h4>With Custom Expanded Content</h4>
            <ExpandableTable
              data={sampleData}
              columns={baseColumns.slice(0, 4)} // Reduced columns for better display
              expandedRowRender={expandedRowRender}
              pagination={true}
              pageSize={3}
              onRowExpand={(row) => console.log('Expanded:', row)}
              onRowCollapse={(row) => console.log('Collapsed:', row)}
            />
            
            <h4 style={{ marginTop: '2rem' }}>With Nested Data</h4>
            <ExpandableTable
              data={sampleData}
              columns={[
                {
                  key: 'name',
                  label: 'Name/Project',
                  render: (value, row) => (
                    <div className="table-example__user">
                      {!row.__isNestedRow && (
                        <Avatar
                          src={`https://api.dicebear.com/7.x/initials/svg?seed=${value}`}
                          alt={value}
                          size="sm"
                        />
                      )}
                      <span>{value}</span>
                    </div>
                  )
                },
                {
                  key: 'role',
                  label: 'Role',
                  render: (value) => (
                    <Badge 
                      variant={value === 'Admin' ? 'danger' : value === 'Manager' ? 'warning' : 'primary'}
                    >
                      {value}
                    </Badge>
                  )
                },
                {
                  key: 'status',
                  label: 'Status',
                  render: (value) => (
                    <Badge variant={value === 'Active' ? 'success' : 'secondary'}>
                      {value}
                    </Badge>
                  )
                }
              ]}
              nestedData={true}
              nestedKey="children"
              pagination={true}
              pageSize={3}
            />
          </div>
        );

      case 'combined':
        return (
          <div className="table-example__section">
            <h3>All Features Combined</h3>
            <p>Table with searching, sorting, actions, and expandable rows all together.</p>
            <SearchableTable
              data={sampleData}
              columns={baseColumns}
              searchPlaceholder="Search users..."
              showQuickFilters={true}
              quickFilters={quickFilters}
              showAdvancedSearch={true}
              advancedSearchFields={advancedSearchFields}
              pagination={true}
              pageSize={3}
              sortable={true}
              onSearch={(term, results) => console.log('Search:', term, results)}
              onFilter={(filters, results) => console.log('Filter:', filters, results)}
              actions={
                <TableWithActions
                  data={sampleData}
                  columns={baseColumns}
                  actions={rowActions}
                  bulkActions={bulkActions}
                  onRowAction={handleRowAction}
                  onBulkAction={handleBulkAction}
                  confirmActions={['delete', 'bulkDelete']}
                  pagination={false} // Already handled by SearchableTable
                />
              }
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="table-example">
      <div className="table-example__header">
        <h2>Table Components Examples</h2>
        <p>Comprehensive table components with various features and use cases.</p>
      </div>

      <div className="table-example__tabs">
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`table-example__tab ${activeTab === tab.key ? 'table-example__tab--active' : ''}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="table-example__content">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default TableExample;
