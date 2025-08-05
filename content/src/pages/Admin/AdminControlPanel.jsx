import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Settings, 
  Shield, 
  Users, 
  Database, 
  ToggleLeft, 
  ToggleRight,
  Lock,
  Unlock,
  Eye,
  EyeOff,
  UserCheck,
  UserX,
  Activity,
  AlertTriangle,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { toast } from 'react-toastify';

const AdminControlPanel = () => {
  const { adminData, updateSystemSettings } = useAdmin();
  const [systemSettings, setSystemSettings] = useState({
    hrAccess: true,
    employeeAccess: true,
    permanentApprovalMode: false,
    confidentialityMode: false,
    autoResumeProcessing: true,
    realTimeNotifications: true,
    dataBackup: true,
    auditLogging: true,
    maintenanceMode: false,
    debugMode: false
  });

  const [permissions, setPermissions] = useState({
    hr: {
      viewResumes: true,
      editResumes: true,
      deleteResumes: false,
      createFolders: true,
      manageSectors: false,
      generateReports: true,
      exportData: true,
      bulkOperations: false
    },
    employee: {
      viewResumes: true,
      editResumes: false,
      deleteResumes: false,
      createFolders: false,
      manageSectors: false,
      generateReports: false,
      exportData: false,
      bulkOperations: false
    }
  });

  const handleSystemToggle = (setting) => {
    const newSettings = {
      ...systemSettings,
      [setting]: !systemSettings[setting]
    };
    setSystemSettings(newSettings);
    updateSystemSettings(newSettings);
    
    const action = newSettings[setting] ? 'enabled' : 'disabled';
    toast.success(`${setting.replace(/([A-Z])/g, ' $1').toLowerCase()} ${action}`);
  };

  const handlePermissionToggle = (role, permission) => {
    const newPermissions = {
      ...permissions,
      [role]: {
        ...permissions[role],
        [permission]: !permissions[role][permission]
      }
    };
    setPermissions(newPermissions);
    toast.success(`${role} ${permission} permission updated`);
  };

  const ToggleSwitch = ({ enabled, onToggle, label, description, critical = false }) => (
    <div className={`flex items-center justify-between p-4 rounded-lg border ${
      critical ? 'border-aps-error bg-red-50' : 'border-aps-gray-300 bg-white'
    }`}>
      <div className="flex-1">
        <h4 className={`font-medium ${critical ? 'text-aps-error' : 'text-aps-dark'}`}>
          {label}
        </h4>
        <p className="text-sm text-aps-gray-600 mt-1">{description}</p>
      </div>
      <button
        onClick={onToggle}
        className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-aps-primary ${
          enabled 
            ? critical ? 'bg-aps-error' : 'bg-aps-primary'
            : 'bg-aps-gray-300'
        }`}
      >
        <span
          className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${
            enabled ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );

  const PermissionMatrix = ({ role, permissions: rolePermissions }) => (
    <div className="bg-white rounded-lg border border-aps-gray-300 p-6">
      <h3 className="text-lg font-semibold text-aps-dark mb-4 capitalize">
        {role} Permissions
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(rolePermissions).map(([permission, enabled]) => (
          <div key={permission} className="flex items-center justify-between p-3 bg-aps-gray-50 rounded-lg">
            <span className="text-sm font-medium text-aps-dark capitalize">
              {permission.replace(/([A-Z])/g, ' $1').toLowerCase()}
            </span>
            <button
              onClick={() => handlePermissionToggle(role, permission)}
              className={`relative inline-flex items-center h-5 rounded-full w-9 transition-colors ${
                enabled ? 'bg-aps-success' : 'bg-aps-gray-300'
              }`}
            >
              <span
                className={`inline-block w-3 h-3 transform bg-white rounded-full transition-transform ${
                  enabled ? 'translate-x-5' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-aps-light via-white to-aps-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="bg-gradient-to-r from-aps-primary to-aps-secondary rounded-2xl p-6 text-white">
            <div className="flex items-center space-x-3">
              <Shield className="w-8 h-8" />
              <div>
                <h1 className="text-3xl font-bold">Admin Control Panel</h1>
                <p className="text-aps-gray-100 mt-1">
                  Manage system settings, permissions, and access controls
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* System Controls */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-aps-dark mb-6 flex items-center">
                <Settings className="w-6 h-6 mr-2" />
                System Controls
              </h2>
              
              <div className="space-y-4">
                <ToggleSwitch
                  enabled={systemSettings.hrAccess}
                  onToggle={() => handleSystemToggle('hrAccess')}
                  label="HR Access"
                  description="Allow HR users to access the system"
                />
                
                <ToggleSwitch
                  enabled={systemSettings.employeeAccess}
                  onToggle={() => handleSystemToggle('employeeAccess')}
                  label="Employee Access"
                  description="Allow employees to access their panels"
                />
                
                <ToggleSwitch
                  enabled={systemSettings.permanentApprovalMode}
                  onToggle={() => handleSystemToggle('permanentApprovalMode')}
                  label="Permanent Approval Mode"
                  description="Auto-approve all submissions without review"
                  critical={systemSettings.permanentApprovalMode}
                />
                
                <ToggleSwitch
                  enabled={systemSettings.confidentialityMode}
                  onToggle={() => handleSystemToggle('confidentialityMode')}
                  label="Confidentiality Mode"
                  description="Hide company information from candidates"
                />
                
                <ToggleSwitch
                  enabled={systemSettings.autoResumeProcessing}
                  onToggle={() => handleSystemToggle('autoResumeProcessing')}
                  label="Auto Resume Processing"
                  description="Automatically process and categorize resumes"
                />
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-aps-dark mb-6 flex items-center">
                <Activity className="w-6 h-6 mr-2" />
                System Status
              </h2>
              
              <div className="space-y-4">
                <ToggleSwitch
                  enabled={systemSettings.realTimeNotifications}
                  onToggle={() => handleSystemToggle('realTimeNotifications')}
                  label="Real-time Notifications"
                  description="Enable live notifications and updates"
                />
                
                <ToggleSwitch
                  enabled={systemSettings.dataBackup}
                  onToggle={() => handleSystemToggle('dataBackup')}
                  label="Data Backup"
                  description="Automatic data backup and recovery"
                />
                
                <ToggleSwitch
                  enabled={systemSettings.auditLogging}
                  onToggle={() => handleSystemToggle('auditLogging')}
                  label="Audit Logging"
                  description="Track all user actions and changes"
                />
                
                <ToggleSwitch
                  enabled={systemSettings.maintenanceMode}
                  onToggle={() => handleSystemToggle('maintenanceMode')}
                  label="Maintenance Mode"
                  description="Put system in maintenance mode"
                  critical={systemSettings.maintenanceMode}
                />
                
                <ToggleSwitch
                  enabled={systemSettings.debugMode}
                  onToggle={() => handleSystemToggle('debugMode')}
                  label="Debug Mode"
                  description="Enable detailed error logging"
                  critical={systemSettings.debugMode}
                />
              </div>
            </div>
          </motion.div>

          {/* Permission Matrix */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-aps-dark mb-6 flex items-center">
                <Users className="w-6 h-6 mr-2" />
                Permission Matrix
              </h2>
              
              <div className="space-y-6">
                <PermissionMatrix role="hr" permissions={permissions.hr} />
                <PermissionMatrix role="employee" permissions={permissions.employee} />
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-aps-dark mb-6 flex items-center">
                <Database className="w-6 h-6 mr-2" />
                Quick Actions
              </h2>
              
              <div className="grid grid-cols-2 gap-4">
                <button className="flex items-center justify-center space-x-2 p-4 bg-aps-success text-white rounded-lg hover:bg-green-600 transition-colors">
                  <CheckCircle size={20} />
                  <span>Approve All</span>
                </button>
                
                <button className="flex items-center justify-center space-x-2 p-4 bg-aps-error text-white rounded-lg hover:bg-red-600 transition-colors">
                  <XCircle size={20} />
                  <span>Reject All</span>
                </button>
                
                <button className="flex items-center justify-center space-x-2 p-4 bg-aps-warning text-white rounded-lg hover:bg-yellow-600 transition-colors">
                  <AlertTriangle size={20} />
                  <span>System Alert</span>
                </button>
                
                <button className="flex items-center justify-center space-x-2 p-4 bg-aps-primary text-white rounded-lg hover:bg-aps-secondary transition-colors">
                  <Activity size={20} />
                  <span>View Logs</span>
                </button>
              </div>
            </div>

            {/* System Stats */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-aps-dark mb-6">System Statistics</h2>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-aps-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-aps-primary">1,247</div>
                  <div className="text-sm text-aps-gray-600">Total Users</div>
                </div>
                
                <div className="text-center p-4 bg-aps-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-aps-success">98.5%</div>
                  <div className="text-sm text-aps-gray-600">Uptime</div>
                </div>
                
                <div className="text-center p-4 bg-aps-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-aps-warning">23</div>
                  <div className="text-sm text-aps-gray-600">Pending</div>
                </div>
                
                <div className="text-center p-4 bg-aps-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-aps-error">2</div>
                  <div className="text-sm text-aps-gray-600">Alerts</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AdminControlPanel;