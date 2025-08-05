import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, Filter, Download, Eye, Edit, 
  Trash2, Star, MapPin, Calendar, User 
} from 'lucide-react';
import { useHR } from '../../context/HRContext.jsx';
import { toast } from 'react-toastify';
import SearchBar from '../../components/Common/SearchBar.jsx';
import FormField from '../../components/Common/FormField.jsx';

const HRResumeSearch = () => {
  const { resumes, sectors, searchResumes, exportResumes, updateResumeStatus } = useHR();
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    sector: '',
    designation: '',
    experience: '',
    city: '',
    status: ''
  });
  const [selectedResumes, setSelectedResumes] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('uploadDate');
  const [sortOrder, setSortOrder] = useState('desc');

  const statusOptions = [
    { value: 'new', label: 'New', color: 'bg-blue-100 text-blue-800' },
    { value: 'reviewed', label: 'Reviewed', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'shortlisted', label: 'Shortlisted', color: 'bg-green-100 text-green-800' },
    { value: 'rejected', label: 'Rejected', color: 'bg-red-100 text-red-800' },
    { value: 'hired', label: 'Hired', color: 'bg-purple-100 text-purple-800' }
  ];

  const handleSearch = async (query) => {
    setSearchQuery(query);
    try {
      await searchResumes({ query, filters, sortBy, sortOrder });
    } catch (error) {
      toast.error('Search failed');
    }
  };

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    searchResumes({ query: searchQuery, filters: newFilters, sortBy, sortOrder });
  };

  const handleStatusUpdate = async (resumeId, newStatus) => {
    try {
      const result = await updateResumeStatus(resumeId, newStatus);
      if (result.success) {
        toast.success('Status updated successfully');
      } else {
        toast.error('Failed to update status');
      }
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const handleExport = async () => {
    try {
      const result = await exportResumes(selectedResumes.length > 0 ? selectedResumes : resumes.map(r => r.id));
      if (result.success) {
        toast.success('Export completed successfully');
      } else {
        toast.error('Export failed');
      }
    } catch (error) {
      toast.error('Export failed');
    }
  };

  const toggleResumeSelection = (resumeId) => {
    setSelectedResumes(prev => 
      prev.includes(resumeId) 
        ? prev.filter(id => id !== resumeId)
        : [...prev, resumeId]
    );
  };

  const selectAllResumes = () => {
    if (selectedResumes.length === resumes.length) {
      setSelectedResumes([]);
    } else {
      setSelectedResumes(resumes.map(r => r.id));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-aps-accent to-aps-warning rounded-xl p-6 text-white"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Search className="w-8 h-8" />
            <div>
              <h1 className="text-2xl font-bold">Resume Search</h1>
              <p className="text-orange-100">Search and manage candidate resumes</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold">{resumes.length}</p>
            <p className="text-orange-100">Total Resumes</p>
          </div>
        </div>
      </motion.div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-xl shadow-sm p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex-1 max-w-2xl">
            <SearchBar
              onSearch={handleSearch}
              placeholder="Search by name, email, skills, or keywords..."
              className="w-full"
            />
          </div>
          
          <div className="flex items-center space-x-4 ml-6">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-300 ${
                showFilters ? 'bg-aps-primary text-white' : 'bg-aps-gray-100 text-aps-gray-700 hover:bg-aps-gray-200'
              }`}
            >
              <Filter className="w-4 h-4" />
              <span>Filters</span>
            </button>
            
            <button
              onClick={handleExport}
              className="btn-secondary"
              disabled={resumes.length === 0}
            >
              <Download className="w-4 h-4 mr-2" />
              Export ({selectedResumes.length || resumes.length})
            </button>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-aps-gray-200 pt-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <FormField
                label="Sector"
                type="select"
                value={filters.sector}
                onChange={(e) => handleFilterChange('sector', e.target.value)}
                options={[
                  { value: '', label: 'All Sectors' },
                  ...sectors.map(sector => ({
                    value: sector.id,
                    label: sector.name
                  }))
                ]}
              />
              
              <FormField
                label="Experience"
                type="select"
                value={filters.experience}
                onChange={(e) => handleFilterChange('experience', e.target.value)}
                options={[
                  { value: '', label: 'All Experience' },
                  { value: '0-1', label: 'Fresher (0-1 years)' },
                  { value: '1-3', label: '1-3 years' },
                  { value: '3-5', label: '3-5 years' },
                  { value: '5-10', label: '5-10 years' },
                  { value: '10+', label: '10+ years' }
                ]}
              />
              
              <FormField
                label="City"
                type="select"
                value={filters.city}
                onChange={(e) => handleFilterChange('city', e.target.value)}
                options={[
                  { value: '', label: 'All Cities' },
                  { value: 'Mumbai', label: 'Mumbai' },
                  { value: 'Delhi', label: 'Delhi' },
                  { value: 'Bangalore', label: 'Bangalore' },
                  { value: 'Hyderabad', label: 'Hyderabad' },
                  { value: 'Chennai', label: 'Chennai' },
                  { value: 'Pune', label: 'Pune' }
                ]}
              />
              
              <FormField
                label="Status"
                type="select"
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                options={[
                  { value: '', label: 'All Status' },
                  ...statusOptions.map(status => ({
                    value: status.value,
                    label: status.label
                  }))
                ]}
              />
              
              <FormField
                label="Sort By"
                type="select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                options={[
                  { value: 'uploadDate', label: 'Upload Date' },
                  { value: 'name', label: 'Name' },
                  { value: 'experience', label: 'Experience' },
                  { value: 'status', label: 'Status' }
                ]}
              />
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Results */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-xl shadow-sm"
      >
        {/* Results Header */}
        <div className="flex items-center justify-between p-6 border-b border-aps-gray-200">
          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={selectedResumes.length === resumes.length && resumes.length > 0}
                onChange={selectAllResumes}
                className="rounded border-aps-gray-300 text-aps-primary focus:ring-aps-primary"
              />
              <span className="text-sm text-aps-gray-600">
                Select All ({resumes.length} resumes)
              </span>
            </label>
          </div>
          
          <div className="text-sm text-aps-gray-600">
            {selectedResumes.length > 0 && `${selectedResumes.length} selected`}
          </div>
        </div>

        {/* Resume List */}
        <div className="divide-y divide-aps-gray-200">
          {resumes.length === 0 ? (
            <div className="p-12 text-center">
              <Search className="w-12 h-12 text-aps-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-aps-gray-900 mb-2">No resumes found</h3>
              <p className="text-aps-gray-600">Try adjusting your search criteria or filters</p>
            </div>
          ) : (
            resumes.map((resume) => (
              <div key={resume.id} className="p-6 hover:bg-aps-gray-50 transition-colors duration-300">
                <div className="flex items-start space-x-4">
                  <label className="flex items-center mt-1">
                    <input
                      type="checkbox"
                      checked={selectedResumes.includes(resume.id)}
                      onChange={() => toggleResumeSelection(resume.id)}
                      className="rounded border-aps-gray-300 text-aps-primary focus:ring-aps-primary"
                    />
                  </label>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-medium text-aps-dark">{resume.name}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            statusOptions.find(s => s.value === resume.status)?.color || 'bg-gray-100 text-gray-800'
                          }`}>
                            {statusOptions.find(s => s.value === resume.status)?.label || resume.status}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-aps-gray-600 mb-3">
                          <div className="flex items-center space-x-1">
                            <User className="w-4 h-4" />
                            <span>{resume.email}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-4 h-4" />
                            <span>{resume.city}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>{resume.experience} experience</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4" />
                            <span>{resume.sector} - {resume.designation}</span>
                          </div>
                        </div>
                        
                        {resume.skills && (
                          <div className="flex flex-wrap gap-2 mb-3">
                            {resume.skills.slice(0, 5).map((skill, index) => (
                              <span key={index} className="px-2 py-1 bg-aps-primary/10 text-aps-primary rounded text-xs">
                                {skill}
                              </span>
                            ))}
                            {resume.skills.length > 5 && (
                              <span className="px-2 py-1 bg-aps-gray-100 text-aps-gray-600 rounded text-xs">
                                +{resume.skills.length - 5} more
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-2 ml-4">
                        <select
                          value={resume.status}
                          onChange={(e) => handleStatusUpdate(resume.id, e.target.value)}
                          className="text-sm border border-aps-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-aps-primary focus:border-transparent"
                        >
                          {statusOptions.map(status => (
                            <option key={status.value} value={status.value}>
                              {status.label}
                            </option>
                          ))}
                        </select>
                        
                        <button className="p-2 text-aps-gray-400 hover:text-aps-primary transition-colors duration-300">
                          <Eye className="w-4 h-4" />
                        </button>
                        
                        <button className="p-2 text-aps-gray-400 hover:text-aps-secondary transition-colors duration-300">
                          <Edit className="w-4 h-4" />
                        </button>
                        
                        <button className="p-2 text-aps-gray-400 hover:text-red-500 transition-colors duration-300">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default HRResumeSearch;