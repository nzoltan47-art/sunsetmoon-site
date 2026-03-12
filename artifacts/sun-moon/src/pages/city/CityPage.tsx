import { useParams } from "react-router-dom";
import { useCitySearch } from "@/hooks/use-location";
import { SunDetailsCard } from "@/components/SunDetailsCard";
import { MoonDetailsCard } from "@/components/MoonDetailsCard";
import { Helmet } from "react-helmet";

export default function CityPage() {
  const { city } = useParams();

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

<Helmet>
  <title>Sunset Time in {location.name} Today</title>
  <meta
    name="description"
    content={`Check today's sunset, sunrise, golden hour and moon phase in ${location.name}.`}
  />
</Helmet>