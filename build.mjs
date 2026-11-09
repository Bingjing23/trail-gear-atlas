// Copy the reviewed inventory data into the static site before packaging.
// Input: src/data/gear.json. Output: dist/gear.json. Run: node build.mjs.
import fs from "node:fs/promises";
const source = new URL("./src/data/gear.json", import.meta.url);
const target = new URL("./dist/gear.json", import.meta.url);
const data = JSON.parse(await fs.readFile(source, "utf8"));
if (!Array.isArray(data) || data.length === 0) throw new Error("Gear data is empty");
const imageMaps = ["images_curated.json", "images_sleep_packs.json", "images_clothing.json", "images_cooking.json"];
const images = new Map();
for (const filename of imageMaps) {
  try {
    const entries = JSON.parse(await fs.readFile(new URL(`./src/data/${filename}`, import.meta.url), "utf8"));
    for (const entry of entries) {
      if (!entry.id || !entry.imagePath) continue;
      const relativePath = entry.imagePath.replace(/^\//, "");
      await fs.access(new URL(`./dist/${relativePath}`, import.meta.url));
      images.set(entry.id, entry);
    }
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }
}
const enriched = data.map((item) => {
  const image = images.get(item.id);
  return image ? { ...item, imagePath: image.imagePath, imageSourceUrl: image.sourceUrl, imageMatchQuality: image.matchQuality } : item;
});
await fs.writeFile(target, JSON.stringify(enriched, null, 2) + "\n");
console.log(`Prepared ${data.length} gear items with ${images.size} product images`);
