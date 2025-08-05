import React, { createContext, useContext, useState, useEffect } from 'react';
import { hrAPI } from '../lib/mockAPI.js';

const HRContext = createContext(null);

export const useHR = () => {
  const context = useContext(HRContext);
  if (!context) {
    throw new Error('useHR must be used within an HRProvider');
  }
  return context;
};

export const HRProvider = ({ children }) => {
  const [resumes, setResumes] = useState([]);
  const [sectors, setSectors] = useState([]);
  const [designations, setDesignations] = useState([]);
  const [dashboardWidgets, setDashboardWidgets] = useState([]);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [permissions, setPermissions] = useState({});

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      setLoading(true);
      const [resumesData, sectorsData, permissionsData] = await Promise.all([
        hrAPI.getResumes(),
        hrAPI.getSectors(),
        hrAPI.getPermissions()
      ]);
      
      setResumes(resumesData);
      setSectors(sectorsData);
      setPermissions(permissionsData);
      
      // Load dashboard widgets from localStorage
      const storedWidgets = localStorage.getItem('aps_hr_dashboard');
      if (storedWidgets) {
        setDashboardWidgets(JSON.parse(storedWidgets));
      } else {
        // Default widgets
        setDashboardWidgets([
          { id: 'stats', type: 'stats', position: { x: 0, y: 0 } },
          { id: 'recent', type: 'recent_resumes', position: { x: 1, y: 0 } },
          { id: 'charts', type: 'analytics', position: { x: 0, y: 1 } }
        ]);
      }
    } catch (error) {
      console.error('Failed to load HR data:', error);
    } finally {
      setLoading(false);
    }
  };

  const uploadResume = async (file, metadata) => {
    try {
      setLoading(true);
      const response = await hrAPI.uploadResume(file, metadata);
      
      if (response.success) {
        setResumes(prev => [response.resume, ...prev]);
        return { success: true, resume: response.resume };
      }
      
      return { success: false, error: response.error };
    } catch (error) {
      return { success: false, error: 'Resume upload failed. Please try again.' };
    } finally {
      setLoading(false);
    }
  };

  const parseResume = async (file) => {
    try {
      const response = await hrAPI.parseResume(file);
      return response;
    } catch (error) {
      console.error('Resume parsing failed:', error);
      return { success: false, error: 'Failed to parse resume' };
    }
  };

  const updateResumeStatus = async (resumeId, status, feedback) => {
    try {
      const response = await hrAPI.updateResumeStatus(resumeId, status, feedback);
      
      if (response.success) {
        setResumes(prev => prev.map(resume => 
          resume.id === resumeId 
            ? { ...resume, status, feedback, updatedAt: new Date().toISOString() }
            : resume
        ));
        return { success: true };
      }
      
      return { success: false, error: response.error };
    } catch (error) {
      return { success: false, error: 'Failed to update resume status' };
    }
  };

  const searchResumes = async (filters) => {
    try {
      setLoading(true);
      const results = await hrAPI.searchResumes(filters);
      setResumes(results);
      return results;
    } catch (error) {
      console.error('Resume search failed:', error);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const saveDashboardLayout = (widgets) => {
    setDashboardWidgets(widgets);
    localStorage.setItem('aps_hr_dashboard', JSON.stringify(widgets));
  };

  const generateReport = async (reportType, dateRange) => {
    try {
      const response = await hrAPI.generateReport(reportType, dateRange);
      if (response.success) {
        setReports(prev => [response.report, ...prev]);
        return { success: true, report: response.report };
      }
      return { success: false, error: response.error };
    } catch (error) {
      return { success: false, error: 'Failed to generate report' };
    }
  };

  const value = {
    resumes,
    sectors,
    designations,
    dashboardWidgets,
    reports,
    loading,
    permissions,
    uploadResume,
    parseResume,
    updateResumeStatus,
    searchResumes,
    saveDashboardLayout,
    generateReport,
    refreshData: loadInitialData
  };

  return (
    <HRContext.Provider value={value}>
      {children}
    </HRContext.Provider>
  );
};