import g from "../globals";
import * as pills from "../pills";

export function main(pillEffect: int, pillColor: int): int | null {
  // If we give ourselves a pill via the console,
  // it may not necessarily match the 4 normal pill colors
  // (since pills given in this manner to not execute the GetPillColor callback)
  // If this is the case, return the vanilla effect
  if (!pills.COLORS.includes(pillColor)) {
    return pillEffect;
  }

  const newPillEffect = g.run.pills.effects.get(pillColor);
  if (newPillEffect === undefined) {
    error(`Failed to get the pill effect for a pill color of: ${pillColor}`);
  }
  return newPillEffect;
}
