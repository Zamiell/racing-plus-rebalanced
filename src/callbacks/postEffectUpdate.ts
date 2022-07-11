import {
  CoinSubType,
  DiceFloorSubType,
  EffectVariant,
  EntityType,
  HeartSubType,
  ItemPoolType,
  ModCallback,
  PickupVariant,
} from "isaac-typescript-definitions";
import {
  getRandomArrayElement,
  isCloseEnoughToTriggerDiceFloor,
  log,
  nextSeed,
  spawnCollectible,
  spawnWithSeed,
} from "isaacscript-common";
import { CreepSubTypeCustom } from "../enums/CreepSubTypeCustom";
import { EffectVariantCustom } from "../enums/EffectVariantCustom";
import g from "../globals";

const ITEM_POOL_TYPES = [
  ItemPoolType.TREASURE, // 0
  ItemPoolType.SHOP, // 1
  ItemPoolType.BOSS, // 2
  ItemPoolType.DEVIL, // 3
  ItemPoolType.ANGEL, // 4
  ItemPoolType.LIBRARY, // 6
];

enum DiceFloorState {
  INITIAL,
  ACTIVATED,
}

export function init(mod: Mod): void {
  mod.AddCallback(
    ModCallback.POST_EFFECT_UPDATE,
    blueFlame,
    EffectVariant.BLUE_FLAME, // 10
  );
  mod.AddCallback(
    ModCallback.POST_EFFECT_UPDATE,
    diceRoomCustom,
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
      creepScaling,
      effectVariant,
    );
  }
}

// EffectVariant.BLUE_FLAME (10)
function blueFlame(effect: EntityEffect) {
  if (effect.FrameCount === 0) {
    effect.Size *= 2; // This increases the hitbox
    effect.CollisionDamage *= 2; // Increased to 46 (from 23)
  }

  // We can also increase the size of the fire to make it look more impressive. This has to be
  // performed on every frame.
  effect.SpriteScale = Vector(1.5, 1.5);
}

// EffectVariant.DICE_FLOOR_CUSTOM
export function diceRoomCustom(effect: EntityEffect): void {
  if (effect.State === (DiceFloorState.ACTIVATED as int)) {
    return;
  }

  if (!isCloseEnoughToTriggerDiceFloor(g.p, effect)) {
    return;
  }

  effect.State = DiceFloorState.ACTIVATED;
  g.p.AnimateHappy();
  log(`Activated a ${effect.SubType}-pip custom dice room.`);

  const dicePipFunction = dicePipFunctions.get(
    effect.SubType as DiceFloorSubType,
  );
  if (dicePipFunction === undefined) {
    return;
  }

  const streakText = dicePipFunction();

  RacingPlusGlobals.run.streakFrame = Isaac.GetFrameCount();
  RacingPlusGlobals.run.streakText = streakText;
}

const dicePipFunctions = new Map<DiceFloorSubType, () => string>();

dicePipFunctions.set(DiceFloorSubType.ONE_PIP, (): string => {
  const effectDescription =
    "Spawn a random item from one of the six item pools";

  const roomSeed = g.r.GetSpawnSeed();

  const randomItemPoolType = getRandomArrayElement(ITEM_POOL_TYPES);

  const collectibleType = g.itemPool.GetCollectible(
    randomItemPoolType,
    true,
    g.r.GetSpawnSeed(),
  );
  const centerPos = g.r.GetCenterPos();
  spawnCollectible(collectibleType, centerPos, roomSeed);

  return effectDescription;
});

dicePipFunctions.set(DiceFloorSubType.TWO_PIP, (): string => {
  g.run.level.doubleItems = true;
  return "Double items for the rest of the floor";
});

dicePipFunctions.set(DiceFloorSubType.THREE_PIP, (): string => {
  spawnPickupsInCircle(3, PickupVariant.COIN, CoinSubType.DIME);
  return "Spawn 3 dimes";
});

dicePipFunctions.set(DiceFloorSubType.FOUR_PIP, (): string => {
  spawnPickupsInCircle(3, PickupVariant.HEART, HeartSubType.SOUL);
  return "Spawn 4 soul hearts";
});

dicePipFunctions.set(DiceFloorSubType.FIVE_PIP, (): string => {
  spawnPickupsInCircle(10, PickupVariant.TRINKET, 0);
  return "Spawn 10 trinkets";
});

dicePipFunctions.set(DiceFloorSubType.SIX_PIP, (): string => {
  spawnPickupsInCircle(10, PickupVariant.TAROT_CARD, 0);
  return "Spawn 6 cards";
});

function spawnPickupsInCircle(
  numToSpawn: int,
  pickupVariant: PickupVariant,
  pickupSubType: int,
) {
  const velocityMultiplier = 4;
  const roomSeed = g.r.GetSpawnSeed();
  const centerPos = g.r.GetCenterPos();

  let seed = roomSeed;
  for (let i = 0; i < numToSpawn; i++) {
    const velocity = Vector(velocityMultiplier, 0);
    const degrees = (360 / numToSpawn) * i;
    const rotatedVelocity = velocity.Rotated(degrees);

    seed = nextSeed(seed);
    spawnWithSeed(
      EntityType.PICKUP,
      pickupVariant,
      pickupSubType,
      centerPos,
      seed,
      rotatedVelocity,
    );
  }
}

export function creepScaling(effect: EntityEffect): void {
  // Ignore the starting room graphic spawned by Racing+.
  if (effect.SubType === (CreepSubTypeCustom.FLOOR_EFFECT_CREEP as int)) {
    return;
  }

  // Make player creep scale with the player's damage.
  effect.CollisionDamage = g.p.Damage;

  // All creep ticks once every 10 frames with the exception of `PLAYER_CREEP_GREEN`, which ticks
  // every frame, so account for this.
  if (effect.Variant === EffectVariant.PLAYER_CREEP_GREEN) {
    effect.CollisionDamage /= 10;
  }
}
