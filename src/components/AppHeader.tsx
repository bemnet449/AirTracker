
import React from 'react';
import { Sparkles } from 'lucide-react';

const AppHeader = () => {
  return (
    <header className="bg-white/80 backdrop-blur-xl shadow-lg border-b border-white/20 sticky top-0 z-40">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="flex items-center mr-8">
              <Sparkles className="h-8 w-8 text-purple-600 mr-3" />
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Air Tracker
                </h1>
                <p className="text-gray-600 text-sm font-medium hidden sm:block">
                  Real-time Air Quality & Weather Monitoring
                </p>
              </div>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-6 text-sm text-gray-600">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              Live Data
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
              5-Day Forecast
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
