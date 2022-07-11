import {
  CollectibleType,
  EntityFlag,
  EntityType,
  GridEntityType,
  ItemPoolType,
  LevelStage,
  PickupPrice,
  PickupVariant,
  RoomType,
  SlotVariant,
} from "isaac-typescript-definitions";
import {
  doesEntityExist,
  getRandomInt,
  gridCoordinatesToWorldPosition,
  inStartingRoom,
  ModCallbackCustom,
  ModUpgraded,
  newRNG,
  removeAllGridExcept,
  removeAllPickups,
  removeAllSlots,
  spawnCollectible,
  spawnPickup,
  spawnSlotWithSeed,
} from "isaacscript-common";
import { updateCachedAPIFunctions } from "../cache";
import { POKE_GO_EXCEPTION_ENTITIES } from "../constants";
import { EffectVariantCustom } from "../enums/EffectVariantCustom";
import g from "../globals";
import * as technology25 from "../items/technology25";
import { removeAllEntities } from "../misc";
import GlobalsRunRoom from "../types/GlobalsRunRoom";
import { SlotVariantCustom } from "../types/SlotVariantCustom";

export function init(mod: ModUpgraded): void {
  mod.AddCallbackCustom(ModCallbackCustom.POST_NEW_ROOM_REORDERED, main);
}

function main() {
  updateCachedAPIFunctions();
  g.run.room = new GlobalsRunRoom();

  // Rooms
  checkDressingMachine(); // Start room
  checkShopMachine(); // 2
  replaceArcade(); // 9
  replaceCurseRoom(); // 10
  replaceChallengeRoom(); // 11
  replaceRedChestDD(); // 14
  replaceChestRoom(); // 20
  replaceDiceRoom(); // 21

  // Items
  abel(); // 188
  blueMap(); // 246
  holyMantle(); // 313
  pokeGoImproved(); // Replacing 505
  technology25.postNewRoom();

  // Pills
  familiarFrenzy();
}

function checkDressingMachine() {
  if (!inStartingRoom()) {
    return;
  }

  removeAllSlots(SlotVariant.MOMS_DRESSING_TABLE);
}

// RoomType.SHOP (2)
function checkShopMachine() {
  const roomSeed = g.r.GetSpawnSeed();
  const roomType = g.r.GetType();
  const isFirstVisit = g.r.IsFirstVisit();

  if (roomType !== RoomType.SHOP || !isFirstVisit) {
    return;
  }

  const greedExists = doesEntityExist(EntityType.GREED);
  if (greedExists) {
    return;
  }

  removeAllSlots(SlotVariant.SHOP_RESTOCK_MACHINE);

  const position = Vector(200, 160);
  const seed = g.r.GetSpawnSeed();

  // Figure out which machine to spawn.
  const machine = getRandomInt(1, 3, roomSeed);
  switch (machine) {
    case 1: {
      // Spawn a Restock Machine (33% chance).
      spawnSlotWithSeed(SlotVariant.SHOP_RESTOCK_MACHINE, 0, position, seed);
      break;
    }

    case 2: {
      // Spawn a Transmutation Machine (33% chance).
      spawnSlotWithSeed(
        SlotVariantCustom.TRANSMUTATION_MACHINE,
        0,
        position,
        seed,
      );
      break;
    }

    case 3: {
      // 33% of the time, the shop should have no machine.
      break;
    }

    default: {
      error(`Unknown machine case of: ${machine}`);
    }
  }
}

// RoomType.ARCADE (9)
function replaceArcade() {
  const stage = g.l.GetStage();
  const roomType = g.r.GetType();
  const isFirstVisit = g.r.IsFirstVisit();
  const seed = g.r.GetSpawnSeed();
  const rng = newRNG(seed);

  if (roomType !== RoomType.ARCADE) {
    return;
  }

  removeAllGridExcept(
    GridEntityType.WALL, // 15
    GridEntityType.DOOR, // 16
  );

  if (!isFirstVisit) {
    return;
  }

  removeAllEntities();

  spawnSlotWithSeed(
    SlotVariant.BEGGAR,
    0,
    gridCoordinatesToWorldPosition(2, 1),
    rng,
  );

  spawnSlotWithSeed(
    SlotVariant.BLOOD_DONATION_MACHINE,
    0,
    gridCoordinatesToWorldPosition(10, 1),
    rng,
  );

  spawnSlotWithSeed(
    SlotVariantCustom.BOMB_DONATION_MACHINE,
    0,
    gridCoordinatesToWorldPosition(2, 5),
    rng,
  );

  spawnSlotWithSeed(
    SlotVariantCustom.KEY_DONATION_MACHINE,
    0,
    gridCoordinatesToWorldPosition(10, 5),
    rng,
  );

  const roulettePosition =
    stage === LevelStage.WOMB_2
      ? gridCoordinatesToWorldPosition(4, 3)
      : g.r.GetCenterPos();
  spawnSlotWithSeed(SlotVariantCustom.ROULETTE_TABLE, 0, roulettePosition, rng);

  // On Womb 2, also spawn a Holy Machine.
  if (stage === LevelStage.WOMB_2) {
    spawnSlotWithSeed(
      SlotVariantCustom.HOLY_MACHINE,
      0,
      gridCoordinatesToWorldPosition(8, 3),
      rng,
    );
  }
}

