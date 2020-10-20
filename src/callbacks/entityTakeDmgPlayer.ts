import g from "../globals";
import * as misc from "../misc";
import {
  CollectibleTypeCustom,
  SoundEffectCustom,
  TrinketTypeCustom,
} from "../types/enums.custom";

export default function entityTakeDmgPlayer(
  player: EntityPlayer,
  damageAmount: float,
  damageFlags: int,
  damageSource: EntityRef,
  damageCountdownFrames: int,
): boolean {
  if (g.run.pills.invincibility !== 0) {
    return false;
  }

  if (
    damageSource.Type === EntityType.ENTITY_FAMILIAR
    && (damageSource.Variant === FamiliarVariant.BLUE_FLY
      || damageSource.Variant === FamiliarVariant.BBF // 58
      || damageSource.Variant === FamiliarVariant.BOBS_BRAIN) // 59
  ) {
    return false;
  }

  // Items
  theWafer(player); // 88
  infestation(player); // 148
  theBlackBean(player); // 180
  spiderBaby(player); // 211
  piggyBank(player); // 227
  techX(player, damageAmount, damageFlags, damageSource, damageCountdownFrames); // 395
  myShadow(); // 433
  fannyPackImproved(player); // Replacing 204

  // Trinkets
  walnut(player, damageFlags); // 108

  return true;
}

// CollectibleType.COLLECTIBLE_WAFER (108)
function theWafer(player: EntityPlayer) {
  if (g.run.waferCounters === 0) {
    return;
  }
  g.run.waferCounters -= 1;
  if (g.run.waferCounters === 0) {
    player.RemoveCollectible(CollectibleType.COLLECTIBLE_WAFER);
  }
}

// CollectibleType.COLLECTIBLE_INFESTATION (148)
function infestation(player: EntityPlayer) {
  if (!player.HasCollectible(CollectibleType.COLLECTIBLE_INFESTATION)) {
    return;
  }

  // The vanilla item spawns 1-3 flies, so we just spawn additional ones
  const numFlies = 20;
  player.AddBlueFlies(numFlies, player.Position, null);
}

// CollectibleType.COLLECTIBLE_BLACK_BEAN (180)
function theBlackBean(player: EntityPlayer) {
  if (!player.HasCollectible(CollectibleType.COLLECTIBLE_BLACK_BEAN)) {
    return;
  }

  g.run.blackBeanEndFrame = g.g.GetFrameCount() + 300; // 10 seconds
}

// CollectibleType.COLLECTIBLE_SPIDERBABY (211)
function spiderBaby(player: EntityPlayer) {
  if (!g.p.HasCollectible(CollectibleType.COLLECTIBLE_SPIDERBABY)) {
    return;
  }

  const numSpiders = 20;
  for (let i = 0; i < numSpiders - 2; i++) {
    // The vanilla item spawns 2 spiders
    const randomPosition = g.r.GetRandomPosition(0);
    player.ThrowBlueSpider(player.Position, randomPosition);
  }
}

// CollectibleType.COLLECTIBLE_PIGGY_BANK (227)
function piggyBank(player: EntityPlayer) {
  if (!player.HasCollectible(CollectibleType.COLLECTIBLE_PIGGY_BANK)) {
    return;
  }

  for (let i = 0; i < 4; i++) {
    // 5-6 instead of 1-2
    g.run.piggyBankRNG = misc.incrementRNG(g.run.piggyBankRNG);
    g.g.Spawn(
      EntityType.ENTITY_PICKUP,
      PickupVariant.PICKUP_COIN,
      g.p.Position,
      RandomVector().__mul(2.5),
      g.p,
      0,
      g.run.piggyBankRNG,
    );
  }
}

// CollectibleType.COLLECTIBLE_TECH_X (395)
function techX(
  player: EntityPlayer,
  damageAmount: int,
  damageFlags: int,
  damageSource: EntityRef,
  damageCountdownFrames: int,
) {
  if (!player.HasCollectible(CollectibleType.COLLECTIBLE_TECH_X)) {
    return;
  }

  // There is no need to make the player take double damage with Tech X + Epic Fetus
  if (player.HasCollectible(CollectibleType.COLLECTIBLE_EPIC_FETUS)) {
    return;
  }

  g.run.dealingExtraDamage = true;
  player.TakeDamage(
    damageAmount,
    damageFlags,
    damageSource,
    damageCountdownFrames,
  );
  g.run.dealingExtraDamage = false;
}

// CollectibleType.COLLECTIBLE_MY_SHADOW (433)
function myShadow() {
  if (!g.p.HasCollectible(CollectibleType.COLLECTIBLE_MY_SHADOW)) {
    return;
  }

  const numBlackChargers = 20;
  for (let i = 1; i < numBlackChargers - 1; i++) {
    // The vanilla item spawns 1
    const position = g.r.FindFreePickupSpawnPosition(g.p.Position, 1, true);
    const charger = g.g.Spawn(
      EntityType.ENTITY_CHARGER,
      0,
      position,
      g.zeroVector,
      null,
      1,
      0,
    );
    charger.AddEntityFlags(EntityFlag.FLAG_CHARM);
  }
}

