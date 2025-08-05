import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Volume2 } from 'lucide-react';

const VoiceCommandIndicator = ({ isListening, onToggle, lastCommand }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [pulseAnimation, setPulseAnimation] = useState(false);

  useEffect(() => {
    if (isListening) {
      setIsVisible(true);
      setPulseAnimation(true);
    } else {
      setPulseAnimation(false);
      // Keep visible for a moment after stopping
      const timer = setTimeout(() => setIsVisible(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [isListening]);

  useEffect(() => {
    if (lastCommand) {
      // Show feedback when command is recognized
      setIsVisible(true);
      const timer = setTimeout(() => {
        if (!isListening) setIsVisible(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [lastCommand, isListening]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="bg-white rounded-2xl shadow-2xl border border-aps-gray-200 p-4 max-w-sm">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${isListening ? 'bg-green-500' : 'bg-gray-400'}`}></div>
            <span className="text-sm font-medium text-aps-dark">
              {isListening ? 'Listening...' : 'Voice Commands'}
            </span>
          </div>
          
          <button
            onClick={onToggle}
            className={`p-2 rounded-lg transition-colors ${
              isListening 
                ? 'bg-red-100 text-red-600 hover:bg-red-200' 
                : 'bg-aps-primary bg-opacity-10 text-aps-primary hover:bg-opacity-20'
            }`}
          >
            {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </button>
        </div>

        {/* Microphone Visualization */}
        {isListening && (
          <div className="flex items-center justify-center mb-4">
            <div className={`w-16 h-16 rounded-full bg-aps-primary bg-opacity-20 flex items-center justify-center ${pulseAnimation ? 'animate-pulse' : ''}`}>
              <div className="w-12 h-12 rounded-full bg-aps-primary bg-opacity-40 flex items-center justify-center">
                <Mic className="w-6 h-6 text-aps-primary" />
              </div>
            </div>
          </div>
        )}

        {/* Last Command */}
        {lastCommand && (
          <div className="mb-4 p-3 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-center space-x-2 mb-1">
              <Volume2 className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-green-800">Command Recognized</span>
            </div>
            <p className="text-sm text-green-700">"{lastCommand}"</p>
          </div>
        )}

        {/* Available Commands */}
        <div className="space-y-2">
          <h4 className="text-xs font-semibold text-aps-gray-600 uppercase tracking-wide">
            Try saying:
          </h4>
          <div className="space-y-1 text-xs text-aps-gray-500">
            <div>"Show rejected resumes"</div>
            <div>"Upload new resume"</div>
            <div>"Generate report"</div>
            <div>"Search candidates"</div>
            <div>"Go to dashboard"</div>
          </div>
        </div>

        {/* Status Indicator */}
        <div className="mt-4 pt-3 border-t border-gray-200">
          <div className="flex items-center justify-between text-xs">
            <span className="text-aps-gray-500">
              {isListening ? 'Speak now...' : 'Click mic to start'}
            </span>
            <div className="flex items-center space-x-1">
              <div className={`w-2 h-2 rounded-full ${isListening ? 'bg-green-500' : 'bg-gray-400'}`}></div>
              <span className="text-aps-gray-400">
                {isListening ? 'Active' : 'Inactive'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoiceCommandIndicator;