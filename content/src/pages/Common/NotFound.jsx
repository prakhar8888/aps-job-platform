import React from 'react';
import { Home, ArrowLeft, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-aps-primary to-aps-secondary flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {/* 404 Animation */}
          <div className="mb-8">
            <div className="text-8xl font-bold text-aps-primary mb-4 animate-bounce">
              404
            </div>
            <div className="w-24 h-1 bg-aps-primary mx-auto rounded-full"></div>
          </div>

          {/* Error Message */}
          <h1 className="text-2xl font-bold text-aps-dark mb-4">
            Page Not Found
          </h1>
          <p className="text-aps-gray-600 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>

          {/* Action Buttons */}
          <div className="space-y-4">
            <Link
              to="/"
              className="w-full bg-aps-primary text-white py-3 px-6 rounded-lg font-medium hover:bg-aps-primary-dark transition-colors flex items-center justify-center space-x-2"
            >
              <Home className="w-5 h-5" />
              <span>Go Home</span>
            </Link>

            <button
              onClick={() => window.history.back()}
              className="w-full bg-gray-100 text-aps-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Go Back</span>
            </button>
          </div>

          {/* Search Suggestion */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-aps-gray-500 mb-4">
              Or try searching for what you need:
            </p>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-aps-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-aps-primary focus:border-transparent"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    // Handle search functionality
                    console.log('Search:', e.target.value);
                  }
                }}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-white text-sm opacity-75">
          <p>© 2024 Akshya Patra Services. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;