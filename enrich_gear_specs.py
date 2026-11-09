"""Enrich gear.json with technical specifications, temperature ratings, key features, and official brand website links."""

import json
from pathlib import Path

DATA_PATH = Path(__file__).parent / "src" / "data" / "gear.json"
items = json.loads(DATA_PATH.read_text(encoding="utf-8"))
by_id = {item["id"]: item for item in items}

# 1. Official Website URLs (Brand product pages or primary distributors)
URLS = {
    "sleep-shelter-01": "https://www.mont.com.au/products/warmlite-xt-r-750-down-sleeping-bag",
    "sleep-shelter-02": "https://www.mont.com.au/products/moondance-1-full-nylon-1-person-tent",
    "sleep-shelter-03": "https://www.thermarest.com/products/sleeping-pads/fast-light/z-lite-sol/z-lite-sol.html",
    "sleep-shelter-04": "https://seatosummit.com.au/products/spark-womens-down-sleeping-bag",
    "sleep-shelter-05": "https://www.nemoequipment.com/products/fillo-elite-backpacking-pillow",
    "sleep-shelter-06": "https://seatosummit.com.au/products/reactor-sleeping-bag-liner",
    "sleep-shelter-07": "https://www.mont.com.au/products/moondance-1-full-nylon-1-person-tent",
    "packs-essentials-08": "https://www.petzl.com/US/en/Sport/Headlamps/SWIFT-RL",
    "packs-essentials-09": "https://www.osprey.com/au/en/product/hydraulics-bite-valve-cover-HYDRCVR.html",
    "packs-essentials-10": "https://www.osprey.com/au/en/product/hydraulics-3l-reservoir-HYDRLCS3L.html",
    "packs-essentials-11": "https://www.osprey.com/au/en/product/aura-ag-lt-65-AURALT65W_789.html",
    "packs-essentials-12": "https://blackdiamondequipment.com.au/products/alpine-carbon-cork-trekking-poles",
    "packs-essentials-13": "https://seatosummit.com.au/products/ultra-sil-dry-bag",
    "packs-essentials-14": "https://seatosummit.com.au/products/ultra-sil-dry-bag",
    "packs-essentials-15": "https://www.patagonia.com.au/products/terravia-pack-14l-48905-blk",
    "packs-essentials-16": "https://seatosummit.com.au/products/first-aid-dry-bag",
    "packs-essentials-17": "https://ledlenser.com/en/ml6-connect-wl/502201",
    "clothing-footwear-18": "https://www.thenorthface.com.au/product/womens-exploration-convertible-pants/NF0A4T8Q.html",
    "clothing-footwear-19": "https://www.patagonia.com.au/products/womens-torrentshell-3l-rain-pants-regular-85281-blk",
    "clothing-footwear-20": "https://www.patagonia.com.au/products/womens-triolet-jacket-83407-curb",
    "clothing-footwear-21": "https://www.icebreaker.com/en-au/womens-underwear/merino-siren-bikini-briefs/103158.html",
    "clothing-footwear-22": "https://blackdiamondequipment.com.au/products/access-down-hoody-womens",
    "clothing-footwear-23": "https://blackdiamondequipment.com.au/products/lightweight-fleece-gloves",
    "clothing-footwear-24": "https://www.patagonia.com.au/products/fun-hog-beanie-29230-blk",
    "clothing-footwear-25": "https://www.patagonia.com.au/products/womens-r1-air-full-zip-hoody-40260-blk",
    "clothing-footwear-26": "https://www.lululemon.com.au/en-au/c/women/tops/t-shirts",
    "clothing-footwear-27": "https://www.lululemon.com.au/en-au/p/lululemon-align%E2%84%A2-high-rise-pant-25%22/prod2020012.html",
    "clothing-footwear-28": "https://www.icebreaker.com/en-au/womens-baselayers/merino-200-oasis-long-sleeve-crewe-thermal-top/104387.html",
    "clothing-footwear-29": "https://www.icebreaker.com/en-au/womens-baselayers/merino-260-tech-long-sleeve-crewe-thermal-top/104388.html",
    "clothing-footwear-30": "https://www.icebreaker.com/en-au/womens-baselayers/merino-260-tech-thermal-leggings/104389.html",
    "clothing-footwear-31": "https://www.smartwool.com/en-us/shop/womens-hike-full-cushion-crew-socks-sw001648",
    "clothing-footwear-32": "https://www.smartwool.com/en-us/shop/womens-hike-light-cushion-crew-socks-sw001614",
    "clothing-footwear-33": "https://www.smartwool.com/en-us/shop/hike-full-cushion-crew-socks-sw001647",
    "clothing-footwear-34": "https://www.smartwool.com/en-us/shop/classic-hike-light-cushion-crew-socks-sw001613",
    "clothing-footwear-35": "https://www.dexshell.com/products/waterproof-trekking-socks",
    "clothing-footwear-36": "https://www.icebreaker.com/en-au/accessories/merino-chute/100957.html",
    "clothing-footwear-37": "https://kahtoola.com/gaiters/navagaiter-tall-gtx/",
    "clothing-footwear-38": "https://rab.equipment/au/cirrus-hut-boots",
    "clothing-footwear-39": "https://www.oakley.com/en-au/product/W0OO9280",
    "clothing-footwear-40": "https://www.lasportiva.com/en/tx4-evo-mid-gtx-woman-black-27z999100",
    "cooking-hydration-41": "https://altongoods.com/products/ultralight-titanium-cup-600ml",
    "cooking-hydration-42": "https://www.victorinox.com/en/Products/Swiss-Army-Knives/Medium-Pocket-Knives/Huntsman/p/1.3713",
    "cooking-hydration-43": "https://sotooutdoors.com/product/windmaster-new/",
    "cooking-hydration-44": "https://toaksoutdoor.com/products/pot-1100",
    "cooking-hydration-45": "https://sawyer.com/products/squeeze-water-filtration-system/",
    "cooking-hydration-46": "https://en.montbell.jp/products/goods/disp.php?product_id=1124618",
    "cooking-hydration-47": "https://www.amazon.com/dp/B0753CVG9D",
    "personal-items-48": "https://www.acuvue.com/en-au/products/1-day-acuvue-moist/",
    "personal-items-49": "https://seatosummit.com.au/products/pocket-wilderness-wipes",
    "personal-items-50": "https://nitecore.com/product/nb10000",
    "sleep-shelter-51": "https://www.nemoequipment.com/products/tensor-all-season-ultralight-insulated-sleeping-pad",
    "sleep-shelter-52": "https://www.thermarest.com/products/sleeping-pads/fast-light/neoair-xlite-nxt/neoair-xlite-nxt.html",
    "clothing-footwear-53": "https://arcteryx.com/au/en/shop/womens/covert-cardigan",
    "clothing-footwear-54": "https://www.patagonia.com.au/products/womens-torrentshell-3l-jacket-85246-wowl",
    "cooking-hydration-55": "https://guenergy.com/products/hydration-drink-tabs",
    "cooking-hydration-56": "https://guenergy.com/products/energy-gel",
    "packs-essentials-57": "https://korjo.com/product/travel-umbrella/",
    "packs-essentials-58": "https://www.lifeventure.com/products/outdoor-gear/fire-starter",
    "cooking-hydration-59": "https://jetboil.com.au/products/jetpower-fuel-100g",
    "clothing-footwear-60": "https://kahtoola.com/gaiters/navagaiter-tall-gtx/",
    "cooking-hydration-61": "https://radixnutrition.com.au/products/ultra-meal-bircher-muesli",
    "cooking-hydration-62": "https://backcountrycuisine.co.nz/products/chocolate-brownie-pudding",
    "cooking-hydration-63": "https://backcountrycuisine.co.nz/products/beef-mince",
    "cooking-hydration-64": "https://backcountrycuisine.co.nz/products/apple-berry-crumble",
    "cooking-hydration-65": "https://backcountrycuisine.co.nz/products/roast-chicken",
    "clothing-footwear-66": "https://www.royalrobbins.com/product/womens-readydry-bikini",
    "clothing-footwear-67": "https://www.nikwax.com/en-gb/products/waterproofing/nubuck-suede-proof/",
    "clothing-footwear-68": "https://www.gearaid.com/products/revivex-boot-cleaner",
    "cooking-hydration-69": "https://sotooutdoors.com/product/regulator-stove-st-310/",
    "cooking-hydration-70": "https://www.campingmoon.com/products/z37",
    "cooking-hydration-71": "https://evernew-global.com/products/titanium/eca539.html",
    "cooking-hydration-72": "https://evernew-global.com/products/titanium/eca530.html",
    "packs-essentials-73": "https://www.osprey.com/au/en/product/hikelite-26-HIKELITE26.html",
    "personal-items-74": "https://shokz.com.au/products/openswim-pro",
    "clothing-footwear-75": "https://www.outdoorresearch.com/products/womens-microgravity-ascentshell-jacket-274853",
    "clothing-footwear-76": "https://blackdiamondequipment.com/en_US/product/5-panel-synthetic-cap/",
    "packs-essentials-77": "https://blackdiamondequipment.com.au/products/distance-8-backpack-womens",
}

