import axios from "axios";

// Note: API key will be added later
const OPENWEATHER_API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

export interface WeatherData {
  temperature: number;
  humidity: number;
  windSpeed: number;
  uvIndex: number;
  description: string;
  icon: string;
  feelsLike: number;
  pressure: number;
  visibility: number;
  date?: string;
}

export interface ForecastData {
  date: string;
  temperature: {
    min: number;
    max: number;
  };
  description: string;
  icon: string;
  humidity: number;
  windSpeed: number;
  precipitation?: number;
}

export interface AirQualityData {
  aqi: number;
  pm25: number;
  pm10: number;
  co: number;
  no2: number;
  o3: number;
  so2: number;
}

export const fetchWeatherData = async (lat: number, lon: number): Promise<WeatherData | null> => {
  try {
    // For demo purposes, return mock data since API key is not set
    if (OPENWEATHER_API_KEY === "YOUR_API_KEY_HERE") {
      return {
        temperature: Math.round(20 + Math.random() * 15),
        humidity: Math.round(40 + Math.random() * 40),
        windSpeed: Math.round(Math.random() * 20 * 10) / 10,
        uvIndex: Math.round(Math.random() * 11),
        description: ["Clear sky", "Few clouds", "Scattered clouds", "Partly cloudy"][Math.floor(Math.random() * 4)],
        icon: "01d",
        feelsLike: Math.round(18 + Math.random() * 18),
        pressure: Math.round(1000 + Math.random() * 50),
        visibility: Math.round(5 + Math.random() * 15),
      };
    }

    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}&units=metric`
    );

    const data = response.data;
    return {
      temperature: Math.round(data.main.temp),
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      uvIndex: 0, // Would need separate UV API call
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      feelsLike: Math.round(data.main.feels_like),
      pressure: data.main.pressure,
      visibility: Math.round(data.visibility / 1000),
    };
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return null;
  }
};

export const fetchForecastData = async (lat: number, lon: number): Promise<ForecastData[] | null> => {
  try {
    // For demo purposes, return mock forecast data
    if (OPENWEATHER_API_KEY === "YOUR_API_KEY_HERE") {
      const today = new Date();
      const forecasts: ForecastData[] = [];
      
      for (let i = 1; i <= 5; i++) {
        const forecastDate = new Date(today);
        forecastDate.setDate(today.getDate() + i);
        
        forecasts.push({
          date: forecastDate.toISOString().split('T')[0],
          temperature: {
            min: Math.round(15 + Math.random() * 10),
            max: Math.round(25 + Math.random() * 15),
          },
          description: ["Clear sky", "Few clouds", "Scattered clouds", "Light rain", "Partly cloudy"][Math.floor(Math.random() * 5)],
          icon: ["01d", "02d", "03d", "10d", "04d"][Math.floor(Math.random() * 5)],
          humidity: Math.round(40 + Math.random() * 40),
          windSpeed: Math.round(Math.random() * 15 * 10) / 10,
          precipitation: Math.random() > 0.7 ? Math.round(Math.random() * 5 * 10) / 10 : 0,
        });
      }
      
      return forecasts;
    }

    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}&units=metric`
    );

    // Process 5-day forecast (API returns 3-hour intervals for 5 days)
    const forecasts: ForecastData[] = [];
    const dailyData = new Map();

    response.data.list.forEach((item: any) => {
      const date = item.dt_txt.split(' ')[0];
      if (!dailyData.has(date)) {
        dailyData.set(date, {
          temps: [],
          descriptions: [],
          icons: [],
          humidity: [],
          windSpeed: [],
          precipitation: 0,
        });
      }
      
      const dayData = dailyData.get(date);
      dayData.temps.push(item.main.temp);
      dayData.descriptions.push(item.weather[0].description);
      dayData.icons.push(item.weather[0].icon);
      dayData.humidity.push(item.main.humidity);
      dayData.windSpeed.push(item.wind.speed);
      if (item.rain) dayData.precipitation += item.rain['3h'] || 0;
    });

    // Convert to forecast format
    Array.from(dailyData.entries()).slice(0, 5).forEach(([date, data]) => {
      forecasts.push({
        date,
        temperature: {
          min: Math.round(Math.min(...data.temps)),
          max: Math.round(Math.max(...data.temps)),
        },
        description: data.descriptions[0],
        icon: data.icons[0],
        humidity: Math.round(data.humidity.reduce((a: number, b: number) => a + b, 0) / data.humidity.length),
        windSpeed: Math.round(data.windSpeed.reduce((a: number, b: number) => a + b, 0) / data.windSpeed.length * 10) / 10,
        precipitation: Math.round(data.precipitation * 10) / 10,
      });
    });

    return forecasts;
  } catch (error) {
    console.error("Error fetching forecast data:", error);
    return null;
  }
};

export const fetchAirQualityData = async (lat: number, lon: number): Promise<AirQualityData | null> => {
  try {
    // For demo purposes, return mock data since API key is not set
    if (OPENWEATHER_API_KEY === "YOUR_API_KEY_HERE") {
      const mockAqi = Math.round(10 + Math.random() * 140);
      return {
        aqi: mockAqi,
        pm25: Math.round(Math.random() * 50),
        pm10: Math.round(Math.random() * 80),
        co: Math.round(Math.random() * 300),
        no2: Math.round(Math.random() * 100),
        o3: Math.round(Math.random() * 200),
        so2: Math.round(Math.random() * 50),
      };
    }

    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}`
    );

    const data = response.data.list[0];
    return {
      aqi: data.main.aqi * 50, // Convert to US AQI scale approximation
      pm25: data.components.pm2_5,
      pm10: data.components.pm10,
      co: data.components.co,
      no2: data.components.no2,
      o3: data.components.o3,
      so2: data.components.so2,
    };
  } catch (error) {
    console.error("Error fetching air quality data:", error);
    return null;
  }
};
