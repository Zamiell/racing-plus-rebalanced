import { CollectibleType } from "isaac-typescript-definitions";
import {
  ModCallbackCustom,
  ModUpgraded,
  newRNG,
  removeCollectibleFromItemTracker,
} from "isaacscript-common";
import { CollectibleTypeCustom } from "../enums/CollectibleTypeCustom";
import g from "../globals";
import GlobalsRunLevel from "../types/GlobalsRunLevel";

export function init(mod: ModUpgraded): void {
  mod.AddCallbackCustom(ModCallbackCustom.POST_NEW_LEVEL_REORDERED, main);
}

export function main(): void {
  const gameFrameCount = g.g.GetFrameCount();
  const stage = g.l.GetStage();
  const stageType = g.l.GetStageType();

  // Set the new floor.
  g.run.level = new GlobalsRunLevel(stage, stageType, gameFrameCount);

  // Reset the RNG of some items that should be seeded per floor.
  const stageSeed = g.seeds.GetStageSeed(stage);
  g.run.sunCardRNG = newRNG(stageSeed);

  // Item functions
  theWafer(); // 88
  holyMantleNerfed(); // Replacing 313
}

// CollectibleType.WAFER (108)
function theWafer() {
  if (!g.run.wafer) {
    return;
  }

  g.run.waferCounters = 2;
  if (!g.p.HasCollectible(CollectibleType.WAFER)) {
    g.p.AddCollectible(CollectibleType.WAFER, 0, false);
    removeCollectibleFromItemTracker(CollectibleType.WAFER);
  }
}

// CollectibleTypeCustom.HOLY_MANTLE_NERFED (replacing 313)
function holyMantleNerfed() {
  if (!g.p.HasCollectible(CollectibleTypeCustom.HOLY_MANTLE_NERFED)) {
    return;
  }

  g.run.holyMantle = true;
}
