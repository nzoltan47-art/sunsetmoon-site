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

      <div className="w-full max-w-5xl">
        <h2 className="text-xl font-semibold mb-6 text-center">
          Cities in {countryName}
        </h2>

        <div className="flex flex-wrap justify-center gap-3">
          {cities.slice(0, 100).map((city) => (
            <a
              key={city.slug}
              href={`/sunset/${city.slug}`}
              className="px-4 py-2 rounded-lg border border-white/10 bg-black/20 hover:bg-white/10 transition"
            >
              {city.name}
            </a>
          ))}
        </div>
      </div>

    </div>
  );
}