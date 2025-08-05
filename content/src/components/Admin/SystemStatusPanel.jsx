import React from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle, AlertCircle, XCircle, 
  Zap, Database, Cloud, Shield 
} from 'lucide-react';

const SystemStatusPanel = ({ settings }) => {
  const systemComponents = [
    {
      name: 'Resume Parser',
      status: settings?.apiConfig?.resumeParser === 'enabled' ? 'operational' : 'down',
      icon: Zap
    },
    {
      name: 'Database',
      status: 'operational',
      icon: Database
    },
    {
      name: 'Cloud Storage',
      status: settings?.apiConfig?.cloudinary === 'enabled' ? 'operational' : 'down',
      icon: Cloud
    },
    {
      name: 'Security',
      status: 'operational',
      icon: Shield
    }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'operational':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      case 'down':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'operational':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'warning':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'down':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="dashboard-card"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-aps-dark">System Status</h2>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-sm text-green-600 font-medium">All Systems Operational</span>
        </div>
      </div>

      <div className="space-y-4">
        {systemComponents.map((component) => {
          const Icon = component.icon;
          
          return (
            <div
              key={component.name}
              className={`flex items-center justify-between p-4 rounded-lg border ${getStatusColor(component.status)}`}
            >
              <div className="flex items-center space-x-3">
                <Icon className="w-5 h-5" />
                <span className="font-medium">{component.name}</span>
              </div>
              
              <div className="flex items-center space-x-2">
                {getStatusIcon(component.status)}
                <span className="text-sm font-medium capitalize">
                  {component.status}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Feature Toggles */}
      <div className="mt-6 pt-6 border-t border-aps-gray-200">
        <h3 className="text-lg font-medium text-aps-dark mb-4">Active Features</h3>
        
        <div className="grid grid-cols-2 gap-3">
          {Object.entries(settings?.features || {}).map(([feature, enabled]) => (
            <div
              key={feature}
              className={`p-3 rounded-lg text-center text-sm font-medium ${
                enabled 
                  ? 'bg-green-50 text-green-700 border border-green-200' 
                  : 'bg-gray-50 text-gray-500 border border-gray-200'
              }`}
            >
              {feature.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default SystemStatusPanel;