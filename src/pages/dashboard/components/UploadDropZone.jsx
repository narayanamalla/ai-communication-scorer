import React, { useState, useRef } from 'react';
import Icon from '../../../components/Applcon';
import Button from '../../../components/ui/Button';

const UploadDropZone = ({ onFileUpload }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragEnter = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setIsDragging(false);

    const files = e?.dataTransfer?.files;
    if (files && files?.length > 0) {
      handleFiles(files);
    }
  };

  const handleFileInput = (e) => {
    const files = e?.target?.files;
    if (files && files?.length > 0) {
      handleFiles(files);
    }
  };

  const handleFiles = (files) => {
    const file = files?.[0];
    if (file && (file?.type === 'text/plain' || file?.name?.endsWith('.txt'))) {
      onFileUpload(file);
    } else {
      alert('Please upload a valid text file (.txt)');
    }
  };

  const handleBrowseClick = () => {
    fileInputRef?.current?.click();
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-foreground mb-4">Quick Upload</h2>
      
      <div
        className={`relative border-2 border-dashed rounded-lg p-8 transition-all duration-200 ${
          isDragging 
            ? 'border-primary bg-primary/5' :'border-border bg-muted/30 hover:bg-muted/50'
        }`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".txt,text/plain"
          onChange={handleFileInput}
          className="hidden"
        />

        <div className="flex flex-col items-center justify-center text-center">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
            isDragging ? 'bg-primary/20' : 'bg-primary/10'
          }`}>
            <Icon 
              name={isDragging ? 'Download' : 'Upload'} 
              size={32} 
              color="var(--color-primary)" 
            />
          </div>

          <h3 className="text-lg font-semibold text-foreground mb-2">
            {isDragging ? 'Drop your file here' : 'Drag & drop your transcript'}
          </h3>
          
          <p className="text-sm text-muted-foreground mb-4">
            or click to browse your files
          </p>

          <Button
            variant="outline"
            iconName="FolderOpen"
            iconPosition="left"
            onClick={handleBrowseClick}
          >
            Browse Files
          </Button>

          <p className="text-xs text-muted-foreground mt-4">
            Supported format: .txt (max 5MB)
          </p>
        </div>
      </div>
    </div>
  );
};

export default UploadDropZone;