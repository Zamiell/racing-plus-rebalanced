import { ZERO_VECTOR } from "../constants";
import g from "../globals";
import * as misc from "../misc";
import { CreepSubTypeCustom } from "../types/enums.custom";

// EffectVariant.BLUE_FLAME (10)
export function blueFlame(effect: EntityEffect): void {
  if (effect.FrameCount === 0) {
    effect.Size *= 2; // This increases the hitbox
    effect.CollisionDamage *= 2; // Increased to 46 (from 23)
  }

  // We can also increase the size of the fire to make it look more impressive
  // This has to be performed on every frame
  effect.SpriteScale = Vector(1.5, 1.5);
}

// EffectVariant.DICE_FLOOR_CUSTOM
export function diceRoomCustom(effect: EntityEffect): void {
  if (effect.State === 1) {
    return;
  }

  const activationDistance = 75; // Determined through trial and error
  if (g.p.Position.Distance(effect.Position) > activationDistance) {
    return;
  }

  effect.State = 1;
  g.p.AnimateHappy();
  Isaac.DebugString(`Activated a ${effect.SubType}-pip custom dice room.`);

  // An "effect.SubType" of 1 will correspond to a 1-pip dice room, and so forth
  const streakText = dicePipFunctions[effect.SubType - 1]();

  RacingPlusGlobals.run.streakFrame = Isaac.GetFrameCount();
  RacingPlusGlobals.run.streakText = streakText;
}

const dicePipFunctions = [
  // 1
  (): string => {
    const effectDescription =
      "Spawn a random item from one of the six item pools";

    // Local variables
    const roomSeed = g.r.GetSpawnSeed();

    math.randomseed(roomSeed);
    const itemPoolTypes = [
      ItemPoolType.POOL_TREASURE, // 0
      ItemPoolType.POOL_SHOP, // 1
      ItemPoolType.POOL_BOSS, // 2
      ItemPoolType.POOL_DEVIL, // 3
      ItemPoolType.POOL_ANGEL, // 4
      ItemPoolType.POOL_LIBRARY, // 6
    ];
    const randomIndex = math.random(0, itemPoolTypes.length - 1);
    const itemPoolType = itemPoolTypes[randomIndex];

    const subType = g.itemPool.GetCollectible(
      itemPoolType,
      true,
      g.r.GetSpawnSeed(),
    );
    g.g.Spawn(
      EntityType.ENTITY_PICKUP,
      PickupVariant.PICKUP_COLLECTIBLE,
      g.r.GetCenterPos(),
      ZERO_VECTOR,
      null,
      subType,
      roomSeed,
    );

    return effectDescription;
  },

  // 2
  (): string => {
    g.run.level.doubleItems = true;
    return "Double items for the rest of the floor";
  },

  // 3
  (): string => {
    spawnPickupsInCircle(3, PickupVariant.PICKUP_COIN, CoinSubType.COIN_DIME);
    return "Spawn 3 dimes";
  },

  // 4
  (): string => {
    spawnPickupsInCircle(
      3,
      PickupVariant.PICKUP_HEART,
      HeartSubType.HEART_SOUL,
    );
    return "Spawn 4 soul hearts";
  },

  // 5
  (): string => {
    spawnPickupsInCircle(10, PickupVariant.PICKUP_TRINKET, 0);
    return "Spawn 10 trinkets";
  },

  // 6
  (): string => {
    spawnPickupsInCircle(10, PickupVariant.PICKUP_TAROTCARD, 0);
    return "Spawn 6 cards";
  },
];

function spawnPickupsInCircle(
  numToSpawn: int,
  pickupVariant: PickupVariant,
  pickupSubType: int,
) {
  // Local variables
  const velocityMultiplier = 4;
  const roomSeed = g.r.GetSpawnSeed();
  const centerPos = g.r.GetCenterPos();

  let seed = roomSeed;
  for (let i = 0; i < numToSpawn; i++) {
    const velocity = Vector(velocityMultiplier, 0);
    const degrees = (360 / numToSpawn) * i;
    const rotatedVelocity = velocity.Rotated(degrees);
    seed = misc.incrementRNG(seed);

    g.g.Spawn(
      EntityType.ENTITY_PICKUP,
      pickupVariant,
      centerPos,
      rotatedVelocity,
      null,
      pickupSubType,
      seed,
    );
  }
}

export function creepScaling(effect: EntityEffect): void {
  // Ignore the starting room graphic spawned by Racing+
  if (effect.SubType === CreepSubTypeCustom.FLOOR_EFFECT_CREEP) {
    return;
  }

  // Make player creep scale with the player's damage
  effect.CollisionDamage = g.p.Damage;

  // All creep ticks once every 10 frames with the exception of PLAYER_CREEP_GREEN,
  // which ticks every frame, so account for this
  if (effect.Variant === EffectVariant.PLAYER_CREEP_GREEN) {
    effect.CollisionDamage /= 10;
  }
}
