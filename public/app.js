import { HIT_PADDING_RATIO, NEXT_CLEARANCE_PX, NEXT_MIN_HIT_PX, scenes } from "./data/scenes.js";

const stage = document.getElementById("stage");
const nextButton = document.getElementById("next");

/** @type {number} */
let sceneIndex = 0;
/** @type {Array<{ id: string, audio: string, el: HTMLImageElement }>} */
let renderedAnimals = [];
/** @type {AudioContext | null} */
let audioContext = null;
/** @type {Map<string, AudioBuffer>} */
const buffers = new Map();
/** @type {AudioBufferSourceNode | null} */
let playingSource = null;
/** @type {Promise<void> | null} */
let loadPromise = null;
let nextArmedAt = 0;
let activePointerId = null;

function viewportSize() {
  const vv = window.visualViewport;
  return {
    w: vv ? vv.width : window.innerWidth,
    h: vv ? vv.height : window.innerHeight,
  };
}

function shortViewport() {
  const { w, h } = viewportSize();
  return Math.min(w, h);
}

function hitPadding() {
  return Math.max(48, HIT_PADDING_RATIO * shortViewport());
}

function inflate(rect, pad) {
  return {
    left: rect.left - pad,
    top: rect.top - pad,
    right: rect.right + pad,
    bottom: rect.bottom + pad,
    cx: (rect.left + rect.right) / 2,
    cy: (rect.top + rect.bottom) / 2,
  };
}

function pointIn(box, x, y) {
  return x >= box.left && x <= box.right && y >= box.top && y <= box.bottom;
}

function playableBounds() {
  const { h } = viewportSize();
  const nextRect = nextButton.getBoundingClientRect();
  const edge = Math.max(10, 0.025 * shortViewport());
  return {
    left: edge,
    top: edge,
    right: Math.max(edge + 64, nextRect.left - NEXT_CLEARANCE_PX),
    bottom: h - edge,
  };
}

function animalSizePx(play) {
  const vmin = shortViewport();
  const playW = play.right - play.left;
  const playH = play.bottom - play.top;
  const colGap = Math.max(28, 0.06 * playW);
  const rowGap = Math.max(28, 0.06 * playH);
  const maxFit = Math.min((playW - colGap) / 2, (playH - rowGap) / 2);
  const target = 0.42 * vmin;
  return Math.min(Math.max(target, 0.36 * vmin), 0.44 * vmin, maxFit);
}

function layoutAnimals() {
  if (!renderedAnimals.length) {
    return;
  }
  const { w, h } = viewportSize();
  const play = playableBounds();
  const size = animalSizePx(play);
  stage.style.setProperty("--animal-size", `${size}px`);
  const scene = scenes[sceneIndex];
  renderedAnimals.forEach((item, index) => {
    const spec = scene.animals[index];
    item.el.style.width = `${size}px`;
    const rect = item.el.getBoundingClientRect();
    const halfW = Math.max(rect.width / 2, size / 2);
    const halfH = Math.max(rect.height / 2, size / 2);
    const leftCol = play.left + halfW;
    const rightCol = play.right - halfW;
    const topRow = play.top + halfH;
    const botRow = play.bottom - halfH;
    const spanX = Math.max(0, rightCol - leftCol);
    const spanY = Math.max(0, botRow - topRow);
    const baseX = spec.col === 0 ? leftCol : rightCol;
    const baseY = spec.row === 0 ? topRow : botRow;
    const nudgeX = spanX - size >= 48 ? spec.nudgeX || 0 : 0;
    const cx = baseX + nudgeX * spanX;
    const cy = baseY + (spec.nudgeY || 0) * spanY;
    const clampedX = Math.min(Math.max(cx, leftCol), rightCol);
    const clampedY = Math.min(Math.max(cy, topRow), botRow);
    item.el.style.left = `${(clampedX / w) * 100}%`;
    item.el.style.top = `${(clampedY / h) * 100}%`;
  });
}

async function ensureAudio() {
  if (!audioContext) {
    audioContext = new AudioContext();
  }
  if (audioContext.state === "suspended") {
    await audioContext.resume();
  }
  return audioContext;
}

function loadBuffers() {
  if (loadPromise) {
    return loadPromise;
  }
  loadPromise = (async () => {
    const ctx = await ensureAudio();
    const jobs = [];
    for (const scene of scenes) {
      for (const animal of scene.animals) {
        if (buffers.has(animal.id)) {
          continue;
        }
        jobs.push(
          fetch(animal.audio)
            .then((res) => {
              if (!res.ok) {
                throw new Error(animal.audio);
              }
              return res.arrayBuffer();
            })
            .then((raw) => ctx.decodeAudioData(raw.slice(0)))
            .then((buf) => {
              buffers.set(animal.id, buf);
            })
            .catch(() => {
              // miss-equivalent: later tap is silent
            }),
        );
      }
    }
    await Promise.all(jobs);
  })();
  return loadPromise;
}

