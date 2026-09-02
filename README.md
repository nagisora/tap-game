# どうぶつタップ

16ヶ月児が Android タブレットで、動物の絵をタップすると鳴き声が鳴るおもちゃです。SaaS ではありません。

仕様: [PLAN.md](./PLAN.md)（日本語） / [SUMMARY.md](./SUMMARY.md) / 許諾: [LICENSES.md](./LICENSES.md) / 親のピン留め: [PARENT.md](./PARENT.md)

## ローカルで開く

```bash
python3 -m http.server -d public 8765
```

`file://` では Service Worker が動きません。ブラウザで `http://127.0.0.1:8765` を開く。

公開は Cloudflare Pages の Direct Upload（`npx wrangler pages deploy public`）。Origin / GitHub を Pages の Git に繋がない。
