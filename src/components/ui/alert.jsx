import React from 'react';

export const Alert = ({ children, variant = 'default', className = '', ...props }) => (
  <div
    role="alert"
    className={`rounded-lg border p-4 ${
      variant === 'destructive' 
        ? 'border-red-500 bg-red-50 text-red-700' 
        : 'border-gray-200 bg-white text-gray-900'
    } ${className}`}
    {...props}
  >
    {children}
  </div>
);

export const AlertTitle = ({ children, className = '', ...props }) => (
  <h5
    className={`mb-1 font-medium leading-none tracking-tight ${className}`}
    {...props}
  >
    {children}
  </h5>
);