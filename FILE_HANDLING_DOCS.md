# File Handling Components Documentation

## Overview

The QTO Theme Library provides a comprehensive set of reusable components for handling file operations including uploading, downloading, displaying, and managing files. These components are designed to work together seamlessly while also being useful independently.

## Components

### 1. FileUpload

A drag-and-drop file upload component with validation, progress tracking, and preview functionality.

#### Basic Usage

```jsx
import { FileUpload } from '@qto/theme';

<FileUpload
  multiple={true}
  maxSize={10 * 1024 * 1024} // 10MB
  onFileSelect={(files) => console.log('Selected:', files)}
  onUpload={(files) => handleUpload(files)}
  allowedTypes={['image/*', 'application/pdf']}
/>
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `multiple` | boolean | `false` | Allow multiple file selection |
| `accept` | string | `'*/*'` | HTML accept attribute for file types |
| `maxSize` | number | `10485760` | Maximum file size in bytes (10MB) |
| `maxFiles` | number | `10` | Maximum number of files |
| `onFileSelect` | function | - | Callback when files are selected |
| `onUpload` | function | - | Callback to handle file upload |
| `onRemove` | function | - | Callback when file is removed |
| `disabled` | boolean | `false` | Disable the upload area |
| `showPreview` | boolean | `true` | Show file previews |
| `showProgress` | boolean | `true` | Show upload progress |
| `uploadProgress` | object | `{}` | Upload progress by file ID |
| `allowedTypes` | array | `[]` | Allowed MIME types |
| `className` | string | `''` | Additional CSS classes |

#### Features

- ✅ Drag and drop interface
- ✅ File validation (size, type)
- ✅ Image previews
- ✅ Upload progress tracking
- ✅ Error handling and display
- ✅ Multiple file support
- ✅ Custom upload area content
- ✅ Accessibility support

### 2. FileDownload

A versatile component for downloading files with multiple display variants.

#### Basic Usage

```jsx
import { FileDownload } from '@qto/theme';

// Button variant
<FileDownload
  url="/files/document.pdf"
  filename="document.pdf"
  fileSize={2048000}
  variant="button"
  showPreview={true}
/>

// Link variant
<FileDownload
  url="/files/document.pdf"
  filename="document.pdf"
  variant="link"
  showSize={true}
/>

// Card variant
<FileDownload
  url="/files/document.pdf"
  filename="document.pdf"
  variant="card"
  onDownload={handleDownload}
/>

// Icon variant
<FileDownload
  url="/files/document.pdf"
  filename="document.pdf"
  variant="icon"
  size="lg"
/>
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `url` | string | - | **Required.** File URL |
| `filename` | string | - | File name for download |
| `fileSize` | number | - | File size in bytes |
| `fileType` | string | - | MIME type |
| `variant` | string | `'button'` | Display variant: 'button', 'link', 'card', 'icon' |
| `size` | string | `'md'` | Size: 'sm', 'md', 'lg' |
| `disabled` | boolean | `false` | Disable interactions |
| `onDownload` | function | - | Custom download handler |
| `onPreview` | function | - | Custom preview handler |
| `showPreview` | boolean | `false` | Show preview button/option |
| `showSize` | boolean | `true` | Show file size |
| `downloadOnClick` | boolean | `true` | Auto-download on click |
| `target` | string | `'_blank'` | Link target |

### 3. FileDisplay

A component for displaying lists of files with various layouts and interactions.

#### Basic Usage

```jsx
import { FileDisplay } from '@qto/theme';

const files = [
  {
    id: 1,
    name: 'document.pdf',
    size: 2048000,
    type: 'application/pdf',
    url: '/files/document.pdf',
    modified: new Date('2024-01-15'),
  },
  // ... more files
];

// Grid layout
<FileDisplay
  files={files}
  layout="grid"
  selectable={true}
  onFileSelect={(fileIds, selectedFiles) => console.log(selectedFiles)}
/>

// List layout
<FileDisplay
  files={files}
  layout="list"
  variant="detailed"
  actions={[
    {
      key: 'edit',
      label: 'Edit',
      icon: <EditIcon />,
    },
    {
      key: 'delete',
      label: 'Delete',
      icon: <DeleteIcon />,
      disabled: (file) => file.protected,
    },
  ]}
  onFileAction={(action, file) => handleAction(action, file)}
/>

// Gallery layout (images)
<FileDisplay
  files={imageFiles}
  layout="gallery"
  previewable={true}
  onPreview={(file) => showPreview(file)}
/>
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `files` | array | `[]` | **Required.** Array of file objects |
| `layout` | string | `'grid'` | Layout: 'grid', 'list', 'gallery' |
| `variant` | string | `'default'` | Variant: 'default', 'minimal', 'detailed' |
| `selectable` | boolean | `false` | Enable file selection |
| `actions` | array | `[]` | Custom file actions |
| `onFileSelect` | function | - | Callback for file selection |
| `onFileAction` | function | - | Callback for file actions |
| `onPreview` | function | - | Custom preview handler |
| `onDownload` | function | - | Custom download handler |
| `emptyMessage` | string | `'No files to display'` | Empty state message |
| `showFileInfo` | boolean | `true` | Show file metadata |
| `previewable` | boolean | `true` | Enable file preview |
| `downloadable` | boolean | `true` | Enable file download |
| `maxPreviewSize` | number | `52428800` | Max file size for preview (50MB) |

#### File Object Structure

```jsx
{
  id: string | number,        // Unique identifier
  name: string,              // File name
  size: number,              // File size in bytes
  type: string,              // MIME type
  url: string,               // File URL
  modified: Date | string,   // Last modified date
  protected: boolean,        // Optional: prevent deletion
}
```

### 4. FileManager

A complete file management interface combining upload, display, and management features.

#### Basic Usage

```jsx
import { FileManager } from '@qto/theme';

