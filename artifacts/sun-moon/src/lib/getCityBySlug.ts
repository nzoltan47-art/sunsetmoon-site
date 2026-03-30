import { cities } from "@/lib/cities";

export function getCityBySlug(slug: string) {
  return cities.find((c) => c.slug === slug);
}