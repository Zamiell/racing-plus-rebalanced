export const CollectibleTypeCustom = {
  // Racing+ items
  DADS_LOST_COIN_CUSTOM: Isaac.GetItemIdByName("Dad's Lost Coin"), // Replacing 455
  SCHOOLBAG_CUSTOM: Isaac.GetItemIdByName("Schoolbag"),
  MUTANT_SPIDER_INNER_EYE: Isaac.GetItemIdByName("Mutant Spider's Inner Eye"),

  // Replacements
  HOLY_POOP: Isaac.GetItemIdByName("Holy Poop"), // Replacing 36
  MOMS_BRA_IMPROVED: Isaac.GetItemIdByName("Mom's Bra (Improved)"), // Replacing 39
  BOBS_ROTTEN_HEAD_IMPROVED: Isaac.GetItemIdByName(
    "Bob's Rotten Head (Improved)",
  ), // Replacing 42
  MONSTER_MANUAL_IMPROVED: Isaac.GetItemIdByName("Monster Manual (Improved)"), // Replacing 123
  TECHNOLOGY_2_5: Isaac.GetItemIdByName("Technology 2.5"), // Replacing 152
  FANNY_PACK_IMPROVED: Isaac.GetItemIdByName("Fanny Pack (Improved)"), // Replacing 204
  FIRE_MIND_IMPROVED: Isaac.GetItemIdByName("Fire Mind (Improved)"), // Replacing 257
  BOX_OF_SPIDERS_IMPROVED: Isaac.GetItemIdByName("Box of Spiders (Improved)"), // Replacing 288
  HOLY_MANTLE_NERFED: Isaac.GetItemIdByName("Holy Mantle (Nerfed)"), // Replacing 313
  MR_DOLLY_NERFED: Isaac.GetItemIdByName("Mr. Dolly (Nerfed)"), // Replacing 370
  MEGA_BLAST_SINGLE: Isaac.GetItemIdByName("Mega Blast (Single Use)"), // Replacing 414
  ADRENALINE_IMPROVED: Isaac.GetItemIdByName("Adrenaline (Improved)"), // Replacing 493
  POKE_GO_IMPROVED: Isaac.GetItemIdByName("Poke Go (Improved)"), // Replacing 505

  // Custom items
  CLOCKWORK_ASSEMBLY: Isaac.GetItemIdByName("Clockwork Assembly"),
  CHARGING_STATION: Isaac.GetItemIdByName("Charging Station"),
  STRABISMUS: Isaac.GetItemIdByName("Strabismus"),
  U235: Isaac.GetItemIdByName("U-235"),
  CATALOG: Isaac.GetItemIdByName("Catalog"),
} as const;
