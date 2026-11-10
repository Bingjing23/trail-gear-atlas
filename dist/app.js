const categories = [
  { name: "Sleep & Shelter", id: "sleep-shelter", color: "#537767", description: "Sleeping bags, shelter, mats and the small things that make nights outside easier." },
  { name: "Packs & Essentials", id: "packs-essentials", color: "#687d91", description: "Carry systems, lighting, trekking poles and useful trail accessories." },
  { name: "Cooking & Hydration", id: "cooking-hydration", color: "#a27957", description: "Stove, cookware, water storage and filtration." },
  { name: "Food & Nutrition", id: "food-nutrition", color: "#b56b3c", description: "Backcountry freeze-dried meals, breakfasts, trail desserts, energy gels and electrolyte hydration." },
  { name: "Clothing & Footwear", id: "clothing-footwear", color: "#9b777b", description: "Layers, weather protection and footwear for changing conditions." },
  { name: "Personal Items", id: "personal-items", color: "#877b9b", description: "The personal supplies that still need a little more detail." },
];

const defaultTypeOrders = {
  "Sleep & Shelter": [
    "tent",
    "tent footprint",
    "sleep bag",
    "liner",
    "sleep pad",
    "pillow"
  ],
  "Packs & Essentials": [
    "backpack",
    "summit bag",
    "dry bag",
    "poles",
    "head light",
    "camp light",
    "first aid bag",
    "fire starter",
    "umbrella"
  ],
  "Cooking & Hydration": [
    "stove",
    "pot",
    "titanium pot",
    "cup",
    "titanium cup",
    "filter",
    "water system",
    "thermo bottle",
    "stove accessory",
    "stove fuel",
    "spoons and chopsticks",
    "knife"
  ],
  "Food & Nutrition": [
    "breakfast meal",
    "freeze dried meal",
    "trail meal",
    "trail dessert",
    "energy gel",
    "hydration tablets"
  ],
  "Clothing & Footwear": [
    "base layer",
    "underwear",
    "fleece jacket",
    "fleece cardigan",
    "downjacket",
    "hard shell",
    "waterproof jacket",
    "hard shell pants",
    "pants",
    "hiking shoes",
    "camp boots",
    "gaiters",
    "socks",
    "fleece gloves",
    "beanie",
    "cap",
    "neck gaiters",
    "sunglasses",
    "shoe care"
  ],
  "Personal Items": [
    "power bank",
    "headphones",
    "wet wipes",
    "contact lenses"
  ],
};

const STORAGE_KEY = "trail_gear_atlas_trails_v5";
const UNIT_STORAGE_KEY = "trail_gear_atlas_unit";
const CHART_TYPE_STORAGE_KEY = "trail_gear_atlas_chart_type";

let currentUnit = localStorage.getItem(UNIT_STORAGE_KEY) || "metric"; // "metric" | "imperial"
let currentChartType = localStorage.getItem(CHART_TYPE_STORAGE_KEY) || "donut"; // "donut" | "bar"

const defaultTrails = [
  {
    id: "milford-track",
    name: "Milford Track",
    destination: "Fiordland National Park, New Zealand",
    distanceKm: 53.5,
    durationDays: 4,
    date: "Target: November 2026 (Next Destination)",
    status: "planned",
    notes: "New Zealand's premier Great Walk. 4 days / 3 nights hut-to-hut across Mackinnon Pass (1,154m). High rainfall zone; waterproof gear is non-negotiable.",
    pack: {
      "packs-essentials-11": 1,
      "sleep-shelter-01": 1,
      "sleep-shelter-02": 1,
      "sleep-shelter-03": 1,
      "cooking-hydration-43": 1,
      "cooking-hydration-44": 1,
      "cooking-hydration-45": 1,
      "cooking-hydration-55": 1,
      "cooking-hydration-56": 2,
      "cooking-hydration-61": 2,
      "cooking-hydration-65": 1,
      "packs-essentials-08": 1,
      "clothing-footwear-20": 1,
      "clothing-footwear-35": 1,
      "wishlist-03": 1,
    },
    worn: {
      "clothing-footwear-20": true, // Hoka Speedgoat 5 worn on feet
      "clothing-footwear-35": true, // Patagonia sun shirt worn on body
      "packs-essentials-08": true,  // Trekking poles in hands
    },
    shared: {
      "sleep-shelter-01": 2, // Nemo Hornet OSMO 2P tent split 1/2 with partner
    },
  },
  {
    id: "overland-track",
    name: "Overland Track",
    destination: "Cradle Mountain-Lake St Clair, Tasmania",
    distanceKm: 65.0,
    durationDays: 6,
    date: "Target: March 2027",
    status: "planned",
    notes: "Iconic alpine Tasmanian wilderness. Self-sufficient expedition through glacially carved valleys, ancient rainforests and button grass plains.",
    pack: {
      "packs-essentials-11": 1,
      "sleep-shelter-01": 1,
      "sleep-shelter-52": 1,
      "cooking-hydration-43": 1,
      "cooking-hydration-71": 1,
      "cooking-hydration-45": 1,
      "packs-essentials-08": 1,
      "clothing-footwear-20": 1,
      "clothing-footwear-19": 1,
    },
    worn: {
      "clothing-footwear-20": true,
      "clothing-footwear-19": true,
      "packs-essentials-08": true,
    },
    shared: {
      "sleep-shelter-01": 2,
      "cooking-hydration-43": 2,
    },
  },
  {
    id: "mount-barney",
    name: "Mount Barney East Peak",
    destination: "Mount Barney National Park, Queensland",
    distanceKm: 16.0,
    durationDays: 1,
    date: "Completed · October 2026",
    status: "completed",
    notes: "Demanding Class 5 rock scramble up South Ridge. Super lightweight alpine day-pack setup was essential for agility.",
    pack: {
      "packs-essentials-73": 1,
      "packs-essentials-10": 1,
      "packs-essentials-08": 1,
      "clothing-footwear-75": 1,
      "personal-items-74": 1,
    },
    worn: {
      "clothing-footwear-75": true,
      "packs-essentials-08": true,
    },
    shared: {},
  },
];

const elements = {
  stats: document.querySelector("#stats"),
  search: document.querySelector("#gear-search"),
  status: document.querySelector("#status-filter"),
  sort: document.querySelector("#sort-order"),
  nav: document.querySelector("#category-nav"),
  count: document.querySelector("#result-count"),
  sections: document.querySelector("#gear-sections"),
  empty: document.querySelector("#empty-state"),
  reset: document.querySelector("#reset-filters"),

  // Unit switchers
  btnUnitMetric: document.querySelector("#btn-unit-metric"),
  btnUnitImperial: document.querySelector("#btn-unit-imperial"),

  // Planner elements
  activeTrailSelect: document.querySelector("#active-trail-select"),
  btnCreateTrail: document.querySelector("#btn-create-trail"),
  bannerStatusPill: document.querySelector("#banner-status-pill"),
  bannerRegion: document.querySelector("#banner-region"),
  bannerDistance: document.querySelector("#banner-distance"),
  bannerDuration: document.querySelector("#banner-duration"),
  bannerDate: document.querySelector("#banner-date"),
  bannerTrailName: document.querySelector("#banner-trail-name"),
  bannerNotes: document.querySelector("#banner-notes"),
  btnEditActiveTrail: document.querySelector("#btn-edit-active-trail"),
  btnToggleCompleteTrail: document.querySelector("#btn-toggle-complete-trail"),
  btnClearPack: document.querySelector("#btn-clear-pack"),

  // Dashboard 5 metrics
  metricTotalG: document.querySelector("#metric-total-g"),
  metricTotalUnit: document.querySelector("#metric-total-unit"),
  metricTotalKg: document.querySelector("#metric-total-kg"),
  metricBaseG: document.querySelector("#metric-base-g"),
  metricBaseUnit: document.querySelector("#metric-base-unit"),
  metricBaseKg: document.querySelector("#metric-base-kg"),
  metricWornG: document.querySelector("#metric-worn-g"),
  metricWornUnit: document.querySelector("#metric-worn-unit"),
  metricWornSub: document.querySelector("#metric-worn-sub"),
  metricSkinoutG: document.querySelector("#metric-skinout-g"),
  metricSkinoutUnit: document.querySelector("#metric-skinout-unit"),
  metricSkinoutSub: document.querySelector("#metric-skinout-sub"),
  metricItemCount: document.querySelector("#metric-item-count"),
  metricConsumableSummary: document.querySelector("#metric-consumable-summary"),

  // Category Analytics: Donut Chart & Linear Bar
  btnChartDonut: document.querySelector("#btn-chart-donut"),
  btnChartBar: document.querySelector("#btn-chart-bar"),
  donutChartView: document.querySelector("#donut-chart-view"),
  linearBarView: document.querySelector("#linear-bar-view"),
  categoryDonutSvg: document.querySelector("#category-donut-svg"),
  donutCenterInfo: document.querySelector("#donut-center-info"),
  donutCenterWeight: document.querySelector("#donut-center-weight"),
  donutCenterCategory: document.querySelector("#donut-center-category"),
  donutWornVal: document.querySelector("#donut-worn-val"),
  donutWornCount: document.querySelector("#donut-worn-count"),
  categoryProgressBar: document.querySelector("#category-progress-bar"),
  categoryBarTotalLabel: document.querySelector("#category-bar-total-label"),
  categoryLegend: document.querySelector("#category-legend"),
  categoryBarLegend: document.querySelector("#category-bar-legend"),
  missingWeightsAlert: document.querySelector("#missing-weights-alert"),
  missingWeightsText: document.querySelector("#missing-weights-text"),

  // Packed items drawer
  packedItemsTitle: document.querySelector("#packed-items-title"),
  packedItemsCount: document.querySelector("#packed-items-count"),
  packedItemsList: document.querySelector("#packed-items-list"),
  btnExportPack: document.querySelector("#btn-export-pack"),
  btnExportCsv: document.querySelector("#btn-export-csv"),
  btnExportCsvModal: document.querySelector("#btn-export-csv-modal"),
  csvFileInput: document.querySelector("#csv-file-input"),

  // Header & Sticky
  headerTrailName: document.querySelector("#header-trail-name"),
  headerPackWeight: document.querySelector("#header-pack-weight"),
  headerBtnNewTrail: document.querySelector("#header-btn-new-trail"),
  stickyBar: document.querySelector("#sticky-pack-bar"),
  stickyTrailName: document.querySelector("#sticky-trail-name"),
  stickyItemCount: document.querySelector("#sticky-item-count"),
  stickyWeight: document.querySelector("#sticky-weight"),
  stickyBtnNewTrail: document.querySelector("#sticky-btn-new-trail"),

  // Guided workflow
  guideActiveTrail: document.querySelector("#guide-active-trail"),

  // Trail Log elements
  btnLogNewTrail: document.querySelector("#btn-log-new-trail"),
  trailLogGrid: document.querySelector("#trail-log-grid"),
  countAllTrails: document.querySelector("#count-all-trails"),
  countCompletedTrails: document.querySelector("#count-completed-trails"),
  countPlannedTrails: document.querySelector("#count-planned-trails"),
  logFilterBtns: document.querySelectorAll(".log-filter-btn"),

  // Modals
  trailModal: document.querySelector("#trail-modal"),
  modalTrailClose: document.querySelector("#modal-trail-close"),
  modalTrailCancel: document.querySelector("#modal-trail-cancel"),
  trailForm: document.querySelector("#trail-form"),
  formTrailId: document.querySelector("#form-trail-id"),
  formTrailName: document.querySelector("#form-trail-name"),
  formTrailDestination: document.querySelector("#form-trail-destination"),
  formTrailStatus: document.querySelector("#form-trail-status"),
  formTrailDistance: document.querySelector("#form-trail-distance"),
  formTrailDuration: document.querySelector("#form-trail-duration"),
  formTrailDate: document.querySelector("#form-trail-date"),
  formTrailNotes: document.querySelector("#form-trail-notes"),
  formTrailTemplate: document.querySelector("#form-trail-template"),
  formTemplateRow: document.querySelector("#form-template-row"),
  btnSubmitTrail: document.querySelector("#btn-submit-trail"),
  modalTrailTitle: document.querySelector("#modal-trail-title"),

  exportModal: document.querySelector("#export-modal"),
  modalExportClose: document.querySelector("#modal-export-close"),
  modalExportCloseBtn: document.querySelector("#modal-export-close-btn"),
  exportTextArea: document.querySelector("#export-text-area"),
  btnCopyExport: document.querySelector("#btn-copy-export"),

  // Product Detail Modal
  productModal: document.querySelector("#product-modal"),
  modalProductClose: document.querySelector("#modal-product-close"),
  productModalContent: document.querySelector("#product-modal-content"),

  // Inventory Management & Gear Modal
  btnAddGear: document.querySelector("#btn-add-gear"),
  btnToolbarAddGear: document.querySelector("#btn-toolbar-add-gear"),
  btnResetInventory: document.querySelector("#btn-reset-inventory"),
  gearModal: document.querySelector("#gear-modal"),
  modalGearClose: document.querySelector("#modal-gear-close"),
  modalGearCancel: document.querySelector("#modal-gear-cancel"),
  gearForm: document.querySelector("#gear-form"),
  modalGearTitle: document.querySelector("#modal-gear-title"),
  formGearId: document.querySelector("#form-gear-id"),
  formGearName: document.querySelector("#form-gear-name"),
  formGearBrand: document.querySelector("#form-gear-brand"),
  formGearCategory: document.querySelector("#form-gear-category"),
  formGearType: document.querySelector("#form-gear-type"),
  formGearSize: document.querySelector("#form-gear-size"),
  formGearWeight: document.querySelector("#form-gear-weight"),
  formGearPrice: document.querySelector("#form-gear-price"),
  formGearCurrency: document.querySelector("#form-gear-currency"),
  formGearStatus: document.querySelector("#form-gear-status"),
  formGearWebsite: document.querySelector("#form-gear-website"),
  formGearImage: document.querySelector("#form-gear-image"),
  formGearSummary: document.querySelector("#form-gear-summary"),
  formGearSpecs: document.querySelector("#form-gear-specs"),
  formGearFeatures: document.querySelector("#form-gear-features"),
  formGearNotes: document.querySelector("#form-gear-notes"),
  btnSubmitGear: document.querySelector("#btn-submit-gear"),

  // View mode switcher & Wishlist elements
  tabViewOwned: document.querySelector("#tab-view-owned"),
  tabViewWishlist: document.querySelector("#tab-view-wishlist"),
  tabViewAll: document.querySelector("#tab-view-all"),
  badgeCountOwned: document.querySelector("#badge-count-owned"),
  badgeCountWishlist: document.querySelector("#badge-count-wishlist"),
  badgeCountAll: document.querySelector("#badge-count-all"),
  wishlistHeroBanner: document.querySelector("#wishlist-hero-banner"),
  wishlistActiveTrailName: document.querySelector("#wishlist-active-trail-name"),
  statWishlistCount: document.querySelector("#stat-wishlist-count"),
  statWishlistWeight: document.querySelector("#stat-wishlist-weight"),
  statWishlistPacked: document.querySelector("#stat-wishlist-packed"),
  statWishlistCost: document.querySelector("#stat-wishlist-cost"),
  collectionHeadingWrap: document.querySelector("#collection-heading-main-wrap"),
  collectionKicker: document.querySelector("#collection-kicker"),
  collectionTitle: document.querySelector("#collection-title"),
  collectionDesc: document.querySelector("#collection-desc"),
  btnAddWishlistGear: document.querySelector("#btn-add-wishlist-gear"),
  btnViewOwnedKit: document.querySelector("#btn-view-owned-kit"),
  navWishlist: document.querySelector("#nav-wishlist"),
  metricWishlistG: document.querySelector("#metric-wishlist-g"),
  metricWishlistUnit: document.querySelector("#metric-wishlist-unit"),
  metricWishlistSummary: document.querySelector("#metric-wishlist-summary"),
  metricCardWishlist: document.querySelector("#metric-card-wishlist"),
};

const escapeHtml = (value) => String(value ?? "").replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]);

