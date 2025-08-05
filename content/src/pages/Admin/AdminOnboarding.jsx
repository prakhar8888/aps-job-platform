import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Crown, 
  CheckCircle, 
  ArrowRight, 
  ArrowLeft,
  Settings,
  Users,
  Database,
  Shield,
  Zap,
  Mail,
  Cloud
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { toast } from 'react-toastify';

const AdminOnboarding = () => {
  const navigate = useNavigate();
  const { initializeSystem } = useAdmin();
  const [currentStep, setCurrentStep] = useState(1);
  const [setupData, setSetupData] = useState({
    companyInfo: {
      name: 'Akshya Patra Services',
      email: 'admin@akshyapatra.com',
      phone: '+91 9876543210',
      address: 'Mumbai, India'
    },
    systemSettings: {
      autoApproval: false,
      confidentialityMode: false,
      emailNotifications: true,
      realTimeUpdates: true
    },
    integrations: {
      cloudinary: false,
      sendgrid: false,
      pusher: false,
      analytics: false
    },
    adminAccount: {
      name: 'System Administrator',
      email: 'admin@akshyapatra.com',
      password: 'admin123456'
    }
  });

  const steps = [
    {
      id: 1,
      title: 'Welcome to Akshya Patra Services',
      description: 'Let\'s set up your job consultancy platform',
      icon: Crown
    },
    {
      id: 2,
      title: 'Company Information',
      description: 'Configure your company details',
      icon: Settings
    },
    {
      id: 3,
      title: 'System Settings',
      description: 'Choose your platform preferences',
      icon: Database
    },
    {
      id: 4,
      title: 'Integrations',
      description: 'Connect external services',
      icon: Zap
    },
    {
      id: 5,
      title: 'Admin Account',
      description: 'Set up your administrator account',
      icon: Shield
    },
    {
      id: 6,
      title: 'Complete Setup',
      description: 'Your platform is ready to use',
      icon: CheckCircle
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = async () => {
    try {
      await initializeSystem(setupData);
      toast.success('System initialized successfully!');
      navigate('/admin');
    } catch (error) {
      toast.error('Failed to initialize system');
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="text-center">
            <div className="w-24 h-24 bg-gradient-to-r from-aps-accent to-aps-orange rounded-full flex items-center justify-center mx-auto mb-6">
              <Crown className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-aps-dark mb-4">
              Welcome to Akshya Patra Services
            </h2>
            <p className="text-aps-gray-600 mb-8 max-w-md mx-auto">
              This setup wizard will help you configure your job consultancy platform. 
              It will take just a few minutes to get everything ready.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h3 className="font-medium text-blue-800 mb-2">What you'll set up:</h3>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Company information and branding</li>
                <li>• System preferences and security settings</li>
                <li>• Third-party service integrations</li>
                <li>• Administrator account configuration</li>
              </ul>
            </div>
          </div>
        );

      case 2:
        return (
          <div>
            <h2 className="text-2xl font-bold text-aps-dark mb-6">Company Information</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-aps-gray-700 mb-2">
                  Company Name
                </label>
                <input
                  type="text"
                  value={setupData.companyInfo.name}
                  onChange={(e) => setSetupData(prev => ({
                    ...prev,
                    companyInfo: { ...prev.companyInfo, name: e.target.value }
                  }))}
                  className="w-full px-4 py-3 border border-aps-gray-300 rounded-lg focus:ring-2 focus:ring-aps-primary focus:border-transparent"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-aps-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={setupData.companyInfo.email}
                    onChange={(e) => setSetupData(prev => ({
                      ...prev,
                      companyInfo: { ...prev.companyInfo, email: e.target.value }
                    }))}
                    className="w-full px-4 py-3 border border-aps-gray-300 rounded-lg focus:ring-2 focus:ring-aps-primary focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-aps-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={setupData.companyInfo.phone}
                    onChange={(e) => setSetupData(prev => ({
                      ...prev,
                      companyInfo: { ...prev.companyInfo, phone: e.target.value }
                    }))}
                    className="w-full px-4 py-3 border border-aps-gray-300 rounded-lg focus:ring-2 focus:ring-aps-primary focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-aps-gray-700 mb-2">
                  Address
                </label>
                <textarea
                  value={setupData.companyInfo.address}
                  onChange={(e) => setSetupData(prev => ({
                    ...prev,
                    companyInfo: { ...prev.companyInfo, address: e.target.value }
                  }))}
                  rows="3"
                  className="w-full px-4 py-3 border border-aps-gray-300 rounded-lg focus:ring-2 focus:ring-aps-primary focus:border-transparent"
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div>
            <h2 className="text-2xl font-bold text-aps-dark mb-6">System Settings</h2>
            <div className="space-y-6">
              {[
                {
                  key: 'autoApproval',
                  label: 'Auto Approval Mode',
                  description: 'Automatically approve all resume submissions'
                },
                {
                  key: 'confidentialityMode',
                  label: 'Confidentiality Mode',
                  description: 'Hide company information from candidates'
                },
                {
                  key: 'emailNotifications',
                  label: 'Email Notifications',
                  description: 'Send email alerts for important events'
                },
                {
                  key: 'realTimeUpdates',
                  label: 'Real-time Updates',
                  description: 'Enable live notifications and updates'
                }
              ].map((setting) => (
                <div key={setting.key} className="flex items-center justify-between p-4 border border-aps-gray-300 rounded-lg">
                  <div>
                    <h3 className="font-medium text-aps-dark">{setting.label}</h3>
                    <p className="text-sm text-aps-gray-600">{setting.description}</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={setupData.systemSettings[setting.key]}
                      onChange={(e) => setSetupData(prev => ({
                        ...prev,
                        systemSettings: {
                          ...prev.systemSettings,
                          [setting.key]: e.target.checked
                        }
                      }))}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-aps-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-aps-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-aps-primary"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div>
            <h2 className="text-2xl font-bold text-aps-dark mb-6">Integrations</h2>
            <p className="text-aps-gray-600 mb-6">
              Connect external services to enhance your platform capabilities. You can configure these later.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  key: 'cloudinary',
                  label: 'Cloudinary',
                  description: 'Cloud storage for resumes',
                  icon: Cloud
                },
                {
                  key: 'sendgrid',
                  label: 'SendGrid',
                  description: 'Email delivery service',
                  icon: Mail
                },
                {
                  key: 'pusher',
                  label: 'Pusher',
                  description: 'Real-time notifications',
                  icon: Zap
                },
                {
                  key: 'analytics',
                  label: 'Analytics',
                  description: 'Track platform usage',
                  icon: Database
                }
              ].map((integration) => {
                const Icon = integration.icon;
                return (
                  <div key={integration.key} className="border border-aps-gray-300 rounded-lg p-4">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-10 h-10 bg-aps-primary/10 rounded-lg flex items-center justify-center">
                        <Icon className="w-5 h-5 text-aps-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium text-aps-dark">{integration.label}</h3>
                        <p className="text-sm text-aps-gray-600">{integration.description}</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={setupData.integrations[integration.key]}
                        onChange={(e) => setSetupData(prev => ({
                          ...prev,
                          integrations: {
                            ...prev.integrations,
                            [integration.key]: e.target.checked
                          }
                        }))}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-aps-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-aps-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-aps-primary"></div>
                    </label>
                  </div>
                );
              })}
            </div>
          </div>
        );

      case 5:
        return (
          <div>
            <h2 className="text-2xl font-bold text-aps-dark mb-6">Administrator Account</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-aps-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={setupData.adminAccount.name}
                  onChange={(e) => setSetupData(prev => ({
                    ...prev,
                    adminAccount: { ...prev.adminAccount, name: e.target.value }
                  }))}
                  className="w-full px-4 py-3 border border-aps-gray-300 rounded-lg focus:ring-2 focus:ring-aps-primary focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-aps-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={setupData.adminAccount.email}
                  onChange={(e) => setSetupData(prev => ({
                    ...prev,
                    adminAccount: { ...prev.adminAccount, email: e.target.value }
                  }))}
                  className="w-full px-4 py-3 border border-aps-gray-300 rounded-lg focus:ring-2 focus:ring-aps-primary focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-aps-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={setupData.adminAccount.password}
                  onChange={(e) => setSetupData(prev => ({
                    ...prev,
                    adminAccount: { ...prev.adminAccount, password: e.target.value }
                  }))}
                  className="w-full px-4 py-3 border border-aps-gray-300 rounded-lg focus:ring-2 focus:ring-aps-primary focus:border-transparent"
                />
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <p className="text-sm text-amber-800">
                  <strong>Important:</strong> Make sure to remember these credentials. 
                  You'll use them to access the admin panel.
                </p>
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="text-center">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-aps-dark mb-4">
              Setup Complete!
            </h2>
            <p className="text-aps-gray-600 mb-8 max-w-md mx-auto">
              Your Akshya Patra Services platform is now ready to use. 
              You can start managing resumes, candidates, and HR operations.
            </p>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <h3 className="font-medium text-green-800 mb-2">What's next:</h3>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• Access your admin dashboard</li>
                <li>• Create HR user accounts</li>
                <li>• Configure sectors and designations</li>
                <li>• Start uploading and managing resumes</li>
              </ul>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-aps-light via-white to-aps-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = currentStep === step.id;
              const isCompleted = currentStep > step.id;
              
              return (
                <div key={step.id} className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isCompleted 
                      ? 'bg-green-500 text-white' 
                      : isActive 
                      ? 'bg-aps-primary text-white' 
                      : 'bg-aps-gray-200 text-aps-gray-500'
                  }`}>
                    {isCompleted ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <Icon className="w-5 h-5" />
                    )}
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-16 h-1 mx-2 transition-all duration-300 ${
                      isCompleted ? 'bg-green-500' : 'bg-aps-gray-200'
                    }`} />
                  )}
                </div>
              );
            })}
          </div>
          <div className="text-center">
            <h1 className="text-lg font-medium text-aps-dark">
              {steps[currentStep - 1]?.title}
            </h1>
            <p className="text-sm text-aps-gray-600">
              Step {currentStep} of {steps.length}
            </p>
          </div>
        </div>

        {/* Step Content */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="bg-white rounded-2xl shadow-xl p-8 mb-8"
        >
          {renderStepContent()}
        </motion.div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className="flex items-center space-x-2 px-6 py-3 border border-aps-gray-300 rounded-lg text-aps-gray-700 hover:bg-aps-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          {currentStep < steps.length ? (
            <button
              onClick={handleNext}
              className="flex items-center space-x-2 px-6 py-3 bg-aps-primary text-white rounded-lg hover:bg-aps-secondary transition-colors"
            >
              <span>Next</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleComplete}
              className="flex items-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <CheckCircle className="w-4 h-4" />
              <span>Complete Setup</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminOnboarding;