import { useState, useEffect } from 'react';
import { z } from 'zod';
import { useQuery } from '@tanstack/react-query';

export interface AppLocation {
  latitude: number;
  longitude: number;
  name: string;
}

const geoResponseSchema = z.object({
  results: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      latitude: z.number(),
      longitude: z.number(),
      country: z.string().optional(),
      admin1: z.string().optional(),
    })
  ).optional()
});

export function useCitySearch(query: string) {
  return useQuery({
    queryKey: ['city-search', query],
    queryFn: async () => {
      if (!query || query.length < 2) return [];
      const res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=5&language=en&format=json`);
      if (!res.ok) throw new Error("Failed to fetch locations");
      const data = await res.json();
      const parsed = geoResponseSchema.parse(data);
      return parsed.results || [];
    },
    enabled: query.length >= 2,
    staleTime: 1000 * 60 * 60, // 1 hour
  });
}

export function useGeolocation() {
  const [location, setLocation] = useState<AppLocation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Try to load from local storage first
    const saved = localStorage.getItem('app-location');
    if (saved) {
      try {
        setLocation(JSON.parse(saved));
        setLoading(false);
        return;
      } catch (e) {
        // ignore parse error
      }
    }

    // Otherwise, request location
    requestLocation();
  }, []);

  const requestLocation = () => {
    setLoading(true);
    setError(null);
    
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const newLoc = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          name: "Current Location",
        };
        setLocation(newLoc);
        localStorage.setItem('app-location', JSON.stringify(newLoc));
        setLoading(false);
      },
      (err) => {
        console.error("Geo error:", err);
        setError("Unable to retrieve your location. Please search for a city.");
        setLoading(false);
      },
      { timeout: 10000, maximumAge: 60000 }
    );
  };

  const updateLocation = (loc: AppLocation) => {
    setLocation(loc);
    localStorage.setItem('app-location', JSON.stringify(loc));
  };

  return { location, loading, error, requestLocation, updateLocation };
}
