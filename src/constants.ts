import {
  CollectibleType,
  EntityType,
  RoomType,
  TrinketType,
} from "isaac-typescript-definitions";
import { CollectibleTypeCustom } from "./enums/CollectibleTypeCustom";

export const MOD_NAME = "Racing+ Rebalanced";

// The version is updated automatically by IsaacScript.
export const VERSION = "v1.1.0";

export const FAMILIAR_TEAR_DAMAGE = 0.33;
export const FAMILIAR_TEAR_SCALE = 0.5;

export const REMOVED_TRINKETS = [
  TrinketType.PURPLE_HEART, // 5
  TrinketType.ROSARY_BEAD, // 7
  TrinketType.CARTRIDGE, // 8
  TrinketType.PULSE_WORM, // 9
  TrinketType.MOMS_TOENAIL, // 16
  TrinketType.BUTT_PENNY, // 24
  TrinketType.MYSTERIOUS_CANDY, // 25
  TrinketType.HOOK_WORM, // 26
  TrinketType.BROKEN_ANKH, // 28
  TrinketType.UMBILICAL_CORD, // 33
  TrinketType.CHILDS_HEART, // 34
  TrinketType.RUSTED_KEY, // 36
  TrinketType.MATCH_STICK, // 41
  TrinketType.LUCKY_TOE, // 42
  TrinketType.CURSED_SKULL, // 43
  TrinketType.ISAACS_FORK, // 46
  TrinketType.SOUL, // 57
  TrinketType.EVES_BIRD_FOOT, // 60
  TrinketType.SHINY_ROCK, // 62
  TrinketType.RAINBOW_WORM, // 64
  TrinketType.TAPE_WORM, // 65
  TrinketType.LAZY_WORM, // 66
  TrinketType.CRACKED_DICE, // 67
  TrinketType.FADED_POLAROID, // 69
  TrinketType.BOBS_BLADDER, // 71
  TrinketType.STUD_FINDER, // 74
  TrinketType.ERROR, // 75
  TrinketType.POKER_CHIP, // 76
  TrinketType.BLISTER, // 77
  TrinketType.SECOND_HAND, // 78
  TrinketType.BLACK_FEATHER, // 80
  TrinketType.MOMS_LOCKET, // 87
  TrinketType.BROWN_CAP, // 90
  TrinketType.USED_DIAPER, // 93
  TrinketType.OUROBOROS_WORM, // 96
  TrinketType.TONSIL, // 97
  TrinketType.NOSE_GOBLIN, // 98
  TrinketType.EQUALITY, // 103
  TrinketType.BAG_LUNCH, // 105
  TrinketType.LOST_CORK, // 106
  TrinketType.CROW_HEART, // 107
  TrinketType.DUCT_TAPE, // 109
  TrinketType.LOCUST_OF_WRATH, // 113
  TrinketType.BAT_WING, // 118
  TrinketType.STEM_CELL, // 119
  TrinketType.WOODEN_CROSS, // 121
];

// Define the items that will have a price / cost of two red hearts in a Devil Room.
export const TWO_HEART_ITEMS = [
  // S Class
  CollectibleType.CRICKETS_HEAD, // 4
  CollectibleType.MAGIC_MUSHROOM, // 12
  CollectibleType.DR_FETUS, // 52
  CollectibleType.TECHNOLOGY, // 68
  CollectibleType.CHOCOLATE_MILK, // 69
  CollectibleType.MOMS_KNIFE, // 114
  CollectibleType.BRIMSTONE, // 118
  CollectibleType.IPECAC, // 149
  CollectibleType.EPIC_FETUS, // 168
  CollectibleType.POLYPHEMUS, // 169
  CollectibleType.SACRED_HEART, // 182
  CollectibleType.CRICKETS_BODY, // 224
  CollectibleType.MONSTROS_LUNG, // 229
  CollectibleType.DEATHS_TOUCH, // 237
  CollectibleType.TECH_5, // 244
  CollectibleType.TWENTY_TWENTY, // 245
  CollectibleType.PROPTOSIS, // 261
  CollectibleType.LIL_BRIMSTONE, // 275
  CollectibleType.ISAACS_HEART, // 276
  CollectibleType.JUDAS_SHADOW, // 311
  CollectibleType.GODHEAD, // 331
  CollectibleType.INCUBUS, // 360
  CollectibleType.DEAD_EYE, // 373
  CollectibleType.TECH_X, // 395
  CollectibleType.MAW_OF_THE_VOID, // 399
  CollectibleType.CROWN_OF_LIGHT, // 415
  CollectibleType.JACOBS_LADDER, // 494
  CollectibleTypeCustom.MUTANT_SPIDER_INNER_EYE, // Custom

  // Mid Tier
  CollectibleType.PYRO, // 190
  CollectibleType.ABADDON, // 230
  CollectibleType.TINY_PLANET, // 233
  CollectibleType.PURITY, // 407
  CollectibleType.SUCCUBUS, // 417
  CollectibleTypeCustom.TECHNOLOGY_2_5, // Custom
];

