import GlobalsRun from "./GlobalsRun";

export default class Globals {
  // Cached API functions
  g = Game();
  l = Game().GetLevel();
  r = Game().GetRoom();
  // "Isaac.GetPlayer()" will return nil if called from the main menu
  // We use the function instead of setting it to null so that the type is set correctly
  // This is reset in the PostPlayerInit callback
  p = Isaac.GetPlayer(0);
  seeds = Game().GetSeeds();
  itemPool = Game().GetItemPool();
  itemConfig = Isaac.GetItemConfig();
  sfx = SFXManager();

  // Check for Racing+
  racingPlusEnabled = RacingPlusGlobals !== undefined;

  // Variables reset at the beginning of every run
  run = new GlobalsRun(0);
}
