import { ISAACS_HEART_BROKEN_ITEMS } from "./constants";
import g from "./globals";
import * as technology from "./items/technology";
import * as technology25 from "./items/technology25";
import * as misc from "./misc";
import { CollectibleTypeCustom } from "./types/enums.custom";

export const functionMap = new Map<int, () => void>();

// 12
functionMap.set(CollectibleType.COLLECTIBLE_MAGIC_MUSHROOM, () => {
  // Remove the extra health up
  misc.setHealthFromLastFrame();
  misc.killIfNoHealth();
});

// 36
functionMap.set(CollectibleType.COLLECTIBLE_POOP, () => {
  g.p.RemoveCollectible(CollectibleType.COLLECTIBLE_POOP);
  holyPoop();
});

// 39
functionMap.set(CollectibleType.COLLECTIBLE_MOMS_BRA, () => {
  g.p.RemoveCollectible(CollectibleType.COLLECTIBLE_MOMS_BRA);
  g.p.AddCollectible(
    CollectibleTypeCustom.COLLECTIBLE_MOMS_BRA_IMPROVED,
    1,
    false,
  );
});

// 68
functionMap.set(
  CollectibleType.COLLECTIBLE_TECHNOLOGY,
  technology.postItemPickup,
);

// 88
functionMap.set(CollectibleType.COLLECTIBLE_LITTLE_CHUBBY, () => {
  // For 3 in total
  for (let i = 0; i < 2; i++) {
    g.p.AddCollectible(CollectibleType.COLLECTIBLE_LITTLE_CHUBBY, 0, false);
    Isaac.DebugString("Removing collectible 88 (Little Chubby)");
  }
});

// 92
functionMap.set(CollectibleType.COLLECTIBLE_SUPER_BANDAGE, () => {
  // Remove one of the soul hearts
  misc.setHealthFromLastFrame();
  g.p.AddMaxHearts(2, false);
  g.p.AddSoulHearts(2);
});

// 108
functionMap.set(CollectibleType.COLLECTIBLE_WAFER, () => {
  g.run.wafer = true;
  g.run.waferCounters = 2;
});

// 114
functionMap.set(CollectibleType.COLLECTIBLE_MOMS_KNIFE, () => {
  g.itemPool.RemoveCollectible(CollectibleType.COLLECTIBLE_20_20);
});

// 118
functionMap.set(CollectibleType.COLLECTIBLE_BRIMSTONE, () => {
  g.itemPool.RemoveCollectible(CollectibleType.COLLECTIBLE_20_20); // 245
  g.itemPool.RemoveCollectible(CollectibleType.COLLECTIBLE_ISAACS_HEART); // 276
});

// 152
functionMap.set(CollectibleType.COLLECTIBLE_TECHNOLOGY_2, () => {
  g.p.RemoveCollectible(CollectibleType.COLLECTIBLE_TECHNOLOGY_2);
  Isaac.DebugString("Removing collectible 152 (Technology 2)");
  g.p.AddCollectible(
    CollectibleTypeCustom.COLLECTIBLE_TECHNOLOGY_2_5,
    0,
    false,
  );
  technology25.postItemPickup();
});

// 182
functionMap.set(CollectibleType.COLLECTIBLE_SACRED_HEART, () => {
  // Remove the extra health up
  misc.setHealthFromLastFrame();
  misc.killIfNoHealth();
});

// 204
functionMap.set(CollectibleType.COLLECTIBLE_FANNY_PACK, () => {
  g.p.RemoveCollectible(CollectibleType.COLLECTIBLE_FANNY_PACK);
  Isaac.DebugString("Removing collectible 204 (Fanny Pack)");
  g.p.AddCollectible(
    CollectibleTypeCustom.COLLECTIBLE_FANNY_PACK_IMPROVED,
    0,
    false,
  );
  fannyPackImproved();
});

// 216
functionMap.set(CollectibleType.COLLECTIBLE_CEREMONIAL_ROBES, () => {
  misc.setHealthFromLastFrame();
  g.p.AddBlackHearts(2);
});

