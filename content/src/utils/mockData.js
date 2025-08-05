// Mock data generators for development and testing

export const generateMockData = {
  sectors() {
    return [
      { id: 'tech', name: 'Technology', description: 'Software, IT, and tech roles' },
      { id: 'healthcare', name: 'Healthcare', description: 'Medical and healthcare positions' },
      { id: 'finance', name: 'Finance', description: 'Banking, accounting, and finance' },
      { id: 'education', name: 'Education', description: 'Teaching and training roles' },
      { id: 'retail', name: 'Retail', description: 'Sales and retail positions' },
      { id: 'manufacturing', name: 'Manufacturing', description: 'Production and manufacturing' }
    ];
  },

  designations() {
    return [
      // Technology
      { id: 'software-dev', name: 'Software Developer', sectorId: 'tech' },
      { id: 'frontend-dev', name: 'Frontend Developer', sectorId: 'tech' },
      { id: 'backend-dev', name: 'Backend Developer', sectorId: 'tech' },
      { id: 'fullstack-dev', name: 'Full Stack Developer', sectorId: 'tech' },
      { id: 'data-scientist', name: 'Data Scientist', sectorId: 'tech' },
      { id: 'devops-engineer', name: 'DevOps Engineer', sectorId: 'tech' },
      
      // Healthcare
      { id: 'nurse', name: 'Registered Nurse', sectorId: 'healthcare' },
      { id: 'doctor', name: 'Doctor', sectorId: 'healthcare' },
      { id: 'pharmacist', name: 'Pharmacist', sectorId: 'healthcare' },
      { id: 'medical-tech', name: 'Medical Technician', sectorId: 'healthcare' },
      
      // Finance
      { id: 'accountant', name: 'Accountant', sectorId: 'finance' },
      { id: 'financial-analyst', name: 'Financial Analyst', sectorId: 'finance' },
      { id: 'bank-manager', name: 'Bank Manager', sectorId: 'finance' },
      
      // Education
      { id: 'teacher', name: 'Teacher', sectorId: 'education' },
      { id: 'professor', name: 'Professor', sectorId: 'education' },
      { id: 'trainer', name: 'Corporate Trainer', sectorId: 'education' }
    ];
  },

  jobs() {
    const jobs = [];
    const sectors = this.sectors();
    const designations = this.designations();
    const cities = ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Pune'];
    const areas = {
      'Mumbai': ['Andheri', 'Bandra', 'Powai', 'Lower Parel'],
      'Delhi': ['Connaught Place', 'Gurgaon', 'Noida', 'Dwarka'],
      'Bangalore': ['Koramangala', 'Whitefield', 'Electronic City', 'HSR Layout'],
      'Hyderabad': ['Hitech City', 'Gachibowli', 'Madhapur', 'Secunderabad'],
      'Chennai': ['Anna Nagar', 'T. Nagar', 'Velachery', 'OMR'],
      'Pune': ['Hinjewadi', 'Koregaon Park', 'Viman Nagar', 'Kharadi']
    };

    for (let i = 0; i < 50; i++) {
      const sector = sectors[Math.floor(Math.random() * sectors.length)];
      const designation = designations.filter(d => d.sectorId === sector.id)[0];
      const city = cities[Math.floor(Math.random() * cities.length)];
      const area = areas[city][Math.floor(Math.random() * areas[city].length)];

      jobs.push({
        id: `job_${i + 1}`,
        designation: designation?.name || 'General Position',
        sector: sector.name,
        sectorId: sector.id,
        designationId: designation?.id,
        city,
        area,
        salary: {
          min: Math.floor(Math.random() * 15) + 3,
          max: Math.floor(Math.random() * 20) + 10
        },
        experience: {
          min: Math.floor(Math.random() * 3),
          max: Math.floor(Math.random() * 8) + 2
        },
        keywords: this.getKeywordsBySector(sector.id),
        postedAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
        featured: Math.random() > 0.8,
        urgent: Math.random() > 0.9
      });
    }

    return jobs;
  },

  resumes() {
    const resumes = [];
    const names = ['John Doe', 'Jane Smith', 'Rahul Kumar', 'Priya Sharma', 'Michael Johnson', 'Sarah Wilson'];
    const sectors = this.sectors();
    const designations = this.designations();
    const statuses = ['pending', 'approved', 'rejected', 'under_review'];

    for (let i = 0; i < 100; i++) {
      const sector = sectors[Math.floor(Math.random() * sectors.length)];
      const designation = designations.filter(d => d.sectorId === sector.id)[0];
      
      resumes.push({
        id: `resume_${i + 1}`,
        name: names[Math.floor(Math.random() * names.length)],
        email: `candidate${i + 1}@example.com`,
        phone: `+91 ${Math.floor(Math.random() * 9000000000) + 1000000000}`,
        sector: sector.name,
        designation: designation?.name || 'General',
        experience: `${Math.floor(Math.random() * 10)} years`,
        fileName: `resume_${i + 1}.pdf`,
        uploadedAt: new Date(Date.now() - Math.random() * 60 * 24 * 60 * 60 * 1000).toISOString(),
        status: statuses[Math.floor(Math.random() * statuses.length)],
        parsedData: {
          skills: this.getKeywordsBySector(sector.id).slice(0, 5),
          education: 'Bachelor of Technology',
          city: 'Mumbai'
        }
      });
    }

    return resumes;
  },

  employees() {
    return [
      {
        id: 'emp_1',
        name: 'Rajesh Kumar',
        email: 'rajesh@akshyapatra.com',
        role: 'hr',
        department: 'Human Resources',
        joinedAt: '2023-01-15',
        status: 'active',
        permissions: ['read', 'write', 'upload']
      },
      {
        id: 'emp_2',
        name: 'Sneha Patel',
        email: 'sneha@akshyapatra.com',
        role: 'hr',
        department: 'Recruitment',
        joinedAt: '2023-03-20',
        status: 'active',
        permissions: ['read', 'write']
      }
    ];
  },

  hrUsers() {
    return [
      {
        id: 'hr_1',
        name: 'Rajesh Kumar',
        email: 'rajesh@akshyapatra.com',
        lastLogin: new Date().toISOString(),
        resumesUploaded: 45,
        status: 'online'
      },
      {
        id: 'hr_2',
        name: 'Sneha Patel',
        email: 'sneha@akshyapatra.com',
        lastLogin: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        resumesUploaded: 32,
        status: 'away'
      }
    ];
  },

  activityLogs() {
    const logs = [];
    const actions = ['uploaded resume', 'approved candidate', 'rejected application', 'updated settings'];
    const users = ['Rajesh Kumar', 'Sneha Patel', 'Admin User'];

    for (let i = 0; i < 50; i++) {
      logs.push({
        id: `log_${i + 1}`,
        user: users[Math.floor(Math.random() * users.length)],
        action: actions[Math.floor(Math.random() * actions.length)],
        details: 'Sample activity details',
        timestamp: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
        ip: '192.168.1.100'
      });
    }

    return logs;
  },

  getKeywordsBySector(sectorId) {
    const keywords = {
      tech: ['JavaScript', 'React', 'Node.js', 'Python', 'Java', 'AWS', 'Docker', 'MongoDB'],
      healthcare: ['Patient Care', 'Medical Records', 'Clinical', 'Nursing', 'Emergency Care'],
      finance: ['Accounting', 'Financial Analysis', 'Excel', 'SAP', 'Audit', 'Taxation'],
      education: ['Teaching', 'Curriculum', 'Student Management', 'Training', 'Assessment'],
      retail: ['Sales', 'Customer Service', 'Inventory', 'POS', 'Merchandising'],
      manufacturing: ['Production', 'Quality Control', 'Lean Manufacturing', 'Safety', 'Machinery']
    };

    return keywords[sectorId] || ['General', 'Communication', 'Teamwork', 'Problem Solving'];
  }
};