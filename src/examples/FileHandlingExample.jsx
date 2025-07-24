import React, { useState } from 'react';
import FileUpload from '../components/FileUpload';
import FileDownload from '../components/FileDownload';
import FileDisplay from '../components/FileDisplay';
import FileManager from '../components/FileManager';
import Button from '../components/Button';
import Card from '../components/Card';

const FileHandlingExample = () => {
  const [files, setFiles] = useState([
    {
      id: 1,
      name: 'presentation.pdf',
      size: 2048000,
      type: 'application/pdf',
      url: '/files/presentation.pdf',
      modified: new Date('2024-01-15'),
    },
    {
      id: 2,
      name: 'vacation-photo.jpg',
      size: 1024000,
      type: 'image/jpeg',
      url: '/files/vacation-photo.jpg',
      modified: new Date('2024-01-20'),
    },
    {
      id: 3,
      name: 'project-demo.mp4',
      size: 15728640,
      type: 'video/mp4',
      url: '/files/project-demo.mp4',
      modified: new Date('2024-01-25'),
    },
    {
      id: 4,
      name: 'meeting-notes.docx',
      size: 512000,
      type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      url: '/files/meeting-notes.docx',
      modified: new Date('2024-01-30'),
    },
  ]);

  const [uploadProgress, setUploadProgress] = useState({});

  // Simulate file upload
  const handleFileUpload = async (uploadedFiles) => {
    console.log('Uploading files:', uploadedFiles);
    
    for (const file of uploadedFiles) {
      // Simulate upload progress
      file.uploadStatus = 'uploading';
      
      for (let progress = 0; progress <= 100; progress += 10) {
        setUploadProgress(prev => ({
          ...prev,
          [file.id]: progress
        }));
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      
      file.uploadStatus = 'success';
      
      // Add to files list
      const newFile = {
        id: Date.now() + Math.random(),
        name: file.name,
        size: file.size,
        type: file.type,
        url: URL.createObjectURL(file),
        modified: new Date(),
      };
      
      setFiles(prev => [...prev, newFile]);
    }
  };

  // Handle file download
  const handleFileDownload = (file) => {
    console.log('Downloading file:', file);
    // In a real app, you might track download analytics here
    return true; // Allow default download behavior
  };

  // Handle file delete
  const handleFileDelete = async (filesToDelete) => {
    console.log('Deleting files:', filesToDelete);
    const fileIds = filesToDelete.map(f => f.id);
    setFiles(prev => prev.filter(file => !fileIds.includes(file.id)));
  };

  // Handle file refresh
  const handleRefresh = () => {
    console.log('Refreshing files...');
    // In a real app, you would reload files from server
  };

  // Handle file preview
  const handleFilePreview = (file) => {
    console.log('Previewing file:', file);
    // Custom preview logic
    window.open(file.url, '_blank');
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>File Handling Components Demo</h1>
      
      {/* File Upload Examples */}
      <section style={{ marginBottom: '3rem' }}>
        <h2>File Upload</h2>
        
        <div style={{ display: 'grid', gap: '2rem', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))' }}>
          <Card>
            <Card.Header>
              <h3>Basic Upload</h3>
            </Card.Header>
            <Card.Body>
              <FileUpload
                multiple={true}
                maxSize={10 * 1024 * 1024} // 10MB
                onFileSelect={(files) => console.log('Files selected:', files)}
                onUpload={handleFileUpload}
                uploadProgress={uploadProgress}
                allowedTypes={['image/*', 'application/pdf', 'video/*']}
              />
            </Card.Body>
          </Card>
          
          <Card>
            <Card.Header>
              <h3>Custom Upload Zone</h3>
            </Card.Header>
            <Card.Body>
              <FileUpload
                multiple={false}
                showPreview={false}
                onFileSelect={(files) => console.log('File selected:', files)}
              >
                <div style={{ textAlign: 'center', padding: '2rem' }}>
                  <h4>Drop your file here</h4>
                  <p>or click to browse</p>
                  <Button variant="primary" size="sm">
                    Select File
                  </Button>
                </div>
              </FileUpload>
            </Card.Body>
          </Card>
        </div>
      </section>

      {/* File Download Examples */}
      <section style={{ marginBottom: '3rem' }}>
        <h2>File Download</h2>
        
        <div style={{ display: 'grid', gap: '2rem', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
          <Card>
            <Card.Header>
              <h3>Download Variants</h3>
            </Card.Header>
            <Card.Body style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <FileDownload
                url="/files/sample.pdf"
                filename="sample-document.pdf"
                fileSize={2048000}
                variant="button"
                showPreview={true}
                onDownload={handleFileDownload}
              />
              
              <FileDownload
                url="/files/sample.pdf"
                filename="sample-document.pdf"
                fileSize={2048000}
                variant="link"
                showPreview={true}
              />
              
              <FileDownload
                url="/files/sample.pdf"
                filename="sample-document.pdf"
                fileSize={2048000}
                variant="card"
                showPreview={true}
              />
              
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <FileDownload
                  url="/files/sample.pdf"
                  filename="sample-document.pdf"
                  variant="icon"
                  size="sm"
                />
                <FileDownload
                  url="/files/sample.pdf"
                  filename="sample-document.pdf"
                  variant="icon"
                  size="md"
                />
                <FileDownload
                  url="/files/sample.pdf"
                  filename="sample-document.pdf"
                  variant="icon"
                  size="lg"
                />
              </div>
            </Card.Body>
          </Card>
        </div>
      </section>

      {/* File Display Examples */}
      <section style={{ marginBottom: '3rem' }}>
        <h2>File Display</h2>
        
        <div style={{ display: 'grid', gap: '2rem', gridTemplateColumns: '1fr' }}>
          <Card>
            <Card.Header>
              <h3>Grid Layout</h3>
            </Card.Header>
            <Card.Body>
              <FileDisplay
                files={files}
                layout="grid"
                selectable={true}
                onFileSelect={(fileIds, selectedFiles) => console.log('Selected:', selectedFiles)}
                onPreview={handleFilePreview}
                onDownload={handleFileDownload}
              />
            </Card.Body>
          </Card>
          
          <Card>
            <Card.Header>
              <h3>List Layout</h3>
            </Card.Header>
            <Card.Body>
              <FileDisplay
                files={files}
                layout="list"
                variant="detailed"
                selectable={true}
                actions={[
                  {
                    key: 'share',
                    label: 'Share',
                    icon: '🔗',
                  },
                  {
                    key: 'edit',
                    label: 'Edit',
                    icon: '✏️',
                    disabled: (file) => file.type !== 'application/pdf',
                  },
                ]}
                onFileAction={(action, file) => console.log('Action:', action, 'File:', file)}
              />
            </Card.Body>
          </Card>
          
          <Card>
            <Card.Header>
              <h3>Gallery Layout</h3>
            </Card.Header>
            <Card.Body>
              <FileDisplay
                files={files.filter(f => f.type.startsWith('image/'))}
                layout="gallery"
                variant="minimal"
                previewable={true}
                downloadable={false}
              />
            </Card.Body>
          </Card>
        </div>
      </section>

      {/* File Manager Example */}
      <section style={{ marginBottom: '3rem' }}>
        <h2>Complete File Manager</h2>
        
        <FileManager
          files={files}
          title="My Files"
          subtitle="Manage your documents, images, and media files"
          onUpload={handleFileUpload}
          onDownload={handleFileDownload}
          onDelete={handleFileDelete}
          onRefresh={handleRefresh}
          onCreateFolder={() => console.log('Create folder')}
          uploadConfig={{
            multiple: true,
            maxSize: 50 * 1024 * 1024, // 50MB
            allowedTypes: ['image/*', 'video/*', 'application/pdf', 'application/msword'],
          }}
          displayConfig={{
            variant: 'default',
            showFileInfo: true,
          }}
          searchable={true}
          filterable={true}
          bulkActions={true}
        />
      </section>

      {/* Usage Examples */}
      <section>
        <h2>Integration Examples</h2>
        
        <div style={{ display: 'grid', gap: '2rem', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))' }}>
          <Card>
            <Card.Header>
              <h3>Profile Picture Upload</h3>
            </Card.Header>
            <Card.Body>
              <FileUpload
                multiple={false}
                accept="image/*"
                maxSize={5 * 1024 * 1024} // 5MB
                allowedTypes={['image/jpeg', 'image/png', 'image/webp']}
                onFileSelect={(files) => console.log('Profile picture:', files[0])}
              >
                <div style={{ textAlign: 'center', padding: '2rem' }}>
                  <div style={{ 
                    width: '100px', 
                    height: '100px', 
                    borderRadius: '50%', 
                    background: '#f0f0f0', 
                    margin: '0 auto 1rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    👤
                  </div>
                  <p>Click to upload profile picture</p>
                  <small>JPG, PNG or WebP (max 5MB)</small>
                </div>
              </FileUpload>
            </Card.Body>
          </Card>
          
          <Card>
            <Card.Header>
              <h3>Document Library</h3>
            </Card.Header>
            <Card.Body>
              <FileDisplay
                files={files.filter(f => 
                  f.type.includes('pdf') || 
                  f.type.includes('document') || 
                  f.type.includes('text')
                )}
                layout="list"
                variant="detailed"
                actions={[
                  {
                    key: 'edit',
                    label: 'Edit',
                    icon: '✏️',
                  },
                  {
                    key: 'version',
                    label: 'Version History',
                    icon: '📋',
                  },
                ]}
              />
            </Card.Body>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default FileHandlingExample;
