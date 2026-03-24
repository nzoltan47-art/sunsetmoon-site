import { useLocation } from "wouter";
import { useCitySearch } from "@/hooks/use-location";
import { useAstroData } from "@/hooks/use-astro";
import { SunDetailsCard } from "@/components/SunDetailsCard";
import { MoonDetailsCard } from "@/components/MoonDetailsCard";
import { useEffect } from "react";
import { generateDescription } from "@/lib/generateDescription";
import { getNearbyCities } from "@/lib/getNearbyCities";

export default function CityPage() {
  const [location] = useLocation();

  const parts = location.split("/").filter(Boolean);
  const pageType = parts[0];
  const citySlug = parts[1];

  if (!pageType || !citySlug) {
    return <div className="text-white text-center mt-20">Invalid URL</div>;
  }

  const city = citySlug.split("-").join(" ");

  const formattedCity = city
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  const { data, isLoading } = useCitySearch(formattedCity);

  if (isLoading) {
    return <div className="text-white text-center mt-20">Loading...</div>;
  }

  const cityData = data?.[0];

  if (!cityData) {
    return <div className="text-white text-center mt-20">City not found</div>;
  }

  return (
    <CityContent
      cityData={cityData}
      pageType={pageType}
      citySlug={citySlug}
    />
  );
}

function CityContent({ cityData, pageType, citySlug }: any) {
  const today = new Date();
  today.setHours(12, 0, 0, 0);

  const astroData = useAstroData(
    cityData.latitude,
    cityData.longitude,
    today
  );

  if (!astroData) {
    return <div className="text-white text-center mt-20">Loading...</div>;
  }

  const nearbyCities = getNearbyCities(cityData, 6);

  let title = "";

  if (pageType === "sunset") {
    title = `Sunset Time in ${cityData.name} Today`;
  } else if (pageType === "moon") {
    title = `Moon Phase in ${cityData.name} Today`;
  } else if (pageType === "golden-hour") {
    title = `Golden Hour in ${cityData.name} Today`;
  } else {
    title = `${cityData.name} Astronomical Data`;
  }

  let description = "";

  try {
    description = generateDescription(
      cityData.name,
      cityData.country || "",
      pageType
    );
  } catch {
    description = `Sunset and moon information for ${cityData.name}.`;
  }

  if (!description) {
    description = `Sunset and moon information for ${cityData.name}.`;
  }

  const canonicalUrl = `https://sunsetmoon.today/${pageType}/${citySlug}`;

  useEffect(() => {
    document.title = title;

    let meta = document.querySelector("meta[name='description']");
    if (meta) meta.setAttribute("content", description);

    let canonical = document.querySelector("link[rel='canonical']");
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }

    canonical.setAttribute("href", canonicalUrl);
  }, [title, description, canonicalUrl]);

  const countrySlug = cityData.country
    ?.toLowerCase()
    .replace(/ /g, "-");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white gap-10 px-4">

      {/* ✅ TITLE */}
      <h1 className="text-4xl font-bold text-center capitalize">
        {pageType.replace("-", " ")} in {cityData.name} Today
      </h1>

      {/* ✅ COUNTRY LINK (STEP 4) */}
      <p className="text-sm text-white/60 text-center">
        Part of{" "}
        <a
          href={`/country/${countrySlug}`}
          className="hover:underline"
        >
          {cityData.country}
        </a>
      </p>

      {/* ✅ SEO TEXT */}
      <p className="text-white/70 max-w-2xl text-center">
        {description}
      </p>

      {/* ✅ CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        <SunDetailsCard data={astroData} />
        <MoonDetailsCard data={astroData} />
      </div>

      {/* ✅ NEARBY CITIES */}
      <div className="w-full max-w-4xl mt-10">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Nearby Cities
        </h2>

        <div className="flex flex-wrap justify-center gap-3">
          {nearbyCities.map((city) => (
            <a
              key={city.slug}
              href={`/${pageType}/${city.slug}`}
              className="px-4 py-2 rounded-lg border border-white/10 bg-black/20 hover:bg-white/10 transition"
            >
              {city.name}
            </a>
          ))}
        </div>
      </div>

    </div>
  );
}