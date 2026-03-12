import { useLocation } from "wouter";
import { useCitySearch } from "@/hooks/use-location";
import { SunDetailsCard } from "@/components/SunDetailsCard";
import { MoonDetailsCard } from "@/components/MoonDetailsCard";
import { useAstroData } from "@/hooks/use-astro";

export default function CityPage() {
  const [location] = useLocation();

  const citySlug = location.split("/")[2];
  const city = citySlug?.replace("-", " ");

  const { data, isLoading } = useCitySearch(city || "");

  if (!city) {
    return <div className="text-white text-center mt-20">City not found</div>;
  }

  if (isLoading) {
    return <div className="text-white text-center mt-20">Loading...</div>;
  }

  if (!data || data.length === 0) {
    return <div className="text-white text-center mt-20">City not found</div>;
  }

  const cityData = data[0];

  const astroData = useAstroData(cityData.latitude, cityData.longitude, new Date());

  document.title = `Sunset Time in ${cityData.name} Today`;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white gap-10 px-4">

      <h1 className="text-4xl font-bold text-center">
        Sunset & Moon Info for {cityData.name}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        <SunDetailsCard data={astroData} />
        <MoonDetailsCard data={astroData} />
      </div>

      <div className="text-sm text-white/60 text-center">
        Popular sunset cities:
        <div className="flex gap-4 mt-3 justify-center flex-wrap">
          <a href="/sunset/london" className="text-white hover:text-primary">London</a>
          <a href="/sunset/paris" className="text-white hover:text-primary">Paris</a>
          <a href="/sunset/new-york" className="text-white hover:text-primary">New York</a>
          <a href="/sunset/tokyo" className="text-white hover:text-primary">Tokyo</a>
          <a href="/sunset/los-angeles" className="text-white hover:text-primary">Los Angeles</a>
        </div>
      </div>

    </div>
  );
}
