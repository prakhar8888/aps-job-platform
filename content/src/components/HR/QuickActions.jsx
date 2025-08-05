import React from 'react';
import { Upload, Search, FileText, Users, BarChart3, Settings } from 'lucide-react';

const QuickActions = () => {
  const actions = [
    {
      id: 1,
      title: 'Upload Resume',
      description: 'Upload and parse new resumes',
      icon: Upload,
      color: 'bg-blue-500',
      href: '/hr/resume-upload'
    },
    {
      id: 2,
      title: 'Search Resumes',
      description: 'Find candidates by skills',
      icon: Search,
      color: 'bg-green-500',
      href: '/hr/resume-search'
    },
    {
      id: 3,
      title: 'Generate Report',
      description: 'Create daily reports',
      icon: FileText,
      color: 'bg-purple-500',
      href: '/hr/reports'
    },
    {
      id: 4,
      title: 'Manage Sectors',
      description: 'Add or edit job sectors',
      icon: Users,
      color: 'bg-orange-500',
      href: '/hr/settings'
    },
    {
      id: 5,
      title: 'View Analytics',
      description: 'Check performance metrics',
      icon: BarChart3,
      color: 'bg-indigo-500',
      href: '/hr/reports'
    },
    {
      id: 6,
      title: 'Settings',
      description: 'Configure preferences',
      icon: Settings,
      color: 'bg-gray-500',
      href: '/hr/settings'
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-aps-gray-200 p-6">
      <h3 className="text-lg font-semibold text-aps-dark mb-6">Quick Actions</h3>
      
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {actions.map((action) => {
          const IconComponent = action.icon;
          
          return (
            <button
              key={action.id}
              className="group p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-200 text-left"
              onClick={() => window.location.href = action.href}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <IconComponent className="w-5 h-5 text-white" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-aps-dark group-hover:text-aps-primary transition-colors">
                    {action.title}
                  </h4>
                  <p className="text-xs text-aps-gray-500 mt-1">
                    {action.description}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuickActions;