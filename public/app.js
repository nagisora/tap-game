import { HIT_PADDING_RATIO, NEXT_MIN_HIT_PX, scenes } from "./data/scenes.js";

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
let nextArmedAt = 0;
let activePointerId = null;

function shortViewport() {
  const vv = window.visualViewport;
  const w = vv ? vv.width : window.innerWidth;
  const h = vv ? vv.height : window.innerHeight;
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

async function ensureAudio() {
  if (!audioContext) {
    audioContext = new AudioContext();
  }
  if (audioContext.state === "suspended") {
    await audioContext.resume();
  }
  return audioContext;
}

async function loadBuffers() {
  const ctx = audioContext ?? new AudioContext();
  audioContext = ctx;
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
          .then((raw) => ctx.decodeAudioData(raw))
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
  stage.style.background = scene.background;
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", scene.background);
  document.body.style.background = scene.background;
  renderedAnimals = scene.animals.map((animal) => {
    const el = document.createElement("img");
    el.className = "animal";
    el.src = animal.art;
    el.alt = "";
    el.draggable = false;
    el.style.left = `${animal.x * 100}%`;
    el.style.top = `${animal.y * 100}%`;
    stage.append(el);
    return { id: animal.id, audio: animal.audio, el };
  });
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
  await ensureAudio();
  if (buffers.size === 0) {
    await loadBuffers();
  }
  const hit = hitTest(event.clientX, event.clientY);
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
nextButton.addEventListener("click", (event) => {
  event.preventDefault();
});

renderScene();
loadBuffers();

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("./sw.js");
}
