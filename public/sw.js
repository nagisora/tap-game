const CACHE = "tap-game-v9";
const PRECACHE = [
  "./",
  "./index.html",
  "./styles.css",
  "./app.js",
  "./sw.js",
  "./manifest.webmanifest",
  "./data/scenes.js",
  "./assets/icons/icon-192.png",
  "./assets/icons/icon-512.png",
  "./assets/art/farm/cow.webp",
  "./assets/art/farm/pig.webp",
  "./assets/art/farm/chicken.webp",
  "./assets/art/farm/sheep.webp",
  "./assets/art/yard/dog.webp",
  "./assets/art/yard/cat.webp",
  "./assets/art/yard/duck.webp",
  "./assets/art/yard/frog.webp",
  "./assets/art/sea/seagull.webp",
  "./assets/art/sea/seal.webp",
  "./assets/art/sea/penguin.webp",
  "./assets/art/sea/dolphin.webp",
  "./assets/audio/cow.mp3",
  "./assets/audio/pig.mp3",
  "./assets/audio/chicken.mp3",
  "./assets/audio/sheep.mp3",
  "./assets/audio/dog.mp3",
  "./assets/audio/cat.mp3",
  "./assets/audio/duck.mp3",
  "./assets/audio/frog.mp3",
  "./assets/audio/seagull.mp3",
  "./assets/audio/seal.mp3",
  "./assets/audio/penguin.mp3",
  "./assets/audio/dolphin.mp3",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(PRECACHE)).then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => (key.startsWith("tap-game-") || key.startsWith("animal-tap-")) && key !== CACHE)
            .map((key) => caches.delete(key)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) {
    return;
  }
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request)),
  );
});
