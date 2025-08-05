import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Settings, 
  User, 
  Shield, 
  Bell, 
  Database, 
  Mail, 
  Key, 
  Globe,
  Save,
  RefreshCw,
  Eye,
  EyeOff
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { toast } from 'react-toastify';

const AdminSettings = () => {
  const { adminData, updateAdminSettings } = useAdmin();
  const [activeTab, setActiveTab] = useState('profile');
  const [showApiKey, setShowApiKey] = useState(false);
  const [settings, setSettings] = useState({
    profile: {
      name: adminData?.name || 'Admin User',
      email: adminData?.email || 'admin@akshyapatra.com',
      phone: '+91 9876543210',
      department: 'Administration'
    },
    security: {
      twoFactorEnabled: true,
      sessionTimeout: 30,
      passwordExpiry: 90,
      loginNotifications: true
    },
    notifications: {
      emailAlerts: true,
      smsAlerts: false,
      pushNotifications: true,
      reportReminders: true
    },
    system: {
      apiKey: 'aps_live_sk_1234567890abcdef',
      webhookUrl: 'https://api.akshyapatra.com/webhooks',
      backupFrequency: 'daily',
      dataRetention: 365
    }
  });

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'system', label: 'System', icon: Database }
  ];

  const handleSave = () => {
    updateAdminSettings(settings);
    toast.success('Settings updated successfully!');
  };

  const handleInputChange = (section, field, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const renderProfileTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-aps-dark mb-2">
            Full Name
          </label>
          <input
            type="text"
            value={settings.profile.name}
            onChange={(e) => handleInputChange('profile', 'name', e.target.value)}
            className="w-full px-4 py-3 border border-aps-gray-300 rounded-lg focus:ring-2 focus:ring-aps-primary focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-aps-dark mb-2">
            Email Address
          </label>
          <input
            type="email"
            value={settings.profile.email}
            onChange={(e) => handleInputChange('profile', 'email', e.target.value)}
            className="w-full px-4 py-3 border border-aps-gray-300 rounded-lg focus:ring-2 focus:ring-aps-primary focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-aps-dark mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            value={settings.profile.phone}
            onChange={(e) => handleInputChange('profile', 'phone', e.target.value)}
            className="w-full px-4 py-3 border border-aps-gray-300 rounded-lg focus:ring-2 focus:ring-aps-primary focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-aps-dark mb-2">
            Department
          </label>
          <select
            value={settings.profile.department}
            onChange={(e) => handleInputChange('profile', 'department', e.target.value)}
            className="w-full px-4 py-3 border border-aps-gray-300 rounded-lg focus:ring-2 focus:ring-aps-primary focus:border-transparent"
          >
            <option value="Administration">Administration</option>
            <option value="HR Management">HR Management</option>
            <option value="Operations">Operations</option>
            <option value="IT Support">IT Support</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderSecurityTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex items-center justify-between p-4 border border-aps-gray-300 rounded-lg">
          <div>
            <h4 className="font-medium text-aps-dark">Two-Factor Authentication</h4>
            <p className="text-sm text-aps-gray-600">Add an extra layer of security</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.security.twoFactorEnabled}
              onChange={(e) => handleInputChange('security', 'twoFactorEnabled', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-aps-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-aps-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-aps-primary"></div>
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium text-aps-dark mb-2">
            Session Timeout (minutes)
          </label>
          <input
            type="number"
            value={settings.security.sessionTimeout}
            onChange={(e) => handleInputChange('security', 'sessionTimeout', parseInt(e.target.value))}
            className="w-full px-4 py-3 border border-aps-gray-300 rounded-lg focus:ring-2 focus:ring-aps-primary focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-aps-dark mb-2">
            Password Expiry (days)
          </label>
          <input
            type="number"
            value={settings.security.passwordExpiry}
            onChange={(e) => handleInputChange('security', 'passwordExpiry', parseInt(e.target.value))}
            className="w-full px-4 py-3 border border-aps-gray-300 rounded-lg focus:ring-2 focus:ring-aps-primary focus:border-transparent"
          />
        </div>
        <div className="flex items-center justify-between p-4 border border-aps-gray-300 rounded-lg">
          <div>
            <h4 className="font-medium text-aps-dark">Login Notifications</h4>
            <p className="text-sm text-aps-gray-600">Get notified of new logins</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.security.loginNotifications}
              onChange={(e) => handleInputChange('security', 'loginNotifications', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-aps-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-aps-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-aps-primary"></div>
          </label>
        </div>
      </div>
    </div>
  );

  const renderNotificationsTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4">
        {[
          { key: 'emailAlerts', label: 'Email Alerts', desc: 'Receive notifications via email' },
          { key: 'smsAlerts', label: 'SMS Alerts', desc: 'Receive notifications via SMS' },
          { key: 'pushNotifications', label: 'Push Notifications', desc: 'Browser push notifications' },
          { key: 'reportReminders', label: 'Report Reminders', desc: 'Daily report submission reminders' }
        ].map((item) => (
          <div key={item.key} className="flex items-center justify-between p-4 border border-aps-gray-300 rounded-lg">
            <div>
              <h4 className="font-medium text-aps-dark">{item.label}</h4>
              <p className="text-sm text-aps-gray-600">{item.desc}</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.notifications[item.key]}
                onChange={(e) => handleInputChange('notifications', item.key, e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-aps-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-aps-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-aps-primary"></div>
            </label>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSystemTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6">
        <div>
          <label className="block text-sm font-medium text-aps-dark mb-2">
            API Key
          </label>
          <div className="relative">
            <input
              type={showApiKey ? 'text' : 'password'}
              value={settings.system.apiKey}
              onChange={(e) => handleInputChange('system', 'apiKey', e.target.value)}
              className="w-full px-4 py-3 pr-12 border border-aps-gray-300 rounded-lg focus:ring-2 focus:ring-aps-primary focus:border-transparent"
            />
            <button
              type="button"
              onClick={() => setShowApiKey(!showApiKey)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-aps-gray-500 hover:text-aps-primary"
            >
              {showApiKey ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-aps-dark mb-2">
            Webhook URL
          </label>
          <input
            type="url"
            value={settings.system.webhookUrl}
            onChange={(e) => handleInputChange('system', 'webhookUrl', e.target.value)}
            className="w-full px-4 py-3 border border-aps-gray-300 rounded-lg focus:ring-2 focus:ring-aps-primary focus:border-transparent"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-aps-dark mb-2">
              Backup Frequency
            </label>
            <select
              value={settings.system.backupFrequency}
              onChange={(e) => handleInputChange('system', 'backupFrequency', e.target.value)}
              className="w-full px-4 py-3 border border-aps-gray-300 rounded-lg focus:ring-2 focus:ring-aps-primary focus:border-transparent"
            >
              <option value="hourly">Hourly</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-aps-dark mb-2">
              Data Retention (days)
            </label>
            <input
              type="number"
              value={settings.system.dataRetention}
              onChange={(e) => handleInputChange('system', 'dataRetention', parseInt(e.target.value))}
              className="w-full px-4 py-3 border border-aps-gray-300 rounded-lg focus:ring-2 focus:ring-aps-primary focus:border-transparent"
            />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-aps-light via-white to-aps-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          <div className="bg-gradient-to-r from-aps-primary to-aps-secondary p-6">
            <div className="flex items-center space-x-3">
              <Settings className="w-8 h-8 text-white" />
              <div>
                <h1 className="text-2xl font-bold text-white">Admin Settings</h1>
                <p className="text-aps-gray-100">Manage your account and system preferences</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-1/4 bg-aps-gray-50 p-6">
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                        activeTab === tab.id
                          ? 'bg-aps-primary text-white'
                          : 'text-aps-gray-700 hover:bg-aps-gray-200'
                      }`}
                    >
                      <Icon size={20} />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>

            <div className="lg:w-3/4 p-6">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-aps-dark mb-2">
                  {tabs.find(tab => tab.id === activeTab)?.label} Settings
                </h2>
                <p className="text-aps-gray-600">
                  Configure your {tabs.find(tab => tab.id === activeTab)?.label.toLowerCase()} preferences
                </p>
              </div>

              {activeTab === 'profile' && renderProfileTab()}
              {activeTab === 'security' && renderSecurityTab()}
              {activeTab === 'notifications' && renderNotificationsTab()}
              {activeTab === 'system' && renderSystemTab()}

              <div className="flex justify-end space-x-4 mt-8 pt-6 border-t border-aps-gray-200">
                <button
                  onClick={() => window.location.reload()}
                  className="flex items-center space-x-2 px-6 py-3 border border-aps-gray-300 rounded-lg text-aps-gray-700 hover:bg-aps-gray-50 transition-colors"
                >
                  <RefreshCw size={20} />
                  <span>Reset</span>
                </button>
                <button
                  onClick={handleSave}
                  className="flex items-center space-x-2 px-6 py-3 bg-aps-primary text-white rounded-lg hover:bg-aps-secondary transition-colors"
                >
                  <Save size={20} />
                  <span>Save Changes</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminSettings;