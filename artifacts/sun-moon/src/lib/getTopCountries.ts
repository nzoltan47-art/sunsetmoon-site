import { cities } from "@/lib/cities";

export function getTopCountries(): string[] {
  const countryCount: Record<string, number> = {};

  for (const city of cities) {
    if (!city.country || typeof city.country !== "string") continue;

    const country = city.country.trim();

    if (!countryCount[country]) {
      countryCount[country] = 0;
    }

    countryCount[country]++;
  }

  // sort by number of cities (descending)
  return Object.entries(countryCount)
    .sort((a, b) => b[1] - a[1])
    .map(([country]) => country)
    .slice(0, 50); // limit for UX
}