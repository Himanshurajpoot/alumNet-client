import React, { useState } from 'react';

// Test component to demonstrate error boundary functionality
function ErrorTest() {
  const [shouldError, setShouldError] = useState(false);

  // This will trigger an error when shouldError is true
  if (shouldError) {
    throw new Error('This is a test error to demonstrate error boundary!');
  }

  return (
    <div className="p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
      <h3 className="text-lg font-semibold text-yellow-800 mb-4">
        Error Boundary Test Component
      </h3>
      <p className="text-yellow-700 mb-4">
        This component can trigger an error to test the error boundary functionality.
      </p>
      <button
        onClick={() => setShouldError(true)}
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition duration-200"
      >
        Trigger Error
      </button>
    </div>
  );
}

export default ErrorTest;
