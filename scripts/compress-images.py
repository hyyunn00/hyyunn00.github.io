#!/usr/bin/env python3
"""Shrink every image in a folder down to a target file size (default 1MB).

Usage:
    python3 scripts/compress-images.py                     # public/images/uploads, 1MB
    python3 scripts/compress-images.py public/images        # a different folder
    python3 scripts/compress-images.py --max-mb 0.5         # a different target size
    python3 scripts/compress-images.py --dry-run            # preview only, no writes

Re-encodes as JPEG (quality search, then dimension shrink if quality alone
isn't enough) since that's what actually gets photos under a size budget.
.jpg/.jpeg files keep their name; .png/.webp files become .jpg.
"""

import argparse
import io
from pathlib import Path

from PIL import Image, ImageOps

MIN_QUALITY = 40
MAX_DIMENSION = 2400
MIN_DIMENSION = 600
EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp"}


def compress_image(path: Path, target_bytes: int, dry_run: bool) -> None:
    original_size = path.stat().st_size
    if original_size <= target_bytes:
        print(f"  skip    {path.name}  ({original_size / 1024:.0f} KB, already under target)")
        return

    with Image.open(path) as img:
        img = ImageOps.exif_transpose(img)
        if img.mode in ("RGBA", "P", "LA"):
            img = img.convert("RGB")

        if max(img.size) > MAX_DIMENSION:
            img.thumbnail((MAX_DIMENSION, MAX_DIMENSION), Image.LANCZOS)

        buffer = io.BytesIO()
        quality = 90
        while quality >= MIN_QUALITY:
            buffer.seek(0)
            buffer.truncate()
            img.save(buffer, format="JPEG", quality=quality, optimize=True)
            if buffer.tell() <= target_bytes:
                break
            quality -= 5

        while buffer.tell() > target_bytes and max(img.size) > MIN_DIMENSION:
            img.thumbnail((round(img.width * 0.85), round(img.height * 0.85)), Image.LANCZOS)
            buffer.seek(0)
            buffer.truncate()
            img.save(buffer, format="JPEG", quality=max(quality, MIN_QUALITY), optimize=True)

        new_size = buffer.tell()
        status = "OK" if new_size <= target_bytes else "still over target"
        print(
            f"  shrink  {path.name}  {original_size / 1024:.0f} KB -> {new_size / 1024:.0f} KB "
            f"(quality {quality}, {img.width}x{img.height}) [{status}]"
        )

        if dry_run:
            return

        out_path = path.with_suffix(".jpg")
        out_path.write_bytes(buffer.getvalue())
        if out_path != path:
            path.unlink()
            print(f"          renamed to {out_path.name}")


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument(
        "folder",
        nargs="?",
        default="public/images/uploads",
        help="Folder to process (default: public/images/uploads)",
    )
    parser.add_argument("--max-mb", type=float, default=1.0, help="Target max size in MB (default: 1)")
    parser.add_argument("--dry-run", action="store_true", help="Preview changes without writing files")
    args = parser.parse_args()

    folder = Path(args.folder)
    if not folder.is_dir():
        raise SystemExit(f"Not a folder: {folder}")

    target_bytes = int(args.max_mb * 1024 * 1024)
    images = sorted(p for p in folder.iterdir() if p.suffix.lower() in EXTENSIONS)
    if not images:
        print(f"No images found in {folder}")
        return

    print(f"Processing {len(images)} image(s) in {folder}, target ≤ {args.max_mb:.2f} MB" + (" (dry run)" if args.dry_run else ""))
    for path in images:
        compress_image(path, target_bytes, args.dry_run)


if __name__ == "__main__":
    main()
