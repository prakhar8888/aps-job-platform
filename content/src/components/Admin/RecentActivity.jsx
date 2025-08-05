import React from 'react';
import { motion } from 'framer-motion';
import { Clock, User, FileText, Settings, Shield } from 'lucide-react';
import { formatDateTime } from '../../utils/helpers.js';

const RecentActivity = ({ logs }) => {
  const getActivityIcon = (action) => {
    if (action.includes('uploaded')) return FileText;
    if (action.includes('settings')) return Settings;
    if (action.includes('approved') || action.includes('rejected')) return Shield;
    return User;
  };

  const getActivityColor = (action) => {
    if (action.includes('approved')) return 'text-green-600 bg-green-50';
    if (action.includes('rejected')) return 'text-red-600 bg-red-50';
    if (action.includes('uploaded')) return 'text-blue-600 bg-blue-50';
    return 'text-aps-gray-600 bg-aps-gray-50';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="dashboard-card"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-aps-dark">Recent Activity</h2>
        <button className="text-aps-primary hover:text-aps-secondary transition-colors duration-300">
          View All
        </button>
      </div>

      <div className="space-y-4 max-h-96 overflow-y-auto">
        {logs.map((log, index) => {
          const Icon = getActivityIcon(log.action);
          const { date, time } = formatDateTime(log.timestamp);
          
          return (
            <motion.div
              key={log.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start space-x-3 p-3 hover:bg-aps-gray-50 rounded-lg transition-colors duration-300"
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getActivityColor(log.action)}`}>
                <Icon className="w-4 h-4" />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-aps-dark truncate">
                    {log.user}
                  </p>
                  <div className="flex items-center space-x-1 text-xs text-aps-gray-500">
                    <Clock className="w-3 h-3" />
                    <span>{time}</span>
                  </div>
                </div>
                
                <p className="text-sm text-aps-gray-600 mt-1">
                  {log.action}
                </p>
                
                {log.details && (
                  <p className="text-xs text-aps-gray-500 mt-1 truncate">
                    {log.details}
                  </p>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {logs.length === 0 && (
        <div className="text-center py-8">
          <Clock className="w-12 h-12 text-aps-gray-300 mx-auto mb-4" />
          <p className="text-aps-gray-500">No recent activity</p>
        </div>
      )}
    </motion.div>
  );
};

export default RecentActivity;