#!/usr/bin/env python3
"""A/B encode + composite for art weight. Writes only under docs/qa/art-ab/.

Does not touch public/ production files, scenes.js, or sw.js.
Master source: transparent sidecar PNG (not _generated-source).
"""

from __future__ import annotations

import base64
import io
import re
import sys
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

REPO = Path(__file__).resolve().parents[3]
PUBLIC_ART = REPO / "public" / "assets" / "art"
OUT_DIR = Path(__file__).resolve().parent
ENCODED_DIR = OUT_DIR / "encoded"
STRIPS_DIR = OUT_DIR / "strips"

FARM_GREEN = (0x7C, 0xB3, 0x42, 255)
INK = (0x2A, 0x22, 0x18, 255)
CREAM = (0xFF, 0xF8, 0xE7, 255)

# Current CSS: width: min(28vmin, 34vw) at a 1280×800 CSS viewport.
VIEW_W = 1280
VIEW_H = 800
CSS_WIDTH_1X = int(min(0.28 * min(VIEW_W, VIEW_H), 0.34 * VIEW_W))  # 224
WEBP_METHOD = 6
TOO_SMALL_EDGE = 512

FONT_REGULAR = Path("/usr/share/fonts/truetype/macos/Inter-Regular.ttf")
FONT_BOLD = Path("/usr/share/fonts/truetype/macos/Inter-Bold.ttf")
FONT_JP = Path("/usr/share/fonts/truetype/wqy/wqy-microhei.ttc")

ANIMALS: tuple[tuple[str, str], ...] = (
    ("cow", "farm"),
    ("sheep", "farm"),
    ("seagull", "sea"),
)

def css_dest_size(src_w: int, src_h: int, display_w: int) -> tuple[int, int]:
    dest_h = max(1, round(display_w * src_h / src_w))
    return display_w, dest_h


def load_font(path: Path, size: int) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
    if path.exists():
        return ImageFont.truetype(str(path), size=size, index=0)
    return ImageFont.load_default()


def extract_svg_png(svg_path: Path) -> Image.Image:
    text = svg_path.read_text()
    match = re.search(r"data:image/png;base64,([A-Za-z0-9+/=\s]+)", text)
    if not match:
        raise SystemExit(f"no PNG payload in {svg_path}")
    raw = base64.b64decode(re.sub(r"\s+", "", match.group(1)))
    return Image.open(io.BytesIO(raw)).convert("RGBA")


def encode_webp(im: Image.Image, path: Path, *, quality: int) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    im.save(path, format="WEBP", quality=quality, method=WEBP_METHOD)


def downscale_long_edge(im: Image.Image, long_edge: int) -> Image.Image:
    w, h = im.size
    scale = long_edge / max(w, h)
    if scale >= 1:
        return im.copy()
    nw = max(1, round(w * scale))
    nh = max(1, round(h * scale))
    return im.resize((nw, nh), Image.Resampling.LANCZOS)


def fit_to_css(im: Image.Image, display_w: int) -> Image.Image:
    dest = css_dest_size(im.size[0], im.size[1], display_w)
    if im.size == dest:
        return im.convert("RGBA")
    return im.convert("RGBA").resize(dest, Image.Resampling.LANCZOS)


def paste_on_green(im: Image.Image) -> Image.Image:
    canvas = Image.new("RGBA", im.size, FARM_GREEN)
    canvas.alpha_composite(im.convert("RGBA"))
    return canvas


def slot_bytes(path: Path) -> int:
    return path.stat().st_size


