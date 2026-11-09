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

let gear = [];

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
  return `<article class="gear-card" id="item-${escapeHtml(item.id)}" style="--section-color:${category.color}">
    ${mediaMarkup(item)}
    <div class="card-top"><span class="item-type">${escapeHtml(item.itemType || "Gear")}</span><span class="status ${statusClass(item)}">${escapeHtml(item.status || "Needs details")}</span></div>
    <div class="card-brand">${escapeHtml(item.brand || "Brand not recorded")}</div>
    <h4>${escapeHtml(item.name || item.itemType || "Unnamed item")}</h4>
    ${note}
    <div class="card-metrics"><div class="metric"><span>Listed weight</span><strong class="${weight === null ? "missing" : ""}">${formatWeight(weight)}</strong></div><div class="metric"><span>Recorded price</span><strong class="${hasPrice ? "" : "missing"}">${formatPrice(item)}</strong></div></div>
    ${quantity}
    ${source}
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
}

async function init() {
  try {
    const response = await fetch("./gear.json", { cache: "no-store" });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    if (!Array.isArray(data)) throw new Error("Invalid gear data");
    gear = data.map((item) => ({ ...item, statusKey: normalizeStatus(item.status) }));
    const weighted = gear.filter((item) => Number.isFinite(item.unitWeightG)).length;
    elements.stats.innerHTML = `<div class="stat"><strong>${gear.length}</strong><span>Logged items</span></div><div class="stat"><strong>${categories.length}</strong><span>Gear systems</span></div><div class="stat"><strong>${weighted}</strong><span>Weights recorded</span></div>`;
    render();
  } catch (error) {
    elements.stats.innerHTML = "<div class='loading'><strong>Inventory unavailable</strong><p>The gear data could not be loaded.</p></div>";
    elements.count.textContent = "The collection could not be loaded.";
    console.error(error);
  }
}

for (const control of [elements.search, elements.status, elements.sort]) control.addEventListener("input", render);
elements.reset.addEventListener("click", () => { elements.search.value = ""; elements.status.value = "all"; elements.sort.value = "original"; render(); elements.search.focus(); });
init();
