
import React, { useState } from 'react';
import { Calendar, Thermometer, Droplets, Wind, Eye, Gauge, CloudRain, Sun, Cloud } from 'lucide-react';
import { WeatherData, ForecastData } from '@/utils/weatherService';
import { format, parseISO, isToday } from 'date-fns';
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
      '03d': <Cloud className={`${size} text-slate-400`} />,
      '04d': <Cloud className={`${size} text-slate-500`} />,
      '10d': <CloudRain className={`${size} text-blue-500`} />,
      '01n': <Sun className={`${size} text-amber-400`} />,
      '02n': <Cloud className={`${size} text-slate-400`} />,
      '03n': <Cloud className={`${size} text-slate-500`} />,
      '04n': <Cloud className={`${size} text-slate-600`} />,
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
      <Card className="border-border/50 shadow-lg bg-card/95 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center text-lg font-semibold text-foreground">
            <Calendar className="h-5 w-5 text-primary mr-2" />
            Weather Forecast
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
            {/* Today Button */}
            <button
              onClick={() => setSelectedDay('today')}
              className={`flex-shrink-0 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-300 transform hover:scale-105 ${
                selectedDay === 'today'
                  ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
              }`}
            >
              Today
            </button>
            
            {/* Forecast Days */}
            {forecast.map((day) => (
              <button
                key={day.date}
                onClick={() => setSelectedDay(day.date)}
                className={`flex-shrink-0 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-300 transform hover:scale-105 whitespace-nowrap ${
                  selectedDay === day.date
                    ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
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
          <Card className="border-border/50 shadow-xl bg-gradient-to-br from-primary/5 via-primary/10 to-secondary/5 backdrop-blur-sm overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5"></div>
            <CardContent className="p-8 relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-foreground">Current Weather</h3>
                  <p className="text-muted-foreground capitalize text-lg">{currentWeather.description}</p>
                </div>
                <div className="text-right">
                  {getWeatherIcon(currentWeather.icon, "h-16 w-16")}
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="text-6xl font-bold text-foreground">{currentWeather.temperature}°C</div>
                  <div className="text-muted-foreground">Feels like {currentWeather.feelsLike}°C</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Weather Details Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Droplets, label: 'Humidity', value: `${currentWeather.humidity}%`, color: 'text-blue-500', bg: 'bg-blue-50', border: 'border-blue-200' },
              { icon: Wind, label: 'Wind Speed', value: `${currentWeather.windSpeed} m/s`, color: 'text-emerald-500', bg: 'bg-emerald-50', border: 'border-emerald-200' },
              { icon: Gauge, label: 'Pressure', value: `${currentWeather.pressure} hPa`, color: 'text-purple-500', bg: 'bg-purple-50', border: 'border-purple-200' },
              { icon: Eye, label: 'Visibility', value: `${currentWeather.visibility} km`, color: 'text-indigo-500', bg: 'bg-indigo-50', border: 'border-indigo-200' },
            ].map((item, index) => (
              <Card key={index} className={`border-border/50 shadow-md hover:shadow-lg transition-all duration-300 ${item.bg} ${item.border}`}>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className={`p-2 rounded-lg bg-white/80 ${item.color}`}>
                      <item.icon className="h-4 w-4" />
                    </div>
                    <span className="text-sm font-medium text-muted-foreground">{item.label}</span>
                  </div>
                  <div className="text-2xl font-bold text-foreground">{item.value}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* UV Index Card */}
          <Card className={`border-border/50 shadow-md ${uvLevel.bg} ${uvLevel.border}`}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-white/80">
                    <div className="w-4 h-4 bg-amber-400 rounded-full"></div>
                  </div>
                  <span className="text-sm font-medium text-muted-foreground">UV Index</span>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-medium bg-white/80 ${uvLevel.color}`}>
                  {uvLevel.level}
                </div>
              </div>
              <div className="text-2xl font-bold text-foreground">{currentWeather.uvIndex}</div>
            </CardContent>
          </Card>
        </>
      ) : (
        selectedForecast && (
          <>
            {/* Forecast Weather Main Card */}
            <Card className="border-border/50 shadow-xl bg-gradient-to-br from-secondary/5 via-accent/10 to-primary/5 backdrop-blur-sm overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-pink-500/5"></div>
              <CardContent className="p-8 relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-foreground">
                      {format(parseISO(selectedForecast.date), 'EEEE, MMMM d')}
                    </h3>
                    <p className="text-muted-foreground capitalize text-lg">{selectedForecast.description}</p>
                  </div>
                  <div className="text-right">
                    {getWeatherIcon(selectedForecast.icon, "h-16 w-16")}
                  </div>
                </div>
                
                <div className="flex items-center space-x-6">
                  <div className="space-y-1">
                    <div className="text-5xl font-bold text-foreground">{selectedForecast.temperature.max}°</div>
                    <div className="text-muted-foreground">High</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-3xl font-semibold text-muted-foreground">{selectedForecast.temperature.min}°</div>
                    <div className="text-muted-foreground">Low</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Forecast Details */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="border-border/50 shadow-md bg-blue-50 border-blue-200">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="p-2 rounded-lg bg-white/80 text-blue-500">
                      <Droplets className="h-4 w-4" />
                    </div>
                    <span className="text-sm font-medium text-muted-foreground">Humidity</span>
                  </div>
                  <div className="text-2xl font-bold text-foreground">{selectedForecast.humidity}%</div>
                </CardContent>
              </Card>
              
              <Card className="border-border/50 shadow-md bg-emerald-50 border-emerald-200">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="p-2 rounded-lg bg-white/80 text-emerald-500">
                      <Wind className="h-4 w-4" />
                    </div>
                    <span className="text-sm font-medium text-muted-foreground">Wind Speed</span>
                  </div>
                  <div className="text-2xl font-bold text-foreground">{selectedForecast.windSpeed} m/s</div>
                </CardContent>
              </Card>
              
              {selectedForecast.precipitation !== undefined && selectedForecast.precipitation > 0 && (
                <Card className="border-border/50 shadow-md bg-blue-50 border-blue-200 col-span-2">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="p-2 rounded-lg bg-white/80 text-blue-600">
                        <CloudRain className="h-4 w-4" />
                      </div>
                      <span className="text-sm font-medium text-muted-foreground">Precipitation</span>
                    </div>
                    <div className="text-2xl font-bold text-foreground">{selectedForecast.precipitation} mm</div>
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
