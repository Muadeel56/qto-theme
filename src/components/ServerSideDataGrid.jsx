import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import DataGrid from './DataGrid';

const ServerSideDataGrid = ({
  fetchData,
  totalRows = 0,
  initialPageSize = 25,
  initialSortModel = [],
  initialFilterModel = { items: [] },
  debounceDelay = 500,
  ...props
}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [rowCount, setRowCount] = useState(totalRows);
  
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: initialPageSize,
  });
  const [sortModel, setSortModel] = useState(initialSortModel);
  const [filterModel, setFilterModel] = useState(initialFilterModel);

  // Debounced fetch function
  const [fetchTimeout, setFetchTimeout] = useState(null);

  const fetchDataWithParams = useCallback(async (params) => {
    setLoading(true);
    setError(null);

    try {
      const result = await fetchData({
        page: params.page,
        pageSize: params.pageSize,
        sortModel: params.sortModel,
        filterModel: params.filterModel,
      });

      setData(result.rows || []);
      setRowCount(result.totalRows || 0);
    } catch (err) {
      setError(err);
      console.error('Failed to fetch data:', err);
    } finally {
      setLoading(false);
    }
  }, [fetchData]);

  // Debounced fetch to avoid too many API calls
  const debouncedFetch = useCallback((params) => {
    if (fetchTimeout) {
      clearTimeout(fetchTimeout);
    }

    const timeout = setTimeout(() => {
      fetchDataWithParams(params);
    }, debounceDelay);

    setFetchTimeout(timeout);
  }, [fetchDataWithParams, debounceDelay, fetchTimeout]);

  // Initial data fetch
  useEffect(() => {
    fetchDataWithParams({
      page: paginationModel.page,
      pageSize: paginationModel.pageSize,
      sortModel,
      filterModel,
    });
  }, []); // Only run on mount

  // Handle pagination changes
  const handlePaginationModelChange = useCallback((newModel) => {
    setPaginationModel(newModel);
    
    // Immediate fetch for pagination (no debounce)
    fetchDataWithParams({
      page: newModel.page,
      pageSize: newModel.pageSize,
      sortModel,
      filterModel,
    });
  }, [fetchDataWithParams, sortModel, filterModel]);

  // Handle sort changes
  const handleSortModelChange = useCallback((newModel) => {
    setSortModel(newModel);
    
    // Reset to first page when sorting changes
    const newPaginationModel = { ...paginationModel, page: 0 };
    setPaginationModel(newPaginationModel);
    
    // Debounced fetch for sorting
    debouncedFetch({
      page: 0,
      pageSize: paginationModel.pageSize,
      sortModel: newModel,
      filterModel,
    });
  }, [debouncedFetch, paginationModel.pageSize, filterModel]);

  // Handle filter changes
  const handleFilterModelChange = useCallback((newModel) => {
    setFilterModel(newModel);
    
    // Reset to first page when filters change
    const newPaginationModel = { ...paginationModel, page: 0 };
    setPaginationModel(newPaginationModel);
    
    // Debounced fetch for filtering
    debouncedFetch({
      page: 0,
      pageSize: paginationModel.pageSize,
      sortModel,
      filterModel: newModel,
    });
  }, [debouncedFetch, paginationModel.pageSize, sortModel]);

  // Refresh data function
  const refreshData = useCallback(() => {
    fetchDataWithParams({
      page: paginationModel.page,
      pageSize: paginationModel.pageSize,
      sortModel,
      filterModel,
    });
  }, [fetchDataWithParams, paginationModel, sortModel, filterModel]);

  // Custom toolbar actions with refresh
  const customToolbarActions = [
    {
      label: 'Refresh',
      icon: '🔄',
      onClick: refreshData,
      variant: 'outlined',
      tooltip: 'Refresh data',
    },
    ...(props.customToolbarActions || []),
  ];

  return (
    <DataGrid
      {...props}
      data={data}
      loading={loading}
      error={error}
      
      // Server-side configuration
      serverSide={true}
      rowCount={rowCount}
      
      // Pagination
      paginationModel={paginationModel}
      onPaginationModelChange={handlePaginationModelChange}
      
      // Sorting
      sortModel={sortModel}
      onSortModelChange={handleSortModelChange}
      
      // Filtering
      filterModel={filterModel}
      onFilterModelChange={handleFilterModelChange}
      
      // Custom toolbar actions
      customToolbarActions={customToolbarActions}
    />
  );
};

ServerSideDataGrid.propTypes = {
  fetchData: PropTypes.func.isRequired,
  totalRows: PropTypes.number,
  initialPageSize: PropTypes.number,
  initialSortModel: PropTypes.array,
  initialFilterModel: PropTypes.object,
  debounceDelay: PropTypes.number,
  customToolbarActions: PropTypes.array,
};

export default ServerSideDataGrid;
