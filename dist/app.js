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
const LANG_STORAGE_KEY = "trail_gear_atlas_lang";
const USER_PROFILE_KEY = "trail_gear_atlas_user_profile_v1";

let currentUnit = localStorage.getItem(UNIT_STORAGE_KEY) || "metric"; // "metric" | "imperial"
let currentChartType = localStorage.getItem(CHART_TYPE_STORAGE_KEY) || "donut"; // "donut" | "bar"
let currentLang = localStorage.getItem(LANG_STORAGE_KEY) || (navigator.language?.toLowerCase().startsWith("zh") ? "zh" : "en"); // "zh" | "en"

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

  // Language switchers
  btnLangZh: document.querySelector("#btn-lang-zh"),
  btnLangEn: document.querySelector("#btn-lang-en"),

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

  // 3-Tier Gear Entry Modes & Scraper
  gearEntryModes: document.querySelector("#gear-entry-modes"),
  tabModeCatalog: document.querySelector("#tab-mode-catalog"),
  tabModeScraper: document.querySelector("#tab-mode-scraper"),
  tabModeManual: document.querySelector("#tab-mode-manual"),
  panelModeCatalog: document.querySelector("#panel-mode-catalog"),
  panelModeScraper: document.querySelector("#panel-mode-scraper"),
  panelModeManual: document.querySelector("#panel-mode-manual"),

  // Popular Brand Catalog Quick-fill
  catalogQuickfillBox: document.querySelector("#catalog-quickfill-box"),
  catalogSearchInput: document.querySelector("#catalog-search-input"),
  catalogClearBtn: document.querySelector("#catalog-clear-btn"),
  catalogSuggestions: document.querySelector("#catalog-suggestions"),
  catalogAutofilledBanner: document.querySelector("#catalog-autofilled-banner"),
  autofilledItemName: document.querySelector("#autofilled-item-name"),
  autofilledBannerText: document.querySelector("#autofilled-banner-text"),
  catalogBrandPills: document.querySelector("#catalog-brand-pills"),

  // Niche Brand Link & Specs Scraper
  scraperUrlInput: document.querySelector("#scraper-url-input"),
  scraperClearUrlBtn: document.querySelector("#scraper-clear-url-btn"),
  btnToggleSnippet: document.querySelector("#btn-toggle-snippet"),
  scraperSnippetWrap: document.querySelector("#scraper-snippet-wrap"),
  scraperTextInput: document.querySelector("#scraper-text-input"),
  btnDoScrape: document.querySelector("#btn-do-scrape"),
  scraperStatusIndicator: document.querySelector("#scraper-status-indicator"),
  scraperPreviewCard: document.querySelector("#scraper-preview-card"),
  scraperPreviewImg: document.querySelector("#scraper-preview-img"),
  scraperPreviewPh: document.querySelector("#scraper-preview-ph"),
  scraperPreviewName: document.querySelector("#scraper-preview-name"),
  scraperPreviewBrand: document.querySelector("#scraper-preview-brand"),
  scraperPreviewCat: document.querySelector("#scraper-preview-cat"),
  scraperPreviewWeight: document.querySelector("#scraper-preview-weight"),
  scraperPreviewPrice: document.querySelector("#scraper-preview-price"),
  scraperPreviewUrl: document.querySelector("#scraper-preview-url"),
  btnApplyScraper: document.querySelector("#btn-apply-scraper"),

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
  btnHeroAddGear: document.querySelector("#btn-hero-add-gear"),

  // User Profile & Dropdown
  userProfileMenuWrap: document.querySelector("#user-profile-menu-wrap"),
  btnUserProfile: document.querySelector("#btn-user-profile"),
  headerUserName: document.querySelector("#header-user-name"),
  userProfileDropdown: document.querySelector("#user-profile-dropdown"),
  dropdownUserGreeting: document.querySelector("#dropdown-user-greeting"),
  dropdownUserStats: document.querySelector("#dropdown-user-stats"),
  btnMenuEditName: document.querySelector("#btn-menu-edit-name"),
  btnMenuExportBackup: document.querySelector("#btn-menu-export-backup"),
  btnMenuImportBackup: document.querySelector("#btn-menu-import-backup"),
  btnMenuStartBlank: document.querySelector("#btn-menu-start-blank"),
  btnMenuRestoreStarter: document.querySelector("#btn-menu-restore-starter"),
  globalBackupFileInput: document.querySelector("#global-backup-file-input"),

  // Onboarding Modal
  onboardingModal: document.querySelector("#onboarding-modal"),
  onboardingForm: document.querySelector("#onboarding-form"),
  onboardingInputName: document.querySelector("#onboarding-input-name"),
  onboardingImportWrap: document.querySelector("#onboarding-import-wrap"),
  onboardingFileInput: document.querySelector("#onboarding-file-input"),
  onboardingFileChosenName: document.querySelector("#onboarding-file-chosen-name"),
  btnOnboardingSubmit: document.querySelector("#btn-onboarding-submit"),

  // Gear Modal Image Upload & Live Preview
  formGearImageFile: document.querySelector("#form-gear-image-file"),
  btnTriggerUploadImage: document.querySelector("#btn-trigger-upload-image"),
  gearImagePreviewWrap: document.querySelector("#gear-image-preview-wrap"),
  gearImagePreviewImg: document.querySelector("#gear-image-preview-img"),
  previewImageNote: document.querySelector("#preview-image-note"),
  btnRemovePreviewImage: document.querySelector("#btn-remove-preview-image"),
};

const escapeHtml = (value) => String(value ?? "").replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]);

