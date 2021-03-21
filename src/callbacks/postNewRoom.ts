import { POKE_GO_EXCEPTION_ENTITIES, ZERO_VECTOR } from "../constants";
import g from "../globals";
import * as technology25 from "../items/technology25";
import * as misc from "../misc";
import {
  CollectibleTypeCustom,
  EffectVariantCustom,
  SlotVariantCustom,
} from "../types/enums.custom";
import GlobalsRunRoom from "../types/GlobalsRunRoom";

export function main(): void {
  // Update some cached API functions to avoid crashing
  g.l = g.g.GetLevel();
  g.r = g.g.GetRoom();
  const player = Isaac.GetPlayer(0);
  if (player !== null) {
    g.p = player;
  }
  g.seeds = g.g.GetSeeds();
  g.itemPool = g.g.GetItemPool();

  // Local variables
  const gameFrameCount = g.g.GetFrameCount();
  const stage = g.l.GetStage();
  const stageType = g.l.GetStageType();

  // Make sure the callbacks run in the right order
  // (naturally, PostNewRoom gets called before the PostNewLevel && PostGameStarted callbacks)
  if (
    gameFrameCount === 0 ||
    g.run.level.stage !== stage ||
    g.run.level.stageType !== stageType
  ) {
    return;
  }

  newRoom();
}

export function newRoom(): void {
  // Local variables
  const roomClear = g.r.IsClear();

  g.run.room = new GlobalsRunRoom(roomClear);

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
  // Local variables
  const roomIndex = misc.getRoomIndex();
  const startingRoomIndex = g.l.GetStartingRoomIndex();

  if (roomIndex !== startingRoomIndex) {
    return;
  }

  misc.removeSpecificEntities(
    EntityType.ENTITY_SLOT,
    SlotVariant.MOMS_DRESSING_TABLE,
  );
}

// RoomType.ROOM_SHOP (2)
function checkShopMachine() {
  // Local variables
  const roomSeed = g.r.GetSpawnSeed();
  const roomType = g.r.GetType();
  const isFirstVisit = g.r.IsFirstVisit();

  if (roomType !== RoomType.ROOM_SHOP || !isFirstVisit) {
    return;
  }

  const greeds = Isaac.FindByType(
    EntityType.ENTITY_GREED,
    -1,
    -1,
    false,
    false,
  );
  if (greeds.length > 0) {
    return;
  }

  misc.removeSpecificEntities(
    EntityType.ENTITY_SLOT,
    SlotVariant.SHOP_RESTOCK_MACHINE,
  );

  // Figure out which machine to spawn
  math.randomseed(roomSeed);
  const machine = math.random(1, 3);
  switch (machine) {
    case 1: {
      // Spawn a Restock Machine (33% chance)
      g.g.Spawn(
        EntityType.ENTITY_SLOT,
        SlotVariant.SHOP_RESTOCK_MACHINE,
        Vector(200, 160),
        ZERO_VECTOR,
        null,
        0,
        g.r.GetSpawnSeed(),
      );
      break;
    }

    case 2: {
      // Spawn a Transmutation Machine (33% chance)
      g.g.Spawn(
        EntityType.ENTITY_SLOT,
        SlotVariantCustom.TRANSMUTATION_MACHINE,
        Vector(200, 160),
        ZERO_VECTOR,
        null,
        0,
        g.r.GetSpawnSeed(),
      );

      break;
    }

    case 3: {
      // 33% of the time, the shop should have no machine
      break;
    }

    default: {
      error(`Unknown machine case of: ${machine}`);
    }
  }
}

