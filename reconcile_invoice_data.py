"""Reconcile the site inventory with saved invoices and purchase screenshots.

Input: src/data/gear.json and the manually reviewed receipts in ../gears_invoice.
Output: updated src/data/gear.json. Run: python3 reconcile_invoice_data.py.
The script is idempotent; invoice prices are the tax-inclusive line prices.
"""

from __future__ import annotations

import json
from pathlib import Path


DATA_PATH = Path(__file__).parent / "src" / "data" / "gear.json"
items = json.loads(DATA_PATH.read_text(encoding="utf-8"))
by_id = {item["id"]: item for item in items}
assert len(items) == len(by_id), "Duplicate inventory IDs"


def reconcile(item_id: str, invoice: str, **fields: object) -> None:
    item = by_id[item_id]
    item.update(fields)
    sources = item.setdefault("invoiceEvidence", [])
    if invoice not in sources:
        sources.append(invoice)


def add_item(
    item_id: str,
    category: str,
    item_type: str,
    brand: str | None,
    name: str,
    quantity: int,
    price: float,
    source: str,
    notes: str = "",
    currency: str = "AUD",
) -> None:
    if item_id in by_id:
        return
    item = {
        "id": item_id,
        "category": category,
        "sourceCategory": category,
        "itemType": item_type,
        "brand": brand,
        "name": name,
        "quantity": quantity,
        "unitWeightG": None,
        "totalWeightG": None,
        "unitPriceAud": price if currency == "AUD" else None,
        "totalPriceAud": round(price * quantity, 2) if currency == "AUD" else None,
        "status": "Purchased · ownership to confirm",
        "notes": notes,
        "provenance": source,
        "invoiceEvidence": [source],
    }
    if currency == "CNY":
        item["unitPriceCny"] = price
        item["totalPriceCny"] = round(price * quantity, 2)
    items.append(item)
    by_id[item_id] = item


# Existing entries: correct descriptions and tax-inclusive AUD amounts.
reconcile("sleep-shelter-01", "3046774", name="Warmlite 750 XT-R Women's Sleeping Bag, Left Hand Regular", unitPriceAud=683.96, totalPriceAud=683.96)
reconcile("sleep-shelter-02", "2935544", name="Moondance 1P Tent 2021, Bracken", unitPriceAud=710.96, totalPriceAud=710.96, notes="Workbook called this Moondance 1FN; confirm whether that refers to the same tent. Too heavy but strong.")
reconcile("sleep-shelter-03", "3046774", name="Z Lite SOL Sleeping Pad, Limon Regular", unitPriceAud=125.96, totalPriceAud=125.96)
by_id["sleep-shelter-07"].update(status="Needs details · footprint model to confirm", notes="Previously listed as Moondance 1FN footprint; the tent invoice says Moondance 1P 2021. Match not verified.")
by_id["sleep-shelter-07"].pop("invoiceEvidence", None)
by_id["cooking-hydration-42"].update(itemType="knife", brand="Victorinox", name="Huntsman Swiss Army Knife")
by_id["cooking-hydration-43"].update(name="WindMaster Stove")
by_id["cooking-hydration-46"].update(name="Alpine Thermo Bottle 0.75L")
reconcile("packs-essentials-08", "3046774", name="Swift RL Headlamp 1100 lm, Orange", unitPriceAud=223.96, totalPriceAud=223.96)
reconcile("packs-essentials-09", "3046774", unitPriceAud=14.36, totalPriceAud=14.36)
reconcile("packs-essentials-10", "3046774", name="Hydraulics 3L Reservoir, Blue", unitPriceAud=89.96, totalPriceAud=89.96)
reconcile("packs-essentials-13", "3337184", name="Ultra-Sil Dry Bag 20L, Tarragon", unitPriceAud=35.96, totalPriceAud=35.96)
reconcile("clothing-footwear-19", "3046774", name="Torrentshell 3L Pants Women's, 30 in, Black S", unitPriceAud=170.96, totalPriceAud=170.96)
reconcile("clothing-footwear-20", "3337240", name="Triolet GORE-TEX Jacket Women's, Current Blue M", unitPriceAud=629.96, totalPriceAud=629.96)
reconcile("clothing-footwear-21", "3337184", name="Siren Bikini, Hydro S", quantity=2, totalWeightG=64, unitPriceAud=43.99, totalPriceAud=87.98, notes="Two units on invoice; the earlier workbook listed five. Additional units have not been verified.")
reconcile("clothing-footwear-29", "3046774", name="Merino 260 Tech Long Sleeve Crew Women's, Black XS", unitPriceAud=161.99, totalPriceAud=161.99)
reconcile("clothing-footwear-30", "3046774", name="Merino 260 Tech Leggings Women's, Black XS", unitPriceAud=161.99, totalPriceAud=161.99)
reconcile("clothing-footwear-31", "3046774", name="Hike Full Cushion Saturnsphere Crew Socks Women's, Frosty Green M", unitPriceAud=44.96, totalPriceAud=44.96)
reconcile("clothing-footwear-32", "3046774", name="Hike Light Cushion Crew Socks, Twilight-Pewter Blue M", unitPriceAud=42.26, totalPriceAud=42.26)
reconcile("clothing-footwear-33", "3046774", name="Hike Full Cushion Crew Socks, Light Gray M", unitPriceAud=44.96, totalPriceAud=44.96)
reconcile("clothing-footwear-37", "3337205", name="NAVAgaiter Tall GTX, Grey/Black S", unitPriceAud=124.16, totalPriceAud=124.16)
reconcile("clothing-footwear-38", "3343538", name="Cirrus Hut Boots, Black S", unitPriceAud=69.97, totalPriceAud=69.97)
reconcile("cooking-hydration-45", "Ultralight Gear invoice #58006", name="Sawyer Squeeze Water Filtration System w/ Cnoc Premium 2L Bladder", unitPriceAud=109.95, totalPriceAud=109.95)