# 2. Detailed Specs & Parameters
SPECS = {
    "sleep-shelter-01": {
        "summary": "Heavy-duty 4-season alpine down sleeping bag with Hydronaute XT-R waterproof breathable shell.",
        "specs": {
            "Temperature Rating": "Comfort -7°C | Limit -12°C | Extreme -28°C (ISO 23537)",
            "Insulation": "750+ loft white duck down with DWR water-resistant treatment (750 g fill)",
            "Shell Material": "Hydronaute XT-R (20,000 mm waterhead waterproof, 20,000 g/m²/24h MVTR)",
            "Fit / Dimensions": "Women's Tapered Mummy · Max user height: 170 cm · Chest: 148 cm",
            "Packed Size": "36 x 20 cm (Approx. 8.5 L compressed)",
            "Season Rating": "4-Season Alpine Expedition",
        },
        "features": [
            "Radial baffle construction eliminates down shift during tossing and turning",
            "Differential cut design allows outer fabric to expand to full down lofting capacity",
            "Anatomically contoured 3D hood with independent dual-cord cinch locks",
            "Full-length YKK #5 dual-direction locking zipper with draft tube and anti-snag tape",
            "Hidden internal zippered security pocket for electronics and batteries",
        ]
    },
    "sleep-shelter-02": {
        "summary": "Rugged, storm-proven free-standing 1-person tent engineered for harsh Australian and New Zealand alpine terrain.",
        "specs": {
            "Capacity & Season": "1-Person · 3-4 Season All-Weather",
            "Floor Dimensions": "Length: 218 cm · Width: 92 cm (head) / 68 cm (foot) · Area: 1.9 m²",
            "Peak Height": "100 cm internal headroom",
            "Vestibule Area": "0.65 m² side gear vestibule",
            "Fly Fabric": "30D ripstop nylon with silicone exterior & PU interior (2,000 mm waterhead)",
            "Floor Fabric": "40D nylon tub floor with heavy PU lamination (25,000 mm waterhead)",
            "Poles": "DAC Featherlite NSL 9.0 mm anodized aluminum alloy system",
            "Packed Size": "33 x 13 cm",
        },
        "features": [
            "Freestanding triangular hubbed pole frame delivers exceptional stability against high alpine wind gusts",
            "Ultra-tough 25,000 mm waterhead tub floor resists sharp gravel and swampy seepage without weeping",
            "Dual apex roof vents with stiffened kickstands facilitate continuous cross-flow ventilation",
            "Multipoint reflective guyline points with aluminum alloy line-runners pre-attached",
        ]
    },
    "sleep-shelter-03": {
        "summary": "Virtually indestructible closed-cell accordion foam mattress with heat-reflective ThermaCapture surface.",
        "specs": {
            "R-Value": "2.0 (ASTM F3340-18 tested)",
            "Dimensions": "Regular: 183 x 51 cm (72 x 20 in) · Thickness: 2.0 cm (0.75 in)",
            "Packed Size": "51 x 13 x 14 cm (Accordion fold)",
            "Material": "Crosslinked dual-density polyethylene foam with aluminized ThermaCapture surface",
            "Weight": "410 g",
        },
        "features": [
            "ThermaCapture aluminum radiant barrier reflects radiant body heat back (+20% warmth)",
            "Molded dimpled egg-crate chambers trap pockets of warm dead air under sleeping bag",
            "Puncture-proof closed-cell construction cannot pop, puncture or deflate on sharp thorns or rocks",
            "Instant deploy and pack-up accordion folding design—doubles as camp chair pad on breaks",
        ]
    },
    "sleep-shelter-04": {
        "summary": "Ultralight technical down sleeping bag tailored specifically for female thermal regulation and geometry.",
        "specs": {
            "Temperature Rating": "Comfort -9°C (15°F) | Limit -15°C (5°F) (EN/ISO 23537)",
            "Insulation": "850+ Loft RDS-certified Goose ULTRA-DRY Down (water-repellent treated)",
            "Shell & Lining": "Ultralight 10D nylon shell with PFC-free DWR · 7D breathable lining",
            "Shape & Fit": "Women's specific contoured mummy (narrower shoulders, wider hips, torso down concentration)",
            "Compressed Volume": "6.4 L (Packed: 18 x 25 cm)",
        },
        "features": [
            "Women's specific fill mapping places denser down concentrations in torso and footbox zones",
            "Vertical chest baffles prevent down from migrating to sides when sleeping on your side",
            "Half-length YKK #3 zipper minimizes overall weight while allowing quick torso ventilation",
            "Technical contoured hood with soft drawcord seal locks in maximum radiant heat",
        ]
    },
    "sleep-shelter-05": {
        "summary": "Packable ultralight backpacking pillow packing down to lime size with PrimaLoft cushioning.",
        "specs": {
            "Dimensions": "39 x 27 x 8 cm (15 x 10.5 x 3 in)",
            "Packed Size": "10 x 8 cm (Packs into integrated internal pouch)",
            "Insulation": "100% Post-Consumer Recycled PrimaLoft synthetic insulation layer",
            "Cover": "Ultra-soft recycled polyester jersey cover (removable and machine washable)",
            "Air Cell": "3-inch I-beam baffled TPU air chamber",
        },
        "features": [
            "I-beam baffled architecture prevents pillow ballooning and provides ergonomic neck cradling",
            "PrimaLoft insulation top layer adds plush soft warmth and eliminates rubbery feel",
            "Ergonomic low-profile micro-adjustable valve allows precise firmness tuning with one finger",
        ]
    },
    "sleep-shelter-06": {
        "summary": "Technical thermal sleeping bag liner adding up to +6°C warmth while protecting sleeping bag down from oils.",
        "specs": {
            "Thermal Boost": "Adds up to +6°C (+11°F) to sleeping bag temperature rating",
            "Dimensions": "216 x 80 cm (Mummy shape with box footbox & drawcord hood)",
            "Material": "100% Recycled Thermolite Pro polyester with hollow-core and ceramic infrared yarn technology",
            "Weight": "285 g",
        },
        "features": [
            "Ceramic-infused fibers absorb body heat and reflect infrared energy back to sleep system",
            "HeiQ Fresh odor control technology keeps fabric fresh over multi-week expeditions",
            "Shields expensive down sleeping bags from skin oils, sweat, and trail dirt",
            "Super stretchy knit construction allows unrestrained leg and knee movements at night",
        ]
    },
    "sleep-shelter-07": {
        "summary": "Heavy-duty custom cut 70D ground footprint protecting Moondance tent floor from abrasions.",
        "specs": {
            "Material": "70D high-density nylon with PU coating (5,000 mm waterhead)",
            "Dimensions": "Custom precision cut matching Moondance 1 floor tub perimeter",
            "Weight": "210 g",
        },
        "features": [
            "Protects 40D tent floor against sharp slate, roots, thorny burrs, and abrasive granite",
            "Corner brass eyelets secure directly to DAC pole tips for unified pitch",
            "Prevents muddy groundwater and condensation from weeping against tent base",
        ]
    },
    "sleep-shelter-51": {
        "summary": "Quiet, all-season ultralight sleeping pad delivering an ASTM R-5.4 rating with 9 cm of stable cushioning.",
        "specs": {
            "R-Value": "5.4 (All-Season ASTM F3340 certified for sub-zero alpine conditions)",
            "Thickness": "9 cm (3.5 in) stable cushioning",
            "Dimensions": "Regular Mummy: 183 x 51 x 9 cm · Packed: 25.5 x 10 cm",
            "Insulation": "2 suspended layers of Thermal Mirror metallized radiant barrier film",
            "Fabrics": "20D recycled nylon top · 40D heavy-duty puncture-resistant nylon bottom",
        },
        "features": [
            "Whisper-quiet suspended Thermal Mirror film completely eliminates crinkly potato-chip noise",
            "Spaceframe baffled internal architecture prevents side-rail collapse and rolling off",
            "Laylow zero-profile micro-adjustable multi-functional flush valve with one-way airflow",
            "Includes high-volume Vortex pump sack for rapid moisture-free lung-free inflation",
        ]
    },
    "sleep-shelter-52": {
        "summary": "The gold standard ultralight backpacking mattress with R-4.5 warmth and 83% quieter construction.",
        "specs": {
            "R-Value": "4.5 (ASTM F3340 certified 4-season versatility)",
            "Thickness": "7.6 cm (3.0 in) plush loft",
            "Dimensions": "Regular Wide: 183 x 64 x 7.6 cm (25 in width) · Packed: 28 x 12 cm",
            "Material": "30D high-tenacity ripstop HT nylon with ThermaCapture radiant barriers",
            "Internal Structure": "Triangular Core Matrix dual stacked chamber system",
        },
        "features": [
            "Triangular Core Matrix baffles minimize convection heat loss without heavy down or synthetic batting",
            "83% quieter than previous XLite iterations—sleep peacefully without rustling awake",
            "Extra 64 cm (25 in) wide platform prevents elbows from dropping onto cold tent ground",
            "WingLock valve provides high-speed one-way inflation and instant twist-open dump deflation",
        ]
    },
    "packs-essentials-08": {
        "summary": "Compact 1,100 lumen smart headlamp with Reactive Lighting sensor and USB-C rechargeable battery.",
        "specs": {
            "Max Brightness": "1,100 Lumens (Beam distance: 155 m)",
            "Sensory Tech": "Reactive Lighting sensor automatically adapts brightness and beam shape instantly",
            "Battery": "2,350 mAh Lithium-Ion battery pack, USB-C rechargeable (Included)",
            "Burn Time": "2 to 70 hours (Reactive mode: 10 to 70 h / Standard: 2 to 100 h)",
            "Water Rating": "IPX4 weather and rain resistant",
            "Weight": "100 g",
        },
        "features": [
            "Reactive sensor conserves battery life by automatically dimming when looking at maps or cooking",
            "Two-part ergonomic reflective headband provides rock-solid stability during night trail running",
            "Single top push-button controls brightness, locks against accidental pack turn-ons",
            "5-level battery charge indicator displays accurate remaining energy upon powering on/off",
        ]
    },
    "packs-essentials-09": {
        "summary": "Protective silicone cap shielding hydration bite valve from dirt, grit, and mud on the trail.",
        "specs": {
            "Compatibility": "Fits all Osprey Hydraulics and Hydraulics LT bite valves",
            "Material": "Food-grade BPA/PVC-free flexible silicone",
            "Weight": "15 g",
        },
        "features": [
            "Keeps drinking valve hygienically clean when putting backpack down on dusty or muddy ground",
            "Integrated tether loop attaches securely around hose neck so cap won't be lost on trail",
        ]
    },
    "packs-essentials-10": {
        "summary": "3-Liter heavy-duty hydration reservoir with rigid backer plate and magnetic bite valve.",
        "specs": {
            "Capacity": "3.0 Liters (100 fl oz)",
            "Material": "BPA-free, phthalate-free, lead-free durable TPU with PourShield opening",
            "Hose Connector": "QuickConnect detachable hose with magnetic sternum strap clip",
        },
        "features": [
            "Rigid anatomical backer plate maintains flat shape and glides smoothly into packed hydration sleeves",
            "PourShield top slide opening opens fully for rapid cleaning, ice addition, and drying",
            "Quarter-turn on/off lever on bite valve prevents accidental leaking under gear pressure",
        ]
    },
    "packs-essentials-11": {
        "summary": "Streamlined 65L women's expedition pack with continuous tensioned AntiGravity 3D mesh suspension.",
        "specs": {
            "Volume": "65 Liters (Weight: 1,820 g, Size: Women's M/L)",
            "Load Range": "14 – 18 kg (30 – 40 lbs) recommended expedition capacity",
            "Suspension": "AntiGravity 3D suspended tensioned backpanel wrapping from shoulder blades to lumbar",
            "Materials": "bluesign-approved recycled 210D high-tenacity nylon with PFAS-free DWR",
        },
        "features": [
            "Seamless 3D tensioned mesh backpanel contours body perfectly and dumps back sweat continuously",
            "Curved side-zip panel access allows reaching mid-pack layers without opening top lid",
            "Integrated high-visibility raincover housed in dedicated bottom zippered pocket",
            "Dual zippered extra-large hipbelt pockets fit modern smartphones, snacks, and GPS units",
        ]
    },
    "packs-essentials-12": {
        "summary": "Premium 100% carbon fiber 3-section trekking poles with natural cork grips and FlickLock Pro locks.",
        "specs": {
            "Usable Length": "100 – 130 cm (Collapsible to 61 cm / 24 in)",
            "Shaft": "100% high-modulus carbon fiber 3-section construction",
            "Grip": "Premium 100% natural cork grip with soft-touch rubber top and moisture-wicking strap",
            "Locking Mechanism": "Dual FlickLock Pro forged aluminum adjustment clamps",
            "Weight": "475 g per pair",
        },
        "features": [
            "100% carbon fiber shafts dampen trail vibrations, protecting wrist and elbow joints on steep descents",
            "FlickLock Pro forged aluminum levers provide bombproof clamping force that will not slip under body weight",
            "Ergonomic natural cork grip wicks sweat and molds to your hands over hundreds of miles",
            "Includes interchangeable carbide tech tips, rubber tips, and low-profile trekking baskets",
        ]
    },
    "packs-essentials-13": {
        "summary": "Ultralight 20L siliconized roll-top dry bag keeping sleeping bags and clothing bone dry.",
        "specs": {
            "Volume": "20 Liters (Dimensions: 47.4 x 26.4 x 24.4 cm)",
            "Material": "Ultra-Sil 30D high-tenacity Cordura nylon with silicone exterior & PU interior (2,000 mm waterhead)",
            "Closure": "Non-wicking Hypalon roll-top closure with field repairable buckle",
        },
        "features": [
            "Double-stitched and fully taped waterproof seams protect down gear in torrential downpours",
            "Slippery siliconized finish allows effortless sliding and stuffing inside tight backpacks",
            "Translucent fabric enables easy visual identification of packed clothing and contents",
        ]
    },
    "packs-essentials-14": {
        "summary": "Extra-large 35L siliconized roll-top dry sack for tent, sleep system, and bulk gear protection.",
        "specs": {
            "Volume": "35 Liters (Weight: 65 g)",
            "Material": "Ultra-Sil 30D Cordura ripstop nylon (2,000 mm waterhead)",
            "Closure": "Hypalon roll-top stiffener with side-release buckle",
        },
        "features": [
            "Ideal waterproof pack-liner volume for multi-day expeditions in Fiordland and Tasmania",
            "Reinforced stitching at all critical high-stress anchor points",
        ]
    },
    "packs-essentials-15": {
        "summary": "Lightweight 14L daypack and summit pack featuring breathable Regulator airmesh harness.",
        "specs": {
            "Volume": "14 Liters (Size: Small)",
            "Materials": "100% recycled nylon shell with PU coating and PFC-free DWR",
            "Weight": "477 g",
        },
        "features": [
            "Super-breathable Regulator airmesh shoulder straps provide cooling airflow during summit scrambles",
            "Internal hydration sleeve with dual routing ports",
            "Zippered top stash pocket with key clip for summit essentials",
        ]
    },
    "packs-essentials-16": {
        "summary": "Dedicated 3L waterproof First Aid dry bag with clear window and international first-aid labeling.",
        "specs": {
            "Volume": "3 Liters",
            "Material": "70D waterproof nylon with white interior and clear TPU viewing window",
            "Standard": "Red casing printed with white cross for instant trail emergency recognition",
        },
        "features": [
            "Transparent side window lets you pinpoint bandages and medication before unrolling",
            "Waterproof roll-top seal keeps adhesive tapes, tablets, and dressings clean and bone dry",
        ]
    },
    "packs-essentials-17": {
        "summary": "High-output 750 lumen camp lantern with 360-degree glare-free optic, Bluetooth, and powerbank.",
        "specs": {
            "Max Brightness": "750 Lumens (Boost) / 550 Lumens (Power) / 5 Lumens (Low)",
            "Run Time": "3.5 to 200 hours depending on output",
            "Optics": "Micro-Prism technology delivers 360° glare-free, uniform area illumination",
            "Battery": "Rechargeable 18650 Li-ion 3.6V 3000mAh with powerbank phone charging capability",
            "Water Rating": "IP66 dustproof and heavy-rain resistant",
        },
        "features": [
            "Integrated Bluetooth allows smartphone app control and custom lighting timer sequences",
            "Built-in strong magnetic base, rubberized hanging hook, and detachable metal desk stand",
            "Red light mode preserves night vision and avoids attracting insects at hut tables",
        ]
    },
    "clothing-footwear-20": {
        "summary": "Bombproof 3-layer GORE-TEX alpine hardshell jacket engineered for torrential rain, snow, and gale winds.",
        "specs": {
            "Membrane": "3-Layer GORE-TEX with 100% recycled polyester face fabric (28,000 mm waterhead / RET < 9)",
            "Weight": "500 g (Size: M, Colour: Current Blue)",
            "Hood": "Optimal Visibility Hood helmet-compatible with laminated visor & dual cord locks",
            "Zippers": "Watertight coated reverse-coil zips on front, chest, and underarm vents",
        },
        "features": [
            "Two-way watertight pit zips provide instantaneous thermal dumping on steep trail climbs",
            "Two napoleon chest pockets with watertight zippers are fully accessible when wearing pack hipbelt",
            "Concealed RECCO avalanche reflector integrated into upper back yoke",
            "Elasticized strap at low back connects to any Patagonia snow/rain pants to eliminate wind gaps",
        ]
    },
    "clothing-footwear-22": {
        "summary": "Ultralight mid-layer 700-fill RDS down hoody built with HyperDRY water-resistant insulation.",
        "specs": {
            "Insulation": "700-fill Allied RDS-certified Goose Down with HyperDRY water-resistant treatment",
            "Shell Material": "20D ripstop nylon with DWR finish (Weight: 285 g, Size: S, Colour: Alloy)",
            "Hood": "Fitted over-the-helmet hood with single-pull elastic rear adjustment",
        },
        "features": [
            "HyperDRY down treatment prevents cluster collapse when exposed to damp coastal or alpine mist",
            "Underarm gussets provide full overhead reach without hem riding up above pack hipbelts",
            "Two zippered handwarmer pockets and single zippered chest pocket for phone / GPS",
            "Compresses into its own internal chest pocket with carabiner clip loop",
        ]
    },
    "clothing-footwear-75": {
        "summary": "Stretchy, air-permeable 3-layer waterproof jacket featuring AscentShell electrospun membrane.",
        "specs": {
            "Membrane": "AscentShell 3-Layer electrospun PU membrane with mechanical stretch",
            "Weight": "337 g (Size: S, Colour: Arctic)",
            "Waterproof / Breathable": "Fully seam-taped waterproof construction with dynamic air permeability",
        },
        "features": [
            "Electrospun nanofiber membrane dumps internal moisture vapor actively without needing high pressure",
            "Natural mechanical stretch fabric moves with you when scrambling steep ridgelines",
            "Helmet-compatible Halo Hood with wire-brimmed visor and peripheral cord cinch",
            "Dynamic Reach arm panels eliminate shoulder binding under loaded backpacks",
        ]
    },
    "clothing-footwear-54": {
        "summary": "Proven 3-layer H2No waterproof storm jacket with microfleece-lined neck and packable design.",
        "specs": {
            "Membrane": "3-Layer H2No Performance Standard 50D recycled ECONYL nylon (20,000 mm waterhead)",
            "Weight": "352 g (Size: S, Colour: Wool White)",
            "Hood": "Two-way adjustable hood with laminated visor rolls down and stows with cord-and-hook",
        },
        "features": [
            "Microfleece-lined collar provides soft comfort against skin and eliminates chin chafing",
            "Full underarm venting pit zips with welted exterior storm flaps",
            "Self-stuffs into left handwarmer pocket with carabiner clip-in loop",
        ]
    },
    "clothing-footwear-19": {
        "summary": "Dependable 3-layer waterproof rain pants with thigh-length side zips for quick pull-on over boots.",
        "specs": {
            "Membrane": "3-Layer H2No Performance Standard recycled nylon (20,000 mm waterhead)",
            "Weight": "309 g (Size: S, Inseam: 30 in)",
            "Zippers": "Two-way welted DWR-treated side zips from cuff to mid-thigh",
        },
        "features": [
            "Thigh-high two-way side zips let you pull pants on over muddy hiking boots in sudden downpours",
            "Partially elasticized cuffs with snap-tab closures cinch securely over boots",
            "Elastic waistband with internal drawcord for dialed customized fit",
        ]
    },
    "clothing-footwear-25": {
        "summary": "Technical zigzag knit jacquard fleece providing exceptional breathability and warmth on active ascents.",
        "specs": {
            "Material": "100% recycled polyester jacquard fleece with hollow-core yarns (Weight: 309 g)",
            "Fabric Structure": "Zigzag weave pattern channels airflow and traps warm air pockets",
        },
        "features": [
            "Unique zigzag channel pattern dumps body heat quickly while hiking uphill and insulates when paused",
            "Off-shoulder seams sit smoothly underneath loaded backpack straps without hot-spots",
            "HeiQ Pure odor control finish keeps technical fleece fresh across multiple hut nights",
        ]
    },
    "clothing-footwear-53": {
        "summary": "Refined Alpenex II recycled heathered fleece cardigan offering wool aesthetics with technical performance.",
        "specs": {
            "Material": "Alpenex II 100% recycled heathered polyester fleece (Weight: 415 g, Size: S)",
            "Fit": "Regular fit with articulated patterning for ease of movement",
        },
        "features": [
            "Clean sweater-knit exterior provides classic casual aesthetics with quick-drying fleece interior",
            "Laminated zippered sleeve pocket and zippered hand pockets with soft brushed linings",
            "Gusseted underarms allow unrestricted arm movement around camp and trail",
        ]
    },
    "clothing-footwear-76": {
        "summary": "Ultralight packable 5-panel trail running and mountaineering cap with soft pliable short brim.",
        "specs": {
            "Material": "High-breathability stretch synthetic polyester/nylon blend (Weight: 66 g)",
            "Colour / Fit": "Pale Mauve/Black · Low-profile 5-panel construction",
            "Closure": "Rear nylon webbing strap with quick-release ladder-lock buckle",
        },
        "features": [
            "Soft flexible brim folds and squishes flat into pockets or packs without creasing or cracking",
            "Short brim profile fits seamlessly underneath climbing and mountaineering helmets",
            "Fast-wicking sweatband keeps perspiration away from eyes during steep alpine climbs",
        ]
    },
    "packs-essentials-77": {
        "summary": "Hybrid 8L running vest and fast-packing alpine pack built with UHMWP ripstop yarns (10x stronger than steel).",
        "specs": {
            "Volume": "8 Liters (Weight: 298 g, Size: S, Colour: Glacier)",
            "Materials": "UHMWP 10D nylon ripstop yarns · BD SET stitchless edge taping technology",
            "Harness": "Dual chest sternum straps with side compression system and front soft flask sleeves",
        },
        "features": [
            "On-the-fly Z-Pole trekking pole carry system deploys and stows poles in seconds without stopping",
            "Dual front soft flask pockets with elastic cinch cords hold hydration securely on the move",
            "Dual ice axe tool carry pick pockets with metal dogbone pick protection sleeves",
            "Internal bladder sleeve with dual hose routing ports for all-day trail hydration",
        ]
    },
    "cooking-hydration-43": {
        "summary": "World-class 86g micro-regulator canister stove maintaining blistering boil times in freezing winds.",
        "specs": {
            "Output": "2,800 kcal/h (3,260 W / 11,000 BTU)",
            "Boil Time": "1 Liter water in ~3.5 minutes (Cold weather tested)",
            "Burn Time": "Approx. 1.5 hours on a 250g canister",
            "Weight": "86 g with 4-Flex pot support (67 g burner only)",
            "Igniter": "Stealth Piezo igniter enclosed inside burner post",
        },
        "features": [
            "Micro-regulator internal spring valve maintains steady pressure output in sub-zero alpine cold",
            "Concave burner head acts as an integrated wind screen, shielding flame from howling gusts",
            "Piezo igniter wire is housed internally inside center post to protect against damage and rain",
            "Includes 4-Flex heavy-duty pot support folding flat around stove body for storage",
        ]
    },
    "cooking-hydration-45": {
        "summary": "The premier trail water filter (0.1 micron absolute) paired with durable Cnoc Vecto 2L TPU bladder.",
        "specs": {
            "Filter Rating": "0.1 Micron Absolute hollow-fiber membrane (Removes 99.99999% bacteria & 99.9999% protozoa)",
            "Filter Life": "Rated up to 100,000 gallons; field backflushable with included syringe",
            "Bladder": "Cnoc Outdoors Vecto 2L TPU with dual-opening slider and 28mm threaded neck",
            "Weight": "167 g combined system",
        },
        "features": [
            "Wide rear slider opening on Cnoc bladder allows instant scooping in shallow pools and trickling streams",
            "Direct 28mm thread screws straight onto Sawyer Squeeze filter without adapters or leaks",
            "Tethered cap and durable TPU walls withstand heavy squeeze pressures without bursting",
            "Field backflushable in 30 seconds using clean filtered water to restore flow rate indefinitely",
        ]
    },
    "cooking-hydration-71": {
        "summary": "Ultralight Japanese 0.3mm titanium 950ml cook pot with pouring spout and steam-release lid.",
        "specs": {
            "Capacity": "950 ml (Graduated volume markings inside)",
            "Dimensions": "11.9 cm diameter x 9.9 cm height",
            "Material": "0.3 mm ultralight Grade 1 pure Japanese titanium (Weight: 99 g)",
        },
        "features": [
            "Snug-fitting titanium lid features integrated steam release hole and precision pouring spout",
            "Interior cavity houses a standard 230g gas canister and compact stove for zero wasted pack space",
            "Silicone-insulated folding handles protect fingers against burns while boiling trail water",
        ]
    },
    "cooking-hydration-72": {
        "summary": "Featherweight 50g pure titanium 400ml cup nesting neatly under the Ti Mug Pot 900.",
        "specs": {
            "Capacity": "400 ml (Weight: 50 g)",
            "Material": "Grade 1 pure Japanese titanium",
            "Handles": "Ergonomic folding insulated handles",
        },
        "features": [
            "Ultralight trail mug for morning coffee, tea, and rehydrated soups",
            "Nests flush underneath the Evernew ECA539 pot to form a sleek, rattle-free cook kit",
        ]
    },
    "cooking-hydration-69": {
        "summary": "Heavy-duty micro-regulator spider stove powered by standard affordable CB cassette canisters.",
        "specs": {
            "Output": "2.9 kW (2,500 kcal/h / 9,900 BTU)",
            "Fuel Type": "Standard CB (Cassette) butane canister",
            "Weight": "350 g (Folds down to 14 x 7 x 11 cm)",
            "Pot Stand": "4-leg folding spider support accommodating up to 19 cm pots",
        },
        "features": [
            "Micro-regulator valve counteracts evaporative cooling, maintaining a strong flame down to cold temps",
            "Low center of gravity spider design provides unmatched stability for boiling large pots of water",
            "Piezo igniter push button built into base for safe lighting",
        ]
    },
    "cooking-hydration-46": {
        "summary": "Ultimate alpine insulated thermos bottle holding 78°C+ temperature after 6 hours in freezing snow.",
        "specs": {
            "Capacity": "0.75 Liters (Weight: 360 g)",
            "Thermal Retention": "Hot: 78°C+ after 6 hours (starting at 95°C) · Cold: Under 8°C after 6 hours",
            "Material": "SUS304 food-grade stainless steel with internal copper vacuum coating",
        },
        "features": [
            "Hexagonal silicone bumper band on body and lid allows easy grip and opening with thick ski mittens",
            "Dual-thread pitch inner stopper pours smoothly without splashes and resists freezing shut",
        ]
    },
    "personal-items-74": {
        "summary": "IP68 waterproof open-ear bone conduction headphones with Bluetooth 5.4 and 32GB onboard MP3.",
        "specs": {
            "Technology": "9th Generation PremiumPitch 2.0+ Bone Conduction (Open-ear ambient safety)",
            "Waterproof Rating": "IP68 (Submersible up to 2 meters for 2 hours; completely sweatproof & rainproof)",
            "Storage & Connectivity": "Bluetooth 5.4 + 32GB onboard MP3 storage (Holds ~8,000 high-fidelity songs)",
            "Battery Life": "Up to 9 hours continuous playtime · 10-minute quick charge delivers 3 hours",
            "Weight": "27.3 g",
        },
        "features": [
            "Open-ear design keeps your eardrums open to hearing birdlife, river crossings, and other hikers",
            "32GB internal storage lets you listen to music, audiobooks, and podcasts without carrying a phone",
            "Titanium memory-wire neckband provides bounce-free stability under heavy pack hoods and beanies",
        ]
    },
    "personal-items-50": {
        "summary": "The world's lightest 10,000mAh carbon fiber power bank (150g) with 20W PD fast charging.",
        "specs": {
            "Capacity": "10,000 mAh 3.85V (38.5 Wh) · TSA Airline Flight Approved",
            "Body Construction": "Carbon Fiber Reinforced Polymer (CFRP) unibody frame (Weight: 150 g)",
            "Input / Output": "USB-C: 20W PD in/out (Charges modern iPhone to 50% in 30 mins) · USB-A: 18W QC",
            "Water Rating": "IPX5 weather-resistant rating against rain, splashes, and snow",
        },
        "features": [
            "Weighs 40% less than conventional 10,000mAh aluminum power banks—saves critical ounces in pack",
            "Low current mode charges headlamps, Garmin watches, and GPS beacons safely without tripping shutoff",
            "Dual-corner carbon fiber sheets absorb drops and trail impacts",
        ]
    },
    "personal-items-49": {
        "summary": "100% biodegradable outdoor wilderness body wipes formulated for Leave No Trace personal hygiene.",
        "specs": {
            "Quantity": "50 large embossed wipes per pack",
            "Material": "100% Viscose biodegradable plant fibers (Compostable)",
            "Formula": "pH-balanced, fragrance-free, paraben-free with Aloe Vera and Vitamin E",
            "Weight": "120 g",
        },
        "features": [
            "Soft, thick embossed texture removes trail dirt, sweat, and sunscreen effectively without stinging",
            "Resealable moisture-lock seal keeps remaining wipes moist over multi-week expeditions",
        ]
    },
    "personal-items-48": {
        "summary": "Individual sterile blister packs of daily disposable contact lenses with high moisture retention.",
        "specs": {
            "Quantity": "10-15 pairs blister pack (Weight: 25 g)",
            "Type": "Daily disposable sterile blister packs",
            "Features": "Lacreon moisture technology cushions eyes in dry, windy alpine conditions",
        },
        "features": [
            "No bulky contact lens cleaning solution or lens cases required—dispose cleanly daily",
            "UV-blocking class 2 protection shields corneas from high-altitude alpine glare",
        ]
    },
}

