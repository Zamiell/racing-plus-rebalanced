import {
  CacheFlag,
  CollectibleType,
  DamageFlag,
  Direction,
  EffectVariant,
  EntityPartition,
  EntityType,
  ModCallback,
  NullItemID,
  PickupVariant,
  PlayerType,
  RoomType,
  SoundEffect,
  TearVariant,
} from "isaac-typescript-definitions";
import {
  getCollectibleMaxCharges,
  openAllDoors,
  playerHasHealthLeft,
  removeCollectibleFromItemTracker,
  sfxManager,
  spawnEffect,
  spawnTear,
} from "isaacscript-common";
import { CollectibleTypeCustom } from "../enums/CollectibleTypeCustom";
import { TrinketTypeCustom } from "../enums/TrinketTypeCustom";
import g from "../globals";
import * as technology from "../items/technology";
import * as misc from "../misc";
import * as slots from "../slots";
import postUpdateCollectible from "./postUpdateCollectible";

export function init(mod: Mod): void {
  mod.AddCallback(ModCallback.POST_UPDATE, main);
}

function main() {
  recordLastFireDirection();
  checkFamiliarMultiShot();
  postUpdateCollectible();
  slots.postUpdate();

  // Items
  technology.postUpdate(); // 68
  monstrosTooth(); // 86
  momsKnife(); // 114
  nineVolt(); // 116
  theBlackBean(); // 180
  tinyPlanet(); // 233
  isaacsHeart(); // 276
  judasShadow(); // 311
  mongoBaby(); // 322
  fartingBaby(); // 404
  blackPowder(); // 420
  brownNugget(); // 504
  fireMindImproved(); // Replacing 257
  holyMantleNerfed(); // Replacing 313
  adrenalineImproved(); // Replacing 493

  // Trinkets
  pennyOnAString();

  // Pills
  checkPillTimer();
}

function recordLastFireDirection() {
  const fireDirection = g.p.GetFireDirection();
  if (fireDirection !== Direction.NO_DIRECTION) {
    g.run.lastFireDirection = fireDirection;
  }
}

function checkFamiliarMultiShot() {
  if (g.run.familiarMultiShot > 0) {
    g.run.familiarMultiShot -= 1;

    const fakeTear = g.p.FireTear(
      g.p.Position,
      g.run.familiarMultiShotVelocity,
      false,
      true,
      false,
    );
    fakeTear.Remove();
  }
}

// CollectibleType.MONSTROS_TOOTH (86)
function monstrosTooth() {
  const gameFrameCount = g.g.GetFrameCount();
  const roomClear = g.r.IsClear();

  if (g.run.monstroFrame === 0 || gameFrameCount < g.run.monstroFrame) {
    return;
  }

  if (roomClear) {
    // The room might have been cleared since the initial Monstro's Tooth activation. If so, cancel
    // the remaining Monstro's.
    g.run.monstroCounters = 0;
    g.run.monstroFrame = 0;
  } else {
    g.p.UseActiveItem(
      CollectibleType.MONSTROS_TOOTH,
      false,
      false,
      false,
      false,
    );
  }
}

// CollectibleType.MOMS_KNIFE (114)
function momsKnife() {
  if (g.run.knifeCooldownFrames > 0) {
    g.run.knifeCooldownFrames = -1;
  }
}

// CollectibleType.NINE_VOLT (116)
function nineVolt() {
  const gameFrameCount = g.g.GetFrameCount();
  const activeItem = g.p.GetActiveItem();
  const activeItemMaxCharges = getCollectibleMaxCharges(activeItem);

  if (g.run.nineVoltFrame === 0 || gameFrameCount <= g.run.nineVoltFrame) {
    return;
  }
  g.run.nineVoltFrame = 0;

  if (activeItem === CollectibleType.NULL) {
    return;
  }
  let charge = g.p.GetActiveCharge();
  charge += 1;
  if (charge > activeItemMaxCharges) {
    charge = activeItemMaxCharges;
  }
  g.p.SetActiveCharge(charge);
}

