export const HIT_PADDING_RATIO = 0.06;
export const NEXT_MIN_HIT_PX = 88;

export const scenes = [
  {
    id: "farm",
    background: "#7CB342",
    animals: [
      { id: "cow", art: "assets/art/farm/cow.vector.svg", audio: "assets/audio/cow.mp3", x: 0.2, y: 0.4 },
      { id: "pig", art: "assets/art/farm/pig.vector.svg", audio: "assets/audio/pig.mp3", x: 0.42, y: 0.62 },
      { id: "chicken", art: "assets/art/farm/chicken.vector.svg", audio: "assets/audio/chicken.mp3", x: 0.54, y: 0.26 },
      { id: "sheep", art: "assets/art/farm/sheep.vector.svg", audio: "assets/audio/sheep.mp3", x: 0.54, y: 0.76 },
    ],
  },
  {
    id: "yard",
    background: "#C5E478",
    animals: [
      { id: "dog", art: "assets/art/yard/dog.vector.svg", audio: "assets/audio/dog.mp3", x: 0.2, y: 0.42 },
      { id: "cat", art: "assets/art/yard/cat.vector.svg", audio: "assets/audio/cat.mp3", x: 0.42, y: 0.48 },
      { id: "duck", art: "assets/art/yard/duck.vector.svg", audio: "assets/audio/duck.mp3", x: 0.56, y: 0.24 },
      { id: "frog", art: "assets/art/yard/frog.vector.svg", audio: "assets/audio/frog.mp3", x: 0.5, y: 0.74 },
    ],
  },
  {
    id: "sea",
    background: "#4FC3F7",
    animals: [
      { id: "seagull", art: "assets/art/sea/seagull.vector.svg", audio: "assets/audio/seagull.mp3", x: 0.22, y: 0.28 },
      { id: "seal", art: "assets/art/sea/seal.vector.svg", audio: "assets/audio/seal.mp3", x: 0.5, y: 0.62 },
      { id: "penguin", art: "assets/art/sea/penguin.vector.svg", audio: "assets/audio/penguin.mp3", x: 0.56, y: 0.26 },
      { id: "dolphin", art: "assets/art/sea/dolphin.vector.svg", audio: "assets/audio/dolphin.mp3", x: 0.28, y: 0.74 },
    ],
  },
];
