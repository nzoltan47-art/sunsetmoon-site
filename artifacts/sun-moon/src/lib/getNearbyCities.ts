import { cities } from "@/lib/cities";

type City = {
  name: string;
  slug: string;
  latitude: number;
  longitude: number;
  country: string;
};

// Haversine formula (distance in km)
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

export function getNearbyCities(
  currentCity: City,
  limit = 6
): City[] {
  return cities
    .filter((city) => city.slug !== currentCity.slug)
    .map((city) => ({
      ...city,
      distance: getDistance(
        currentCity.latitude,
        currentCity.longitude,
        city.latitude,
        city.longitude
      ),
    }))
    .sort((a, b) => a.distance - b.distance)
    .slice(0, limit);
}