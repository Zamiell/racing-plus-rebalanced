import * as entityTakeDmg from "./callbacks/entityTakeDmg";
import * as evaluateCache from "./callbacks/evaluateCache";
import * as executeCmd from "./callbacks/executeCmd";
import * as familiarInit from "./callbacks/familiarInit";
import * as familiarUpdate from "./callbacks/familiarUpdate";
import * as getCard from "./callbacks/getCard";
import * as getPillColor from "./callbacks/getPillColor";
import * as getPillEffect from "./callbacks/getPillEffect";
import * as NPCUpdate from "./callbacks/NPCUpdate";
import * as postBombUpdate from "./callbacks/postBombUpdate";
import * as postEffectUpdate from "./callbacks/postEffectUpdate";
import * as postFireTear from "./callbacks/postFireTear";
import * as postGameStarted from "./callbacks/postGameStarted";
import * as postKnifeUpdate from "./callbacks/postKnifeUpdate";
import * as postLaserInit from "./callbacks/postLaserInit";
import * as postLaserUpdate from "./callbacks/postLaserUpdate";
import * as postNewLevel from "./callbacks/postNewLevel";
import * as postNewRoom from "./callbacks/postNewRoom";
import * as postPickupInit from "./callbacks/postPickupInit";
import * as postPickupRender from "./callbacks/postPickupRender";
import * as postPickupUpdate from "./callbacks/postPickupUpdate";
import * as postPlayerInit from "./callbacks/postPlayerInit";
import * as postProjectileUpdate from "./callbacks/postProjectileUpdate";
import * as postRender from "./callbacks/postRender";
import * as postTearUpdate from "./callbacks/postTearUpdate";
import * as postUpdate from "./callbacks/postUpdate";
import * as preEntitySpawn from "./callbacks/preEntitySpawn";
import * as preFamiliarCollision from "./callbacks/preFamiliarCollision";
import * as preProjectileCollision from "./callbacks/preProjectileCollision";
import * as preTearCollision from "./callbacks/preTearCollision";
import * as preUseItem from "./callbacks/preUseItem";
import * as useCard from "./callbacks/useCard";
import * as useItem from "./callbacks/useItem";
import * as usePill from "./callbacks/usePill";
import { VERSION } from "./constants";
import * as catalog from "./items/catalog";
import overwriteError from "./overwriteError";
import {
  CollectibleTypeCustom,
  EffectVariantCustom,
  PillEffectCustom,
} from "./types/enums.custom";

// First, prepare special error handling
// (since the vanilla Lua error handling does not work properly)
overwriteError();

const RPRebalanced = RegisterMod("Racing+ Rebalanced", 1);

// Set this mod's version as a global variable to inform other mods that Racing+ Rebalanced exists
declare let RacingPlusRebalancedVersion: string;
RacingPlusRebalancedVersion = VERSION;

