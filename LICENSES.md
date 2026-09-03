# Licenses

Child UI shows no credits. This file is for the parent and later implementers.

Commercial use of every included file is OK under the license named in its row. If a slot had no clearly licensed short clip, we synthesized an original cry instead of guessing.

## Art

All 12 animal illustrations are **original** images generated for this toy (flat toddler style, thick outline, no character likeness). They are not traces of books, anime, or mascots.

Processing applied to every animal: near-white background flood-fill to alpha, crop with padding, then native-resolution WebP (q90, alpha). The child app ships those `.webp` files. Re-encode masters (transparent PNG, not the opaque generator output) live in `docs/art-source/` and are not precached.

| File | Source | License | Commercial OK | What we changed |
|---|---|---|---|---|
| `public/assets/art/farm/cow.webp` | Original generation | Original work for this repo | yes | background removed, cropped, WebP q90 |
| `public/assets/art/farm/pig.webp` | Original generation | Original work for this repo | yes | same |
| `public/assets/art/farm/chicken.webp` | Original generation | Original work for this repo | yes | same |
| `public/assets/art/farm/sheep.webp` | Original generation | Original work for this repo | yes | same |
| `public/assets/art/yard/dog.webp` | Original generation | Original work for this repo | yes | same |
| `public/assets/art/yard/cat.webp` | Original generation | Original work for this repo | yes | same |
| `public/assets/art/yard/duck.webp` | Original generation | Original work for this repo | yes | same |
| `public/assets/art/yard/frog.webp` | Original generation | Original work for this repo | yes | same |
| `public/assets/art/sea/seagull.webp` | Original generation | Original work for this repo | yes | same |
| `public/assets/art/sea/seal.webp` | Original generation | Original work for this repo | yes | same |
| `public/assets/art/sea/penguin.webp` | Original generation | Original work for this repo | yes | same |
| `public/assets/art/sea/dolphin.webp` | Original generation | Original work for this repo | yes | same |
| `docs/art-source/{farm,yard,sea}/*.png` | Same originals, cropped transparent PNG | Original work for this repo | yes | background removed, cropped; not shipped |
| `public/assets/icons/icon-192.png` | Derived from cow original | Original work for this repo | yes | scaled onto farm-green square |
| `public/assets/icons/icon-512.png` | Derived from cow original | Original work for this repo | yes | scaled onto farm-green square |

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
