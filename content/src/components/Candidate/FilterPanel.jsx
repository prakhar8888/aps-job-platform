import React from 'react';
import { motion } from 'framer-motion';
import { X, Filter } from 'lucide-react';
import FormField from '../Common/FormField.jsx';

const FilterPanel = ({ sectors, activeFilters, onFilterChange, onClose }) => {
  const handleFilterUpdate = (key, value) => {
    const updatedFilters = {
      ...activeFilters,
      [key]: value
    };
    onFilterChange(updatedFilters);
  };

  const cities = [
    'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata',
    'Pune', 'Ahmedabad', 'Jaipur', 'Lucknow', 'Kanpur', 'Nagpur'
  ];

  const salaryRanges = [
    { value: '0-3', label: '0-3 LPA' },
    { value: '3-6', label: '3-6 LPA' },
    { value: '6-10', label: '6-10 LPA' },
    { value: '10-15', label: '10-15 LPA' },
    { value: '15+', label: '15+ LPA' }
  ];

  const experienceRanges = [
    { value: '0-1', label: 'Fresher (0-1 years)' },
    { value: '1-3', label: '1-3 years' },
    { value: '3-5', label: '3-5 years' },
    { value: '5-10', label: '5-10 years' },
    { value: '10+', label: '10+ years' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white border-b border-aps-gray-200 shadow-sm"
    >
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-aps-primary" />
            <h3 className="text-lg font-semibold text-aps-dark">Filter Jobs</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-aps-gray-100 transition-colors duration-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <FormField
            label="Sector"
            type="select"
            value={activeFilters.sector}
            onChange={(e) => handleFilterUpdate('sector', e.target.value)}
            options={[
              { value: '', label: 'All Sectors' },
              ...sectors.map(sector => ({
                value: sector.id,
                label: sector.name
              }))
            ]}
          />

          <FormField
            label="City"
            type="select"
            value={activeFilters.city}
            onChange={(e) => handleFilterUpdate('city', e.target.value)}
            options={[
              { value: '', label: 'All Cities' },
              ...cities.map(city => ({
                value: city,
                label: city
              }))
            ]}
          />

          <FormField
            label="Salary Range"
            type="select"
            value={activeFilters.salaryRange}
            onChange={(e) => handleFilterUpdate('salaryRange', e.target.value)}
            options={[
              { value: '', label: 'Any Salary' },
              ...salaryRanges
            ]}
          />

          <FormField
            label="Experience"
            type="select"
            value={activeFilters.experience}
            onChange={(e) => handleFilterUpdate('experience', e.target.value)}
            options={[
              { value: '', label: 'Any Experience' },
              ...experienceRanges
            ]}
          />

          <div className="flex items-end">
            <button
              onClick={() => onFilterChange({
                sector: '',
                designation: '',
                city: '',
                salaryRange: '',
                experience: ''
              })}
              className="w-full px-4 py-3 bg-aps-gray-100 text-aps-gray-700 rounded-lg hover:bg-aps-gray-200 transition-colors duration-300"
            >
              Clear All
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FilterPanel;