export const SHOP_PRICES = new Map<CollectibleType, int>([
  // Mapping (15 cents)
  [CollectibleType.COMPASS, 15], // 21
  [CollectibleType.TREASURE_MAP, 15], // 54
  [CollectibleType.BLUE_MAP, 15], // 246 (buffed)
  [CollectibleType.BOOK_OF_SECRETS, 15], // 287

  // Utility (15 cents)
  [CollectibleType.TELEPORT, 15], // 44
  [CollectibleType.DADS_KEY, 15], // 175
  [CollectibleType.BFFS, 15], // 247
  [CollectibleType.THERES_OPTIONS, 15], // 249
  [CollectibleType.UNDEFINED, 15], // 324
  [CollectibleType.DIPLOPIA, 15], // 347
  [CollectibleTypeCustom.CLOCKWORK_ASSEMBLY, 15],
  [CollectibleTypeCustom.CATALOG, 15],

  // Utility (10 cents)
  [CollectibleType.TRANSCENDENCE, 10], // 20
  [CollectibleType.STEAM_SALE, 10], // 64
  [CollectibleType.BLANK_CARD, 10], // 286
  [CollectibleType.BLUE_BOX, 10], // 297
  [CollectibleType.UNICORN_STUMP, 10], // 298
  [CollectibleType.PLACEBO, 10], // 348 (buffed)
  [CollectibleType.CHARGED_BABY, 10], // 372 (buffed)
  [CollectibleType.RESTOCK, 10], // 376
  [CollectibleType.VENTRICLE_RAZOR, 10], // 396
  [CollectibleType.VOID, 10], // 477
  [CollectibleType.PAUSE, 10], // 478
  [CollectibleType.POTATO_PEELER, 10], // 487
  [CollectibleType.EDENS_SOUL, 10], // 490
  [CollectibleType.MYSTERY_GIFT, 10], // 515
  [CollectibleType.MOVING_BOX, 10], // 523
  [CollectibleType.MR_ME, 10], // 527
  [CollectibleType.SACRIFICIAL_ALTAR, 10], // 536

  // Utility (5 cents)
  [CollectibleType.BOOK_OF_SHADOWS, 5], // 54
  [CollectibleType.BATTERY, 5], // 63
  [CollectibleType.PHD, 5], // 75
  [CollectibleType.XRAY_VISION, 5], // 76
  [CollectibleType.DECK_OF_CARDS, 5], // 85
  [CollectibleType.SPELUNKER_HAT, 5], // 91
  [CollectibleType.MOMS_BOTTLE_OF_PILLS, 5], // 102
  [CollectibleType.NINE_VOLT, 5], // 116 (buffed)
  [CollectibleType.HABIT, 5], // 156
  [CollectibleType.SHARP_PLUG, 5], // 205
  [CollectibleType.PIGGY_BANK, 5], // 227 (buffed)
  [CollectibleType.CONTRACT_FROM_BELOW, 5], // 241
  [CollectibleType.HIVE_MIND, 5], // 248
  [CollectibleType.STARTER_DECK, 5], // 251
  [CollectibleType.LITTLE_BAGGY, 5], // 252
  [CollectibleType.HOW_TO_JUMP, 5], // 282
  [CollectibleType.MORE_OPTIONS, 5], // 414
  [CollectibleType.SACK_HEAD, 5], // 424
  [CollectibleType.MOMS_BOX, 5], // 439
  [CollectibleType.POLYDACTYLY, 5], // 454
  [CollectibleType.BELLY_BUTTON, 5], // 458
  [CollectibleType.D1, 5], // 476
  [CollectibleType.SMELTER, 5], // 479
  [CollectibleType.COMPOST, 5], // 480
  [CollectibleType.YO_LISTEN, 5], // 492 (buffed)
  [CollectibleType.COUPON, 5], // 521
  [CollectibleTypeCustom.FANNY_PACK_IMPROVED, 5],
  [CollectibleTypeCustom.CHARGING_STATION, 5],
]);

