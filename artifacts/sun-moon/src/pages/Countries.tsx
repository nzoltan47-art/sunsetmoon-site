import { getTopCountries } from "@/lib/getTopCountries";

export default function Countries() {
  const countries = getTopCountries();

  // 🔥 Top countries (first 12)
  const topCountries = countries.slice(0, 12);

  // 🌍 Group countries by first letter
  const groupedCountries: Record<string, string[]> = {};

  countries.forEach((country) => {
    const letter = country.charAt(0).toUpperCase();

    if (!groupedCountries[letter]) {
      groupedCountries[letter] = [];
    }

    groupedCountries[letter].push(country);
  });

  const sortedLetters = Object.keys(groupedCountries).sort();

  return (
    <div className="min-h-screen text-white px-4 py-16 flex flex-col items-center">

      <h1 className="text-4xl font-bold mb-6 text-center">
        Browse Countries
      </h1>

      <p className="text-white/70 max-w-2xl text-center mb-12">
        Explore sunset times, golden hour, and moon phases across countries worldwide.
      </p>

      {/* 🔥 POPULAR */}
      <h2 className="text-2xl font-semibold mb-4">Popular Countries</h2>

      <div className="flex flex-wrap justify-center gap-3 max-w-4xl mb-16">
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
      <h2 className="text-2xl font-semibold mb-8">All Countries</h2>

      <div className="w-full max-w-5xl space-y-8">

        {sortedLetters.map((letter) => (
          <div key={letter}>

            {/* Letter heading */}
            <h3 className="text-xl font-bold mb-3 text-primary">
              {letter}
            </h3>

            {/* Countries under letter */}
            <div className="flex flex-wrap gap-2">
              {groupedCountries[letter].map((country) => {
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
        ))}

      </div>

    </div>
  );
}