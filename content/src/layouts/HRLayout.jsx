import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, X, Home, Upload, Search, FileText, Settings, 
  LogOut, Bell, User, BarChart3, Users, FolderOpen 
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth.js';
import { useHR } from '../context/HRContext.jsx';
import NotificationPanel from '../components/HR/NotificationPanel.jsx';

const HRLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { permissions } = useHR();

  const sidebarItems = [
    { name: 'Dashboard', href: '/hr', icon: Home },
    { name: 'Upload Resume', href: '/hr/upload', icon: Upload },
    { name: 'Search Resumes', href: '/hr/search', icon: Search },
    { name: 'Reports', href: '/hr/reports', icon: FileText },
    { name: 'Analytics', href: '/hr/analytics', icon: BarChart3 },
    ...(permissions.canManageSectors ? [
      { name: 'Manage Sectors', href: '/hr/sectors', icon: FolderOpen }
    ] : []),
    { name: 'Settings', href: '/hr/settings', icon: Settings }
  ];

  const handleLogout = () => {
    logout();
    navigate('/hr/login');
  };

  return (
    <div className="min-h-screen bg-aps-gray-50">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex items-center justify-between h-16 px-4 border-b border-aps-gray-200">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-aps-primary to-aps-secondary rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-semibold text-aps-dark">HR Panel</span>
          </div>
          <button
            className="lg:hidden p-1 rounded-lg hover:bg-aps-gray-100"
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
                    className={`sidebar-item ${isActive ? 'bg-aps-primary text-white' : ''}`}
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

        {/* User Profile Section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-aps-gray-200">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 bg-aps-primary rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-aps-dark">{user?.name}</p>
              <p className="text-xs text-aps-gray-500">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center space-x-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Top Header */}
        <header className="bg-white shadow-sm border-b border-aps-gray-200">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-aps-gray-100"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>

            <div className="flex-1 lg:flex-none">
              <h1 className="text-xl font-semibold text-aps-dark">
                {sidebarItems.find(item => item.href === location.pathname)?.name || 'HR Dashboard'}
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <div className="relative">
                <button
                  className="p-2 rounded-lg hover:bg-aps-gray-100 relative"
                  onClick={() => setShowNotifications(!showNotifications)}
                >
                  <Bell className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                </button>
                
                <AnimatePresence>
                  {showNotifications && (
                    <NotificationPanel onClose={() => setShowNotifications(false)} />
                  )}
                </AnimatePresence>
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

export default HRLayout;