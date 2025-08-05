// Mock API for development and offline functionality
import { generateMockData } from '../utils/mockData.js';

const API_DELAY = 500; // Simulate network delay

const simulateAPICall = (data, delay = API_DELAY) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), delay);
  });
};

// Authentication API
export const authAPI = {
  async login(credentials, role) {
    await simulateAPICall(null, 800);
    
    const validCredentials = {
      hr: { email: 'hr@akshyapatra.com', password: 'hr123456' },
      admin: { email: 'admin@akshyapatra.com', password: 'admin123456' }
    };

    const isValid = validCredentials[role] && 
                   validCredentials[role].email === credentials.email &&
                   validCredentials[role].password === credentials.password;

    if (isValid) {
      const user = {
        id: `${role}_1`,
        name: role === 'hr' ? 'HR Manager' : 'System Administrator',
        email: credentials.email,
        role: role,
        permissions: role === 'admin' ? ['all'] : ['read', 'write']
      };

      return {
        success: true,
        user,
        token: `mock_token_${role}_${Date.now()}`
      };
    }

    return {
      success: false,
      error: 'Invalid credentials'
    };
  }
};

// Candidate API
export const candidateAPI = {
  async getJobs() {
    const jobs = generateMockData.jobs();
    return simulateAPICall(jobs);
  },

  async getSectors() {
    const sectors = generateMockData.sectors();
    return simulateAPICall(sectors);
  },

  async getDesignationsBySector(sectorId) {
    const designations = generateMockData.designations().filter(d => d.sectorId === sectorId);
    return simulateAPICall(designations);
  },

  async searchJobs(filters) {
    let jobs = generateMockData.jobs();
    
    // Apply filters
    if (filters.sector) {
      jobs = jobs.filter(job => job.sectorId === filters.sector);
    }
    if (filters.designation) {
      jobs = jobs.filter(job => job.designationId === filters.designation);
    }
    if (filters.city) {
      jobs = jobs.filter(job => job.city.toLowerCase().includes(filters.city.toLowerCase()));
    }
    if (filters.searchTerm) {
      const term = filters.searchTerm.toLowerCase();
      jobs = jobs.filter(job => 
        job.designation.toLowerCase().includes(term) ||
        job.sector.toLowerCase().includes(term) ||
        job.keywords.some(keyword => keyword.toLowerCase().includes(term))
      );
    }
    
    return simulateAPICall(jobs);
  },

  async applyToJob(jobId, candidateData) {
    await simulateAPICall(null, 1000);
    
    return {
      success: true,
      applicationId: `app_${Date.now()}`,
      message: 'Application submitted successfully'
    };
  }
};

// HR API
export const hrAPI = {
  async getResumes() {
    const resumes = generateMockData.resumes();
    return simulateAPICall(resumes);
  },

  async getSectors() {
    const sectors = generateMockData.sectors();
    return simulateAPICall(sectors);
  },

  async getPermissions() {
    return simulateAPICall({
      canUpload: true,
      canEdit: true,
      canDelete: false,
      canManageSectors: true,
      canViewReports: true,
      canExport: true
    });
  },

  async uploadResume(file, metadata) {
    await simulateAPICall(null, 2000);
    
    const resume = {
      id: `resume_${Date.now()}`,
      name: metadata.name || 'John Doe',
      email: metadata.email || 'john@example.com',
      phone: metadata.phone || '+91 9876543210',
      fileName: file.name,
      fileSize: file.size,
      uploadedAt: new Date().toISOString(),
      status: 'pending',
      sector: metadata.sector || 'Technology',
      designation: metadata.designation || 'Software Developer',
      experience: metadata.experience || '2-5 years',
      parsedData: metadata
    };

    return {
      success: true,
      resume
    };
  },

  async parseResume(file) {
    await simulateAPICall(null, 3000);
    
    // Simulate AI-powered resume parsing
    const mockParsedData = {
      name: 'John Doe',
      email: 'john.doe@email.com',
      phone: '+91 9876543210',
      city: 'Mumbai',
      experience: '3 years',
      skills: ['JavaScript', 'React', 'Node.js', 'Python'],
      sector: 'Technology',
      designation: 'Software Developer',
      education: 'B.Tech Computer Science',
      previousCompanies: ['TechCorp', 'StartupXYZ']
    };

    return {
      success: true,
      data: mockParsedData,
      confidence: 0.95
    };
  },

  async updateResumeStatus(resumeId, status, feedback) {
    await simulateAPICall(null);
    
    return {
      success: true,
      message: 'Resume status updated successfully'
    };
  },

  async searchResumes(filters) {
    let resumes = generateMockData.resumes();
    
    // Apply search filters
    if (filters.name) {
      resumes = resumes.filter(resume => 
        resume.name.toLowerCase().includes(filters.name.toLowerCase())
      );
    }
    if (filters.sector) {
      resumes = resumes.filter(resume => resume.sector === filters.sector);
    }
    if (filters.status) {
      resumes = resumes.filter(resume => resume.status === filters.status);
    }
    
    return simulateAPICall(resumes);
  },

  async generateReport(reportType, dateRange) {
    await simulateAPICall(null, 2000);
    
    const report = {
      id: `report_${Date.now()}`,
      type: reportType,
      dateRange,
      generatedAt: new Date().toISOString(),
      data: {
        totalResumes: 150,
        approvedCount: 45,
        rejectedCount: 25,
        pendingCount: 80
      }
    };

    return {
      success: true,
      report
    };
  }
};

