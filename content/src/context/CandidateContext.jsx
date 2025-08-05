import React, { createContext, useContext, useState, useEffect } from 'react';
import { candidateAPI } from '../lib/mockAPI.js';

const CandidateContext = createContext(null);

export const useCandidate = () => {
  const context = useContext(CandidateContext);
  if (!context) {
    throw new Error('useCandidate must be used within a CandidateProvider');
  }
  return context;
};

export const CandidateProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);
  const [sectors, setSectors] = useState([]);
  const [designations, setDesignations] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      setLoading(true);
      const [jobsData, sectorsData] = await Promise.all([
        candidateAPI.getJobs(),
        candidateAPI.getSectors()
      ]);
      
      setJobs(jobsData);
      setSectors(sectorsData);
      
      // Load applied jobs from localStorage
      const stored = localStorage.getItem('aps_applied_jobs');
      if (stored) {
        setAppliedJobs(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Failed to load candidate data:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyToJob = async (jobId, candidateData) => {
    try {
      setLoading(true);
      const response = await candidateAPI.applyToJob(jobId, candidateData);
      
      if (response.success) {
        const newApplication = {
          jobId,
          applicationId: response.applicationId,
          appliedAt: new Date().toISOString(),
          status: 'pending'
        };
        
        const updatedApplied = [...appliedJobs, newApplication];
        setAppliedJobs(updatedApplied);
        localStorage.setItem('aps_applied_jobs', JSON.stringify(updatedApplied));
        
        return { success: true, applicationId: response.applicationId };
      }
      
      return { success: false, error: response.error };
    } catch (error) {
      return { success: false, error: 'Application failed. Please try again.' };
    } finally {
      setLoading(false);
    }
  };

  const getDesignationsBySector = async (sectorId) => {
    try {
      const designationsData = await candidateAPI.getDesignationsBySector(sectorId);
      return designationsData;
    } catch (error) {
      console.error('Failed to load designations:', error);
      return [];
    }
  };

  const searchJobs = async (filters) => {
    try {
      setLoading(true);
      const results = await candidateAPI.searchJobs(filters);
      setJobs(results);
      return results;
    } catch (error) {
      console.error('Job search failed:', error);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const value = {
    jobs,
    sectors,
    designations,
    appliedJobs,
    loading,
    applyToJob,
    getDesignationsBySector,
    searchJobs,
    refreshJobs: loadInitialData
  };

  return (
    <CandidateContext.Provider value={value}>
      {children}
    </CandidateContext.Provider>
  );
};