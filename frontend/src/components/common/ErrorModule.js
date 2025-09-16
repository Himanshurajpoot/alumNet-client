import React, { createContext, useContext, useReducer, useCallback } from 'react';
import errorLogger from '../../utils/errorLogger';

// Error types
export const ERROR_TYPES = {
  NETWORK: 'network',
  VALIDATION: 'validation',
  AUTH: 'auth',
  PERMISSION: 'permission',
  NOT_FOUND: 'not_found',
  SERVER: 'server',
  CLIENT: 'client',
  UNKNOWN: 'unknown'
};

// Error severity levels
export const ERROR_SEVERITY = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  CRITICAL: 'critical'
};

// Initial state
const initialState = {
  errors: [],
  isErrorModalOpen: false,
  currentError: null,
  errorHistory: [],
  settings: {
    autoHide: true,
    autoHideDelay: 5000,
    maxErrors: 10,
    showErrorModal: true,
    logErrors: true
  }
};

// Action types
const ERROR_ACTIONS = {
  ADD_ERROR: 'ADD_ERROR',
  REMOVE_ERROR: 'REMOVE_ERROR',
  CLEAR_ERRORS: 'CLEAR_ERRORS',
  SET_ERROR_MODAL: 'SET_ERROR_MODAL',
  SET_CURRENT_ERROR: 'SET_CURRENT_ERROR',
  UPDATE_SETTINGS: 'UPDATE_SETTINGS',
  ADD_TO_HISTORY: 'ADD_TO_HISTORY',
  CLEAR_HISTORY: 'CLEAR_HISTORY'
};

// Reducer
const errorReducer = (state, action) => {
  switch (action.type) {
    case ERROR_ACTIONS.ADD_ERROR:
      const newError = {
        id: Date.now() + Math.random(),
        timestamp: new Date().toISOString(),
        ...action.payload
      };
      
      const updatedErrors = [newError, ...state.errors].slice(0, state.settings.maxErrors);
      
      return {
        ...state,
        errors: updatedErrors,
        currentError: newError,
        isErrorModalOpen: state.settings.showErrorModal
      };

    case ERROR_ACTIONS.REMOVE_ERROR:
      return {
        ...state,
        errors: state.errors.filter(error => error.id !== action.payload),
        currentError: state.currentError?.id === action.payload ? null : state.currentError
      };

    case ERROR_ACTIONS.CLEAR_ERRORS:
      return {
        ...state,
        errors: [],
        currentError: null,
        isErrorModalOpen: false
      };

    case ERROR_ACTIONS.SET_ERROR_MODAL:
      return {
        ...state,
        isErrorModalOpen: action.payload
      };

    case ERROR_ACTIONS.SET_CURRENT_ERROR:
      return {
        ...state,
        currentError: action.payload,
        isErrorModalOpen: !!action.payload
      };

    case ERROR_ACTIONS.UPDATE_SETTINGS:
      return {
        ...state,
        settings: { ...state.settings, ...action.payload }
      };

    case ERROR_ACTIONS.ADD_TO_HISTORY:
      return {
        ...state,
        errorHistory: [action.payload, ...state.errorHistory].slice(0, 50)
      };

    case ERROR_ACTIONS.CLEAR_HISTORY:
      return {
        ...state,
        errorHistory: []
      };

    default:
      return state;
  }
};

// Context
const ErrorContext = createContext();