// Admin API
export const adminAPI = {
  async getEmployees() {
    const employees = generateMockData.employees();
    return simulateAPICall(employees);
  },

  async getHRUsers() {
    const hrUsers = generateMockData.hrUsers();
    return simulateAPICall(hrUsers);
  },

  async getSystemSettings() {
    return simulateAPICall({
      features: {
        permanentApprovalMode: false,
        confidentialityMode: false,
        autoAssignment: true,
        emailNotifications: true,
        voiceCommands: true
      },
      apiConfig: {
        resumeParser: 'enabled',
        cloudinary: 'enabled',
        sendgrid: 'enabled',
        pusher: 'enabled'
      }
    });
  },

  async getPermissions() {
    return simulateAPICall({
      hr_1: {
        canUpload: true,
        canEdit: true,
        canDelete: false,
        canManageSectors: true,
        canViewReports: true,
        canExport: true
      }
    });
  },

  async getAnalytics() {
    return simulateAPICall({
      totalResumes: 1250,
      monthlyGrowth: 15.5,
      conversionRate: 23.8,
      topSectors: [
        { name: 'Technology', count: 450 },
        { name: 'Healthcare', count: 320 },
        { name: 'Finance', count: 280 }
      ],
      hiringFunnel: {
        applied: 1250,
        screened: 875,
        interviewed: 425,
        hired: 180
      }
    });
  },

  async getActivityLogs() {
    const logs = generateMockData.activityLogs();
    return simulateAPICall(logs);
  },

  async createEmployee(employeeData) {
    await simulateAPICall(null, 1000);
    
    const employee = {
      id: `emp_${Date.now()}`,
      ...employeeData,
      createdAt: new Date().toISOString(),
      status: 'active'
    };

    return {
      success: true,
      employee
    };
  },

  async updateEmployee(employeeId, updateData) {
    await simulateAPICall(null);
    
    return {
      success: true,
      message: 'Employee updated successfully'
    };
  },

  async deleteEmployee(employeeId) {
    await simulateAPICall(null);
    
    return {
      success: true,
      message: 'Employee deleted successfully'
    };
  },

  async updatePermissions(userId, newPermissions) {
    await simulateAPICall(null);
    
    return {
      success: true,
      message: 'Permissions updated successfully'
    };
  },

  async updateSystemSettings(settings) {
    await simulateAPICall(null);
    
    return {
      success: true,
      message: 'System settings updated successfully'
    };
  },

  async approveReport(reportId) {
    await simulateAPICall(null);
    
    return {
      success: true,
      message: 'Report approved successfully'
    };
  },

  async toggleFeature(featureName, enabled) {
    await simulateAPICall(null);
    
    return {
      success: true,
      message: `${featureName} ${enabled ? 'enabled' : 'disabled'} successfully`
    };
  }
};