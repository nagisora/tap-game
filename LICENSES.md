# Licenses

Child UI shows no credits. This file is for the parent and later implementers.

Commercial use of every included file is OK under the license named in its row. If a slot had no clearly licensed short clip, we synthesized an original cry instead of guessing.

## Art

All 12 animal illustrations are **original compact SVGs** drawn for this toy (flat toddler style, thick outline, no character likeness). They are not traces of books, anime, or mascots. Earlier PNG-in-SVG wrappers and a raster generation archive were removed so first load and Service Worker precache stay small on a tablet.

| File | Source | License | Commercial OK | What we changed |
|---|---|---|---|---|
| `public/assets/art/farm/cow.svg` | Original vector drawing | Original work for this repo | yes | compact flat SVG |
| `public/assets/art/farm/pig.svg` | Original vector drawing | Original work for this repo | yes | compact flat SVG |
| `public/assets/art/farm/chicken.svg` | Original vector drawing | Original work for this repo | yes | compact flat SVG |
| `public/assets/art/farm/sheep.svg` | Original vector drawing | Original work for this repo | yes | compact flat SVG |
| `public/assets/art/yard/dog.svg` | Original vector drawing | Original work for this repo | yes | compact flat SVG |
| `public/assets/art/yard/cat.svg` | Original vector drawing | Original work for this repo | yes | compact flat SVG |
| `public/assets/art/yard/duck.svg` | Original vector drawing | Original work for this repo | yes | compact flat SVG |
| `public/assets/art/yard/frog.svg` | Original vector drawing | Original work for this repo | yes | compact flat SVG |
| `public/assets/art/sea/seagull.svg` | Original vector drawing | Original work for this repo | yes | flying gray/white bird, compact flat SVG |
| `public/assets/art/sea/seal.svg` | Original vector drawing | Original work for this repo | yes | compact flat SVG |
| `public/assets/art/sea/penguin.svg` | Original vector drawing | Original work for this repo | yes | compact flat SVG |
| `public/assets/art/sea/dolphin.svg` | Original vector drawing | Original work for this repo | yes | compact flat SVG |
| `public/assets/icons/icon-192.png` | Derived from cow SVG | Original work for this repo | yes | scaled onto farm-green square |
| `public/assets/icons/icon-512.png` | Derived from cow SVG | Original work for this repo | yes | scaled onto farm-green square |

## Audio

| File | Source URL | License | Commercial OK | What we changed |
|---|---|---|---|---|
| `public/assets/audio/cow.mp3` | [Cow moo #1](https://freesound.org/people/spurioustransients/sounds/513559/) by spurioustransients | Creative Commons 0 | yes | trimmed loudest ~1.2s, mono 44.1 kHz, fade, loudness pass, 96 kbps MP3 |
| `public/assets/audio/pig.mp3` | [Pig - Grunt 5 (deep)](https://freesound.org/people/JarredGibb/sounds/233173/) by JarredGibb | Creative Commons 0 | yes | trimmed ~1.1s, mono, fade, loudness pass, MP3 |
| `public/assets/audio/chicken.mp3` | [Chicken clucking](https://freesound.org/people/Breviceps/sounds/456803/) by Breviceps | Creative Commons 0 | yes | extracted ~1.45s of hen clucks (not the rooster-like bursts in the same file), gated, mono 44.1 kHz, fade, peak-matched, 96 kbps MP3 |
| `public/assets/audio/sheep.mp3` | [Ewe baa](https://freesound.org/people/satoristudios3/sounds/677221/) by satoristudios3 | Creative Commons 0 | yes | trimmed ~1.2s, mono, fade, loudness pass, MP3 |
| `public/assets/audio/dog.mp3` | [Single bark of a dog](https://freesound.org/people/exe2be/sounds/535457/) by exe2be | Creative Commons 0 | yes | one bark copied with a short gap to make 1–2 friendly barks, mono, fade, loudness pass, MP3 |
| `public/assets/audio/cat.mp3` | [female cat short meoow](https://freesound.org/people/Lupsi/sounds/448018/) by Lupsi | Creative Commons 0 | yes | padded to ≥0.8s, mono, fade, loudness pass, MP3 |
| `public/assets/audio/duck.mp3` | [FEMALE DUCK - 1](https://freesound.org/people/SamuelGremaud/sounds/517792/) by SamuelGremaud | Creative Commons 0 | yes | trimmed ~1.2s, mono, fade, loudness pass, MP3 |
| `public/assets/audio/frog.mp3` | [frog_quak.mp3](https://freesound.org/people/katzlbt/sounds/361117/) by katzlbt | Creative Commons 0 | yes | trimmed ~1.2s, mono, fade, loudness pass, MP3 |
| `public/assets/audio/seal.mp3` | [G12-28-Seal Bark.wav](https://freesound.org/people/craigsmith/sounds/437960/) by craigsmith | Creative Commons 0 | yes | loudest ~1.1s extract from a longer file, mono, fade, loudness pass, MP3 |
| `public/assets/audio/dolphin.mp3` | [G12-15-Dolphins Underwater.wav](https://freesound.org/people/craigsmith/sounds/437947/) by craigsmith | Creative Commons 0 | yes | loudest ~1.1s extract, mono, fade, loudness pass, MP3 |
| `public/assets/audio/seagull.mp3` | [Gull.wav](https://freesound.org/people/nigelcoop/sounds/73497/) by nigelcoop | Creative Commons 0 | yes | trimmed ~1.6s of the single herring-gull long-call (no waves), gated, mono, fade, peak-matched, 96 kbps MP3 |
| `public/assets/audio/penguin.mp3` | Original synthesis in this repo (CC0 hits were colony+talk/wind, alien SFX, or a 0.6s chick squeak) | Original work for this repo | yes | generated ~1.1s nasal two-honk bray (pulse + formants + breath, not a sine), mono, fade, peak-matched, 96 kbps MP3 |

Omitted rather than “probably fine”: Mixkit SFX (license page is commercial-friendly in marketing copy but terms are revocable; we did not use them). Freesound results whose titles did not match the animal (goat labeled as cow, guitar jam labeled dolphin, horror stinger labeled dog, rubber duck, pig squeal).

CC0 summary: https://creativecommons.org/publicdomain/zero/1.0/
