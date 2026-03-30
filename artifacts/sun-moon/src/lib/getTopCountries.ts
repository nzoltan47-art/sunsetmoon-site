import { cities } from "@/lib/cities";

export function getTopCountries(): string[] {
  const countrySet = new Set<string>();

  for (const city of cities) {
    if (city.country && typeof city.country === "string") {
      countrySet.add(city.country.trim());
    }
  }

  return Array.from(countrySet).sort(); // alphabetical
}