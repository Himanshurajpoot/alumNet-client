import React, { useState } from 'react';
import { useErrorModule } from './ErrorModule';

const ErrorHistory = () => {
  const { errorHistory, clearHistory } = useErrorModule();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedError, setSelectedError] = useState(null);

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical':
        return 'text-red-600 bg-red-50';
      case 'high':
        return 'text-orange-600 bg-orange-50';
      case 'medium':
        return 'text-yellow-600 bg-yellow-50';
      case 'low':
        return 'text-blue-600 bg-blue-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'network':
        return 'text-purple-600 bg-purple-50';
      case 'validation':
        return 'text-yellow-600 bg-yellow-50';
      case 'auth':
        return 'text-red-600 bg-red-50';
      case 'permission':
        return 'text-orange-600 bg-orange-50';
      case 'not_found':
        return 'text-gray-600 bg-gray-50';
      case 'server':
        return 'text-red-600 bg-red-50';
      case 'client':
        return 'text-blue-600 bg-blue-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 left-4 bg-gray-800 text-white p-3 rounded-full shadow-lg hover:bg-gray-700 transition-colors z-40"
        title="View Error History"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        {errorHistory.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {errorHistory.length}
          </span>
        )}
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            Error History ({errorHistory.length})
          </h2>
          <div className="flex items-center gap-2">
            <button
              onClick={clearHistory}
              className="px-3 py-1 text-sm text-red-600 hover:text-red-800 transition-colors"
            >
              Clear History
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex h-96">
          {/* Error List */}
          <div className="w-1/2 border-r border-gray-200 overflow-y-auto">
            {errorHistory.length === 0 ? (
              <div className="p-6 text-center text-gray-500">
                <svg className="w-12 h-12 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p>No errors in history</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {errorHistory.map((error) => (
                  <div
                    key={error.id}
                    onClick={() => setSelectedError(error)}
                    className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                      selectedError?.id === error.id ? 'bg-blue-50 border-r-2 border-blue-500' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {error.title}
                        </p>
                        <p className="text-sm text-gray-500 truncate">
                          {error.message}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className={`px-2 py-1 text-xs rounded-full ${getSeverityColor(error.severity)}`}>
                            {error.severity}
                          </span>
                          <span className={`px-2 py-1 text-xs rounded-full ${getTypeColor(error.type)}`}>
                            {error.type}
                          </span>
                        </div>
                      </div>
                      <div className="text-xs text-gray-400 ml-2">
                        {formatTimestamp(error.timestamp)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Error Details */}
          <div className="w-1/2 p-6 overflow-y-auto">
            {selectedError ? (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {selectedError.title}
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Message</h4>
                    <p className="text-sm text-gray-600">{selectedError.message}</p>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Details</h4>
                    <div className="bg-gray-50 rounded p-3">
                      <pre className="text-xs text-gray-700 whitespace-pre-wrap">
                        {selectedError.details ? 
                          (typeof selectedError.details === 'string' 
                            ? selectedError.details 
                            : JSON.stringify(selectedError.details, null, 2)
                          ) : 
                          'No details available'
                        }
                      </pre>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Severity</h4>
                      <span className={`px-2 py-1 text-xs rounded-full ${getSeverityColor(selectedError.severity)}`}>
                        {selectedError.severity}
                      </span>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Type</h4>
                      <span className={`px-2 py-1 text-xs rounded-full ${getTypeColor(selectedError.type)}`}>
                        {selectedError.type}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Timestamp</h4>
                    <p className="text-sm text-gray-600">{formatTimestamp(selectedError.timestamp)}</p>
                  </div>

                  {selectedError.actions && selectedError.actions.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Available Actions</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedError.actions.map((action, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded"
                          >
                            {action.label}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                <div className="text-center">
                  <svg className="w-12 h-12 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <p>Select an error to view details</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorHistory;
