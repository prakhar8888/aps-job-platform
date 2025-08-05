import React, { useState, useRef } from 'react';
import { Upload, X, FileText, Image, File } from 'lucide-react';

const DragDropWidget = ({ 
  onFileUpload, 
  acceptedTypes = ['.pdf', '.docx', '.doc'], 
  maxSize = 10, // MB
  multiple = false,
  className = '' 
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    handleFiles(files);
  };

  const handleFiles = async (files) => {
    const validFiles = files.filter(file => {
      // Check file type
      const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
      if (!acceptedTypes.includes(fileExtension)) {
        alert(`File type ${fileExtension} is not supported. Accepted types: ${acceptedTypes.join(', ')}`);
        return false;
      }

      // Check file size
      if (file.size > maxSize * 1024 * 1024) {
        alert(`File ${file.name} is too large. Maximum size: ${maxSize}MB`);
        return false;
      }

      return true;
    });

    if (validFiles.length === 0) return;

    setIsUploading(true);

    try {
      // Process files
      const processedFiles = validFiles.map(file => ({
        id: Date.now() + Math.random(),
        file,
        name: file.name,
        size: file.size,
        type: file.type,
        status: 'uploading'
      }));

      setUploadedFiles(prev => [...prev, ...processedFiles]);

      // Simulate upload process
      for (const fileData of processedFiles) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Update file status
        setUploadedFiles(prev => 
          prev.map(f => 
            f.id === fileData.id 
              ? { ...f, status: 'completed' }
              : f
          )
        );

        // Call the upload callback
        if (onFileUpload) {
          onFileUpload(fileData.file);
        }
      }
    } catch (error) {
      console.error('Upload error:', error);
      setUploadedFiles(prev => 
        prev.map(f => ({ ...f, status: 'error' }))
      );
    } finally {
      setIsUploading(false);
    }
  };

  const removeFile = (fileId) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== fileId));
  };

  const getFileIcon = (fileName) => {
    const extension = fileName.split('.').pop().toLowerCase();
    switch (extension) {
      case 'pdf':
        return <FileText className="w-8 h-8 text-red-500" />;
      case 'doc':
      case 'docx':
        return <FileText className="w-8 h-8 text-blue-500" />;
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
        return <Image className="w-8 h-8 text-green-500" />;
      default:
        return <File className="w-8 h-8 text-gray-500" />;
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className={`w-full ${className}`}>
      {/* Drop Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`
          relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200
          ${isDragOver 
            ? 'border-aps-primary bg-aps-primary bg-opacity-5 scale-105' 
            : 'border-gray-300 hover:border-aps-primary hover:bg-gray-50'
          }
          ${isUploading ? 'pointer-events-none opacity-75' : ''}
        `}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple={multiple}
          accept={acceptedTypes.join(',')}
          onChange={handleFileSelect}
          className="hidden"
        />

        <div className="space-y-4">
          <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center transition-colors ${
            isDragOver ? 'bg-aps-primary text-white' : 'bg-gray-100 text-gray-400'
          }`}>
            <Upload className="w-8 h-8" />
          </div>

          <div>
            <h3 className="text-lg font-semibold text-aps-dark mb-2">
              {isDragOver ? 'Drop files here' : 'Upload Files'}
            </h3>
            <p className="text-aps-gray-600 mb-4">
              Drag and drop files here, or click to browse
            </p>
            <div className="text-sm text-aps-gray-500">
              <p>Supported formats: {acceptedTypes.join(', ')}</p>
              <p>Maximum file size: {maxSize}MB</p>
            </div>
          </div>

          {isUploading && (
            <div className="flex items-center justify-center space-x-2">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-aps-primary"></div>
              <span className="text-aps-primary font-medium">Uploading...</span>
            </div>
          )}
        </div>
      </div>

      {/* Uploaded Files List */}
      {uploadedFiles.length > 0 && (
        <div className="mt-6 space-y-3">
          <h4 className="font-semibold text-aps-dark">Uploaded Files</h4>
          
          {uploadedFiles.map((fileData) => (
            <div
              key={fileData.id}
              className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg"
            >
              <div className="flex items-center space-x-3">
                {getFileIcon(fileData.name)}
                
                <div>
                  <h5 className="font-medium text-aps-dark">{fileData.name}</h5>
                  <p className="text-sm text-aps-gray-500">
                    {formatFileSize(fileData.size)}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                {/* Status Indicator */}
                <div className="flex items-center space-x-2">
                  {fileData.status === 'uploading' && (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-aps-primary"></div>
                      <span className="text-sm text-aps-primary">Uploading...</span>
                    </>
                  )}
                  {fileData.status === 'completed' && (
                    <>
                      <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                      <span className="text-sm text-green-600">Completed</span>
                    </>
                  )}
                  {fileData.status === 'error' && (
                    <>
                      <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                      <span className="text-sm text-red-600">Error</span>
                    </>
                  )}
                </div>

                {/* Remove Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(fileData.id);
                  }}
                  className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DragDropWidget;