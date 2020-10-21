import { CollectibleTypeCustom } from "./types/enums.custom";

export const VERSION = "v1.0.10";

export const FAMILIAR_TEAR_DAMAGE = 0.33;
export const FAMILIAR_TEAR_SCALE = 0.5;

// The average build power level should be roughly equivalent to Proptosis
export const ITEM_STARTS = [
  // Big 4
  [CollectibleType.COLLECTIBLE_MOMS_KNIFE], // 114, #1
  [CollectibleType.COLLECTIBLE_IPECAC], // 149, #2
  [CollectibleType.COLLECTIBLE_TECH_X], // 395, #3
  [CollectibleType.COLLECTIBLE_EPIC_FETUS], // 168, #4

  // Single item starts (Treasure Room)
  [CollectibleType.COLLECTIBLE_MAXS_HEAD], // 4, #5
  [CollectibleType.COLLECTIBLE_MAGIC_MUSHROOM], // 12, #6
  [CollectibleType.COLLECTIBLE_DR_FETUS], // 52, #7
  [CollectibleType.COLLECTIBLE_TECHNOLOGY], // 68, #8
  [CollectibleType.COLLECTIBLE_POLYPHEMUS], // 169, #9
  [CollectibleType.COLLECTIBLE_TECH_5], // 244, #10
  [CollectibleType.COLLECTIBLE_20_20], // 245, #11
  [CollectibleType.COLLECTIBLE_PROPTOSIS], // 261, #12
  [CollectibleType.COLLECTIBLE_ISAACS_HEART], // 276, #13
  [CollectibleType.COLLECTIBLE_JUDAS_SHADOW], // 311, #14

  // Single item starts (Devil Room)
  [CollectibleType.COLLECTIBLE_BRIMSTONE], // 118, #15
  [CollectibleType.COLLECTIBLE_MAW_OF_VOID], // 399, #16
  [CollectibleType.COLLECTIBLE_INCUBUS], // 360, #17

  // Single item starts (Angel Room)
  [CollectibleType.COLLECTIBLE_SACRED_HEART], // 182, #18
  [CollectibleType.COLLECTIBLE_GODHEAD], // 331, #19
  [CollectibleType.COLLECTIBLE_CROWN_OF_LIGHT], // 415, #20

  // Double item starts
  [
    // #21
    CollectibleType.COLLECTIBLE_CRICKETS_BODY, // 224
    CollectibleType.COLLECTIBLE_SAD_ONION, // 104
  ],
  [
    // #22
    CollectibleType.COLLECTIBLE_MONSTROS_LUNG, // 229
    CollectibleType.COLLECTIBLE_SAD_ONION, // 453
  ],
  [
    // #23
    CollectibleType.COLLECTIBLE_DEATHS_TOUCH, // 237
    CollectibleType.COLLECTIBLE_SAD_ONION, // 453
  ],
  [
    // #24
    CollectibleType.COLLECTIBLE_DEAD_EYE, // 373
    CollectibleType.COLLECTIBLE_APPLE, // 443
  ],
  [
    // #25
    CollectibleType.COLLECTIBLE_JACOBS_LADDER, // 494
    CollectibleType.COLLECTIBLE_THERES_OPTIONS, // 249
  ],
  [
    // #26
    CollectibleType.COLLECTIBLE_POINTY_RIB, // 544
    CollectibleType.COLLECTIBLE_POINTY_RIB, // 544
  ],

  // Triple item starts
  [
    // #27
    CollectibleType.COLLECTIBLE_CHOCOLATE_MILK, // 69
    CollectibleType.COLLECTIBLE_STEVEN, // 50
    CollectibleType.COLLECTIBLE_SAD_ONION, // 255
  ],
];

