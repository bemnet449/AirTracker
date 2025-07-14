
import React, { useEffect, useCallback } from 'react';
import LocationSearch from '@/components/LocationSearch';
import AQIDisplay from '@/components/AQIDisplay';
import WeatherForecast from '@/components/WeatherForecast';
import AppHeader from '@/components/AppHeader';
import LocationDisplay from '@/components/LocationDisplay';
import LoadingState from '@/components/LoadingState';
import WelcomeState from '@/components/WelcomeState';
import AppFooter from '@/components/AppFooter';
import { useWeatherData } from '@/hooks/useWeatherData';
import { useLocation } from '@/hooks/useLocation';

const Index = () => {
  const {
    weatherData,
    forecastData,
    airQualityData,
    isLoadingData,
    lastUpdated,
    fetchAllData,
  } = useWeatherData();

  const {
    currentLocation,
    isLoadingLocation,
    handleLocationSelect,
    handleCurrentLocation,
  } = useLocation();

  const onLocationSelect = useCallback((location: any) => {
    const newLocation = handleLocationSelect(location);
    fetchAllData(parseFloat(newLocation.lat), parseFloat(newLocation.lon));
  }, [handleLocationSelect, fetchAllData]);

  const onCurrentLocation = useCallback(async () => {
    try {
      const coords = await handleCurrentLocation();
      await fetchAllData(coords.lat, coords.lon);
    } catch (error) {
      // Error handling is done in the hook
    }
  }, [handleCurrentLocation, fetchAllData]);

  const handleRefresh = useCallback(() => {
    if (currentLocation) {
      fetchAllData(parseFloat(currentLocation.lat), parseFloat(currentLocation.lon));
    }
  }, [currentLocation, fetchAllData]);

  // Auto-refresh every 10 minutes
  useEffect(() => {
    if (!currentLocation) return;

    const interval = setInterval(() => {
      console.log('Auto-refreshing data...');
      fetchAllData(parseFloat(currentLocation.lat), parseFloat(currentLocation.lon));
    }, 10 * 60 * 1000); // 10 minutes

    return () => clearInterval(interval);
  }, [currentLocation, fetchAllData]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <AppHeader />

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Location Search and Current Location */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white/60 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-white/20">
              <LocationSearch
                onLocationSelect={onLocationSelect}
                onCurrentLocation={onCurrentLocation}
                isLoadingLocation={isLoadingLocation}
              />
            </div>

            {currentLocation && (
              <LocationDisplay
                location={currentLocation}
                lastUpdated={lastUpdated}
                onRefresh={handleRefresh}
                isLoading={isLoadingData}
              />
            )}

            {!isLoadingData && !weatherData && !airQualityData && !currentLocation && (
              <WelcomeState />
            )}
          </div>

          {/* Right Column - Weather and Air Quality Data */}
          <div className="lg:col-span-2">
            {isLoadingData && <LoadingState />}
            
            {!isLoadingData && weatherData && airQualityData && (
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <div className="xl:col-span-1">
                  <AQIDisplay airQuality={airQualityData} />
                </div>
                <div className="xl:col-span-1">
                  <WeatherForecast currentWeather={weatherData} forecast={forecastData} />
                </div>
              </div>
            )}
          </div>
        </div>

        <AppFooter />
      </div>
    </div>
  );
};

export default Index;
