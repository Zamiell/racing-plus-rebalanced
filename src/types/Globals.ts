import { game } from "isaacscript-common";
import GlobalsRun from "./GlobalsRun";

export default class Globals {
  // Cached API functions
  g = game;
  l = game.GetLevel();
  r = game.GetRoom();
  seeds = game.GetSeeds();
  itemPool = game.GetItemPool();

  // Check for Racing+.
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  racingPlusEnabled = RacingPlusGlobals !== undefined;

  /** Per-run variables. */
  run = new GlobalsRun(0 as Seed);
}
