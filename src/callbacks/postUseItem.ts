import {
  Card,
  CollectibleAnimation,
  CollectibleType,
  GridEntityType,
  LevelStateFlag,
  ModCallback,
  PlayerItemAnimation,
  PoopEntityVariant,
  SoundEffect,
} from "isaac-typescript-definitions";
import { getCollectibleMaxCharges, sfxManager } from "isaacscript-common";
import { CollectibleTypeCustom } from "../enums/CollectibleTypeCustom";
import g from "../globals";
import * as catalog from "../items/catalog";
import * as postItemPickup from "../postItemPickup";

export function init(mod: Mod): void {
  mod.AddCallback(ModCallback.POST_USE_ITEM, main); // 3

  mod.AddCallback(
    ModCallback.POST_USE_ITEM,
    bookOfRevelations,
    CollectibleType.BOOK_OF_REVELATIONS, // 78
  );

  mod.AddCallback(
    ModCallback.POST_USE_ITEM,
    theNail,
    CollectibleType.THE_NAIL, // 83
  );

  mod.AddCallback(
    ModCallback.POST_USE_ITEM,
    monstrosTooth,
    CollectibleType.MONSTROS_TOOTH, // 86
  );

  mod.AddCallback(
    ModCallback.POST_USE_ITEM,
    bookOfSecrets,
    CollectibleType.BOOK_OF_SECRETS, // 287
  );

  mod.AddCallback(
    ModCallback.POST_USE_ITEM,
    satanicBible,
    CollectibleType.SATANIC_BIBLE, // 292
  );

  mod.AddCallback(
    ModCallback.POST_USE_ITEM,
    brownNugget,
    CollectibleType.BROWN_NUGGET, // 504
  );

  mod.AddCallback(
    ModCallback.POST_USE_ITEM,
    holyPoop,
    CollectibleTypeCustom.HOLY_POOP, // Replacing 36
  );

  mod.AddCallback(
    ModCallback.POST_USE_ITEM,
    momsBraImproved,
    CollectibleTypeCustom.MOMS_BRA_IMPROVED, // Replacing 39
  );

  mod.AddCallback(
    ModCallback.POST_USE_ITEM,
    monsterManualImproved,
    CollectibleTypeCustom.MONSTER_MANUAL_IMPROVED, // Replacing 123
  );

  mod.AddCallback(
    ModCallback.POST_USE_ITEM,
    boxOfSpidersImproved,
    CollectibleTypeCustom.BOX_OF_SPIDERS_IMPROVED, // Replacing 288
  );

  mod.AddCallback(
    ModCallback.POST_USE_ITEM,
    megaBlastSingle,
    CollectibleTypeCustom.MEGA_BLAST_SINGLE, // Replacing 441
  );

  mod.AddCallback(
    ModCallback.POST_USE_ITEM,
    clockworkAssembly,
    CollectibleTypeCustom.CLOCKWORK_ASSEMBLY,
  );

  mod.AddCallback(
    ModCallback.POST_USE_ITEM,
    chargingStation,
    CollectibleTypeCustom.CHARGING_STATION,
  );

  mod.AddCallback(
    ModCallback.POST_USE_ITEM,
    catalog.useItem,
    CollectibleTypeCustom.CATALOG,
  );
}

export function main(collectibleType: CollectibleType): boolean {
  // Buff 9-Volt
  if (!g.p.HasCollectible(CollectibleType.NINE_VOLT)) {
    return true;
  }

  const maxCharges = getCollectibleMaxCharges(collectibleType);
  if (maxCharges < 3) {
    // If the item is a 0 charge item, then we don't have to do anything. If it has 1 charge or 2
    // charges, then we do nothing, to prevent the item from infinitely recharging.
    return true;
  }

  g.run.nineVoltFrame = g.g.GetFrameCount();
  return true;
}

// CollectibleType.BOOK_REVELATIONS (78)
export function bookOfRevelations(): boolean {
  g.p.AddSoulHearts(-1);
  return true;
}

