import { useLocation } from "wouter";
import { useCitySearch } from "@/hooks/use-location";
import { SunDetailsCard } from "@/components/SunDetailsCard";
import { MoonDetailsCard } from "@/components/MoonDetailsCard";
import { useAstroData } from "@/hooks/use-astro";
import { useEffect } from "react";
import { generateDescription } from "@/lib/generateDescription";

export default function CityPage() {
  const [location] = useLocation();

  // ✅ safer parsing
  const [, pageType, citySlug] = location.split("/");

  // ❗ guard early (prevents crashes)
  if (!pageType || !citySlug) {
    return <div className="text-white text-center mt-20">Invalid URL</div>;
  }

  const city = citySlug.split("-").join(" ");

  const formattedCity = city
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  const { data, isLoading } = useCitySearch(formattedCity);

  const cityData = data?.[0];

  const astroData = useAstroData(
    cityData?.latitude,
    cityData?.longitude,
    new Date()
  );

  // ✅ loading states
  if (isLoading) {
    return <div className="text-white text-center mt-20">Loading...</div>;
  }

  if (!cityData) {
    return <div className="text-white text-center mt-20">City not found</div>;
  }

  if (!astroData) {
    return <div className="text-white text-center mt-20">Loading...</div>;
  }

  // ✅ titles
  let title = "";

  if (pageType === "sunset") {
    title = `Sunset Time in ${cityData.name} Today (Golden Hour, Sunrise & Moon Phase)`;
  } else if (pageType === "moon") {
    title = `Moon Phase in ${cityData.name} Today (Moonrise & Moonset)`;
  } else if (pageType === "golden-hour") {
    title = `Golden Hour in ${cityData.name} Today (Sunrise & Sunset Times)`;
  } else {
    title = `${cityData.name} Astronomical Data`;
  }

  // ✅ SAFE description (fallback included)
  const description =
    generateDescription(
      cityData.name,
      cityData.country || "",
      pageType
    ) || `Sunset and moon information for ${cityData.name}.`;

  const canonicalUrl = `https://sunsetmoon.today/${pageType}/${citySlug}`;

  // ✅ SEO handling
  useEffect(() => {
    document.title = title;

    let meta = document.querySelector("meta[name='description']");
    if (meta) {
      meta.setAttribute("content", description);
    }

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

      <p className="text-sm text-white/60 text-center">
        Part of{" "}
        <a
          href={`/country/${cityData?.country?.toLowerCase().replace(/ /g, "-")}`}
          className="hover:underline"
        >
          {cityData?.country}
        </a>
      </p>

      {/* ✅ SEO TEXT (guaranteed non-empty) */}
      <p className="text-white/70 max-w-2xl text-center leading-relaxed">
        {description}
      </p>

      {/* ✅ DATA BLOCK */}
      <p className="text-white/60 text-center">
        Today in {cityData.name}: Sunset at{" "}
        {astroData.sun.sunset.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
        , Sunrise at{" "}
        {astroData.sun.sunrise.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
        .
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
          <a href="/sunset/los-angeles" className="text-white hover:text-primary">
            Los Angeles
          </a>
        </div>
      </div>

    </div>
  );
}