export const FLY_ENTITIES = [
  EntityType.FLY, // 13
  EntityType.POOTER, // 14
  EntityType.ATTACK_FLY, // 18
  EntityType.BOOM_FLY, // 25
  EntityType.SUCKER, // 61
  EntityType.DUKE, // 67
  EntityType.MOTER, // 80
  // We intentionally skip Eternal Flies.
  EntityType.FLY_L2, // 214
  EntityType.RING_OF_FLIES, // 222
  EntityType.FULL_FLY, // 249
  EntityType.DART_FLY, // 256
  EntityType.SWARM, // 281
  EntityType.HUSH_FLY, // 296
];

export const SPIDER_ENTITIES = [
  EntityType.HOPPER, // 29
  EntityType.SPIDER, // 85
  EntityType.BIG_SPIDER, // 94
  EntityType.WIDOW, // 100
  EntityType.DADDY_LONG_LEGS, // 101
  EntityType.BABY_LONG_LEGS, // 206
  EntityType.CRAZY_LONG_LEGS, // 207
  EntityType.SPIDER_L2, // 215
  EntityType.WALL_CREEP, // 240
  EntityType.RAGE_CREEP, // 241
  EntityType.BLIND_CREEP, // 242
  EntityType.RAGLING, // 246
  EntityType.TICKING_SPIDER, // 250
  EntityType.BLISTER, // 303
  EntityType.THE_THING, // 304
];

// CollectibleType.TECHNOLOGY (68)
// We do not want the Technology double laser buff to apply when the player has certain powerful
// items.
export const TECHNOLOGY_EXCEPTION_ITEMS = [
  CollectibleType.DR_FETUS, // 52
  CollectibleType.MOMS_KNIFE, // 114
  CollectibleType.BRIMSTONE, // 118
  CollectibleType.IPECAC, // 149
  CollectibleType.EPIC_FETUS, // 168
  CollectibleType.TINY_PLANET, // 233
  CollectibleType.TECH_X, // 395
];

// CollectibleType.ISAACS_HEART (276)
// Isaac's Heart is broken with certain other items.
export const ISAACS_HEART_BROKEN_COLLECTIBLES = [
  CollectibleType.BRIMSTONE, // 118
  CollectibleType.RUBBER_CEMENT, // 221
  CollectibleType.LUDOVICO_TECHNIQUE, // 329
  CollectibleType.MULTIDIMENSIONAL_BABY, // 431
];

// CollectibleType.POKE_GO (505)
export const POKE_GO_EXCEPTION_ENTITIES = [
  EntityType.SHOPKEEPER, // 17
  EntityType.FIREPLACE, // 33
  EntityType.GRIMACE, // 42
  EntityType.POKY, // 44
  EntityType.ETERNAL_FLY, // 96
  EntityType.CONSTANT_STONE_SHOOTER, // 202
  EntityType.BRIMSTONE_HEAD, // 203
  EntityType.SWINGER, // 216
  EntityType.WALL_HUGGER, // 218
  EntityType.GAPING_MAW, // 235
  EntityType.BROKEN_GAPING_MAW, // 236
  EntityType.SWARM, // 281
  EntityType.PITFALL, // 291
];

export const CATALOG_ITEM_PRICE = 10;
export const CATALOG_ILLEGAL_ROOM_TYPES = [
  RoomType.SHOP, // 2
  RoomType.CURSE, // 10
  RoomType.DEVIL, // 14
  RoomType.ANGEL, // 15
  RoomType.BLACK_MARKET, // 22
];