<FileManager
  files={files}
  title="My Files"
  subtitle="Manage your documents and media"
  onUpload={handleUpload}
  onDownload={handleDownload}
  onDelete={handleDelete}
  onRefresh={handleRefresh}
  onCreateFolder={handleCreateFolder}
  uploadConfig={{
    multiple: true,
    maxSize: 50 * 1024 * 1024, // 50MB
    allowedTypes: ['image/*', 'video/*', 'application/pdf'],
  }}
  displayConfig={{
    variant: 'default',
    showFileInfo: true,
  }}
  searchable={true}
  filterable={true}
  bulkActions={true}
/>
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `files` | array | `[]` | Array of file objects |
| `title` | string | `'File Manager'` | Manager title |
| `subtitle` | string | - | Manager subtitle |
| `onUpload` | function | - | Upload handler |
| `onDownload` | function | - | Download handler |
| `onDelete` | function | - | Delete handler |
| `onRefresh` | function | - | Refresh handler |
| `onCreateFolder` | function | - | Create folder handler |
| `uploadConfig` | object | `{}` | FileUpload configuration |
| `displayConfig` | object | `{}` | FileDisplay configuration |
| `searchable` | boolean | `true` | Enable search |
| `filterable` | boolean | `true` | Enable type filtering |
| `bulkActions` | boolean | `true` | Enable bulk operations |
| `loading` | boolean | `false` | Loading state |
| `error` | object | - | Error object |

#### Features

- ✅ File upload with drag & drop
- ✅ Multiple layout options (grid, list, gallery)
- ✅ Search and filtering
- ✅ Bulk operations (select, download, delete)
- ✅ File preview with modal
- ✅ Responsive design
- ✅ Error handling
- ✅ Loading states
- ✅ Customizable actions

## Integration Examples

### Profile Picture Upload

```jsx
<FileUpload
  multiple={false}
  accept="image/*"
  maxSize={5 * 1024 * 1024} // 5MB
  allowedTypes={['image/jpeg', 'image/png', 'image/webp']}
  onFileSelect={handleProfilePicture}
>
  <div style={{ textAlign: 'center', padding: '2rem' }}>
    <Avatar size="xl" src={currentAvatar} />
    <p>Click to upload profile picture</p>
    <small>JPG, PNG or WebP (max 5MB)</small>
  </div>
</FileUpload>
```

### Document Library

```jsx
const documentActions = [
  {
    key: 'edit',
    label: 'Edit',
    icon: <EditIcon />,
    disabled: (file) => !file.type.includes('text'),
  },
  {
    key: 'share',
    label: 'Share',
    icon: <ShareIcon />,
  },
  {
    key: 'version',
    label: 'Version History',
    icon: <HistoryIcon />,
  },
];

<FileDisplay
  files={documents}
  layout="list"
  variant="detailed"
  actions={documentActions}
  onFileAction={handleDocumentAction}
  selectable={true}
/>
```

### Media Gallery

```jsx
<FileDisplay
  files={mediaFiles}
  layout="gallery"
  variant="minimal"
  previewable={true}
  onPreview={openLightbox}
  downloadable={false}
/>
```

### File Upload with Server Integration

```jsx
const handleFileUpload = async (files) => {
  const formData = new FormData();
  files.forEach(file => formData.append('files', file));
  
  try {
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });
    
    if (response.ok) {
      const result = await response.json();
      // Update file list with server response
      setFiles(prev => [...prev, ...result.files]);
    }
  } catch (error) {
    console.error('Upload failed:', error);
  }
};

<FileUpload
  multiple={true}
  onUpload={handleFileUpload}
  uploadProgress={uploadProgress}
/>
```

## Styling

All components use CSS custom properties for theming and can be customized through:

- CSS custom properties (recommended)
- CSS class overrides
- Inline styles
- Theme provider

### CSS Custom Properties

```css
:root {
  --qto-file-upload-border-color: #e5e5e5;
  --qto-file-upload-hover-color: #f0f9ff;
  --qto-file-display-grid-gap: 1rem;
  --qto-file-manager-header-bg: #f8fafc;
}
```

### Component-specific Classes

```css
.qto-file-upload {
  /* Upload area styles */
}

.qto-file-display__item {
  /* File item styles */
}

.qto-file-manager__toolbar {
  /* Toolbar styles */
}
```

## Accessibility

All components include:

- ✅ ARIA labels and descriptions
- ✅ Keyboard navigation support
- ✅ Focus management
- ✅ Screen reader compatibility
- ✅ High contrast support

## Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

## Performance Considerations

- File previews are loaded on-demand
- Large file lists use virtualization when needed
- Image thumbnails are optimized
- Upload progress is throttled to prevent UI blocking

## Best Practices

1. **File Validation**: Always validate files on both client and server
2. **Progress Feedback**: Show upload progress for large files
3. **Error Handling**: Provide clear error messages
4. **Accessibility**: Include proper ARIA labels
5. **Performance**: Limit file sizes and implement chunked uploads for large files
6. **Security**: Validate file types and scan for malware on server

## TypeScript Support

Full TypeScript definitions are included:

```typescript
interface FileObject {
  id: string | number;
  name: string;
  size: number;
  type: string;
  url: string;
  modified: Date | string;
  protected?: boolean;
}

interface FileUploadProps {
  multiple?: boolean;
  maxSize?: number;
  onFileSelect?: (files: File[]) => void;
  onUpload?: (files: File[]) => Promise<void>;
  // ... other props
}
```
