import { getTopCountries } from "@/lib/getTopCountries";

export default function Countries() {
  const rawCountries = getTopCountries();

  // ✅ FULL SAFE NORMALIZATION
  const countries = rawCountries
    .map((c: any) => {
      if (typeof c === "string") return c;

      if (c && typeof c === "object" && typeof c.country === "string") {
        return c.country;
      }

      return null; // ❗ invalid value
    })
    .filter((c: any): c is string => typeof c === "string");

  return (
    <div className="min-h-screen text-white px-4 py-16 flex flex-col items-center">

      <h1 className="text-4xl font-bold mb-6 text-center">
        Browse Countries
      </h1>

      <p className="text-white/70 max-w-2xl text-center mb-10">
        Explore sunset times, golden hour, and moon phases across countries worldwide.
        Select a country below to view detailed city-level astronomical data.
      </p>

      <div className="flex flex-wrap justify-center gap-3 max-w-4xl">
        {countries.map((country) => {
          const slug = country.toLowerCase().replace(/\s+/g, "-");

          return (
            <a
              key={slug}
              href={`/country/${slug}`}
              className="px-4 py-2 rounded-lg border border-white/10 bg-black/20 hover:bg-white/10 transition"
            >
              {country}
            </a>
          );
        })}
      </div>

    </div>
  );
}