// CollectibleType.BLACK_BEAN (180)
function theBlackBean() {
  if (g.run.blackBeanEndFrame === 0) {
    return;
  }

  const gameFrameCount = g.g.GetFrameCount();

  if (gameFrameCount >= g.run.blackBeanEndFrame) {
    g.run.blackBeanEndFrame = 0;
    return;
  }

  // Farting on every frame is very powerful Instead, only fart on every 3rd frame.
  if (gameFrameCount % 3 === 0) {
    g.p.UseActiveItem(CollectibleType.BEAN, false, false, false, false);
  }
}

// CollectibleType.TINY_PLANET (233)
function tinyPlanet() {
  const roomFrameCount = g.r.GetFrameCount();
  const roomType = g.r.GetType();

  if (!g.p.HasCollectible(CollectibleType.TINY_PLANET)) {
    return;
  }

  // Don't check for softlocks in boss rooms.
  if (roomType === RoomType.BOSS) {
    return;
  }

  // Check to see if they have been in the room long enough.
  if (roomFrameCount < 900) {
    // 30 seconds
    return;
  }

  g.run.room.softlock = true;
  g.r.SetClear(true);
  openAllDoors();
}

// CollectibleType.ISAACS_HEART (276)
function isaacsHeart() {
  if (!g.p.HasCollectible(CollectibleType.ISAACS_HEART)) {
    return;
  }

  if (g.p.HasCollectible(CollectibleType.BRIMSTONE)) {
    g.p.RemoveCollectible(CollectibleType.BRIMSTONE);
    removeCollectibleFromItemTracker(CollectibleType.BRIMSTONE);
  }

  if (g.p.HasCollectible(CollectibleType.ANTI_GRAVITY)) {
    g.p.RemoveCollectible(CollectibleType.ANTI_GRAVITY);
    removeCollectibleFromItemTracker(CollectibleType.ANTI_GRAVITY);
  }
}

// CollectibleType.JUDAS_SHADOW (311)
function judasShadow() {
  const character = g.p.GetPlayerType();

  if (!g.run.judasShadow && character === PlayerType.BLACK_JUDAS) {
    g.run.judasShadow = true;
    g.p.AddSoulHearts(-4);
    g.p.AddMaxHearts(2, false);
    g.p.AddHearts(2);
    g.p.AddSoulHearts(1);
  }
}

// CollectibleType.MONGO_BABY (322)
function mongoBaby() {
  const gameFrameCount = g.g.GetFrameCount();

  for (let i = g.run.room.mongoBabyTears.length - 1; i >= 0; i--) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const tear = g.run.room.mongoBabyTears[i]!;
    if (gameFrameCount >= tear.frame) {
      const familiarTear = spawnTear(
        TearVariant.BLUE,
        0,
        tear.familiar.Position,
        tear.velocity,
      );
      familiarTear.Scale = tear.scale;
      familiarTear.CollisionDamage = tear.damage;
      g.run.room.mongoBabyTears.splice(i, 1);
    }
  }
}

// CollectibleType.FARTING_BABY (404)
function fartingBaby() {
  const gameFrameCount = g.g.GetFrameCount();

  // Farting Baby creates shockwaves. (We iterate backwards because we might remove some elements
  // from the table.)
  for (let i = g.run.room.fartingBabyShockwaves.length - 1; i >= 0; i--) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const shockwave = g.run.room.fartingBabyShockwaves[i]!;

    if ((gameFrameCount - shockwave.frame) % 2 === 0) {
      const explosion = Isaac.Spawn(
        EntityType.EFFECT,
        EffectVariant.ROCK_EXPLOSION,
        0,
        shockwave.position,
        ZERO_VECTOR,
        g.p,
      );

      const index = g.r.GetGridIndex(shockwave.position);
      g.r.DestroyGrid(index, true);

      sfxManager.Play(SoundEffect.ROCK_CRUMBLE, 0.5, 0, false, 1);
      // (If the sound effect plays at full volume, it starts to get annoying.)

      // Make the shockwave deal damage to NPCs.
      const entities = Isaac.FindInRadius(
        shockwave.position,
        40,
        EntityPartition.ENEMY,
      );
      for (const entity of entities) {
        const damage = g.p.Damage * 1.5;
        entity.TakeDamage(
          damage,
          DamageFlag.EXPLOSION,
          EntityRef(explosion),
          2,
        );
      }

      shockwave.position = shockwave.position.add(shockwave.velocity);
    }

    // Stop if it gets to a wall.
    if (!g.r.IsPositionInRoom(shockwave.position, 0)) {
      g.run.room.fartingBabyShockwaves.splice(i, 1);
    }
  }
}