# 3. Fallback generic specs for remaining clothing, cook, and accessories
GENERIC_SPECS = {
    "clothing-footwear-18": {
        "summary": "Durable stretch-woven convertible hiking pants with zip-off legs to convert into shorts.",
        "specs": {"Material": "95% Nylon, 5% Elastane with DWR", "Features": "Zip-off convertible knees, roll-up hem with tab, UPF 50 sun protection"},
        "features": ["Zips off into 10-inch shorts when sun warms up", "Stretchy nylon stands up to scrambles and trail brush"]
    },
    "clothing-footwear-21": {
        "summary": "Ultralight breathable merino wool bikini briefs with corespun durability.",
        "specs": {"Material": "83% Merino wool, 12% Nylon, 5% LYCRA (150 g/m²)", "Weight": "32 g each"},
        "features": ["Naturally odor-resistant for multi-day wear", "Corespun nylon core wrapped in soft merino wool for long-lasting durability"]
    },
    "clothing-footwear-23": {
        "summary": "Lightweight breathable stretch fleece liner gloves with touchscreen-compatible palms.",
        "specs": {"Material": "Polartec micro-fleece stretch fabric", "Weight": "28 g (Size: XS)"},
        "features": ["Conductive material on thumb and index finger for phone map navigation", "Ideal liner glove or standalone active cool-morning layer"]
    },
    "clothing-footwear-24": {
        "summary": "Soft, itch-free recycled polyester and spandex ribbed knit beanie.",
        "specs": {"Material": "96% recycled polyester, 4% spandex ribbed knit", "Weight": "74 g"},
        "features": ["Snug rib-knit cuff locks in head heat on windy ridges", "Fair Trade Certified sewn"]
    },
    "clothing-footwear-26": {
        "summary": "Moisture-wicking, anti-odor technical active tee for hot hiking days.",
        "specs": {"Material": "Quick-drying sweat-wicking technical fabric", "Weight": "90 g"},
        "features": ["Four-way stretch for total mobility", "Flatlock anti-chafing seams under backpack straps"]
    },
    "clothing-footwear-27": {
        "summary": "Buttery-soft, weightless Nulu fabric high-rise hiking and camp tights.",
        "specs": {"Material": "Nulu fabric (81% Nylon, 19% Lycra elastane)", "Weight": "165 g"},
        "features": ["High-rise waist waistband lies flat under backpack hipbelts", "Four-way stretch and breathability for high agility"]
    },
    "clothing-footwear-28": {
        "summary": "100% Pure Merino wool 200 g/m² thermal crew baselayer top.",
        "specs": {"Material": "100% Merino wool (200 g/m²)", "Weight": "180 g"},
        "features": ["Natural temperature regulation across wide temperature swings", "Resists odor build-up over days of continuous trekking"]
    },
    "clothing-footwear-29": {
        "summary": "Heavyweight 260 g/m² pure merino wool long sleeve thermal base layer top.",
        "specs": {"Material": "100% Pure Merino Wool (260 g/m²)", "Weight": "210 g (Size: XS)"},
        "features": ["Maximum thermal warmth for freezing alpine nights and windy passes", "Offset shoulder seams eliminate pack strap pressure points"]
    },
    "clothing-footwear-30": {
        "summary": "Heavyweight 260 g/m² pure merino wool thermal leggings for freezing alpine nights.",
        "specs": {"Material": "100% Pure Merino Wool (260 g/m²)", "Weight": "190 g (Size: XS)"},
        "features": ["Flatlock seams prevent inner-thigh chafing", "Brushed elastic waistband provides soft, secure fit"]
    },
    "clothing-footwear-31": {
        "summary": "High-density cushioned Merino wool crew socks engineered for rugged backpacking miles.",
        "specs": {"Material": "56% Merino Wool, 42% Nylon, 2% Elastane", "Cushion": "Full Cushion under entire foot & shin"},
        "features": ["Indestructawool high-durability reinforcement", "Virtually Seamless toe eliminates blister friction"]
    },
    "clothing-footwear-32": {
        "summary": "Targeted light cushion Merino wool hiking socks with mapped mesh ventilation.",
        "specs": {"Material": "56% Merino Wool, 41% Nylon, 3% Elastane", "Cushion": "Light Cushion"},
        "features": ["Mesh breathability zones keep feet cool on steep ascents", "4-Degree elite fit system locks sock onto foot"]
    },
    "clothing-footwear-33": {
        "summary": "Classic full-cushion Merino hiking crew socks for multi-day heavy pack carrying.",
        "specs": {"Material": "66% Merino Wool, 33% Nylon, 1% Elastane", "Cushion": "Full Cushion"},
        "features": ["Dense terry loops absorb impact shocks on rocky downhill trails", "Reinforced heel and toe zones for extended lifespan"]
    },
    "clothing-footwear-34": {
        "summary": "Unisex classic light cushion Merino hiking socks for day hikes and warm weather.",
        "specs": {"Material": "58% Merino Wool, 40% Nylon, 2% Elastane", "Cushion": "Light Cushion"},
        "features": ["Elasticized arch brace for all-day trail support", "Flat knit toe seam for in-boot comfort"]
    },
    "clothing-footwear-35": {
        "summary": "100% Waterproof and windproof trekking socks with breathable Porelle membrane.",
        "specs": {"Membrane": "Porelle waterproof breathable membrane (10,000 mm waterhead)", "Lining": "Terry-loop Merino wool cushion"},
        "features": ["Keeps feet warm and completely dry during deep mud, bogs, and creek crossings", "Cushioned Merino wool interior buffers against blister-causing grit"]
    },
    "clothing-footwear-36": {
        "summary": "100% Pure Merino wool versatile neck gaiter, headband, and face mask.",
        "specs": {"Material": "100% Merino wool knit", "Weight": "45 g"},
        "features": ["Protects neck and throat from freezing winds on alpine passes", "Multi-wear design functions as beanie, sun hood, or neck warmer"]
    },
    "clothing-footwear-37": {
        "summary": "High-cut GORE-TEX breathable alpine gaiters with replaceable DuraLink underfoot instep strap.",
        "specs": {"Material": "3-Layer GORE-TEX upper · 1000D ballistic nylon lower", "Size": "Small (Weight: 215 g)"},
        "features": ["Shields boots and socks from scree, snow, mud, and spinifex grass", "Front zipper with Velcro flap allows fast on/off without removing boots"]
    },
    "clothing-footwear-38": {
        "summary": "Plush PrimaLoft Silver Luxe insulated camp boots with non-slip sole for hut warmth.",
        "specs": {"Insulation": "PrimaLoft Silver Luxe synthetic down", "Outsole": "Durable 600D nylon with non-slip PU grip"},
        "features": ["Warm, cozy refuge for feet after 8 hours in rigid hiking boots", "EVA cushioned footbed insulates against freezing hut floorboards"]
    },
    "clothing-footwear-39": {
        "summary": "High-wrap performance sport sunglasses with Oakley high-definition optics and UV protection.",
        "specs": {"Lens": "Plutonite lens filtering 100% of UVA/UVB/UVC", "Frame": "O Matter lightweight durable frame"},
        "features": ["Shields eyes from blinding high-altitude alpine reflection and wind-blown dust", "Unobtainium nosepads increase grip with sweat"]
    },
    "clothing-footwear-40": {
        "summary": "GORE-TEX mid-cut approach boot with Vibram MegaGrip outsole and protective rubber rand.",
        "specs": {"Membrane": "GORE-TEX Extended Comfort", "Outsole": "Vibram MegaGrip with Impact Brake System"},
        "features": ["Mythos lacing system extends down to toe for precise climbing adjustment", "Wide forefoot platform provides outstanding stability on rough rocky terrain"]
    },
    "clothing-footwear-60": {
        "summary": "Size L Kahtoola GORE-TEX breathable tall gaiters for larger volume boot profiles.",
        "specs": {"Material": "GORE-TEX 3L upper · 1000D Ballistic nylon lower", "Size": "Large (Weight: 230 g)"},
        "features": ["DuraLink instep strap guaranteed against trail wear for 1,000 miles", "Asymmetrical zipper design prevents ankle crease friction"]
    },
    "clothing-footwear-66": {
        "summary": "Ultralight quick-dry trail bikini underwear with breathable anti-microbial mesh.",
        "specs": {"Material": "Quick-drying poly-spandex technical blend", "Weight": "34 g (Size: S)"},
        "features": ["Washes in camp streams and dries completely in 2 hours on hut line", "Seamless bonded leg openings eliminate chafe under pack hipbelts"]
    },
    "clothing-footwear-67": {
        "summary": "Eco-friendly spray-on waterproofing for nubuck and suede leather hiking footwear.",
        "specs": {"Volume": "125 ml (Weight: 145 g)", "Formula": "Water-based, zero fluorocarbons (PFC-free)"},
        "features": ["Restores durable water repellency (DWR) while maintaining leather breathability", "Easy spray application on wet or dry leather"]
    },
    "clothing-footwear-68": {
        "summary": "Specialized footwear cleaner removing embedded trail mud, grit, and sweat salts.",
        "specs": {"Volume": "118 ml (Weight: 135 g)", "Formula": "Gentle non-detergent formula safe for GORE-TEX membranes"},
        "features": ["Cleans dirt from membrane pores without degrading factory waterproof coatings", "Prepares footwear surface for fresh DWR waterproofing application"]
    },
    "cooking-hydration-41": {
        "summary": "Ultralight single-wall Grade 1 pure titanium 600ml drinking cup and mini pot.",
        "specs": {"Capacity": "600 ml (Weight: 78 g)", "Material": "Grade 1 Ultralight Titanium"},
        "features": ["Directly boil water over gas stoves or campfires", "Folding butterfly handles fold flat around curved cup body"]
    },
    "cooking-hydration-42": {
        "summary": "15-function classic Swiss Army knife featuring large blade, wood saw, and scissors.",
        "specs": {"Functions": "15 integrated tools (Length: 91 mm, Weight: 97 g)", "Material": "Swiss-made stainless steel"},
        "features": ["Sharp wood saw slices branches for shelter spars and emergency splints", "Spring-loaded scissors trim moleskin blister patches with precision"]
    },
    "cooking-hydration-44": {
        "summary": "Ultralight pure titanium 1100ml pot with bail handle and volume markings.",
        "specs": {"Capacity": "1,100 ml (Weight: 128 g)", "Material": "Pure Grade 1 Titanium"},
        "features": ["Spacious volume for two-person meals or melting alpine snow", "Houses a 230g gas canister, stove, and lighter inside"]
    },
    "cooking-hydration-47": {
        "summary": "High-strength featherweight titanium chopsticks and long-handled spoon kit.",
        "specs": {"Material": "100% Pure Titanium (Weight: 35 g combined)", "Finish": "Matte bead-blasted grip"},
        "features": ["Long-handled spoon reaches bottom of deep freeze-dried meal pouches cleanly", "Non-corrosive, non-magnetic, and leaves zero metallic aftertaste"]
    },
    "cooking-hydration-55": {
        "summary": "Tube of 12 effervescent electrolyte hydration tablets restoring sodium, potassium, and minerals.",
        "specs": {"Contents": "12 tablets per tube (Weight: 54 g)", "Electrolytes": "Sodium 320mg, Potassium 55mg, Magnesium"},
        "features": ["Fast-dissolving tablets prevent dehydration and muscle cramps on hot trail ascents", "Low sugar formula provides clean, refreshing hydration without syrupy gut distress"]
    },
    "cooking-hydration-56": {
        "summary": "Fast-acting 32g carbohydrate energy gel with essential amino acids and electrolytes.",
        "specs": {"Net Weight": "32 g (Gross: 34 g per packet)", "Calories": "100 kcal with dual-source maltodextrin/fructose"},
        "features": ["Instant burst of clean energy during steep pass ascents", "Branched-chain amino acids (BCAAs) reduce muscle fatigue and mental fog"]
    },
    "cooking-hydration-59": {
        "summary": "High-altitude 100g 4-season isobutane/propane fuel canister for canister stoves.",
        "specs": {"Net Fuel": "100 g (Gross weight: 199 g)", "Gas Mix": "73% Isobutane, 25% Propane, 2% Butane"},
        "features": ["High propane mix maintains vapor pressure down to -12°C", "Compact diameter nests directly inside Evernew and Jetboil cook pots"]
    },
    "cooking-hydration-61": {
        "summary": "Radix Ultra-Meal freeze-dried Bircher Muesli delivering 600+ kcal of dense breakfast nutrition.",
        "specs": {"Net Weight": "175 g", "Calories": "600 kcal · 26g Protein, 30+ vitamins and minerals"},
        "features": ["Cold-water or hot-water preparation in under 5 minutes", "Plant-based nutrient-dense superfood blend keeps energy high all morning"]
    },
    "cooking-hydration-62": {
        "summary": "Back Country Cuisine rich freeze-dried chocolate brownie pudding dessert for trail rewards.",
        "specs": {"Net Weight": "150 g (Gross: 170 g)", "Preparation": "Add 250ml boiling water, stir, wait 10 mins"},
        "features": ["Delicious decadent chocolate pudding reward after long wet days on trail", "High-calorie density (approx. 620 kcal) replenishes depleted glycogen"]
    },
    "cooking-hydration-63": {
        "summary": "Back Country Cuisine freeze-dried savory beef mince with vegetables in rich gravy.",
        "specs": {"Net Weight": "160 g (Gross: 180 g)", "Calories": "Approx. 680 kcal per serve"},
        "features": ["Cooks directly inside pouch—no pot cleaning required", "Wholesome New Zealand beef with carrots, peas, and rich homestyle gravy"]
    },
    "cooking-hydration-64": {
        "summary": "Back Country Cuisine freeze-dried apple and berry crumble with crunchy topping.",
        "specs": {"Net Weight": "150 g (Gross: 170 g)", "Preparation": "Add boiling water, wait 10 mins"},
        "features": ["Sweet tart apple and boysenberry filling topped with toasted oat crumble", "Comforting warm dessert for alpine hut evenings"]
    },
    "cooking-hydration-65": {
        "summary": "Double-serve freeze-dried roast chicken dinner with vegetables, stuffing, and gravy.",
        "specs": {"Net Weight": "175 g (Gross: 190 g)", "Calories": "Approx. 750 kcal"},
        "features": ["High-protein hearty meal designed to feed two or one famished thru-hiker", "Real freeze-dried chicken breast pieces retain texture and flavor"]
    },
    "cooking-hydration-70": {
        "summary": "Braided stainless steel gas canister extension hose for inverted canister winter cooking.",
        "specs": {"Length": "60 cm (Weight: 75 g)", "Material": "Stainless steel braided hose with CNC aluminum brass fittings"},
        "features": ["Allows keeping gas canister inside sleeping bag or warm water bowl while cooking in sub-zero snow", "Threaded valves connect securely without gas leakage"]
    },
}

