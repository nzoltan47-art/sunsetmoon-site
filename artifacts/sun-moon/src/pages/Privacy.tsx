export default function Privacy() {
  return (
    <div className="min-h-screen text-white px-6 py-16 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>

      <p className="mb-4 text-white/80 leading-relaxed">
        Luminary respects your privacy. This website does not collect
        personally identifiable information from visitors.
      </p>

      <p className="mb-4 text-white/80 leading-relaxed">
        Basic analytics data may be collected to understand how the
        website is used and to improve the user experience.
      </p>

      <p className="mb-4 text-white/80 leading-relaxed">
        Location access may be requested through your browser if you
        choose to use the "Current Location" feature. This information
        is processed locally in your browser and is not stored by us.
      </p>

      <p className="text-white/80 leading-relaxed">
        Third-party services such as advertising networks may use cookies
        or similar technologies to serve relevant ads.
      </p>
    </div>
  );
}