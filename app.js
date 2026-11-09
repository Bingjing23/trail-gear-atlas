const categories = [
  { name: "Sleep & Shelter", id: "sleep-shelter", color: "#537767", description: "Sleeping bags, shelter, mats and the small things that make nights outside easier." },
  { name: "Packs & Essentials", id: "packs-essentials", color: "#687d91", description: "Carry systems, lighting, trekking poles and useful trail accessories." },
  { name: "Clothing & Footwear", id: "clothing-footwear", color: "#9b777b", description: "Layers, weather protection and footwear for changing conditions." },
  { name: "Cooking & Hydration", id: "cooking-hydration", color: "#a27957", description: "Stove, cookware, water storage and filtration." },
  { name: "Personal Items", id: "personal-items", color: "#877b9b", description: "The personal supplies that still need a little more detail." },
];

const defaultTypeOrders = {
  "Sleep & Shelter": ["tent", "tent footprint", "sleep bag", "liner", "sleep pad", "pillow"],
  "Packs & Essentials": ["backpack", "summit bag", "dry bag", "first aid bag", "head light", "camp light", "poles", "umbrella", "fire starter"],
  "Clothing & Footwear": ["base layer", "underwear", "socks", "fleece jacket", "fleece cardigan", "downjacket", "hard shell", "waterproof jacket", "hard shell pants", "pants", "beanie", "fleece gloves", "neck gaiters", "gaiters", "hiking shoes", "camp boots", "sunglasses", "shoe care"],
  "Cooking & Hydration": ["filter", "water system", "thermo bottle", "stove", "stove accessory", "stove fuel", "pot", "titanium pot", "cup", "titanium cup", "spoons and chopsticks", "hydration tablets", "energy gel", "trail meal", "knife"],
  "Personal Items": ["contact lenses", "wet wipes", "power bank", "headphones"],
};

const STORAGE_KEY = "trail_gear_atlas_trails_v2";

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
      "cooking-hydration-71": 1,
      "cooking-hydration-45": 1,
      "packs-essentials-08": 1,
      "clothing-footwear-20": 1,
      "clothing-footwear-35": 1,
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

  metricTotalG: document.querySelector("#metric-total-g"),
  metricTotalKg: document.querySelector("#metric-total-kg"),
  metricBaseG: document.querySelector("#metric-base-g"),
  metricBaseKg: document.querySelector("#metric-base-kg"),
  metricItemCount: document.querySelector("#metric-item-count"),
  metricConsumableSummary: document.querySelector("#metric-consumable-summary"),

  categoryProgressBar: document.querySelector("#category-progress-bar"),
  categoryBarTotalLabel: document.querySelector("#category-bar-total-label"),
  categoryLegend: document.querySelector("#category-legend"),
  missingWeightsAlert: document.querySelector("#missing-weights-alert"),
  missingWeightsText: document.querySelector("#missing-weights-text"),

  packedItemsTitle: document.querySelector("#packed-items-title"),
  packedItemsCount: document.querySelector("#packed-items-count"),
  packedItemsList: document.querySelector("#packed-items-list"),
  btnExportPack: document.querySelector("#btn-export-pack"),

  // Header & Sticky
  headerTrailName: document.querySelector("#header-trail-name"),
  headerPackWeight: document.querySelector("#header-pack-weight"),
  stickyBar: document.querySelector("#sticky-pack-bar"),
  stickyTrailName: document.querySelector("#sticky-trail-name"),
  stickyItemCount: document.querySelector("#sticky-item-count"),
  stickyWeight: document.querySelector("#sticky-weight"),

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
  modalTrailTitle: document.querySelector("#modal-trail-title"),

  exportModal: document.querySelector("#export-modal"),
  modalExportClose: document.querySelector("#modal-export-close"),
  modalExportCloseBtn: document.querySelector("#modal-export-close-btn"),
  exportTextArea: document.querySelector("#export-text-area"),
  btnCopyExport: document.querySelector("#btn-copy-export"),
};

const escapeHtml = (value) => String(value ?? "").replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]);
const formatWeight = (value) => Number.isFinite(value) ? `${new Intl.NumberFormat("en-AU", { maximumFractionDigits: 1 }).format(value)} g` : "Not recorded";
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