// =============================================================================
// Multilingual / Internationalization (i18n) Engine
// =============================================================================
const translations = {
  zh: {
    // Nav
    "nav.explore": "探索装备",
    "nav.wishlist": "✨ 心愿单与测重",
    "nav.planner": "背包规划与负重",
    "nav.log": "路线日志",
    "nav.about": "关于本清单",
    "header.newTrail": "+ 新建路线",
    "header.packDetails": "查看当前路线背包详情与重量拆解",

    // Hero
    "hero.tag": "极简轻量化装备库 · 背包负重分析",
    "hero.title": "Trail Gear Atlas",
    "hero.desc": "精确记录每件装备的实际重量、价格与打包状态。支持随身穿戴扣减、心愿单试重与 LighterPack 格式同步。",
    "hero.addGear": "+ 添加装备",
    "hero.browse": "浏览装备库 ↓",
    "hero.planner": "背包负重分析 ↓",
    "hero.stats": "{items} 件装备 · {trails} 条规划路线",

    // Planner Header
    "planner.kicker": "路线打包与负重分析",
    "planner.title": "路线打包与负重分析",
    "planner.routeLabel": "当前路线",
    "planner.newTrail": "+ 新建路线",

    // Banner Actions
    "banner.edit": "✏️ 编辑路线",
    "banner.markComplete": "✓ 标为已完成",
    "banner.revertPlanned": "↩ 恢复为计划中",
    "banner.emptyPack": "清空背包",

    // Banner Meta
    "banner.status.planned": "计划中 · 下一站",
    "banner.status.in-progress": "进行中 · 途中",
    "banner.status.completed": "已完成 · 纪事",
    "banner.days": "{n} 天",
    "banner.daysTbd": "天数待定",
    "banner.targetDate": "出行时间：{date}",

    // 5 Weight Cards
    "metric.carried.label": "背负总重",
    "metric.carried.sub": "{wt} 背负行囊实际总重",
    "metric.carried.wishSub": "<strong>{owned} kg</strong> 已拥有 + <strong>{wish} kg</strong> 心愿单 ({count} 件)",
    "metric.base.label": "基准重量 (不含消耗品与穿戴)",
    "metric.base.sub": "{wt} 背包基础净重",
    "metric.worn.label": "随身穿戴 (非背负)",
    "metric.worn.sub": "{wt} 鞋靴、衣物与手杖",
    "metric.skinout.label": "全身行头总重",
    "metric.skinout.sub": "{wt} 背负总重 + 随身穿戴",
    "metric.wishlist.label": "想买试算负重",
    "metric.wishlist.sub": "{count} 件心愿单装备试算增重",

    // Tiers
    "tier.empty": "空背包",
    "tier.ultralight": "🟢 超轻量 (< 4.5kg)",
    "tier.lightweight": "🟡 轻量级 (4.5 - 9kg)",
    "tier.standard": "🟠 传统标准 (9 - 14kg)",
    "tier.expedition": "🔴 重装远征 (> 14kg)",

    // Donut & Chart
    "chart.kicker": "分类背负重量 (仅计入背包负重，不含随身穿戴)",
    "chart.title": "系统重量拆解",
    "chart.donut": "🍩 环形图",
    "chart.bar": "📊 堆叠条形图",
    "chart.total": "{wt} 总重",
    "chart.baseWeight": "基准重量",
    "chart.hoverCat": "悬停查看各系统",
    "chart.wornTitle": "穿戴重量：",
    "chart.wornDesc": "不计入背负重量",

    // Missing alert
    "missing.text": "{count} 件已打包装备未记录重量，未计入总重。",

    // Packed Drawer
    "packed.title": "打包清单 ({count} 件)",
    "packed.tip": "点击 <strong>👕 穿戴</strong> 可从基重中扣除，点击 <strong>👥 分摊</strong> 可均分队友重量。",
    "packed.browse": "在下方挑选添加 ↓",
    "packed.exportCsv": "📥 导出 LighterPack CSV",
    "packed.importCsv": "📤 导入 LighterPack CSV",
    "packed.viewMd": "📋 查看 Markdown 清单",
    "packed.emptyTitle": "背包当前为空",
    "packed.emptyDesc": "你还没有为 {name} 选择任何装备。请在下方装备库中挑选，点击「+ 放入当前背包」即可打包！",
    "packed.subtotal": "小计：{wt}",

    // Chips
    "chip.worn": "👕 随身穿戴",
    "chip.shared": "👥 1/{split} 分摊",
    "chip.wishlist": "✨ 想买待购",
    "chip.bought": "✓ 标记已购入",
    "chip.custom": "👤 自建装备",

    // Collection Tabs
    "tab.owned": "我的装备库",
    "tab.wishlist": "想买清单与测重",
    "tab.all": "全部装备",

    // Wishlist Banner
    "wishlist.kicker": "想买心愿单与换装测重",
    "wishlist.title": "购买前先测算负重",
    "wishlist.desc": "此处的装备为你正在考虑入手的心愿单。你可以直接将它们打包加入当前路线（<strong>{trail}</strong>）测算减重效果，与既有装备横向比对，购买后可一键转入已拥有装备库。",
    "wishlist.stat.count": "心愿装备",
    "wishlist.stat.weight": "潜在增重",
    "wishlist.stat.packed": "当前路线上包测试",
    "wishlist.stat.cost": "预计总投入",
    "wishlist.btnAdd": "+ 添加想买装备",
    "wishlist.btnBack": "← 返回我的装备库",

    // Collection Header
    "collection.kicker": "全套装备总览",
    "collection.title": "山野行囊细目",
    "collection.desc": "按系统浏览、搜索单品，或对比整套装备的克重与入手开销。",
    "collection.btnAdd": "+ 添加装备",
    "collection.btnReset": "↺ 重置装备库",

    // Toolbar & Filters
    "search.placeholder": "按装备名称、品牌或特点搜索...",
    "search.showing": "显示 {shown} / {total} 件装备",
    "status.label": "状态",
    "sort.label": "排序",
    "sort.default": "默认排序",
    "sort.weightAsc": "重量：由轻到重",
    "sort.weightDesc": "重量：由重到轻",
    "sort.priceAsc": "价格：由低到高",
    "sort.priceDesc": "价格：由高到低",
    "sort.brandAsc": "品牌：A 到 Z",
    "filter.allStatus": "全部状态",
    "filter.activeStatus": "仅现役可用",
    "filter.wishlistStatus": "✨ 仅想买心愿",
    "filter.allSystems": "全部系统",
    "filter.reset": "重置筛选",
    "empty.noMatch": "未找到匹配项",
    "empty.title": "装备库中没有找到符合搜索条件的物品。",
    "empty.desc": "请尝试调整搜索关键词或重置筛选条件。",

    // Gear Card
    "card.packAdd": "+ 放入 {trail}",
    "card.packTest": "+ 试装入包 {trail}",
    "card.inPack": "已入包",
    "card.inTrial": "试装中",
    "card.packedBadgeSingle": "已打包",
    "card.packedBadgeMulti": "{qty} 件已打包",
    "card.wishlistRibbon": "✨ 心愿单 · 待购入",
    "card.markBought": "✓ 标记已购入",
    "card.detailsBtn": "参数与详情",
    "card.weight": "⚖️ 重量",
    "card.price": "价格",

    // Status Map (for dropdown & badges)
    "status.in_use": "使用中 (现役)",
    "status.wishlist": "✨ 想买 (心愿单)",
    "status.owned": "已拥有",
    "status.purchased": "已购入",
    "status.gift": "礼品",
    "status.lost": "已丢失",
    "status.selling": "准备出掉",
    "status.returned": "已退货",
    "status.older": "旧款 / 待确认",
    "status.review": "需补充信息",

    // Trail Log
    "log.kicker": "徒步纪事",
    "log.title": "路线日志与规划",
    "log.desc": "查看历史完成徒步路线与未来探险计划，对比每次出行的实际打包装备与背负重量。",
    "log.all": "全部路线 ({count})",
    "log.completed": "已完成徒步 ({count})",
    "log.planned": "计划中 / 即将出发 ({count})",
    "log.distance": "总里程",
    "log.duration": "行程天数",
    "log.daysUnit": "天",
    "log.packLoad": "背负总重",
    "log.btnActive": "🎒 当前选中路线 (在下方打包 ↓)",
    "log.btnPack": "🎒 设为当前路线并打包 ↓",
    "log.btnWeights": "📊 负重分析",
    "log.btnEdit": "编辑",

    // About
    "about.kicker": "关于本清单",
    "about.title": "一份不断演进的装备档案",
    "about.p1": "本清单汇总了真实的户外徒步装备、采购凭证与购买截图。发票价格以包含消费税的澳币金额记录；国内电商截图按人民币记录，币种之间不做折算。装备重量为标称或实测重量，在家使用电子秤复测后会持续校准更新。",
    "about.p2": "产品展示图尽可能呈现对应型号，实际颜色或年份版本可能与实物稍有差异。缺失细节的装备仍保留展示，以便后续补齐档案。早期淘汰或遗失的装备单独标注区分。凭证仅记录购买事实，并不代表消耗品仍在背包中。",

    // Footer
    "footer.brand": "TRAIL GEAR <em>ATLAS</em>",
    "footer.updated": "个人徒步装备档案 · 更新于 2026 年 11 月",
    "footer.top": "返回顶部 ↑",

    // Sticky Bar
    "sticky.items": "<strong>{count}</strong> 件装备 · <strong>{weight}</strong>",
    "sticky.newTrail": "+ 新建路线",
    "sticky.viewPack": "查看背包与负重 ↑",

    // Trail Modal
    "modalTrail.title": "规划徒步路线",
    "modalTrail.desc": "设定路线名称、目标里程与行程天数，随后从装备库中挑选行囊。",
    "modalTrail.name": "路线 / 活动名称 *",
    "modalTrail.namePh": "例如：Milford Track, Overland Track, Mount Bogong",
    "modalTrail.dest": "目的地 / 地区",
    "modalTrail.destPh": "例如：Fiordland, New Zealand",
    "modalTrail.status": "状态",
    "modalTrail.statusPlanned": "计划中 (下一站)",
    "modalTrail.statusProgress": "进行中",
    "modalTrail.statusCompleted": "已完成",
    "modalTrail.dist": "总里程 (km)",
    "modalTrail.duration": "行程天数 (天)",
    "modalTrail.date": "出行时间",
    "modalTrail.datePh": "例如：2026 年 11 月",
    "modalTrail.template": "装备初始搭配",
    "modalTrail.tplEmpty": "从零自选装备",
    "modalTrail.tplCopy": "复制当前路线装备搭配",
    "modalTrail.notes": "路线说明与注意事项",
    "modalTrail.notesPh": "地形路况、天气预警、垭口海拔、行前备忘等...",
    "modalTrail.distPh": "例如：53.5",
    "modalTrail.durationPh": "例如：4",
    "modalTrail.cancel": "取消",
    "modalTrail.submit": "保存并开始打包 ↓",
    "modal.close": "关闭对话框",

    // Export Modal
    "modalExport.title": "导出打包清单",
    "modalExport.desc": "复制格式化的装备负重清单，分享给队友或保存至出行笔记。",
    "modalExport.close": "关闭",
    "modalExport.downloadCsv": "📥 下载 LighterPack CSV",
    "modalExport.copyMd": "复制 Markdown 文本",

    // Product Modal
    "modalProduct.officialResource": "官方品牌资源",
    "modalProduct.officialSite": "前往官方网站 / 页面",
    "modalProduct.specsTitle": "技术参数与规格",
    "modalProduct.featuresTitle": "设计亮点与核心特色",
    "modalProduct.notesTitle": "实测心得与备忘",
    "modalProduct.prospectiveChip": "✨ 心愿单 · 待购入",
    "modalProduct.markPurchased": "✓ 标记已购入 (转为已拥有)",
    "modalProduct.metaSize": "尺码 / 容量",
    "modalProduct.metaWeight": "单件重量",
    "modalProduct.metaPrice": "记录价格",
    "modalProduct.metaType": "装备类型",
    "modalProduct.metaReceipt": "购买凭证 / 发票",
    "modalProduct.packTag": "路线打包",
    "modalProduct.btnEdit": "✏️ 编辑装备",
    "modalProduct.btnDelete": "🗑️ 删除装备",

    // Gear Modal
    "modalGear.addTitle": "添加装备",
    "modalGear.editTitle": "编辑装备",
    "modalGear.addWishTitle": "添加想买装备",
    "modalGear.desc": "记录装备的重量、价格、技术规格与官方链接。",
    "modalGear.modeCatalog": "<strong>方案 A</strong> 热门大牌速选",
    "modalGear.modeScraper": "<strong>方案 B</strong> 网址/规格智能抓取",
    "modalGear.modeManual": "<strong>手动新建</strong> 空白建档",
    "modalGear.catalogKicker": "热门品牌装备库秒级速填",
    "modalGear.catalogBadge": "210+ 专业徒步装备库 (K2 · Paddy Pallin · Backpacking Light)",
    "modalGear.catalogSearchPh": "输入品牌或型号（如 ULA Circuit, Portal 2, Mariposa, Lunar Solo, Evernew, Torrid...）",
    "modalGear.brandPillsLabel": "户外专卖推荐:",
    "modalGear.autofillBanner": "已从 <strong>{name}</strong> 自动回填！可在下方继续调整尺码、价格或实测备注。",
    "modalGear.scraperKicker": "小众网站与规格抓取",
    "modalGear.scraperBadge": "智能自动识别",
    "modalGear.scraperDesc": "粘贴小众品牌/独立电商（如 Zpacks, Durston, Garage Grown Gear, REI, 品牌官网等）的商品链接或参数文本：",
    "modalGear.scraperUrlPh": "粘贴商品详情页网址 (https://...)",
    "modalGear.scraperSnippetToggle": "+ 展开粘贴规格/重量文本 (选填)",
    "modalGear.scraperSnippetPh": "可选：在此粘贴商品规格文本 (例如: Weight: 28.5 oz / 808 g, Price: $240 USD, Double wall)...",
    "modalGear.scraperBtn": "⚡ 智能解析并提取数据",
    "modalGear.scraperUseData": "✓ 填入表单",
    "modalGear.scraperItemName": "商品名称",
    "modalGear.scraperBrand": "品牌",
    "modalGear.scraperCat": "系统分类",
    "modalGear.weightPh": "例如：60, 1270, 86",
    "modalGear.pricePh": "例如：49.95",
    "modalGear.removePhoto": "移除图片",
    "modalGear.manualTitle": "自由手动录入模式",
    "modalGear.manualDesc": "适合 DIY 自制装备、实体店自购、旧款绝版或无需网购链接的个人户外物品。请直接在下方表单中填写各项参数。",
    "modalGear.name": "装备名称 *",
    "modalGear.namePh": "例如：Hornet Elite OSMO 2P Tent",
    "modalGear.brand": "品牌 / 制造方 *",
    "modalGear.brandPh": "例如：Nemo, Mont, Arc'teryx, Sea to Summit",
    "modalGear.category": "所属系统 *",
    "modalGear.itemType": "物品类型",
    "modalGear.itemTypePh": "例如：tent, sleeping_pad, pack, stove",
    "modalGear.size": "尺码 / 容量 (选填)",
    "modalGear.sizePh": "例如：Women's S, Regular Wide, 1100ml, 20L",
    "modalGear.weight": "单件重量 (克 / g)",
    "modalGear.price": "记录价格",
    "modalGear.currency": "币种",
    "modalGear.status": "装备状态 *",
    "modalGear.website": "官网 / 购买链接 (选填)",
    "modalGear.image": "商品图片链接 (选填)",
    "modalGear.imagePh": "例如：./photos/... 或 https://...",
    "modalGear.summary": "一句话特点介绍",
    "modalGear.summaryPh": "材料与用途的一句话技术概括",
    "modalGear.specs": "技术规格与参数 (每行一条: 键: 值)",
    "modalGear.specsPh": "温标：舒适 -5°C | 极限 -10°C\n填充：850+ 蓬松度羽绒\n展开尺寸：183 x 51 cm\n面料：20D 防撕裂尼龙",
    "modalGear.features": "设计亮点与特性 (每行一条)",
    "modalGear.featuresPh": "超轻紧凑收纳体积\n多功能气阀快速排气\n兼容防滑枕头锁",
    "modalGear.notes": "实测备忘与心得",
    "modalGear.notesPh": "尺码体感、严寒天气表现、专卖店信息等...",
    "modalGear.cancel": "取消",
    "modalGear.save": "保存装备",
    "modalGear.saveChanges": "保存修改",
    "modalGear.addInventory": "保存至装备库",
    "modalGear.addWishlist": "添加至想买清单",

    // Categories
    "cat.sleep": "睡眠与庇护",
    "cat.sleep.desc": "睡袋、帐篷庇护所、防潮垫与让野外露宿更安心舒适的装备。",
    "cat.packs": "背包与背负",
    "cat.packs.desc": "背负系统、照明头灯、徒步手杖与实用山野工具。",
    "cat.cooking": "烹饪与水净化",
    "cat.cooking.desc": "气炉、纯钛锅具、储水水袋与净水过滤系统。",
    "cat.food": "户外口粮",
    "cat.food.desc": "高热量脱水冻干正餐、速溶早餐、能量胶与电解质冲剂。",
    "cat.clothing": "服装与鞋靴",
    "cat.clothing.desc": "三层穿衣法则、防风防雨硬壳风衣与高保暖中间层。",
    "cat.personal": "个人随身",
    "cat.personal.desc": "充电宝、个人卫生清洁与电子数码等贴身备品。",

    // Common
    "common.items": "件",
    "weight.notRecorded": "未记录重量",
    "price.notRecorded": "未记录价格",

    // User Profile & Onboarding
    "profile.editName": "修改称呼",
    "profile.exportBackup": "导出完整备份 (.json)",
    "profile.importBackup": "导入装备库备份",
    "profile.startBlank": "清空建全新空白库",
    "profile.restoreStarter": "恢复推荐精选库 (82件)",
    "profile.greeting": "Hi, {name} 👋",
    "profile.stats": "个人装备档案 · {count} 件装备",
    "onboarding.title": "欢迎来到 Trail Gear Atlas",
    "onboarding.subtitle": "请设置您的徒步者称呼，并选择如何开启您的专属装备库",
    "onboarding.nameLabel": "您的称呼 / 昵称 *",
    "onboarding.namePh": "例如：Alex / 阿锋 / 晨曦",
    "onboarding.chooseStarter": "选择如何开启您的装备库：",
    "onboarding.optCuratedTitle": "经典精选库起步 (82件常用尖货)",
    "onboarding.optCuratedDesc": "内置澳洲三大专业店与经典UL热门装备，适合快速挑选与增删",
    "onboarding.optBlankTitle": "从零建立全新空白库 (0件开始)",
    "onboarding.optBlankDesc": "干干净净，通过214+热门装备库或自定义录入，打造专属私享库",
    "onboarding.optImportTitle": "导入已有备份 / 表格 (.json / .csv)",
    "onboarding.optImportDesc": "导入之前导出的 Gear Atlas 完整备份或 LighterPack CSV 表格",
    "onboarding.btnStart": "开启我的徒步装备库 🚀",
    "onboarding.btnSkip": "先随意逛逛，稍后设置 →",
    "modalGear.or": "或",
    "modalGear.uploadPhoto": "上传本地实拍照片",
    "modalGear.photoCompressed": "实拍照片已压缩 (~30-50KB)",

    // Toasts
    "toast.langSwitched": "已切换为<strong>简体中文</strong>。",
    "toast.unitMetric": "已切换计量单位为<strong>公制 (g / kg)</strong>。",
    "toast.unitImperial": "已切换计量单位为<strong>英制 (oz / lb)</strong>。",
    "toast.gearAdded": "已将 <strong>{name}</strong> 添加至装备库。",
    "toast.gearUpdated": "已更新 <strong>{name}</strong>。",
    "toast.gearDeleted": "已删除装备。",
    "toast.packAdded": "已将 <strong>{name}</strong> 加入路线背包。",
    "toast.packRemoved": "已从背包中移除 <strong>{name}</strong>。",
    "toast.packCleared": "已清空路线背包。",
    "toast.trailSaved": "路线已保存。",
    "toast.mdCopied": "Markdown 清单已复制到剪贴板！",
    "toast.csvExported": "已导出 LighterPack CSV 文件。",
    "toast.csvImported": "成功导入 {count} 件装备！",
    "toast.convertedOwned": "🎉 已将 <strong>{name}</strong> 转为正式已拥有装备！",
    "toast.profileUpdated": "称呼已更新为：<strong>{name}</strong>！",
    "toast.backupExported": "已成功导出完整备份文件！包含所有自定义装备与本地实拍照片。",
    "toast.backupImported": "已成功导入备份！恢复了 {count} 件装备与照片。",
    "toast.blankKitCreated": "已为您建立全新空白装备库，点击右上角或下方按钮开始添加装备吧！",
    "toast.starterRestored": "已成功恢复默认推荐精选库 (82件常用尖货)！"
  },
  en: {
    // Nav
    "nav.explore": "Explore Gear",
    "nav.wishlist": "✨ Wishlist & Trials",
    "nav.planner": "Pack Planner & Weights",
    "nav.log": "Trail Log",
    "nav.about": "About This Kit",
    "header.newTrail": "+ New Trail",
    "header.packDetails": "View active pack details and weight breakdown",

    // Hero
    "hero.tag": "ULTRALIGHT PACK BUILDER · FIELD GEAR ATLAS",
    "hero.title": "Trail Gear Atlas",
    "hero.desc": "Precise record of gear weights, purchase records, and pack statuses. Supports worn-weight exclusions, prospective trial loads, and LighterPack CSV sync.",
    "hero.addGear": "+ Add Gear Item",
    "hero.browse": "Explore Gear ↓",
    "hero.planner": "Pack Weight Analytics ↓",
    "hero.stats": "{items} gear items · {trails} planned trails",

    // Planner Header
    "planner.kicker": "EXPEDITION PACK BUILDER",
    "planner.title": "Pack Planner & Weight Analytics",
    "planner.routeLabel": "ACTIVE ROUTE",
    "planner.newTrail": "+ New Trail",

    // Banner Actions
    "banner.edit": "✏️ Edit Details",
    "banner.markComplete": "✓ Mark as Completed",
    "banner.revertPlanned": "↩ Revert to Planned",
    "banner.emptyPack": "Empty Pack",

    // Banner Meta
    "banner.status.planned": "Planned · Next Destination",
    "banner.status.in-progress": "In Progress · On Trail",
    "banner.status.completed": "Completed · Hiked",
    "banner.days": "{n} Days",
    "banner.daysTbd": "Days TBD",
    "banner.targetDate": "Target Date: {date}",

    // 5 Weight Cards
    "metric.carried.label": "PACK CARRIED LOAD",
    "metric.carried.sub": "{wt} carried load on back",
    "metric.carried.wishSub": "<strong>{owned} kg</strong> owned + <strong>{wish} kg</strong> wishlist ({count} items)",
    "metric.base.label": "BASE WEIGHT (EXCL. CONSUMABLES & WORN)",
    "metric.base.sub": "{wt} pack base weight",
    "metric.worn.label": "WORN ON BODY",
    "metric.worn.sub": "{wt} shoes, clothes & poles",
    "metric.skinout.label": "SKIN-OUT TOTAL",
    "metric.skinout.sub": "{wt} carried load + worn on body",
    "metric.wishlist.label": "WISHLIST TRIAL LOAD",
    "metric.wishlist.sub": "{count} prospective items on trial load",

    // Tiers
    "tier.empty": "EMPTY PACK",
    "tier.ultralight": "🟢 ULTRALIGHT (< 10 lb)",
    "tier.lightweight": "🟡 LIGHTWEIGHT (10 - 20 lb)",
    "tier.standard": "🟠 STANDARD (20 - 30 lb)",
    "tier.expedition": "🔴 EXPEDITION (> 30 lb)",

    // Donut & Chart
    "chart.kicker": "CATEGORY CARRIED LOAD (EXCL. WORN ON BODY)",
    "chart.title": "Category Breakdown",
    "chart.donut": "🍩 Donut Chart",
    "chart.bar": "📊 Linear Bar",
    "chart.total": "{wt} Total",
    "chart.baseWeight": "BASE WEIGHT",
    "chart.hoverCat": "Hover category slice",
    "chart.wornTitle": "Worn Weight:",
    "chart.wornDesc": "Excluded from pack carried load",

    // Missing alert
    "missing.text": "{count} packed items do not have listed weights and are excluded from total calculation.",

    // Packed Drawer
    "packed.title": "Packed Gear ({count} items)",
    "packed.tip": "Mark items as <strong>👕 Worn</strong> to exclude from base weight, or <strong>👥 Shared</strong> to split partner weight.",
    "packed.browse": "Browse & Add Gear Below ↓",
    "packed.exportCsv": "📥 Export LighterPack CSV",
    "packed.importCsv": "📤 Import LighterPack CSV",
    "packed.viewMd": "📋 View Markdown List",
    "packed.emptyTitle": "Pack is currently empty",
    "packed.emptyDesc": "You haven't selected any gear for {name} yet. Browse the inventory below and click \"+ Pack for {name}\" on any item.",
    "packed.subtotal": "Subtotal: {wt}",

    // Chips
    "chip.worn": "👕 Worn",
    "chip.shared": "👥 1/{split} Shared",
    "chip.wishlist": "✨ Wishlist",
    "chip.bought": "✓ Mark Bought",
    "chip.custom": "👤 Custom Gear",

    // Collection Tabs
    "tab.owned": "Master Inventory",
    "tab.wishlist": "Wishlist & Trials",
    "tab.all": "All Items",

    // Wishlist Banner
    "wishlist.kicker": "PROSPECTIVE GEAR LAB & UPGRADE SIMULATOR",
    "wishlist.title": "Simulate your pack before buying.",
    "wishlist.desc": "Items in this list represent prospective gear you are considering. You can pack them directly into your active route (<strong>{trail}</strong>) to test weight impact, compare against existing kit, and convert to Owned with one click once purchased.",
    "wishlist.stat.count": "Wishlist items",
    "wishlist.stat.weight": "Total prospective wt",
    "wishlist.stat.packed": "Tested in active pack",
    "wishlist.stat.cost": "Est. total investment",
    "wishlist.btnAdd": "+ Add Wishlist Gear",
    "wishlist.btnBack": "← Back to Master Inventory",

    // Collection Header
    "collection.kicker": "EXPLORE THE KIT",
    "collection.title": "Built for the trail.",
    "collection.desc": "Browse by system, search for a specific piece, or compare the recorded weight and price across the kit.",
    "collection.btnAdd": "+ Add Gear Item",
    "collection.btnReset": "↺ Reset Kit",

    // Toolbar & Filters
    "search.placeholder": "Search gear by name, brand, or feature...",
    "search.showing": "SHOWING {shown} OF {total} ITEMS",
    "status.label": "Status",
    "sort.label": "Sort",
    "sort.default": "Default Order",
    "sort.weightAsc": "Weight: Light to Heavy",
    "sort.weightDesc": "Weight: Heavy to Light",
    "sort.priceAsc": "Price: Low to High",
    "sort.priceDesc": "Price: High to Low",
    "sort.brandAsc": "Brand: A to Z",
    "filter.allStatus": "All Statuses",
    "filter.activeStatus": "Active Kit Only",
    "filter.wishlistStatus": "✨ Wishlist Only",
    "filter.allSystems": "All Systems",
    "filter.reset": "Reset filters",
    "empty.noMatch": "NO MATCHES FOUND",
    "empty.title": "Nothing in the kit matches that search.",
    "empty.desc": "Try a different product name or clear the filters.",

    // Gear Card
    "card.packAdd": "+ Pack for {trail}",
    "card.packTest": "+ Test Pack for {trail}",
    "card.inPack": "in pack",
    "card.inTrial": "in trial",
    "card.packedBadgeSingle": "IN ACTIVE PACK",
    "card.packedBadgeMulti": "{qty} IN PACK",
    "card.wishlistRibbon": "✨ WISHLIST · PROSPECTIVE",
    "card.markBought": "✓ Mark Bought",
    "card.detailsBtn": "Specs & Details",
    "card.weight": "⚖️ WEIGHT",
    "card.price": "PRICE",

    // Status Map
    "status.in_use": "In Use (Active)",
    "status.wishlist": "✨ Wishlist",
    "status.owned": "Owned",
    "status.purchased": "Purchased",
    "status.gift": "Gift",
    "status.lost": "Lost",
    "status.selling": "To Sell",
    "status.returned": "Returned",
    "status.older": "Older Gear (Pending)",
    "status.review": "Needs Details",

    // Trail Log
    "log.kicker": "EXPEDITION ARCHIVE",
    "log.title": "Trail Log & Expeditions",
    "log.desc": "Browse past completed trails and upcoming expeditions. Compare gear choices and packed weight across different terrains.",
    "log.all": "All Expeditions ({count})",
    "log.completed": "Completed Hikes ({count})",
    "log.planned": "Upcoming & Planned ({count})",
    "log.distance": "Distance",
    "log.duration": "Duration",
    "log.daysUnit": "Days",
    "log.packLoad": "Pack Load",
    "log.btnActive": "🎒 Currently Active (Pack Gear Below ↓)",
    "log.btnPack": "🎒 Pack for this Trail ↓",
    "log.btnWeights": "📊 Weights",
    "log.btnEdit": "Edit",

    // About
    "about.kicker": "ABOUT THE RECORD",
    "about.title": "A living gear list.",
    "about.p1": "This collection brings together the original hiking inventory, tax invoices and purchase screenshots. Invoice prices use the tax-inclusive line amounts in Australian dollars. Screenshot purchases stay in Chinese yuan; currencies are never converted or compared. Weights are listed or approximate values and may change after an item is weighed at home.",
    "about.p2": "Product photos show the listed models; colors or revisions may differ from the items owned. Items with missing details stay visible so the record can be completed over time. Older and lost gear is identified separately from the current kit. A receipt records a purchase, not whether a consumable is still in the pack.",

    // Footer
    "footer.brand": "TRAIL GEAR <em>ATLAS</em>",
    "footer.updated": "PERSONAL HIKING KIT · UPDATED NOVEMBER 2026",
    "footer.top": "BACK TO TOP ↑",

    // Sticky Bar
    "sticky.items": "<strong>{count}</strong> items · <strong>{weight}</strong>",
    "sticky.newTrail": "+ New Trail",
    "sticky.viewPack": "View Pack & Weights ↑",

    // Trail Modal
    "modalTrail.title": "Plan an Expedition",
    "modalTrail.desc": "Define a route, set target distance, and start packing gears from your inventory.",
    "modalTrail.name": "Trail / Activity Name *",
    "modalTrail.namePh": "e.g. Milford Track, Overland Track, Mount Bogong",
    "modalTrail.dest": "Destination / Region",
    "modalTrail.destPh": "e.g. Fiordland, New Zealand",
    "modalTrail.status": "Status",
    "modalTrail.statusPlanned": "Planned (Upcoming)",
    "modalTrail.statusProgress": "In Progress",
    "modalTrail.statusCompleted": "Completed",
    "modalTrail.dist": "Distance (km)",
    "modalTrail.duration": "Duration (Days)",
    "modalTrail.date": "Date / Trip Period",
    "modalTrail.datePh": "e.g. November 2026",
    "modalTrail.template": "Gear Pack Starting Setup",
    "modalTrail.tplEmpty": "Start with empty pack",
    "modalTrail.tplCopy": "Copy gear pack from active trail",
    "modalTrail.notes": "Field Notes & Route Description",
    "modalTrail.notesPh": "Terrain conditions, weather precautions, pass elevation, etc.",
    "modalTrail.distPh": "e.g. 53.5",
    "modalTrail.durationPh": "e.g. 4",
    "modalTrail.cancel": "Cancel",
    "modalTrail.submit": "Save & Start Packing Gear ↓",
    "modal.close": "Close dialog",

    // Export Modal
    "modalExport.title": "Export Pack List",
    "modalExport.desc": "Share your pack breakdown, weights, and items formatted for your trail notes.",
    "modalExport.close": "Close",
    "modalExport.downloadCsv": "📥 Download LighterPack CSV",
    "modalExport.copyMd": "Copy Markdown",

    // Product Modal
    "modalProduct.officialResource": "OFFICIAL BRAND RESOURCE",
    "modalProduct.officialSite": "Official Brand Website",
    "modalProduct.specsTitle": "Technical Specifications & Parameters",
    "modalProduct.featuresTitle": "Alpine & Trail Design Features",
    "modalProduct.notesTitle": "Personal Notes & Field Experience",
    "modalProduct.prospectiveChip": "✨ PROSPECTIVE GEAR · WISHLIST",
    "modalProduct.markPurchased": "✓ Mark as Purchased (Convert to Owned)",
    "modalProduct.metaSize": "Size / Capacity",
    "modalProduct.metaWeight": "Unit Weight",
    "modalProduct.metaPrice": "Recorded Price",
    "modalProduct.metaType": "Gear Type",
    "modalProduct.metaReceipt": "Receipt / Invoice",
    "modalProduct.packTag": "EXPEDITION PACK",
    "modalProduct.btnEdit": "✏️ Edit Gear Item",
    "modalProduct.btnDelete": "🗑️ Delete Item",

    // Gear Modal
    "modalGear.addTitle": "Add Gear Item",
    "modalGear.editTitle": "Edit Gear Item",
    "modalGear.addWishTitle": "Add Wishlist Item",
    "modalGear.desc": "Add a piece of gear to your master inventory with weight, price, specs, and brand link.",
    "modalGear.modeCatalog": "<strong>Mode A</strong> Popular Brands",
    "modalGear.modeScraper": "<strong>Mode B</strong> Smart Link / Specs",
    "modalGear.modeManual": "<strong>Manual</strong> Blank Form",
    "modalGear.catalogKicker": "POPULAR BRAND CATALOG QUICK-FILL",
    "modalGear.catalogBadge": "210+ Pro Hiking Gear Catalog",
    "modalGear.catalogSearchPh": "Type brand or model (e.g. ULA Circuit, Portal 2, Mariposa, Lunar Solo, Evernew...)",
    "modalGear.brandPillsLabel": "Featured Retailers:",
    "modalGear.autofillBanner": "Autofilled from <strong>{name}</strong>! You can customize weight, price or notes below.",
    "modalGear.scraperKicker": "NICHE PRODUCT LINK & SPECS SCRAPER",
    "modalGear.scraperBadge": "Smart Auto-Detect",
    "modalGear.scraperDesc": "Paste product URL or spec text from niche/cottage brands (e.g. Zpacks, Durston, Garage Grown Gear, REI, brand sites):",
    "modalGear.scraperUrlPh": "Paste product detail page URL (https://...)",
    "modalGear.scraperSnippetToggle": "+ Paste specification / weight text (optional)",
    "modalGear.scraperSnippetPh": "Optional: paste specs text here (e.g. Weight: 28.5 oz / 808 g, Price: $240 USD, Double wall)...",
    "modalGear.scraperBtn": "⚡ Extract Gear Data",
    "modalGear.scraperUseData": "✓ Use Extracted Data",
    "modalGear.scraperItemName": "Product Name",
    "modalGear.scraperBrand": "Brand",
    "modalGear.scraperCat": "Category",
    "modalGear.weightPh": "e.g. 60, 1270, 86",
    "modalGear.pricePh": "e.g. 49.95",
    "modalGear.removePhoto": "Remove photo",
    "modalGear.manualTitle": "Manual Entry Mode",
    "modalGear.manualDesc": "Ideal for DIY custom gear, local in-store purchases, vintage items or personal supplies without online links. Fill in fields below.",
    "modalGear.name": "Product / Item Name *",
    "modalGear.namePh": "e.g. Hornet Elite OSMO 2P Tent",
    "modalGear.brand": "Brand / Manufacturer *",
    "modalGear.brandPh": "e.g. Nemo, Mont, Arc'teryx, Sea to Summit",
    "modalGear.category": "Gear System / Category *",
    "modalGear.itemType": "Item Type",
    "modalGear.itemTypePh": "e.g. tent, sleeping_pad, pack, stove",
    "modalGear.size": "Size / Capacity (optional)",
    "modalGear.sizePh": "e.g. Women's S, Regular Wide, 1100ml, 20L",
    "modalGear.weight": "Unit Weight (grams / g)",
    "modalGear.price": "Recorded Price",
    "modalGear.currency": "Currency",
    "modalGear.status": "Ownership Status *",
    "modalGear.website": "Official / Store URL (optional)",
    "modalGear.image": "Product Image URL (optional)",
    "modalGear.imagePh": "e.g. ./photos/... or https://...",
    "modalGear.summary": "Summary / One-line Description",
    "modalGear.summaryPh": "One-sentence technical overview of materials and purpose",
    "modalGear.specs": "Technical Specifications & Parameters (One per line: Key: Value)",
    "modalGear.specsPh": "Temperature Rating: Comfort -5°C | Limit -10°C\nInsulation: 850+ Loft Down\nDimensions: 183 x 51 cm\nMaterial: 20D Ripstop Nylon",
    "modalGear.features": "Alpine & Trail Features (One feature per line)",
    "modalGear.featuresPh": "Ultralight compact pack size\nMulti-function valve for rapid deflation\nPillow Lock compatible",
    "modalGear.notes": "Personal Field Notes",
    "modalGear.notesPh": "Sizing observations, performance in cold weather, etc.",
    "modalGear.cancel": "Cancel",
    "modalGear.save": "Save Gear Item",
    "modalGear.saveChanges": "Save Changes",
    "modalGear.addInventory": "Save to Inventory",
    "modalGear.addWishlist": "Add to Wishlist",

    // Categories
    "cat.sleep": "Sleep & Shelter",
    "cat.sleep.desc": "Sleeping bags, shelter, mats and the small things that make nights outside easier.",
    "cat.packs": "Packs & Essentials",
    "cat.packs.desc": "Carry systems, lighting, trekking poles and useful trail accessories.",
    "cat.cooking": "Cooking & Hydration",
    "cat.cooking.desc": "Stove, cookware, water storage and filtration.",
    "cat.food": "Food & Nutrition",
    "cat.food.desc": "Backcountry freeze-dried meals, breakfasts, trail desserts, energy gels and electrolyte hydration.",
    "cat.clothing": "Clothing & Footwear",
    "cat.clothing.desc": "Layers, weather protection and footwear for changing conditions.",
    "cat.personal": "Personal Items",
    "cat.personal.desc": "The personal supplies that still need a little more detail.",

    // Common
    "common.items": "items",
    "weight.notRecorded": "Not recorded",
    "price.notRecorded": "Not recorded",

    // User Profile & Onboarding
    "profile.editName": "Edit Nickname",
    "profile.exportBackup": "Export Full Backup (.json)",
    "profile.importBackup": "Import Gear Backup",
    "profile.startBlank": "Start Blank Kit (0 items)",
    "profile.restoreStarter": "Restore Starter Kit (82 items)",
    "profile.greeting": "Hi, {name} 👋",
    "profile.stats": "Personal Gear Profile · {count} items",
    "onboarding.title": "Welcome to Trail Gear Atlas",
    "onboarding.subtitle": "Set your hiker nickname and choose how you'd like to start your gear library",
    "onboarding.nameLabel": "Your Hiker Nickname *",
    "onboarding.namePh": "e.g. Alex, Sam, Hiker",
    "onboarding.chooseStarter": "Choose how to start your gear library:",
    "onboarding.optCuratedTitle": "Classic Curated Starter Kit (82 items)",
    "onboarding.optCuratedDesc": "Loaded with top gear from Paddy Pallin, K2 & BPL. Ideal for quick customization",
    "onboarding.optBlankTitle": "Start Fresh Blank Slate (0 items)",
    "onboarding.optBlankDesc": "Clean slate. Build your dream kit from our 214+ catalog or custom items",
    "onboarding.optImportTitle": "Import Existing Backup / Sheet (.json / .csv)",
    "onboarding.optImportDesc": "Import a previously exported Gear Atlas backup or LighterPack CSV file",
    "onboarding.btnStart": "Launch My Gear Atlas 🚀",
    "onboarding.btnSkip": "Browse first, configure later →",
    "modalGear.or": "or",
    "modalGear.uploadPhoto": "Upload Local Photo",
    "modalGear.photoCompressed": "Photo compressed (~30-50KB)",

    // Toasts
    "toast.langSwitched": "Switched language to <strong>English</strong>.",
    "toast.unitMetric": "Switched display units to <strong>Metric (g / kg)</strong>.",
    "toast.unitImperial": "Switched display units to <strong>Imperial (oz / lb)</strong>.",
    "toast.gearAdded": "Added <strong>{name}</strong> to inventory.",
    "toast.gearUpdated": "Updated <strong>{name}</strong>.",
    "toast.gearDeleted": "Item deleted.",
    "toast.packAdded": "Added <strong>{name}</strong> to pack.",
    "toast.packRemoved": "Removed <strong>{name}</strong> from pack.",
    "toast.packCleared": "Pack cleared.",
    "toast.trailSaved": "Trail saved.",
    "toast.mdCopied": "Pack summary copied to clipboard!",
    "toast.csvExported": "LighterPack CSV exported.",
    "toast.csvImported": "Successfully imported {count} items!",
    "toast.convertedOwned": "🎉 Converted <strong>{name}</strong> to Owned item!",
    "toast.profileUpdated": "Nickname updated to: <strong>{name}</strong>!",
    "toast.backupExported": "Successfully exported full backup with all custom items and photos!",
    "toast.backupImported": "Successfully restored {count} items and photos from backup!",
    "toast.blankKitCreated": "Started fresh blank kit. Click '+ Add Gear' to begin building!",
    "toast.starterRestored": "Restored 82-item starter kit!"
  }
};

