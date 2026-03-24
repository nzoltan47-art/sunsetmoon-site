import { cities } from "@/lib/cities";

type City = {
  name: string;
  slug: string;
  lat: number;
  lon: number;
  country: string;
};

// Haversine formula
function getDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371;

  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

export function getNearbyCities(currentCity: City, limit = 6): City[] {
  // ✅ same country first
  const sameCountry = cities.filter(
    (city) =>
      city.name.toLowerCase() !== currentCity.name.toLowerCase() &&
      city.country === currentCity.country
  );

  const pool = sameCountry.length >= limit ? sameCountry : cities;

  return pool
    .map((city) => ({
      ...city,
      distance: getDistance(
        currentCity.lat,
        currentCity.lon,
        city.lat,
        city.lon
      ),
    }))
    .sort((a, b) => a.distance - b.distance)
    .slice(0, limit);
}