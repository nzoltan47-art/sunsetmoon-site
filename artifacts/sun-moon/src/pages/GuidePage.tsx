import { useLocation } from "wouter";
import { useEffect } from "react";

const guideContent: Record<string, {
  title: string;
  destination: string;
  country: string;
  countrySlug: string;
  intro: string;
  sections: { heading: string; body: string; citySlug?: string; pageType?: string }[];
  tip: string;
}> = {
  "golden-hour-dubrovnik-croatia": {
    title: "Golden Hour in Dubrovnik, Croatia",
    destination: "Dubrovnik",
    country: "Croatia",
    countrySlug: "croatia",
    intro: "Dubrovnik is one of Europe's most photogenic cities — and at golden hour, the limestone walls, terracotta rooftops and Adriatic sea turn into something extraordinary. Here's exactly where to be and when.",
    sections: [
      {
        heading: "City walls from Srđ Hill",
        body: "Take the cable car up Mount Srđ in the last 90 minutes before sunset. The entire old city is laid out below you — walls, rooftops, the Adriatic and the islands of Lokrum and Elaphiti. This is the shot. Face southwest for the sun dropping toward the sea with the city below.",
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
        heading: "Buža Bar cliffside",
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
        heading: "Santo Domingo Malecón",
        body: "The capital's 6km seafront boulevard faces due west over the Caribbean. There's no obstruction between you and the horizon. Golden hour hits the colonial city buildings behind you while the sea turns gold in front. Walk westward from the Columbus Park end for the best compositions.",
        citySlug: "santo-domingo",
        pageType: "sunset"
      },
      {
        heading: "Punta Cana beach resorts",
        body: "The east coast faces the Atlantic — which means spectacular sunrises, not sunsets. Set your alarm for 30 minutes before dawn and walk to the water's edge. The beach is empty, the light is pink and the palms are silhouetted against the sky. This is the shot most visitors miss entirely.",
        citySlug: "punta-cana",
        pageType: "sunset"
      },
      {
        heading: "Samaná Peninsula at dusk",
        body: "The north coast town of Samaná faces northwest — giving you both sunset over the bay and the dramatic Los Haitises mountains behind you. The wooden pier extending into the bay is ideal for leading-line compositions at golden hour.",
        citySlug: "samana",
        pageType: "golden-hour"
      },
      {
        heading: "Altos de Chavón amphitheatre",
        body: "This replica 16th century Mediterranean village sits on a cliff above the Chavón River near La Romana. The stone buildings glow warm amber at golden hour and the river far below catches the light. Arrive 1 hour before sunset for the best light on the stonework.",
        citySlug: "la-romana",
        pageType: "golden-hour"
      }
    ],
    tip: "The Dominican Republic has two distinct seasons — dry (December to April) and wet (May to November). Dry season gives you the cleanest skies for sunset photography. During wet season, afternoon clouds can actually enhance sunsets dramatically with colour — but plan for unpredictability."
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
        body: "The tiny Furore fjord — a dramatic narrow inlet carved into the cliffs — faces east, making it a sunrise location. The pale rock walls reflect the pink dawn light onto the emerald water below. Arrive before 6am in summer for the full effect before the light climbs past the cliff tops.",
        citySlug: "amalfi",
        pageType: "sunset"
      }
    ],
    tip: "The Amalfi Coast in July and August is overwhelmingly crowded. If you can visit in May, June or September you'll have the golden hour spots largely to yourself. The light in May and September is also lower and warmer — better for photography than the harsh summer midday sun."
  },

  "sunset-monaco-monte-carlo": {
    title: "Sunset & Golden Hour in Monaco",
    destination: "Monaco",
    country: "Monaco",
    countrySlug: "monaco",
    intro: "Monaco is tiny — 2km² — but it's stacked vertically between the sea and the mountains, which creates extraordinary viewpoints. The principality faces south over the Mediterranean, giving you clean western sunsets over the sea. Here's where to be.",
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
        heading: "Tête de Chien above La Turbie",
        body: "15 minutes above Monaco by road, the Tête de Chien ridge at 550m gives you the definitive aerial view of the entire principality — the harbour, the casino, the Rock and the sea all in one frame. Golden hour from here with Monaco below is one of the French Riviera's best photographs. Take the road from La Turbie.",
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
    tip: "During the Monaco Grand Prix (typically late May), accommodation books out 18 months in advance and prices are extreme. But the city is electric. If you're there for F1, the best photography windows are Thursday evening qualifying walkabout and Sunday morning before the race — the circuit is accessible and the light is perfect. Outside race weekend, Monaco is surprisingly quiet and the viewpoints are yours alone."
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
        body: "The thousands of vermillion torii gates forming tunnels up the mountain are Kyoto's most iconic image — but most photos show them packed with tourists. Arrive at 5:30am in summer (before 6am year-round) and you will have the lower gates almost entirely to yourself. Dawn light filters through the gates in shafts of gold. The colour of the gates against the dark forest is extraordinary in this light.",
        citySlug: "kyoto",
        pageType: "sunset"
      },
      {
        heading: "Arashiyama bamboo grove at sunrise",
        body: "The bamboo grove is 10 minutes wide and completely magical at 6am when the soft diffused dawn light filters through the canopy. By 9am it's a traffic jam. Come at sunrise, walk through slowly, then continue to Tenryu-ji garden which opens at 8:30am — the garden's golden hour pond reflections are spectacular.",
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
        body: "The canal-side path lined with cherry trees runs between Ginkaku-ji and Nanzen-ji temples. At golden hour in late March and early April, the blossoms glow pink against the low sun. Dawn here before 6:30am means soft light, reflections in the canal and almost no other people. This is arguably Japan's most beautiful 30 minutes of light.",
        citySlug: "kyoto",
        pageType: "golden-hour"
      }
    ],
    tip: "Kyoto's temples enforce strict entry times and many close by 5pm — which cuts off evening golden hour access. The solution is focusing on outdoor locations for evening golden hour (Fushimi Inari, Arashiyama, Philosopher's Path) and saving temple interiors for midday. Dawn is universally unrestricted and consistently the best light of the day."
  },

  "golden-hour-bangkok-thailand": {
    title: "Golden Hour in Bangkok, Thailand",
    destination: "Bangkok",
    country: "Thailand",
    countrySlug: "thailand",
    intro: "Bangkok is one of Southeast Asia's most photogenic cities — temples rising from the river, golden spires catching the last light, and a skyline that transforms completely at dusk. Here's where to be and when.",
    sections: [
      {
        heading: "Wat Arun at sunrise",
        body: "The Temple of Dawn earns its name — photograph from the opposite bank of the Chao Phraya River as the first light hits the porcelain-encrusted spires. The river reflects the pink sky below. Take the first ferry across before 6am. By 8am the light is harsh and the tourist boats have arrived.",
        citySlug: "bangkok",
        pageType: "sunset"
      },
      {
        heading: "Mahanakhon Skywalk at dusk",
        body: "Bangkok's highest observation point has a glass floor section and open-air terrace — golden hour from 314m looking south over the river meanders and temple rooftops is extraordinary. The sky transitions through orange, purple and deep blue in the 40 minutes after sunset.",
        citySlug: "bangkok",
        pageType: "golden-hour"
      },
      {
        heading: "Lumpini Park lake at dawn",
        body: "The city's central park before 7am is a different world — rowing boats on still water, monitor lizards on the banks, and morning mist lingering over the lake. The surrounding skyscrapers catch early light while the park stays soft and green. Dawn here before the heat builds is one of Bangkok's hidden photography gems.",
        citySlug: "bangkok",
        pageType: "sunset"
      },
      {
        heading: "Iconsiam riverside at blue hour",
        body: "The new riverside mall on the Thonburi bank has a wide promenade facing east toward the old city. Blue hour from here gives you the illuminated Wat Arun and the city lights reflecting in the Chao Phraya simultaneously — one of the best new viewpoints in the city.",
        citySlug: "bangkok",
        pageType: "golden-hour"
      }
    ],
    tip: "Bangkok's famous golden spires are genuinely gold — they are covered in gold leaf, mirror tiles and coloured glass that catch and amplify low-angle light beautifully. Plan your shooting around temple locations and the river rather than the modern skyline for the most distinctive images."
  },

  "golden-hour-hong-kong": {
    title: "Golden Hour in Hong Kong",
    destination: "Hong Kong",
    country: "Hong Kong",
    countrySlug: "hong-kong",
    intro: "Hong Kong's harbour, hills and vertical cityscape create extraordinary conditions for golden hour photography. The city faces in multiple directions — meaning you can chase both sunrise and sunset from different elevated positions within minutes of each other.",
    sections: [
      {
        heading: "Victoria Peak at dusk",
        body: "The classic Hong Kong shot — take the Peak Tram in the last 90 minutes before sunset and position yourself on the viewing terrace facing north. As the sun drops behind the Kowloon hills, the harbour turns gold and the neon signage begins to glow at blue hour. Arrive early to secure the front rail.",
        citySlug: "hong-kong",
        pageType: "sunset"
      },
      {
        heading: "Tsim Sha Tsui waterfront at golden hour",
        body: "The Kowloon promenade faces south toward Hong Kong Island — golden hour from the Avenue of Stars gives you the full island skyline in warm light with the harbour in the foreground. The Symphony of Lights show starts at 8pm making blue hour here doubly rewarding.",
        citySlug: "hong-kong",
        pageType: "golden-hour"
      },
      {
        heading: "Lion Rock summit at dawn",
        body: "A challenging 90-minute hike rewarded with 360-degree views over both Kowloon and the New Territories — dawn from the ridge as the city wakes below you is transformative. Clear winter mornings in November through February give the best visibility. Start hiking by 5am.",
        citySlug: "hong-kong",
        pageType: "sunset"
      },
      {
        heading: "Lamma Island fishing village at sunset",
        body: "A 30-minute ferry from Central takes you to Yung Shue Wan — a fishing village facing west over the channel. Sunset from the waterfront with traditional fishing boats and the absence of skyscrapers gives you a completely different side of Hong Kong.",
        citySlug: "hong-kong",
        pageType: "golden-hour"
      }
    ],
    tip: "Hong Kong's best photography conditions are from October through January — lower humidity means clear skies and sharp visibility across the harbour. Summer months bring haze and typhoons. If you visit in summer, golden hour and blue hour shooting is your best strategy since the diffused hazy light actually softens the cityscape nicely."
  },

  "golden-hour-london-uk": {
    title: "Golden Hour in London",
    destination: "London",
    country: "United Kingdom",
    countrySlug: "united-kingdom",
    intro: "London's flat geography and wide river mean golden hour light travels far and hits famous landmarks from unexpected angles. The city rewards early risers — most iconic spots are deserted before 7am and the soft northern light is gentle and flattering year-round.",
    sections: [
      {
        heading: "Tower Bridge at blue hour",
        body: "The Thames bends at Tower Bridge giving both Gothic towers in one frame from the south bank. Blue hour when the bridge illuminates against the dark sky is world-class. For sunrise, position yourself on the north bank at Butler's Wharf facing west — the bridge catches first light on the stone towers beautifully.",
        citySlug: "london",
        pageType: "golden-hour"
      },
      {
        heading: "Parliament Hill on Hampstead Heath",
        body: "The elevated heath gives the best panoramic view south over the entire London skyline — the Shard, St Paul's and the City all visible in one frame. Golden hour from this vantage point as the low sun rakes across the rooftops is one of London's most underrated photography spots. Arrive 45 minutes before sunset.",
        citySlug: "london",
        pageType: "sunset"
      },
      {
        heading: "Greenwich Park at dawn",
        body: "The Royal Observatory lawn looks north over Canary Wharf and the City of London — dawn light on clear mornings reveals the full skyline through the frame of the park's ancient trees. The Cutty Sark in the foreground adds historical context. Arrive before 6am in summer.",
        citySlug: "london",
        pageType: "sunset"
      },
      {
        heading: "Waterloo Bridge at golden hour",
        body: "The best elevated river view in London — the bridge looks both east toward St Paul's and west toward the Houses of Parliament simultaneously. Golden hour from the middle of the bridge as the sun drops toward Westminster is one of the city's most spectacular views.",
        citySlug: "london",
        pageType: "golden-hour"
      }
    ],
    tip: "London's latitude means golden hour lasts much longer in summer — the sun takes over an hour to fully set in June and July, giving you an extended window of warm light. In winter the golden hour is short and intense but the low sun angle creates dramatic long shadows across the city's Georgian and Victorian architecture."
  },

  "golden-hour-istanbul-turkey": {
    title: "Golden Hour in Istanbul, Turkey",
    destination: "Istanbul",
    country: "Turkey",
    countrySlug: "turkey",
    intro: "Istanbul straddles two continents across the Bosphorus — and its minarets, domes and hillside neighbourhoods create one of the world's most dramatic golden hour landscapes. The city faces in every direction, meaning spectacular light is available at both sunrise and sunset.",
    sections: [
      {
        heading: "Galata Tower viewpoint at golden hour",
        body: "The medieval Genoese tower in the heart of Beyoglu has a balcony with 360-degree views. Golden hour over the Golden Horn and the old city skyline — Sultanahmet's minarets and domes silhouetted against the setting sun — is extraordinary. Book tickets in advance and arrive 90 minutes before sunset.",
        citySlug: "istanbul",
        pageType: "golden-hour"
      },
      {
        heading: "Suleymaniye Mosque courtyard at dusk",
        body: "Sinan's masterpiece sits on a hill above the Golden Horn facing south. The courtyard's ablution fountain and arched portico catch the last light of the day. Dusk here as the evening call to prayer sounds across the city — with the Bosphorus visible below — is one of the most atmospheric moments in travel photography.",
        citySlug: "istanbul",
        pageType: "sunset"
      },
      {
        heading: "Ortakoy mosque at blue hour",
        body: "The neo-baroque waterfront mosque at Ortakoy sits at the base of the suspension bridge with the Bosphorus on three sides. Blue hour when the bridge lights activate above the mosque is spectacular — one of Istanbul's most iconic images. Photograph from the small pier to the south.",
        citySlug: "istanbul",
        pageType: "golden-hour"
      },
      {
        heading: "Camlica Hill sunrise",
        body: "The highest point on the Asian side at 288m gives the definitive panoramic view of Istanbul — both the European and Asian shores of the Bosphorus visible simultaneously with the old city mosques in the distance. Dawn from the tea garden here before the city wakes is unforgettable.",
        citySlug: "istanbul",
        pageType: "sunset"
      }
    ],
    tip: "Istanbul's golden hour quality is exceptional in spring and autumn when the Bosphorus mist adds atmospheric depth to the distance. Ramadan evenings are particularly beautiful — the mosques are lit and the city comes alive after sunset creating extraordinary blue hour conditions with crowds and energy."
  },

  "golden-hour-dubai-uae": {
    title: "Golden Hour in Dubai",
    destination: "Dubai",
    country: "United Arab Emirates",
    countrySlug: "united-arab-emirates",
    intro: "Dubai's desert setting creates some of the most dramatic golden hour conditions on Earth — the low sun angle over sand and sea, the contrast between ancient dunes and futuristic towers, and the clear Gulf air that makes colours intensely saturated.",
    sections: [
      {
        heading: "Burj Khalifa base at dusk",
        body: "Stand at the base of the world's tallest building and shoot straight upward along the tapered facade as it changes colour from gold to deep purple. The Dubai Fountain begins at sunset adding water arcs to the foreground. The observation deck at level 124 or 148 gives the city-wide panorama — book well in advance for the sunset slot.",
        citySlug: "dubai",
        pageType: "sunset"
      },
      {
        heading: "Desert dunes at golden hour",
        body: "30 minutes outside the city, the Lahbab red dunes offer the classic Arabian desert photography experience. The low golden sun creates perfect shadow lines across the crescent dune faces — the contrast between deep shadow and lit sand is extraordinary. Book a desert safari that times the arrival for 90 minutes before sunset.",
        citySlug: "dubai",
        pageType: "golden-hour"
      },
      {
        heading: "Al Fahidi historical district at dusk",
        body: "The old wind-tower quarter of Dubai dates to the 1890s. Narrow lanes between mud-brick buildings with traditional wind towers catch the late afternoon light in deep warm tones. Blue hour here as the modern skyline glows behind the ancient architecture creates a fascinating temporal contrast.",
        citySlug: "dubai",
        pageType: "golden-hour"
      },
      {
        heading: "Palm Jumeirah crescent at sunset",
        body: "The western crescent of the Palm faces the open Gulf — sunset from the Atlantis hotel beach or the crescent boardwalk gives unobstructed western horizon views with the Dubai Marina skyline to the south catching golden light simultaneously.",
        citySlug: "dubai",
        pageType: "sunset"
      }
    ],
    tip: "Dubai's summer heat from June through September makes pre-dawn and post-sunset photography the only comfortable outdoor option. Winter months from November through March are ideal — warm days, cool evenings and exceptional air clarity. The haze of summer actually creates beautiful pastel sunset gradients despite the discomfort."
  },

  "golden-hour-antalya-turkey": {
    title: "Golden Hour in Antalya, Turkey",
    destination: "Antalya",
    country: "Turkey",
    countrySlug: "turkey",
    intro: "Antalya sits where the Taurus Mountains meet the turquoise Mediterranean — creating a landscape of dramatic cliffs, ancient ruins and glittering sea. The city faces southwest, making it one of the Mediterranean's finest sunset destinations.",
    sections: [
      {
        heading: "Kaleici old harbour at golden hour",
        body: "The ancient Roman harbour surrounded by Ottoman-era houses and the Hidirlik Tower is Antalya's most photogenic spot. Golden hour from the harbour wall looking southwest toward the open Mediterranean turns the limestone cliffs and terracotta rooftops deep amber. Arrive 1 hour before sunset.",
        citySlug: "antalya",
        pageType: "golden-hour"
      },
      {
        heading: "Hidirlik Tower cliff edge",
        body: "The 2nd century Roman tower sits on a cliff promontory at the edge of Kaleici with unobstructed views over the Gulf of Antalya. The sun sets directly over the sea from here in summer — one of Turkey's finest sunset viewpoints with the mountains behind you.",
        citySlug: "antalya",
        pageType: "sunset"
      },
      {
        heading: "Duden Waterfalls at dawn",
        body: "The upper Duden Falls cascade through a forested gorge north of the city. Dawn light filtering through the spray and the surrounding cypress trees before the tourist coaches arrive creates magical soft conditions. The lower falls drop directly into the Mediterranean from clifftops — dawn from the cliff edge is extraordinary.",
        citySlug: "antalya",
        pageType: "sunset"
      },
      {
        heading: "Lara Beach sunset",
        body: "The long sand beach east of the city faces southwest over the Gulf. Golden hour from the beach gives you the Taurus Mountains turning pink behind you while the sea ahead catches the orange light. The beach is quieter at the eastern end away from the resort hotels.",
        citySlug: "antalya",
        pageType: "golden-hour"
      }
    ],
    tip: "Antalya's golden hour is exceptional from April through October when the sun sets over the open sea rather than behind the mountains. The old harbour reflects the sunset colours in its sheltered water making it the best single location for maximising the golden light."
  },

  "golden-hour-paris-france": {
    title: "Golden Hour in Paris, France",
    destination: "Paris",
    country: "France",
    countrySlug: "france",
    intro: "Paris was built for golden hour — Haussmann's wide boulevards create long sight lines, the Seine reflects the sky, and the city's creamy limestone buildings turn a deep warm gold in low light. Few cities on Earth reward the early riser more generously.",
    sections: [
      {
        heading: "Trocadero plaza at morning golden hour",
        body: "The Eiffel Tower faces east from the Trocadero — morning golden hour light hits the iron lattice directly from the front. Position yourself on the upper Trocadero steps before 7am and you have the fountain, the plaza and the tower all in one frame with nobody in it. This is Paris's most iconic shot in its best possible light.",
        citySlug: "paris",
        pageType: "golden-hour"
      },
      {
        heading: "Montmartre Sacre-Coeur steps at dusk",
        body: "The white basilica crowns the highest hill in Paris facing south. Dusk from the steps below the church as the city stretches out and the lights begin to emerge is breathtaking. The steps are crowded at sunset — arrive at blue hour when most tourists have left for dinner for the best compositions.",
        citySlug: "paris",
        pageType: "sunset"
      },
      {
        heading: "Seine riverbanks at blue hour",
        body: "Pont Alexandre III with its gilded Art Nouveau statues and the Grand Palais dome beyond is Paris's most ornate bridge. Blue hour when the bridge lamps illuminate and the golden statues glow against the dark sky is one of the finest photographs in Europe. Shoot from the riverbank below looking up at the bridge.",
        citySlug: "paris",
        pageType: "golden-hour"
      },
      {
        heading: "Eiffel Tower from Champ de Mars at sunset",
        body: "The long park stretching southeast from the tower gives a classic low perspective. Sunset behind the tower creates a strong silhouette — but golden hour from the northwest side lights the ironwork from behind and to the side giving much more texture and depth than the standard frontal shot.",
        citySlug: "paris",
        pageType: "sunset"
      }
    ],
    tip: "The Eiffel Tower sparkles for 5 minutes on every hour after dark — blue hour with the sparkling tower is Paris's most requested photography moment. Position yourself at the Trocadero or Pont d'Iena 10 minutes before the hour for the full sequence of sunset, blue hour and sparkle in one session."
  },

  "golden-hour-kuala-lumpur-malaysia": {
    title: "Golden Hour in Kuala Lumpur, Malaysia",
    destination: "Kuala Lumpur",
    country: "Malaysia",
    countrySlug: "malaysia",
    intro: "Kuala Lumpur's skyline is dominated by the twin Petronas Towers — and the city's surrounding hills and tropical vegetation create lush framing for golden hour photography. The equatorial location means consistent golden hour times year-round.",
    sections: [
      {
        heading: "KLCC Park lake at blue hour",
        body: "The park lake directly in front of the Petronas Towers is the classic KL shot — blue hour when the towers illuminate and reflect in the still water is world-class. Arrive 30 minutes before sunset to catch the golden transition then stay for the full blue hour reflection. The fountain show adds foreground movement.",
        citySlug: "kuala-lumpur",
        pageType: "golden-hour"
      },
      {
        heading: "Batu Caves at dawn",
        body: "The 272 rainbow-painted steps leading to the Hindu cave temple are best at dawn before 7am. Early morning light streams through the cave mouth onto the 42m gold statue below. The surrounding limestone karst hills catch pink dawn light. Arrive before the morning temple crowds.",
        citySlug: "kuala-lumpur",
        pageType: "sunset"
      },
      {
        heading: "Bukit Ampang viewpoint",
        body: "The hilltop east of the city gives the best elevated golden hour panorama over the entire KL skyline with the Petronas Towers as the centrepiece. The viewpoint is easily accessible and less crowded than the city observation decks. Arrive 1 hour before sunset.",
        citySlug: "kuala-lumpur",
        pageType: "golden-hour"
      },
      {
        heading: "Perdana Botanical Garden at sunrise",
        body: "KL's central botanical garden faces east with the city skyline visible through the tropical tree canopy. Dawn light through the rainforest vegetation before the heat builds creates beautiful soft conditions for nature and landscape photography simultaneously.",
        citySlug: "kuala-lumpur",
        pageType: "sunset"
      }
    ],
    tip: "KL's equatorial climate means afternoon thunderstorms are common — especially from April through October. These often clear by late afternoon leaving spectacular cloud formations that dramatically enhance sunset photography. The post-storm light with dark clouds and golden sun breaks is some of the most dramatic available."
  },

  "golden-hour-singapore": {
    title: "Golden Hour in Singapore",
    destination: "Singapore",
    country: "Singapore",
    countrySlug: "singapore",
    intro: "Singapore is a city-state of extraordinary contrasts — colonial heritage, futuristic supertrees, tropical jungle and a gleaming harbour all within a few square kilometres. The equatorial setting means consistent golden hour and frequent dramatic storm-lit sunsets.",
    sections: [
      {
        heading: "Marina Bay Sands observation deck",
        body: "The SkyPark observation deck at 200m gives a 360-degree view over the bay, the city and the Strait of Singapore. Golden hour from the north-facing deck looking toward the colonial district and Fort Canning Hill is exceptional. Book the last entry slot of the day for the full sunset and blue hour sequence.",
        citySlug: "singapore",
        pageType: "golden-hour"
      },
      {
        heading: "Gardens by the Bay at dusk",
        body: "The 50m Supertrees are extraordinary at blue hour — the vertical gardens light up in changing colours against the darkening tropical sky. Position yourself in the grove between the trees looking up at golden hour then pull back for the wider view as blue hour begins. The OCBC Skyway bridge gives an elevated perspective.",
        citySlug: "singapore",
        pageType: "sunset"
      },
      {
        heading: "Henderson Waves bridge at dawn",
        body: "The undulating wave-shaped pedestrian bridge in the southern ridge forest connects Mount Faber and Telok Blangah Hill. Dawn mist through the jungle canopy from the bridge creates ethereal conditions found nowhere else in the city. Arrive before 6:30am for the mist before the sun burns it off.",
        citySlug: "singapore",
        pageType: "sunset"
      },
      {
        heading: "Merlion Park at golden hour",
        body: "The iconic Merlion fountain faces north toward the Marina Bay Sands and the city skyline. Golden hour from the park gives you the Merlion in warm light with the entire bay development behind it. Blue hour from the same spot gives the full city reflection in the bay water.",
        citySlug: "singapore",
        pageType: "golden-hour"
      }
    ],
    tip: "Singapore sits just 1.3 degrees north of the equator — golden hour is short and consistent year-round at approximately 30 minutes before sunset. The city's frequent afternoon storms often create the most dramatic sunset conditions when the sun breaks under the cloud base just before touching the horizon."
  },

  "golden-hour-seoul-south-korea": {
    title: "Golden Hour in Seoul, South Korea",
    destination: "Seoul",
    country: "Korea, South",
    countrySlug: "korea-south",
    intro: "Seoul's ancient palaces, mountain backdrop and modern skyline create a city where every era of Korean history is visible in a single golden hour frame. The Han River divides the city and creates extraordinary reflective conditions at dawn and dusk.",
    sections: [
      {
        heading: "Namsan Seoul Tower at golden hour",
        body: "N Seoul Tower sits on a forested hill at the city's centre — the observation deck gives 360-degree views over the Han River, the palace district and the surrounding Bukhan mountains. Golden hour turns the river gold and the city grid glows warmly below. Take the cable car up 45 minutes before sunset.",
        citySlug: "seoul",
        pageType: "golden-hour"
      },
      {
        heading: "Gyeongbokgung Palace at dawn",
        body: "The Joseon dynasty palace is one of Korea's most photogenic locations — but photograph it at dawn before the gates open to the public and you capture it in perfect stillness. The Bugaksan mountain behind the palace catches first light while the palace courtyard is still in soft shadow. Arrive by 5:30am in summer.",
        citySlug: "seoul",
        pageType: "sunset"
      },
      {
        heading: "Banpo Bridge rainbow fountain at dusk",
        body: "The Han River bridge has the world's longest bridge fountain — 20 water jets arching from both sides. At dusk when the fountain illuminates and the sky transitions from orange to deep blue, the arching water creates extraordinary photographic conditions. The show runs several times each evening.",
        citySlug: "seoul",
        pageType: "golden-hour"
      },
      {
        heading: "Inwangsan Mountain shamanist rocks",
        body: "The rocky ridge above the city's northwest gives expansive views over Gyeongbokgung Palace and the city beyond. Dawn from the shamanist prayer sites on the ridge — coloured flags against the pink sky with the palace below — is one of Seoul's most culturally distinctive photography spots.",
        citySlug: "seoul",
        pageType: "sunset"
      }
    ],
    tip: "Seoul's golden hour is exceptional in autumn from late September through November when the surrounding mountains are covered in maple reds and golds. The combination of fiery foliage, low golden light and ancient palace architecture creates some of the finest photography conditions in all of East Asia."
  },

  "golden-hour-new-york-usa": {
    title: "Golden Hour in New York City",
    destination: "New York City",
    country: "United States",
    countrySlug: "united-states",
    intro: "New York's grid of streets creates a natural phenomenon twice a year — Manhattanhenge — when the sunset aligns perfectly with the east-west streets. But every day offers extraordinary golden hour conditions in a city built for dramatic light.",
    sections: [
      {
        heading: "Brooklyn Bridge at sunrise",
        body: "Cross the bridge on foot before dawn and position yourself on the Manhattan-side tower walkway. First light hits the Gothic stone towers and the steel cables catch the pink sky. By 7am the bridge is filling with commuters — this shot belongs to those who arrive before 5:30am in summer.",
        citySlug: "new-york",
        pageType: "sunset"
      },
      {
        heading: "Top of the Rock at golden hour",
        body: "Rockefeller Center's observation deck gives the classic Empire State Building framed shot that no other viewpoint offers — because you are not standing on the Empire State. Golden hour turns midtown amber and the Hudson River glows to the west. Book the sunset slot weeks in advance in summer.",
        citySlug: "new-york",
        pageType: "golden-hour"
      },
      {
        heading: "DUMBO waterfront at blue hour",
        body: "The Manhattan Bridge framed perfectly down Washington Street in Brooklyn is one of photography's most replicated urban compositions. Blue hour when the bridge lights and the water tower reflections appear in puddles below is the definitive version. Arrive 20 minutes before sunset to catch the full transition.",
        citySlug: "new-york",
        pageType: "golden-hour"
      },
      {
        heading: "Manhattanhenge street alignment",
        body: "Twice a year — around May 29 and July 12 — the setting sun aligns perfectly with Manhattan's east-west street grid, flooding the canyon streets with horizontal golden light. Position yourself on 42nd, 34th or 23rd Street looking west. Arrive 30 minutes before the listed alignment time to secure your spot.",
        citySlug: "new-york",
        pageType: "sunset"
      }
    ],
    tip: "New York's best golden hour light comes from the west across New Jersey — shooting east from the Hudson River waterfront or elevated positions gives you the city lit from behind with warm directional light. The High Line park gives an elevated mid-city perspective that is particularly beautiful at golden hour."
  },

  "golden-hour-barcelona-spain": {
    title: "Golden Hour in Barcelona, Spain",
    destination: "Barcelona",
    country: "Spain",
    countrySlug: "spain",
    intro: "Barcelona faces southeast toward the Mediterranean — meaning spectacular morning golden hour over the sea and a long warm sunset behind the city hills. Gaudi's architecture, the Gothic Quarter and 4km of beach all come alive in low light.",
    sections: [
      {
        heading: "Bunkers del Carmel hilltop",
        body: "The former anti-aircraft bunkers from the Spanish Civil War give the best 360-degree panoramic view in Barcelona — the Sagrada Familia, the sea, Montjuic and the Tibidabo all visible simultaneously. Golden hour from here as the sun drops toward the hills behind the city is extraordinary. Free, accessible and increasingly popular — arrive 90 minutes before sunset.",
        citySlug: "barcelona",
        pageType: "golden-hour"
      },
      {
        heading: "Park Guell terrace at dusk",
        body: "Gaudi's mosaic terrace faces southwest over the city and the sea — making it a perfect golden hour and sunset location. The Dragon Staircase, the Hypostyle Room columns and the terrace benches all photograph beautifully in warm light. Entry to the monumental zone is ticketed — book the last available time slot for golden hour access.",
        citySlug: "barcelona",
        pageType: "sunset"
      },
      {
        heading: "Barceloneta beach at sunrise",
        body: "The east-facing Mediterranean beach means spectacular sunrise over the sea. The beach is completely empty before 7am — walk to the water's edge for the sun rising over the horizon with the W Hotel silhouetted to the south. The golden morning light then turns and hits the city buildings behind you.",
        citySlug: "barcelona",
        pageType: "sunset"
      },
      {
        heading: "Sagrada Familia at golden hour",
        body: "The Nativity facade faces east and the Passion facade faces west — meaning one or the other is always in perfect golden hour light. Morning golden hour on the Nativity facade's organic stone sculpture is exceptional. Evening golden hour on the Passion facade's angular geometry creates dramatic shadows. Photograph from Avinguda de Gaudi for the full facade.",
        citySlug: "barcelona",
        pageType: "golden-hour"
      }
    ],
    tip: "Barcelona's golden hour lasts unusually long in summer due to Spain's westward position within the Central European time zone — sunset can be as late as 9:30pm in June and July. This late light means dinner culture and golden hour photography align perfectly — shoot until 10pm then eat."
  },

  "golden-hour-amsterdam-netherlands": {
    title: "Golden Hour in Amsterdam, Netherlands",
    destination: "Amsterdam",
    country: "Netherlands",
    countrySlug: "netherlands",
    intro: "Amsterdam's canal rings, 17th century merchant houses and flat landscape create perfect conditions for reflected golden hour light. The city sits at 52 degrees north — meaning long golden hours in summer and low-angle winter light that rakes across the gabled facades with extraordinary warmth.",
    sections: [
      {
        heading: "Brouwersgracht canal at dawn",
        body: "The quietest and most photogenic canal in Amsterdam runs east-west — dawn light from the east reflects directly down the canal onto the 17th century merchant house facades. Before 6:30am in summer the canal is in perfect stillness with no boats or cyclists. This is Amsterdam's finest photography moment.",
        citySlug: "amsterdam",
        pageType: "sunset"
      },
      {
        heading: "Magere Brug at blue hour",
        body: "The Skinny Bridge over the Amstel River is Amsterdam's most romantic spot — lit with hundreds of light bulbs at night. Blue hour from the riverbank looking east gives you the illuminated bridge, the canal houses reflected in the dark water and the city lights beginning to emerge. Best in autumn and winter for earlier blue hour.",
        citySlug: "amsterdam",
        pageType: "golden-hour"
      },
      {
        heading: "Westerkerk at golden hour",
        body: "The 17th century church tower on the Prinsengracht canal catches golden hour light on its red and white crown. The canal curves here giving a natural leading line toward the tower. Position yourself on the Prinsengracht bridge 100m south for the classic Amsterdam church reflection shot.",
        citySlug: "amsterdam",
        pageType: "golden-hour"
      },
      {
        heading: "Keukenhof tulip fields in spring",
        body: "30 minutes from the city by bus — the world's largest flower garden opens from late March to mid-May. Golden hour over the tulip fields creates abstract colour field compositions unlike anything else in Europe. The garden closes at 7:30pm — the last hour before closing in April is the golden hour window.",
        citySlug: "amsterdam",
        pageType: "golden-hour"
      }
    ],
    tip: "Amsterdam's flat landscape means golden hour light travels horizontally across the city with minimal obstruction — every canal becomes a mirror. Winter golden hour is particularly special: the low sun barely rises above 15 degrees meaning golden light lasts from late morning to early afternoon, transforming the entire city for hours rather than minutes."
  },

  "golden-hour-milan-italy": {
    title: "Golden Hour in Milan, Italy",
    destination: "Milan",
    country: "Italy",
    countrySlug: "italy",
    intro: "Milan is Italy's design capital — and its architecture, from the Gothic Duomo to the modernist Porta Nuova district, creates fascinating golden hour contrasts. The city is surrounded by the Alps and Po Valley, giving dramatic mountain backdrops on clear days.",
    sections: [
      {
        heading: "Duomo rooftop terraces at golden hour",
        body: "Climbing to the Duomo's rooftop terraces at golden hour puts you among the 135 spires and 3,400 marble statues as the sky turns amber. The view north toward the Alps with the spires in the foreground is one of Italy's most dramatic photographs. Book the last rooftop entry slot of the day.",
        citySlug: "milan",
        pageType: "golden-hour"
      },
      {
        heading: "Navigli canal district at dusk",
        body: "Milan's southern canal district comes alive at aperitivo hour — which coincides perfectly with golden hour and blue hour. The narrow canals reflect the warm light on the 18th century facades and the outdoor bar terraces. Blue hour here with the illuminated canal reflections and evening crowds is distinctly Milanese.",
        citySlug: "milan",
        pageType: "sunset"
      },
      {
        heading: "Piazza Gae Aulenti at blue hour",
        body: "The modern Porta Nuova district's central plaza is surrounded by contemporary glass towers that reflect the sky beautifully at blue hour. The UniCredit Tower and surrounding buildings create a dramatically different Milan from the historic centre — blue hour here gives architectural photography with a futuristic edge.",
        citySlug: "milan",
        pageType: "golden-hour"
      },
      {
        heading: "Castello Sforzesco at dusk",
        body: "The Renaissance fortress with its central tower faces west — dusk light on the medieval brick walls and the tower silhouette against the sky is classic Milan. The Parco Sempione behind the castle gives an elevated view from the Branca Tower for the wider golden hour cityscape.",
        citySlug: "milan",
        pageType: "sunset"
      }
    ],
    tip: "Milan's best golden hour conditions come in autumn and winter when the Po Valley mist creates a natural diffuser — the city floats above a layer of fog and the golden light catches the tops of the spires and towers while the streets remain in soft shadow. This elevated fog phenomenon is uniquely beautiful and happens frequently from October through February."
  },

  "golden-hour-osaka-japan": {
    title: "Golden Hour in Osaka, Japan",
    destination: "Osaka",
    country: "Japan",
    countrySlug: "japan",
    intro: "Osaka is Japan's most energetic city — and its neon-lit entertainment districts, ancient castle and modern skyline create extraordinary conditions for both golden hour and blue hour photography. The city sits on the Osaka Bay giving open western horizon sunsets.",
    sections: [
      {
        heading: "Dotonbori canal at blue hour",
        body: "The entertainment canal is one of the world's great urban photography locations — but the neon signs and giant crab and Glico running man only come alive at blue hour when the sky is deep blue and the reflections in the canal below are at their most vivid. Position yourself on the Ebisubashi bridge looking west.",
        citySlug: "osaka",
        pageType: "golden-hour"
      },
      {
        heading: "Osaka Castle park at dawn",
        body: "The 16th century castle keep is surrounded by cherry trees and a wide moat. Dawn before 6am gives you the castle in mist with the moat water still and reflective. In cherry blossom season from late March to early April, dawn in the castle park is among Japan's finest photography experiences.",
        citySlug: "osaka",
        pageType: "sunset"
      },
      {
        heading: "Umeda Sky Building rooftop",
        body: "The twin towers connected by a rooftop floating garden give 360-degree golden hour views over the entire Osaka-Kobe-Kyoto urban corridor. The open circular rooftop faces all directions — sunset over Osaka Bay to the west and the illuminated city grid below at blue hour.",
        citySlug: "osaka",
        pageType: "golden-hour"
      },
      {
        heading: "Tennoji Park and Tsutenkaku Tower",
        body: "The retro Tsutenkaku Tower in Shinsekai is Osaka's most distinctive landmark — the working-class neighbourhood around it gives authentic urban street photography at golden hour. The tower lights up at dusk and the surrounding traditional shotengai covered shopping streets glow warmly.",
        citySlug: "osaka",
        pageType: "sunset"
      }
    ],
    tip: "Osaka's golden hour is best experienced as a full sequence — start at the castle or Umeda for the sunset itself, then descend into Dotonbori for blue hour and neon photography. The city's compact layout makes this 3-hour golden hour session entirely walkable."
  },

  "golden-hour-taipei-taiwan": {
    title: "Golden Hour in Taipei, Taiwan",
    destination: "Taipei",
    country: "Taiwan",
    countrySlug: "taiwan",
    intro: "Taipei sits in a mountain-ringed basin — the surrounding peaks create dramatic backdrops for golden hour and give elevated viewpoints that look down over the city and its iconic Taipei 101 tower. The city's mix of Japanese colonial, traditional Chinese and ultra-modern architecture is extraordinary in low light.",
    sections: [
      {
        heading: "Elephant Mountain at dusk",
        body: "The 45-minute hike up Xiangshan gives the classic Taipei 101 shooting spot — the tower rising above the city grid with the surrounding mountains behind. Golden hour turns the sky amber behind the tower and blue hour gives the full city illumination sequence. Arrive 90 minutes before sunset to secure the rock viewpoint.",
        citySlug: "taipei",
        pageType: "sunset"
      },
      {
        heading: "Tamsui riverside at sunset",
        body: "The former colonial port town at the mouth of the Tamsui River faces west over the Taiwan Strait — one of Taipei's finest sunset locations. The old red Fort San Domingo, the Oxford College and the riverside promenade all photograph beautifully in golden light. Take the MRT to Tamsui station.",
        citySlug: "taipei",
        pageType: "golden-hour"
      },
      {
        heading: "Jiufen tea house hillside at dusk",
        body: "40 minutes from Taipei, the mountain village of Jiufen clings to cliffs above the northeast coast. Red lantern-lit tea houses on stepped alleyways at dusk — with the Pacific Ocean far below — inspired the spirit world in Spirited Away. Blue hour as the lanterns glow against the darkening sea is unmissable.",
        citySlug: "taipei",
        pageType: "sunset"
      },
      {
        heading: "Maokong Gondola at golden hour",
        body: "The cable car ascending the tea mountains south of the city gives aerial golden hour views over the entire Taipei basin. The highest station overlooks the city from 300m with the 101 visible in the distance. Ride up in late afternoon and walk the tea plantation trails in golden light before the last gondola down.",
        citySlug: "taipei",
        pageType: "golden-hour"
      }
    ],
    tip: "Taipei's mountain basin location means golden hour light is often dramatic and unpredictable — the surrounding peaks can create god-ray light effects when the sun catches gaps in the mountains. The rainy season from May through September creates frequent dramatic storm-lit sunsets even if the actual sunset is obscured."
  },

  "golden-hour-rome-italy": {
    title: "Golden Hour in Rome, Italy",
    destination: "Rome",
    country: "Italy",
    countrySlug: "italy",
    intro: "Rome is built on seven hills — and every one of them offers a different elevated golden hour perspective over 2,000 years of history. The city's travertine marble, warm brick and ancient stone all respond to low-angle light with extraordinary richness.",
    sections: [
      {
        heading: "Pincio Terrace in Villa Borghese",
        body: "The elevated terrace at the northern end of Villa Borghese gives the most famous view of St Peter's Basilica — the dome floating above the city rooftops. Golden hour from here has inspired painters for centuries. The Piazza del Popolo below catches the last light perfectly. Arrive 1 hour before sunset.",
        citySlug: "rome",
        pageType: "golden-hour"
      },
      {
        heading: "Gianicolo Hill at sunset",
        body: "The highest viewpoint in Rome looks east over the entire city from the Vatican to the Colosseum. The dome of St Peter's glows warm amber at dusk and the terracotta rooftops stretch to the horizon. The cannon fires at noon but the hill is far more rewarding at sunset when the day-trippers have left.",
        citySlug: "rome",
        pageType: "sunset"
      },
      {
        heading: "Ponte Sant'Angelo at blue hour",
        body: "The angel-lined bridge over the Tiber with Castel Sant'Angelo behind is Rome's most romantic blue hour location. The castle illuminates at dusk and the angels on the bridge catch the reflected warm light. Position yourself on the riverbank below looking up at the bridge and the castle beyond.",
        citySlug: "rome",
        pageType: "golden-hour"
      },
      {
        heading: "Roman Forum at golden hour",
        body: "The Palatine Hill above the Forum gives the best elevated view of the ancient ruins. Late afternoon golden light rakes across the column stumps, arches and marble slabs from the west — the shadows elongate and the stone turns deep gold. Book Colosseum-Forum tickets for the last entry slot.",
        citySlug: "rome",
        pageType: "golden-hour"
      }
    ],
    tip: "Rome's best photography season is March through May and September through November when the crowds thin and the light is lower and warmer than the harsh summer sun. August is technically beautiful for light but the city is packed with tourists and many Romans are on holiday — restaurants and shops close unpredictably."
  },

  "golden-hour-shanghai-china": {
    title: "Golden Hour in Shanghai, China",
    destination: "Shanghai",
    country: "China",
    countrySlug: "china",
    intro: "Shanghai's dramatic contrast between the colonial-era Bund and the futuristic Pudong skyline across the Huangpu River creates one of the world's great golden hour landscapes. The river acts as a mirror, doubling the impact of every photograph taken at dusk.",
    sections: [
      {
        heading: "The Bund waterfront at blue hour",
        body: "The colonial stone facades of the Bund face east toward the Pudong skyline — blue hour is the definitive moment here when the last warm light in the west reflects off the glass towers opposite and the river carries both sets of lights. Position yourself on the elevated walkway between Nanjing Road and the Peace Hotel.",
        citySlug: "shanghai",
        pageType: "golden-hour"
      },
      {
        heading: "Shanghai Tower observation deck",
        body: "At 632m, the second tallest building in the world has an observation deck at 546m. Golden hour from here looking west over the vast Shanghai urban plain as the sun sinks is overwhelming in scale — the city stretches to the horizon in every direction. Book in advance for the sunset time slot.",
        citySlug: "shanghai",
        pageType: "sunset"
      },
      {
        heading: "Yu Garden at golden hour",
        body: "The Ming dynasty classical garden in the old city catches golden hour light through its moon gates and pavilion rooftops. Low warm light through the willow trees reflecting in the zigzag bridge ponds creates painterly compositions. The surrounding bazaar buildings glow in similar warm tones.",
        citySlug: "shanghai",
        pageType: "golden-hour"
      },
      {
        heading: "Yangshupu waterfront industrial ruins",
        body: "The former industrial waterfront east of the city centre has decaying warehouse architecture from the 1930s alongside the new Pudong skyline. Golden hour on the rusting structures with the modern towers behind creates extraordinary urban contrast photography.",
        citySlug: "shanghai",
        pageType: "sunset"
      }
    ],
    tip: "Shanghai's golden hour quality is best in autumn from October through December when the summer haze lifts and visibility across the river is at its clearest. Spring brings cherry blossoms to Fuxing Park and the French Concession creating beautiful foreground opportunities for city photography."
  },

  "golden-hour-vienna-austria": {
    title: "Golden Hour in Vienna, Austria",
    destination: "Vienna",
    country: "Austria",
    countrySlug: "austria",
    intro: "Vienna's imperial baroque architecture was designed to impress — and it does so most magnificently at golden hour when the creamy stone facades, gilded domes and ornate details catch the warm directional light. The city's elevated surroundings and wide Ringstrasse boulevards create natural photography conditions.",
    sections: [
      {
        heading: "Kahlenberg hilltop at golden hour",
        body: "The vineyard-covered hill northwest of the city at 484m gives the panoramic view of Vienna in the Danube basin with the Alps visible on clear days. Golden hour from the wine tavern terrace as the sun drops toward the hills behind you and the city glows below is magical. Take the D bus from the Ringstrasse.",
        citySlug: "vienna",
        pageType: "golden-hour"
      },
      {
        heading: "Schonbrunn Palace gardens",
        body: "The baroque imperial gardens rise on a slope behind the palace — the Gloriette arch at the summit frames the palace and city below perfectly at golden hour. The fountains and geometric garden patterns catch low light beautifully. The Gloriette cafe terrace is accessible for golden hour viewing.",
        citySlug: "vienna",
        pageType: "sunset"
      },
      {
        heading: "St Stephen's Cathedral at dusk",
        body: "The Gothic spire of the Stephansdom is Vienna's heart — dusk from the surrounding pedestrian zone as the cathedral illuminates and the Ringstrasse lights emerge gives classic Viennese atmosphere. Blue hour here with the illuminated spire reflected in the wet cobblestones after rain is extraordinary.",
        citySlug: "vienna",
        pageType: "golden-hour"
      },
      {
        heading: "Naschmarkt at dawn",
        body: "Vienna's historic outdoor market runs along the Wienzeile between art nouveau apartment buildings designed by Otto Wagner. Early morning light before the vendors fully set up — the market stalls, the Secession building dome and the Wagner houses in one frame — is pure Viennese atmosphere.",
        citySlug: "vienna",
        pageType: "sunset"
      }
    ],
    tip: "Vienna's golden hour photography benefits enormously from visiting the Ringstrasse boulevard in low light — the sequence of imperial buildings including the Opera, the Kunsthistorisches Museum, Parliament and the Rathaus were all designed as a unified imperial statement and golden hour light reveals this architectural ambition most clearly."
  },

  "golden-hour-prague-czech-republic": {
    title: "Golden Hour in Prague, Czech Republic",
    destination: "Prague",
    country: "Czechia",
    countrySlug: "czechia",
    intro: "Prague is one of Europe's best-preserved medieval cities — its red rooftops, Gothic towers and the Vltava river creating a golden hour landscape that has barely changed in 600 years. The city rewards those who rise early above all others.",
    sections: [
      {
        heading: "Charles Bridge at dawn",
        body: "The medieval bridge with its 30 baroque statues is Prague's most visited spot — but arrive before 5:30am in summer and you will find it in perfect morning mist with zero tourists. The statues emerge from the fog, the castle glows on the hill above and the river reflects the pink sky below. This is one of Europe's finest dawn photography locations.",
        citySlug: "prague",
        pageType: "sunset"
      },
      {
        heading: "Letna Park terrace",
        body: "The elevated riverside park gives the best panoramic view of Prague's red rooftops, the river meander and the Charles Bridge from above. Golden hour from the beer garden terrace looking southeast over the city is superb — the late afternoon light rakes across the rooftops from behind you. Free and accessible at all hours.",
        citySlug: "prague",
        pageType: "golden-hour"
      },
      {
        heading: "Prague Castle district at dusk",
        body: "The castle complex on Hradcany hill faces east — making it a magnificent sunrise location. But dusk from the castle's southern gardens looking over the Mala Strana rooftops toward the river gives an extraordinary warm golden view. The St Vitus Cathedral spires catch the last direct sunlight on clear evenings.",
        citySlug: "prague",
        pageType: "sunset"
      },
      {
        heading: "Old Town Square at blue hour",
        body: "The Astronomical Clock, the Gothic Tyn Church and the baroque St Nicholas Church all face the square from different angles. Blue hour when the clock tower illuminates and the church spires glow against the dark sky is Prague's most cinematic moment. The square empties significantly after 9pm.",
        citySlug: "prague",
        pageType: "golden-hour"
      }
    ],
    tip: "Prague's Charles Bridge is the most photographed spot in the country — and completely swamped with tourists from 8am to 8pm. The dawn window before 6am is genuinely peaceful and the morning mist that rises from the Vltava in spring and autumn adds atmosphere that afternoon photography simply cannot replicate. Set your alarm."
  },

  "golden-hour-miami-usa": {
    title: "Golden Hour in Miami, Florida",
    destination: "Miami",
    country: "United States",
    countrySlug: "united-states",
    intro: "Miami's combination of Art Deco architecture, tropical vegetation, Atlantic beaches and the Biscayne Bay skyline creates golden hour conditions found nowhere else in the United States. The flat geography means open horizons and the tropical light is intensely saturated year-round.",
    sections: [
      {
        heading: "South Beach Art Deco district at golden hour",
        body: "Ocean Drive's 1930s pastel hotels face east toward the beach — morning golden hour light hits the facades directly from the sea. The neon signs, palm trees and classic American cars in front of candy-coloured buildings make for iconic Miami photography. Arrive before 8am to beat the beach crowds.",
        citySlug: "miami",
        pageType: "golden-hour"
      },
      {
        heading: "Brickell Key at dusk",
        body: "The small island in Biscayne Bay gives 360-degree views of the downtown Miami skyline and the bay. Blue hour from the Brickell Key waterfront as the glass towers illuminate and reflect in the still bay water is one of Miami's finest photography moments. The walk around the island takes 20 minutes.",
        citySlug: "miami",
        pageType: "sunset"
      },
      {
        heading: "Everglades at sunrise",
        body: "45 minutes from South Beach, the Anhinga Trail in Everglades National Park gives sunrise access to one of North America's most remarkable landscapes. The sawgrass prairie with an unobstructed horizon, wading birds in the foreground and the pink dawn sky creates nature photography of the highest order.",
        citySlug: "miami",
        pageType: "sunset"
      },
      {
        heading: "Wynwood Walls at golden hour",
        body: "The outdoor street art museum in the Wynwood district gives vivid mural photography in golden light. The warm directional light saturates the already intensely coloured murals. The surrounding neighbourhood's street art extends for several blocks — golden hour here is 60-90 minutes of colour photography gold.",
        citySlug: "miami",
        pageType: "golden-hour"
      }
    ],
    tip: "Miami's summer thunderstorms from June through September create the most dramatic sunset conditions — the post-storm light breaking through dark clouds over the ocean produces extraordinary colour. Hurricane season runs through November but most storms pass to the south. Winter from December through April gives the most reliable clear skies."
  },

  "golden-hour-los-angeles-usa": {
    title: "Golden Hour in Los Angeles",
    destination: "Los Angeles",
    country: "United States",
    countrySlug: "united-states",
    intro: "Los Angeles is built on hills above the Pacific — and its golden hour is legendary. The famous LA smog, counterintuitively, creates some of the world's most saturated and colourful sunsets. The city faces west toward the open ocean, and the light here is unlike anywhere else.",
    sections: [
      {
        heading: "Griffith Observatory at golden hour",
        body: "The hilltop Art Deco observatory above Hollywood gives the definitive LA photograph — the Hollywood sign to the northwest, the city basin stretching to the ocean, and the observatory dome in the foreground. Golden hour before sunset paints the smoggy sky in layers of orange, pink and purple. Arrive 2 hours before sunset for parking.",
        citySlug: "los-angeles",
        pageType: "golden-hour"
      },
      {
        heading: "Venice Beach boardwalk at sunset",
        body: "The west-facing Pacific beach gives open horizon sunsets with the iconic silhouettes of roller skaters, palm trees and the Venice Pier. The boardwalk's street performers and basketball courts add human interest. Golden hour from the sand looking directly west is reliably spectacular.",
        citySlug: "los-angeles",
        pageType: "sunset"
      },
      {
        heading: "Runyon Canyon summit at dawn",
        body: "The hiking trail above Hollywood gives downtown LA in the distance and the Hollywood sign close by. Dawn light over the basin is misty and atmospheric before the marine layer burns off. The canyon opens at dawn — arrive for the first light on the hills as the city slowly emerges below.",
        citySlug: "los-angeles",
        pageType: "sunset"
      },
      {
        heading: "Point Dume Malibu at sunset",
        body: "The sea cliff 30 miles north of the city gives elevated Pacific Ocean views with the Santa Monica Mountains behind. Sunset from the cliff top with breaking waves far below and the Channel Islands on the horizon on clear days is one of Southern California's finest photography locations.",
        citySlug: "los-angeles",
        pageType: "golden-hour"
      }
    ],
    tip: "LA's infamous smog and marine layer create the city's most beautiful photography conditions. The marine layer rolls in from the Pacific each morning and often burns off by midday — but the particles it leaves in the air catch golden hour light and create the legendary LA sunsets. A cleaner day is actually less photogenic."
  },

  "golden-hour-chennai-india": {
    title: "Golden Hour in Chennai, India",
    destination: "Chennai",
    country: "India",
    countrySlug: "india",
    intro: "Chennai sits on the Bay of Bengal facing east — making it one of India's finest sunrise cities. The world's second longest urban beach, ancient temples and colonial architecture all face the morning light, rewarding those who wake before dawn.",
    sections: [
      {
        heading: "Marina Beach at sunrise",
        body: "The 13km Marina Beach is the world's second longest urban beach — and dawn here before 6am is extraordinary. Fishermen launch their wooden catamarans into the surf as the sun rises over the Bay of Bengal, the horizon unobstructed in both directions. This is Chennai's finest photography moment and it happens every single day.",
        citySlug: "chennai",
        pageType: "sunset"
      },
      {
        heading: "Kapaleeshwarar Temple at golden hour",
        body: "The Dravidian gopuram tower is covered in painted plaster sculptures of extraordinary complexity and colour. Late afternoon golden light intensifies the colours before the 6pm puja ceremony. The temple tank reflects the gopuram — photograph from the tank edge for the reflection composition.",
        citySlug: "chennai",
        pageType: "golden-hour"
      },
      {
        heading: "San Thome Cathedral at blue hour",
        body: "The neo-Gothic white cathedral on the Mylapore beachfront faces east — blue hour from the beach as the illuminated facade glows against the darkening sea and sky is beautiful. The adjacent beach gives unobstructed southern horizon views for long sunset sequences.",
        citySlug: "chennai",
        pageType: "golden-hour"
      },
      {
        heading: "Mahabalipuram shore temples at dawn",
        body: "60km south of Chennai, the 7th century shore temples sit directly on the Bay of Bengal. Dawn light on the ancient granite carvings with the sea breaking behind them is one of South India's finest photography locations. Arrive before the site opens at 6am and photograph through the fence for the empty shot.",
        citySlug: "chennai",
        pageType: "sunset"
      }
    ],
    tip: "Chennai's golden hour photography is best from November through February during the northeast monsoon's end. The post-monsoon air clarity is excellent and the sea is calmer. The annual beach festival in January brings cultural performers to Marina Beach at dawn — exceptional documentary photography opportunities alongside the landscape work."
  },

  "golden-hour-dublin-ireland": {
    title: "Golden Hour in Dublin, Ireland",
    destination: "Dublin",
    country: "Ireland",
    countrySlug: "ireland",
    intro: "Dublin sits on the east coast of Ireland facing the Irish Sea — and while the weather is famously unpredictable, when the light breaks through it is extraordinarily dramatic. Irish golden hour light has a particular quality — a low, soft, golden warmth that photographers travel the world to find.",
    sections: [
      {
        heading: "Ha'penny Bridge at blue hour",
        body: "The cast iron pedestrian bridge over the Liffey has been Dublin's most photographed spot for 200 years. Blue hour from the riverbank when the bridge's white lamp posts illuminate and the Georgian quayside buildings reflect in the dark water is classically Dublin. The Crown Alley end gives the best composition.",
        citySlug: "dublin",
        pageType: "golden-hour"
      },
      {
        heading: "Howth Head cliffs at sunset",
        body: "The fishing village headland 15km north of the city gives dramatic cliff photography over the Irish Sea. The Baily Lighthouse, the rocky sea stacks and the open Atlantic horizon face southwest — making this one of Ireland's finest sunset locations. The cliff walk from Howth village takes 90 minutes.",
        citySlug: "dublin",
        pageType: "sunset"
      },
      {
        heading: "Trinity College at dawn",
        body: "The 400-year-old cobblestone Front Square with the Campanile bell tower is completely empty before 8am. Dawn light on the Georgian stone buildings and the perfectly maintained lawns gives Dublin's most prestigious golden hour photography without a single tourist in frame.",
        citySlug: "dublin",
        pageType: "sunset"
      },
      {
        heading: "Dun Laoghaire pier at dusk",
        body: "The long granite East Pier stretches 1.3km into Dublin Bay facing north — dusk from the pier lighthouse gives views back over the bay to the Dublin Mountains with the city lights beginning to emerge. The cloud formations over Ireland at sunset are reliably dramatic.",
        citySlug: "dublin",
        pageType: "golden-hour"
      }
    ],
    tip: "Dublin's weather is famously unreliable but this creates golden hour magic — broken cloud cover rather than clear skies produces the most dramatic light. The 20 minutes after rain clears, when the sun breaks through and hits the wet cobblestones and Georgian facades, is Dublin golden hour at its absolute finest. Always carry your camera even when it looks overcast."
  },

  "golden-hour-madrid-spain": {
    title: "Golden Hour in Madrid, Spain",
    destination: "Madrid",
    country: "Spain",
    countrySlug: "spain",
    intro: "Madrid sits at 650m on the Castilian plateau — Europe's highest capital — and the clear high-altitude air creates exceptionally sharp and warm golden hour light. The city's wide boulevards, neoclassical architecture and large parks all reward the photographer who times their visit around the light.",
    sections: [
      {
        heading: "Templo de Debod at sunset",
        body: "The ancient Egyptian temple donated to Spain by Egypt sits in a western-facing park above the city. The reflecting pool in front of the temple turns golden at sunset and the open sky to the west gives unobstructed horizon views. This is Madrid's finest single sunset location — arrive 45 minutes early to secure the pool-edge position.",
        citySlug: "madrid",
        pageType: "sunset"
      },
      {
        heading: "Retiro Park lake at golden hour",
        body: "The rowing lake in El Retiro faces the monumental Alfonso XII monument to the east. Golden hour from the western bank gives you the colonnaded monument and its equestrian statue lit in warm directional light with rowing boats in the foreground. The rose garden nearby is exceptional in spring.",
        citySlug: "madrid",
        pageType: "golden-hour"
      },
      {
        heading: "Circulo de Bellas Artes rooftop",
        body: "The cultural centre's rooftop terrace in the centre of the city gives 360-degree views over the Gran Via and the wider cityscape. Dusk from here with a vermouth in hand is quintessential Madrid — the city glows warm in the last light and the surrounding neoclassical rooftops create a dense architectural landscape.",
        citySlug: "madrid",
        pageType: "golden-hour"
      },
      {
        heading: "Almudena Cathedral at sunrise",
        body: "The neoclassical cathedral facing the Royal Palace has its best light at sunrise when the eastern sun hits the cream stone facade. The Plaza de Oriente garden between the cathedral and the palace faces east — dawn from the garden with the palace behind you and the cathedral ahead gives Madrid's finest architectural sunrise.",
        citySlug: "madrid",
        pageType: "sunset"
      }
    ],
    tip: "Madrid's golden hour is extraordinarily late in summer — the sun can set as late as 9:45pm in June due to Spain's position in the Central European time zone. Dinner at 10pm is normal here, which means golden hour photography and dinner culture align perfectly. Plan shoots until 10:30pm in summer and eat afterwards."
  },

  "golden-hour-munich-germany": {
    title: "Golden Hour in Munich, Germany",
    destination: "Munich",
    country: "Germany",
    countrySlug: "germany",
    intro: "Munich sits at the northern edge of the Alps — and on clear days the snow-capped peaks are visible on the southern horizon, creating a unique combination of alpine backdrop and Bavarian city architecture. Golden hour here has a particular alpine clarity.",
    sections: [
      {
        heading: "Marienplatz New Town Hall at dusk",
        body: "The neo-Gothic Rathaus tower faces the central plaza — dusk light on the dark stone facade and the glockenspiel figures creates dramatic shadow and highlight. Blue hour when the tower illuminates and the surrounding pedestrian zone empties of shoppers is the finest time to photograph Munich's famous centrepiece.",
        citySlug: "munich",
        pageType: "golden-hour"
      },
      {
        heading: "English Garden Chinese Tower at golden hour",
        body: "The Chinese pagoda in Europe's largest urban park is surrounded by beer garden tables and ancient trees. Late afternoon golden light filters through the chestnut canopy onto the painted pagoda tiers and the crowds below. This quintessentially Bavarian scene is best in late summer when the leaves begin to turn.",
        citySlug: "munich",
        pageType: "golden-hour"
      },
      {
        heading: "Olympiaberg at sunset",
        body: "The hill made from Second World War rubble in the Olympic Park gives Munich's best elevated panoramic view. On clear autumn and winter days the Alps are visible on the southern horizon 60km away. Golden hour from the hilltop with the Olympic Tower and the BMW headquarters in the foreground is a fine wide-angle shot.",
        citySlug: "munich",
        pageType: "sunset"
      },
      {
        heading: "Nymphenburg Palace canal at dawn",
        body: "The baroque summer palace has a long formal canal stretching south from the main gate. Dawn light from the south end looking north toward the palace facade across the still water — with morning mist in the formal gardens — is one of Bavaria's finest photography moments. Arrive before 6am in summer.",
        citySlug: "munich",
        pageType: "sunset"
      }
    ],
    tip: "Munich's golden hour is exceptionally beautiful in autumn from late September through October when the English Garden and surrounding parks turn gold and red. The combination of Bavarian baroque architecture, autumn foliage and low warm light creates photography conditions that draw visitors specifically for this season."
  },

  "golden-hour-mumbai-india": {
    title: "Golden Hour in Mumbai, India",
    destination: "Mumbai",
    country: "India",
    countrySlug: "india",
    intro: "Mumbai faces the Arabian Sea to the west — giving spectacular sunset conditions from its famous Marine Drive seafront every single evening. The city's art deco heritage, colonial architecture and contrast between extreme wealth and poverty creates some of the world's most compelling golden hour photography.",
    sections: [
      {
        heading: "Marine Drive at dusk",
        body: "The Queen's Necklace — a 3.5km arc of 1930s art deco buildings curving around Back Bay — faces due west over the Arabian Sea. The buildings glow warm gold in the last sunlight, the promenade fills with evening walkers and the street lamps begin to create the necklace effect as dusk deepens. This is Mumbai's finest golden hour location without question.",
        citySlug: "mumbai",
        pageType: "sunset"
      },
      {
        heading: "Gateway of India at golden hour",
        body: "The colonial basalt arch frames the harbour and the Taj Mahal Palace Hotel behind it. Golden hour light on the arch and the hotel facade is exceptional — photograph from the water taxi for the full frontal composition, or from the steps at the base for the arch framing the harbour boats.",
        citySlug: "mumbai",
        pageType: "golden-hour"
      },
      {
        heading: "Bandra-Worli Sea Link at blue hour",
        body: "The cable-stayed bridge over Mahim Bay is Mumbai's most dramatic piece of modern architecture. Blue hour gives the cables a luminous quality against the darkening sky — photograph from the Worli end looking north for the full bridge span with the city behind.",
        citySlug: "mumbai",
        pageType: "golden-hour"
      },
      {
        heading: "Dharavi from the Mahim flyover",
        body: "One of Asia's largest informal settlements is best understood from elevation — the Mahim Creek flyover at golden hour gives a sweeping view over the rooftop landscape with the setting sun behind you. Documentary and street photography here requires sensitivity but the visual complexity at golden hour is extraordinary.",
        citySlug: "mumbai",
        pageType: "sunset"
      }
    ],
    tip: "Mumbai's monsoon from June through September creates the most dramatic sky conditions of the year — breaks in the monsoon clouds produce extraordinary theatrical light over the Arabian Sea. The post-monsoon period from October through November gives the clearest air and the most saturated sunset colours of the year."
  },
};