const consumableTypes = new Set(["trail meal", "stove fuel", "hydration tablets", "energy gel", "wet wipes"]);
function isConsumable(item) {
  const type = String(item.itemType || "").toLowerCase();
  return consumableTypes.has(type);
}

let gear = [];
let trails = [];
let activeTrailId = "milford-track";
let currentLogFilter = "all";

function loadTrails() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        trails = parsed;
        activeTrailId = trails[0].id;
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
  let totalWeightG = 0;
  let baseWeightG = 0;
  let consumableWeightG = 0;
  let missingCount = 0;
  let totalItems = 0;

  const categoryWeights = {};
  for (const cat of categories) {
    categoryWeights[cat.name] = 0;
  }

  for (const [itemId, qty] of Object.entries(trail.pack || {})) {
    if (qty <= 0) continue;
    const item = gear.find((g) => g.id === itemId);
    if (!item) continue;
    totalItems += qty;
    const unitW = Number.isFinite(item.unitWeightG) ? item.unitWeightG : null;
    if (unitW === null) {
      missingCount += qty;
    } else {
      const lineWeight = unitW * qty;
      totalWeightG += lineWeight;
      if (isConsumable(item)) {
        consumableWeightG += lineWeight;
      } else {
        baseWeightG += lineWeight;
      }
      categoryWeights[item.category] = (categoryWeights[item.category] || 0) + lineWeight;
    }
  }

  return {
    totalWeightG,
    totalWeightKg: totalWeightG / 1000,
    baseWeightG,
    baseWeightKg: baseWeightG / 1000,
    consumableWeightG,
    missingCount,
    totalItems,
    categoryWeights,
  };
}

function normalizeStatus(status) {
  const text = String(status || "").toLowerCase();
  if (text.startsWith("purchased")) return "purchased";
  if (text.startsWith("gift")) return "gift";
  if (text.startsWith("lost")) return "lost";
  if (text.startsWith("older")) return "older";
  if (text.startsWith("owned")) return "owned";
  return "review";
}

function statusClass(item) {
  return ["owned", "purchased", "gift", "lost", "review", "older"].includes(item.statusKey) ? item.statusKey : "review";
}

