import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";
import faye from "faye-websocket";

const DIST_DIR = "/Users/junzhou/Documents/ChatGPT/outdoor/gear-site/dist";
const ARTIFACT_DIR = "/Users/junzhou/.gemini/antigravity/brain/a787f3ab-4007-43b6-b64c-59322d178a5f";
const HTTP_PORT = 9876;
const CHROME_PORT = 9877;
const CHROME_PATH = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const USER_DATA_DIR = `/tmp/test-chrome-profile-${Date.now()}`;

// 1. Static HTTP Server
const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
};

const server = http.createServer((req, res) => {
  let reqPath = req.url.split("?")[0].split("#")[0];
  if (reqPath === "/") reqPath = "/index.html";
  const filePath = path.join(DIST_DIR, reqPath);

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("404 Not Found");
      return;
    }
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, { "Content-Type": MIME_TYPES[ext] || "application/octet-stream" });
    fs.createReadStream(filePath).pipe(res);
  });
});

await new Promise((resolve) => server.listen(HTTP_PORT, "127.0.0.1", resolve));
console.log(`[HTTP Server] Listening on http://127.0.0.1:${HTTP_PORT}`);

// 2. Launch Chrome Headless
const chromeProcess = spawn(CHROME_PATH, [
  "--headless=new",
  `--remote-debugging-port=${CHROME_PORT}`,
  `--user-data-dir=${USER_DATA_DIR}`,
  "--no-first-run",
  "--no-default-browser-check",
  "--disable-background-networking",
  "--disable-sync",
  "--window-size=1440,1000",
]);

chromeProcess.on("error", (err) => {
  console.error("Failed to start Chrome:", err);
  process.exit(1);
});

// Wait for Chrome remote debugging port
async function getWebSocketUrl() {
  for (let i = 0; i < 30; i++) {
    try {
      const res = await fetch(`http://127.0.0.1:${CHROME_PORT}/json`);
      if (res.ok) {
        const list = await res.json();
        const page = list.find((item) => item.type === "page");
        if (page?.webSocketDebuggerUrl) return page.webSocketDebuggerUrl;
      }
    } catch (e) {}
    await new Promise((r) => setTimeout(r, 200));
  }
  throw new Error("Could not connect to Chrome debugging port");
}

const wsUrl = await getWebSocketUrl();
console.log("[CDP] Connected to Chrome Page:", wsUrl);

const ws = new faye.Client(wsUrl);

let msgId = 1;
const pendingCallbacks = new Map();

ws.on("message", (event) => {
  const data = JSON.parse(event.data);
  if (data.id && pendingCallbacks.has(data.id)) {
    const { resolve, reject } = pendingCallbacks.get(data.id);
    pendingCallbacks.delete(data.id);
    if (data.error) reject(data.error);
    else resolve(data.result);
  }
});

function send(method, params = {}) {
  return new Promise((resolve, reject) => {
    const id = msgId++;
    pendingCallbacks.set(id, { resolve, reject });
    ws.send(JSON.stringify({ id, method, params }));
  });
}

async function evalInPage(expression) {
  const res = await send("Runtime.evaluate", {
    expression,
    returnByValue: true,
    awaitPromise: true,
  });
  if (res.exceptionDetails) {
    throw new Error(`Eval error: ${res.exceptionDetails.text} (${expression})`);
  }
  return res.result?.value;
}

const testResults = [];

function recordTest(name, passed, details = "") {
  testResults.push({ name, passed, details });
  const statusMark = passed ? "✅ PASS" : "❌ FAIL";
  console.log(`${statusMark}: ${name}${details ? ` -> ${details}` : ""}`);
}

