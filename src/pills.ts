import {
  CollectibleType,
  Direction,
  PillColor,
  PillEffect,
  RoomShape,
  SoundEffect,
} from "isaac-typescript-definitions";
import { sfxManager } from "isaacscript-common";
import { PillEffectCustom } from "./enums/PillEffectCustom";
import g from "./globals";

const DURATION = 600; // 20 seconds

export const COLORS = [
  PillColor.BLUE_BLUE, // 1
  PillColor.ORANGE_ORANGE, // 3
  PillColor.WHITE_WHITE, // 4
  PillColor.RED_DOTS_RED, // 5 (the sprite for this is changed to a full red pill in Racing+)
];

export const EFFECTS = [
  // Vanilla pills
  PillEffect.BALLS_OF_STEEL, // 2
  PillEffect.HEALTH_UP, // 7
  PillEffect.PRETTY_FLY, // 10
  PillEffect.SPEED_UP, // 14
  PillEffect.TEARS_UP, // 16
  PillEffect.FORTY_EIGHT_HOUR_ENERGY, // 20
  PillEffect.I_CAN_SEE_FOREVER, // 23

  // Custom pills
  PillEffectCustom.DAMAGE_UP,
  PillEffectCustom.TEAR_DELAY_DOWN,
  PillEffectCustom.DEAL_AFFINITY,
  PillEffectCustom.BONE_AFFINITY,
  PillEffectCustom.RESTOCK,
  PillEffectCustom.GOLDEN_DUMP,
  PillEffectCustom.SUPER_SADNESS,
  PillEffectCustom.INVINCIBILITY,
  PillEffectCustom.REALLY_BAD_GAS,
  PillEffectCustom.GLIMPSE,
  PillEffectCustom.AETHER,
  PillEffectCustom.WALLS_HAVE_EYES,
  PillEffectCustom.BLADDER_INFECTION,
  PillEffectCustom.SCORCHED_EARTH,
];

// - The first number is the starting grid coordinate.
// - The second number is the number of times to iterate.
// - The third number is the starting grid coordinate for the second wall (for L rooms).
export const ROOM_SHAPE_WALL_COORDINATES: {
  readonly [key in RoomShape]: Map<
    Direction,
    [
      startingGridCoordinate: int,
      numTimesToIterate: int,
      startingGridCoordinateForSecondWall?: int,
    ]
  >;
} = {
  // 1
  [RoomShape.SHAPE_1x1]: new Map([
    [Direction.LEFT, [29, 7]],
    [Direction.UP, [121, 13]],
    [Direction.RIGHT, [15, 7]],
    [Direction.DOWN, [1, 13]],
  ]),

  // 2
  [RoomShape.IH]: new Map([
    [Direction.LEFT, [59, 3]],
    [Direction.UP, [91, 13]],
    [Direction.RIGHT, [45, 3]],
    [Direction.DOWN, [31, 13]],
  ]),

  // 3
  [RoomShape.IV]: new Map([
    [Direction.LEFT, [25, 7]],
    [Direction.UP, [125, 5]],
    [Direction.RIGHT, [19, 7]],
    [Direction.DOWN, [5, 5]],
  ]),

  // 4
  [RoomShape.SHAPE_1x2]: new Map([
    [Direction.LEFT, [44, 14]],
    [Direction.UP, [226, 13]],
    [Direction.RIGHT, [15, 14]],
    [Direction.DOWN, [1, 13]],
  ]),

  // 5
  [RoomShape.IIV]: new Map([
    [Direction.LEFT, [25, 14]],
    [Direction.UP, [230, 5]],
    [Direction.RIGHT, [19, 14]],
    [Direction.DOWN, [5, 5]],
  ]),

  // 6
  [RoomShape.SHAPE_2x1]: new Map([
    [Direction.LEFT, [55, 7]],
    [Direction.UP, [225, 26]],
    [Direction.RIGHT, [28, 7]],
    [Direction.DOWN, [1, 26]],
  ]),

  // 7
  [RoomShape.IIH]: new Map([
    [Direction.LEFT, [111, 3]],
    [Direction.UP, [169, 26]],
    [Direction.RIGHT, [84, 3]],
    [Direction.DOWN, [57, 26]],
  ]),

  // 8
  [RoomShape.SHAPE_2x2]: new Map([
    [Direction.LEFT, [55, 14]],
    [Direction.UP, [421, 26]],
    [Direction.RIGHT, [28, 14]],
    [Direction.DOWN, [1, 26]],
  ]),

  // 9
  [RoomShape.LTL]: new Map([
    [Direction.LEFT, [55, 14]],
    [Direction.UP, [421, 26]],
    [Direction.RIGHT, [41, 7, 224]],
    [Direction.DOWN, [197, 13, 14]],
  ]),

  // 10
  [RoomShape.LTR]: new Map([
    [Direction.LEFT, [42, 7, 251]],
    [Direction.UP, [421, 26]],
    [Direction.RIGHT, [28, 14]],
    [Direction.DOWN, [1, 13, 210]],
  ]),

  // 11
  [RoomShape.LBL]: new Map([
    [Direction.LEFT, [55, 14]],
    [Direction.UP, [225, 13, 434]],
    [Direction.RIGHT, [28, 7, 237]],
    [Direction.DOWN, [1, 26]],
  ]),

  // 12
  [RoomShape.LBR]: new Map([
    [Direction.LEFT, [55, 7, 238]],
    [Direction.UP, [421, 13, 238]],
    [Direction.RIGHT, [28, 14]],
    [Direction.DOWN, [1, 26]],
  ]),
} as const;

export function animateHappy(): void {
  g.p.AnimateHappy();
  const color = Color(0.3, 0.3, 0.3, 1, 1, 1, 1);
  g.p.SetColor(color, 15, 1, true, false);
  sfxManager.Stop(SoundEffect.THUMBS_UP);
  sfxManager.Play(SoundEffect.POWER_UP_SPEWER, 1, 0, false, 1);
}

export function getDuration(): int {
  let duration = DURATION;
  if (g.p.HasCollectible(CollectibleType.PHD)) {
    duration *= 2;
  }

  return duration;
}