// 230
functionMap.set(CollectibleType.COLLECTIBLE_ABADDON, () => {
  misc.setHealthFromLastFrame();
  g.p.AddBlackHearts(4);
});

// 246
functionMap.set(CollectibleType.COLLECTIBLE_BLUE_MAP, blueMap);
export function blueMap(): void {
  const bossIndex = g.l.QueryRoomTypeIndex(RoomType.ROOM_BOSS, false, RNG());
  const bossRoom = g.l.GetRoomByIdx(bossIndex);

  // Completely invisible
  if (bossRoom.DisplayFlags === 0) {
    bossRoom.DisplayFlags = 4;
  }

  // No icon (e.g. from Treasure Map)
  if (bossRoom.DisplayFlags === 1) {
    bossRoom.DisplayFlags = 5;
  }

  // Setting the display flag will ! actually update the map
  g.l.UpdateVisibility();
}

// 257
functionMap.set(CollectibleType.COLLECTIBLE_FIRE_MIND, () => {
  if (!misc.isOnTearBuild()) {
    return;
  }

  g.p.RemoveCollectible(CollectibleType.COLLECTIBLE_FIRE_MIND);
  Isaac.DebugString("Removing collectible 204 (Fire Mind)");
  g.p.AddCollectible(
    CollectibleTypeCustom.COLLECTIBLE_FIRE_MIND_IMPROVED,
    0,
    false,
  );
  fireMindImproved();
});

// 270
functionMap.set(CollectibleType.COLLECTIBLE_LEECH, () => {
  // For 5 in total
  for (let i = 0; i < 4; i++) {
    g.p.AddCollectible(CollectibleType.COLLECTIBLE_LEECH, 0, false);
    Isaac.DebugString("Removing collectible 270 (Leech)");
  }
});

// 276
functionMap.set(CollectibleType.COLLECTIBLE_ISAACS_HEART, () => {
  for (const item of ISAACS_HEART_BROKEN_ITEMS) {
    g.p.RemoveCollectible(item);
    g.itemPool.RemoveCollectible(item);
  }
});

// 277
functionMap.set(CollectibleType.COLLECTIBLE_LIL_HAUNT, () => {
  // For 3 in total
  for (let i = 0; i < 2; i++) {
    g.p.AddCollectible(CollectibleType.COLLECTIBLE_LIL_HAUNT, 0, false);
    Isaac.DebugString("Removing collectible 277 (Lil Haunt)");
  }
});

// 280
functionMap.set(CollectibleType.COLLECTIBLE_SISSY_LONGLEGS, () => {
  // For 10 in total
  for (let i = 0; i < 9; i++) {
    g.p.AddCollectible(CollectibleType.COLLECTIBLE_SISSY_LONGLEGS, 0, false);
    Isaac.DebugString("Removing collectible 280 (Sissy Longlegs)");
  }
});

// 307
functionMap.set(CollectibleType.COLLECTIBLE_CAPRICORN, () => {
  // Remove the extra health up
  misc.setHealthFromLastFrame();
  misc.killIfNoHealth();
});

// 313
functionMap.set(CollectibleType.COLLECTIBLE_HOLY_MANTLE, () => {
  g.p.RemoveCollectible(CollectibleType.COLLECTIBLE_HOLY_MANTLE);
  Isaac.DebugString("Removing collectible 313 (Holy Mantle)");

  g.p.AddCollectible(
    CollectibleTypeCustom.COLLECTIBLE_HOLY_MANTLE_NERFED,
    0,
    false,
  );
  holyMantleNerfed();
});

// 370
functionMap.set(CollectibleType.COLLECTIBLE_MR_DOLLY, () => {
  // Replace it with a Sad Onion behind the scenes
  g.p.RemoveCollectible(CollectibleType.COLLECTIBLE_MR_DOLLY);
  g.p.AddCollectible(CollectibleType.COLLECTIBLE_SAD_ONION, 0, false);
  Isaac.DebugString("Removing collectible 1 (Sad Onion)");
});

