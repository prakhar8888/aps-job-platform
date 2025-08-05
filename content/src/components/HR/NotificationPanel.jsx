import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bell, X, Check, Clock, AlertCircle, 
  FileText, User, Settings, Trash2 
} from 'lucide-react';
import { useHR } from '../../context/HRContext.jsx';
import { toast } from 'react-toastify';

const NotificationPanel = ({ onClose }) => {
  const { notifications, markNotificationAsRead, deleteNotification } = useHR();
  const [filter, setFilter] = useState('all');

  const notificationTypes = {
    resume: { icon: FileText, color: 'text-blue-600', bg: 'bg-blue-100' },
    user: { icon: User, color: 'text-green-600', bg: 'bg-green-100' },
    system: { icon: Settings, color: 'text-purple-600', bg: 'bg-purple-100' },
    alert: { icon: AlertCircle, color: 'text-red-600', bg: 'bg-red-100' }
  };

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notification.read;
    return notification.type === filter;
  });

  const handleMarkAsRead = async (notificationId) => {
    try {
      await markNotificationAsRead(notificationId);
    } catch (error) {
      toast.error('Failed to mark notification as read');
    }
  };

  const handleDelete = async (notificationId) => {
    try {
      await deleteNotification(notificationId);
      toast.success('Notification deleted');
    } catch (error) {
      toast.error('Failed to delete notification');
    }
  };

  const formatTime = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now - time) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: -10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: -10 }}
      className="absolute right-0 top-12 w-96 bg-white rounded-xl shadow-2xl border border-aps-gray-200 z-50"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-aps-gray-200">
        <div className="flex items-center space-x-2">
          <Bell className="w-5 h-5 text-aps-primary" />
          <h3 className="font-semibold text-aps-dark">Notifications</h3>
          {notifications.filter(n => !n.read).length > 0 && (
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
              {notifications.filter(n => !n.read).length}
            </span>
          )}
        </div>
        <button
          onClick={onClose}
          className="p-1 hover:bg-aps-gray-100 rounded-lg transition-colors duration-200"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center space-x-1 p-2 border-b border-aps-gray-200">
        {['all', 'unread', 'resume', 'user', 'system'].map((filterType) => (
          <button
            key={filterType}
            onClick={() => setFilter(filterType)}
            className={`px-3 py-1 text-xs font-medium rounded-lg transition-colors duration-200 capitalize ${
              filter === filterType
                ? 'bg-aps-primary text-white'
                : 'text-aps-gray-600 hover:bg-aps-gray-100'
            }`}
          >
            {filterType}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="max-h-96 overflow-y-auto">
        {filteredNotifications.length === 0 ? (
          <div className="p-8 text-center">
            <Bell className="w-12 h-12 text-aps-gray-300 mx-auto mb-3" />
            <p className="text-aps-gray-500">No notifications found</p>
          </div>
        ) : (
          <div className="divide-y divide-aps-gray-100">
            {filteredNotifications.map((notification) => {
              const typeConfig = notificationTypes[notification.type] || notificationTypes.system;
              const Icon = typeConfig.icon;
              
              return (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`p-4 hover:bg-aps-gray-50 transition-colors duration-200 ${
                    !notification.read ? 'bg-blue-50/50' : ''
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${typeConfig.bg}`}>
                      <Icon className={`w-4 h-4 ${typeConfig.color}`} />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className={`text-sm ${!notification.read ? 'font-medium text-aps-dark' : 'text-aps-gray-700'}`}>
                            {notification.title}
                          </p>
                          <p className="text-xs text-aps-gray-500 mt-1">
                            {notification.message}
                          </p>
                          <div className="flex items-center space-x-2 mt-2">
                            <Clock className="w-3 h-3 text-aps-gray-400" />
                            <span className="text-xs text-aps-gray-400">
                              {formatTime(notification.timestamp)}
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-1 ml-2">
                          {!notification.read && (
                            <button
                              onClick={() => handleMarkAsRead(notification.id)}
                              className="p-1 text-aps-gray-400 hover:text-aps-primary transition-colors duration-200"
                              title="Mark as read"
                            >
                              <Check className="w-3 h-3" />
                            </button>
                          )}
                          <button
                            onClick={() => handleDelete(notification.id)}
                            className="p-1 text-aps-gray-400 hover:text-red-500 transition-colors duration-200"
                            title="Delete"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* Footer */}
      {filteredNotifications.length > 0 && (
        <div className="p-3 border-t border-aps-gray-200">
          <button
            onClick={() => {
              // Mark all as read
              filteredNotifications.forEach(notification => {
                if (!notification.read) {
                  handleMarkAsRead(notification.id);
                }
              });
            }}
            className="w-full text-center text-sm text-aps-primary hover:text-aps-secondary transition-colors duration-200"
          >
            Mark all as read
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default NotificationPanel;