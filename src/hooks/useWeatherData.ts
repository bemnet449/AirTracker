
import { useState, useCallback } from 'react';
import { fetchWeatherData, fetchForecastData, fetchAirQualityData, WeatherData, ForecastData, AirQualityData } from '@/utils/weatherService';
import { useToast } from '@/hooks/use-toast';

export const useWeatherData = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [forecastData, setForecastData] = useState<ForecastData[]>([]);
  const [airQualityData, setAirQualityData] = useState<AirQualityData | null>(null);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const { toast } = useToast();

  const fetchAllData = useCallback(async (lat: number, lon: number) => {
    setIsLoadingData(true);
    console.log('Fetching data for coordinates:', { lat, lon });
    
    try {
      const [weather, forecast, airQuality] = await Promise.all([
        fetchWeatherData(lat, lon),
        fetchForecastData(lat, lon),
        fetchAirQualityData(lat, lon),
      ]);

      console.log('Weather data:', weather);
      console.log('Forecast data:', forecast);
      console.log('Air quality data:', airQuality);

      if (weather && airQuality) {
        setWeatherData(weather);
        setForecastData(forecast || []);
        setAirQualityData(airQuality);
        setLastUpdated(new Date());
        toast({
          title: "Data Updated",
          description: "Weather and air quality data refreshed successfully.",
        });
      } else {
        throw new Error('Failed to fetch complete data');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        title: "Error",
        description: "Failed to fetch weather and air quality data. Using demo data.",
        variant: "destructive",
      });
      
      // Provide fallback demo data
      setWeatherData({
        temperature: 22,
        humidity: 65,
        windSpeed: 3.2,
        uvIndex: 4,
        description: "partly cloudy",
        icon: "02d",
        feelsLike: 24,
        pressure: 1013,
        visibility: 10,
      });
      
      // Demo forecast data
      const today = new Date();
      const demoForecast: ForecastData[] = [];
      for (let i = 1; i <= 5; i++) {
        const forecastDate = new Date(today);
        forecastDate.setDate(today.getDate() + i);
        demoForecast.push({
          date: forecastDate.toISOString().split('T')[0],
          temperature: { min: 18 + i, max: 28 + i },
          description: ["sunny", "cloudy", "rainy", "partly cloudy", "clear"][i - 1],
          icon: ["01d", "03d", "10d", "02d", "01d"][i - 1],
          humidity: 60 + i * 2,
          windSpeed: 2.5 + i * 0.5,
          precipitation: i === 3 ? 2.5 : 0,
        });
      }
      setForecastData(demoForecast);
      
      setAirQualityData({
        aqi: 75,
        pm25: 15,
        pm10: 25,
        co: 200,
        no2: 30,
        o3: 120,
        so2: 10,
      });
      
      setLastUpdated(new Date());
    } finally {
      setIsLoadingData(false);
    }
  }, [toast]);

  return {
    weatherData,
    forecastData,
    airQualityData,
    isLoadingData,
    lastUpdated,
    fetchAllData,
  };
};
