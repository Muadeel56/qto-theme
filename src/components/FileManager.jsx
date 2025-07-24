import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { 
  Upload, 
  Download, 
  Trash2, 
  Folder, 
  Search,
  Filter,
  Grid,
  List,
  RefreshCw,
  Plus
} from 'lucide-react';
import Button from './Button';
import Input from './Input';
import Select from './Select';
import FileUpload from './FileUpload';
import FileDisplay from './FileDisplay';
import FileDownload from './FileDownload';
import '../styles/file-manager.css';

/**
 * FileManager Component - Complete file management solution
 */
const FileManager = ({
  files = [],
  onUpload,
  onDownload,
  onDelete,
  onRefresh,
  onCreateFolder,
  uploadConfig = {},
  displayConfig = {},
  searchable = true,
  filterable = true,
  bulkActions = true,
  className = '',
  title = 'File Manager',
  subtitle,
  loading = false,
  error,
  ...props
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [layout, setLayout] = useState('grid');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [showUpload, setShowUpload] = useState(false);

  // Filter options
  const filterOptions = [
    { value: 'all', label: 'All Files' },
    { value: 'image', label: 'Images' },
    { value: 'video', label: 'Videos' },
    { value: 'audio', label: 'Audio' },
    { value: 'document', label: 'Documents' },
    { value: 'archive', label: 'Archives' },
  ];

  // Get file type for filtering
  const getFileType = (file) => {
    if (!file.type && !file.name) return 'file';
    
    const mimeType = file.type || '';
    const extension = file.name?.split('.').pop()?.toLowerCase() || '';
    
    if (mimeType.startsWith('image/') || ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(extension)) {
      return 'image';
    }
    if (mimeType.startsWith('video/') || ['mp4', 'avi', 'mov', 'wmv', 'flv', 'webm'].includes(extension)) {
      return 'video';
    }
    if (mimeType.startsWith('audio/') || ['mp3', 'wav', 'ogg', 'aac', 'flac'].includes(extension)) {
      return 'audio';
    }
    if (mimeType.includes('text') || mimeType.includes('document') || ['txt', 'doc', 'docx', 'pdf', 'rtf'].includes(extension)) {
      return 'document';
    }
    if (['zip', 'rar', '7z', 'tar', 'gz'].includes(extension)) {
      return 'archive';
    }
    
    return 'file';
  };

  // Filter and search files
  const filteredFiles = files.filter(file => {
    // Search filter
    const matchesSearch = !searchTerm || 
      file.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Type filter
    const matchesType = filterType === 'all' || 
      getFileType(file) === filterType;
    
    return matchesSearch && matchesType;
  });

  // Handle file upload
  const handleFileUpload = useCallback(async (uploadedFiles) => {
    try {
      if (onUpload) {
        await onUpload(uploadedFiles);
      }
      setShowUpload(false);
    } catch (error) {
      console.error('Upload failed:', error);
    }
  }, [onUpload]);

  // Handle file selection
  const handleFileSelect = useCallback((fileIds, selectedFileObjects) => {
    setSelectedFiles(selectedFileObjects);
  }, []);

  // Handle bulk delete
  const handleBulkDelete = useCallback(async () => {
    if (selectedFiles.length === 0) return;
    
    const confirmed = window.confirm(
      `Are you sure you want to delete ${selectedFiles.length} file(s)?`
    );
    
    if (confirmed && onDelete) {
      try {
        await onDelete(selectedFiles);
        setSelectedFiles([]);
      } catch (error) {
        console.error('Delete failed:', error);
      }
    }
  }, [selectedFiles, onDelete]);

  // Handle bulk download
  const handleBulkDownload = useCallback(async () => {
    if (selectedFiles.length === 0) return;
    
    for (const file of selectedFiles) {
      if (file.url) {
        const link = document.createElement('a');
        link.href = file.url;
        link.download = file.name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        // Add small delay to prevent browser blocking
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    }
  }, [selectedFiles]);

  // Handle individual file actions
  const handleFileAction = useCallback((action, file) => {
    switch (action) {
      case 'delete':
        if (window.confirm(`Are you sure you want to delete "${file.name}"?`)) {
          onDelete?.([file]);
        }
        break;
      case 'rename':
        const newName = prompt('Enter new name:', file.name);
        if (newName && newName !== file.name) {
          // Handle rename action
          console.log('Rename', file.name, 'to', newName);
        }
        break;
      default:
        console.log('Action:', action, 'File:', file);
    }
  }, [onDelete]);

  // Custom file actions
  const fileActions = [
    {
      key: 'rename',
      label: 'Rename',
      icon: <Plus size={16} />,
    },
    {
      key: 'delete',
      label: 'Delete',
      icon: <Trash2 size={16} />,
      disabled: (file) => file.protected,
    },
  ];

  return (
    <div className={`qto-file-manager ${className}`} {...props}>
      {/* Header */}
      <div className="qto-file-manager__header">
        <div className="qto-file-manager__title">
          <h2>{title}</h2>
          {subtitle && <p>{subtitle}</p>}
        </div>
        
        <div className="qto-file-manager__actions">
          {onCreateFolder && (
            <Button
              variant="outline"
              size="sm"
              onClick={onCreateFolder}
              startIcon={<Folder size={16} />}
            >
              New Folder
            </Button>
          )}
          
          <Button
            variant="primary"
            size="sm"
            onClick={() => setShowUpload(true)}
            startIcon={<Upload size={16} />}
          >
            Upload Files
          </Button>
          
          {onRefresh && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onRefresh}
              disabled={loading}
              startIcon={<RefreshCw size={16} className={loading ? 'animate-spin' : ''} />}
            >
              Refresh
            </Button>
          )}
        </div>
      </div>

      {/* Toolbar */}
      <div className="qto-file-manager__toolbar">
        <div className="qto-file-manager__search-filters">
          {searchable && (
            <Input
              placeholder="Search files..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              startIcon={<Search size={16} />}
              className="qto-file-manager__search"
            />
          )}
          
          {filterable && (
            <Select
              options={filterOptions}
              value={filterType}
              onChange={setFilterType}
              placeholder="Filter by type"
              className="qto-file-manager__filter"
            />
          )}
        </div>
        
        <div className="qto-file-manager__view-controls">
          {bulkActions && selectedFiles.length > 0 && (
            <div className="qto-file-manager__bulk-actions">
              <span className="qto-file-manager__selection-count">
                {selectedFiles.length} selected
              </span>
              
              <Button
                variant="outline"
                size="sm"
                onClick={handleBulkDownload}
                startIcon={<Download size={16} />}
              >
                Download
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={handleBulkDelete}
                startIcon={<Trash2 size={16} />}
              >
                Delete
              </Button>
            </div>
          )}
          
          <div className="qto-file-manager__layout-controls">
            <Button
              variant={layout === 'grid' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setLayout('grid')}
              title="Grid view"
            >
              <Grid size={16} />
            </Button>
            
            <Button
              variant={layout === 'list' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setLayout('list')}
              title="List view"
            >
              <List size={16} />
            </Button>
          </div>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="qto-file-manager__error">
          <p>{error.message || 'An error occurred'}</p>
        </div>
      )}

      {/* Upload Modal */}
      {showUpload && (
        <div className="qto-file-manager__upload-overlay">
          <div className="qto-file-manager__upload-modal">
            <div className="qto-file-manager__upload-header">
              <h3>Upload Files</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowUpload(false)}
              >
                ×
              </Button>
            </div>
            
            <FileUpload
              multiple={true}
              onUpload={handleFileUpload}
              {...uploadConfig}
            />
          </div>
        </div>
      )}

      {/* File Display */}
      <div className="qto-file-manager__content">
        {loading ? (
          <div className="qto-file-manager__loading">
            <RefreshCw size={32} className="animate-spin" />
            <p>Loading files...</p>
          </div>
        ) : (
          <FileDisplay
            files={filteredFiles}
            layout={layout}
            selectable={bulkActions}
            actions={fileActions}
            onFileSelect={handleFileSelect}
            onFileAction={handleFileAction}
            onDownload={onDownload}
            {...displayConfig}
          />
        )}
      </div>
    </div>
  );
};

FileManager.propTypes = {
  files: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    size: PropTypes.number,
    type: PropTypes.string,
    url: PropTypes.string,
    modified: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
    protected: PropTypes.bool,
  })),
  onUpload: PropTypes.func,
  onDownload: PropTypes.func,
  onDelete: PropTypes.func,
  onRefresh: PropTypes.func,
  onCreateFolder: PropTypes.func,
  uploadConfig: PropTypes.object,
  displayConfig: PropTypes.object,
  searchable: PropTypes.bool,
  filterable: PropTypes.bool,
  bulkActions: PropTypes.bool,
  className: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  loading: PropTypes.bool,
  error: PropTypes.object,
};

export default FileManager;
