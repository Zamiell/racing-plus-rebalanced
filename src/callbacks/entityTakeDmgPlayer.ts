import {
  BatterySubType,
  BombSubType,
  Card,
  ChargerSubType,
  ChargerVariant,
  ChestSubType,
  CoinSubType,
  CollectibleType,
  DamageFlag,
  EntityFlag,
  EntityType,
  FamiliarVariant,
  HeartSubType,
  ItemPoolType,
  KeySubType,
  PickupVariant,
  PillColor,
  SackSubType,
  TrinketType,
} from "isaac-typescript-definitions";
import {
  getRandomInt,
  hasFlag,
  repeat,
  sfxManager,
  spawnBatteryWithSeed,
  spawnCardWithSeed,
  spawnCoin,
  spawnCoinWithSeed,
  spawnCollectible,
  spawnHeartWithSeed,
  spawnKeyWithSeed,
  spawnNPC,
  spawnPickupWithSeed,
  spawnPillWithSeed,
  spawnSackWithSeed,
  spawnTrinketWithSeed,
} from "isaacscript-common";
import { CollectibleTypeCustom } from "../enums/CollectibleTypeCustom";
import { SoundEffectCustom } from "../enums/SoundEffectCustom";
import { TrinketTypeCustom } from "../enums/TrinketTypeCustom";
import g from "../globals";