function t(key, params = {}) {
  const dict = translations[currentLang] || translations["zh"];
  let str = dict[key] ?? translations["en"]?.[key] ?? key;
  if (typeof str !== "string") return str;
  for (const [k, v] of Object.entries(params)) {
    str = str.replace(new RegExp(`{${k}}`, "g"), String(v));
  }
  return str;
}

function getCategoryDisplayName(catName) {
  const map = {
    "Sleep & Shelter": "cat.sleep",
    "Packs & Essentials": "cat.packs",
    "Cooking & Hydration": "cat.cooking",
    "Food & Nutrition": "cat.food",
    "Clothing & Footwear": "cat.clothing",
    "Personal Items": "cat.personal"
  };
  const key = map[catName];
  return key ? t(key) : catName;
}

function getCategoryDescription(catName) {
  const map = {
    "Sleep & Shelter": "cat.sleep.desc",
    "Packs & Essentials": "cat.packs.desc",
    "Cooking & Hydration": "cat.cooking.desc",
    "Food & Nutrition": "cat.food.desc",
    "Clothing & Footwear": "cat.clothing.desc",
    "Personal Items": "cat.personal.desc"
  };
  const key = map[catName];
  return key ? t(key) : "";
}

const specKeyTranslationsZh = {
  "Weight": "单件重量",
  "Capacity": "容积 / 容纳人数",
  "Material": "材质用料",
  "Materials": "材质用料",
  "Fabric": "面料材质",
  "Fabrics": "面料用料",
  "Poles": "帐杆系统",
  "Dimensions": "展开尺寸",
  "Weight (Pair)": "双只重量",
  "Energy": "能量热量",
  "Insulation": "保暖隔热层",
  "Protein": "蛋白质含量",
  "Volume": "容积 / 容量",
  "Dry Weight": "干重 / 净重",
  "Floor Area": "底布使用面积",
  "Shell": "外壳面料",
  "R-Value": "隔热 R 值",
  "Thickness": "充气厚度",
  "Origin": "产地 / 制造",
  "Temperature Rating": "认证温标",
  "Packed Size": "收纳打包尺寸",
  "Floor Dimensions": "底部展开尺寸",
  "Frame": "背负支架",
  "Fill": "填充材料",
  "Packed Weight": "打包总重量",
  "Upper": "鞋面材质",
  "Membrane": "防水透气薄膜",
  "Boil Time": "烧水沸腾时间",
  "Boil Time (Shellite)": "烧水时间 (白汽油)",
  "Outsole": "大底鞋底",
  "Calories": "卡路里热量",
  "Trail Weight": "行进背负重量",
  "Max Load": "最大建议负重",
  "Fly Fabric": "外帐外层面料",
  "Water Rating": "防水指数",
  "Usable Length": "可用调节长度",
  "Closure": "闭合方式",
  "Output": "热量输出功率",
  "Net Weight": "净重量",
  "Length": "长度",
  "Waterproof Rating": "防水性能等级",
  "Battery Life": "电池续航时长",
  "Battery": "电池规格",
  "Grip": "手柄握把",
  "Cushion": "缓震性能",
  "Cushioning": "缓震科技",
  "Lining": "内衬里料",
  "Formula": "配方成分",
  "Fit": "版型 / 尺码",
  "Fit / Dimensions": "版型与尺寸",
  "Preparation": "冲泡食用方法",
  "Harness": "背带悬挂系统",
  "Head Height": "头部内部净高",
  "Center Height": "中心最高高度",
  "Comfort Rating": "舒适温标",
  "Flow Rate": "出水流速",
  "Season": "适用季节",
  "Peak Height": "最高内部净高",
  "Vestibule Area": "门厅储物面积",
  "Burn Time": "持续燃烧时长",
  "Shaft": "杖身材质",
  "Features": "核心特性",
  "Zippers": "拉链系统",
  "Hood": "风帽设计",
  "Total Weight": "整体总重",
  "Packability": "收纳压缩性",
  "Regular Price": "官方零售价",
  "Minimum Weight": "最小打包净重",
  "Minimum Trail Weight": "最小徒步重量",
  "Backpanel": "背板透气系统",
  "Dietary": "饮食偏好认证",
  "Floor Fabric": "帐底耐磨面料",
  "Max Brightness": "最大照明亮度",
  "Brightness": "照明亮度",
  "Load Range": "舒适负重范围",
  "Suspension": "减震背负系统",
  "Category": "所属分类",
  "Item Type": "物品类型",
  "Brand": "品牌",
  "Price": "价格",
  "Retailer Source": "专卖店来源",
  "Poles Required": "搭建所需手杖/帐杆",
  "Adjustment": "调节范围",
  "Ignition": "点火方式",
  "Thread": "接口螺纹",
  "Dry Net Weight": "干燥净重",
  "Capacity & Season": "容量与适用季节",
  "Doors / Vestibules": "出入门与门厅",
  "Baffle Construction": "立衬充绒结构",
  "Fill Power": "羽绒蓬松度",
  "Fill Weight": "充绒量",
  "Down Fill": "羽绒填充规格",
  "Filter Rating": "过滤精度",
  "Filter Life": "滤芯寿命",
  "Filter Lifespan": "滤芯使用寿命",
  "Filter Matrix": "滤芯滤材",
  "Filtration": "过滤方式",
  "Cartridge Lifespan": "滤芯寿命",
  "Country of Origin": "原产国",
  "Active Ingredient": "有效成分",
  "Beam Distance": "照明射程",
  "Collapsed Length": "折叠收起长度",
  "Warranty": "质保保修",
  "Stated Weight": "官方标称重量",
  "Inclusions": "随附配件清单",
  "Locking System": "锁紧锁闭系统",
  "Breathability": "透气性能",
  "Seam Sealing": "压胶防水工艺",
  "Water Filter Compatibility": "净水器滤口兼容性",
  "Design": "结构设计",
  "Components": "包含部件",
  "Composition": "成分用料",
  "Coverage": "防护覆盖",
  "Diameter": "直径",
  "Drop": "鞋前后掌落差 (Drop)",
  "Electrolytes": "电解质含量",
  "Electrolytes per tab": "单粒电解质",
  "Electrolytes per sachet": "单包电解质",
  "Carbohydrates": "碳水化合物",
  "Caffeine": "咖啡因含量",
  "Canopy": "内帐透气帐体",
  "Canopy Fabric": "内帐面料",
  "Coating": "防雨涂层工艺",
  "Cure Time": "固化修补时间",
  "Care": "清洗与保养指南"
};

function getSpecLabel(key) {
  if (currentLang !== "zh") return key;
  return specKeyTranslationsZh[key] || key;
}

function getSpecValue(key, val) {
  if (!val || typeof val !== "string") return val;
  if (currentLang !== "zh") return val;

  const directMap = {
    "1-Person · 3-4 Season All-Weather": "单人 · 3至4季全天候",
    "3-4 Season Bushwalking": "3至4季高山徒步",
    "4-Season Alpine Expedition": "4季高山远征极限",
    "4-Season All Conditions": "全季全天候高山",
    "4-Season": "4季全季高山",
    "3-Season": "3季 (春/夏/秋)",
    "2-Person": "双人",
    "1-Person": "单人",
    "3-Person": "三人"
  };
  if (directMap[val]) return directMap[val];

  let str = val;
  str = str.replace(/\b1-Person\b/gi, "单人")
           .replace(/\b2-Person\b/gi, "双人")
           .replace(/\b3-Person\b/gi, "三人")
           .replace(/\b4-Season\b/gi, "4季 (全季高山)")
           .replace(/\b3-Season\b/gi, "3季")
           .replace(/\bBushwalking\b/gi, "徒步穿越")
           .replace(/\bAlpine Expedition\b/gi, "高山远征");
  return str;
}

function getItemTypeDisplayName(type) {
  if (!type) return currentLang === "zh" ? "装备" : "Gear";
  if (currentLang !== "zh") {
    const formatted = type.replace(/_/g, " ").trim();
    return formatted.charAt(0).toUpperCase() + formatted.slice(1);
  }
  const map = {
    "tent": "帐篷 / 庇护所",
    "shelter": "天幕 / 庇护所",
    "tarp": "天幕 / 庇护所",
    "bivy": "露宿袋",
    "sleeping bag": "睡袋",
    "sleep bag": "睡袋",
    "quilt": "羽绒被 / 无底睡袋",
    "sleeping pad": "防潮垫 / 充气睡垫",
    "sleep pad": "防潮垫 / 充气睡垫",
    "pillow": "充气枕头",
    "backpack": "徒步背包",
    "pack": "徒步背包",
    "daypack": "冲顶包 / 日用包",
    "headlamp": "户外头灯",
    "lantern": "营地灯",
    "flashlight": "手电筒",
    "stove": "气炉 / 炉头",
    "cookset": "锅具套装",
    "pot": "钛锅 / 炊具",
    "cup": "钛杯 / 随身杯",
    "mug": "钛杯 / 水杯",
    "spork": "钛叉勺 / 餐具",
    "spoon": "钛勺 / 餐具",
    "water filter": "净水器 / 滤水器",
    "water bottle": "水壶 / 软水袋",
    "reservoir": "水袋 / 储水袋",
    "hydration": "储水水袋",
    "jacket": "冲锋衣 / 风衣外套",
    "rain jacket": "防雨硬壳冲锋衣",
    "wind jacket": "超轻防风风衣",
    "down jacket": "高山羽绒服",
    "fleece": "抓绒保暖层",
    "pants": "徒步长裤",
    "rain pants": "防雨雨裤",
    "shorts": "徒步短裤",
    "base layer": "排汗排热基础层",
    "shirt": "排汗速干衣",
    "shoes": "越野跑鞋 / 徒步鞋",
    "boots": "高帮登山靴",
    "trail runners": "越野跑鞋",
    "sandals": "营地拖鞋 / 凉鞋",
    "socks": "美利奴羊毛袜",
    "gloves": "防风保暖手套",
    "beanie": "保暖抓绒帽 / 毛线帽",
    "cap": "遮阳帽 / 鸭舌帽",
    "hat": "户外遮阳帽",
    "poles": "超轻登山杖",
    "trekking poles": "超轻登山杖",
    "first aid": "急救包 / 医药包",
    "satellite communicator": "卫星通信仪 (InReach)",
    "power bank": "户外充电宝",
    "charger": "充电头 / 线缆",
    "knife": "轻量折叠刀 / 多功能工具",
    "trowel": "猫铲 / 环保便携铲",
    "dry sack": "防水袋 / 收纳袋",
    "stuff sack": "收纳压缩袋",
    "dry bag": "防水袋",
    "food bag": "防熊粮袋 / 食物袋",
    "bear canister": "防熊罐",
    "wallet": "超轻零钱包",
    "umbrella": "轻量防晒徒步伞",
    "sunglasses": "运动太阳镜"
  };
  const key = type.toLowerCase().trim().replace(/_/g, " ");
  return map[key] || type;
}

function getRValueCategoryLabelZh(value) {
  if (value >= 5.0) return "高山严寒雪地防潮 (冻土地表适用)";
  if (value >= 4.0) return "全季高山保暖 (深秋初春与低温山地)";
  if (value >= 2.5) return "三季通用温和保暖 (春/夏/秋三季)";
  if (value >= 1.0) return "轻量夏季或暖季露营";
  return "全能徒步防潮";
}

let currentProductModalItemId = null;

function applyLanguage(lang) {
  currentLang = lang;
  localStorage.setItem(LANG_STORAGE_KEY, lang);
  document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";

  if (elements.btnLangZh && elements.btnLangEn) {
    elements.btnLangZh.classList.toggle("active", lang === "zh");
    elements.btnLangEn.classList.toggle("active", lang === "en");
  }

  // Update static DOM elements marked with data-i18n
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    const val = t(key);
    if (val) el.textContent = val;
  });

  document.querySelectorAll("[data-i18n-html]").forEach((el) => {
    const key = el.getAttribute("data-i18n-html");
    const val = t(key);
    if (val) el.innerHTML = val;
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.getAttribute("data-i18n-placeholder");
    const val = t(key);
    if (val) el.setAttribute("placeholder", val);
  });

  document.querySelectorAll("[data-i18n-title]").forEach((el) => {
    const key = el.getAttribute("data-i18n-title");
    const val = t(key);
    if (val) el.setAttribute("title", val);
  });

  document.querySelectorAll("[data-i18n-aria-label]").forEach((el) => {
    const key = el.getAttribute("data-i18n-aria-label");
    const val = t(key);
    if (val) el.setAttribute("aria-label", val);
  });

  // If product modal is open, re-render it in new language
  if (currentProductModalItemId && elements.productModal?.classList.contains("open")) {
    const activeItem = gear.find((g) => g.id === currentProductModalItemId);
    if (activeItem) openProductModal(activeItem);
  }

  // If export modal is open, re-generate export in new language
  if (elements.exportModal?.classList.contains("open")) {
    openExportModal();
  }
}