function stopCurrent() {
  if (playingSource) {
    try {
      playingSource.stop();
    } catch {
      // already stopped
    }
    playingSource = null;
  }
}

function playAnimal(id) {
  const ctx = audioContext;
  const buf = buffers.get(id);
  if (!ctx || !buf) {
    return;
  }
  stopCurrent();
  const src = ctx.createBufferSource();
  src.buffer = buf;
  src.connect(ctx.destination);
  src.onended = () => {
    if (playingSource === src) {
      playingSource = null;
    }
  };
  playingSource = src;
  src.start();
}

function renderScene() {
  const scene = scenes[sceneIndex];
  stage.replaceChildren();
  stage.className = `scene-${scene.id}`;
  stage.style.background = scene.background;
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", scene.background);
  document.body.style.background = scene.background;
  renderedAnimals = scene.animals.map((animal) => {
    const el = document.createElement("img");
    el.className = "animal";
    el.src = animal.art;
    el.alt = "";
    el.draggable = false;
    stage.append(el);
    return { id: animal.id, audio: animal.audio, el };
  });
  layoutAnimals();
  const pending = renderedAnimals.map((item) =>
    item.el.decode ? item.el.decode().catch(() => undefined) : Promise.resolve(),
  );
  Promise.all(pending).then(layoutAnimals);
}

function bounce(el) {
  el.classList.remove("is-hit");
  void el.offsetWidth;
  el.classList.add("is-hit");
}

function hitTest(clientX, clientY) {
  const pad = hitPadding();
  const hits = [];
  for (const animal of renderedAnimals) {
    const box = inflate(animal.el.getBoundingClientRect(), pad);
    if (pointIn(box, clientX, clientY)) {
      hits.push({ animal, box });
    }
  }
  if (hits.length === 1) {
    return { type: "animal", animal: hits[0].animal };
  }
  if (hits.length > 1) {
    let best = hits[0];
    let bestD = Infinity;
    for (const hit of hits) {
      const dx = hit.box.cx - clientX;
      const dy = hit.box.cy - clientY;
      const d = dx * dx + dy * dy;
      if (d < bestD) {
        bestD = d;
        best = hit;
      }
    }
    return { type: "animal", animal: best.animal };
  }

  const nextRect = nextButton.getBoundingClientRect();
  const min = NEXT_MIN_HIT_PX;
  const extraX = Math.max(0, (min - nextRect.width) / 2);
  const extraY = Math.max(0, (min - nextRect.height) / 2);
  const nextBox = {
    left: nextRect.left - extraX,
    top: nextRect.top - extraY,
    right: nextRect.right + extraX,
    bottom: nextRect.bottom + extraY,
  };
  if (pointIn(nextBox, clientX, clientY)) {
    return { type: "next" };
  }
  return { type: "miss" };
}

function goNext() {
  const now = performance.now();
  if (now < nextArmedAt) {
    return;
  }
  nextArmedAt = now + 400;
  sceneIndex = (sceneIndex + 1) % scenes.length;
  renderScene();
}

async function onPointerDown(event) {
  if (event.isPrimary === false) {
    return;
  }
  if (activePointerId !== null && event.pointerId !== activePointerId) {
    return;
  }
  activePointerId = event.pointerId;
  event.preventDefault();
  const hit = hitTest(event.clientX, event.clientY);
  await ensureAudio();
  await loadBuffers();
  switch (hit.type) {
    case "animal":
      bounce(hit.animal.el);
      playAnimal(hit.animal.id);
      break;
    case "next":
      goNext();
      break;
    case "miss":
      break;
    default: {
      const _exhaustive = hit.type;
      void _exhaustive;
      break;
    }
  }
}

function onPointerUp(event) {
  if (event.pointerId === activePointerId) {
    activePointerId = null;
  }
}

document.addEventListener("pointerdown", onPointerDown, { passive: false });
document.addEventListener("pointerup", onPointerUp);
document.addEventListener("pointercancel", onPointerUp);
document.addEventListener("contextmenu", (event) => event.preventDefault());
document.addEventListener(
  "touchmove",
  (event) => {
    event.preventDefault();
  },
  { passive: false },
);
nextButton.addEventListener("click", (event) => {
  event.preventDefault();
});
window.addEventListener("resize", layoutAnimals);
window.visualViewport?.addEventListener("resize", layoutAnimals);
window.addEventListener("orientationchange", () => {
  requestAnimationFrame(layoutAnimals);
});

const startScene = new URLSearchParams(location.search).get("scene");
if (startScene) {
  const startIndex = scenes.findIndex((scene) => scene.id === startScene);
  if (startIndex >= 0) {
    sceneIndex = startIndex;
  }
}

renderScene();
loadBuffers();

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("./sw.js");
}