def build_slots(animal: str, scene: str) -> list[dict[str, object]]:
    sidecar = PUBLIC_ART / scene / f"{animal}.png"
    svg_path = PUBLIC_ART / scene / f"{animal}.svg"
    master = Image.open(sidecar).convert("RGBA")
    svg_raster = extract_svg_png(svg_path)
    if svg_raster.tobytes() != master.tobytes():
        print(f"warn: {animal} SVG payload pixels != sidecar", file=sys.stderr)

    native_q90 = ENCODED_DIR / f"{animal}-native-q90.webp"
    native_q80 = ENCODED_DIR / f"{animal}-native-q80.webp"
    too_small = ENCODED_DIR / f"{animal}-too-small-512-q80.webp"
    encode_webp(master, native_q90, quality=90)
    encode_webp(master, native_q80, quality=80)
    encode_webp(downscale_long_edge(master, TOO_SMALL_EDGE), too_small, quality=80)

    return [
        {
            "id": "svg",
            "title": "SVG wrap",
            "note": "control (now)",
            "warn": False,
            "file": svg_path,
            "image": svg_raster,
        },
        {
            "id": "png",
            "title": "PNG sidecar",
            "note": "control (master)",
            "warn": False,
            "file": sidecar,
            "image": master,
        },
        {
            "id": "webp-q90",
            "title": "WebP q90",
            "note": "native px",
            "warn": False,
            "file": native_q90,
            "image": Image.open(native_q90).convert("RGBA"),
        },
        {
            "id": "webp-q80",
            "title": "WebP q80",
            "note": "native px",
            "warn": False,
            "file": native_q80,
            "image": Image.open(native_q80).convert("RGBA"),
        },
        {
            "id": "webp-512-q80",
            "title": "512 q80",
            "note": "TOO SMALL",
            "warn": True,
            "file": too_small,
            "image": Image.open(too_small).convert("RGBA"),
        },
    ]


