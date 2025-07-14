
import React from 'react';
import { RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Location {
  label: string;
  lat: string;
  lon: string;
}

interface LocationDisplayProps {
  location: Location;
  lastUpdated: Date | null;
  onRefresh: () => void;
  isLoading: boolean;
}

const LocationDisplay: React.FC<LocationDisplayProps> = ({
  location,
  lastUpdated,
  onRefresh,
  isLoading,
}) => {
  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-lg p-6 border border-white/20">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-800 mb-1">Current Location</h3>
          <p className="text-sm text-gray-600 mb-2">{location.label}</p>
          {lastUpdated && (
            <p className="text-xs text-gray-500">
              Last updated: {lastUpdated.toLocaleTimeString()}
            </p>
          )}
        </div>
        <Button
          onClick={onRefresh}
          disabled={isLoading}
          size="sm"
          className="rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg"
        >
          <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
        </Button>
      </div>
    </div>
  );
};

export default LocationDisplay;
