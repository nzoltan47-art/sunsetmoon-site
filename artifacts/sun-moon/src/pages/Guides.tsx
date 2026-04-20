import { useEffect } from "react";

const guides = [
  {
    slug: "golden-hour-dubrovnik-croatia",
    title: "Golden Hour in Dubrovnik, Croatia",
    description: "The best spots to photograph Dubrovnik's old city walls, terracotta rooftops and Adriatic coastline at golden hour and sunset.",
    destination: "Croatia",
    emoji: "🇭🇷"
  },
  {
    slug: "sunset-photography-dominican-republic",
    title: "Sunset Photography in the Dominican Republic",
    description: "From Punta Cana's beach resorts to Santo Domingo's colonial waterfront — the best golden hour locations across the DR.",
    destination: "Dominican Republic",
    emoji: "🇩🇴"
  },
  {
    slug: "golden-hour-amalfi-coast-italy",
    title: "Golden Hour on the Amalfi Coast, Italy",
    description: "Positano, Ravello and Atrani — where to stand, when to arrive, and what to expect from Italy's most dramatic coastline at sunset.",
    destination: "Italy",
    emoji: "🇮🇹"
  },
  {
    slug: "sunset-monaco-monte-carlo",
    title: "Sunset & Golden Hour in Monaco",
    description: "The most beautiful viewpoints in Monaco for photographers — from the Prince's Palace rock to the harbour during F1 weekend.",
    destination: "Monaco",
    emoji: "🇲🇨"
  },
  {
    slug: "golden-hour-kyoto-japan",
    title: "Golden Hour in Kyoto, Japan",
    description: "Fushimi Inari at dawn, Arashiyama bamboo at sunrise, Kiyomizudera at dusk — the complete golden hour guide to Japan's most photogenic city.",
    destination: "Japan",
    emoji: "🇯🇵"
  },
];

export default function Guides() {
  useEffect(() => {
    document.title = "Photography & Golden Hour Travel Guides — Luminary";
    let meta = document.querySelector("meta[name='description']");
    if (meta) meta.setAttribute("content", "Golden hour and sunset photography guides for travelers. Dubrovnik, Amalfi Coast, Monaco, Dominican Republic, Kyoto and more.");
  }, []);

  return (
    <div className="min-h-screen text-white px-4 py-16 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-center mb-4">
        Golden Hour Travel Guides
      </h1>
      <p className="text-white/60 max-w-2xl text-center mb-12 leading-relaxed">
        Destination guides for photographers and travelers — exactly when and where to be for the perfect shot.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        {guides.map((guide) => (

            key={guide.slug}
            href={`/guide/${guide.slug}`}
            className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition group"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">{guide.emoji}</span>
              <span className="text-white/40 text-sm">{guide.destination}</span>
            </div>
            <h2 className="text-lg font-semibold text-white mb-2 group-hover:text-amber-300 transition">
              {guide.title}
            </h2>
            <p className="text-white/50 text-sm leading-relaxed">
              {guide.description}
            </p>
          </a>
        ))}
      </div>
    </div>
  );
}