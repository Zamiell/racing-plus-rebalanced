import { REMOVED_TRINKETS } from "../constants";
import g from "../globals";
import * as misc from "../misc";
import * as pills from "../pills";
import * as postItemPickup from "../postItemPickup";
import {
  CollectibleTypeCustom,
  TrinketTypeCustom,
} from "../types/enums.custom";
import GlobalsRun from "../types/GlobalsRun";
import * as postNewLevel from "./postNewLevel";

export function main(saveState: boolean): void {
  // Local variables
  const startSeed = g.seeds.GetStartSeed();

  if (saveState) {
    return;
  }

  if (!g.racingPlusEnabled) {
    return;
  }

  // Reset all run-based variables
  g.run = new GlobalsRun(startSeed);

  checkVanillaStartingItems();
  addStartingItems();
  trinkets();
  initPills();

  // Racing+ adds a custom version of Dad's Lost Coin to various pools, so we have to remove it
  g.itemPool.RemoveCollectible(
    CollectibleTypeCustom.COLLECTIBLE_DADS_LOST_COIN_CUSTOM,
  );

  // Disable Krampus
  g.g.SetStateFlag(GameStateFlag.STATE_KRAMPUS_SPAWNED, true); // 29

  // Pill effects might be cached from the previous run, so re-evaluate all items
  g.p.AddCacheFlags(CacheFlag.CACHE_ALL); // 0xFFFFFFFF
  g.p.EvaluateItems();

  // Call PostNewLevel manually (they get naturally called out of order)
  postNewLevel.newLevel();
}

function checkVanillaStartingItems() {
  // If Eden starts with Duality, they will "miss out" on a passive item;
  // reset the game if this is the case
  if (g.p.HasCollectible(CollectibleType.COLLECTIBLE_DUALITY)) {
    if (
      Isaac.GetChallenge() === Challenge.CHALLENGE_NULL &&
      g.seeds.IsCustomRun()
    ) {
      // In the unlikely event that they are playing on a specific seed with Eden,
      // the below code will cause the game to infinitely restart
      // Instead, just take away the Duality && give them the Sad Onion as a replacement for the
      // passive item
      g.p.RemoveCollectible(CollectibleType.COLLECTIBLE_DUALITY);
      g.p.AddCollectible(CollectibleType.COLLECTIBLE_SAD_ONION, 0, false);
      Isaac.DebugString("Eden has started with Duality; removing it.");
      Isaac.DebugString("Removing collectible 498 (Duality)");
    } else {
      RacingPlusGlobals.run.restart = true;
      Isaac.DebugString("Restarting because Eden started with Duality.");
      return;
    }
  }

  for (let i = 1; i <= misc.getTotalItemCount(); i++) {
    if (g.p.HasCollectible(i)) {
      // Check to see if we need to do something specific after this item is added to our inventory
      const postItemPickupFunction = postItemPickup.functionMap.get(i);
      if (postItemPickupFunction !== undefined) {
        postItemPickupFunction();
      }
    }
  }

  // Replace the vanilla active items with the rebalanced counterparts, if any
  const schoolbagItem = RacingPlusGlobals.run.schoolbag.item;
  if (schoolbagItem === CollectibleType.COLLECTIBLE_POOP) {
    // 36
    RacingPlusSchoolbag.Put(CollectibleTypeCustom.COLLECTIBLE_HOLY_POOP, -1);
  } else if (schoolbagItem === CollectibleType.COLLECTIBLE_MOMS_BRA) {
    // 39
    RacingPlusSchoolbag.Put(
      CollectibleTypeCustom.COLLECTIBLE_MOMS_BRA_IMPROVED,
      -1,
    );
  } else if (schoolbagItem === CollectibleType.COLLECTIBLE_BOBS_ROTTEN_HEAD) {
    // 42
    RacingPlusSchoolbag.Put(
      CollectibleTypeCustom.COLLECTIBLE_BOBS_ROTTEN_HEAD_IMPROVED,
      -1,
    );
  } else if (schoolbagItem === CollectibleType.COLLECTIBLE_MONSTER_MANUAL) {
    // 123
    RacingPlusSchoolbag.Put(
      CollectibleTypeCustom.COLLECTIBLE_MONSTER_MANUAL_IMPROVED,
      -1,
    );
  } else if (schoolbagItem === CollectibleType.COLLECTIBLE_BOX_OF_SPIDERS) {
    // 288
    RacingPlusSchoolbag.Put(
      CollectibleTypeCustom.COLLECTIBLE_BOX_OF_SPIDERS_IMPROVED,
      -1,
    );
  } else if (schoolbagItem === CollectibleType.COLLECTIBLE_MEGA_SATANS_BREATH) {
    // 441
    RacingPlusSchoolbag.Put(
      CollectibleTypeCustom.COLLECTIBLE_MEGA_BLAST_SINGLE,
      -1,
    );
  }

  // Replace the vanilla trinkets with the rebalanced counterparts, if any
  if (g.p.HasTrinket(TrinketType.TRINKET_WALNUT)) {
    g.p.TryRemoveTrinket(TrinketType.TRINKET_WALNUT);
    g.p.AddTrinket(TrinketTypeCustom.TRINKET_WALNUT_IMPROVED);
  }
}