export default function GuidePage() {
  const [location] = useLocation();
  const parts = location.split("/").filter(Boolean);
  const slug = parts[1];

  const guide = guideContent[slug];

  useEffect(() => {
    if (guide) {
      document.title = `${guide.title} — Luminary`;
      let meta = document.querySelector("meta[name='description']");
      if (meta) meta.setAttribute("content", guide.intro);
      let canonical = document.querySelector("link[rel='canonical']");
      if (!canonical) {
        canonical = document.createElement("link");
        canonical.setAttribute("rel", "canonical");
        document.head.appendChild(canonical);
      }
      canonical.setAttribute("href", `https://sunsetmoon.today/guide/${slug}`);
    }
  }, [slug, guide]);

  if (!guide) {
    return <div className="text-white text-center mt-20">Guide not found</div>;
  }

  return (
    <div className="min-h-screen text-white px-4 py-16 flex flex-col items-center">

      <div className="text-sm text-white/40 mb-6">
        <a href="/" className="hover:text-white">Home</a> →{" "}
        <a href="/guides" className="hover:text-white">Guides</a> →{" "}
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
            {section.citySlug && (
              <a
                href={`/${section.pageType}/${section.citySlug}`}
                className="text-sm text-white/40 hover:text-amber-300 transition underline"
              >
                Check today's {section.pageType === "golden-hour" ? "golden hour" : "sunset"} time in {section.heading.split(" ")[0]} →
              </a>
            )}
          </div>
        ))}

        <div className="bg-amber-400/10 border border-amber-400/20 rounded-2xl p-7">
          <p className="text-amber-300 font-semibold mb-2">📸 Photographer's tip</p>
          <p className="text-white/70 leading-relaxed">{guide.tip}</p>
        </div>

        <div className="text-center">
          <p className="text-white/40 text-sm mb-4">Explore {guide.country}</p>
          <a
            href={`/country/${guide.countrySlug}`}
            className="px-6 py-3 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 transition text-sm text-white"
          >
            Browse all cities in {guide.country} →
          </a>
        </div>
      </div>
    </div>
  );
}