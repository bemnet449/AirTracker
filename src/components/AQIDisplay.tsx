
import React from 'react';
import { Heart, Zap, Wind } from 'lucide-react';
import { getAQILevel } from '@/utils/aqiUtils';
import { AirQualityData } from '@/utils/weatherService';

interface AQIDisplayProps {
  airQuality: AirQualityData;
}

const AQIDisplay: React.FC<AQIDisplayProps> = ({ airQuality }) => {
  const aqiLevel = getAQILevel(airQuality.aqi);

  const getPollutantLevel = (value: number, type: 'pm25' | 'pm10' | 'o3' | 'no2') => {
    const thresholds = {
      pm25: [12, 35, 55],
      pm10: [20, 50, 100],
      o3: [100, 160, 240],
      no2: [40, 80, 180],
    };
    
    const levels = thresholds[type];
    if (value <= levels[0]) return { level: 'Good', color: 'text-green-600', bg: 'bg-green-100' };
    if (value <= levels[1]) return { level: 'Moderate', color: 'text-yellow-600', bg: 'bg-yellow-100' };
    if (value <= levels[2]) return { level: 'Unhealthy', color: 'text-orange-600', bg: 'bg-orange-100' };
    return { level: 'Hazardous', color: 'text-red-600', bg: 'bg-red-100' };
  };

  return (
    <div className="w-full space-y-6">
      {/* Main AQI Card */}
      <div className={`relative overflow-hidden bg-gradient-to-br ${aqiLevel.bgGradient} rounded-3xl p-8 shadow-2xl`}>
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 right-4 w-32 h-32 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-4 left-4 w-24 h-24 bg-white rounded-full blur-2xl"></div>
        </div>
        
        <div className="relative z-10">
          <div className="flex items-center mb-4">
            <Wind className={`h-6 w-6 ${aqiLevel.textColor} mr-2`} />
            <h2 className={`text-xl font-semibold ${aqiLevel.textColor} opacity-90`}>
              Air Quality Index
            </h2>
          </div>
          
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className={`text-6xl lg:text-7xl font-bold ${aqiLevel.textColor} mb-2 tracking-tight`}>
                {airQuality.aqi}
              </div>
              <div className={`inline-flex items-center px-4 py-2 rounded-full bg-white bg-opacity-20 backdrop-blur-sm`}>
                <div className={`text-lg font-bold ${aqiLevel.textColor}`}>
                  {aqiLevel.level}
                </div>
              </div>
            </div>
          </div>
          
          <p className={`text-sm ${aqiLevel.textColor} opacity-90 leading-relaxed`}>
            {aqiLevel.healthTip}
          </p>
        </div>
      </div>

      {/* Health Recommendation Card */}
      <div className="bg-white rounded-3xl shadow-lg p-6 border border-gray-100">
        <div className="flex items-center mb-3">
          <Heart className="h-5 w-5 text-red-500 mr-2" />
          <h3 className="text-lg font-semibold text-gray-800">Health Advice</h3>
        </div>
        <p className="text-gray-600 text-sm leading-relaxed">
          {aqiLevel.recommendation}
        </p>
      </div>

      {/* Pollutant Details */}
      <div className="bg-white rounded-3xl shadow-lg p-6 border border-gray-100">
        <div className="flex items-center mb-4">
          <Zap className="h-5 w-5 text-purple-500 mr-2" />
          <h3 className="text-lg font-semibold text-gray-800">Pollutant Breakdown</h3>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          {[
            { key: 'pm25', label: 'PM2.5', value: airQuality.pm25, unit: 'μg/m³' },
            { key: 'pm10', label: 'PM10', value: airQuality.pm10, unit: 'μg/m³' },
            { key: 'o3', label: 'Ozone', value: airQuality.o3, unit: 'μg/m³' },
            { key: 'no2', label: 'NO₂', value: airQuality.no2, unit: 'μg/m³' },
          ].map((pollutant) => {
            const level = getPollutantLevel(pollutant.value, pollutant.key as any);
            return (
              <div key={pollutant.key} className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-4 border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-xs font-medium text-gray-500">{pollutant.label}</div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${level.bg} ${level.color}`}>
                    {level.level}
                  </div>
                </div>
                <div className="text-2xl font-bold text-gray-800 mb-1">{pollutant.value}</div>
                <div className="text-xs text-gray-500">{pollutant.unit}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AQIDisplay;
