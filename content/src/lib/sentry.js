// Sentry integration for error tracking and monitoring

let Sentry;

export const initializeSentry = () => {
  // Only initialize in production or when explicitly enabled
  if (import.meta.env.PROD || import.meta.env.VITE_ENABLE_SENTRY === 'true') {
    try {
      // Dynamic import to avoid loading Sentry in development
      import('@sentry/react').then((SentryModule) => {
        Sentry = SentryModule;
        
        Sentry.init({
          dsn: import.meta.env.VITE_SENTRY_DSN,
          environment: import.meta.env.VITE_APP_ENV || 'development',
          beforeSend(event) {
            // Filter out non-critical errors in development
            if (import.meta.env.DEV && event.level === 'warning') {
              return null;
            }
            return event;
          },
          tracesSampleRate: 0.1,
        });
      });
    } catch (error) {
      console.warn('Sentry initialization failed:', error);
    }
  } else {
    // Mock Sentry for development
    Sentry = {
      captureException: (error) => console.error('Sentry Mock:', error),
      captureMessage: (message) => console.log('Sentry Mock:', message),
      addBreadcrumb: (breadcrumb) => console.log('Sentry Breadcrumb:', breadcrumb),
      setUser: (user) => console.log('Sentry User:', user),
      setContext: (context, data) => console.log('Sentry Context:', context, data)
    };
  }
};

export const logError = (error, context = {}) => {
  if (Sentry) {
    Sentry.captureException(error, {
      extra: context
    });
  }
  console.error('Application Error:', error, context);
};

export const logMessage = (message, level = 'info') => {
  if (Sentry) {
    Sentry.captureMessage(message, level);
  }
  console.log(`[${level.toUpperCase()}] ${message}`);
};

export const setUserContext = (user) => {
  if (Sentry) {
    Sentry.setUser({
      id: user.id,
      email: user.email,
      role: user.role
    });
  }
};

export const addBreadcrumb = (message, category = 'custom', level = 'info') => {
  if (Sentry) {
    Sentry.addBreadcrumb({
      message,
      category,
      level
    });
  }
};

export default Sentry;