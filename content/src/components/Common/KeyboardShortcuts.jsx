import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { Keyboard, X } from 'lucide-react';

const KeyboardShortcuts = () => {
  const [showShortcuts, setShowShortcuts] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const shortcuts = [
    { key: 'Ctrl + K', description: 'Open search', action: () => console.log('Search') },
    { key: 'Ctrl + H', description: 'Go to home', action: () => navigate('/') },
    { key: 'Ctrl + U', description: 'Upload resume (HR)', action: () => navigate('/hr/upload') },
    { key: 'Ctrl + D', description: 'Dashboard', action: () => navigate('/hr') },
    { key: 'Ctrl + S', description: 'Settings', action: () => navigate('/hr/settings') },
    { key: '?', description: 'Show shortcuts', action: () => setShowShortcuts(true) },
    { key: 'Esc', description: 'Close dialogs', action: () => setShowShortcuts(false) }
  ];

  useEffect(() => {
    const handleKeyDown = (event) => {
      // Don't trigger shortcuts when typing in inputs
      if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
        return;
      }

      const { ctrlKey, key } = event;

      if (ctrlKey && key === 'k') {
        event.preventDefault();
        // Trigger search functionality
        const searchInput = document.querySelector('input[type="search"]');
        if (searchInput) searchInput.focus();
      }

      if (ctrlKey && key === 'h') {
        event.preventDefault();
        navigate('/');
      }

      if (ctrlKey && key === 'u' && location.pathname.includes('/hr')) {
        event.preventDefault();
        navigate('/hr/upload');
      }

      if (ctrlKey && key === 'd' && location.pathname.includes('/hr')) {
        event.preventDefault();
        navigate('/hr');
      }

      if (ctrlKey && key === 's') {
        event.preventDefault();
        if (location.pathname.includes('/hr')) {
          navigate('/hr/settings');
        } else if (location.pathname.includes('/admin')) {
          navigate('/admin/settings');
        }
      }

      if (key === '?' && !ctrlKey) {
        event.preventDefault();
        setShowShortcuts(true);
      }

      if (key === 'Escape') {
        setShowShortcuts(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate, location]);

  return (
    <>
      {/* Keyboard shortcut indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={() => setShowShortcuts(true)}
        className="fixed bottom-6 left-6 w-10 h-10 bg-aps-gray-700 hover:bg-aps-gray-600 text-white rounded-lg shadow-lg transition-all duration-300 z-50 hidden lg:flex items-center justify-center"
        title="Keyboard shortcuts (?)"
      >
        <Keyboard className="w-5 h-5" />
      </motion.button>

      {/* Shortcuts Modal */}
      <AnimatePresence>
        {showShortcuts && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setShowShortcuts(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-xl shadow-2xl p-6 max-w-md w-full"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-aps-dark">Keyboard Shortcuts</h2>
                <button
                  onClick={() => setShowShortcuts(false)}
                  className="p-1 rounded-lg hover:bg-aps-gray-100 transition-colors duration-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3">
                {shortcuts.map((shortcut, index) => (
                  <motion.div
                    key={shortcut.key}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center justify-between p-3 bg-aps-gray-50 rounded-lg"
                  >
                    <span className="text-sm text-aps-gray-700">{shortcut.description}</span>
                    <kbd className="px-2 py-1 bg-white border border-aps-gray-300 rounded text-xs font-mono text-aps-gray-600">
                      {shortcut.key}
                    </kbd>
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-aps-gray-200 text-center">
                <p className="text-xs text-aps-gray-500">
                  Press <kbd className="px-1 py-0.5 bg-aps-gray-100 rounded text-xs">?</kbd> anytime to show shortcuts
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default KeyboardShortcuts;