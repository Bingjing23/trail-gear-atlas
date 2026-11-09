"""Download and optimize verified product photos for the static gear site.

Input: src/data/images_curated.json. Output: dist/images/*.webp.
Run: python download_images.py (using the bundled Python with Pillow installed).
"""

from __future__ import annotations

import io
import json
import sys
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen

from PIL import Image, ImageOps


ROOT = Path(__file__).resolve().parent
MAPPING_PATH = ROOT / "src" / "data" / "images_curated.json"
OUTPUT_DIR = ROOT / "dist" / "images"
MAX_BYTES = 12 * 1024 * 1024
IMAGE_SIZE = (960, 720)


def download_image(url: str) -> bytes:
    request = Request(
        url,
        headers={
            "User-Agent": "Mozilla/5.0 (compatible; TrailGearAtlas/1.0)",
            "Accept": "image/avif,image/webp,image/png,image/jpeg,image/gif,*/*;q=0.8",
        },
    )
    with urlopen(request, timeout=20) as response:
        content_type = response.headers.get("Content-Type", "")
        if not content_type.startswith("image/"):
            raise ValueError(f"Unexpected content type: {content_type}")
        data = response.read(MAX_BYTES + 1)
    if len(data) > MAX_BYTES:
        raise ValueError("Image exceeds 12 MB")
    return data


def save_webp(data: bytes, destination: Path) -> None:
    with Image.open(io.BytesIO(data)) as image:
        image.seek(0)
        image = ImageOps.exif_transpose(image).convert("RGBA")
        image.thumbnail(IMAGE_SIZE, Image.Resampling.LANCZOS)
        canvas = Image.new("RGB", IMAGE_SIZE, "#f3f4ef")
        left = (IMAGE_SIZE[0] - image.width) // 2
        top = (IMAGE_SIZE[1] - image.height) // 2
        canvas.paste(image, (left, top), image)
        canvas.save(destination, "WEBP", quality=82, method=5)


def main() -> None:
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    entries = json.loads(MAPPING_PATH.read_text(encoding="utf-8"))
    requested_ids = set(sys.argv[1:])
    if requested_ids:
        entries = [entry for entry in entries if entry["id"] in requested_ids]
    successes = 0
    failures: list[tuple[str, str]] = []

    def process(entry: dict[str, str]) -> tuple[str, int | None, str | None]:
        destination = ROOT / "dist" / entry["imagePath"].lstrip("/")
        try:
            data = download_image(entry["downloadUrl"])
            save_webp(data, destination)
            return entry["id"], destination.stat().st_size, None
        except (HTTPError, URLError, OSError, ValueError) as error:
            return entry["id"], None, str(error)

    with ThreadPoolExecutor(max_workers=6) as pool:
        futures = [pool.submit(process, entry) for entry in entries]
        for future in as_completed(futures):
            item_id, size, error = future.result()
            if error is None:
                successes += 1
                print(f"OK {item_id} {size} bytes", flush=True)
            else:
                failures.append((item_id, error))
                print(f"FAIL {item_id} {error}", flush=True)
    print(f"Downloaded {successes}/{len(entries)} images")
    if failures:
        print("Failed IDs:", ", ".join(item_id for item_id, _ in failures))


if __name__ == "__main__":
    main()
