import { useLocation } from "wouter";
import { getCitiesByCountry } from "@/lib/getCitiesByCountry";
import { useEffect } from "react";

export default function CountryPage() {
  const [location] = useLocation();

  const parts = location.split("/").filter(Boolean);
  const countrySlug = parts[1];

  if (!countrySlug) {
    return <div className="text-white text-center mt-20">Country not found</div>;
  }

  const countryName = countrySlug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  const cities = getCitiesByCountry(countryName);

  if (!cities.length) {
    return <div className="text-white text-center mt-20">No cities found</div>;
  }

  const title = `Sunset, Moon & Golden Hour Times in ${countryName}`;
  const description = `Check sunset times, sunrise, moon phase and golden hour for cities across ${countryName}.`;

  const canonicalUrl = `https://sunsetmoon.today/country/${countrySlug}`;

  useEffect(() => {
    document.title = title;

    let meta = document.querySelector("meta[name='description']");
    if (meta) meta.setAttribute("content", description);

    let canonical = document.querySelector("link[rel='canonical']");
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }

    canonical.setAttribute("href", canonicalUrl);
  }, [title, description, canonicalUrl]);

  return (
    <div className="min-h-screen text-white p-10 max-w-6xl mx-auto">

      <h1 className="text-4xl font-bold mb-6 text-center">
        Sunset, Moon & Golden Hour Times in {countryName}
      </h1>

      <p className="text-white/70 text-center max-w-2xl mx-auto mb-10">
        Explore sunset times, sunrise, moon phases, and golden hour across cities in {countryName}. Select a city below to view detailed astronomical data.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {cities.map((city) => (
          <div
            key={city.slug}
            className="p-6 rounded-xl border border-white/10 bg-black/20 backdrop-blur"
          >
            <h2 className="text-xl font-semibold mb-4">
              {city.name}
            </h2>

            <div className="space-y-2">

              <a
                href={`/sunset/${city.slug}`}
                className="block text-primary hover:underline"
              >
                Sunset Time
              </a>

              <a
                href={`/moon/${city.slug}`}
                className="block hover:underline"
              >
                Moon Phase
              </a>

              <a
                href={`/golden-hour/${city.slug}`}
                className="block hover:underline"
              >
                Golden Hour
              </a>

            </div>
          </div>
        ))}

      </div>

    </div>
  );
}