function formatWeight(value, opts = {}) {
  if (!Number.isFinite(value)) return t("weight.notRecorded");

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
  if (Number.isFinite(item.unitPriceAud)) return item.unitPriceAud === 0 && item.statusKey === "gift" ? t("status.gift") : new Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD" }).format(item.unitPriceAud);
  return t("price.notRecorded");
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

const INVENTORY_STORAGE_KEY = "trail_gear_atlas_inventory_v6";
const TRAILS_STORAGE_KEY = "trail_gear_atlas_trails_v6";
const ACTIVE_TRAIL_KEY = "trail_gear_active_trail_id_v6";
const VIEW_MODE_KEY = "trail_gear_view_mode_v6";

let defaultInventory = [];
let gear = [];
let trails = [];
let activeTrailId = "milford-track";
let currentLogFilter = "all";
let currentViewMode = (typeof window !== "undefined" && window.location.hash === "#wishlist")
  ? "wishlist"
  : ((typeof localStorage !== "undefined" && localStorage.getItem(VIEW_MODE_KEY)) || "owned");

function loadInventory(defaultData) {
  try {
    const raw = localStorage.getItem(INVENTORY_STORAGE_KEY) || localStorage.getItem("trail_gear_atlas_inventory_v5") || localStorage.getItem("trail_gear_atlas_inventory_v4");
    if (raw !== null) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        if (parsed.length === 0) {
          gear = [];
          return;
        }
        const parsedMap = new Map(parsed.map((item) => [item.id, item]));
        const customItems = [];
        const defaultItemsMerged = [];

        // 1. Separate user-added custom items
        for (const item of parsed) {
          const isCustom = item.isCustom || item.id?.startsWith("custom-gear-") || item.provenance === "Added by user" || !defaultData.some((d) => d.id === item.id);
          if (isCustom) {
            customItems.push({
              ...item,
              isCustom: true,
              statusKey: normalizeStatus(item.status)
            });
            parsedMap.delete(item.id);
          }
        }

        // 2. Merge default items
        for (const def of defaultData) {
          const userItem = parsedMap.get(def.id);
          if (userItem) {
            defaultItemsMerged.push({
              ...def,
              ...userItem,
              imagePath: userItem.imagePath || def.imagePath,
              imageSourceUrl: userItem.imageSourceUrl || def.imageSourceUrl,
              websiteUrl: def.websiteUrl || userItem.websiteUrl,
              statusKey: normalizeStatus(userItem.status || def.status),
            });
          } else {
            defaultItemsMerged.push({ ...def, statusKey: normalizeStatus(def.status) });
          }
        }

        // 3. User custom items always placed at the FRONT so they are immediately visible!
        gear = [...customItems, ...defaultItemsMerged];
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
      <div class="stat"><strong>${gear.length}</strong><span>${currentLang === "zh" ? "件收录装备" : "Logged items"}</span></div>
      <div class="stat"><strong>${trails.length}</strong><span>${currentLang === "zh" ? "条规划路线" : "Trails in log"}</span></div>
      <div class="stat"><strong>${categories.length}</strong><span>${currentLang === "zh" ? "大装备系统" : "Gear systems"}</span></div>
      <div class="stat"><strong>${weighted}</strong><span>${currentLang === "zh" ? "件记录克重" : "Weights recorded"}</span></div>
    `;
  }
  const heroStatSummary = document.querySelector("#hero-stat-summary");
  if (heroStatSummary) {
    heroStatSummary.innerHTML = (currentLang === "zh")
      ? `<strong><span id="hero-stat-items">${gear.length}</span></strong> 件装备 <span>·</span> <strong><span id="hero-stat-trails">${trails.length}</span></strong> 条规划路线`
      : `<strong><span id="hero-stat-items">${gear.length}</span></strong> items <span>·</span> <strong><span id="hero-stat-trails">${trails.length}</span></strong> trails`;
  }
}

function loadTrails() {
  try {
    const raw = localStorage.getItem(TRAILS_STORAGE_KEY) || localStorage.getItem(STORAGE_KEY) || localStorage.getItem("trail_gear_atlas_trails_v5") || localStorage.getItem("trail_gear_atlas_trails_v4");
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
        const savedActive = localStorage.getItem(ACTIVE_TRAIL_KEY);
        activeTrailId = (savedActive && trails.some(t => t.id === savedActive)) ? savedActive : (trails[0]?.id || "milford-track");
        saveTrails();
        return;
      }
    }
  } catch (error) {
    console.warn("Failed to parse trails from localStorage", error);
  }
  trails = JSON.parse(JSON.stringify(defaultTrails));
  const savedActive = localStorage.getItem(ACTIVE_TRAIL_KEY);
  activeTrailId = (savedActive && trails.some(t => t.id === savedActive)) ? savedActive : "milford-track";
  saveTrails();
}

function saveTrails() {
  try {
    localStorage.setItem(TRAILS_STORAGE_KEY, JSON.stringify(trails));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trails));
    localStorage.setItem(ACTIVE_TRAIL_KEY, activeTrailId);
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
            <strong class="temp-main-title">${currentLang === "zh" ? "高山认证温标评定 (ISO / EN 认证)" : "Temperature Rating (ISO / EN Certified)"}</strong>
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
            <h4 class="temp-main-title">${currentLang === "zh" ? "高山温标认证评定" : "Alpine Temperature Ratings"}</h4>
            <span class="temp-standard-tag">${escapeHtml(parsed.standard === "Standard Certified" && currentLang === "zh" ? "标准认证" : parsed.standard)}</span>
          </div>
        </div>
      </div>
      <div class="temp-levels-grid">
        ${parsed.comfort ? `
          <div class="temp-level-box temp-comfort">
            <span class="temp-level-label">${currentLang === "zh" ? "舒适温度" : "COMFORT"}</span>
            <span class="temp-level-val">${escapeHtml(parsed.comfort)}</span>
            <span class="temp-level-desc">${currentLang === "zh" ? "体感偏冷者放松睡眠适温" : "Ideal relaxed sleep for cold sleepers"}</span>
          </div>
        ` : ""}
        ${parsed.limit ? `
          <div class="temp-level-box temp-limit">
            <span class="temp-level-label">${currentLang === "zh" ? "极限下限" : "LOWER LIMIT"}</span>
            <span class="temp-level-val">${escapeHtml(parsed.limit)}</span>
            <span class="temp-level-desc">${currentLang === "zh" ? "体质偏热者防寒标准下限" : "Standard limit for warm sleepers"}</span>
          </div>
        ` : ""}
        ${parsed.extreme ? `
          <div class="temp-level-box temp-extreme">
            <span class="temp-level-label">${currentLang === "zh" ? "生存极限" : "EXTREME"}</span>
            <span class="temp-level-val">${escapeHtml(parsed.extreme)}</span>
            <span class="temp-level-desc">${currentLang === "zh" ? "仅限紧急避险，有失温风险" : "Emergency survival threshold only"}</span>
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
            <strong class="rval-title">${currentLang === "zh" ? "热阻隔热系数 (R 值)" : "Thermal Resistance (R-Value)"}</strong>
            <p class="rval-note">${escapeHtml(rvalText)}</p>
          </div>
        </div>
      </div>
    `;
  }

  const catLabel = currentLang === "zh" ? getRValueCategoryLabelZh(parsed.value) : parsed.categoryLabel;

  return `
    <div class="rval-rating-card">
      <div class="rval-top">
        <div class="rval-score-badge">
          <span class="rval-score-num">${parsed.value}</span>
          <span class="rval-score-label">${currentLang === "zh" ? "隔热 R 值" : "R-VALUE"}</span>
        </div>
        <div class="rval-details">
          <h4 class="rval-title">${currentLang === "zh" ? "ASTM F3340 国际隔热认证标准" : "ASTM F3340 Thermal Insulation"}</h4>
          <p class="rval-suitability">${parsed.seasonIcon} <strong>${escapeHtml(catLabel)}</strong></p>
          <span class="rval-note">${escapeHtml(parsed.raw)}</span>
        </div>
      </div>
    </div>
  `;
}

function renderModalPackControls(item, trail) {
  if (!trail) return `<p class="modal-no-trail">${currentLang === "zh" ? "尚未选择活动路线。" : "No active expedition selected."}</p>`;
  const packedQty = trail.pack?.[item.id] || 0;
  const isPacked = packedQty > 0;
  const weight = Number.isFinite(item.unitWeightG) ? item.unitWeightG : null;
  const lineWeight = weight ? weight * packedQty : null;

  if (isPacked) {
    return `
      <div class="modal-pack-active">
        <div class="modal-pack-status-line">
          <span class="modal-packed-check">${currentLang === "zh" ? `✓ 已放入 <strong>${escapeHtml(trail.name)}</strong>` : `✓ Packed for <strong>${escapeHtml(trail.name)}</strong>`}</span>
          <span class="modal-packed-weight">${currentLang === "zh" ? `小计 ${formatWeight(lineWeight)}` : `${formatWeight(lineWeight)} total`}</span>
        </div>
        <div class="modal-stepper-wrap">
          <button class="btn-modal-minus" data-id="${escapeHtml(item.id)}" type="button" aria-label="${currentLang === "zh" ? "减少打包数量" : "Decrease quantity"}" title="${currentLang === "zh" ? "减少打包数量" : "Decrease packed quantity"}">−</button>
          <div class="modal-stepper-center">
            <input type="number" class="modal-qty-input" data-id="${escapeHtml(item.id)}" value="${packedQty}" min="1" max="99" aria-label="${currentLang === "zh" ? "打包数量" : "Packed quantity"} for ${escapeHtml(item.name || item.itemType)}" />
            <span class="modal-stepper-unit">${currentLang === "zh" ? "件在包内" : "in pack"}</span>
          </div>
          <button class="btn-modal-plus" data-id="${escapeHtml(item.id)}" type="button" aria-label="${currentLang === "zh" ? "增加打包数量" : "Increase quantity"}" title="${currentLang === "zh" ? "增加打包数量" : "Increase packed quantity"}>+</button>
        </div>
        <button class="btn-modal-remove" data-id="${escapeHtml(item.id)}" type="button">${currentLang === "zh" ? "从当前路线背包中移除" : "Remove from active pack"}</button>
      </div>
    `;
  }

  return `
    <button class="btn-modal-pack" data-id="${escapeHtml(item.id)}" type="button">
      ${t("card.packAdd", { trail: escapeHtml(trail.name) })}
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
  currentProductModalItemId = item.id;
  const activeTrail = getActiveTrail();
  const category = categories.find((c) => c.name === item.category) || { color: "#17342e", name: item.category };
  const weight = Number.isFinite(item.unitWeightG) ? item.unitWeightG : null;
  const hasPrice = Number.isFinite(item.unitPriceAud) || Number.isFinite(item.unitPriceCny);

  const tempCallout = renderTempCallout(item);
  const rvalCallout = renderRValueCallout(item);

  const websiteCta = item.websiteUrl ? `
    <div class="modal-website-banner">
      <div class="website-banner-info">
        <span class="website-banner-label">${escapeHtml(t("modalProduct.officialResource") || "OFFICIAL BRAND RESOURCE")}</span>
        <span class="website-banner-domain">${escapeHtml(extractDomain(item.websiteUrl))}</span>
      </div>
      <a class="btn-official-website" href="${escapeHtml(item.websiteUrl)}" target="_blank" rel="noopener noreferrer" title="${currentLang === "zh" ? "在新标签页打开官网" : "Open official manufacturer website in a new tab"}">
        <span>${escapeHtml(t("modalProduct.officialSite") || "Official Brand Website")}</span>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
      </a>
    </div>
  ` : "";

  const specsEntries = Object.entries(item.specs || {});
  const specsMarkup = specsEntries.length ? `
    <div class="modal-specs-section">
      <h4 class="modal-section-title">
        <span class="section-title-icon">⚙️</span>
        <span>${escapeHtml(t("modalProduct.specsTitle") || "Technical Specifications & Parameters")}</span>
      </h4>
      <div class="specs-table">
        ${specsEntries.map(([key, val]) => `
          <div class="spec-row">
            <span class="spec-label">${escapeHtml(getSpecLabel(key))}</span>
            <span class="spec-value">${escapeHtml(getSpecValue(key, val))}</span>
          </div>
        `).join("")}
      </div>
    </div>
  ` : "";

  const featuresMarkup = item.features?.length ? `
    <div class="modal-features-section">
      <h4 class="modal-section-title">
        <span class="section-title-icon">🏔️</span>
        <span>${escapeHtml(t("modalProduct.featuresTitle") || "Alpine & Trail Design Features")}</span>
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
        <span>${escapeHtml(t("modalProduct.notesTitle") || "Personal Notes & Field Experience")}</span>
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
    const isCustomPhoto = item.imagePath.startsWith("data:");
    const photoSource = isCustomPhoto ? `
      <span class="modal-photo-source" style="background:#eef7f0; color:#1e5130; border-color:#b9d9bf; font-weight:700;">
        📸 ${currentLang === "zh" ? "用户本地实拍压缩照片" : "User local compressed photo"}
      </span>
    ` : (officialUrl ? `
      <a class="modal-photo-source" href="${escapeHtml(officialUrl)}" target="_blank" rel="noopener noreferrer" title="Official Brand Website: ${escapeHtml(extractDomain(officialUrl))}">
        ${currentLang === "zh" ? "官方品牌源" : "Official Brand Source"}: ${escapeHtml(extractDomain(officialUrl))} ↗
      </a>
    ` : "");
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
        <span>${currentLang === "zh" ? "暂无实物图" : "IMAGE TO ADD"}</span>
      </div>
    `;
  }

  const statusKey = item.statusKey || normalizeStatus(item.status);
  const isWishlist = statusKey === "wishlist";

  elements.productModalContent.innerHTML = `
    <div class="product-detail-container" style="--section-color:${category.color}">
      <div class="product-modal-header">
        <div class="product-modal-eyebrow">
          <span class="product-category-chip">${escapeHtml(getCategoryDisplayName(item.category))}</span>
          ${item.size ? `<span class="product-size-chip" title="${currentLang === "zh" ? "尺码 / 容量" : "Size / Capacity"}">📏 ${currentLang === "zh" ? "尺码" : "Size"}: ${escapeHtml(item.size)}</span>` : ""}
          ${isWishlist ? `<span class="modal-wishlist-chip">${t("modalProduct.prospectiveChip")}</span><button class="btn-modal-convert-owned" data-convert-id="${escapeHtml(item.id)}" type="button" title="${currentLang === "zh" ? "转为已拥有 / 现役装备" : "Convert to Owned / In Use kit"}">${t("modalProduct.markPurchased")}</button>` : ""}
          <select class="modal-status-select ${statusClass(item)}" data-modal-status-id="${escapeHtml(item.id)}" title="${currentLang === "zh" ? "点击切换状态" : "Click to change status"}">
            <option value="想买" ${statusKey === "wishlist" ? "selected" : ""}>${t("status.wishlist")}</option>
            <option value="使用中" ${statusKey === "in_use" ? "selected" : ""}>${t("status.in_use")}</option>
            <option value="Owned" ${statusKey === "owned" ? "selected" : ""}>${t("status.owned")}</option>
            <option value="Purchased · in inventory" ${statusKey === "purchased" ? "selected" : ""}>${t("status.purchased")}</option>
            <option value="Gift" ${statusKey === "gift" ? "selected" : ""}>${t("status.gift")}</option>
            <option value="lost" ${statusKey === "lost" ? "selected" : ""}>${t("status.lost")}</option>
            <option value="不想要了准备卖掉" ${statusKey === "selling" ? "selected" : ""}>${t("status.selling")}</option>
            <option value="退货" ${statusKey === "returned" ? "selected" : ""}>${t("status.returned")}</option>
            <option value="Older gear · ownership to confirm" ${statusKey === "older" ? "selected" : ""}>${t("status.older")}</option>
            <option value="Needs details" ${statusKey === "review" ? "selected" : ""}>${t("status.review")}</option>
          </select>
        </div>
        <div class="product-modal-brand">${escapeHtml(item.brand || (currentLang === "zh" ? "未记录品牌" : "Brand not recorded"))}</div>
        <h3 class="product-modal-name" id="modal-product-title">${escapeHtml(item.name || getItemTypeDisplayName(item.itemType))}</h3>
        ${summaryMarkup}
        ${websiteCta}
      </div>

      <div class="product-modal-layout">
        <div class="product-modal-aside">
          ${mediaMarkup}

          <div class="modal-meta-grid">
            <div class="modal-meta-box">
              <span class="modal-meta-k">${t("modalProduct.metaSize")}</span>
              <strong class="modal-meta-v ${item.size ? "" : "missing"}">${escapeHtml(item.size || (currentLang === "zh" ? "常规 / 均码" : "Standard / One Size"))}</strong>
            </div>
            <div class="modal-meta-box">
              <span class="modal-meta-k">${t("modalProduct.metaWeight")}</span>
              <strong class="modal-meta-v ${weight === null ? "missing" : ""}">${formatWeight(weight)}</strong>
              ${weight ? `<span class="modal-meta-sub">${((weight * 0.035274).toFixed(1))} oz / ${(weight / 1000).toFixed(2)} kg</span>` : ""}
            </div>
            <div class="modal-meta-box">
              <span class="modal-meta-k">${t("modalProduct.metaPrice")}</span>
              <strong class="modal-meta-v ${hasPrice ? "" : "missing"}">${formatPrice(item)}</strong>
            </div>
            <div class="modal-meta-box">
              <span class="modal-meta-k">${t("modalProduct.metaType")}</span>
              <strong class="modal-meta-v">${escapeHtml(getItemTypeDisplayName(item.itemType))}</strong>
            </div>
            <div class="modal-meta-box">
              <span class="modal-meta-k">${currentLang === "zh" ? "制造品牌" : "Brand"}</span>
              <strong class="modal-meta-v">${escapeHtml(item.brand || (currentLang === "zh" ? "未记录品牌" : "Brand not recorded"))}</strong>
            </div>
          </div>

          <div class="modal-pack-card" id="modal-pack-control-box">
            <div class="modal-pack-card-header">
              <span class="modal-pack-trail-tag">${t("modalProduct.packTag")}</span>
              <strong class="modal-pack-trail-name">${escapeHtml(activeTrail?.name || (currentLang === "zh" ? "活动路线" : "Active Trail"))}</strong>
            </div>
            <div class="modal-pack-control-inner">
              ${renderModalPackControls(item, activeTrail)}
            </div>
          </div>

          <div class="modal-item-manage-bar">
            <button class="btn-manage-edit" data-edit-id="${escapeHtml(item.id)}" type="button" title="${currentLang === "zh" ? "编辑装备名称、重量、价格与规格" : "Edit gear name, weight, price, and specs"}">
              <span class="manage-btn-icon">✏️</span> ${t("modalProduct.btnEdit")}
            </button>
            <button class="btn-manage-delete" data-delete-id="${escapeHtml(item.id)}" type="button" title="${currentLang === "zh" ? "从装备库中删除该物品" : "Remove this item from your inventory"}">
              <span class="manage-btn-icon">🗑️</span> ${t("modalProduct.btnDelete")}
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
  currentProductModalItemId = null;
  elements.productModal?.classList.remove("open");
}

function mediaMarkup(item) {
  if (!item.imagePath) {
    return `<div class="card-media media-placeholder clickable-media" data-detail-id="${escapeHtml(item.id)}" aria-label="Product image not available" title="${currentLang === "zh" ? "点击查看参数、官网与编辑" : "Click to view specs, official link & edit"}">
      <svg viewBox="0 0 180 120" aria-hidden="true"><circle cx="131" cy="35" r="16"/><path d="M8 101 55 47l30 35 19-21 62 40H8Z"/><path d="M8 110h158"/></svg>
      <span>${currentLang === "zh" ? "暂无实物图" : "IMAGE TO ADD"}</span>
    </div>`;
  }
  const alt = `${item.brand || ""} ${item.name || item.itemType || "gear"} product photo`.trim();
  return `<div class="card-media clickable-media" data-detail-id="${escapeHtml(item.id)}" title="${currentLang === "zh" ? "点击查看参数、官网与编辑" : "Click to view specs, official link & edit"}">
    <img class="product-image" src="${escapeHtml(item.imagePath)}" alt="${escapeHtml(alt)}" loading="lazy" decoding="async" />
  </div>`;
}

function renderCard(item, category) {
  const note = item.notes?.trim() ? `<p class="card-note">${escapeHtml(item.notes)}</p>` : "";
  const weight = Number.isFinite(item.unitWeightG) ? item.unitWeightG : null;
  const hasPrice = Number.isFinite(item.unitPriceAud) || Number.isFinite(item.unitPriceCny);

  const activeTrail = getActiveTrail();
  const packedQty = activeTrail?.pack?.[item.id] || 0;
  const isPacked = packedQty > 0;
  const lineWeight = weight ? weight * packedQty : null;

  const isInactive = isInactiveStatus(item.statusKey);
  const isWishlist = item.statusKey === "wishlist";
  const isCustom = Boolean(item.isCustom || item.id?.startsWith("custom-gear-"));
  const customBadge = isCustom ? `<span class="item-custom-pill" title="${t("chip.custom")}">${t("chip.custom")}</span>` : "";

  // Verification indicator: pending confirmation or approx weight
  const noteLower = (item.notes || "").toLowerCase();
  const isPending = item.statusKey === "older" || item.statusKey === "review" || /to confirm|unverified|match not verified/i.test(noteLower);
  const isApprox = /approx|stated weight|estimated/i.test(noteLower);
  const verifyBadge = isPending
    ? `<span class="badge-verification pending" title="${currentLang === "zh" ? "型号或规格待实物核验" : "Model or specs pending verification"}">${currentLang === "zh" ? "待核实" : "Unverified"}</span>`
    : (isApprox
      ? `<span class="badge-verification approx" title="${currentLang === "zh" ? "标称或估算重量" : "Estimated or stated weight"}">${currentLang === "zh" ? "估算" : "Est."}</span>`
      : "");

  let packControl = "";
  if (isPacked) {
    packControl = `<div class="card-pack-stepper is-packed ${isInactive ? "is-inactive-stepper" : ""} ${isWishlist ? "is-wishlist-stepper" : ""}" data-card-id="${escapeHtml(item.id)}">
      <button class="card-stepper-btn btn-card-minus" data-id="${escapeHtml(item.id)}" type="button" aria-label="Decrease quantity" title="Decrease packed quantity">−</button>
      <div class="card-stepper-display">
        <span class="card-stepper-qty-wrap">
          <input type="number" class="card-stepper-input" data-id="${escapeHtml(item.id)}" value="${packedQty}" min="1" max="99" aria-label="Quantity for ${escapeHtml(item.name || item.itemType)}" />
          <span class="card-stepper-label">${isWishlist ? t("card.inTrial") : t("card.inPack")}</span>
        </span>
        <span class="card-stepper-weight">${formatWeight(lineWeight)}</span>
      </div>
      <button class="card-stepper-btn btn-card-plus" data-id="${escapeHtml(item.id)}" type="button" aria-label="Increase quantity" title="Increase packed quantity">+</button>
    </div>`;
  } else {
    const trailName = escapeHtml(activeTrail?.name || (currentLang === "zh" ? "路线" : "Trail"));
    const packText = isWishlist ? t("card.packTest", { trail: trailName }) : t("card.packAdd", { trail: trailName });
    packControl = `<button class="card-pack-btn ${isInactive ? "is-inactive-pack" : ""} ${isWishlist ? "btn-wishlist-pack" : ""}" data-pack-add="${escapeHtml(item.id)}" type="button" aria-pressed="false" ${isInactive ? `title="Item is ${escapeHtml(item.status || "Inactive")}"` : ""}>
      ${packText} ${isInactive ? `(${escapeHtml(item.status)})` : ""}
    </button>`;
  }

  const packedBadge = isPacked
    ? `<div class="card-packed-badge">✓ ${packedQty > 1 ? t("card.packedBadgeMulti", { qty: packedQty }) : t("card.packedBadgeSingle")}</div>`
    : "";

  const inactiveBanner = isInactive
    ? `<div class="card-inactive-banner"><span>${escapeHtml(item.status || "Inactive")}</span></div>`
    : "";

  const wishlistRibbon = isWishlist
    ? `<div class="card-wishlist-ribbon"><span>${t("card.wishlistRibbon")}</span><button class="btn-card-mark-bought" data-convert-id="${escapeHtml(item.id)}" type="button" title="${t("card.markBought")}">${t("card.markBought")}</button></div>`
    : "";

  const statusOpts = [
    { val: "想买", key: "wishlist" },
    { val: "使用中", key: "in_use" },
    { val: "Owned", key: "owned" },
    { val: "Purchased · in inventory", key: "purchased" },
    { val: "Gift", key: "gift" },
    { val: "lost", key: "lost" },
    { val: "不想要了准备卖掉", key: "selling" },
    { val: "退货", key: "returned" },
    { val: "Older gear · ownership to confirm", key: "older" },
    { val: "Needs details", key: "review" },
  ];
  const statusOptionsHtml = statusOpts.map((opt) => `
    <option value="${opt.val}" ${item.statusKey === opt.key ? "selected" : ""}>${t("status." + opt.key)}</option>
  `).join("");

  return `<article class="gear-card ${isPacked ? "is-packed" : ""} ${isInactive ? `is-inactive-status status-${escapeHtml(item.statusKey)}` : ""} ${isWishlist ? "is-wishlist-item" : ""}" id="item-${escapeHtml(item.id)}" style="--section-color:${category.color}">
    ${wishlistRibbon}
    ${packedBadge}
    ${inactiveBanner}
    ${mediaMarkup(item)}
    <div class="card-top">
      <div class="card-type-and-size">
        ${customBadge}
        <span class="item-type">${escapeHtml(getItemTypeDisplayName(item.itemType))}</span>
        ${item.size ? `<span class="item-size-badge" title="Size / Capacity: ${escapeHtml(item.size)}">${escapeHtml(item.size)}</span>` : ""}
        ${verifyBadge}
      </div>
      <div class="card-top-actions">
        <select class="status-quick-select ${statusClass(item)}" data-status-id="${escapeHtml(item.id)}" title="${currentLang === "zh" ? "点击切换状态" : "Click to change status"}">
          ${statusOptionsHtml}
        </select>
      </div>
    </div>
    <div class="card-brand">${escapeHtml(item.brand || "Brand not recorded")}</div>
    <h4 class="card-title clickable-title" data-detail-id="${escapeHtml(item.id)}" title="${currentLang === "zh" ? "点击查看规格、官网与编辑" : "Click to view specs, official link & edit"}">${escapeHtml(item.name || item.itemType || "Unnamed item")}</h4>
    ${note}
    <div class="card-metrics">
      <div class="metric weight-metric"><span class="metric-lbl">${t("card.weight")}</span><strong class="metric-val ${weight === null ? "missing" : ""}">${formatWeight(weight)}</strong></div>
      <div class="metric price-metric"><span class="metric-lbl">${t("card.price")}</span><strong class="metric-val ${hasPrice ? "" : "missing"}">${formatPrice(item)}</strong></div>
    </div>
    <div class="card-bottom-actions">
      ${packControl}
      <button class="card-link-specs-btn" data-detail-id="${escapeHtml(item.id)}" type="button" title="${currentLang === "zh" ? "查看技术规格与编辑" : "View technical specs & edit"}">
        <span>${t("card.detailsBtn")}</span>
        <span class="detail-link-arrow">↗</span>
      </button>
    </div>
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
        // Custom user items always come first at the top of the category!
        const aCustom = Boolean(a.item.isCustom || a.item.id?.startsWith("custom-gear-"));
        const bCustom = Boolean(b.item.isCustom || b.item.id?.startsWith("custom-gear-"));
        if (aCustom !== bCustom) return aCustom ? -1 : 1;

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
  const queryTokens = query.split(/\s+/).filter(Boolean);
  const status = elements.status.value;
  return gear.filter((item) => {
    const isWishlist = item.statusKey === "wishlist";

    // View mode separation:
    // When no search query is typed, maintain clean separation between Owned and Wishlist.
    // When a specific search query is typed, search across kit items so users can find matching gear immediately!
    if (!queryTokens.length) {
      if (currentViewMode === "owned" && isWishlist) return false;
      if (currentViewMode === "wishlist" && !isWishlist) return false;
    } else {
      if (currentViewMode === "wishlist" && !isWishlist) return false;
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
    if (!queryTokens.length) return true;
    const searchableText = [item.brand, item.name, item.itemType, item.notes, item.category, item.provenance, item.status, ...(item.invoiceEvidence || [])]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    return queryTokens.every((token) => searchableText.includes(token));
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
    if (centerSub) centerSub.textContent = t("chart.baseWeight");
    if (centerWeight) centerWeight.textContent = formatWeight(metrics.baseWeightG);
    if (centerCat) centerCat.innerHTML = `<span style="opacity:0.75;">●</span> ${formatWeight(metrics.totalPackWeightG)} ${currentLang === "zh" ? "背负" : "Carried"}`;
  }

  if (totalW <= 0) {
    svg.innerHTML = `<circle cx="130" cy="130" r="90" fill="transparent" stroke="#e0e7df" stroke-width="32" stroke-dasharray="${C.toFixed(2)} 0"></circle>`;
    if (centerSub) centerSub.textContent = t("tier.empty");
    if (centerWeight) centerWeight.textContent = formatWeight(0);
    if (centerCat) centerCat.textContent = currentLang === "zh" ? "0 件装备已打包" : "0 items packed";
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
        if (centerSub) centerSub.textContent = `${seg.dataset.pct}% ${currentLang === "zh" ? "背负占比" : "OF PACK"}`;
        if (centerWeight) centerWeight.textContent = formatWeight(parseFloat(seg.dataset.weight));
        if (centerCat) centerCat.innerHTML = `<span style="color:${seg.dataset.color}">●</span> ${getCategoryDisplayName(seg.dataset.category)}`;
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
        <span>${escapeHtml(getCategoryDisplayName(cat.name))}</span>
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
    elements.categoryBarTotalLabel.textContent = `${formatWeight(metrics.totalPackWeightG, { full: true })} ${currentLang === "zh" ? "总重" : "Total"}`;
  }
  if (elements.categoryProgressBar) {
    if (metrics.totalPackWeightG > 0) {
      elements.categoryProgressBar.innerHTML = categories.map((cat) => {
        const catWeight = metrics.categoryWeights[cat.name] || 0;
        const pct = ((catWeight / metrics.totalPackWeightG) * 100).toFixed(1);
        if (catWeight <= 0) return "";
        return `<div class="category-segment" style="width:${pct}%; background:${cat.color};" title="${getCategoryDisplayName(cat.name)}: ${formatWeight(catWeight)} (${pct}%)"></div>`;
      }).join("");
    } else {
      elements.categoryProgressBar.innerHTML = `<div class="category-segment" style="width:100%; background:#d5dcd2;" title="${t("tier.empty")}"></div>`;
    }
  }

  if (elements.categoryBarLegend) {
    elements.categoryBarLegend.innerHTML = categories.map((cat) => {
      const catWeight = metrics.categoryWeights[cat.name] || 0;
      const pct = metrics.totalPackWeightG > 0 ? ((catWeight / metrics.totalPackWeightG) * 100).toFixed(0) : 0;
      return `<div class="legend-item"><span class="legend-dot" style="background:${cat.color}"></span><span>${getCategoryDisplayName(cat.name)}</span><strong>${formatWeight(catWeight)}</strong> <small style="color:#809083">(${pct}%)</small></div>`;
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
    elements.bannerRegion.textContent = trail.destination || (currentLang === "zh" ? "探险区域" : "Expedition Region");
    elements.bannerDistance.textContent = trail.distanceKm ? `${trail.distanceKm} km` : (currentLang === "zh" ? "里程待定" : "Distance TBD");
    elements.bannerDuration.textContent = trail.durationDays ? t("banner.days", { n: trail.durationDays }) : t("banner.daysTbd");
    elements.bannerDate.textContent = trail.date ? (currentLang === "zh" ? `出行时间：${trail.date}` : `Date: ${trail.date}`) : (currentLang === "zh" ? "时间待定" : "Date not set");
    elements.bannerNotes.textContent = trail.notes || (currentLang === "zh" ? "该路线暂无备忘记录。" : "No specific field notes recorded for this trail yet.");

    const statusMap = {
      planned: t("banner.status.planned"),
      "in-progress": t("banner.status.in-progress"),
      completed: t("banner.status.completed"),
    };
    elements.bannerStatusPill.className = `trail-status-pill ${trail.status || "planned"}`;
    elements.bannerStatusPill.textContent = statusMap[trail.status] || t("banner.status.planned");

    elements.btnToggleCompleteTrail.textContent = trail.status === "completed" ? t("banner.revertPlanned") : t("banner.markComplete");
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
      elements.metricTotalKg.textContent = t("metric.carried.sub", { wt: `${totalOz.toFixed(1)} oz` });
    } else {
      elements.metricTotalG.textContent = new Intl.NumberFormat("en-AU").format(metrics.totalPackWeightG);
      if (elements.metricTotalUnit) elements.metricTotalUnit.textContent = "g";
      if (metrics.wishlistItemsCount > 0) {
        elements.metricTotalKg.innerHTML = t("metric.carried.wishSub", {
          owned: (metrics.ownedWeightG / 1000).toFixed(2),
          wish: (metrics.wishlistWeightG / 1000).toFixed(2),
          count: metrics.wishlistItemsCount
        });
      } else {
        elements.metricTotalKg.textContent = t("metric.carried.sub", { wt: `${metrics.totalPackWeightKg.toFixed(2)} kg` });
      }
    }

    // 2. Base Weight
    if (isImp) {
      elements.metricBaseG.textContent = baseLb.toFixed(2);
      if (elements.metricBaseUnit) elements.metricBaseUnit.textContent = "lb";
      elements.metricBaseKg.textContent = t("metric.base.sub", { wt: `${baseOz.toFixed(1)} oz` });
    } else {
      elements.metricBaseG.textContent = new Intl.NumberFormat("en-AU").format(metrics.baseWeightG);
      if (elements.metricBaseUnit) elements.metricBaseUnit.textContent = "g";
      elements.metricBaseKg.textContent = t("metric.base.sub", { wt: `${metrics.baseWeightKg.toFixed(2)} kg` });
    }

    const baseKg = metrics.baseWeightKg;
    const tierEl = document.querySelector("#metric-base-tier");
    if (tierEl) {
      if (metrics.baseWeightG <= 0) {
        tierEl.className = "base-tier-pill";
        tierEl.textContent = t("tier.empty");
      } else if (baseKg < 4.536) {
        tierEl.className = "base-tier-pill ultralight";
        tierEl.textContent = t("tier.ultralight");
      } else if (baseKg < 9.072) {
        tierEl.className = "base-tier-pill lightweight";
        tierEl.textContent = t("tier.lightweight");
      } else {
        tierEl.className = "base-tier-pill traditional";
        tierEl.textContent = t("tier.standard");
      }
    }

    // 3. Worn Weight
    if (elements.metricWornG) {
      const wornItemNames = Object.entries(trail.pack || {})
        .filter(([id, qty]) => qty > 0 && trail.worn?.[id])
        .map(([id]) => gear.find((g) => g.id === id))
        .filter(Boolean)
        .map((g) => g.brand ? `${g.brand} ${g.itemType || g.name}` : (g.name || g.itemType));
      const wornSummary = wornItemNames.length > 0
        ? wornItemNames.slice(0, 3).join(", ") + (wornItemNames.length > 3 ? "..." : "")
        : (currentLang === "zh" ? "无随身穿戴装备" : "No worn gear");

      if (isImp) {
        elements.metricWornG.textContent = wornLb.toFixed(2);
        if (elements.metricWornUnit) elements.metricWornUnit.textContent = "lb";
        elements.metricWornSub.textContent = (currentLang === "zh")
          ? `${wornOz.toFixed(1)} oz 随身穿戴 (${wornSummary})`
          : `${wornOz.toFixed(1)} oz Worn on Body (${wornSummary})`;
      } else {
        elements.metricWornG.textContent = new Intl.NumberFormat("en-AU").format(metrics.wornWeightG);
        if (elements.metricWornUnit) elements.metricWornUnit.textContent = "g";
        elements.metricWornSub.textContent = (currentLang === "zh")
          ? `${(metrics.wornWeightG / 1000).toFixed(2)} kg 随身穿戴 (${wornSummary})`
          : `${(metrics.wornWeightG / 1000).toFixed(2)} kg Worn on Body (${wornSummary})`;
      }
    }

    // 4. Skin-Out Total
    if (elements.metricSkinoutG) {
      if (isImp) {
        elements.metricSkinoutG.textContent = skinLb.toFixed(2);
        if (elements.metricSkinoutUnit) elements.metricSkinoutUnit.textContent = "lb";
        elements.metricSkinoutSub.textContent = t("metric.skinout.sub", { wt: `${skinOz.toFixed(1)} oz` });
      } else {
        elements.metricSkinoutG.textContent = new Intl.NumberFormat("en-AU").format(metrics.skinOutWeightG);
        if (elements.metricSkinoutUnit) elements.metricSkinoutUnit.textContent = "g";
        elements.metricSkinoutSub.textContent = t("metric.skinout.sub", { wt: `${(metrics.skinOutWeightG / 1000).toFixed(2)} kg` });
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
        ? `✨ ${t("metric.wishlist.sub", { count: metrics.wishlistItemsCount })}`
        : t("metric.wishlist.sub", { count: 0 });
    }
  }

  // Header & Sticky Pack pill
  if (elements.headerTrailName) {
    elements.headerTrailName.textContent = trail.name;
    elements.headerPackWeight.textContent = formatWeight(metrics.totalPackWeightG, { onlyKg: currentUnit === "metric", onlyLb: currentUnit === "imperial" });
    const stickyStats = document.querySelector(".sticky-pack-stats");
    if (stickyStats) {
      stickyStats.innerHTML = (currentLang === "zh")
        ? `🎒 <strong id="sticky-item-count">${metrics.totalItems}</strong> 件打包装备 · <strong id="sticky-weight">${formatWeight(metrics.totalPackWeightG, { full: true })}</strong>`
        : `🎒 <strong id="sticky-item-count">${metrics.totalItems}</strong> items · <strong id="sticky-weight">${formatWeight(metrics.totalPackWeightG, { full: true })}</strong>`;
    }
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
      elements.missingWeightsText.textContent = t("missing.text", { count: metrics.missingCount });
    } else {
      elements.missingWeightsAlert.hidden = true;
      elements.missingWeightsAlert.style.display = "none";
    }
  }

  // 6. Packed Items List
  if (elements.packedItemsList) {
    const packedTitle = document.querySelector("#packed-items-title");
    if (packedTitle) {
      packedTitle.innerHTML = (currentLang === "zh")
        ? `打包清单 (<span id="packed-items-count">${metrics.totalItems}</span> 件)`
        : `Pack Checklist (<span id="packed-items-count">${metrics.totalItems}</span> items)`;
    }

    const packedEntries = Object.entries(trail.pack || {}).filter(([_, qty]) => qty > 0);
    if (!packedEntries.length) {
      elements.packedItemsList.innerHTML = `<div class="empty-pack">
        <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="#92a294" stroke-width="1.2"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
        <h4>${t("packed.emptyTitle")}</h4>
        <p>${t("packed.emptyDesc", { name: escapeHtml(trail.name) })}</p>
        <a class="btn-primary" href="#collection">${currentLang === "zh" ? "在下方挑选装备 ↓" : "Browse Gear Collection ↓"}</a>
      </div>`;
    } else {
      let html = "";
      for (const cat of categories) {
        const catItems = packedEntries
          .map(([id, qty]) => ({ item: gear.find((g) => g.id === id), qty }))
          .filter(({ item }) => item && item.category === cat.name);

        if (!catItems.length) continue;
        const catCarriedWeight = catItems.reduce((acc, { item, qty }) => {
          if (!Number.isFinite(item.unitWeightG)) return acc;
          if (trail.worn?.[item.id]) return acc;
          const split = Number(trail.shared?.[item.id]) || 1;
          return acc + (item.unitWeightG * qty) / split;
        }, 0);

        const catWornWeight = catItems.reduce((acc, { item, qty }) => {
          if (!Number.isFinite(item.unitWeightG)) return acc;
          if (!trail.worn?.[item.id]) return acc;
          const split = Number(trail.shared?.[item.id]) || 1;
          return acc + (item.unitWeightG * qty) / split;
        }, 0);

        const catSubtotal = catCarriedWeight + catWornWeight;
        const catCountText = currentLang === "zh" ? `${catItems.length} 件` : `${catItems.length} items`;
        const subtotalText = catWornWeight > 0
          ? (currentLang === "zh"
              ? `背负: ${formatWeight(catCarriedWeight)} (含穿戴: ${formatWeight(catSubtotal)})`
              : `Carried: ${formatWeight(catCarriedWeight)} (Total incl. Worn: ${formatWeight(catSubtotal)})`)
          : (currentLang === "zh"
              ? `背负小计: ${formatWeight(catCarriedWeight)}`
              : `Subtotal: ${formatWeight(catCarriedWeight)}`);

        html += `<div class="packed-category-group" style="--group-color:${cat.color}">
          <div class="packed-category-title">
            <span>${getCategoryDisplayName(cat.name)} (${catCountText})</span>
            <span>${subtotalText}</span>
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

          const wishlistChip = isWishlist ? `<span class="packed-wishlist-chip" title="${currentLang === "zh" ? "心愿单装备试装中" : "Prospective gear tested in pack"}">${t("chip.wishlist")}</span>` : "";
          const wornChip = isWorn ? `<span class="packed-worn-chip" title="${currentLang === "zh" ? "随身穿戴（不计入背负重量）" : "Worn on body (excluded from backpack weight)"}">${t("chip.worn")}</span>` : "";
          const sharedChip = isShared ? `<span class="packed-shared-chip" title="${currentLang === "zh" ? `与 ${splitRatio} 名队友平摊重量` : `Shared with ${splitRatio} teammates`}">${t("chip.shared", { split: splitRatio })}</span>` : "";

          const convertBtn = isWishlist
            ? `<button class="btn-pack-mark-bought" data-convert-id="${escapeHtml(item.id)}" type="button" title="${currentLang === "zh" ? "我已购入此装备！转入我的装备库" : "I purchased this! Move to Owned collection"}">${t("chip.bought")}</button>`
            : "";

          html += `<div class="packed-item-row ${isWishlist ? "is-wishlist-packed-row" : ""} ${isWorn ? "is-worn-row" : ""}" data-item-id="${escapeHtml(item.id)}">
            ${thumb}
            <div class="packed-item-details">
              <div class="packed-item-brand">
                <span>${escapeHtml(item.brand || (currentLang === "zh" ? "品牌待补充" : "Brand not recorded"))}</span>
                ${wishlistChip}
                ${wornChip}
                ${sharedChip}
              </div>
              <div class="packed-item-name" title="${escapeHtml(item.name || item.itemType)}">${escapeHtml(item.name || item.itemType)}</div>
            </div>

            <div class="packed-item-modifiers">
              <button class="btn-toggle-worn ${isWorn ? "active" : ""}" data-worn-id="${escapeHtml(item.id)}" type="button" title="${isWorn ? (currentLang === "zh" ? "移回背包背负" : "Move to backpack carried load") : (currentLang === "zh" ? "设为随身穿戴（不计入背重）" : "Mark as worn on body (excludes from backpack weight)")}">
                ${isWorn ? t("chip.worn") : (currentLang === "zh" ? "🎒 上包" : "🎒 In Pack")}
              </button>
              <button class="btn-toggle-shared ${isShared ? "active" : ""}" data-shared-id="${escapeHtml(item.id)}" type="button" title="${currentLang === "zh" ? `均分队友重量 (当前: 1/${splitRatio})` : `Split gear weight with partner (current: 1/${splitRatio})`}">
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
              ${isShared ? `<small class="shared-weight-detail">${currentLang === "zh" ? "单件全重" : "Full"}: ${formatWeight(fullLineWeight)}</small>` : (qty > 1 && unitW ? `<small>${formatWeight(unitW)} ${currentLang === "zh" ? "单件" : "each"}</small>` : "")}
              ${isWorn ? `<small class="worn-weight-note">(${currentLang === "zh" ? "穿戴" : "worn"})</small>` : ""}
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

  const btnAll = document.querySelector("#btn-filter-all-trails");
  const btnComp = document.querySelector("#btn-filter-completed-trails");
  const btnPlan = document.querySelector("#btn-filter-planned-trails");
  if (btnAll) btnAll.innerHTML = (currentLang === "zh") ? `全部路线 (<span id="count-all-trails">${totalTrails}</span>)` : `All Expeditions (<span id="count-all-trails">${totalTrails}</span>)`;
  if (btnComp) btnComp.innerHTML = (currentLang === "zh") ? `已完成徒步 (<span id="count-completed-trails">${completedTrails}</span>)` : `Completed Hikes (<span id="count-completed-trails">${completedTrails}</span>)`;
  if (btnPlan) btnPlan.innerHTML = (currentLang === "zh") ? `计划中 / 即将出发 (<span id="count-planned-trails">${plannedTrails}</span>)` : `Upcoming & Planned (<span id="count-planned-trails">${plannedTrails}</span>)`;

  const filtered = trails.filter((t) => {
    if (currentLogFilter === "completed") return t.status === "completed";
    if (currentLogFilter === "planned") return t.status !== "completed";
    return true;
  });

  elements.trailLogGrid.innerHTML = filtered.map((tr) => {
    const metrics = calculatePackMetrics(tr);
    const isActive = tr.id === activeTrailId;
    const statusMap = {
      planned: t("banner.status.planned"),
      "in-progress": t("banner.status.in-progress"),
      completed: t("banner.status.completed"),
    };

    const packedNames = Object.entries(tr.pack || {})
      .filter(([_, qty]) => qty > 0)
      .map(([id]) => gear.find((g) => g.id === id)?.name)
      .filter(Boolean)
      .slice(0, 3)
      .join(", ");

    return `<article class="trail-card ${isActive ? "is-active-trail" : ""}" data-trail-id="${escapeHtml(tr.id)}">
      <div class="trail-card-top">
        <span class="trail-status-pill ${tr.status || "planned"}">${statusMap[tr.status] || t("banner.status.planned")}</span>
        <span style="font-size:11px; font-weight:700; color:#78867a;">${escapeHtml(tr.date || "")}</span>
      </div>
      <h3>${escapeHtml(tr.name)}</h3>
      <div class="trail-card-region">📍 ${escapeHtml(tr.destination || (currentLang === "zh" ? "探险路线" : "Expedition route"))}</div>
      
      <div class="trail-card-metrics">
        <div class="trail-card-metric">
          <span>${t("log.distance")}</span>
          <strong>${tr.distanceKm ? `${tr.distanceKm} km` : "—"}</strong>
        </div>
        <div class="trail-card-metric">
          <span>${t("log.duration")}</span>
          <strong>${tr.durationDays ? t("banner.days", { n: tr.durationDays }) : "—"}</strong>
        </div>
        <div class="trail-card-metric">
          <span>${t("log.packLoad")}</span>
          <strong>${metrics.totalWeightKg.toFixed(2)} kg</strong>
        </div>
      </div>

      <p class="trail-card-notes">${escapeHtml(tr.notes || (currentLang === "zh" ? "暂无详细记录。" : "No notes recorded."))}</p>

      ${packedNames ? `<div class="trail-card-gear-summary"><span>🎒</span><span>${metrics.totalItems} ${currentLang === "zh" ? "件装备" : "items"} (${escapeHtml(packedNames)}...)</span></div>` : ""}

      <div class="trail-card-actions">
        ${isActive
          ? `<button class="btn-primary btn-pack-now" data-id="${escapeHtml(tr.id)}" type="button">${t("log.btnActive")}</button>`
          : `<button class="btn-primary btn-switch-trail" data-id="${escapeHtml(tr.id)}" type="button">${t("log.btnPack")}</button>`}
        <button class="btn-secondary btn-view-weights" data-id="${escapeHtml(tr.id)}" type="button">${t("log.btnWeights")}</button>
        <button class="btn-secondary btn-edit-trail-card" data-id="${escapeHtml(tr.id)}" type="button">${t("log.btnEdit")}</button>
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
    if (elements.collectionKicker) elements.collectionKicker.textContent = t("wishlist.kicker");
    if (elements.collectionTitle) elements.collectionTitle.textContent = t("wishlist.title");
    if (elements.collectionDesc) elements.collectionDesc.textContent = t("wishlist.desc", { trail: activeTrail?.name || "" });
  } else {
    if (elements.wishlistHeroBanner) elements.wishlistHeroBanner.hidden = true;
    if (elements.collectionKicker) elements.collectionKicker.textContent = currentViewMode === "all" ? (currentLang === "zh" ? "全套装备总览" : "COMPLETE REPERTOIRE") : t("collection.kicker");
    if (elements.collectionTitle) elements.collectionTitle.textContent = currentViewMode === "all" ? (currentLang === "zh" ? "全部已拥有与想买装备" : "All Owned & Planned Gear.") : t("collection.title");
    if (elements.collectionDesc) elements.collectionDesc.textContent = currentViewMode === "all" ? (currentLang === "zh" ? "浏览装备库内全部装备，包含现役已拥有物品及想买候选清单。" : "Explore all items in your kit, including currently owned equipment and prospective wishlist candidates.") : t("collection.desc");
  }

  const items = filteredItems();
  elements.count.textContent = t("search.showing", { shown: items.length, total: gear.length });
  
  if (items.length === 0 && elements.empty) {
    const rawQuery = (elements.search?.value || "").trim().toLowerCase();
    const queryTokens = rawQuery.split(/\s+/).filter(Boolean);
    const catalogMatches = queryTokens.length && popularCatalog.length
      ? popularCatalog.filter((item) => {
          const text = `${item.brand || ""} ${item.name || ""} ${item.category || ""} ${(item.retailers || []).join(" ")}`.toLowerCase();
          return queryTokens.every((token) => text.includes(token));
        }).slice(0, 4)
      : [];

    if (catalogMatches.length > 0) {
      elements.empty.innerHTML = `
        <span class="empty-badge" style="display:inline-block; padding:4px 10px; background:#eaf5ec; color:#235d39; border-radius:999px; font-size:11px; font-weight:700; margin-bottom:8px;">💡 ${currentLang === "zh" ? "在热门候选库中发现装备" : "Found in Popular Gear Catalog"}</span>
        <h3>${currentLang === "zh" ? `您的装备库暂未添加，但预置候选库（包含 Backpacking Light · K2 · Paddy Pallin）为您找到了 ${catalogMatches.length} 件相关装备：` : `Not yet in your kit, but ${catalogMatches.length} matching item(s) found in preloaded catalog:`}</h3>
        <div class="empty-catalog-suggestions" style="display:flex; flex-direction:column; gap:8px; margin:14px auto 18px; max-width:640px; text-align:left;">
          ${catalogMatches.map((catItem) => `
            <div class="empty-catalog-card" style="display:flex; align-items:center; justify-content:space-between; gap:12px; background:#fff; padding:10px 14px; border:1px solid #d9e2da; border-radius:10px; box-shadow:0 1px 3px rgba(0,0,0,0.04);">
              <div style="display:flex; align-items:center; gap:10px; min-width:0;">
                ${catItem.imagePath ? `<img src="${escapeHtml(catItem.imagePath)}" style="width:40px; height:40px; object-fit:cover; border-radius:6px; border:1px solid #e0e7df;" alt="${escapeHtml(catItem.name)}" onerror="this.style.display='none'" />` : `<div style="width:40px; height:40px; border-radius:6px; background:#f0f4f1; display:grid; place-items:center; font-size:16px;">⛺</div>`}
                <div style="min-width:0;">
                  <strong style="display:block; font-size:13px; color:#17342e; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${escapeHtml(catItem.name)}</strong>
                  <span style="font-size:11px; color:#627265;">${escapeHtml(catItem.brand)} · ${catItem.unitWeightG ? formatWeight(catItem.unitWeightG) : ""} ${catItem.unitPriceAud ? `· A$${catItem.unitPriceAud}` : ""} · 🏪 ${(catItem.retailers || []).join(" · ")}</span>
                </div>
              </div>
              <button type="button" class="btn-primary btn-empty-quickfill" data-cat-id="${escapeHtml(catItem.id)}" style="flex-shrink:0; font-size:12px; padding:6px 12px;">
                ${currentLang === "zh" ? "+ 一键填入" : "+ Quick-Add"}
              </button>
            </div>
          `).join("")}
        </div>
        <button id="reset-filters" type="button">${t("filter.reset")}</button>
      `;
      elements.empty.hidden = false;
      elements.empty.querySelector("#reset-filters")?.addEventListener("click", () => {
        elements.search.value = "";
        elements.status.value = "all";
        elements.sort.value = "original";
        render();
        elements.search.focus();
      });
    } else {
      elements.empty.innerHTML = `
        <span data-i18n="empty.noMatch">${t("empty.noMatch")}</span>
        <h3 data-i18n="empty.title">${t("empty.title")}</h3>
        <p data-i18n="empty.desc">${t("empty.desc")}</p>
        <button id="reset-filters" type="button" data-i18n="filter.reset">${t("filter.reset")}</button>
      `;
      elements.empty.hidden = false;
      elements.empty.querySelector("#reset-filters")?.addEventListener("click", () => {
        elements.search.value = "";
        elements.status.value = "all";
        elements.sort.value = "original";
        render();
        elements.search.focus();
      });
    }
  } else if (elements.empty) {
    elements.empty.hidden = true;
  }
  elements.nav.innerHTML = categories.map((category) => {
    const count = items.filter((item) => item.category === category.name).length;
    return count ? `<a href="#${category.id}">${getCategoryDisplayName(category.name)}<small>${String(count).padStart(2, "0")}</small></a>` : "";
  }).join("");
  elements.sections.innerHTML = categories.map((category, index) => {
    const categoryItems = sortedItems(items.filter((item) => item.category === category.name));
    if (!categoryItems.length) return "";
    return `<section class="gear-section" id="${category.id}" aria-labelledby="${category.id}-title" style="--section-color:${category.color}">
      <div class="section-heading"><div class="section-heading-left"><span class="section-number">${String(index + 1).padStart(2, "0")}</span><h3 id="${category.id}-title">${getCategoryDisplayName(category.name)}</h3></div><p>${getCategoryDescription(category.name)}</p></div>
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
    elements.modalTrailTitle.textContent = currentLang === "zh" ? "编辑徒步路线" : "Edit Trail Details";
    elements.formTrailId.value = trail.id;
    elements.formTrailName.value = trail.name || "";
    elements.formTrailDestination.value = trail.destination || "";
    elements.formTrailStatus.value = trail.status || "planned";
    elements.formTrailDistance.value = trail.distanceKm || "";
    elements.formTrailDuration.value = trail.durationDays || "";
    elements.formTrailDate.value = trail.date || "";
    elements.formTrailNotes.value = trail.notes || "";
    if (elements.formTemplateRow) elements.formTemplateRow.style.display = "none";
    if (elements.btnSubmitTrail) elements.btnSubmitTrail.textContent = currentLang === "zh" ? "保存修改" : "Save Changes";
  } else {
    elements.modalTrailTitle.textContent = t("modalTrail.title");
    elements.formTrailId.value = "";
    elements.formTrailStatus.value = "planned";
    if (elements.formTemplateRow) elements.formTemplateRow.style.display = "block";
    if (elements.btnSubmitTrail) elements.btnSubmitTrail.textContent = t("modalTrail.submit");
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

  showToast(currentLang === "zh"
    ? `📥 已将 <strong>${escapeHtml(trail.name)}</strong> 导出为 <strong>${slug}-lighterpack.csv</strong>！`
    : `📥 Exported <strong>${escapeHtml(trail.name)}</strong> to <strong>${slug}-lighterpack.csv</strong>!`);
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
        showToast(currentLang === "zh" ? "⚠️ 所选 CSV 表格为空或未包含数据行。" : "⚠️ The selected CSV file is empty or does not contain data rows.");
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
            brand: rawDesc.split("·")[0]?.trim() || (currentLang === "zh" ? "导入装备" : "Imported Gear"),
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
      showToast(currentLang === "zh"
        ? `📥 成功从 LighterPack CSV 导入 <strong>${importedCount} 件装备</strong>（其中 ${newItemsCreated} 件为新自建）至 <strong>${escapeHtml(trail.name)}</strong>！`
        : `📥 Successfully imported <strong>${importedCount} item(s)</strong> (${newItemsCreated} new to inventory) from LighterPack CSV into <strong>${escapeHtml(trail.name)}</strong>!`);
    } catch (err) {
      console.error("Failed to parse LighterPack CSV", err);
      showToast(currentLang === "zh" ? "⚠️ 无法解析该 CSV 文件，请确保为有效的 LighterPack CSV 格式。" : "⚠️ Could not parse CSV file. Please make sure it is a valid LighterPack CSV format.");
    }
  };
  reader.readAsText(file);
}

// =============================================================================
// Image Compression Engine (Client-side Canvas)
// =============================================================================
function compressImageFile(file, maxDimension = 600, quality = 0.82) {
  return new Promise((resolve, reject) => {
    const isImg = (file && file.type && file.type.startsWith("image/")) || /\.(jpe?g|png|webp|gif|bmp|heic|avif)$/i.test(file?.name || "");
    if (!file || !isImg) {
      reject(new Error("File is not an image"));
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;
        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        let dataUrl = "";
        try {
          dataUrl = canvas.toDataURL("image/webp", quality);
          if (!dataUrl.startsWith("data:image/webp")) {
            dataUrl = canvas.toDataURL("image/jpeg", quality);
          }
        } catch (err) {
          dataUrl = canvas.toDataURL("image/jpeg", quality);
        }
        resolve(dataUrl);
      };
      img.onerror = () => reject(new Error("Image decode failed"));
      img.src = e.target.result;
    };
    reader.onerror = () => reject(new Error("File read error"));
    reader.readAsDataURL(file);
  });
}

// =============================================================================
// User Profile & Onboarding Engine
// =============================================================================
function getUserProfile() {
  try {
    const raw = localStorage.getItem(USER_PROFILE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === "object" && parsed.name) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn("Failed to parse user profile", e);
  }
  return null;
}

function saveUserProfile(profile) {
  try {
    localStorage.setItem(USER_PROFILE_KEY, JSON.stringify(profile));
  } catch (e) {
    console.error("Failed to save user profile", e);
  }
}

function updateUserProfileUI() {
  const profile = getUserProfile();
  const userName = profile?.name || (currentLang === "zh" ? "徒步者" : "Hiker");
  const isOnboarded = Boolean(profile?.onboarded);

  if (elements.headerUserName) {
    elements.headerUserName.textContent = `Hi, ${userName}!`;
  }
  if (elements.dropdownUserGreeting) {
    elements.dropdownUserGreeting.textContent = `Hi, ${userName} 👋`;
  }
  if (elements.dropdownUserStats) {
    elements.dropdownUserStats.textContent = (currentLang === "zh")
      ? `个人装备档案 · ${gear.length} 件装备`
      : `Personal Profile · ${gear.length} items`;
  }
  const editNameText = document.querySelector("#btn-menu-edit-name span[data-i18n]");
  if (editNameText) {
    editNameText.textContent = isOnboarded
      ? (currentLang === "zh" ? "修改称呼" : "Edit Name")
      : (currentLang === "zh" ? "创建个人档案 / 导入" : "Set Up Profile / Import");
  }
}

function openOnboardingModal() {
  if (!elements.onboardingModal) return;
  elements.onboardingModal.classList.add("open");
  setTimeout(() => {
    elements.onboardingInputName?.focus();
  }, 100);
}

function closeOnboardingModal() {
  if (!elements.onboardingModal) return;
  elements.onboardingModal.classList.remove("open");
}

document.querySelector("#modal-onboarding-close")?.addEventListener("click", closeOnboardingModal);
document.querySelector("#btn-onboarding-skip")?.addEventListener("click", closeOnboardingModal);
elements.onboardingModal?.addEventListener("click", (e) => {
  if (e.target === elements.onboardingModal) closeOnboardingModal();
});

// =============================================================================
// Full Backup JSON Export & Universal Import
// =============================================================================
function exportFullBackupJson() {
  const profile = getUserProfile() || { name: "Hiker", onboarded: true };
  const backupData = {
    version: "trail-gear-atlas-v1",
    exportedAt: new Date().toISOString(),
    profile: profile,
    unit: currentUnit,
    lang: currentLang,
    trails: trails,
    activeTrailId: activeTrailId,
    inventory: gear,
  };
  const jsonStr = JSON.stringify(backupData, null, 2);
  const blob = new Blob([jsonStr], { type: "application/json;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  const sanitizedName = (profile.name || "hiker").toLowerCase().replace(/[^a-z0-9_-]+/g, "-");
  const dateStr = new Date().toISOString().slice(0, 10);
  a.href = url;
  a.download = `${sanitizedName}-gear-atlas-backup-${dateStr}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showToast(t("toast.backupExported"));
}

function importBackupOrCsvFile(file) {
  return new Promise((resolve, reject) => {
    if (!file) {
      resolve(null);
      return;
    }
    const fileName = file.name.toLowerCase();
    if (fileName.endsWith(".json")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const text = e.target.result;
          const parsed = JSON.parse(text);
          if (parsed && typeof parsed === "object") {
            if (parsed.profile) {
              saveUserProfile(parsed.profile);
            }
            if (Array.isArray(parsed.inventory)) {
              gear = parsed.inventory.map(item => ({ ...item, statusKey: normalizeStatus(item.status) }));
              saveInventory();
            } else if (Array.isArray(parsed)) {
              gear = parsed.map(item => ({ ...item, statusKey: normalizeStatus(item.status) }));
              saveInventory();
            }
            if (Array.isArray(parsed.trails)) {
              trails = parsed.trails;
              saveTrails();
            }
            if (parsed.activeTrailId) {
              activeTrailId = parsed.activeTrailId;
              localStorage.setItem(ACTIVE_TRAIL_KEY, activeTrailId);
            }
            if (parsed.unit && ["metric", "imperial"].includes(parsed.unit)) {
              currentUnit = parsed.unit;
              localStorage.setItem(UNIT_STORAGE_KEY, currentUnit);
            }
            updateUserProfileUI();
            updateInventoryStats();
            render();
            showToast(t("toast.backupImported", { count: gear.length }));
            resolve(gear);
          } else {
            resolve(null);
          }
        } catch (err) {
          console.error("Failed to parse JSON backup", err);
          showToast(currentLang === "zh" ? "JSON 备份文件解析失败，请检查格式。" : "Failed to parse JSON backup file.");
          reject(err);
        }
      };
      reader.onerror = (err) => reject(err);
      reader.readAsText(file);
    } else if (fileName.endsWith(".csv")) {
      importLighterPackCsv(file);
      resolve(gear);
    } else {
      showToast(currentLang === "zh" ? "请选择 .json 备份文件或 .csv 表格文件。" : "Please select a .json backup or .csv spreadsheet.");
      resolve(null);
    }
  });
}

function openExportModal() {
  const trail = getActiveTrail();
  if (!trail) return;
  const metrics = calculatePackMetrics(trail);

  let text = "";
  if (currentLang === "zh") {
    text += `# ${trail.name} — 徒步装备打包清单\n`;
    text += `目的地: ${trail.destination || "待定"}\n`;
    const statusText = trail.status === "completed" ? "已完成" : (trail.status === "in-progress" ? "进行中" : "计划中");
    text += `状态: ${statusText} | 总里程: ${trail.distanceKm || "—"} km | 行程天数: ${trail.durationDays || "—"} 天\n`;
    text += `出行时间: ${trail.date || "待定"}\n\n`;
    text += `--------------------------------------------------\n`;
    text += `背负总重 (PACK CARRIED LOAD): ${formatWeight(metrics.totalPackWeightG, { full: true })}\n`;
    text += `基准重量 (BASE WEIGHT，不含消耗品与穿戴): ${formatWeight(metrics.baseWeightG, { full: true })}\n`;
    text += `消耗品 (CONSUMABLES，路粮/气罐/水片): ${formatWeight(metrics.consumableWeightG, { full: true })}\n`;
    text += `随身穿戴 (WORN ON BODY，鞋靴/衣物/登山杖): ${formatWeight(metrics.wornWeightG, { full: true })} (${metrics.wornItemsCount} 件)\n`;
    text += `全身行头总重 (SKIN-OUT TOTAL): ${formatWeight(metrics.skinOutWeightG, { full: true })}\n`;
    text += `装备总数: ${metrics.totalItems} 件\n`;
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
      const catNameZh = getCategoryDisplayName(cat.name);
      text += `### ${catNameZh} (${catItems.length} 件 — ${formatWeight(catSubtotal)})\n`;

      for (const { item, qty } of catItems) {
        const isWorn = trail.worn?.[item.id];
        const split = Number(trail.shared?.[item.id]) || 1;
        const unitW = item.unitWeightG;
        let weightStr = "未记录重量";
        if (Number.isFinite(unitW)) {
          const lineW = (unitW * qty) / split;
          weightStr = formatWeight(lineW);
          if (split > 1) weightStr += ` (按 ${split} 人分摊，单件重 ${formatWeight(unitW * qty)})`;
        }
        const wornTag = isWorn ? " [随身穿戴]" : "";
        text += `- [x] ${qty > 1 ? `${qty}x ` : ""}${item.brand ? `${item.brand} ` : ""}${item.name || getItemTypeDisplayName(item.itemType)} — ${weightStr}${wornTag}\n`;
      }
      text += `\n`;
    }

    if (trail.notes) {
      text += `实测备忘与注意事项:\n${trail.notes}\n`;
    }
  } else {
    text += `# ${trail.name} — Expedition Gear Pack\n`;
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
  }

  elements.exportTextArea.value = text;
  elements.exportModal.classList.add("open");
}

function closeExportModal() {
  elements.exportModal?.classList.remove("open");
}

let popularCatalog = [];

async function loadPopularCatalog() {
  if (popularCatalog.length > 0) return popularCatalog;
  try {
    const res = await fetch("./catalog.json", { cache: "no-store" });
    if (res.ok) {
      popularCatalog = await res.json();
    }
  } catch (err) {
    console.warn("Could not load popular gear catalog", err);
  }
  return popularCatalog;
}

let currentEntryMode = "catalog";
let lastScrapedData = null;

function switchEntryMode(mode) {
  currentEntryMode = mode;
  const tabs = [elements.tabModeCatalog, elements.tabModeScraper, elements.tabModeManual];
  const panels = [elements.panelModeCatalog, elements.panelModeScraper, elements.panelModeManual];

  tabs.forEach((tab) => {
    if (!tab) return;
    const isMatch = tab.dataset.mode === mode;
    tab.classList.toggle("active", isMatch);
    tab.setAttribute("aria-selected", isMatch ? "true" : "false");
  });

  panels.forEach((p) => {
    if (!p) return;
    const isMatch = p.id === `panel-mode-${mode}`;
    p.hidden = !isMatch;
    p.classList.toggle("active", isMatch);
  });

  if (mode === "manual" && elements.formGearName) {
    elements.formGearName.focus();
  } else if (mode === "catalog" && elements.catalogSearchInput) {
    elements.catalogSearchInput.focus();
  } else if (mode === "scraper" && elements.scraperUrlInput) {
    elements.scraperUrlInput.focus();
  }
}

function initGearEntryModes() {
  [elements.tabModeCatalog, elements.tabModeScraper, elements.tabModeManual].forEach((tab) => {
    if (!tab) return;
    tab.addEventListener("click", () => switchEntryMode(tab.dataset.mode));
  });
}

function parseGearFromUrlOrText(rawUrl, rawSnippet = "") {
  let url = (rawUrl || "").trim();
  let domain = "";
  let path = "";
  try {
    if (url && !/^https?:\/\//i.test(url)) url = "https://" + url;
    if (url) {
      const parsed = new URL(url);
      domain = parsed.hostname.replace(/^www\./, "").toLowerCase();
      path = parsed.pathname;
    }
  } catch {}

  const brandMap = {
    "durstongear.com": "Durston Gear",
    "zpacks.com": "Zpacks",
    "hyperlitemountaingear.com": "Hyperlite Mountain Gear",
    "tarptent.com": "Tarptent",
    "gossamergear.com": "Gossamer Gear",
    "enlightenedequipment.com": "Enlightened Equipment",
    "garagegrowngreer.com": "Garage Grown Gear",
    "patagonia.com": "Patagonia",
    "arcteryx.com": "Arc'teryx",
    "blackdiamondequipment.com": "Black Diamond",
    "seatosummit.com": "Sea to Summit",
    "rei.com": "REI Co-op",
    "nemoequipment.com": "NEMO Equipment",
    "bigagnes.com": "Big Agnes",
    "thermarest.com": "Therm-a-Rest",
    "msrgear.com": "MSR",
    "sotooutdoors.com": "SOTO",
    "toaksoutdoor.com": "Toaks",
    "sawyer.com": "Sawyer Products",
    "hoka.com": "Hoka",
    "altrarunning.com": "Altra",
    "radixnutrition.com": "Radix Nutrition"
  };

  let brand = brandMap[domain] || "";
  if (!brand && domain) {
    const parts = domain.split(".");
    brand = parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
  }

  let slugName = path.split("/").filter(Boolean).pop() || "";
  slugName = slugName.replace(/\.[a-z0-9]+$/i, "");
  let name = slugName.replace(/[-_]+/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  // Category inference
  const combined = (name + " " + path + " " + rawSnippet).toLowerCase();
  let category = "Sleep & Shelter";
  if (/(tent|tarp|bivy|shelter|sleep|quilt|sleeping bag|pad|mat|pillow|hammock)/i.test(combined)) category = "Sleep & Shelter";
  else if (/(pack|backpack|haul|mariposa|kakwa|southwest|rucksack|daypack)/i.test(combined)) category = "Packs & Essentials";
  else if (/(stove|pot|cook|mug|kettle|water|filter|bottle|hydration|flask|squeeze|gas|fuel)/i.test(combined)) category = "Cooking & Hydration";
  else if (/(meal|food|snack|energy|nutrition|freeze-dried|cal|bar)/i.test(combined)) category = "Food & Nutrition";
  else if (/(shoe|boot|runner|jacket|fleece|hoodie|shirt|pant|sock|glove|hat|cap|shell)/i.test(combined)) category = "Clothing & Footwear";
  else if (/(lamp|light|headlamp|powerbank|battery|gps|knife|tool|first-aid|hygiene)/i.test(combined)) category = "Personal Items";

  // Weight parsing
  let weightG = null;
  const wtOzMatch = rawSnippet.match(/\b([0-9]+(?:\.[0-9]+)?)\s*(?:oz|ounces)\b/i);
  const wtGMatch = rawSnippet.match(/\b([0-9]+(?:\.[0-9]+)?)\s*(?:g|grams)\b/i);
  if (wtGMatch) {
    weightG = parseFloat(wtGMatch[1]);
  } else if (wtOzMatch) {
    weightG = Math.round(parseFloat(wtOzMatch[1]) * 28.3495 * 10) / 10;
  }

  // Price parsing
  let price = null;
  const priceMatch = rawSnippet.match(/(?:[\$¥€£]|AUD|USD|CNY)\s*([0-9]+(?:\.[0-9]+)?)/i);
  if (priceMatch) price = parseFloat(priceMatch[1]);

  return {
    name: name || (domain ? `${brand} Product` : "Custom Outdoor Gear"),
    brand: brand || "Brand",
    category,
    weightG,
    price,
    url: url || "",
    summary: rawSnippet.slice(0, 150)
  };
}

function initScraper() {
  const urlInput = elements.scraperUrlInput;
  const clearBtn = elements.scraperClearUrlBtn;
  const toggleBtn = elements.btnToggleSnippet;
  const snippetWrap = elements.scraperSnippetWrap;
  const textInput = elements.scraperTextInput;
  const scrapeBtn = elements.btnDoScrape;
  const statusEl = elements.scraperStatusIndicator;
  const previewCard = elements.scraperPreviewCard;
  const applyBtn = elements.btnApplyScraper;

  if (!urlInput || !scrapeBtn) return;

  urlInput.addEventListener("input", () => {
    if (clearBtn) clearBtn.hidden = !urlInput.value.trim();
  });

  clearBtn?.addEventListener("click", () => {
    urlInput.value = "";
    clearBtn.hidden = true;
    if (previewCard) previewCard.hidden = true;
    if (statusEl) statusEl.hidden = true;
    urlInput.focus();
  });

  toggleBtn?.addEventListener("click", () => {
    const isHidden = snippetWrap.hidden;
    snippetWrap.hidden = !isHidden;
    toggleBtn.textContent = isHidden
      ? (currentLang === "zh" ? "- 收起规格文本输入框" : "- Hide specs text box")
      : (currentLang === "zh" ? "+ 展开粘贴规格/重量文本 (选填)" : "+ Paste specification / weight text (optional)");
    if (isHidden) textInput?.focus();
  });

  scrapeBtn.addEventListener("click", async () => {
    const url = urlInput.value.trim();
    const snippet = textInput?.value.trim() || "";

    if (!url && !snippet) {
      showToast(currentLang === "zh" ? "⚠️ 请先粘贴商品网址链接，或直接输入商品规格文本。" : "⚠️ Please paste a product URL or enter specs text.");
      urlInput.focus();
      return;
    }

    if (statusEl) {
      statusEl.textContent = currentLang === "zh" ? "⏳ 正在解析网页元数据与参数..." : "⏳ Parsing page metadata and specs...";
      statusEl.hidden = false;
      statusEl.style.color = "#48634e";
    }

    scrapeBtn.disabled = true;

    // Parse base structure immediately
    const parsed = parseGearFromUrlOrText(url, snippet);

    // Attempt fetch if URL is present (with 2.5s timeout)
    if (url && /^https?:\/\//i.test(url)) {
      try {
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), 2500);
        const proxyUrl = "https://corsproxy.io/?" + encodeURIComponent(url);
        const res = await fetch(proxyUrl, { signal: controller.signal });
        clearTimeout(timer);
        if (res.ok) {
          const html = await res.text();
          const doc = new DOMParser().parseFromString(html, "text/html");
          const ogTitle = doc.querySelector('meta[property="og:title"]')?.getAttribute("content");
          const ogImg = doc.querySelector('meta[property="og:image"]')?.getAttribute("content");
          const ogDesc = doc.querySelector('meta[property="og:description"]')?.getAttribute("content");
          const ogSite = doc.querySelector('meta[property="og:site_name"]')?.getAttribute("content");

          if (ogTitle) {
            parsed.name = ogTitle.replace(/\s*[-–|].*$/, "").trim();
          }
          if (ogSite && !parsed.brand) {
            parsed.brand = ogSite;
          }
          if (ogImg) {
            parsed.imagePath = ogImg;
          }
          if (ogDesc) {
            parsed.summary = ogDesc.slice(0, 200);
          }
        }
      } catch {
        // Fallback to local parsing gracefully
      }
    }

    lastScrapedData = parsed;
    scrapeBtn.disabled = false;

    if (statusEl) {
      statusEl.textContent = currentLang === "zh" ? "✓ 解析成功！已提取基本信息与规格。" : "✓ Extracted basic specs and info.";
      statusEl.style.color = "#235d39";
    }

    // Display preview card
    if (previewCard) {
      if (elements.scraperPreviewName) elements.scraperPreviewName.textContent = parsed.name;
      if (elements.scraperPreviewBrand) elements.scraperPreviewBrand.textContent = parsed.brand;
      if (elements.scraperPreviewCat) elements.scraperPreviewCat.textContent = parsed.category;
      if (elements.scraperPreviewWeight) {
        elements.scraperPreviewWeight.textContent = Number.isFinite(parsed.weightG)
          ? `⚖️ ${formatWeight(parsed.weightG)}`
          : (currentLang === "zh" ? "⚖️ 重量需手填" : "⚖️ Weight manual entry");
      }
      if (elements.scraperPreviewPrice) {
        elements.scraperPreviewPrice.textContent = Number.isFinite(parsed.price) ? `• $${parsed.price}` : "";
      }
      if (elements.scraperPreviewUrl) elements.scraperPreviewUrl.textContent = parsed.url;
      if (elements.scraperPreviewImg && elements.scraperPreviewPh) {
        if (parsed.imagePath) {
          elements.scraperPreviewImg.src = parsed.imagePath;
          elements.scraperPreviewImg.style.display = "block";
          elements.scraperPreviewPh.style.display = "none";
        } else {
          elements.scraperPreviewImg.style.display = "none";
          elements.scraperPreviewPh.style.display = "block";
        }
      }
      previewCard.hidden = false;
    }
  });

  applyBtn?.addEventListener("click", () => {
    if (!lastScrapedData) return;
    const d = lastScrapedData;

    if (elements.formGearName) elements.formGearName.value = d.name || "";
    if (elements.formGearBrand) elements.formGearBrand.value = d.brand || "";
    if (elements.formGearCategory && d.category) elements.formGearCategory.value = d.category;
    if (elements.formGearWeight) elements.formGearWeight.value = Number.isFinite(d.weightG) ? d.weightG : "";
    if (elements.formGearPrice && Number.isFinite(d.price)) {
      elements.formGearPrice.value = d.price;
      elements.formGearCurrency.value = "AUD";
    }
    if (elements.formGearWebsite) elements.formGearWebsite.value = d.url || "";
    if (elements.formGearImage) elements.formGearImage.value = d.imagePath || "";
    setImagePreview(d.imagePath);
    if (elements.formGearSummary) elements.formGearSummary.value = d.summary || "";

    showToast(currentLang === "zh"
      ? `✨ 已成功将 <strong>${escapeHtml(d.name)}</strong> 填入下方表单！可在下方微调参数。`
      : `✨ Auto-filled <strong>${escapeHtml(d.name)}</strong> into form! Adjust specs below.`);
    previewCard.hidden = true;
    if (statusEl) statusEl.hidden = true;
    elements.formGearName?.focus();
  });
}

function initCatalogSearch() {
  const input = elements.catalogSearchInput;
  const dropdown = elements.catalogSuggestions;
  const clearBtn = elements.catalogClearBtn;
  const banner = elements.catalogAutofilledBanner;
  if (!input || !dropdown) return;

  async function handleSearch() {
    const query = input.value.trim().toLowerCase();
    if (!query) {
      dropdown.hidden = true;
      clearBtn.hidden = true;
      return;
    }

    clearBtn.hidden = false;
    const catalog = await loadPopularCatalog();
    if (!catalog.length) return;

    const queryTokens = query.split(/\s+/).filter(Boolean);
    const matches = catalog.filter((item) => {
      const text = `${item.brand || ""} ${item.name || ""} ${item.category || ""} ${item.itemType || ""} ${(item.retailers || []).join(" ")}`.toLowerCase();
      return queryTokens.every((token) => text.includes(token));
    }).slice(0, 12);

    if (!matches.length) {
      dropdown.innerHTML = `<div style="padding:14px; text-align:center; font-size:12px; color:#78887b;">
        ${currentLang === "zh" ? `未在热门库中找到与“<strong>${escapeHtml(input.value)}</strong>”匹配的装备。<br/><small style="color:#8f9d92;">您可以直接在下方手动填写，或使用“智能抓取”模式。</small>` : `No matching popular gear found for "<strong>${escapeHtml(input.value)}</strong>".<br/><small style="color:#8f9d92;">You can enter the product details manually below or use the Link Scraper.</small>`}
      </div>`;
      dropdown.hidden = false;
      return;
    }

    dropdown.innerHTML = matches.map((item) => {
      const weightDisplay = Number.isFinite(item.unitWeightG) ? formatWeight(item.unitWeightG) : "";
      const priceDisplay = Number.isFinite(item.unitPriceAud) ? `A$${item.unitPriceAud.toFixed(2)}` : "";
      const retailersDisplay = (item.retailers && item.retailers.length)
        ? `<span class="catalog-suggestion-retailer" title="Available at: ${escapeHtml(item.retailers.join(', '))}">🏪 ${escapeHtml(item.retailers.join(' · '))}</span>`
        : "";
      const thumb = item.imagePath
        ? `<img class="catalog-suggestion-thumb" src="${escapeHtml(item.imagePath)}" alt="${escapeHtml(item.name)}" onerror="this.style.display='none'" />`
        : `<div class="catalog-suggestion-thumb" style="display:grid;place-items:center;font-size:9px;color:#809080;">GEAR</div>`;

      return `<div class="catalog-suggestion-item" data-catalog-id="${escapeHtml(item.id)}">
        ${thumb}
        <div class="catalog-suggestion-details">
          <div class="catalog-suggestion-name">${escapeHtml(item.name)}</div>
          <div class="catalog-suggestion-meta">
            <span>${escapeHtml(item.brand || "Brand")}</span>
            <span>•</span>
            <span>${escapeHtml(item.category || "")}</span>
            ${weightDisplay ? `<span class="catalog-suggestion-weight">⚖️ ${weightDisplay}</span>` : ""}
            ${priceDisplay ? `<span class="catalog-suggestion-price">${priceDisplay}</span>` : ""}
            ${retailersDisplay}
          </div>
        </div>
      </div>`;
    }).join("");

    dropdown.hidden = false;
  }

  input.addEventListener("input", handleSearch);
  input.addEventListener("focus", () => {
    if (input.value.trim().length > 0) handleSearch();
  });

  clearBtn.addEventListener("click", () => {
    input.value = "";
    dropdown.hidden = true;
    clearBtn.hidden = true;
    if (elements.catalogBrandPills) {
      elements.catalogBrandPills.querySelectorAll(".brand-pill").forEach(p => p.classList.remove("active"));
    }
    input.focus();
  });

  if (elements.catalogBrandPills) {
    elements.catalogBrandPills.addEventListener("click", (e) => {
      const pill = e.target.closest(".brand-pill");
      if (!pill) return;
      const brand = pill.dataset.brand;
      if (brand) {
        input.value = brand;
        handleSearch();
        elements.catalogBrandPills.querySelectorAll(".brand-pill").forEach(p => p.classList.remove("active"));
        pill.classList.add("active");
      }
    });
  }

  dropdown.addEventListener("click", (e) => {
    const itemEl = e.target.closest(".catalog-suggestion-item");
    if (!itemEl) return;
    const catId = itemEl.dataset.catalogId;
    const item = popularCatalog.find((c) => c.id === catId);
    if (!item) return;

    elements.formGearName.value = item.name || "";
    elements.formGearBrand.value = item.brand || "";
    if (item.category && elements.formGearCategory) {
      elements.formGearCategory.value = item.category;
    }
    elements.formGearType.value = item.itemType || "";
    elements.formGearWeight.value = Number.isFinite(item.unitWeightG) ? item.unitWeightG : "";
    if (Number.isFinite(item.unitPriceAud)) {
      elements.formGearPrice.value = item.unitPriceAud;
      elements.formGearCurrency.value = "AUD";
    }
    elements.formGearWebsite.value = item.websiteUrl || "";
    elements.formGearImage.value = item.imagePath || "";
    setImagePreview(item.imagePath);
    elements.formGearSummary.value = item.summary || "";

    const specsLines = Object.entries(item.specs || {}).map(([k, v]) => `${k}: ${v}`).join("\n");
    elements.formGearSpecs.value = specsLines;
    elements.formGearFeatures.value = (item.features || []).join("\n");
    if (item.retailers && item.retailers.length && elements.formGearNotes) {
      elements.formGearNotes.value = `Stocked at ${item.retailers.join(" & ")}`;
    }

    dropdown.hidden = true;
    if (banner) {
      if (elements.autofilledItemName) elements.autofilledItemName.textContent = item.name;
      if (elements.autofilledBannerText) {
        elements.autofilledBannerText.innerHTML = t("modalGear.autofillBanner", { name: escapeHtml(item.name) });
      }
      banner.hidden = false;
    }

    showToast(currentLang === "zh"
      ? `✨ 已从 <strong>${escapeHtml(item.name)}</strong> 自动速填！<br/>可在下方微调尺码、价格或心得备注。`
      : `✨ Auto-filled from <strong>${escapeHtml(item.name)}</strong>!<br/>Adjust size, purchase price, or personal notes below.`);
  });

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".catalog-quickfill-box")) {
      dropdown.hidden = true;
    }
  });
}

function setImagePreview(src, noteText) {
  if (!elements.gearImagePreviewWrap || !elements.gearImagePreviewImg) return;
  if (src && src.trim()) {
    elements.gearImagePreviewImg.src = src.trim();
    elements.gearImagePreviewWrap.hidden = false;
    elements.gearImagePreviewWrap.removeAttribute("hidden");
    elements.gearImagePreviewWrap.style.display = "inline-flex";
    if (elements.previewImageNote) {
      elements.previewImageNote.textContent = noteText || (src.startsWith("data:") ? (currentLang === "zh" ? "已保存本地实拍照片" : "Local photo saved") : (currentLang === "zh" ? "商品图片预览" : "Product photo preview"));
    }
  } else {
    elements.gearImagePreviewImg.src = "";
    elements.gearImagePreviewWrap.hidden = true;
    elements.gearImagePreviewWrap.setAttribute("hidden", "");
    elements.gearImagePreviewWrap.style.display = "none";
    if (elements.previewImageNote) elements.previewImageNote.textContent = "";
  }
}

function openGearModal(item = null, defaultStatus = null) {
  if (!elements.gearModal || !elements.gearForm) return;
  elements.gearForm.reset();
  if (item) {
    if (elements.gearEntryModes) elements.gearEntryModes.hidden = true;
    if (elements.catalogQuickfillBox) elements.catalogQuickfillBox.hidden = true;
    elements.modalGearTitle.textContent = t("modalGear.editTitle");
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
    setImagePreview(item.imagePath);
    elements.formGearSummary.value = item.summary || "";
    
    const specsLines = Object.entries(item.specs || {}).map(([k, v]) => `${k}: ${v}`).join("\n");
    elements.formGearSpecs.value = specsLines;

    elements.formGearFeatures.value = (item.features || []).join("\n");
    elements.formGearNotes.value = item.notes || "";
    elements.btnSubmitGear.textContent = currentLang === "zh" ? "保存修改" : "Save Changes";
  } else {
    if (elements.gearEntryModes) {
      elements.gearEntryModes.hidden = false;
      switchEntryMode("catalog");
    }
    if (elements.catalogQuickfillBox) {
      elements.catalogQuickfillBox.hidden = false;
      if (elements.catalogSearchInput) elements.catalogSearchInput.value = "";
      if (elements.catalogSuggestions) elements.catalogSuggestions.hidden = true;
      if (elements.catalogClearBtn) elements.catalogClearBtn.hidden = true;
      if (elements.catalogAutofilledBanner) elements.catalogAutofilledBanner.hidden = true;
      if (elements.catalogBrandPills) {
        elements.catalogBrandPills.querySelectorAll(".brand-pill").forEach(p => p.classList.remove("active"));
      }
      loadPopularCatalog();
    }
    if (elements.scraperUrlInput) elements.scraperUrlInput.value = "";
    if (elements.scraperTextInput) elements.scraperTextInput.value = "";
    if (elements.scraperPreviewCard) elements.scraperPreviewCard.hidden = true;
    if (elements.scraperStatusIndicator) elements.scraperStatusIndicator.hidden = true;
    if (elements.scraperClearUrlBtn) elements.scraperClearUrlBtn.hidden = true;
    if (elements.formGearImageFile) elements.formGearImageFile.value = "";
    setImagePreview(null);

    const isWishlistAdd = defaultStatus === "想买" || currentViewMode === "wishlist";
    elements.modalGearTitle.textContent = isWishlistAdd ? t("modalGear.addWishTitle") : t("modalGear.addTitle");
    elements.formGearId.value = "";
    elements.formGearCurrency.value = "AUD";
    elements.formGearStatus.value = isWishlistAdd ? "想买" : "使用中";
    elements.formGearCategory.value = "Sleep & Shelter";
    if (elements.formGearSize) elements.formGearSize.value = "";
    elements.btnSubmitGear.textContent = isWishlistAdd ? (currentLang === "zh" ? "添加至想买清单" : "Add to Wishlist") : (currentLang === "zh" ? "添加至装备库" : "Add to Inventory");
  }
  elements.gearModal.classList.add("open");
  if (currentEntryMode === "catalog" && elements.catalogSearchInput) {
    elements.catalogSearchInput.focus();
  } else {
    elements.formGearName.focus();
  }
}

function closeGearModal() {
  elements.gearModal?.classList.remove("open");
  if (elements.formGearImageFile) elements.formGearImageFile.value = "";
  setImagePreview(null);
}

function deleteGearItem(itemId) {
  const item = gear.find((g) => g.id === itemId);
  if (!item) return;

  const itemDisplay = `${item.brand ? `${item.brand} ` : ""}${item.name || getItemTypeDisplayName(item.itemType)}`;
  const confirmed = currentLang === "zh"
    ? confirm(
        `确定要从装备库中删除「${itemDisplay}」吗？\n\n` +
        `• 该装备将从您的主装备库中移除。\n` +
        `• 任何规划路线背包中的打包数量也将同步扣除。\n\n` +
        `（若需找回，可随时通过个人菜单中的“恢复推荐精选库”或重新添加）`
      )
    : confirm(
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
  showToast(currentLang === "zh"
    ? `已从装备库中删除 <strong>${escapeHtml(itemDisplay)}</strong>。`
    : `Deleted <strong>${escapeHtml(itemDisplay)}</strong> from your inventory.`);
}

function resetInventory() {
  const confirmMsg = currentLang === "zh"
    ? "是否将装备库重置为初始 83 件经典精选装备？\n\n自定义编辑和新增的物品将被重置，恢复官方精选入门库。"
    : "Reset gear inventory to the curated 83 starter items?\n\nAny custom edits or added items will be discarded and default kit restored.";
  if (confirm(confirmMsg)) {
    gear = JSON.parse(JSON.stringify(defaultInventory));
    saveInventory();
    render();
    updateInventoryStats();
    showToast(currentLang === "zh" ? "已恢复官方 83 件精选装备库。" : "Curated starter kit restored (83 items).");
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
    initGearEntryModes();
    initScraper();
    initCatalogSearch();
    loadPopularCatalog().catch(() => {});

    if (window.location.hash === "#wishlist") {
      currentViewMode = "wishlist";
    } else {
      const savedView = localStorage.getItem(VIEW_MODE_KEY);
      if (savedView && ["owned", "wishlist", "all"].includes(savedView)) {
        currentViewMode = savedView;
      }
    }

    applyLanguage(currentLang);
    updateInventoryStats();
    render();

    // User profile UI (non-blocking: allow browsing immediately)
    updateUserProfileUI();
  } catch (error) {
    elements.stats.innerHTML = "<div class='loading'><strong>Inventory unavailable</strong><p>The gear data could not be loaded.</p></div>";
    elements.count.textContent = "The collection could not be loaded.";
    console.error(error);
  }
}

// Language Switcher Events
elements.btnLangZh?.addEventListener("click", () => {
  if (currentLang !== "zh") {
    applyLanguage("zh");
    updateInventoryStats();
    render();
    showToast(t("toast.langSwitched"));
  }
});

elements.btnLangEn?.addEventListener("click", () => {
  if (currentLang !== "en") {
    applyLanguage("en");
    updateInventoryStats();
    render();
    showToast(t("toast.langSwitched"));
  }
});

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
      showToast(currentLang === "zh"
        ? `装备 <strong>${escapeHtml(item.name || getItemTypeDisplayName(item.itemType))}</strong> 状态已更新为：<strong>${escapeHtml(newStatus)}</strong>${isInactive ? " (已设为灰显状态)" : ""}。`
        : `Status of <strong>${escapeHtml(item.name || item.itemType)}</strong> changed to <strong>${escapeHtml(newStatus)}</strong>${isInactive ? " (greyed out)" : ""}.`);
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
      showToast(currentLang === "zh"
        ? `装备 <strong>${escapeHtml(item.name || getItemTypeDisplayName(item.itemType))}</strong> 状态已更新为：<strong>${escapeHtml(newStatus)}</strong>${isInactive ? " (已设为灰显状态)" : ""}。`
        : `Status of <strong>${escapeHtml(item.name || item.itemType)}</strong> changed to <strong>${escapeHtml(newStatus)}</strong>${isInactive ? " (greyed out)" : ""}.`);
    }
    return;
  }
});

