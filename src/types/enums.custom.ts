export enum PickupVariantCustom {
  INVISIBLE_PICKUP = Isaac.GetEntityVariantByName("Invisible Pickup"),
}

export enum CollectibleTypeCustom {
  // Racing+ items
  COLLECTIBLE_DADS_LOST_COIN_CUSTOM = Isaac.GetItemIdByName("Dad's Lost Coin"), // Replacing 455
  COLLECTIBLE_SCHOOLBAG_CUSTOM = Isaac.GetItemIdByName("Schoolbag"),
  COLLECTIBLE_MUTANT_SPIDER_INNER_EYE = Isaac.GetItemIdByName(
    "Mutant Spider's Inner Eye",
  ),

  // Replacements
  COLLECTIBLE_HOLY_POOP = Isaac.GetItemIdByName("Holy Poop"), // Replacing 36
  COLLECTIBLE_MOMS_BRA_IMPROVED = Isaac.GetItemIdByName("Mom's Bra (Improved)"), // Replacing 39
  COLLECTIBLE_BOBS_ROTTEN_HEAD_IMPROVED = Isaac.GetItemIdByName(
    "Bob's Rotten Head (Improved)",
  ), // Replacing 42
  COLLECTIBLE_MONSTER_MANUAL_IMPROVED = Isaac.GetItemIdByName(
    "Monster Manual (Improved)",
  ), // Replacing 123
  COLLECTIBLE_TECHNOLOGY_2_5 = Isaac.GetItemIdByName("Technology 2.5"), // Replacing 152
  COLLECTIBLE_FANNY_PACK_IMPROVED = Isaac.GetItemIdByName(
    "Fanny Pack (Improved)",
  ), // Replacing 204
  COLLECTIBLE_FIRE_MIND_IMPROVED = Isaac.GetItemIdByName(
    "Fire Mind (Improved)",
  ), // Replacing 257
  COLLECTIBLE_BOX_OF_SPIDERS_IMPROVED = Isaac.GetItemIdByName(
    "Box of Spiders (Improved)",
  ), // Replacing 288
  COLLECTIBLE_HOLY_MANTLE_NERFED = Isaac.GetItemIdByName(
    "Holy Mantle (Nerfed)",
  ), // Replacing 313
  COLLECTIBLE_MR_DOLLY_NERFED = Isaac.GetItemIdByName("Mr. Dolly (Nerfed)"), // Replacing 370
  COLLECTIBLE_MEGA_BLAST_SINGLE = Isaac.GetItemIdByName(
    "Mega Blast (Single Use)",
  ), // Replacing 414
  COLLECTIBLE_ADRENALINE_IMPROVED = Isaac.GetItemIdByName(
    "Adrenaline (Improved)",
  ), // Replacing 493
  COLLECTIBLE_POKE_GO_IMPROVED = Isaac.GetItemIdByName("Poke Go (Improved)"), // Replacing 505

  // Custom items
  COLLECTIBLE_CLOCKWORK_ASSEMBLY = Isaac.GetItemIdByName("Clockwork Assembly"),
  COLLECTIBLE_CHARGING_STATION = Isaac.GetItemIdByName("Charging Station"),
  COLLECTIBLE_STRABISMUS = Isaac.GetItemIdByName("Strabismus"),
  COLLECTIBLE_U235 = Isaac.GetItemIdByName("U-235"),
  COLLECTIBLE_CATALOG = Isaac.GetItemIdByName("Catalog"),
}

export enum TrinketTypeCustom {
  // Replacements
  TRINKET_WALNUT_IMPROVED = Isaac.GetTrinketIdByName("Walnut (Improved)"), // Replacing 108

  // Custom trinkets
  TRINKET_ETHEREAL_PENNY = Isaac.GetTrinketIdByName("Ethereal Penny"),
  TRINKET_PENNY_ON_A_STRING = Isaac.GetTrinketIdByName("Penny on a String"),
}

export enum SlotVariantCustom {
  TRANSMUTATION_MACHINE = Isaac.GetEntityVariantByName("Transmutation Machine"),
  BOMB_DONATION_MACHINE = Isaac.GetEntityVariantByName("Bomb Donation Machine"),
  KEY_DONATION_MACHINE = Isaac.GetEntityVariantByName("Key Donation Machine"),
  ROULETTE_TABLE = Isaac.GetEntityVariantByName("Roulette Table"),
  HOLY_MACHINE = Isaac.GetEntityVariantByName("Holy Machine"),
}

export enum EffectVariantCustom {
  DICE_ROOM_FLOOR_CUSTOM = Isaac.GetEntityVariantByName(
    "Dice Room Floor (Custom)",
  ),
}

export enum CreepSubTypeCustom {
  FLOOR_EFFECT_CREEP = 12545, // There is no "Isaac.GetEntitySubTypeByName()" function
}

export enum PillEffectCustom {
  PILLEFFECT_DAMAGE_UP = Isaac.GetPillEffectByName("Damage Up"),
  PILLEFFECT_TEAR_DELAY_DOWN = Isaac.GetPillEffectByName("Tear Delay Down"),
  PILLEFFECT_DEAL_AFFINITY = Isaac.GetPillEffectByName("Deal Affinity"),
  PILLEFFECT_BONE_AFFINITY = Isaac.GetPillEffectByName("Bone Affinity"),
  PILLEFFECT_RESTOCK = Isaac.GetPillEffectByName("Restock"),
  PILLEFFECT_GOLDEN_DUMP = Isaac.GetPillEffectByName("Golden Dump"),
  PILLEFFECT_GLIMPSE = Isaac.GetPillEffectByName("Glimpse"),
  PILLEFFECT_SUPER_SADNESS = Isaac.GetPillEffectByName("Super Sadness"),
  PILLEFFECT_INVINCIBILITY = Isaac.GetPillEffectByName("Invincibility"),
  PILLEFFECT_REALLY_BAD_GAS = Isaac.GetPillEffectByName("Really Bad Gas"),
  PILLEFFECT_AETHER = Isaac.GetPillEffectByName("Aether"),
  PILLEFFECT_WALLS_HAVE_EYES = Isaac.GetPillEffectByName("Walls Have Eyes"),
  PILLEFFECT_BLADDER_INFECTION = Isaac.GetPillEffectByName("Bladder Infection"),
  PILLEFFECT_SCORCHED_EARTH = Isaac.GetPillEffectByName("Scorched Earth"),
  PILLEFFECT_FAMILIAR_FRENZY = Isaac.GetPillEffectByName("Familiar Frenzy"),
  PILLEFFECT_UNLOCK = Isaac.GetPillEffectByName("Unlock"),
}

export enum SoundEffectCustom {
  SOUND_WALNUT = Isaac.GetSoundIdByName("Walnut"), // This is included in Racing+
}

export enum CollectibleState {
  NORMAL = 0,
  RACING_PLUS_REPLACED = 1,
  DUPLICATED = 2,
}
