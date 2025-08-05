import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import AppRoutes from './routes/AppRoutes.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { CandidateProvider } from './context/CandidateContext.jsx';
import { HRProvider } from './context/HRContext.jsx';
import { AdminProvider } from './context/AdminContext.jsx';
import { initializeSentry } from './lib/sentry.js';
import { initializeI18n } from './lib/i18n.js';
import ParticleBackground from './components/Common/ParticleBackground.jsx';
import VoiceCommandHandler from './components/Common/VoiceCommandHandler.jsx';
import KeyboardShortcuts from './components/Common/KeyboardShortcuts.jsx';
import './styles/theme.css';

// Initialize external services
initializeSentry();
initializeI18n();

function App() {
  useEffect(() => {
    // Set dynamic gradient background based on time of day
    const setTimeBasedGradient = () => {
      const hour = new Date().getHours();
      const body = document.body;
      
      if (hour >= 6 && hour < 12) {
        body.className = 'morning-gradient';
      } else if (hour >= 12 && hour < 18) {
        body.className = 'afternoon-gradient';
      } else if (hour >= 18 && hour < 22) {
        body.className = 'evening-gradient';
      } else {
        body.className = 'night-gradient';
      }
    };

    setTimeBasedGradient();
    const interval = setInterval(setTimeBasedGradient, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  return (
    <BrowserRouter>
      <AuthProvider>
        <CandidateProvider>
          <HRProvider>
            <AdminProvider>
              <div className="relative min-h-screen">
                <ParticleBackground />
                <AnimatePresence mode="wait">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <AppRoutes />
                  </motion.div>
                </AnimatePresence>
                <VoiceCommandHandler />
                <KeyboardShortcuts />
              </div>
            </AdminProvider>
          </HRProvider>
        </CandidateProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;