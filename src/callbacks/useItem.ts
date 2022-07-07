import g from "../globals";
import * as misc from "../misc";
import * as postItemPickup from "../postItemPickup";
import { CollectibleTypeCustom } from "../types/enums";

export function main(collectibleType: CollectibleType): boolean {
  // Buff 9-Volt
  if (!g.p.HasCollectible(CollectibleType.NINE_VOLT)) {
    return true;
  }

  const maxCharges = misc.getItemMaxCharges(collectibleType);
  if (maxCharges < 3) {
    // If the item is a 0 charge item, then we don't have to do anything If it has 1 charge or 2
    // charges, then we do nothing, to prevent the item from infinitely recharging
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
  // Summon extra Monstro's, spaced apart
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
  if (g.l.GetStateFlag(LevelStateFlag.STATE_BLUE_MAP_EFFECT)) {
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
  // Summon extra flies, spaced apart
  if (g.run.brownNuggetCounters === 0) {
    g.run.brownNuggetCounters = 1;
    g.run.brownNuggetFrame = g.g.GetFrameCount() + 3;
  }

  return true;
}

// CollectibleTypeCustom.HOLY_POOP (replacing 36)
export function holyPoop(): boolean {
  // Spawn White Poop next to the player
  Isaac.GridSpawn(
    GridEntityType.POOP,
    PoopVariant.POOP_WHITE,
    g.p.Position,
    false,
  );

  // Playing "SOUND_FART" will randomly play one of the three farting sound effects
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
  g.p.UseActiveItem(
    CollectibleType.MEGA_SATANS_BREATH,
    true,
    false,
    false,
    false,
  );
  g.p.RemoveCollectible(CollectibleTypeCustom.MEGA_BLAST_SINGLE);

  return true;
}

// CollectibleTypeCustom.CLOCKWORK_ASSEMBLY
export function clockworkAssembly(): boolean {
  // Spawn a Restock Machine (6.10)
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
    "UseItem",
    "PlayerPickup",
  );
  sfxManager.Play(SoundEffect.BEEP, 1, 0, false, 1);

  return true;
}
