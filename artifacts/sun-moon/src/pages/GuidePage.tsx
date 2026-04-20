import { useLocation } from "wouter";
import { useEffect } from "react";

type Section = {
  heading: string;
  body: string;
  citySlug?: string;
  pageType?: string;
};

type Guide = {
  title: string;
  destination: string;
  country: string;
  countrySlug: string;
  intro: string;
  sections: Section[];
  tip: string;
};

const guideContent: Record<string, Guide> = {
  "golden-hour-dubrovnik-croatia": {
    title: "Golden Hour in Dubrovnik, Croatia",
    destination: "Dubrovnik",
    country: "Croatia",
    countrySlug: "croatia",
    intro: "Dubrovnik is one of Europe's most photogenic cities — and at golden hour, the limestone walls, terracotta rooftops and Adriatic sea turn into something extraordinary. Here's exactly where to be and when.",
    sections: [
      {
        heading: "City walls from Srd Hill",
        body: "Take the cable car up Mount Srd in the last 90 minutes before sunset. The entire old city is laid out below you — walls, rooftops, the Adriatic and the islands of Lokrum and Elaphiti. This is the shot. Face southwest for the sun dropping toward the sea with the city below.",
        citySlug: "dubrovnik",
        pageType: "golden-hour"
      },
      {
        heading: "Lovrijenac Fortress",
        body: "The detached fortress west of the Pile Gate catches the last light of the day on its honey-coloured stone. Photograph from the rocks below at water level — the fortress towering above with the sun behind it creates dramatic silhouettes. Arrive 45 minutes before sunset.",
        citySlug: "dubrovnik",
        pageType: "sunset"
      },
      {
        heading: "Old Harbour at dawn",
        body: "Most tourists are asleep. The old harbour at dawn has the fishing boats, the Dominican monastery and the city walls in perfect stillness. The eastern orientation means first light hits the walls directly. Arrive 20 minutes before sunrise.",
        citySlug: "dubrovnik",
        pageType: "sunset"
      },
      {
        heading: "Buza Bar cliffside",
        body: "Carved into the southern city walls, this open-air bar sits on rocks directly above the Adriatic. It faces southwest — making it one of the best sunset-watching spots in the city. Go for the view first, the drink second.",
        citySlug: "dubrovnik",
        pageType: "golden-hour"
      }
    ],
    tip: "Dubrovnik's old city is extremely crowded from 10am to 5pm. All the best photography happens before 8am and after 6pm — plan your meals and sightseeing around the midday crowds and keep the golden hours for shooting."
  },
  "sunset-photography-dominican-republic": {
    title: "Sunset Photography in the Dominican Republic",
    destination: "Dominican Republic",
    country: "Dominican Republic",
    countrySlug: "dominican-republic",
    intro: "The Dominican Republic faces the Caribbean to the north and the Atlantic to the east — giving you spectacular sunset and sunrise options depending on which coast you're on. Here's where the best light is.",
    sections: [
      {
        heading: "Santo Domingo Malecon",
        body: "The capital's 6km seafront boulevard faces due west over the Caribbean. There's no obstruction between you and the horizon. Golden hour hits the colonial city buildings behind you while the sea turns gold in front. Walk westward from the Columbus Park end for the best compositions.",
        citySlug: "santo-domingo",
        pageType: "sunset"
      },
      {
        heading: "Punta Cana beach at sunrise",
        body: "The east coast faces the Atlantic — which means spectacular sunrises, not sunsets. Set your alarm for 30 minutes before dawn and walk to the water's edge. The beach is empty, the light is pink and the palms are silhouetted against the sky. This is the shot most visitors miss entirely.",
        citySlug: "punta-cana",
        pageType: "sunset"
      },
      {
        heading: "Samana Peninsula at dusk",
        body: "The north coast town of Samana faces northwest — giving you both sunset over the bay and the dramatic Los Haitises mountains behind you. The wooden pier extending into the bay is ideal for leading-line compositions at golden hour.",
        citySlug: "samana",
        pageType: "golden-hour"
      },
      {
        heading: "Altos de Chavon at golden hour",
        body: "This replica 16th century Mediterranean village sits on a cliff above the Chavon River near La Romana. The stone buildings glow warm amber at golden hour and the river far below catches the light. Arrive 1 hour before sunset for the best light on the stonework.",
        citySlug: "la-romana",
        pageType: "golden-hour"
      }
    ],
    tip: "The Dominican Republic has two distinct seasons — dry from December to April and wet from May to November. Dry season gives you the cleanest skies for sunset photography. During wet season, afternoon clouds can actually enhance sunsets dramatically with colour — but plan for unpredictability."
  },
  "golden-hour-amalfi-coast-italy": {
    title: "Golden Hour on the Amalfi Coast, Italy",
    destination: "Amalfi Coast",
    country: "Italy",
    countrySlug: "italy",
    intro: "The Amalfi Coast faces southwest — which means the evening golden hour is exceptional here. Cliffside villages, lemon groves, fishing boats and the Tyrrhenian Sea all turn gold together. Here are the best vantage points.",
    sections: [
      {
        heading: "Positano from the hillside path",
        body: "Walk up the Via Cristoforo Colombo above the village and find a clear viewpoint facing southwest over the cluster of pastel-coloured houses tumbling down to the sea. Golden hour here is genuinely breathtaking — the warm light saturates the pinks, yellows and oranges of the buildings. Arrive 1 hour before sunset to secure your spot.",
        citySlug: "positano",
        pageType: "golden-hour"
      },
      {
        heading: "Ravello Villa Cimbrone gardens",
        body: "The Belvedere of Infinity — a terrace with classical busts overlooking a 300m vertical drop to the sea — is one of the most dramatic viewpoints in Italy. It faces southwest. Golden hour from this terrace with the sea below is unforgettable. The garden closes at dusk so check times carefully.",
        citySlug: "ravello",
        pageType: "sunset"
      },
      {
        heading: "Atrani fishing village",
        body: "Atrani is Positano's quieter neighbour — a tiny fishing village with a small beach, colourful boats and a church square. Almost no tourists. The beach faces southwest and the church bell tower catches perfect golden light. A 10-minute walk from Amalfi town.",
        citySlug: "amalfi",
        pageType: "golden-hour"
      },
      {
        heading: "Furore fjord at sunrise",
        body: "The tiny Furore fjord faces east, making it a sunrise location. The pale rock walls reflect the pink dawn light onto the emerald water below. Arrive before 6am in summer for the full effect before the light climbs past the cliff tops.",
        citySlug: "amalfi",
        pageType: "sunset"
      }
    ],
    tip: "The Amalfi Coast in July and August is overwhelmingly crowded. If you can visit in May, June or September you will have the golden hour spots largely to yourself. The light in May and September is also lower and warmer — better for photography than the harsh summer midday sun."
  },
  "sunset-monaco-monte-carlo": {
    title: "Sunset and Golden Hour in Monaco",
    destination: "Monaco",
    country: "Monaco",
    countrySlug: "monaco",
    intro: "Monaco is tiny — 2km squared — but it's stacked vertically between the sea and the mountains, which creates extraordinary viewpoints. The principality faces south over the Mediterranean, giving you clean western sunsets over the sea. Here's where to be.",
    sections: [
      {
        heading: "The Rock — Prince's Palace viewpoint",
        body: "The medieval rock that Monaco's old town sits on rises 60m above the harbour. The western tip, near the Prince's Palace, looks directly out over the Mediterranean as the sun sets. This is Monaco's best sunset viewpoint — the harbour below with the casino district and mountains behind. During F1 weekend the harbour is packed with superyachts, making this shot iconic.",
        citySlug: "monaco",
        pageType: "sunset"
      },
      {
        heading: "Monaco Harbour from the F1 pit straight",
        body: "The waterfront boulevard beside the harbour — the actual F1 start/finish straight — faces south over the water. Golden hour from the harbour wall with the yachts, the Casino hill and the Rock above creates Monaco's most recognisable travel image. The light is warmest in the 30 minutes before sunset.",
        citySlug: "monaco",
        pageType: "golden-hour"
      },
      {
        heading: "Tete de Chien above La Turbie",
        body: "15 minutes above Monaco by road, the Tete de Chien ridge at 550m gives you the definitive aerial view of the entire principality — the harbour, the casino, the Rock and the sea all in one frame. Golden hour from here with Monaco below is one of the French Riviera's best photographs. Take the road from La Turbie.",
        citySlug: "monaco",
        pageType: "golden-hour"
      },
      {
        heading: "Exotic Garden cliff terrace",
        body: "Monaco's Jardin Exotique clings to a west-facing cliff above the old town. The combination of giant cacti and succulents against the backdrop of the sea and the setting sun is unlike anywhere else in the world. The garden closes at sunset — arrive 90 minutes before to enjoy both the garden and the golden light.",
        citySlug: "monaco",
        pageType: "sunset"
      }
    ],
    tip: "During the Monaco Grand Prix in late May, accommodation books out 18 months in advance and prices are extreme. But the city is electric. The best photography windows are Thursday evening qualifying walkabout and Sunday morning before the race — the circuit is accessible and the light is perfect. Outside race weekend, Monaco is surprisingly quiet and the viewpoints are yours alone."
  },
  "golden-hour-kyoto-japan": {
    title: "Golden Hour in Kyoto, Japan",
    destination: "Kyoto",
    country: "Japan",
    countrySlug: "japan",
    intro: "Kyoto is one of the world's great photography destinations — and unlike many cities, its best light is specifically at the golden hours. Ancient temples, bamboo groves and mountain backdrops all respond beautifully to low-angle light. The key is arriving before the crowds, which means early.",
    sections: [
      {
        heading: "Fushimi Inari torii gates at dawn",
        body: "The thousands of vermillion torii gates forming tunnels up the mountain are Kyoto's most iconic image — but most photos show them packed with tourists. Arrive at 5:30am in summer and you will have the lower gates almost entirely to yourself. Dawn light filters through the gates in shafts of gold.",
        citySlug: "kyoto",
        pageType: "sunset"
      },
      {
        heading: "Arashiyama bamboo grove at sunrise",
        body: "The bamboo grove is completely magical at 6am when the soft diffused dawn light filters through the canopy. By 9am it's a traffic jam. Come at sunrise, walk through slowly, then continue to Tenryu-ji garden which opens at 8:30am — the garden's golden hour pond reflections are spectacular.",
        citySlug: "kyoto",
        pageType: "golden-hour"
      },
      {
        heading: "Kiyomizudera temple at dusk",
        body: "The wooden stage of Kiyomizudera faces west over the city from a hillside — making it a natural sunset viewpoint. The three-storey pagoda to the north catches golden light perfectly. Arrive 90 minutes before sunset to walk the hillside path in good light, then position yourself on the stage for the last 30 minutes before dusk.",
        citySlug: "kyoto",
        pageType: "sunset"
      },
      {
        heading: "Philosopher's Path in cherry blossom season",
        body: "The canal-side path lined with cherry trees runs between Ginkaku-ji and Nanzen-ji temples. At golden hour in late March and early April, the blossoms glow pink against the low sun. Dawn here before 6:30am means soft light, reflections in the canal and almost no other people.",
        citySlug: "kyoto",
        pageType: "golden-hour"
      }
    ],
    tip: "Kyoto's temples enforce strict entry times and many close by 5pm. The solution is focusing on outdoor locations for evening golden hour and saving temple interiors for midday. Dawn is universally unrestricted and consistently the best light of the day."
  }
};

