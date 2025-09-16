import React, { useEffect, useState } from 'react';
import { useErrorModule, ERROR_SEVERITY } from './ErrorModule';

// Individual error toast component
const ErrorToast = ({ error, onRemove }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Animate in
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleRemove = () => {
    setIsExiting(true);
    setTimeout(() => {
      onRemove(error.id);
    }, 300);
  };

  const getSeverityStyles = (severity) => {
    switch (severity) {
      case ERROR_SEVERITY.CRITICAL:
        return {
          bg: 'bg-red-500',
          text: 'text-white',
          icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z'
        };
      case ERROR_SEVERITY.HIGH:
        return {
          bg: 'bg-orange-500',
          text: 'text-white',
          icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z'
        };
      case ERROR_SEVERITY.MEDIUM:
        return {
          bg: 'bg-yellow-500',
          text: 'text-white',
          icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z'
        };
      case ERROR_SEVERITY.LOW:
        return {
          bg: 'bg-blue-500',
          text: 'text-white',
          icon: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
        };
      default:
        return {
          bg: 'bg-gray-500',
          text: 'text-white',
          icon: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
        };
    }
  };

  const styles = getSeverityStyles(error.severity);

  return (
    <div
      className={`
        fixed top-4 right-4 max-w-sm w-full bg-white rounded-lg shadow-lg border-l-4 ${styles.bg}
        transform transition-all duration-300 ease-in-out z-50
        ${isVisible && !isExiting ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
        ${isExiting ? 'translate-x-full opacity-0' : ''}
      `}
    >
      <div className="p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <svg className={`h-5 w-5 ${styles.text}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={styles.icon} />
            </svg>
          </div>
          <div className="ml-3 w-0 flex-1">
            <p className={`text-sm font-medium ${styles.text}`}>
              {error.title}
            </p>
            <p className="mt-1 text-sm text-gray-600">
              {error.message}
            </p>
            {error.details && (
              <details className="mt-2">
                <summary className="text-xs text-gray-500 cursor-pointer hover:text-gray-700">
                  Show details
                </summary>
                <pre className="mt-1 text-xs text-gray-600 whitespace-pre-wrap">
                  {typeof error.details === 'string' 
                    ? error.details 
                    : JSON.stringify(error.details, null, 2)
                  }
                </pre>
              </details>
            )}
          </div>
          <div className="ml-4 flex-shrink-0 flex">
            <button
              onClick={handleRemove}
              className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span className="sr-only">Close</span>
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Error toast container
const ErrorToastContainer = () => {
  const { errors, removeError } = useErrorModule();

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {errors.map((error) => (
        <ErrorToast
          key={error.id}
          error={error}
          onRemove={removeError}
        />
      ))}
    </div>
  );
};

export default ErrorToastContainer;