// CollectibleType.BLACK_POWDER (420)
function blackPowder() {
  if (!g.p.HasCollectible(CollectibleType.BLACK_POWDER)) {
    return;
  }

  const pentagrams = Isaac.FindByType(
    EntityType.EFFECT,
    EffectVariant.PENTAGRAM_BLACK_POWDER,
    -1,
    false,
    false,
  );
  if (pentagrams.length > 0 && !g.run.blackPowderActive) {
    g.run.blackPowderActive = true;
    g.p.AddCacheFlags(CacheFlag.DAMAGE);
    g.p.EvaluateItems();
  }
  if (pentagrams.length === 0 && g.run.blackPowderActive) {
    g.run.blackPowderActive = false;
    g.p.AddCacheFlags(CacheFlag.DAMAGE);
    g.p.EvaluateItems();
  }
}

// CollectibleType.BROWN_NUGGET (504)
function brownNugget() {
  const gameFrameCount = g.g.GetFrameCount();

  if (g.run.brownNuggetFrame === 0 || gameFrameCount < g.run.brownNuggetFrame) {
    return;
  }

  g.run.brownNuggetCounters += 1;
  g.run.brownNuggetFrame = gameFrameCount + 3;
  g.p.UseActiveItem(CollectibleType.BROWN_NUGGET, false, false, false, false);
  if (g.run.brownNuggetCounters === 9) {
    // We now have spawned 10 familiars in total, because one is already spawned with the initial
    // trigger.
    g.run.brownNuggetCounters = 0;
    g.run.brownNuggetFrame = 0;
  }
}

// CollectibleTypeCustom.FIRE_MIND_IMPROVED (replacing 257)
function fireMindImproved() {
  if (!g.p.HasCollectible(CollectibleTypeCustom.FIRE_MIND_IMPROVED)) {
    return;
  }

  if (!misc.isOnTearBuild()) {
    // Remove the custom Fire Mind item and give back the normal one
    g.p.RemoveCollectible(CollectibleTypeCustom.FIRE_MIND_IMPROVED);
    removeCollectibleFromItemTracker(CollectibleTypeCustom.FIRE_MIND_IMPROVED);
    g.p.AddCollectible(CollectibleType.FIRE_MIND, 0, false);
  }
}

// CollectibleTypeCustom.HOLY_MANTLE_NERFED (replacing 313)
function holyMantleNerfed() {
  if (
    !g.run.holyMantle ||
    !g.p.HasCollectible(CollectibleTypeCustom.HOLY_MANTLE_NERFED)
  ) {
    return;
  }

  // Keep track of whether we lose our Holy Mantle.
  const effects = g.p.GetEffects();
  const numMantleEffects = effects.GetCollectibleEffectNum(
    CollectibleType.HOLY_MANTLE,
  );
  if (numMantleEffects === 0) {
    g.run.holyMantle = false;
  }
}

// CollectibleTypeCustom.ADRENALINE_IMPROVED (replacing 493)
function adrenalineImproved() {
  if (!g.p.HasCollectible(CollectibleTypeCustom.ADRENALINE_IMPROVED)) {
    return;
  }

  if (g.run.health.changedOnThisFrame) {
    g.p.AddCacheFlags(CacheFlag.DAMAGE);
    g.p.EvaluateItems();
  }
}