// RoomType.ROOM_ARCADE (9)
function replaceArcade() {
  // Local variables
  const stage = g.l.GetStage();
  const roomType = g.r.GetType();
  const isFirstVisit = g.r.IsFirstVisit();

  if (roomType !== RoomType.ROOM_ARCADE) {
    return;
  }

  misc.removeAllGridEntities();

  if (!isFirstVisit) {
    return;
  }

  misc.removeAllEntities();

  Isaac.Spawn(
    EntityType.ENTITY_SLOT,
    SlotVariant.BEGGAR,
    0,
    misc.gridToPos(2, 1),
    ZERO_VECTOR,
    null,
  );

  Isaac.Spawn(
    EntityType.ENTITY_SLOT,
    SlotVariant.BLOOD_DONATION_MACHINE,
    0,
    misc.gridToPos(10, 1),
    ZERO_VECTOR,
    null,
  );

  Isaac.Spawn(
    EntityType.ENTITY_SLOT,
    SlotVariantCustom.BOMB_DONATION_MACHINE,
    0,
    misc.gridToPos(2, 5),
    ZERO_VECTOR,
    null,
  );

  Isaac.Spawn(
    EntityType.ENTITY_SLOT,
    SlotVariantCustom.KEY_DONATION_MACHINE,
    0,
    misc.gridToPos(10, 5),
    ZERO_VECTOR,
    null,
  );

  let roulettePosition = g.r.GetCenterPos();
  if (stage === 8) {
    roulettePosition = misc.gridToPos(4, 3);
  }

  Isaac.Spawn(
    EntityType.ENTITY_SLOT,
    SlotVariantCustom.ROULETTE_TABLE,
    0,
    roulettePosition,
    ZERO_VECTOR,
    null,
  );

  // On Womb 2, also spawn a Holy Machine
  if (stage === 8) {
    Isaac.Spawn(
      EntityType.ENTITY_SLOT,
      SlotVariantCustom.HOLY_MACHINE,
      0,
      misc.gridToPos(8, 3),
      ZERO_VECTOR,
      null,
    );
  }
}

// RoomType.ROOM_CURSE (10)
function replaceCurseRoom() {
  // Local variables
  const roomType = g.r.GetType();
  const isFirstVisit = g.r.IsFirstVisit();

  if (roomType !== RoomType.ROOM_CURSE) {
    return;
  }

  misc.removeAllGridEntities();

  if (!isFirstVisit) {
    return;
  }

  misc.removeAllEntities();
  spawnCurseRoomPedestalItem();
}

export function spawnCurseRoomPedestalItem(): void {
  // Local variables
  const centerPos = g.r.GetCenterPos();

  // Get a new item from the Curse Room pool
  const subType = g.itemPool.GetCollectible(
    ItemPoolType.POOL_CURSE,
    true,
    g.r.GetSpawnSeed(),
  ); // 12
  const collectible = Isaac.Spawn(
    EntityType.ENTITY_PICKUP,
    PickupVariant.PICKUP_COLLECTIBLE,
    subType,
    centerPos,
    ZERO_VECTOR,
    null,
  ).ToPickup();
  if (collectible !== null) {
    collectible.AutoUpdatePrice = false;
    collectible.Price = -1; // All Curse Room items should have a price of one red heart container
  }
}

// RoomType.ROOM_CHALLENGE (21)
function replaceChallengeRoom() {
  // Local variables
  const roomType = g.r.GetType();
  const isFirstVisit = g.r.IsFirstVisit();

  if (roomType !== RoomType.ROOM_CHALLENGE) {
    return;
  }

  misc.removeAllGridEntities();

  if (!isFirstVisit) {
    return;
  }

  misc.removeAllEntities();

  // Get a new item from the Treasure Room pool
  const subType = g.itemPool.GetCollectible(
    ItemPoolType.POOL_TREASURE,
    true,
    g.r.GetSpawnSeed(),
  );
  Isaac.Spawn(
    EntityType.ENTITY_PICKUP,
    PickupVariant.PICKUP_COLLECTIBLE,
    subType,
    g.r.GetCenterPos(),
    ZERO_VECTOR,
    null,
  ).ToPickup();
}

// RoomType.ROOM_DEVIL (14)
function replaceRedChestDD() {
  // Local variables
  const roomDesc = g.l.GetCurrentRoomDesc();
  const roomVariant = roomDesc.Data.Variant;
  const roomType = g.r.GetType();
  const isFirstVisit = g.r.IsFirstVisit();

  if (
    roomType !== RoomType.ROOM_DEVIL ||
    roomVariant !== 18 || // The devil room with the 10 Red Chests is #18
    !isFirstVisit
  ) {
    return;
  }

  misc.removeSpecificEntities(
    EntityType.ENTITY_PICKUP,
    PickupVariant.PICKUP_REDCHEST,
  );

  Isaac.Spawn(
    EntityType.ENTITY_PICKUP,
    PickupVariant.PICKUP_SHOPITEM,
    0,
    misc.gridToPos(6, 4),
    ZERO_VECTOR,
    null,
  );
  // (we do not care about the seed because it will be replaced on the next frame)
}

