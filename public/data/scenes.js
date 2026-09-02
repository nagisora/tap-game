export const HIT_PADDING_RATIO = 0.06;
export const NEXT_MIN_HIT_PX = 88;

export const scenes = [
  {
    id: "farm",
    background: "#7CB342",
    animals: [
      { id: "cow", art: "assets/art/farm/cow.svg", audio: "assets/audio/cow.mp3", x: 0.2, y: 0.4 },
      { id: "pig", art: "assets/art/farm/pig.svg", audio: "assets/audio/pig.mp3", x: 0.48, y: 0.62 },
      { id: "chicken", art: "assets/art/farm/chicken.svg", audio: "assets/audio/chicken.mp3", x: 0.54, y: 0.3 },
      { id: "sheep", art: "assets/art/farm/sheep.svg", audio: "assets/audio/sheep.mp3", x: 0.6, y: 0.74 },
    ],
  },
  {
    id: "yard",
    background: "#C5E478",
    animals: [
      { id: "dog", art: "assets/art/yard/dog.svg", audio: "assets/audio/dog.mp3", x: 0.22, y: 0.42 },
      { id: "cat", art: "assets/art/yard/cat.svg", audio: "assets/audio/cat.mp3", x: 0.5, y: 0.36 },
      { id: "duck", art: "assets/art/yard/duck.svg", audio: "assets/audio/duck.mp3", x: 0.58, y: 0.42 },
      { id: "frog", art: "assets/art/yard/frog.svg", audio: "assets/audio/frog.mp3", x: 0.46, y: 0.7 },
    ],
  },
  {
    id: "sea",
    background: "#4FC3F7",
    animals: [
      { id: "seagull", art: "assets/art/sea/seagull.svg", audio: "assets/audio/seagull.mp3", x: 0.22, y: 0.34 },
      { id: "seal", art: "assets/art/sea/seal.svg", audio: "assets/audio/seal.mp3", x: 0.48, y: 0.58 },
      { id: "penguin", art: "assets/art/sea/penguin.svg", audio: "assets/audio/penguin.mp3", x: 0.58, y: 0.38 },
      { id: "dolphin", art: "assets/art/sea/dolphin.svg", audio: "assets/audio/dolphin.mp3", x: 0.28, y: 0.7 },
    ],
  },
];