enriched_count = 0
for item_id, item in by_id.items():
    if item_id in URLS:
        item["websiteUrl"] = URLS[item_id]
    
    spec_data = SPECS.get(item_id) or GENERIC_SPECS.get(item_id)
    if spec_data:
        item["summary"] = spec_data.get("summary", "")
        item["specs"] = spec_data.get("specs", {})
        item["features"] = spec_data.get("features", [])
        enriched_count += 1
    else:
        # Default fallback
        item["summary"] = item.get("notes") or f"Field gear item: {item.get('name') or item.get('itemType')}"
        item["specs"] = {
            "Category": item.get("category"),
            "Item Type": item.get("itemType"),
            "Brand": item.get("brand") or "Not recorded",
            "Weight": f"{item.get('unitWeightG')} g" if item.get("unitWeightG") else "Not recorded",
            "Price": f"${item.get('unitPriceAud')} AUD" if item.get("unitPriceAud") else (f"¥{item.get('unitPriceCny')} CNY" if item.get("unitPriceCny") else "Not recorded")
        }
        item["features"] = [
            f"Logged in personal hiking inventory ({item.get('status')})",
            f"Provenance: {item.get('provenance') or 'Original gear list'}"
        ]

print(f"Enriched {len(items)} items with website URLs and technical specs ({enriched_count} custom detailed specs).")
DATA_PATH.write_text(json.dumps(items, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
