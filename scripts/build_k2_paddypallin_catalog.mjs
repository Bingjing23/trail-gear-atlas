import fs from "node:fs";
import path from "node:path";

const CATALOG_PATH = "/Users/junzhou/Documents/ChatGPT/outdoor/gear-site/dist/catalog.json";
const GEAR_PATH = "/Users/junzhou/Documents/ChatGPT/outdoor/gear-site/dist/gear.json";

const existingCatalog = JSON.parse(fs.readFileSync(CATALOG_PATH, "utf-8"));
const existingGear = JSON.parse(fs.readFileSync(GEAR_PATH, "utf-8"));

const normalize = (str) => String(str || "").toLowerCase().replace(/[^a-z0-9]/g, "");

const existingKeys = new Set([
  ...existingCatalog.map((c) => normalize(c.brand + " " + c.name)),
  ...existingGear.map((g) => normalize(g.brand + " " + g.name)),
]);

const newItems = [
  // =========================================================================
  // 1. Sleep & Shelter
  // =========================================================================
  {
    id: "cat-k2-pp-sleep-01",
    brand: "Mont",
    name: "Moondance 2 Tent",
    category: "Sleep & Shelter",
    itemType: "tent",
    unitWeightG: 2010,
    unitPriceAud: 899.95,
    retailers: ["K2 Base Camp", "Paddy Pallin"],
    websiteUrl: "https://www.mont.com.au/products/moondance-2-tent",
    imagePath: "https://cdn.shopify.com/s/files/1/0268/7860/7416/products/mont-moondance-2-tent-tarp-citron-1.jpg",
    summary: "Australia's benchmark 2-person 3-season bushwalking tent with 25,000mm waterhead Torrentwear floor and DAC Featherlite NSL poles.",
    specs: {
      "Capacity": "2 Person",
      "Minimum Weight": "1.82 kg (Packed: 2.01 kg)",
      "Floor Waterhead": "25,000mm PU coated Torrentwear nylon",
      "Fly Fabric": "30D ripstop nylon 2000mm sil/PU",
      "Poles": "DAC Featherlite NSL 9.6mm",
      "Doors / Vestibules": "2 / 2"
    },
    features: [
      "Multipitch versatile pitch: fly and footprint or fly only",
      "Internally accessible roof vent with snow flap",
      "25,000mm heavy-duty floor designed for rugged Australian scrub and damp granite"
    ]
  },
  {
    id: "cat-k2-pp-sleep-02",
    brand: "Mont",
    name: "Moondance 2FN (Full Nylon) 4-Season Tent",
    category: "Sleep & Shelter",
    itemType: "tent",
    unitWeightG: 2050,
    unitPriceAud: 949.95,
    retailers: ["K2 Base Camp", "Paddy Pallin"],
    websiteUrl: "https://www.mont.com.au/products/moondance-2-fn-tent",
    imagePath: "https://cdn.shopify.com/s/files/1/0268/7860/7416/products/moondance-2fn-tent-mont.jpg",
    summary: "Full breathable ripstop nylon inner version of the Moondance 2 for alpine cold wind, winter snow and Tasmania's unpredictable conditions.",
    specs: {
      "Capacity": "2 Person",
      "Season Rating": "4-Season / Alpine",
      "Inner Canopy": "20D breathable ripstop nylon (Full Nylon)",
      "Floor Waterhead": "25,000mm Torrentwear nylon",
      "Poles": "DAC Featherlite NSL"
    },
    features: [
      "Solid nylon inner blocks freezing draughts and spindrift snow",
      "High roof peak with maximum usable living volume for extended tent-bound days",
      "Dual oversized vestibules for pack and boots storage"
    ]
  },
  {
    id: "cat-k2-pp-sleep-03",
    brand: "Mont",
    name: "Dragonfly 2P Ultralight Tent",
    category: "Sleep & Shelter",
    itemType: "tent",
    unitWeightG: 1400,
    unitPriceAud: 799.95,
    retailers: ["K2 Base Camp"],
    websiteUrl: "https://www.mont.com.au/products/dragonfly-2-tent",
    imagePath: "https://cdn.shopify.com/s/files/1/0268/7860/7416/products/mont-dragonfly-2-tent.jpg",
    summary: "Mont's ultralight 2-person freestanding tent designed for fast-and-light bushwalking across the Australian Alps.",
    specs: {
      "Capacity": "2 Person",
      "Weight": "1.40 kg (Trail: 1.25 kg)",
      "Poles": "DAC Featherlite NFL 8.7mm",
      "Fly Fabric": "15D double-ripstop sil/sil nylon"
    },
    features: [
      "Freestanding hubbed pole structure pitches in under two minutes",
      "Dual entry vestibules with storm flaps and water-shedding rain gutters",
      "Ultra-compact pack size fits horizontally inside lightweight packs"
    ]
  },
  {
    id: "cat-k2-pp-sleep-04",
    brand: "Sea to Summit",
    name: "Telos TR2 Freestanding Tent",
    category: "Sleep & Shelter",
    itemType: "tent",
    unitWeightG: 1657,
    unitPriceAud: 899.00,
    retailers: ["Paddy Pallin", "K2 Base Camp"],
    websiteUrl: "https://seatosummit.com.au/products/telos-tr2-tent",
    imagePath: "https://seatosummit.com.au/cdn/shop/products/ATELOS2_01_1024x1024.jpg",
    summary: "Revolutionary Tension Ridge architecture curves poles upwards for superior headroom, shoulder space, and climate control ventilation.",
    specs: {
      "Capacity": "2 Person",
      "Packed Weight": "1.66 kg",
      "Head Height": "111 cm",
      "Floor Dimensions": "215 x 134/109 cm",
      "Poles": "DAC Featherlite NSL & PRESSFIT"
    },
    features: [
      "Apex Vent expelled warm air at highest point to stop condensation build-up",
      "Hangout Mode converts fly into semi-open sun shade shelter with hiking poles",
      "FairShare Storage System splits tent into 3 modular bags to share pack load"
    ]
  },
  {
    id: "cat-k2-pp-sleep-05",
    brand: "Sea to Summit",
    name: "Alto TR2 Semi-Freestanding Tent",
    category: "Sleep & Shelter",
    itemType: "tent",
    unitWeightG: 1340,
    unitPriceAud: 799.00,
    retailers: ["Paddy Pallin", "K2 Base Camp"],
    websiteUrl: "https://seatosummit.com.au/products/alto-tr2-tent",
    imagePath: "https://seatosummit.com.au/cdn/shop/products/AALTO2_01_1024x1024.jpg",
    summary: "Ultralight semi-freestanding 2-person tent with Tension Ridge inverted geometry for exceptional liveability at just 1.34 kg.",
    specs: {
      "Capacity": "2 Person",
      "Trail Weight": "1.15 kg (Packed: 1.34 kg)",
      "Head Height": "105 cm",
      "Poles": "DAC Featherlite NSL"
    },
    features: [
      "Ultralight materials paired with class-leading headroom and vertical side walls",
      "Baseline Vents control airflow depending on humidity and wind direction",
      "Quick-connect pole feet for effortless one-person pitching"
    ]
  },
  {
    id: "cat-k2-pp-sleep-06",
    brand: "Wilderness Equipment",
    name: "Space 2 Tent",
    category: "Sleep & Shelter",
    itemType: "tent",
    unitWeightG: 1850,
    unitPriceAud: 799.95,
    retailers: ["Paddy Pallin", "K2 Base Camp"],
    websiteUrl: "https://wildernessequipment.com.au/products/space-2-tent",
    imagePath: "https://wildernessequipment.com.au/cdn/shop/products/Space2-Green-Pitch.jpg",
    summary: "The quintessential Australian bushwalking tent, proven across decades in South West Tasmania and the Western Arthurs.",
    specs: {
      "Capacity": "2 Person",
      "Weight": "1.85 kg",
      "Floor Waterhead": "8,000mm heavy duty PU coated nylon",
      "Poles": "DAC 9.0mm alloy with dihedral cross-tensioning",
      "Season": "3-4 Season Bushwalking"
    },
    features: [
      "Dihedral pole hub creates steep walls that resist gale-force alpine crosswinds",
      "Deep bathtub floor guarantees zero groundwater seepage on soaked bog soils",
      "Outer-pitch first keeps the inner completely dry during rainy pitches"
    ]
  },
  {
    id: "cat-k2-pp-sleep-07",
    brand: "Wilderness Equipment",
    name: "First Arrow 4-Season Expedition Tent",
    category: "Sleep & Shelter",
    itemType: "tent",
    unitWeightG: 3500,
    unitPriceAud: 1199.00,
    retailers: ["K2 Base Camp", "Paddy Pallin"],
    websiteUrl: "https://wildernessequipment.com.au/products/first-arrow-tent",
    imagePath: "https://wildernessequipment.com.au/cdn/shop/products/FirstArrow-Olive.jpg",
    summary: "Legendary Australian extreme 4-season alpine expedition tunnel tent, engineered to withstand Antarctic blizzards and mountain gales.",
    specs: {
      "Capacity": "2-3 Person",
      "Packed Weight": "3.50 kg",
      "Fly Fabric": "Heavy-duty silicone coated UV-stabilised nylon",
      "Poles": "DAC 9.6mm Pressfit alloy shock-corded tunnel hoops",
      "Season": "4-Season Alpine Expedition"
    },
    features: [
      "Aerodynamic tapered tunnel profile slices through severe high-altitude gales",
      "Dual opposite vestibules and vents provide air cross-flow even in heavy snowfall",
      "Integral pitch system allows instant pitching in sub-zero freezing blizzards"
    ]
  },
  {
    id: "cat-k2-pp-sleep-08",
    brand: "Hilleberg",
    name: "Anjan 2 GT Tunnel Tent",
    category: "Sleep & Shelter",
    itemType: "tent",
    unitWeightG: 2100,
    unitPriceAud: 1499.00,
    retailers: ["K2 Base Camp"],
    websiteUrl: "https://hilleberg.com/eng/tent/yellow-label-tents/anjan-2-gt/",
    imagePath: "https://hilleberg.com/media/catalog/product/a/n/anjan_2_gt_green_front_right_high.jpg",
    summary: "Hilleberg's premier 3-season ultralight tunnel tent with an extended GT vestibule, built with legendary Kerlon 1000 ripstop fabric.",
    specs: {
      "Capacity": "2 Person",
      "Weight": "2.10 kg (Minimum: 1.80 kg)",
      "Outer Fabric": "Kerlon 1000 20D high-tenacity ripstop nylon 8kg tear strength",
      "Poles": "DAC Featherlite NSL 9mm",
      "Inner Height": "100 cm"
    },
    features: [
      "Huge extended GT vestibule houses two full expedition packs and a cooking station",
      "Outer and inner tents pitch simultaneously for rapid setup in torrential rain",
      "Curved foot-end pole geometry sheds high wind and continuous driving rain"
    ]
  },
  {
    id: "cat-k2-pp-sleep-09",
    brand: "Hilleberg",
    name: "Nallo 2 All-Season Tunnel Tent",
    category: "Sleep & Shelter",
    itemType: "tent",
    unitWeightG: 2400,
    unitPriceAud: 1599.00,
    retailers: ["K2 Base Camp"],
    websiteUrl: "https://hilleberg.com/eng/tent/red-label-tents/nallo-2/",
    imagePath: "https://hilleberg.com/media/catalog/product/n/a/nallo_2_green_front_right_high.jpg",
    summary: "The definitive 4-season all-weather expedition ultralight tent. Kerlon 1200 fabric offers 12kg tear strength for severe alpine ridges.",
    specs: {
      "Capacity": "2 Person",
      "Weight": "2.40 kg",
      "Outer Fabric": "Kerlon 1200 30D high-tenacity nylon 66",
      "Poles": "DAC 9mm alloy",
      "Season": "4-Season All Conditions"
    },
    features: [
      "Red Label pedigree handles heavy snow loading, freezing winds and desert heat",
      "Single-opening front entrance saves weight while maintaining supreme structural integrity",
      "Bathtub floor with 15,000mm hydrostatic head withstands water pressure"
    ]
  },
  {
    id: "cat-k2-pp-sleep-10",
    brand: "Hilleberg",
    name: "Akto Solo 4-Season Tent",
    category: "Sleep & Shelter",
    itemType: "tent",
    unitWeightG: 1700,
    unitPriceAud: 1199.00,
    retailers: ["K2 Base Camp"],
    websiteUrl: "https://hilleberg.com/eng/tent/red-label-tents/akto/",
    imagePath: "https://hilleberg.com/media/catalog/product/a/k/akto_green_front_right_high.jpg",
    summary: "The benchmark solo expedition shelter since 1995. Single-hoop architecture with four corner upright rods delivers palatial 4-season security.",
    specs: {
      "Capacity": "1 Person Solo",
      "Weight": "1.70 kg (Minimum: 1.30 kg)",
      "Fabric": "Kerlon 1200 silnylon",
      "Poles": "1 x 9mm DAC alloy hoop + 4 corner stays"
    },
    features: [
      "Roomy enough to sit fully upright and store full 80L pack inside the vestibule",
      "Withstands hurricane-force gusts on exposed alpine knolls",
      "Vents at head and foot ends operate in heavy blizzards and tropical downpours"
    ]
  },
  {
    id: "cat-k2-pp-sleep-11",
    brand: "Exped",
    name: "Orion II UL 4-Season Tent",
    category: "Sleep & Shelter",
    itemType: "tent",
    unitWeightG: 2600,
    unitPriceAud: 1099.00,
    retailers: ["K2 Base Camp"],
    websiteUrl: "https://www.exped.com/en/products/tents-and-tarps/orion-ii-ul",
    imagePath: "https://www.exped.com/sites/default/files/styles/product_detail_gallery_large/public/2021-08/32103444_Orion_II_UL_moss_1.jpg",
    summary: "Steep-walled freestanding ridge-pole 4-season tent with fly reaching the ground to block cold winds and spindrift.",
    specs: {
      "Capacity": "2 Person",
      "Weight": "2.60 kg",
      "Floor Area": "3.0 m²",
      "Poles": "DAC Featherlite NSL 9.6mm",
      "Season": "4-Season"
    },
    features: [
      "Full exoskeleton ridge pole creates generous sitting headroom and steep walls",
      "Two huge vestibules protect gear and allow cooking out of the wind",
      "Integrated gear loft and dual mesh organizers keep trail essentials sorted"
    ]
  },
  {
    id: "cat-k2-pp-sleep-12",
    brand: "Exped",
    name: "Mira II HL Ultralight Tent",
    category: "Sleep & Shelter",
    itemType: "tent",
    unitWeightG: 1300,
    unitPriceAud: 799.00,
    retailers: ["K2 Base Camp"],
    websiteUrl: "https://www.exped.com/en/products/tents-and-tarps/mira-ii-hl",
    imagePath: "https://www.exped.com/sites/default/files/styles/product_detail_gallery_large/public/2021-08/32103450_Mira_II_HL_green_1.jpg",
    summary: "Hyperlight 3-season backpacking tent combining freestanding comfort, dual vestibules, and a packed weight of only 1.30 kg.",
    specs: {
      "Capacity": "2 Person",
      "Weight": "1.30 kg",
      "Inner Dimensions": "215 x 125/110 cm",
      "Poles": "DAC Featherlite NFL 8.7mm"
    },
    features: [
      "Dual doors and double awnings prevent climbing over your tent partner",
      "Clip-in canopy suspension ensures taut pitching in under 90 seconds",
      "15D ripstop sil/PU coated fly with factory taped waterproof seams"
    ]
  },
  {
    id: "cat-k2-pp-sleep-13",
    brand: "MSR",
    name: "Freelite 2 Ultralight Backpacking Tent",
    category: "Sleep & Shelter",
    itemType: "tent",
    unitWeightG: 1060,
    unitPriceAud: 799.95,
    retailers: ["Paddy Pallin", "K2 Base Camp"],
    websiteUrl: "https://www.msrgear.com/tents/backpacking-tents/freelite-2-person-ultralight-backpacking-tent/10312.html",
    imagePath: "https://www.msrgear.com/dw/image/v2/BDDX_PRD/on/demandware.static/-/Sites-cascadedesigns-master/default/dw83ffbc91/10312-FreeLite-2-Tent-hero.jpg",
    summary: "One of the lightest semi-freestanding double-wall 2-person tents on the market at just 1.06 kg, with virtually indestructible Easton Syclone poles.",
    specs: {
      "Capacity": "2 Person",
      "Minimum Weight": "0.91 kg (Packed: 1.06 kg)",
      "Floor Area": "2.7 m²",
      "Poles": "Easton Syclone Composite",
      "Rainfly": "15D ripstop nylon 1200mm Durashield"
    },
    features: [
      "Easton Syclone poles flex under extreme wind gusts without buckling or bending",
      "Micro-mesh canopy maximizes airflow and keeps midges and sandflies outside",
      "Rectangular floor plan allows two full-width sleeping pads without taper"
    ]
  },
  {
    id: "cat-k2-pp-sleep-14",
    brand: "Nemo Equipment",
    name: "Dagger OSMO 2P Backpacking Tent",
    category: "Sleep & Shelter",
    itemType: "tent",
    unitWeightG: 1750,
    unitPriceAud: 849.95,
    retailers: ["Paddy Pallin"],
    websiteUrl: "https://www.nemoequipment.com/products/dagger-osmo",
    imagePath: "https://www.nemoequipment.com/cdn/shop/products/Dagger-OSMO-2P-Birch-Bud-Pitched-Hero.jpg",
    summary: "Spacious freestanding backpacking tent crafted with proprietary OSMO composite fabric for 4x longer water repellency and 3x less wet stretch.",
    specs: {
      "Capacity": "2 Person",
      "Packed Weight": "1.75 kg",
      "Floor Area": "2.9 m²",
      "Poles": "1 DAC Featherlite NSL alloy",
      "Fabric": "OSMO Poly-Nylon Ripstop"
    },
    features: [
      "Landing Zone tub in vestibule keeps your pack and muddy boots completely off damp ground",
      "Gatekeeper door tie-backs allow one-handed access in driving rain",
      "Divvy Cube dual-stage stuff sack allows sharing weight with your partner"
    ]
  },
  {
    id: "cat-k2-pp-sleep-15",
    brand: "Mont",
    name: "Spindrift -13°C Down Sleeping Bag",
    category: "Sleep & Shelter",
    itemType: "sleep bag",
    unitWeightG: 1440,
    unitPriceAud: 999.95,
    retailers: ["K2 Base Camp"],
    websiteUrl: "https://www.mont.com.au/products/spindrift-sleeping-bag",
    imagePath: "https://cdn.shopify.com/s/files/1/0268/7860/7416/products/spindrift-sleeping-bag-mont.jpg",
    summary: "Mont's premier sub-zero alpine expedition sleeping bag filled with 820g of 785+ loft DWR down inside a weather-resistant Hydronaute XT shell.",
    specs: {
      "Comfort Rating": "-13°C (Extreme: -33°C)",
      "Down Fill": "820g of 785+ loft RDS duck down with DWR treatment",
      "Shell": "Hydronaute XT waterproof breathable 20,000mm fabric",
      "Weight": "1.44 kg",
      "Baffle Construction": "Box-wall horizontal and vertical baffles"
    },
    features: [
      "Hydronaute XT shell shields down from condensation drips inside single-skin tents and snow caves",
      "Radial Arc Hood with dual drawcords insulates head and neck without claustrophobia",
      "3D draft tube and thermal collar seal inside warm air completely"
    ]
  },
  {
    id: "cat-k2-pp-sleep-16",
    brand: "Mont",
    name: "Helium 450 -1°C Ultralight Down Sleeping Bag",
    category: "Sleep & Shelter",
    itemType: "sleep bag",
    unitWeightG: 810,
    unitPriceAud: 699.95,
    retailers: ["K2 Base Camp", "Paddy Pallin"],
    websiteUrl: "https://www.mont.com.au/products/helium-450-sleeping-bag",
    imagePath: "https://cdn.shopify.com/s/files/1/0268/7860/7416/products/helium-450-sleeping-bag.jpg",
    summary: "Ultralight high-loft bushwalking sleeping bag designed for 3-season treks across the Larapinta, Bibbulmun, and Overland Track.",
    specs: {
      "Comfort Rating": "-1°C (Limit: -7°C)",
      "Fill": "450g of 800+ loft RDS goose down",
      "Weight": "810g",
      "Shell": "10D ultralight ripstop nylon with DWR"
    },
    features: [
      "Tapered mummy cut optimizes thermal efficiency while cutting pack ounces",
      "Differential cut allows down to loft to its full thickness without compression spots",
      "Ultra-compact compression sack packs down smaller than a 1-litre water bottle"
    ]
  },
  {
    id: "cat-k2-pp-sleep-17",
    brand: "Sea to Summit",
    name: "Ascent -10°C Down Sleeping Bag",
    category: "Sleep & Shelter",
    itemType: "sleep bag",
    unitWeightG: 1100,
    unitPriceAud: 699.00,
    retailers: ["Paddy Pallin", "K2 Base Camp"],
    websiteUrl: "https://seatosummit.com.au/products/ascent-down-sleeping-bag",
    imagePath: "https://seatosummit.com.au/cdn/shop/products/AASCENT-10_01_1024x1024.jpg",
    summary: "Versatile Free-Flow triple zipper system allows sleeping bag to unzip into a spacious quilt or ventilate foot and chest independently.",
    specs: {
      "Temperature Rating": "-10°C (14°F)",
      "Weight": "1.10 kg",
      "Fill": "750+ loft Ultra-Dry Down",
      "Fit": "Relaxed mummy"
    },
    features: [
      "Free-Flow zip system has full-length left zip, half-length right zip and foot box zip",
      "Vertical chest baffles prevent down from shifting across your body as you toss and turn",
      "Large internal security pocket keeps phone and PLB warm to preserve battery"
    ]
  },
  {
    id: "cat-k2-pp-sleep-18",
    brand: "Sea to Summit",
    name: "Flame Women's -9°C Down Sleeping Bag",
    category: "Sleep & Shelter",
    itemType: "sleep bag",
    unitWeightG: 880,
    unitPriceAud: 749.00,
    retailers: ["Paddy Pallin", "K2 Base Camp"],
    websiteUrl: "https://seatosummit.com.au/products/flame-womens-down-sleeping-bag",
    imagePath: "https://seatosummit.com.au/cdn/shop/products/AFLAME-9_01_1024x1024.jpg",
    summary: "Women's specific ultralight expedition sleeping bag with body-mapped extra down in the torso and footbox for optimal female thermal comfort.",
    specs: {
      "Comfort Rating": "-9°C (15°F)",
      "Weight": "880g",
      "Fill": "850+ loft RDS Ultra-Dry Down",
      "Shell": "10D ultralight nylon shell"
    },
    features: [
      "Wider at the hip and narrower at the shoulder to fit female ergonomics",
      "Transverse chest baffles prevent cold spots over critical core organs",
      "Compresses down to a featherweight 3.8-litre packed volume"
    ]
  },
  {
    id: "cat-k2-pp-sleep-19",
    brand: "One Planet",
    name: "Bungle -7°C Australian Down Sleeping Bag",
    category: "Sleep & Shelter",
    itemType: "sleep bag",
    unitWeightG: 1150,
    unitPriceAud: 849.00,
    retailers: ["K2 Base Camp"],
    websiteUrl: "https://oneplanet.au/product/bungle-7/",
    imagePath: "https://oneplanet.au/wp-content/uploads/2021/04/bungle-sleeping-bag.jpg",
    summary: "Proudly manufactured in Melbourne, Australia. 800+ loft Hydrophobic DWR down inside durable, breathable Pertex Quantum fabric.",
    specs: {
      "Temperature Rating": "-7°C",
      "Weight": "1.15 kg",
      "Fill": "800+ loft Hydrophobic goose down",
      "Origin": "Made in Melbourne, Australia"
    },
    features: [
      "3D trapezoidal baffle construction prevents migration of down",
      "Specially designed for damp Australian alpine huts and high altitude winter camps",
      "Full length YKK #5 coil anti-snag zipper with double draft tube"
    ]
  },
  {
    id: "cat-k2-pp-sleep-20",
    brand: "Exped",
    name: "Ultra 5R Sleeping Mat",
    category: "Sleep & Shelter",
    itemType: "sleep pad",
    unitWeightG: 585,
    unitPriceAud: 269.95,
    retailers: ["K2 Base Camp", "Paddy Pallin"],
    websiteUrl: "https://www.exped.com/en/products/sleeping-mats/ultra-5r",
    imagePath: "https://www.exped.com/sites/default/files/styles/product_detail_gallery_large/public/2021-08/32205562_Ultra_5R_M_terracotta_1.jpg",
    summary: "R-value 4.8 4-season insulated backpacking mat with Synmat microfiber insulation, 7cm thick comfort, and included Schnozzel pumpbag.",
    specs: {
      "R-Value": "4.8 (ASTM F3340-18)",
      "Temperature": "-20°C",
      "Weight": "585g",
      "Thickness": "7 cm",
      "Dimensions": "183 x 52 cm (Medium)"
    },
    features: [
      "Synmat 160 g/m² Texpedloft microfiber laminated to top and bottom of chambers",
      "Schnozzel Pumpbag UL ensures moisture-free rapid inflation in under 1 minute",
      "Longitudinal chambers with slightly raised edge bumpers keep you centered"
    ]
  },
  {
    id: "cat-k2-pp-sleep-21",
    brand: "Exped",
    name: "Ultra 7R Extreme Cold Down Sleeping Mat",
    category: "Sleep & Shelter",
    itemType: "sleep pad",
    unitWeightG: 650,
    unitPriceAud: 349.95,
    retailers: ["K2 Base Camp", "Paddy Pallin"],
    websiteUrl: "https://www.exped.com/en/products/sleeping-mats/ultra-7r",
    imagePath: "https://www.exped.com/sites/default/files/styles/product_detail_gallery_large/public/2021-08/32205574_Ultra_7R_M_ruby_1.jpg",
    summary: "Extreme cold winter sleeping mat insulated with 700-fill down for an astounding R-value of 7.1, insulating down to -30°C.",
    specs: {
      "R-Value": "7.1 (Extreme Cold / Snow)",
      "Temperature Limit": "-30°C",
      "Weight": "650g",
      "Thickness": "7 cm",
      "Insulation": "700 fill-power RDS down"
    },
    features: [
      "Pure certified RDS down inside baffles delivers unmatched weight-to-warmth ratio",
      "Recycled 20D ripstop polyester with Oeko-Tex 100 certification",
      "FlatValve technology features separate one-way inflate and deflate valves"
    ]
  },
  {
    id: "cat-k2-pp-sleep-22",
    brand: "Exped",
    name: "Dura 5R Heavy-Duty Bushwalking Mat",
    category: "Sleep & Shelter",
    itemType: "sleep pad",
    unitWeightG: 850,
    unitPriceAud: 279.95,
    retailers: ["K2 Base Camp"],
    websiteUrl: "https://www.exped.com/en/products/sleeping-mats/dura-5r",
    imagePath: "https://www.exped.com/sites/default/files/styles/product_detail_gallery_large/public/2021-08/32205590_Dura_5R_M_moss_1.jpg",
    summary: "Built for tough bushwalking environments where granite boulders, prickly spinifex, and harsh gravel demand extreme puncture resistance.",
    specs: {
      "R-Value": "4.8",
      "Weight": "850g",
      "Fabric": "75D / 170D heavy-duty recycled polyester",
      "Thickness": "7 cm"
    },
    features: [
      "Rugged 170D reinforcement on bottom withstands rough shelter platforms and sharp twigs",
      "Synmat insulation keeps you warm across 4-season Australian mountain trails",
      "Schnozzel pumpbag prevents lung breath condensation from wetting the inside"
    ]
  },
  {
    id: "cat-k2-pp-sleep-23",
    brand: "Exped",
    name: "FlexMat Plus Closed Cell Foam Mat",
    category: "Sleep & Shelter",
    itemType: "sleep pad",
    unitWeightG: 480,
    unitPriceAud: 89.95,
    retailers: ["K2 Base Camp"],
    websiteUrl: "https://www.exped.com/en/products/sleeping-mats/flexmat-plus",
    imagePath: "https://www.exped.com/sites/default/files/styles/product_detail_gallery_large/public/2021-08/32205388_FlexMat_Plus_M_orange_1.jpg",
    summary: "Thickest closed-cell foam sleeping pad available at 3.8 cm, delivering puncture-proof reliability and rapid deployment.",
    specs: {
      "R-Value": "2.2",
      "Thickness": "3.8 cm",
      "Weight": "480g",
      "Material": "High-density IXPE closed-cell foam",
      "Design": "Folding egg-box structure"
    },
    features: [
      "3.8cm thickness provides double the cushioning of traditional 2cm foam mats",
      "Completely immune to punctures, thorns, hot stove embers, and sharp scree",
      "Doubles as a comfortable trail lunch sit-mat or winter tent floor insulator"
    ]
  },
  {
    id: "cat-k2-pp-sleep-24",
    brand: "Therm-a-Rest",
    name: "NeoAir XTherm NXT Extreme Cold Mat",
    category: "Sleep & Shelter",
    itemType: "sleep pad",
    unitWeightG: 439,
    unitPriceAud: 449.95,
    retailers: ["Paddy Pallin", "K2 Base Camp"],
    websiteUrl: "https://www.thermarest.com/sleeping-pads/fast-and-light/neoair-xtherm-nxt-sleeping-pad/neoair-xtherm-nxt.html",
    imagePath: "https://www.thermarest.com/dw/image/v2/BDDX_PRD/on/demandware.static/-/Sites-cascadedesigns-master/default/dwe72ba9a8/14299-NeoAir-XTherm-NXT-Regular-Hero.jpg",
    summary: "The highest warmth-to-weight ratio of any air sleeping pad ever built. R-value 7.3 at just 439g, engineered for serious sub-zero expeditions.",
    specs: {
      "R-Value": "7.3 (ASTM F3340-18)",
      "Weight": "439g",
      "Thickness": "7.6 cm (3.0 in)",
      "Bottom Fabric": "70D heavy-duty nylon",
      "Valve": "WingLock Valve"
    },
    features: [
      "Triangular Core Matrix stack with ThermaCapture radiant barriers eliminates convective heat loss",
      "Tough 70D nylon bottom stands up to extended expedition use on snow and rock",
      "WingLock valve provides 3x faster one-way inflation and instant deflation toggle"
    ]
  },
  {
    id: "cat-k2-pp-sleep-25",
    brand: "Sea to Summit",
    name: "Aeros Premium Camp Pillow",
    category: "Sleep & Shelter",
    itemType: "pillow",
    unitWeightG: 79,
    unitPriceAud: 59.95,
    retailers: ["Paddy Pallin", "K2 Base Camp"],
    websiteUrl: "https://seatosummit.com.au/products/aeros-premium-pillow",
    imagePath: "https://seatosummit.com.au/cdn/shop/products/APILPREM_01_1024x1024.jpg",
    summary: "Ergonomic inflatable hiking pillow with a soft 50D brushed polyester knit face and synthetic fill layer for luxurious backcountry sleep.",
    specs: {
      "Weight": "79g (Regular)",
      "Packed Size": "8 x 8.5 cm",
      "Inflated Size": "34 x 24 x 11 cm",
      "Fabric": "50D brushed polyester stretch knit"
    },
    features: [
      "Curved internal baffles cradle your head and neck whether sleeping on back or side",
      "PillowLock system secures pillow directly to any Sea to Summit sleeping mat",
      "Multi-function low profile mini-valve allows precise micro-tuning of firmness"
    ]
  },
  {
    id: "cat-k2-pp-sleep-26",
    brand: "Sea to Summit",
    name: "Silk-Cotton Blend Travel Liner",
    category: "Sleep & Shelter",
    itemType: "liner",
    unitWeightG: 142,
    unitPriceAud: 69.95,
    retailers: ["Paddy Pallin", "K2 Base Camp"],
    websiteUrl: "https://seatosummit.com.au/products/silk-cotton-blend-travel-liner",
    imagePath: "https://seatosummit.com.au/cdn/shop/products/ASILKCOT_01_1024x1024.jpg",
    summary: "Ultralight breathable sleep liner blending natural ripstop silk with soft cotton, keeping sleeping bags clean while adding up to +3°C of warmth.",
    specs: {
      "Weight": "142g",
      "Dimensions": "185 x 92 cm",
      "Material": "30% natural silk, 70% soft breathable cotton",
      "Care": "Machine washable"
    },
    features: [
      "Absorbs body oils and sweat to extend sleeping bag lifespan between washes",
      "Natural silk is hypoallergenic and soft against sun-exposed trail skin",
      "Double folded and reinforced seams withstand restless sleeping"
    ]
  },

  // =========================================================================
  // 2. Packs & Essentials
  // =========================================================================
  {
    id: "cat-k2-pp-pack-01",
    brand: "One Planet",
    name: "McMillan 85L Heavy-Duty Canvas Backpack",
    category: "Packs & Essentials",
    itemType: "backpack",
    unitWeightG: 3100,
    unitPriceAud: 799.00,
    retailers: ["K2 Base Camp"],
    websiteUrl: "https://oneplanet.au/product/mcmillan/",
    imagePath: "https://oneplanet.au/wp-content/uploads/2021/04/mcmillan-backpack.jpg",
    summary: "The holy grail of Australian expedition bushwalking packs. Australian Watermarked canvas and Exact Fit harness withstand punishing scrub.",
    specs: {
      "Capacity": "85 Litres",
      "Weight": "3.10 kg",
      "Fabric": "Australian Watermarked heavy-duty corespun canvas",
      "Harness": "Exact Fit 8-size interchangeable torso & hip system",
      "Frame": "Dual 6061-T6 internal aluminum stays"
    },
    features: [
      "Watermarked canvas naturally swells when wet, sealing needle holes against deluge rain",
      "Exact Fit harness is endorsed by the Australian Chiropractors Association for heavy loads",
      "Double-layered base and reinforced bar-tacking handle brutal Tasmanian button-grass scrub"
    ]
  },
  {
    id: "cat-k2-pp-pack-02",
    brand: "One Planet",
    name: "Strezlecki 75L Bushwalking Pack",
    category: "Packs & Essentials",
    itemType: "backpack",
    unitWeightG: 2900,
    unitPriceAud: 749.00,
    retailers: ["K2 Base Camp"],
    websiteUrl: "https://oneplanet.au/product/strezlecki/",
    imagePath: "https://oneplanet.au/wp-content/uploads/2021/04/strezlecki-pack.jpg",
    summary: "Indestructible Australian canvas multi-day bushwalking rucksack, optimized for 5 to 10-day self-sufficient wilderness expeditions.",
    specs: {
      "Capacity": "75 Litres",
      "Weight": "2.90 kg",
      "Material": "High-tenacity Watermarked canvas with Cordura base",
      "Harness": "Exact Fit with dual-density foam lumbar support"
    },
    features: [
      "Floating top lid with internal security and external map pocket",
      "Deep reinforced side wand pockets hold 2-litre bottles, trekking poles and tent poles",
      "Built-in heavy-duty storm throat seals against driving rain"
    ]
  },
  {
    id: "cat-k2-pp-pack-03",
    brand: "Osprey",
    name: "Atmos AG 65 Men's Backpack",
    category: "Packs & Essentials",
    itemType: "backpack",
    unitWeightG: 2180,
    unitPriceAud: 459.95,
    retailers: ["Paddy Pallin", "K2 Base Camp"],
    websiteUrl: "https://www.osprey.com/au/en/atmos-ag-65-atmos65s22-550",
    imagePath: "https://www.osprey.com/media/catalog/product/a/t/atmos65s22_s22_side_mythicalgreen.jpg",
    summary: "Award-winning backpacking pack with Anti-Gravity 3D suspended continuous mesh backpanel and Fit-on-the-Fly custom hipbelt adjustment.",
    specs: {
      "Capacity": "65 Litres (M/L)",
      "Weight": "2.18 kg",
      "Load Range": "14 - 23 kg",
      "Suspension": "Anti-Gravity continuous mesh suspension",
      "Raincover": "Integrated PFC/PFAS-free DWR raincover included"
    },
    features: [
      "Anti-Gravity suspension conforms seamlessly to body for zero hot-spot ventilation",
      "Stow-on-the-Go trekking pole attachment allows stowing poles while walking",
      "Dual curved front zippered access panels for instant retrieval of pack contents"
    ]
  },
  {
    id: "cat-k2-pp-pack-04",
    brand: "Osprey",
    name: "Aether 65 Expedition Pack",
    category: "Packs & Essentials",
    itemType: "backpack",
    unitWeightG: 2230,
    unitPriceAud: 469.95,
    retailers: ["Paddy Pallin", "K2 Base Camp"],
    websiteUrl: "https://www.osprey.com/au/en/aether-65-aether65f20-550",
    imagePath: "https://www.osprey.com/media/catalog/product/a/e/aether65f20_f20_side_black.jpg",
    summary: "Heavy-duty custom-fit expedition backpacking pack designed for carrying loads up to 27kg over technical, demanding trail terrain.",
    specs: {
      "Capacity": "65 Litres",
      "Weight": "2.23 kg",
      "Load Range": "15 - 27 kg",
      "Harness": "Custom Fit-on-the-Fly shoulder straps and hipbelt",
      "Backpanel": "AirScape injection-moulded die-cut foam"
    },
    features: [
      "Large front J-zip allows full duffle-style access to main compartment",
      "Removable top lid converts into a DayLid daypack for peak summit pushes",
      "Dual ice axe loops and reinforced sleeping pad bottom compression straps"
    ]
  },
  {
    id: "cat-k2-pp-pack-05",
    brand: "Osprey",
    name: "Ariel 65 Women's Expedition Pack",
    category: "Packs & Essentials",
    itemType: "backpack",
    unitWeightG: 2210,
    unitPriceAud: 469.95,
    retailers: ["Paddy Pallin", "K2 Base Camp"],
    websiteUrl: "https://www.osprey.com/au/en/ariel-65-ariel65f20-550",
    imagePath: "https://www.osprey.com/media/catalog/product/a/r/ariel65f20_f20_side_claretred.jpg",
    summary: "Women's specific heavy-load expedition pack with custom contoured shoulder harness, canted hipbelt angle, and AirScape ventilation.",
    specs: {
      "Capacity": "65 Litres",
      "Weight": "2.21 kg",
      "Fit": "Women's specific ergonomic geometry",
      "Raincover": "Included"
    },
    features: [
      "Shoulder straps ergonomically curved to eliminate chest pinch and neck chafing",
      "Conical angled hipbelt distributes pack weight directly onto female pelvic structure",
      "Hydration reservoir sleeve holds up to 3-litre bladders with hose exit clip"
    ]
  },
  {
    id: "cat-k2-pp-pack-06",
    brand: "Osprey",
    name: "Rook 65 Lightweight Backpack",
    category: "Packs & Essentials",
    itemType: "backpack",
    unitWeightG: 1600,
    unitPriceAud: 279.95,
    retailers: ["Paddy Pallin", "K2 Base Camp"],
    websiteUrl: "https://www.osprey.com/au/en/rook-65-rook65s19-550",
    imagePath: "https://www.osprey.com/media/catalog/product/r/o/rook65s19_s19_side_astralred.jpg",
    summary: "Straightforward, rugged 65L backpacking rucksack with ventilated tensioned mesh backpanel and exceptional cost-to-performance ratio.",
    specs: {
      "Capacity": "65 Litres",
      "Weight": "1.60 kg",
      "Fabric": "600D recycled polyester body",
      "Backpanel": "AirSpeed tensioned mesh"
    },
    features: [
      "AirSpeed suspended mesh backpanel delivers maximum airflow across your spine",
      "Intuitive stepped ladder torso adjustment accommodates a wide range of back lengths",
      "Zippered lower sleeping bag compartment with floating divider"
    ]
  },
  {
    id: "cat-k2-pp-pack-07",
    brand: "Exped",
    name: "Lightning 60 Backpack",
    category: "Packs & Essentials",
    itemType: "backpack",
    unitWeightG: 1180,
    unitPriceAud: 379.95,
    retailers: ["K2 Base Camp"],
    websiteUrl: "https://www.exped.com/en/products/backpacks/lightning-60",
    imagePath: "https://www.exped.com/sites/default/files/styles/product_detail_gallery_large/public/2021-08/32205508_Lightning_60_M_black_1.jpg",
    summary: "Ultralight top-loading alpine and thru-hiking pack with a single central T-Rex aluminum stay and full zig-zag compression system.",
    specs: {
      "Capacity": "60 Litres",
      "Weight": "1.18 kg",
      "Fabric": "210D HMPE ripstop nylon, PU coated, 1500mm waterhead",
      "Max Load": "24 kg"
    },
    features: [
      "Single 6061-T6 central aluminum stay transfers load straight to the lumbar pad",
      "Full perimeter zig-zag compression cords secure roll-mat, tent poles, or ice axe",
      "Minimal contact back system allows constant cross-breeze across the spine"
    ]
  },
  {
    id: "cat-k2-pp-pack-08",
    brand: "Aarn",
    name: "Mountain Magic 50+12 Pro Balance Pack",
    category: "Packs & Essentials",
    itemType: "backpack",
    unitWeightG: 1480,
    unitPriceAud: 549.00,
    retailers: ["K2 Base Camp"],
    websiteUrl: "https://www.aarnpacks.com/products/mountain-magic-50-pro",
    imagePath: "https://www.aarnpacks.com/cdn/shop/products/mountain-magic-pro-side.jpg",
    summary: "Legendary New Zealand bodypack with front Balance Pockets, naturally counterbalancing rear load for upright posture and reduced energy expenditure.",
    specs: {
      "Capacity": "50L main pack + 12L front balance pockets",
      "Weight": "1.48 kg",
      "Harness": "Free-motion Flow system with Multi-Balance straps",
      "Origin": "New Zealand designed"
    },
    features: [
      "Front Balance Pockets offset the backward pull of heavy pack loads on your spine",
      "Instant on-the-trail access to water, camera, snacks and GPS without taking pack off",
      "True upright walking posture dramatically reduces neck, shoulder, and knee strain"
    ]
  },
  {
    id: "cat-k2-pp-pack-09",
    brand: "Deuter",
    name: "Aircontact Core 60+10 Backpack",
    category: "Packs & Essentials",
    itemType: "backpack",
    unitWeightG: 2310,
    unitPriceAud: 449.95,
    retailers: ["K2 Base Camp"],
    websiteUrl: "https://www.deuter.com/au-en/shop/backpacks/p612304-trekking-backpack-aircontact-core-60-10",
    imagePath: "https://www.deuter.com/media/catalog/product/3/3/3350322_4413_Aircontact_Core_60_10_side.jpg",
    summary: "Heavy-duty ergonomic trekking backpack engineered with Aircontact mesh back ventilation and pivoting ActiveFit shoulder harness.",
    specs: {
      "Capacity": "60 + 10 Litres expansion collar",
      "Weight": "2.31 kg",
      "Frame": "Y-frame direct load transfer system",
      "Back Length": "VariSlide stepless torso adjustment (42 - 62 cm)"
    },
    features: [
      "Open-pore Aircontact hollow-chamber foam pumps out warm air with every step",
      "VariFlex pivoting hip fins transfer up to 70% of load seamlessly to the pelvis",
      "Front J-shaped zip opening provides instant access to bottom and mid pack contents"
    ]
  },
  {
    id: "cat-k2-pp-pack-10",
    brand: "Mont",
    name: "Supersonic 55-70L Canvas Bushwalking Pack",
    category: "Packs & Essentials",
    itemType: "backpack",
    unitWeightG: 2650,
    unitPriceAud: 699.95,
    retailers: ["K2 Base Camp"],
    websiteUrl: "https://www.mont.com.au/products/supersonic-pack",
    imagePath: "https://cdn.shopify.com/s/files/1/0268/7860/7416/products/mont-supersonic-pack.jpg",
    summary: "Legendary Australian bushwalking pack crafted with bombproof DR80 canvas and Moto-Form harness for multi-day untracked wilderness.",
    specs: {
      "Capacity": "55 - 70 Litres expanding cowl",
      "Weight": "2.65 kg",
      "Fabric": "DR80 Australian Watermarked Canvas",
      "Frame": "Dual high-tensile 6061-T6 aluminum stays"
    },
    features: [
      "DR80 canvas resists tearing on jagged limestone, razor-sharp pandanus and thick scoparia",
      "Expanding storm cowl adds 15L of emergency load volume for long food carries",
      "Moto-Form harness molds to the contours of your lumbar spine with zero slip"
    ]
  },
  {
    id: "cat-k2-pp-pack-11",
    brand: "Black Diamond",
    name: "Pursuit FLZ Trekking Poles",
    category: "Packs & Essentials",
    itemType: "trekking poles",
    unitWeightG: 500,
    unitPriceAud: 249.99,
    retailers: ["Paddy Pallin"],
    websiteUrl: "https://www.blackdiamondequipment.com/en_AU/product/pursuit-flz-trekking-poles/",
    imagePath: "https://www.blackdiamondequipment.com/on/demandware.static/-/Sites-bdel-master-catalog/default/dw202fc74b/images/products/BD112543_0000_hero.jpg",
    summary: "Ergonomic natural cork grip folding poles with Bloom algae-infused grip extensions, Z-pole rapid deployment, and FlickLock+ adjustability.",
    specs: {
      "Weight (Pair)": "500g (S/M)",
      "Usable Length": "110 - 125 cm (Collapsed: 37 cm)",
      "Grip": "Natural cork with Bloom algae extension",
      "Locking Mechanism": "FlickLock+ and Speed Cone folding"
    },
    features: [
      "Natural cork grip wicks sweat and molds to your hands over extended hiking miles",
      "Z-pole 3-section folding design fits completely inside daypacks or airline carry-on",
      "Soft-touch ergonomic Solution 2.0 wrist strap made with recycled fibres"
    ]
  },
  {
    id: "cat-k2-pp-pack-12",
    brand: "Black Diamond",
    name: "Trail Pro Shock Trekking Poles",
    category: "Packs & Essentials",
    itemType: "trekking poles",
    unitWeightG: 590,
    unitPriceAud: 239.99,
    retailers: ["Paddy Pallin", "K2 Base Camp"],
    websiteUrl: "https://www.blackdiamondequipment.com/en_AU/product/trail-pro-shock-trekking-poles/",
    imagePath: "https://www.blackdiamondequipment.com/on/demandware.static/-/Sites-bdel-master-catalog/default/dw1b3d6874/images/products/BD112504_0000_hero.jpg",
    summary: "Heavy-duty 4-season aluminum poles with Control Shock internal elastomer technology and SmashLock rapid lower section deployment.",
    specs: {
      "Weight (Pair)": "590g",
      "Usable Length": "105 - 140 cm",
      "Shock Absorption": "Control Shock internal mechanism inside grip",
      "Shafts": "7075 Aluminum"
    },
    features: [
      "Control Shock absorbs jarring impacts on steep rocky descents to spare wrist and elbow joints",
      "SmashLock lower mechanism locks open with a single click and collapses with one pull",
      "Dual FlickLock Pro forged aluminum levers provide immense clamping force"
    ]
  },
  {
    id: "cat-k2-pp-pack-13",
    brand: "Leki",
    name: "Cressida FX Carbon Women's Trekking Poles",
    category: "Packs & Essentials",
    itemType: "trekking poles",
    unitWeightG: 490,
    unitPriceAud: 299.95,
    retailers: ["Paddy Pallin"],
    websiteUrl: "https://leki.com.au/products/cressida-fx-carbon",
    imagePath: "https://leki.com.au/cdn/shop/products/65220661_Cressida_FX_Carbon_1.jpg",
    summary: "Women's specific high-end pure carbon folding poles featuring the Aergon Air thermo cork grip and ELD external locking device.",
    specs: {
      "Weight (Pair)": "490g",
      "Adjustment": "90 - 110 cm (Pack size: 40 cm)",
      "Material": "PRC 1000 High Modular Pure Carbon",
      "Grip": "Aergon Air Thermo Cork"
    },
    features: [
      "Aergon Air grip is angled at 8 degrees to keep wrists in a natural neutral position",
      "Full carbon shaft construction absorbs trail vibration without transmitting shock",
      "External Locking Device (ELD) releases tension with one touch for rapid folding"
    ]
  },
  {
    id: "cat-k2-pp-pack-14",
    brand: "Ocean Signal",
    name: "RescueME PLB1 Personal Locator Beacon",
    category: "Packs & Essentials",
    itemType: "plb",
    unitWeightG: 116,
    unitPriceAud: 419.00,
    retailers: ["K2 Base Camp", "Paddy Pallin"],
    websiteUrl: "https://oceansignal.com/products/plb1/",
    imagePath: "https://oceansignal.com/wp-content/uploads/2019/02/rescueME-PLB1-scaled.jpg",
    summary: "The world's smallest personal locator beacon. 66-channel GPS, 406MHz Cospas-Sarsat distress transmitter, and 7-year battery life.",
    specs: {
      "Weight": "116g",
      "Dimensions": "77 x 51 x 32 mm",
      "Battery Life": "7 years (24+ hours active transmission)",
      "Frequencies": "406.040 MHz (Satellite) & 121.5 MHz (Homing)",
      "Waterproof": "Submersible to 15 metres"
    },
    features: [
      "30% smaller than standard PLBs; fits in hipbelt pocket or clips to shoulder strap",
      "Connects directly to Australian AMSA search and rescue satellite constellation with no ongoing subscription",
      "High-intensity 1-candela strobe light assists rescue helicopters in night operations"
    ]
  },
  {
    id: "cat-k2-pp-pack-15",
    brand: "Garmin",
    name: "inReach Messenger Satellite Communicator",
    category: "Packs & Essentials",
    itemType: "satellite communicator",
    unitWeightG: 114,
    unitPriceAud: 499.00,
    retailers: ["K2 Base Camp", "Paddy Pallin"],
    websiteUrl: "https://www.garmin.com/en-AU/p/793265",
    imagePath: "https://res.cloudinary.com/garmin/image/upload/b_rgb:FFFFFF,c_pad,dpr_2.0,f_auto,h_600,q_auto,w_600/v1/Product_Images/en/AU/010-02672-00/v/cf-lg.jpg",
    summary: "Compact satellite messenger with seamless cellular/Wi-Fi/Iridium network switching, interactive SOS, and reverse phone-charging capability.",
    specs: {
      "Weight": "114g",
      "Dimensions": "7.8 x 6.4 x 2.3 cm",
      "Battery Life": "Up to 28 days (10-minute tracking intervals)",
      "Water Rating": "IPX7",
      "Network": "100% Global Iridium Satellite"
    },
    features: [
      "Reverse safety charging provides enough juice to revive a dead smartphone to send a text",
      "High-contrast on-device MIP display confirms check-in messages are successfully sent and delivered",
      "Interactive 24/7 SOS dispatch through Garmin Response emergency coordination center"
    ]
  },
  {
    id: "cat-k2-pp-pack-16",
    brand: "Silva",
    name: "Expedition 4 Compass",
    category: "Packs & Essentials",
    itemType: "compass",
    unitWeightG: 36,
    unitPriceAud: 69.95,
    retailers: ["Paddy Pallin", "K2 Base Camp"],
    websiteUrl: "https://silva.se/product/compass-expedition-4/",
    imagePath: "https://silva.se/wp-content/uploads/2020/03/35688-0001_Expedition-4-360_front.jpg",
    summary: "The definitive baseplate compass for Australian topographic bushwalking navigation. Features 1:25k, 1:40k and 1:50k romer scales.",
    specs: {
      "Weight": "36g",
      "Dimensions": "125 x 60 x 10 mm",
      "Romer Scales": "1:25,000, 1:40,000, 1:50,000",
      "Declination Scale": "Fixed declination correction scale inside capsule"
    },
    features: [
      "Large magnifying lens for spotting small contours, cliff lines and track markings",
      "Luminous markings activated by headlamp glow for up to 4 hours of night navigation",
      "Silicon friction feet on baseplate grip laminated maps in wet, gusty conditions"
    ]
  },
  {
    id: "cat-k2-pp-pack-17",
    brand: "Black Diamond",
    name: "Storm 500-R Rechargeable Headlamp",
    category: "Packs & Essentials",
    itemType: "headlamp",
    unitWeightG: 100,
    unitPriceAud: 139.99,
    retailers: ["Paddy Pallin", "K2 Base Camp"],
    websiteUrl: "https://www.blackdiamondequipment.com/en_AU/product/storm-500-r-headlamp/",
    imagePath: "https://www.blackdiamondequipment.com/on/demandware.static/-/Sites-bdel-master-catalog/default/dw1da1f13b/images/products/BD620674_0000_hero.jpg",
    summary: "500-lumen IP67 waterproof rechargeable headlamp with RGB night-vision modes and PowerTap instant full-power toggle.",
    specs: {
      "Lumens": "500 Lumens (Max beam distance: 120m)",
      "Weight": "100g",
      "Battery": "2400 mAh integrated Li-ion with micro-USB charging",
      "Waterproof Rating": "IP67 (Submersible to 1m for 30 minutes)"
    },
    features: [
      "PowerTap technology allows instant transition between full output and dimmed beam with one tap",
      "Red, green and blue night vision LEDs preserve night-adjusted eyesight and map reading",
      "Digital lock mode prevents accidental battery drainage inside packed rucksacks"
    ]
  },
  {
    id: "cat-k2-pp-pack-18",
    brand: "Sea to Summit",
    name: "Hydraulic Pro Dry Pack 65L",
    category: "Packs & Essentials",
    itemType: "dry pack",
    unitWeightG: 1750,
    unitPriceAud: 429.00,
    retailers: ["K2 Base Camp", "Paddy Pallin"],
    websiteUrl: "https://seatosummit.com.au/products/hydraulic-pro-dry-pack",
    imagePath: "https://seatosummit.com.au/cdn/shop/products/AHYDRPRO65_01_1024x1024.jpg",
    summary: "Heavy-duty submersible waterproof pack with airtight pressure-tested zipper and fully removable breathable harness.",
    specs: {
      "Capacity": "65 Litres",
      "Weight": "1.75 kg",
      "Material": "1000D TPU-laminated high tenacity nylon with welded construction",
      "Waterproof Rating": "IPX8 (Submersible to 4m for 30 minutes)"
    },
    features: [
      "Airtight zipper seals water, river rapids and red dust completely out of your kit",
      "Removable ergonomic harness with air-mesh shoulder straps for comfortable overland portage",
      "Multiple heavy-duty lash points for securing to canoes, packrafts, or pack animal saddles"
    ]
  },
  {
    id: "cat-k2-pp-pack-19",
    brand: "Sea to Summit",
    name: "Ultra-Sil Pack Liner 70L",
    category: "Packs & Essentials",
    itemType: "pack liner",
    unitWeightG: 110,
    unitPriceAud: 69.95,
    retailers: ["Paddy Pallin", "K2 Base Camp"],
    websiteUrl: "https://seatosummit.com.au/products/ultra-sil-pack-liner",
    imagePath: "https://seatosummit.com.au/cdn/shop/products/APACKLIN70_01_1024x1024.jpg",
    summary: "Ultralight internal waterproof roll-top liner designed to slide into your multi-day backpack to keep sleeping bags and dry clothes safe from soaking rains.",
    specs: {
      "Capacity": "70 Litres",
      "Weight": "110g",
      "Fabric": "30D Diamond Ripstop Siliconised Cordura nylon",
      "Seams": "Double stitched and fully PU taped"
    },
    features: [
      "Slippery siliconised finish makes packing and sliding gear down into the rucksack effortless",
      "Hypalon roll-top closure with non-wicking reinforcement strip",
      "Far superior to external raincovers which blow off in Tasmanian mountain winds"
    ]
  },

  // =========================================================================
  // 3. Cooking & Hydration
  // =========================================================================
  {
    id: "cat-k2-pp-cook-01",
    brand: "Trangia",
    name: "27-1 UL Ultralight Storm Cooker",
    category: "Cooking & Hydration",
    itemType: "stove",
    unitWeightG: 690,
    unitPriceAud: 149.95,
    retailers: ["K2 Base Camp"],
    websiteUrl: "https://trangia.se/en/shop/trangia-stove-27-1-ul/",
    imagePath: "https://trangia.se/wp-content/uploads/2021/01/140271_27-1-UL_1-1.jpg",
    summary: "The definitive bushwalking storm cooker. Interlocking windscreen and spirit burner perform flawlessly in gale force alpine winds.",
    specs: {
      "Weight": "690g complete set",
      "Material": "Ultralight aluminium alloy",
      "Components": "Spirit burner, upper & lower windshield, 2 x 1L saucepans, 18cm frypan, handle gripper, strap",
      "Fuel": "Methylated spirits (bioethanol)"
    },
    features: [
      "Performs in roaring winds where conventional gas burners get blown out",
      "Zero moving parts, seals, or pump valves to fail in remote wilderness",
      "Nests into a compact, rattle-free cylinder held together by an included nylon strap"
    ]
  },
  {
    id: "cat-k2-pp-cook-02",
    brand: "MSR",
    name: "WhisperLite Universal Liquid & Canister Fuel Stove",
    category: "Cooking & Hydration",
    itemType: "stove",
    unitWeightG: 387,
    unitPriceAud: 299.95,
    retailers: ["K2 Base Camp", "Paddy Pallin"],
    websiteUrl: "https://www.msrgear.com/stoves/liquid-fuel-stoves/whisperlite-universal-backpacking-stove/06630.html",
    imagePath: "https://www.msrgear.com/dw/image/v2/BDDX_PRD/on/demandware.static/-/Sites-cascadedesigns-master/default/dwfdcfd600/06630-WhisperLite-Universal-hero.jpg",
    summary: "The ultimate global expedition stove. Hybrid fuel design burns white gas, kerosene, unleaded automotive petrol, and isobutane gas canisters.",
    specs: {
      "Weight": "387g (Minimum: 318g)",
      "Fuel Types": "White gas (Shellite), Kerosene, Unleaded auto petrol, Isobutane canister",
      "Boil Time (Shellite)": "3.5 mins for 1L",
      "Legs": "Stamped stainless steel folding legs"
    },
    features: [
      "AirControl technology delivers optimum fuel/air mix across all canister and liquid fuel choices",
      "Shaker Jet technology cleans fuel jet in seconds with a simple shake of the stove",
      "Inverted canister stand included for sub-zero liquid gas feed in winter snow"
    ]
  },
  {
    id: "cat-k2-pp-cook-03",
    brand: "MSR",
    name: "WindBurner Personal Stove System 1.0L",
    category: "Cooking & Hydration",
    itemType: "stove",
    unitWeightG: 433,
    unitPriceAud: 319.95,
    retailers: ["Paddy Pallin", "K2 Base Camp"],
    websiteUrl: "https://www.msrgear.com/stoves/stove-systems/windburner-personal-stove-system/windburner.html",
    imagePath: "https://www.msrgear.com/dw/image/v2/BDDX_PRD/on/demandware.static/-/Sites-cascadedesigns-master/default/dwc6c68ad4/13491-WindBurner-Personal-1-0L-hero.jpg",
    summary: "100% primary air combustion radiant burner completely enclosed inside an aerodynamic windproof heat-exchanger pot.",
    specs: {
      "Capacity": "1.0 Litre",
      "Weight": "433g",
      "Burner Type": "Radiant burner with internal pressure regulator",
      "Boil Time": "4.5 minutes for 1.0L in 12mph crosswind"
    },
    features: [
      "Impervious to wind gusts that shut down other canister stove systems",
      "Internal pressure regulator maintains boiling performance even as gas canister chills",
      "All components nest securely inside the 1.0L pot with an 100g IsoPro fuel canister"
    ]
  },
  {
    id: "cat-k2-pp-cook-04",
    brand: "Jetboil",
    name: "MiniMo Personal Cooking System",
    category: "Cooking & Hydration",
    itemType: "stove",
    unitWeightG: 415,
    unitPriceAud: 289.95,
    retailers: ["Paddy Pallin"],
    websiteUrl: "https://jetboil.com.au/products/minimo",
    imagePath: "https://jetboil.com.au/cdn/shop/products/minimo-sunset-hero.jpg",
    summary: "Gourmet trail cooking system with proprietary regulator valve technology allowing true simmering down to a delicate flame.",
    specs: {
      "Volume": "1.0 Litre Short / Wide cup",
      "Weight": "415g",
      "Regulator": "Incremental burner control down to a gentle simmer",
      "Ignition": "Push-button piezo igniter"
    },
    features: [
      "Low spoon angle: wider cooking cup makes eating straight out of the pot comfortable",
      "Reliable performance down to -6°C with internal micro-regulator diaphragm",
      "Sturdy metal handles fold flush against the insulating neoprene cozy"
    ]
  },
  {
    id: "cat-k2-pp-cook-05",
    brand: "Jetboil",
    name: "Stash Ultralight Cooking System 0.8L",
    category: "Cooking & Hydration",
    itemType: "stove",
    unitWeightG: 200,
    unitPriceAud: 249.95,
    retailers: ["Paddy Pallin", "K2 Base Camp"],
    websiteUrl: "https://jetboil.com.au/products/stash",
    imagePath: "https://jetboil.com.au/cdn/shop/products/stash-hero.jpg",
    summary: "Jetboil's lightest cooking system ever at 200g. Titanium stand-alone burner with FluxRing hard-anodised pot.",
    specs: {
      "Weight": "200g (Burner: 60g, Pot: 140g)",
      "Capacity": "0.8 Litre",
      "Burner Material": "Titanium",
      "Boil Time": "2.5 mins for 0.5L"
    },
    features: [
      "40% lighter than standard integrated stove systems",
      "FluxRing cook pot optimizes heat transfer to save fuel over multi-day hikes",
      "Clever nesting storage holds fuel canister, titanium burner, and lighter inside pot"
    ]
  },
  {
    id: "cat-k2-pp-cook-06",
    brand: "SOTO",
    name: "Fusion Trek SOD-330 Remote Canister Stove",
    category: "Cooking & Hydration",
    itemType: "stove",
    unitWeightG: 182,
    unitPriceAud: 189.95,
    retailers: ["K2 Base Camp"],
    websiteUrl: "https://sotooutdoors.com/product/fusion-trek-sod-330/",
    imagePath: "https://sotooutdoors.com/wp-content/uploads/2020/03/SOD-330_main.jpg",
    summary: "Ultra-stable remote canister stove with Micro-Regulator valve and 300+ sub-flame burner holes for exceptional wind resistance.",
    specs: {
      "Weight": "182g",
      "Output": "3,300 W (11,000 BTU)",
      "Pot Support Diameter": "160 mm",
      "Hose Length": "430 mm flexible braided hose"
    },
    features: [
      "Concave burner head deflects side gusts without needing an external windshield",
      "Micro-regulator provides continuous high heat output even in freezing winter conditions",
      "Low center of gravity three-leg base supports heavy 2-litre pots with zero wobble"
    ]
  },
  {
    id: "cat-k2-pp-cook-07",
    brand: "Optimus",
    name: "Vega Remote Canister 4-Season Stove",
    category: "Cooking & Hydration",
    itemType: "stove",
    unitWeightG: 178,
    unitPriceAud: 199.95,
    retailers: ["K2 Base Camp"],
    websiteUrl: "https://www.optimusstoves.com/en/de/109-8018847-optimus-vega",
    imagePath: "https://www.optimusstoves.com/media/catalog/product/8/0/8018847_1.jpg",
    summary: "High-performance remote gas canister stove with invert canister 4-season mode and low-profile wide folding legs.",
    specs: {
      "Weight": "178g",
      "Output (Invert mode)": "3,700 W (12,600 BTU)",
      "Boil Time": "3 mins for 0.8L",
      "Fuel": "Isobutane / propane gas"
    },
    features: [
      "Flip-out legs on fuel valve invert canister for continuous liquid gas supply down to -20°C",
      "Integrated pre-heating loop ensures clean vaporisation and zero flare-ups",
      "Precise flame simmer adjustment dial located far from hot burner pot"
    ]
  },
  {
    id: "cat-k2-pp-cook-08",
    brand: "Grayl",
    name: "GeoPress 710ml Water Purifier Bottle",
    category: "Cooking & Hydration",
    itemType: "water purifier",
    unitWeightG: 450,
    unitPriceAud: 159.95,
    retailers: ["Paddy Pallin", "K2 Base Camp"],
    websiteUrl: "https://grayl.com.au/products/geopress-water-purifier",
    imagePath: "https://grayl.com.au/cdn/shop/products/GeoPress-CovertBlack-Front.jpg",
    summary: "One-press water purifier removes 99.99% of viruses, bacteria, protozoan cysts, microplastics, chemicals and heavy metals in 8 seconds.",
    specs: {
      "Capacity": "710 ml (24 oz)",
      "Weight": "450g",
      "Flow Rate": "5 litres per minute",
      "Cartridge Lifespan": "350 cycles (250 L / 65 gal)",
      "Protection": "Viruses (99.99%), Bacteria (99.9999%), Protozoa (99.9%)"
    },
    features: [
      "No setup, batteries, hoses, or waiting: Fill, Press, Drink in just 8 seconds",
      "Electroadsorptive media and ultra-powdered activated carbon filter murky swamp and creek water",
      "SoftPress ergonomic pads on lid provide comfortable palm leverage when pressing"
    ]
  },
  {
    id: "cat-k2-pp-cook-09",
    brand: "Katadyn",
    name: "Hiker Pro Clear Backcountry Microfilter",
    category: "Cooking & Hydration",
    itemType: "water filter",
    unitWeightG: 310,
    unitPriceAud: 159.95,
    retailers: ["Paddy Pallin", "K2 Base Camp"],
    websiteUrl: "https://www.katadyngroup.com/en/de/8019857-katadyn-hiker-pro-clear~p6788",
    imagePath: "https://www.katadyngroup.com/media/catalog/product/8/0/8019857_katadyn_hiker_pro_clear_1.jpg",
    summary: "The top-selling pump water filter in the outdoor industry. 0.2 micron pleated glassfiber cartridge with activated carbon core.",
    specs: {
      "Weight": "310g",
      "Flow Rate": "1 Litre per minute",
      "Filter Lifespan": "Up to 1150 litres",
      "Pore Size": "0.2 micron pleated glassfiber"
    },
    features: [
      "Activated carbon core eliminates unpleasant taste, chlorine and swampy odors from creek water",
      "Cleanable filter protector screen extends cartridge lifespan in silt-laden muddy rivers",
      "Quick-connect fittings allow direct pumping straight into hydration reservoirs and water bottles"
    ]
  },
  {
    id: "cat-k2-pp-cook-10",
    brand: "Steripen",
    name: "Ultra UV Water Purifier",
    category: "Cooking & Hydration",
    itemType: "water purifier",
    unitWeightG: 140,
    unitPriceAud: 199.95,
    retailers: ["Paddy Pallin"],
    websiteUrl: "https://www.katadyngroup.com/en/de/8013400-steripen-ultra~p6828",
    imagePath: "https://www.katadyngroup.com/media/catalog/product/8/0/8013400_steripen_ultra_1.jpg",
    summary: "USB-rechargeable ultraviolet light purifier destroys 99.9% of bacteria, protozoa and viruses in 90 seconds without chemical aftertaste.",
    specs: {
      "Weight": "140g",
      "Treatment Volume": "1 Litre in 90 seconds (0.5L in 48s)",
      "Battery Life": "50 treatments per full charge (USB rechargeable)",
      "UV Lamp Lifespan": "8,000 treatments"
    },
    features: [
      "High-resolution OLED screen displays treatment countdown timer and battery charge level",
      "Leaves zero chemical smell or chlorine iodine taste in backcountry drinking water",
      "Water sensor prongs ensure UV lamp only activates when fully submerged in liquid"
    ]
  },
  {
    id: "cat-k2-pp-cook-11",
    brand: "Platypus",
    name: "GravityWorks 4.0L Water Filter System",
    category: "Cooking & Hydration",
    itemType: "water filter",
    unitWeightG: 326,
    unitPriceAud: 229.95,
    retailers: ["Paddy Pallin", "K2 Base Camp"],
    websiteUrl: "https://www.platy.com/filtration-systems/gravityworks-water-filter-system/gravityworks-4.0l.html",
    imagePath: "https://www.platy.com/dw/image/v2/BDDX_PRD/on/demandware.static/-/Sites-cascadedesigns-master/default/dw3fcbb831/09211-GravityWorks-4.0L-hero.jpg",
    summary: "Pump-free gravity filtration system filters 4 litres of clean water in under 2.5 minutes while you pitch camp or relax.",
    specs: {
      "Capacity": "4L Dirty reservoir + 4L Clean reservoir",
      "Weight": "326g",
      "Flow Rate": "1.75 Litres per minute",
      "Filter Matrix": "Hollow fiber 0.2 micron"
    },
    features: [
      "Zero pumping required: hang from a tree branch and let gravity do all the work",
      "Backflushes in 4 seconds simply by elevating the clean bag above the dirty bag",
      "Meets all EPA and NSF guidelines for removal of 99.9999% of bacteria and 99.9% of protozoa"
    ]
  },
  {
    id: "cat-k2-pp-cook-12",
    brand: "MSR",
    name: "Dromedary Bag 4L Heavy Duty Water Reservoir",
    category: "Cooking & Hydration",
    itemType: "water reservoir",
    unitWeightG: 196,
    unitPriceAud: 99.95,
    retailers: ["K2 Base Camp", "Paddy Pallin"],
    websiteUrl: "https://www.msrgear.com/water-treatment/storage-bags/dromedary-bags/dromedary-bags.html",
    imagePath: "https://www.msrgear.com/dw/image/v2/BDDX_PRD/on/demandware.static/-/Sites-cascadedesigns-master/default/dw1aa721ea/08249-Dromedary-Bag-4L-hero.jpg",
    summary: "Virtually indestructible 1000D polyurethane-coated Cordura water storage bag built for harsh arid trail expeditions.",
    specs: {
      "Capacity": "4.0 Litres",
      "Weight": "196g",
      "Fabric": "1000D abrasion-resistant Cordura nylon with food-grade polyurethane lining",
      "Cap": "3-in-1 multi-function cap"
    },
    features: [
      "Can withstand freezing temperatures and boiling water without seam separation",
      "3-in-1 cap lets you fill, drink, and pour with a micro-stream for handwashing",
      "Perimeter webbing strap allows hanging from trees or tying down to packrafts"
    ]
  },
  {
    id: "cat-k2-pp-cook-13",
    brand: "Platypus",
    name: "Big Zip EVO Reservoir 2.0L",
    category: "Cooking & Hydration",
    itemType: "water reservoir",
    unitWeightG: 160,
    unitPriceAud: 79.95,
    retailers: ["Paddy Pallin", "K2 Base Camp"],
    websiteUrl: "https://www.platy.com/hydration-reservoirs/big-zip-evo-reservoir/big-zip-evo.html",
    imagePath: "https://www.platy.com/dw/image/v2/BDDX_PRD/on/demandware.static/-/Sites-cascadedesigns-master/default/dw3d13c72b/10857-Big-Zip-EVO-2.0L-hero.jpg",
    summary: "Premium taste-free hydration bladder featuring the HyFLO self-sealing shutoff valve for 50% greater water flow rate.",
    specs: {
      "Capacity": "2.0 Litres",
      "Weight": "160g",
      "Dimensions": "22 x 38 cm",
      "Material": "Polyurethane with Silver-ion antimicrobial protection, BPA/BPS free"
    },
    features: [
      "Secure SlideLock top closure slides open easily and seals leak-free with one click",
      "High-mount quick-disconnect hose fitting allows refilling reservoir while leaving hose routed through pack",
      "Semi-rigid center baffle holds low profile shape and makes drying and cleaning effortless"
    ]
  },
  {
    id: "cat-k2-pp-cook-14",
    brand: "Sea to Summit",
    name: "Frontier Ultralight 2L Pot",
    category: "Cooking & Hydration",
    itemType: "pot",
    unitWeightG: 255,
    unitPriceAud: 99.95,
    retailers: ["Paddy Pallin", "K2 Base Camp"],
    websiteUrl: "https://seatosummit.com.au/products/frontier-ultralight-pot",
    imagePath: "https://seatosummit.com.au/cdn/shop/products/APOTFRON2L_01_1024x1024.jpg",
    summary: "Hard-anodised alloy cook pot with Click-Safe removable handle that locks solidly into place for safe pouring.",
    specs: {
      "Capacity": "2.0 Litres",
      "Weight": "255g",
      "Material": "Hard-anodised premium aluminium alloy",
      "Coating": "Ceramic non-stick surface"
    },
    features: [
      "Click-Safe handle rotates over lid to lock entire nested pot contents securely for transport",
      "Lid features integrated strainer holes and silicone LidKeep clip to hang on pot rim",
      "Fluted heat distribution base prevents scorching on high-output canister stoves"
    ]
  },
  {
    id: "cat-k2-pp-cook-15",
    brand: "Sea to Summit",
    name: "Passage Cutlery Set 3-Piece",
    category: "Cooking & Hydration",
    itemType: "cutlery",
    unitWeightG: 37,
    unitPriceAud: 16.95,
    retailers: ["Paddy Pallin", "K2 Base Camp"],
    websiteUrl: "https://seatosummit.com.au/products/passage-cutlery-set-3-piece",
    imagePath: "https://seatosummit.com.au/cdn/shop/products/ACUTPAS3P_01_1024x1024.jpg",
    summary: "Durable food-grade glass-reinforced polypropylene knife, fork, and spoon with a compact snap-together interlocking nest.",
    specs: {
      "Weight": "37g total",
      "Material": "Glass-reinforced EU food-grade polypropylene",
      "BPA Free": "Yes",
      "Dishwasher Safe": "Yes"
    },
    features: [
      "Ergonomic handle curve fits natural hand grip and scrapes corners of dehydrated meal pouches",
      "Snap-together nested design keeps all 3 utensils clean and together inside cook pots",
      "Serrated edge on knife easily slices dry meats and trail cheeses"
    ]
  },

  // =========================================================================
  // 4. Food & Nutrition
  // =========================================================================
  {
    id: "cat-k2-pp-food-01",
    brand: "Campers Pantry",
    name: "Tasmanian Beef Curry (Freeze Dried)",
    category: "Food & Nutrition",
    itemType: "freeze-dried meal",
    unitWeightG: 110,
    unitPriceAud: 18.95,
    retailers: ["K2 Base Camp", "Paddy Pallin"],
    websiteUrl: "https://camperspantry.com.au/products/beef-curry",
    imagePath: "https://camperspantry.com.au/cdn/shop/products/Beef-Curry-Front.jpg",
    summary: "Australian 100% pasture-fed Tasmanian beef freeze-dried curry with aromatic spices and basmati rice. Rehydrates to 400g.",
    specs: {
      "Dry Weight": "110g (Rehydrated: 400g)",
      "Energy": "2180 kJ (521 kcal)",
      "Protein": "36.2 g",
      "Dietary": "Gluten Free",
      "Shelf Life": "2 Years"
    },
    features: [
      "100% Tasmanian real prime beef, freeze-dried in Tasmania to preserve rich natural texture and taste",
      "Requires only 300ml of boiling water and 8 minutes standing time inside the pouch",
      "Lightweight compact pouch saves significant pack weight compared to wet ready-to-eat rations"
    ]
  },
  {
    id: "cat-k2-pp-food-02",
    brand: "Campers Pantry",
    name: "Creamy Mushroom Risotto",
    category: "Food & Nutrition",
    itemType: "freeze-dried meal",
    unitWeightG: 110,
    unitPriceAud: 17.95,
    retailers: ["K2 Base Camp", "Paddy Pallin"],
    websiteUrl: "https://camperspantry.com.au/products/creamy-mushroom-risotto",
    imagePath: "https://camperspantry.com.au/cdn/shop/products/Mushroom-Risotto-Front.jpg",
    summary: "Rich vegetarian arborio rice risotto simmered with sautéed field mushrooms, white wine, garlic, and parmesan cheese.",
    specs: {
      "Dry Weight": "110g (Rehydrated: 400g)",
      "Energy": "2040 kJ (488 kcal)",
      "Protein": "15.4 g",
      "Dietary": "Vegetarian, Gluten Free"
    },
    features: [
      "Creamy, authentic Italian risotto texture restored perfectly in backcountry conditions",
      "High carbohydrate content replenishes depleted muscle glycogen after strenuous ascents",
      "Heavy-duty stand-up pouch eliminates the need for carrying dirty camp bowls"
    ]
  },
  {
    id: "cat-k2-pp-food-03",
    brand: "Campers Pantry",
    name: "Freeze Dried Cauliflower & Cheese",
    category: "Food & Nutrition",
    itemType: "freeze-dried meal",
    unitWeightG: 110,
    unitPriceAud: 17.95,
    retailers: ["K2 Base Camp", "Paddy Pallin"],
    websiteUrl: "https://camperspantry.com.au/products/cauliflower-cheese",
    imagePath: "https://camperspantry.com.au/cdn/shop/products/Cauliflower-Cheese-Front.jpg",
    summary: "Tender Tasmanian cauliflower florets smothered in a rich, velvety cheddar cheese sauce. A comforting alpine comfort food.",
    specs: {
      "Dry Weight": "110g",
      "Energy": "2260 kJ (540 kcal)",
      "Protein": "22.0 g",
      "Origin": "Tasmania, Australia"
    },
    features: [
      "Made with genuine Australian cheddar cheese, cream and fresh farm cauliflower",
      "Provides rich fats and calories essential for staying warm in sub-zero alpine tents",
      "Rehydrates rapidly in boiling water with no stovetop cooking required"
    ]
  },
  {
    id: "cat-k2-pp-food-04",
    brand: "Back Country Cuisine",
    name: "Honey Soy Chicken (Double Serve)",
    category: "Food & Nutrition",
    itemType: "freeze-dried meal",
    unitWeightG: 175,
    unitPriceAud: 18.95,
    retailers: ["Paddy Pallin", "K2 Base Camp"],
    websiteUrl: "https://backcountrycuisine.co.nz/our-products/honey-soy-chicken",
    imagePath: "https://backcountrycuisine.co.nz/wp-content/uploads/2020/09/Honey-Soy-Chicken.png",
    summary: "Classic Australian and NZ bushwalking freeze-dried meal. Tender chicken pieces, long-grain rice and vegetables in a sweet honey soy glaze.",
    specs: {
      "Dry Weight": "175g (Rehydrated: 675g Double Serve)",
      "Energy": "2850 kJ (681 kcal)",
      "Protein": "34.5 g",
      "Serves": "2 Hiker Portions"
    },
    features: [
      "Generous double serve satisfies hungry hikers after 20km+ days",
      "Rehydrates in just 10 minutes by adding 500ml of boiling water directly into pouch",
      "Resealable zip-top keeps food piping hot while it steams"
    ]
  },
  {
    id: "cat-k2-pp-food-05",
    brand: "Back Country Cuisine",
    name: "Spaghetti Bolognese (Double Serve)",
    category: "Food & Nutrition",
    itemType: "freeze-dried meal",
    unitWeightG: 175,
    unitPriceAud: 18.95,
    retailers: ["Paddy Pallin", "K2 Base Camp"],
    websiteUrl: "https://backcountrycuisine.co.nz/our-products/spaghetti-bolognese",
    imagePath: "https://backcountrycuisine.co.nz/wp-content/uploads/2020/09/Spaghetti-Bolognese.png",
    summary: "Hearty traditional Italian bolognese sauce with freeze-dried beef mince, tomatoes, Italian herbs, and tender spaghetti noodles.",
    specs: {
      "Dry Weight": "175g (Rehydrated: 675g)",
      "Energy": "2780 kJ (664 kcal)",
      "Protein": "32.0 g",
      "Carbohydrates": "92.0 g"
    },
    features: [
      "Massive carbohydrate load supplies sustained endurance for multi-day tracks",
      "Comfort food flavor profile tested on decades of Tasmanian Overland Track expeditions",
      "Pouch features water-fill level indicators inside for foolproof preparation"
    ]
  },
  {
    id: "cat-k2-pp-food-06",
    brand: "Back Country Cuisine",
    name: "Cooked Breakfast (Double Serve)",
    category: "Food & Nutrition",
    itemType: "freeze-dried meal",
    unitWeightG: 175,
    unitPriceAud: 18.95,
    retailers: ["Paddy Pallin", "K2 Base Camp"],
    websiteUrl: "https://backcountrycuisine.co.nz/our-products/cooked-breakfast",
    imagePath: "https://backcountrycuisine.co.nz/wp-content/uploads/2020/09/Cooked-Breakfast.png",
    summary: "Hot trail breakfast featuring scrambled eggs, golden hash browns, bacon bits, and savoury baked beans in tomato sauce.",
    specs: {
      "Dry Weight": "175g",
      "Energy": "2910 kJ (695 kcal)",
      "Protein": "35.8 g",
      "Preparation Time": "10 minutes"
    },
    features: [
      "High protein warm start warms your core before breaking camp on frosty mornings",
      "True freeze-dried real eggs and bacon recreate an authentic café breakfast on the ridge",
      "Zero frying pans or greasy cleanup required"
    ]
  },
  {
    id: "cat-k2-pp-food-07",
    brand: "Radix Nutrition",
    name: "Ultra Meal 800kcal Peri-Peri with Wild Salmon",
    category: "Food & Nutrition",
    itemType: "freeze-dried meal",
    unitWeightG: 172,
    unitPriceAud: 17.50,
    retailers: ["K2 Base Camp"],
    websiteUrl: "https://radixnutrition.com.au/products/ultra-meal-800-peri-peri-wild-salmon",
    imagePath: "https://radixnutrition.com.au/cdn/shop/products/Ultra-800-Peri-Peri-Salmon.png",
    summary: "Extreme density 800-calorie expedition freeze-dried dinner packed with wild Atlantic salmon, whole vegetables, and spicy Peri-Peri seasoning.",
    specs: {
      "Calories": "800 kcal (3350 kJ)",
      "Protein": "31 g",
      "Dry Weight": "172g",
      "Ingredients": "Wild Atlantic salmon, brown rice, broccoli, carrot, seeds and herbs",
      "Dietary": "Gluten free, non-GMO"
    },
    features: [
      "Industry-leading 4.65 kcal per gram energy density saves critical pack weight",
      "Cold-water rehydration capability allows eating even when fuel supplies run dry",
      "30+ whole-food micronutrients boost cellular recovery during grueling trekking"
    ]
  },
  {
    id: "cat-k2-pp-food-08",
    brand: "Real Meals",
    name: "Thai Green Chicken Curry with Rice",
    category: "Food & Nutrition",
    itemType: "freeze-dried meal",
    unitWeightG: 175,
    unitPriceAud: 18.95,
    retailers: ["K2 Base Camp"],
    websiteUrl: "https://realmeals.co.nz/products/thai-green-curry",
    imagePath: "https://realmeals.co.nz/cdn/shop/products/Thai-Green-Chicken-Curry-Front.png",
    summary: "Crafted by professional New Zealand chefs using real chicken, rich coconut cream, green chili, aromatic kaffir lime, and fragrant jasmine rice.",
    specs: {
      "Dry Weight": "175g",
      "Energy": "2760 kJ (660 kcal)",
      "Protein": "33.2 g",
      "Origin": "Nelson, New Zealand"
    },
    features: [
      "Chef-cooked gourmet recipe freeze-dried without preservatives or artificial flavor enhancers",
      "Real succulent chicken breast chunks that rehydrate to restaurant quality",
      "Aromatic green curry broth warms the body thoroughly in alpine rain"
    ]
  },
  {
    id: "cat-k2-pp-food-09",
    brand: "Real Meals",
    name: "Venison and Sweet Potato Ragout",
    category: "Food & Nutrition",
    itemType: "freeze-dried meal",
    unitWeightG: 175,
    unitPriceAud: 19.95,
    retailers: ["K2 Base Camp"],
    websiteUrl: "https://realmeals.co.nz/products/venison-ragout",
    imagePath: "https://realmeals.co.nz/cdn/shop/products/Venison-Ragout-Front.png",
    summary: "Wild New Zealand Fiordland venison braised in red wine, rosemary and roasted sweet potatoes. Exceptionally rich in iron and protein.",
    specs: {
      "Dry Weight": "175g",
      "Protein": "41.5 g (High Iron)",
      "Energy": "2690 kJ (643 kcal)",
      "Dietary": "Dairy free, gluten free"
    },
    features: [
      "High natural iron content prevents fatigue during consecutive high-altitude mountain ascents",
      "Lean wild game venison provides pure bioavailable protein for muscle repair",
      "Cooked in small artisanal batches in the heart of the South Island wilderness"
    ]
  },
  {
    id: "cat-k2-pp-food-10",
    brand: "Stratech",
    name: "Performance Electrolyte Hydration Sachets (10-Pack)",
    category: "Food & Nutrition",
    itemType: "electrolyte",
    unitWeightG: 80,
    unitPriceAud: 22.50,
    retailers: ["K2 Base Camp"],
    websiteUrl: "https://k2.com.au/products/stratech-electrolyte-10pk",
    imagePath: "https://k2.com.au/cdn/shop/products/stratech-sachets-box.jpg",
    summary: "Clinical ratio of sodium, potassium, magnesium and zinc formulated to rapidly replenish sweat loss and prevent crippling muscle cramps.",
    specs: {
      "Weight": "80g (10 x 8g sachets)",
      "Electrolytes per sachet": "Sodium 500mg, Potassium 200mg, Magnesium 50mg, Zinc 2mg",
      "Sugar": "Low sugar (1g per serve)"
    },
    features: [
      "Prevents hyponatremia and heat exhaustion on exposed sun-baked trails like the Larapinta",
      "Dissolves instantly in 500ml to 750ml of cold creek water without clumping",
      "Clean citrus flavor leaves zero sticky residue in soft flasks or hydration bladders"
    ]
  },

  // =========================================================================
  // 5. Clothing & Footwear
  // =========================================================================
  {
    id: "cat-k2-pp-cloth-01",
    brand: "Mont",
    name: "Supersonic GORE-TEX Pro Alpine Jacket",
    category: "Clothing & Footwear",
    itemType: "jacket",
    unitWeightG: 480,
    unitPriceAud: 899.95,
    retailers: ["K2 Base Camp"],
    websiteUrl: "https://www.mont.com.au/products/supersonic-jacket",
    imagePath: "https://cdn.shopify.com/s/files/1/0268/7860/7416/products/mont-supersonic-jacket-black.jpg",
    summary: "Australian-designed 3-layer GORE-TEX Pro Most Rugged 70D mountain hardshell jacket built for the harshest blizzard conditions.",
    specs: {
      "Material": "3-Layer GORE-TEX Pro Most Rugged 70D nylon",
      "Waterproof Rating": "28,000mm",
      "Breathability": "RET < 6 (Extremely Breathable)",
      "Weight": "480g (Men's M)"
    },
    features: [
      "Helmet-compatible storm hood with 3-point Cohaesive cord lock system",
      "Extra-long 2-way pit zips allow massive mechanical ventilation while trekking uphill with a heavy pack",
      "High harness-compatible chest pockets stay fully accessible when wearing a loaded backpack hipbelt"
    ]
  },
  {
    id: "cat-k2-pp-cloth-02",
    brand: "Mont",
    name: "Icicle Down Jacket with Hydronaute XT",
    category: "Clothing & Footwear",
    itemType: "jacket",
    unitWeightG: 790,
    unitPriceAud: 799.95,
    retailers: ["K2 Base Camp"],
    websiteUrl: "https://www.mont.com.au/products/icicle-down-jacket",
    imagePath: "https://cdn.shopify.com/s/files/1/0268/7860/7416/products/mont-icicle-down-jacket.jpg",
    summary: "Mont's flagship expedition down jacket. 310g of 800+ loft RDS down in box-wall baffles inside a windproof, water-resistant Hydronaute XT shell.",
    specs: {
      "Fill": "310g of 800+ loft RDS goose down",
      "Baffle Construction": "Full box-wall baffles (Zero sewn-through cold spots)",
      "Shell": "Hydronaute XT 20,000mm waterhead windproof breathable",
      "Weight": "790g"
    },
    features: [
      "Hydronaute XT shell withstands damp sleet and driving snow without down clumping",
      "Reinforced Cordura nylon panels on shoulders and forearms resist backpack abrasion",
      "Down-filled technical storm hood with laminated visor seals in precious body heat"
    ]
  },
  {
    id: "cat-k2-pp-cloth-03",
    brand: "Mont",
    name: "Bushmaster Australian Canvas Gaiters",
    category: "Clothing & Footwear",
    itemType: "gaiters",
    unitWeightG: 320,
    unitPriceAud: 119.95,
    retailers: ["K2 Base Camp"],
    websiteUrl: "https://www.mont.com.au/products/bushmaster-gaiters",
    imagePath: "https://cdn.shopify.com/s/files/1/0268/7860/7416/products/bushmaster-gaiters-mont.jpg",
    summary: "The definitive Australian bushwalking gaiters. Australian corespun canvas upper resists snake bites and thorny scoparia scrub.",
    specs: {
      "Weight (Pair)": "320g",
      "Upper": "Australian 8oz corespun cotton-polyester canvas",
      "Lower": "1000D Cordura nylon reinforcement",
      "Under-boot Strap": "Replaceable high-tensile stainless steel wire"
    },
    features: [
      "Canvas naturally breathes in tropical humidity while deflecting tiger snake and scrub tick strikes",
      "Stainless steel under-boot wire lasts far longer on sharp dolerite scree than rubber straps",
      "Heavy-duty 50mm front hook-and-loop closure allows instant removal"
    ]
  },
  {
    id: "cat-k2-pp-cloth-04",
    brand: "Sea to Summit",
    name: "Quagmire Canvas Gaiters",
    category: "Clothing & Footwear",
    itemType: "gaiters",
    unitWeightG: 330,
    unitPriceAud: 119.00,
    retailers: ["Paddy Pallin", "K2 Base Camp"],
    websiteUrl: "https://seatosummit.com.au/products/quagmire-canvas-gaiters",
    imagePath: "https://seatosummit.com.au/cdn/shop/products/AQUAGCANV_01_1024x1024.jpg",
    summary: "Robust 8oz corespun canvas gaiters with 1000D Kodra boot section and indestructible BioThane underfoot strap for Australian bush trails.",
    specs: {
      "Weight": "330g (Pair Medium)",
      "Upper": "8oz breathable corespun canvas",
      "Lower Boot": "1000D Kodra nylon with internal lining",
      "Strap": "Replaceable BioThane TPU underfoot strap"
    },
    features: [
      "Breathable canvas upper keeps calves cool during hot Australian summer bushwalks",
      "50mm wide front hook-and-loop closure provides secure shin protection against rocks and thorns",
      "316 stainless steel lace hook secures firmly to all technical hiking boots"
    ]
  },
  {
    id: "cat-k2-pp-cloth-05",
    brand: "Outdoor Research",
    name: "Crocodiles GORE-TEX Gaiters",
    category: "Clothing & Footwear",
    itemType: "gaiters",
    unitWeightG: 289,
    unitPriceAud: 149.95,
    retailers: ["K2 Base Camp"],
    websiteUrl: "https://www.outdoorresearch.com/products/mens-crocodile-gaiters-243118",
    imagePath: "https://www.outdoorresearch.com/cdn/shop/products/243118_0001.jpg",
    summary: "The world's most awarded mountaineering gaiters. 3-layer GORE-TEX upper with heavy 1000D Cordura lower boot wrap.",
    specs: {
      "Weight": "289g (Pair)",
      "Upper": "3-Layer GORE-TEX 70D taslan nylon",
      "Boot Section": "1000D Cordura nylon",
      "Closure": "Heavy-duty 2-inch front Velcro with shear tab"
    },
    features: [
      "Triple-needle bar-tacked seams withstand crampon points, scree slides and jagged ice",
      "BioThane instep strap resists freezing and rock abrasion",
      "Contoured fit hugs hiking boots tightly to eliminate pebbles and snow ingress"
    ]
  },
  {
    id: "cat-k2-pp-cloth-06",
    brand: "Outdoor Research",
    name: "Helium Rain Jacket",
    category: "Clothing & Footwear",
    itemType: "jacket",
    unitWeightG: 179,
    unitPriceAud: 249.95,
    retailers: ["K2 Base Camp"],
    websiteUrl: "https://www.outdoorresearch.com/products/mens-helium-rain-jacket-275386",
    imagePath: "https://www.outdoorresearch.com/cdn/shop/products/275386_0001.jpg",
    summary: "Ultralight emergency waterproof shell weighing just 179g. Pertex Shield with Diamond Fuse technology offers 5x greater tear resistance.",
    specs: {
      "Weight": "179g",
      "Fabric": "Pertex Shield 2.5-Layer 30D ripstop with Diamond Fuse technology",
      "Waterproof Rating": "20,000mm",
      "Packability": "Stuffs into its own chest pocket"
    },
    features: [
      "Diamond-shaped filaments lock together to resist snagging on tree branches",
      "Adjustable hood with peripheral drawcord and stiffened visor stays put in high winds",
      "Elastic drawcord hem and elastic cuffs seal out sideways downpours"
    ]
  },
  {
    id: "cat-k2-pp-cloth-07",
    brand: "Arc'teryx",
    name: "Beta AR GORE-TEX Pro Jacket",
    category: "Clothing & Footwear",
    itemType: "jacket",
    unitWeightG: 460,
    unitPriceAud: 950.00,
    retailers: ["Paddy Pallin"],
    websiteUrl: "https://arcteryx.com.au/products/beta-ar-jacket-mens",
    imagePath: "https://arcteryx.com.au/cdn/shop/products/Beta-AR-Jacket-Black.jpg",
    summary: "The definitive alpine mountain hardshell jacket. Hybrid GORE-TEX Pro Most Rugged fabric with standalone collar and DropHood.",
    specs: {
      "Material": "GORE-TEX Pro Most Rugged (80D reinforced shoulders / 40D body)",
      "Weight": "460g",
      "Hood": "DropHood with standalone draft collar",
      "Reflector": "RECCO avalanche rescue reflector"
    },
    features: [
      "Standalone collar seals out gale-force winds even when the hood is folded down",
      "Watertight pit zippers allow rapid temperature dumping during intense mountain ascents",
      "Anatomical e3D patterning provides full unrestricted arm reach with zero hem lift"
    ]
  },
  {
    id: "cat-k2-pp-cloth-08",
    brand: "Patagonia",
    name: "Granite Crest 3L Rain Jacket",
    category: "Clothing & Footwear",
    itemType: "jacket",
    unitWeightG: 400,
    unitPriceAud: 399.95,
    retailers: ["Paddy Pallin"],
    websiteUrl: "https://www.patagonia.com.au/products/mens-granite-crest-rain-jacket-85415-blk",
    imagePath: "https://www.patagonia.com.au/cdn/shop/products/85415_BLK.jpg",
    summary: "3-layer waterproof alpine jacket made with NetPlus 100% postconsumer recycled nylon ripstop from recycled fishing nets. PFC-free DWR.",
    specs: {
      "Weight": "400g",
      "Fabric": "3-layer H2No Performance Standard 30D NetPlus nylon ripstop",
      "Membrane": "Hydrophilic waterproof membrane",
      "Coating": "PFC-free DWR (Durable Water Repellent)"
    },
    features: [
      "Two-way adjustable hood with laminated visor sheds driving rain while preserving peripheral vision",
      "Two-way watertight pit zips dump heat on humid coastal climbs",
      "Jacket self-stuffs into its left chest pocket with a carabiner clip-in loop"
    ]
  },
  {
    id: "cat-k2-pp-cloth-09",
    brand: "Patagonia",
    name: "Down Sweater Hoody",
    category: "Clothing & Footwear",
    itemType: "jacket",
    unitWeightG: 420,
    unitPriceAud: 449.95,
    retailers: ["Paddy Pallin"],
    websiteUrl: "https://www.patagonia.com.au/products/mens-down-sweater-hoody-84701-blk",
    imagePath: "https://www.patagonia.com.au/cdn/shop/products/84701_BLK.jpg",
    summary: "The quintessential backcountry down midlayer. 800-fill-power 100% Responsible Down Standard inside durable recycled NetPlus ripstop nylon.",
    specs: {
      "Fill": "800-fill-power 100% Responsible Down Standard goose down",
      "Weight": "420g",
      "Shell": "NetPlus 100% postconsumer recycled nylon ripstop",
      "Fit": "Regular fit layering cut"
    },
    features: [
      "Single-pull adjustable hood warms the head immediately at breezy mountain summits",
      "Two exterior handwarmer pockets with welted zippers plus interior zippered chest pocket",
      "Includes emergency repair patch for quick field repairs if torn by sharp branches"
    ]
  },
  {
    id: "cat-k2-pp-cloth-10",
    brand: "Icebreaker",
    name: "Merino 200 Oasis Thermal Leggings (Men's)",
    category: "Clothing & Footwear",
    itemType: "thermal bottoms",
    unitWeightG: 200,
    unitPriceAud: 149.99,
    retailers: ["Paddy Pallin", "K2 Base Camp"],
    websiteUrl: "https://www.icebreaker.com/en-au/mens-layering-base-layers/merino-200-oasis-thermal-leggings/104374.html",
    imagePath: "https://www.icebreaker.com/dw/image/v2/BDDX_PRD/on/demandware.static/-/Sites-icebreaker-master/default/dw112345/104374001_hero.jpg",
    summary: "100% pure Merino wool thermal base layer bottoms providing breathable warmth, natural temperature regulation, and odor resistance.",
    specs: {
      "Fabric": "100% pure Merino wool (200 g/m² midweight jersey)",
      "Weight": "200g",
      "Seams": "Flatlock friction-free seams",
      "Gusset": "Gusseted crotch construction"
    },
    features: [
      "Merino wool breathes and regulates body temperature across both freezing mornings and sunny afternoons",
      "Natural antimicrobial properties allow wearing for 5 to 7 days on the trail with zero odor",
      "Brushed elastic waistband and flatlock seams eliminate chafing under heavy pack hipbelts"
    ]
  },
  {
    id: "cat-k2-pp-cloth-11",
    brand: "Scarpa",
    name: "Terra GORE-TEX Hiking Boots",
    category: "Clothing & Footwear",
    itemType: "boots",
    unitWeightG: 1230,
    unitPriceAud: 379.95,
    retailers: ["Paddy Pallin", "K2 Base Camp"],
    websiteUrl: "https://scarpa.com.au/products/terra-gtx",
    imagePath: "https://scarpa.com.au/cdn/shop/products/30005-200-Brown-Side.jpg",
    summary: "Australia's favorite full-grain leather hiking boots. Supple oiled Montana leather with GORE-TEX waterproof lining and Vibram Energy II sole.",
    specs: {
      "Weight (Pair)": "1230g (Size 42)",
      "Upper": "2.0mm oiled Montana full-grain leather",
      "Lining": "GORE-TEX Performance Comfort",
      "Sole": "Vibram Energy II / PU midsole"
    },
    features: [
      "Straight-out-of-the-box comfort with virtually zero break-in period required",
      "Full-grain leather upper naturally sheds mud, water, and rough gravel abrasion",
      "Vibram Energy II sole delivers dependable traction across wet river boulders and roots"
    ]
  },
  {
    id: "cat-k2-pp-cloth-12",
    brand: "Scarpa",
    name: "Mescalito Mid GORE-TEX Technical Approach Boots",
    category: "Clothing & Footwear",
    itemType: "boots",
    unitWeightG: 1030,
    unitPriceAud: 449.95,
    retailers: ["K2 Base Camp"],
    websiteUrl: "https://scarpa.com.au/products/mescalito-mid-gtx",
    imagePath: "https://scarpa.com.au/cdn/shop/products/72615-200-Charcoal-Trek.jpg",
    summary: "Mid-cut technical approach and rugged trail boots with Vibram Dynamis Megagrip sole and climbing zone for scrambling rough ridges.",
    specs: {
      "Weight (Pair)": "1030g (Size 42)",
      "Upper": "1.8mm water-resistant suede with full rubber toe and heel rand",
      "Lining": "GORE-TEX Extended Comfort",
      "Sole": "Vibram Dynamis Megagrip"
    },
    features: [
      "Vibram Megagrip compound adheres to damp granite slabs and slippery limestone steps",
      "Autofit collar softly hugs the ankle to block trail debris while supporting joint flexion",
      "Extended lace-to-toe lacing system allows precision adjustment for technical ascents"
    ]
  },
  {
    id: "cat-k2-pp-cloth-13",
    brand: "Lowa",
    name: "Renegade GTX Mid Hiking Boots",
    category: "Clothing & Footwear",
    itemType: "boots",
    unitWeightG: 1110,
    unitPriceAud: 429.95,
    retailers: ["K2 Base Camp"],
    websiteUrl: "https://lowa.com.au/products/renegade-gtx-mid-mens",
    imagePath: "https://lowa.com.au/cdn/shop/products/310945_4211_Renegade_GTX_Mid.jpg",
    summary: "Handcrafted in Europe. Nubuck leather all-terrain hiking boots featuring Lowa's patented Monowrap frame for superior lateral stability.",
    specs: {
      "Weight (Pair)": "1110g",
      "Upper": "Hydrophobic Nubuck and full-grain leather",
      "Lining": "GORE-TEX Footwear",
      "Midsole": "DuraPU Monowrap frame",
      "Outsole": "Vibram Evo"
    },
    features: [
      "Monowrap frame cradles the foot in a skeleton PU frame for rock-solid stability with heavy packs",
      "Full-length nylon stabilizing shank prevents foot fatigue over 8-hour continuous hiking days",
      "Vibram Evo outsole with multi-directional self-cleaning tread pattern"
    ]
  },
  {
    id: "cat-k2-pp-cloth-14",
    brand: "La Sportiva",
    name: "Ultra Raptor II Mid GORE-TEX Trail Boots",
    category: "Clothing & Footwear",
    itemType: "boots",
    unitWeightG: 940,
    unitPriceAud: 329.95,
    retailers: ["K2 Base Camp"],
    websiteUrl: "https://sportiva.com.au/products/ultra-raptor-ii-mid-gtx",
    imagePath: "https://sportiva.com.au/cdn/shop/products/34B999100_Ultra_Raptor_II_Mid_GTX.jpg",
    summary: "Fastpacking mid-cut waterproof boots combining the cushioning of an ultralight trail runner with the ankle support of a hiking boot.",
    specs: {
      "Weight (Pair)": "940g",
      "Upper": "High-abrasion resistant mesh with microfibre reinforcement band",
      "Lining": "GORE-TEX Extended Comfort",
      "Sole": "FriXion White ultra-sticky rubber with Impact Brake System"
    },
    features: [
      "FriXion White compound offers incredible friction on steep, slippery mountain rock",
      "Impact Brake System lug orientation reduces impact forces by 20% on steep descents",
      "Soft comfort collar protects the Achilles tendon and keeps gravel outside"
    ]
  },
  {
    id: "cat-k2-pp-cloth-15",
    brand: "Salomon",
    name: "Quest 4 GORE-TEX Backpacking Boots",
    category: "Clothing & Footwear",
    itemType: "boots",
    unitWeightG: 1310,
    unitPriceAud: 399.99,
    retailers: ["Paddy Pallin"],
    websiteUrl: "https://salomon.com.au/products/quest-4-gore-tex-mens",
    imagePath: "https://salomon.com.au/cdn/shop/products/L41292600_Quest_4_GTX.jpg",
    summary: "Heavy-load expedition boots featuring the 4D Advanced Chassis, cradling the foot and stabilizing joints under 20kg+ multi-day packs.",
    specs: {
      "Weight (Pair)": "1310g",
      "Chassis": "4D Advanced Chassis",
      "Upper": "Nubuck leather and high-tenacity textile",
      "Outsole": "All Terrain Contagrip with deep chevron lugs"
    },
    features: [
      "4D Advanced Chassis targets sensitive ankle articulations to reduce fatigue and rolling on uneven scree",
      "Molded EVA sockliner mimics the foot's natural shape for supreme arch support",
      "GORE-TEX waterproof bootie keeps feet dry during creek crossings and mud bogs"
    ]
  },
  {
    id: "cat-k2-pp-cloth-16",
    brand: "Darn Tough",
    name: "1972 Hiker Boot Full Cushion Merino Socks",
    category: "Clothing & Footwear",
    itemType: "socks",
    unitWeightG: 98,
    unitPriceAud: 49.95,
    retailers: ["Paddy Pallin", "K2 Base Camp"],
    websiteUrl: "https://darntough.com.au/products/mens-1972-hiker-boot-full-cushion",
    imagePath: "https://darntough.com.au/cdn/shop/products/1972_Oatmeal.jpg",
    summary: "Indestructible hiking boot socks with high-density full terry loop cushion under the foot and up the leg. Unconditional lifetime guarantee.",
    specs: {
      "Weight (Pair)": "98g",
      "Composition": "66% Merino Wool, 32% Nylon, 2% Lycra Spandex",
      "Cushion": "Full Cushion (heavy warmth and impact absorption)",
      "Origin": "Knitted in Vermont, USA"
    },
    features: [
      "Performance fit ensures zero slipping, zero bunching, and zero trail blisters",
      "Fine gauge knitting provides supreme durability and a smooth invisible toe seam",
      "Guaranteed for life: if you wear a hole in them, Darn Tough replaces them free of charge"
    ]
  },

  // =========================================================================
  // 6. Personal Items, Maintenance & Camp Essentials
  // =========================================================================
  {
    id: "cat-k2-pp-pers-01",
    brand: "Sea to Summit",
    name: "Pocket Trowel (Alloy)",
    category: "Personal Items",
    itemType: "trowel",
    unitWeightG: 73,
    unitPriceAud: 39.95,
    retailers: ["Paddy Pallin", "K2 Base Camp"],
    websiteUrl: "https://seatosummit.com.au/products/pocket-trowel-alloy",
    imagePath: "https://seatosummit.com.au/cdn/shop/products/APOCKTROW_01_1024x1024.jpg",
    summary: "Reinforced 6066-T6 ultralight alloy leave-no-trace sanitation trowel with a collapsible hollow handle that stores lighter and toilet paper.",
    specs: {
      "Weight": "73g",
      "Material": "Hard-anodised 6066-T6 aircraft alloy",
      "Packed Length": "14 cm (Extended: 24.5 cm)",
      "Storage": "Hollow handle holds lighter and paper"
    },
    features: [
      "Strong enough to cut through tough roots, clay, and rocky soil to dig proper 15-20cm cat-holes",
      "Collapsible handle retracts into the shovel blade for compact pack storage",
      "Essential Leave-No-Trace hygiene gear for all Australian wilderness reserves"
    ]
  },
  {
    id: "cat-k2-pp-pers-02",
    brand: "Sea to Summit",
    name: "Wilderness Wash Pocket Soap (50 Leaves)",
    category: "Personal Items",
    itemType: "soap",
    unitWeightG: 15,
    unitPriceAud: 8.95,
    retailers: ["Paddy Pallin", "K2 Base Camp"],
    websiteUrl: "https://seatosummit.com.au/products/pocket-soap",
    imagePath: "https://seatosummit.com.au/cdn/shop/products/APOCKSOAPWW_01_1024x1024.jpg",
    summary: "50 dry biodegradable pure soap wafer leaves inside a pocket-sized compact case. Cleans hands, camp dishes, and greasy cookware.",
    specs: {
      "Weight": "15g",
      "Count": "50 dry soap leaves",
      "Formula": "Biodegradable, phosphate-free and paraben-free",
      "Fragrance": "Light green tea scent"
    },
    features: [
      "Dry wafer leaves cannot spill, leak, or ruin expensive gear inside your backpack",
      "Lathers instantly when added to warm or cold water",
      "Phosphate-free formula breaks down naturally without harming pristine river ecology"
    ]
  },
  {
    id: "cat-k2-pp-pers-03",
    brand: "Sea to Summit",
    name: "Airlite Ultralight Microfibre Towel (Large)",
    category: "Personal Items",
    itemType: "towel",
    unitWeightG: 47,
    unitPriceAud: 29.95,
    retailers: ["Paddy Pallin", "K2 Base Camp"],
    websiteUrl: "https://seatosummit.com.au/products/airlite-towel",
    imagePath: "https://seatosummit.com.au/cdn/shop/products/AAIRLITEL_01_1024x1024.jpg",
    summary: "The lightest pack towel available at just 47g. Absorbs over three times its weight in water and dries three times faster than standard camp towels.",
    specs: {
      "Dimensions": "108 x 45 cm",
      "Weight": "47g",
      "Material": "85% recycled polyester, 15% nylon microfibre",
      "Stuff Sack": "15D nylon storage pouch included"
    },
    features: [
      "Fast drying: wring out and hang on the outside of your backpack to dry in 20 minutes",
      "Elongated proportions allow wrapping around neck during hot sun-exposed ascents",
      "Integrated press-stud hanging loop secures towel to tent guy-lines"
    ]
  },
  {
    id: "cat-k2-pp-pers-04",
    brand: "Gear Aid",
    name: "Seam Grip WP Waterproof Sealant & Adhesive",
    category: "Personal Items",
    itemType: "gear repair",
    unitWeightG: 28,
    unitPriceAud: 19.95,
    retailers: ["K2 Base Camp", "Paddy Pallin"],
    websiteUrl: "https://k2.com.au/products/gear-aid-seam-grip-wp",
    imagePath: "https://k2.com.au/cdn/shop/products/seam-grip-wp-tube.jpg",
    summary: "Thermoset polyurethane adhesive permanently seals leaking seams, patches pinholes in sleeping pads, and bonds tears in tents and packs.",
    specs: {
      "Weight": "28g (1 oz tube)",
      "Material": "Urethane rubber adhesive",
      "Cure Time": "8 - 12 hours (Clear waterproof rubber)",
      "Temperature Flexibility": "Flexible down to sub-zero alpine conditions"
    },
    features: [
      "Creates an impenetrable flexible rubber seal that bends and stretches with tent fabrics",
      "Permanently bonds nylon, canvas, vinyl, polyester, neoprene and rubber",
      "Essential repair kit component for fixing punctured inflatable sleeping pads in camp"
    ]
  },
  {
    id: "cat-k2-pp-pers-05",
    brand: "Gear Aid",
    name: "Tenacious Tape Gear Patches (Black & Clear)",
    category: "Personal Items",
    itemType: "gear repair",
    unitWeightG: 18,
    unitPriceAud: 14.95,
    retailers: ["K2 Base Camp", "Paddy Pallin"],
    websiteUrl: "https://k2.com.au/products/gear-aid-tenacious-tape-patches",
    imagePath: "https://k2.com.au/cdn/shop/products/tenacious-tape-patches-pkg.jpg",
    summary: "Clean, peel-and-stick weatherproof repair patches. Ultra-aggressive adhesive instantly fixes ripped Gore-Tex jackets, sleeping bags and tents.",
    specs: {
      "Weight": "18g",
      "Pack Contents": "Pre-cut round and strip patches (Matte black ripstop and clear vinyl)",
      "Adhesion": "Pressure-sensitive ultra-aggressive waterproof adhesive"
    },
    features: [
      "Instantly seals barbed-wire and ember tears in down jackets without down feathers leaking out",
      "Machine washable and completely waterproof within 24 hours of application",
      "Clean adhesive leaves zero sticky gummy residue if replaced later with a permanent patch"
    ]
  },
  {
    id: "cat-k2-pp-pers-06",
    brand: "Adventure Medical Kits",
    name: "Mountain Series Hiker Medical Kit",
    category: "Personal Items",
    itemType: "first aid kit",
    unitWeightG: 204,
    unitPriceAud: 59.95,
    retailers: ["Paddy Pallin"],
    websiteUrl: "https://paddypallin.com.au/products/adventure-medical-kits-mountain-hiker",
    imagePath: "https://paddypallin.com.au/cdn/shop/products/AMK-Mountain-Hiker.jpg",
    summary: "Comprehensive wilderness first aid kit organized by injury type, designed for 1-2 people on wilderness trail trips up to 7 days.",
    specs: {
      "Weight": "204g",
      "Group Size": "1 - 2 People",
      "Trip Duration": "1 - 7 Days",
      "Case": "Silnylon water-resistant zippered pouch with Easy Care organization"
    },
    features: [
      "Easy Care compartments organize supplies by injury: Bleeding, Blisters, Medications, Fractures",
      "Pre-cut die-cut Moleskin blister pads prevent hotspots from turning into debilitating blisters",
      "Includes EMT trauma shears, irrigation syringe, sterile gauze pads, and splinter forceps"
    ]
  },
  {
    id: "cat-k2-pp-pers-07",
    brand: "Coghlan's",
    name: "Bear Bell with Magnetic Silencer",
    category: "Personal Items",
    itemType: "trail bell",
    unitWeightG: 42,
    unitPriceAud: 9.95,
    retailers: ["K2 Base Camp"],
    websiteUrl: "https://k2.com.au/products/coghlans-bear-bell-magnetic",
    imagePath: "https://k2.com.au/cdn/shop/products/coghlans-bear-bell.jpg",
    summary: "Trail movement safety bell with magnetic silencer strap to alert wildlife of your approach on blind corners.",
    specs: {
      "Weight": "42g",
      "Attachment": "Velcro strap for packs or trekking poles",
      "Silencer": "Built-in magnetic silencer"
    },
    features: [
      "Rings with motion to avoid startling wild boars, feral cattle, or overseas bears on blind switchbacks",
      "Magnetic strap silences the bell instantly when entering campgrounds or quiet huts",
      "Durable steel bell construction withstands heavy trail knockabouts"
    ]
  },
  {
    id: "cat-k2-pp-pers-08",
    brand: "Sea to Summit",
    name: "TPU Guide Waterproof Map Case",
    category: "Personal Items",
    itemType: "map case",
    unitWeightG: 78,
    unitPriceAud: 34.95,
    retailers: ["Paddy Pallin", "K2 Base Camp"],
    websiteUrl: "https://seatosummit.com.au/products/tpu-guide-map-case",
    imagePath: "https://seatosummit.com.au/cdn/shop/products/AMAPCASE_01_1024x1024.jpg",
    summary: "Freeze-proof, UV-stabilized touch-screen compatible waterproof case protects paper topographic maps and smartphones from drenching storms.",
    specs: {
      "Weight": "78g (Medium 30 x 21 cm)",
      "Material": "Optical-grade 0.2mm thermoplastic polyurethane (TPU)",
      "Closure": "Triple-roll Velcro watertight seal",
      "Waterproof Rating": "IPX8 (Submersible to 10 metres for 1 hour)"
    },
    features: [
      "Cold-crack resistant: remains supple in sub-zero alpine snow without cracking",
      "Touchscreen compatible: allows zooming maps on phones and tablets through the clear window",
      "Detachable neck strap with 4 corner lash points secures to pack chest straps"
    ]
  }
];

// Filter out any accidentally overlapping items
const filteredNewItems = [];
const skipped = [];

for (const item of newItems) {
  const key = normalize(item.brand + " " + item.name);
  if (existingKeys.has(key)) {
    skipped.push(item.name);
  } else {
    existingKeys.add(key);
    filteredNewItems.push(item);
  }
}

console.log(`Prepared ${filteredNewItems.length} strictly professional hiking items from K2 & Paddy Pallin.`);
if (skipped.length > 0) {
  console.log(`Skipped ${skipped.length} duplicate items:`, skipped);
}

// Append new items to catalog
const mergedCatalog = [...existingCatalog, ...filteredNewItems];
fs.writeFileSync(CATALOG_PATH, JSON.stringify(mergedCatalog, null, 2), "utf-8");
console.log(`Updated ${CATALOG_PATH}. Total catalog items now: ${mergedCatalog.length} (was ${existingCatalog.length}).`);