// TrinketTypeCustom.PENNY_ON_A_STRING
function pennyOnAString() {
  if (!g.p.HasTrinket(TrinketTypeCustom.PENNY_ON_A_STRING)) {
    return;
  }

  const numCoins = g.p.GetNumCoins();
  if (numCoins === g.run.numCoins - 1) {
    g.p.AddCoins(1);
  }

  g.run.numCoins = g.p.GetNumCoins();
}

function checkPillTimer() {
  const gameFrameCount = g.g.GetFrameCount();

  if (
    g.run.pills.superSadness !== 0 &&
    gameFrameCount > g.run.pills.superSadness
  ) {
    g.run.pills.superSadness = 0;
    g.p.AddCacheFlags(CacheFlag.FIRE_DELAY);
    g.p.EvaluateItems();
  }

  if (g.run.pills.invincibility !== 0) {
    if (gameFrameCount + 60 > g.run.pills.invincibility) {
      // 2 seconds before it ends, start to flicker the costume.
      if (gameFrameCount % 2 === 0) {
        g.p.TryRemoveNullCostume(NullItemID.STATUE);
      } else {
        g.p.AddNullCostume(NullItemID.STATUE);
      }
    }

    if (gameFrameCount > g.run.pills.invincibility) {
      g.run.pills.invincibility = 0;
      g.p.TryRemoveNullCostume(NullItemID.STATUE);
    }
  }

  if (g.run.pills.reallyBadGas !== 0) {
    if (gameFrameCount > g.run.pills.reallyBadGas) {
      g.run.pills.reallyBadGas = 0;
    } else {
      // Prevent softlocks that occur if you try to jump into a Big Chest.
      const bigChests = Isaac.FindByType(
        EntityType.PICKUP,
        PickupVariant.BIG_CHEST,
        -1,
        false,
        false,
      );
      if (bigChests.length > 0) {
        return;
      }

      // Prevent dying animation softlocks.
      if (!playerHasHealthLeft(g.p)) {
        return;
      }

      // Constant The Bean effect.
      if (gameFrameCount % 3 === 0) {
        g.p.UseActiveItem(CollectibleType.BEAN, false, false, false, false);
      }
    }
  }

  if (g.run.pills.aether !== 0 && gameFrameCount > g.run.pills.aether) {
    g.run.pills.aether = 0;
  }

  if (
    g.run.pills.wallsHaveEyes !== 0 &&
    gameFrameCount > g.run.pills.wallsHaveEyes
  ) {
    g.run.pills.wallsHaveEyes = 0;
  }

  if (g.run.pills.bladderInfection !== 0) {
    if (gameFrameCount > g.run.pills.bladderInfection) {
      g.run.pills.bladderInfection = 0;
    } else {
      // Constant Lemon Party effect
      const creep = spawnEffect(
        EffectVariant.PLAYER_CREEP_LEMON_MISHAP,
        0,
        g.p.Position,
        ZERO_VECTOR,
        g.p,
      );

      if (creep !== null) {
        creep.Scale = 2;
        creep.SpriteScale = Vector(2, 2);
        const randomNumberBetween1And6 = math.random(6);
        math.randomseed(creep.InitSeed);
        creep
          .GetSprite()
          .Play(`BiggestBlood0${randomNumberBetween1And6}`, true);
        creep.Update();
      }
    }
  }

  if (g.run.pills.scorchedEarth > 0) {
    g.run.pills.scorchedEarth -= 1;

    const position = g.r.GetRandomPosition(1);
    spawnEffect(EffectVariant.HOT_BOMB_FIRE, 0, position);
  }

  if (
    g.run.pills.familiarFrenzy !== 0 &&
    gameFrameCount > g.run.pills.familiarFrenzy
  ) {
    g.run.pills.familiarFrenzy = 0;
  }
}
