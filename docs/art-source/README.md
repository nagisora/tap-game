# アート再エンコード用マスター

子ども向けアプリには出さない。透明 PNG（カット済み sidecar）。不透明な 1024px の生成原画ではない。

本番は `public/assets/art/{farm,yard,sea}/*.webp`（原生解像度、WebP q90、Pillow method=6）。縮小も幾何 SVG 化もしない。

```bash
python3 docs/art-source/encode-webp.py
```