// CollectibleTypeCustom.COLLECTIBLE_FANNY_PACK_IMPROVED (replacing 204)
function fannyPackImproved(player: EntityPlayer) {
  if (
    !player.HasCollectible(
      CollectibleTypeCustom.COLLECTIBLE_FANNY_PACK_IMPROVED,
    )
  ) {
    return;
  }

  // Spawn a random pickup
  g.run.fannyPackRNG = misc.incrementRNG(g.run.fannyPackRNG);
  math.randomseed(g.run.fannyPackRNG);
  const pickupRoll = math.random(1, 11);
  g.run.fannyPackRNG = misc.incrementRNG(g.run.fannyPackRNG);

  const position = g.r.FindFreePickupSpawnPosition(g.p.Position, 1, true);
  switch (pickupRoll) {
    case 1: {
      // Random Heart
      g.g.Spawn(
        EntityType.ENTITY_PICKUP,
        PickupVariant.PICKUP_HEART, // 10
        position,
        g.zeroVector,
        null,
        0,
        g.run.fannyPackRNG,
      );
      break;
    }

    case 2: {
      // Random Coin
      g.g.Spawn(
        EntityType.ENTITY_PICKUP,
        PickupVariant.PICKUP_COIN, // 20
        position,
        g.zeroVector,
        null,
        0,
        g.run.fannyPackRNG,
      );
      break;
    }

    case 3: {
      // Random Key
      g.g.Spawn(
        EntityType.ENTITY_PICKUP,
        PickupVariant.PICKUP_KEY, // 30
        position,
        g.zeroVector,
        null,
        0,
        g.run.fannyPackRNG,
      );
      break;
    }

    case 4: {
      // Random Bomb
      g.g.Spawn(
        EntityType.ENTITY_PICKUP,
        PickupVariant.PICKUP_BOMB, // 40
        position,
        g.zeroVector,
        null,
        0,
        g.run.fannyPackRNG,
      );
      break;
    }

    case 5: {
      // Random Chest
      g.g.Spawn(
        EntityType.ENTITY_PICKUP,
        PickupVariant.PICKUP_CHEST, // 50
        position,
        g.zeroVector,
        null,
        0,
        g.run.fannyPackRNG,
      );
      break;
    }

    case 6: {
      // Sack
      g.g.Spawn(
        EntityType.ENTITY_PICKUP,
        PickupVariant.PICKUP_GRAB_BAG, // 69
        position,
        g.zeroVector,
        null,
        0,
        g.run.fannyPackRNG,
      );
      break;
    }

    case 7: {
      // Lil' Battery
      g.g.Spawn(
        EntityType.ENTITY_PICKUP,
        PickupVariant.PICKUP_LIL_BATTERY, // 90
        position,
        g.zeroVector,
        null,
        0,
        g.run.fannyPackRNG,
      );
      break;
    }

    case 8: {
      // Pill
      // Random Pill
      g.g.Spawn(
        EntityType.ENTITY_PICKUP,
        PickupVariant.PICKUP_PILL, // 70
        position,
        g.zeroVector,
        null,
        0,
        g.run.fannyPackRNG,
      );
      break;
    }

    case 9: {
      // Random Card / Rune
      g.g.Spawn(
        EntityType.ENTITY_PICKUP,
        PickupVariant.PICKUP_TAROTCARD, // 300
        position,
        g.zeroVector,
        null,
        0,
        g.run.fannyPackRNG,
      );
      break;
    }

    case 10: {
      // Random Trinket
      g.g.Spawn(
        EntityType.ENTITY_PICKUP,
        PickupVariant.PICKUP_TRINKET, // 350
        position,
        g.zeroVector,
        null,
        0,
        g.run.fannyPackRNG,
      );
      break;
    }

    case 11: {
      // Random Collectible
      g.g.Spawn(
        EntityType.ENTITY_PICKUP,
        PickupVariant.PICKUP_COLLECTIBLE, // 100
        position,
        g.zeroVector,
        null,
        0,
        g.run.fannyPackRNG,
      );
      break;
    }

    default: {
      throw new Error(`Unknown pickup case of ${pickupRoll}.`);
    }
  }
}

// TrinketType.TRINKET_WALNUT (108)
function walnut(player: EntityPlayer, damageFlags: int) {
  // Local variables
  const startSeed = g.seeds.GetStartSeed();

  if (!player.HasTrinket(TrinketTypeCustom.TRINKET_WALNUT_IMPROVED)) {
    return;
  }

  if (!misc.hasFlag(damageFlags, DamageFlag.DAMAGE_EXPLOSION)) {
    return;
  }

  g.run.walnutCounters += 1;
  if (g.run.walnutCounters === 3) {
    g.run.walnutCounters = 0;
    g.p.TryRemoveTrinket(TrinketTypeCustom.TRINKET_WALNUT_IMPROVED);
    const position = g.r.FindFreePickupSpawnPosition(g.p.Position, 1, true);
    const subType = g.itemPool.GetCollectible(
      ItemPoolType.POOL_DEVIL,
      true,
      startSeed,
    );
    g.g.Spawn(
      EntityType.ENTITY_PICKUP, // 5
      PickupVariant.PICKUP_COLLECTIBLE, // 100
      position,
      g.zeroVector,
      null,
      subType,
      startSeed,
    );
    g.sfx.Play(SoundEffectCustom.SOUND_WALNUT, 2, 0, false, 1);
  }
}
