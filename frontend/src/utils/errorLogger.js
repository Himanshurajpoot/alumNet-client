// Error logging utility
class ErrorLogger {
  constructor() {
    this.logs = [];
    this.maxLogs = 100; // Keep only last 100 errors
  }

  log(error, errorInfo = null, context = {}) {
    const errorLog = {
      id: Date.now() + Math.random(),
      timestamp: new Date().toISOString(),
      message: error.message || 'Unknown error',
      stack: error.stack,
      componentStack: errorInfo?.componentStack,
      url: window.location.href,
      userAgent: navigator.userAgent,
      userId: context.userId || null,
      sessionId: context.sessionId || this.getSessionId(),
      context: context
    };

    // Add to logs array
    this.logs.unshift(errorLog);
    
    // Keep only recent logs
    if (this.logs.length > this.maxLogs) {
      this.logs = this.logs.slice(0, this.maxLogs);
    }

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.group('🚨 Error Logged');
      console.error('Error:', error);
      console.error('Error Info:', errorInfo);
      console.error('Context:', context);
      console.error('Full Log:', errorLog);
      console.groupEnd();
    }

    // Send to external service in production
    if (process.env.NODE_ENV === 'production') {
      this.sendToExternalService(errorLog);
    }

    // Store in localStorage for debugging
    this.storeInLocalStorage();
  }

  getSessionId() {
    let sessionId = sessionStorage.getItem('errorSessionId');
    if (!sessionId) {
      sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      sessionStorage.setItem('errorSessionId', sessionId);
    }
    return sessionId;
  }

  sendToExternalService(errorLog) {
    // Example: Send to your logging service
    // You can integrate with services like:
    // - Sentry
    // - LogRocket
    // - Bugsnag
    // - Custom API endpoint

    fetch('/api/log-error', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(errorLog)
    }).catch(err => {
      console.error('Failed to send error log:', err);
    });
  }

  storeInLocalStorage() {
    try {
      localStorage.setItem('errorLogs', JSON.stringify(this.logs.slice(0, 10))); // Store only last 10
    } catch (err) {
      console.error('Failed to store error logs:', err);
    }
  }

  getLogs() {
    return this.logs;
  }

  clearLogs() {
    this.logs = [];
    localStorage.removeItem('errorLogs');
  }

  getLogsFromStorage() {
    try {
      const stored = localStorage.getItem('errorLogs');
      return stored ? JSON.parse(stored) : [];
    } catch (err) {
      console.error('Failed to retrieve error logs:', err);
      return [];
    }
  }
}

// Create singleton instance
const errorLogger = new ErrorLogger();

export default errorLogger;
