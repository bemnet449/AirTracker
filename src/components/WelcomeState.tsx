import React from 'react';
import { AlertCircle, MapPin, Cloud, Wind } from 'lucide-react';

const WelcomeState = () => {
  return (
    <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-md p-6 border border-gray-100 text-center max-w-lg mx-auto mt-4 z-10">
      <div className="mb-4">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-3">
          <AlertCircle className="h-6 w-6 text-white" />
        </div>
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        Welcome to Air Tracker
      </h3>
      <p className="text-gray-600 text-sm leading-relaxed mb-4">
        Get comprehensive air quality and weather information for any location worldwide. 
        Start by searching for a city or using your current location.
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-gray-600">
        <div className="flex flex-col items-center space-y-1">
          <div className="w-7 h-7 bg-green-50 rounded-full flex items-center justify-center">
            <Cloud className="w-4 h-4 text-green-500" />
          </div>
          <span>5-day weather forecast</span>
        </div>
        <div className="flex flex-col items-center space-y-1">
          <div className="w-7 h-7 bg-blue-50 rounded-full flex items-center justify-center">
            <Wind className="w-4 h-4 text-blue-500" />
          </div>
          <span>Real-time air quality</span>
        </div>
        <div className="flex flex-col items-center space-y-1">
          <div className="w-7 h-7 bg-purple-50 rounded-full flex items-center justify-center">
            <MapPin className="w-4 h-4 text-purple-500" />
          </div>
          <span>Global location support</span>
        </div>
      </div>
    </div>
  );
};

export default WelcomeState;