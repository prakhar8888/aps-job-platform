import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';

// Candidate Pages
import CandidateHome from '../pages/Candidate/CandidateHome.jsx';
import CandidateApply from '../pages/Candidate/CandidateApply.jsx';

// HR Pages
import HRLogin from '../pages/HR/HRLogin.jsx';
import HRDashboard from '../pages/HR/HRDashboard.jsx';
import HRSettings from '../pages/HR/HRSettings.jsx';
import HRResumeUpload from '../pages/HR/HRResumeUpload.jsx';
import HRResumeSearch from '../pages/HR/HRResumeSearch.jsx';
import HRReports from '../pages/HR/HRReports.jsx';

// Admin Pages
import AdminLogin from '../pages/Admin/AdminLogin.jsx';
import AdminDashboard from '../pages/Admin/AdminDashboard.jsx';
import AdminSettings from '../pages/Admin/AdminSettings.jsx';
import AdminControlPanel from '../pages/Admin/AdminControlPanel.jsx';
import AdminIntegrations from '../pages/Admin/AdminIntegrations.jsx';
import AdminOnboarding from '../pages/Admin/AdminOnboarding.jsx';
import AdminRecruitment from '../pages/Admin/AdminRecruitment.jsx';
import AdminInsights from '../pages/Admin/AdminInsights.jsx';

// Common Pages
import HelpCenter from '../pages/Common/HelpCenter.jsx';
import NotFound from '../pages/Common/NotFound.jsx';
import ActivityLog from '../pages/Common/ActivityLog.jsx';

// Layout Components
import CandidateLayout from '../layouts/CandidateLayout.jsx';
import HRLayout from '../layouts/HRLayout.jsx';
import AdminLayout from '../layouts/AdminLayout.jsx';

// Protected Route Component
const ProtectedRoute = ({ children, requiredRole }) => {
  const { user, isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to={`/${requiredRole}/login`} replace />;
  }
  
  if (user.role !== requiredRole) {
    return <Navigate to="/unauthorized" replace />;
  }
  
  return children;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Default redirect */}
      <Route path="/" element={<Navigate to="/candidate" replace />} />
      
      {/* Candidate Routes */}
      <Route path="/candidate" element={<CandidateLayout />}>
        <Route index element={<CandidateHome />} />
        <Route path="apply/:jobId?" element={<CandidateApply />} />
      </Route>
      
      {/* HR Routes */}
      <Route path="/hr/login" element={<HRLogin />} />
      <Route path="/hr" element={
        <ProtectedRoute requiredRole="hr">
          <HRLayout />
        </ProtectedRoute>
      }>
        <Route index element={<HRDashboard />} />
        <Route path="upload" element={<HRResumeUpload />} />
        <Route path="search" element={<HRResumeSearch />} />
        <Route path="reports" element={<HRReports />} />
        <Route path="settings" element={<HRSettings />} />
      </Route>
      
      {/* Admin Routes */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={
        <ProtectedRoute requiredRole="admin">
          <AdminLayout />
        </ProtectedRoute>
      }>
        <Route index element={<AdminDashboard />} />
        <Route path="control-panel" element={<AdminControlPanel />} />
        <Route path="integrations" element={<AdminIntegrations />} />
        <Route path="onboarding" element={<AdminOnboarding />} />
        <Route path="recruitment" element={<AdminRecruitment />} />
        <Route path="insights" element={<AdminInsights />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>
      
      {/* Common Routes */}
      <Route path="/help" element={<HelpCenter />} />
      <Route path="/activity-log" element={<ActivityLog />} />
      <Route path="/unauthorized" element={<div className="flex items-center justify-center min-h-screen"><h1 className="text-2xl text-red-600">Unauthorized Access</h1></div>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;