document.addEventListener("click", (e) => {
  // Quick fill from empty state catalog suggestion
  const quickFillBtn = e.target.closest(".btn-empty-quickfill");
  if (quickFillBtn) {
    const catId = quickFillBtn.dataset.catId;
    const catItem = popularCatalog.find((c) => c.id === catId);
    if (catItem) {
      openGearModal(null);
      elements.formGearName.value = catItem.name || "";
      elements.formGearBrand.value = catItem.brand || "";
      if (catItem.category && elements.formGearCategory) elements.formGearCategory.value = catItem.category;
      elements.formGearType.value = catItem.itemType || "";
      elements.formGearWeight.value = Number.isFinite(catItem.unitWeightG) ? catItem.unitWeightG : "";
      if (Number.isFinite(catItem.unitPriceAud)) {
        elements.formGearPrice.value = catItem.unitPriceAud;
        elements.formGearCurrency.value = "AUD";
      }
      elements.formGearWebsite.value = catItem.websiteUrl || "";
      elements.formGearImage.value = catItem.imagePath || "";
      elements.formGearSummary.value = catItem.summary || "";
      if (catItem.specs && elements.formGearSpecs) {
        elements.formGearSpecs.value = Object.entries(catItem.specs).map(([k, v]) => `${k}: ${v}`).join("\n");
      }
      if (catItem.features && elements.formGearFeatures) {
        elements.formGearFeatures.value = catItem.features.join("\n");
      }
      if (catItem.retailers && catItem.retailers.length && elements.formGearNotes) {
        elements.formGearNotes.value = `Stocked at ${catItem.retailers.join(" & ")}`;
      }
      showToast(currentLang === "zh"
        ? `✨ 已从热门装备库速选 <strong>${escapeHtml(catItem.name)}</strong>！`
        : `✨ Auto-filled <strong>${escapeHtml(catItem.name)}</strong> from catalog!`);
    }
    return;
  }

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
      showToast(t("toast.convertedOwned", { name: escapeHtml(item.name || getItemTypeDisplayName(item.itemType)) }));
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
        showToast(currentLang === "zh"
          ? `👕 已将 <strong>${escapeHtml(item?.name || "装备")}</strong> 设为<strong>随身穿戴</strong>（不计入背包负重）。`
          : `👕 Marked <strong>${escapeHtml(item?.name || "Item")}</strong> as <strong>Worn on Body</strong> (excluded from pack base weight).`);
      } else {
        showToast(currentLang === "zh"
          ? `🎒 已将 <strong>${escapeHtml(item?.name || "装备")}</strong> 移入<strong>背负行囊</strong>。`
          : `🎒 Moved <strong>${escapeHtml(item?.name || "Item")}</strong> into <strong>Pack Carried Load</strong>.`);
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
        showToast(currentLang === "zh"
          ? `👤 <strong>${escapeHtml(item?.name || "装备")}</strong> 设为<strong>单人独立背负 (1/1)</strong>。`
          : `👤 <strong>${escapeHtml(item?.name || "Item")}</strong> set to <strong>Solo Carry (1/1)</strong>.`);
      } else {
        showToast(currentLang === "zh"
          ? `👥 <strong>${escapeHtml(item?.name || "装备")}</strong> 设为<strong>队友分摊（背负 1/${nextSplit} 重量）</strong>。`
          : `👥 Shared <strong>${escapeHtml(item?.name || "Item")}</strong> with partner/team (carrying <strong>1/${nextSplit}</strong> of weight).`);
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
      showToast(t("toast.packAdded", { name: escapeHtml(item?.name || getItemTypeDisplayName(item?.itemType) || (currentLang === "zh" ? "装备" : "Item")) }));
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
        showToast(t("toast.packRemoved", { name: escapeHtml(item?.name || getItemTypeDisplayName(item?.itemType) || (currentLang === "zh" ? "装备" : "Item")) }));
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
      showToast(t("toast.packRemoved", { name: escapeHtml(item?.name || getItemTypeDisplayName(item?.itemType) || (currentLang === "zh" ? "装备" : "Item")) }));
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
    showToast(t("toast.packAdded", { name: escapeHtml(item?.name || getItemTypeDisplayName(item?.itemType) || (currentLang === "zh" ? "装备" : "Item")) }));
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
        showToast(t("toast.packRemoved", { name: escapeHtml(item?.name || getItemTypeDisplayName(item?.itemType) || (currentLang === "zh" ? "装备" : "Item")) }));
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
      showToast(currentLang === "zh"
        ? `正在为 <strong>${escapeHtml(trail.name)}</strong> 打包。请在下方挑选装备。`
        : `Now packing for <strong>${escapeHtml(trail.name)}</strong>. Select gears below.`);
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
  showToast(currentLang === "zh"
    ? `路线状态已更新为 <strong>${trail.status === "completed" ? "已完成" : "计划中"}</strong>。`
    : `Expedition status updated to <strong>${trail.status.toUpperCase()}</strong>.`);
});

