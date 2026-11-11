import fs from "node:fs";

const CATALOG_PATH = "/Users/junzhou/Documents/ChatGPT/outdoor/gear-site/dist/catalog.json";
const GEAR_DIST_PATH = "/Users/junzhou/Documents/ChatGPT/outdoor/gear-site/dist/gear.json";
const GEAR_SRC_PATH = "/Users/junzhou/Documents/ChatGPT/outdoor/gear-site/src/data/gear.json";

// 1. Load catalog
const catalog = JSON.parse(fs.readFileSync(CATALOG_PATH, "utf-8"));

// Update existing cat-sleep-03 to include Backpacking Light and Paddy Pallin
const existingHornet = catalog.find((i) => i.id === "cat-sleep-03" || i.name.toLowerCase().includes("hornet osmo"));
if (existingHornet) {
  existingHornet.brand = "NEMO Equipment";
  existingHornet.name = "Nemo Hornet OSMO 2P Ultralight Tent";
  existingHornet.unitPriceAud = 699.95;
  existingHornet.retailers = ["Backpacking Light", "Paddy Pallin"];
  existingHornet.websiteUrl = "https://www.backpackinglight.com.au/nemo-hornet-osmo-2p-tent.html";
  existingHornet.specs = {
    ...existingHornet.specs,
    "Regular Price": "$699.95 AUD",
    "Retailer": "Backpacking Light Australia & Paddy Pallin"
  };
}

// Add the flagship Nemo Hornet 2P Elite OSMO Ultralight Backpacking Tent
const eliteItem = {
  id: "cat-bpl-sleep-00-nemo-hornet-elite-2p",
  brand: "NEMO Equipment",
  name: "Nemo Hornet 2P Elite OSMO™ Ultralight Backpacking Tent",
  category: "Sleep & Shelter",
  itemType: "tent",
  unitWeightG: 935,
  unitPriceAud: 999.95,
  retailers: ["Backpacking Light", "Paddy Pallin"],
  websiteUrl: "https://www.backpackinglight.com.au/nemo-hornet-elite-osmo-2p-tent.html",
  imagePath: "https://www.nemoequipment.com/cdn/shop/files/Hornet_Elite_OSMO_2P_Angle_Hero_2048x.jpg",
  summary: "NEMO's pinnacle ultralight 2-person semi-freestanding shelter available at Backpacking Light Australia. Features 100% recycled OSMO™ poly-nylon fabric with 3x less wet-stretch and 4x longer water repellency, dual doors, and dual vestibules at an astounding 935g packed weight.",
  specs: {
    "Capacity": "2 Person",
    "Regular Price": "$999.95 AUD",
    "Packed Weight": "935 g (2 lb 1 oz)",
    "Minimum Trail Weight": "779 g (1 lb 11 oz)",
    "Floor Dimensions": "216 x 128 / 107 cm (85 x 50 / 42 in)",
    "Floor Area": "2.5 m² (27.3 sq ft)",
    "Vestibule Area": "0.6 m² + 0.6 m² (6.2 + 6.2 sq ft)",
    "Peak Height": "94 cm (37 in)",
    "Packed Size": "32 x 19 x 8.5 cm (12.5 x 7.5 x 3.5 in)",
    "Poles": "1 Hubbed DAC Featherlite NFL 8.7mm Aluminum",
    "Fly Fabric": "OSMO™ Ripstop (1200 mm, 100% recycled yarns, PFAS-free)",
    "Floor Fabric": "OSMO™ Ripstop (1200 mm)",
    "Canopy Fabric": "10D Nylon Ripstop & No-See-Um Mesh",
    "Retailer Source": "Backpacking Light Australia (Melbourne, VIC)"
  },
  features: [
    "Proprietary 100% recycled OSMO™ composite fabric stretches 3x less when wet and provides 4x longer water repellency",
    "Patent-pending Flybar™ volumizing pole clip creates extra interior headroom and distributes fly tension evenly",
    "Two large doors and two generous vestibules ensure personal gear storage and hassle-free entry for both backpackers",
    "Nightlight Pocket™ diffuses your headlamp into a warm 360-degree overhead lantern glow without extra weight",
    "Divvy Cube™ rectangular dual-stage stuff sack allows easily splitting the tent weight with your hiking partner",
    "Gatekeeper™ one-handed tie-backs make holding tent doors open effortless"
  ]
};