// RoomType.CURSE (10)
function replaceCurseRoom() {
  const roomType = g.r.GetType();
  const isFirstVisit = g.r.IsFirstVisit();

  if (roomType !== RoomType.CURSE) {
    return;
  }

  removeAllGridExcept(
    GridEntityType.WALL, // 15
    GridEntityType.DOOR, // 16
  );

  if (!isFirstVisit) {
    return;
  }

  removeAllEntities();
  spawnCurseRoomPedestalItem();
}

export function spawnCurseRoomPedestalItem(): void {
  const centerPos = g.r.GetCenterPos();
  const seed = g.r.GetSpawnSeed();

  // Get a new item from the Curse Room pool.
  const collectibleType = g.itemPool.GetCollectible(
    ItemPoolType.CURSE,
    true,
    seed,
  );
  const collectible = spawnCollectible(collectibleType, centerPos, seed);

  // All Curse Room items should have a price of one red heart container.
  collectible.AutoUpdatePrice = false;
  collectible.Price = PickupPrice.ONE_HEART;
}

// RoomType.CHALLENGE (21)
function replaceChallengeRoom() {
  const roomType = g.r.GetType();
  const isFirstVisit = g.r.IsFirstVisit();

  if (roomType !== RoomType.CHALLENGE) {
    return;
  }

  removeAllGridExcept(
    GridEntityType.WALL, // 15
    GridEntityType.DOOR, // 16
  );

  if (!isFirstVisit) {
    return;
  }

  removeAllEntities();

  // Get a new item from the Treasure Room pool.
  const collectibleType = g.itemPool.GetCollectible(
    ItemPoolType.TREASURE,
    true,
    g.r.GetSpawnSeed(),
  );
  const position = g.r.GetCenterPos();
  spawnCollectible(collectibleType, position);
}

// RoomType.DEVIL (14)
function replaceRedChestDD() {
  const roomDesc = g.l.GetCurrentRoomDesc();
  const roomVariant = roomDesc.Data.Variant;
  const roomType = g.r.GetType();
  const isFirstVisit = g.r.IsFirstVisit();

  if (
    roomType !== RoomType.DEVIL ||
    roomVariant !== 18 || // The devil room with the 10 Red Chests is #18
    !isFirstVisit
  ) {
    return;
  }

  removeAllPickups(PickupVariant.RED_CHEST);

  const position = gridCoordinatesToWorldPosition(6, 4);
  spawnPickup(PickupVariant.SHOP_ITEM, CollectibleType.NULL, position);
  // (We do not care about the seed because it will be replaced on the next frame.)
}

// RoomType.CHEST (20)
function replaceChestRoom() {
  const velocityMultiplier = 8;
  const roomType = g.r.GetType();
  const isFirstVisit = g.r.IsFirstVisit();
  const centerPos = g.r.GetCenterPos();
  const roomSeed = g.r.GetSpawnSeed();
  const numKeys = g.p.GetNumKeys();

  if (roomType !== RoomType.CHEST) {
    return;
  }

  misc.removeAllGridEntities();

  if (!isFirstVisit) {
    return;
  }

  misc.removeAllEntities();

  // Spawn Golden Chests equal to the number of keys held. If under X keys, spawn up to X Gray
  // Chests. (We cannot use the "spawnPickupsInCircle()" function because they are not all the same
  // type of pickup.)
  let numToSpawn = numKeys;
  const numToSpawnMin = 8;
  if (numToSpawn < numToSpawnMin) {
    numToSpawn = numToSpawnMin;
  }
  const numToSpawnMax = 30;
  if (numToSpawn > numToSpawnMax) {
    numToSpawn = numToSpawnMax;
  }

  let seed = roomSeed;
  for (let i = 0; i < numToSpawn; i++) {
    const velocity = Vector(velocityMultiplier, 0);
    const degrees = (360 / numToSpawn) * i;
    const rotatedVelocity = velocity.Rotated(degrees);
    seed = misc.incrementRNG(seed);

    let variant = PickupVariant.LOCKED_CHEST;
    if (i >= numKeys) {
      variant = PickupVariant.CHEST;
    }
    g.g.Spawn(
      EntityType.PICKUP,
      variant,
      centerPos,
      rotatedVelocity,
      null,
      0,
      seed,
    );
  }
}

