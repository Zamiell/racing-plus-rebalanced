import {
  ModCallback,
  PillColor,
  PillEffect,
} from "isaac-typescript-definitions";
import g from "../globals";
import * as pills from "../pills";

export function init(mod: Mod): void {
  mod.AddCallback(ModCallback.GET_PILL_EFFECT, main);
}

export function main(pillEffect: PillEffect, pillColor: PillColor): PillEffect {
  // If we give ourselves a pill via the console, it may not necessarily match the 4 normal pill
  // colors (since pills given in this manner to not execute the `GET_PILL_COLOR` callback). If this
  // is the case, return the vanilla effect.
  if (!pills.COLORS.includes(pillColor)) {
    return pillEffect;
  }

  const newPillEffect = g.run.pills.effects.get(pillColor);
  if (newPillEffect === undefined) {
    error(
      `Failed to get the pill effect for: PillColor.${PillColor[pillColor]} (${pillColor})`,
    );
  }
  return newPillEffect;
}
