import {
  CacheFlag,
  Challenge,
  CollectibleType,
  GameStateFlag,
  PlayerType,
  TrinketType,
} from "isaac-typescript-definitions";
import { removeCollectibleCostume } from "isaacscript-common";
import { REMOVED_TRINKETS } from "../constants";
import { CollectibleTypeCustom } from "../enums/CollectibleTypeCustom";
import { TrinketTypeCustom } from "../enums/TrinketTypeCustom";
import g from "../globals";
import * as misc from "../misc";
import * as pills from "../pills";
import * as postItemPickup from "../postItemPickup";
import GlobalsRun from "../types/GlobalsRun";
import * as postNewLevel from "./postNewLevel";

export function main(saveState: boolean): void {
  const startSeed = g.seeds.GetStartSeed();

  // Cache the total number of collectibles. (This has to be done after all of the mods are finished
  // loading.)
  if (g.numTotalCollectibles === 0) {
    g.numTotalCollectibles = misc.getNumTotalCollectibles();
  }

  if (saveState) {
    return;
  }

  if (!g.racingPlusEnabled) {
    return;
  }

  // Reset all run-based variables.
  g.run = new GlobalsRun(startSeed);

  checkVanillaStartingItems();
  addStartingItems();
  trinkets();
  initPills();

  // Racing+ adds a custom version of Dad's Lost Coin to various pools, so we have to remove it.
  g.itemPool.RemoveCollectible(CollectibleTypeCustom.DADS_LOST_COIN_CUSTOM);

  // Disable Krampus
  g.g.SetStateFlag(GameStateFlag.KRAMPUS_SPAWNED, true);

  // Pill effects might be cached from the previous run, so re-evaluate all items.
  g.p.AddCacheFlags(CacheFlag.ALL);
  g.p.EvaluateItems();

  // Call PostNewLevel manually (they get naturally called out of order).
  postNewLevel.newLevel();
}

function checkVanillaStartingItems() {
  // If Eden starts with Duality, they will "miss out" on a passive item; reset the game if this is
  // the case.
  if (g.p.HasCollectible(CollectibleType.DUALITY)) {
    if (Isaac.GetChallenge() === Challenge.NULL && g.seeds.IsCustomRun()) {
      // In the unlikely event that they are playing on a specific seed with Eden, the below code
      // will cause the game to infinitely restart. Instead, just take away the Duality and give
      // them the Sad Onion as a replacement for the passive item.
      g.p.RemoveCollectible(CollectibleType.DUALITY);
      removeCollectibleFromItemTracker(CollectibleType.DUALITY);
      g.p.AddCollectible(CollectibleType.SAD_ONION, 0, false);
      Isaac.DebugString("Eden has started with Duality; removing it.");
    } else {
      RacingPlusGlobals.run.restart = true;
      Isaac.DebugString("Restarting because Eden started with Duality.");
      return;
    }
  }

  for (let i = 1; i <= g.numTotalCollectibles; i++) {
    if (g.p.HasCollectible(i)) {
      // Check to see if we need to do something specific after this item is added to our inventory.
      const postItemPickupFunction = postItemPickup.functionMap.get(i);
      if (postItemPickupFunction !== undefined) {
        postItemPickupFunction();
      }
    }
  }

  // Replace the vanilla active items with the rebalanced counterparts, if any.
  const schoolbagItem = RacingPlusGlobals.run.schoolbag.item;
  if (schoolbagItem === CollectibleType.POOP) {
    // 36
    RacingPlusSchoolbag.put(CollectibleTypeCustom.HOLY_POOP, -1);
  } else if (schoolbagItem === CollectibleType.MOMS_BRA) {
    // 39
    RacingPlusSchoolbag.put(CollectibleTypeCustom.MOMS_BRA_IMPROVED, -1);
  } else if (schoolbagItem === CollectibleType.BOBS_ROTTEN_HEAD) {
    // 42
    RacingPlusSchoolbag.put(
      CollectibleTypeCustom.BOBS_ROTTEN_HEAD_IMPROVED,
      -1,
    );
  } else if (schoolbagItem === CollectibleType.MONSTER_MANUAL) {
    // 123
    RacingPlusSchoolbag.put(CollectibleTypeCustom.MONSTER_MANUAL_IMPROVED, -1);
  } else if (schoolbagItem === CollectibleType.BOX_OF_SPIDERS) {
    // 288
    RacingPlusSchoolbag.put(CollectibleTypeCustom.BOX_OF_SPIDERS_IMPROVED, -1);
  } else if (schoolbagItem === CollectibleType.MEGA_BLAST) {
    // 441
    RacingPlusSchoolbag.put(CollectibleTypeCustom.MEGA_BLAST_SINGLE, -1);
  }

  // Replace the vanilla trinkets with the rebalanced counterparts, if any.
  if (g.p.HasTrinket(TrinketType.WALNUT)) {
    g.p.TryRemoveTrinket(TrinketType.WALNUT);
    g.p.AddTrinket(TrinketTypeCustom.WALNUT_IMPROVED);
  }
}

