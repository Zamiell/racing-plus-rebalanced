import {
  CollectibleType,
  DisplayFlag,
  DisplayFlagZero,
  RoomType,
  TrinketType,
} from "isaac-typescript-definitions";
import {
  addCollectibleCostume,
  addFlag,
  bitFlags,
  removeAllTrinkets,
  removeCollectibleFromItemTracker,
  repeat,
} from "isaacscript-common";
import { ISAACS_HEART_BROKEN_COLLECTIBLES } from "./constants";
import { CollectibleTypeCustom } from "./enums/CollectibleTypeCustom";
import g from "./globals";
import * as technology from "./items/technology";
import * as technology25 from "./items/technology25";
import * as misc from "./misc";

export const functionMap = new Map<int, () => void>();

// 12
functionMap.set(CollectibleType.MAGIC_MUSHROOM, () => {
  // Remove the extra health up.
  misc.setHealthFromLastFrame();
  misc.killIfNoHealth();
});

// 36
functionMap.set(CollectibleType.POOP, () => {
  g.p.RemoveCollectible(CollectibleType.POOP);
  holyPoop();
});

// 39
functionMap.set(CollectibleType.MOMS_BRA, () => {
  g.p.RemoveCollectible(CollectibleType.MOMS_BRA);
  g.p.AddCollectible(CollectibleTypeCustom.MOMS_BRA_IMPROVED, 1, false);
});

// 68
functionMap.set(CollectibleType.TECHNOLOGY, technology.postItemPickup);

// 88
functionMap.set(CollectibleType.LITTLE_CHUBBY, () => {
  repeat(3, () => {
    g.p.AddCollectible(CollectibleType.LITTLE_CHUBBY, 0, false);
    removeCollectibleFromItemTracker(CollectibleType.LITTLE_CHUBBY);
  });
});

// 92
functionMap.set(CollectibleType.SUPER_BANDAGE, () => {
  // Remove one of the soul hearts.
  misc.setHealthFromLastFrame();
  g.p.AddMaxHearts(2, false);
  g.p.AddSoulHearts(2);
});

// 108
functionMap.set(CollectibleType.WAFER, () => {
  g.run.wafer = true;
  g.run.waferCounters = 2;
});

// 114
functionMap.set(CollectibleType.MOMS_KNIFE, () => {
  g.itemPool.RemoveCollectible(CollectibleType.TWENTY_TWENTY);
});

// 118
functionMap.set(CollectibleType.BRIMSTONE, () => {
  g.itemPool.RemoveCollectible(CollectibleType.TWENTY_TWENTY); // 245
  g.itemPool.RemoveCollectible(CollectibleType.ISAACS_HEART); // 276
});

// 152
functionMap.set(CollectibleType.TECHNOLOGY_2, () => {
  g.p.RemoveCollectible(CollectibleType.TECHNOLOGY_2);
  removeCollectibleFromItemTracker(CollectibleType.TECHNOLOGY_2);
  g.p.AddCollectible(CollectibleTypeCustom.TECHNOLOGY_2_5, 0, false);
  technology25.postItemPickup();
});

// 182
functionMap.set(CollectibleType.SACRED_HEART, () => {
  // Remove the extra health up.
  misc.setHealthFromLastFrame();
  misc.killIfNoHealth();
});

// 204
functionMap.set(CollectibleType.FANNY_PACK, () => {
  g.p.RemoveCollectible(CollectibleType.FANNY_PACK);
  removeCollectibleFromItemTracker(CollectibleType.FANNY_PACK);
  g.p.AddCollectible(CollectibleTypeCustom.FANNY_PACK_IMPROVED, 0, false);
  fannyPackImproved();
});

// 216
functionMap.set(CollectibleType.CEREMONIAL_ROBES, () => {
  misc.setHealthFromLastFrame();
  g.p.AddBlackHearts(2);
});

// 230
functionMap.set(CollectibleType.ABADDON, () => {
  misc.setHealthFromLastFrame();
  g.p.AddBlackHearts(4);
});

// 246
functionMap.set(CollectibleType.BLUE_MAP, blueMap);
export function blueMap(): void {
  const bossIndex = g.l.QueryRoomTypeIndex(RoomType.BOSS, false, RNG());
  const bossRoom = g.l.GetRoomByIdx(bossIndex);

  // Completely invisible
  if (bossRoom.DisplayFlags === DisplayFlagZero) {
    bossRoom.DisplayFlags = bitFlags(DisplayFlag.SHOW_ICON);
  }

  // No icon (e.g. from Treasure Map)
  if (bossRoom.DisplayFlags === DisplayFlag.VISIBLE) {
    bossRoom.DisplayFlags = addFlag(DisplayFlag.VISIBLE, DisplayFlag.SHOW_ICON);
  }

  // Setting the display flag will not actually update the map.
  g.l.UpdateVisibility();
}