// 384
functionMap.set(CollectibleType.COLLECTIBLE_LIL_GURDY, () => {
  // For 5 in total
  for (let i = 0; i < 4; i++) {
    g.p.AddCollectible(CollectibleType.COLLECTIBLE_LIL_GURDY, 0, false);
    Isaac.DebugString("Removing collectible 384 (Lil Gurdy)");
  }
});

// 415
functionMap.set(CollectibleType.COLLECTIBLE_CROWN_OF_LIGHT, () => {
  // Remove the two soul hearts
  misc.setHealthFromLastFrame();
  misc.killIfNoHealth();
});

// 441
functionMap.set(CollectibleType.COLLECTIBLE_MEGA_SATANS_BREATH, () => {
  g.p.AddCollectible(
    CollectibleTypeCustom.COLLECTIBLE_MEGA_BLAST_SINGLE,
    0,
    false,
  );
});

// 473
functionMap.set(CollectibleType.COLLECTIBLE_BIG_CHUBBY, () => {
  // For 3 in total
  for (let i = 0; i < 2; i++) {
    g.p.AddCollectible(CollectibleType.COLLECTIBLE_BIG_CHUBBY, 0, false);
    Isaac.DebugString("Removing collectible 473 (Big Chubby)");
  }
});

// 493
functionMap.set(CollectibleType.COLLECTIBLE_ADDERLINE, () => {
  g.p.RemoveCollectible(CollectibleType.COLLECTIBLE_ADDERLINE);
  Isaac.DebugString("Removing collectible 493 (Adrenaline)");

  g.p.AddCollectible(
    CollectibleTypeCustom.COLLECTIBLE_ADRENALINE_IMPROVED,
    0,
    false,
  );
  adrenalineCustom();
});

// 505
functionMap.set(CollectibleType.COLLECTIBLE_POKE_GO, () => {
  g.p.RemoveCollectible(CollectibleType.COLLECTIBLE_POKE_GO);
  Isaac.DebugString("Removing collectible 505 (Poke Go)");
  g.p.AddCollectible(
    CollectibleTypeCustom.COLLECTIBLE_POKE_GO_IMPROVED,
    0,
    false,
  );
});

// 547
functionMap.set(CollectibleType.COLLECTIBLE_DIVORCE_PAPERS, () => {
  g.p.AddBoneHearts(-1);
  if (g.p.HasTrinket(TrinketType.TRINKET_MYSTERIOUS_PAPER)) {
    g.p.TryRemoveTrinket(TrinketType.TRINKET_MYSTERIOUS_PAPER);
  } else {
    const papers = Isaac.FindByType(
      EntityType.ENTITY_PICKUP,
      PickupVariant.PICKUP_TRINKET,
      TrinketType.TRINKET_MYSTERIOUS_PAPER,
      false,
      false,
    );
    for (const paper of papers) {
      paper.Remove();
    }
  }
});

// 549
functionMap.set(CollectibleType.COLLECTIBLE_BRITTLE_BONES, () => {
  g.p.AddBoneHearts(-4);
});

// Replacing 36
functionMap.set(CollectibleTypeCustom.COLLECTIBLE_HOLY_POOP, holyPoop);
function holyPoop() {
  // Add the old Poop so that Holy Poop will still count for the Oh Crap transformation
  // (and then put the Holy Poop back)
  g.p.AddCollectible(CollectibleType.COLLECTIBLE_POOP, 0, false);
  g.p.AddCollectible(CollectibleTypeCustom.COLLECTIBLE_HOLY_POOP, 1, false);
}

// Replacing 152
functionMap.set(
  CollectibleTypeCustom.COLLECTIBLE_TECHNOLOGY_2_5,
  technology25.postItemPickup,
);

