import g from "./globals";
import { PillEffectCustom } from "./types/enums";

const DURATION = 600; // 20 seconds

export const COLORS = [
  PillColor.PILL_BLUE_BLUE, // 1
  PillColor.PILL_ORANGE_ORANGE, // 3
  PillColor.PILL_WHITE_WHITE, // 4
  PillColor.PILL_REDDOTS_RED, // 5 (the sprite for this is changed to a full red pill in Racing+)
];

export const EFFECTS = [
  // Vanilla pills
  PillEffect.PILLEFFECT_BALLS_OF_STEEL, // 2
  PillEffect.PILLEFFECT_HEALTH_UP, // 7
  PillEffect.PILLEFFECT_PRETTY_FLY, // 10
  PillEffect.PILLEFFECT_SPEED_UP, // 14
  PillEffect.PILLEFFECT_TEARS_UP, // 16
  PillEffect.PILLEFFECT_48HOUR_ENERGY, // 20
  PillEffect.PILLEFFECT_SEE_FOREVER, // 23

  // Custom pills
  PillEffectCustom.PILLEFFECT_DAMAGE_UP,
  PillEffectCustom.PILLEFFECT_TEAR_DELAY_DOWN,
  PillEffectCustom.PILLEFFECT_DEAL_AFFINITY,
  PillEffectCustom.PILLEFFECT_BONE_AFFINITY,
  PillEffectCustom.PILLEFFECT_RESTOCK,
  PillEffectCustom.PILLEFFECT_GOLDEN_DUMP,
  PillEffectCustom.PILLEFFECT_SUPER_SADNESS,
  PillEffectCustom.PILLEFFECT_INVINCIBILITY,
  PillEffectCustom.PILLEFFECT_REALLY_BAD_GAS,
  PillEffectCustom.PILLEFFECT_GLIMPSE,
  PillEffectCustom.PILLEFFECT_AETHER,
  PillEffectCustom.PILLEFFECT_WALLS_HAVE_EYES,
  PillEffectCustom.PILLEFFECT_BLADDER_INFECTION,
  PillEffectCustom.PILLEFFECT_SCORCHED_EARTH,
];

// The first number is the starting grid coordinate
// The second number is the number of times to iterate
// The third number is the starting grid coordinate for the second wall (for L rooms)
export const WALL_COORDINATES = new Map([
  [
    RoomShape.ROOMSHAPE_1x1, // 1
    new Map([
      [Direction.LEFT, [29, 7]],
      [Direction.UP, [121, 13]],
      [Direction.RIGHT, [15, 7]],
      [Direction.DOWN, [1, 13]],
    ]),
  ],
  [
    RoomShape.ROOMSHAPE_IH, // 2
    new Map([
      [Direction.LEFT, [59, 3]],
      [Direction.UP, [91, 13]],
      [Direction.RIGHT, [45, 3]],
      [Direction.DOWN, [31, 13]],
    ]),
  ],
  [
    RoomShape.ROOMSHAPE_IV, // 3
    new Map([
      [Direction.LEFT, [25, 7]],
      [Direction.UP, [125, 5]],
      [Direction.RIGHT, [19, 7]],
      [Direction.DOWN, [5, 5]],
    ]),
  ],
  [
    RoomShape.ROOMSHAPE_1x2, // 4
    new Map([
      [Direction.LEFT, [44, 14]],
      [Direction.UP, [226, 13]],
      [Direction.RIGHT, [15, 14]],
      [Direction.DOWN, [1, 13]],
    ]),
  ],
  [
    RoomShape.ROOMSHAPE_IIV, // 5
    new Map([
      [Direction.LEFT, [25, 14]],
      [Direction.UP, [230, 5]],
      [Direction.RIGHT, [19, 14]],
      [Direction.DOWN, [5, 5]],
    ]),
  ],
  [
    RoomShape.ROOMSHAPE_2x1, // 6
    new Map([
      [Direction.LEFT, [55, 7]],
      [Direction.UP, [225, 26]],
      [Direction.RIGHT, [28, 7]],
      [Direction.DOWN, [1, 26]],
    ]),
  ],
  [
    RoomShape.ROOMSHAPE_IIH, // 7
    new Map([
      [Direction.LEFT, [111, 3]],
      [Direction.UP, [169, 26]],
      [Direction.RIGHT, [84, 3]],
      [Direction.DOWN, [57, 26]],
    ]),
  ],
  [
    RoomShape.ROOMSHAPE_2x2, // 8
    new Map([
      [Direction.LEFT, [55, 14]],
      [Direction.UP, [421, 26]],
      [Direction.RIGHT, [28, 14]],
      [Direction.DOWN, [1, 26]],
    ]),
  ],
  [
    RoomShape.ROOMSHAPE_LTL, // 9
    new Map([
      [Direction.LEFT, [55, 14]],
      [Direction.UP, [421, 26]],
      [Direction.RIGHT, [41, 7, 224]],
      [Direction.DOWN, [197, 13, 14]],
    ]),
  ],
  [
    RoomShape.ROOMSHAPE_LTR, // 10
    new Map([
      [Direction.LEFT, [42, 7, 251]],
      [Direction.UP, [421, 26]],
      [Direction.RIGHT, [28, 14]],
      [Direction.DOWN, [1, 13, 210]],
    ]),
  ],
  [
    RoomShape.ROOMSHAPE_LBL, // 11
    new Map([
      [Direction.LEFT, [55, 14]],
      [Direction.UP, [225, 13, 434]],
      [Direction.RIGHT, [28, 7, 237]],
      [Direction.DOWN, [1, 26]],
    ]),
  ],
  [
    RoomShape.ROOMSHAPE_LBR, // 12
    new Map([
      [Direction.LEFT, [55, 7, 238]],
      [Direction.UP, [421, 13, 238]],
      [Direction.RIGHT, [28, 14]],
      [Direction.DOWN, [1, 26]],
    ]),
  ],
]);

export function animateHappy(): void {
  g.p.AnimateHappy();
  const color = Color(0.3, 0.3, 0.3, 1, 1, 1, 1);
  g.p.SetColor(color, 15, 1, true, false);
  g.sfx.Stop(SoundEffect.SOUND_THUMBSUP);
  g.sfx.Play(SoundEffect.SOUND_POWERUP_SPEWER, 1, 0, false, 1);
}

export function getDuration(): int {
  let duration = DURATION;
  if (g.p.HasCollectible(CollectibleType.COLLECTIBLE_PHD)) {
    duration *= 2;
  }

  return duration;
}
