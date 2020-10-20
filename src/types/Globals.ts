import GlobalsRun from "./GlobalsRun";

export default class Globals {
  // Check for Racing+
  racingPlusEnabled = RacingPlusGlobals !== null;

  // Cached API functions
  g = Game();
  l = Game().GetLevel();
  r = Game().GetRoom();
  p = Isaac.GetPlayer(0); // This is set in the PostPlayerInit callback
  seeds = Game().GetSeeds();
  itemPool = Game().GetItemPool();
  itemConfig = Isaac.GetItemConfig();
  sfx = SFXManager();
  zeroVector = Vector(0, 0);

  // Variables reset at the beginning of every run
  run = new GlobalsRun();
}