export default function entityTakeDmgPlayer(
  player: EntityPlayer,
  damageAmount: float,
  damageFlags: BitFlags<DamageFlag>,
  damageSource: EntityRef,
  damageCountdownFrames: int,
): boolean {
  if (g.run.pills.invincibility !== 0) {
    return false;
  }

  if (
    damageSource.Type === EntityType.FAMILIAR &&
    (damageSource.Variant === (FamiliarVariant.BLUE_FLY as int) || // 43
      damageSource.Variant === (FamiliarVariant.BBF as int) || // 58
      damageSource.Variant === (FamiliarVariant.BOBS_BRAIN as int)) // 59
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

// CollectibleType.WAFER (108)
function theWafer(player: EntityPlayer) {
  if (g.run.waferCounters === 0) {
    return;
  }
  g.run.waferCounters -= 1;
  if (g.run.waferCounters === 0) {
    player.RemoveCollectible(CollectibleType.WAFER);
  }
}

// CollectibleType.INFESTATION (148)
function infestation(player: EntityPlayer) {
  if (!player.HasCollectible(CollectibleType.INFESTATION)) {
    return;
  }

  // The vanilla item spawns 1-3 flies, so we just spawn additional ones.
  const numFlies = 20;
  player.AddBlueFlies(numFlies, player.Position);
}

// CollectibleType.BLACK_BEAN (180)
function theBlackBean(player: EntityPlayer) {
  if (!player.HasCollectible(CollectibleType.BLACK_BEAN)) {
    return;
  }

  g.run.blackBeanEndFrame = g.g.GetFrameCount() + 300; // 10 seconds
}

// CollectibleType.SPIDERBABY (211)
function spiderBaby(player: EntityPlayer) {
  if (!g.p.HasCollectible(CollectibleType.SPIDERBABY)) {
    return;
  }

  const numSpiders = 20;
  for (let i = 0; i < numSpiders - 2; i++) {
    // The vanilla item spawns 2 spiders.
    const randomPosition = g.r.GetRandomPosition(0);
    player.ThrowBlueSpider(player.Position, randomPosition);
  }
}

// CollectibleType.PIGGY_BANK (227)
function piggyBank(player: EntityPlayer) {
  if (!player.HasCollectible(CollectibleType.PIGGY_BANK)) {
    return;
  }

  for (let i = 0; i < 4; i++) {
    // 5-6 instead of 1-2.
    g.run.piggyBankRNG.Next();
    spawnCoin(
      CoinSubType.NULL,
      g.p.Position,
      RandomVector().mul(2.5),
      g.p,
      g.run.piggyBankRNG.GetSeed(),
    );
  }
}

// CollectibleType.TECH_X (395)
function techX(
  player: EntityPlayer,
  damageAmount: int,
  damageFlags: BitFlags<DamageFlag>,
  damageSource: EntityRef,
  damageCountdownFrames: int,
) {
  if (!player.HasCollectible(CollectibleType.TECH_X)) {
    return;
  }

  // There is no need to make the player take double damage with Tech X + Epic Fetus.
  if (player.HasCollectible(CollectibleType.EPIC_FETUS)) {
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

// CollectibleType.MY_SHADOW (433)
function myShadow() {
  if (!g.p.HasCollectible(CollectibleType.MY_SHADOW)) {
    return;
  }

  const numBlackChargers = 20;

  // The vanilla item spawns 1.
  repeat(numBlackChargers - 1, () => {
    const position = g.r.FindFreePickupSpawnPosition(g.p.Position, 1, true);
    const charger = spawnNPC(
      EntityType.CHARGER,
      ChargerVariant.CHARGER,
      ChargerSubType.CHARGER,
      position,
    );
    charger.AddEntityFlags(EntityFlag.CHARM);
  });
}

// CollectibleTypeCustom.FANNY_PACK_IMPROVED (replacing 204)
function fannyPackImproved(player: EntityPlayer) {
  if (!player.HasCollectible(CollectibleTypeCustom.FANNY_PACK_IMPROVED)) {
    return;
  }

  // Spawn a random pickup.
  const pickupRoll = getRandomInt(1, 11, g.run.fannyPackRNG);
  const position = g.r.FindFreePickupSpawnPosition(g.p.Position, 1, true);
  switch (pickupRoll) {
    case 1: {
      // Random Heart
      spawnHeartWithSeed(HeartSubType.NULL, position, g.run.fannyPackRNG);
      break;
    }

    case 2: {
      // Random Coin
      spawnCoinWithSeed(CoinSubType.NULL, position, g.run.fannyPackRNG);
      break;
    }

    case 3: {
      // Random Key
      spawnKeyWithSeed(KeySubType.NULL, position, g.run.fannyPackRNG);
      break;
    }

    case 4: {
      // Random Bomb
      spawnPickupWithSeed(
        PickupVariant.BOMB,
        BombSubType.NULL,
        position,
        g.run.fannyPackRNG,
      );
      break;
    }

    case 5: {
      // Random Chest
      spawnPickupWithSeed(
        PickupVariant.CHEST,
        ChestSubType.OPENED,
        position,
        g.run.fannyPackRNG,
      );
      break;
    }

    case 6: {
      // Random Sack
      spawnSackWithSeed(SackSubType.NULL, position, g.run.fannyPackRNG);
      break;
    }

    case 7: {
      // Random Battery
      spawnBatteryWithSeed(BatterySubType.NULL, position, g.run.fannyPackRNG);
      break;
    }

    case 8: {
      // Random Pill
      spawnPillWithSeed(PillColor.NULL, position, g.run.fannyPackRNG);
      break;
    }

    case 9: {
      // Random Card/Rune
      spawnCardWithSeed(Card.NULL, position, g.run.fannyPackRNG);
      break;
    }

    case 10: {
      // Random Trinket
      spawnTrinketWithSeed(TrinketType.NULL, position, g.run.fannyPackRNG);
      break;
    }

    case 11: {
      // Random Collectible
      spawnCollectible(CollectibleType.NULL, position, g.run.fannyPackRNG);
      break;
    }

    default: {
      error(`Unknown pickup case of: ${pickupRoll}`);
    }
  }
}

// TrinketType.WALNUT (108)
function walnut(player: EntityPlayer, damageFlags: BitFlags<DamageFlag>) {
  // Local variables
  const startSeed = g.seeds.GetStartSeed();

  if (!player.HasTrinket(TrinketTypeCustom.WALNUT_IMPROVED)) {
    return;
  }

  if (!hasFlag(damageFlags, DamageFlag.EXPLOSION)) {
    return;
  }

  g.run.walnutCounters += 1;
  if (g.run.walnutCounters === 3) {
    g.run.walnutCounters = 0;
    g.p.TryRemoveTrinket(TrinketTypeCustom.WALNUT_IMPROVED);
    const position = g.r.FindFreePickupSpawnPosition(g.p.Position, 1, true);
    const collectibleType = g.itemPool.GetCollectible(
      ItemPoolType.DEVIL,
      true,
      startSeed,
    );
    spawnCollectible(collectibleType, position, startSeed);
    sfxManager.Play(SoundEffectCustom.WALNUT, 2, 0, false, 1);
  }
}
