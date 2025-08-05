import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import { 
  Upload, FileText, Check, X, AlertCircle, 
  Folder, Plus, Edit3, Save, Trash2 
} from 'lucide-react';
import { useHR } from '../../context/HRContext.jsx';
import { toast } from 'react-toastify';
import FormField from '../../components/Common/FormField.jsx';

const HRResumeUpload = () => {
  const { sectors, uploadResume, parseResume, permissions } = useHR();
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [parsedData, setParsedData] = useState({});
  const [selectedSector, setSelectedSector] = useState('');
  const [selectedDesignation, setSelectedDesignation] = useState('');
  const [customFolder, setCustomFolder] = useState('');
  const [isCreatingFolder, setIsCreatingFolder] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const onDrop = useCallback(async (acceptedFiles) => {
    setIsProcessing(true);
    
    for (const file of acceptedFiles) {
      try {
        // Parse resume
        const parseResult = await parseResume(file);
        
        if (parseResult.success) {
          const fileData = {
            id: Date.now() + Math.random(),
            file,
            parsed: parseResult.data,
            status: 'parsed',
            sector: parseResult.data.suggestedSector || '',
            designation: parseResult.data.suggestedDesignation || ''
          };
          
          setUploadedFiles(prev => [...prev, fileData]);
          setParsedData(prev => ({
            ...prev,
            [fileData.id]: parseResult.data
          }));
          
          toast.success(`Resume parsed successfully: ${file.name}`);
        } else {
          toast.error(`Failed to parse: ${file.name}`);
        }
      } catch (error) {
        toast.error(`Error processing: ${file.name}`);
      }
    }
    
    setIsProcessing(false);
  }, [parseResume]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    multiple: true
  });

  const handleSectorChange = (fileId, sectorId) => {
    setUploadedFiles(prev => 
      prev.map(file => 
        file.id === fileId 
          ? { ...file, sector: sectorId, designation: '' }
          : file
      )
    );
  };

  const handleDesignationChange = (fileId, designationId) => {
    setUploadedFiles(prev => 
      prev.map(file => 
        file.id === fileId 
          ? { ...file, designation: designationId }
          : file
      )
    );
  };

  const handleCreateCustomFolder = async (fileId) => {
    if (!customFolder.trim()) {
      toast.error('Please enter a folder name');
      return;
    }

    try {
      // Create custom folder logic here
      setUploadedFiles(prev => 
        prev.map(file => 
          file.id === fileId 
            ? { ...file, customFolder: customFolder.trim() }
            : file
        )
      );
      
      setCustomFolder('');
      setIsCreatingFolder(false);
      toast.success('Custom folder created successfully');
    } catch (error) {
      toast.error('Failed to create custom folder');
    }
  };

  const handleUploadResume = async (fileData) => {
    try {
      const uploadData = {
        file: fileData.file,
        parsed: fileData.parsed,
        sector: fileData.sector,
        designation: fileData.designation,
        customFolder: fileData.customFolder
      };

      const result = await uploadResume(uploadData);
      
      if (result.success) {
        setUploadedFiles(prev => 
          prev.map(file => 
            file.id === fileData.id 
              ? { ...file, status: 'uploaded' }
              : file
          )
        );
        toast.success('Resume uploaded successfully');
      } else {
        toast.error(result.error || 'Upload failed');
      }
    } catch (error) {
      toast.error('Upload failed');
    }
  };

  const removeFile = (fileId) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== fileId));
    setParsedData(prev => {
      const newData = { ...prev };
      delete newData[fileId];
      return newData;
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-aps-secondary to-aps-accent rounded-xl p-6 text-white"
      >
        <div className="flex items-center space-x-4">
          <Upload className="w-8 h-8" />
          <div>
            <h1 className="text-2xl font-bold">Resume Upload</h1>
            <p className="text-blue-100">Upload and parse resumes with AI-powered extraction</p>
          </div>
        </div>
      </motion.div>

      {/* Upload Zone */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-xl shadow-sm p-6"
      >
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 cursor-pointer ${
            isDragActive 
              ? 'border-aps-primary bg-aps-primary/5' 
              : 'border-aps-gray-300 hover:border-aps-primary hover:bg-aps-gray-50'
          }`}
        >
          <input {...getInputProps()} />
          <div className="space-y-4">
            <div className="w-16 h-16 bg-aps-primary/10 rounded-full flex items-center justify-center mx-auto">
              <Upload className="w-8 h-8 text-aps-primary" />
            </div>
            
            {isDragActive ? (
              <div>
                <h3 className="text-lg font-medium text-aps-primary">Drop files here</h3>
                <p className="text-aps-gray-600">Release to upload resumes</p>
              </div>
            ) : (
              <div>
                <h3 className="text-lg font-medium text-aps-dark">
                  Drag & drop resumes here, or click to browse
                </h3>
                <p className="text-aps-gray-600">
                  Supports PDF, DOC, and DOCX files. Multiple files allowed.
                </p>
              </div>
            )}
            
            {isProcessing && (
              <div className="flex items-center justify-center space-x-2">
                <div className="loader"></div>
                <span className="text-aps-primary">Processing resumes...</span>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Uploaded Files */}
      {uploadedFiles.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-sm p-6"
        >
          <h2 className="text-xl font-semibold text-aps-dark mb-6">Uploaded Resumes</h2>
          
          <div className="space-y-6">
            {uploadedFiles.map((fileData) => (
              <div key={fileData.id} className="border border-aps-gray-200 rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <FileText className="w-6 h-6 text-aps-primary" />
                    <div>
                      <h3 className="font-medium text-aps-dark">{fileData.file.name}</h3>
                      <p className="text-sm text-aps-gray-500">
                        {(fileData.file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {fileData.status === 'uploaded' && (
                      <div className="flex items-center space-x-1 text-green-600">
                        <Check className="w-4 h-4" />
                        <span className="text-sm">Uploaded</span>
                      </div>
                    )}
                    <button
                      onClick={() => removeFile(fileData.id)}
                      className="p-1 text-red-500 hover:text-red-700 transition-colors duration-300"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Parsed Data */}
                {parsedData[fileData.id] && (
                  <div className="bg-aps-gray-50 rounded-lg p-4 mb-4">
                    <h4 className="font-medium text-aps-dark mb-3">Extracted Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-aps-gray-600">Name:</span>
                        <span className="ml-2 font-medium">{parsedData[fileData.id].name || 'N/A'}</span>
                      </div>
                      <div>
                        <span className="text-aps-gray-600">Email:</span>
                        <span className="ml-2 font-medium">{parsedData[fileData.id].email || 'N/A'}</span>
                      </div>
                      <div>
                        <span className="text-aps-gray-600">Phone:</span>
                        <span className="ml-2 font-medium">{parsedData[fileData.id].phone || 'N/A'}</span>
                      </div>
                      <div>
                        <span className="text-aps-gray-600">Experience:</span>
                        <span className="ml-2 font-medium">{parsedData[fileData.id].experience || 'N/A'}</span>
                      </div>
                      <div>
                        <span className="text-aps-gray-600">City:</span>
                        <span className="ml-2 font-medium">{parsedData[fileData.id].city || 'N/A'}</span>
                      </div>
                      <div>
                        <span className="text-aps-gray-600">Skills:</span>
                        <span className="ml-2 font-medium">
                          {parsedData[fileData.id].skills?.slice(0, 3).join(', ') || 'N/A'}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Sector and Designation Selection */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <FormField
                    label="Sector"
                    type="select"
                    value={fileData.sector}
                    onChange={(e) => handleSectorChange(fileData.id, e.target.value)}
                    options={sectors.map(sector => ({
                      value: sector.id,
                      label: sector.name
                    }))}
                  />
                  
                  <FormField
                    label="Designation"
                    type="select"
                    value={fileData.designation}
                    onChange={(e) => handleDesignationChange(fileData.id, e.target.value)}
                    options={
                      fileData.sector 
                        ? sectors.find(s => s.id === fileData.sector)?.designations?.map(d => ({
                            value: d.id,
                            label: d.name
                          })) || []
                        : []
                    }
                    disabled={!fileData.sector}
                  />
                </div>

                {/* Custom Folder Option */}
                {permissions.canCreateFolders && (
                  <div className="mb-4">
                    {isCreatingFolder ? (
                      <div className="flex items-center space-x-2">
                        <FormField
                          label="Custom Folder Name"
                          type="text"
                          value={customFolder}
                          onChange={(e) => setCustomFolder(e.target.value)}
                          placeholder="Enter folder name"
                        />
                        <button
                          onClick={() => handleCreateCustomFolder(fileData.id)}
                          className="btn-primary"
                        >
                          <Save className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setIsCreatingFolder(false)}
                          className="btn-secondary"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setIsCreatingFolder(true)}
                        className="flex items-center space-x-2 text-aps-primary hover:text-aps-secondary transition-colors duration-300"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Create Custom Folder</span>
                      </button>
                    )}
                  </div>
                )}

                {/* Upload Button */}
                <div className="flex items-center justify-end">
                  <button
                    onClick={() => handleUploadResume(fileData)}
                    disabled={!fileData.sector || !fileData.designation || fileData.status === 'uploaded'}
                    className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {fileData.status === 'uploaded' ? (
                      <>
                        <Check className="w-4 h-4 mr-2" />
                        Uploaded
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Resume
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default HRResumeUpload;