function formatWeight(value, opts = {}) {
  if (!Number.isFinite(value)) return "Not recorded";

  if (currentUnit === "imperial") {
    // 1 g = 0.03527396195 oz; 1 lb = 453.59237 g
    const oz = value * 0.03527396195;
    const lb = value / 453.59237;

    if (opts.showBoth || opts.full) {
      return `${lb.toFixed(2)} lb (${oz.toFixed(1)} oz)`;
    }
    if (opts.onlyLb) {
      return `${lb.toFixed(2)} lb`;
    }
    if (opts.onlyOz) {
      return `${oz.toFixed(1)} oz`;
    }
    if (value >= 453.59237) {
      return `${lb.toFixed(2)} lb`;
    }
    return `${oz.toFixed(1)} oz`;
  }

  // Metric
  if (opts.showBoth || opts.full) {
    return `${new Intl.NumberFormat("en-AU", { maximumFractionDigits: 1 }).format(value)} g (${(value / 1000).toFixed(2)} kg)`;
  }
  if (opts.onlyKg) {
    return `${(value / 1000).toFixed(2)} kg`;
  }
  return `${new Intl.NumberFormat("en-AU", { maximumFractionDigits: 1 }).format(value)} g`;
}
const formatPrice = (item) => {
  if (Number.isFinite(item.unitPriceCny)) return new Intl.NumberFormat("en-AU", { style: "currency", currency: "CNY", currencyDisplay: "code" }).format(item.unitPriceCny);
  if (Number.isFinite(item.unitPriceAud)) return item.unitPriceAud === 0 && item.statusKey === "gift" ? "Gift" : new Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD" }).format(item.unitPriceAud);
  return "Not recorded";
};

const formatEvidence = (entry) => {
  if (entry.startsWith("Purchase screenshot")) return "Purchase screenshot";
  if (entry.startsWith("Paddy Pallin tax invoice ")) return `Paddy Pallin #${entry.replace(/^Paddy Pallin tax invoice /, "")}`;
  if (entry.startsWith("Backpacking Light invoice ")) return `Backpacking Light #${entry.replace(/^Backpacking Light invoice /, "")}`;
  if (entry.startsWith("Ultralight Gear invoice ")) return `Ultralight Gear #${entry.replace(/^Ultralight Gear invoice #?/, "")}`;
  if (entry.startsWith("99 Bikes tax invoice ")) return `99 Bikes #${entry.replace(/^99 Bikes tax invoice (INV)?/i, "INV")}`;
  if (entry.startsWith("K2 Base Camp tax invoice ")) return `K2 Base Camp #${entry.replace(/^K2 Base Camp tax invoice /, "")}`;
  if (/^\d{7}$/.test(entry)) return `Paddy Pallin #${entry}`;
  if (entry.startsWith("#")) return `Invoice ${entry}`;
  return `Invoice #${entry}`;
};

function showToast(message, duration = 3800) {
  const container = document.querySelector("#toast-container");
  if (!container) return;
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = message;
  container.appendChild(toast);
  requestAnimationFrame(() => {
    toast.classList.add("show");
  });
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 350);
  }, duration);
}

const consumableTypes = new Set(["trail meal", "breakfast meal", "freeze dried meal", "trail dessert", "stove fuel", "hydration tablets", "energy gel", "wet wipes"]);
function isConsumable(item) {
  if (!item) return false;
  if (item.category === "Food & Nutrition") return true;
  const type = String(item.itemType || "").toLowerCase();
  return consumableTypes.has(type);
}

const INVENTORY_STORAGE_KEY = "trail_gear_atlas_inventory_v5";
let defaultInventory = [];
let gear = [];
let trails = [];
let activeTrailId = "milford-track";
let currentLogFilter = "all";
let currentViewMode = "owned"; // "owned" | "wishlist" | "all"

function loadInventory(defaultData) {
  try {
    const raw = localStorage.getItem(INVENTORY_STORAGE_KEY) || localStorage.getItem("trail_gear_atlas_inventory_v4") || localStorage.getItem("trail_gear_atlas_inventory_v3");
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        const parsedMap = new Map(parsed.map((item) => [item.id, item]));
        const merged = [];
        for (const def of defaultData) {
          const userItem = parsedMap.get(def.id);
          if (userItem) {
            merged.push({
              ...def,
              ...userItem,
              imagePath: def.imagePath,
              imageSourceUrl: def.imageSourceUrl,
              websiteUrl: def.websiteUrl || userItem.websiteUrl,
              statusKey: normalizeStatus(userItem.status || def.status),
            });
            parsedMap.delete(def.id);
          } else {
            merged.push({ ...def, statusKey: normalizeStatus(def.status) });
          }
        }
        for (const [_, customItem] of parsedMap) {
          merged.push({ ...customItem, statusKey: normalizeStatus(customItem.status) });
        }
        gear = merged;
        saveInventory();
        return;
      }
    }
  } catch (error) {
    console.warn("Failed to parse inventory from localStorage", error);
  }
  gear = JSON.parse(JSON.stringify(defaultData)).map((item) => ({ ...item, statusKey: normalizeStatus(item.status) }));
  saveInventory();
}

function saveInventory() {
  try {
    localStorage.setItem(INVENTORY_STORAGE_KEY, JSON.stringify(gear));
  } catch (error) {
    console.error("Failed to save inventory to localStorage", error);
  }
}

function updateInventoryStats() {
  const weighted = gear.filter((item) => Number.isFinite(item.unitWeightG)).length;
  if (elements.stats) {
    elements.stats.innerHTML = `
      <div class="stat"><strong>${gear.length}</strong><span>Logged items</span></div>
      <div class="stat"><strong>${trails.length}</strong><span>Trails in log</span></div>
      <div class="stat"><strong>${categories.length}</strong><span>Gear systems</span></div>
      <div class="stat"><strong>${weighted}</strong><span>Weights recorded</span></div>
    `;
  }
}

function loadTrails() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY) || localStorage.getItem("trail_gear_atlas_trails_v4") || localStorage.getItem("trail_gear_atlas_trails_v3");
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        trails = parsed.map((t) => {
          const matchedDefault = defaultTrails.find((def) => def.id === t.id);
          return {
            ...t,
            pack: t.pack || (matchedDefault?.pack ? { ...matchedDefault.pack } : {}),
            worn: t.worn || (matchedDefault?.worn ? { ...matchedDefault.worn } : {}),
            shared: t.shared || (matchedDefault?.shared ? { ...matchedDefault.shared } : {}),
          };
        });
        const milford = trails.find((t) => t.id === "milford-track");
        if (milford && milford.pack && !("wishlist-03" in milford.pack)) {
          milford.pack["wishlist-03"] = 1;
        }
        activeTrailId = trails[0]?.id || "milford-track";
        saveTrails();
        return;
      }
    }
  } catch (error) {
    console.warn("Failed to parse trails from localStorage", error);
  }
  trails = JSON.parse(JSON.stringify(defaultTrails));
  activeTrailId = "milford-track";
  saveTrails();
}

function saveTrails() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trails));
  } catch (error) {
    console.error("Failed to save trails", error);
  }
}

function getActiveTrail() {
  return trails.find((t) => t.id === activeTrailId) || trails[0];
}

function calculatePackMetrics(trail) {
  let totalPackWeightG = 0;   // Carried on back (Base + Consumables)
  let baseWeightG = 0;        // Carried on back (non-consumables)
  let consumableWeightG = 0;  // Carried on back (consumables)
  let wornWeightG = 0;        // Worn on body (shoes, clothes, poles in hand)
  let missingCount = 0;
  let totalItems = 0;
  let packItemsCount = 0;
  let wornItemsCount = 0;

  let ownedWeightG = 0;
  let ownedBaseWeightG = 0;
  let ownedItemsCount = 0;

  let wishlistWeightG = 0;
  let wishlistBaseWeightG = 0;
  let wishlistItemsCount = 0;
  const wishlistItems = [];

  const categoryWeights = {};
  const categoryWornWeights = {};
  for (const cat of categories) {
    categoryWeights[cat.name] = 0;
    categoryWornWeights[cat.name] = 0;
  }

  for (const [itemId, rawQty] of Object.entries(trail.pack || {})) {
    const qty = Number(rawQty) || 0;
    if (qty <= 0) continue;
    const item = gear.find((g) => g.id === itemId);
    if (!item) continue;

    totalItems += qty;
    const isWorn = Boolean(trail.worn?.[itemId]);
    const splitRatio = Number(trail.shared?.[itemId]) || 1;
    const isWishlist = (item.statusKey || normalizeStatus(item.status)) === "wishlist";
    const unitW = Number.isFinite(item.unitWeightG) ? item.unitWeightG : null;

    if (unitW === null) {
      missingCount += qty;
    } else {
      const fullLineWeight = unitW * qty;
      const lineWeight = fullLineWeight / splitRatio;

      if (isWorn) {
        wornWeightG += lineWeight;
        wornItemsCount += qty;
        categoryWornWeights[item.category] = (categoryWornWeights[item.category] || 0) + lineWeight;
      } else {
        totalPackWeightG += lineWeight;
        packItemsCount += qty;
        if (isConsumable(item)) {
          consumableWeightG += lineWeight;
        } else {
          baseWeightG += lineWeight;
        }
        categoryWeights[item.category] = (categoryWeights[item.category] || 0) + lineWeight;

        if (isWishlist) {
          wishlistWeightG += lineWeight;
          wishlistItemsCount += qty;
          wishlistItems.push({ item, qty, lineWeight, isWorn, splitRatio });
          if (!isConsumable(item)) wishlistBaseWeightG += lineWeight;
        } else {
          ownedWeightG += lineWeight;
          ownedItemsCount += qty;
          if (!isConsumable(item)) ownedBaseWeightG += lineWeight;
        }
      }
    }
  }

  const skinOutWeightG = totalPackWeightG + wornWeightG;

  return {
    totalPackWeightG,
    totalPackWeightKg: totalPackWeightG / 1000,
    totalWeightG: totalPackWeightG, // backward compatibility
    totalWeightKg: totalPackWeightG / 1000,
    baseWeightG,
    baseWeightKg: baseWeightG / 1000,
    consumableWeightG,
    consumableWeightKg: consumableWeightG / 1000,
    wornWeightG,
    wornWeightKg: wornWeightG / 1000,
    wornItemsCount,
    packItemsCount,
    skinOutWeightG,
    skinOutWeightKg: skinOutWeightG / 1000,
    missingCount,
    totalItems,
    categoryWeights,
    categoryWornWeights,
    ownedWeightG,
    ownedWeightKg: ownedWeightG / 1000,
    ownedBaseWeightG,
    ownedBaseWeightKg: ownedBaseWeightG / 1000,
    ownedItemsCount,
    wishlistWeightG,
    wishlistWeightKg: wishlistWeightG / 1000,
    wishlistBaseWeightG,
    wishlistItemsCount,
    wishlistItems,
  };
}

function normalizeStatus(status) {
  const text = String(status || "").toLowerCase().trim();
  if (text.includes("想买") || text.includes("wishlist") || text.includes("待购") || text.includes("心愿") || text.includes("计划购入")) return "wishlist";
  if (text === "使用中" || text === "in use" || text === "active" || text === "in_use") return "in_use";
  if (text.includes("卖掉") || text.includes("准备卖") || text.includes("for sale") || text.includes("selling") || text.includes("出二手")) return "selling";
  if (text.includes("退货") || text.includes("returned") || text.includes("return")) return "returned";
  if (text.startsWith("lost") || text.includes("丢失") || text === "lost") return "lost";
  if (text.startsWith("purchased") || text.includes("已购") || text.includes("已买")) return "purchased";
  if (text.startsWith("gift") || text.includes("礼品") || text.includes("赠送")) return "gift";
  if (text.startsWith("older") || text.includes("旧款") || text.includes("旧装备")) return "older";
  if (text.startsWith("owned") || text.includes("已拥有") || text.includes("持有")) return "owned";
  return "review";
}

function isInactiveStatus(statusKey) {
  return ["lost", "selling", "returned"].includes(statusKey);
}

function statusClass(item) {
  const key = item.statusKey || normalizeStatus(item.status);
  return ["in_use", "owned", "purchased", "gift", "lost", "selling", "returned", "older", "review", "wishlist"].includes(key) ? key : "review";
}

function extractDomain(url) {
  if (!url) return "";
  try {
    const u = new URL(url);
    return u.hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

function parseTemp(text) {
  if (!text) return null;
  const comfortMatch = text.match(/comfort\s*([+\-]?\d+°[CF](?:\s*\([+\-]?\d+°[CF]\))?)/i);
  const limitMatch = text.match(/limit\s*([+\-]?\d+°[CF](?:\s*\([+\-]?\d+°[CF]\))?)/i);
  const extremeMatch = text.match(/extreme\s*([+\-]?\d+°[CF](?:\s*\([+\-]?\d+°[CF]\))?)/i);
  const standardMatch = text.match(/\(([^)]*(?:ISO|EN)[^)]*)\)/i);
  return {
    comfort: comfortMatch ? comfortMatch[1].trim() : null,
    limit: limitMatch ? limitMatch[1].trim() : null,
    extreme: extremeMatch ? extremeMatch[1].trim() : null,
    standard: standardMatch ? standardMatch[1].trim() : "Standard Certified"
  };
}

function parseRValue(text) {
  if (!text) return null;
  const numMatch = text.match(/(\d+(?:\.\d+)?)/);
  const value = numMatch ? parseFloat(numMatch[1]) : null;
  let categoryLabel = "All-Round Trail Performance";
  let seasonIcon = "🏕️";
  if (value >= 5.0) {
    categoryLabel = "Extreme Alpine & Snow Camping (Sub-Zero Ground)";
    seasonIcon = "❄️❄️❄️";
  } else if (value >= 4.0) {
    categoryLabel = "4-Season Cold Mountain Versatility";
    seasonIcon = "❄️❄️";
  } else if (value >= 2.5) {
    categoryLabel = "3-Season Spring to Autumn Trails";
    seasonIcon = "🍂🌱";
  } else {
    categoryLabel = "Warm Weather / Fast & Light Summer";
    seasonIcon = "☀️";
  }
  return {
    raw: text,
    value,
    categoryLabel,
    seasonIcon
  };
}