def compose_strip(
    animal: str,
    slots: list[dict[str, object]],
    display_w: int,
    scale_label: str,
) -> Image.Image:
    fitted = [fit_to_css(slot["image"], display_w) for slot in slots]  # RGBA images
    max_h = max(im.size[1] for im in fitted)
    pad = max(12, display_w // 16)
    header_h = max(52, display_w // 5)
    footer_h = max(28, display_w // 10)
    col_w = display_w + pad * 2
    width = col_w * len(slots)
    height = header_h + max_h + pad * 2 + footer_h

    title_font = load_font(FONT_BOLD, max(13, display_w // 14))
    note_font = load_font(FONT_REGULAR, max(11, display_w // 16))
    foot_font = load_font(FONT_REGULAR, max(11, display_w // 18))
    jp_font = load_font(FONT_JP, max(12, display_w // 16))

    sheet = Image.new("RGBA", (width, height), FARM_GREEN)
    draw = ImageDraw.Draw(sheet)
    draw.rectangle((0, 0, width, header_h), fill=INK)
    draw.rectangle((0, height - footer_h, width, height), fill=INK)

    for index, (slot, sprite) in enumerate(zip(slots, fitted, strict=True)):
        x0 = index * col_w
        if index > 0:
            draw.line((x0, 0, x0, height), fill=(42, 34, 24, 80), width=1)
        title = str(slot["title"])
        note = str(slot["note"])
        nbytes = slot_bytes(Path(slot["file"]))
        title_fill = (0xF4, 0xA7, 0x7A, 255) if slot["warn"] else CREAM
        draw.text((x0 + pad, 8), title, font=title_font, fill=title_fill)
        draw.text(
            (x0 + pad, 8 + title_font.size + 4),
            f"{note} · {nbytes:,} B",
            font=note_font,
            fill=CREAM,
        )
        gx = x0 + pad
        gy = header_h + pad + (max_h - sprite.size[1])
        sheet.alpha_composite(paste_on_green(sprite), (gx, gy))

    footer = (
        f"{animal}  |  {scale_label}  |  CSS width min(28vmin, 34vw) = {CSS_WIDTH_1X}px @ {VIEW_W}x{VIEW_H}  |  #{FARM_GREEN[0]:02X}{FARM_GREEN[1]:02X}{FARM_GREEN[2]:02X}"
    )
    draw.text((pad, height - footer_h + 8), footer, font=foot_font, fill=CREAM)
    if any(slot["warn"] for slot in slots):
        draw.text(
            (width - pad, height - footer_h + 8),
            "右端は縮小しすぎの参考（採用しない）",
            font=jp_font,
            fill=(0xF4, 0xA7, 0x7A, 255),
            anchor="ra",
        )
    return sheet.convert("RGB")


def write_readme(rows: list[dict[str, object]]) -> None:
    lines = [
        "# アート軽量化 A/B（WebP）",
        "",
        "本番の `scenes.js` / `sw.js` / `public/assets/art/` は未変更。",
        "幾何 SVG の描き直しはしていない。マスターは透明 sidecar PNG。",
        "",
        "表示サイズは現行 CSS `width: min(28vmin, 34vw)`。",
        f"1280×800 では **{CSS_WIDTH_1X} CSS px**。`strips/*-1x.png` がその幅、",
        f"`*-2x.png` はデバイスピクセル 2×（幅 {CSS_WIDTH_1X * 2}）。背景は牧場緑 `#7CB342`。",
        "",
        "再生成: リポジトリ根から `python3 docs/qa/art-ab/encode.py`（Pillow、WebP method=6）。",
        "コントロールの SVG/PNG は `public/` を参照するだけで、ここにはコピーしていない。",
        "",
        "## スロット",
        "",
        "| 列 | 中身 | 採用候補 |",
        "|---|---|---|",
        "| SVG wrap | 現行の PNG-in-SVG | コントロール（今の出荷） |",
        "| PNG sidecar | 透明 PNG（エンコード原板） | コントロール |",
        "| WebP q90 | 原生解像度・q90 | C 案の上側 |",
        "| WebP q80 | 原生解像度・q80 | C 案の下側 |",
        "| 512 q80 | 長辺 512 に縮小してから q80 | **小さすぎ警告。このラウンドでは採用しない** |",
        "",
        "## バイト",
        "",
        "| 動物 | スロット | ファイル | バイト | px |",
        "|---|---|---|---:|---|",
    ]
    for row in rows:
        lines.append(
            f"| {row['animal']} | `{row['id']}` | `{row['rel']}` | {row['bytes']:,} | {row['px']} |"
        )
    lines.extend(
        [
            "",
            "## ストリップ",
            "",
            "| 動物 | 1×（224 CSS px） | 2×（448 px） |",
            "|---|---|---|",
            "| cow | `strips/cow-1x.png` | `strips/cow-2x.png` |",
            "| sheep | `strips/sheep-1x.png` | `strips/sheep-2x.png` |",
            "| seagull | `strips/seagull-1x.png` | `strips/seagull-2x.png` |",
            "",
            "見るとき: クリームの縁（ハロー）、羊毛・羽のバンディング、斑のボケ。",
            "512 列は「後で 28vmin より大きくしたときの下限」用で、比較対象の本命ではない。",
            "",
        ]
    )
    (OUT_DIR / "README.md").write_text("\n".join(lines), encoding="utf-8")


def main() -> None:
    ENCODED_DIR.mkdir(parents=True, exist_ok=True)
    STRIPS_DIR.mkdir(parents=True, exist_ok=True)
    byte_rows: list[dict[str, object]] = []
    for animal, scene in ANIMALS:
        slots = build_slots(animal, scene)
        for scale, display_w, tag in ((1, CSS_WIDTH_1X, "1x"), (2, CSS_WIDTH_1X * 2, "2x")):
            sheet = compose_strip(
                animal,
                slots,
                display_w,
                f"{scale}×  display width {display_w}px",
            )
            out = STRIPS_DIR / f"{animal}-{tag}.png"
            sheet.save(out, format="PNG", optimize=True)
            print(f"wrote {out.relative_to(REPO)} ({out.stat().st_size:,} B)")
        for slot in slots:
            path = Path(slot["file"])
            im = slot["image"]
            px = f"{im.size[0]}×{im.size[1]}"
            byte_rows.append(
                {
                    "animal": animal,
                    "id": slot["id"],
                    "rel": path.relative_to(REPO).as_posix(),
                    "bytes": slot_bytes(path),
                    "px": px,
                }
            )
    write_readme(byte_rows)
    print(f"wrote {(OUT_DIR / 'README.md').relative_to(REPO)}")


if __name__ == "__main__":
    main()
