import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Zap, 
  Mail, 
  MessageSquare, 
  Cloud, 
  Database, 
  Webhook,
  Key,
  Settings,
  CheckCircle,
  XCircle,
  AlertCircle,
  ExternalLink,
  Copy,
  RefreshCw
} from 'lucide-react';
import { toast } from 'react-toastify';

const AdminIntegrations = () => {
  const [integrations, setIntegrations] = useState({
    email: {
      name: 'SendGrid',
      status: 'connected',
      apiKey: 'SG.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
      lastSync: '2024-01-15 10:30 AM',
      config: {
        fromEmail: 'noreply@akshyapatra.com',
        fromName: 'Akshya Patra Services',
        templates: ['welcome', 'resume_received', 'interview_scheduled']
      }
    },
    storage: {
      name: 'Cloudinary',
      status: 'connected',
      apiKey: 'cloudinary://xxxxxxxxxxxxxxxxxxxxxxxx',
      lastSync: '2024-01-15 11:45 AM',
      config: {
        cloudName: 'akshya-patra',
        folder: 'resumes',
        autoOptimize: true
      }
    },
    notifications: {
      name: 'Pusher',
      status: 'connected',
      apiKey: 'pusher_xxxxxxxxxxxxxxxxxxxxxxxx',
      lastSync: '2024-01-15 12:00 PM',
      config: {
        cluster: 'ap2',
        encrypted: true,
        channels: ['hr-notifications', 'admin-alerts']
      }
    },
    whatsapp: {
      name: 'WhatsApp Business API',
      status: 'pending',
      apiKey: '',
      lastSync: 'Never',
      config: {
        phoneNumber: '+91 9876543210',
        webhookUrl: 'https://api.akshyapatra.com/webhook/whatsapp'
      }
    },
    linkedin: {
      name: 'LinkedIn API',
      status: 'disconnected',
      apiKey: '',
      lastSync: 'Never',
      config: {
        companyId: 'akshya-patra-services',
        autoPost: false
      }
    },
    analytics: {
      name: 'Google Analytics',
      status: 'connected',
      apiKey: 'GA-XXXXXXXX-X',
      lastSync: '2024-01-15 09:15 AM',
      config: {
        trackingId: 'GA-XXXXXXXX-X',
        events: ['resume_upload', 'job_application', 'user_registration']
      }
    }
  });

  const [showApiKey, setShowApiKey] = useState({});

  const getStatusColor = (status) => {
    switch (status) {
      case 'connected': return 'text-aps-success bg-green-100';
      case 'pending': return 'text-aps-warning bg-yellow-100';
      case 'disconnected': return 'text-aps-error bg-red-100';
      default: return 'text-aps-gray-500 bg-aps-gray-100';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'connected': return <CheckCircle size={16} />;
      case 'pending': return <AlertCircle size={16} />;
      case 'disconnected': return <XCircle size={16} />;
      default: return <AlertCircle size={16} />;
    }
  };

  const handleConnect = (integrationKey) => {
    setIntegrations(prev => ({
      ...prev,
      [integrationKey]: {
        ...prev[integrationKey],
        status: 'connected',
        lastSync: new Date().toLocaleString()
      }
    }));
    toast.success(`${integrations[integrationKey].name} connected successfully!`);
  };

  const handleDisconnect = (integrationKey) => {
    setIntegrations(prev => ({
      ...prev,
      [integrationKey]: {
        ...prev[integrationKey],
        status: 'disconnected',
        lastSync: 'Never'
      }
    }));
    toast.error(`${integrations[integrationKey].name} disconnected`);
  };

  const handleSync = (integrationKey) => {
    setIntegrations(prev => ({
      ...prev,
      [integrationKey]: {
        ...prev[integrationKey],
        lastSync: new Date().toLocaleString()
      }
    }));
    toast.success(`${integrations[integrationKey].name} synced successfully!`);
  };

  const copyApiKey = (apiKey) => {
    navigator.clipboard.writeText(apiKey);
    toast.success('API key copied to clipboard!');
  };

  const toggleApiKeyVisibility = (integrationKey) => {
    setShowApiKey(prev => ({
      ...prev,
      [integrationKey]: !prev[integrationKey]
    }));
  };

  const IntegrationCard = ({ integrationKey, integration }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg border border-aps-gray-200 overflow-hidden"
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-aps-primary/10 rounded-lg flex items-center justify-center">
              {integrationKey === 'email' && <Mail className="w-6 h-6 text-aps-primary" />}
              {integrationKey === 'storage' && <Cloud className="w-6 h-6 text-aps-primary" />}
              {integrationKey === 'notifications' && <Zap className="w-6 h-6 text-aps-primary" />}
              {integrationKey === 'whatsapp' && <MessageSquare className="w-6 h-6 text-aps-primary" />}
              {integrationKey === 'linkedin' && <ExternalLink className="w-6 h-6 text-aps-primary" />}
              {integrationKey === 'analytics' && <Database className="w-6 h-6 text-aps-primary" />}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-aps-dark">{integration.name}</h3>
              <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(integration.status)}`}>
                {getStatusIcon(integration.status)}
                <span className="capitalize">{integration.status}</span>
              </div>
            </div>
          </div>
          <div className="flex space-x-2">
            {integration.status === 'connected' && (
              <button
                onClick={() => handleSync(integrationKey)}
                className="p-2 text-aps-gray-500 hover:text-aps-primary hover:bg-aps-gray-100 rounded-lg transition-colors"
                title="Sync"
              >
                <RefreshCw size={16} />
              </button>
            )}
            <button
              onClick={() => integration.status === 'connected' ? handleDisconnect(integrationKey) : handleConnect(integrationKey)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                integration.status === 'connected'
                  ? 'bg-aps-error text-white hover:bg-red-600'
                  : 'bg-aps-primary text-white hover:bg-aps-secondary'
              }`}
            >
              {integration.status === 'connected' ? 'Disconnect' : 'Connect'}
            </button>
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-aps-gray-700 mb-1">API Key</label>
            <div className="flex items-center space-x-2">
              <input
                type={showApiKey[integrationKey] ? 'text' : 'password'}
                value={integration.apiKey}
                readOnly
                className="flex-1 px-3 py-2 border border-aps-gray-300 rounded-lg bg-aps-gray-50 text-sm"
              />
              <button
                onClick={() => toggleApiKeyVisibility(integrationKey)}
                className="p-2 text-aps-gray-500 hover:text-aps-primary rounded-lg transition-colors"
              >
                <Key size={16} />
              </button>
              <button
                onClick={() => copyApiKey(integration.apiKey)}
                className="p-2 text-aps-gray-500 hover:text-aps-primary rounded-lg transition-colors"
              >
                <Copy size={16} />
              </button>
            </div>
          </div>

          <div className="text-sm text-aps-gray-600">
            <span className="font-medium">Last Sync:</span> {integration.lastSync}
          </div>

          {/* Configuration Details */}
          <div className="bg-aps-gray-50 rounded-lg p-3">
            <h4 className="text-sm font-medium text-aps-dark mb-2">Configuration</h4>
            <div className="space-y-1 text-xs text-aps-gray-600">
              {Object.entries(integration.config).map(([key, value]) => (
                <div key={key} className="flex justify-between">
                  <span className="capitalize">{key.replace(/([A-Z])/g, ' $1').toLowerCase()}:</span>
                  <span className="font-medium">
                    {Array.isArray(value) ? value.join(', ') : value.toString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
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
              <Webhook className="w-8 h-8" />
              <div>
                <h1 className="text-3xl font-bold">Integrations</h1>
                <p className="text-aps-gray-100 mt-1">
                  Manage third-party services and API connections
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Integration Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-2xl font-bold text-aps-success mb-2">4</div>
            <div className="text-sm text-aps-gray-600">Connected</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-2xl font-bold text-aps-warning mb-2">1</div>
            <div className="text-sm text-aps-gray-600">Pending</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-2xl font-bold text-aps-error mb-2">1</div>
            <div className="text-sm text-aps-gray-600">Disconnected</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-2xl font-bold text-aps-primary mb-2">6</div>
            <div className="text-sm text-aps-gray-600">Total</div>
          </div>
        </motion.div>

        {/* Integrations Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {Object.entries(integrations).map(([key, integration]) => (
            <IntegrationCard
              key={key}
              integrationKey={key}
              integration={integration}
            />
          ))}
        </div>

        {/* Webhook Configuration */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 bg-white rounded-xl shadow-lg p-6"
        >
          <h2 className="text-xl font-semibold text-aps-dark mb-6 flex items-center">
            <Webhook className="w-6 h-6 mr-2" />
            Webhook Configuration
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-aps-gray-700 mb-2">
                Webhook URL
              </label>
              <input
                type="url"
                value="https://api.akshyapatra.com/webhook"
                className="w-full px-4 py-3 border border-aps-gray-300 rounded-lg focus:ring-2 focus:ring-aps-primary focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-aps-gray-700 mb-2">
                Secret Key
              </label>
              <input
                type="password"
                value="webhook_secret_key_12345"
                className="w-full px-4 py-3 border border-aps-gray-300 rounded-lg focus:ring-2 focus:ring-aps-primary focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="mt-6">
            <h3 className="text-lg font-medium text-aps-dark mb-3">Event Types</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {['resume.uploaded', 'candidate.applied', 'report.generated', 'user.registered'].map((event) => (
                <label key={event} className="flex items-center space-x-2">
                  <input type="checkbox" defaultChecked className="rounded border-aps-gray-300 text-aps-primary focus:ring-aps-primary" />
                  <span className="text-sm text-aps-gray-700">{event}</span>
                </label>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminIntegrations;