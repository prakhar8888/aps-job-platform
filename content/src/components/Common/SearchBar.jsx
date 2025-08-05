import React, { useState, useCallback } from 'react';
import { Search, X } from 'lucide-react';
import { debounce } from '../../utils/helpers.js';

const SearchBar = ({ 
  placeholder = "Search...", 
  onSearch, 
  value = "", 
  className = "",
  showClearButton = true 
}) => {
  const [searchTerm, setSearchTerm] = useState(value);

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((term) => {
      if (onSearch) {
        onSearch(term);
      }
    }, 300),
    [onSearch]
  );

  const handleInputChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    debouncedSearch(term);
  };

  const handleClear = () => {
    setSearchTerm('');
    if (onSearch) {
      onSearch('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchTerm);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className={`relative flex items-center ${className}`}>
        <Search className="absolute left-3 w-5 h-5 text-aps-gray-400" />
        
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder={placeholder}
          className="w-full pl-10 pr-12 py-3 border border-aps-gray-300 rounded-lg focus:ring-2 focus:ring-aps-primary focus:border-transparent transition-all duration-300 bg-white/90"
        />
        
        {showClearButton && searchTerm && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 p-1 text-aps-gray-400 hover:text-aps-gray-600 transition-colors duration-200"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </form>
  );
};

export default SearchBar;