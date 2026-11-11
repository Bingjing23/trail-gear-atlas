import fs from "node:fs";

const CATALOG_PATH = "/Users/junzhou/Documents/ChatGPT/outdoor/gear-site/dist/catalog.json";
const GEAR_PATH = "/Users/junzhou/Documents/ChatGPT/outdoor/gear-site/dist/gear.json";

const existingCatalog = JSON.parse(fs.readFileSync(CATALOG_PATH, "utf-8"));
const existingGear = JSON.parse(fs.readFileSync(GEAR_PATH, "utf-8"));

const normalize = (str) => String(str || "").toLowerCase().replace(/[^a-z0-9]/g, "");

const existingKeys = new Set([
  ...existingCatalog.map((c) => normalize(c.brand + " " + c.name)),
  ...existingGear.map((g) => normalize(g.brand + " " + g.name)),
]);

const bplItems = [
  // =========================================================================
  // 1. Sleep & Shelter
  // =========================================================================
  {
    id: "cat-bpl-sleep-01",
    brand: "SlingFin",
    name: "Portal 2 Freestanding Ultralight Tent",
    category: "Sleep & Shelter",
    itemType: "tent",
    unitWeightG: 1500,
    unitPriceAud: 1099.00,
    retailers: ["Backpacking Light"],
    websiteUrl: "https://www.backpackinglight.com.au/products/slingfin-portal-2-tent",
    imagePath: "https://www.slingfin.com/cdn/shop/products/Portal2_Tent_Pitch_Angle.jpg",
    summary: "The strongest freestanding ultralight 2-person tent on earth. Engineered with internal guyline loops, KickStand vents, and 10D sil/sil fabric that resists high winds.",
    specs: {
      "Capacity": "2 Person",
      "Minimum Weight": "1.34 kg (Packed: 1.50 kg)",
      "Poles": "DAC Featherlite NFL 8.7mm",
      "Fabric": "10D 66 ripstop sil/sil nylon fly (zero PU degradation)",
      "Floor Area": "2.55 m² (27.5 sq ft)",
      "Head Height": "111 cm (44 in)"
    },
    features: [
      "Internal guyline architecture clips to trekking poles to withstand alpine storm gusts",
      "Dual KickStand high vents generate cross-flow air currents to eliminate condensation",
      "10D sil/sil fabric will never hydrolyze, delaminate, or become sticky over years of storage"
    ]
  },
  {
    id: "cat-bpl-sleep-02",
    brand: "SlingFin",
    name: "CrossBow 2 4-Season Expedition Tent",
    category: "Sleep & Shelter",
    itemType: "tent",
    unitWeightG: 2180,
    unitPriceAud: 1399.00,
    retailers: ["Backpacking Light"],
    websiteUrl: "https://www.backpackinglight.com.au/products/slingfin-crossbow-2-tent",
    imagePath: "https://www.slingfin.com/cdn/shop/products/CrossBow2_4-Season_Tent.jpg",
    summary: "Convertible 4-season alpine storm shelter with external WebTruss internal skeleton for rapid setup in blizzard conditions.",
    specs: {
      "Capacity": "2 Person",
      "Packed Weight": "2.18 kg",
      "Poles": "DAC 10.65mm PL alloy with WebTruss skeleton",
      "Season": "4-Season Alpine Expedition"
    },
    features: [
      "Patented WebTruss system holds poles firmly in place while sliding the tent body underneath in gale winds",
      "Can be pitched with breathable ripstop nylon inner or ultralight mesh inner",
      "Internal guyline clips withstand heavy alpine snow loads on exposed mountain ridges"
    ]
  },
  {
    id: "cat-bpl-sleep-03",
    brand: "Six Moon Designs",
    name: "Lunar Solo Ultralight Tent",
    category: "Sleep & Shelter",
    itemType: "tent",
    unitWeightG: 740,
    unitPriceAud: 489.00,
    retailers: ["Backpacking Light"],
    websiteUrl: "https://www.backpackinglight.com.au/products/six-moon-designs-lunar-solo-tent",
    imagePath: "https://www.sixmoondesigns.com/cdn/shop/products/LunarSolo-Green-Hero.jpg",
    summary: "The legendary single-wall ultralight solo shelter. Pitches with a single trekking pole and delivers 2.4 m² of livable floor area at just 740 grams.",
    specs: {
      "Capacity": "1 Person Solo",
      "Weight": "740g",
      "Floor Area": "2.4 m² (26 sq ft)",
      "Vestibule": "0.8 m² (8.5 sq ft)",
      "Poles Required": "1 Trekking Pole (set to 124 cm / 49 in)",
      "Fabric": "100% Silicone coated polyester (SilPoly)"
    },
    features: [
      "SilPoly fabric eliminates middle-of-the-night tent sag when soaked with rain",
      "Floating canopy allows micro-adjustment of ventilation and pitching height",
      "Deep 15cm bathtub floor prevents rain splashback and bog ground seepage"
    ]
  },
  {
    id: "cat-bpl-sleep-04",
    brand: "Six Moon Designs",
    name: "Gatewood Cape Ultralight Poncho Tarp",
    category: "Sleep & Shelter",
    itemType: "tarp",
    unitWeightG: 310,
    unitPriceAud: 279.00,
    retailers: ["Backpacking Light"],
    websiteUrl: "https://www.backpackinglight.com.au/products/six-moon-designs-gatewood-cape",
    imagePath: "https://www.sixmoondesigns.com/cdn/shop/products/GatewoodCape-Green.jpg",
    summary: "Dual-purpose ultralight marvel: functions as a full-coverage rain poncho while hiking, and pitches as a 360-degree pyramid shelter in camp.",
    specs: {
      "Weight": "310g (11 oz)",
      "Coverage": "3.2 m² (35 sq ft)",
      "Dual Function": "Pack poncho & shaped pyramid tarp",
      "Fabric": "15D SilNylon"
    },
    features: [
      "Eliminates the separate weight of both a hardshell rain jacket and a tent from your pack",
      "360-degree closed pyramid protects against wind and blowing rain from all angles",
      "Adjustable hood with dual drawcords doubles as the shelter peak ventilation cap"
    ]
  },
  {
    id: "cat-bpl-sleep-05",
    brand: "Six Moon Designs",
    name: "Haven Ultralight Tarp",
    category: "Sleep & Shelter",
    itemType: "tarp",
    unitWeightG: 510,
    unitPriceAud: 549.00,
    retailers: ["Backpacking Light"],
    websiteUrl: "https://www.backpackinglight.com.au/products/six-moon-designs-haven-tarp",
    imagePath: "https://www.sixmoondesigns.com/cdn/shop/products/HavenTarp-Green.jpg",
    summary: "Dual trekking-pole 2-person shaped catenary shelter providing 4.9 m² of interior floor space at an ultralight 510g.",
    specs: {
      "Capacity": "2 Person",
      "Weight": "510g",
      "Poles Required": "2 Trekking Poles (115 cm)",
      "Fabric": "30D silicone coated polyester (zero sag)"
    },
    features: [
      "Dual wide vestibules allow independent entry and boot storage for both hikers",
      "Steep side walls shed driving rain and high winds effortlessly",
      "Compatible with the Haven NetTent for full bug-free double-wall conversion"
    ]
  },
  {
    id: "cat-bpl-sleep-06",
    brand: "Gossamer Gear",
    name: "The Two Ultralight Tent",
    category: "Sleep & Shelter",
    itemType: "tent",
    unitWeightG: 667,
    unitPriceAud: 699.00,
    retailers: ["Backpacking Light"],
    websiteUrl: "https://www.backpackinglight.com.au/products/gossamer-gear-the-two-tent",
    imagePath: "https://www.gossamergear.com/cdn/shop/products/TheTwo_Pitch_Side.jpg",
    summary: "Full-protection 2-person ultralight trekking pole tent weighing just 667g with factory seam-taped custom Sil/PU fabric and dual doors.",
    specs: {
      "Capacity": "2 Person",
      "Weight": "667g (Shelter body)",
      "Floor Dimensions": "213 x 122/107 cm",
      "Poles": "2 Trekking poles set to 115-120cm"
    },
    features: [
      "Spacious enough for two wide 63cm sleeping pads without side wall contact",
      "Factory seam-taped waterproof seams: zero messy manual seam-sealing required",
      "Large mesh canopy walls keep condensation away from sleeping quilts"
    ]
  },
  {
    id: "cat-bpl-sleep-07",
    brand: "Liteway",
    name: "PyraOmm Plus Ultralight Tarp",
    category: "Sleep & Shelter",
    itemType: "tarp",
    unitWeightG: 500,
    unitPriceAud: 399.00,
    retailers: ["Backpacking Light"],
    websiteUrl: "https://www.backpackinglight.com.au/products/liteway-pyraomm-plus",
    imagePath: "https://liteway.equipment/image/cache/catalog/tents/pyraomm-plus-olive-1000x1000.jpg",
    summary: "Handcrafted in Ukraine with 1.1 oz Silpoly 20D. Pyramid shaped tarp offering exceptional wind stability and spacious comfort for 1-2 hikers.",
    specs: {
      "Weight": "500g",
      "Dimensions": "276 x 200 x 140 cm",
      "Material": "1.1 oz Silpoly 20D 2000mm waterhead",
      "Zipper": "YKK Aquaguard #5 waterproof zipper"
    },
    features: [
      "Pyramid geometry deflects 80km/h gale winds with ease when pegged tautly",
      "Silpoly fabric absorbs near-zero moisture, drying twice as fast as traditional silnylon",
      "Top ventilation apex vents prevent warm breath condensation accumulation"
    ]
  },
  {
    id: "cat-bpl-sleep-08",
    brand: "Big Agnes",
    name: "Fly Creek HV UL2 Solution Dye Tent",
    category: "Sleep & Shelter",
    itemType: "tent",
    unitWeightG: 1020,
    unitPriceAud: 749.00,
    retailers: ["Backpacking Light"],
    websiteUrl: "https://www.backpackinglight.com.au/products/big-agnes-fly-creek-hv-ul2",
    imagePath: "https://www.bigagnes.com/cdn/shop/products/THVFC221-Fly-Creek-HV-UL2-Olive-Green-Angle_1200x.jpg",
    summary: "The pioneer of ultralight semi-freestanding double-wall tents. Solution-dyed fabric reduces energy and water use in manufacturing while boosting UV resistance.",
    specs: {
      "Capacity": "2 Person",
      "Trail Weight": "0.88 kg (Packed: 1.02 kg)",
      "Poles": "DAC Featherlite NFL single-hub pole",
      "Floor Area": "2.6 m²"
    },
    features: [
      "Solution-dyed fabric is highly resistant to UV fade from intense high-altitude sunlight",
      "High Volume pole architecture delivers steep walls and 102cm peak sitting headroom",
      "TipLok Tent Buckle combines pole tip stabilization and rainfly tensioning"
    ]
  },

  // =========================================================================
  // 2. Packs & Essentials
  // =========================================================================
  {
    id: "cat-bpl-pack-01",
    brand: "ULA Equipment",
    name: "Circuit Ultralight Backpack",
    category: "Packs & Essentials",
    itemType: "backpack",
    unitWeightG: 1048,
    unitPriceAud: 549.00,
    retailers: ["Backpacking Light"],
    websiteUrl: "https://www.backpackinglight.com.au/products/ula-circuit-backpack",
    imagePath: "https://www.ula-equipment.com/wp-content/uploads/2021/01/Circuit-Hero.jpg",
    summary: "The #1 backpack on the Pacific Crest Trail and Continental Divide Trail. 68L capacity with carbon fiber/Delrin suspension hoop and massive front mesh pocket.",
    specs: {
      "Capacity": "68 Litres (Main: 39L, Extension: 8L, Pockets: 21L)",
      "Weight": "1048g (2.3 lbs)",
      "Max Comfort Load": "16 kg (35 lbs)",
      "Frame": "Carbon fiber and Delrin suspension hoop with aluminum stay"
    },
    features: [
      "Contoured hipbelt with dual zippered pockets fits everything from smartphones to satellite beacons",
      "Front high-stretch heavy-duty mesh pocket stows wet rainfly, trail sandals, and water filtration",
      "Roll-top compression closure expands to carry up to 7 days of wilderness food rations"
    ]
  },
  {
    id: "cat-bpl-pack-02",
    brand: "ULA Equipment",
    name: "Catalyst Expedition Backpack",
    category: "Packs & Essentials",
    itemType: "backpack",
    unitWeightG: 1360,
    unitPriceAud: 589.00,
    retailers: ["Backpacking Light"],
    websiteUrl: "https://www.backpackinglight.com.au/products/ula-catalyst-backpack",
    imagePath: "https://www.ula-equipment.com/wp-content/uploads/2021/01/Catalyst-Hero.jpg",
    summary: "Heavy-duty load hauling capacity (up to 18kg) inside an ultralight 75L chassis featuring dual aluminum stays and bear canister compatibility.",
    specs: {
      "Capacity": "75 Litres",
      "Weight": "1.36 kg",
      "Max Load": "18 kg (40 lbs)",
      "Frame": "Dual aluminum stays + full foam backpanel"
    },
    features: [
      "Accommodates full-size bear canisters horizontally across the upper pack body",
      "Dual aluminum frame stays transfer heavy multi-day food and water loads directly to the iliac crest",
      "Deep side water bottle pockets angled for one-handed bottle retrieval while walking"
    ]
  },
  {
    id: "cat-bpl-pack-03",
    brand: "ULA Equipment",
    name: "Ohm 2.0 Ultralight Backpack",
    category: "Packs & Essentials",
    itemType: "backpack",
    unitWeightG: 935,
    unitPriceAud: 499.00,
    retailers: ["Backpacking Light"],
    websiteUrl: "https://www.backpackinglight.com.au/products/ula-ohm-2-0-backpack",
    imagePath: "https://www.ula-equipment.com/wp-content/uploads/2021/01/Ohm-Hero.jpg",
    summary: "Sub-1kg active framing pack with 63L volume, active carbon hoop suspension, and full side compression cord system.",
    specs: {
      "Capacity": "63 Litres",
      "Weight": "935g",
      "Max Load": "14 kg (30 lbs)",
      "Fabric": "400D Robic nylon"
    },
    features: [
      "Full side compression cords cinch down the pack into a tight, agile daypack size",
      "Active carbon suspension flexes naturally with hip and torso movement while scrambling",
      "Durable Robic fabric resists scrapes against rough Australian scrub and boulder fields"
    ]
  },
  {
    id: "cat-bpl-pack-04",
    brand: "Gossamer Gear",
    name: "Mariposa 60 Ultralight Backpack",
    category: "Packs & Essentials",
    itemType: "backpack",
    unitWeightG: 884,
    unitPriceAud: 529.00,
    retailers: ["Backpacking Light"],
    websiteUrl: "https://www.backpackinglight.com.au/products/gossamer-gear-mariposa-60",
    imagePath: "https://www.gossamergear.com/cdn/shop/products/Mariposa60_Hero.jpg",
    summary: "Thru-hiking legend. 60L capacity, PVT pivoting frame system, and 7 exterior pockets including full-length quiver pocket for trekking umbrellas.",
    specs: {
      "Capacity": "60 Litres (Main: 36L, Pockets: 24L)",
      "Weight": "884g (Medium with hipbelt)",
      "Max Load": "16 kg (35 lbs)",
      "Frame": "Removable lightweight internal aluminum stay with PVT frame"
    },
    features: [
      "External sit-pad pocket holds a foam sleeping pad or sit pad that doubles as lumbar padding",
      "Full-length side pocket accommodates tall trekking umbrellas, tent poles, or packrafts",
      "PVT Frame system rotates with your hips to eliminate friction sores on long hiking days"
    ]
  },
  {
    id: "cat-bpl-pack-05",
    brand: "Gossamer Gear",
    name: "Gorilla 50 Ultralight Backpack",
    category: "Packs & Essentials",
    itemType: "backpack",
    unitWeightG: 804,
    unitPriceAud: 489.00,
    retailers: ["Backpacking Light"],
    websiteUrl: "https://www.backpackinglight.com.au/products/gossamer-gear-gorilla-50",
    imagePath: "https://www.gossamergear.com/cdn/shop/products/Gorilla50_Hero.jpg",
    summary: "The quintessential weekend-to-week ultralight pack. 50L capacity, removable internal frame stay, and custom Robic nylon construction.",
    specs: {
      "Capacity": "50 Litres",
      "Weight": "804g",
      "Max Load": "14 kg",
      "Fabric": "Custom 70D and 100D Robic nylon"
    },
    features: [
      "Strippable design allows removing frame stay and hipbelt to drop weight down to 500g",
      "Over-the-top compression strap secures roll-top dry bags, bear cans, or packrafts",
      "Front stretch mesh pocket dries damp tent flies and rain apparel on the move"
    ]
  },
  {
    id: "cat-bpl-pack-06",
    brand: "Gossamer Gear",
    name: "Kumo 36 Superlight Backpack",
    category: "Packs & Essentials",
    itemType: "backpack",
    unitWeightG: 580,
    unitPriceAud: 369.00,
    retailers: ["Backpacking Light"],
    websiteUrl: "https://www.backpackinglight.com.au/products/gossamer-gear-kumo-36",
    imagePath: "https://www.gossamergear.com/cdn/shop/products/Kumo36_Hero.jpg",
    summary: "Frameless fastpacking and day-to-weekend rucksack weighing just 580g, engineered for fast and light trail movements.",
    specs: {
      "Capacity": "36 Litres",
      "Weight": "580g (Stripped: 430g)",
      "Structure": "Frameless (with included SitLight foam backpad)"
    },
    features: [
      "Dual water bottle shoulder strap pockets fit soft flasks or GPS devices right at chest height",
      "Removable webbing hipbelt with zippered pockets keeps essentials accessible on the move",
      "Top zipper flap pocket stores headlamp, map, and sunglasses for fast access"
    ]
  },
  {
    id: "cat-bpl-pack-07",
    brand: "Pa'Lante Packs",
    name: "V2 Ultralight Backpack",
    category: "Packs & Essentials",
    itemType: "backpack",
    unitWeightG: 495,
    unitPriceAud: 499.00,
    retailers: ["Backpacking Light"],
    websiteUrl: "https://www.backpackinglight.com.au/products/palante-v2-backpack",
    imagePath: "https://palantepacks.com/cdn/shop/products/V2_BlackUltra_Hero.jpg",
    summary: "Cult classic minimalist frameless pack featuring the signature bottom stash pocket, allowing continuous eating and trash storage on the move.",
    specs: {
      "Capacity": "37 Litres (Internal: 31L)",
      "Weight": "495g (17.5 oz)",
      "Fabric": "Challenge Ultra200 woven UHMWPE fabric",
      "Origin": "Ultralight cottage design"
    },
    features: [
      "Signature bottom Lycra pocket allows grabbing snacks or stashing trash without taking pack off",
      "Shoulder strap stretch pockets carry soft flasks and smartphones right in front of chest",
      "Ultra200 fabric provides waterproof laminates and extraordinary tear resistance"
    ]
  },
  {
    id: "cat-bpl-pack-08",
    brand: "Pa'Lante Packs",
    name: "Desert Pack",
    category: "Packs & Essentials",
    itemType: "backpack",
    unitWeightG: 570,
    unitPriceAud: 529.00,
    retailers: ["Backpacking Light"],
    websiteUrl: "https://www.backpackinglight.com.au/products/palante-desert-pack",
    imagePath: "https://palantepacks.com/cdn/shop/products/DesertPack_Sand_Hero.jpg",
    summary: "Rugged ultralight pack designed for long water carries across arid trails and thorny off-track scrub with reinforced side and bottom pockets.",
    specs: {
      "Capacity": "43 Litres",
      "Weight": "570g",
      "Fabric": "UltraWeave and heavy-duty gridstop",
      "Features": "Bottom pocket + 4 bottle side capacity"
    },
    features: [
      "Oversized dual side pockets hold up to four 1.5L Smartwater bottles for dry desert trail sections",
      "Reinforced heavy-duty bottom fabric resists abrasions from coarse granite and sand dunes",
      "Breathable Spacer Mesh shoulder harness cushions heavy water carries comfortably"
    ]
  },
  {
    id: "cat-bpl-pack-09",
    brand: "Granite Gear",
    name: "Crown3 60 Backpack",
    category: "Packs & Essentials",
    itemType: "backpack",
    unitWeightG: 1080,
    unitPriceAud: 399.00,
    retailers: ["Backpacking Light"],
    websiteUrl: "https://www.backpackinglight.com.au/products/granite-gear-crown3-60",
    imagePath: "https://www.granitegear.com/media/catalog/product/c/r/crown3-60-dune.jpg",
    summary: "Vapor Current Mark 3 frame system with Re-Fit adjustable hipbelt and removable lid that converts to a chest pack.",
    specs: {
      "Capacity": "60 Litres",
      "Weight": "1.08 kg (Stripped: 850g)",
      "Max Load": "16 kg (Optional aluminum stay boosts to 20kg)",
      "Fabric": "100D and 210D High-tenacity nylon with Robic"
    },
    features: [
      "Re-Fit hipbelt adjusts effortlessly between 26 to 42 inches for exact anatomical fit",
      "Removable top lid can be worn across the chest as a front balance pouch",
      "Molded composite foam backpanel with air channels prevents heat buildup"
    ]
  },
  {
    id: "cat-bpl-pack-10",
    brand: "Neve Gear",
    name: "Wallaby 40L Ultralight Backpack",
    category: "Packs & Essentials",
    itemType: "backpack",
    unitWeightG: 480,
    unitPriceAud: 399.00,
    retailers: ["Backpacking Light"],
    websiteUrl: "https://nevegear.com.au/products/wallaby-ultralight-backpack",
    imagePath: "https://nevegear.com.au/cdn/shop/products/wallaby-pack-black.jpg",
    summary: "Australian handcrafted frameless ultralight backpack built with Challenge Ultra200 fabric for rugged Australian bushwalking.",
    specs: {
      "Capacity": "40 Litres",
      "Weight": "480g",
      "Fabric": "Challenge Ultra200 (UHMWPE face with waterproof RUV film)",
      "Origin": "Made in Australia"
    },
    features: [
      "Ultra200 fabric offers 3x higher cut resistance and waterproof laminates",
      "High-tensile stretch mesh front pocket for wet rain gear and trail sandals",
      "Tapered body profile moves naturally with arms during pole-assisted hiking"
    ]
  },
  {
    id: "cat-bpl-pack-11",
    brand: "Liteway",
    name: "Gramless Pack 35L",
    category: "Packs & Essentials",
    itemType: "backpack",
    unitWeightG: 390,
    unitPriceAud: 289.00,
    retailers: ["Backpacking Light"],
    websiteUrl: "https://www.backpackinglight.com.au/products/liteway-gramless-pack-35",
    imagePath: "https://liteway.equipment/image/cache/catalog/backpacks/gramless-pack-olive-1000x1000.jpg",
    summary: "Ultra-minimalist frameless pack weighing only 390g, handcrafted with X-Pac / Ultra fabrics for true ultralight purists.",
    specs: {
      "Capacity": "35 Litres",
      "Weight": "390g",
      "Max Load": "10 kg",
      "Closure": "Roll-top with magnetic snaps"
    },
    features: [
      "Featherweight 390g chassis reduces base pack weight to the absolute minimum",
      "Roll-top closure with Fidlock magnetic snap system opens and closes in one second",
      "Deep side pockets with drainage grommets and elastic cord cinch"
    ]
  },
  {
    id: "cat-bpl-pack-12",
    brand: "Cascade Mountain Tech",
    name: "Quick Lock Carbon Fiber Trekking Poles",
    category: "Packs & Essentials",
    itemType: "trekking poles",
    unitWeightG: 440,
    unitPriceAud: 139.95,
    retailers: ["Backpacking Light"],
    websiteUrl: "https://www.backpackinglight.com.au/products/cascade-mountain-tech-carbon-poles",
    imagePath: "https://cascademountaintech.com/cdn/shop/products/carbon-quick-lock-cork.jpg",
    summary: "100% carbon fiber shafts with natural cork grips, padded wrist straps, and quick-lever locks at an unbeatable price-to-weight ratio.",
    specs: {
      "Weight (Pair)": "440g (220g per pole)",
      "Usable Length": "66 - 137 cm (26 - 54 in)",
      "Shaft": "100% Carbon fiber",
      "Grip": "Natural moisture-wicking cork"
    },
    features: [
      "Natural cork handle absorbs hand moisture and prevents blisters over long hot miles",
      "Carbon fiber dampens trail vibrations to prevent elbow tendinitis on rocky descents",
      "Quick-Lock aluminum lever clamps provide slip-free height adjustments in rain and mud"
    ]
  },

  // =========================================================================
  // 3. Sleep Systems & Quilts
  // =========================================================================
  {
    id: "cat-bpl-sleep-09",
    brand: "Enlightened Equipment",
    name: "Enigma 20°F (-6°C) Down Quilt",
    category: "Sleep & Shelter",
    itemType: "quilt",
    unitWeightG: 545,
    unitPriceAud: 589.00,
    retailers: ["Backpacking Light"],
    websiteUrl: "https://www.backpackinglight.com.au/products/enlightened-equipment-enigma-20",
    imagePath: "https://enlightenedequipment.com/cdn/shop/products/Enigma_NavyCharcoal_Hero.jpg",
    summary: "Ultralight down quilt featuring a sewn closed round footbox for maximum toe warmth and draft elimination. 850+ loft DownTek water-repellent down.",
    specs: {
      "Temperature Rating": "20°F (-6°C)",
      "Weight": "545g (Regular/Regular)",
      "Down Fill": "850+ fill power DownTek water-resistant goose down",
      "Shell": "10D ultralight nylon with DWR",
      "Footbox": "Sewn closed round footbox (Zero drafts)"
    },
    features: [
      "Sewn footbox traps warm air around toes without the bulk or zipper weight of open quilts",
      "Elastic pad attachment straps keep quilt centered and draft-free on your sleeping mat",
      "Continuous U-shaped baffles optimize down distribution over your chest and shoulders"
    ]
  },
  {
    id: "cat-bpl-sleep-10",
    brand: "Neve Gear",
    name: "Waratah -2°C Ultralight Down Quilt",
    category: "Sleep & Shelter",
    itemType: "quilt",
    unitWeightG: 560,
    unitPriceAud: 499.00,
    retailers: ["Backpacking Light"],
    websiteUrl: "https://nevegear.com.au/products/waratah-down-quilt",
    imagePath: "https://nevegear.com.au/cdn/shop/products/waratah-quilt-teal.jpg",
    summary: "Australian handcrafted ultralight down quilt filled with 850+ loft RDS down, featuring differential cut baffles and an interchangeable footbox.",
    specs: {
      "Temperature Rating": "-2°C Comfort",
      "Weight": "560g",
      "Down Fill": "850+ loft RDS Down",
      "Origin": "Handmade in Australia"
    },
    features: [
      "Differential cut outer shell prevents compression of down when knees press against fabric",
      "Draft collar with snap closure seals neck area against cold winter air infiltration",
      "Dual pad strap system locks onto standard 51cm and 63cm wide sleeping mats"
    ]
  },
  {
    id: "cat-bpl-sleep-11",
    brand: "Liteway",
    name: "Sleeper Quilt Apex 133",
    category: "Sleep & Shelter",
    itemType: "quilt",
    unitWeightG: 680,
    unitPriceAud: 349.00,
    retailers: ["Backpacking Light"],
    websiteUrl: "https://www.backpackinglight.com.au/products/liteway-sleeper-quilt-apex",
    imagePath: "https://liteway.equipment/image/cache/catalog/quilts/sleeper-quilt-apex-olive-1000x1000.jpg",
    summary: "Climashield Apex continuous filament synthetic quilt that retains insulation when damp, and unzips in the center to wear as a warm camp poncho.",
    specs: {
      "Temperature Rating": "+4°C Comfort",
      "Weight": "680g",
      "Insulation": "Climashield Apex 133 g/m² synthetic insulation",
      "Multi-function": "Sleeping quilt & wearable insulated camp poncho"
    },
    features: [
      "Climashield Apex maintains loft and warmth even in soaked condensation conditions",
      "Central head-slot zipper allows wearing as a warm insulated puffy poncho around camp",
      "Zero shifting of insulation: continuous filament eliminates cold spots entirely"
    ]
  },
  {
    id: "cat-bpl-sleep-12",
    brand: "Therm-a-Rest",
    name: "Vesper 20°F Ultralight Down Quilt",
    category: "Sleep & Shelter",
    itemType: "quilt",
    unitWeightG: 540,
    unitPriceAud: 599.00,
    retailers: ["Backpacking Light"],
    websiteUrl: "https://www.backpackinglight.com.au/products/therm-a-rest-vesper-20-quilt",
    imagePath: "https://www.thermarest.com/dw/image/v2/BDDX_PRD/on/demandware.static/-/Sites-cascadedesigns-master/default/dw83efad41/13171-Vesper-20F-Hero.jpg",
    summary: "Featherweight 540g quilt filled with 900-fill Nikwax Hydrophobic Down, box-baffled construction, and full perimeter side baffles to stop drafts.",
    specs: {
      "Temperature Rating": "20°F (-6°C Limit)",
      "Weight": "540g (Regular)",
      "Fill": "900-fill Nikwax Hydrophobic Down (stays dry 60x longer)",
      "Shell": "10D ripstop nylon with DWR"
    },
    features: [
      "900-fill Nikwax down absorbs 90% less water and dries 3x faster than untreated down",
      "Perimeter side baffles wrap around sleeping mat edges to block chilling side drafts",
      "SynergyLink connectors anchor the quilt directly to your sleeping pad"
    ]
  },
  {
    id: "cat-bpl-sleep-13",
    brand: "Gossamer Gear",
    name: "Thinlight Foam Pad 1/8\"",
    category: "Sleep & Shelter",
    itemType: "sleep pad",
    unitWeightG: 74,
    unitPriceAud: 49.95,
    retailers: ["Backpacking Light"],
    websiteUrl: "https://www.backpackinglight.com.au/products/gossamer-gear-thinlight-foam-pad",
    imagePath: "https://www.gossamergear.com/cdn/shop/products/Thinlight_Rolled_Hero.jpg",
    summary: "The iconic 74g ultralight closed-cell foam pad used by thru-hikers worldwide under inflatable mats for puncture protection, anti-slip grip, and added R-value.",
    specs: {
      "Weight": "74g (2.6 oz)",
      "Thickness": "3.17 mm (1/8 in)",
      "Dimensions": "150 x 48 cm",
      "Material": "Cross-linked Evazote closed-cell foam"
    },
    features: [
      "Protects expensive inflatable air pads against sharp spines, thorns, and granite grit",
      "High-friction foam texture stops sleeping mats from sliding on slick tent floors",
      "Folds up in seconds to serve as a clean trail lunch sit-mat or yoga stretching pad"
    ]
  },
  {
    id: "cat-bpl-sleep-14",
    brand: "Big Agnes",
    name: "Rapide SL Insulated Sleeping Pad",
    category: "Sleep & Shelter",
    itemType: "sleep pad",
    unitWeightG: 510,
    unitPriceAud: 279.00,
    retailers: ["Backpacking Light"],
    websiteUrl: "https://www.backpackinglight.com.au/products/big-agnes-rapide-sl-insulated",
    imagePath: "https://www.bigagnes.com/cdn/shop/products/Rapide-SL-Insulated-Pad-Gold.jpg",
    summary: "Offset I-Beam construction with PrimaLoft Silver insulation. R-value 4.8, 9cm thickness with larger outer chambers to keep you centered.",
    specs: {
      "R-Value": "4.8 (ASTM F3340-18)",
      "Weight": "510g (Regular 183 x 51 cm)",
      "Thickness": "9 cm (3.5 in) with 11cm outer rails",
      "Insulation": "PrimaLoft Silver with two layers of heat-reflective film"
    },
    features: [
      "Oversized outer chambers act as soft side bumpers to prevent rolling off during deep sleep",
      "PrimaLoft Silver insulation laminated to reflective film traps radiant body warmth silently",
      "High-volume dual one-way valve allows rapid inflation with the included pumphouse sack"
    ]
  },

  // =========================================================================
  // 4. Cooking & Hydration
  // =========================================================================
  {
    id: "cat-bpl-cook-01",
    brand: "Evernew",
    name: "Titanium Ultralight Pot 0.6L (ECA251)",
    category: "Cooking & Hydration",
    itemType: "pot",
    unitWeightG: 95,
    unitPriceAud: 119.00,
    retailers: ["Backpacking Light"],
    websiteUrl: "https://www.backpackinglight.com.au/products/evernew-ti-ultralight-pot-0-6l",
    imagePath: "https://evernew-global.com/wp-content/uploads/2021/02/ECA251R_01.jpg",
    summary: "Handcrafted in Japan using 0.3mm ultra-thin titanium plate. Weighs only 95g with red heat-resistant silicone coated folding handles.",
    specs: {
      "Capacity": "600 ml",
      "Weight": "95g",
      "Material": "0.3mm ultralight Japanese pure titanium",
      "Dimensions": "12.4 x 5.2 cm",
      "Origin": "Made in Tsubame, Japan"
    },
    features: [
      "20% lighter than standard 0.4mm titanium pots thanks to precision cold-forging in Japan",
      "Nests a standard 110g gas canister and micro stove inside with lid closed",
      "Pouring spout and embossed volume graduation markings inside pot wall"
    ]
  },
  {
    id: "cat-bpl-cook-02",
    brand: "Evernew",
    name: "Titanium Mug Pot 500 (ECA252)",
    category: "Cooking & Hydration",
    itemType: "pot",
    unitWeightG: 75,
    unitPriceAud: 109.00,
    retailers: ["Backpacking Light"],
    websiteUrl: "https://www.backpackinglight.com.au/products/evernew-ti-mug-pot-500",
    imagePath: "https://evernew-global.com/wp-content/uploads/2021/02/ECA252R_01.jpg",
    summary: "Deep rim nested titanium cup pot weighing an astonishing 75g, with a ridge bottom engineered specifically to fit onto canister stove prongs.",
    specs: {
      "Capacity": "550 ml",
      "Weight": "75g (2.6 oz)",
      "Bottom Feature": "Ridge ring locks onto stove pot supports",
      "Origin": "Made in Japan"
    },
    features: [
      "Ridge ring on base prevents pot from sliding off small ultralight burner prongs",
      "Lid features cable hole for hanging or lifting with a trekking pole tip",
      "Holds a 110g isobutane canister and BRS-3000T micro stove perfectly inside"
    ]
  },
  {
    id: "cat-bpl-cook-03",
    brand: "Evernew",
    name: "Titanium Pasta Pot 750ml (ECA265)",
    category: "Cooking & Hydration",
    itemType: "pot",
    unitWeightG: 95,
    unitPriceAud: 129.00,
    retailers: ["Backpacking Light"],
    websiteUrl: "https://www.backpackinglight.com.au/products/evernew-ti-pasta-pot-750",
    imagePath: "https://evernew-global.com/wp-content/uploads/2021/02/ECA265R_01.jpg",
    summary: "Ultralight titanium pot with built-in straining holes in the lid, designed specifically for draining noodles and rehydrating trail pasta.",
    specs: {
      "Capacity": "750 ml",
      "Weight": "95g",
      "Lid": "Perforated strainer lid with locking rim",
      "Material": "0.3mm Japanese pure titanium"
    },
    features: [
      "Strainer lid eliminates dropped noodles and pasta into camp dirt while pouring water",
      "Pouring spout provides controlled water flow when filling dehydrated meal pouches",
      "Silicone covered folding handles protect fingers from open stove flames"
    ]
  },
  {
    id: "cat-bpl-cook-04",
    brand: "Evernew",
    name: "Titanium Alcohol Stove (EBY254)",
    category: "Cooking & Hydration",
    itemType: "stove",
    unitWeightG: 34,
    unitPriceAud: 89.00,
    retailers: ["Backpacking Light"],
    websiteUrl: "https://www.backpackinglight.com.au/products/evernew-ti-alcohol-stove",
    imagePath: "https://evernew-global.com/wp-content/uploads/2021/02/EBY254_01.jpg",
    summary: "The benchmark ultralight alcohol burner. Bi-directional bi-level jet system vaporizes methylated spirits in seconds at a featherweight 34 grams.",
    specs: {
      "Weight": "34g (1.2 oz)",
      "Fuel Capacity": "70 ml",
      "Burn Time": "Boils 400ml in 4.5 minutes on 25ml of fuel",
      "Material": "Pure titanium"
    },
    features: [
      "Upper and lower dual jet holes generate stable, clean blue flame with zero soot",
      "Internal level measurement lines (30ml, 60ml) eliminate fuel wastage",
      "Operates silently with zero moving parts, pumps, or seals to break down in wilderness"
    ]
  },
  {
    id: "cat-bpl-cook-05",
    brand: "BRS",
    name: "BRS-3000T Ultralight 25g Titanium Micro Stove",
    category: "Cooking & Hydration",
    itemType: "stove",
    unitWeightG: 25,
    unitPriceAud: 39.95,
    retailers: ["Backpacking Light"],
    websiteUrl: "https://www.backpackinglight.com.au/products/brs-3000t-titanium-stove",
    imagePath: "https://m.media-amazon.com/images/I/61K-3T7+1JL._AC_SL1200_.jpg",
    summary: "The world's lightest canister stove at 25 grams. Delivers 2700W high-speed flame output and folds down to the size of a thumb.",
    specs: {
      "Weight": "25g (0.88 oz)",
      "Power": "2,700 Watts",
      "Dimensions Folded": "37 x 52 mm",
      "Material": "Aerospace titanium alloy and brass valve"
    },
    features: [
      "Weighs less than an AA battery and disappears inside any titanium mug",
      "High-velocity vertical torch flame boils 500ml of water in under 3 minutes",
      "Precision brass control needle valve allows smooth flame adjustment"
    ]
  },
  {
    id: "cat-bpl-cook-06",
    brand: "SOTO",
    name: "Amicus Stove with Stealth Igniter",
    category: "Cooking & Hydration",
    itemType: "stove",
    unitWeightG: 81,
    unitPriceAud: 79.95,
    retailers: ["Backpacking Light"],
    websiteUrl: "https://www.backpackinglight.com.au/products/soto-amicus-stove-with-stealth-igniter",
    imagePath: "https://sotooutdoors.com/wp-content/uploads/2018/06/OD-1NVE_hero.jpg",
    summary: "High-value Japanese canister stove featuring a concave recessed burner head and shock-resistant internal piezo igniter.",
    specs: {
      "Weight": "81g (2.8 oz)",
      "Output": "3,030 W (10,210 BTU)",
      "Ignition": "Internal Stealth Igniter wire (shock protected)",
      "Pot Supports": "4 folding spring-loaded arms"
    },
    features: [
      "Concave burner head deflects crosswinds without carrying heavy metal windshields",
      "Internal stealth igniter wire runs through center post, protected from impact damage",
      "4 spring-loaded pot supports fold down tightly against the valve body"
    ]
  },
  {
    id: "cat-bpl-cook-07",
    brand: "Hydrapak",
    name: "Seeker 2L Ultralight Water Container",
    category: "Cooking & Hydration",
    itemType: "water container",
    unitWeightG: 76,
    unitPriceAud: 44.95,
    retailers: ["Backpacking Light"],
    websiteUrl: "https://www.backpackinglight.com.au/products/hydrapak-seeker-2l",
    imagePath: "https://hydrapak.com/cdn/shop/products/Seeker-2L-Mammoth.jpg",
    summary: "Ultra-durable rollable TPU water storage bag. 42mm threaded opening connects directly to Katadyn BeFree filters and weighs just 76g.",
    specs: {
      "Capacity": "2.0 Litres (70 fl oz)",
      "Weight": "76g",
      "Thread": "42 mm standard wide opening",
      "Material": "Ultra-durable, abrasion-resistant TPU & RF-welded seams"
    },
    features: [
      "Connects seamlessly to Katadyn BeFree 42mm water filtration cartridges",
      "Rolls down to the size of a fist and slides into internal storage pouch when empty",
      "Dual side lash points allow hanging from trees for gravity camp water filtration"
    ]
  },
  {
    id: "cat-bpl-cook-08",
    brand: "Hydrapak",
    name: "Flux 1.5L Flexible Bottle",
    category: "Cooking & Hydration",
    itemType: "water container",
    unitWeightG: 97,
    unitPriceAud: 49.95,
    retailers: ["Backpacking Light"],
    websiteUrl: "https://www.backpackinglight.com.au/products/hydrapak-flux-1-5l",
    imagePath: "https://hydrapak.com/cdn/shop/products/Flux-1.5L-Mammoth.jpg",
    summary: "Shaped like a hard bottle, compresses like a soft flask. Features a spill-proof Twist Cap with high-flow dust cover valve.",
    specs: {
      "Capacity": "1.5 Litres (50 fl oz)",
      "Weight": "97g",
      "Cap": "Twist cap with self-sealing high-flow bite valve",
      "Filter Compatibility": "42mm threaded filter compatible"
    },
    features: [
      "Stands upright on camp tables like a rigid bottle, but shrinks as you drink",
      "Dual-layer film laminate provides structural rigidity and puncture protection",
      "Flexible bail handle provides comfortable carry and carabiner clip attachment"
    ]
  },
  {
    id: "cat-bpl-cook-09",
    brand: "Sawyer",
    name: "Micro Squeeze Water Filtration System",
    category: "Cooking & Hydration",
    itemType: "water filter",
    unitWeightG: 57,
    unitPriceAud: 74.95,
    retailers: ["Backpacking Light"],
    websiteUrl: "https://www.backpackinglight.com.au/products/sawyer-micro-squeeze-filter",
    imagePath: "https://www.sawyer.com/wp-content/uploads/2018/09/SP2129_hero.jpg",
    summary: "Compact 0.1 micron hollow fiber membrane filter weighing only 57g, rated to filter up to 100,000 gallons of drinking water.",
    specs: {
      "Weight": "57g (2.0 oz)",
      "Pore Size": "0.1 Micron absolute",
      "Life Rating": "Up to 100,000 Gallons",
      "Thread": "28mm standard bottle thread"
    },
    features: [
      "Screws directly onto disposable Smartwater and soda bottles or the included pouch",
      "Removes 99.99999% of bacteria (salmonella, cholera, E. coli) and 99.9999% of protozoa (giardia, cryptosporidium)",
      "Compact size fits easily in a jacket chest pocket to prevent freezing on cold nights"
    ]
  },

  // =========================================================================
  // 5. Food & Nutrition
  // =========================================================================
  {
    id: "cat-bpl-food-01",
    brand: "Radix Nutrition",
    name: "Ultra Meal 800kcal Indian Style Lamb",
    category: "Food & Nutrition",
    itemType: "freeze-dried meal",
    unitWeightG: 172,
    unitPriceAud: 17.50,
    retailers: ["Backpacking Light"],
    websiteUrl: "https://www.backpackinglight.com.au/products/radix-ultra-800-lamb",
    imagePath: "https://radixnutrition.com.au/cdn/shop/products/Ultra-800-Indian-Lamb.png",
    summary: "Extreme energy 800-calorie expedition freeze-dried dinner with grass-fed lamb, coconut, and whole-food aromatic spices.",
    specs: {
      "Energy": "800 kcal (3,350 kJ)",
      "Protein": "32 g",
      "Dry Weight": "172g",
      "Ingredients": "Grass-fed lamb, brown rice, broccoli, seeds, herbs and spices"
    },
    features: [
      "4.65 kcal per gram: one of the highest calorie-density freeze-dried meals available",
      "Rehydrates fully in cold or warm water in 5 minutes with zero stove simmering",
      "Rich in essential fatty acids and branched-chain amino acids for overnight recovery"
    ]
  },
  {
    id: "cat-bpl-food-02",
    brand: "Radix Nutrition",
    name: "Original Breakfast Banana & Strawberry",
    category: "Food & Nutrition",
    itemType: "freeze-dried meal",
    unitWeightG: 100,
    unitPriceAud: 12.50,
    retailers: ["Backpacking Light"],
    websiteUrl: "https://www.backpackinglight.com.au/products/radix-original-breakfast-banana-strawberry",
    imagePath: "https://radixnutrition.com.au/cdn/shop/products/Original-Breakfast-Banana-Strawberry.png",
    summary: "Cold-water instant breakfast packed with real freeze-dried bananas, strawberries, gluten-free grains, and plant-based protein.",
    specs: {
      "Energy": "400 kcal",
      "Protein": "20 g",
      "Dry Weight": "100g",
      "Preparation": "Cold or warm water (ready in 2 minutes)"
    },
    features: [
      "Zero stove required: add cold water directly into pouch for instant morning fuel",
      "Complete amino acid profile gives clean, jitter-free sustained morning energy",
      "Compact 100g pouch slides flat into side pockets for easy pack distribution"
    ]
  },
  {
    id: "cat-bpl-food-03",
    brand: "Real Meals",
    name: "Moroccan Lamb with Couscous",
    category: "Food & Nutrition",
    itemType: "freeze-dried meal",
    unitWeightG: 175,
    unitPriceAud: 18.95,
    retailers: ["Backpacking Light"],
    websiteUrl: "https://www.backpackinglight.com.au/products/real-meals-moroccan-lamb",
    imagePath: "https://realmeals.co.nz/cdn/shop/products/Moroccan-Lamb-Front.png",
    summary: "Tender New Zealand pasture lamb braised with chickpeas, sweet dates, apricots, and fluffy couscous in an aromatic North African tagine.",
    specs: {
      "Dry Weight": "175g",
      "Energy": "2,740 kJ (655 kcal)",
      "Protein": "36.0 g",
      "Origin": "Nelson, New Zealand"
    },
    features: [
      "Chef-cooked gourmet quality freeze-dried without artificial preservatives",
      "Real tender lamb chunks that rehydrate to restaurant quality in 10 minutes",
      "High carbohydrate couscous base restores stamina on multi-day treks"
    ]
  },
  {
    id: "cat-bpl-food-04",
    brand: "Back Country Cuisine",
    name: "Carrot Cake with Cream Cheese Frosting (Double Serve)",
    category: "Food & Nutrition",
    itemType: "trail dessert",
    unitWeightG: 150,
    unitPriceAud: 14.95,
    retailers: ["Backpacking Light"],
    websiteUrl: "https://www.backpackinglight.com.au/products/back-country-cuisine-carrot-cake",
    imagePath: "https://backcountrycuisine.co.nz/wp-content/uploads/2020/09/Carrot-Cake.png",
    summary: "Spiced moist carrot cake dessert topped with real cream cheese icing, ready in 10 minutes by adding cold or warm water.",
    specs: {
      "Dry Weight": "150g",
      "Energy": "2,480 kJ (592 kcal)",
      "Serves": "2 Hiker portions",
      "Preparation": "Mix cold water into frosting, warm into cake"
    },
    features: [
      "Huge morale booster after a punishing day in wet, freezing mountain conditions",
      "Provides quick simple carbohydrates to warm the body before crawling into sleeping bags",
      "Resealable pouch serves as a mess-free mixing and eating container"
    ]
  },

  // =========================================================================
  // 6. Clothing & Trail Footwear
  // =========================================================================
  {
    id: "cat-bpl-cloth-01",
    brand: "Enlightened Equipment",
    name: "Torrid APEX Synthetic Jacket",
    category: "Clothing & Footwear",
    itemType: "jacket",
    unitWeightG: 240,
    unitPriceAud: 349.00,
    retailers: ["Backpacking Light"],
    websiteUrl: "https://www.backpackinglight.com.au/products/enlightened-equipment-torrid-jacket",
    imagePath: "https://enlightenedequipment.com/cdn/shop/products/Torrid_NavyCharcoal_Hero.jpg",
    summary: "The holy grail of ultralight synthetic jackets. 2oz CLIMASHIELD APEX continuous filament insulation keeps you warm even when soaking wet, weighing just 240g.",
    specs: {
      "Weight": "240g (8.4 oz Medium)",
      "Insulation": "CLIMASHIELD APEX 2.0 oz/yd² synthetic continuous filament",
      "Shell": "10D ultralight ripstop nylon with DWR",
      "Packability": "Compresses down to the size of a grapefruit"
    },
    features: [
      "Unlike down, CLIMASHIELD APEX maintains 95% of its loft and thermal value when drenched in rain or sweat",
      "Deep insulated hood with rear elastic cinch seals in head and neck heat instantly",
      "Raglan sleeves allow full overhead pole reach without lifting the waist hem"
    ]
  },
  {
    id: "cat-bpl-cloth-02",
    brand: "Montbell",
    name: "Superior Down Parka",
    category: "Clothing & Footwear",
    itemType: "jacket",
    unitWeightG: 246,
    unitPriceAud: 329.00,
    retailers: ["Backpacking Light"],
    websiteUrl: "https://www.backpackinglight.com.au/products/montbell-superior-down-parka",
    imagePath: "https://euro.montbell.com/products/img/2301384/2301384_bk.jpg",
    summary: "800-fill power EX down with Ballistic Airlight 20D shell, delivering exceptional warmth-to-weight ratio in a 246g package.",
    specs: {
      "Weight": "246g (8.7 oz)",
      "Fill": "800-fill power EX down",
      "Shell": "20D Ballistic Airlight ripstop nylon with Polkatex DWR",
      "Pockets": "Dual zippered hand pockets + 2 interior drop pockets"
    },
    features: [
      "Sewn-through construction keeps down from shifting while keeping packed size minuscule",
      "2-way adjustable hood conforms tightly around beanie or bare head",
      "Polkatex DWR coating sheds light camp drizzle and snow flurries"
    ]
  },
  {
    id: "cat-bpl-cloth-03",
    brand: "Montbell",
    name: "Tachyon Wind Parka",
    category: "Clothing & Footwear",
    itemType: "jacket",
    unitWeightG: 45,
    unitPriceAud: 179.00,
    retailers: ["Backpacking Light"],
    websiteUrl: "https://www.backpackinglight.com.au/products/montbell-tachyon-parka",
    imagePath: "https://euro.montbell.com/products/img/2303106/2303106_bk.jpg",
    summary: "Featherweight 7D Ballistic Airlight nylon wind shell weighing an astonishing 45g. Blocks chilling ridge winds with near-zero pack penalty.",
    specs: {
      "Weight": "45g (1.6 oz)",
      "Fabric": "7D Ballistic Airlight ripstop nylon with Polkatex DWR",
      "Pack Size": "11.5 x 8.5 x 4 cm (Stuffs into internal pocket)"
    },
    features: [
      "Stops convective wind-chill instantly when emerging onto exposed mountain summits",
      "Weighs less than an energy bar and packs into an apple-sized integrated pocket",
      "Underarm laser-cut ventilation ports allow steady airflow during vigorous uphill trekking"
    ]
  },
  {
    id: "cat-bpl-cloth-04",
    brand: "Injinji",
    name: "Liner Crew Merino Wool Toesocks",
    category: "Clothing & Footwear",
    itemType: "toesocks",
    unitWeightG: 48,
    unitPriceAud: 29.95,
    retailers: ["Backpacking Light"],
    websiteUrl: "https://www.backpackinglight.com.au/products/injinji-liner-crew-merino-socks",
    imagePath: "https://www.injinji.com/media/catalog/product/2/6/261110_chc_f19.jpg",
    summary: "NüWool 5-toe anatomical glove sock design that completely eliminates skin-on-skin friction, stopping between-toe trail blisters.",
    specs: {
      "Weight": "48g (Pair)",
      "Composition": "75% NüWool (Merino Wool), 21% Nylon, 4% Lycra",
      "Height": "Crew length"
    },
    features: [
      "Separates each toe individually with a seamless barrier to eliminate friction blisters",
      "Merino wool wicks moisture rapidly from between toes to keep feet dry inside trail runners",
      "Can be worn standalone in hot weather or as a blister-proof base layer under thick socks"
    ]
  },
  {
    id: "cat-bpl-cloth-05",
    brand: "Dirty Girl Gaiters",
    name: "Ultralight Trail Gaiters",
    category: "Clothing & Footwear",
    itemType: "gaiters",
    unitWeightG: 30,
    unitPriceAud: 39.95,
    retailers: ["Backpacking Light"],
    websiteUrl: "https://www.backpackinglight.com.au/products/dirty-girl-gaiters",
    imagePath: "https://dirtygirlgaiters.com/cdn/shop/products/SolidBlack_1024x1024.jpg",
    summary: "Four-way stretch breathable spandex trail gaiters that seal gravel, scree, sand, and twigs out of trail running shoes.",
    specs: {
      "Weight (Pair)": "30g (1.0 oz)",
      "Material": "4-way stretch polyester/spandex knit",
      "Attachment": "Front lace hook and rear adhesive Velcro heel tab"
    },
    features: [
      "Completely stops annoying gravel and grit from getting inside trail runners without retaining heat",
      "Adhesive Velcro strip sticks directly to the back of any trail running shoe",
      "Weighs next to nothing and dries in 10 minutes after creek wading"
    ]
  },
  {
    id: "cat-bpl-cloth-06",
    brand: "Sunday Afternoons",
    name: "Ultra Adventure Hat",
    category: "Clothing & Footwear",
    itemType: "hat",
    unitWeightG: 74,
    unitPriceAud: 79.95,
    retailers: ["Backpacking Light"],
    websiteUrl: "https://www.backpackinglight.com.au/products/sunday-afternoons-ultra-adventure-hat",
    imagePath: "https://sundayafternoons.com.au/cdn/shop/products/S2A01392B_UltraAdventureHat_Cinder_Profile.jpg",
    summary: "UPF 50+ sun protection folding clamshell brim trail hat with a 6-inch neck cape, sunglass lock sleeves, and crown ventilation.",
    specs: {
      "Weight": "74g (2.6 oz)",
      "Sun Protection": "UPF 50+ certified sun rating",
      "Brim": "8.5 cm (3.25 in) Reverse clamshell folding brim",
      "Neck Cape": "15 cm (6.0 in) Neck veil"
    },
    features: [
      "Reverse clamshell folding brim folds completely flat to slide into backpack front pockets",
      "Sunglass Lock sleeves hold sunglasses securely on top of hat during shaded forest sections",
      "Wicking sweatband and crown mesh ventilation keep head cool on sun-baked ridgelines"
    ]
  },

  // =========================================================================
  // 7. Personal Items & Trail Accessories
  // =========================================================================
  {
    id: "cat-bpl-pers-01",
    brand: "Gossamer Gear",
    name: "LT5 Three Piece Carbon Trekking Poles",
    category: "Personal Items",
    itemType: "trekking poles",
    unitWeightG: 278,
    unitPriceAud: 369.00,
    retailers: ["Backpacking Light"],
    websiteUrl: "https://www.backpackinglight.com.au/products/gossamer-gear-lt5-carbon-poles",
    imagePath: "https://www.gossamergear.com/cdn/shop/products/LT5_Poles_Hero.jpg",
    summary: "The lightest fully adjustable 3-piece carbon trekking poles in the world. 139g per pole with custom EVA foam grips and twist-lock mechanisms.",
    specs: {
      "Weight": "278g Pair (139g per pole / 4.9 oz)",
      "Usable Length": "105 - 130 cm (Collapsed: 60 cm)",
      "Material": "High-modulus carbon fiber shafts",
      "Grip": "Contoured EVA foam with breathable wrist straps"
    },
    features: [
      "Cuts arm swing fatigue drastically over 30-kilometer days compared to heavy aluminum poles",
      "Smooth twist-lock system holds firmly and eliminates external lever snagging in thick scrub",
      "Carbide tips grip wet timber bog-boards and slick river boulders with razor precision"
    ]
  },
  {
    id: "cat-bpl-pers-02",
    brand: "Six Moon Designs",
    name: "Silver Shadow Carbon Trekking Umbrella",
    category: "Personal Items",
    itemType: "umbrella",
    unitWeightG: 193,
    unitPriceAud: 99.95,
    retailers: ["Backpacking Light"],
    websiteUrl: "https://www.backpackinglight.com.au/products/six-moon-designs-silver-shadow-carbon-umbrella",
    imagePath: "https://www.sixmoondesigns.com/cdn/shop/products/SilverShadowCarbon-Hero.jpg",
    summary: "UPF 50+ reflective silver canopy repels intense radiant heat and heavy mountain downpours on an ultralight carbon fiber shaft.",
    specs: {
      "Weight": "193g (6.8 oz)",
      "Coverage": "94 cm (37 in) Diameter canopy",
      "Shaft": "Rigid carbon fiber shaft and frame ribs",
      "Rating": "UPF 50+ UV protection"
    },
    features: [
      "Reflective metallic silver coating reflects solar radiation to drop under-canopy temperature by up to 5°C",
      "High-flexibility carbon fiber ribs resist snapping inside gusty mountain valley wind funnels",
      "Hands-free pack strap attachment allows dual-pole trekking in steady rain without getting wet"
    ]
  },
  {
    id: "cat-bpl-pers-03",
    brand: "The TentLab",
    name: "The Deuce of Spades #3 Heavy-Duty Trowel",
    category: "Personal Items",
    itemType: "trowel",
    unitWeightG: 27,
    unitPriceAud: 36.95,
    retailers: ["Backpacking Light"],
    websiteUrl: "https://www.backpackinglight.com.au/products/the-tentlab-deuce-3-trowel",
    imagePath: "https://thetentlab.com/cdn/shop/products/Deuce3_Blue_Hero.jpg",
    summary: "Heavy-duty 27g 7075-T6 aluminum trowel with serrated edges engineered specifically for digging Leave-No-Trace holes in rocky, root-choked soil.",
    specs: {
      "Weight": "27g (0.97 oz)",
      "Length": "20.3 cm (8.0 in)",
      "Material": "Aerospace grade 7075-T6 aluminium alloy",
      "Edge": "Inverted root-saw serrated teeth on handle end"
    },
    features: [
      "Can be held upside down to use the narrow serrated end as a chisel through dense roots and rocky gravel",
      "Larger scoop volume digs proper 15-20cm cat-holes in half the time of standard trowels",
      "Aerospace 7075 alloy is nearly twice as strong as standard camp shovel aluminum"
    ]
  },
  {
    id: "cat-bpl-pers-04",
    brand: "Zpacks",
    name: "Ultralight Dyneema Stuff Sack 14L",
    category: "Personal Items",
    itemType: "stuff sack",
    unitWeightG: 23,
    unitPriceAud: 69.00,
    retailers: ["Backpacking Light"],
    websiteUrl: "https://www.backpackinglight.com.au/products/zpacks-dyneema-stuff-sack",
    imagePath: "https://zpacks.com/cdn/shop/products/Medium_Plus_Dry_Bag_Blue.jpg",
    summary: "0.55 oz/yd² Dyneema Composite Fabric (DCF) dry sack with taped waterproof seams, roll-top closure, and near-zero weight.",
    specs: {
      "Capacity": "14.3 Litres",
      "Weight": "23g (0.8 oz)",
      "Material": "0.55 oz/yd² Dyneema Composite Fabric",
      "Seams": "100% Fully taped waterproof seams"
    },
    features: [
      "Dyneema fabric is 15x stronger than steel on a weight basis and 100% waterproof",
      "Translucent material lets you see exactly where your headlamp, batteries or clothes are inside",
      "Roll-top closure with stiffened Hypalon webbing seals out water during river crossings"
    ]
  },
  {
    id: "cat-bpl-pers-05",
    brand: "Lawson Equipment",
    name: "Glowire Reflective Guyline 15m",
    category: "Personal Items",
    itemType: "guyline",
    unitWeightG: 45,
    unitPriceAud: 34.95,
    retailers: ["Backpacking Light"],
    websiteUrl: "https://www.backpackinglight.com.au/products/lawson-equipment-glowire-15m",
    imagePath: "https://lawsonequipment.com/cdn/shop/products/glowire-orange.jpg",
    summary: "High-visibility 2mm reflective tent cordage with high-tenacity UHMWPE core, zero stretch, and 1000lb break strength.",
    specs: {
      "Length": "15 metres (50 ft)",
      "Weight": "45g",
      "Diameter": "2.0 mm",
      "Break Strength": "1000 lbs (450 kg)",
      "Core": "100% UHMWPE (Spectra/Dyneema core)"
    },
    features: [
      "Ultra-reflective 3M Scotchlite tracers light up brilliantly under headlamps to stop midnight tent trip-ups",
      "Zero stretch UHMWPE core keeps shelter ridge lines and tarps drum-tight through overnight rain",
      "High-abrasion polyester sheath grips linelocs and knots tightly without slipping"
    ]
  }
];

// Deduplication check
const filteredBplItems = [];
const skipped = [];

for (const item of bplItems) {
  const key = normalize(item.brand + " " + item.name);
  if (existingKeys.has(key)) {
    skipped.push(item.name);
  } else {
    existingKeys.add(key);
    filteredBplItems.push(item);
  }
}

console.log(`Prepared ${filteredBplItems.length} strictly professional hiking items from Backpacking Light Australia.`);
if (skipped.length > 0) {
  console.log(`Skipped ${skipped.length} duplicates:`, skipped);
}

const merged = [...existingCatalog, ...filteredBplItems];
fs.writeFileSync(CATALOG_PATH, JSON.stringify(merged, null, 2), "utf-8");
console.log(`Updated ${CATALOG_PATH}. Total catalog items now: ${merged.length} (was ${existingCatalog.length}).`);