export const REMOVED_TRINKETS = [
  TrinketType.TRINKET_PURPLE_HEART, // 5
  TrinketType.TRINKET_ROSARY_BEAD, // 7
  TrinketType.TRINKET_CARTRIDGE, // 8
  TrinketType.TRINKET_PULSE_WORM, // 9
  TrinketType.TRINKET_MOMS_TOENAIL, // 16
  TrinketType.TRINKET_BUTT_PENNY, // 24
  TrinketType.TRINKET_MYSTERIOUS_CANDY, // 25
  TrinketType.TRINKET_HOOK_WORM, // 26
  TrinketType.TRINKET_BROKEN_ANKH, // 28
  TrinketType.TRINKET_UMBILICAL_CORD, // 33
  TrinketType.TRINKET_CHILDS_HEART, // 34
  TrinketType.TRINKET_RUSTED_KEY, // 36
  TrinketType.TRINKET_MATCH_STICK, // 41
  TrinketType.TRINKET_LUCKY_TOE, // 42
  TrinketType.TRINKET_CURSED_SKULL, // 43
  TrinketType.TRINKET_ISAACS_FORK, // 46
  TrinketType.TRINKET_SOUL, // 57
  TrinketType.TRINKET_EVES_BIRD_FOOT, // 60
  TrinketType.TRINKET_SHINY_ROCK, // 62
  TrinketType.TRINKET_RAINBOW_WORM, // 64
  TrinketType.TRINKET_TAPE_WORM, // 65
  TrinketType.TRINKET_LAZY_WORM, // 66
  TrinketType.TRINKET_CRACKED_DICE, // 67
  TrinketType.TRINKET_FADED_POLAROID, // 69
  TrinketType.TRINKET_BOBS_BLADDER, // 71
  TrinketType.TRINKET_STUD_FINDER, // 74
  TrinketType.TRINKET_ERROR, // 75
  TrinketType.TRINKET_POKER_CHIP, // 76
  TrinketType.TRINKET_BLISTER, // 77
  TrinketType.TRINKET_SECOND_HAND, // 78
  TrinketType.TRINKET_BLACK_FEATHER, // 80
  TrinketType.TRINKET_MOMS_LOCKET, // 87
  TrinketType.TRINKET_BROWN_CAP, // 90
  TrinketType.TRINKET_USED_DIAPER, // 93
  TrinketType.TRINKET_OUROBOROS_WORM, // 96
  TrinketType.TRINKET_TONSIL, // 97
  TrinketType.TRINKET_NOSE_GOBLIN, // 98
  TrinketType.TRINKET_EQUALITY, // 103
  TrinketType.TRINKET_BAG_LUNCH, // 105
  TrinketType.TRINKET_LOST_CORK, // 106
  TrinketType.TRINKET_CROW_HEART, // 107
  TrinketType.TRINKET_DUCT_TAPE, // 109
  TrinketType.TRINKET_LOCUST_OF_WRATH, // 113
  TrinketType.TRINKET_BAT_WING, // 118
  TrinketType.TRINKET_STEM_CELL, // 119
  TrinketType.TRINKET_WOODEN_CROSS, // 121
];

// Define the items that will have a price / cost of two red hearts in a Devil Room
export const TWO_HEART_ITEMS = [
  // S Class
  CollectibleType.COLLECTIBLE_MAXS_HEAD, // 4
  CollectibleType.COLLECTIBLE_MAGIC_MUSHROOM, // 12
  CollectibleType.COLLECTIBLE_DR_FETUS, // 52
  CollectibleType.COLLECTIBLE_TECHNOLOGY, // 68
  CollectibleType.COLLECTIBLE_CHOCOLATE_MILK, // 69
  CollectibleType.COLLECTIBLE_MOMS_KNIFE, // 114
  CollectibleType.COLLECTIBLE_BRIMSTONE, // 118
  CollectibleType.COLLECTIBLE_IPECAC, // 149
  CollectibleType.COLLECTIBLE_EPIC_FETUS, // 168
  CollectibleType.COLLECTIBLE_POLYPHEMUS, // 169
  CollectibleType.COLLECTIBLE_SACRED_HEART, // 182
  CollectibleType.COLLECTIBLE_CRICKETS_BODY, // 224
  CollectibleType.COLLECTIBLE_MONSTROS_LUNG, // 229
  CollectibleType.COLLECTIBLE_DEATHS_TOUCH, // 237
  CollectibleType.COLLECTIBLE_TECH_5, // 244
  CollectibleType.COLLECTIBLE_20_20, // 245
  CollectibleType.COLLECTIBLE_PROPTOSIS, // 261
  CollectibleType.COLLECTIBLE_LIL_BRIMSTONE, // 275
  CollectibleType.COLLECTIBLE_ISAACS_HEART, // 276
  CollectibleType.COLLECTIBLE_JUDAS_SHADOW, // 311
  CollectibleType.COLLECTIBLE_GODHEAD, // 331
  CollectibleType.COLLECTIBLE_INCUBUS, // 360
  CollectibleType.COLLECTIBLE_DEAD_EYE, // 373
  CollectibleType.COLLECTIBLE_TECH_X, // 395
  CollectibleType.COLLECTIBLE_MAW_OF_VOID, // 399
  CollectibleType.COLLECTIBLE_CROWN_OF_LIGHT, // 415
  CollectibleType.COLLECTIBLE_JACOBS_LADDER, // 494
  CollectibleTypeCustom.COLLECTIBLE_MUTANT_SPIDER_INNER_EYE, // Custom

  // Mid Tier
  CollectibleType.COLLECTIBLE_PYRO, // 190
  CollectibleType.COLLECTIBLE_ABADDON, // 230
  CollectibleType.COLLECTIBLE_TINY_PLANET, // 233
  CollectibleType.COLLECTIBLE_PURITY, // 407
  CollectibleType.COLLECTIBLE_SUCCUBUS, // 417
  CollectibleTypeCustom.COLLECTIBLE_TECHNOLOGY_2_5, // Custom
];

