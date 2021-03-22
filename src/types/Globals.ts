import GlobalsRun from "./GlobalsRun";

export default class Globals {
  // Cached API functions
  g = Game();
  l = Game().GetLevel();
  r = Game().GetRoom();
  // "Isaac.GetPlayer()" will return nil if called from the main menu
  // We "lie" and say that it gets set to an EntityPlayer so that we don't have to do non-null
  // assertions everywhere
  // In reality, the value will be set in the PostPlayerInit callback, which will happen before any
  // other code gets run
  p = Isaac.GetPlayer(0) as EntityPlayer;
  seeds = Game().GetSeeds();
  itemPool = Game().GetItemPool();
  itemConfig = Isaac.GetItemConfig();
  sfx = SFXManager();
  numTotalCollectibles = 0; // This is initialized in the PostGameStarted callback

  // Check for Racing+
  racingPlusEnabled = RacingPlusGlobals !== undefined;

  // Variables reset at the beginning of every run
  run = new GlobalsRun(0);
}
