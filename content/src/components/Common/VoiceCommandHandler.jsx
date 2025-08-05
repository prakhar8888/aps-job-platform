import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Volume2 } from 'lucide-react';

const VoiceCommandHandler = () => {
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [transcript, setTranscript] = useState('');

  useEffect(() => {
    // Check if speech recognition is supported
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      setIsSupported(true);
    }
  }, []);

  const startListening = () => {
    if (!isSupported) return;

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      const current = event.resultIndex;
      const transcript = event.results[current][0].transcript;
      setTranscript(transcript);
      
      // Process voice commands
      processVoiceCommand(transcript.toLowerCase());
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const stopListening = () => {
    setIsListening(false);
    setTranscript('');
  };

  const processVoiceCommand = (command) => {
    // Basic voice command processing
    if (command.includes('show rejected resumes')) {
      // Navigate to rejected resumes
      window.location.href = '/hr/search?status=rejected';
    } else if (command.includes('upload resume')) {
      window.location.href = '/hr/upload';
    } else if (command.includes('dashboard')) {
      window.location.href = '/hr';
    } else if (command.includes('settings')) {
      window.location.href = '/hr/settings';
    }
  };

  if (!isSupported) return null;

  return (
    <>
      {/* Voice Command Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={isListening ? stopListening : startListening}
        className={`fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-lg transition-all duration-300 z-50 ${
          isListening 
            ? 'bg-red-500 hover:bg-red-600' 
            : 'bg-aps-primary hover:bg-aps-secondary'
        }`}
      >
        {isListening ? (
          <MicOff className="w-6 h-6 text-white mx-auto" />
        ) : (
          <Mic className="w-6 h-6 text-white mx-auto" />
        )}
      </motion.button>

      {/* Voice Command Indicator */}
      <AnimatePresence>
        {isListening && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-24 right-6 bg-white rounded-lg shadow-lg p-4 z-50 max-w-sm"
          >
            <div className="flex items-center space-x-2 mb-2">
              <Volume2 className="w-4 h-4 text-aps-primary" />
              <span className="text-sm font-medium text-aps-dark">Listening...</span>
            </div>
            
            <div className="text-sm text-aps-gray-600 min-h-[20px]">
              {transcript || 'Say something...'}
            </div>
            
            <div className="mt-2 text-xs text-aps-gray-500">
              Try: "Show rejected resumes", "Upload resume", "Dashboard"
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default VoiceCommandHandler;