// Error Module Provider
export const ErrorModuleProvider = ({ children }) => {
  const [state, dispatch] = useReducer(errorReducer, initialState);

  // Add error
  const addError = useCallback((errorData) => {
    const error = {
      type: ERROR_TYPES.UNKNOWN,
      severity: ERROR_SEVERITY.MEDIUM,
      title: 'An error occurred',
      message: 'Something went wrong',
      details: null,
      actions: [],
      autoHide: true,
      ...errorData
    };

    dispatch({ type: ERROR_ACTIONS.ADD_ERROR, payload: error });

    // Log error if enabled
    if (state.settings.logErrors) {
      errorLogger.log(
        new Error(error.message),
        { componentStack: error.details },
        {
          errorType: error.type,
          severity: error.severity,
          title: error.title,
          context: error.context || {}
        }
      );
    }

    // Add to history
    dispatch({ type: ERROR_ACTIONS.ADD_TO_HISTORY, payload: error });

    // Auto hide if enabled
    if (error.autoHide && state.settings.autoHide) {
      setTimeout(() => {
        removeError(error.id);
      }, state.settings.autoHideDelay);
    }
  }, [state.settings]);

  // Remove error
  const removeError = useCallback((errorId) => {
    dispatch({ type: ERROR_ACTIONS.REMOVE_ERROR, payload: errorId });
  }, []);

  // Clear all errors
  const clearErrors = useCallback(() => {
    dispatch({ type: ERROR_ACTIONS.CLEAR_ERRORS });
  }, []);

  // Set error modal visibility
  const setErrorModal = useCallback((isOpen) => {
    dispatch({ type: ERROR_ACTIONS.SET_ERROR_MODAL, payload: isOpen });
  }, []);

  // Set current error
  const setCurrentError = useCallback((error) => {
    dispatch({ type: ERROR_ACTIONS.SET_CURRENT_ERROR, payload: error });
  }, []);

  // Update settings
  const updateSettings = useCallback((newSettings) => {
    dispatch({ type: ERROR_ACTIONS.UPDATE_SETTINGS, payload: newSettings });
  }, []);

  // Clear error history
  const clearHistory = useCallback(() => {
    dispatch({ type: ERROR_ACTIONS.CLEAR_HISTORY });
  }, []);

  // Helper methods for common error types
  const addNetworkError = useCallback((message, details = null) => {
    addError({
      type: ERROR_TYPES.NETWORK,
      severity: ERROR_SEVERITY.HIGH,
      title: 'Network Error',
      message,
      details,
      actions: [
        { label: 'Retry', action: 'retry' },
        { label: 'Go Offline', action: 'offline' }
      ]
    });
  }, [addError]);

  const addValidationError = useCallback((message, field = null) => {
    addError({
      type: ERROR_TYPES.VALIDATION,
      severity: ERROR_SEVERITY.MEDIUM,
      title: 'Validation Error',
      message,
      details: field ? { field } : null,
      actions: [
        { label: 'Fix', action: 'fix' }
      ]
    });
  }, [addError]);

  const addAuthError = useCallback((message) => {
    addError({
      type: ERROR_TYPES.AUTH,
      severity: ERROR_SEVERITY.HIGH,
      title: 'Authentication Error',
      message,
      actions: [
        { label: 'Login', action: 'login' },
        { label: 'Register', action: 'register' }
      ]
    });
  }, [addError]);

  const addPermissionError = useCallback((message) => {
    addError({
      type: ERROR_TYPES.PERMISSION,
      severity: ERROR_SEVERITY.MEDIUM,
      title: 'Permission Denied',
      message,
      actions: [
        { label: 'Request Access', action: 'request_access' }
      ]
    });
  }, [addError]);

  const addNotFoundError = useCallback((message, resource = null) => {
    addError({
      type: ERROR_TYPES.NOT_FOUND,
      severity: ERROR_SEVERITY.MEDIUM,
      title: 'Not Found',
      message,
      details: resource ? { resource } : null,
      actions: [
        { label: 'Go Home', action: 'go_home' },
        { label: 'Search', action: 'search' }
      ]
    });
  }, [addError]);

  const addServerError = useCallback((message, statusCode = null) => {
    addError({
      type: ERROR_TYPES.SERVER,
      severity: ERROR_SEVERITY.HIGH,
      title: 'Server Error',
      message,
      details: statusCode ? { statusCode } : null,
      actions: [
        { label: 'Retry', action: 'retry' },
        { label: 'Report', action: 'report' }
      ]
    });
  }, [addError]);

  const value = {
    // State
    errors: state.errors,
    isErrorModalOpen: state.isErrorModalOpen,
    currentError: state.currentError,
    errorHistory: state.errorHistory,
    settings: state.settings,

    // Actions
    addError,
    removeError,
    clearErrors,
    setErrorModal,
    setCurrentError,
    updateSettings,
    clearHistory,

    // Helper methods
    addNetworkError,
    addValidationError,
    addAuthError,
    addPermissionError,
    addNotFoundError,
    addServerError
  };

  return (
    <ErrorContext.Provider value={value}>
      {children}
      <ErrorModuleUI />
    </ErrorContext.Provider>
  );
};

// Hook to use error module
export const useErrorModule = () => {
  const context = useContext(ErrorContext);
  if (!context) {
    throw new Error('useErrorModule must be used within an ErrorModuleProvider');
  }
  return context;
};

// Error Module UI Component
const ErrorModuleUI = () => {
  const { errors, isErrorModalOpen, currentError, setErrorModal, removeError } = useErrorModule();

  if (!isErrorModalOpen || !currentError) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${
                currentError.severity === ERROR_SEVERITY.CRITICAL ? 'bg-red-500' :
                currentError.severity === ERROR_SEVERITY.HIGH ? 'bg-orange-500' :
                currentError.severity === ERROR_SEVERITY.MEDIUM ? 'bg-yellow-500' :
                'bg-blue-500'
              }`} />
              <h3 className="text-lg font-semibold text-gray-900">
                {currentError.title}
              </h3>
            </div>
            <button
              onClick={() => setErrorModal(false)}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Message */}
          <p className="text-gray-700 mb-4">
            {currentError.message}
          </p>

          {/* Details */}
          {currentError.details && (
            <div className="bg-gray-50 rounded p-3 mb-4">
              <h4 className="text-sm font-medium text-gray-600 mb-2">Details:</h4>
              <pre className="text-xs text-gray-700 whitespace-pre-wrap">
                {typeof currentError.details === 'string' 
                  ? currentError.details 
                  : JSON.stringify(currentError.details, null, 2)
                }
              </pre>
            </div>
          )}

          {/* Actions */}
          {currentError.actions && currentError.actions.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {currentError.actions.map((action, index) => (
                <button
                  key={index}
                  onClick={() => {
                    // Handle action based on action.action
                    console.log('Action clicked:', action.action);
                    removeError(currentError.id);
                  }}
                  className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
                >
                  {action.label}
                </button>
              ))}
            </div>
          )}

          {/* Footer */}
          <div className="flex justify-between items-center pt-4 border-t border-gray-200">
            <button
              onClick={() => removeError(currentError.id)}
              className="text-gray-500 hover:text-gray-700 text-sm transition-colors"
            >
              Dismiss
            </button>
            <div className="text-xs text-gray-400">
              {new Date(currentError.timestamp).toLocaleString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorModuleProvider;