// Replacing 204
functionMap.set(
  CollectibleTypeCustom.COLLECTIBLE_FANNY_PACK_IMPROVED,
  fannyPackImproved,
);
function fannyPackImproved() {
  const item = g.itemConfig.GetCollectible(
    CollectibleType.COLLECTIBLE_FANNY_PACK,
  );
  g.p.AddCostume(item, false);
}

// Replacing 257
functionMap.set(
  CollectibleTypeCustom.COLLECTIBLE_FIRE_MIND_IMPROVED,
  fireMindImproved,
);
function fireMindImproved() {
  const item = g.itemConfig.GetCollectible(
    CollectibleType.COLLECTIBLE_FIRE_MIND,
  );
  g.p.AddCostume(item, false);
}

// Replacing 288
functionMap.set(
  CollectibleTypeCustom.COLLECTIBLE_BOX_OF_SPIDERS_IMPROVED,
  () => {
    // Add and remove the old Box of Spiders so that the improved version will still count for the
    // Spider Baby transformation
    const activeCharge = g.p.GetActiveCharge();
    g.p.AddCollectible(CollectibleType.COLLECTIBLE_BOX_OF_SPIDERS, 0, false);
    g.p.AddCollectible(
      CollectibleTypeCustom.COLLECTIBLE_BOX_OF_SPIDERS_IMPROVED,
      activeCharge,
      false,
    );
    Isaac.DebugString("Removing collectible 288 (Box of Spiders)");
  },
);

// Replacing 313
functionMap.set(
  CollectibleTypeCustom.COLLECTIBLE_HOLY_MANTLE_NERFED,
  holyMantleNerfed,
);
function holyMantleNerfed() {
  g.run.holyMantle = true;

  // Add and remove the old Holy Mantle so that the nerfed version will still count for the Seraphim
  // transformation
  g.p.AddCollectible(CollectibleType.COLLECTIBLE_HOLY_MANTLE, 0, false);
  g.p.RemoveCollectible(CollectibleType.COLLECTIBLE_HOLY_MANTLE);
  Isaac.DebugString("Removing collectible 313 (Holy Mantle)");

  const effects = g.p.GetEffects();
  if (!effects.HasCollectibleEffect(CollectibleType.COLLECTIBLE_HOLY_MANTLE)) {
    effects.AddCollectibleEffect(
      CollectibleType.COLLECTIBLE_HOLY_MANTLE,
      false,
    );
  }

  // Even if we already have the Holy Mantle effect,
  // we need to add the costume in order for it to display properly
  const item = g.itemConfig.GetCollectible(
    CollectibleType.COLLECTIBLE_HOLY_MANTLE,
  );
  g.p.AddCostume(item, false);
}

// Replacing 370
functionMap.set(CollectibleTypeCustom.COLLECTIBLE_MR_DOLLY_NERFED, () => {
  const item = g.itemConfig.GetCollectible(
    CollectibleType.COLLECTIBLE_MR_DOLLY,
  );
  g.p.AddCostume(item, false);

  // Replace it with a Sad Onion behind the scenes
  g.p.RemoveCollectible(CollectibleTypeCustom.COLLECTIBLE_MR_DOLLY_NERFED);
  g.p.AddCollectible(CollectibleType.COLLECTIBLE_SAD_ONION, 0, false);
  Isaac.DebugString("Removing collectible 1 (Sad Onion)");
});

// Replacing 493
functionMap.set(
  CollectibleTypeCustom.COLLECTIBLE_ADRENALINE_IMPROVED,
  adrenalineCustom,
);
function adrenalineCustom() {
  // Add and remove the old Adrenaline so that the improved version will still count for the Spun
  // transformation
  g.p.AddCollectible(CollectibleType.COLLECTIBLE_ADDERLINE, 0, false);
  g.p.RemoveCollectible(CollectibleType.COLLECTIBLE_ADDERLINE);
  Isaac.DebugString("Removing collectible 493 (Adrenaline)");

  const item = g.itemConfig.GetCollectible(
    CollectibleType.COLLECTIBLE_ADDERLINE,
  );
  g.p.AddCostume(item, false);
}
