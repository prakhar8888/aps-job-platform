import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, X, Home, Settings, Shield, Users, BarChart3, 
  UserPlus, Zap, LogOut, Bell, User, Crown 
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth.js';
import { useAdmin } from '../context/AdminContext.jsx';

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { systemSettings } = useAdmin();

  const sidebarItems = [
    { name: 'Dashboard', href: '/admin', icon: Home },
    { name: 'Control Panel', href: '/admin/control-panel', icon: Shield },
    { name: 'Insights', href: '/admin/insights', icon: BarChart3 },
    { name: 'Employee Management', href: '/admin/employees', icon: Users },
    { name: 'Recruitment', href: '/admin/recruitment', icon: UserPlus },
    { name: 'Integrations', href: '/admin/integrations', icon: Zap },
    { name: 'Onboarding', href: '/admin/onboarding', icon: Crown },
    { name: 'Settings', href: '/admin/settings', icon: Settings }
  ];

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-aps-gray-50 to-aps-gray-100">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-aps-dark to-aps-gray-800 shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex items-center justify-between h-16 px-4 border-b border-aps-gray-700">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-aps-accent to-aps-orange rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-semibold text-white">Admin Panel</span>
          </div>
          <button
            className="lg:hidden p-1 rounded-lg hover:bg-aps-gray-700 text-white"
            onClick={() => setIsSidebarOpen(false)}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="mt-4 px-4">
          <ul className="space-y-2">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              
              return (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className={`flex items-center px-4 py-3 text-aps-gray-300 rounded-lg transition-all duration-300 hover:bg-aps-gray-700 hover:text-white ${
                      isActive ? 'bg-aps-accent text-white' : ''
                    }`}
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    <Icon className="w-5 h-5 mr-3" />
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* System Status */}
        <div className="absolute bottom-20 left-4 right-4">
          <div className="bg-aps-gray-700/50 rounded-lg p-3">
            <h4 className="text-xs font-medium text-aps-gray-300 mb-2">System Status</h4>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-xs text-aps-gray-400">All systems operational</span>
            </div>
          </div>
        </div>

        {/* User Profile Section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-aps-gray-700">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 bg-gradient-to-r from-aps-accent to-aps-orange rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-white">{user?.name}</p>
              <p className="text-xs text-aps-gray-400">System Administrator</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center space-x-2 px-3 py-2 text-sm text-red-400 hover:bg-red-500/20 rounded-lg transition-colors duration-200"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Top Header */}
        <header className="bg-white/80 backdrop-blur-md shadow-sm border-b border-aps-gray-200">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-aps-gray-100"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>

            <div className="flex-1 lg:flex-none">
              <h1 className="text-xl font-semibold text-aps-dark">
                {sidebarItems.find(item => item.href === location.pathname)?.name || 'Admin Dashboard'}
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              {/* Quick Actions */}
              <div className="hidden md:flex items-center space-x-2">
                {systemSettings?.features?.permanentApprovalMode && (
                  <div className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                    Auto-Approve ON
                  </div>
                )}
                {systemSettings?.features?.confidentialityMode && (
                  <div className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
                    Confidential Mode
                  </div>
                )}
              </div>

              {/* Notifications */}
              <div className="relative">
                <button
                  className="p-2 rounded-lg hover:bg-aps-gray-100 relative"
                  onClick={() => setShowNotifications(!showNotifications)}
                >
                  <Bell className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminLayout;