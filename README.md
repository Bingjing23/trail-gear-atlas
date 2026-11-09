# Trail Gear Atlas

Private, static hiking gear catalog. The site is served from `dist/` and uses `src/data/gear.json` as its inventory source.

## Update the inventory

1. Review the original inventory and saved receipts in `../gears_invoice/`.
2. Edit `src/data/gear.json`. For the November 2026 invoice reconciliation, the reviewed changes are recorded in `reconcile_invoice_data.py`; running it is safe more than once.
3. Run `node build.mjs` to copy the catalog and attach only image mappings whose WebP files exist.
4. Preview `dist/` with `python3 -m http.server 8765 --directory dist`.

`unitPriceAud` is an AUD amount. Screenshot purchases use `unitPriceCny` and are never converted to AUD. Invoice amounts are tax-inclusive line prices. `quantity` on receipt-only records is a purchased quantity and does not prove current stock. Weights without a recorded source remain `null`.

Image provenance is stored in `src/data/images_curated.json` and `src/data/images_invoices.json`; the site links each displayed photo to its source. The photographs may show another color or product revision. Do not assign a photo to a model that cannot be matched reliably.

The hosting manifest is `.openai/hosting.json`. Publish with the Sites source workflow so the pushed commit and deployment archive match.