// Also add 1P Elite OSMO for complete coverage
const elite1PItem = {
  id: "cat-bpl-sleep-00-nemo-hornet-elite-1p",
  brand: "NEMO Equipment",
  name: "Nemo Hornet 1P Elite OSMO™ Ultralight Backpacking Tent",
  category: "Sleep & Shelter",
  itemType: "tent",
  unitWeightG: 812,
  unitPriceAud: 899.95,
  retailers: ["Backpacking Light", "Paddy Pallin"],
  websiteUrl: "https://www.backpackinglight.com.au/nemo-hornet-elite-osmo-1p-tent.html",
  imagePath: "https://www.nemoequipment.com/cdn/shop/files/Hornet_Elite_OSMO_1P_Angle_Hero_2048x.jpg",
  summary: "Ultralight solo semi-freestanding shelter with 100% recycled OSMO fabric, Flybar headroom volumizer, and sub-850g packed weight.",
  specs: {
    "Capacity": "1 Person",
    "Regular Price": "$899.95 AUD",
    "Packed Weight": "812 g (1 lb 12 oz)",
    "Minimum Trail Weight": "657 g (1 lb 7 oz)",
    "Floor Dimensions": "221 x 102 / 81 cm",
    "Floor Area": "2.1 m² (22.3 sq ft)",
    "Peak Height": "98 cm (39 in)",
    "Poles": "1 Hubbed DAC Featherlite NFL 8.7mm Aluminum",
    "Retailer Source": "Backpacking Light Australia"
  },
  features: [
    "Ultralight solo shelter weighing only 812g packed",
    "OSMO composite fabric with 4x water repellency and 3x less wet stretch",
    "Flybar volumizing clip adds generous headroom"
  ]
};

// Check if already in catalog
if (!catalog.some(i => i.id === eliteItem.id || i.name === eliteItem.name)) {
  catalog.unshift(eliteItem);
}
if (!catalog.some(i => i.id === elite1PItem.id || i.name === elite1PItem.name)) {
  catalog.splice(1, 0, elite1PItem);
}

fs.writeFileSync(CATALOG_PATH, JSON.stringify(catalog, null, 2), "utf-8");
console.log(`[Catalog] Updated ${CATALOG_PATH} with Nemo Hornet Elite OSMO tents. Total items: ${catalog.length}`);

// 2. Load and update gear.json
const gearDist = JSON.parse(fs.readFileSync(GEAR_DIST_PATH, "utf-8"));
const wishlistHornet = {
  id: "wishlist-05",
  name: "Nemo Hornet 2P Elite OSMO™ Ultralight Backpacking Tent",
  brand: "NEMO Equipment",
  category: "Sleep & Shelter",
  itemType: "tent",
  size: "2-Person Ultralight",
  unitWeightG: 935,
  unitPriceAud: 999.95,
  unitPriceCny: null,
  quantity: 1,
  status: "想买",
  websiteUrl: "https://www.backpackinglight.com.au/nemo-hornet-elite-osmo-2p-tent.html",
  imagePath: "https://www.nemoequipment.com/cdn/shop/files/Hornet_Elite_OSMO_2P_Angle_Hero_2048x.jpg",
  imageSourceUrl: "https://www.backpackinglight.com.au/nemo-hornet-elite-osmo-2p-tent.html",
  imageMatchQuality: "exact",
  summary: "NEMO's pinnacle ultralight 2-person semi-freestanding shelter available at Backpacking Light Australia. Features 100% recycled OSMO™ poly-nylon fabric with 3x less wet-stretch and 4x longer water repellency, dual doors, and dual vestibules at an astounding 935g packed weight.",
  specs: {
    "Capacity": "2 Person",
    "Regular Price": "$999.95 AUD",
    "Packed Weight": "935 g (2 lb 1 oz)",
    "Minimum Trail Weight": "779 g (1 lb 11 oz)",
    "Floor Area": "2.5 m² (27.3 sq ft)",
    "Floor Dimensions": "216 x 128 / 107 cm (85 x 50 / 42 in)",
    "Vestibule Area": "0.6 m² + 0.6 m² (6.2 + 6.2 sq ft)",
    "Peak Height": "94 cm (37 in)",
    "Poles": "1 Hubbed DAC Featherlite NFL 8.7mm Aluminum",
    "Fly Fabric": "OSMO™ Ripstop (1200 mm, 100% recycled yarns, PFAS-free)",
    "Floor Fabric": "OSMO™ Ripstop (1200 mm)",
    "Canopy": "10D Nylon Ripstop & No-See-Um Mesh",
    "Retailer Source": "Backpacking Light Australia (Melbourne, VIC)"
  },
  features: [
    "Proprietary OSMO™ fabric stretches 3x less when wet and provides 4x longer water repellency",
    "Patent-pending Flybar™ volumizing pole clip creates extra headspace and distributes fly tension evenly",
    "Two doors and two generous vestibules ensure individual gear storage and easy entry/exit",
    "Nightlight Pocket™ diffuses headlamp light into a warm 360-degree overhead lantern glow",
    "Divvy Cube™ stuff sack allows splitting tent weight with your hiking partner",
    "Gatekeeper™ one-handed tie-backs make holding tent doors open effortless"
  ],
  notes: "Available at Backpacking Light Australia (Regular price: $999.95 AUD). Sub-1kg double-wall 2-person shelter candidate for multi-day expeditions.",
  invoiceEvidence: []
};

if (!gearDist.some(g => g.id === "wishlist-05" || g.name.includes("Hornet 2P Elite"))) {
  gearDist.push(wishlistHornet);
}
fs.writeFileSync(GEAR_DIST_PATH, JSON.stringify(gearDist, null, 2), "utf-8");
fs.writeFileSync(GEAR_SRC_PATH, JSON.stringify(gearDist, null, 2), "utf-8");
console.log(`[Gear] Updated gear.json with Nemo Hornet 2P Elite OSMO (wishlist-05). Total items: ${gearDist.length}`);
