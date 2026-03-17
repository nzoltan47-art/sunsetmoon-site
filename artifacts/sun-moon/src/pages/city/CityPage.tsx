import { useLocation } from "wouter";
import { useCitySearch } from "@/hooks/use-location";
import { useAstroData } from "@/hooks/use-astro";
import { SunDetailsCard } from "@/components/SunDetailsCard";
import { MoonDetailsCard } from "@/components/MoonDetailsCard";
import { useEffect } from "react";
import { generateDescription } from "@/lib/generateDescription";

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

  // 👇 Move astro logic into separate component
  return (
    <CityContent
      cityData={cityData}
      pageType={pageType}
      citySlug={citySlug}
    />
  );
}

function CityContent({ cityData, pageType, citySlug }: any) {
  // ✅ stable date
  const today = new Date();
  today.setHours(12, 0, 0, 0);

  // ✅ NOW this hook is safe
  const astroData = useAstroData(
    cityData.latitude,
    cityData.longitude,
    today
  );

  if (!astroData) {
    return <div className="text-white text-center mt-20">Loading...</div>;
  }

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

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white gap-10 px-4">

      <h1 className="text-4xl font-bold text-center capitalize">
        {pageType.replace("-", " ")} in {cityData.name} Today
      </h1>

      <p className="text-white/70 max-w-2xl text-center">
        {description}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        <SunDetailsCard data={astroData} />
        <MoonDetailsCard data={astroData} />
      </div>

    </div>
  );
}