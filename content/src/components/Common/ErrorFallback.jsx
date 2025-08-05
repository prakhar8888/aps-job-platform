import React from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-aps-gray-50 p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="w-8 h-8 text-red-600" />
        </div>
        
        <h1 className="text-xl font-bold text-aps-dark mb-4">
          Oops! Something went wrong
        </h1>
        
        <p className="text-aps-gray-600 mb-6">
          We apologize for the inconvenience. An unexpected error has occurred.
        </p>
        
        <div className="space-y-4">
          <button
            onClick={resetErrorBoundary}
            className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-aps-primary text-white rounded-lg hover:bg-aps-secondary transition-colors duration-300"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Try Again</span>
          </button>
          
          <button
            onClick={() => window.location.href = '/'}
            className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-aps-gray-100 text-aps-gray-700 rounded-lg hover:bg-aps-gray-200 transition-colors duration-300"
          >
            <Home className="w-4 h-4" />
            <span>Go Home</span>
          </button>
        </div>
        
        {import.meta.env.DEV && (
          <details className="mt-6 text-left">
            <summary className="text-sm text-aps-gray-500 cursor-pointer">
              Error Details (Development)
            </summary>
            <pre className="mt-2 p-4 bg-aps-gray-100 rounded-lg text-xs text-red-600 overflow-auto">
              {error.message}
            </pre>
          </details>
        )}
      </div>
    </div>
  );
};

export default ErrorFallback;