# Invoice-only goods. Club fees, gift cards, and loyalty adjustments are excluded.
new_items = [
    ("sleep-shelter-51", "Sleep & Shelter", "sleep pad", "NEMO", "Tensor All Season Mat, Blade/Spicy Orange Regular Mummy", 1, 323.96, "2935544", ""),
    ("sleep-shelter-52", "Sleep & Shelter", "sleep pad", "Therm-a-Rest", "NeoAir XLite NXT Mat, Solar Flare Regular Wide", 1, 363.97, "2943418", ""),
    ("clothing-footwear-53", "Clothing & Footwear", "fleece cardigan", "Arc'teryx", "Covert Cardigan Women's, Atmos Heather S", 1, 269.96, "2861654", ""),
    ("clothing-footwear-54", "Clothing & Footwear", "waterproof jacket", "Patagonia", "Torrentshell 3L Jacket Women's, Wool White S", 1, 224.96, "2861654", "Separate from the Triolet jacket and Torrentshell pants."),
    ("cooking-hydration-55", "Cooking & Hydration", "hydration tablets", "GU", "Hydration Drink Tabs, Tri Berry", 1, 12.56, "2935558", "Consumable; current stock unknown."),
    ("cooking-hydration-56", "Cooking & Hydration", "energy gel", "GU", "Energy Gel 32 g, Lemon/Sublime", 2, 3.56, "2935558", "Two packets on the invoice; current stock unknown."),
    ("packs-essentials-57", "Packs & Essentials", "umbrella", "KOR", "Travel Umbrella", 1, 26.96, "3046774", ""),
    ("packs-essentials-58", "Packs & Essentials", "fire starter", "Lifeventure", "Fire Starter S24", 1, 17.96, "3320716", ""),
    ("cooking-hydration-59", "Cooking & Hydration", "stove fuel", "Jetboil", "Jetpower Fuel 100 g", 1, 12.56, "3320716", "Consumable; current stock unknown."),
    ("clothing-footwear-60", "Clothing & Footwear", "gaiters", "Kahtoola", "NAVAgaiter Tall GTX, Grey/Black L", 1, 124.16, "3337184", "Separate from the S-size pair."),
    ("cooking-hydration-61", "Cooking & Hydration", "trail meal", None, "Bircher Muesli", 1, 17.96, "3337184", "Invoice brand code: RM. Consumable; current stock unknown."),
    ("cooking-hydration-62", "Cooking & Hydration", "trail meal", None, "Chocolate Brownie Pudding", 1, 14.36, "3337184", "Invoice brand code: BAC. Consumable; current stock unknown."),
    ("cooking-hydration-63", "Cooking & Hydration", "trail meal", None, "Beef Mince 160 g", 1, 17.56, "3337184", "Invoice brand code: BAC. Consumable; current stock unknown."),
    ("cooking-hydration-64", "Cooking & Hydration", "trail meal", None, "Apple and Berry Crumble", 1, 14.36, "3337184", "Invoice brand code: BAC. Consumable; current stock unknown."),
    ("cooking-hydration-65", "Cooking & Hydration", "trail meal", None, "Roast Chicken, Double Serve", 1, 17.56, "3337184", "Invoice brand code: BAC. Consumable; current stock unknown."),
    ("clothing-footwear-66", "Clothing & Footwear", "underwear", None, "ReadyDry Bikini Women's, Jet Black S", 1, 26.96, "3337194", "Invoice brand code: RR."),
    ("clothing-footwear-67", "Clothing & Footwear", "shoe care", "Nikwax", "Nubuck & Suede Proof Footwear Waterproofing, 125 ml", 1, 20.66, "3373606", ""),
    ("clothing-footwear-68", "Clothing & Footwear", "shoe care", "Gear Aid", "Revivex Boot + Shoe Cleaner", 1, 20.66, "3373606", ""),
]
for item_id, category, item_type, brand, name, quantity, price, invoice, note in new_items:
    add_item(item_id, category, item_type, brand, name, quantity, price, f"Paddy Pallin tax invoice {invoice}", note)