export const SHOP_PRICES = new Map<
  CollectibleType | CollectibleTypeCustom,
  int
>([
  // Mapping (15 cents)
  [CollectibleType.COLLECTIBLE_COMPASS, 15], // 21
  [CollectibleType.COLLECTIBLE_TREASURE_MAP, 15], // 54
  [CollectibleType.COLLECTIBLE_BLUE_MAP, 15], // 246 (buffed)
  [CollectibleType.COLLECTIBLE_BOOK_OF_SECRETS, 15], // 287

  // Utility (15 cents)
  [CollectibleType.COLLECTIBLE_TELEPORT, 15], // 44
  [CollectibleType.COLLECTIBLE_DADS_KEY, 15], // 175
  [CollectibleType.COLLECTIBLE_BFFS, 15], // 247
  [CollectibleType.COLLECTIBLE_THERES_OPTIONS, 15], // 249
  [CollectibleType.COLLECTIBLE_UNDEFINED, 15], // 324
  [CollectibleType.COLLECTIBLE_DIPLOPIA, 15], // 347
  [CollectibleTypeCustom.COLLECTIBLE_CLOCKWORK_ASSEMBLY, 15],
  [CollectibleTypeCustom.COLLECTIBLE_CATALOG, 15],

  // Utility (10 cents)
  [CollectibleType.COLLECTIBLE_TRANSCENDENCE, 10], // 20
  [CollectibleType.COLLECTIBLE_STEAM_SALE, 10], // 64
  [CollectibleType.COLLECTIBLE_BLANK_CARD, 10], // 286
  [CollectibleType.COLLECTIBLE_BLUE_BOX, 10], // 297
  [CollectibleType.COLLECTIBLE_UNICORN_STUMP, 10], // 298
  [CollectibleType.COLLECTIBLE_PLACEBO, 10], // 348 (buffed)
  [CollectibleType.COLLECTIBLE_CHARGED_BABY, 10], // 372 (buffed)
  [CollectibleType.COLLECTIBLE_RESTOCK, 10], // 376
  [CollectibleType.COLLECTIBLE_VENTRICLE_RAZOR, 10], // 396
  [CollectibleType.COLLECTIBLE_VOID, 10], // 477
  [CollectibleType.COLLECTIBLE_PAUSE, 10], // 478
  [CollectibleType.COLLECTIBLE_POTATO_PEELER, 10], // 487
  [CollectibleType.COLLECTIBLE_EDENS_SOUL, 10], // 490
  [CollectibleType.COLLECTIBLE_MYSTERY_GIFT, 10], // 515
  [CollectibleType.COLLECTIBLE_MOVING_BOX, 10], // 523
  [CollectibleType.COLLECTIBLE_MR_ME, 10], // 527
  [CollectibleType.COLLECTIBLE_SACRIFICIAL_ALTAR, 10], // 536

  // Utility (5 cents)
  [CollectibleType.COLLECTIBLE_BOOK_OF_SHADOWS, 5], // 54
  [CollectibleType.COLLECTIBLE_BATTERY, 5], // 63
  [CollectibleType.COLLECTIBLE_PHD, 5], // 75
  [CollectibleType.COLLECTIBLE_XRAY_VISION, 5], // 76
  [CollectibleType.COLLECTIBLE_DECK_OF_CARDS, 5], // 85
  [CollectibleType.COLLECTIBLE_SPELUNKER_HAT, 5], // 91
  [CollectibleType.COLLECTIBLE_MOMS_BOTTLE_PILLS, 5], // 102
  [CollectibleType.COLLECTIBLE_NINE_VOLT, 5], // 116 (buffed)
  [CollectibleType.COLLECTIBLE_HABIT, 5], // 156
  [CollectibleType.COLLECTIBLE_SHARP_PLUG, 5], // 205
  [CollectibleType.COLLECTIBLE_PIGGY_BANK, 5], // 227 (buffed)
  [CollectibleType.COLLECTIBLE_CONTRACT_FROM_BELOW, 5], // 241
  [CollectibleType.COLLECTIBLE_HIVE_MIND, 5], // 248
  [CollectibleType.COLLECTIBLE_STARTER_DECK, 5], // 251
  [CollectibleType.COLLECTIBLE_LITTLE_BAGGY, 5], // 252
  [CollectibleType.COLLECTIBLE_HOW_TO_JUMP, 5], // 282
  [CollectibleType.COLLECTIBLE_MORE_OPTIONS, 5], // 414
  [CollectibleType.COLLECTIBLE_SACK_HEAD, 5], // 424
  [CollectibleType.COLLECTIBLE_MOMS_BOX, 5], // 439
  [CollectibleType.COLLECTIBLE_POLYDACTYLY, 5], // 454
  [CollectibleType.COLLECTIBLE_BELLY_BUTTON, 5], // 458
  [CollectibleType.COLLECTIBLE_D1, 5], // 476
  [CollectibleType.COLLECTIBLE_SMELTER, 5], // 479
  [CollectibleType.COLLECTIBLE_COMPOST, 5], // 480
  [CollectibleType.COLLECTIBLE_YO_LISTEN, 5], // 492 (buffed)
  [CollectibleType.COLLECTIBLE_COUPON, 5], // 521
  [CollectibleTypeCustom.COLLECTIBLE_FANNY_PACK_IMPROVED, 5],
  [CollectibleTypeCustom.COLLECTIBLE_CHARGING_STATION, 5],
]);

