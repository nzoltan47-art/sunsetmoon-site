import { cities } from "@/lib/cities";

export default function Cities() {
  return (
    <div className="min-h-screen text-white p-10">
      <h1 className="text-4xl font-bold mb-10">Sunset Times by City</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {cities.map((city) => (
          <a
            key={city}
            href={`/sunset/${city}`}
            className="hover:underline"
          >
            Sunset in {city.replace("-", " ")}
          </a>
        ))}
      </div>
    </div>
  );
}