function addStartingItems() {
  // Everyone starts with The Schoolbag and Duality.
  if (!g.p.HasCollectible(CollectibleTypeCustom.SCHOOLBAG_CUSTOM)) {
    g.p.AddCollectible(CollectibleTypeCustom.SCHOOLBAG_CUSTOM, 0, false);
  }
  g.itemPool.RemoveCollectible(CollectibleTypeCustom.SCHOOLBAG_CUSTOM);

  if (!g.p.HasCollectible(CollectibleType.DUALITY)) {
    g.p.AddCollectible(CollectibleType.DUALITY, 0, false);
  }
  removeCollectibleFromItemTracker(CollectibleType.DUALITY);
  removeCollectibleCostume(g.p, CollectibleType.DUALITY);
  g.itemPool.RemoveCollectible(CollectibleType.DUALITY);

  const character = g.p.GetPlayerType();
  if (character === PlayerType.LILITH) {
    g.p.AddCollectible(CollectibleType.INCUBUS, 0, false);
    g.itemPool.RemoveCollectible(CollectibleType.INCUBUS);
    removeCollectibleFromItemTracker(CollectibleType.INCUBUS);

    // If we switch characters, we want to remove the extra Incubus.
    RacingPlusGlobals.run.extraIncubus = true;
  }
}

function trinkets() {
  // Delete banned trinkets and remove them from the pool.
  for (const trinket of REMOVED_TRINKETS) {
    if (g.p.HasTrinket(trinket)) {
      g.p.TryRemoveTrinket(trinket);
    }
    g.itemPool.RemoveTrinket(trinket);
  }

  // Replace vanilla trinkets with the rebalanced counterparts, if any.
  if (g.p.HasTrinket(TrinketType.WALNUT)) {
    g.p.TryRemoveTrinket(TrinketType.WALNUT);
    g.p.AddTrinket(TrinketTypeCustom.WALNUT_IMPROVED);
  }
  g.itemPool.RemoveTrinket(TrinketType.WALNUT);
}

function initPills() {
  // Get the 4 random pill effects for this seed.
  let seed = g.seeds.GetStartSeed();
  const chosenEffectIndexes: int[] = [];
  for (const pillColor of pills.COLORS) {
    let randomEffectIndex: int;
    do {
      seed = misc.incrementRNG(seed);
      math.randomseed(seed);
      randomEffectIndex = math.random(0, pills.EFFECTS.length - 1);
    } while (chosenEffectIndexes.includes(randomEffectIndex));
    chosenEffectIndexes.push(randomEffectIndex);
    const pillEffect = pills.EFFECTS[randomEffectIndex];
    g.run.pills.effects.set(pillColor, pillEffect);
  }
}