export const FLY_ENTITIES = [
  EntityType.ENTITY_FLY, // 13
  EntityType.ENTITY_POOTER, // 14
  EntityType.ENTITY_ATTACKFLY, // 18
  EntityType.ENTITY_BOOMFLY, // 25
  EntityType.ENTITY_SUCKER, // 61
  EntityType.ENTITY_DUKE, // 67
  EntityType.ENTITY_MOTER, // 80
  // (intentionally skipping Eternal Flies)
  EntityType.ENTITY_FLY_L2, // 214
  EntityType.ENTITY_RING_OF_FLIES, // 222
  EntityType.ENTITY_FULL_FLY, // 249
  EntityType.ENTITY_DART_FLY, // 256
  EntityType.ENTITY_SWARM, // 281
  EntityType.ENTITY_HUSH_FLY, // 296
];

export const SPIDER_ENTITIES = [
  EntityType.ENTITY_HOPPER, // 29
  EntityType.ENTITY_SPIDER, // 85
  EntityType.ENTITY_BIGSPIDER, // 94
  EntityType.ENTITY_WIDOW, // 100
  EntityType.ENTITY_DADDYLONGLEGS, // 101
  EntityType.ENTITY_BABY_LONG_LEGS, // 206
  EntityType.ENTITY_CRAZY_LONG_LEGS, // 207
  EntityType.ENTITY_SPIDER_L2, // 215
  EntityType.ENTITY_WALL_CREEP, // 240
  EntityType.ENTITY_RAGE_CREEP, // 241
  EntityType.ENTITY_BLIND_CREEP, // 242
  EntityType.ENTITY_RAGLING, // 246
  EntityType.ENTITY_TICKING_SPIDER, // 250
  EntityType.ENTITY_BLISTER, // 303
  EntityType.ENTITY_THE_THING, // 304
];

// CollectibleType.COLLECTIBLE_TECHNOLOGY (68)
// We do not want the Technology double laser buff to apply when the player has certain powerful
// items
export const TECHNOLOGY_EXCEPTION_ITEMS = [
  CollectibleType.COLLECTIBLE_DR_FETUS, // 52
  CollectibleType.COLLECTIBLE_MOMS_KNIFE, // 114
  CollectibleType.COLLECTIBLE_BRIMSTONE, // 118
  CollectibleType.COLLECTIBLE_IPECAC, // 149
  CollectibleType.COLLECTIBLE_EPIC_FETUS, // 168
  CollectibleType.COLLECTIBLE_TINY_PLANET, // 233
  CollectibleType.COLLECTIBLE_TECH_X, // 395
];

// CollectibleType.COLLECTIBLE_ISAACS_HEART (276)
// Isaac's Heart is broken with certain other items
export const ISAACS_HEART_BROKEN_ITEMS = [
  CollectibleType.COLLECTIBLE_BRIMSTONE, // 118
  CollectibleType.COLLECTIBLE_LUDOVICO_TECHNIQUE, // 329
  CollectibleType.COLLECTIBLE_MULTIDIMENSIONAL_BABY, // 431
];

// CollectibleType.COLLECTIBLE_POKE_GO (505)
export const POKE_GO_EXCEPTION_ENTITIES = [
  EntityType.ENTITY_SHOPKEEPER, // 17
  EntityType.ENTITY_FIREPLACE, // 33
  EntityType.ENTITY_STONEHEAD, // 42
  EntityType.ENTITY_POKY, // 44
  EntityType.ENTITY_ETERNALFLY, // 96
  EntityType.ENTITY_CONSTANT_STONE_SHOOTER, // 202
  EntityType.ENTITY_BRIMSTONE_HEAD, // 203
  EntityType.ENTITY_SWINGER, // 216
  EntityType.ENTITY_WALL_HUGGER, // 218
  EntityType.ENTITY_GAPING_MAW, // 235
  EntityType.ENTITY_BROKEN_GAPING_MAW, // 236
  EntityType.ENTITY_SWARM, // 281
  EntityType.ENTITY_PITFALL, // 291
];
