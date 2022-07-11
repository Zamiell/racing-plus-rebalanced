import { ModCallback, PillColor } from "isaac-typescript-definitions";
import { getRandomArrayElement } from "isaacscript-common";
import * as pills from "../pills";

export function init(mod: Mod): void {
  mod.AddCallback(ModCallback.GET_PILL_COLOR, main); // 64
}

function main(seed: Seed): PillColor {
  // We want the pill pool to only contain a certain amount of colors (less than in the vanilla
  // game).
  return getRandomArrayElement(pills.COLORS, seed);
}
