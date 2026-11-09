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
    weight: float | None = None,
) -> None:
    if item_id in by_id:
        item = by_id[item_id]
        if weight is not None:
            item["unitWeightG"] = weight
            item["totalWeightG"] = round(weight * (item.get("quantity") or quantity), 1)
        if brand is not None:
            item["brand"] = brand
        if name:
            item["name"] = name
        if notes:
            item["notes"] = notes
        return
    item = {
        "id": item_id,
        "category": category,
        "sourceCategory": category,
        "itemType": item_type,
        "brand": brand,
        "name": name,
        "quantity": quantity,
        "unitWeightG": weight,
        "totalWeightG": round(weight * quantity, 1) if weight is not None else None,
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
by_id["sleep-shelter-07"].update(
    brand="Mont",
    name="Moondance 1FN Footprint",
    unitWeightG=210,
    totalWeightG=210,
    status="Needs details · footprint model to confirm",
    notes="Mont Moondance 1FN footprint (~210 g). Tent invoice says Moondance 1P 2021; match not verified.",
)
by_id["sleep-shelter-07"].pop("invoiceEvidence", None)
by_id["cooking-hydration-42"].update(itemType="knife", brand="Victorinox", name="Huntsman Swiss Army Knife")
by_id["cooking-hydration-43"].update(name="WindMaster Stove")
by_id["cooking-hydration-46"].update(name="Alpine Thermo Bottle 0.75L")
by_id["clothing-footwear-39"].update(
    brand="Oakley",
    name="Cybr Dyno Sunglasses",
    unitWeightG=32,
    totalWeightG=32,
)
by_id["personal-items-48"].update(
    brand="Acuvue",
    name="Daily Disposable Contact Lenses (Trail Pack)",
    quantity=1,
    unitWeightG=25,
    totalWeightG=25,
    status="Owned",
    notes="Daily contact lenses trail blister pack (~10-15 pairs).",
)
by_id["personal-items-49"].update(
    brand="Sea to Summit",
    name="Pocket Wilderness Wet Wipes (50pk)",
    quantity=1,
    unitWeightG=120,
    totalWeightG=120,
    status="Owned",
    notes="Biodegradable wilderness wet wipes travel pack (~50 wipes). Consumable.",
)
by_id["personal-items-50"].update(
    brand="Nitecore",
    name="NB10000 Gen 2 Ultra-Light Power Bank 10,000mAh",
    quantity=1,
    unitWeightG=150,
    totalWeightG=150,
    status="Owned",
    notes="Ultralight carbon-fiber trail power bank (150 g).",
)
reconcile("packs-essentials-08", "3046774", name="Swift RL Headlamp 1100 lm, Orange", unitPriceAud=223.96, totalPriceAud=223.96)
reconcile("packs-essentials-09", "3046774", unitWeightG=15, totalWeightG=15, unitPriceAud=14.36, totalPriceAud=14.36)
reconcile("packs-essentials-10", "3046774", name="Hydraulics 3L Reservoir, Blue", unitPriceAud=89.96, totalPriceAud=89.96)
reconcile("packs-essentials-13", "3337184", name="Ultra-Sil Dry Bag 20L, Tarragon", unitPriceAud=35.96, totalPriceAud=35.96)
reconcile("clothing-footwear-19", "3046774", name="Torrentshell 3L Pants Women's, 30 in, Black S", unitPriceAud=170.96, totalPriceAud=170.96)
reconcile("clothing-footwear-20", "3337240", name="Triolet GORE-TEX Jacket Women's, Current Blue M", unitPriceAud=629.96, totalPriceAud=629.96)
reconcile("clothing-footwear-21", "3337184", name="Siren Bikini, Hydro S", quantity=2, totalWeightG=64, unitPriceAud=43.99, totalPriceAud=87.98, notes="Two units on invoice; the earlier workbook listed five. Additional units have not been verified.")
reconcile(
    "clothing-footwear-22",
    "Screenshot 2026-11-10 at 00.06.54.png",
    name="Access Down 2.0 Hoody Women's, Alloy S",
    unitPriceAud=383.99,
    totalPriceAud=383.99,
    notes="Colour: Alloy, Size: S. Exact AUD price verified from Black Diamond purchase screenshot.",
)
reconcile(
    "clothing-footwear-23",
    "Screenshot 2026-11-10 at 00.06.54.png",
    name="Lightweight Fleece Gloves, Black XS",
    unitPriceAud=20.99,
    totalPriceAud=20.99,
    notes="Colour: Black, Size: XS. Exact AUD price verified from Black Diamond purchase screenshot.",
)
reconcile("clothing-footwear-29", "3046774", name="Merino 260 Tech Long Sleeve Crew Women's, Black XS", unitPriceAud=161.99, totalPriceAud=161.99)
reconcile("clothing-footwear-30", "3046774", name="Merino 260 Tech Leggings Women's, Black XS", unitPriceAud=161.99, totalPriceAud=161.99)
reconcile("clothing-footwear-31", "3046774", name="Hike Full Cushion Saturnsphere Crew Socks Women's, Frosty Green M", unitPriceAud=44.96, totalPriceAud=44.96)
reconcile("clothing-footwear-32", "3046774", name="Hike Light Cushion Crew Socks, Twilight-Pewter Blue M", unitPriceAud=42.26, totalPriceAud=42.26)
reconcile("clothing-footwear-33", "3046774", name="Hike Full Cushion Crew Socks, Light Gray M", unitPriceAud=44.96, totalPriceAud=44.96)
reconcile("clothing-footwear-37", "3337205", name="NAVAgaiter Tall GTX, Grey/Black S", unitPriceAud=124.16, totalPriceAud=124.16)
reconcile("clothing-footwear-38", "3343538", name="Cirrus Hut Boots, Black S", unitPriceAud=69.97, totalPriceAud=69.97)
reconcile("clothing-footwear-35", "K2 Base Camp tax invoice 25-00028990", quantity=2, unitPriceAud=71.96, totalPriceAud=143.92, totalWeightG=284, notes="Super recommended! Two pairs purchased from K2 Base Camp (Invoice 25-00028990).")
reconcile("cooking-hydration-45", "Ultralight Gear invoice #58006", name="Sawyer Squeeze Water Filtration System w/ Cnoc Premium 2L Bladder", unitPriceAud=109.95, totalPriceAud=109.95)


# Invoice-only goods. Club fees, gift cards, and loyalty adjustments are excluded.
new_items = [
    ("sleep-shelter-51", "Sleep & Shelter", "sleep pad", "NEMO", "Tensor All Season Mat, Blade/Spicy Orange Regular Mummy", 1, 323.96, "2935544", "", 400),
    ("sleep-shelter-52", "Sleep & Shelter", "sleep pad", "Therm-a-Rest", "NeoAir XLite NXT Mat, Solar Flare Regular Wide", 1, 363.97, "2943418", "", 440),
    ("clothing-footwear-53", "Clothing & Footwear", "fleece cardigan", "Arc'teryx", "Covert Cardigan Women's, Atmos Heather S", 1, 269.96, "2861654", "", 415),
    ("clothing-footwear-54", "Clothing & Footwear", "waterproof jacket", "Patagonia", "Torrentshell 3L Jacket Women's, Wool White S", 1, 224.96, "2861654", "Separate from the Triolet jacket and Torrentshell pants.", 352),
    ("cooking-hydration-55", "Cooking & Hydration", "hydration tablets", "GU", "Hydration Drink Tabs, Tri Berry", 1, 12.56, "2935558", "Tube of 12 hydration tablets. Consumable.", 54),
    ("cooking-hydration-56", "Cooking & Hydration", "energy gel", "GU", "Energy Gel 32 g, Lemon/Sublime", 2, 3.56, "2935558", "Two packets on the invoice (34 g each). Consumable.", 34),
    ("packs-essentials-57", "Packs & Essentials", "umbrella", "Korjo", "Travel Umbrella UM-52", 1, 26.96, "3046774", "Compact lightweight travel umbrella.", 230),
    ("packs-essentials-58", "Packs & Essentials", "fire starter", "Lifeventure", "Fire Starter S24", 1, 17.96, "3320716", "Emergency ferrocerium rod fire starter.", 42),
    ("cooking-hydration-59", "Cooking & Hydration", "stove fuel", "Jetboil", "Jetpower Fuel 100 g", 1, 12.56, "3320716", "100 g net isobutane/propane canister (gross weight ~199 g). Consumable.", 199),
    ("clothing-footwear-60", "Clothing & Footwear", "gaiters", "Kahtoola", "NAVAgaiter Tall GTX, Grey/Black L", 1, 124.16, "3337184", "Separate from the S-size pair.", 230),
    ("cooking-hydration-61", "Cooking & Hydration", "trail meal", "Radix Nutrition", "Ultra Meal Bircher Muesli", 1, 17.96, "3337184", "Freeze-dried breakfast meal. Consumable.", 175),
    ("cooking-hydration-62", "Cooking & Hydration", "trail meal", "Back Country Cuisine", "Chocolate Brownie Pudding", 1, 14.36, "3337184", "Freeze-dried dessert meal. Consumable.", 170),
    ("cooking-hydration-63", "Cooking & Hydration", "trail meal", "Back Country Cuisine", "Beef Mince 160 g", 1, 17.56, "3337184", "Freeze-dried dinner meal. Consumable.", 180),
    ("cooking-hydration-64", "Cooking & Hydration", "trail meal", "Back Country Cuisine", "Apple and Berry Crumble", 1, 14.36, "3337184", "Freeze-dried dessert meal. Consumable.", 170),
    ("cooking-hydration-65", "Cooking & Hydration", "trail meal", "Back Country Cuisine", "Roast Chicken, Double Serve", 1, 17.56, "3337184", "Freeze-dried double dinner meal. Consumable.", 190),
    ("clothing-footwear-66", "Clothing & Footwear", "underwear", "Royal Robbins", "ReadyDry Bikini Women's, Jet Black S", 1, 26.96, "3337194", "Ultralight quick-dry trail underwear.", 34),
    ("clothing-footwear-67", "Clothing & Footwear", "shoe care", "Nikwax", "Nubuck & Suede Proof Footwear Waterproofing, 125 ml", 1, 20.66, "3373606", "125 ml spray bottle (~145 g).", 145),
    ("clothing-footwear-68", "Clothing & Footwear", "shoe care", "Gear Aid", "Revivex Boot + Shoe Cleaner", 1, 20.66, "3373606", "118 ml footwear cleaner (~135 g).", 135),
]
for item_id, category, item_type, brand, name, quantity, price, invoice, note, weight in new_items:
    add_item(item_id, category, item_type, brand, name, quantity, price, f"Paddy Pallin tax invoice {invoice}", note, weight=weight)


# Screenshot purchases are kept in their original currency; no exchange-rate estimate.
screenshots = [
    ("cooking-hydration-69", "stove", "SOTO", "ST-310MT Spider Stove, Black", 310.72, "IMG_5407.jpg", "Distinct from the WindMaster stove already in the workbook.", 350),
    ("cooking-hydration-70", "stove accessory", "Campingmoon", "Z37 Canister Extension Tube", 102.42, "IMG_5407.jpg", "The screenshot lists this separately from the SOTO stove.", 75),
    ("cooking-hydration-71", "titanium pot", "Evernew", "ECA539 Ti Mug Pot 900 (950 ml capacity)", 367.49, "IMG_5408.jpg", "The model is called Ti Mug Pot 900; EVERNEW specifies 950 ml capacity.", 99),
    ("cooking-hydration-72", "titanium cup", "Evernew", "ECA530 Titanium Handled Cup 400 ml", 119.51, "IMG_5409.jpg", "Distinct from the Alton 600 ml cup already in the workbook.", 50),
]
for item_id, item_type, brand, name, price, screenshot, note, weight in screenshots:
    add_item(item_id, "Cooking & Hydration", item_type, brand, name, 1, price, f"Purchase screenshot {screenshot}", note, currency="CNY", weight=weight)
by_id["cooking-hydration-70"]["brand"] = "Campingmoon"
by_id["cooking-hydration-69"]["name"] = "ST-310MT Spider Stove, Black"
by_id["cooking-hydration-70"]["notes"] = "The screenshot lists this separately from the SOTO stove."
by_id["cooking-hydration-71"].update(name="ECA539 Ti Mug Pot 900 (950 ml capacity)", unitWeightG=99, totalWeightG=99, notes="The model is called Ti Mug Pot 900; EVERNEW specifies 950 ml capacity and 99 g weight.")
by_id["cooking-hydration-72"].update(unitWeightG=50, totalWeightG=50)
by_id["cooking-hydration-69"].update(unitWeightG=350, totalWeightG=350)
by_id["cooking-hydration-70"].update(unitWeightG=75, totalWeightG=75)
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

# K2 Base Camp purchase
add_item(
    "clothing-footwear-75",
    "Clothing & Footwear",
    "waterproof jacket",
    "Outdoor Research",
    "MicroGravity AscentShell Women's Waterproof Hooded Jacket, Arctic S",
    1,
    407.96,
    "K2 Base Camp tax invoice 24-00021940",
    "Purchased from K2 Base Camp (Invoice 24-00021940). Colour: Arctic, Size: W S.",
    currency="AUD",
)
by_id["clothing-footwear-75"].update(unitWeightG=337, totalWeightG=337)

# Black Diamond purchase 1: 5-Panel Cap (order with hoody & gloves)
add_item(
    "clothing-footwear-76",
    "Clothing & Footwear",
    "cap",
    "Black Diamond",
    "5-Panel Synthetic Cap, Pale Mauve/Black",
    1,
    55.99,
    "Purchase screenshot Screenshot 2026-11-10 at 00.06.54.png",
    "Lightweight packable 5-panel trail cap. 66 g.",
    currency="AUD",
    weight=66,
)
by_id["clothing-footwear-76"].update(unitWeightG=66, totalWeightG=66)

# Black Diamond purchase 2: Distance 8L Daypack Women's
add_item(
    "packs-essentials-77",
    "Packs & Essentials",
    "backpack",
    "Black Diamond",
    "Distance 8L Daypack Women's, Glacier S",
    1,
    156.77,
    "Purchase screenshot Screenshot 2026-11-10 at 00.06.17.png",
    "Hybrid running vest and alpine daypack (BD Distance 8L W Glacier S). 298 g.",
    currency="AUD",
    weight=298,
)
by_id["packs-essentials-77"].update(unitWeightG=298, totalWeightG=298)


assert len(items) == 77, f"Expected 77 records after reconciliation, got {len(items)}"
DATA_PATH.write_text(json.dumps(items, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
print(f"Reconciled {len(items)} gear records")
