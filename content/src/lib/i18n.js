// Internationalization setup
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // Common
      loading: 'Loading...',
      error: 'Error',
      success: 'Success',
      cancel: 'Cancel',
      save: 'Save',
      delete: 'Delete',
      edit: 'Edit',
      view: 'View',
      search: 'Search',
      filter: 'Filter',
      
      // Navigation
      dashboard: 'Dashboard',
      settings: 'Settings',
      logout: 'Logout',
      
      // Candidate
      jobs: 'Jobs',
      apply: 'Apply',
      applyNow: 'Apply Now',
      salary: 'Salary',
      experience: 'Experience',
      location: 'Location',
      
      // HR
      uploadResume: 'Upload Resume',
      searchResumes: 'Search Resumes',
      reports: 'Reports',
      analytics: 'Analytics',
      
      // Admin
      controlPanel: 'Control Panel',
      userManagement: 'User Management',
      systemSettings: 'System Settings',
      insights: 'Insights'
    }
  },
  hi: {
    translation: {
      // Common
      loading: 'लोड हो रहा है...',
      error: 'त्रुटि',
      success: 'सफल',
      cancel: 'रद्द करें',
      save: 'सेव करें',
      delete: 'हटाएं',
      edit: 'संपादित करें',
      view: 'देखें',
      search: 'खोजें',
      filter: 'फिल्टर',
      
      // Navigation
      dashboard: 'डैशबोर्ड',
      settings: 'सेटिंग्स',
      logout: 'लॉगआउट',
      
      // Candidate
      jobs: 'नौकरियां',
      apply: 'आवेदन करें',
      applyNow: 'अभी आवेदन करें',
      salary: 'वेतन',
      experience: 'अनुभव',
      location: 'स्थान'
    }
  }
};

export const initializeI18n = () => {
  i18n
    .use(initReactI18next)
    .init({
      resources,
      lng: 'en', // default language
      fallbackLng: 'en',
      
      interpolation: {
        escapeValue: false
      },
      
      detection: {
        order: ['localStorage', 'navigator', 'htmlTag'],
        caches: ['localStorage']
      }
    });
};

export default i18n;