# Screenshot purchases are kept in their original currency; no exchange-rate estimate.
screenshots = [
    ("cooking-hydration-69", "stove", "SOTO", "ST-310MT Spider Stove, Black", 310.72, "IMG_5407.jpg", "Distinct from the WindMaster stove already in the workbook."),
    ("cooking-hydration-70", "stove accessory", "Campingmoon", "Z37 Canister Extension Tube", 102.42, "IMG_5407.jpg", "The screenshot lists this separately from the SOTO stove."),
    ("cooking-hydration-71", "titanium pot", "Evernew", "ECA539 Ti Mug Pot 900 (950 ml capacity)", 367.49, "IMG_5408.jpg", "The model is called Ti Mug Pot 900; EVERNEW specifies 950 ml capacity."),
    ("cooking-hydration-72", "titanium cup", "Evernew", "ECA530 Titanium Handled Cup 400 ml", 119.51, "IMG_5409.jpg", "Distinct from the Alton 600 ml cup already in the workbook."),
]
for item_id, item_type, brand, name, price, screenshot, note in screenshots:
    add_item(item_id, "Cooking & Hydration", item_type, brand, name, 1, price, f"Purchase screenshot {screenshot}", note, currency="CNY")
by_id["cooking-hydration-70"]["brand"] = "Campingmoon"
by_id["cooking-hydration-69"]["name"] = "ST-310MT Spider Stove, Black"
by_id["cooking-hydration-70"]["notes"] = "The screenshot lists this separately from the SOTO stove."
by_id["cooking-hydration-71"].update(name="ECA539 Ti Mug Pot 900 (950 ml capacity)", unitWeightG=99, totalWeightG=99, notes="The model is called Ti Mug Pot 900; EVERNEW specifies 950 ml capacity and 99 g weight.")
by_id["clothing-footwear-67"]["name"] = "Nubuck & Suede Proof Footwear Waterproofing, 125 ml"

# Backpacking Light Australia purchase
add_item(
    "packs-essentials-73",
    "Packs & Essentials",
    "backpack",
    "Osprey",
    "Hikelite 26L Day Pack, Pine Leaf Green",
    1,
    219.95,
    "Backpacking Light invoice ORD177646",
    "Purchased from Backpacking Light Australia (Invoice ORD177646).",
    currency="AUD",
)
by_id["packs-essentials-73"].update(unitWeightG=740, totalWeightG=740)

# 99 Bikes purchase
add_item(
    "personal-items-74",
    "Personal Items",
    "headphones",
    "Shokz",
    "OpenSwim Pro Bone Conduction Headphones, Grey",
    1,
    249.00,
    "99 Bikes tax invoice INV8649424",
    "Purchased from 99 Bikes Brisbane CBD (Invoice #INV8649424). Model S710-ST-GY.",
    currency="AUD",
)
by_id["personal-items-74"].update(unitWeightG=27.3, totalWeightG=27.3)


assert len(items) == 74, f"Expected 74 records after reconciliation, got {len(items)}"
DATA_PATH.write_text(json.dumps(items, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
print(f"Reconciled {len(items)} gear records")
