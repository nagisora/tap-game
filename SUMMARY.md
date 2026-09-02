# Toddler animal-tap toy — one-page summary

Implementation plan for a **16-month-old’s cause-and-effect toy**, not a SaaS. Full spec: `PLAN.md` (Japanese). This file is an English index for reviewers.

## What it is

Tap a normal-sized animal illustration → that animal’s cry plays immediately. Three scenes (farm, yard, sea), four animals each (12 total), looping via **one** large ▶ (next only). Caregiver runs it as a **Chrome PWA** (`display: "standalone"`) on an **Android tablet**, then uses **OS screen pinning** so the child cannot leave.

## Stack (verified)

| Choose | Do not choose (v1) |
|---|---|
| Static `index.html` + CSS + JS | Next.js, TanStack Start, SvelteKit, React |
| No bundler | Vite “just in case” |
| Cloudflare Pages **Direct Upload** (`wrangler pages deploy`) | Pages Git integration (Origin is not GitHub/GitLab) |
| Tiny custom service worker, precache everything | Workbox CDN, HTTP-cache-only offline |
| Web Audio, one context, decode MP3s | Autoplay, overlapping `<audio>` tags |

Cloudflare’s 2026 default for new apps leans Workers static assets. This toy has **no worker code**, so Pages Direct Upload stays the host.

## Settled product rules

- Hit test: **axis-aligned bounding box inflated by ~one finger** (`max(48px, 6% of short viewport)`), not silhouette. Misses that do nothing are worse than a generous box. Overlaps: nearest illustration center. Animals beat ▶.
- Miss (empty background): **no-op**.
- Overlap audio: **cut previous, play new**. Toddlers mash; stacks of cries are chaos.
- No back arrow, no swipe, no menu, no labels on the child screen, no `history.pushState`.
- Offline after first load. No ads, links, tracking, accounts.
- Parent sets volume, sleep, and pinning in Android. **No in-app settings UI.**

## Animals (parent may swap files later)

- **farm:** cow, pig, chicken, sheep  
- **yard:** dog, cat, duck, frog  
- **sea:** seagull, seal, penguin, dolphin  

Forest was dropped so dog/cat stay in v1 without growing a zoo. Fourth scene is out of scope.

## Parent setup (failure modes are OS, not app chrome)

1. Open the HTTPS URL once online; wait until art shows; tap once so audio unlocks.  
2. Chrome ⋮ → Add to Home screen / Install. Launch from the **icon** (no address bar).  
3. Settings → Security → **App pinning / screen pinning ON**, require lock to unpin.  
4. Recents → app icon → Pin. Unpin = Back+Recents hold (3-button) or swipe-up-and-hold (gestures) + PIN.  
5. Do not confuse this with Chrome’s “pin tab”.

If they play inside a normal Chrome tab, the child gets an address bar, back, and other tabs. The app must not try to become a kiosk; pinning is the kiosk.

## Audio / art

- MP3, mono, 0.8–2.0s, ~-16 LUFS, true peak ≤ -1.5 dBTP. No predator roars.  
- Flat original (or CC0 / paid) illustrations; **no tracing of books or characters**. Record licenses in `LICENSES.md`, never on the child UI.

## Accept in 10 taps on the tablet (~5 min)

Standalone (no address bar) → cow cries → near-miss still cries → empty space does nothing → mash cuts audio → ▶ yard → ▶ sea → ▶ farm → pinning holds → airplane mode reopen still works.

## Out of scope

Native store app, accounts, more animals, swipe, back control, settings UI, iOS as a required target.