// 257
functionMap.set(CollectibleType.FIRE_MIND, () => {
  if (!misc.isOnTearBuild()) {
    return;
  }

  g.p.RemoveCollectible(CollectibleType.FIRE_MIND);
  removeCollectibleFromItemTracker(CollectibleType.FIRE_MIND);
  g.p.AddCollectible(CollectibleTypeCustom.FIRE_MIND_IMPROVED, 0, false);
  fireMindImproved();
});

// 270
functionMap.set(CollectibleType.LEECH, () => {
  repeat(5, () => {
    g.p.AddCollectible(CollectibleType.LEECH, 0, false);
    removeCollectibleFromItemTracker(CollectibleType.LEECH);
  });
});

// 276
functionMap.set(CollectibleType.ISAACS_HEART, () => {
  for (const item of ISAACS_HEART_BROKEN_COLLECTIBLES) {
    g.p.RemoveCollectible(item);
    g.itemPool.RemoveCollectible(item);
  }
});

// 277
functionMap.set(CollectibleType.LIL_HAUNT, () => {
  // For 3 in total
  for (let i = 0; i < 2; i++) {
    g.p.AddCollectible(CollectibleType.LIL_HAUNT, 0, false);
    removeCollectibleFromItemTracker(CollectibleType.LIL_HAUNT);
  }
});

// 280
functionMap.set(CollectibleType.SISSY_LONGLEGS, () => {
  // For 10 in total
  for (let i = 0; i < 9; i++) {
    g.p.AddCollectible(CollectibleType.SISSY_LONGLEGS, 0, false);
    removeCollectibleFromItemTracker(CollectibleType.SISSY_LONGLEGS);
  }
});

// 307
functionMap.set(CollectibleType.CAPRICORN, () => {
  // Remove the extra health up
  misc.setHealthFromLastFrame();
  misc.killIfNoHealth();
});

// 313
functionMap.set(CollectibleType.HOLY_MANTLE, () => {
  g.p.RemoveCollectible(CollectibleType.HOLY_MANTLE);
  removeCollectibleFromItemTracker(CollectibleType.HOLY_MANTLE);

  g.p.AddCollectible(CollectibleTypeCustom.HOLY_MANTLE_NERFED, 0, false);
  holyMantleNerfed();
});

// 370
functionMap.set(CollectibleType.MR_DOLLY, () => {
  // Replace it with a Sad Onion behind the scenes
  g.p.RemoveCollectible(CollectibleType.MR_DOLLY);
  g.p.AddCollectible(CollectibleType.SAD_ONION, 0, false);
  removeCollectibleFromItemTracker(CollectibleType.SAD_ONION);
});

// 384
functionMap.set(CollectibleType.LIL_GURDY, () => {
  // For 5 in total
  for (let i = 0; i < 4; i++) {
    g.p.AddCollectible(CollectibleType.LIL_GURDY, 0, false);
    removeCollectibleFromItemTracker(CollectibleType.LIL_GURDY);
  }
});

// 415
functionMap.set(CollectibleType.CROWN_OF_LIGHT, () => {
  // Remove the two soul hearts
  misc.setHealthFromLastFrame();
  misc.killIfNoHealth();
});

// 441
functionMap.set(CollectibleType.MEGA_SATANS_BREATH, () => {
  g.p.AddCollectible(CollectibleTypeCustom.MEGA_BLAST_SINGLE, 0, false);
});

// 473
functionMap.set(CollectibleType.BIG_CHUBBY, () => {
  // For 3 in total
  for (let i = 0; i < 2; i++) {
    g.p.AddCollectible(CollectibleType.BIG_CHUBBY, 0, false);
    removeCollectibleFromItemTracker(CollectibleType.BIG_CHUBBY);
  }
});

// 493
functionMap.set(CollectibleType.ADRENALINE, () => {
  g.p.RemoveCollectible(CollectibleType.ADRENALINE);
  removeCollectibleFromItemTracker(CollectibleType.ADRENALINE);

  g.p.AddCollectible(CollectibleTypeCustom.ADRENALINE_IMPROVED, 0, false);
  adrenalineCustom();
});

