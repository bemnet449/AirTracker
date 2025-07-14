
import React from 'react';
import { AlertCircle, MapPin, Cloud, Wind } from 'lucide-react';

const WelcomeState = () => {
  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-lg p-8 border border-white/20 text-center">
      <div className="mb-6">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertCircle className="h-8 w-8 text-white" />
        </div>
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-3">
        Welcome to Air Tracker
      </h3>
      <p className="text-gray-600 text-sm leading-relaxed mb-6">
        Get comprehensive air quality and weather information for any location worldwide. 
        Start by searching for a city or using your current location.
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-gray-500">
        <div className="flex flex-col items-center space-y-2">
          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
            <Cloud className="w-4 h-4 text-green-600" />
          </div>
          <span>5-day weather forecast</span>
        </div>
        <div className="flex flex-col items-center space-y-2">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <Wind className="w-4 h-4 text-blue-600" />
          </div>
          <span>Real-time air quality</span>
        </div>
        <div className="flex flex-col items-center space-y-2">
          <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
            <MapPin className="w-4 h-4 text-purple-600" />
          </div>
          <span>Global location support</span>
        </div>
      </div>
    </div>
  );
};

export default WelcomeState;
