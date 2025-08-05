import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, Download, Calendar, TrendingUp, 
  Users, FileText, Clock, CheckCircle 
} from 'lucide-react';
import { useHR } from '../../context/HRContext.jsx';
import { toast } from 'react-toastify';
import FormField from '../../components/Common/FormField.jsx';

const HRReports = () => {
  const { generateReport, exportReport, reports } = useHR();
  const [reportType, setReportType] = useState('daily');
  const [dateRange, setDateRange] = useState({
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0]
  });
  const [selectedSector, setSelectedSector] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [reportData, setReportData] = useState(null);

  const reportTypes = [
    { value: 'daily', label: 'Daily Report' },
    { value: 'weekly', label: 'Weekly Report' },
    { value: 'monthly', label: 'Monthly Report' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const handleGenerateReport = async () => {
    try {
      setIsGenerating(true);
      const result = await generateReport({
        type: reportType,
        dateRange,
        sector: selectedSector
      });
      
      if (result.success) {
        setReportData(result.data);
        toast.success('Report generated successfully');
      } else {
        toast.error(result.error || 'Failed to generate report');
      }
    } catch (error) {
      toast.error('Failed to generate report');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleExportReport = async (format) => {
    try {
      const result = await exportReport(reportData, format);
      if (result.success) {
        toast.success(`Report exported as ${format.toUpperCase()}`);
      } else {
        toast.error('Export failed');
      }
    } catch (error) {
      toast.error('Export failed');
    }
  };

  useEffect(() => {
    // Auto-generate daily report on component mount
    handleGenerateReport();
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-aps-warning to-aps-accent rounded-xl p-6 text-white"
      >
        <div className="flex items-center space-x-4">
          <BarChart3 className="w-8 h-8" />
          <div>
            <h1 className="text-2xl font-bold">Reports & Analytics</h1>
            <p className="text-orange-100">Generate and export detailed reports</p>
          </div>
        </div>
      </motion.div>

      {/* Report Configuration */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-xl shadow-sm p-6"
      >
        <h2 className="text-xl font-semibold text-aps-dark mb-6">Generate Report</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <FormField
            label="Report Type"
            type="select"
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
            options={reportTypes}
          />
          
          <FormField
            label="Start Date"
            type="date"
            value={dateRange.startDate}
            onChange={(e) => setDateRange(prev => ({ ...prev, startDate: e.target.value }))}
          />
          
          <FormField
            label="End Date"
            type="date"
            value={dateRange.endDate}
            onChange={(e) => setDateRange(prev => ({ ...prev, endDate: e.target.value }))}
          />
          
          <FormField
            label="Sector Filter"
            type="select"
            value={selectedSector}
            onChange={(e) => setSelectedSector(e.target.value)}
            options={[
              { value: '', label: 'All Sectors' },
              { value: 'healthcare', label: 'Healthcare' },
              { value: 'corporate', label: 'Corporate' },
              { value: 'education', label: 'Education' },
              { value: 'hospitality', label: 'Hospitality' }
            ]}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <button
            onClick={handleGenerateReport}
            disabled={isGenerating}
            className="btn-primary"
          >
            {isGenerating ? (
              <>
                <div className="loader mr-2"></div>
                Generating...
              </>
            ) : (
              <>
                <BarChart3 className="w-4 h-4 mr-2" />
                Generate Report
              </>
            )}
          </button>
          
          {reportData && (
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleExportReport('pdf')}
                className="btn-secondary"
              >
                <Download className="w-4 h-4 mr-2" />
                Export PDF
              </button>
              
              <button
                onClick={() => handleExportReport('excel')}
                className="btn-secondary"
              >
                <Download className="w-4 h-4 mr-2" />
                Export Excel
              </button>
            </div>
          )}
        </div>
      </motion.div>

      {/* Report Results */}
      {reportData && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-sm p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-aps-dark">Report Results</h2>
            <div className="text-sm text-aps-gray-600">
              Generated on {new Date().toLocaleDateString()}
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-gradient-to-r from-aps-primary to-aps-secondary rounded-lg p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100">Total Resumes</p>
                  <p className="text-2xl font-bold">{reportData.totalResumes || 0}</p>
                </div>
                <FileText className="w-8 h-8 text-blue-200" />
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-aps-success to-green-400 rounded-lg p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100">Processed</p>
                  <p className="text-2xl font-bold">{reportData.processedResumes || 0}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-200" />
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-aps-warning to-yellow-400 rounded-lg p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-100">Pending</p>
                  <p className="text-2xl font-bold">{reportData.pendingResumes || 0}</p>
                </div>
                <Clock className="w-8 h-8 text-yellow-200" />
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-aps-accent to-aps-orange rounded-lg p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100">Hired</p>
                  <p className="text-2xl font-bold">{reportData.hiredCandidates || 0}</p>
                </div>
                <Users className="w-8 h-8 text-orange-200" />
              </div>
            </div>
          </div>

          {/* Detailed Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Sector Breakdown */}
            <div>
              <h3 className="text-lg font-semibold text-aps-dark mb-4">Sector Breakdown</h3>
              <div className="space-y-3">
                {reportData.sectorBreakdown?.map((sector, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-aps-gray-50 rounded-lg">
                    <span className="font-medium text-aps-dark">{sector.name}</span>
                    <div className="flex items-center space-x-4">
                      <div className="w-32 bg-aps-gray-200 rounded-full h-2">
                        <div 
                          className="bg-aps-primary h-2 rounded-full transition-all duration-300"
                          style={{ width: `${(sector.count / reportData.totalResumes) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-aps-gray-600 w-8">
                        {sector.count}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Status Breakdown */}
            <div>
              <h3 className="text-lg font-semibold text-aps-dark mb-4">Status Breakdown</h3>
              <div className="space-y-3">
                {reportData.statusBreakdown?.map((status, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-aps-gray-50 rounded-lg">
                    <span className="font-medium text-aps-dark capitalize">{status.status}</span>
                    <div className="flex items-center space-x-4">
                      <div className="w-32 bg-aps-gray-200 rounded-full h-2">
                        <div 
                          className="bg-aps-secondary h-2 rounded-full transition-all duration-300"
                          style={{ width: `${(status.count / reportData.totalResumes) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-aps-gray-600 w-8">
                        {status.count}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-aps-dark mb-4">Recent Activity</h3>
            <div className="bg-aps-gray-50 rounded-lg p-4">
              <div className="space-y-3">
                {reportData.recentActivity?.slice(0, 5).map((activity, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <span className="text-aps-gray-700">{activity.description}</span>
                    <span className="text-aps-gray-500">{activity.timestamp}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Previous Reports */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-xl shadow-sm p-6"
      >
        <h2 className="text-xl font-semibold text-aps-dark mb-6">Previous Reports</h2>
        
        <div className="space-y-4">
          {reports.slice(0, 5).map((report, index) => (
            <div key={index} className="flex items-center justify-between p-4 border border-aps-gray-200 rounded-lg hover:bg-aps-gray-50 transition-colors duration-300">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-aps-primary/10 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-aps-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-aps-dark">{report.title}</h3>
                  <p className="text-sm text-aps-gray-600">{report.description}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <span className="text-sm text-aps-gray-500">{report.generatedAt}</span>
                <button className="btn-secondary">
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default HRReports;