function getCardSpecBadge(item) {
  const specs = item.specs;
  if (!specs) return "";
  if (specs["Temperature Rating"]) {
    const raw = specs["Temperature Rating"];
    const m = raw.match(/comfort\s*([+\-]?\d+°[CF](?:\s*\([+\-]?\d+°[CF]\))?)/i);
    const label = m ? `Comfort ${m[1]}` : raw.split("|")[0].trim();
    return `<div class="card-spec-badge badge-temp" data-detail-id="${escapeHtml(item.id)}" title="${escapeHtml(raw)}">
      <span class="badge-icon">🌡️</span>
      <span class="badge-text">${escapeHtml(label)}</span>
    </div>`;
  }
  if (specs["R-Value"]) {
    const raw = specs["R-Value"];
    const num = raw.match(/\d+(?:\.\d+)?/)?.[0] || "";
    return `<div class="card-spec-badge badge-rval" data-detail-id="${escapeHtml(item.id)}" title="${escapeHtml(raw)}">
      <span class="badge-icon">❄️</span>
      <span class="badge-text">R-Value ${escapeHtml(num || raw)}</span>
    </div>`;
  }
  if (specs["Output"]) {
    const raw = specs["Output"];
    const btu = raw.match(/[\d,]+\s*BTU/i)?.[0];
    return `<div class="card-spec-badge badge-output" data-detail-id="${escapeHtml(item.id)}" title="${escapeHtml(raw)}">
      <span class="badge-icon">🔥</span>
      <span class="badge-text">${escapeHtml(btu || raw.split("(")[0].trim())}</span>
    </div>`;
  }
  if (specs["Filter Rating"]) {
    const raw = specs["Filter Rating"];
    const m = raw.match(/\d+(?:\.\d+)?\s*Micron/i)?.[0];
    return `<div class="card-spec-badge badge-filter" data-detail-id="${escapeHtml(item.id)}" title="${escapeHtml(raw)}">
      <span class="badge-icon">💧</span>
      <span class="badge-text">${escapeHtml(m || "0.1 Micron")} Absolute</span>
    </div>`;
  }
  if (specs["Capacity"] && specs["Capacity"].includes("mAh")) {
    const m = specs["Capacity"].match(/[\d,]+\s*mAh/i)?.[0];
    return `<div class="card-spec-badge badge-battery" data-detail-id="${escapeHtml(item.id)}" title="${escapeHtml(specs["Capacity"])}">
      <span class="badge-icon">⚡</span>
      <span class="badge-text">${escapeHtml(m || specs["Capacity"])}</span>
    </div>`;
  }
  if (specs["Membrane"]) {
    const raw = specs["Membrane"];
    const m = raw.match(/(?:GORE-TEX[^\(]*|H2No[^\(]*|AscentShell[^\(]*|Porelle[^\(]*)/i)?.[0];
    const shortM = (m || raw.split("(")[0]).trim();
    return `<div class="card-spec-badge badge-membrane" data-detail-id="${escapeHtml(item.id)}" title="${escapeHtml(raw)}">
      <span class="badge-icon">🌧️</span>
      <span class="badge-text">${escapeHtml(shortM)}</span>
    </div>`;
  }
  if (specs["Thermal Boost"]) {
    return `<div class="card-spec-badge badge-temp" data-detail-id="${escapeHtml(item.id)}" title="${escapeHtml(specs["Thermal Boost"])}">
      <span class="badge-icon">🌡️</span>
      <span class="badge-text">${escapeHtml(specs["Thermal Boost"].split("to")[0].trim())}</span>
    </div>`;
  }
  if (specs["Thermal Retention"]) {
    return `<div class="card-spec-badge badge-temp" data-detail-id="${escapeHtml(item.id)}" title="${escapeHtml(specs["Thermal Retention"])}">
      <span class="badge-icon">☕</span>
      <span class="badge-text">${escapeHtml(specs["Thermal Retention"].split("·")[0].trim())}</span>
    </div>`;
  }
  if (specs["Insulation"] && specs["Insulation"].toLowerCase().includes("down")) {
    const loft = specs["Insulation"].match(/\d+\+?\s*(?:Loft|Fill)/i)?.[0];
    return `<div class="card-spec-badge badge-insulation" data-detail-id="${escapeHtml(item.id)}" title="${escapeHtml(specs["Insulation"])}">
      <span class="badge-icon">🪶</span>
      <span class="badge-text">${escapeHtml(loft ? `${loft} Down` : "Down Fill")}</span>
    </div>`;
  }
  if (specs["Capacity & Season"]) {
    return `<div class="card-spec-badge badge-tent" data-detail-id="${escapeHtml(item.id)}" title="${escapeHtml(specs["Capacity & Season"])}">
      <span class="badge-icon">⛺</span>
      <span class="badge-text">${escapeHtml(specs["Capacity & Season"].split("·")[0].trim())}</span>
    </div>`;
  }
  return "";
}

function renderTempCallout(item) {
  const tempText = item.specs?.["Temperature Rating"];
  if (!tempText) return "";
  const parsed = parseTemp(tempText);
  if (!parsed || (!parsed.comfort && !parsed.limit)) {
    return `
      <div class="temp-rating-card">
        <div class="temp-rating-header">
          <span class="temp-icon">🌡️</span>
          <div>
            <strong class="temp-main-title">Temperature Rating (ISO / EN Certified)</strong>
            <p class="temp-raw-text">${escapeHtml(tempText)}</p>
          </div>
        </div>
      </div>
    `;
  }

  return `
    <div class="temp-rating-card">
      <div class="temp-rating-header">
        <div class="temp-title-group">
          <span class="temp-icon">🌡️</span>
          <div>
            <h4 class="temp-main-title">Alpine Temperature Ratings</h4>
            <span class="temp-standard-tag">${escapeHtml(parsed.standard)}</span>
          </div>
        </div>
      </div>
      <div class="temp-levels-grid">
        ${parsed.comfort ? `
          <div class="temp-level-box temp-comfort">
            <span class="temp-level-label">COMFORT</span>
            <span class="temp-level-val">${escapeHtml(parsed.comfort)}</span>
            <span class="temp-level-desc">Ideal relaxed sleep for cold sleepers</span>
          </div>
        ` : ""}
        ${parsed.limit ? `
          <div class="temp-level-box temp-limit">
            <span class="temp-level-label">LOWER LIMIT</span>
            <span class="temp-level-val">${escapeHtml(parsed.limit)}</span>
            <span class="temp-level-desc">Standard limit for warm sleepers</span>
          </div>
        ` : ""}
        ${parsed.extreme ? `
          <div class="temp-level-box temp-extreme">
            <span class="temp-level-label">EXTREME</span>
            <span class="temp-level-val">${escapeHtml(parsed.extreme)}</span>
            <span class="temp-level-desc">Emergency survival threshold only</span>
          </div>
        ` : ""}
      </div>
    </div>
  `;
}

function renderRValueCallout(item) {
  const rvalText = item.specs?.["R-Value"];
  if (!rvalText) return "";
  const parsed = parseRValue(rvalText);
  if (!parsed || parsed.value === null) {
    return `
      <div class="rval-rating-card">
        <div class="rval-header">
          <span class="rval-icon">❄️</span>
          <div>
            <strong class="rval-title">Thermal Resistance (R-Value)</strong>
            <p class="rval-note">${escapeHtml(rvalText)}</p>
          </div>
        </div>
      </div>
    `;
  }

  return `
    <div class="rval-rating-card">
      <div class="rval-top">
        <div class="rval-score-badge">
          <span class="rval-score-num">${parsed.value}</span>
          <span class="rval-score-label">R-VALUE</span>
        </div>
        <div class="rval-details">
          <h4 class="rval-title">ASTM F3340 Thermal Insulation</h4>
          <p class="rval-suitability">${parsed.seasonIcon} <strong>${escapeHtml(parsed.categoryLabel)}</strong></p>
          <span class="rval-note">${escapeHtml(parsed.raw)}</span>
        </div>
      </div>
    </div>
  `;
}

function renderModalPackControls(item, trail) {
  if (!trail) return `<p class="modal-no-trail">No active expedition selected.</p>`;
  const packedQty = trail.pack?.[item.id] || 0;
  const isPacked = packedQty > 0;
  const weight = Number.isFinite(item.unitWeightG) ? item.unitWeightG : null;
  const lineWeight = weight ? weight * packedQty : null;

  if (isPacked) {
    return `
      <div class="modal-pack-active">
        <div class="modal-pack-status-line">
          <span class="modal-packed-check">✓ Packed for <strong>${escapeHtml(trail.name)}</strong></span>
          <span class="modal-packed-weight">${formatWeight(lineWeight)} total</span>
        </div>
        <div class="modal-stepper-wrap">
          <button class="btn-modal-minus" data-id="${escapeHtml(item.id)}" type="button" aria-label="Decrease quantity" title="Decrease packed quantity">−</button>
          <div class="modal-stepper-center">
            <input type="number" class="modal-qty-input" data-id="${escapeHtml(item.id)}" value="${packedQty}" min="1" max="99" aria-label="Packed quantity for ${escapeHtml(item.name || item.itemType)}" />
            <span class="modal-stepper-unit">in pack</span>
          </div>
          <button class="btn-modal-plus" data-id="${escapeHtml(item.id)}" type="button" aria-label="Increase quantity" title="Increase packed quantity">+</button>
        </div>
        <button class="btn-modal-remove" data-id="${escapeHtml(item.id)}" type="button">Remove from active pack</button>
      </div>
    `;
  }

  return `
    <button class="btn-modal-pack" data-id="${escapeHtml(item.id)}" type="button">
      + Pack for ${escapeHtml(trail.name)}
    </button>
  `;
}

function refreshModalPackControls(itemId) {
  const container = document.querySelector("#modal-pack-control-box .modal-pack-control-inner");
  if (!container) return;
  const item = gear.find((g) => g.id === itemId);
  const trail = getActiveTrail();
  if (item && trail) {
    container.innerHTML = renderModalPackControls(item, trail);
  }
}

function openProductModal(item) {
  if (!elements.productModal || !elements.productModalContent) return;
  const activeTrail = getActiveTrail();
  const category = categories.find((c) => c.name === item.category) || { color: "#17342e", name: item.category };
  const weight = Number.isFinite(item.unitWeightG) ? item.unitWeightG : null;
  const hasPrice = Number.isFinite(item.unitPriceAud) || Number.isFinite(item.unitPriceCny);

  const tempCallout = renderTempCallout(item);
  const rvalCallout = renderRValueCallout(item);

  const websiteCta = item.websiteUrl ? `
    <div class="modal-website-banner">
      <div class="website-banner-info">
        <span class="website-banner-label">OFFICIAL BRAND RESOURCE</span>
        <span class="website-banner-domain">${escapeHtml(extractDomain(item.websiteUrl))}</span>
      </div>
      <a class="btn-official-website" href="${escapeHtml(item.websiteUrl)}" target="_blank" rel="noopener noreferrer" title="Open official manufacturer website in a new tab">
        <span>Official Brand Website</span>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
      </a>
    </div>
  ` : "";

  const specsEntries = Object.entries(item.specs || {});
  const specsMarkup = specsEntries.length ? `
    <div class="modal-specs-section">
      <h4 class="modal-section-title">
        <span class="section-title-icon">⚙️</span>
        <span>Technical Specifications &amp; Parameters</span>
      </h4>
      <div class="specs-table">
        ${specsEntries.map(([key, val]) => `
          <div class="spec-row">
            <span class="spec-label">${escapeHtml(key)}</span>
            <span class="spec-value">${escapeHtml(val)}</span>
          </div>
        `).join("")}
      </div>
    </div>
  ` : "";

  const featuresMarkup = item.features?.length ? `
    <div class="modal-features-section">
      <h4 class="modal-section-title">
        <span class="section-title-icon">🏔️</span>
        <span>Alpine &amp; Trail Design Features</span>
      </h4>
      <ul class="modal-features-list">
        ${item.features.map((feat) => `
          <li>
            <span class="feat-check">✓</span>
            <span class="feat-text">${escapeHtml(feat)}</span>
          </li>
        `).join("")}
      </ul>
    </div>
  ` : "";

  const notesMarkup = item.notes?.trim() ? `
    <div class="modal-notes-section">
      <h4 class="modal-section-title">
        <span class="section-title-icon">📝</span>
        <span>Personal Notes &amp; Field Experience</span>
      </h4>
      <div class="modal-notes-card">${escapeHtml(item.notes)}</div>
    </div>
  ` : "";

  const summaryMarkup = item.summary ? `
    <p class="modal-product-summary">${escapeHtml(item.summary)}</p>
  ` : "";

  let mediaMarkup = "";
  if (item.imagePath) {
    const alt = `${item.brand || ""} ${item.name || item.itemType || "gear"} product photo`.trim();
    const officialUrl = item.websiteUrl || item.imageSourceUrl;
    const photoSource = officialUrl ? `
      <a class="modal-photo-source" href="${escapeHtml(officialUrl)}" target="_blank" rel="noopener noreferrer" title="Official Brand Website: ${escapeHtml(extractDomain(officialUrl))}">
        Official Brand Source: ${escapeHtml(extractDomain(officialUrl))} ↗
      </a>
    ` : "";
    mediaMarkup = `
      <div class="modal-media-wrap">
        <img class="modal-product-img" src="${escapeHtml(item.imagePath)}" alt="${escapeHtml(alt)}" />
        ${photoSource}
      </div>
    `;
  } else {
    mediaMarkup = `
      <div class="modal-media-wrap modal-no-image">
        <svg viewBox="0 0 180 120" aria-hidden="true"><circle cx="131" cy="35" r="16"/><path d="M8 101 55 47l30 35 19-21 62 40H8Z"/><path d="M8 110h158"/></svg>
        <span>IMAGE TO ADD</span>
      </div>
    `;
  }

  const statusKey = item.statusKey || normalizeStatus(item.status);
  const isWishlist = statusKey === "wishlist";

  elements.productModalContent.innerHTML = `
    <div class="product-detail-container" style="--section-color:${category.color}">
      <div class="product-modal-header">
        <div class="product-modal-eyebrow">
          <span class="product-category-chip">${escapeHtml(item.category)}</span>
          ${item.size ? `<span class="product-size-chip" title="Size / Capacity">📏 Size: ${escapeHtml(item.size)}</span>` : ""}
          ${isWishlist ? `<span class="modal-wishlist-chip">✨ PROSPECTIVE GEAR · 想买待购</span><button class="btn-modal-convert-owned" data-convert-id="${escapeHtml(item.id)}" type="button" title="Convert to Owned / In Use kit">✓ Mark as Purchased (转为已拥有)</button>` : ""}
          <select class="modal-status-select ${statusClass(item)}" data-modal-status-id="${escapeHtml(item.id)}" title="Click to change status (点击切换状态)">
            <option value="想买" ${statusKey === "wishlist" ? "selected" : ""}>✨ 想买 (Wishlist · 待购入)</option>
            <option value="使用中" ${statusKey === "in_use" ? "selected" : ""}>使用中</option>
            <option value="Owned" ${statusKey === "owned" ? "selected" : ""}>Owned (已拥有)</option>
            <option value="Purchased · in inventory" ${statusKey === "purchased" ? "selected" : ""}>Purchased (已购入)</option>
            <option value="Gift" ${statusKey === "gift" ? "selected" : ""}>Gift (礼品)</option>
            <option value="lost" ${statusKey === "lost" ? "selected" : ""}>lost (已丢失 · 灰显)</option>
            <option value="不想要了准备卖掉" ${statusKey === "selling" ? "selected" : ""}>不想要了准备卖掉 (准备出掉 · 灰显)</option>
            <option value="退货" ${statusKey === "returned" ? "selected" : ""}>退货 (已退货 · 灰显)</option>
            <option value="Older gear · ownership to confirm" ${statusKey === "older" ? "selected" : ""}>Older gear (旧款)</option>
            <option value="Needs details" ${statusKey === "review" ? "selected" : ""}>Needs details (待补充)</option>
          </select>
        </div>
        <div class="product-modal-brand">${escapeHtml(item.brand || "Brand not recorded")}</div>
        <h3 class="product-modal-name" id="modal-product-title">${escapeHtml(item.name || item.itemType || "Unnamed Gear")}</h3>
        ${summaryMarkup}
        ${websiteCta}
      </div>

      <div class="product-modal-layout">
        <div class="product-modal-aside">
          ${mediaMarkup}

          <div class="modal-meta-grid">
            <div class="modal-meta-box">
              <span class="modal-meta-k">Size / Capacity</span>
              <strong class="modal-meta-v ${item.size ? "" : "missing"}">${escapeHtml(item.size || "Standard / One Size")}</strong>
            </div>
            <div class="modal-meta-box">
              <span class="modal-meta-k">Unit Weight</span>
              <strong class="modal-meta-v ${weight === null ? "missing" : ""}">${formatWeight(weight)}</strong>
              ${weight ? `<span class="modal-meta-sub">${((weight * 0.035274).toFixed(1))} oz / ${(weight / 1000).toFixed(2)} kg</span>` : ""}
            </div>
            <div class="modal-meta-box">
              <span class="modal-meta-k">Recorded Price</span>
              <strong class="modal-meta-v ${hasPrice ? "" : "missing"}">${formatPrice(item)}</strong>
            </div>
            <div class="modal-meta-box">
              <span class="modal-meta-k">Gear Type</span>
              <strong class="modal-meta-v">${escapeHtml(item.itemType || "Gear")}</strong>
            </div>
            <div class="modal-meta-box">
              <span class="modal-meta-k">Receipt / Invoice</span>
              <strong class="modal-meta-v modal-meta-evidence">${escapeHtml((item.invoiceEvidence || []).join(", ") || item.provenance || "Workbook")}</strong>
            </div>
          </div>

          <div class="modal-pack-card" id="modal-pack-control-box">
            <div class="modal-pack-card-header">
              <span class="modal-pack-trail-tag">EXPEDITION PACK</span>
              <strong class="modal-pack-trail-name">${escapeHtml(activeTrail?.name || "Active Trail")}</strong>
            </div>
            <div class="modal-pack-control-inner">
              ${renderModalPackControls(item, activeTrail)}
            </div>
          </div>

          <div class="modal-item-manage-bar">
            <button class="btn-manage-edit" data-edit-id="${escapeHtml(item.id)}" type="button" title="Edit gear name, weight, price, and specs">
              <span class="manage-btn-icon">✏️</span> Edit Gear Item
            </button>
            <button class="btn-manage-delete" data-delete-id="${escapeHtml(item.id)}" type="button" title="Remove this item from your inventory">
              <span class="manage-btn-icon">🗑️</span> Delete Item
            </button>
          </div>
        </div>

        <div class="product-modal-main">
          ${tempCallout}
          ${rvalCallout}
          ${specsMarkup}
          ${featuresMarkup}
          ${notesMarkup}
        </div>
      </div>
    </div>
  `;

  elements.productModal.classList.add("open");
  const box = elements.productModal.querySelector(".modal-box");
  if (box) box.scrollTop = 0;
}

function closeProductModal() {
  elements.productModal?.classList.remove("open");
}

function mediaMarkup(item) {
  if (!item.imagePath) {
    return `<div class="card-media media-placeholder clickable-media" data-detail-id="${escapeHtml(item.id)}" aria-label="Product image not available" title="Click to view specs &amp; official website">
      <svg viewBox="0 0 180 120" aria-hidden="true"><circle cx="131" cy="35" r="16"/><path d="M8 101 55 47l30 35 19-21 62 40H8Z"/><path d="M8 110h158"/></svg>
      <span>IMAGE TO ADD</span>
      <span class="card-media-hover-hint">Inspect Specs ↗</span>
    </div>`;
  }
  const alt = `${item.brand || ""} ${item.name || item.itemType || "gear"} product photo`.trim();
  const officialUrl = item.websiteUrl || item.imageSourceUrl;
  const domain = extractDomain(officialUrl);
  const credit = officialUrl
    ? `<a class="photo-source" href="${escapeHtml(officialUrl)}" target="_blank" rel="noopener noreferrer" aria-label="Official website for ${escapeHtml(item.name || item.itemType)}" title="Official Brand Website: ${escapeHtml(domain)}">OFFICIAL SITE ↗</a>`
    : "";
  return `<div class="card-media clickable-media" data-detail-id="${escapeHtml(item.id)}" title="Click to view specs &amp; official website"><img class="product-image" src="${escapeHtml(item.imagePath)}" alt="${escapeHtml(alt)}" loading="lazy" decoding="async" />${credit}<span class="card-media-hover-hint">Inspect Specs ↗</span></div>`;
}

function renderCard(item, category) {
  const note = item.notes?.trim() ? `<p class="card-note">${escapeHtml(item.notes)}</p>` : "";
  const quantityLabel = item.status === "Purchased · ownership to confirm" ? "Quantity on receipt" : "Quantity in inventory";
  const quantity = item.quantity && item.quantity !== 1 ? `<div class="item-qty">${quantityLabel}: ${escapeHtml(item.quantity)}</div>` : "";
  const evidence = Array.isArray(item.invoiceEvidence) ? item.invoiceEvidence.filter((source) => source !== "unmatched") : [];
  const source = evidence.length ? `<div class="card-source">${evidence.map(formatEvidence).map(escapeHtml).join(" · ")}</div>` : "";
  const weight = Number.isFinite(item.unitWeightG) ? item.unitWeightG : null;
  const hasPrice = Number.isFinite(item.unitPriceAud) || Number.isFinite(item.unitPriceCny);

  const activeTrail = getActiveTrail();
  const packedQty = activeTrail?.pack?.[item.id] || 0;
  const isPacked = packedQty > 0;
  const lineWeight = weight ? weight * packedQty : null;

  const isInactive = isInactiveStatus(item.statusKey);
  const isWishlist = item.statusKey === "wishlist";

  let packControl = "";
  if (isPacked) {
    packControl = `<div class="card-pack-stepper is-packed ${isInactive ? "is-inactive-stepper" : ""} ${isWishlist ? "is-wishlist-stepper" : ""}" data-card-id="${escapeHtml(item.id)}">
      <button class="card-stepper-btn btn-card-minus" data-id="${escapeHtml(item.id)}" type="button" aria-label="Decrease quantity" title="Decrease packed quantity">−</button>
      <div class="card-stepper-display">
        <span class="card-stepper-qty-wrap">
          <input type="number" class="card-stepper-input" data-id="${escapeHtml(item.id)}" value="${packedQty}" min="1" max="99" aria-label="Quantity for ${escapeHtml(item.name || item.itemType)}" />
          <span class="card-stepper-label">${isWishlist ? "in pack (trial)" : "in pack"}</span>
        </span>
        <span class="card-stepper-weight">${formatWeight(lineWeight)}</span>
      </div>
      <button class="card-stepper-btn btn-card-plus" data-id="${escapeHtml(item.id)}" type="button" aria-label="Increase quantity" title="Increase packed quantity">+</button>
    </div>`;
  } else {
    packControl = `<button class="card-pack-btn ${isInactive ? "is-inactive-pack" : ""} ${isWishlist ? "btn-wishlist-pack" : ""}" data-pack-add="${escapeHtml(item.id)}" type="button" aria-pressed="false" ${isInactive ? `title="Item is ${escapeHtml(item.status || "Inactive")}"` : ""}>
      + ${isWishlist ? "Test Pack (测重)" : "Pack for"} ${escapeHtml(activeTrail?.name || "Trail")} ${isInactive ? `(${escapeHtml(item.status)})` : ""}
    </button>`;
  }

  const packedBadge = isPacked
    ? `<div class="card-packed-badge">✓ ${packedQty > 1 ? `${packedQty} IN PACK` : `IN ACTIVE PACK`}</div>`
    : "";

  const inactiveBanner = isInactive
    ? `<div class="card-inactive-banner"><span>${escapeHtml(item.status || "Inactive")}</span></div>`
    : "";

  const wishlistRibbon = isWishlist
    ? `<div class="card-wishlist-ribbon"><span>✨ WISH LIST · 想买待购</span><button class="btn-card-mark-bought" data-convert-id="${escapeHtml(item.id)}" type="button" title="I purchased this! Move to Owned / In Use kit">✓ Mark Bought (转为已拥有)</button></div>`
    : "";

  const specBadge = getCardSpecBadge(item);

  return `<article class="gear-card ${isPacked ? "is-packed" : ""} ${isInactive ? `is-inactive-status status-${escapeHtml(item.statusKey)}` : ""} ${isWishlist ? "is-wishlist-item" : ""}" id="item-${escapeHtml(item.id)}" style="--section-color:${category.color}">
    ${wishlistRibbon}
    ${packedBadge}
    ${inactiveBanner}
    ${mediaMarkup(item)}
    <div class="card-top">
      <div class="card-type-and-size">
        <span class="item-type">${escapeHtml(item.itemType || "Gear")}</span>
        ${item.size ? `<span class="item-size-badge" title="Size / Capacity: ${escapeHtml(item.size)}">${escapeHtml(item.size)}</span>` : ""}
      </div>
      <div class="card-top-actions">
        <select class="status-quick-select ${statusClass(item)}" data-status-id="${escapeHtml(item.id)}" title="Click to change status (点击切换状态)">
          <option value="想买" ${item.statusKey === "wishlist" ? "selected" : ""}>✨ 想买 (Wishlist · 待购)</option>
          <option value="使用中" ${item.statusKey === "in_use" ? "selected" : ""}>使用中</option>
          <option value="Owned" ${item.statusKey === "owned" ? "selected" : ""}>Owned (已拥有)</option>
          <option value="Purchased · in inventory" ${item.statusKey === "purchased" ? "selected" : ""}>Purchased (已购入)</option>
          <option value="Gift" ${item.statusKey === "gift" ? "selected" : ""}>Gift (礼品)</option>
          <option value="lost" ${item.statusKey === "lost" ? "selected" : ""}>lost (已丢失)</option>
          <option value="不想要了准备卖掉" ${item.statusKey === "selling" ? "selected" : ""}>不想要了准备卖掉</option>
          <option value="退货" ${item.statusKey === "returned" ? "selected" : ""}>退货</option>
          <option value="Older gear · ownership to confirm" ${item.statusKey === "older" ? "selected" : ""}>Older gear (旧款)</option>
          <option value="Needs details" ${item.statusKey === "review" ? "selected" : ""}>Needs details (待补充)</option>
        </select>
        <button class="card-mini-action btn-card-edit" data-edit-id="${escapeHtml(item.id)}" type="button" title="Edit this gear item" aria-label="Edit item">✏️</button>
        <button class="card-mini-action btn-card-delete" data-delete-id="${escapeHtml(item.id)}" type="button" title="Delete this gear item from inventory" aria-label="Delete item">🗑️</button>
      </div>
    </div>
    <div class="card-brand">${escapeHtml(item.brand || "Brand not recorded")}</div>
    <h4 class="card-title clickable-title" data-detail-id="${escapeHtml(item.id)}" title="Click to view specs &amp; official website">${escapeHtml(item.name || item.itemType || "Unnamed item")}</h4>
    ${specBadge}
    ${note}
    <div class="card-metrics"><div class="metric"><span>Listed weight</span><strong class="${weight === null ? "missing" : ""}">${formatWeight(weight)}</strong></div><div class="metric"><span>Recorded price</span><strong class="${hasPrice ? "" : "missing"}">${formatPrice(item)}</strong></div></div>
    ${quantity}
    ${source}
    <button class="card-detail-btn" data-detail-id="${escapeHtml(item.id)}" type="button" title="View technical specs, features, and official brand link">
      <span>Specs &amp; Details</span>
      <span class="detail-link-arrow">↗</span>
    </button>
    ${packControl}
  </article>`;
}

function sortedItems(items) {
  const copy = [...items];
  const mode = elements.sort.value;
  if (mode === "original") {
    const category = copy[0]?.category;
    const typeOrder = defaultTypeOrders[category] || [];
    const typeRank = new Map(typeOrder.map((itemType, index) => [itemType.toLowerCase(), index]));
    return copy
      .map((item, index) => ({ item, index }))
      .sort((a, b) => {
        const aRank = typeRank.get(String(a.item.itemType || "").trim().toLowerCase()) ?? typeOrder.length;
        const bRank = typeRank.get(String(b.item.itemType || "").trim().toLowerCase()) ?? typeOrder.length;
        return aRank - bRank || a.index - b.index;
      })
      .map(({ item }) => item);
  }
  const weightMode = mode.startsWith("weight");
  const sign = mode.endsWith("desc") ? -1 : 1;
  return copy.sort((a, b) => {
    const aCurrency = Number.isFinite(a.unitPriceAud) ? 0 : Number.isFinite(a.unitPriceCny) ? 1 : 2;
    const bCurrency = Number.isFinite(b.unitPriceAud) ? 0 : Number.isFinite(b.unitPriceCny) ? 1 : 2;
    if (!weightMode && aCurrency !== bCurrency) return aCurrency - bCurrency;
    const aRaw = weightMode ? a.unitWeightG : aCurrency === 0 ? a.unitPriceAud : a.unitPriceCny;
    const bRaw = weightMode ? b.unitWeightG : bCurrency === 0 ? b.unitPriceAud : b.unitPriceCny;
    const aValue = Number.isFinite(aRaw) ? aRaw : null;
    const bValue = Number.isFinite(bRaw) ? bRaw : null;
    if (aValue === null && bValue === null) return 0;
    if (aValue === null) return 1;
    if (bValue === null) return -1;
    return sign * (aValue - bValue);
  });
}

function filteredItems() {
  const query = elements.search.value.trim().toLowerCase();
  const status = elements.status.value;
  return gear.filter((item) => {
    const isWishlist = item.statusKey === "wishlist";

    // View mode separation ("放在另外一个页面或者你设计一下")
    if (currentViewMode === "owned") {
      if (isWishlist) return false;
    } else if (currentViewMode === "wishlist") {
      if (!isWishlist) return false;
    }

    if (status !== "all") {
      if (status === "active") {
        if (isInactiveStatus(item.statusKey) || isWishlist) return false;
      } else if (status === "wishlist") {
        if (!isWishlist) return false;
      } else if (item.statusKey !== status) {
        return false;
      }
    }
    if (!query) return true;
    return [item.brand, item.name, item.itemType, item.notes, item.category, item.provenance, item.status, ...(item.invoiceEvidence || [])].some((value) => String(value || "").toLowerCase().includes(query));
  });
}

function renderDonutChart(metrics) {
  if (!elements.categoryDonutSvg) return;
  const svg = elements.categoryDonutSvg;
  const centerWeight = elements.donutCenterWeight;
  const centerCat = elements.donutCenterCategory;
  const centerSub = document.querySelector(".donut-center-sub");
  const totalW = metrics.totalPackWeightG;

  const C = 2 * Math.PI * 90; // ~565.487

  function resetDonutCenter() {
    if (centerSub) centerSub.textContent = "BASE WEIGHT";
    if (centerWeight) centerWeight.textContent = formatWeight(metrics.baseWeightG);
    if (centerCat) centerCat.innerHTML = `<span style="opacity:0.75;">●</span> ${formatWeight(metrics.totalPackWeightG)} Carried`;
  }

  if (totalW <= 0) {
    svg.innerHTML = `<circle cx="130" cy="130" r="90" fill="transparent" stroke="#e0e7df" stroke-width="32" stroke-dasharray="${C.toFixed(2)} 0"></circle>`;
    if (centerSub) centerSub.textContent = "EMPTY PACK";
    if (centerWeight) centerWeight.textContent = formatWeight(0);
    if (centerCat) centerCat.textContent = "0 items packed";
  } else {
    let accumulatedOffset = 0;
    let circlesHtml = `<g transform="rotate(-90 130 130)">`;

    for (const cat of categories) {
      const w = metrics.categoryWeights[cat.name] || 0;
      if (w <= 0) continue;
      const frac = w / totalW;
      const dashLength = frac * C;
      const pct = (frac * 100).toFixed(1);

      circlesHtml += `<circle
        class="donut-segment"
        cx="130"
        cy="130"
        r="90"
        fill="transparent"
        stroke="${cat.color}"
        stroke-width="32"
        stroke-dasharray="${dashLength.toFixed(2)} ${(C - dashLength).toFixed(2)}"
        stroke-dashoffset="${(-accumulatedOffset).toFixed(2)}"
        data-category="${escapeHtml(cat.name)}"
        data-weight="${w}"
        data-pct="${pct}"
        data-color="${cat.color}"
      ></circle>`;

      accumulatedOffset += dashLength;
    }
    circlesHtml += `</g>`;
    svg.innerHTML = circlesHtml;
    resetDonutCenter();

    // Attach hover/focus events to donut segments
    const segments = svg.querySelectorAll(".donut-segment");
    segments.forEach((seg) => {
      seg.addEventListener("mouseenter", () => {
        segments.forEach((s) => {
          if (s !== seg) s.style.opacity = "0.35";
        });
        seg.style.strokeWidth = "40px";
        seg.style.opacity = "1";
        if (centerSub) centerSub.textContent = `${seg.dataset.pct}% OF PACK`;
        if (centerWeight) centerWeight.textContent = formatWeight(parseFloat(seg.dataset.weight));
        if (centerCat) centerCat.innerHTML = `<span style="color:${seg.dataset.color}">●</span> ${seg.dataset.category}`;
      });

      seg.addEventListener("mouseleave", () => {
        segments.forEach((s) => {
          s.style.opacity = "1";
          s.style.strokeWidth = "32px";
        });
        resetDonutCenter();
      });
    });
  }

  // Update Donut Legend
  if (elements.categoryLegend) {
    elements.categoryLegend.innerHTML = categories.map((cat) => {
      const catWeight = metrics.categoryWeights[cat.name] || 0;
      const pct = totalW > 0 ? ((catWeight / totalW) * 100).toFixed(1) : "0.0";
      return `<div class="legend-item" data-category="${escapeHtml(cat.name)}" style="cursor:pointer;">
        <span class="legend-dot" style="background:${cat.color}"></span>
        <span>${escapeHtml(cat.name)}</span>
        <strong>${formatWeight(catWeight)}</strong>
        <small style="color:#78887b">(${pct}%)</small>
      </div>`;
    }).join("");

    // Allow hovering legend items to highlight corresponding slice
    const legendItems = elements.categoryLegend.querySelectorAll(".legend-item");
    legendItems.forEach((item) => {
      item.addEventListener("mouseenter", () => {
        const catName = item.dataset.category;
        const seg = svg.querySelector(`.donut-segment[data-category="${catName}"]`);
        if (seg) seg.dispatchEvent(new Event("mouseenter"));
      });
      item.addEventListener("mouseleave", () => {
        const catName = item.dataset.category;
        const seg = svg.querySelector(`.donut-segment[data-category="${catName}"]`);
        if (seg) seg.dispatchEvent(new Event("mouseleave"));
      });
    });
  }

  // Update Worn Callout
  if (elements.donutWornVal) {
    elements.donutWornVal.textContent = formatWeight(metrics.wornWeightG);
  }
  if (elements.donutWornCount) {
    elements.donutWornCount.textContent = metrics.wornItemsCount;
  }
}

function renderCategoryProgressBar(metrics) {
  if (elements.categoryBarTotalLabel) {
    elements.categoryBarTotalLabel.textContent = `${formatWeight(metrics.totalPackWeightG, { full: true })}`;
  }
  if (elements.categoryProgressBar) {
    if (metrics.totalPackWeightG > 0) {
      elements.categoryProgressBar.innerHTML = categories.map((cat) => {
        const catWeight = metrics.categoryWeights[cat.name] || 0;
        const pct = ((catWeight / metrics.totalPackWeightG) * 100).toFixed(1);
        if (catWeight <= 0) return "";
        return `<div class="category-segment" style="width:${pct}%; background:${cat.color};" title="${cat.name}: ${formatWeight(catWeight)} (${pct}%)"></div>`;
      }).join("");
    } else {
      elements.categoryProgressBar.innerHTML = `<div class="category-segment" style="width:100%; background:#d5dcd2;" title="Empty pack"></div>`;
    }
  }

  if (elements.categoryBarLegend) {
    elements.categoryBarLegend.innerHTML = categories.map((cat) => {
      const catWeight = metrics.categoryWeights[cat.name] || 0;
      const pct = metrics.totalPackWeightG > 0 ? ((catWeight / metrics.totalPackWeightG) * 100).toFixed(0) : 0;
      return `<div class="legend-item"><span class="legend-dot" style="background:${cat.color}"></span><span>${cat.name}</span><strong>${formatWeight(catWeight)}</strong> <small style="color:#809083">(${pct}%)</small></div>`;
    }).join("");
  }
}

function renderPlanner() {
  const trail = getActiveTrail();
  if (!trail) return;

  if (elements.guideActiveTrail) {
    elements.guideActiveTrail.textContent = trail.name;
  }

  // 1. Selector
  if (elements.activeTrailSelect) {
    elements.activeTrailSelect.innerHTML = trails.map((t) => {
      const isSel = t.id === trail.id ? "selected" : "";
      const statusIcon = t.status === "completed" ? "✓" : t.status === "in-progress" ? "⏳" : "📍";
      return `<option value="${escapeHtml(t.id)}" ${isSel}>${statusIcon} ${escapeHtml(t.name)} (${escapeHtml(t.destination || "Expedition")})</option>`;
    }).join("");
  }

  // 2. Banner
  if (elements.bannerTrailName) {
    elements.bannerTrailName.textContent = trail.name;
    elements.bannerRegion.textContent = trail.destination || "Expedition Region";
    elements.bannerDistance.textContent = trail.distanceKm ? `${trail.distanceKm} km` : "Distance TBD";
    elements.bannerDuration.textContent = trail.durationDays ? `${trail.durationDays} Days` : "Days TBD";
    elements.bannerDate.textContent = trail.date || "Date not set";
    elements.bannerNotes.textContent = trail.notes || "No specific field notes recorded for this trail yet.";

    const statusMap = {
      planned: "Planned · Next Destination",
      "in-progress": "In Progress · On Trail",
      completed: "Completed · Hiked",
    };
    elements.bannerStatusPill.className = `trail-status-pill ${trail.status || "planned"}`;
    elements.bannerStatusPill.textContent = statusMap[trail.status] || "Planned";

    elements.btnToggleCompleteTrail.textContent = trail.status === "completed" ? "↩ Revert to Planned" : "✓ Mark as Completed";
  }

  // 3. Weight Dashboard (5 Ultralight Metrics)
  const metrics = calculatePackMetrics(trail);
  const isImp = currentUnit === "imperial";

  if (elements.metricTotalG) {
    const totalLb = metrics.totalPackWeightG / 453.59237;
    const totalOz = metrics.totalPackWeightG * 0.03527396195;
    const baseLb = metrics.baseWeightG / 453.59237;
    const baseOz = metrics.baseWeightG * 0.03527396195;
    const wornLb = metrics.wornWeightG / 453.59237;
    const wornOz = metrics.wornWeightG * 0.03527396195;
    const skinLb = metrics.skinOutWeightG / 453.59237;
    const skinOz = metrics.skinOutWeightG * 0.03527396195;
    const wishLb = metrics.wishlistWeightG / 453.59237;

    // 1. Pack Carried Load
    if (isImp) {
      elements.metricTotalG.textContent = totalLb.toFixed(2);
      if (elements.metricTotalUnit) elements.metricTotalUnit.textContent = "lb";
      elements.metricTotalKg.textContent = `${totalOz.toFixed(1)} oz carried load on back`;
    } else {
      elements.metricTotalG.textContent = new Intl.NumberFormat("en-AU").format(metrics.totalPackWeightG);
      if (elements.metricTotalUnit) elements.metricTotalUnit.textContent = "g";
      if (metrics.wishlistItemsCount > 0) {
        elements.metricTotalKg.innerHTML = `<strong>${(metrics.ownedWeightG / 1000).toFixed(2)} kg</strong> owned + <strong>${(metrics.wishlistWeightG / 1000).toFixed(2)} kg</strong> wishlist (${metrics.wishlistItemsCount} items)`;
      } else {
        elements.metricTotalKg.textContent = `${metrics.totalPackWeightKg.toFixed(2)} kg carried load on back`;
      }
    }

    // 2. Base Weight
    if (isImp) {
      elements.metricBaseG.textContent = baseLb.toFixed(2);
      if (elements.metricBaseUnit) elements.metricBaseUnit.textContent = "lb";
      elements.metricBaseKg.textContent = `${baseOz.toFixed(1)} oz pack base weight`;
    } else {
      elements.metricBaseG.textContent = new Intl.NumberFormat("en-AU").format(metrics.baseWeightG);
      if (elements.metricBaseUnit) elements.metricBaseUnit.textContent = "g";
      elements.metricBaseKg.textContent = `${metrics.baseWeightKg.toFixed(2)} kg pack base weight`;
    }

    // 3. Worn Weight
    if (elements.metricWornG) {
      if (isImp) {
        elements.metricWornG.textContent = wornLb.toFixed(2);
        if (elements.metricWornUnit) elements.metricWornUnit.textContent = "lb";
        elements.metricWornSub.textContent = `${wornOz.toFixed(1)} oz shoes, clothes & poles (${metrics.wornItemsCount} items)`;
      } else {
        elements.metricWornG.textContent = new Intl.NumberFormat("en-AU").format(metrics.wornWeightG);
        if (elements.metricWornUnit) elements.metricWornUnit.textContent = "g";
        elements.metricWornSub.textContent = `${(metrics.wornWeightG / 1000).toFixed(2)} kg shoes, clothes & poles (${metrics.wornItemsCount} items)`;
      }
    }

    // 4. Skin-Out Total
    if (elements.metricSkinoutG) {
      if (isImp) {
        elements.metricSkinoutG.textContent = skinLb.toFixed(2);
        if (elements.metricSkinoutUnit) elements.metricSkinoutUnit.textContent = "lb";
        elements.metricSkinoutSub.textContent = `${skinOz.toFixed(1)} oz total carried + worn load`;
      } else {
        elements.metricSkinoutG.textContent = new Intl.NumberFormat("en-AU").format(metrics.skinOutWeightG);
        if (elements.metricSkinoutUnit) elements.metricSkinoutUnit.textContent = "g";
        elements.metricSkinoutSub.textContent = `${(metrics.skinOutWeightG / 1000).toFixed(2)} kg pack load + worn on body`;
      }
    }

    // 5. Wishlist Simulator
    if (elements.metricWishlistG) {
      if (isImp) {
        elements.metricWishlistG.textContent = metrics.wishlistWeightG > 0 ? `+${wishLb.toFixed(2)}` : "+0";
        if (elements.metricWishlistUnit) elements.metricWishlistUnit.textContent = "lb";
      } else {
        elements.metricWishlistG.textContent = metrics.wishlistWeightG > 0 ? `+${new Intl.NumberFormat("en-AU").format(metrics.wishlistWeightG)}` : "+0";
        if (elements.metricWishlistUnit) elements.metricWishlistUnit.textContent = "g";
      }
      elements.metricWishlistSummary.textContent = metrics.wishlistItemsCount > 0
        ? `✨ ${metrics.wishlistItemsCount} prospective item(s) on trial in pack`
        : "0 prospective items on trial";
    }
  }

  // Header & Sticky Pack pill
  if (elements.headerTrailName) {
    elements.headerTrailName.textContent = trail.name;
    elements.headerPackWeight.textContent = formatWeight(metrics.totalPackWeightG, { onlyKg: currentUnit === "metric", onlyLb: currentUnit === "imperial" });
    if (elements.stickyTrailName) elements.stickyTrailName.textContent = trail.name;
    if (elements.stickyItemCount) elements.stickyItemCount.textContent = metrics.totalItems;
    if (elements.stickyWeight) elements.stickyWeight.textContent = formatWeight(metrics.totalPackWeightG, { full: true });
  }

  // Unit switcher button active state
  if (elements.btnUnitMetric && elements.btnUnitImperial) {
    elements.btnUnitMetric.classList.toggle("active", currentUnit === "metric");
    elements.btnUnitImperial.classList.toggle("active", currentUnit === "imperial");
  }

  // View toggle between Donut Chart and Linear Bar
  if (elements.btnChartDonut && elements.btnChartBar) {
    elements.btnChartDonut.classList.toggle("active", currentChartType === "donut");
    elements.btnChartBar.classList.toggle("active", currentChartType === "bar");
  }
  if (elements.donutChartView && elements.linearBarView) {
    elements.donutChartView.hidden = currentChartType !== "donut";
    elements.linearBarView.hidden = currentChartType !== "bar";
  }

  // 4. Render Donut Chart & Linear Bar
  renderDonutChart(metrics);
  renderCategoryProgressBar(metrics);

  // 5. Missing alert
  if (elements.missingWeightsAlert) {
    if (metrics.missingCount > 0) {
      elements.missingWeightsAlert.hidden = false;
      elements.missingWeightsAlert.style.display = "flex";
      elements.missingWeightsText.textContent = `${metrics.missingCount} packed item${metrics.missingCount > 1 ? "s do" : " does"} not have listed weight recorded and ${metrics.missingCount > 1 ? "are" : "is"} excluded from the total calculation.`;
    } else {
      elements.missingWeightsAlert.hidden = true;
      elements.missingWeightsAlert.style.display = "none";
    }
  }

  // 6. Packed Items List
  if (elements.packedItemsList) {
    elements.packedItemsCount.textContent = metrics.totalItems;

    const packedEntries = Object.entries(trail.pack || {}).filter(([_, qty]) => qty > 0);
    if (!packedEntries.length) {
      elements.packedItemsList.innerHTML = `<div class="empty-pack">
        <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="#92a294" stroke-width="1.2"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
        <h4>Pack is currently empty</h4>
        <p>You haven't selected any gears for ${escapeHtml(trail.name)} yet. Browse the inventory below and click <strong>+ Pack for ${escapeHtml(trail.name)}</strong> on any item.</p>
        <a class="btn-primary" href="#collection">Browse Gear Collection ↓</a>
      </div>`;
    } else {
      let html = "";
      for (const cat of categories) {
        const catItems = packedEntries
          .map(([id, qty]) => ({ item: gear.find((g) => g.id === id), qty }))
          .filter(({ item }) => item && item.category === cat.name);

        if (!catItems.length) continue;
        const catSubtotal = catItems.reduce((acc, { item, qty }) => {
          if (!Number.isFinite(item.unitWeightG)) return acc;
          const split = Number(trail.shared?.[item.id]) || 1;
          return acc + (item.unitWeightG * qty) / split;
        }, 0);

        html += `<div class="packed-category-group" style="--group-color:${cat.color}">
          <div class="packed-category-title">
            <span>${cat.name} (${catItems.length} items)</span>
            <span>Subtotal: ${formatWeight(catSubtotal)}</span>
          </div>`;

        for (const { item, qty } of catItems) {
          const isWishlist = (item.statusKey || normalizeStatus(item.status)) === "wishlist";
          const isWorn = Boolean(trail.worn?.[item.id]);
          const splitRatio = Number(trail.shared?.[item.id]) || 1;
          const isShared = splitRatio > 1;

          const thumb = item.imagePath
            ? `<img class="packed-item-thumb" src="${escapeHtml(item.imagePath)}" alt="${escapeHtml(item.name || "")}" />`
            : `<div class="packed-item-thumb placeholder">${escapeHtml(item.itemType ? item.itemType.slice(0, 4).toUpperCase() : "GEAR")}</div>`;

          const unitW = Number.isFinite(item.unitWeightG) ? item.unitWeightG : null;
          const fullLineWeight = unitW !== null ? unitW * qty : null;
          const effectiveLineWeight = unitW !== null ? fullLineWeight / splitRatio : null;

          const wishlistChip = isWishlist ? `<span class="packed-wishlist-chip" title="Prospective gear tested in pack">✨ 想买待购</span>` : "";
          const wornChip = isWorn ? `<span class="packed-worn-chip" title="Worn on body (excluded from backpack weight)">👕 Worn</span>` : "";
          const sharedChip = isShared ? `<span class="packed-shared-chip" title="Shared with ${splitRatio} teammates">👥 1/${splitRatio} Share</span>` : "";

          const convertBtn = isWishlist
            ? `<button class="btn-pack-mark-bought" data-convert-id="${escapeHtml(item.id)}" type="button" title="I purchased this! Move to Owned collection">✓ Bought</button>`
            : "";

          html += `<div class="packed-item-row ${isWishlist ? "is-wishlist-packed-row" : ""} ${isWorn ? "is-worn-row" : ""}" data-item-id="${escapeHtml(item.id)}">
            ${thumb}
            <div class="packed-item-details">
              <div class="packed-item-brand">
                <span>${escapeHtml(item.brand || "Brand not recorded")}</span>
                ${wishlistChip}
                ${wornChip}
                ${sharedChip}
              </div>
              <div class="packed-item-name" title="${escapeHtml(item.name || item.itemType)}">${escapeHtml(item.name || item.itemType)}</div>
            </div>

            <div class="packed-item-modifiers">
              <button class="btn-toggle-worn ${isWorn ? "active" : ""}" data-worn-id="${escapeHtml(item.id)}" type="button" title="${isWorn ? "Move to backpack carried load" : "Mark as worn on body (excludes from backpack weight)"}">
                ${isWorn ? "👕 Worn" : "🎒 In Pack"}
              </button>
              <button class="btn-toggle-shared ${isShared ? "active" : ""}" data-shared-id="${escapeHtml(item.id)}" type="button" title="Split gear weight with partner (current: 1/${splitRatio})">
                👥 1/${splitRatio}
              </button>
              ${convertBtn}
            </div>

            <div class="qty-stepper">
              <button class="btn-qty-minus" data-id="${escapeHtml(item.id)}" type="button" aria-label="Decrease quantity">−</button>
              <input type="number" class="planner-qty-input" data-id="${escapeHtml(item.id)}" value="${qty}" min="1" max="99" aria-label="Quantity for ${escapeHtml(item.name || item.itemType)}" />
              <button class="btn-qty-plus" data-id="${escapeHtml(item.id)}" type="button" aria-label="Increase quantity">+</button>
            </div>

            <div class="packed-item-weight">
              ${formatWeight(effectiveLineWeight)}
              ${isShared ? `<small class="shared-weight-detail">Full: ${formatWeight(fullLineWeight)}</small>` : (qty > 1 && unitW ? `<small>${formatWeight(unitW)} each</small>` : "")}
              ${isWorn ? `<small class="worn-weight-note">(worn)</small>` : ""}
            </div>

            <button class="packed-item-remove" data-id="${escapeHtml(item.id)}" type="button" aria-label="Remove ${escapeHtml(item.name)} from pack">✕</button>
          </div>`;
        }
        html += `</div>`;
      }
      elements.packedItemsList.innerHTML = html;
    }
  }

  // 7. Update sticky bar visibility
  updateStickyBar();
}

function renderTrailLog() {
  if (!elements.trailLogGrid) return;

  const totalTrails = trails.length;
  const completedTrails = trails.filter((t) => t.status === "completed").length;
  const plannedTrails = trails.filter((t) => t.status !== "completed").length;

  if (elements.countAllTrails) elements.countAllTrails.textContent = totalTrails;
  if (elements.countCompletedTrails) elements.countCompletedTrails.textContent = completedTrails;
  if (elements.countPlannedTrails) elements.countPlannedTrails.textContent = plannedTrails;

  const filtered = trails.filter((t) => {
    if (currentLogFilter === "completed") return t.status === "completed";
    if (currentLogFilter === "planned") return t.status !== "completed";
    return true;
  });

  elements.trailLogGrid.innerHTML = filtered.map((t) => {
    const metrics = calculatePackMetrics(t);
    const isActive = t.id === activeTrailId;
    const statusMap = {
      planned: "Planned · Upcoming",
      "in-progress": "In Progress · Active",
      completed: "Completed · Hiked",
    };

    const packedNames = Object.entries(t.pack || {})
      .filter(([_, qty]) => qty > 0)
      .map(([id]) => gear.find((g) => g.id === id)?.name)
      .filter(Boolean)
      .slice(0, 3)
      .join(", ");

    return `<article class="trail-card ${isActive ? "is-active-trail" : ""}" data-trail-id="${escapeHtml(t.id)}">
      <div class="trail-card-top">
        <span class="trail-status-pill ${t.status || "planned"}">${statusMap[t.status] || "Planned"}</span>
        <span style="font-size:11px; font-weight:700; color:#78867a;">${escapeHtml(t.date || "")}</span>
      </div>
      <h3>${escapeHtml(t.name)}</h3>
      <div class="trail-card-region">📍 ${escapeHtml(t.destination || "Expedition route")}</div>
      
      <div class="trail-card-metrics">
        <div class="trail-card-metric">
          <span>Distance</span>
          <strong>${t.distanceKm ? `${t.distanceKm} km` : "—"}</strong>
        </div>
        <div class="trail-card-metric">
          <span>Duration</span>
          <strong>${t.durationDays ? `${t.durationDays} Days` : "—"}</strong>
        </div>
        <div class="trail-card-metric">
          <span>Pack Load</span>
          <strong>${metrics.totalWeightKg.toFixed(2)} kg</strong>
        </div>
      </div>

      <p class="trail-card-notes">${escapeHtml(t.notes || "No notes recorded.")}</p>

      ${packedNames ? `<div class="trail-card-gear-summary"><span>🎒</span><span>${metrics.totalItems} items (${escapeHtml(packedNames)}...)</span></div>` : ""}

      <div class="trail-card-actions">
        ${isActive
          ? `<button class="btn-primary btn-pack-now" data-id="${escapeHtml(t.id)}" type="button">🎒 Currently Active (Pack Gear Below ↓)</button>`
          : `<button class="btn-primary btn-switch-trail" data-id="${escapeHtml(t.id)}" type="button">🎒 Pack for this Trail ↓</button>`}
        <button class="btn-secondary btn-view-weights" data-id="${escapeHtml(t.id)}" type="button">📊 Weights</button>
        <button class="btn-secondary btn-edit-trail-card" data-id="${escapeHtml(t.id)}" type="button">Edit</button>
      </div>
    </article>`;
  }).join("");
}

function updateStickyBar() {
  if (!elements.stickyBar) return;
  const plannerRect = document.querySelector("#trail-planner")?.getBoundingClientRect();
  const collectionRect = document.querySelector("#collection")?.getBoundingClientRect();

  // Show when user is scrolling through collection or past planner
  const show = collectionRect && collectionRect.top < window.innerHeight && collectionRect.bottom > 150;
  if (show) {
    elements.stickyBar.classList.remove("hidden");
  } else {
    elements.stickyBar.classList.add("hidden");
  }
}

function render() {
  const ownedCount = gear.filter((g) => (g.statusKey || normalizeStatus(g.status)) !== "wishlist").length;
  const wishlistCount = gear.filter((g) => (g.statusKey || normalizeStatus(g.status)) === "wishlist").length;
  if (elements.badgeCountOwned) elements.badgeCountOwned.textContent = ownedCount;
  if (elements.badgeCountWishlist) elements.badgeCountWishlist.textContent = wishlistCount;
  if (elements.badgeCountAll) elements.badgeCountAll.textContent = gear.length;

  elements.tabViewOwned?.classList.toggle("active", currentViewMode === "owned");
  elements.tabViewWishlist?.classList.toggle("active", currentViewMode === "wishlist");
  elements.tabViewAll?.classList.toggle("active", currentViewMode === "all");

  const activeTrail = getActiveTrail();
  if (currentViewMode === "wishlist") {
    if (elements.wishlistHeroBanner) {
      elements.wishlistHeroBanner.hidden = false;
      const wishlistAll = gear.filter((g) => (g.statusKey || normalizeStatus(g.status)) === "wishlist");
      const totalWishlistWeight = wishlistAll.reduce((acc, g) => acc + (Number.isFinite(g.unitWeightG) ? g.unitWeightG : 0), 0);
      const packedWishlistCount = Object.keys(activeTrail?.pack || {}).filter((id) => wishlistAll.some((w) => w.id === id && (activeTrail.pack[id] || 0) > 0)).length;
      const totalWishlistCost = wishlistAll.reduce((acc, g) => acc + (Number.isFinite(g.unitPriceAud) ? g.unitPriceAud : 0), 0);

      if (elements.wishlistActiveTrailName) elements.wishlistActiveTrailName.textContent = activeTrail?.name || "Active Expedition";
      if (elements.statWishlistCount) elements.statWishlistCount.textContent = wishlistAll.length;
      if (elements.statWishlistWeight) elements.statWishlistWeight.textContent = `${new Intl.NumberFormat("en-AU").format(totalWishlistWeight)} g`;
      if (elements.statWishlistPacked) elements.statWishlistPacked.textContent = packedWishlistCount;
      if (elements.statWishlistCost) elements.statWishlistCost.textContent = `$${new Intl.NumberFormat("en-AU").format(totalWishlistCost)} AUD`;
    }
    if (elements.collectionKicker) elements.collectionKicker.textContent = "✨ PROSPECTIVE GEAR LAB & UPGRADE SIMULATOR";
    if (elements.collectionTitle) elements.collectionTitle.textContent = "Wishlist & Trail Weight Trials.";
    if (elements.collectionDesc) elements.collectionDesc.textContent = "Prospective gear you plan to buy or test. Adjust pack quantities to simulate trail load, compare weight differences, and one-click convert to Owned once purchased.";
  } else {
    if (elements.wishlistHeroBanner) elements.wishlistHeroBanner.hidden = true;
    if (elements.collectionKicker) elements.collectionKicker.textContent = currentViewMode === "all" ? "COMPLETE REPERTOIRE" : "MASTER GEAR INVENTORY";
    if (elements.collectionTitle) elements.collectionTitle.textContent = currentViewMode === "all" ? "All Owned & Planned Gear." : "Built for the trail.";
    if (elements.collectionDesc) elements.collectionDesc.textContent = currentViewMode === "all" ? "Explore all items in your kit, including currently owned equipment and prospective wishlist candidates." : "Browse by system, search for a specific piece, or compare recorded weight and price across your owned kit.";
  }

  const items = filteredItems();
  elements.count.textContent = `SHOWING ${items.length} OF ${gear.length} ITEMS`;
  elements.empty.hidden = items.length !== 0;
  elements.nav.innerHTML = categories.map((category) => {
    const count = items.filter((item) => item.category === category.name).length;
    return count ? `<a href="#${category.id}">${category.name}<small>${String(count).padStart(2, "0")}</small></a>` : "";
  }).join("");
  elements.sections.innerHTML = categories.map((category, index) => {
    const categoryItems = sortedItems(items.filter((item) => item.category === category.name));
    if (!categoryItems.length) return "";
    return `<section class="gear-section" id="${category.id}" aria-labelledby="${category.id}-title" style="--section-color:${category.color}">
      <div class="section-heading"><div class="section-heading-left"><span class="section-number">${String(index + 1).padStart(2, "0")}</span><h3 id="${category.id}-title">${category.name}</h3></div><p>${category.description}</p></div>
      <div class="gear-grid">${categoryItems.map((item) => renderCard(item, category)).join("")}</div>
    </section>`;
  }).join("");
  for (const image of elements.sections.querySelectorAll(".product-image")) {
    image.addEventListener("error", () => {
      const item = gear.find((record) => image.closest(".gear-card")?.id === `item-${record.id}`);
      if (item) image.closest(".card-media").outerHTML = mediaMarkup({ ...item, imagePath: null });
    }, { once: true });
  }

  renderPlanner();
  renderTrailLog();
}

// Modal logic
function openTrailModal(trail = null) {
  if (!elements.trailModal) return;
  elements.trailForm.reset();
  if (trail) {
    elements.modalTrailTitle.textContent = "Edit Trail Details";
    elements.formTrailId.value = trail.id;
    elements.formTrailName.value = trail.name || "";
    elements.formTrailDestination.value = trail.destination || "";
    elements.formTrailStatus.value = trail.status || "planned";
    elements.formTrailDistance.value = trail.distanceKm || "";
    elements.formTrailDuration.value = trail.durationDays || "";
    elements.formTrailDate.value = trail.date || "";
    elements.formTrailNotes.value = trail.notes || "";
    if (elements.formTemplateRow) elements.formTemplateRow.style.display = "none";
    if (elements.btnSubmitTrail) elements.btnSubmitTrail.textContent = "Save Changes";
  } else {
    elements.modalTrailTitle.textContent = "Plan a New Expedition (新建徒步计划)";
    elements.formTrailId.value = "";
    elements.formTrailStatus.value = "planned";
    if (elements.formTemplateRow) elements.formTemplateRow.style.display = "block";
    if (elements.btnSubmitTrail) elements.btnSubmitTrail.textContent = "Save & Start Packing Gear ↓";
  }
  elements.trailModal.classList.add("open");
  elements.formTrailName.focus();
}

function closeTrailModal() {
  elements.trailModal?.classList.remove("open");
}

function exportLighterPackCsv() {
  const trail = getActiveTrail();
  if (!trail) return;

  const rows = [
    ["Category", "Item Name", "Description", "Weight", "Unit", "Quantity", "Worn", "Consumable", "Price"]
  ];

  const unitStr = currentUnit === "imperial" ? "oz" : "g";

  for (const [itemId, rawQty] of Object.entries(trail.pack || {})) {
    const qty = Number(rawQty) || 0;
    if (qty <= 0) continue;
    const item = gear.find((g) => g.id === itemId);
    if (!item) continue;

    const isWorn = trail.worn?.[itemId] ? 1 : 0;
    const isConsum = isConsumable(item) ? 1 : 0;
    const price = Number.isFinite(item.unitPriceAud) ? item.unitPriceAud : Number.isFinite(item.unitPriceCny) ? item.unitPriceCny : "";

    let weightVal = "";
    if (Number.isFinite(item.unitWeightG)) {
      if (unitStr === "oz") {
        weightVal = (item.unitWeightG * 0.03527396195).toFixed(2);
      } else {
        weightVal = item.unitWeightG;
      }
    }

    const descParts = [];
    if (item.brand) descParts.push(item.brand);
    if (item.size) descParts.push(`Size: ${item.size}`);
    if (item.summary) descParts.push(item.summary);
    const desc = descParts.join(" · ");

    rows.push([
      item.category || "Packs & Essentials",
      item.name || item.itemType || "Gear Item",
      desc,
      weightVal,
      unitStr,
      qty,
      isWorn,
      isConsum,
      price
    ]);
  }

  const csvContent = rows.map((r) => r.map((c) => {
    const str = c === null || c === undefined ? "" : String(c);
    if (str.includes(",") || str.includes('"') || str.includes("\n")) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return `"${str}"`;
  }).join(",")).join("\r\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  const slug = (trail.name || "pack").toLowerCase().replace(/[^a-z0-9]+/g, "-");
  a.href = url;
  a.download = `${slug}-lighterpack.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  showToast(`📥 Exported <strong>${escapeHtml(trail.name)}</strong> to <strong>${slug}-lighterpack.csv</strong>!`);
}

function parseCsvLine(line) {
  const result = [];
  let cur = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (c === '"') {
      if (inQuotes && line[i + 1] === '"') {
        cur += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (c === "," && !inQuotes) {
      result.push(cur.trim());
      cur = "";
    } else {
      cur += c;
    }
  }
  result.push(cur.trim());
  return result;
}

function importLighterPackCsv(file) {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const text = e.target.result;
      const lines = text.split(/\r?\n/).filter((l) => l.trim().length > 0);
      if (lines.length < 2) {
        showToast("⚠️ The selected CSV file is empty or does not contain data rows.");
        return;
      }

      const headers = parseCsvLine(lines[0]).map((h) => h.toLowerCase().replace(/[^a-z0-9]/g, ""));
      const colCategory = headers.findIndex((h) => h.includes("cat"));
      const colName = headers.findIndex((h) => h.includes("name") || h.includes("item"));
      const colDesc = headers.findIndex((h) => h.includes("desc"));
      const colWeight = headers.findIndex((h) => h.includes("weight") || h.includes("wt"));
      const colUnit = headers.findIndex((h) => h.includes("unit"));
      const colQty = headers.findIndex((h) => h.includes("qty") || h.includes("quant"));
      const colWorn = headers.findIndex((h) => h.includes("worn"));
      const colConsum = headers.findIndex((h) => h.includes("consum"));
      const colPrice = headers.findIndex((h) => h.includes("price") || h.includes("cost"));

      const trail = getActiveTrail();
      if (!trail) return;
      trail.pack = trail.pack || {};
      trail.worn = trail.worn || {};
      trail.shared = trail.shared || {};

      let importedCount = 0;
      let newItemsCreated = 0;

      for (let i = 1; i < lines.length; i++) {
        const row = parseCsvLine(lines[i]);
        if (!row || row.length === 0 || !row.some((cell) => cell.length > 0)) continue;

        const rawName = colName >= 0 && row[colName] ? row[colName].trim() : "";
        if (!rawName) continue;

        const rawCat = colCategory >= 0 && row[colCategory] ? row[colCategory].trim() : "";
        const rawDesc = colDesc >= 0 && row[colDesc] ? row[colDesc].trim() : "";
        const rawWeight = colWeight >= 0 && row[colWeight] ? parseFloat(row[colWeight].replace(/[^0-9.]/g, "")) : NaN;
        const rawUnit = colUnit >= 0 && row[colUnit] ? row[colUnit].trim().toLowerCase() : (currentUnit === "imperial" ? "oz" : "g");
        const rawQty = colQty >= 0 && row[colQty] ? parseInt(row[colQty], 10) : 1;
        const qty = Number.isFinite(rawQty) && rawQty > 0 ? rawQty : 1;
        const rawWorn = colWorn >= 0 && row[colWorn] ? row[colWorn].trim().toLowerCase() : "";
        const isWorn = rawWorn === "1" || rawWorn === "true" || rawWorn === "yes" || rawWorn === "worn";
        const rawConsum = colConsum >= 0 && row[colConsum] ? row[colConsum].trim().toLowerCase() : "";
        const isConsum = rawConsum === "1" || rawConsum === "true" || rawConsum === "yes" || rawConsum === "consumable";
        const rawPrice = colPrice >= 0 && row[colPrice] ? parseFloat(row[colPrice].replace(/[^0-9.]/g, "")) : null;

        // Convert weight to grams
        let weightG = null;
        if (Number.isFinite(rawWeight)) {
          if (rawUnit === "oz" || rawUnit === "ounce" || rawUnit === "ounces") {
            weightG = Math.round(rawWeight * 28.349523);
          } else if (rawUnit === "lb" || rawUnit === "lbs" || rawUnit === "pound" || rawUnit === "pounds") {
            weightG = Math.round(rawWeight * 453.59237);
          } else if (rawUnit === "kg") {
            weightG = Math.round(rawWeight * 1000);
          } else {
            weightG = Math.round(rawWeight);
          }
        }

        // Map Category to one of our standard 6 categories
        let matchedCat = categories.find((c) => c.name.toLowerCase() === rawCat.toLowerCase());
        if (!matchedCat) {
          const lower = rawCat.toLowerCase();
          if (lower.includes("sleep") || lower.includes("shelter") || lower.includes("tent") || lower.includes("bag")) {
            matchedCat = categories[0];
          } else if (lower.includes("pack") || lower.includes("pole") || lower.includes("light") || lower.includes("essential")) {
            matchedCat = categories[1];
          } else if (lower.includes("cook") || lower.includes("stove") || lower.includes("water") || lower.includes("hydration")) {
            matchedCat = categories[2];
          } else if (lower.includes("food") || lower.includes("meal") || lower.includes("snack") || isConsum) {
            matchedCat = categories[3];
          } else if (lower.includes("cloth") || lower.includes("wear") || lower.includes("shoe") || lower.includes("boot") || lower.includes("layer")) {
            matchedCat = categories[4];
          } else {
            matchedCat = categories[5];
          }
        }

        // Check if item already exists in inventory
        let existingItem = gear.find((g) => (g.name || "").toLowerCase() === rawName.toLowerCase());
        if (!existingItem) {
          const newId = `imported-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
          existingItem = {
            id: newId,
            name: rawName,
            brand: rawDesc.split("·")[0]?.trim() || "Imported Gear",
            category: matchedCat.name,
            itemType: isConsum ? "trail meal" : "gear item",
            unitWeightG: weightG,
            unitPriceAud: Number.isFinite(rawPrice) ? rawPrice : null,
            status: "使用中",
            statusKey: "in_use",
            summary: rawDesc || `Imported from LighterPack CSV into ${trail.name}`,
            notes: "Imported from LighterPack CSV file.",
            custom: true,
          };
          gear.push(existingItem);
          newItemsCreated++;
        }

        // Add to active trail pack
        trail.pack[existingItem.id] = (trail.pack[existingItem.id] || 0) + qty;
        if (isWorn) {
          trail.worn[existingItem.id] = true;
        }

        importedCount++;
      }

      saveInventory();
      saveTrails();
      render();
      showToast(`📥 Successfully imported <strong>${importedCount} item(s)</strong> (${newItemsCreated} new to inventory) from LighterPack CSV into <strong>${escapeHtml(trail.name)}</strong>!`);
    } catch (err) {
      console.error("Failed to parse LighterPack CSV", err);
      showToast("⚠️ Could not parse CSV file. Please make sure it is a valid LighterPack CSV format.");
    }
  };
  reader.readAsText(file);
}

function openExportModal() {
  const trail = getActiveTrail();
  if (!trail) return;
  const metrics = calculatePackMetrics(trail);

  let text = `# ${trail.name} — Expedition Gear Pack\n`;
  text += `Destination: ${trail.destination || "N/A"}\n`;
  text += `Status: ${trail.status.toUpperCase()} | Distance: ${trail.distanceKm || "—"} km | Duration: ${trail.durationDays || "—"} days\n`;
  text += `Target Date: ${trail.date || "N/A"}\n\n`;
  text += `--------------------------------------------------\n`;
  text += `PACK CARRIED LOAD: ${formatWeight(metrics.totalPackWeightG, { full: true })}\n`;
  text += `BASE WEIGHT (excl. consumables & worn): ${formatWeight(metrics.baseWeightG, { full: true })}\n`;
  text += `CONSUMABLES (food, fuel, tabs): ${formatWeight(metrics.consumableWeightG, { full: true })}\n`;
  text += `WORN ON BODY (shoes, clothes, poles): ${formatWeight(metrics.wornWeightG, { full: true })} (${metrics.wornItemsCount} items)\n`;
  text += `SKIN-OUT TOTAL LOAD: ${formatWeight(metrics.skinOutWeightG, { full: true })}\n`;
  text += `TOTAL ITEMS: ${metrics.totalItems}\n`;
  text += `--------------------------------------------------\n\n`;

  for (const cat of categories) {
    const catItems = Object.entries(trail.pack || {})
      .filter(([_, qty]) => qty > 0)
      .map(([id, qty]) => ({ item: gear.find((g) => g.id === id), qty }))
      .filter(({ item }) => item && item.category === cat.name);

    if (!catItems.length) continue;
    const catSubtotal = catItems.reduce((acc, { item, qty }) => {
      if (!Number.isFinite(item.unitWeightG)) return acc;
      const split = Number(trail.shared?.[item.id]) || 1;
      return acc + (item.unitWeightG * qty) / split;
    }, 0);
    text += `### ${cat.name} (${catItems.length} items — ${formatWeight(catSubtotal)})\n`;

    for (const { item, qty } of catItems) {
      const isWorn = trail.worn?.[item.id];
      const split = Number(trail.shared?.[item.id]) || 1;
      const unitW = item.unitWeightG;
      let weightStr = "weight not recorded";
      if (Number.isFinite(unitW)) {
        const lineW = (unitW * qty) / split;
        weightStr = formatWeight(lineW);
        if (split > 1) weightStr += ` (1/${split} split of ${formatWeight(unitW * qty)})`;
      }
      const wornTag = isWorn ? " [WORN ON BODY]" : "";
      text += `- [x] ${qty > 1 ? `${qty}x ` : ""}${item.brand ? `${item.brand} ` : ""}${item.name || item.itemType} — ${weightStr}${wornTag}\n`;
    }
    text += `\n`;
  }

  if (trail.notes) {
    text += `Field Notes:\n${trail.notes}\n`;
  }

  elements.exportTextArea.value = text;
  elements.exportModal.classList.add("open");
}

function closeExportModal() {
  elements.exportModal?.classList.remove("open");
}

function openGearModal(item = null, defaultStatus = null) {
  if (!elements.gearModal || !elements.gearForm) return;
  elements.gearForm.reset();
  if (item) {
    elements.modalGearTitle.textContent = "Edit Gear Item (编辑装备)";
    elements.formGearId.value = item.id;
    elements.formGearName.value = item.name || item.itemType || "";
    elements.formGearBrand.value = item.brand || "";
    elements.formGearCategory.value = item.category || "Sleep & Shelter";
    elements.formGearType.value = item.itemType || "";
    if (elements.formGearSize) elements.formGearSize.value = item.size || "";
    elements.formGearWeight.value = Number.isFinite(item.unitWeightG) ? item.unitWeightG : "";
    if (Number.isFinite(item.unitPriceAud)) {
      elements.formGearPrice.value = item.unitPriceAud;
      elements.formGearCurrency.value = "AUD";
    } else if (Number.isFinite(item.unitPriceCny)) {
      elements.formGearPrice.value = item.unitPriceCny;
      elements.formGearCurrency.value = "CNY";
    } else {
      elements.formGearPrice.value = "";
      elements.formGearCurrency.value = "AUD";
    }
    if (elements.formGearStatus) {
      const optValues = Array.from(elements.formGearStatus.options).map((o) => o.value);
      if (optValues.includes(item.status)) {
        elements.formGearStatus.value = item.status;
      } else {
        const key = normalizeStatus(item.status);
        const match = Array.from(elements.formGearStatus.options).find((o) => normalizeStatus(o.value) === key);
        elements.formGearStatus.value = match ? match.value : (item.status || "使用中");
      }
    }
    elements.formGearWebsite.value = item.websiteUrl || "";
    elements.formGearImage.value = item.imagePath || "";
    elements.formGearSummary.value = item.summary || "";
    
    const specsLines = Object.entries(item.specs || {}).map(([k, v]) => `${k}: ${v}`).join("\n");
    elements.formGearSpecs.value = specsLines;

    elements.formGearFeatures.value = (item.features || []).join("\n");
    elements.formGearNotes.value = item.notes || "";
    elements.btnSubmitGear.textContent = "Save Changes (保存修改)";
  } else {
    const isWishlistAdd = defaultStatus === "想买" || currentViewMode === "wishlist";
    elements.modalGearTitle.textContent = isWishlistAdd ? "Add Wishlist Item (添加想买装备)" : "Add New Gear Item (新增装备到清单)";
    elements.formGearId.value = "";
    elements.formGearCurrency.value = "AUD";
    elements.formGearStatus.value = isWishlistAdd ? "想买" : "使用中";
    elements.formGearCategory.value = "Sleep & Shelter";
    if (elements.formGearSize) elements.formGearSize.value = "";
    elements.btnSubmitGear.textContent = isWishlistAdd ? "Add to Wishlist (添加至想买清单)" : "Add to Inventory (添加至清单)";
  }
  elements.gearModal.classList.add("open");
  elements.formGearName.focus();
}

function closeGearModal() {
  elements.gearModal?.classList.remove("open");
}

function deleteGearItem(itemId) {
  const item = gear.find((g) => g.id === itemId);
  if (!item) return;

  const itemDisplay = `${item.brand ? `${item.brand} ` : ""}${item.name || item.itemType || "this item"}`;
  const confirmed = confirm(
    `Are you sure you want to remove "${itemDisplay}" from your gear inventory?\n\n` +
    `• It will be deleted from your catalog.\n` +
    `• It will be removed from any active expedition packs.\n\n` +
    `You can restore original items at any time via "Reset Kit".`
  );
  if (!confirmed) return;

  const index = gear.findIndex((g) => g.id === itemId);
  if (index !== -1) {
    gear.splice(index, 1);
  }

  let removedFromTrails = 0;
  for (const t of trails) {
    if (t.pack && t.pack[itemId]) {
      delete t.pack[itemId];
      removedFromTrails++;
    }
  }
  if (removedFromTrails > 0) saveTrails();

  saveInventory();
  closeProductModal();
  render();
  updateInventoryStats();
  showToast(`Deleted <strong>${escapeHtml(itemDisplay)}</strong> from your inventory.`);
}

function resetInventory() {
  if (confirm("Reset gear inventory to the original 77 default items?\n\nAny custom added items will be discarded and default items restored.")) {
    gear = JSON.parse(JSON.stringify(defaultInventory));
    saveInventory();
    render();
    updateInventoryStats();
    showToast("Inventory restored to original 77 items.");
  }
}

async function init() {
  try {
    const response = await fetch("./gear.json", { cache: "no-store" });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    if (!Array.isArray(data)) throw new Error("Invalid gear data");
    defaultInventory = data.map((item) => ({ ...item, statusKey: normalizeStatus(item.status) }));
    loadInventory(defaultInventory);
    loadTrails();

    if (window.location.hash === "#wishlist") {
      currentViewMode = "wishlist";
    }

    updateInventoryStats();
    render();
  } catch (error) {
    elements.stats.innerHTML = "<div class='loading'><strong>Inventory unavailable</strong><p>The gear data could not be loaded.</p></div>";
    elements.count.textContent = "The collection could not be loaded.";
    console.error(error);
  }
}

// Event Listeners
for (const control of [elements.search, elements.status, elements.sort]) control.addEventListener("input", render);
elements.reset.addEventListener("click", () => { elements.search.value = ""; elements.status.value = "all"; elements.sort.value = "original"; render(); elements.search.focus(); });

// Pack toggle and multi-quantity stepper events
document.addEventListener("change", (e) => {
  // Quick status change from card
  const cardSelect = e.target.closest(".status-quick-select");
  if (cardSelect) {
    const itemId = cardSelect.dataset.statusId;
    const newStatus = cardSelect.value;
    const item = gear.find((g) => g.id === itemId);
    if (item) {
      item.status = newStatus;
      item.statusKey = normalizeStatus(newStatus);
      saveInventory();
      render();
      updateInventoryStats();
      const isInactive = isInactiveStatus(item.statusKey);
      showToast(`Status of <strong>${escapeHtml(item.name || item.itemType)}</strong> changed to <strong>${escapeHtml(newStatus)}</strong>${isInactive ? " (已设为灰显状态)" : ""}.`);
    }
    return;
  }

  // Quick status change from product modal
  const modalSelect = e.target.closest(".modal-status-select");
  if (modalSelect) {
    const itemId = modalSelect.dataset.modalStatusId;
    const newStatus = modalSelect.value;
    const item = gear.find((g) => g.id === itemId);
    if (item) {
      item.status = newStatus;
      item.statusKey = normalizeStatus(newStatus);
      saveInventory();
      render();
      updateInventoryStats();
      openProductModal(item);
      const isInactive = isInactiveStatus(item.statusKey);
      showToast(`Status of <strong>${escapeHtml(item.name || item.itemType)}</strong> changed to <strong>${escapeHtml(newStatus)}</strong>${isInactive ? " (已设为灰显状态)" : ""}.`);
    }
    return;
  }
});

document.addEventListener("click", (e) => {
  // 00. Prevent modal opening when clicking on status quick-select
  if (e.target.closest(".status-quick-select") || e.target.closest(".modal-status-select")) {
    return;
  }

  // 0a. Close modals on backdrop overlay click
  if (e.target.classList.contains("modal-overlay")) {
    closeTrailModal();
    closeExportModal();
    closeProductModal();
    closeGearModal();
    return;
  }

  // 0b. Edit gear trigger (from card or modal)
  const editTrigger = e.target.closest("[data-edit-id]");
  if (editTrigger) {
    const itemId = editTrigger.dataset.editId;
    const item = gear.find((g) => g.id === itemId);
    if (item) openGearModal(item);
    return;
  }

  // 0c. Delete gear trigger (from card or modal)
  const deleteTrigger = e.target.closest("[data-delete-id]");
  if (deleteTrigger) {
    const itemId = deleteTrigger.dataset.deleteId;
    deleteGearItem(itemId);
    return;
  }

  // 0d. Convert wishlist item to owned / in use
  const convertTrigger = e.target.closest("[data-convert-id]");
  if (convertTrigger) {
    e.stopPropagation();
    const itemId = convertTrigger.dataset.convertId;
    const item = gear.find((g) => g.id === itemId);
    if (item) {
      item.status = "使用中";
      item.statusKey = "in_use";
      saveInventory();
      render();
      updateInventoryStats();
      showToast(`🎉 <strong>${escapeHtml(item.name || item.itemType)}</strong> 已标记为已购买！已移入主装备库（状态：使用中）。`);
      if (elements.productModal?.classList.contains("open")) {
        openProductModal(item);
      }
    }
    return;
  }

  // 0e. Open product detail modal
  const detailTrigger = e.target.closest("[data-detail-id]");
  if (detailTrigger) {
    if (e.target.closest(".photo-source") || e.target.closest(".modal-photo-source")) return;
    const itemId = detailTrigger.dataset.detailId;
    const item = gear.find((g) => g.id === itemId);
    if (item) openProductModal(item);
    return;
  }

  // 0f. Toggle worn on body in pack
  const wornBtn = e.target.closest("[data-worn-id]");
  if (wornBtn) {
    e.stopPropagation();
    const itemId = wornBtn.dataset.wornId;
    const trail = getActiveTrail();
    if (trail) {
      trail.worn = trail.worn || {};
      trail.worn[itemId] = !trail.worn[itemId];
      saveTrails();
      render();
      const item = gear.find((g) => g.id === itemId);
      if (trail.worn[itemId]) {
        showToast(`👕 Marked <strong>${escapeHtml(item?.name || "Item")}</strong> as <strong>Worn on Body</strong> (excluded from pack base weight).`);
      } else {
        showToast(`🎒 Moved <strong>${escapeHtml(item?.name || "Item")}</strong> into <strong>Pack Carried Load</strong>.`);
      }
    }
    return;
  }

  // 0g. Toggle shared gear split in pack
  const sharedBtn = e.target.closest("[data-shared-id]");
  if (sharedBtn) {
    e.stopPropagation();
    const itemId = sharedBtn.dataset.sharedId;
    const trail = getActiveTrail();
    if (trail) {
      trail.shared = trail.shared || {};
      const currentSplit = Number(trail.shared[itemId]) || 1;
      const nextSplit = currentSplit >= 4 ? 1 : currentSplit + 1;
      if (nextSplit === 1) {
        delete trail.shared[itemId];
      } else {
        trail.shared[itemId] = nextSplit;
      }
      saveTrails();
      render();
      const item = gear.find((g) => g.id === itemId);
      if (nextSplit === 1) {
        showToast(`👤 <strong>${escapeHtml(item?.name || "Item")}</strong> set to <strong>Solo Carry (1/1)</strong>.`);
      } else {
        showToast(`👥 Shared <strong>${escapeHtml(item?.name || "Item")}</strong> with partner/team (carrying <strong>1/${nextSplit}</strong> of weight).`);
      }
    }
    return;
  }

  // 0c. Modal pack button
  const modalPackBtn = e.target.closest(".btn-modal-pack");
  if (modalPackBtn) {
    const itemId = modalPackBtn.dataset.id;
    const trail = getActiveTrail();
    if (trail) {
      trail.pack = trail.pack || {};
      trail.pack[itemId] = 1;
      saveTrails();
      render();
      const item = gear.find((g) => g.id === itemId);
      showToast(`Added <strong>${escapeHtml(item?.name || item?.itemType || "Item")}</strong> to ${escapeHtml(trail.name)} pack.`);
      refreshModalPackControls(itemId);
    }
    return;
  }

  // 0d. Modal stepper plus
  const modalPlusBtn = e.target.closest(".btn-modal-plus");
  if (modalPlusBtn) {
    const itemId = modalPlusBtn.dataset.id;
    const trail = getActiveTrail();
    if (trail) {
      trail.pack = trail.pack || {};
      trail.pack[itemId] = (trail.pack[itemId] || 0) + 1;
      saveTrails();
      render();
      refreshModalPackControls(itemId);
    }
    return;
  }

  // 0e. Modal stepper minus
  const modalMinusBtn = e.target.closest(".btn-modal-minus");
  if (modalMinusBtn) {
    const itemId = modalMinusBtn.dataset.id;
    const trail = getActiveTrail();
    if (trail && trail.pack?.[itemId]) {
      trail.pack[itemId] -= 1;
      if (trail.pack[itemId] <= 0) {
        delete trail.pack[itemId];
        const item = gear.find((g) => g.id === itemId);
        showToast(`Removed <strong>${escapeHtml(item?.name || item?.itemType || "Item")}</strong> from pack.`);
      }
      saveTrails();
      render();
      refreshModalPackControls(itemId);
    }
    return;
  }

  // 0f. Modal remove button
  const modalRemoveBtn = e.target.closest(".btn-modal-remove");
  if (modalRemoveBtn) {
    const itemId = modalRemoveBtn.dataset.id;
    const trail = getActiveTrail();
    if (trail && trail.pack?.[itemId]) {
      delete trail.pack[itemId];
      saveTrails();
      render();
      const item = gear.find((g) => g.id === itemId);
      showToast(`Removed <strong>${escapeHtml(item?.name || item?.itemType || "Item")}</strong> from pack.`);
      refreshModalPackControls(itemId);
    }
    return;
  }

  // 1. Initial "+ Pack for [Trail]" click
  const packAddBtn = e.target.closest("[data-pack-add]");
  if (packAddBtn) {
    const itemId = packAddBtn.dataset.packAdd;
    const trail = getActiveTrail();
    if (!trail) return;
    trail.pack = trail.pack || {};
    trail.pack[itemId] = 1;
    saveTrails();
    render();
    const item = gear.find((g) => g.id === itemId);
    showToast(`Added <strong>${escapeHtml(item?.name || item?.itemType || "Item")}</strong> to ${escapeHtml(trail.name)} pack.`);
    return;
  }

  // 2. Card stepper [+] button
  const cardPlusBtn = e.target.closest(".btn-card-plus");
  if (cardPlusBtn) {
    const itemId = cardPlusBtn.dataset.id;
    const trail = getActiveTrail();
    if (trail) {
      trail.pack = trail.pack || {};
      trail.pack[itemId] = (trail.pack[itemId] || 0) + 1;
      saveTrails();
      render();
    }
    return;
  }

  // 3. Card stepper [-] button
  const cardMinusBtn = e.target.closest(".btn-card-minus");
  if (cardMinusBtn) {
    const itemId = cardMinusBtn.dataset.id;
    const trail = getActiveTrail();
    if (trail && trail.pack?.[itemId]) {
      trail.pack[itemId] -= 1;
      if (trail.pack[itemId] <= 0) {
        delete trail.pack[itemId];
        const item = gear.find((g) => g.id === itemId);
        showToast(`Removed <strong>${escapeHtml(item?.name || item?.itemType || "Item")}</strong> from pack.`);
      }
      saveTrails();
      render();
    }
    return;
  }

  // 4. Stepper inside planner: minus
  const minusBtn = e.target.closest(".btn-qty-minus");
  if (minusBtn) {
    const itemId = minusBtn.dataset.id;
    const trail = getActiveTrail();
    if (trail && trail.pack?.[itemId]) {
      trail.pack[itemId] -= 1;
      if (trail.pack[itemId] <= 0) delete trail.pack[itemId];
      saveTrails();
      render();
    }
    return;
  }

  // 5. Stepper inside planner: plus
  const plusBtn = e.target.closest(".btn-qty-plus");
  if (plusBtn) {
    const itemId = plusBtn.dataset.id;
    const trail = getActiveTrail();
    if (trail) {
      trail.pack = trail.pack || {};
      trail.pack[itemId] = (trail.pack[itemId] || 0) + 1;
      saveTrails();
      render();
    }
    return;
  }

  // 6. Planner remove item button
  const removeBtn = e.target.closest(".packed-item-remove");
  if (removeBtn) {
    const itemId = removeBtn.dataset.id;
    const trail = getActiveTrail();
    if (trail && trail.pack?.[itemId]) {
      delete trail.pack[itemId];
      saveTrails();
      render();
    }
    return;
  }

  // 7. Trail log card actions
  const switchBtn = e.target.closest(".btn-switch-trail");
  if (switchBtn) {
    const targetId = switchBtn.dataset.id;
    if (targetId && trails.some((t) => t.id === targetId)) {
      activeTrailId = targetId;
      saveTrails();
      render();
      const trail = getActiveTrail();
      showToast(`Now packing for <strong>${escapeHtml(trail.name)}</strong>. Select gears below.`);
      document.querySelector("#collection")?.scrollIntoView({ behavior: "smooth" });
    }
    return;
  }

  const packNowBtn = e.target.closest(".btn-pack-now");
  if (packNowBtn) {
    document.querySelector("#collection")?.scrollIntoView({ behavior: "smooth" });
    return;
  }

  const viewWeightsBtn = e.target.closest(".btn-view-weights");
  if (viewWeightsBtn) {
    const targetId = viewWeightsBtn.dataset.id;
    if (targetId && trails.some((t) => t.id === targetId)) {
      activeTrailId = targetId;
      saveTrails();
      render();
      document.querySelector("#trail-planner")?.scrollIntoView({ behavior: "smooth" });
    }
    return;
  }

  // 8. Edit trail from card
  const editCardBtn = e.target.closest(".btn-edit-trail-card");
  if (editCardBtn) {
    const targetId = editCardBtn.dataset.id;
    const trail = trails.find((t) => t.id === targetId);
    if (trail) openTrailModal(trail);
    return;
  }
});

// Direct quantity editing via input on cards or planner
document.addEventListener("change", (e) => {
  const modalInput = e.target.closest(".modal-qty-input");
  if (modalInput) {
    const itemId = modalInput.dataset.id;
    const trail = getActiveTrail();
    if (!trail) return;
    const val = parseInt(modalInput.value, 10);
    trail.pack = trail.pack || {};
    if (Number.isFinite(val) && val > 0) {
      trail.pack[itemId] = Math.min(99, val);
    } else {
      delete trail.pack[itemId];
    }
    saveTrails();
    render();
    refreshModalPackControls(itemId);
    return;
  }

  const cardInput = e.target.closest(".card-stepper-input");
  if (cardInput) {
    const itemId = cardInput.dataset.id;
    const trail = getActiveTrail();
    if (!trail) return;
    const val = parseInt(cardInput.value, 10);
    trail.pack = trail.pack || {};
    if (Number.isFinite(val) && val > 0) {
      trail.pack[itemId] = Math.min(99, val);
    } else {
      delete trail.pack[itemId];
    }
    saveTrails();
    render();
    return;
  }

  const plannerInput = e.target.closest(".planner-qty-input");
  if (plannerInput) {
    const itemId = plannerInput.dataset.id;
    const trail = getActiveTrail();
    if (!trail) return;
    const val = parseInt(plannerInput.value, 10);
    trail.pack = trail.pack || {};
    if (Number.isFinite(val) && val > 0) {
      trail.pack[itemId] = Math.min(99, val);
    } else {
      delete trail.pack[itemId];
    }
    saveTrails();
    render();
    return;
  }
});

// Active trail selector dropdown
elements.activeTrailSelect?.addEventListener("change", (e) => {
  activeTrailId = e.target.value;
  saveTrails();
  render();
  const trail = getActiveTrail();
  showToast(`Active expedition switched to <strong>${escapeHtml(trail.name)}</strong>.`);
});

// Trail Planner buttons
elements.btnCreateTrail?.addEventListener("click", () => openTrailModal());
elements.btnLogNewTrail?.addEventListener("click", () => openTrailModal());
elements.btnEditActiveTrail?.addEventListener("click", () => openTrailModal(getActiveTrail()));
elements.headerBtnNewTrail?.addEventListener("click", () => openTrailModal());
elements.stickyBtnNewTrail?.addEventListener("click", () => openTrailModal());

elements.btnToggleCompleteTrail?.addEventListener("click", () => {
  const trail = getActiveTrail();
  if (!trail) return;
  trail.status = trail.status === "completed" ? "planned" : "completed";
  saveTrails();
  render();
  showToast(`Expedition status updated to <strong>${trail.status.toUpperCase()}</strong>.`);
});

elements.btnClearPack?.addEventListener("click", () => {
  const trail = getActiveTrail();
  if (!trail) return;
  if (confirm(`Empty all packed gear for ${trail.name}?`)) {
    trail.pack = {};
    saveTrails();
    render();
    showToast(`Pack emptied for <strong>${escapeHtml(trail.name)}</strong>.`);
  }
});

elements.btnExportPack?.addEventListener("click", openExportModal);

// Unit toggle buttons
elements.btnUnitMetric?.addEventListener("click", () => {
  if (currentUnit !== "metric") {
    currentUnit = "metric";
    localStorage.setItem(UNIT_STORAGE_KEY, currentUnit);
    render();
    showToast("Switched display units to <strong>Metric (g / kg)</strong>.");
  }
});

elements.btnUnitImperial?.addEventListener("click", () => {
  if (currentUnit !== "imperial") {
    currentUnit = "imperial";
    localStorage.setItem(UNIT_STORAGE_KEY, currentUnit);
    render();
    showToast("Switched display units to <strong>Imperial (oz / lb)</strong>.");
  }
});

// Chart view toggle (Donut vs Bar)
elements.btnChartDonut?.addEventListener("click", () => {
  currentChartType = "donut";
  localStorage.setItem(CHART_TYPE_STORAGE_KEY, currentChartType);
  render();
});

elements.btnChartBar?.addEventListener("click", () => {
  currentChartType = "bar";
  localStorage.setItem(CHART_TYPE_STORAGE_KEY, currentChartType);
  render();
});

// CSV Export and Import
elements.btnExportCsv?.addEventListener("click", exportLighterPackCsv);
elements.btnExportCsvModal?.addEventListener("click", exportLighterPackCsv);

elements.csvFileInput?.addEventListener("change", (e) => {
  const file = e.target.files?.[0];
  if (file) {
    importLighterPackCsv(file);
    e.target.value = "";
  }
});

// Modal bindings
elements.modalTrailClose?.addEventListener("click", closeTrailModal);
elements.modalTrailCancel?.addEventListener("click", closeTrailModal);
elements.modalExportClose?.addEventListener("click", closeExportModal);
elements.modalExportCloseBtn?.addEventListener("click", closeExportModal);
elements.modalProductClose?.addEventListener("click", closeProductModal);
elements.modalGearClose?.addEventListener("click", closeGearModal);
elements.modalGearCancel?.addEventListener("click", closeGearModal);

// Add Gear & Reset buttons
elements.btnAddGear?.addEventListener("click", () => openGearModal());
elements.btnToolbarAddGear?.addEventListener("click", () => openGearModal());
elements.btnResetInventory?.addEventListener("click", resetInventory);

// Close modals on Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeTrailModal();
    closeExportModal();
    closeProductModal();
    closeGearModal();
  }
});

