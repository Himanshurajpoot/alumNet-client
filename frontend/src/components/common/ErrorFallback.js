import React, { useState } from 'react';

function ErrorFallback({ error, errorInfo, onRetry }) {
  const [showDetails, setShowDetails] = useState(false);

  const handleReload = () => {
    window.location.reload();
  };

  const handleGoHome = () => {
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          {/* Error Icon */}
          <div className="mx-auto h-24 w-24 text-red-500 mb-6">
            <svg
              className="h-full w-full"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>

          {/* Error Message */}
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Oops! Something went wrong
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            We're sorry, but something unexpected happened. Don't worry, our team has been notified.
          </p>

          {/* Action Buttons */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={onRetry}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Try Again
              </button>
              
              <button
                onClick={handleReload}
                className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Reload Page
              </button>
            </div>

            <button
              onClick={handleGoHome}
              className="text-blue-600 hover:text-blue-800 font-medium transition duration-200"
            >
              ← Go back to home
            </button>
          </div>

          {/* Error Details Toggle */}
          <div className="mt-8">
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="text-sm text-gray-500 hover:text-gray-700 transition duration-200 flex items-center gap-1 mx-auto"
            >
              {showDetails ? 'Hide' : 'Show'} technical details
              <svg 
                className={`w-4 h-4 transition-transform duration-200 ${showDetails ? 'rotate-180' : ''}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Error Details */}
            {showDetails && (
              <div className="mt-4 p-4 bg-gray-100 rounded-lg text-left">
                <h3 className="font-semibold text-gray-900 mb-2">Error Details:</h3>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">Message:</span>
                    <pre className="text-red-600 mt-1 whitespace-pre-wrap break-words">
                      {error?.message || 'Unknown error'}
                    </pre>
                  </div>
                  
                  {error?.stack && (
                    <div>
                      <span className="font-medium text-gray-700">Stack Trace:</span>
                      <pre className="text-gray-600 mt-1 text-xs whitespace-pre-wrap break-words max-h-32 overflow-y-auto">
                        {error.stack}
                      </pre>
                    </div>
                  )}

                  {errorInfo?.componentStack && (
                    <div>
                      <span className="font-medium text-gray-700">Component Stack:</span>
                      <pre className="text-gray-600 mt-1 text-xs whitespace-pre-wrap break-words max-h-32 overflow-y-auto">
                        {errorInfo.componentStack}
                      </pre>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Help Text */}
          <div className="mt-8 text-sm text-gray-500">
            <p>
              If this problem persists, please contact support with the error details above.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ErrorFallback;
