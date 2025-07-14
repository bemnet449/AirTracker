
import React from 'react';
import { RefreshCw } from 'lucide-react';

const LoadingState = () => {
  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-lg p-12 border border-white/20 text-center">
      <div className="flex items-center justify-center mb-4">
        <div className="relative">
          <RefreshCw className="h-12 w-12 animate-spin text-blue-500" />
          <div className="absolute inset-0 bg-blue-500/20 rounded-full animate-pulse"></div>
        </div>
      </div>
      <p className="text-gray-600 font-medium">Loading air quality and weather data...</p>
      <p className="text-sm text-gray-500 mt-2">This may take a few moments</p>
    </div>
  );
};

export default LoadingState;