// RoomType.ROOM_CHEST (20)
function replaceChestRoom() {
  // Local variables
  const velocityMultiplier = 8;
  const roomType = g.r.GetType();
  const isFirstVisit = g.r.IsFirstVisit();
  const centerPos = g.r.GetCenterPos();
  const roomSeed = g.r.GetSpawnSeed();
  const numKeys = g.p.GetNumKeys();

  if (roomType !== RoomType.ROOM_CHEST) {
    return;
  }

  misc.removeAllGridEntities();

  if (!isFirstVisit) {
    return;
  }

  misc.removeAllEntities();

  // Spawn Golden Chests equal to the number of keys held
  // If under X keys, spawn up to X Gray Chests
  // (we cannot use the "spawnPickupsInCircle()" function because they are not all the same type of
  // pickup)
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

    let variant = PickupVariant.PICKUP_LOCKEDCHEST;
    if (i >= numKeys) {
      variant = PickupVariant.PICKUP_CHEST;
    }
    g.g.Spawn(
      EntityType.ENTITY_PICKUP,
      variant,
      centerPos,
      rotatedVelocity,
      null,
      0,
      seed,
    );
  }
}

// RoomType.ROOM_DICE (21)
function replaceDiceRoom() {
  // Local variables
  const roomType = g.r.GetType();
  const isFirstVisit = g.r.IsFirstVisit();

  if (roomType !== RoomType.ROOM_DICE) {
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

  // Figure out what pip to spawn
  math.randomseed(g.r.GetSpawnSeed());
  const dicePip = math.random(1, 6);
  const diceEffect = Isaac.Spawn(
    EntityType.ENTITY_EFFECT,
    EffectVariantCustom.DICE_ROOM_FLOOR_CUSTOM,
    dicePip, // Use a subtype corresponding to the random dice pip chosen
    g.r.GetCenterPos(),
    ZERO_VECTOR,
    null,
  );

  // The custom effect will always spawn with a visual pip of 1, so update the sprite
  diceEffect.GetSprite().Play(dicePip.toString(), true);

  // This is needed so that the entity will not appear on top of the player
  diceEffect.DepthOffset = -150;
}

// CollectibleType.COLLECTIBLE_ABEL (188)
function abel() {
  if (!g.p.HasCollectible(CollectibleType.COLLECTIBLE_ABEL)) {
    return;
  }

  // Disable the vanilla shooting behavior
  const abels = Isaac.FindByType(
    EntityType.ENTITY_FAMILIAR,
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

// CollectibleType.COLLECTIBLE_BLUE_MAP (246)
function blueMap() {
  if (!g.p.HasCollectible(CollectibleType.COLLECTIBLE_BLUE_MAP)) {
    return;
  }

  const bossIndex = g.l.QueryRoomTypeIndex(RoomType.ROOM_BOSS, false, RNG());
  const bossRoom = g.l.GetRoomByIdx(bossIndex);
  if (bossRoom.DisplayFlags === 0) {
    bossRoom.DisplayFlags = 4;
  }
}

// CollectibleType.COLLECTIBLE_HOLY_MANTLE (313)
function holyMantle() {
  if (
    !g.run.holyMantle ||
    !g.p.HasCollectible(CollectibleTypeCustom.COLLECTIBLE_HOLY_MANTLE_NERFED)
  ) {
    return;
  }

  const effects = g.p.GetEffects();
  effects.AddCollectibleEffect(CollectibleType.COLLECTIBLE_HOLY_MANTLE, true);
}

function pokeGoImproved() {
  if (!g.p.HasCollectible(CollectibleTypeCustom.COLLECTIBLE_POKE_GO_IMPROVED)) {
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

  targetNPC.AddEntityFlags(EntityFlag.FLAG_CHARM); // 1 << 8
  targetNPC.AddEntityFlags(EntityFlag.FLAG_FRIENDLY); // 1 << 29
  targetNPC.AddEntityFlags(EntityFlag.FLAG_PERSISTENT); // 1 << 37
}

export function familiarFrenzy(): void {
  if (g.run.pills.familiarFrenzy === 0) {
    return;
  }

  let numFamiliars = 10;
  if (g.p.HasCollectible(CollectibleType.COLLECTIBLE_PHD)) {
    numFamiliars *= 2;
  }
  for (let i = 0; i < numFamiliars; i++) {
    g.p.UseActiveItem(
      CollectibleType.COLLECTIBLE_MONSTER_MANUAL,
      false,
      false,
      false,
      false,
    );
  }
}
