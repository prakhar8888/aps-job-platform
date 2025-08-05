import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff, Lock, Mail, Users, Shield } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth.js';
import { toast } from 'react-toastify';
import ParticleBackground from '../../components/Common/ParticleBackground.jsx';
import FormField from '../../components/Common/FormField.jsx';

const HRLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      const result = await login(data, 'hr');
      
      if (result.success) {
        toast.success('Login successful!');
        navigate('/hr');
      } else {
        toast.error(result.error || 'Login failed. Please check your credentials.');
      }
    } catch (error) {
      toast.error('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4">
      <ParticleBackground />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        {/* Login Card */}
        <div className="glassmorphism rounded-2xl p-8 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-aps-primary to-aps-secondary rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-aps-dark mb-2">HR Portal</h1>
            <p className="text-aps-gray-600">Access your HR dashboard</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              label="Email Address"
              type="email"
              icon={Mail}
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Invalid email format'
                }
              })}
              error={errors.email?.message}
              placeholder="Enter your email"
            />

            <div className="relative">
              <FormField
                label="Password"
                type={showPassword ? 'text' : 'password'}
                icon={Lock}
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters'
                  }
                })}
                error={errors.password?.message}
                placeholder="Enter your password"
              />
              <button
                type="button"
                className="absolute right-3 top-9 text-aps-gray-400 hover:text-aps-gray-600 transition-colors duration-200"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-gradient-primary py-4 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 transition-all duration-300"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="loader"></div>
                  <span>Signing In...</span>
                </div>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-aps-blue/10 rounded-lg border border-aps-blue/20">
            <p className="text-xs text-aps-gray-600 mb-2">Demo Credentials:</p>
            <p className="text-xs text-aps-gray-700">Email: hr@akshyapatra.com</p>
            <p className="text-xs text-aps-gray-700">Password: hr123456</p>
          </div>

          {/* Footer Links */}
          <div className="mt-8 text-center space-y-4">
            <Link
              to="/admin/login"
              className="flex items-center justify-center space-x-2 text-aps-primary hover:text-aps-secondary transition-colors duration-300"
            >
              <Shield className="w-4 h-4" />
              <span>Admin Login</span>
            </Link>
            
            <Link
              to="/candidate"
              className="block text-aps-gray-600 hover:text-aps-primary transition-colors duration-300"
            >
              ← Back to Jobs
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default HRLogin;