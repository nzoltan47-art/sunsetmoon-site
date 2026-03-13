import { cities } from "@/lib/cities";

export default function Cities() {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  // Prevent rendering all 17k cities on the page
  const displayCities = cities.slice(0, 3000);

  return (
    <div className="min-h-screen text-white p-10 max-w-6xl mx-auto">

      <h1 className="text-4xl font-bold mb-6">
        Sunset, Moon & Golden Hour Times by City
      </h1>

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

        const filteredCities = displayCities.filter((city) =>
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

                  <h3 className="text-xl font-semibold mb-4">
                    {city.name}
                  </h3>

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

          </section>
        );

      })}

    </div>
  );
}