try {
  await send("Page.enable");
  await send("Runtime.enable");

  // Navigate to app
  console.log(`[Test] Navigating to http://127.0.0.1:${HTTP_PORT}/index.html ...`);
  await send("Page.navigate", { url: `http://127.0.0.1:${HTTP_PORT}/index.html` });
  await new Promise((r) => setTimeout(r, 1200));

  // Verify page initialized
  const initialized = await evalInPage("typeof window.calculatePackMetrics === 'function'");
  recordTest("Page initialized and core exports ready", initialized);

  // -------------------------------------------------------------
  // TEST 0: New User Onboarding Modal & Name Greeting
  // -------------------------------------------------------------
  console.log("\n--- TEST 0: New User Onboarding Modal & Name Greeting ---");
  const isOnboardingOpen = await evalInPage(`
    document.querySelector("#onboarding-modal")?.classList.contains("open")
  `);
  recordTest("New visitor receives onboarding welcome modal", isOnboardingOpen, `Modal visible: ${isOnboardingOpen}`);

  // Capture screenshot of Onboarding Welcome Modal
  const onboardingScreenshot = await send("Page.captureScreenshot", { format: "png" });
  const onboardingPath = path.join(ARTIFACT_DIR, "onboarding-welcome-modal.png");
  fs.writeFileSync(onboardingPath, Buffer.from(onboardingScreenshot.data, "base64"));
  console.log(`[Screenshot] Saved Onboarding modal preview to ${onboardingPath}`);

  // Fill in name "Alex" and submit with curated kit
  await evalInPage(`
    (function() {
      const nameInput = document.querySelector("#onboarding-input-name");
      nameInput.value = "Alex";
      const form = document.querySelector("#onboarding-form");
      form.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
    })()
  `);
  await new Promise((r) => setTimeout(r, 400));

  const isModalClosed = await evalInPage(`
    !document.querySelector("#onboarding-modal")?.classList.contains("open")
  `);
  const headerGreetingText = await evalInPage(`
    document.querySelector("#header-user-name")?.textContent.trim()
  `);
  const profileNameStored = await evalInPage(`
    JSON.parse(localStorage.getItem("trail_gear_atlas_user_profile_v1") || "{}").name
  `);
  recordTest("Onboarding form submits, closes modal & sets Hi Alex greeting", isModalClosed && headerGreetingText === "Hi, Alex!" && profileNameStored === "Alex", `Closed: ${isModalClosed}, Header: "${headerGreetingText}", Stored: "${profileNameStored}"`);

  // -------------------------------------------------------------
  // TEST 1: Custom Item Creation, Top-Ranking & Reload Persistence
  // -------------------------------------------------------------
  console.log("\n--- TEST 1: Custom Item Creation & Persistence ---");
  const testGearName = "Test Zpacks Plex Solo 2026";
  const testGearWeight = 395;
  const testGearPrice = 599;

  // Simulate form submission for new custom item
  await evalInPage(`
    (function() {
      const form = document.querySelector("#gear-form");
      document.querySelector("#form-gear-id").value = "";
      document.querySelector("#form-gear-name").value = "${testGearName}";
      document.querySelector("#form-gear-brand").value = "Zpacks";
      document.querySelector("#form-gear-category").value = "Sleep & Shelter";
      document.querySelector("#form-gear-type").value = "Tent";
      document.querySelector("#form-gear-weight").value = "${testGearWeight}";
      document.querySelector("#form-gear-price").value = "${testGearPrice}";
      document.querySelector("#form-gear-currency").value = "USD";
      document.querySelector("#form-gear-status").value = "在库";
      form.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
    })()
  `);
  await new Promise((r) => setTimeout(r, 400));

  // Check if item is rendered at the TOP of Sleep & Shelter category
  const shelterFirstCardTitle = await evalInPage(`
    document.querySelector("#sleep-shelter .gear-card h4")?.textContent
  `);
  const hasCustomBadge = await evalInPage(`
    Boolean(document.querySelector("#sleep-shelter .gear-card .item-custom-pill"))
  `);
  recordTest("Custom item rendered at top with custom badge", shelterFirstCardTitle === testGearName && hasCustomBadge, `Title: "${shelterFirstCardTitle}", Badge: ${hasCustomBadge}`);

  // Now RELOAD the page
  console.log("[Test 1] Reloading page to verify persistence...");
  await send("Page.reload");
  await new Promise((r) => setTimeout(r, 1200));

  const afterReloadFirstTitle = await evalInPage(`
    document.querySelector("#sleep-shelter .gear-card h4")?.textContent
  `);
  const afterReloadBadge = await evalInPage(`
    Boolean(document.querySelector("#sleep-shelter .gear-card .item-custom-pill"))
  `);
  recordTest("Custom item persists at top after page reload", afterReloadFirstTitle === testGearName && afterReloadBadge, `Title after reload: "${afterReloadFirstTitle}"`);

  // -------------------------------------------------------------
  // TEST 2: Active Trail Selection & Reload Persistence
  // -------------------------------------------------------------
  console.log("\n--- TEST 2: Active Trail Selection & Persistence ---");
  const initialTrailId = await evalInPage("window.getActiveTrail().id");
  console.log(`Initial active trail: ${initialTrailId}`);

  // Switch to "overland-track" or "routeburn-track"
  const targetTrailId = "overland-track";
  await evalInPage(`
    (function() {
      const select = document.querySelector("#active-trail-select");
      select.value = "${targetTrailId}";
      select.dispatchEvent(new Event("change", { bubbles: true }));
    })()
  `);
  await new Promise((r) => setTimeout(r, 300));

  const switchedTrailId = await evalInPage("window.getActiveTrail().id");
  recordTest("Switched active trail in app state", switchedTrailId === targetTrailId, `Active trail is now "${switchedTrailId}"`);

  console.log("[Test 2] Reloading page to verify trail persistence...");
  await send("Page.reload");
  await new Promise((r) => setTimeout(r, 1200));

  const reloadedTrailId = await evalInPage("window.getActiveTrail().id");
  const reloadedSelectValue = await evalInPage("document.querySelector('#active-trail-select').value");
  recordTest("Active trail selection persists after reload", reloadedTrailId === targetTrailId && reloadedSelectValue === targetTrailId, `Reloaded trail: ${reloadedTrailId}, Select: ${reloadedSelectValue}`);

  // -------------------------------------------------------------
  // TEST 3: Wishlist View Mode & Custom Wishlist Item Persistence
  // -------------------------------------------------------------
  console.log("\n--- TEST 3: Wishlist Mode & Item Persistence ---");
  // Click wishlist tab
  await evalInPage(`document.querySelector("#tab-view-wishlist").click()`);
  await new Promise((r) => setTimeout(r, 300));

  const testWishlistName = "Test Custom Wishlist Quilt 950FP";
  await evalInPage(`
    (function() {
      const form = document.querySelector("#gear-form");
      document.querySelector("#form-gear-id").value = "";
      document.querySelector("#form-gear-name").value = "${testWishlistName}";
      document.querySelector("#form-gear-brand").value = "Enlightened Equipment";
      document.querySelector("#form-gear-category").value = "Sleep & Shelter";
      document.querySelector("#form-gear-type").value = "Quilt";
      document.querySelector("#form-gear-weight").value = "490";
      document.querySelector("#form-gear-price").value = "450";
      document.querySelector("#form-gear-currency").value = "USD";
      document.querySelector("#form-gear-status").value = "想买";
      form.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
    })()
  `);
  await new Promise((r) => setTimeout(r, 400));

  const wishlistHasNewItem = await evalInPage(`
    Array.from(document.querySelectorAll(".gear-card h4")).some(h => h.textContent.includes("${testWishlistName}"))
  `);
  recordTest("Wishlist custom item created and visible in Wishlist view", wishlistHasNewItem);

  console.log("[Test 3] Reloading page to verify Wishlist mode & item retention...");
  await send("Page.reload");
  await new Promise((r) => setTimeout(r, 1200));

  const modeAfterReload = await evalInPage(`
    document.querySelector("#tab-view-wishlist").classList.contains("active") ? "wishlist" : "other"
  `);
  const wishlistItemStillVisible = await evalInPage(`
    Array.from(document.querySelectorAll(".gear-card h4")).some(h => h.textContent.includes("${testWishlistName}"))
  `);
  recordTest("Wishlist mode & item retain state after reload", modeAfterReload === "wishlist" && wishlistItemStillVisible, `Mode: ${modeAfterReload}, Item found: ${wishlistItemStillVisible}`);

  // Switch back to owned mode for remaining tests
  await evalInPage(`document.querySelector("#tab-view-owned").click()`);
  await new Promise((r) => setTimeout(r, 300));

  // -------------------------------------------------------------
  // TEST 4: Pack Stepper & Weight Math Verification
  // -------------------------------------------------------------
  console.log("\n--- TEST 4: Stepper & Weight Calculation Math ---");
  const metricsBefore = await evalInPage("window.calculatePackMetrics(window.getActiveTrail())");
  const initialBaseWeight = metricsBefore.baseWeightG;
  console.log(`Initial Base Weight: ${initialBaseWeight}g`);

  // Find the custom item card's pack button or plus button and click it
  await evalInPage(`
    (function() {
      const card = document.querySelector("#sleep-shelter .gear-card");
      const packBtn = card?.querySelector(".card-pack-btn");
      if (packBtn) packBtn.click();
    })()
  `);
  await new Promise((r) => setTimeout(r, 300));

  const metricsAfter = await evalInPage("window.calculatePackMetrics(window.getActiveTrail())");
  const expectedBaseWeight = initialBaseWeight + testGearWeight;
  const actualBaseWeight = metricsAfter.baseWeightG;
  recordTest("Adding item to pack correctly increments base weight", actualBaseWeight === expectedBaseWeight, `Expected: ${expectedBaseWeight}g, Got: ${actualBaseWeight}g`);

  console.log("[Test 4] Reloading page to verify pack state retention...");
  await send("Page.reload");
  await new Promise((r) => setTimeout(r, 1200));

  const metricsAfterReload = await evalInPage("window.calculatePackMetrics(window.getActiveTrail())");
  recordTest("Pack weight calculation persists across reloads", metricsAfterReload.baseWeightG === actualBaseWeight, `Base weight after reload: ${metricsAfterReload.baseWeightG}g`);

  // -------------------------------------------------------------
  // TEST 5: Unit Switcher (Metric <-> Imperial) Persistence
  // -------------------------------------------------------------
  console.log("\n--- TEST 5: Unit Switcher Persistence ---");
  await evalInPage(`document.querySelector("#btn-unit-imperial").click()`);
  await new Promise((r) => setTimeout(r, 300));

  const isImperialActive = await evalInPage(`document.querySelector("#btn-unit-imperial").classList.contains("active")`);
  recordTest("Switched unit to Imperial (oz / lb)", isImperialActive);

  console.log("[Test 5] Reloading page to verify unit switcher persistence...");
  await send("Page.reload");
  await new Promise((r) => setTimeout(r, 1200));

  const isImperialAfterReload = await evalInPage(`document.querySelector("#btn-unit-imperial").classList.contains("active")`);
  recordTest("Imperial unit preference persists after reload", isImperialAfterReload);

  // Switch back to metric
  await evalInPage(`document.querySelector("#btn-unit-metric").click()`);
  await new Promise((r) => setTimeout(r, 200));

  // -------------------------------------------------------------
  // TEST 6: Visual Layout & Screenshot Capture
  // -------------------------------------------------------------
  console.log("\n--- Visual Verification & Screenshot ---");
  const heroExists = await evalInPage(`Boolean(document.querySelector(".app-compact-hero"))`);
  const oldBulkyHeroGone = await evalInPage(`document.querySelector(".hero-inner") === null`);
  recordTest("Compact modern hero present & bulky 700px hero eliminated", heroExists && oldBulkyHeroGone);

  // Capture grid preview
  const screenshotRes = await send("Page.captureScreenshot", { format: "png" });
  const screenshotPath = path.join(ARTIFACT_DIR, "app-compact-redesign-preview.png");
  fs.writeFileSync(screenshotPath, Buffer.from(screenshotRes.data, "base64"));

  // Scroll to top and capture hero header preview
  await evalInPage("window.scrollTo({ top: 0, behavior: 'instant' })");
  await new Promise((r) => setTimeout(r, 400));
  const topScreenshot = await send("Page.captureScreenshot", { format: "png" });
  const topPath = path.join(ARTIFACT_DIR, "hero-compact-top-preview.png");
  fs.writeFileSync(topPath, Buffer.from(topScreenshot.data, "base64"));
  console.log(`[Screenshot] Saved top hero preview to ${topPath}`);

  // -------------------------------------------------------------
  // TEST 7: K2 Base Camp & Paddy Pallin Catalog Search & Autofill
  // -------------------------------------------------------------
  console.log("\n--- TEST 7: K2 Base Camp & Paddy Pallin Catalog Search ---");
  // Open gear modal
  await evalInPage(`
    (function() {
      document.querySelector("#btn-hero-add-gear")?.click();
    })()
  `);
  await new Promise((r) => setTimeout(r, 400));

  // Search "One Planet" in catalog
  await evalInPage(`
    (function() {
      const input = document.querySelector("#catalog-search-input");
      input.value = "One Planet";
      input.dispatchEvent(new Event("input", { bubbles: true }));
    })()
  `);
  await new Promise((r) => setTimeout(r, 400));

  const onePlanetResults = await evalInPage(`
    Array.from(document.querySelectorAll("#catalog-suggestions .catalog-suggestion-name")).map(el => el.textContent)
  `);
  recordTest("Search for One Planet returns K2/Paddy Pallin models", onePlanetResults.some(name => name.includes("McMillan") || name.includes("Strezlecki")), `Found: ${onePlanetResults.join(", ")}`);

  // Search "K2 Base Camp" to test retailer filtering
  await evalInPage(`
    (function() {
      const input = document.querySelector("#catalog-search-input");
      input.value = "K2 Base Camp";
      input.dispatchEvent(new Event("input", { bubbles: true }));
    })()
  `);
  await new Promise((r) => setTimeout(r, 400));

  const k2ResultsCount = await evalInPage(`
    document.querySelectorAll("#catalog-suggestions .catalog-suggestion-item").length
  `);
  const hasK2Badge = await evalInPage(`
    Boolean(document.querySelector("#catalog-suggestions .catalog-suggestion-retailer"))
  `);
  recordTest("Retailer search 'K2 Base Camp' returns items with retailer badge", k2ResultsCount > 0 && hasK2Badge, `Count: ${k2ResultsCount}, Badge visible: ${hasK2Badge}`);

  // Click on the first suggestion to test autofill
  await evalInPage(`
    (function() {
      const firstItem = document.querySelector("#catalog-suggestions .catalog-suggestion-item");
      if (firstItem) firstItem.click();
    })()
  `);
  await new Promise((r) => setTimeout(r, 400));

  const autofilledName = await evalInPage(`document.querySelector("#form-gear-name").value`);
  const autofilledWeight = await evalInPage(`document.querySelector("#form-gear-weight").value`);
  const autofilledPrice = await evalInPage(`document.querySelector("#form-gear-price").value`);
  const autofilledNotes = await evalInPage(`document.querySelector("#form-gear-notes").value`);
  recordTest("Selecting item autofills Name, Weight, Price & Retailer Note", Boolean(autofilledName && autofilledWeight && autofilledPrice && autofilledNotes.includes("Stocked at")), `Item: "${autofilledName}", Weight: ${autofilledWeight}g, Price: $${autofilledPrice}, Notes: "${autofilledNotes}"`);

  // Capture modal screenshot with autofilled K2 / Paddy Pallin gear
  const modalScreenshot = await send("Page.captureScreenshot", { format: "png" });
  const modalPath = path.join(ARTIFACT_DIR, "k2-paddy-catalog-autofill-preview.png");
  fs.writeFileSync(modalPath, Buffer.from(modalScreenshot.data, "base64"));
  console.log(`[Screenshot] Saved catalog modal preview to ${modalPath}`);

  // -------------------------------------------------------------
  // TEST 8: Backpacking Light Australia Ultralight Catalog Search
  // -------------------------------------------------------------
  console.log("\n--- TEST 8: Backpacking Light Australia Catalog Search ---");
  // Search "Backpacking Light"
  await evalInPage(`
    (function() {
      const input = document.querySelector("#catalog-search-input");
      input.value = "Backpacking Light";
      input.dispatchEvent(new Event("input", { bubbles: true }));
    })()
  `);
  await new Promise((r) => setTimeout(r, 400));

  const bplResultsCount = await evalInPage(`
    document.querySelectorAll("#catalog-suggestions .catalog-suggestion-item").length
  `);
  const hasBplBadge = await evalInPage(`
    Array.from(document.querySelectorAll("#catalog-suggestions .catalog-suggestion-retailer")).some(el => el.textContent.includes("Backpacking Light"))
  `);
  recordTest("Search 'Backpacking Light' returns ultralight items with BPL badge", bplResultsCount > 0 && hasBplBadge, `Count: ${bplResultsCount}, Badge visible: ${hasBplBadge}`);

  // Search "ULA Circuit"
  await evalInPage(`
    (function() {
      const input = document.querySelector("#catalog-search-input");
      input.value = "Circuit";
      input.dispatchEvent(new Event("input", { bubbles: true }));
    })()
  `);
  await new Promise((r) => setTimeout(r, 400));

  const circuitTitle = await evalInPage(`
    document.querySelector("#catalog-suggestions .catalog-suggestion-name")?.textContent
  `);
  recordTest("Search 'Circuit' returns ULA Circuit Backpack", circuitTitle?.includes("Circuit"), `Title: "${circuitTitle}"`);

  // Click on ULA Circuit to test autofill
  await evalInPage(`
    (function() {
      const firstItem = document.querySelector("#catalog-suggestions .catalog-suggestion-item");
      if (firstItem) firstItem.click();
    })()
  `);
  await new Promise((r) => setTimeout(r, 400));

  const ulaName = await evalInPage(`document.querySelector("#form-gear-name").value`);
  const ulaWeight = await evalInPage(`document.querySelector("#form-gear-weight").value`);
  const ulaPrice = await evalInPage(`document.querySelector("#form-gear-price").value`);
  const ulaNotes = await evalInPage(`document.querySelector("#form-gear-notes").value`);
  recordTest("ULA Circuit autofills 1048g, $549 AUD & Backpacking Light note", ulaName.includes("Circuit") && ulaWeight === "1048" && ulaPrice === "549" && ulaNotes.includes("Backpacking Light"), `Name: "${ulaName}", W: ${ulaWeight}g, $: ${ulaPrice}, Notes: "${ulaNotes}"`);

  // Capture screenshot of Backpacking Light autofilled modal
  const bplScreenshot = await send("Page.captureScreenshot", { format: "png" });
  const bplPath = path.join(ARTIFACT_DIR, "bpl-catalog-autofill-preview.png");
  fs.writeFileSync(bplPath, Buffer.from(bplScreenshot.data, "base64"));
  console.log(`[Screenshot] Saved BPL catalog modal preview to ${bplPath}`);

  // Close modal
  await evalInPage(`document.querySelector("#gear-modal-close")?.click()`);
  await new Promise((r) => setTimeout(r, 200));

  // -------------------------------------------------------------
  // TEST 9: Multilingual Language Switcher (ZH / EN)
  // -------------------------------------------------------------
  console.log("\n--- TEST 9: Multilingual Language Switcher (ZH / EN) ---");

  // 1. Switch to English
  await evalInPage(`document.querySelector("#btn-lang-en")?.click()`);
  await new Promise((r) => setTimeout(r, 300));

  const enActive = await evalInPage(`document.querySelector("#btn-lang-en")?.classList.contains("active")`);
  const enAddBtnText = await evalInPage(`document.querySelector("#btn-add-gear")?.textContent.trim()`);
  const enCarriedLabel = await evalInPage(`document.querySelector(".weight-card.primary .weight-card-label")?.textContent.trim()`);
  const enBaseLabel = await evalInPage(`document.querySelector("#metric-card-base .weight-card-label")?.textContent.trim()`);
  const enFirstCat = await evalInPage(`document.querySelector(".gear-section h3")?.textContent.trim()`);
  const enStoredLang = await evalInPage(`localStorage.getItem("trail_gear_atlas_lang")`);

  const enPassed = enActive &&
    enAddBtnText === "+ Add Gear Item" &&
    enCarriedLabel.includes("PACK CARRIED LOAD") &&
    enBaseLabel.includes("BASE WEIGHT") &&
    enFirstCat === "Sleep & Shelter" &&
    enStoredLang === "en";

  recordTest("Switching to English (EN) updates headers, buttons, cards & categories to pure English", enPassed, `Btn: "${enAddBtnText}", Carried: "${enCarriedLabel}", Cat: "${enFirstCat}", Stored: "${enStoredLang}"`);

  // Capture screenshot of English UI
  const enScreenshot = await send("Page.captureScreenshot", { format: "png" });
  const enPath = path.join(ARTIFACT_DIR, "app-bilingual-en-preview.png");
  fs.writeFileSync(enPath, Buffer.from(enScreenshot.data, "base64"));
  console.log(`[Screenshot] Saved English UI preview to ${enPath}`);

  // 2. Switch to Chinese
  await evalInPage(`document.querySelector("#btn-lang-zh")?.click()`);
  await new Promise((r) => setTimeout(r, 300));

  const zhActive = await evalInPage(`document.querySelector("#btn-lang-zh")?.classList.contains("active")`);
  const zhAddBtnText = await evalInPage(`document.querySelector("#btn-add-gear")?.textContent.trim()`);
  const zhCarriedLabel = await evalInPage(`document.querySelector(".weight-card.primary .weight-card-label")?.textContent.trim()`);
  const zhBaseLabel = await evalInPage(`document.querySelector("#metric-card-base .weight-card-label")?.textContent.trim()`);
  const zhFirstCat = await evalInPage(`document.querySelector(".gear-section h3")?.textContent.trim()`);
  const zhStoredLang = await evalInPage(`localStorage.getItem("trail_gear_atlas_lang")`);

  const zhPassed = zhActive &&
    zhAddBtnText === "+ 添加装备" &&
    zhCarriedLabel.includes("背负总重") &&
    zhBaseLabel.includes("基准重量") &&
    zhFirstCat === "睡眠与庇护" &&
    zhStoredLang === "zh";

  recordTest("Switching to Chinese (ZH) updates headers, buttons, cards & categories to pure Chinese", zhPassed, `Btn: "${zhAddBtnText}", Carried: "${zhCarriedLabel}", Cat: "${zhFirstCat}", Stored: "${zhStoredLang}"`);

  // Capture screenshot of Chinese UI
  const zhScreenshot = await send("Page.captureScreenshot", { format: "png" });
  const zhPath = path.join(ARTIFACT_DIR, "app-bilingual-zh-preview.png");
  fs.writeFileSync(zhPath, Buffer.from(zhScreenshot.data, "base64"));
  console.log(`[Screenshot] Saved Chinese UI preview to ${zhPath}`);

  // 3. Reload page and verify persistence
  await send("Page.reload");
  await new Promise((r) => setTimeout(r, 1000));

  const reloadedLang = await evalInPage(`document.documentElement.lang`);
  const reloadedFirstCat = await evalInPage(`document.querySelector(".gear-section h3")?.textContent.trim()`);
  const reloadedBtnText = await evalInPage(`document.querySelector("#btn-add-gear")?.textContent.trim()`);
  const persistPassed = reloadedLang === "zh-CN" && reloadedFirstCat === "睡眠与庇护" && reloadedBtnText === "+ 添加装备";

  recordTest("Language selection persists in localStorage across full page reload", persistPassed, `Lang: "${reloadedLang}", Cat: "${reloadedFirstCat}", Btn: "${reloadedBtnText}"`);

  // -------------------------------------------------------------
  // TEST 10: Nemo Hornet 2P Elite OSMO™ Verification & Search
  // -------------------------------------------------------------
  console.log("\n--- TEST 10: Nemo Hornet 2P Elite OSMO™ Verification ---");

  // 1. Search in Main Toolbar
  await evalInPage(`
    (function() {
      const searchInput = document.querySelector("#gear-search");
      searchInput.value = "Hornet Elite";
      searchInput.dispatchEvent(new Event("input", { bubbles: true }));
    })()
  `);
  await new Promise((r) => setTimeout(r, 400));

  const hornetCardTitle = await evalInPage(`
    document.querySelector("#item-wishlist-05 .card-title")?.textContent.trim()
  `);
  const hornetPriceText = await evalInPage(`
    document.querySelector("#item-wishlist-05 .price-metric .metric-val")?.textContent.trim()
  `);
  const hornetWeightText = await evalInPage(`
    document.querySelector("#item-wishlist-05 .weight-metric .metric-val")?.textContent.trim()
  `);

  recordTest("Main page search for 'Hornet Elite' finds Nemo Hornet 2P Elite OSMO card", Boolean(hornetCardTitle?.includes("Hornet") && hornetPriceText?.includes("999.95")), `Title: "${hornetCardTitle}", Price: "${hornetPriceText}", Weight: "${hornetWeightText}"`);

  // 2. Open Product Modal & inspect specs & Backpacking Light links
  await evalInPage(`
    (function() {
      const btn = document.querySelector("#item-wishlist-05 .card-detail-btn");
      if (btn) btn.click();
    })()
  `);
  await new Promise((r) => setTimeout(r, 400));

  const modalTitle = await evalInPage(`document.querySelector("#modal-product-title")?.textContent.trim()`);
  const modalSpecsText = await evalInPage(`document.querySelector(".modal-specs-section")?.textContent.trim()`);
  const modalOfficialSite = await evalInPage(`document.querySelector(".btn-official-website")?.getAttribute("href")`);

  recordTest("Hornet Elite modal displays $999.95 AUD regular price, 935g weight & Backpacking Light URL", Boolean(modalTitle?.includes("Hornet 2P Elite") && modalSpecsText?.includes("999.95") && modalOfficialSite?.includes("backpackinglight.com.au")), `Title: "${modalTitle}", Link: "${modalOfficialSite}"`);

  // Capture screenshot of Nemo Hornet 2P Elite OSMO detail modal
  const hornetScreenshot = await send("Page.captureScreenshot", { format: "png" });
  const hornetPath = path.join(ARTIFACT_DIR, "nemo-hornet-elite-bpl-preview.png");
  fs.writeFileSync(hornetPath, Buffer.from(hornetScreenshot.data, "base64"));
  console.log(`[Screenshot] Saved Nemo Hornet Elite modal preview to ${hornetPath}`);

  // Close product modal
  await evalInPage(`document.querySelector("#modal-close")?.click()`);
  await new Promise((r) => setTimeout(r, 200));

  // 3. Verify in Catalog Quickfill Modal
  await evalInPage(`document.querySelector("#btn-toolbar-add-gear")?.click()`);
  await new Promise((r) => setTimeout(r, 300));

  await evalInPage(`
    (function() {
      const catInput = document.querySelector("#catalog-search-input");
      catInput.value = "Hornet Elite";
      catInput.dispatchEvent(new Event("input", { bubbles: true }));
    })()
  `);
  await new Promise((r) => setTimeout(r, 400));

  const catSuggestionTitle = await evalInPage(`
    document.querySelector("#catalog-suggestions .catalog-suggestion-name")?.textContent.trim()
  `);
  const catSuggestionPrice = await evalInPage(`
    document.querySelector("#catalog-suggestions .catalog-suggestion-price")?.textContent.trim()
  `);
  const catSuggestionRetailer = await evalInPage(`
    document.querySelector("#catalog-suggestions .catalog-suggestion-retailer")?.textContent.trim()
  `);

  recordTest("Popular catalog search matches Nemo Hornet Elite with Backpacking Light badge & $999.95 price", Boolean(catSuggestionTitle?.includes("Hornet 2P Elite") && catSuggestionPrice?.includes("999.95") && catSuggestionRetailer?.includes("Backpacking Light")), `Name: "${catSuggestionTitle}", Price: "${catSuggestionPrice}", Retailer: "${catSuggestionRetailer}"`);

  // Close gear modal
  await evalInPage(`document.querySelector("#modal-gear-close")?.click()`);
  await new Promise((r) => setTimeout(r, 200));

  // -------------------------------------------------------------
  // TEST 11: Profile Dropdown, Local Photo Upload & Full Backup
  // -------------------------------------------------------------
  console.log("\n--- TEST 11: Profile Dropdown, Image Upload & Full JSON Backup ---");

  // 1. Test Profile Dropdown Menu & Greeting
  await evalInPage(`document.querySelector("#btn-user-profile")?.click()`);
  await new Promise((r) => setTimeout(r, 200));

  const isDropdownOpen = await evalInPage(`
    !document.querySelector("#user-profile-dropdown")?.hidden
  `);
  const dropdownGreeting = await evalInPage(`
    document.querySelector("#dropdown-user-greeting")?.textContent.trim()
  `);
  recordTest("Clicking profile pill opens dropdown with greeting", Boolean(isDropdownOpen && dropdownGreeting?.includes("Alex")), `Dropdown open: ${isDropdownOpen}, Greeting: "${dropdownGreeting}"`);

  // Capture screenshot of Header Profile Dropdown
  const profileScreenshot = await send("Page.captureScreenshot", { format: "png" });
  const profilePath = path.join(ARTIFACT_DIR, "header-profile-menu-preview.png");
  fs.writeFileSync(profilePath, Buffer.from(profileScreenshot.data, "base64"));
  console.log(`[Screenshot] Saved Header Profile dropdown preview to ${profilePath}`);

  // Close dropdown by clicking outside
  await evalInPage(`document.querySelector("#header-user-name")?.click()`);
  await new Promise((r) => setTimeout(r, 150));

  // 2. Test Local Photo Upload & Canvas Compression
  // Reset main search so we can see all items
  await evalInPage(`
    (function() {
      const search = document.querySelector("#gear-search");
      if (search) {
        search.value = "";
        search.dispatchEvent(new Event("input", { bubbles: true }));
      }
    })()
  `);
  await new Promise((r) => setTimeout(r, 200));

  // Synthesize a photo upload via Canvas compression and add item
  const photoItemName = "Custom Silnylon Tarp with Field Photo";
  const photoAddedResult = await evalInPage(`
    (async function() {
      // 1. Create a 200x200 canvas with a stylized mountain icon
      const canvas = document.createElement("canvas");
      canvas.width = 200;
      canvas.height = 200;
      const ctx = canvas.getContext("2d");
      ctx.fillStyle = "#2d5a3f";
      ctx.fillRect(0, 0, 200, 200);
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.moveTo(100, 40);
      ctx.lineTo(160, 160);
      ctx.lineTo(40, 160);
      ctx.closePath();
      ctx.fill();

      // Convert to blob and file
      const blob = await new Promise(r => canvas.toBlob(r, "image/png"));
      const file = new File([blob], "field_photo.png", { type: "image/png" });

      // Compress with our client-side compression function
      const compressedDataUrl = await window.compressImageFile(file, 600, 0.82);

      // Submit new item via form
      const form = document.querySelector("#gear-form");
      document.querySelector("#form-gear-id").value = "";
      document.querySelector("#form-gear-name").value = "${photoItemName}";
      document.querySelector("#form-gear-brand").value = "Hiker DIY";
      document.querySelector("#form-gear-category").value = "Sleep & Shelter";
      document.querySelector("#form-gear-type").value = "Tarp";
      document.querySelector("#form-gear-weight").value = "310";
      document.querySelector("#form-gear-price").value = "120";
      document.querySelector("#form-gear-currency").value = "AUD";
      document.querySelector("#form-gear-status").value = "使用中";
      document.querySelector("#form-gear-image").value = compressedDataUrl;
      form.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));

      return {
        isCompressedDataUrl: compressedDataUrl.startsWith("data:image/"),
        sizeBytes: compressedDataUrl.length
      };
    })()
  `);

  recordTest("Canvas image compression generates compact Data URL", Boolean(photoAddedResult?.isCompressedDataUrl && photoAddedResult?.sizeBytes > 100), `IsDataUrl: ${photoAddedResult?.isCompressedDataUrl}, Size: ${photoAddedResult?.sizeBytes} chars`);

  await new Promise((r) => setTimeout(r, 400));

  // Verify gear card in DOM renders the custom photo
  const cardImgSrc = await evalInPage(`
    (function() {
      const cards = Array.from(document.querySelectorAll("#sleep-shelter .gear-card"));
      const match = cards.find(c => c.querySelector("h4")?.textContent.includes("${photoItemName}"));
      return match ? match.querySelector("img.product-image")?.getAttribute("src") : null;
    })()
  `);
  const hasRenderedPhoto = Boolean(cardImgSrc?.startsWith("data:image/"));
  recordTest("Gear card renders uploaded local photo faithfully in UI", hasRenderedPhoto, `Img src: ${cardImgSrc ? cardImgSrc.slice(0, 32) + "..." : "none"}`);

  // Capture screenshot of Gear Card with local photo
  const photoCardScreenshot = await send("Page.captureScreenshot", { format: "png" });
  const photoCardPath = path.join(ARTIFACT_DIR, "custom-photo-gear-card.png");
  fs.writeFileSync(photoCardPath, Buffer.from(photoCardScreenshot.data, "base64"));
  console.log(`[Screenshot] Saved Custom Photo gear card preview to ${photoCardPath}`);

  // 3. Test Full JSON Backup Export & Universal Import
  const backupRoundtrip = await evalInPage(`
    (async function() {
      // 1. Generate full backup payload
      const profile = window.getUserProfile();
      const backupData = {
        version: "trail-gear-atlas-v1",
        exportedAt: new Date().toISOString(),
        profile: profile,
        unit: "metric",
        lang: "zh",
        trails: window.defaultTrails || [],
        activeTrailId: "milford-track",
        inventory: window.gear,
      };

      const initialCount = window.gear.length;

      // 2. Clear to blank slate
      window.gear = [];
      localStorage.setItem("trail_gear_atlas_inventory_v6", JSON.stringify([]));
      window.render();
      const blankCount = window.gear.length;

      // 3. Re-import from backup JSON File
      const jsonBlob = new Blob([JSON.stringify(backupData)], { type: "application/json" });
      const backupFile = new File([jsonBlob], "alex-gear-backup.json", { type: "application/json" });
      await window.importBackupOrCsvFile(backupFile);

      // Wait a moment for DOM render
      await new Promise(r => setTimeout(r, 400));

      const restoredCount = window.gear.length;
      const photoItemRestored = window.gear.some(g => g.name === "${photoItemName}" && g.imagePath && g.imagePath.startsWith("data:image/"));
      const profileRestored = window.getUserProfile()?.name === "Alex";

      return {
        initialCount,
        blankCount,
        restoredCount,
        photoItemRestored,
        profileRestored
      };
    })()
  `);

  recordTest("Blank slate clears inventory & re-import restores 100% of gear, photos and profile", Boolean(backupRoundtrip?.blankCount === 0 && backupRoundtrip?.restoredCount > 80 && backupRoundtrip?.photoItemRestored && backupRoundtrip?.profileRestored), `Initial: ${backupRoundtrip?.initialCount}, Blank: ${backupRoundtrip?.blankCount}, Restored: ${backupRoundtrip?.restoredCount}, PhotoRestored: ${backupRoundtrip?.photoItemRestored}, ProfileRestored: ${backupRoundtrip?.profileRestored}`);

} catch (err) {
  console.error("Test Suite Runtime Error:", err);
  process.exitCode = 1;
} finally {
  console.log("\n================ TEST SUMMARY ================");
  const total = testResults.length;
  const passed = testResults.filter((r) => r.passed).length;
  const failed = total - passed;
  console.log(`Total: ${total} | Passed: ${passed} | Failed: ${failed}`);
  console.log("==============================================");

  // Clean shutdown
  try { ws.close(); } catch (e) {}
  try { chromeProcess.kill("SIGKILL"); } catch (e) {}
  try { server.close(); } catch (e) {}
  try { fs.rmSync(USER_DATA_DIR, { recursive: true, force: true }); } catch (e) {}
  process.exit(failed > 0 ? 1 : 0);
}
