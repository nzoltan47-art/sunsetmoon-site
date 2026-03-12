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
            key={city}
            className="bg-white/5 border border-white/10 rounded-xl p-4"
          >
            <div className="font-semibold capitalize mb-3 text-lg">
              {city.replace("-", " ")}
            </div>

            <div className="flex flex-col gap-2 text-sm">

              <a
                href={`/sunset/${city}`}
                className="text-white hover:text-primary"
              >
                Sunset Time
              </a>

              <a
                href={`/moon/${city}`}
                className="text-white hover:text-primary"
              >
                Moon Phase
              </a>

              <a
                href={`/golden-hour/${city}`}
                className="text-white hover:text-primary"
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