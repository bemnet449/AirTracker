
import React, { useState, useCallback } from 'react';
import { Search, MapPin, Loader2 } from 'lucide-react';
import { fetchLocations } from '@/utils/locationService';
import { Button } from '@/components/ui/button';

interface Location {
  label: string;
  value: string;
  lat: string;
  lon: string;
  place_id: number;
  type: string;
  class: string;
}

interface LocationSearchProps {
  onLocationSelect: (location: Location) => void;
  onCurrentLocation: () => void;
  isLoadingLocation: boolean;
}

const LocationSearch: React.FC<LocationSearchProps> = ({
  onLocationSelect,
  onCurrentLocation,
  isLoadingLocation,
}) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Location[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    setIsLoading(true);
    try {
      const locations = await fetchLocations(searchQuery);
      setSuggestions(locations as Location[]);
      setShowSuggestions(true);
    } catch (error) {
      console.error('Error searching locations:', error);
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    handleSearch(value);
  };

  const handleLocationClick = (location: Location) => {
    setQuery(location.label);
    setShowSuggestions(false);
    onLocationSelect(location);
  };

  return (
    <div className="relative w-full">
      {/* Search Input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-muted-foreground" />
        </div>
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search for a city..."
          className="w-full pl-12 pr-4 py-4 bg-white border border-border rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-base"
        />
        {isLoading && (
          <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
            <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
          </div>
        )}
      </div>

      {/* Current Location Button */}
      <Button
        onClick={onCurrentLocation}
        disabled={isLoadingLocation}
        className="w-full mt-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-2xl py-4 h-auto shadow-lg"
      >
        <MapPin className="h-5 w-5 mr-2" />
        {isLoadingLocation ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Detecting Location...
          </>
        ) : (
          'Use Current Location'
        )}
      </Button>

      {/* Suggestions Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-border rounded-2xl shadow-xl z-50 overflow-hidden">
          {suggestions.map((location) => (
            <button
              key={location.place_id}
              onClick={() => handleLocationClick(location)}
              className="w-full px-4 py-3 text-left hover:bg-accent hover:text-accent-foreground transition-colors duration-150 border-b border-border last:border-b-0"
            >
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-3 text-muted-foreground flex-shrink-0" />
                <span className="text-sm text-foreground">{location.label}</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LocationSearch;
