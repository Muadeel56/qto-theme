import React from 'react';
import PropTypes from 'prop-types';
import { Download, ExternalLink, Eye } from 'lucide-react';
import Button from './Button';
import '../styles/file-download.css';

/**
 * FileDownload Component - Handles file downloads with different display modes
 */
const FileDownload = ({
  url,
  filename,
  fileSize,
  fileType,
  variant = 'button',
  size = 'md',
  disabled = false,
  className = '',
  onDownload,
  onPreview,
  showPreview = false,
  showSize = true,
  downloadOnClick = true,
  target = '_blank',
  children,
  ...props
}) => {
  // Format file size
  const formatFileSize = (bytes) => {
    if (!bytes) return '';
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Handle download
  const handleDownload = async (e) => {
    if (onDownload) {
      e.preventDefault();
      const result = await onDownload(url, filename);
      if (result === false) return; // Allow onDownload to prevent default behavior
    }

    if (downloadOnClick) {
      // Create temporary download link
      const link = document.createElement('a');
      link.href = url;
      link.download = filename || 'download';
      link.target = target;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  // Handle preview
  const handlePreview = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (onPreview) {
      onPreview(url, filename, fileType);
    } else {
      // Default preview behavior
      window.open(url, '_blank');
    }
  };

  // Get component classes
  const getClasses = () => {
    const baseClasses = 'qto-file-download';
    const variantClasses = `qto-file-download--${variant}`;
    const sizeClasses = `qto-file-download--${size}`;
    const disabledClasses = disabled ? 'qto-file-download--disabled' : '';
    
    return [baseClasses, variantClasses, sizeClasses, disabledClasses, className]
      .filter(Boolean).join(' ');
  };

  // Render based on variant
  if (variant === 'button') {
    return (
      <div className={getClasses()}>
        <Button
          variant="outline"
          size={size}
          disabled={disabled}
          onClick={handleDownload}
          startIcon={<Download size={16} />}
          className="qto-file-download__button"
          {...props}
        >
          {children || `Download ${filename || 'File'}`}
        </Button>
        
        {showPreview && (
          <Button
            variant="ghost"
            size={size}
            disabled={disabled}
            onClick={handlePreview}
            startIcon={<Eye size={16} />}
            className="qto-file-download__preview-btn"
            title="Preview file"
          >
            Preview
          </Button>
        )}
      </div>
    );
  }

  if (variant === 'link') {
    return (
      <div className={getClasses()}>
        <a
          href={url}
          onClick={handleDownload}
          className="qto-file-download__link"
          target={target}
          download={filename}
          {...props}
        >
          <Download size={16} className="qto-file-download__icon" />
          <span className="qto-file-download__text">
            {children || filename || 'Download'}
          </span>
          {showSize && fileSize && (
            <span className="qto-file-download__size">
              ({formatFileSize(fileSize)})
            </span>
          )}
          <ExternalLink size={14} className="qto-file-download__external-icon" />
        </a>
        
        {showPreview && (
          <button
            type="button"
            onClick={handlePreview}
            className="qto-file-download__preview-link"
            disabled={disabled}
            title="Preview file"
          >
            <Eye size={14} />
          </button>
        )}
      </div>
    );
  }

  if (variant === 'card') {
    return (
      <div className={getClasses()}>
        <div className="qto-file-download__card">
          <div className="qto-file-download__card-header">
            <div className="qto-file-download__card-info">
              <span className="qto-file-download__card-name">
                {filename || 'Unknown File'}
              </span>
              {showSize && fileSize && (
                <span className="qto-file-download__card-size">
                  {formatFileSize(fileSize)}
                </span>
              )}
            </div>
            
            <div className="qto-file-download__card-actions">
              {showPreview && (
                <button
                  type="button"
                  onClick={handlePreview}
                  className="qto-file-download__card-action"
                  disabled={disabled}
                  title="Preview file"
                >
                  <Eye size={16} />
                </button>
              )}
              
              <button
                type="button"
                onClick={handleDownload}
                className="qto-file-download__card-action qto-file-download__card-action--primary"
                disabled={disabled}
                title="Download file"
              >
                <Download size={16} />
              </button>
            </div>
          </div>
          
          {children && (
            <div className="qto-file-download__card-content">
              {children}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Icon variant
  return (
    <div className={getClasses()}>
      <button
        type="button"
        onClick={handleDownload}
        className="qto-file-download__icon-btn"
        disabled={disabled}
        title={`Download ${filename || 'file'}`}
        {...props}
      >
        <Download size={size === 'sm' ? 16 : size === 'lg' ? 24 : 20} />
      </button>
      
      {showPreview && (
        <button
          type="button"
          onClick={handlePreview}
          className="qto-file-download__icon-btn"
          disabled={disabled}
          title="Preview file"
        >
          <Eye size={size === 'sm' ? 16 : size === 'lg' ? 24 : 20} />
        </button>
      )}
    </div>
  );
};

FileDownload.propTypes = {
  url: PropTypes.string.isRequired,
  filename: PropTypes.string,
  fileSize: PropTypes.number,
  fileType: PropTypes.string,
  variant: PropTypes.oneOf(['button', 'link', 'card', 'icon']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  disabled: PropTypes.bool,
  className: PropTypes.string,
  onDownload: PropTypes.func,
  onPreview: PropTypes.func,
  showPreview: PropTypes.bool,
  showSize: PropTypes.bool,
  downloadOnClick: PropTypes.bool,
  target: PropTypes.string,
  children: PropTypes.node,
};

export default FileDownload;
