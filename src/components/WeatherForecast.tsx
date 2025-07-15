import React, { useState } from 'react';
import { Calendar, Thermometer, Droplets, Wind, Eye, Gauge, CloudRain, Sun, Cloud } from 'lucide-react';
import { WeatherData, ForecastData } from '@/utils/weatherService';
import { format, parseISO } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface WeatherForecastProps {
  currentWeather: WeatherData;
  forecast: ForecastData[];
}

const WeatherForecast: React.FC<WeatherForecastProps> = ({ currentWeather, forecast }) => {
  const [selectedDay, setSelectedDay] = useState<'today' | string>('today');

  const getWeatherIcon = (iconCode: string, size: string = "h-8 w-8") => {
    const iconMap: { [key: string]: React.ReactNode } = {
      '01d': <Sun className={`${size} text-amber-500`} />,
      '02d': <Sun className={`${size} text-amber-400`} />,
      '03d': <Cloud className={`${size} text-gray-400`} />,
      '04d': <Cloud className={`${size} text-gray-500`} />,
      '10d': <CloudRain className={`${size} text-blue-500`} />,
      '01n': <Sun className={`${size} text-amber-400`} />,
      '02n': <Cloud className={`${size} text-gray-400`} />,
      '03n': <Cloud className={`${size} text-gray-500`} />,
      '04n': <Cloud className={`${size} text-gray-600`} />,
      '10n': <CloudRain className={`${size} text-blue-600`} />,
    };
    return iconMap[iconCode] || <Sun className={`${size} text-amber-500`} />;
  };

  const getUVLevel = (uvIndex: number) => {
    if (uvIndex <= 2) return { level: 'Low', color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200' };
    if (uvIndex <= 5) return { level: 'Moderate', color: 'text-yellow-600', bg: 'bg-yellow-50', border: 'border-yellow-200' };
    if (uvIndex <= 7) return { level: 'High', color: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-200' };
    if (uvIndex <= 10) return { level: 'Very High', color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200' };
    return { level: 'Extreme', color: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-200' };
  };

  const uvLevel = getUVLevel(currentWeather.uvIndex);
  const isCurrentDay = selectedDay === 'today';
  const selectedForecast = isCurrentDay ? null : forecast.find(f => f.date === selectedDay);

  return (
    <div className="w-full space-y-6">
      {/* Date Selection */}
      <Card className="bg-white/90 backdrop-blur-md rounded-2xl shadow-md border border-gray-100">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center text-lg font-semibold text-gray-900">
            <Calendar className="h-5 w-5 text-blue-500 mr-2" />
            Weather Forecast
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
            <button
              onClick={() => setSelectedDay('today')}
              className={`flex-shrink-0 px-4 py-2 rounded-xl font-medium text-sm transition-all duration-200 hover:bg-blue-50 hover:text-blue-600 ${
                selectedDay === 'today'
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'bg-gray-50 text-gray-600'
              }`}
            >
              Today
            </button>
            {forecast.map((day) => (
              <button
                key={day.date}
                onClick={() => setSelectedDay(day.date)}
                className={`flex-shrink-0 px-4 py-2 rounded-xl font-medium text-sm transition-all duration-200 hover:bg-blue-50 hover:text-blue-600 whitespace-nowrap ${
                  selectedDay === day.date
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'bg-gray-50 text-gray-600'
                }`}
              >
                {format(parseISO(day.date), 'MMM d')}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Weather Display */}
      {isCurrentDay ? (
        <>
          {/* Current Weather Main Card */}
          <Card className="bg-white/90 backdrop-blur-md rounded-2xl shadow-md border border-gray-100 overflow-hidden relative z-10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="space-y-1">
                  <h3 className="text-xl font-semibold text-gray-900">Current Weather</h3>
                  <p className="text-gray-600 capitalize text-sm">{currentWeather.description}</p>
                </div>
                <div className="text-right">
                  {getWeatherIcon(currentWeather.icon, "h-12 w-12")}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="text-4xl font-bold text-gray-900">{currentWeather.temperature}°C</div>
                  <div className="text-gray-600 text-sm">Feels like {currentWeather.feelsLike}°C</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Weather Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-20 my-10">
  {[
    { icon: Droplets, label: 'Humidity', value: `${currentWeather.humidity}%`, color: 'text-blue-500', bg: 'bg-white/90', border: 'border-blue-200' },
    { icon: Wind, label: 'Wind Speed', value: `${currentWeather.windSpeed} m/s`, color: 'text-emerald-500', bg: 'bg-white/90', border: 'border-emerald-200' },
    { icon: Gauge, label: 'Pressure', value: `${currentWeather.pressure} hPa`, color: 'text-purple-500', bg: 'bg-white/90', border: 'border-purple-200' },
    { icon: Eye, label: 'Visibility', value: `${currentWeather.visibility} km`, color: 'text-indigo-500', bg: 'bg-white/90', border: 'border-indigo-200' },
  ].map((item, index) => (
    <Card
      key={index}
      className={`bg-white/90 backdrop-blur-md rounded-2xl shadow-md border ${item.border} hover:shadow-lg transition-all duration-200 min-w-[120px]`}
    >
      <CardContent className="p-4 flex flex-col items-center text-center">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <div className={`p-2 rounded-lg bg-white ${item.color}`}>
            <item.icon className="h-4 w-4" />
          </div>
          <span className="text-xs font-medium text-gray-600">{item.label}</span>
        </div>
        <div className="text-lg font-semibold text-gray-900 truncate w-full">{item.value}</div>
      </CardContent>
    </Card>
  ))}
</div>


          {/* UV Index Card */}
          <Card className={`bg-white/90 backdrop-blur-md rounded-2xl shadow-md border ${uvLevel.border} min-w-[120px]`}>
            <CardContent className="p-4 flex flex-col items-center text-center">
              <div className="flex items-center justify-between w-full mb-2">
                <div className="flex items-center space-x-2">
                  <div className="p-2 rounded-lg bg-white">
                    <div className="w-4 h-4 bg-amber-400 rounded-full"></div>
                  </div>
                  <span className="text-xs font-medium text-gray-600">UV Index</span>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-medium bg-white ${uvLevel.color}`}>
                  {uvLevel.level}
                </div>
              </div>
              <div className="text-lg font-semibold text-gray-900">{currentWeather.uvIndex}</div>
            </CardContent>
          </Card>
        </>
      ) : (
        selectedForecast && (
          <>
            {/* Forecast Weather Main Card */}
            <Card className="bg-white/90 backdrop-blur-md rounded-2xl shadow-md border border-gray-100 overflow-hidden relative z-10">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="space-y-1">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {format(parseISO(selectedForecast.date), 'EEEE, MMMM d')}
                    </h3>
                    <p className="text-gray-600 capitalize text-sm">{selectedForecast.description}</p>
                  </div>
                  <div className="text-right">
                    {getWeatherIcon(selectedForecast.icon, "h-12 w-12")}
                  </div>
                </div>
                <div className="flex items-center space-x-6">
                  <div className="space-y-1">
                    <div className="text-3xl font-semibold text-gray-900">{selectedForecast.temperature.max}°</div>
                    <div className="text-gray-600 text-sm">High</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-2xl font-semibold text-gray-600">{selectedForecast.temperature.min}°</div>
                    <div className="text-gray-600 text-sm">Low</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Forecast Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card className="bg-white/90 backdrop-blur-md rounded-2xl shadow-md border border-blue-200 min-w-[120px]">
                <CardContent className="p-4 flex flex-col items-center text-center">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <div className="p-2 rounded-lg bg-white text-blue-500">
                      <Droplets className="h-4 w-4" />
                    </div>
                    <span className="text-xs font-medium text-gray-600">Humidity</span>
                  </div>
                  <div className="text-lg font-semibold text-gray-900">{selectedForecast.humidity}%</div>
                </CardContent>
              </Card>
              <Card className="bg-white/90 backdrop-blur-md rounded-2xl shadow-md border border-emerald-200 min-w-[120px]">
                <CardContent className="p-4 flex flex-col items-center text-center">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <div className="p-2 rounded-lg bg-white text-emerald-500">
                      <Wind className="h-4 w-4" />
                    </div>
                    <span className="text-xs font-medium text-gray-600">Wind Speed</span>
                  </div>
                  <div className="text-lg font-semibold text-gray-900">{selectedForecast.windSpeed} m/s</div>
                </CardContent>
              </Card>
              {selectedForecast.precipitation !== undefined && selectedForecast.precipitation > 0 && (
                <Card className="bg-white/90 backdrop-blur-md rounded-2xl shadow-md border border-blue-200 col-span-2 min-w-[120px]">
                  <CardContent className="p-4 flex flex-col items-center text-center">
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <div className="p-2 rounded-lg bg-white text-blue-500">
                        <CloudRain className="h-4 w-4" />
                      </div>
                      <span className="text-xs font-medium text-gray-600">Precipitation</span>
                    </div>
                    <div className="text-lg font-semibold text-gray-900">{selectedForecast.precipitation} mm</div>
                  </CardContent>
                </Card>
              )}
            </div>
          </>
        )
      )}
    </div>
  );
};

export default WeatherForecast;