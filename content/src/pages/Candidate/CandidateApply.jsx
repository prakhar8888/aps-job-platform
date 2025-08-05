import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Upload, FileText, Check, AlertCircle, ArrowLeft } from 'lucide-react';
import { useCandidate } from '../../context/CandidateContext.jsx';
import { toast } from 'react-toastify';
import ResumeUploader from '../../components/Candidate/ResumeUploader.jsx';
import FormField from '../../components/Common/FormField.jsx';
import LoadingSpinner from '../../components/Common/LoadingSpinner.jsx';

const CandidateApply = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const { sectors, getDesignationsBySector, applyToJob, loading } = useCandidate();
  const [step, setStep] = useState(1);
  const [designations, setDesignations] = useState([]);
  const [cities] = useState([
    'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata', 
    'Pune', 'Ahmedabad', 'Jaipur', 'Lucknow', 'Kanpur', 'Nagpur'
  ]);
  const [areas, setAreas] = useState([]);
  const [parsedData, setParsedData] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      sector: '',
      designation: '',
      experience: '',
      city: '',
      area: '',
      currentSalary: '',
      expectedSalary: '',
      noticePeriod: '',
      skills: []
    }
  });

  const watchedSector = watch('sector');
  const watchedCity = watch('city');

  useEffect(() => {
    if (watchedSector) {
      loadDesignations(watchedSector);
    }
  }, [watchedSector]);

  useEffect(() => {
    if (watchedCity) {
      loadAreas(watchedCity);
    }
  }, [watchedCity]);

  const loadDesignations = async (sectorId) => {
    try {
      const designationsData = await getDesignationsBySector(sectorId);
      setDesignations(designationsData);
    } catch (error) {
      console.error('Failed to load designations:', error);
    }
  };

  const loadAreas = (city) => {
    // Mock areas based on city
    const cityAreas = {
      'Mumbai': ['Andheri', 'Bandra', 'Powai', 'Lower Parel', 'Goregaon', 'Thane'],
      'Delhi': ['Connaught Place', 'Gurgaon', 'Noida', 'Dwarka', 'Lajpat Nagar'],
      'Bangalore': ['Koramangala', 'Whitefield', 'Electronic City', 'HSR Layout', 'Indiranagar'],
      'Hyderabad': ['Hitech City', 'Gachibowli', 'Madhapur', 'Secunderabad', 'Jubilee Hills'],
      'Chennai': ['Anna Nagar', 'T. Nagar', 'Velachery', 'OMR', 'Adyar'],
      'Pune': ['Hinjewadi', 'Koregaon Park', 'Viman Nagar', 'Kharadi', 'Wakad']
    };
    setAreas(cityAreas[city] || []);
  };

  const handleResumeUpload = (file, extractedData) => {
    setParsedData(extractedData);
    if (extractedData) {
      // Auto-fill form with parsed data
      Object.keys(extractedData).forEach(key => {
        if (extractedData[key]) {
          setValue(key, extractedData[key]);
        }
      });
      setStep(2);
    }
  };

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      
      const applicationData = {
        ...data,
        resumeFile: parsedData?.resumeFile,
        appliedAt: new Date().toISOString()
      };

      const result = await applyToJob(jobId || 'general', applicationData);
      
      if (result.success) {
        toast.success('Application submitted successfully!');
        setStep(3);
      } else {
        toast.error(result.error || 'Application failed. Please try again.');
      }
    } catch (error) {
      toast.error('Application failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep1 = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white rounded-xl shadow-lg p-8"
    >
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-r from-aps-primary to-aps-secondary rounded-full flex items-center justify-center mx-auto mb-4">
          <Upload className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-aps-dark mb-2">Upload Your Resume</h2>
        <p className="text-aps-gray-600">
          Upload your resume and we'll automatically extract your information
        </p>
      </div>

      <ResumeUploader onUpload={handleResumeUpload} />

      <div className="mt-8 text-center">
        <button
          onClick={() => setStep(2)}
          className="text-aps-primary hover:text-aps-secondary transition-colors duration-300"
        >
          Skip and fill manually →
        </button>
      </div>
    </motion.div>
  );

  const renderStep2 = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white rounded-xl shadow-lg p-8"
    >
      <div className="flex items-center mb-8">
        <button
          onClick={() => setStep(1)}
          className="mr-4 p-2 rounded-lg hover:bg-aps-gray-100 transition-colors duration-300"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h2 className="text-2xl font-bold text-aps-dark">Application Details</h2>
          <p className="text-aps-gray-600">Please fill in your information</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
            {...register('email', { 
              required: 'Email is required',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Invalid email format'
              }
            })}
            error={errors.email?.message}
          />
          
          <FormField
            label="Phone Number"
            type="tel"
            {...register('phone', { required: 'Phone number is required' })}
            error={errors.phone?.message}
          />
          
          <FormField
            label="Experience (Years)"
            type="select"
            {...register('experience', { required: 'Experience is required' })}
            error={errors.experience?.message}
            options={[
              { value: '0-1', label: 'Fresher (0-1 years)' },
              { value: '1-3', label: '1-3 years' },
              { value: '3-5', label: '3-5 years' },
              { value: '5-10', label: '5-10 years' },
              { value: '10+', label: '10+ years' }
            ]}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            label="Sector"
            type="select"
            {...register('sector', { required: 'Sector is required' })}
            error={errors.sector?.message}
            options={sectors.map(sector => ({
              value: sector.id,
              label: sector.name
            }))}
          />
          
          <FormField
            label="Designation"
            type="select"
            {...register('designation', { required: 'Designation is required' })}
            error={errors.designation?.message}
            options={designations.map(designation => ({
              value: designation.id,
              label: designation.name
            }))}
            disabled={!watchedSector}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            label="City"
            type="select"
            {...register('city', { required: 'City is required' })}
            error={errors.city?.message}
            options={cities.map(city => ({
              value: city,
              label: city
            }))}
          />
          
          <FormField
            label="Area"
            type="select"
            {...register('area', { required: 'Area is required' })}
            error={errors.area?.message}
            options={areas.map(area => ({
              value: area,
              label: area
            }))}
            disabled={!watchedCity}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            label="Current Salary (LPA)"
            type="select"
            {...register('currentSalary')}
            options={[
              { value: '0-3', label: '0-3 LPA' },
              { value: '3-6', label: '3-6 LPA' },
              { value: '6-10', label: '6-10 LPA' },
              { value: '10-15', label: '10-15 LPA' },
              { value: '15+', label: '15+ LPA' }
            ]}
          />
          
          <FormField
            label="Expected Salary (LPA)"
            type="select"
            {...register('expectedSalary', { required: 'Expected salary is required' })}
            error={errors.expectedSalary?.message}
            options={[
              { value: '0-3', label: '0-3 LPA' },
              { value: '3-6', label: '3-6 LPA' },
              { value: '6-10', label: '6-10 LPA' },
              { value: '10-15', label: '10-15 LPA' },
              { value: '15+', label: '15+ LPA' }
            ]}
          />
        </div>

        <FormField
          label="Notice Period"
          type="select"
          {...register('noticePeriod', { required: 'Notice period is required' })}
          error={errors.noticePeriod?.message}
          options={[
            { value: 'immediate', label: 'Immediate' },
            { value: '15-days', label: '15 days' },
            { value: '1-month', label: '1 month' },
            { value: '2-months', label: '2 months' },
            { value: '3-months', label: '3 months' }
          ]}
        />

        <div className="flex items-center justify-between pt-6">
          <button
            type="button"
            onClick={() => setStep(1)}
            className="btn-secondary"
          >
            Previous
          </button>
          
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary flex items-center space-x-2"
          >
            {isSubmitting ? (
              <>
                <div className="loader"></div>
                <span>Submitting...</span>
              </>
            ) : (
              <>
                <Check className="w-4 h-4" />
                <span>Submit Application</span>
              </>
            )}
          </button>
        </div>
      </form>
    </motion.div>
  );

  const renderStep3 = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-xl shadow-lg p-8 text-center"
    >
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <Check className="w-10 h-10 text-green-600" />
      </div>
      
      <h2 className="text-2xl font-bold text-aps-dark mb-4">
        Application Submitted Successfully!
      </h2>
      
      <p className="text-aps-gray-600 mb-8">
        Thank you for your application. Our HR team will review your profile and get back to you within 24-48 hours.
      </p>
      
      <div className="flex items-center justify-center space-x-4">
        <button
          onClick={() => navigate('/candidate')}
          className="btn-primary"
        >
          View More Jobs
        </button>
        
        <button
          onClick={() => {
            setStep(1);
            setParsedData(null);
          }}
          className="btn-secondary"
        >
          Submit Another Application
        </button>
      </div>
    </motion.div>
  );

  if (loading) {
    return <LoadingSpinner message="Loading application form..." />;
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4 mb-4">
            {[1, 2, 3].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                  stepNumber <= step 
                    ? 'bg-aps-primary text-white' 
                    : 'bg-aps-gray-200 text-aps-gray-500'
                }`}>
                  {stepNumber < step ? <Check className="w-4 h-4" /> : stepNumber}
                </div>
                {stepNumber < 3 && (
                  <div className={`w-16 h-1 mx-2 transition-all duration-300 ${
                    stepNumber < step ? 'bg-aps-primary' : 'bg-aps-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <h1 className="text-3xl font-bold text-aps-dark mb-2">
              {step === 1 && 'Upload Resume'}
              {step === 2 && 'Application Form'}
              {step === 3 && 'Confirmation'}
            </h1>
            <p className="text-aps-gray-600">
              Step {step} of 3
            </p>
          </div>
        </div>

        {/* Step Content */}
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
      </div>
    </div>
  );
};

export default CandidateApply;