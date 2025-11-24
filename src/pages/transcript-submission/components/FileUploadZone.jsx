import React, { useState, useRef } from 'react';
import Icon from '../../../components/Applcon';

const FileUploadZone = ({ onFileSelect, disabled }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const allowedFormats = ['.txt', '.doc', '.docx'];
  const maxFileSize = 5 * 1024 * 1024; // 5MB

  const validateFile = (file) => {
    const fileExtension = '.' + file?.name?.split('.')?.pop()?.toLowerCase();
    
    if (!allowedFormats?.includes(fileExtension)) {
      setError(`Invalid file format. Allowed formats: ${allowedFormats?.join(', ')}`);
      return false;
    }
    
    if (file?.size > maxFileSize) {
      setError('File size exceeds 5MB limit');
      return false;
    }
    
    setError('');
    return true;
  };

  const simulateUpload = (file) => {
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 100);
  };

  const handleFileRead = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e?.target?.result;
      onFileSelect(content, file?.name);
      setUploadedFile(file);
    };
    reader?.readAsText(file);
  };

  const handleFileChange = (e) => {
    const file = e?.target?.files?.[0];
    if (file && validateFile(file)) {
      simulateUpload(file);
      setTimeout(() => handleFileRead(file), 1000);
    }
  };

  const handleDragOver = (e) => {
    e?.preventDefault();
    if (!disabled) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (e) => {
    e?.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    setIsDragging(false);
    
    if (disabled) return;
    
    const file = e?.dataTransfer?.files?.[0];
    if (file && validateFile(file)) {
      simulateUpload(file);
      setTimeout(() => handleFileRead(file), 1000);
    }
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
    setUploadProgress(0);
    setError('');
    if (fileInputRef?.current) {
      fileInputRef.current.value = '';
    }
    onFileSelect('', '');
  };

  return (
    <div className="w-full">
      <div
        className={`relative border-2 border-dashed rounded-lg p-8 transition-all duration-200 ${
          isDragging
            ? 'border-primary bg-primary/5'
            : uploadedFile
            ? 'border-success bg-success/5'
            : error
            ? 'border-error bg-error/5' :'border-border bg-muted/30'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:border-primary hover:bg-primary/5'}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !disabled && !uploadedFile && fileInputRef?.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={allowedFormats?.join(',')}
          onChange={handleFileChange}
          className="hidden"
          disabled={disabled}
        />

        {uploadProgress > 0 && uploadProgress < 100 ? (
          <div className="flex flex-col items-center gap-4">
            <Icon name="Loader2" size={48} className="text-primary animate-spin" />
            <div className="w-full max-w-xs">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">Uploading...</span>
                <span className="text-foreground font-medium">{uploadProgress}%</span>
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          </div>
        ) : uploadedFile ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-success/10 flex items-center justify-center">
                <Icon name="FileText" size={24} className="text-success" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{uploadedFile?.name}</p>
                <p className="text-xs text-muted-foreground">
                  {(uploadedFile?.size / 1024)?.toFixed(2)} KB
                </p>
              </div>
            </div>
            <button
              onClick={(e) => {
                e?.stopPropagation();
                handleRemoveFile();
              }}
              className="p-2 rounded-md hover:bg-muted transition-colors"
              disabled={disabled}
            >
              <Icon name="X" size={20} className="text-muted-foreground" />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <Icon name="Upload" size={32} className="text-primary" />
            </div>
            <div>
              <p className="text-base font-medium text-foreground mb-1">
                Drop your transcript file here
              </p>
              <p className="text-sm text-muted-foreground mb-2">
                or click to browse from your device
              </p>
              <p className="text-xs text-muted-foreground">
                Supported formats: {allowedFormats?.join(', ')} (Max 5MB)
              </p>
            </div>
          </div>
        )}
      </div>
      {error && (
        <div className="mt-3 flex items-start gap-2 p-3 rounded-md bg-error/10 border border-error/20">
          <Icon name="AlertCircle" size={18} className="text-error mt-0.5 flex-shrink-0" />
          <p className="text-sm text-error">{error}</p>
        </div>
      )}
    </div>
  );
};

export default FileUploadZone;