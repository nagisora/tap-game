# アート軽量化 A/B（WebP）

このフォルダは差し替え前の A/B 証拠。本番は以降 native WebP q90（`public/assets/art/`）。幾何 SVG の描き直しはしていない。マスター PNG は `docs/art-source/`。
表の SVG/PNG パスは A/B 当時の参照（本番からは削除済み）。

表示サイズは現行 CSS `width: min(28vmin, 34vw)`。
1280×800 では **224 CSS px**。`strips/*-1x.png` がその幅、
`*-2x.png` はデバイスピクセル 2×（幅 448）。背景は牧場緑 `#7CB342`。

再生成: リポジトリ根から `python3 docs/qa/art-ab/encode.py`（Pillow、WebP method=6）。
コントロールの SVG/PNG は `public/` を参照するだけで、ここにはコピーしていない。

## スロット

| 列 | 中身 | 採用候補 |
|---|---|---|
| SVG wrap | 現行の PNG-in-SVG | コントロール（今の出荷） |
| PNG sidecar | 透明 PNG（エンコード原板） | コントロール |
| WebP q90 | 原生解像度・q90 | C 案の上側 |
| WebP q80 | 原生解像度・q80 | C 案の下側 |
| 512 q80 | 長辺 512 に縮小してから q80 | **小さすぎ警告。このラウンドでは採用しない** |

## バイト

| 動物 | スロット | ファイル | バイト | 原生 px |
|---|---|---|---:|---|
| cow | `svg` | `public/assets/art/farm/cow.svg` | 1,076,327 | 1009×1005 |
| cow | `png` | `public/assets/art/farm/cow.png` | 807,091 | 1009×1005 |
| cow | `webp-q90` | `docs/qa/art-ab/encoded/cow-native-q90.webp` | 52,370 | 1009×1005 |
| cow | `webp-q80` | `docs/qa/art-ab/encoded/cow-native-q80.webp` | 38,870 | 1009×1005 |
| cow | `webp-512-q80` | `docs/qa/art-ab/encoded/cow-too-small-512-q80.webp` | 27,062 | 512×510 |
| sheep | `svg` | `public/assets/art/farm/sheep.svg` | 1,076,824 | 1021×988 |
| sheep | `png` | `public/assets/art/farm/sheep.png` | 807,468 | 1021×988 |
| sheep | `webp-q90` | `docs/qa/art-ab/encoded/sheep-native-q90.webp` | 48,654 | 1021×988 |
| sheep | `webp-q80` | `docs/qa/art-ab/encoded/sheep-native-q80.webp` | 35,230 | 1021×988 |
| sheep | `webp-512-q80` | `docs/qa/art-ab/encoded/sheep-too-small-512-q80.webp` | 23,504 | 512×495 |
| seagull | `svg` | `public/assets/art/sea/seagull.svg` | 906,649 | 919×998 |
| seagull | `png` | `public/assets/art/sea/seagull.png` | 679,837 | 919×998 |
| seagull | `webp-q90` | `docs/qa/art-ab/encoded/seagull-native-q90.webp` | 40,660 | 919×998 |
| seagull | `webp-q80` | `docs/qa/art-ab/encoded/seagull-native-q80.webp` | 30,112 | 919×998 |
| seagull | `webp-512-q80` | `docs/qa/art-ab/encoded/seagull-too-small-512-q80.webp` | 21,356 | 471×512 |

## ストリップ

| 動物 | 1×（224 CSS px） | 2×（448 px） |
|---|---|---|
| cow | `strips/cow-1x.png` | `strips/cow-2x.png` |
| sheep | `strips/sheep-1x.png` | `strips/sheep-2x.png` |
| seagull | `strips/seagull-1x.png` | `strips/seagull-2x.png` |

見るとき: クリームの縁（ハロー）、羊毛・羽のバンディング、斑のボケ。
512 列は「後で 28vmin より大きくしたときの下限」用で、比較対象の本命ではない。
