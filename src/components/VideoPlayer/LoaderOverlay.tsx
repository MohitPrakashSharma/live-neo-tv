import React from 'react';

export const LoaderOverlay = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black">
      <div className="flex flex-col items-center">
        <img 
          src="https://neotvapp.com/wp-content/uploads/2024/09/logo.svg" 
          alt="NeoTV+"
          className="h-12 w-auto animate-pulse"
        />
        <div className="mt-4 text-sm text-gray-400">Loading channel...</div>
      </div>
    </div>
  );
};