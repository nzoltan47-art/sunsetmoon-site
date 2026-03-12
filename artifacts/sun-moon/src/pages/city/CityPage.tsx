import { useLocation } from "wouter";
import { useCitySearch } from "@/hooks/use-location";

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

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white">
      <h1 className="text-4xl font-bold mb-8">
        Sunset & Moon Info for {cityData.name}
      </h1>

      <p className="text-lg opacity-80">Latitude: {cityData.latitude}</p>

      <p className="text-lg opacity-80">Longitude: {cityData.longitude}</p>
    </div>
  );
}
