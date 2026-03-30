import { getTopCountries } from "@/lib/getTopCountries";

export default function Countries() {
  const countries = getTopCountries();

  // 🔥 Top countries (first 12 for UX)
  const topCountries = countries.slice(0, 12);

  return (
    <div className="min-h-screen text-white px-4 py-16 flex flex-col items-center">

      <h1 className="text-4xl font-bold mb-6 text-center">
        Browse Countries
      </h1>

      <p className="text-white/70 max-w-2xl text-center mb-12">
        Explore sunset times, golden hour, and moon phases across countries worldwide.
      </p>

      {/* 🔥 TOP COUNTRIES */}
      <h2 className="text-2xl font-semibold mb-4">Popular Countries</h2>

      <div className="flex flex-wrap justify-center gap-3 max-w-4xl mb-12">
        {topCountries.map((country) => {
          const slug = country.toLowerCase().replace(/\s+/g, "-");

          return (
            <a
              key={slug}
              href={`/country/${slug}`}
              className="px-4 py-2 rounded-lg border border-white/10 bg-white/10 hover:bg-white/20 transition font-medium"
            >
              {country}
            </a>
          );
        })}
      </div>

      {/* 🌍 ALL COUNTRIES */}
      <h2 className="text-2xl font-semibold mb-4">All Countries</h2>

      <div className="flex flex-wrap justify-center gap-2 max-w-5xl">
        {countries.map((country) => {
          const slug = country.toLowerCase().replace(/\s+/g, "-");

          return (
            <a
              key={slug}
              href={`/country/${slug}`}
              className="px-3 py-1 rounded-md border border-white/10 bg-black/20 hover:bg-white/10 transition text-sm"
            >
              {country}
            </a>
          );
        })}
      </div>

    </div>
  );
}