import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import { Upload, FileText, Check, X, AlertCircle } from 'lucide-react';
import { toast } from 'react-toastify';

const ResumeUploader = ({ onUpload }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const parseResumeContent = async (file) => {
    // Mock resume parsing - in real implementation, this would call an API
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockData = {
          name: 'John Doe',
          email: 'john.doe@email.com',
          phone: '+91 9876543210',
          city: 'Mumbai',
          experience: '3-5',
          sector: 'corporate',
          designation: 'software-engineer',
          skills: ['JavaScript', 'React', 'Node.js', 'Python'],
          currentSalary: '6-10',
          expectedSalary: '10-15',
          resumeFile: file
        };
        resolve(mockData);
      }, 2000);
    });
  };

  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setIsUploading(true);
    setUploadProgress(0);

    try {
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      const extractedData = await parseResumeContent(file);
      
      clearInterval(progressInterval);
      setUploadProgress(100);
      
      setTimeout(() => {
        onUpload(file, extractedData);
        setIsUploading(false);
        setUploadProgress(0);
      }, 500);
      
    } catch (error) {
      toast.error('Failed to parse resume. Please try again.');
      setIsUploading(false);
      setUploadProgress(0);
    }
  }, [onUpload]);

  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024, // 10MB
    disabled: isUploading
  });

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 cursor-pointer ${
          isDragActive 
            ? 'border-aps-primary bg-aps-primary/5 scale-105' 
            : isUploading
            ? 'border-aps-secondary bg-aps-secondary/5'
            : 'border-aps-gray-300 hover:border-aps-primary hover:bg-aps-gray-50'
        } ${isUploading ? 'cursor-not-allowed' : 'cursor-pointer'}`}
      >
        <input {...getInputProps()} />
        
        <div className="space-y-4">
          {isUploading ? (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-16 h-16 bg-aps-secondary/10 rounded-full flex items-center justify-center mx-auto"
            >
              <div className="w-8 h-8 border-2 border-aps-secondary border-t-transparent rounded-full animate-spin"></div>
            </motion.div>
          ) : (
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto transition-all duration-300 ${
              isDragActive ? 'bg-aps-primary/20' : 'bg-aps-primary/10'
            }`}>
              <Upload className={`w-8 h-8 transition-all duration-300 ${
                isDragActive ? 'text-aps-primary scale-110' : 'text-aps-primary'
              }`} />
            </div>
          )}
          
          <div>
            {isUploading ? (
              <div className="space-y-2">
                <h3 className="text-lg font-medium text-aps-secondary">
                  Processing Resume...
                </h3>
                <p className="text-aps-gray-600">
                  Extracting information using AI
                </p>
                <div className="w-full bg-aps-gray-200 rounded-full h-2 max-w-xs mx-auto">
                  <motion.div
                    className="bg-aps-secondary h-2 rounded-full transition-all duration-300"
                    initial={{ width: 0 }}
                    animate={{ width: `${uploadProgress}%` }}
                  />
                </div>
                <p className="text-sm text-aps-gray-500">{uploadProgress}% complete</p>
              </div>
            ) : isDragActive ? (
              <div>
                <h3 className="text-lg font-medium text-aps-primary">
                  Drop your resume here
                </h3>
                <p className="text-aps-gray-600">
                  Release to start processing
                </p>
              </div>
            ) : (
              <div>
                <h3 className="text-lg font-medium text-aps-dark">
                  Upload Your Resume
                </h3>
                <p className="text-aps-gray-600 mb-2">
                  Drag & drop your resume here, or click to browse
                </p>
                <p className="text-sm text-aps-gray-500">
                  Supports PDF, DOC, DOCX (Max 10MB)
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* File Rejection Errors */}
      {fileRejections.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 border border-red-200 rounded-lg p-4"
        >
          <div className="flex items-center space-x-2 mb-2">
            <AlertCircle className="w-5 h-5 text-red-600" />
            <h4 className="font-medium text-red-800">Upload Error</h4>
          </div>
          <ul className="text-sm text-red-700 space-y-1">
            {fileRejections.map(({ file, errors }) => (
              <li key={file.path}>
                {file.path} - {errors.map(e => e.message).join(', ')}
              </li>
            ))}
          </ul>
        </motion.div>
      )}

      {/* Upload Tips */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-2">
          <FileText className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <h4 className="font-medium text-blue-800 mb-1">Tips for better results:</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Use a well-formatted resume with clear sections</li>
              <li>• Include contact information, experience, and skills</li>
              <li>• Avoid image-based or heavily formatted documents</li>
              <li>• Ensure text is readable and not corrupted</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeUploader;