export interface WorldData {
  id: string;
  index: number;
  title: string;
  kanji: string;
  era: string;
  imageUrl: string;
  accentColor: string;
  overlayGradient: string;
  hotspot: { x: string; y: string };
  panel: {
    description: string;
    cultural: string;
    architectural: string;
    galleryImages: { url: string; caption: string }[];
  };
}

export const WORLDS: WorldData[] = [
  {
    id: "itsukushima",
    index: 0,
    title: "Itsukushima Shrine",
    kanji: "厳島神社",
    era: "Heian Period  ·  593 AD",
    imageUrl:
      "https://images.unsplash.com/photo-1768822355227-e2150cdd3276?w=1920&h=1080&fit=crop&auto=format&q=85",
    accentColor: "#C23B22",
    overlayGradient:
      "linear-gradient(to top, rgba(8,5,3,0.82) 0%, rgba(70,22,8,0.28) 45%, rgba(8,5,3,0.55) 100%)",
    hotspot: { x: "50%", y: "44%" },
    panel: {
      description:
        "Standing in the waters of Hiroshima Bay, Itsukushima Shrine is one of Japan's most celebrated architectural masterpieces. Built during the reign of Emperor Kinmei around 593 AD and later expanded by the powerful warlord Taira no Kiyomori, the shrine appears to float on the ocean during high tide — a deliberate illusion that reinforces the sacred boundary between the mortal world and the divine realm.",
      cultural:
        "The island of Miyajima is itself considered a living kami. For centuries, no births or deaths were permitted on the island, lest the sacred ground be defiled by the impurity of human mortality. Worshippers would arrive by boat, passing beneath the towering vermillion torii before entering the shrine's corridors suspended above the tidal sea. The island remains one of Japan's three most celebrated scenic views — the Nihon Sankei.",
      architectural:
        "The shrine complex comprises 17 structures connected by covered hallways and platforms extending over tidal flats. The iconic O-Torii gate stands 16 meters tall, constructed from camphor wood treated with lacquer and vermillion mineral pigment. Its four-legged design — ryōbu torii — reflects the syncretic fusion of Shinto and Buddhist architectural traditions that flourished under medieval Japan's court religion.",
      galleryImages: [
        {
          url: "https://images.unsplash.com/photo-1772232819077-bfb5c4c2423a?w=600&h=380&fit=crop&auto=format&q=80",
          caption: "The vermillion O-Torii at high tide",
        },
        {
          url: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=600&h=380&fit=crop&auto=format&q=80",
          caption: "Shrine corridors at dusk",
        },
      ],
    },
  },
  {
    id: "bamboo",
    index: 1,
    title: "Arashiyama Bamboo Grove",
    kanji: "嵐山竹林",
    era: "Heian Period  ·  Kyoto",
    imageUrl:
      "https://images.unsplash.com/photo-1531021713651-fdd4ac075ac1?w=1920&h=1080&fit=crop&auto=format&q=85",
    accentColor: "#4a7c59",
    overlayGradient:
      "linear-gradient(to top, rgba(3,8,4,0.85) 0%, rgba(10,28,14,0.35) 45%, rgba(3,8,4,0.6) 100%)",
    hotspot: { x: "52%", y: "52%" },
    panel: {
      description:
        "The Arashiyama Bamboo Grove in western Kyoto is one of Japan's most iconic natural landscapes. Towering stalks of Moso bamboo reach skyward, creating a cathedral-like canopy that filters sunlight into ethereal green shafts. Designated as part of the UNESCO World Heritage Site of the Historic Monuments of Ancient Kyoto, the grove has drawn contemplatives, artists, and pilgrims for over a thousand years.",
      cultural:
        "Bamboo holds profound significance across Japanese culture — symbolizing resilience, purity, and the capacity to bend without breaking. The particular sound created by wind moving through dense bamboo groves has been recognized by Japan's Ministry of Environment as one of the '100 Soundscapes of Japan.' Adjacent to the grove stands Tenryu-ji, a Rinzai Zen temple whose gardens merge seamlessly with the natural bamboo landscape through the principle of shakkei — borrowed scenery.",
      architectural:
        "The path through the grove extends approximately 500 meters, flanked by stalks reaching 15 to 20 meters in height. The grove is maintained by the Nonomiya Shrine and local preservation societies, who cull older stalks to allow young growth to emerge. The resulting density creates a living architecture of extraordinary acoustical and visual character — every hour of the day yields an entirely different atmospheric condition as light angles shift.",
      galleryImages: [
        {
          url: "https://images.unsplash.com/photo-1702564492961-3643703480c2?w=600&h=380&fit=crop&auto=format&q=80",
          caption: "Morning mist in the bamboo corridor",
        },
        {
          url: "https://images.unsplash.com/photo-1632923754832-60642c12a7ed?w=600&h=380&fit=crop&auto=format&q=80",
          caption: "The path through Arashiyama",
        },
      ],
    },
  },
  {
    id: "inari",
    index: 2,
    title: "Fushimi Inari Taisha",
    kanji: "伏見稲荷大社",
    era: "Nara Period  ·  711 AD",
    imageUrl:
      "https://images.unsplash.com/photo-1570692890937-f60db72ac6b4?w=1920&h=1080&fit=crop&auto=format&q=85",
    accentColor: "#D4580A",
    overlayGradient:
      "linear-gradient(to top, rgba(8,3,1,0.88) 0%, rgba(55,18,3,0.42) 50%, rgba(8,3,1,0.65) 100%)",
    hotspot: { x: "50%", y: "48%" },
    panel: {
      description:
        "Fushimi Inari Taisha is the head shrine of the Inari faith, dedicated to the kami of foxes, rice, prosperity, and worldly success. Founded in 711 AD on the forested slopes of Mount Inari in southern Kyoto, the shrine is most celebrated for its thousands of vermillion torii gates that wind in an unbroken procession for nearly four kilometers up the mountain — one of Japan's most recognizable and spiritually powerful sacred landscapes.",
      cultural:
        "The kitsune — the supernatural fox — is considered the messenger of Inari, and stone fox statues guard every gate and shrine structure throughout the complex. Business owners and entrepreneurs have made pilgrimage to Fushimi Inari for centuries to pray for commercial success, sponsoring torii gates in fulfillment of prayers answered. Each gate bears the name of the donor and the date of donation, creating a living archive of Japan's commercial and spiritual history spanning over a millennium.",
      architectural:
        "Each torii gate is built to precise canonical specifications: two circular pillars, a curved kasagi beam spanning the apex, and a secondary nuki beam set at one-third height — all lacquered in a specific shade of bengara-red (iron oxide vermillion) that distinguishes Inari shrines throughout Japan. The density of gates creates a tunnel of color and shadow that transforms the quality of light and space in ways no single architectural object could achieve alone.",
      galleryImages: [
        {
          url: "https://images.unsplash.com/photo-1698069005894-f01747b3f152?w=600&h=380&fit=crop&auto=format&q=80",
          caption: "The thousand torii tunnel at dawn",
        },
        {
          url: "https://images.unsplash.com/photo-1713346642924-fdda99d45870?w=600&h=380&fit=crop&auto=format&q=80",
          caption: "Lantern-lit shrines at nightfall",
        },
      ],
    },
  },
  {
    id: "fuji",
    index: 3,
    title: "Mount Fuji",
    kanji: "富士山",
    era: "Sacred Summit  ·  3,776 m",
    imageUrl:
      "https://images.unsplash.com/photo-1606918801925-e2c914c4b503?w=1920&h=1080&fit=crop&auto=format&q=85",
    accentColor: "#4a6fa5",
    overlayGradient:
      "linear-gradient(to top, rgba(2,5,16,0.82) 0%, rgba(8,18,45,0.3) 55%, rgba(2,5,16,0.55) 100%)",
    hotspot: { x: "50%", y: "38%" },
    panel: {
      description:
        "Mount Fuji is Japan's highest and most iconic summit — an active stratovolcano standing 3,776 meters above sea level. Last erupting in 1707 during the Hōei eruption, Fuji has been a site of Shinto religious pilgrimage, Buddhist meditation, and artistic inspiration for over a millennium. On clear days the mountain is visible from Tokyo, 100 kilometers to the northeast, its perfect symmetrical cone exercising a gravitational pull on the Japanese imagination unlike any other natural form.",
      cultural:
        "In Shinto cosmology, Mount Fuji is the dwelling place of Konohanasakuya-hime, goddess of flowering trees and the embodiment of delicate earthly life. The mountain was designated a UNESCO World Heritage Cultural Site in 2013, recognized not merely as a natural wonder but as a cultural landscape that has fundamentally shaped Japanese aesthetics and spiritual identity. Katsushika Hokusai's Thirty-six Views of Mount Fuji and Hiroshige's celebrated woodblock series secured Fuji's status as a global artistic symbol — one of the most reproduced natural subjects in human artistic history.",
      architectural:
        "The five lakes surrounding Fuji's base — Kawaguchiko, Yamanakako, Saiko, Shojiko, and Motosuko — were formed by ancient lava flows and offer mirror surfaces that double the mountain's visual impact at dawn. The classical compositional device of framing Fuji's cone through an architectural or natural foreground — a torii gate, a flowering branch, a lake's edge — appears across centuries of Japanese visual art as a device for suggesting the infinite depth between the sacred and the mundane.",
      galleryImages: [
        {
          url: "https://images.unsplash.com/photo-1509023464722-18d996393ca8?w=600&h=380&fit=crop&auto=format&q=80",
          caption: "Fuji at first light across the plain",
        },
        {
          url: "https://images.unsplash.com/photo-1618278942403-e973260cc425?w=600&h=380&fit=crop&auto=format&q=80",
          caption: "Lake Kawaguchi reflection",
        },
      ],
    },
  },
  {
    id: "sakura",
    index: 4,
    title: "Maruyama Sakura Garden",
    kanji: "円山公園の桜",
    era: "Spring  ·  Kyoto",
    imageUrl:
      "https://images.unsplash.com/photo-1557409518-691ebcd96038?w=1920&h=1080&fit=crop&auto=format&q=85",
    accentColor: "#d4789a",
    overlayGradient:
      "linear-gradient(to top, rgba(8,4,8,0.82) 0%, rgba(35,12,25,0.28) 48%, rgba(8,4,8,0.55) 100%)",
    hotspot: { x: "48%", y: "52%" },
    panel: {
      description:
        "Maruyama Park in the heart of Kyoto's Higashiyama district is home to Japan's most celebrated weeping cherry tree — the shidarezakura. More than a century old and illuminated against the night sky during blossom season, this singular tree has become the preeminent symbol of the fleeting transcendence that defines the Japanese aesthetic concept of mono no aware: the poignant awareness of impermanence, and the beauty that impermanence makes possible.",
      cultural:
        "Hanami — the ritual of flower viewing — traces its origins to the Nara period, when the imperial court gathered beneath blossoming plum trees to compose waka poetry. By the Heian era, cherry blossoms had eclipsed plum as the sovereign flower of aesthetic contemplation, their brief two-week bloom making them a living emblem of Buddhist teachings on the transience of all conditioned phenomena. The Edo-period shogunate democratized hanami by planting cherry trees in public parks throughout Japan — transforming a courtly ritual into a national practice of communal celebration and elegant mourning.",
      architectural:
        "The sakura's falling petals — a phenomenon called hanafubuki, or flower blizzard — settle on still water to create ephemeral mandalas of pale rose. Japanese garden designers across centuries have oriented viewing pavilions, tea houses, and bridges to maximize the dramatic encounter with blossoming sakura. The reflective pond in Maruyama Park doubles the illuminated weeping cherry's image each April night, creating a composition of extraordinary, irreproducible beauty that draws hundreds of thousands of visitors across Japan's blossom season.",
      galleryImages: [
        {
          url: "https://images.unsplash.com/photo-1598957232485-fab51e0ed7e8?w=600&h=380&fit=crop&auto=format&q=80",
          caption: "Cherry blossom tunnel, Kyoto",
        },
        {
          url: "https://images.unsplash.com/photo-1522383225653-ed111181a951?w=600&h=380&fit=crop&auto=format&q=80",
          caption: "Hanafubuki — the flower blizzard",
        },
      ],
    },
  },
];
