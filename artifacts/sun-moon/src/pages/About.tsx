export default function About() {
  return (
    <div className="min-h-screen text-white px-6 py-16 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">About Luminary</h1>

      <p className="mb-4 text-white/80 leading-relaxed">
        Luminary provides accurate astronomical information including
        sunset times, sunrise times, golden hour and moon phases for
        cities around the world.
      </p>

      <p className="mb-4 text-white/80 leading-relaxed">
        The calculations are powered by astronomical algorithms and
        location-based data to provide reliable daily solar and lunar
        events for photographers, travelers and sky enthusiasts.
      </p>

      <p className="text-white/80 leading-relaxed">
        Our mission is to make celestial timing information simple,
        beautiful and accessible anywhere in the world.
      </p>
    </div>
  );
}