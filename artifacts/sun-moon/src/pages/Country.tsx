import { useLocation } from "wouter";
import cities from "@/data/cities.json";

export default function Country() {
  const [location] = useLocation();
  const countrySlug = location.split("/")[2];

  const countryName = countrySlug
    .split("-")
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  const countryCities = cities.filter(
    city => city.country.toLowerCase().replace(/ /g, "-") === countrySlug
  );

  return (
    <div className="min-h-screen text-white p-10 max-w-6xl mx-auto">

      <h1 className="text-4xl font-bold mb-6">
        Sunset Times in {countryName}
      </h1>

      <p className="text-white/70 mb-10">
        Find sunset times, golden hour and moon phase information
        for cities across {countryName}.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">

        {countryCities.map(city => (
          <a
            key={city.slug}
            href={`/sunset/${city.slug}`}
            className="hover:underline"
          >
            Sunset in {city.name}
          </a>
        ))}

      </div>

    </div>
  );
}