const CACHE = "animal-tap-v1";
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
  "./assets/art/farm/cow.svg",
  "./assets/art/farm/pig.svg",
  "./assets/art/farm/chicken.svg",
  "./assets/art/farm/sheep.svg",
  "./assets/art/yard/dog.svg",
  "./assets/art/yard/cat.svg",
  "./assets/art/yard/duck.svg",
  "./assets/art/yard/frog.svg",
  "./assets/art/sea/seagull.svg",
  "./assets/art/sea/seal.svg",
  "./assets/art/sea/penguin.svg",
  "./assets/art/sea/dolphin.svg",
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
        Promise.all(keys.filter((key) => key.startsWith("animal-tap-") && key !== CACHE).map((key) => caches.delete(key))),
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
