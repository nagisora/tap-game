#!/usr/bin/env python3
"""Re-encode docs/art-source sidecar PNGs to native WebP q90 in public/.

Does not shrink. Does not wrap in SVG.
"""

from __future__ import annotations

from pathlib import Path

from PIL import Image

REPO = Path(__file__).resolve().parents[2]
SOURCE = Path(__file__).resolve().parent
PUBLIC_ART = REPO / "public" / "assets" / "art"
QUALITY = 90
METHOD = 6

ANIMALS: tuple[tuple[str, str], ...] = (
    ("farm", "cow"),
    ("farm", "pig"),
    ("farm", "chicken"),
    ("farm", "sheep"),
    ("yard", "dog"),
    ("yard", "cat"),
    ("yard", "duck"),
    ("yard", "frog"),
    ("sea", "seagull"),
    ("sea", "seal"),
    ("sea", "penguin"),
    ("sea", "dolphin"),
)


def main() -> None:
    for scene, animal in ANIMALS:
        src = SOURCE / scene / f"{animal}.png"
        dest = PUBLIC_ART / scene / f"{animal}.webp"
        if not src.exists():
            raise SystemExit(f"missing master {src}")
        im = Image.open(src).convert("RGBA")
        dest.parent.mkdir(parents=True, exist_ok=True)
        im.save(dest, format="WEBP", quality=QUALITY, method=METHOD)
        print(f"{animal:10} {src.stat().st_size:8,} PNG -> {dest.stat().st_size:8,} WebP {im.size[0]}x{im.size[1]}")


if __name__ == "__main__":
    main()
