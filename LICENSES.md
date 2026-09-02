# Licenses

Child UI shows no credits. This file is for the parent and later implementers.

Commercial use of every included file is OK under the license named in its row. If a slot had no clearly licensed short clip, we synthesized an original cry instead of guessing.

## Art

All 12 animal illustrations are **original** images generated for this toy (flat toddler style, thick outline, no character likeness). They are not traces of books, anime, or mascots.

Processing applied to every animal: near-white background flood-fill to alpha, crop with padding, wrap the PNG in an SVG (`<image href="data:image/png;base64,…">`) so the PLAN §7 `.svg` paths work. Transparent PNG copies also sit next to the SVGs. Unprocessed generator output is under `public/assets/art/_generated-source/`.

| File | Source | License | Commercial OK | What we changed |
|---|---|---|---|---|
| `public/assets/art/farm/cow.svg` and `cow.png` | Original generation | Original work for this repo | yes | background removed, cropped, SVG wrap |
| `public/assets/art/farm/pig.svg` and `pig.png` | Original generation | Original work for this repo | yes | same |
| `public/assets/art/farm/chicken.svg` and `chicken.png` | Original generation | Original work for this repo | yes | same |
| `public/assets/art/farm/sheep.svg` and `sheep.png` | Original generation | Original work for this repo | yes | same |
| `public/assets/art/yard/dog.svg` and `dog.png` | Original generation | Original work for this repo | yes | same |
| `public/assets/art/yard/cat.svg` and `cat.png` | Original generation | Original work for this repo | yes | same |
| `public/assets/art/yard/duck.svg` and `duck.png` | Original generation | Original work for this repo | yes | same |
| `public/assets/art/yard/frog.svg` and `frog.png` | Original generation | Original work for this repo | yes | same |
| `public/assets/art/sea/seagull.svg` and `seagull.png` | Original generation | Original work for this repo | yes | same |
| `public/assets/art/sea/seal.svg` and `seal.png` | Original generation | Original work for this repo | yes | same |
| `public/assets/art/sea/penguin.svg` and `penguin.png` | Original generation | Original work for this repo | yes | same |
| `public/assets/art/sea/dolphin.svg` and `dolphin.png` | Original generation | Original work for this repo | yes | same |
| `public/assets/art/_generated-source/*.png` | Same originals, pre-cut | Original work for this repo | yes | none (archive of generator output) |
| `public/assets/icons/icon-192.png` | Derived from cow original | Original work for this repo | yes | scaled onto farm-green square |
| `public/assets/icons/icon-512.png` | Derived from cow original | Original work for this repo | yes | scaled onto farm-green square |

## Audio

| File | Source URL | License | Commercial OK | What we changed |
|---|---|---|---|---|
| `public/assets/audio/cow.mp3` | [Cow moo #1](https://freesound.org/people/spurioustransients/sounds/513559/) by spurioustransients | Creative Commons 0 | yes | trimmed loudest ~1.2s, mono 44.1 kHz, fade, loudness pass, 96 kbps MP3 |
| `public/assets/audio/pig.mp3` | [Pig - Grunt 5 (deep)](https://freesound.org/people/JarredGibb/sounds/233173/) by JarredGibb | Creative Commons 0 | yes | trimmed ~1.1s, mono, fade, loudness pass, MP3 |
| `public/assets/audio/chicken.mp3` | [Rooster Crow 1](https://freesound.org/people/BenjaminNelan/sounds/435508/) by BenjaminNelan | Creative Commons 0 | yes | trimmed to ≤1.5s, mono, fade, loudness pass, MP3 |
| `public/assets/audio/sheep.mp3` | [Ewe baa](https://freesound.org/people/satoristudios3/sounds/677221/) by satoristudios3 | Creative Commons 0 | yes | trimmed ~1.2s, mono, fade, loudness pass, MP3 |
| `public/assets/audio/dog.mp3` | [Single bark of a dog](https://freesound.org/people/exe2be/sounds/535457/) by exe2be | Creative Commons 0 | yes | one bark copied with a short gap to make 1–2 friendly barks, mono, fade, loudness pass, MP3 |
| `public/assets/audio/cat.mp3` | [female cat short meoow](https://freesound.org/people/Lupsi/sounds/448018/) by Lupsi | Creative Commons 0 | yes | padded to ≥0.8s, mono, fade, loudness pass, MP3 |
| `public/assets/audio/duck.mp3` | [FEMALE DUCK - 1](https://freesound.org/people/SamuelGremaud/sounds/517792/) by SamuelGremaud | Creative Commons 0 | yes | trimmed ~1.2s, mono, fade, loudness pass, MP3 |
| `public/assets/audio/frog.mp3` | [frog_quak.mp3](https://freesound.org/people/katzlbt/sounds/361117/) by katzlbt | Creative Commons 0 | yes | trimmed ~1.2s, mono, fade, loudness pass, MP3 |
| `public/assets/audio/seal.mp3` | [G12-28-Seal Bark.wav](https://freesound.org/people/craigsmith/sounds/437960/) by craigsmith | Creative Commons 0 | yes | loudest ~1.1s extract from a longer file, mono, fade, loudness pass, MP3 |
| `public/assets/audio/dolphin.mp3` | [G12-15-Dolphins Underwater.wav](https://freesound.org/people/craigsmith/sounds/437947/) by craigsmith | Creative Commons 0 | yes | loudest ~1.1s extract, mono, fade, loudness pass, MP3 |
| `public/assets/audio/seagull.mp3` | Original synthesis in this repo (no clean short CC0 gull cry without waves/rigging) | Original work for this repo | yes | generated ~1s nasal cry, mono, fade, loudness pass, MP3 |
| `public/assets/audio/penguin.mp3` | Original synthesis in this repo (CC0 hits were colony ambience or “alien penguin”) | Original work for this repo | yes | generated ~0.9s honk, mono, fade, loudness pass, MP3 |

Omitted rather than “probably fine”: Mixkit SFX (license page is commercial-friendly in marketing copy but terms are revocable; we did not use them). Freesound results whose titles did not match the animal (goat labeled as cow, guitar jam labeled dolphin, horror stinger labeled dog, rubber duck, pig squeal).

CC0 summary: https://creativecommons.org/publicdomain/zero/1.0/
