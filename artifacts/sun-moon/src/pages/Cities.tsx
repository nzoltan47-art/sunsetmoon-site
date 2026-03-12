import { cities } from "@/lib/cities";

export default function Cities() {
  return (
    <div className="min-h-screen text-white p-10">

      <h1 className="text-4xl font-bold mb-10">
        Sunset, Moon & Golden Hour Times by City
      </h1>

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