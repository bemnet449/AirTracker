
export interface AQILevel {
  level: string;
  color: string;
  bgGradient: string;
  textColor: string;
  healthTip: string;
  recommendation: string;
}

export const getAQILevel = (aqi: number): AQILevel => {
  if (aqi <= 50) {
    return {
      level: "Good",
      color: "text-green-700",
      bgGradient: "from-green-400 to-emerald-500",
      textColor: "text-white",
      healthTip: "Air quality is satisfactory",
      recommendation: "🌟 Safe to go outside. Perfect for outdoor activities!",
    };
  } else if (aqi <= 100) {
    return {
      level: "Moderate",
      color: "text-yellow-700",
      bgGradient: "from-yellow-400 to-orange-500",
      textColor: "text-white",
      healthTip: "Air quality is acceptable for most people",
      recommendation: "⚠️ Sensitive groups should consider reducing prolonged outdoor exertion.",
    };
  } else if (aqi <= 150) {
    return {
      level: "Unhealthy for Sensitive Groups",
      color: "text-orange-700",
      bgGradient: "from-orange-500 to-red-500",
      textColor: "text-white",
      healthTip: "Members of sensitive groups may experience health effects",
      recommendation: "😷 Sensitive individuals should wear masks and limit outdoor activities.",
    };
  } else if (aqi <= 200) {
    return {
      level: "Unhealthy",
      color: "text-red-700",
      bgGradient: "from-red-500 to-red-700",
      textColor: "text-white",
      healthTip: "Everyone may begin to experience health effects",
      recommendation: "🚨 Everyone should wear masks outdoors. Limit extended outdoor activities.",
    };
  } else if (aqi <= 300) {
    return {
      level: "Very Unhealthy",
      color: "text-purple-700",
      bgGradient: "from-purple-600 to-purple-800",
      textColor: "text-white",
      healthTip: "Health warnings of emergency conditions",
      recommendation: "🏠 Avoid outdoor activities. Stay indoors with windows closed.",
    };
  } else {
    return {
      level: "Hazardous",
      color: "text-red-900",
      bgGradient: "from-red-800 to-red-900",
      textColor: "text-white",
      healthTip: "Health alert: everyone may experience serious health effects",
      recommendation: "🚨 Stay indoors. Use air purifiers. Seek medical attention if feeling unwell.",
    };
  }
};