elements.gearForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  const id = elements.formGearId.value.trim();
  const name = elements.formGearName.value.trim();
  if (!name) return;

  const brand = elements.formGearBrand.value.trim();
  const category = elements.formGearCategory.value;
  const itemType = elements.formGearType.value.trim() || "Gear";
  const size = elements.formGearSize ? elements.formGearSize.value.trim() : null;
  const rawWeight = elements.formGearWeight.value.trim();
  const unitWeightG = rawWeight !== "" && !isNaN(rawWeight) ? parseFloat(rawWeight) : null;

  const rawPrice = elements.formGearPrice.value.trim();
  const priceVal = rawPrice !== "" && !isNaN(rawPrice) ? parseFloat(rawPrice) : null;
  const currency = elements.formGearCurrency.value;

  const status = elements.formGearStatus.value;
  const websiteUrl = elements.formGearWebsite.value.trim();
  const imagePath = elements.formGearImage.value.trim() || null;
  const summary = elements.formGearSummary.value.trim();
  const notes = elements.formGearNotes.value.trim();

  // Parse specs
  const specs = {};
  for (const line of elements.formGearSpecs.value.split("\n")) {
    const colonIdx = line.indexOf(":");
    if (colonIdx > 0) {
      const k = line.slice(0, colonIdx).trim();
      const v = line.slice(colonIdx + 1).trim();
      if (k && v) specs[k] = v;
    }
  }

  // Parse features
  const features = elements.formGearFeatures.value
    .split("\n")
    .map((s) => s.replace(/^[-*•✓]\s*/, "").trim())
    .filter(Boolean);

  let targetItem = null;
  if (id) {
    targetItem = gear.find((g) => g.id === id);
    if (targetItem) {
      targetItem.name = name;
      targetItem.brand = brand;
      targetItem.category = category;
      targetItem.itemType = itemType;
      targetItem.unitWeightG = unitWeightG;
      targetItem.totalWeightG = unitWeightG;
      if (currency === "CNY") {
        targetItem.unitPriceCny = priceVal;
        targetItem.totalPriceCny = priceVal;
        delete targetItem.unitPriceAud;
        delete targetItem.totalPriceAud;
      } else {
        targetItem.unitPriceAud = priceVal;
        targetItem.totalPriceAud = priceVal;
        delete targetItem.unitPriceCny;
        delete targetItem.totalPriceCny;
      }
      targetItem.status = status;
      targetItem.statusKey = normalizeStatus(status);
      targetItem.size = size || null;
      targetItem.websiteUrl = websiteUrl || null;
      if (imagePath) targetItem.imagePath = imagePath;
      targetItem.summary = summary || null;
      targetItem.specs = Object.keys(specs).length ? specs : targetItem.specs || {};
      targetItem.features = features.length ? features : targetItem.features || [];
      targetItem.notes = notes || null;
      showToast(`Updated <strong>${escapeHtml(name)}</strong> in inventory.`);
    }
  } else {
    const newId = `custom-gear-${Date.now()}`;
    targetItem = {
      id: newId,
      name,
      brand,
      category,
      itemType,
      size: size || null,
      unitWeightG,
      totalWeightG: unitWeightG,
      quantity: 1,
      status,
      statusKey: normalizeStatus(status),
      websiteUrl: websiteUrl || null,
      imagePath: imagePath || null,
      summary: summary || null,
      specs,
      features,
      notes: notes || null,
      provenance: "Added by user",
      invoiceEvidence: ["User entry"]
    };
    if (currency === "CNY") {
      targetItem.unitPriceCny = priceVal;
      targetItem.totalPriceCny = priceVal;
    } else {
      targetItem.unitPriceAud = priceVal;
      targetItem.totalPriceAud = priceVal;
    }
    gear.unshift(targetItem);
    showToast(`Added <strong>${escapeHtml(name)}</strong> to inventory.`);
  }

  saveInventory();
  closeGearModal();
  render();
  updateInventoryStats();

  if (targetItem && elements.productModal?.classList.contains("open")) {
    openProductModal(targetItem);
  }
});

