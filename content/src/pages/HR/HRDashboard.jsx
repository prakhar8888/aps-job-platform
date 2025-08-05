import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Upload, Search, FileText, TrendingUp, Users, 
  Calendar, Clock, CheckCircle, XCircle, AlertCircle 
} from 'lucide-react';
import { useHR } from '../../context/HRContext.jsx';
import DashboardStats from '../../components/HR/DashboardStats.jsx';
import QuickActions from '../../components/HR/QuickActions.jsx';
import AnalyticsChart from '../../components/HR/AnalyticsChart.jsx';
import DragDropWidget from '../../components/Common/DragDropWidget.jsx';
import VoiceCommandIndicator from '../../components/Common/VoiceCommandIndicator.jsx';

const HRDashboard = () => {
  const { resumes, dashboardWidgets, saveDashboardLayout, loading } = useHR();
  const [widgets, setWidgets] = useState(dashboardWidgets);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    setWidgets(dashboardWidgets);
  }, [dashboardWidgets]);

  const handleWidgetReorder = (newWidgets) => {
    setWidgets(newWidgets);
    saveDashboardLayout(newWidgets);
  };

  const stats = [
    {
      title: 'Total Resumes',
      value: resumes.length,
      icon: FileText,
      color: 'from-aps-primary to-aps-secondary',
      change: '+12%',
      changeType: 'positive'
    },
    {
      title: 'Pending Review',
      value: resumes.filter(r => r.status === 'pending').length,
      icon: Clock,
      color: 'from-aps-warning to-aps-orange',
      change: '-5%',
      changeType: 'negative'
    },
    {
      title: 'Approved',
      value: resumes.filter(r => r.status === 'approved').length,
      icon: CheckCircle,
      color: 'from-aps-success to-green-400',
      change: '+18%',
      changeType: 'positive'
    },
    {
      title: 'This Month',
      value: resumes.filter(r => {
        const resumeDate = new Date(r.uploadedAt);
        const currentDate = new Date();
        return resumeDate.getMonth() === currentDate.getMonth() &&
               resumeDate.getFullYear() === currentDate.getFullYear();
      }).length,
      icon: TrendingUp,
      color: 'from-aps-accent to-aps-orange',
      change: '+25%',
      changeType: 'positive'
    }
  ];

  const availableWidgets = [
    {
      id: 'stats',
      type: 'stats',
      title: 'Overview Stats',
      component: <DashboardStats stats={stats} />
    },
    {
      id: 'recent',
      type: 'recent_resumes',
      title: 'Recent Resumes',
      component: <RecentResumes resumes={resumes.slice(0, 5)} />
    },
    {
      id: 'analytics',
      type: 'analytics',
      title: 'Analytics',
      component: <AnalyticsChart />
    },
    {
      id: 'actions',
      type: 'quick_actions',
      title: 'Quick Actions',
      component: <QuickActions />
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-aps-primary to-aps-secondary rounded-xl p-6 text-white"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              Welcome back to your HR Dashboard
            </h1>
            <p className="text-blue-100">
              Manage resumes, track candidates, and streamline your recruitment process
            </p>
          </div>
          <div className="hidden md:block">
            <Calendar className="w-16 h-16 text-blue-200" />
          </div>
        </div>
      </motion.div>

      {/* Voice Command Indicator */}
      <VoiceCommandIndicator />

      {/* Dashboard Widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {availableWidgets.map((widget, index) => (
          <DragDropWidget
            key={widget.id}
            widget={widget}
            index={index}
            onReorder={handleWidgetReorder}
            isDragging={isDragging}
            setIsDragging={setIsDragging}
          >
            {widget.component}
          </DragDropWidget>
        ))}
      </div>

      {/* Today's Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="dashboard-card"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-aps-dark">Today's Summary</h2>
          <div className="text-sm text-aps-gray-500">
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-lg">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Upload className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">
                {resumes.filter(r => {
                  const today = new Date().toDateString();
                  return new Date(r.uploadedAt).toDateString() === today;
                }).length}
              </div>
              <div className="text-sm text-green-700">Resumes Uploaded</div>
            </div>
          </div>

          <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-lg">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">
                {resumes.filter(r => {
                  const today = new Date().toDateString();
                  return r.status === 'approved' && new Date(r.updatedAt).toDateString() === today;
                }).length}
              </div>
              <div className="text-sm text-blue-700">Candidates Approved</div>
            </div>
          </div>

          <div className="flex items-center space-x-4 p-4 bg-orange-50 rounded-lg">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-600">
                {resumes.filter(r => r.status === 'pending').length}
              </div>
              <div className="text-sm text-orange-700">Pending Review</div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default HRDashboard;