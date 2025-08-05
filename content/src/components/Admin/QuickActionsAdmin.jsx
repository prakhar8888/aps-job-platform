import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  UserPlus, Settings, BarChart3, Shield, 
  Zap, Users, FileText, Crown 
} from 'lucide-react';

const QuickActionsAdmin = () => {
  const actions = [
    {
      title: 'Add Employee',
      description: 'Create new employee account',
      icon: UserPlus,
      href: '/admin/recruitment',
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'System Settings',
      description: 'Configure system preferences',
      icon: Settings,
      href: '/admin/settings',
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'View Insights',
      description: 'Analytics and reports',
      icon: BarChart3,
      href: '/admin/insights',
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Control Panel',
      description: 'Advanced system controls',
      icon: Shield,
      href: '/admin/control-panel',
      color: 'from-red-500 to-red-600'
    },
    {
      title: 'Integrations',
      description: 'Manage API integrations',
      icon: Zap,
      href: '/admin/integrations',
      color: 'from-yellow-500 to-yellow-600'
    },
    {
      title: 'User Management',
      description: 'Manage all system users',
      icon: Users,
      href: '/admin/employees',
      color: 'from-indigo-500 to-indigo-600'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="dashboard-card"
    >
      <div className="flex items-center space-x-2 mb-6">
        <Crown className="w-6 h-6 text-aps-accent" />
        <h2 className="text-xl font-semibold text-aps-dark">Quick Actions</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {actions.map((action, index) => {
          const Icon = action.icon;
          
          return (
            <motion.div
              key={action.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                to={action.href}
                className="block p-4 bg-gradient-to-r hover:shadow-lg rounded-lg transition-all duration-300 group"
                style={{
                  background: `linear-gradient(135deg, ${action.color.split(' ')[0].replace('from-', '')} 0%, ${action.color.split(' ')[2].replace('to-', '')} 100%)`
                }}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center group-hover:bg-white/30 transition-colors duration-300">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-white group-hover:text-white/90 transition-colors duration-300">
                      {action.title}
                    </h3>
                    <p className="text-xs text-white/80 mt-1">
                      {action.description}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default QuickActionsAdmin;