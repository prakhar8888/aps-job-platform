import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';

const FormField = forwardRef(({ 
  label, 
  type = 'text', 
  error, 
  icon: Icon, 
  options = [], 
  placeholder,
  className = '',
  disabled = false,
  ...props 
}, ref) => {
  const baseInputClasses = `
    w-full px-4 py-3 border rounded-lg transition-all duration-300 
    focus:ring-2 focus:ring-aps-primary focus:border-transparent
    ${disabled ? 'bg-aps-gray-100 cursor-not-allowed' : 'bg-white'}
    ${Icon ? 'pl-10' : ''}
    ${error ? 'border-red-500' : 'border-aps-gray-300'}
  `;

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-aps-gray-700">
          {label}
        </label>
      )}
      
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-aps-gray-400" />
        )}
        
        {type === 'select' ? (
          <select
            ref={ref}
            disabled={disabled}
            className={baseInputClasses}
            {...props}
          >
            <option value="">{placeholder || `Select ${label?.toLowerCase() || 'option'}`}</option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ) : type === 'textarea' ? (
          <textarea
            ref={ref}
            disabled={disabled}
            placeholder={placeholder}
            className={`${baseInputClasses} resize-none`}
            rows="4"
            {...props}
          />
        ) : (
          <input
            ref={ref}
            type={type}
            disabled={disabled}
            placeholder={placeholder}
            className={baseInputClasses}
            {...props}
          />
        )}
      </div>
      
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-red-600 flex items-center space-x-1"
        >
          <span>⚠️</span>
          <span>{error}</span>
        </motion.p>
      )}
    </div>
  );
});

FormField.displayName = 'FormField';

export default FormField;