import { cities } from "@/lib/cities";

export default function Cities() {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  // ✅ SORT ALL CITIES (important for SEO + UX)
  const sortedCities = [...cities].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  return (
    <div className="min-h-screen text-white p-10 max-w-6xl mx-auto">

      <h1 className="text-4xl font-bold mb-6">
        Sunset, Moon & Golden Hour Times by City
      </h1>

      {/* Country navigation */}
      <h2 className="text-xl font-semibold mb-4 mt-6">
        Browse by Country
      </h2>

      <div className="flex flex-wrap gap-4 mb-10 text-sm text-white/70">
        <a href="/country/japan" className="hover:text-white">Japan</a>
        <a href="/country/united-states" className="hover:text-white">United States</a>
        <a href="/country/united-kingdom" className="hover:text-white">United Kingdom</a>
        <a href="/country/france" className="hover:text-white">France</a>
        <a href="/country/germany" className="hover:text-white">Germany</a>
        <a href="/country/italy" className="hover:text-white">Italy</a>
        <a href="/country/spain" className="hover:text-white">Spain</a>
        <a href="/country/canada" className="hover:text-white">Canada</a>
        <a href="/country/australia" className="hover:text-white">Australia</a>
        <a href="/country/india" className="hover:text-white">India</a>
      </div>

      {/* Alphabet navigation */}
      <div className="flex flex-wrap gap-3 mb-10 text-sm text-white/60">
        {alphabet.map((letter) => (
          <a
            key={letter}
            href={`#${letter}`}
            className="hover:text-white"
          >
            {letter}
          </a>
        ))}
      </div>

      {/* Alphabet sections */}
      {alphabet.map((letter) => {

        const filteredCities = sortedCities.filter((city) =>
          city.name.toUpperCase().startsWith(letter)
        );

        if (filteredCities.length === 0) return null;

        return (
          <section key={letter} id={letter} className="mb-14">

            <h2 className="text-3xl font-bold mb-6 border-b border-white/10 pb-2">
              {letter}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

              {filteredCities.map((city) => (

                <div
                  key={city.slug}
                  className="p-6 rounded-xl border border-white/10 bg-black/20 backdrop-blur"
                >

                  <h3 className="text-xl font-semibold mb-2">
                    {city.name}
                  </h3>

                  <p className="text-white/50 text-sm mb-4">
                    {city.country}
                  </p>

                  <div className="space-y-2">

                    <a
                      href={`/sunset/${city.slug}`}
                      className="block text-primary hover:underline"
                    >
                      {city.name} Sunset Time
                    </a>

                    <a
                      href={`/golden-hour/${city.slug}`}
                      className="block hover:underline"
                    >
                      {city.name} Golden Hour
                    </a>

                    <a
                      href={`/moon/${city.slug}`}
                      className="block hover:underline"
                    >
                      {city.name} Moon Phase
                    </a>

                  </div>

                </div>

              ))}

            </div>

          </section>
        );

      })}

    </div>
  );
}