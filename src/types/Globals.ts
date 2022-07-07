import { game } from "isaacscript-common";
import GlobalsRun from "./GlobalsRun";

export default class Globals {
  // Cached API functions
  g = game;
  l = Game().GetLevel();
  r = Game().GetRoom();

  /**
   * "Isaac.GetPlayer()" will return nil if called from the main menu. We "lie" and say that it gets
   * set to an `EntityPlayer` so that we don't have to do non-null assertions everywhere. In
   * reality, the value will be set in the `POST_PLAYER_INIT` callback, which will happen before any
   * other code gets run.
   */
  p = Isaac.GetPlayer(0);

  seeds = game.GetSeeds();
  itemPool = game.GetItemPool();

  // Check for Racing+.
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  racingPlusEnabled = RacingPlusGlobals !== undefined;

  /** Per-run variables. */
  run = new GlobalsRun(0 as Seed);
}
