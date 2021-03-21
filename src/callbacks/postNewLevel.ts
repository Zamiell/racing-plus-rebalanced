import g from "../globals";
import { CollectibleTypeCustom } from "../types/enums";
import GlobalsRunLevel from "../types/GlobalsRunLevel";
import * as postNewRoom from "./postNewRoom";

export function main(): void {
  // Make sure the callbacks run in the right order
  // (naturally, PostNewLevel gets called before the PostGameStarted callbacks)
  const gameFrameCount = g.g.GetFrameCount();
  if (gameFrameCount === 0) {
    return;
  }

  newLevel();
}

export function newLevel(): void {
  // Local variables
  const gameFrameCount = g.g.GetFrameCount();
  const stage = g.l.GetStage();
  const stageType = g.l.GetStageType();

  // Racing+ has a feature to remove duplicate rooms,
  // so it may reseed the floor immediately upon reach it
  // If so, then we don't want to do anything, since this isn't really a new level
  if (gameFrameCount !== 0 && gameFrameCount === g.run.level.stageFrame) {
    return;
  }

  // Set the new floor
  g.run.level = new GlobalsRunLevel(stage, stageType, gameFrameCount);

  // Reset the RNG of some items that should be seeded per floor
  const stageSeed = g.seeds.GetStageSeed(stage);
  g.run.sunCardRNG = stageSeed;

  // Item functions
  theWafer(); // 88
  holyMantleNerfed(); // Replacing 313

  // Call PostNewRoom manually (they get naturally called out of order)
  postNewRoom.newRoom();
}

// CollectibleType.COLLECTIBLE_WAFER (108)
function theWafer() {
  if (!g.run.wafer) {
    return;
  }

  g.run.waferCounters = 2;
  if (!g.p.HasCollectible(CollectibleType.COLLECTIBLE_WAFER)) {
    g.p.AddCollectible(CollectibleType.COLLECTIBLE_WAFER, 0, false);
    Isaac.DebugString("Removing collectible 108 (The Wafer)"); // Remove it from the item tracker
  }
}

// CollectibleTypeCustom.COLLECTIBLE_HOLY_MANTLE_NERFED (replacing 313)
function holyMantleNerfed() {
  if (
    !g.p.HasCollectible(CollectibleTypeCustom.COLLECTIBLE_HOLY_MANTLE_NERFED)
  ) {
    return;
  }

  g.run.holyMantle = true;
}
