import { useLocation } from "wouter";
import { useCitySearch } from "@/hooks/use-location";
import { SunDetailsCard } from "@/components/SunDetailsCard";
import { MoonDetailsCard } from "@/components/MoonDetailsCard";

export default function CityPage() {
  const [location] = useLocation();

  const city = location.split("/")[2];

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

  document.title = `Sunset Time in ${cityData.name} Today`;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white gap-8">
      <h1 className="text-4xl font-bold text-center">
        Sunset & Moon Info for {cityData.name}
      </h1>

      <div className="flex flex-col gap-6 w-full max-w-3xl">
        <SunDetailsCard
          latitude={cityData.latitude}
          longitude={cityData.longitude}
        />

        <MoonDetailsCard
          latitude={cityData.latitude}
          longitude={cityData.longitude}
        />
      </div>
    </div>
  );
}
