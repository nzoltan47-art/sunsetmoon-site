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
  { 
    slug: "golden-hour-bangkok-thailand", 
    title: "Golden Hour in Bangkok", 
    description: "Temples, river and rooftop views — Bangkok's golden hour spans 2,500 years of history.", 
    destination: "Thailand", 
    emoji: "🇹🇭" 
  },
  { 
    slug: "golden-hour-hong-kong", 
    title: "Golden Hour in Hong Kong", 
    description: "Victoria Peak, the harbour and hidden hillside trails — the best light in Asia's most vertical city.", 
    destination: "Hong Kong", 
    emoji: "🇭🇰" 
  },
  { 
    slug: "golden-hour-london-uk", 
    title: "Golden Hour in London", 
    description: "Tower Bridge, Hampstead Heath and the Thames at blue hour — London rewards the early riser.", 
    destination: "United Kingdom", 
    emoji: "🇬🇧" 
  },
  { 
    slug: "golden-hour-istanbul-turkey", 
    title: "Golden Hour in Istanbul", 
    description: "Minarets, the Bosphorus and two continents in one golden hour frame.", 
    destination: "Turkey", 
    emoji: "🇹🇷" 
  },
  { 
    slug: "golden-hour-dubai-uae", 
    title: "Golden Hour in Dubai", 
    description: "Desert dunes, the Burj Khalifa and the Gulf at dusk — Dubai's golden hour is extreme.", 
    destination: "UAE", 
    emoji: "🇦🇪" 
  },
  { 
    slug: "golden-hour-antalya-turkey", 
    title: "Golden Hour in Antalya", 
    description: "Ancient harbour, clifftop towers and the turquoise Mediterranean at sunset.", 
    destination: "Turkey", 
    emoji: "🇹🇷" 
  },
  { 
    slug: "golden-hour-paris-france", 
    title: "Golden Hour in Paris", 
    description: "The Eiffel Tower, the Seine and Montmartre — Paris was built for golden hour.", 
    destination: "France", 
    emoji: "🇫🇷" 
  },
  { 
    slug: "golden-hour-kuala-lumpur-malaysia", 
    title: "Golden Hour in Kuala Lumpur", 
    description: "Petronas Towers, Batu Caves and tropical storm sunsets over the city.", 
    destination: "Malaysia", 
    emoji: "🇲🇾" 
  },
  { 
    slug: "golden-hour-singapore", 
    title: "Golden Hour in Singapore", 
    description: "Supertrees, Marina Bay and equatorial storm light in the world's greenest city.", 
    destination: "Singapore", 
    emoji: "🇸🇬" 
  },
  { 
    slug: "golden-hour-seoul-south-korea", 
    title: "Golden Hour in Seoul", 
    description: "Ancient palaces, the Han River and mountain dawn light over Korea's capital.", 
    destination: "South Korea", 
    emoji: "🇰🇷" 
  },
  { 
    slug: "golden-hour-new-york-usa", 
    title: "Golden Hour in New York City", 
    description: "Brooklyn Bridge at dawn, Manhattanhenge and the skyline in warm light.", 
    destination: "USA", 
    emoji: "🇺🇸" 
  },
  { 
    slug: "golden-hour-barcelona-spain", 
    title: "Golden Hour in Barcelona", 
    description: "Bunkers del Carmel, Park Guell and Sagrada Familia — Barcelona's golden hour is late and spectacular.", 
    destination: "Spain", 
    emoji: "🇪🇸" 
  },
  { 
    slug: "golden-hour-amsterdam-netherlands", 
    title: "Golden Hour in Amsterdam", 
    description: "Canal reflections, tulip fields and the city's 17th century facades in morning mist.", 
    destination: "Netherlands", 
    emoji: "🇳🇱" 
  },
  { 
    slug: "golden-hour-milan-italy", 
    title: "Golden Hour in Milan", 
    description: "Duomo rooftop spires, Navigli canals and alpine fog photography in Italy's design capital.", 
    destination: "Italy", 
    emoji: "🇮🇹" 
  },
  { 
    slug: "golden-hour-osaka-japan", 
    title: "Golden Hour in Osaka", 
    description: "Dotonbori neon, Osaka Castle and Osaka Bay sunsets in Japan's most energetic city.", 
    destination: "Japan", 
    emoji: "🇯🇵" 
  },
  { 
    slug: "golden-hour-taipei-taiwan", 
    title: "Golden Hour in Taipei", 
    description: "Elephant Mountain, Jiufen lanterns and Taipei 101 at dusk.", 
    destination: "Taiwan", 
    emoji: "🇹🇼" 
  },
  { 
    slug: "golden-hour-rome-italy", 
    title: "Golden Hour in Rome", 
    description: "Seven hills, the Tiber and 2,000 years of architecture in golden light.", 
    destination: "Italy", 
    emoji: "🇮🇹" 
  },
  { 
    slug: "golden-hour-shanghai-china", 
    title: "Golden Hour in Shanghai", 
    description: "The Bund at blue hour, the river and the Pudong skyline — Shanghai's golden hour is world-class.", 
    destination: "China", 
    emoji: "🇨🇳" 
  },
  { 
    slug: "golden-hour-vienna-austria", 
    title: "Golden Hour in Vienna", 
    description: "Imperial palaces, vineyard hilltops and baroque boulevards in warm Austrian light.", 
    destination: "Austria", 
    emoji: "🇦🇹" 
  },
  { 
    slug: "golden-hour-prague-czech-republic", 
    title: "Golden Hour in Prague", 
    description: "Charles Bridge at dawn, red rooftops and medieval towers — Prague rewards early risers.", 
    destination: "Czech Republic", 
    emoji: "🇨🇿" 
  },
  { 
    slug: "golden-hour-miami-usa", 
    title: "Golden Hour in Miami", 
    description: "Art Deco pastel facades, Biscayne Bay and tropical storm sunsets over the Atlantic.", 
    destination: "USA", 
    emoji: "🇺🇸" 
  },
  { 
    slug: "golden-hour-los-angeles-usa", 
    title: "Golden Hour in Los Angeles", 
    description: "Griffith Observatory, Venice Beach and Point Dume — LA's legendary golden light.", 
    destination: "USA", 
    emoji: "🇺🇸" 
  },
  { 
    slug: "golden-hour-chennai-india", 
    title: "Golden Hour in Chennai", 
    description: "Marina Beach sunrise, ancient temples and the Bay of Bengal at dawn.", 
    destination: "India", 
    emoji: "🇮🇳" 
  },
  { 
    slug: "golden-hour-dublin-ireland", 
    title: "Golden Hour in Dublin", 
    description: "Ha'penny Bridge, Howth Head cliffs and Trinity College in Ireland's dramatic light.", 
    destination: "Ireland", 
    emoji: "🇮🇪" 
  },
  { 
    slug: "golden-hour-madrid-spain", 
    title: "Golden Hour in Madrid", 
    description: "Templo de Debod, Retiro Park and late Spanish golden hour over the Castilian plateau.", 
    destination: "Spain", 
    emoji: "🇪🇸" 
  },
  { 
    slug: "golden-hour-munich-germany", 
    title: "Golden Hour in Munich", 
    description: "Alpine views, baroque palaces and autumnal English Garden light in Bavaria's capital.", 
    destination: "Germany", 
    emoji: "🇩🇪" 
  },
  { 
    slug: "golden-hour-mumbai-india", 
    title: "Golden Hour in Mumbai", 
    description: "Marine Drive at dusk, the Gateway of India and the Arabian Sea at golden hour.", 
    destination: "India", 
    emoji: "🇮🇳" 
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
          <a
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