// Define miscellaneous callbacks
RPRebalanced.AddCallback(ModCallbacks.MC_NPC_UPDATE, NPCUpdate.main); // 0
RPRebalanced.AddCallback(ModCallbacks.MC_POST_UPDATE, postUpdate.main); // 1
RPRebalanced.AddCallback(ModCallbacks.MC_POST_RENDER, postRender.main); // 2
RPRebalanced.AddCallback(ModCallbacks.MC_USE_ITEM, useItem.main); // 3
RPRebalanced.AddCallback(ModCallbacks.MC_POST_PLAYER_INIT, postPlayerInit.main); // 9
RPRebalanced.AddCallback(ModCallbacks.MC_ENTITY_TAKE_DMG, entityTakeDmg.main); // 11
RPRebalanced.AddCallback(
  ModCallbacks.MC_POST_GAME_STARTED,
  postGameStarted.main,
); // 15
RPRebalanced.AddCallback(ModCallbacks.MC_POST_NEW_LEVEL, postNewLevel.main); // 18
RPRebalanced.AddCallback(ModCallbacks.MC_POST_NEW_ROOM, postNewRoom.main); // 19
RPRebalanced.AddCallback(ModCallbacks.MC_GET_CARD, getCard.main); // 20
RPRebalanced.AddCallback(ModCallbacks.MC_EXECUTE_CMD, executeCmd.main); // 22
RPRebalanced.AddCallback(ModCallbacks.MC_PRE_ENTITY_SPAWN, preEntitySpawn.main); // 24
RPRebalanced.AddCallback(
  ModCallbacks.MC_POST_PICKUP_UPDATE,
  postPickupUpdate.main,
); // 35
RPRebalanced.AddCallback(ModCallbacks.MC_POST_TEAR_UPDATE, postTearUpdate.main); // 40
RPRebalanced.AddCallback(
  ModCallbacks.MC_PRE_TEAR_COLLISION,
  preTearCollision.main,
); // 42
RPRebalanced.AddCallback(
  ModCallbacks.MC_POST_PROJECTILE_UPDATE,
  postProjectileUpdate.main,
); // 44
RPRebalanced.AddCallback(
  ModCallbacks.MC_PRE_PROJECTILE_COLLISION,
  preProjectileCollision.main,
); // 46
RPRebalanced.AddCallback(ModCallbacks.MC_POST_LASER_INIT, postLaserInit.main); // 47
RPRebalanced.AddCallback(
  ModCallbacks.MC_POST_LASER_UPDATE,
  postLaserUpdate.main,
); // 48
RPRebalanced.AddCallback(
  ModCallbacks.MC_POST_KNIFE_UPDATE,
  postKnifeUpdate.main,
); // 51
RPRebalanced.AddCallback(ModCallbacks.MC_POST_BOMB_UPDATE, postBombUpdate.main); // 58
RPRebalanced.AddCallback(ModCallbacks.MC_POST_FIRE_TEAR, postFireTear.main); // 61
RPRebalanced.AddCallback(ModCallbacks.MC_GET_PILL_COLOR, getPillColor.main); // 64
RPRebalanced.AddCallback(ModCallbacks.MC_GET_PILL_EFFECT, getPillEffect.main); // 65

// Define specific use item callbacks (3)
RPRebalanced.AddCallback(
  ModCallbacks.MC_USE_ITEM,
  useItem.bookOfRevelations,
  // CollectibleType.COLLECTIBLE_BOOK_REVELATIONS, // 78
  999,
);
RPRebalanced.AddCallback(
  ModCallbacks.MC_USE_ITEM,
  useItem.theNail,
  CollectibleType.COLLECTIBLE_THE_NAIL, // 83
);
RPRebalanced.AddCallback(
  ModCallbacks.MC_USE_ITEM,
  useItem.monstrosTooth,
  CollectibleType.COLLECTIBLE_MONSTROS_TOOTH, // 86
);
RPRebalanced.AddCallback(
  ModCallbacks.MC_USE_ITEM,
  useItem.bookOfSecrets,
  CollectibleType.COLLECTIBLE_BOOK_OF_SECRETS, // 287
);
RPRebalanced.AddCallback(
  ModCallbacks.MC_USE_ITEM,
  useItem.satanicBible,
  CollectibleType.COLLECTIBLE_SATANIC_BIBLE, // 292
);
RPRebalanced.AddCallback(
  ModCallbacks.MC_USE_ITEM,
  useItem.brownNugget,
  CollectibleType.COLLECTIBLE_BROWN_NUGGET, // 504
);
RPRebalanced.AddCallback(
  ModCallbacks.MC_USE_ITEM,
  useItem.holyPoop,
  CollectibleTypeCustom.COLLECTIBLE_HOLY_POOP, // Replacing 36
);
RPRebalanced.AddCallback(
  ModCallbacks.MC_USE_ITEM,
  useItem.momsBraImproved,
  CollectibleTypeCustom.COLLECTIBLE_MOMS_BRA_IMPROVED, // Replacing 39
);
RPRebalanced.AddCallback(
  ModCallbacks.MC_USE_ITEM,
  useItem.monsterManualImproved,
  CollectibleTypeCustom.COLLECTIBLE_MONSTER_MANUAL_IMPROVED, // Replacing 123
);
RPRebalanced.AddCallback(
  ModCallbacks.MC_USE_ITEM,
  useItem.boxOfSpidersImproved,
  CollectibleTypeCustom.COLLECTIBLE_BOX_OF_SPIDERS_IMPROVED, // Replacing 288
);
RPRebalanced.AddCallback(
  ModCallbacks.MC_USE_ITEM,
  useItem.megaBlastSingle,
  CollectibleTypeCustom.COLLECTIBLE_MEGA_BLAST_SINGLE, // Replacing 441
);
RPRebalanced.AddCallback(
  ModCallbacks.MC_USE_ITEM,
  useItem.clockworkAssembly,
  CollectibleTypeCustom.COLLECTIBLE_CLOCKWORK_ASSEMBLY,
);
RPRebalanced.AddCallback(
  ModCallbacks.MC_USE_ITEM,
  useItem.chargingStation,
  CollectibleTypeCustom.COLLECTIBLE_CHARGING_STATION,
);
RPRebalanced.AddCallback(
  ModCallbacks.MC_USE_ITEM,
  catalog.useItem,
  CollectibleTypeCustom.COLLECTIBLE_CATALOG,
);

// Define specific use card callbacks (5)
RPRebalanced.AddCallback(
  ModCallbacks.MC_USE_CARD,
  useCard.magician,
  Card.CARD_MAGICIAN, // 2
);
RPRebalanced.AddCallback(
  ModCallbacks.MC_USE_CARD,
  useCard.emperor,
  Card.CARD_EMPEROR, // 5
);
RPRebalanced.AddCallback(
  ModCallbacks.MC_USE_CARD,
  useCard.lovers,
  Card.CARD_LOVERS, // 7
);
RPRebalanced.AddCallback(
  ModCallbacks.MC_USE_CARD,
  useCard.wheelOfFortune,
  Card.CARD_WHEEL_OF_FORTUNE, // 11
);
RPRebalanced.AddCallback(
  ModCallbacks.MC_USE_CARD,
  useCard.sun,
  Card.CARD_SUN, // 20
);
RPRebalanced.AddCallback(
  ModCallbacks.MC_USE_CARD,
  useCard.world,
  Card.CARD_WORLD, // 22
);
RPRebalanced.AddCallback(
  ModCallbacks.MC_USE_CARD,
  useCard.ansuz,
  Card.RUNE_ANSUZ, // 36
);

// Define specific familiar update callbacks (6)
RPRebalanced.AddCallback(
  ModCallbacks.MC_FAMILIAR_UPDATE,
  familiarUpdate.leech,
  FamiliarVariant.LEECH, // 56
);
RPRebalanced.AddCallback(
  ModCallbacks.MC_FAMILIAR_UPDATE,
  familiarUpdate.yoListen,
  FamiliarVariant.YO_LISTEN, // 111
);
const preventStackingFamiliarVariants = [
  FamiliarVariant.LITTLE_CHUBBY, // 3
  FamiliarVariant.DEAD_BIRD, // 14
  FamiliarVariant.EVES_BIRD_FOOT, // 15
  FamiliarVariant.LEECH, // 56
  FamiliarVariant.LIL_HAUNT, // 63
  FamiliarVariant.SISSY_LONGLEGS, // 66
  FamiliarVariant.LIL_GURDY, // 87
  FamiliarVariant.BIG_CHUBBY, // 104
];
for (const familiarVariant of preventStackingFamiliarVariants) {
  RPRebalanced.AddCallback(
    ModCallbacks.MC_FAMILIAR_UPDATE,
    familiarUpdate.preventStacking,
    familiarVariant,
  );
}

// Define specific familiar init callbacks (7)
RPRebalanced.AddCallback(
  ModCallbacks.MC_FAMILIAR_INIT,
  familiarInit.littleChubby,
  FamiliarVariant.LITTLE_CHUBBY, // 3
);
RPRebalanced.AddCallback(
  ModCallbacks.MC_FAMILIAR_INIT,
  familiarInit.deadBird,
  FamiliarVariant.DEAD_BIRD, // 14
);
RPRebalanced.AddCallback(
  ModCallbacks.MC_FAMILIAR_INIT,
  familiarInit.deadBird,
  FamiliarVariant.EVES_BIRD_FOOT, // 15
);
RPRebalanced.AddCallback(
  ModCallbacks.MC_FAMILIAR_INIT,
  familiarInit.daddyLonglegs,
  FamiliarVariant.DADDY_LONGLEGS, // 16
);
RPRebalanced.AddCallback(
  ModCallbacks.MC_FAMILIAR_INIT,
  familiarInit.sacrificialDagger,
  FamiliarVariant.SACRIFICIAL_DAGGER, // 35
);
RPRebalanced.AddCallback(
  ModCallbacks.MC_FAMILIAR_INIT,
  familiarInit.leech,
  FamiliarVariant.LEECH, // 56
);
RPRebalanced.AddCallback(
  ModCallbacks.MC_FAMILIAR_INIT,
  familiarInit.lilHaunt,
  FamiliarVariant.LIL_HAUNT, // 63
);
RPRebalanced.AddCallback(
  ModCallbacks.MC_FAMILIAR_INIT,
  familiarInit.blueBabysOnlyFriend,
  FamiliarVariant.BLUEBABYS_ONLY_FRIEND, // 77
);
RPRebalanced.AddCallback(
  ModCallbacks.MC_FAMILIAR_INIT,
  familiarInit.gemini,
  FamiliarVariant.GEMINI, // 79
);
RPRebalanced.AddCallback(
  ModCallbacks.MC_FAMILIAR_INIT,
  familiarInit.lilGurdy,
  FamiliarVariant.LIL_GURDY, // 87
);
RPRebalanced.AddCallback(
  ModCallbacks.MC_FAMILIAR_INIT,
  familiarInit.bumbo,
  FamiliarVariant.BUMBO, // 88
);
RPRebalanced.AddCallback(
  ModCallbacks.MC_FAMILIAR_INIT,
  familiarInit.bigChubby,
  FamiliarVariant.BIG_CHUBBY, // 104
);
const disableVanillaShootingFamiliarVariants = [
  FamiliarVariant.BROTHER_BOBBY, // 1
  FamiliarVariant.LITTLE_GISH, // 4
  FamiliarVariant.LITTLE_STEVEN, // 5
  FamiliarVariant.ROBO_BABY, // 6
  FamiliarVariant.SISTER_MAGGY, // 7
  FamiliarVariant.GHOST_BABY, // 9
  FamiliarVariant.HARLEQUIN_BABY, // 10
  FamiliarVariant.RAINBOW_BABY, // 11
  FamiliarVariant.ISAACS_HEAD, // 12
  FamiliarVariant.MONGO_BABY, // 74
  FamiliarVariant.SERAPHIM, // 92
  FamiliarVariant.LIL_LOKI, // 97
];
for (const familiarVariant of disableVanillaShootingFamiliarVariants) {
  RPRebalanced.AddCallback(
    ModCallbacks.MC_FAMILIAR_INIT,
    familiarInit.disableVanillaShooting,
    familiarVariant,
  );
}
const damage7FamiliarVariants = [
  FamiliarVariant.FOREVER_ALONE, // 30
  FamiliarVariant.DISTANT_ADMIRATION, // 31
  FamiliarVariant.FRIEND_ZONE, // 84
];
for (const familiarVariant of damage7FamiliarVariants) {
  RPRebalanced.AddCallback(
    ModCallbacks.MC_FAMILIAR_INIT,
    familiarInit.damage7,
    familiarVariant,
  );
}

// Define specific evaluate cache callbacks (8)
RPRebalanced.AddCallback(
  ModCallbacks.MC_EVALUATE_CACHE,
  evaluateCache.damage,
  CacheFlag.CACHE_DAMAGE, // 1
);
RPRebalanced.AddCallback(
  ModCallbacks.MC_EVALUATE_CACHE,
  evaluateCache.fireDelay,
  CacheFlag.CACHE_FIREDELAY, // 2
);
RPRebalanced.AddCallback(
  ModCallbacks.MC_EVALUATE_CACHE,
  evaluateCache.shotSpeed,
  CacheFlag.CACHE_SHOTSPEED, // 4
);
RPRebalanced.AddCallback(
  ModCallbacks.MC_EVALUATE_CACHE,
  evaluateCache.speed,
  CacheFlag.CACHE_SPEED, // 16
);
RPRebalanced.AddCallback(
  ModCallbacks.MC_EVALUATE_CACHE,
  evaluateCache.luck,
  CacheFlag.CACHE_LUCK, // 1024
);

// Define specific use pill callbacks (10)
RPRebalanced.AddCallback(
  ModCallbacks.MC_USE_PILL,
  usePill.damageUp,
  PillEffectCustom.PILLEFFECT_DAMAGE_UP,
);
RPRebalanced.AddCallback(
  ModCallbacks.MC_USE_PILL,
  usePill.tearDelayDown,
  PillEffectCustom.PILLEFFECT_TEAR_DELAY_DOWN,
);
RPRebalanced.AddCallback(
  ModCallbacks.MC_USE_PILL,
  usePill.dealAffinity,
  PillEffectCustom.PILLEFFECT_DEAL_AFFINITY,
);
RPRebalanced.AddCallback(
  ModCallbacks.MC_USE_PILL,
  usePill.boneAffinity,
  PillEffectCustom.PILLEFFECT_BONE_AFFINITY,
);
RPRebalanced.AddCallback(
  ModCallbacks.MC_USE_PILL,
  usePill.restock,
  PillEffectCustom.PILLEFFECT_RESTOCK,
);
RPRebalanced.AddCallback(
  ModCallbacks.MC_USE_PILL,
  usePill.goldenDump,
  PillEffectCustom.PILLEFFECT_GOLDEN_DUMP,
);
RPRebalanced.AddCallback(
  ModCallbacks.MC_USE_PILL,
  usePill.glimpse,
  PillEffectCustom.PILLEFFECT_GLIMPSE,
);
RPRebalanced.AddCallback(
  ModCallbacks.MC_USE_PILL,
  usePill.superSadness,
  PillEffectCustom.PILLEFFECT_SUPER_SADNESS,
);
RPRebalanced.AddCallback(
  ModCallbacks.MC_USE_PILL,
  usePill.invincibility,
  PillEffectCustom.PILLEFFECT_INVINCIBILITY,
);
RPRebalanced.AddCallback(
  ModCallbacks.MC_USE_PILL,
  usePill.reallyBadGas,
  PillEffectCustom.PILLEFFECT_REALLY_BAD_GAS,
);
RPRebalanced.AddCallback(
  ModCallbacks.MC_USE_PILL,
  usePill.aether,
  PillEffectCustom.PILLEFFECT_AETHER,
);
RPRebalanced.AddCallback(
  ModCallbacks.MC_USE_PILL,
  usePill.wallsHaveEyes,
  PillEffectCustom.PILLEFFECT_WALLS_HAVE_EYES,
);
RPRebalanced.AddCallback(
  ModCallbacks.MC_USE_PILL,
  usePill.bladderInfection,
  PillEffectCustom.PILLEFFECT_BLADDER_INFECTION,
);
RPRebalanced.AddCallback(
  ModCallbacks.MC_USE_PILL,
  usePill.scorchedEarth,
  PillEffectCustom.PILLEFFECT_SCORCHED_EARTH,
);
RPRebalanced.AddCallback(
  ModCallbacks.MC_USE_PILL,
  usePill.familiarFrenzy,
  PillEffectCustom.PILLEFFECT_FAMILIAR_FRENZY,
);
RPRebalanced.AddCallback(
  ModCallbacks.MC_USE_PILL,
  usePill.unlock,
  PillEffectCustom.PILLEFFECT_UNLOCK,
);

// Define specific pre-use item callbacks (23)
RPRebalanced.AddCallback(
  ModCallbacks.MC_PRE_USE_ITEM,
  preUseItem.isaacsTears,
  CollectibleType.COLLECTIBLE_ISAACS_TEARS, // 323
);
RPRebalanced.AddCallback(
  ModCallbacks.MC_PRE_USE_ITEM,
  preUseItem.voidItem,
  CollectibleType.COLLECTIBLE_VOID, // 477
);
RPRebalanced.AddCallback(
  ModCallbacks.MC_PRE_USE_ITEM,
  catalog.preUseItem,
  CollectibleTypeCustom.COLLECTIBLE_CATALOG,
);

