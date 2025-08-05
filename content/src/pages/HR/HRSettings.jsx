import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { 
  Settings, User, Bell, Shield, Palette, 
  Globe, Save, RefreshCw, Download, Upload 
} from 'lucide-react';
import { useHR } from '../../context/HRContext.jsx';
import { toast } from 'react-toastify';
import FormField from '../../components/Common/FormField.jsx';

const HRSettings = () => {
  const { user, updateProfile, permissions } = useHR();
  const [activeTab, setActiveTab] = useState('profile');
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      department: user?.department || '',
      notifications: user?.settings?.notifications || true,
      theme: user?.settings?.theme || 'light',
      language: user?.settings?.language || 'en'
    }
  });

  const tabs = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'security', name: 'Security', icon: Shield },
    { id: 'preferences', name: 'Preferences', icon: Palette }
  ];

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      const result = await updateProfile(data);
      
      if (result.success) {
        toast.success('Settings updated successfully!');
      } else {
        toast.error(result.error || 'Failed to update settings');
      }
    } catch (error) {
      toast.error('Failed to update settings');
    } finally {
      setIsLoading(false);
    }
  };

  const renderProfileTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          label="Full Name"
          type="text"
          {...register('name', { required: 'Name is required' })}
          error={errors.name?.message}
        />
        
        <FormField
          label="Email Address"
          type="email"
          {...register('email', { required: 'Email is required' })}
          error={errors.email?.message}
          disabled
        />
        
        <FormField
          label="Phone Number"
          type="tel"
          {...register('phone')}
        />
        
        <FormField
          label="Department"
          type="text"
          {...register('department')}
        />
      </div>
      
      <div className="flex items-center justify-between pt-6 border-t border-aps-gray-200">
        <div>
          <h3 className="text-lg font-medium text-aps-dark">Profile Picture</h3>
          <p className="text-sm text-aps-gray-600">Update your profile picture</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-aps-primary rounded-full flex items-center justify-center">
            <User className="w-8 h-8 text-white" />
          </div>
          <button className="btn-secondary">
            <Upload className="w-4 h-4 mr-2" />
            Upload New
          </button>
        </div>
      </div>
    </div>
  );

  const renderNotificationsTab = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium text-aps-dark">Email Notifications</h3>
            <p className="text-sm text-aps-gray-600">Receive notifications via email</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" defaultChecked />
            <div className="w-11 h-6 bg-aps-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-aps-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-aps-primary"></div>
          </label>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium text-aps-dark">Push Notifications</h3>
            <p className="text-sm text-aps-gray-600">Receive push notifications in browser</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" defaultChecked />
            <div className="w-11 h-6 bg-aps-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-aps-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-aps-primary"></div>
          </label>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium text-aps-dark">Resume Upload Alerts</h3>
            <p className="text-sm text-aps-gray-600">Get notified when new resumes are uploaded</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" defaultChecked />
            <div className="w-11 h-6 bg-aps-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-aps-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-aps-primary"></div>
          </label>
        </div>
      </div>
    </div>
  );

  const renderSecurityTab = () => (
    <div className="space-y-6">
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <div className="flex items-center space-x-2">
          <Shield className="w-5 h-5 text-amber-600" />
          <span className="font-medium text-amber-800">Security Settings</span>
        </div>
        <p className="text-sm text-amber-700 mt-2">
          Contact your administrator to change password or security settings.
        </p>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium text-aps-dark">Two-Factor Authentication</h3>
            <p className="text-sm text-aps-gray-600">Add an extra layer of security</p>
          </div>
          <button className="btn-secondary">
            Enable 2FA
          </button>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium text-aps-dark">Login Sessions</h3>
            <p className="text-sm text-aps-gray-600">Manage your active sessions</p>
          </div>
          <button className="btn-secondary">
            View Sessions
          </button>
        </div>
      </div>
    </div>
  );

  const renderPreferencesTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          label="Theme"
          type="select"
          {...register('theme')}
          options={[
            { value: 'light', label: 'Light' },
            { value: 'dark', label: 'Dark' },
            { value: 'auto', label: 'Auto' }
          ]}
        />
        
        <FormField
          label="Language"
          type="select"
          {...register('language')}
          options={[
            { value: 'en', label: 'English' },
            { value: 'hi', label: 'Hindi' },
            { value: 'mr', label: 'Marathi' }
          ]}
        />
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium text-aps-dark">Auto-save Forms</h3>
            <p className="text-sm text-aps-gray-600">Automatically save form data</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" defaultChecked />
            <div className="w-11 h-6 bg-aps-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-aps-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-aps-primary"></div>
          </label>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-aps-primary to-aps-secondary rounded-xl p-6 text-white"
      >
        <div className="flex items-center space-x-4">
          <Settings className="w-8 h-8" />
          <div>
            <h1 className="text-2xl font-bold">Settings</h1>
            <p className="text-blue-100">Manage your account and preferences</p>
          </div>
        </div>
      </motion.div>

      <div className="bg-white rounded-xl shadow-sm">
        {/* Tabs */}
        <div className="border-b border-aps-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-300 ${
                    activeTab === tab.id
                      ? 'border-aps-primary text-aps-primary'
                      : 'border-transparent text-aps-gray-500 hover:text-aps-gray-700 hover:border-aps-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tab Content */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6">
          {activeTab === 'profile' && renderProfileTab()}
          {activeTab === 'notifications' && renderNotificationsTab()}
          {activeTab === 'security' && renderSecurityTab()}
          {activeTab === 'preferences' && renderPreferencesTab()}

          {/* Save Button */}
          <div className="flex items-center justify-end space-x-4 pt-6 border-t border-aps-gray-200 mt-8">
            <button
              type="button"
              className="btn-secondary"
              onClick={() => window.location.reload()}
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Reset
            </button>
            
            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary"
            >
              {isLoading ? (
                <>
                  <div className="loader mr-2"></div>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HRSettings;