import React, { useState, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import { 
  Upload, 
  X, 
  File, 
  Image, 
  FileText, 
  Video, 
  Music,
  AlertCircle,
  CheckCircle,
  Loader2
} from 'lucide-react';
import Button from './Button';
import Progress from './Progress';
import '../styles/file-upload.css';

/**
 * FileUpload Component - Handles file uploads with drag & drop, previews, and validation
 */
const FileUpload = ({
  multiple = false,
  accept = '*/*',
  maxSize = 10 * 1024 * 1024, // 10MB default
  maxFiles = 10,
  onFileSelect,
  onUpload,
  onRemove,
  children,
  className = '',
  disabled = false,
  showPreview = true,
  showProgress = true,
  uploadProgress = {},
  allowedTypes = [],
  ...props
}) => {
  const [files, setFiles] = useState([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [errors, setErrors] = useState([]);
  const fileInputRef = useRef(null);

  // File type icons mapping
  const getFileIcon = (fileType) => {
    if (fileType.startsWith('image/')) return Image;
    if (fileType.startsWith('video/')) return Video;
    if (fileType.startsWith('audio/')) return Music;
    if (fileType.includes('text') || fileType.includes('document')) return FileText;
    return File;
  };

  // Validate file
  const validateFile = (file) => {
    const errors = [];
    
    // Size validation
    if (file.size > maxSize) {
      errors.push(`File size exceeds ${formatFileSize(maxSize)} limit`);
    }
    
    // Type validation
    if (allowedTypes.length > 0 && !allowedTypes.includes(file.type)) {
      errors.push(`File type ${file.type} is not allowed`);
    }
    
    return errors;
  };

  // Format file size
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Handle file selection
  const handleFileSelection = useCallback((selectedFiles) => {
    const fileArray = Array.from(selectedFiles);
    const newErrors = [];
    const validFiles = [];

    // Validate each file
    fileArray.forEach((file, index) => {
      const fileErrors = validateFile(file);
      if (fileErrors.length > 0) {
        newErrors.push({ file: file.name, errors: fileErrors });
      } else {
        // Add metadata to file
        const enhancedFile = Object.assign(file, {
          id: `${Date.now()}-${index}`,
          preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : null,
          uploadStatus: 'pending'
        });
        validFiles.push(enhancedFile);
      }
    });

    // Check total file count
    if (!multiple && validFiles.length > 1) {
      newErrors.push({ 
        file: 'Multiple files', 
        errors: ['Only one file is allowed'] 
      });
      return;
    }

    if (files.length + validFiles.length > maxFiles) {
      newErrors.push({ 
        file: 'File limit', 
        errors: [`Maximum ${maxFiles} files allowed`] 
      });
      return;
    }

    setErrors(newErrors);
    
    if (validFiles.length > 0) {
      const updatedFiles = multiple ? [...files, ...validFiles] : validFiles;
      setFiles(updatedFiles);
      onFileSelect?.(updatedFiles);
    }
  }, [files, maxSize, maxFiles, multiple, allowedTypes, onFileSelect]);

  // Handle drag events
  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    if (!disabled) {
      setIsDragOver(true);
    }
  }, [disabled]);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(false);
    
    if (disabled) return;
    
    const droppedFiles = e.dataTransfer.files;
    handleFileSelection(droppedFiles);
  }, [disabled, handleFileSelection]);

  // Handle file input change
  const handleInputChange = useCallback((e) => {
    const selectedFiles = e.target.files;
    if (selectedFiles) {
      handleFileSelection(selectedFiles);
    }
  }, [handleFileSelection]);

  // Remove file
  const handleRemoveFile = useCallback((fileId) => {
    const updatedFiles = files.filter(file => file.id !== fileId);
    setFiles(updatedFiles);
    onRemove?.(fileId, updatedFiles);
  }, [files, onRemove]);

  // Upload files
  const handleUpload = useCallback(() => {
    const pendingFiles = files.filter(file => file.uploadStatus === 'pending');
    if (pendingFiles.length > 0 && onUpload) {
      onUpload(pendingFiles);
    }
  }, [files, onUpload]);

  // Open file picker
  const openFilePicker = () => {
    if (!disabled) {
      fileInputRef.current?.click();
    }
  };

  // Get upload zone classes
  const getUploadZoneClasses = () => {
    const baseClasses = 'qto-file-upload';
    const dragClasses = isDragOver ? 'qto-file-upload--drag-over' : '';
    const disabledClasses = disabled ? 'qto-file-upload--disabled' : '';
    
    return [baseClasses, dragClasses, disabledClasses, className]
      .filter(Boolean).join(' ');
  };

  // Render file preview
  const renderFilePreview = (file) => {
    const FileIcon = getFileIcon(file.type);
    const progress = uploadProgress[file.id] || 0;
    const isUploading = file.uploadStatus === 'uploading';
    const isSuccess = file.uploadStatus === 'success';
    const isError = file.uploadStatus === 'error';

    return (
      <div key={file.id} className="qto-file-upload__preview-item">
        <div className="qto-file-upload__preview-content">
          {file.preview ? (
            <img 
              src={file.preview} 
              alt={file.name}
              className="qto-file-upload__preview-image"
            />
          ) : (
            <div className="qto-file-upload__preview-icon">
              <FileIcon size={24} />
            </div>
          )}
          
          <div className="qto-file-upload__preview-info">
            <span className="qto-file-upload__preview-name" title={file.name}>
              {file.name}
            </span>
            <span className="qto-file-upload__preview-size">
              {formatFileSize(file.size)}
            </span>
          </div>
        </div>

        {/* Upload Progress */}
        {showProgress && isUploading && (
          <div className="qto-file-upload__progress">
            <Progress value={progress} size="sm" />
          </div>
        )}

        {/* Status Icons */}
        <div className="qto-file-upload__preview-actions">
          {isUploading && <Loader2 size={16} className="qto-file-upload__status-icon animate-spin" />}
          {isSuccess && <CheckCircle size={16} className="qto-file-upload__status-icon qto-file-upload__status-icon--success" />}
          {isError && <AlertCircle size={16} className="qto-file-upload__status-icon qto-file-upload__status-icon--error" />}
          
          <button
            type="button"
            onClick={() => handleRemoveFile(file.id)}
            className="qto-file-upload__remove-btn"
            disabled={isUploading}
            aria-label={`Remove ${file.name}`}
          >
            <X size={16} />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="qto-file-upload-container">
      {/* Upload Zone */}
      <div
        className={getUploadZoneClasses()}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={openFilePicker}
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-label="Upload files"
        {...props}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple={multiple}
          accept={accept}
          onChange={handleInputChange}
          className="qto-file-upload__input"
          disabled={disabled}
        />

        <div className="qto-file-upload__content">
          {children || (
            <>
              <div className="qto-file-upload__icon">
                <Upload size={32} />
              </div>
              <div className="qto-file-upload__text">
                <p className="qto-file-upload__primary-text">
                  Drop files here or click to browse
                </p>
                <p className="qto-file-upload__secondary-text">
                  {multiple 
                    ? `Upload up to ${maxFiles} files` 
                    : 'Upload a file'
                  } (max {formatFileSize(maxSize)} each)
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* File Previews */}
      {showPreview && files.length > 0 && (
        <div className="qto-file-upload__preview">
          <div className="qto-file-upload__preview-header">
            <h4>Selected Files ({files.length})</h4>
            {onUpload && files.some(f => f.uploadStatus === 'pending') && (
              <Button 
                variant="primary" 
                size="sm" 
                onClick={handleUpload}
                disabled={disabled}
              >
                Upload All
              </Button>
            )}
          </div>
          <div className="qto-file-upload__preview-list">
            {files.map(renderFilePreview)}
          </div>
        </div>
      )}

      {/* Error Messages */}
      {errors.length > 0 && (
        <div className="qto-file-upload__errors">
          {errors.map((error, index) => (
            <div key={index} className="qto-file-upload__error">
              <AlertCircle size={16} />
              <span>
                <strong>{error.file}:</strong> {error.errors.join(', ')}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

FileUpload.propTypes = {
  multiple: PropTypes.bool,
  accept: PropTypes.string,
  maxSize: PropTypes.number,
  maxFiles: PropTypes.number,
  onFileSelect: PropTypes.func,
  onUpload: PropTypes.func,
  onRemove: PropTypes.func,
  children: PropTypes.node,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  showPreview: PropTypes.bool,
  showProgress: PropTypes.bool,
  uploadProgress: PropTypes.object,
  allowedTypes: PropTypes.arrayOf(PropTypes.string),
};

export default FileUpload;
