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
