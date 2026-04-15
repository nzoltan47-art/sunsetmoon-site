import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";
import { find } from "geo-tz";

const citiesPath = resolve(process.cwd(), "artifacts/sun-moon/src/data/cities.json");

const cities = JSON.parse(readFileSync(citiesPath, "utf-8"));

const updated = cities.map((city, i) => {
  const zones = find(city.lat, city.lon);
  const timezone = zones[0] ?? "UTC";
  if (i % 100 === 0) {
    console.log(`[${i}/${cities.length}] ${city.name} → ${timezone}`);
  }
  return { ...city, timezone };
});

writeFileSync(citiesPath, JSON.stringify(updated, null, 2), "utf-8");
console.log(`Done. Wrote ${updated.length} cities to ${citiesPath}`);
