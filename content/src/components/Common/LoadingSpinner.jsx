import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const LoadingSpinner = ({ 
  message = "Loading...", 
  size = "large", 
  fullScreen = true 
}) => {
  const sizeClasses = {
    small: "w-4 h-4",
    medium: "w-6 h-6", 
    large: "w-8 h-8",
    xlarge: "w-12 h-12"
  };

  const textSizes = {
    small: "text-sm",
    medium: "text-base",
    large: "text-lg", 
    xlarge: "text-xl"
  };

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="mb-4"
          >
            <Loader2 className={`${sizeClasses[size]} text-aps-primary mx-auto`} />
          </motion.div>
          
          <p className={`${textSizes[size]} text-aps-gray-600 font-medium`}>
            {message}
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="mb-2"
        >
          <Loader2 className={`${sizeClasses[size]} text-aps-primary mx-auto`} />
        </motion.div>
        
        <p className={`${textSizes[size]} text-aps-gray-600`}>
          {message}
        </p>
      </motion.div>
    </div>
  );
};

export default LoadingSpinner;