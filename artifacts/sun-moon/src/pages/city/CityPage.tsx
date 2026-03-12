import { useRoute } from "wouter";
import { useCitySearch } from "@/hooks/use-location";
import { SunDetailsCard } from "@/components/SunDetailsCard";
import { MoonDetailsCard } from "@/components/MoonDetailsCard";

export default function CityPage() {
  const [, params] = useRoute("/sunset/:city");
  const city = params?.city;

  const { data } = useCitySearch(city || "");

  if (!data || data.length === 0) return <div>City not found</div>;

  const location = data[0];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-8">
        Sunset and Moon Info for {location.name}
      </h1>

      <SunDetailsCard location={location} />
      <MoonDetailsCard location={location} />
    </div>
  );
}