// 505
functionMap.set(CollectibleType.POKE_GO, () => {
  g.p.RemoveCollectible(CollectibleType.POKE_GO);
  removeCollectibleFromItemTracker(CollectibleType.POKE_GO);
  g.p.AddCollectible(CollectibleTypeCustom.POKE_GO_IMPROVED, 0, false);
});

// 547
functionMap.set(CollectibleType.DIVORCE_PAPERS, () => {
  g.p.AddBoneHearts(-1);
  if (g.p.HasTrinket(TrinketType.MYSTERIOUS_PAPER)) {
    g.p.TryRemoveTrinket(TrinketType.MYSTERIOUS_PAPER);
  } else {
    removeAllTrinkets(TrinketType.MYSTERIOUS_PAPER);
  }
});

// 549
functionMap.set(CollectibleType.BRITTLE_BONES, () => {
  g.p.AddBoneHearts(-4);
});

// Replacing 36
functionMap.set(CollectibleTypeCustom.HOLY_POOP, holyPoop);
function holyPoop() {
  // Add the old Poop so that Holy Poop will still count for the Oh Crap transformation (and then
  // put the Holy Poop back)
  g.p.AddCollectible(CollectibleType.POOP, 0, false);
  g.p.AddCollectible(CollectibleTypeCustom.HOLY_POOP, 1, false);
}

// Replacing 152
functionMap.set(
  CollectibleTypeCustom.TECHNOLOGY_2_5,
  technology25.postItemPickup,
);

// Replacing 204
functionMap.set(CollectibleTypeCustom.FANNY_PACK_IMPROVED, fannyPackImproved);
function fannyPackImproved() {
  addCollectibleCostume(g.p, CollectibleType.FANNY_PACK);
}

// Replacing 257
functionMap.set(CollectibleTypeCustom.FIRE_MIND_IMPROVED, fireMindImproved);
function fireMindImproved() {
  addCollectibleCostume(g.p, CollectibleType.FIRE_MIND);
}

// Replacing 288
functionMap.set(CollectibleTypeCustom.BOX_OF_SPIDERS_IMPROVED, () => {
  // Add and remove the old Box of Spiders so that the improved version will still count for the
  // Spider Baby transformation
  const activeCharge = g.p.GetActiveCharge();
  g.p.AddCollectible(CollectibleType.BOX_OF_SPIDERS, 0, false);
  removeCollectibleFromItemTracker(CollectibleType.BOX_OF_SPIDERS);
  g.p.AddCollectible(
    CollectibleTypeCustom.BOX_OF_SPIDERS_IMPROVED,
    activeCharge,
    false,
  );
});

// Replacing 313
functionMap.set(CollectibleTypeCustom.HOLY_MANTLE_NERFED, holyMantleNerfed);
function holyMantleNerfed() {
  g.run.holyMantle = true;

  // Add and remove the old Holy Mantle so that the nerfed version will still count for the Seraphim
  // transformation
  g.p.AddCollectible(CollectibleType.HOLY_MANTLE, 0, false);
  g.p.RemoveCollectible(CollectibleType.HOLY_MANTLE);
  removeCollectibleFromItemTracker(CollectibleType.HOLY_MANTLE);

  const effects = g.p.GetEffects();
  if (!effects.HasCollectibleEffect(CollectibleType.HOLY_MANTLE)) {
    effects.AddCollectibleEffect(CollectibleType.HOLY_MANTLE, false);
  }

  // Even if we already have the Holy Mantle effect, we need to add the costume in order for it to
  // display properly
  addCollectibleCostume(g.p, CollectibleType.HOLY_MANTLE);
}

// Replacing 370
functionMap.set(CollectibleTypeCustom.MR_DOLLY_NERFED, () => {
  addCollectibleCostume(g.p, CollectibleType.MR_DOLLY);

  // Replace it with a Sad Onion behind the scenes
  g.p.RemoveCollectible(CollectibleTypeCustom.MR_DOLLY_NERFED);
  g.p.AddCollectible(CollectibleType.SAD_ONION, 0, false);
  removeCollectibleFromItemTracker(CollectibleType.SAD_ONION);
});

// Replacing 493
functionMap.set(CollectibleTypeCustom.ADRENALINE_IMPROVED, adrenalineCustom);
function adrenalineCustom() {
  // Add and remove the old Adrenaline so that the improved version will still count for the Spun
  // transformation
  g.p.AddCollectible(CollectibleType.ADRENALINE, 0, false);
  g.p.RemoveCollectible(CollectibleType.ADRENALINE);
  removeCollectibleFromItemTracker(CollectibleType.ADRENALINE);

  addCollectibleCostume(g.p, CollectibleType.ADRENALINE);
}