elements.trailForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  const id = elements.formTrailId.value.trim();
  const name = elements.formTrailName.value.trim();
  if (!name) return;

  if (id) {
    const existing = trails.find((t) => t.id === id);
    if (existing) {
      existing.name = name;
      existing.destination = elements.formTrailDestination.value.trim();
      existing.status = elements.formTrailStatus.value;
      existing.distanceKm = elements.formTrailDistance.value ? parseFloat(elements.formTrailDistance.value) : null;
      existing.durationDays = elements.formTrailDuration.value ? parseInt(elements.formTrailDuration.value, 10) : null;
      existing.date = elements.formTrailDate.value.trim();
      existing.notes = elements.formTrailNotes.value.trim();
      showToast(`Updated details for <strong>${escapeHtml(existing.name)}</strong>.`);
    }
  } else {
    const newId = `trail-${Date.now()}`;
    let initialPack = {};
    const templateChoice = elements.formTrailTemplate?.value;
    if (templateChoice === "copy-active") {
      const active = getActiveTrail();
      if (active?.pack) {
        initialPack = JSON.parse(JSON.stringify(active.pack));
      }
    }
    const newTrail = {
      id: newId,
      name,
      destination: elements.formTrailDestination.value.trim(),
      status: elements.formTrailStatus.value,
      distanceKm: elements.formTrailDistance.value ? parseFloat(elements.formTrailDistance.value) : null,
      durationDays: elements.formTrailDuration.value ? parseInt(elements.formTrailDuration.value, 10) : null,
      date: elements.formTrailDate.value.trim(),
      notes: elements.formTrailNotes.value.trim(),
      pack: initialPack,
    };
    trails.push(newTrail);
    activeTrailId = newId;

    showToast(`🎉 Expedition <strong>${escapeHtml(newTrail.name)}</strong> created!<br/>Now packing for this trail. Select gears below.`);

    setTimeout(() => {
      document.querySelector("#collection")?.scrollIntoView({ behavior: "smooth" });
    }, 200);
  }

  saveTrails();
  closeTrailModal();
  render();
});