function addStartingItems() {
  // Everyone starts with The Schoolbag and Duality
  if (!g.p.HasCollectible(CollectibleTypeCustom.COLLECTIBLE_SCHOOLBAG_CUSTOM)) {
    g.p.AddCollectible(
      CollectibleTypeCustom.COLLECTIBLE_SCHOOLBAG_CUSTOM,
      0,
      false,
    );
  }
  g.itemPool.RemoveCollectible(
    CollectibleTypeCustom.COLLECTIBLE_SCHOOLBAG_CUSTOM,
  );

  if (!g.p.HasCollectible(CollectibleType.COLLECTIBLE_DUALITY)) {
    g.p.AddCollectible(CollectibleType.COLLECTIBLE_DUALITY, 0, false);
  }
  Isaac.DebugString("Removing collectible 498 (Duality)");
  g.p.RemoveCostume(
    g.itemConfig.GetCollectible(CollectibleType.COLLECTIBLE_DUALITY),
  );
  g.itemPool.RemoveCollectible(CollectibleType.COLLECTIBLE_DUALITY);

  const character = g.p.GetPlayerType();
  if (character === PlayerType.PLAYER_LILITH) {
    g.p.AddCollectible(CollectibleType.COLLECTIBLE_INCUBUS, 0, false);
    g.itemPool.RemoveCollectible(CollectibleType.COLLECTIBLE_INCUBUS);
    Isaac.DebugString("Removing collectible 360 (Incubus)"); // Don't show it on the item tracker

    // If we switch characters, we want to remove the extra Incubus
    RacingPlusGlobals.run.extraIncubus = true;
  }
}

function trinkets() {
  // Delete banned trinkets and remove them from the pool
  for (const trinket of REMOVED_TRINKETS) {
    if (g.p.HasTrinket(trinket)) {
      g.p.TryRemoveTrinket(trinket);
    }
    g.itemPool.RemoveTrinket(trinket);
  }

  // Replace vanilla trinkets with the rebalanced counterparts, if any
  if (g.p.HasTrinket(TrinketType.TRINKET_WALNUT)) {
    g.p.TryRemoveTrinket(TrinketType.TRINKET_WALNUT);
    g.p.AddTrinket(TrinketTypeCustom.TRINKET_WALNUT_IMPROVED);
  }
  g.itemPool.RemoveTrinket(TrinketType.TRINKET_WALNUT);
}

function initPills() {
  // Get the 4 random pill effects for this seed
  let seed = g.seeds.GetStartSeed();
  const chosenEffectIndexes: int[] = [];
  for (const pillColor of pills.COLORS) {
    let randomEffectIndex;
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