export default function GuidePage() {
  const [location] = useLocation();
  const parts = location.split("/").filter(Boolean);
  const slug = parts[1];
  const guide = guideContent[slug];

  useEffect(() => {
    if (!guide) return;
    document.title = `${guide.title} — Luminary`;
    const meta = document.querySelector("meta[name='description']");
    if (meta) meta.setAttribute("content", guide.intro);
    let canonical = document.querySelector("link[rel='canonical']");
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", `https://sunsetmoon.today/guide/${slug}`);
  }, [slug, guide]);

  if (!guide) {
    return <div className="text-white text-center mt-20">Guide not found</div>;
  }

  return (
    <div className="min-h-screen text-white px-4 py-16 flex flex-col items-center">
      <div className="text-sm text-white/40 mb-6">
        <a href="/" className="hover:text-white">Home</a>
        {" / "}
        <a href="/guides" className="hover:text-white">Guides</a>
        {" / "}
        <span className="text-white/70">{guide.destination}</span>
      </div>

      <h1 className="text-4xl font-bold text-center mb-6 max-w-3xl">
        {guide.title}
      </h1>

      <p className="text-white/70 max-w-2xl text-center leading-relaxed mb-12">
        {guide.intro}
      </p>

      <div className="w-full max-w-2xl flex flex-col gap-10">
        {guide.sections.map((section, i) => (
          <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-7">
            <h2 className="text-xl font-semibold mb-3 text-amber-300">
              {section.heading}
            </h2>
            <p className="text-white/70 leading-relaxed mb-4">
              {section.body}
            </p>
            {section.citySlug && section.pageType && (
              <a
                href={`/${section.pageType}/${section.citySlug}`}
                className="text-sm text-white/40 hover:text-amber-300 transition underline"
              >
                Check today's {section.pageType === "golden-hour" ? "golden hour" : "sunset"} time in {section.heading.split(" ")[0]}
              </a>
            )}
          </div>
        ))}

        <div className="bg-amber-400/10 border border-amber-400/20 rounded-2xl p-7">
          <p className="text-amber-300 font-semibold mb-2">Photographer's tip</p>
          <p className="text-white/70 leading-relaxed">{guide.tip}</p>
        </div>

        <div className="text-center">
          <p className="text-white/40 text-sm mb-4">Explore {guide.country}</p>
          <a
            href={`/country/${guide.countrySlug}`}
            className="px-6 py-3 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 transition text-sm text-white"
          >
            Browse all cities in {guide.country}
          </a>
        </div>
      </div>
    </div>
  );
}
