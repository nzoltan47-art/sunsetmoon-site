import { cities } from "@/lib/cities";

export function getCitiesByCountry(country: string) {
  return cities
    .filter(
      (city) =>
        city.country.toLowerCase() === country.toLowerCase()
    )
    .sort((a, b) => b.population - a.population) // biggest first
    .slice(0, 200); // limit for performance
}