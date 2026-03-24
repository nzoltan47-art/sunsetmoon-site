import { cities } from "@/lib/cities";

export function getTopCountries(limit = 12) {
  const map: Record<string, number> = {};

  cities.forEach((city) => {
    map[city.country] = (map[city.country] || 0) + 1;
  });

  return Object.entries(map)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([country]) => ({
      name: country,
      slug: country.toLowerCase().replace(/ /g, "-"),
    }));
}
