
import React from 'react';
import { RefreshCw, Sparkles, Globe, Shield } from 'lucide-react';

const AppFooter = () => {
  return (
    <footer className="mt-16 pt-8 border-t border-white/20">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="flex items-center space-x-3 text-sm text-gray-600">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <RefreshCw className="h-4 w-4 text-blue-600" />
          </div>
          <div>
            <div className="font-medium">Auto-refresh</div>
            <div className="text-xs text-gray-500">Every 10 minutes</div>
          </div>
        </div>
        
        <div className="flex items-center space-x-3 text-sm text-gray-600">
          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
            <Sparkles className="h-4 w-4 text-green-600" />
          </div>
          <div>
            <div className="font-medium">Real-time data</div>
            <div className="text-xs text-gray-500">Live updates</div>
          </div>
        </div>
        
        <div className="flex items-center space-x-3 text-sm text-gray-600">
          <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
            <Globe className="h-4 w-4 text-purple-600" />
          </div>
          <div>
            <div className="font-medium">Global coverage</div>
            <div className="text-xs text-gray-500">Worldwide locations</div>
          </div>
        </div>
        
        <div className="flex items-center space-x-3 text-sm text-gray-600">
          <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
            <Shield className="h-4 w-4 text-orange-600" />
          </div>
          <div>
            <div className="font-medium">Reliable sources</div>
            <div className="text-xs text-gray-500">Trusted APIs</div>
          </div>
        </div>
      </div>
      
      <div className="text-center py-6 border-t border-gray-200">
        <p className="text-xs text-gray-400 mb-2">
          Weather data from OpenWeatherMap • Location data from OpenStreetMap
        </p>
        <p className="text-xs text-gray-300">
          © 2024 Air Tracker. Real-time environmental monitoring for better health decisions.
        </p>
      </div>
    </footer>
  );
};

export default AppFooter;
