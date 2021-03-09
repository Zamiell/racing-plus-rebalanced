import g from "../globals";
import * as technology from "../items/technology";
import * as misc from "../misc";
import * as postItemPickup from "../postItemPickup";
import * as roomCleared from "../roomCleared";
import * as slots from "../slots";
import {
  CollectibleTypeCustom,
  TrinketTypeCustom,
} from "../types/enums.custom";
import postUpdateCollectible from "./postUpdateCollectible";

export function main(): void {
  recordLastFireDirection();
  recordHealth();
  checkRoomCleared();
  checkItemPickup();
  checkTransformations();
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

function recordHealth() {
  g.run.health.changedOnThisFrame = false;
  g.run.health.restoredLastHealthOnThisFrame = false;

  g.run.lastHealth.hearts = g.run.health.hearts;
  const hearts = g.p.GetHearts();
  if (hearts !== g.run.health.hearts) {
    g.run.health.hearts = hearts;
    g.run.health.changedOnThisFrame = true;
  }

  g.run.lastHealth.maxHearts = g.run.health.maxHearts;
  const maxHearts = g.p.GetMaxHearts();
  if (maxHearts !== g.run.health.maxHearts) {
    g.run.health.maxHearts = maxHearts;
    g.run.health.changedOnThisFrame = true;
  }

  g.run.lastHealth.soulHearts = g.run.health.soulHearts;
  const soulHearts = g.p.GetSoulHearts();
  if (soulHearts !== g.run.health.soulHearts) {
    g.run.health.soulHearts = soulHearts;
    g.run.health.changedOnThisFrame = true;
  }

  g.run.lastHealth.blackHearts = g.run.health.blackHearts;
  const blackHearts = g.p.GetBlackHearts();
  if (blackHearts !== g.run.health.blackHearts) {
    g.run.health.blackHearts = blackHearts;
    g.run.health.changedOnThisFrame = true;
  }

  g.run.lastHealth.boneHearts = g.run.health.boneHearts;
  const boneHearts = g.p.GetBoneHearts();
  if (boneHearts !== g.run.health.boneHearts) {
    g.run.health.boneHearts = boneHearts;
    g.run.health.changedOnThisFrame = true;
  }
}

function checkRoomCleared() {
  // Local variables
  const roomClear = g.r.IsClear();

  // Check the clear status of the room and compare it to what it was a frame ago
  if (roomClear === g.run.currentRoomClearState) {
    return;
  }
  g.run.currentRoomClearState = roomClear;
  if (!roomClear) {
    return;
  }

  roomCleared.main();
}

function checkItemPickup() {
  // Local variables
  const roomIndex = misc.getRoomIndex();

  // Only run the below code once per item
  if (g.p.IsItemQueueEmpty()) {
    if (g.run.pickingUpItem !== 0) {
      // Check to see if we need to do something specific after this item is added to our inventory
      if (
        g.run.pickingUpItemType === ItemType.ITEM_PASSIVE || // 1
        g.run.pickingUpItemType === ItemType.ITEM_ACTIVE || // 3
        g.run.pickingUpItemType === ItemType.ITEM_FAMILIAR // 4
      ) {
        const postItemFunction = postItemPickup.functionMap.get(
          g.run.pickingUpItem,
        );
        if (postItemFunction !== undefined) {
          postItemFunction();
        }
      }

      // We have successfully picked up a new item, so clear the existing values
      g.run.pickingUpItem = 0;
      g.run.pickingUpItemRoom = 0;
      g.run.pickingUpItemType = ItemType.ITEM_NULL;
    }

    return;
  }

  // The item queue has one or more items in it
  if (g.run.pickingUpItem === 0) {
    // Record the queued item for later
    g.run.pickingUpItem = g.p.QueuedItem.Item.ID;
    g.run.pickingUpItemRoom = roomIndex;
    g.run.pickingUpItemType = g.p.QueuedItem.Item.Type;
  }
}

function checkTransformations() {
  for (let i = 0; i < PlayerForm.NUM_PLAYER_FORMS; i++) {
    const hasPlayerForm = g.p.HasPlayerForm(i);
    const storedHasPlayerForm = g.run.transformations.get(i);
    if (storedHasPlayerForm === undefined) {
      error(`Failed to get the stored player form for: ${i}`);
    }
    if (hasPlayerForm !== storedHasPlayerForm) {
      g.run.transformations.set(i, hasPlayerForm);

      if (i === PlayerForm.PLAYERFORM_EVIL_ANGEL) {
        // Leviathan
        misc.setHealthFromLastFrame();
        misc.killIfNoHealth();
      }
    }
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

// CollectibleType.COLLECTIBLE_MONSTROS_TOOTH (86)
function monstrosTooth() {
  // Local variables
  const gameFrameCount = g.g.GetFrameCount();
  const roomClear = g.r.IsClear();

  if (g.run.monstroFrame === 0 || gameFrameCount < g.run.monstroFrame) {
    return;
  }

  if (roomClear) {
    // The room might have been cleared since the initial Monstro's Tooth activation
    // If so, cancel the remaining Monstro's
    g.run.monstroCounters = 0;
    g.run.monstroFrame = 0;
  } else {
    g.p.UseActiveItem(
      CollectibleType.COLLECTIBLE_MONSTROS_TOOTH,
      false,
      false,
      false,
      false,
    );
  }
}

// CollectibleType.COLLECTIBLE_MOMS_KNIFE (114)
function momsKnife() {
  if (g.run.knifeCooldownFrames > 0) {
    g.run.knifeCooldownFrames = -1;
  }
}

// CollectibleType.COLLECTIBLE_NINE_VOLT (116)
function nineVolt() {
  // Local variables
  const gameFrameCount = g.g.GetFrameCount();
  const activeItem = g.p.GetActiveItem();

  if (g.run.nineVoltFrame === 0 || gameFrameCount <= g.run.nineVoltFrame) {
    return;
  }
  g.run.nineVoltFrame = 0;

  if (activeItem === 0) {
    return;
  }
  const maxCharges = misc.getItemMaxCharges(activeItem);
  let charge = g.p.GetActiveCharge();
  charge += 1;
  if (charge > maxCharges) {
    charge = maxCharges;
  }
  g.p.SetActiveCharge(charge);
}

// CollectibleType.COLLECTIBLE_BLACK_BEAN (180)
function theBlackBean() {
  if (g.run.blackBeanEndFrame === 0) {
    return;
  }

  // Local variables
  const gameFrameCount = g.g.GetFrameCount();

  if (gameFrameCount >= g.run.blackBeanEndFrame) {
    g.run.blackBeanEndFrame = 0;
    return;
  }

  // Farting on every frame is very powerful
  // Instead, only fart on every 3rd frame
  if (gameFrameCount % 3 === 0) {
    g.p.UseActiveItem(
      CollectibleType.COLLECTIBLE_BEAN,
      false,
      false,
      false,
      false,
    );
  }
}

// CollectibleType.COLLECTIBLE_TINY_PLANET (233)
function tinyPlanet() {
  // Local variables
  const roomFrameCount = g.r.GetFrameCount();
  const roomType = g.r.GetType();

  if (!g.p.HasCollectible(CollectibleType.COLLECTIBLE_TINY_PLANET)) {
    return;
  }

  // Don't check for softlocks in boss rooms
  if (roomType === RoomType.ROOM_BOSS) {
    return;
  }

  // Check to see if they have been in the room long enough
  if (roomFrameCount < 900) {
    // 30 seconds
    return;
  }

  g.run.room.softlock = true;
  g.r.SetClear(true);

  // Open the doors
  for (let i = 0; i <= 7; i++) {
    const door = g.r.GetDoor(i);
    if (door !== null) {
      door.Open();
    }
  }
}

// CollectibleType.COLLECTIBLE_ISAACS_HEART (276)
function isaacsHeart() {
  if (!g.p.HasCollectible(CollectibleType.COLLECTIBLE_ISAACS_HEART)) {
    return;
  }

  if (g.p.HasCollectible(CollectibleType.COLLECTIBLE_BRIMSTONE)) {
    g.p.RemoveCollectible(CollectibleType.COLLECTIBLE_BRIMSTONE);
    Isaac.DebugString("Removing collectible 118 (Brimstone)");
  }

  if (g.p.HasCollectible(CollectibleType.COLLECTIBLE_ANTI_GRAVITY)) {
    g.p.RemoveCollectible(CollectibleType.COLLECTIBLE_ANTI_GRAVITY);
    Isaac.DebugString("Removing collectible 222 (Anti-Gravity)");
  }
}

// CollectibleType.COLLECTIBLE_JUDAS_SHADOW (311)
function judasShadow() {
  // Local variables
  const character = g.p.GetPlayerType();

  if (!g.run.judasShadow && character === PlayerType.PLAYER_BLACKJUDAS) {
    g.run.judasShadow = true;
    g.p.AddSoulHearts(-4);
    g.p.AddMaxHearts(2, false);
    g.p.AddHearts(2);
    g.p.AddSoulHearts(1);
  }
}

// CollectibleType.COLLECTIBLE_MONGO_BABY (322)
function mongoBaby() {
  // Local variables
  const gameFrameCount = g.g.GetFrameCount();

  for (let i = g.run.room.mongoBabyTears.length - 1; i >= 0; i--) {
    const tear = g.run.room.mongoBabyTears[i];
    if (gameFrameCount >= tear.frame) {
      const familiarTear = Isaac.Spawn(
        EntityType.ENTITY_TEAR,
        0,
        0,
        tear.familiar.Position,
        tear.velocity,
        null,
      ).ToTear();
      if (familiarTear !== null) {
        familiarTear.Scale = tear.scale;
        familiarTear.CollisionDamage = tear.damage;
        g.run.room.mongoBabyTears.splice(i, 1);
      }
    }
  }
}

// CollectibleType.COLLECTIBLE_FARTING_BABY (404)
function fartingBaby() {
  // Local variables
  const gameFrameCount = g.g.GetFrameCount();

  // Farting Baby creates shockwaves
  // (we iterate backwards because we might remove some elements from the table)
  for (let i = g.run.room.fartingBabyShockwaves.length - 1; i >= 0; i--) {
    const shockwave = g.run.room.fartingBabyShockwaves[i];

    if ((gameFrameCount - shockwave.frame) % 2 === 0) {
      const explosion = Isaac.Spawn(
        EntityType.ENTITY_EFFECT,
        EffectVariant.ROCK_EXPLOSION,
        0,
        shockwave.position,
        g.zeroVector,
        g.p,
      );

      const index = g.r.GetGridIndex(shockwave.position);
      g.r.DestroyGrid(index, true);

      g.sfx.Play(SoundEffect.SOUND_ROCK_CRUMBLE, 0.5, 0, false, 1); // 137
      // (if the sound effect plays at full volume, it starts to get annoying)

      // Make the shockwave deal damage to NPCs
      const entities = Isaac.FindInRadius(
        shockwave.position,
        40,
        EntityPartition.ENEMY,
      );
      for (const entity of entities) {
        const damage = g.p.Damage * 1.5;
        entity.TakeDamage(
          damage,
          DamageFlag.DAMAGE_EXPLOSION,
          EntityRef(explosion),
          2,
        );
      }

      shockwave.position = shockwave.position.__add(shockwave.velocity);
    }

    // Stop if it gets to a wall
    if (!g.r.IsPositionInRoom(shockwave.position, 0)) {
      g.run.room.fartingBabyShockwaves.splice(i, 1);
    }
  }
}

// CollectibleType.COLLECTIBLE_BLACK_POWDER (420)
function blackPowder() {
  if (!g.p.HasCollectible(CollectibleType.COLLECTIBLE_BLACK_POWDER)) {
    return;
  }

  const pentagrams = Isaac.FindByType(
    EntityType.ENTITY_EFFECT,
    EffectVariant.PENTAGRAM_BLACKPOWDER,
    -1,
    false,
    false,
  );
  if (pentagrams.length > 0 && !g.run.blackPowderActive) {
    g.run.blackPowderActive = true;
    g.p.AddCacheFlags(CacheFlag.CACHE_DAMAGE);
    g.p.EvaluateItems();
  }
  if (pentagrams.length === 0 && g.run.blackPowderActive) {
    g.run.blackPowderActive = false;
    g.p.AddCacheFlags(CacheFlag.CACHE_DAMAGE);
    g.p.EvaluateItems();
  }
}

// CollectibleType.COLLECTIBLE_BROWN_NUGGET (504)
function brownNugget() {
  // Local variables
  const gameFrameCount = g.g.GetFrameCount();

  if (g.run.brownNuggetFrame === 0 || gameFrameCount < g.run.brownNuggetFrame) {
    return;
  }

  g.run.brownNuggetCounters += 1;
  g.run.brownNuggetFrame = gameFrameCount + 3;
  g.p.UseActiveItem(
    CollectibleType.COLLECTIBLE_BROWN_NUGGET,
    false,
    false,
    false,
    false,
  );
  if (g.run.brownNuggetCounters === 9) {
    // We now have spawned 10 familiars in total,
    // because one is already spawned with the initial trigger
    g.run.brownNuggetCounters = 0;
    g.run.brownNuggetFrame = 0;
  }
}

// CollectibleTypeCustom.COLLECTIBLE_FIRE_MIND_IMPROVED (replacing 257)
function fireMindImproved() {
  if (
    !g.p.HasCollectible(CollectibleTypeCustom.COLLECTIBLE_FIRE_MIND_IMPROVED)
  ) {
    return;
  }

  if (!misc.isOnTearBuild()) {
    // Remove the custom Fire Mind item and give back the normal one
    g.p.RemoveCollectible(CollectibleTypeCustom.COLLECTIBLE_FIRE_MIND_IMPROVED);
    Isaac.DebugString(
      `Removing collectible ${CollectibleTypeCustom.COLLECTIBLE_FIRE_MIND_IMPROVED} (Fire Mind Improved)`,
    );
    g.p.AddCollectible(CollectibleType.COLLECTIBLE_FIRE_MIND, 0, false);
  }
}

// CollectibleTypeCustom.COLLECTIBLE_HOLY_MANTLE_NERFED (replacing 313)
function holyMantleNerfed() {
  if (
    !g.run.holyMantle ||
    !g.p.HasCollectible(CollectibleTypeCustom.COLLECTIBLE_HOLY_MANTLE_NERFED)
  ) {
    return;
  }

  // Keep track of whether we lose our Holy Mantle
  const effects = g.p.GetEffects();
  const numMantleEffects = effects.GetCollectibleEffectNum(
    CollectibleType.COLLECTIBLE_HOLY_MANTLE,
  );
  if (numMantleEffects === 0) {
    g.run.holyMantle = false;
  }
}

// CollectibleTypeCustom.COLLECTIBLE_ADRENALINE_IMPROVED (replacing 493)
function adrenalineImproved() {
  if (
    !g.p.HasCollectible(CollectibleTypeCustom.COLLECTIBLE_ADRENALINE_IMPROVED)
  ) {
    return;
  }

  if (g.run.health.changedOnThisFrame) {
    g.p.AddCacheFlags(CacheFlag.CACHE_DAMAGE); // 1
    g.p.EvaluateItems();
  }
}

// TrinketTypeCustom.TRINKET_PENNY_ON_A_STRING
function pennyOnAString() {
  if (!g.p.HasTrinket(TrinketTypeCustom.TRINKET_PENNY_ON_A_STRING)) {
    return;
  }

  const numCoins = g.p.GetNumCoins();
  if (numCoins === g.run.numCoins - 1) {
    g.p.AddCoins(1);
  }

  g.run.numCoins = g.p.GetNumCoins();
}

function checkPillTimer() {
  // Local variables
  const gameFrameCount = g.g.GetFrameCount();

  if (
    g.run.pills.superSadness !== 0 &&
    gameFrameCount > g.run.pills.superSadness
  ) {
    g.run.pills.superSadness = 0;
    g.p.AddCacheFlags(CacheFlag.CACHE_FIREDELAY);
    g.p.EvaluateItems();
  }

  if (g.run.pills.invincibility !== 0) {
    if (gameFrameCount + 60 > g.run.pills.invincibility) {
      // 2 seconds before it ends, start to flicker the costume
      if (gameFrameCount % 2 === 0) {
        g.p.TryRemoveNullCostume(NullItemID.ID_STATUE);
      } else {
        g.p.AddNullCostume(NullItemID.ID_STATUE);
      }
    }

    if (gameFrameCount > g.run.pills.invincibility) {
      g.run.pills.invincibility = 0;
      g.p.TryRemoveNullCostume(NullItemID.ID_STATUE);
    }
  }

  if (g.run.pills.reallyBadGas !== 0) {
    if (gameFrameCount > g.run.pills.reallyBadGas) {
      g.run.pills.reallyBadGas = 0;
    } else {
      // Prevent softlocks that occur if you try to jump into a Big Chest
      const bigChests = Isaac.FindByType(
        EntityType.ENTITY_PICKUP,
        PickupVariant.PICKUP_BIGCHEST,
        -1,
        false,
        false,
      );
      if (bigChests.length > 0) {
        return;
      }

      // Prevent dying animation softlocks
      if (misc.hasNoHealth()) {
        return;
      }

      // Constant The Bean effect
      if (gameFrameCount % 3 === 0) {
        g.p.UseActiveItem(
          CollectibleType.COLLECTIBLE_BEAN,
          false,
          false,
          false,
          false,
        );
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
      const creep = Isaac.Spawn(
        EntityType.ENTITY_EFFECT,
        EffectVariant.PLAYER_CREEP_LEMON_MISHAP,
        0,
        g.p.Position,
        g.zeroVector,
        g.p,
      ).ToEffect();

      if (creep !== null) {
        creep.Scale = 2;
        creep.SpriteScale = Vector(2, 2);
        math.randomseed(creep.InitSeed);
        creep.GetSprite().Play(`BiggestBlood0${math.random(6)}`, true);
        creep.Update();
      }
    }
  }

  if (g.run.pills.scorchedEarth > 0) {
    g.run.pills.scorchedEarth -= 1;

    Isaac.Spawn(
      EntityType.ENTITY_EFFECT,
      EffectVariant.HOT_BOMB_FIRE,
      0,
      g.r.GetRandomPosition(1),
      g.zeroVector,
      null,
    );
  }

  if (
    g.run.pills.familiarFrenzy !== 0 &&
    gameFrameCount > g.run.pills.familiarFrenzy
  ) {
    g.run.pills.familiarFrenzy = 0;
  }
}
