import { useCallback } from 'react';
import { useErrorModule } from '../components/common/ErrorModule';

// Custom hook for error handling
export const useErrorHandler = () => {
  const {
    addError,
    addNetworkError,
    addValidationError,
    addAuthError,
    addPermissionError,
    addNotFoundError,
    addServerError,
    removeError,
    clearErrors
  } = useErrorModule();

  // Generic error handler
  const handleError = useCallback((error, context = {}) => {
    let errorData = {
      title: 'An error occurred',
      message: 'Something went wrong',
      severity: 'medium',
      type: 'unknown',
      ...context
    };

    // Handle different error types
    if (error instanceof Error) {
      errorData.message = error.message;
      errorData.details = error.stack;
    } else if (typeof error === 'string') {
      errorData.message = error;
    } else if (error && typeof error === 'object') {
      errorData = { ...errorData, ...error };
    }

    addError(errorData);
  }, [addError]);

  // Network error handler
  const handleNetworkError = useCallback((error, context = {}) => {
    const message = error?.message || 'Network connection failed';
    addNetworkError(message, context);
  }, [addNetworkError]);

  // Validation error handler
  const handleValidationError = useCallback((error, field = null, context = {}) => {
    const message = error?.message || 'Validation failed';
    addValidationError(message, field, context);
  }, [addValidationError]);

  // Authentication error handler
  const handleAuthError = useCallback((error, context = {}) => {
    const message = error?.message || 'Authentication failed';
    addAuthError(message, context);
  }, [addAuthError]);

  // Permission error handler
  const handlePermissionError = useCallback((error, context = {}) => {
    const message = error?.message || 'Permission denied';
    addPermissionError(message, context);
  }, [addPermissionError]);

  // Not found error handler
  const handleNotFoundError = useCallback((error, resource = null, context = {}) => {
    const message = error?.message || 'Resource not found';
    addNotFoundError(message, resource, context);
  }, [addNotFoundError]);

  // Server error handler
  const handleServerError = useCallback((error, statusCode = null, context = {}) => {
    const message = error?.message || 'Server error occurred';
    addServerError(message, statusCode, context);
  }, [addServerError]);

  // API error handler
  const handleApiError = useCallback(async (response, context = {}) => {
    const status = response.status;
    let errorMessage = 'An error occurred';

    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorData.error || errorMessage;
    } catch (e) {
      // If response is not JSON, use status text
      errorMessage = response.statusText || errorMessage;
    }

    switch (true) {
      case status >= 500:
        handleServerError(new Error(errorMessage), status, context);
        break;
      case status === 404:
        handleNotFoundError(new Error(errorMessage), context.resource, context);
        break;
      case status === 401:
        handleAuthError(new Error(errorMessage), context);
        break;
      case status === 403:
        handlePermissionError(new Error(errorMessage), context);
        break;
      case status >= 400:
        handleValidationError(new Error(errorMessage), context.field, context);
        break;
      default:
        handleError(new Error(errorMessage), context);
    }
  }, [handleServerError, handleNotFoundError, handleAuthError, handlePermissionError, handleValidationError, handleError]);

  // Async operation wrapper
  const withErrorHandling = useCallback((asyncFn, errorContext = {}) => {
    return async (...args) => {
      try {
        return await asyncFn(...args);
      } catch (error) {
        handleError(error, errorContext);
        throw error; // Re-throw to allow calling code to handle if needed
      }
    };
  }, [handleError]);

  // Promise wrapper
  const wrapPromise = useCallback((promise, errorContext = {}) => {
    return promise.catch(error => {
      handleError(error, errorContext);
      throw error;
    });
  }, [handleError]);

  return {
    // Error handlers
    handleError,
    handleNetworkError,
    handleValidationError,
    handleAuthError,
    handlePermissionError,
    handleNotFoundError,
    handleServerError,
    handleApiError,

    // Utility functions
    withErrorHandling,
    wrapPromise,

    // Direct access to error module
    addError,
    removeError,
    clearErrors
  };
};

export default useErrorHandler;
