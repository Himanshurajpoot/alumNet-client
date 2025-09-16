import React from 'react';
import { useErrorHandler } from '../../hooks/useErrorHandler';

const ErrorModuleExample = () => {
  const {
    handleError,
    handleNetworkError,
    handleValidationError,
    handleAuthError,
    handlePermissionError,
    handleNotFoundError,
    handleServerError,
    handleApiError,
    withErrorHandling
  } = useErrorHandler();

  // Example API call with error handling
  const fetchData = async () => {
    try {
      const response = await fetch('/api/nonexistent-endpoint');
      if (!response.ok) {
        await handleApiError(response, { 
          context: { 
            operation: 'fetchData',
            endpoint: '/api/nonexistent-endpoint'
          }
        });
        return;
      }
      return await response.json();
    } catch (error) {
      handleNetworkError(error, { operation: 'fetchData' });
    }
  };

  // Example async function with error handling wrapper
  const processData = withErrorHandling(async (data) => {
    if (!data) {
      throw new Error('No data provided');
    }
    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 1000));
    return data;
  }, { operation: 'processData' });

  return (
    <div className="p-6 bg-gray-50 rounded-lg">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Error Module Test Component
      </h3>
      <p className="text-gray-600 mb-6">
        Click the buttons below to test different types of errors and see how they're handled.
      </p>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {/* Generic Error */}
        <button
          onClick={() => handleError(new Error('This is a generic error'), {
            title: 'Generic Error',
            severity: 'medium',
            type: 'client'
          })}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-colors"
        >
          Generic Error
        </button>

        {/* Network Error */}
        <button
          onClick={() => handleNetworkError(new Error('Failed to connect to server'), {
            operation: 'test_network'
          })}
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded transition-colors"
        >
          Network Error
        </button>

        {/* Validation Error */}
        <button
          onClick={() => handleValidationError(new Error('Email is required'), 'email', {
            form: 'registration'
          })}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded transition-colors"
        >
          Validation Error
        </button>

        {/* Auth Error */}
        <button
          onClick={() => handleAuthError(new Error('Invalid credentials'), {
            action: 'login'
          })}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition-colors"
        >
          Auth Error
        </button>

        {/* Permission Error */}
        <button
          onClick={() => handlePermissionError(new Error('Access denied'), {
            resource: 'admin_panel'
          })}
          className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded transition-colors"
        >
          Permission Error
        </button>

        {/* Not Found Error */}
        <button
          onClick={() => handleNotFoundError(new Error('User not found'), 'user', {
            userId: '123'
          })}
          className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded transition-colors"
        >
          Not Found Error
        </button>

        {/* Server Error */}
        <button
          onClick={() => handleServerError(new Error('Internal server error'), 500, {
            endpoint: '/api/users'
          })}
          className="bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded transition-colors"
        >
          Server Error
        </button>

        {/* API Error */}
        <button
          onClick={fetchData}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors"
        >
          API Error
        </button>

        {/* Async with Error Handling */}
        <button
          onClick={() => processData(null)}
          className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded transition-colors"
        >
          Async Error
        </button>
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded border border-blue-200">
        <h4 className="font-medium text-blue-900 mb-2">How to use in your components:</h4>
        <pre className="text-sm text-blue-800 overflow-x-auto">
{`import { useErrorHandler } from '../hooks/useErrorHandler';

const MyComponent = () => {
  const { handleError, handleApiError } = useErrorHandler();
  
  const handleSubmit = async (data) => {
    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        body: JSON.stringify(data)
      });
      
      if (!response.ok) {
        await handleApiError(response);
        return;
      }
      
      // Handle success
    } catch (error) {
      handleError(error, { context: 'form_submission' });
    }
  };
  
  return <button onClick={handleSubmit}>Submit</button>;
};`}
        </pre>
      </div>
    </div>
  );
};

export default ErrorModuleExample;
