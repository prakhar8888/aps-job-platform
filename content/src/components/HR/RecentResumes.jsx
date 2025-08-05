import React, { useState, useEffect } from 'react';
import { FileText, Download, Eye, Clock, User, MapPin, Briefcase } from 'lucide-react';

const RecentResumes = () => {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data for recent resumes
    const mockResumes = [
      {
        id: 1,
        name: 'Rajesh Kumar',
        email: 'rajesh.kumar@email.com',
        phone: '+91 9876543210',
        city: 'Mumbai',
        experience: '5 years',
        sector: 'IT',
        designation: 'Software Engineer',
        uploadedAt: '2024-01-15T10:30:00Z',
        status: 'pending',
        score: 85
      },
      {
        id: 2,
        name: 'Priya Sharma',
        email: 'priya.sharma@email.com',
        phone: '+91 9876543211',
        city: 'Delhi',
        experience: '3 years',
        sector: 'Healthcare',
        designation: 'Nurse',
        uploadedAt: '2024-01-15T09:15:00Z',
        status: 'reviewed',
        score: 92
      },
      {
        id: 3,
        name: 'Amit Patel',
        email: 'amit.patel@email.com',
        phone: '+91 9876543212',
        city: 'Bangalore',
        experience: '7 years',
        sector: 'Finance',
        designation: 'Financial Analyst',
        uploadedAt: '2024-01-15T08:45:00Z',
        status: 'shortlisted',
        score: 88
      }
    ];

    setTimeout(() => {
      setResumes(mockResumes);
      setLoading(false);
    }, 1000);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'reviewed': return 'bg-blue-100 text-blue-800';
      case 'shortlisted': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-aps-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-aps-dark">Recent Resumes</h3>
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-aps-primary"></div>
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="h-16 bg-gray-200 rounded-lg"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-aps-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-aps-dark">Recent Resumes</h3>
        <button className="text-aps-primary hover:text-aps-primary-dark text-sm font-medium">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {resumes.map((resume) => (
          <div
            key={resume.id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-aps-primary bg-opacity-10 rounded-full flex items-center justify-center">
                  <FileText className="w-5 h-5 text-aps-primary" />
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <h4 className="text-sm font-medium text-aps-dark truncate">
                    {resume.name}
                  </h4>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(resume.status)}`}>
                    {resume.status}
                  </span>
                </div>
                
                <div className="flex items-center space-x-4 text-xs text-aps-gray-600">
                  <div className="flex items-center space-x-1">
                    <Briefcase className="w-3 h-3" />
                    <span>{resume.designation}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-3 h-3" />
                    <span>{resume.city}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>{formatDate(resume.uploadedAt)}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <div className="text-right">
                <div className="text-sm font-medium text-aps-dark">
                  {resume.score}%
                </div>
                <div className="text-xs text-aps-gray-500">Match</div>
              </div>
              
              <div className="flex space-x-1">
                <button className="p-1 text-aps-gray-400 hover:text-aps-primary transition-colors">
                  <Eye className="w-4 h-4" />
                </button>
                <button className="p-1 text-aps-gray-400 hover:text-aps-primary transition-colors">
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {resumes.length === 0 && (
        <div className="text-center py-8">
          <FileText className="w-12 h-12 text-aps-gray-300 mx-auto mb-4" />
          <p className="text-aps-gray-500">No recent resumes found</p>
        </div>
      )}
    </div>
  );
};

export default RecentResumes;