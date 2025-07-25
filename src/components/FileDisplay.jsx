import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { 
  File, 
  Image, 
  FileText, 
  Video, 
  Music, 
  Archive,
  Download,
  Eye,
  X,
  MoreVertical,
  Edit,
  Trash2,
  Share,
  Copy
} from 'lucide-react';
import Button from './Button';
import Dropdown from './Dropdown';
import Modal from './Modal';
import FileDownload from './FileDownload';
import '../styles/file-display.css';

/**
 * FileDisplay Component - Displays files with various layouts and actions
 */
const FileDisplay = ({
  files = [],
  layout = 'grid', // 'grid', 'list', 'gallery'
  variant = 'default', // 'default', 'minimal', 'detailed'
  selectable = false,
  actions = [],
  onFileSelect,
  onFileAction,
  onPreview,
  onDownload,
  className = '',
  emptyMessage = 'No files to display',
  showFileInfo = true,
  previewable = true,
  downloadable = true,
  maxPreviewSize = 50 * 1024 * 1024, // 50MB
  ...props
}) => {
  const [selectedFiles, setSelectedFiles] = useState(new Set());
  const [previewFile, setPreviewFile] = useState(null);
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  // File type detection
  const getFileType = (file) => {
    if (!file.type && !file.name) return 'unknown';
    
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

  // Get file icon
  const getFileIcon = (fileType) => {
    const icons = {
      image: Image,
      video: Video,
      audio: Music,
      document: FileText,
      archive: Archive,
      file: File
    };
    return icons[fileType] || File;
  };

  // Format file size
  const formatFileSize = (bytes) => {
    if (!bytes) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Format date
  const formatDate = (date) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString();
  };

  // Handle file selection
  const handleFileSelect = (file, isSelected) => {
    const newSelected = new Set(selectedFiles);
    
    if (isSelected) {
      newSelected.add(file.id);
    } else {
      newSelected.delete(file.id);
    }
    
    setSelectedFiles(newSelected);
    onFileSelect?.(Array.from(newSelected), files.filter(f => newSelected.has(f.id)));
  };

  // Handle select all
  const handleSelectAll = (selectAll) => {
    const newSelected = selectAll ? new Set(files.map(f => f.id)) : new Set();
    setSelectedFiles(newSelected);
    onFileSelect?.(Array.from(newSelected), selectAll ? files : []);
  };

  // Handle file action
  const handleFileAction = (action, file) => {
    switch (action) {
      case 'preview':
        handlePreview(file);
        break;
      case 'download':
        handleDownload(file);
        break;
      case 'copy':
        navigator.clipboard.writeText(file.url || file.name);
        break;
      default:
        onFileAction?.(action, file);
    }
  };

  // Handle preview
  const handlePreview = (file) => {
    if (file.size > maxPreviewSize) {
      alert('File too large for preview');
      return;
    }
    
    if (onPreview) {
      onPreview(file);
    } else {
      setPreviewFile(file);
      setShowPreviewModal(true);
    }
  };

  // Handle download
  const handleDownload = (file) => {
    if (onDownload) {
      onDownload(file);
    } else if (file.url) {
      const link = document.createElement('a');
      link.href = file.url;
      link.download = file.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  // Get container classes
  const getContainerClasses = () => {
    const baseClasses = 'qto-file-display';
    const layoutClasses = `qto-file-display--${layout}`;
    const variantClasses = `qto-file-display--${variant}`;
    
    return [baseClasses, layoutClasses, variantClasses, className]
      .filter(Boolean).join(' ');
  };

  // Render file thumbnail
  const renderThumbnail = (file) => {
    const fileType = getFileType(file);
    const FileIcon = getFileIcon(fileType);

    if (fileType === 'image' && file.url) {
      return (
        <img
          src={file.url}
          alt={file.name}
          className="qto-file-display__thumbnail-image"
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'flex';
          }}
        />
      );
    }

    return (
      <div className="qto-file-display__thumbnail-icon">
        <FileIcon size={32} />
      </div>
    );
  };

  // Render file actions
  const renderFileActions = (file) => {
    const defaultActions = [
      ...(previewable ? [{ key: 'preview', label: 'Preview', icon: <Eye size={16} /> }] : []),
      ...(downloadable ? [{ key: 'download', label: 'Download', icon: <Download size={16} /> }] : []),
      { key: 'copy', label: 'Copy Link', icon: <Copy size={16} /> },
      ...actions
    ];

    if (layout === 'grid' || variant === 'minimal') {
      return (
        <Dropdown
          trigger={
            <Button variant="ghost" size="sm" className="qto-file-display__action-trigger">
              <MoreVertical size={16} />
            </Button>
          }
          position="bottom-right"
        >
          {defaultActions.map(action => (
            <Dropdown.Item
              key={action.key}
              onClick={() => handleFileAction(action.key, file)}
              disabled={action.disabled?.(file)}
            >
              {action.icon}
              <span>{action.label}</span>
            </Dropdown.Item>
          ))}
        </Dropdown>
      );
    }

    return (
      <div className="qto-file-display__actions">
        {defaultActions.slice(0, 3).map(action => (
          <Button
            key={action.key}
            variant="ghost"
            size="sm"
            onClick={() => handleFileAction(action.key, file)}
            disabled={action.disabled?.(file)}
            title={action.label}
          >
            {action.icon}
          </Button>
        ))}
        {defaultActions.length > 3 && (
          <Dropdown
            trigger={<Button variant="ghost" size="sm"><MoreVertical size={16} /></Button>}
            position="bottom-right"
          >
            {defaultActions.slice(3).map(action => (
              <Dropdown.Item
                key={action.key}
                onClick={() => handleFileAction(action.key, file)}
                disabled={action.disabled?.(file)}
              >
                {action.icon}
                <span>{action.label}</span>
              </Dropdown.Item>
            ))}
          </Dropdown>
        )}
      </div>
    );
  };

  // Render file item
  const renderFileItem = (file) => {
    const fileType = getFileType(file);
    const isSelected = selectedFiles.has(file.id);

    return (
      <div
        key={file.id}
        className={`qto-file-display__item ${isSelected ? 'qto-file-display__item--selected' : ''}`}
        onClick={() => layout === 'grid' && handlePreview(file)}
      >
        {selectable && (
          <div className="qto-file-display__checkbox">
            <input
              type="checkbox"
              checked={isSelected}
              onChange={(e) => handleFileSelect(file, e.target.checked)}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        )}

        <div className="qto-file-display__thumbnail">
          {renderThumbnail(file)}
          <div className="qto-file-display__overlay">
            {renderFileActions(file)}
          </div>
        </div>

        <div className="qto-file-display__info">
          <div className="qto-file-display__name" title={file.name}>
            {file.name}
          </div>
          
          {showFileInfo && variant !== 'minimal' && (
            <div className="qto-file-display__meta">
              <span className="qto-file-display__size">
                {formatFileSize(file.size)}
              </span>
              {file.modified && (
                <span className="qto-file-display__date">
                  {formatDate(file.modified)}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    );
  };

  // Render preview modal
  const renderPreviewModal = () => {
    if (!previewFile) return null;

    const fileType = getFileType(previewFile);

    return (
      <Modal
        open={showPreviewModal}
        onClose={() => setShowPreviewModal(false)}
        title={previewFile.name}
        size="lg"
        className="qto-file-display__preview-modal"
      >
        <div className="qto-file-display__preview-content">
          {fileType === 'image' && (
            <img
              src={previewFile.url}
              alt={previewFile.name}
              className="qto-file-display__preview-image"
            />
          )}
          {fileType === 'video' && (
            <video
              src={previewFile.url}
              controls
              className="qto-file-display__preview-video"
            />
          )}
          {fileType === 'audio' && (
            <audio
              src={previewFile.url}
              controls
              className="qto-file-display__preview-audio"
            />
          )}
          {fileType === 'document' && previewFile.url && (
            <iframe
              src={previewFile.url}
              className="qto-file-display__preview-document"
              title={previewFile.name}
            />
          )}
          {!['image', 'video', 'audio', 'document'].includes(fileType) && (
            <div className="qto-file-display__preview-placeholder">
              <File size={64} />
              <p>Preview not available for this file type</p>
              <FileDownload
                url={previewFile.url}
                filename={previewFile.name}
                fileSize={previewFile.size}
                variant="button"
              />
            </div>
          )}
        </div>
      </Modal>
    );
  };

  if (!files || files.length === 0) {
    return (
      <div className={`qto-file-display qto-file-display--empty ${className}`}>
        <div className="qto-file-display__empty">
          <File size={48} />
          <p>{emptyMessage}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={getContainerClasses()} {...props}>
      {selectable && (
        <div className="qto-file-display__header">
          <label className="qto-file-display__select-all">
            <input
              type="checkbox"
              checked={selectedFiles.size === files.length && files.length > 0}
              onChange={(e) => handleSelectAll(e.target.checked)}
            />
            <span>
              {selectedFiles.size > 0 
                ? `${selectedFiles.size} of ${files.length} selected`
                : 'Select all'
              }
            </span>
          </label>
        </div>
      )}

      <div className="qto-file-display__grid">
        {files.map(renderFileItem)}
      </div>

      {renderPreviewModal()}
    </div>
  );
};

FileDisplay.propTypes = {
  files: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    size: PropTypes.number,
    type: PropTypes.string,
    url: PropTypes.string,
    modified: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  })).isRequired,
  layout: PropTypes.oneOf(['grid', 'list', 'gallery']),
  variant: PropTypes.oneOf(['default', 'minimal', 'detailed']),
  selectable: PropTypes.bool,
  actions: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    icon: PropTypes.node,
    disabled: PropTypes.func,
  })),
  onFileSelect: PropTypes.func,
  onFileAction: PropTypes.func,
  onPreview: PropTypes.func,
  onDownload: PropTypes.func,
  className: PropTypes.string,
  emptyMessage: PropTypes.string,
  showFileInfo: PropTypes.bool,
  previewable: PropTypes.bool,
  downloadable: PropTypes.bool,
  maxPreviewSize: PropTypes.number,
};

export default FileDisplay;
