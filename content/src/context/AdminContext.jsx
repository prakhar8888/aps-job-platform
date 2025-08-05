import React, { createContext, useContext, useState, useEffect } from 'react';
import { adminAPI } from '../lib/mockAPI.js';

const AdminContext = createContext(null);

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

export const AdminProvider = ({ children }) => {
  const [employees, setEmployees] = useState([]);
  const [hrUsers, setHrUsers] = useState([]);
  const [systemSettings, setSystemSettings] = useState({});
  const [permissions, setPermissions] = useState({});
  const [analytics, setAnalytics] = useState({});
  const [activityLogs, setActivityLogs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      setLoading(true);
      const [
        employeesData,
        hrUsersData,
        settingsData,
        permissionsData,
        analyticsData,
        logsData
      ] = await Promise.all([
        adminAPI.getEmployees(),
        adminAPI.getHRUsers(),
        adminAPI.getSystemSettings(),
        adminAPI.getPermissions(),
        adminAPI.getAnalytics(),
        adminAPI.getActivityLogs()
      ]);
      
      setEmployees(employeesData);
      setHrUsers(hrUsersData);
      setSystemSettings(settingsData);
      setPermissions(permissionsData);
      setAnalytics(analyticsData);
      setActivityLogs(logsData);
    } catch (error) {
      console.error('Failed to load admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  const createEmployee = async (employeeData) => {
    try {
      setLoading(true);
      const response = await adminAPI.createEmployee(employeeData);
      
      if (response.success) {
        setEmployees(prev => [response.employee, ...prev]);
        return { success: true, employee: response.employee };
      }
      
      return { success: false, error: response.error };
    } catch (error) {
      return { success: false, error: 'Failed to create employee' };
    } finally {
      setLoading(false);
    }
  };

  const updateEmployee = async (employeeId, updateData) => {
    try {
      const response = await adminAPI.updateEmployee(employeeId, updateData);
      
      if (response.success) {
        setEmployees(prev => prev.map(emp => 
          emp.id === employeeId ? { ...emp, ...updateData } : emp
        ));
        return { success: true };
      }
      
      return { success: false, error: response.error };
    } catch (error) {
      return { success: false, error: 'Failed to update employee' };
    }
  };

  const deleteEmployee = async (employeeId) => {
    try {
      const response = await adminAPI.deleteEmployee(employeeId);
      
      if (response.success) {
        setEmployees(prev => prev.filter(emp => emp.id !== employeeId));
        return { success: true };
      }
      
      return { success: false, error: response.error };
    } catch (error) {
      return { success: false, error: 'Failed to delete employee' };
    }
  };

  const updatePermissions = async (userId, newPermissions) => {
    try {
      const response = await adminAPI.updatePermissions(userId, newPermissions);
      
      if (response.success) {
        setPermissions(prev => ({
          ...prev,
          [userId]: newPermissions
        }));
        return { success: true };
      }
      
      return { success: false, error: response.error };
    } catch (error) {
      return { success: false, error: 'Failed to update permissions' };
    }
  };

  const updateSystemSettings = async (settings) => {
    try {
      const response = await adminAPI.updateSystemSettings(settings);
      
      if (response.success) {
        setSystemSettings(prev => ({ ...prev, ...settings }));
        return { success: true };
      }
      
      return { success: false, error: response.error };
    } catch (error) {
      return { success: false, error: 'Failed to update system settings' };
    }
  };

  const approveReport = async (reportId) => {
    try {
      const response = await adminAPI.approveReport(reportId);
      return response;
    } catch (error) {
      return { success: false, error: 'Failed to approve report' };
    }
  };

  const toggleFeature = async (featureName, enabled) => {
    try {
      const response = await adminAPI.toggleFeature(featureName, enabled);
      
      if (response.success) {
        setSystemSettings(prev => ({
          ...prev,
          features: {
            ...prev.features,
            [featureName]: enabled
          }
        }));
        return { success: true };
      }
      
      return { success: false, error: response.error };
    } catch (error) {
      return { success: false, error: 'Failed to toggle feature' };
    }
  };

  const value = {
    employees,
    hrUsers,
    systemSettings,
    permissions,
    analytics,
    activityLogs,
    loading,
    createEmployee,
    updateEmployee,
    deleteEmployee,
    updatePermissions,
    updateSystemSettings,
    approveReport,
    toggleFeature,
    refreshData: loadInitialData
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};