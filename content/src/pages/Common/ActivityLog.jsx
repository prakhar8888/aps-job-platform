import React, { useState, useEffect } from 'react';
import { Clock, User, FileText, Upload, Download, Edit, Trash2, Eye, Filter, Search } from 'lucide-react';

const ActivityLog = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Mock activity data
    const mockActivities = [
      {
        id: 1,
        type: 'upload',
        user: 'Priya Sharma',
        action: 'uploaded a resume',
        target: 'Rajesh Kumar - Software Engineer',
        timestamp: '2024-01-15T10:30:00Z',
        details: 'Resume parsed and assigned to IT sector'
      },
      {
        id: 2,
        type: 'view',
        user: 'Admin',
        action: 'viewed candidate profile',
        target: 'Amit Patel - Financial Analyst',
        timestamp: '2024-01-15T10:15:00Z',
        details: 'Accessed from admin dashboard'
      },
      {
        id: 3,
        type: 'edit',
        user: 'HR Manager',
        action: 'updated sector configuration',
        target: 'Healthcare sector',
        timestamp: '2024-01-15T09:45:00Z',
        details: 'Added new designation: Physiotherapist'
      },
      {
        id: 4,
        type: 'download',
        user: 'Priya Sharma',
        action: 'downloaded resume',
        target: 'Sarah Johnson - Marketing Manager',
        timestamp: '2024-01-15T09:30:00Z',
        details: 'PDF export completed'
      },
      {
        id: 5,
        type: 'delete',
        user: 'Admin',
        action: 'deleted candidate record',
        target: 'John Doe - Duplicate Entry',
        timestamp: '2024-01-15T09:00:00Z',
        details: 'Removed duplicate candidate entry'
      }
    ];

    setTimeout(() => {
      setActivities(mockActivities);
      setLoading(false);
    }, 1000);
  }, []);

  const getActivityIcon = (type) => {
    switch (type) {
      case 'upload': return Upload;
      case 'download': return Download;
      case 'view': return Eye;
      case 'edit': return Edit;
      case 'delete': return Trash2;
      default: return FileText;
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'upload': return 'bg-green-100 text-green-600';
      case 'download': return 'bg-blue-100 text-blue-600';
      case 'view': return 'bg-gray-100 text-gray-600';
      case 'edit': return 'bg-yellow-100 text-yellow-600';
      case 'delete': return 'bg-red-100 text-red-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredActivities = activities.filter(activity => {
    const matchesFilter = filter === 'all' || activity.type === filter;
    const matchesSearch = activity.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         activity.target.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         activity.action.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm border border-aps-gray-200 p-6">
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-gray-200 rounded w-1/4"></div>
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-16 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-aps-dark mb-2">Activity Log</h1>
          <p className="text-aps-gray-600">Track all system activities and user actions</p>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-sm border border-aps-gray-200 p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-aps-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search activities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-aps-primary focus:border-transparent"
              />
            </div>

            {/* Filter Buttons */}
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-aps-gray-400" />
              <div className="flex space-x-2">
                {['all', 'upload', 'view', 'edit', 'download', 'delete'].map((filterType) => (
                  <button
                    key={filterType}
                    onClick={() => setFilter(filterType)}
                    className={`px-3 py-1 text-sm rounded-md transition-colors capitalize ${
                      filter === filterType
                        ? 'bg-aps-primary text-white'
                        : 'bg-gray-100 text-aps-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {filterType}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Activity List */}
        <div className="bg-white rounded-xl shadow-sm border border-aps-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-aps-dark">
              Recent Activities ({filteredActivities.length})
            </h2>
          </div>

          <div className="divide-y divide-gray-200">
            {filteredActivities.map((activity) => {
              const IconComponent = getActivityIcon(activity.type);
              
              return (
                <div key={activity.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start space-x-4">
                    {/* Icon */}
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getActivityColor(activity.type)}`}>
                      <IconComponent className="w-5 h-5" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-aps-dark">{activity.user}</span>
                          <span className="text-aps-gray-600">{activity.action}</span>
                        </div>
                        <div className="flex items-center space-x-1 text-sm text-aps-gray-500">
                          <Clock className="w-4 h-4" />
                          <span>{formatTimestamp(activity.timestamp)}</span>
                        </div>
                      </div>
                      
                      <div className="text-sm text-aps-gray-600 mb-2">
                        <span className="font-medium">{activity.target}</span>
                      </div>
                      
                      {activity.details && (
                        <div className="text-sm text-aps-gray-500">
                          {activity.details}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredActivities.length === 0 && (
            <div className="p-12 text-center">
              <Clock className="w-12 h-12 text-aps-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-aps-gray-900 mb-2">No activities found</h3>
              <p className="text-aps-gray-500">
                {searchTerm || filter !== 'all' 
                  ? 'Try adjusting your search or filter criteria'
                  : 'Activities will appear here as users interact with the system'
                }
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ActivityLog;