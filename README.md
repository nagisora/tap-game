# どうぶつタップ（仮）

16ヶ月児が Android タブレットで、動物の絵をタップすると鳴き声が鳴るおもちゃのリポジトリです。SaaS ではありません。

**いま入っているのは実装計画だけです。アプリコードはまだありません。**

- 仕様の本体: [PLAN.md](./PLAN.md)（日本語）
- 英語の1枚要約: [SUMMARY.md](./SUMMARY.md)

## 後続の実装エージェントへ

`PLAN.md` を上から実装する。スタックを Next.js / TanStack Start / SvelteKit に置き換えない。ヒットはシルエットではなく外接矩形＋指幅。次へは ▶ のみ。音声は重ねず切って鳴らす。

ローカルで静的ファイルを試すときは（実装後）:

```bash
python -m http.server -d public 8765
```

`file://` では Service Worker が動きません。公開は Cloudflare Pages の Direct Upload（Origin を Pages の Git に繋がない）。手順は計画の第0節と第8節。

## 親向け

実装が載ったあと、タブレットでのピン留め手順は `PLAN.md` 第6節（実装時に `PARENT.md` へ抜粋する想定）を見てください。子ども向けの設定画面はありません。
