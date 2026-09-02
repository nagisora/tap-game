export const HIT_PADDING_RATIO = 0.06;
export const NEXT_MIN_HIT_PX = 88;
/** Visual gap between an animal AABB and the ▶ hit box. */
export const NEXT_CLEARANCE_PX = 12;

export const scenes = [
  {
    id: "farm",
    background: "#9CCC65",
    animals: [
      { id: "cow", art: "assets/art/farm/cow.svg", audio: "assets/audio/cow.mp3", col: 0, row: 0, nudgeX: 0.08, nudgeY: 0.1 },
      { id: "chicken", art: "assets/art/farm/chicken.svg", audio: "assets/audio/chicken.mp3", col: 1, row: 0, nudgeX: -0.06, nudgeY: -0.08 },
      { id: "pig", art: "assets/art/farm/pig.svg", audio: "assets/audio/pig.mp3", col: 0, row: 1, nudgeX: -0.04, nudgeY: -0.06 },
      { id: "sheep", art: "assets/art/farm/sheep.svg", audio: "assets/audio/sheep.mp3", col: 1, row: 1, nudgeX: 0.05, nudgeY: 0.04 },
    ],
  },
  {
    id: "yard",
    background: "#D7EE9A",
    animals: [
      { id: "dog", art: "assets/art/yard/dog.svg", audio: "assets/audio/dog.mp3", col: 0, row: 0, nudgeX: -0.05, nudgeY: 0.08 },
      { id: "duck", art: "assets/art/yard/duck.svg", audio: "assets/audio/duck.mp3", col: 1, row: 0, nudgeX: 0.04, nudgeY: -0.1 },
      { id: "frog", art: "assets/art/yard/frog.svg", audio: "assets/audio/frog.mp3", col: 0, row: 1, nudgeX: 0.06, nudgeY: 0.04 },
      { id: "cat", art: "assets/art/yard/cat.svg", audio: "assets/audio/cat.mp3", col: 1, row: 1, nudgeX: -0.08, nudgeY: -0.05 },
    ],
  },
  {
    id: "sea",
    background: "#81D4FA",
    animals: [
      { id: "seagull", art: "assets/art/sea/seagull.svg", audio: "assets/audio/seagull.mp3", col: 0, row: 0, nudgeX: 0.04, nudgeY: -0.08 },
      { id: "penguin", art: "assets/art/sea/penguin.svg", audio: "assets/audio/penguin.mp3", col: 1, row: 0, nudgeX: -0.05, nudgeY: 0.06 },
      { id: "dolphin", art: "assets/art/sea/dolphin.svg", audio: "assets/audio/dolphin.mp3", col: 0, row: 1, nudgeX: -0.06, nudgeY: 0.05 },
      { id: "seal", art: "assets/art/sea/seal.svg", audio: "assets/audio/seal.mp3", col: 1, row: 1, nudgeX: 0.07, nudgeY: -0.04 },
    ],
  },
];