// CollectibleType.THE_NAIL (83)
export function theNail(): boolean {
  g.p.AddSoulHearts(-1);
  return true;
}

// CollectibleType.MONSTROS_TOOTH (86)
export function monstrosTooth(): boolean {
  // Summon extra Monstro's, spaced apart.
  g.run.monstroCounters += 1;
  if (g.run.monstroCounters === 3) {
    g.run.monstroCounters = 0;
    g.run.monstroFrame = 0;
  } else {
    g.run.monstroFrame = g.g.GetFrameCount() + 15;
  }

  return true;
}

// CollectibleType.BOOK_OF_SECRETS (287)
export function bookOfSecrets(): boolean {
  if (g.l.GetStateFlag(LevelStateFlag.BLUE_MAP_EFFECT)) {
    postItemPickup.blueMap();
  }

  return true;
}

// CollectibleType.SATANIC_BIBLE (292)
export function satanicBible(): boolean {
  g.p.AddBlackHearts(-1);
  return true;
}

// CollectibleType.BROWN_NUGGET (504)
export function brownNugget(): boolean {
  // Summon extra flies, spaced apart.
  if (g.run.brownNuggetCounters === 0) {
    g.run.brownNuggetCounters = 1;
    g.run.brownNuggetFrame = g.g.GetFrameCount() + 3;
  }

  return true;
}

// CollectibleTypeCustom.HOLY_POOP (replacing 36)
export function holyPoop(): boolean {
  // Spawn White Poop next to the player.
  Isaac.GridSpawn(
    GridEntityType.POOP,
    PoopEntityVariant.HOLY,
    g.p.Position,
    false,
  );

  // Playing "SOUND_FART" will randomly play one of the three farting sound effects.
  sfxManager.Play(SoundEffect.FART, 1, 0, false, 1);

  return true;
}

// CollectibleTypeCustom.MOMS_BRA_IMPROVED (replacing 39)
export function momsBraImproved(): boolean {
  g.p.UseActiveItem(CollectibleType.MOMS_BRA, true, false, false, false);

  return true;
}

// CollectibleTypeCustom.MONSTER_MANUAL_IMPROVED (replacing 123)
export function monsterManualImproved(): boolean {
  g.p.UseActiveItem(CollectibleType.MONSTER_MANUAL, true, false, false, false);

  return true;
}

// CollectibleTypeCustom.BOX_OF_SPIDERS_IMPROVED (replacing 288)
export function boxOfSpidersImproved(): boolean {
  g.p.UseActiveItem(CollectibleType.BOX_OF_SPIDERS, true, false, false, false);
  return true;
}

// CollectibleTypeCustom.MEGA_BLAST_SINGLE (replacing 441)
export function megaBlastSingle(): boolean {
  g.p.UseActiveItem(CollectibleType.MEGA_BLAST, true, false, false, false);
  g.p.RemoveCollectible(CollectibleTypeCustom.MEGA_BLAST_SINGLE);

  return true;
}

// CollectibleTypeCustom.CLOCKWORK_ASSEMBLY
export function clockworkAssembly(): boolean {
  // Spawn a Restock Machine (6.10).
  g.run.spawningRestock = true;
  RacingPlusGlobals.run.streakIgnore = true; // We need to ignore the Wheel of Fortune text
  g.p.UseCard(Card.WHEEL_OF_FORTUNE);

  return true;
}

// CollectibleTypeCustom.CHARGING_STATION
export function chargingStation(): boolean {
  if (RacingPlusSchoolbag.isItemFullyCharged()) {
    return false;
  }

  const coins = g.p.GetNumCoins();
  if (coins === 0) {
    return false;
  }

  g.p.AddCoins(-1);
  RacingPlusSchoolbag.addCharge(true);
  g.p.AnimateCollectible(
    CollectibleTypeCustom.CHARGING_STATION,
    PlayerItemAnimation.USE_ITEM,
    CollectibleAnimation.PLAYER_PICKUP,
  );
  sfxManager.Play(SoundEffect.BEEP, 1, 0, false, 1);

  return true;
}