elements.btnCopyExport?.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(elements.exportTextArea.value);
    elements.btnCopyExport.textContent = "✓ Copied to Clipboard!";
    setTimeout(() => {
      elements.btnCopyExport.textContent = "Copy to Clipboard";
    }, 2000);
  } catch (err) {
    elements.exportTextArea.select();
    document.execCommand("copy");
    elements.btnCopyExport.textContent = "✓ Copied!";
  }
});

// Filter buttons in trail log
elements.logFilterBtns?.forEach((btn) => {
  btn.addEventListener("click", () => {
    elements.logFilterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    currentLogFilter = btn.dataset.filter || "all";
    renderTrailLog();
  });
});

// View mode tabs & Wishlist navigation
elements.tabViewOwned?.addEventListener("click", () => {
  currentViewMode = "owned";
  render();
});

elements.tabViewWishlist?.addEventListener("click", () => {
  currentViewMode = "wishlist";
  render();
});

elements.tabViewAll?.addEventListener("click", () => {
  currentViewMode = "all";
  render();
});

elements.navWishlist?.addEventListener("click", (e) => {
  currentViewMode = "wishlist";
  render();
  setTimeout(() => {
    document.querySelector("#collection")?.scrollIntoView({ behavior: "smooth" });
  }, 50);
});

elements.btnViewOwnedKit?.addEventListener("click", () => {
  currentViewMode = "owned";
  render();
});

elements.btnAddWishlistGear?.addEventListener("click", () => {
  openGearModal(null, "想买");
});

window.addEventListener("hashchange", () => {
  if (window.location.hash === "#wishlist") {
    currentViewMode = "wishlist";
    render();
    setTimeout(() => {
      document.querySelector("#collection")?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  }
});

window.addEventListener("scroll", updateStickyBar, { passive: true });

window.exportLighterPackCsv = exportLighterPackCsv;
window.importLighterPackCsv = importLighterPackCsv;
window.getActiveTrail = getActiveTrail;
window.formatWeight = formatWeight;
window.calculatePackMetrics = calculatePackMetrics;

init();
