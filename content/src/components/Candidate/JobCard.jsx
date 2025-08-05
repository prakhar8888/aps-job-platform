import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MapPin, Clock, DollarSign, Briefcase, Calendar, ArrowRight } from 'lucide-react';

const JobCard = ({ job, index }) => {
  const formatSalary = (salary) => {
    if (typeof salary === 'string') return salary;
    return `₹${salary.min} - ₹${salary.max} LPA`;
  };

  const getExperienceText = (experience) => {
    if (typeof experience === 'string') return experience;
    return `${experience.min}-${experience.max} years`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl shadow-sm border border-aps-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 group"
    >
      <div className="p-6">
        {/* Job Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-aps-dark mb-1 group-hover:text-aps-primary transition-colors duration-300">
              {job.designation}
            </h3>
            <div className="flex items-center text-sm text-aps-gray-600 mb-2">
              <Briefcase className="w-4 h-4 mr-1" />
              <span>{job.sector}</span>
            </div>
          </div>
          
          {job.featured && (
            <div className="px-2 py-1 bg-aps-accent text-white text-xs font-medium rounded-full">
              Featured
            </div>
          )}
        </div>

        {/* Job Details */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center text-sm text-aps-gray-600">
            <MapPin className="w-4 h-4 mr-2" />
            <span>{job.city}</span>
            {job.area && <span className="ml-1">• {job.area}</span>}
          </div>
          
          <div className="flex items-center text-sm text-aps-gray-600">
            <DollarSign className="w-4 h-4 mr-2" />
            <span>{formatSalary(job.salary)}</span>
          </div>
          
          <div className="flex items-center text-sm text-aps-gray-600">
            <Clock className="w-4 h-4 mr-2" />
            <span>{getExperienceText(job.experience)} experience</span>
          </div>
          
          <div className="flex items-center text-sm text-aps-gray-600">
            <Calendar className="w-4 h-4 mr-2" />
            <span>Posted {new Date(job.postedAt).toLocaleDateString()}</span>
          </div>
        </div>

        {/* Skills/Keywords */}
        {job.keywords && job.keywords.length > 0 && (
          <div className="mb-6">
            <div className="flex flex-wrap gap-2">
              {job.keywords.slice(0, 4).map((keyword, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 bg-aps-primary/10 text-aps-primary text-xs rounded-full"
                >
                  {keyword}
                </span>
              ))}
              {job.keywords.length > 4 && (
                <span className="px-2 py-1 bg-aps-gray-100 text-aps-gray-600 text-xs rounded-full">
                  +{job.keywords.length - 4} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Apply Button */}
        <Link
          to={`/candidate/apply/${job.id}`}
          className="block w-full"
        >
          <button className="w-full bg-gradient-to-r from-aps-primary to-aps-secondary text-white py-3 px-4 rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95 group">
            <div className="flex items-center justify-center space-x-2">
              <span>Apply Now</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </div>
          </button>
        </Link>
      </div>

      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-aps-primary/5 to-aps-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </motion.div>
  );
};

export default JobCard;