// RoomType.DICE (21)
function replaceDiceRoom() {
  const roomType = g.r.GetType();
  const isFirstVisit = g.r.IsFirstVisit();

  if (roomType !== RoomType.DICE) {
    return;
  }

  misc.removeAllGridEntities();

  if (g.run.level.usedDiceRoom) {
    return;
  }
  g.run.level.usedDiceRoom = true;

  if (isFirstVisit) {
    misc.removeAllEntities();
  }

  // Figure out what pip to spawn.
  const seed = g.r.GetSpawnSeed();
  math.randomseed(seed);
  const dicePip = math.random(1, 6);
  const diceEffect = Isaac.Spawn(
    EntityType.EFFECT,
    EffectVariantCustom.DICE_ROOM_FLOOR_CUSTOM,
    dicePip, // Use a subtype corresponding to the random dice pip chosen.
    g.r.GetCenterPos(),
    ZERO_VECTOR,
    null,
  );

  // The custom effect will always spawn with a visual pip of 1, so update the sprite.
  diceEffect.GetSprite().Play(dicePip.toString(), true);

  // This is needed so that the entity will not appear on top of the player.
  diceEffect.DepthOffset = -150;
}

// CollectibleType.ABEL (188)
function abel() {
  if (!g.p.HasCollectible(CollectibleType.ABEL)) {
    return;
  }

  // Disable the vanilla shooting behavior
  const abels = Isaac.FindByType(
    EntityType.FAMILIAR,
    FamiliarVariant.ABEL,
    -1,
    false,
    false,
  );
  for (const abelEntity of abels) {
    const familiar = abelEntity.ToFamiliar();
    if (familiar !== null) {
      familiar.FireCooldown = 1000000;
    }
  }
}

// CollectibleType.BLUE_MAP (246)
function blueMap() {
  if (!g.p.HasCollectible(CollectibleType.BLUE_MAP)) {
    return;
  }

  const bossIndex = g.l.QueryRoomTypeIndex(RoomType.BOSS, false, RNG());
  const bossRoom = g.l.GetRoomByIdx(bossIndex);
  if (bossRoom.DisplayFlags === 0) {
    bossRoom.DisplayFlags = 4;
  }
}

// CollectibleType.HOLY_MANTLE (313)
function holyMantle() {
  if (
    !g.run.holyMantle ||
    !g.p.HasCollectible(CollectibleTypeCustom.HOLY_MANTLE_NERFED)
  ) {
    return;
  }

  const effects = g.p.GetEffects();
  effects.AddCollectibleEffect(CollectibleType.HOLY_MANTLE, true);
}

function pokeGoImproved() {
  if (!g.p.HasCollectible(CollectibleTypeCustom.POKE_GO_IMPROVED)) {
    return;
  }

  let targetNPC = null;
  for (const entity of Isaac.GetRoomEntities()) {
    const npc = entity.ToNPC();
    if (
      npc !== null &&
      !npc.IsBoss() &&
      !POKE_GO_EXCEPTION_ENTITIES.includes(npc.Type)
    ) {
      targetNPC = npc;
      break;
    }
  }
  if (targetNPC === null) {
    return;
  }

  targetNPC.AddEntityFlags(EntityFlag.CHARM); // 1 << 8
  targetNPC.AddEntityFlags(EntityFlag.FRIENDLY); // 1 << 29
  targetNPC.AddEntityFlags(EntityFlag.PERSISTENT); // 1 << 37
}

export function familiarFrenzy(): void {
  if (g.run.pills.familiarFrenzy === 0) {
    return;
  }

  let numFamiliars = 10;
  if (g.p.HasCollectible(CollectibleType.PHD)) {
    numFamiliars *= 2;
  }
  for (let i = 0; i < numFamiliars; i++) {
    g.p.UseActiveItem(
      CollectibleType.MONSTER_MANUAL,
      false,
      false,
      false,
      false,
    );
  }
}