function mediaMarkup(item) {
  if (!item.imagePath) {
    return `<div class="card-media media-placeholder" aria-label="Product image not available">
      <svg viewBox="0 0 180 120" aria-hidden="true"><circle cx="131" cy="35" r="16"/><path d="M8 101 55 47l30 35 19-21 62 40H8Z"/><path d="M8 110h158"/></svg>
      <span>IMAGE TO ADD</span>
    </div>`;
  }
  const alt = `${item.brand || ""} ${item.name || item.itemType || "gear"} product photo`.trim();
  const credit = item.imageSourceUrl
    ? `<a class="photo-source" href="${escapeHtml(item.imageSourceUrl)}" target="_blank" rel="noopener noreferrer" aria-label="View image source for ${escapeHtml(item.name || item.itemType)}">PHOTO SOURCE ↗</a>`
    : "";
  return `<div class="card-media"><img class="product-image" src="${escapeHtml(item.imagePath)}" alt="${escapeHtml(alt)}" loading="lazy" decoding="async" />${credit}</div>`;
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
  const packBtnText = isPacked
    ? `✓ In Pack (${packedQty}) · ${formatWeight(weight ? weight * packedQty : null)}`
    : `+ Pack for ${escapeHtml(activeTrail?.name || "Trail")}`;

  return `<article class="gear-card ${isPacked ? "is-packed" : ""}" id="item-${escapeHtml(item.id)}" style="--section-color:${category.color}">
    ${mediaMarkup(item)}
    <div class="card-top"><span class="item-type">${escapeHtml(item.itemType || "Gear")}</span><span class="status ${statusClass(item)}">${escapeHtml(item.status || "Needs details")}</span></div>
    <div class="card-brand">${escapeHtml(item.brand || "Brand not recorded")}</div>
    <h4>${escapeHtml(item.name || item.itemType || "Unnamed item")}</h4>
    ${note}
    <div class="card-metrics"><div class="metric"><span>Listed weight</span><strong class="${weight === null ? "missing" : ""}">${formatWeight(weight)}</strong></div><div class="metric"><span>Recorded price</span><strong class="${hasPrice ? "" : "missing"}">${formatPrice(item)}</strong></div></div>
    ${quantity}
    ${source}
    <button class="card-pack-btn ${isPacked ? "is-packed" : ""}" data-pack-id="${escapeHtml(item.id)}" type="button" aria-pressed="${isPacked}">
      ${packBtnText}
    </button>
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
    if (status !== "all" && item.statusKey !== status) return false;
    if (!query) return true;
    return [item.brand, item.name, item.itemType, item.notes, item.category, item.provenance, ...(item.invoiceEvidence || [])].some((value) => String(value || "").toLowerCase().includes(query));
  });
}

function renderPlanner() {
  const trail = getActiveTrail();
  if (!trail) return;

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

  // 3. Weight Dashboard
  const metrics = calculatePackMetrics(trail);

  if (elements.metricTotalG) {
    elements.metricTotalG.textContent = new Intl.NumberFormat("en-AU").format(metrics.totalWeightG);
    elements.metricTotalKg.textContent = `${metrics.totalWeightKg.toFixed(2)} kg total carried load`;
    elements.metricBaseG.textContent = new Intl.NumberFormat("en-AU").format(metrics.baseWeightG);
    elements.metricBaseKg.textContent = `${metrics.baseWeightKg.toFixed(2)} kg pack base weight`;
    elements.metricItemCount.textContent = metrics.totalItems;
    elements.metricConsumableSummary.textContent = `${new Intl.NumberFormat("en-AU").format(metrics.consumableWeightG)} g consumables (food, fuel, tabs)`;
  }

  // Header & Sticky Pack pill
  if (elements.headerTrailName) {
    elements.headerTrailName.textContent = trail.name;
    elements.headerPackWeight.textContent = `${metrics.totalWeightKg.toFixed(2)} kg`;
    elements.stickyTrailName.textContent = trail.name;
    elements.stickyItemCount.textContent = metrics.totalItems;
    elements.stickyWeight.textContent = `${new Intl.NumberFormat("en-AU").format(metrics.totalWeightG)} g (${metrics.totalWeightKg.toFixed(2)} kg)`;
  }

  // 4. Progress bar & breakdown
  if (elements.categoryProgressBar) {
    elements.categoryBarTotalLabel.textContent = `${new Intl.NumberFormat("en-AU").format(metrics.totalWeightG)} g (${metrics.totalWeightKg.toFixed(2)} kg)`;
    if (metrics.totalWeightG > 0) {
      elements.categoryProgressBar.innerHTML = categories.map((cat) => {
        const catWeight = metrics.categoryWeights[cat.name] || 0;
        const pct = ((catWeight / metrics.totalWeightG) * 100).toFixed(1);
        if (catWeight <= 0) return "";
        return `<div class="category-segment" style="width:${pct}%; background:${cat.color};" title="${cat.name}: ${catWeight} g (${pct}%)"></div>`;
      }).join("");
    } else {
      elements.categoryProgressBar.innerHTML = `<div class="category-segment" style="width:100%; background:#d5dcd2;" title="Empty pack"></div>`;
    }

    elements.categoryLegend.innerHTML = categories.map((cat) => {
      const catWeight = metrics.categoryWeights[cat.name] || 0;
      const pct = metrics.totalWeightG > 0 ? ((catWeight / metrics.totalWeightG) * 100).toFixed(0) : 0;
      return `<div class="legend-item"><span class="legend-dot" style="background:${cat.color}"></span><span>${cat.name}</span><strong>${new Intl.NumberFormat("en-AU").format(catWeight)} g</strong> <small style="color:#809083">(${pct}%)</small></div>`;
    }).join("");
  }

  // 5. Missing alert
  if (elements.missingWeightsAlert) {
    if (metrics.missingCount > 0) {
      elements.missingWeightsAlert.hidden = false;
      elements.missingWeightsText.textContent = `${metrics.missingCount} packed item${metrics.missingCount > 1 ? "s do" : " does"} not have listed weight recorded and ${metrics.missingCount > 1 ? "are" : "is"} excluded from the total calculation.`;
    } else {
      elements.missingWeightsAlert.hidden = true;
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
        const catSubtotal = catItems.reduce((acc, { item, qty }) => acc + (Number.isFinite(item.unitWeightG) ? item.unitWeightG * qty : 0), 0);

        html += `<div class="packed-category-group" style="--group-color:${cat.color}">
          <div class="packed-category-title">
            <span>${cat.name} (${catItems.length} items)</span>
            <span>Subtotal: ${new Intl.NumberFormat("en-AU").format(catSubtotal)} g</span>
          </div>`;

        for (const { item, qty } of catItems) {
          const thumb = item.imagePath
            ? `<img class="packed-item-thumb" src="${escapeHtml(item.imagePath)}" alt="${escapeHtml(item.name || "")}" />`
            : `<div class="packed-item-thumb placeholder">${escapeHtml(item.itemType ? item.itemType.slice(0, 4).toUpperCase() : "GEAR")}</div>`;
          const lineWeight = Number.isFinite(item.unitWeightG) ? item.unitWeightG * qty : null;

          html += `<div class="packed-item-row" data-item-id="${escapeHtml(item.id)}">
            ${thumb}
            <div class="packed-item-details">
              <div class="packed-item-brand">${escapeHtml(item.brand || "Brand not recorded")}</div>
              <div class="packed-item-name" title="${escapeHtml(item.name || item.itemType)}">${escapeHtml(item.name || item.itemType)}</div>
            </div>
            <div class="qty-stepper">
              <button class="btn-qty-minus" data-id="${escapeHtml(item.id)}" type="button" aria-label="Decrease quantity">−</button>
              <span>${qty}</span>
              <button class="btn-qty-plus" data-id="${escapeHtml(item.id)}" type="button" aria-label="Increase quantity">+</button>
            </div>
            <div class="packed-item-weight">
              ${formatWeight(lineWeight)}
              ${qty > 1 && item.unitWeightG ? `<small>${formatWeight(item.unitWeightG)} each</small>` : ""}
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
        ${isActive ? `<button class="btn-primary" disabled style="opacity:.85;">✓ Currently Active</button>` : `<button class="btn-primary btn-switch-trail" data-id="${escapeHtml(t.id)}" type="button">Switch to this Pack</button>`}
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
  } else {
    elements.modalTrailTitle.textContent = "Plan a New Expedition";
    elements.formTrailId.value = "";
    elements.formTrailStatus.value = "planned";
  }
  elements.trailModal.classList.add("open");
  elements.formTrailName.focus();
}

