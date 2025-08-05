import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, TrendingDown, Activity } from 'lucide-react';

const AnalyticsChart = () => {
  const [chartData, setChartData] = useState(null);
  const [activeTab, setActiveTab] = useState('weekly');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock analytics data
    const mockData = {
      weekly: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        resumes: [12, 19, 8, 15, 22, 7, 14],
        placements: [2, 4, 1, 3, 5, 1, 2]
      },
      monthly: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        resumes: [145, 189, 167, 203, 178, 234],
        placements: [23, 31, 28, 35, 29, 42]
      }
    };

    setTimeout(() => {
      setChartData(mockData);
      setLoading(false);
    }, 1000);
  }, []);

  const stats = [
    {
      title: 'Total Resumes',
      value: '1,234',
      change: '+12%',
      trend: 'up',
      icon: BarChart3
    },
    {
      title: 'Placements',
      value: '89',
      change: '+8%',
      trend: 'up',
      icon: TrendingUp
    },
    {
      title: 'Success Rate',
      value: '7.2%',
      change: '-2%',
      trend: 'down',
      icon: Activity
    }
  ];

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-aps-gray-200 p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-6"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-aps-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-aps-dark">Analytics Overview</h3>
        
        <div className="flex space-x-2">
          <button
            onClick={() => setActiveTab('weekly')}
            className={`px-3 py-1 text-sm rounded-md transition-colors ${
              activeTab === 'weekly'
                ? 'bg-aps-primary text-white'
                : 'bg-gray-100 text-aps-gray-600 hover:bg-gray-200'
            }`}
          >
            Weekly
          </button>
          <button
            onClick={() => setActiveTab('monthly')}
            className={`px-3 py-1 text-sm rounded-md transition-colors ${
              activeTab === 'monthly'
                ? 'bg-aps-primary text-white'
                : 'bg-gray-100 text-aps-gray-600 hover:bg-gray-200'
            }`}
          >
            Monthly
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          
          return (
            <div key={index} className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <IconComponent className="w-5 h-5 text-aps-gray-400" />
                <span className={`text-xs font-medium ${
                  stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change}
                </span>
              </div>
              <div className="text-2xl font-bold text-aps-dark mb-1">
                {stat.value}
              </div>
              <div className="text-xs text-aps-gray-500">
                {stat.title}
              </div>
            </div>
          );
        })}
      </div>

      {/* Simple Bar Chart Visualization */}
      <div className="space-y-4">
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-aps-primary rounded"></div>
            <span className="text-aps-gray-600">Resumes</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded"></div>
            <span className="text-aps-gray-600">Placements</span>
          </div>
        </div>

        <div className="h-48 flex items-end space-x-2">
          {chartData[activeTab].labels.map((label, index) => {
            const resumeHeight = (chartData[activeTab].resumes[index] / Math.max(...chartData[activeTab].resumes)) * 100;
            const placementHeight = (chartData[activeTab].placements[index] / Math.max(...chartData[activeTab].resumes)) * 100;
            
            return (
              <div key={label} className="flex-1 flex flex-col items-center space-y-2">
                <div className="w-full flex items-end space-x-1 h-32">
                  <div
                    className="bg-aps-primary rounded-t flex-1 transition-all duration-500"
                    style={{ height: `${resumeHeight}%` }}
                    title={`${chartData[activeTab].resumes[index]} resumes`}
                  ></div>
                  <div
                    className="bg-green-500 rounded-t flex-1 transition-all duration-500"
                    style={{ height: `${placementHeight}%` }}
                    title={`${chartData[activeTab].placements[index]} placements`}
                  ></div>
                </div>
                <span className="text-xs text-aps-gray-500">{label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsChart;