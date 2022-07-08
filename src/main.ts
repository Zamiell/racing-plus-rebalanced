import {
  CollectibleType,
  EffectVariant,
  ModCallback,
} from "isaac-typescript-definitions";
import { log, ModUpgraded, upgradeMod } from "isaacscript-common";
import * as entityTakeDmg from "./callbacks/entityTakeDmg";
import * as evaluateCache from "./callbacks/evaluateCache";
import * as executeCmd from "./callbacks/executeCmd";
import * as getCard from "./callbacks/getCard";
import * as getPillColor from "./callbacks/getPillColor";
import * as getPillEffect from "./callbacks/getPillEffect";
import * as postBombUpdate from "./callbacks/postBombUpdate";
import * as postEffectUpdate from "./callbacks/postEffectUpdate";
import * as familiarInit from "./callbacks/postFamiliarInit";
import * as familiarUpdate from "./callbacks/postFamiliarUpdate";
import * as postFireTear from "./callbacks/postFireTear";
import * as postKnifeUpdate from "./callbacks/postKnifeUpdate";
import * as postLaserInit from "./callbacks/postLaserInit";
import * as postLaserUpdate from "./callbacks/postLaserUpdate";
import * as postNPCUpdate from "./callbacks/postNPCUpdate";
import * as postPickupInit from "./callbacks/postPickupInit";
import * as postPickupRender from "./callbacks/postPickupRender";
import * as postPickupUpdate from "./callbacks/postPickupUpdate";
import * as postProjectileUpdate from "./callbacks/postProjectileUpdate";
import * as postRender from "./callbacks/postRender";
import * as postTearUpdate from "./callbacks/postTearUpdate";
import * as postUpdate from "./callbacks/postUpdate";
import * as postUseCard from "./callbacks/postUseCard";
import * as postUseItem from "./callbacks/postUseItem";
import * as usePill from "./callbacks/postUsePill";
import * as preEntitySpawn from "./callbacks/preEntitySpawn";
import * as preFamiliarCollision from "./callbacks/preFamiliarCollision";
import * as preProjectileCollision from "./callbacks/preProjectileCollision";
import * as preTearCollision from "./callbacks/preTearCollision";
import * as preUseItem from "./callbacks/preUseItem";
import * as postGameStartedReordered from "./callbacksCustom/postGameStartedReordered";
import * as postNewLevelReordered from "./callbacksCustom/postNewLevelReordered";
import * as postNewRoomReordered from "./callbacksCustom/postNewRoomReordered";
import { MOD_NAME, VERSION } from "./constants";
import { EffectVariantCustom } from "./enums/EffectVariantCustom";
import * as catalog from "./items/catalog";

main();

function main() {
  const modVanilla = RegisterMod(MOD_NAME, 1);
  const mod = upgradeMod(modVanilla);

  welcomeBanner();
  addCallbacks(mod);
  addCustomCallbacks(mod);
}

function welcomeBanner() {
  const welcomeText = `${MOD_NAME} ${VERSION} initialized.`;
  const hyphens = "-".repeat(welcomeText.length);
  const welcomeTextBorder = `+-${hyphens}-+`;
  log(welcomeTextBorder);
  log(`| ${welcomeText} |`);
  log(welcomeTextBorder);
}

function addCallbacks(mod: Mod) {
  postNPCUpdate.init(mod); // 0
  postUpdate.init(mod); // 1
  postRender.init(mod); // 2
  postUseItem.init(mod); // 3
  postUseCard.init(mod); // 5
  entityTakeDmg.init(mod); // 11

  mod.AddCallback(ModCallback.GET_CARD, getCard.main); // 20
  mod.AddCallback(ModCallback.EXECUTE_CMD, executeCmd.main); // 22
  mod.AddCallback(ModCallback.PRE_ENTITY_SPAWN, preEntitySpawn.main); // 24
  mod.AddCallback(ModCallback.POST_PICKUP_UPDATE, postPickupUpdate.main); // 35
  mod.AddCallback(ModCallback.POST_TEAR_UPDATE, postTearUpdate.main); // 40
  mod.AddCallback(ModCallback.PRE_TEAR_COLLISION, preTearCollision.main); // 42
  mod.AddCallback(
    ModCallback.POST_PROJECTILE_UPDATE,
    postProjectileUpdate.main,
  ); // 44
  mod.AddCallback(
    ModCallback.PRE_PROJECTILE_COLLISION,
    preProjectileCollision.main,
  ); // 46
  mod.AddCallback(ModCallback.POST_LASER_INIT, postLaserInit.main); // 47
  mod.AddCallback(ModCallback.POST_LASER_UPDATE, postLaserUpdate.main); // 48
  mod.AddCallback(ModCallback.POST_KNIFE_UPDATE, postKnifeUpdate.main); // 51
  mod.AddCallback(ModCallback.POST_BOMB_UPDATE, postBombUpdate.main); // 58
  mod.AddCallback(ModCallback.POST_FIRE_TEAR, postFireTear.main); // 61
  mod.AddCallback(ModCallback.GET_PILL_COLOR, getPillColor.main); // 64
  mod.AddCallback(ModCallback.GET_PILL_EFFECT, getPillEffect.main); // 65

  // Define specific familiar update callbacks (6)
  mod.AddCallback(
    ModCallback.FAMILIAR_UPDATE,
    familiarUpdate.leech,
    FamiliarVariant.LEECH, // 56
  );
  mod.AddCallback(
    ModCallback.FAMILIAR_UPDATE,
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
    mod.AddCallback(
      ModCallback.POST_FAMILIAR_UPDATE,
      familiarUpdate.preventStacking,
      familiarVariant,
    );
  }

  // Define specific familiar init callbacks (7)
  mod.AddCallback(
    ModCallback.FAMILIAR_INIT,
    familiarInit.littleChubby,
    FamiliarVariant.LITTLE_CHUBBY, // 3
  );
  mod.AddCallback(
    ModCallback.FAMILIAR_INIT,
    familiarInit.deadBird,
    FamiliarVariant.DEAD_BIRD, // 14
  );
  mod.AddCallback(
    ModCallback.FAMILIAR_INIT,
    familiarInit.deadBird,
    FamiliarVariant.EVES_BIRD_FOOT, // 15
  );
  mod.AddCallback(
    ModCallback.FAMILIAR_INIT,
    familiarInit.daddyLonglegs,
    FamiliarVariant.DADDY_LONGLEGS, // 16
  );
  mod.AddCallback(
    ModCallback.FAMILIAR_INIT,
    familiarInit.sacrificialDagger,
    FamiliarVariant.SACRIFICIAL_DAGGER, // 35
  );
  mod.AddCallback(
    ModCallback.FAMILIAR_INIT,
    familiarInit.leech,
    FamiliarVariant.LEECH, // 56
  );
  mod.AddCallback(
    ModCallback.FAMILIAR_INIT,
    familiarInit.lilHaunt,
    FamiliarVariant.LIL_HAUNT, // 63
  );
  mod.AddCallback(
    ModCallback.FAMILIAR_INIT,
    familiarInit.blueBabysOnlyFriend,
    FamiliarVariant.BLUEBABYS_ONLY_FRIEND, // 77
  );
  mod.AddCallback(
    ModCallback.FAMILIAR_INIT,
    familiarInit.gemini,
    FamiliarVariant.GEMINI, // 79
  );
  mod.AddCallback(
    ModCallback.FAMILIAR_INIT,
    familiarInit.lilGurdy,
    FamiliarVariant.LIL_GURDY, // 87
  );
  mod.AddCallback(
    ModCallback.FAMILIAR_INIT,
    familiarInit.bumbo,
    FamiliarVariant.BUMBO, // 88
  );
  mod.AddCallback(
    ModCallback.FAMILIAR_INIT,
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
    mod.AddCallback(
      ModCallback.FAMILIAR_INIT,
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
    mod.AddCallback(
      ModCallback.FAMILIAR_INIT,
      familiarInit.damage7,
      familiarVariant,
    );
  }

  // Define specific evaluate cache callbacks (8)
  mod.AddCallback(
    ModCallback.EVALUATE_CACHE,
    evaluateCache.damage,
    CacheFlag.DAMAGE, // 1
  );
  mod.AddCallback(
    ModCallback.EVALUATE_CACHE,
    evaluateCache.fireDelay,
    CacheFlag.FIRE_DELAY, // 2
  );
  mod.AddCallback(
    ModCallback.EVALUATE_CACHE,
    evaluateCache.shotSpeed,
    CacheFlag.SHOTSPEED, // 4
  );
  mod.AddCallback(
    ModCallback.EVALUATE_CACHE,
    evaluateCache.speed,
    CacheFlag.SPEED, // 16
  );
  mod.AddCallback(
    ModCallback.EVALUATE_CACHE,
    evaluateCache.luck,
    CacheFlag.LUCK, // 1024
  );

  // Define specific use pill callbacks (10)
  mod.AddCallback(
    ModCallback.USE_PILL,
    usePill.damageUp,
    PillEffectCustom.DAMAGE_UP,
  );
  mod.AddCallback(
    ModCallback.USE_PILL,
    usePill.tearDelayDown,
    PillEffectCustom.TEAR_DELAY_DOWN,
  );
  mod.AddCallback(
    ModCallback.USE_PILL,
    usePill.dealAffinity,
    PillEffectCustom.DEAL_AFFINITY,
  );
  mod.AddCallback(
    ModCallback.USE_PILL,
    usePill.boneAffinity,
    PillEffectCustom.BONE_AFFINITY,
  );
  mod.AddCallback(
    ModCallback.USE_PILL,
    usePill.restock,
    PillEffectCustom.RESTOCK,
  );
  mod.AddCallback(
    ModCallback.USE_PILL,
    usePill.goldenDump,
    PillEffectCustom.GOLDEN_DUMP,
  );
  mod.AddCallback(
    ModCallback.USE_PILL,
    usePill.glimpse,
    PillEffectCustom.GLIMPSE,
  );
  mod.AddCallback(
    ModCallback.USE_PILL,
    usePill.superSadness,
    PillEffectCustom.SUPER_SADNESS,
  );
  mod.AddCallback(
    ModCallback.USE_PILL,
    usePill.invincibility,
    PillEffectCustom.INVINCIBILITY,
  );
  mod.AddCallback(
    ModCallback.USE_PILL,
    usePill.reallyBadGas,
    PillEffectCustom.REALLY_BAD_GAS,
  );
  mod.AddCallback(
    ModCallback.USE_PILL,
    usePill.aether,
    PillEffectCustom.AETHER,
  );
  mod.AddCallback(
    ModCallback.USE_PILL,
    usePill.wallsHaveEyes,
    PillEffectCustom.WALLS_HAVE_EYES,
  );
  mod.AddCallback(
    ModCallback.USE_PILL,
    usePill.bladderInfection,
    PillEffectCustom.BLADDER_INFECTION,
  );
  mod.AddCallback(
    ModCallback.USE_PILL,
    usePill.scorchedEarth,
    PillEffectCustom.SCORCHED_EARTH,
  );
  mod.AddCallback(
    ModCallback.USE_PILL,
    usePill.familiarFrenzy,
    PillEffectCustom.FAMILIAR_FRENZY,
  );
  mod.AddCallback(
    ModCallback.USE_PILL,
    usePill.unlock,
    PillEffectCustom.UNLOCK,
  );

  // Define specific pre-use item callbacks (23)
  mod.AddCallback(
    ModCallback.PRE_USE_ITEM,
    preUseItem.isaacsTears,
    CollectibleType.ISAACS_TEARS, // 323
  );
  mod.AddCallback(
    ModCallback.PRE_USE_ITEM,
    preUseItem.voidItem,
    CollectibleType.VOID, // 477
  );
  mod.AddCallback(
    ModCallback.PRE_USE_ITEM,
    catalog.preUseItem,
    CollectibleTypeCustom.CATALOG,
  );

  // Define specific pre-familiar collision callbacks (26)
  mod.AddCallback(
    ModCallback.PRE_FAMILIAR_COLLISION,
    preFamiliarCollision.momsRazor,
    FamiliarVariant.MOMS_RAZOR, // 117
  );

  // Define specific pickup init callbacks (34)
  mod.AddCallback(
    ModCallback.POST_PICKUP_INIT,
    postPickupInit.tarotCard,
    PickupVariant.TAROTCARD, // 300
  );

  // Define specific pickup update callbacks (35)
  mod.AddCallback(
    ModCallback.POST_PICKUP_UPDATE,
    postPickupUpdate.heart,
    PickupVariant.HEART, // 10
  );
  mod.AddCallback(
    ModCallback.POST_PICKUP_UPDATE,
    postPickupUpdate.pill,
    PickupVariant.PILL, // 70
  );
  mod.AddCallback(
    ModCallback.POST_PICKUP_UPDATE,
    postPickupUpdate.collectible,
    PickupVariant.COLLECTIBLE, // 100
  );

  // Define specific pickup render callbacks (36)
  mod.AddCallback(
    ModCallback.POST_PICKUP_RENDER,
    postPickupRender.collectible,
    PickupVariant.COLLECTIBLE, // 100
  );

  // Define specific post effect update callbacks (55)
  mod.AddCallback(
    ModCallback.POST_EFFECT_UPDATE,
    postEffectUpdate.blueFlame,
    EffectVariant.BLUE_FLAME, // 10
  );
  mod.AddCallback(
    ModCallback.POST_EFFECT_UPDATE,
    postEffectUpdate.diceRoomCustom,
    EffectVariantCustom.DICE_ROOM_FLOOR_CUSTOM,
  );

  const playerCreepEffectVariants = [
    EffectVariant.PLAYER_CREEP_LEMON_MISHAP, // 32 (does 8 damage per tick, ticks every 10 frames)
    EffectVariant.PLAYER_CREEP_HOLY_WATER, // 37 (does 8 damage per tick, ticks every 10 frames)
    EffectVariant.PLAYER_CREEP_RED, // 46 (does 2 damage per tick, ticks every 10 frames)
    // - `EffectVariant.PLAYER_CREEP_WHITE` (44) does not deal damage.
    // - `EffectVariant.PLAYER_CREEP_BLACK` (45) does not deal damage.
    EffectVariant.PLAYER_CREEP_GREEN, // 53 (does 0.35 damage per tick, ticks every 1 frame)
    // (Racing+ replaces green player creep with holy water trail creep, so this entry is
    // superfluous.)
    EffectVariant.PLAYER_CREEP_HOLY_WATER_TRAIL, // 54 (does 2 damage per tick, ticks every 10 frames)
    EffectVariant.PLAYER_CREEP_LEMON_PARTY, // 78 (does 8 damage per tick, ticks every 10 frames)
    // - EffectVariant.PLAYER_CREEP_PUDDLE_MILK (90) does not deal damage.
    // - EffectVariant.PLAYER_CREEP_BLACKPOWDER (92) does not deal damage.
  ];
  for (const effectVariant of playerCreepEffectVariants) {
    mod.AddCallback(
      ModCallback.POST_EFFECT_UPDATE,
      postEffectUpdate.creepScaling,
      effectVariant,
    );
  }
}

function addCustomCallbacks(mod: ModUpgraded) {
  postGameStartedReordered.init(mod);
  postNewLevelReordered.init(mod);
  postNewRoomReordered.init(mod);
}

// TODO
// - remove all "local variables"
// - remove all "null"
// - remove all "math.random"