// Define specific pre-familiar collision callbacks (26)
RPRebalanced.AddCallback(
  ModCallbacks.MC_PRE_FAMILIAR_COLLISION,
  preFamiliarCollision.momsRazor,
  FamiliarVariant.MOMS_RAZOR, // 117
);

// Define specific pickup init callbacks (34)
RPRebalanced.AddCallback(
  ModCallbacks.MC_POST_PICKUP_INIT,
  postPickupInit.tarotCard,
  PickupVariant.PICKUP_TAROTCARD, // 300
);

// Define specific pickup update callbacks (35)
RPRebalanced.AddCallback(
  ModCallbacks.MC_POST_PICKUP_UPDATE,
  postPickupUpdate.heart,
  PickupVariant.PICKUP_HEART, // 10
);
RPRebalanced.AddCallback(
  ModCallbacks.MC_POST_PICKUP_UPDATE,
  postPickupUpdate.pill,
  PickupVariant.PICKUP_PILL, // 70
);
RPRebalanced.AddCallback(
  ModCallbacks.MC_POST_PICKUP_UPDATE,
  postPickupUpdate.collectible,
  PickupVariant.PICKUP_COLLECTIBLE, // 100
);

// Define specific pickup render callbacks (36)
RPRebalanced.AddCallback(
  ModCallbacks.MC_POST_PICKUP_RENDER,
  postPickupRender.collectible,
  PickupVariant.PICKUP_COLLECTIBLE, // 100
);

// Define specific post effect update callbacks (55)
RPRebalanced.AddCallback(
  ModCallbacks.MC_POST_EFFECT_UPDATE,
  postEffectUpdate.blueFlame,
  EffectVariant.BLUE_FLAME, // 10
);
RPRebalanced.AddCallback(
  ModCallbacks.MC_POST_EFFECT_UPDATE,
  postEffectUpdate.diceRoomCustom,
  EffectVariantCustom.DICE_ROOM_FLOOR_CUSTOM,
);
const playerCreepEffectVariants = [
  EffectVariant.PLAYER_CREEP_LEMON_MISHAP, // 32 (does 8 damage per tick, ticks every 10 frames)
  EffectVariant.PLAYER_CREEP_HOLYWATER, // 37 (does 8 damage per tick, ticks every 10 frames)
  EffectVariant.PLAYER_CREEP_RED, // 46 (does 2 damage per tick, ticks every 10 frames)
  // EffectVariant.PLAYER_CREEP_WHITE (44) does not deal damage
  // EffectVariant.PLAYER_CREEP_BLACK (45) does not deal damage
  EffectVariant.PLAYER_CREEP_GREEN, // 53 (does 0.35 damage per tick, ticks every 1 frame)
  // (Racing+ replaces green player creep with holy water trail creep, so this entry is superfluous)
  EffectVariant.PLAYER_CREEP_HOLYWATER_TRAIL, // 54 (does 2 damage per tick, ticks every 10 frames)
  EffectVariant.PLAYER_CREEP_LEMON_PARTY, // 78 (does 8 damage per tick, ticks every 10 frames)
  // EffectVariant.PLAYER_CREEP_PUDDLE_MILK (90) does not deal damage
  // EffectVariant.PLAYER_CREEP_BLACKPOWDER (92) does not deal damage
];
for (const effectVariant of playerCreepEffectVariants) {
  RPRebalanced.AddCallback(
    ModCallbacks.MC_POST_EFFECT_UPDATE,
    postEffectUpdate.creepScaling,
    effectVariant,
  );
}

// Welcome banner
const modName = "Racing+ Rebalanced";
const welcomeText = `${modName} ${VERSION} initialized.`;
const hyphens = "-".repeat(welcomeText.length);
const welcomeTextBorder = `+-${hyphens}-+`;
Isaac.DebugString(welcomeTextBorder);
Isaac.DebugString(`| ${welcomeText} |`);
Isaac.DebugString(welcomeTextBorder);
