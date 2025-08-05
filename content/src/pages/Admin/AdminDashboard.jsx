import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, FileText, TrendingUp, Shield, 
  Clock, CheckCircle, AlertCircle, Activity 
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext.jsx';
import DashboardStats from '../../components/HR/DashboardStats.jsx';
import SystemStatusPanel from '../../components/Admin/SystemStatusPanel.jsx';
import RecentActivity from '../../components/Admin/RecentActivity.jsx';
import QuickActionsAdmin from '../../components/Admin/QuickActionsAdmin.jsx';

const AdminDashboard = () => {
  const { 
    employees, 
    hrUsers, 
    systemSettings, 
    analytics, 
    activityLogs, 
    loading 
  } = useAdmin();

  const stats = [
    {
      title: 'Total Employees',
      value: employees.length,
      icon: Users,
      color: 'from-aps-primary to-aps-secondary',
      change: '+5%',
      changeType: 'positive'
    },
    {
      title: 'Active HR Users',
      value: hrUsers.filter(user => user.status === 'online').length,
      icon: Shield,
      color: 'from-aps-success to-green-400',
      change: '+2%',
      changeType: 'positive'
    },
    {
      title: 'Total Resumes',
      value: analytics.totalResumes || 0,
      icon: FileText,
      color: 'from-aps-accent to-aps-orange',
      change: '+25%',
      changeType: 'positive'
    },
    {
      title: 'System Health',
      value: '99.9%',
      icon: Activity,
      color: 'from-aps-warning to-yellow-400',
      change: 'Stable',
      changeType: 'neutral'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-aps-accent to-aps-orange rounded-xl p-6 text-white"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              Admin Control Center
            </h1>
            <p className="text-orange-100">
              Monitor system performance, manage users, and oversee operations
            </p>
          </div>
          <div className="hidden md:block">
            <Shield className="w-16 h-16 text-orange-200" />
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <DashboardStats stats={stats} />

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* System Status */}
        <div className="lg:col-span-1">
          <SystemStatusPanel settings={systemSettings} />
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-1">
          <RecentActivity logs={activityLogs.slice(0, 10)} />
        </div>

        {/* Quick Actions */}
        <div className="lg:col-span-1">
          <QuickActionsAdmin />
        </div>
      </div>

      {/* HR Users Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="dashboard-card"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-aps-dark">HR Team Overview</h2>
          <button className="text-aps-primary hover:text-aps-secondary transition-colors duration-300">
            View All
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {hrUsers.slice(0, 6).map((user) => (
            <div key={user.id} className="bg-aps-gray-50 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-aps-primary to-aps-secondary rounded-full flex items-center justify-center">
                  <span className="text-white font-medium">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-aps-dark">{user.name}</h3>
                  <p className="text-sm text-aps-gray-500">{user.email}</p>
                </div>
                <div className={`w-3 h-3 rounded-full ${
                  user.status === 'online' ? 'bg-green-400' : 
                  user.status === 'away' ? 'bg-yellow-400' : 'bg-gray-400'
                }`} />
              </div>
              
              <div className="mt-3 pt-3 border-t border-aps-gray-200">
                <div className="flex justify-between text-xs text-aps-gray-600">
                  <span>Resumes: {user.resumesUploaded}</span>
                  <span>Last active: {new Date(user.lastLogin).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;