import { useLocation } from "wouter";
import { useCitySearch } from "@/hooks/use-location";
import { SunDetailsCard } from "@/components/SunDetailsCard";
import { MoonDetailsCard } from "@/components/MoonDetailsCard";
import { useAstroData } from "@/hooks/use-astro";

export default function CityPage() {
  const [location] = useLocation();

  const pathParts = location.split("/");
  const pageType = pathParts[1];
  const citySlug = pathParts[2];

  // convert slug → readable city
  const city = citySlug?.split("-").join(" ");

  const formattedCity = city
    ?.split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  // city search
  const { data, isLoading } = useCitySearch(formattedCity || "");

  const cityData = data?.[0];

  // astro calculations
  const astroData = useAstroData(
    cityData?.latitude,
    cityData?.longitude,
    new Date(),
  );

  // safe loading states
  if (!city) {
    return <div className="text-white text-center mt-20">City not found</div>;
  }

  if (isLoading) {
    return <div className="text-white text-center mt-20">Loading...</div>;
  }

  if (!cityData) {
    return <div className="text-white text-center mt-20">City not found</div>;
  }

  if (!astroData) {
    return <div className="text-white text-center mt-20">Loading...</div>;
  }

  // SEO titles
  let title = "";

  if (pageType === "sunset") {
    title = `Sunset Time in ${cityData.name} Today (Golden Hour, Sunrise & Moon Phase)`;
  }

  if (pageType === "moon") {
    title = `Moon Phase in ${cityData.name} Today (Moonrise & Moonset)`;
  }

  if (pageType === "golden-hour") {
    title = `Golden Hour in ${cityData.name} Today (Sunrise & Sunset Times)`;
  }

  document.title = title;

  const meta = document.querySelector('meta[name="description"]');

  if (meta) {
    meta.setAttribute(
      "content",
      `Check today's sunset time, golden hour, sunrise and moon phase in ${cityData.name}.`,
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white gap-10 px-4">
      <h1 className="text-4xl font-bold text-center capitalize">
        {pageType.replace("-", " ")} in {cityData.name} Today
      </h1>

      <p className="text-sm text-white/60 text-center">
        Part of{" "}
        <a
          href={`/country/${cityData.country.toLowerCase().replace(/ /g, "-")}`}
          className="hover:underline"
        >
          {cityData.country}
        </a>
      </p>

      <p className="text-white/70 max-w-2xl text-center leading-relaxed">
        The sunset time in {cityData.name} today is{" "}
        {astroData.sun.sunset.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
        . Sunrise occurs at{" "}
        {astroData.sun.sunrise.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
        and golden hour begins at{" "}
        {astroData.sun.goldenHour.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
        . The current moon phase is {astroData.moon.phaseName}.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        <SunDetailsCard data={astroData} />
        <MoonDetailsCard data={astroData} />
      </div>

      <div className="text-sm text-white/60 text-center">
        Popular sunset cities:
        <div className="flex gap-4 mt-3 justify-center flex-wrap">
          <a href="/sunset/london" className="text-white hover:text-primary">
            London
          </a>

          <a href="/sunset/paris" className="text-white hover:text-primary">
            Paris
          </a>

          <a href="/sunset/new-york" className="text-white hover:text-primary">
            New York
          </a>

          <a href="/sunset/tokyo" className="text-white hover:text-primary">
            Tokyo
          </a>

          <a
            href="/sunset/los-angeles"
            className="text-white hover:text-primary"
          >
            Los Angeles
          </a>
        </div>
      </div>
    </div>
  );
}