function closeTrailModal() {
  elements.trailModal?.classList.remove("open");
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
  text += `TOTAL PACK WEIGHT: ${new Intl.NumberFormat("en-AU").format(metrics.totalWeightG)} g (${metrics.totalWeightKg.toFixed(2)} kg)\n`;
  text += `BASE WEIGHT (excl. consumables): ${new Intl.NumberFormat("en-AU").format(metrics.baseWeightG)} g (${metrics.baseWeightKg.toFixed(2)} kg)\n`;
  text += `CONSUMABLES: ${new Intl.NumberFormat("en-AU").format(metrics.consumableWeightG)} g\n`;
  text += `ITEMS PACKED: ${metrics.totalItems}\n`;
  text += `--------------------------------------------------\n\n`;

  for (const cat of categories) {
    const catItems = Object.entries(trail.pack || {})
      .filter(([_, qty]) => qty > 0)
      .map(([id, qty]) => ({ item: gear.find((g) => g.id === id), qty }))
      .filter(({ item }) => item && item.category === cat.name);

    if (!catItems.length) continue;
    const catSubtotal = catItems.reduce((acc, { item, qty }) => acc + (Number.isFinite(item.unitWeightG) ? item.unitWeightG * qty : 0), 0);
    text += `### ${cat.name} (${catItems.length} items — ${new Intl.NumberFormat("en-AU").format(catSubtotal)} g)\n`;

    for (const { item, qty } of catItems) {
      const lineWeight = Number.isFinite(item.unitWeightG) ? `${item.unitWeightG * qty} g` : "weight not recorded";
      text += `- [x] ${qty > 1 ? `${qty}x ` : ""}${item.brand ? `${item.brand} ` : ""}${item.name || item.itemType} — ${lineWeight}\n`;
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

async function init() {
  try {
    const response = await fetch("./gear.json", { cache: "no-store" });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    if (!Array.isArray(data)) throw new Error("Invalid gear data");
    gear = data.map((item) => ({ ...item, statusKey: normalizeStatus(item.status) }));
    loadTrails();

    const weighted = gear.filter((item) => Number.isFinite(item.unitWeightG)).length;
    elements.stats.innerHTML = `
      <div class="stat"><strong>${gear.length}</strong><span>Logged items</span></div>
      <div class="stat"><strong>${trails.length}</strong><span>Trails in log</span></div>
      <div class="stat"><strong>${categories.length}</strong><span>Gear systems</span></div>
      <div class="stat"><strong>${weighted}</strong><span>Weights recorded</span></div>
    `;

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

// Pack toggle on gear cards
document.addEventListener("click", (e) => {
  const packBtn = e.target.closest(".card-pack-btn");
  if (packBtn) {
    const itemId = packBtn.dataset.packId;
    const trail = getActiveTrail();
    if (!trail) return;
    trail.pack = trail.pack || {};
    if (trail.pack[itemId]) {
      delete trail.pack[itemId];
    } else {
      trail.pack[itemId] = 1;
    }
    saveTrails();
    render();
    return;
  }

  // Stepper inside planner
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

  // Switch trail from trail log card
  const switchBtn = e.target.closest(".btn-switch-trail");
  if (switchBtn) {
    const targetId = switchBtn.dataset.id;
    if (targetId && trails.some((t) => t.id === targetId)) {
      activeTrailId = targetId;
      saveTrails();
      render();
      document.querySelector("#trail-planner")?.scrollIntoView({ behavior: "smooth" });
    }
    return;
  }

  // Edit trail from trail log card
  const editCardBtn = e.target.closest(".btn-edit-trail-card");
  if (editCardBtn) {
    const targetId = editCardBtn.dataset.id;
    const trail = trails.find((t) => t.id === targetId);
    if (trail) openTrailModal(trail);
    return;
  }
});

// Active trail selector dropdown
elements.activeTrailSelect?.addEventListener("change", (e) => {
  activeTrailId = e.target.value;
  saveTrails();
  render();
});

// Trail Planner buttons
elements.btnCreateTrail?.addEventListener("click", () => openTrailModal());
elements.btnLogNewTrail?.addEventListener("click", () => openTrailModal());
elements.btnEditActiveTrail?.addEventListener("click", () => openTrailModal(getActiveTrail()));

elements.btnToggleCompleteTrail?.addEventListener("click", () => {
  const trail = getActiveTrail();
  if (!trail) return;
  trail.status = trail.status === "completed" ? "planned" : "completed";
  saveTrails();
  render();
});

elements.btnClearPack?.addEventListener("click", () => {
  const trail = getActiveTrail();
  if (!trail) return;
  if (confirm(`Empty all packed gear for ${trail.name}?`)) {
    trail.pack = {};
    saveTrails();
    render();
  }
});

elements.btnExportPack?.addEventListener("click", openExportModal);

// Modal bindings
elements.modalTrailClose?.addEventListener("click", closeTrailModal);
elements.modalTrailCancel?.addEventListener("click", closeTrailModal);
elements.modalExportClose?.addEventListener("click", closeExportModal);
elements.modalExportCloseBtn?.addEventListener("click", closeExportModal);

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
    }
  } else {
    const newId = `trail-${Date.now()}`;
    const newTrail = {
      id: newId,
      name,
      destination: elements.formTrailDestination.value.trim(),
      status: elements.formTrailStatus.value,
      distanceKm: elements.formTrailDistance.value ? parseFloat(elements.formTrailDistance.value) : null,
      durationDays: elements.formTrailDuration.value ? parseInt(elements.formTrailDuration.value, 10) : null,
      date: elements.formTrailDate.value.trim(),
      notes: elements.formTrailNotes.value.trim(),
      pack: {},
    };
    trails.push(newTrail);
    activeTrailId = newId;
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

window.addEventListener("scroll", updateStickyBar, { passive: true });

init();
