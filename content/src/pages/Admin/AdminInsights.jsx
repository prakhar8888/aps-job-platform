import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  FileText, 
  Calendar,
  Download,
  Filter,
  RefreshCw
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { Line, Bar, Doughnut, Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadialLinearScale
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadialLinearScale
);

const AdminInsights = () => {
  const { analytics, refreshAnalytics } = useAdmin();
  const [timeRange, setTimeRange] = useState('30d');
  const [selectedMetric, setSelectedMetric] = useState('resumes');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadAnalytics();
  }, [timeRange]);

  const loadAnalytics = async () => {
    setIsLoading(true);
    await refreshAnalytics(timeRange);
    setIsLoading(false);
  };

  // Chart configurations
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const resumeTrendData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Resumes Uploaded',
        data: [65, 78, 90, 81, 95, 120],
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
      },
      {
        label: 'Candidates Hired',
        data: [12, 15, 18, 16, 22, 28],
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.4,
      },
    ],
  };

  const sectorDistributionData = {
    labels: ['Technology', 'Healthcare', 'Finance', 'Education', 'Retail'],
    datasets: [
      {
        data: [35, 25, 20, 12, 8],
        backgroundColor: [
          '#3b82f6',
          '#10b981',
          '#f59e0b',
          '#ef4444',
          '#8b5cf6',
        ],
        borderWidth: 0,
      },
    ],
  };

  const performanceData = {
    labels: ['Response Time', 'Success Rate', 'User Satisfaction', 'System Uptime', 'Data Accuracy'],
    datasets: [
      {
        label: 'Current Performance',
        data: [85, 92, 88, 99, 94],
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        borderColor: '#3b82f6',
        pointBackgroundColor: '#3b82f6',
      },
      {
        label: 'Target Performance',
        data: [90, 95, 90, 99.5, 95],
        backgroundColor: 'rgba(16, 185, 129, 0.2)',
        borderColor: '#10b981',
        pointBackgroundColor: '#10b981',
      },
    ],
  };

  const hiringFunnelData = {
    labels: ['Applications', 'Screened', 'Interviewed', 'Offered', 'Hired'],
    datasets: [
      {
        label: 'Candidates',
        data: [1250, 875, 425, 220, 180],
        backgroundColor: [
          '#3b82f6',
          '#1e40af',
          '#1e3a8a',
          '#1e293b',
          '#0f172a',
        ],
      },
    ],
  };

  const StatCard = ({ title, value, change, icon: Icon, color }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg p-6 border border-aps-gray-200"
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 bg-gradient-to-r ${color} rounded-lg flex items-center justify-center`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div className={`flex items-center space-x-1 text-sm ${
          change >= 0 ? 'text-green-600' : 'text-red-600'
        }`}>
          <TrendingUp className="w-4 h-4" />
          <span>{change >= 0 ? '+' : ''}{change}%</span>
        </div>
      </div>
      <div className="text-2xl font-bold text-aps-dark mb-1">{value}</div>
      <div className="text-sm text-aps-gray-600">{title}</div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-aps-light via-white to-aps-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="bg-gradient-to-r from-aps-primary to-aps-secondary rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <BarChart3 className="w-8 h-8" />
                <div>
                  <h1 className="text-3xl font-bold">Analytics & Insights</h1>
                  <p className="text-aps-gray-100 mt-1">
                    Comprehensive data analysis and performance metrics
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <select
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                  className="px-4 py-2 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                >
                  <option value="7d">Last 7 days</option>
                  <option value="30d">Last 30 days</option>
                  <option value="90d">Last 90 days</option>
                  <option value="1y">Last year</option>
                </select>
                <button
                  onClick={loadAnalytics}
                  disabled={isLoading}
                  className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                >
                  <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Resumes"
            value="1,247"
            change={15.3}
            icon={FileText}
            color="from-aps-primary to-aps-secondary"
          />
          <StatCard
            title="Active Users"
            value="89"
            change={8.2}
            icon={Users}
            color="from-aps-success to-green-400"
          />
          <StatCard
            title="Conversion Rate"
            value="23.8%"
            change={-2.1}
            icon={TrendingUp}
            color="from-aps-warning to-yellow-400"
          />
          <StatCard
            title="Monthly Growth"
            value="12.5%"
            change={5.7}
            icon={Calendar}
            color="from-aps-accent to-aps-orange"
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Resume Trends */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-aps-dark">Resume Trends</h2>
              <button className="text-aps-primary hover:text-aps-secondary transition-colors">
                <Download className="w-5 h-5" />
              </button>
            </div>
            <div className="h-80">
              <Line data={resumeTrendData} options={chartOptions} />
            </div>
          </motion.div>

          {/* Sector Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-aps-dark">Sector Distribution</h2>
              <button className="text-aps-primary hover:text-aps-secondary transition-colors">
                <Download className="w-5 h-5" />
              </button>
            </div>
            <div className="h-80">
              <Doughnut 
                data={sectorDistributionData} 
                options={{
                  ...chartOptions,
                  plugins: {
                    ...chartOptions.plugins,
                    legend: {
                      position: 'bottom',
                    },
                  },
                }} 
              />
            </div>
          </motion.div>

          {/* Performance Radar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-aps-dark">Performance Metrics</h2>
              <button className="text-aps-primary hover:text-aps-secondary transition-colors">
                <Download className="w-5 h-5" />
              </button>
            </div>
            <div className="h-80">
              <Radar 
                data={performanceData} 
                options={{
                  ...chartOptions,
                  scales: {
                    r: {
                      beginAtZero: true,
                      max: 100,
                    },
                  },
                }} 
              />
            </div>
          </motion.div>

          {/* Hiring Funnel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-aps-dark">Hiring Funnel</h2>
              <button className="text-aps-primary hover:text-aps-secondary transition-colors">
                <Download className="w-5 h-5" />
              </button>
            </div>
            <div className="h-80">
              <Bar 
                data={hiringFunnelData} 
                options={{
                  ...chartOptions,
                  plugins: {
                    ...chartOptions.plugins,
                    legend: {
                      display: false,
                    },
                  },
                }} 
              />
            </div>
          </motion.div>
        </div>

        {/* Detailed Analytics Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-aps-dark">Detailed Analytics</h2>
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 px-4 py-2 border border-aps-gray-300 rounded-lg hover:bg-aps-gray-50 transition-colors">
                <Filter className="w-4 h-4" />
                <span>Filter</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 bg-aps-primary text-white rounded-lg hover:bg-aps-secondary transition-colors">
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-aps-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-aps-gray-700">Metric</th>
                  <th className="text-left py-3 px-4 font-medium text-aps-gray-700">Current</th>
                  <th className="text-left py-3 px-4 font-medium text-aps-gray-700">Previous</th>
                  <th className="text-left py-3 px-4 font-medium text-aps-gray-700">Change</th>
                  <th className="text-left py-3 px-4 font-medium text-aps-gray-700">Trend</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { metric: 'Total Applications', current: '1,247', previous: '1,083', change: '+15.1%', trend: 'up' },
                  { metric: 'Successful Placements', current: '298', previous: '267', change: '+11.6%', trend: 'up' },
                  { metric: 'Average Response Time', current: '2.3h', previous: '2.8h', change: '-17.9%', trend: 'up' },
                  { metric: 'User Satisfaction', current: '4.7/5', previous: '4.5/5', change: '+4.4%', trend: 'up' },
                  { metric: 'System Uptime', current: '99.8%', previous: '99.2%', change: '+0.6%', trend: 'up' },
                ].map((row, index) => (
                  <tr key={index} className="border-b border-aps-gray-100 hover:bg-aps-gray-50">
                    <td className="py-3 px-4 font-medium text-aps-dark">{row.metric}</td>
                    <td className="py-3 px-4 text-aps-gray-700">{row.current}</td>
                    <td className="py-3 px-4 text-aps-gray-700">{row.previous}</td>
                    <td className={`py-3 px-4 font-medium ${
                      row.trend === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {row.change}
                    </td>
                    <td className="py-3 px-4">
                      <div className={`flex items-center space-x-1 ${
                        row.trend === 'up' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        <TrendingUp className="w-4 h-4" />
                        <span className="text-sm">Positive</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminInsights;