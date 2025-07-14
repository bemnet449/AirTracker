
import { useState, useCallback } from 'react';
import { getCurrentLocation } from '@/utils/locationService';
import { useToast } from '@/hooks/use-toast';

interface Location {
  label: string;
  lat: string;
  lon: string;
}

export const useLocation = () => {
  const [currentLocation, setCurrentLocation] = useState<Location | null>(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const { toast } = useToast();

  const handleLocationSelect = useCallback((location: any) => {
    console.log('Location selected:', location);
    const newLocation = {
      label: location.label,
      lat: location.lat,
      lon: location.lon,
    };
    setCurrentLocation(newLocation);
    return newLocation;
  }, []);

  const handleCurrentLocation = useCallback(async () => {
    setIsLoadingLocation(true);
    try {
      const coords = await getCurrentLocation();
      console.log('Current location:', coords);
      
      const location = {
        label: "Current Location",
        lat: coords.lat.toString(),
        lon: coords.lon.toString(),
      };
      
      setCurrentLocation(location);
      
      toast({
        title: "Location Found",
        description: "Using your current location for weather data.",
      });

      return coords;
    } catch (error) {
      console.error('Error getting current location:', error);
      toast({
        title: "Location Error",
        description: "Unable to get your current location. Please search for a city manually.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoadingLocation(false);
    }
  }, [toast]);

  return {
    currentLocation,
    isLoadingLocation,
    handleLocationSelect,
    handleCurrentLocation,
  };
};