elements.btnClearPack?.addEventListener("click", () => {
  const trail = getActiveTrail();
  if (!trail) return;
  const confirmMsg = currentLang === "zh"
    ? `确定要清空「${trail.name}」路线中的所有打包装备吗？`
    : `Empty all packed gear for ${trail.name}?`;
  if (confirm(confirmMsg)) {
    trail.pack = {};
    saveTrails();
    render();
    showToast(t("toast.packCleared"));
  }
});

elements.btnExportPack?.addEventListener("click", openExportModal);

// Unit toggle buttons
elements.btnUnitMetric?.addEventListener("click", () => {
  if (currentUnit !== "metric") {
    currentUnit = "metric";
    localStorage.setItem(UNIT_STORAGE_KEY, currentUnit);
    render();
    showToast(t("toast.unitMetric"));
  }
});

elements.btnUnitImperial?.addEventListener("click", () => {
  if (currentUnit !== "imperial") {
    currentUnit = "imperial";
    localStorage.setItem(UNIT_STORAGE_KEY, currentUnit);
    render();
    showToast(t("toast.unitImperial"));
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
      targetItem.imagePath = imagePath;
      targetItem.imageSourceUrl = imagePath;
      targetItem.summary = summary || null;
      targetItem.specs = Object.keys(specs).length ? specs : targetItem.specs || {};
      targetItem.features = features.length ? features : targetItem.features || [];
      targetItem.notes = notes || null;
      showToast(t("toast.gearUpdated", { name: escapeHtml(name) }));
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
      isCustom: true,
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

    // Switch view mode if needed so user immediately sees newly added item
    if (targetItem.statusKey === "wishlist" && currentViewMode === "owned") {
      currentViewMode = "wishlist";
      localStorage.setItem(VIEW_MODE_KEY, "wishlist");
      window.location.hash = "#wishlist";
    } else if (targetItem.statusKey === "owned" && currentViewMode === "wishlist") {
      currentViewMode = "owned";
      localStorage.setItem(VIEW_MODE_KEY, "owned");
      window.location.hash = "#collection";
    }

    showToast(t("toast.gearAdded", { name: escapeHtml(name) }));
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
      showToast(t("toast.trailSaved"));
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

    showToast(currentLang === "zh"
      ? `🎉 路线 <strong>${escapeHtml(newTrail.name)}</strong> 创建成功！<br/>已设为当前活动路线，请在下方挑选行囊装备。`
      : `🎉 Expedition <strong>${escapeHtml(newTrail.name)}</strong> created!<br/>Now packing for this trail. Select gears below.`);

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
  localStorage.setItem(VIEW_MODE_KEY, "owned");
  if (window.location.hash === "#wishlist") window.location.hash = "#collection";
  render();
});

elements.tabViewWishlist?.addEventListener("click", () => {
  currentViewMode = "wishlist";
  localStorage.setItem(VIEW_MODE_KEY, "wishlist");
  window.location.hash = "#wishlist";
  render();
});

elements.tabViewAll?.addEventListener("click", () => {
  currentViewMode = "all";
  localStorage.setItem(VIEW_MODE_KEY, "all");
  if (window.location.hash === "#wishlist") window.location.hash = "#collection";
  render();
});

elements.navWishlist?.addEventListener("click", (e) => {
  currentViewMode = "wishlist";
  localStorage.setItem(VIEW_MODE_KEY, "wishlist");
  window.location.hash = "#wishlist";
  render();
  setTimeout(() => {
    document.querySelector("#collection")?.scrollIntoView({ behavior: "smooth" });
  }, 50);
});

elements.btnViewOwnedKit?.addEventListener("click", () => {
  currentViewMode = "owned";
  localStorage.setItem(VIEW_MODE_KEY, "owned");
  if (window.location.hash === "#wishlist") window.location.hash = "#collection";
  render();
});

elements.btnHeroAddGear?.addEventListener("click", () => {
  openGearModal();
});

elements.btnAddWishlistGear?.addEventListener("click", () => {
  openGearModal(null, "想买");
});

window.addEventListener("hashchange", () => {
  if (window.location.hash === "#wishlist") {
    currentViewMode = "wishlist";
    localStorage.setItem(VIEW_MODE_KEY, "wishlist");
    render();
    setTimeout(() => {
      document.querySelector("#collection")?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  }
});

window.addEventListener("scroll", updateStickyBar, { passive: true });

// =============================================================================
// User Profile & Onboarding Event Listeners
// =============================================================================

// Toggle User Profile Dropdown
elements.btnUserProfile?.addEventListener("click", (e) => {
  e.stopPropagation();
  const dropdown = elements.userProfileDropdown;
  if (!dropdown) return;
  const opening = dropdown.hidden;
  dropdown.hidden = !opening;
  elements.btnUserProfile.setAttribute("aria-expanded", String(opening));
  if (opening) {
    updateUserProfileUI();
  }
});

// Close Dropdown on outside click
document.addEventListener("click", (e) => {
  if (elements.userProfileDropdown && !elements.userProfileDropdown.hidden) {
    if (!e.target.closest("#user-profile-menu-wrap")) {
      elements.userProfileDropdown.hidden = true;
      elements.btnUserProfile?.setAttribute("aria-expanded", "false");
    }
  }
});

// Edit Profile / Nickname Modal
elements.btnMenuEditName?.addEventListener("click", () => {
  if (elements.userProfileDropdown) elements.userProfileDropdown.hidden = true;
  openOnboardingModal();
});

// Export Full Backup JSON
elements.btnMenuExportBackup?.addEventListener("click", () => {
  if (elements.userProfileDropdown) elements.userProfileDropdown.hidden = true;
  exportFullBackupJson();
});

// Import Full Backup or CSV
elements.btnMenuImportBackup?.addEventListener("click", () => {
  if (elements.userProfileDropdown) elements.userProfileDropdown.hidden = true;
  elements.globalBackupFileInput?.click();
});

elements.globalBackupFileInput?.addEventListener("change", (e) => {
  const file = e.target.files?.[0];
  if (file) {
    importBackupOrCsvFile(file);
    e.target.value = "";
  }
});

// Start Blank Slate
elements.btnMenuStartBlank?.addEventListener("click", () => {
  if (elements.userProfileDropdown) elements.userProfileDropdown.hidden = true;
  const confirmMsg = currentLang === "zh"
    ? "确定要清空装备库，从零建立全新空白库吗？（建议先导出备份以防丢失）"
    : "Are you sure you want to clear your gear library and start blank? (We recommend exporting a backup first)";
  if (window.confirm(confirmMsg)) {
    gear = [];
    saveInventory();
    render();
    updateInventoryStats();
    updateUserProfileUI();
    showToast(t("toast.blankKitCreated"));
  }
});

// Restore Starter Kit (82 items)
elements.btnMenuRestoreStarter?.addEventListener("click", () => {
  if (elements.userProfileDropdown) elements.userProfileDropdown.hidden = true;
  const confirmMsg = currentLang === "zh"
    ? "确定要恢复包含 82 件常用装备的经典精选库吗？"
    : "Restore the classic 82-item curated starter kit?";
  if (window.confirm(confirmMsg)) {
    gear = JSON.parse(JSON.stringify(defaultInventory));
    saveInventory();
    render();
    updateInventoryStats();
    updateUserProfileUI();
    showToast(t("toast.starterRestored"));
  }
});

// Onboarding Starter Radio Option Toggle
document.querySelectorAll('input[name="onboarding-starter"]').forEach((radio) => {
  radio.addEventListener("change", (e) => {
    if (elements.onboardingImportWrap) {
      elements.onboardingImportWrap.hidden = e.target.value !== "import";
    }
  });
});

// Onboarding File Input chosen indicator
elements.onboardingFileInput?.addEventListener("change", (e) => {
  const file = e.target.files?.[0];
  if (elements.onboardingFileChosenName) {
    elements.onboardingFileChosenName.textContent = file
      ? (currentLang === "zh" ? `✓ 已就绪: ${file.name}` : `✓ Ready: ${file.name}`)
      : "";
  }
});

// Onboarding Form Submit
elements.onboardingForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = elements.onboardingInputName?.value.trim();
  if (!name) return;

  const starterMode = document.querySelector('input[name="onboarding-starter"]:checked')?.value || "curated";
  const newProfile = {
    name: name,
    onboarded: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  saveUserProfile(newProfile);

  if (starterMode === "blank") {
    gear = [];
    saveInventory();
    render();
    updateInventoryStats();
    showToast(t("toast.blankKitCreated"));
  } else if (starterMode === "import") {
    const importFile = elements.onboardingFileInput?.files?.[0];
    if (importFile) {
      importBackupOrCsvFile(importFile);
    } else {
      elements.globalBackupFileInput?.click();
    }
  } else {
    // Curated starter kit
    if (gear.length === 0 && defaultInventory.length > 0) {
      gear = JSON.parse(JSON.stringify(defaultInventory));
      saveInventory();
      render();
      updateInventoryStats();
    }
    showToast(currentLang === "zh" ? `Hi ${name}！已为您载入 82 件经典精选装备。` : `Hi ${name}! Curated starter kit loaded.`);
  }

  closeOnboardingModal();
  updateUserProfileUI();
});

// =============================================================================
// Local Photo Upload & Canvas Compression Event Listeners
// =============================================================================
elements.btnTriggerUploadImage?.addEventListener("click", () => {
  elements.formGearImageFile?.click();
});

elements.formGearImageFile?.addEventListener("change", async (e) => {
  const file = e.target.files?.[0];
  if (!file) return;
  try {
    setImagePreview("", currentLang === "zh" ? "正在压缩照片..." : "Compressing photo...");
    const compressedDataUrl = await compressImageFile(file, 600, 0.82);
    elements.formGearImage.value = compressedDataUrl;
    setImagePreview(compressedDataUrl, t("modalGear.photoCompressed"));
  } catch (err) {
    console.error("Failed to compress image", err);
    showToast(currentLang === "zh" ? "图片读取或压缩失败，请重试。" : "Failed to read or compress image.");
  }
});

elements.btnRemovePreviewImage?.addEventListener("click", () => {
  elements.formGearImage.value = "";
  if (elements.formGearImageFile) elements.formGearImageFile.value = "";
  setImagePreview(null);
});

elements.formGearImage?.addEventListener("input", (e) => {
  const val = e.target.value.trim();
  if (val.length > 5 && (val.startsWith("http") || val.startsWith("./") || val.startsWith("data:"))) {
    setImagePreview(val);
  } else if (!val) {
    setImagePreview(null);
  }
});

window.exportLighterPackCsv = exportLighterPackCsv;
window.importLighterPackCsv = importLighterPackCsv;
window.exportFullBackupJson = exportFullBackupJson;
window.importBackupOrCsvFile = importBackupOrCsvFile;
window.getUserProfile = getUserProfile;
window.saveUserProfile = saveUserProfile;
window.updateUserProfileUI = updateUserProfileUI;
window.compressImageFile = compressImageFile;
window.getActiveTrail = getActiveTrail;
window.formatWeight = formatWeight;
window.calculatePackMetrics = calculatePackMetrics;
window.render = render;
window.defaultTrails = defaultTrails;
window.applyLanguage = applyLanguage;
window.getCurrentLanguage = () => currentLang;
window.t = t;
window.openProductModal = openProductModal;
window.closeProductModal = closeProductModal;
window.openExportModal = openExportModal;
window.closeExportModal = closeExportModal;
window.openGearModal = openGearModal;
window.closeGearModal = closeGearModal;
window.popularCatalog = popularCatalog;

Object.defineProperty(window, "gear", {
  get: () => gear,
  set: (v) => { gear = v; saveInventory(); }
});

init();
