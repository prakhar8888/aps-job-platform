import React, { useState, useEffect } from 'react';
import { CandidateContext } from '../../context/CandidateContext.jsx';
import { Search, MapPin, Briefcase, Clock, Filter, Star } from 'lucide-react';
import { useCandidate } from '../../context/CandidateContext.jsx';
import JobCard from '../components/Candidate/JobCard.jsx';
import FilterPanel from '../components/Candidate/FilterPanel.jsx';
import SearchBar from '../../components/Common/SearchBar.jsx';
import LoadingSpinner from '../../components/Common/LoadingSpinner.jsx';

const CandidateHome = () => {
  const { jobs, sectors, loading, searchJobs } = useCandidate();
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilters, setActiveFilters] = useState({
    sector: '',
    designation: '',
    city: '',
    salaryRange: '',
    experience: ''
  });

  useEffect(() => {
    setFilteredJobs(jobs);
  }, [jobs]);

  const handleSearch = async (term) => {
    setSearchTerm(term);
    if (term.trim()) {
      const results = await searchJobs({ 
        ...activeFilters, 
        searchTerm: term 
      });
      setFilteredJobs(results);
    } else {
      setFilteredJobs(jobs);
    }
  };

  const handleFilterChange = async (filters) => {
    setActiveFilters(filters);
    const results = await searchJobs({ 
      ...filters, 
      searchTerm 
    });
    setFilteredJobs(results);
  };

  const clearFilters = () => {
    setActiveFilters({
      sector: '',
      designation: '',
      city: '',
      salaryRange: '',
      experience: ''
    });
    setSearchTerm('');
    setFilteredJobs(jobs);
  };

  if (loading) {
    return <LoadingSpinner message="Loading opportunities..." />;
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-aps-primary via-aps-secondary to-aps-primary text-white py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Find Your Dream Job
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Discover opportunities that match your skills and aspirations
            </p>
            
            {/* Search Section */}
            <div className="max-w-4xl mx-auto">
              <SearchBar
                placeholder="Search jobs by designation, skills, or location..."
                onSearch={handleSearch}
                value={searchTerm}
                className="bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-blue-200"
              />
              
              <div className="flex items-center justify-center mt-4 space-x-4">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center space-x-2 px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition-all duration-300"
                >
                  <Filter className="w-4 h-4" />
                  <span>Filters</span>
                </button>
                
                {Object.values(activeFilters).some(filter => filter) && (
                  <button
                    onClick={clearFilters}
                    className="flex items-center space-x-2 px-4 py-2 bg-red-500/20 rounded-lg hover:bg-red-500/30 transition-all duration-300"
                  >
                    <X className="w-4 h-4" />
                    <span>Clear</span>
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filter Panel */}
      {showFilters && (
        <FilterPanel
          sectors={sectors}
          activeFilters={activeFilters}
          onFilterChange={handleFilterChange}
          onClose={() => setShowFilters(false)}
        />
      )}

      {/* Jobs Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-aps-dark">
              Available Opportunities
            </h2>
            <div className="text-aps-gray-600">
              {filteredJobs.length} job{filteredJobs.length !== 1 ? 's' : ''} found
            </div>
          </div>

          {filteredJobs.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <div className="w-24 h-24 bg-aps-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Briefcase className="w-12 h-12 text-aps-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-aps-gray-700 mb-2">
                No jobs found
              </h3>
              <p className="text-aps-gray-500 mb-6">
                Try adjusting your search criteria or check back later for new opportunities.
              </p>
              <button
                onClick={clearFilters}
                className="btn-primary"
              >
                View All Jobs
              </button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredJobs.map((job, index) => (
                <JobCard
                  key={job.id}
                  job={job}
                  index={index}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-bold text-aps-primary mb-2">500+</div>
              <div className="text-aps-gray-600">Active Jobs</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-bold text-aps-secondary mb-2">100+</div>
              <div className="text-aps-gray-600">Companies</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-bold text-aps-accent mb-2">5K+</div>
              <div className="text-aps-gray-600">Candidates Placed</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-bold text-aps-success mb-2">95%</div>
              <div className="text-aps-gray-600">Success Rate</div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CandidateHome;