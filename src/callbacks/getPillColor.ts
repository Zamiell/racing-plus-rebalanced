import * as pills from "../pills";

export function main(seed: int): PillColor {
  // We want the pill pool to only contain a certain amount of colors
  // (less than in the vanilla game)
  math.randomseed(seed);
  const randomIndex = math.random(0, pills.COLORS.length - 1);
  return pills.COLORS[randomIndex];
}
