
import axios from "axios";

export const fetchLocations = async (query: string) => {
  if (!query) return [];
  try {
    const response = await axios.get(
      "https://nominatim.openstreetmap.org/search",
      {
        params: {
          q: query,
          format: "json",
          addressdetails: 1,
          limit: 5,
        },
      }
    );

    const locations = response.data.map((place: any) => {
      const city =
        place.address.city || place.address.town || place.address.village || "";
      const state = place.address.state || "";
      const country = place.address.country || "";

      return {
        label: `${city}${state ? ", " + state : ""}, ${country}`,
        value: place.display_name,
        lat: place.lat,
        lon: place.lon,
        place_id: place.place_id,
        type: place.type,
        class: place.class,
      };
    });

    const uniqueLocations = Array.from(
      new Map(locations.map((item) => [item.label, item])).values()
    );

    return uniqueLocations;
  } catch (error) {
    console.error("Error fetching locations:", error);
    return [];
  }
};

export const getCurrentLocation = (): Promise<{ lat: number; lon: number }> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported by this browser."));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      (error) => {
        reject(new Error(`Geolocation error: ${error.message}`));
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000, // 5 minutes
      }
    );
  });
};
