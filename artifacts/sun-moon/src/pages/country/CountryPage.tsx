import { useLocation } from "wouter";
import { useEffect } from "react";
import { getCitiesByCountry } from "@/lib/getCitiesByCountry";

export default function CountryPage() {
  const [location] = useLocation();

  const parts = location.split("/").filter(Boolean);
  const countrySlug = parts[1];

  if (!countrySlug) {
    return <div className="text-white text-center mt-20">Invalid URL</div>;
  }

  const countryName = countrySlug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  const cities = getCitiesByCountry(countryName);

  if (!cities.length) {
    return <div className="text-white text-center mt-20">No cities found</div>;
  }

  // SEO
  const title = `Sunset Times in ${countryName} – Cities, Golden Hour & Moon Phases`;

  const description = `Explore sunset times, sunrise, golden hour, and moon phases across cities in ${countryName}. Compare locations and plan your day with accurate astronomical data.`;

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
    <div className="min-h-screen text-white px-4 py-16 flex flex-col items-center">

      <h1 className="text-4xl font-bold text-center mb-6">
        Sunset Times in {countryName}
      </h1>

      <p className="text-white/70 max-w-3xl text-center leading-relaxed mb-10">
        Sunset times in {countryName} vary throughout the year due to seasonal daylight changes.
        During summer, days are longer and sunsets occur later, while winter brings earlier sunsets.
        Golden hour provides warm natural lighting, ideal for photography and outdoor activities.
        Explore cities below to find accurate sunset, sunrise, and moon phase data.
      </p>

      <p className="text-white/50 text-sm text-center max-w-2xl">
        Click on any city to view detailed sunset times, golden hour, and moon phase information.
      </p>

      <div className="w-full max-w-5xl">
        <h2 className="text-xl font-semibold mb-6 text-center">
          Explore Cities in {countryName}
        </h2>

        <div className="flex flex-wrap justify-center gap-3">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">

            {/* SUNSET COLUMN */}
            <div>
              <h3 className="text-lg font-semibold text-center mb-4">
                Sunset Times
              </h3>

              <div className="flex flex-col gap-2 items-center max-h-[600px] overflow-y-auto">
                {cities.slice(0, 100).map((city) => (
                  <a
                    key={`sunset-${city.slug}`}
                    href={`/sunset/${city.slug}`}
                    className="px-4 py-2 rounded-lg border border-white/10 bg-black/20 hover:bg-white/10 transition w-full text-center"
                  >
                    {city.name} Sunset
                  </a>
                ))}
              </div>
            </div>

            {/* GOLDEN HOUR COLUMN */}
            <div>
              <h3 className="text-lg font-semibold text-center mb-4">
                Golden Hour
              </h3>

              <div className="flex flex-col gap-2 items-center max-h-[600px] overflow-y-auto">
                {cities.slice(0, 100).map((city) => (
                  <a
                    key={`golden-${city.slug}`}
                    href={`/golden-hour/${city.slug}`}
                    className="px-4 py-2 rounded-lg border border-white/10 bg-black/10 hover:bg-white/10 transition w-full text-center"
                  >
                    {city.name} Golden Hour
                  </a>
                ))}
              </div>
            </div>

            {/* MOON PHASE COLUMN */}
            <div>
              <h3 className="text-lg font-semibold text-center mb-4">
                Moon Phases
              </h3>

              <div className="flex flex-col gap-2 items-center max-h-[600px] overflow-y-auto">
                {cities.slice(0, 100).map((city) => (
                  <a
                    key={`moon-${city.slug}`}
                    href={`/moon/${city.slug}`}
                    className="px-4 py-2 rounded-lg border border-white/10 bg-black/10 hover:bg-white/10 transition w-full text-center"
                  >
                    {city.name} Moon Phase
                  </a>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}