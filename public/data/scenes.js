export const HIT_PADDING_RATIO = 0.06;
export const NEXT_MIN_HIT_PX = 88;

export const scenes = [
  {
    id: "farm",
    background: "#7CB342",
    animals: [
      { id: "cow", art: "assets/art/farm/cow.webp", audio: "assets/audio/cow.mp3", x: 0.22, y: 0.28 },
      { id: "pig", art: "assets/art/farm/pig.webp", audio: "assets/audio/pig.mp3", x: 0.24, y: 0.74 },
      { id: "chicken", art: "assets/art/farm/chicken.webp", audio: "assets/audio/chicken.mp3", x: 0.58, y: 0.24 },
      { id: "sheep", art: "assets/art/farm/sheep.webp", audio: "assets/audio/sheep.mp3", x: 0.62, y: 0.74 },
    ],
  },
  {
    id: "yard",
    background: "#C5E478",
    animals: [
      { id: "dog", art: "assets/art/yard/dog.webp", audio: "assets/audio/dog.mp3", x: 0.22, y: 0.28 },
      { id: "cat", art: "assets/art/yard/cat.webp", audio: "assets/audio/cat.mp3", x: 0.24, y: 0.74 },
      { id: "duck", art: "assets/art/yard/duck.webp", audio: "assets/audio/duck.mp3", x: 0.58, y: 0.24 },
      { id: "frog", art: "assets/art/yard/frog.webp", audio: "assets/audio/frog.mp3", x: 0.62, y: 0.74 },
    ],
  },
  {
    id: "sea",
    background: "#4FC3F7",
    animals: [
      { id: "seagull", art: "assets/art/sea/seagull.webp", audio: "assets/audio/seagull.mp3", x: 0.22, y: 0.28 },
      { id: "seal", art: "assets/art/sea/seal.webp", audio: "assets/audio/seal.mp3", x: 0.62, y: 0.74 },
      { id: "penguin", art: "assets/art/sea/penguin.webp", audio: "assets/audio/penguin.mp3", x: 0.58, y: 0.24 },
      { id: "dolphin", art: "assets/art/sea/dolphin.webp", audio: "assets/audio/dolphin.mp3", x: 0.24, y: 0.74 },
    ],
  },
];
