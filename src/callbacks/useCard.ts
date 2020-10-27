import g from "../globals";
import * as misc from "../misc";
import * as path from "../path";
import { CollectibleTypeCustom } from "../types/enums.custom";

// Card.CARD_MAGICIAN (2)
export function magician(): void {
  if (!g.p.HasCollectible(CollectibleTypeCustom.COLLECTIBLE_TECHNOLOGY_2_5)) {
    return;
  }

  // The Technology 2.5 laser was spawned when we entered the room
  // We need to update the laser ring to account for now having homing
  const lasers = Isaac.FindByType(
    EntityType.ENTITY_LASER, // 7
    LaserVariant.LASER_THIN_RED, // 2
    -1,
    false,
    false,
  );
  for (const entity of lasers) {
    if (entity.SpawnerType === EntityType.ENTITY_PLAYER) {
      const laser = entity.ToLaser();
      laser.TearFlags |= TearFlags.TEAR_HOMING;
    }
  }
}

// Card.CARD_EMPEROR (5)
export function emperor(): void {
  if (RacingPlusGlobals.run.bossCommand) {
    return;
  }

  // Find a room 66% of the way to the boss
  const gridIndex = path.findMidBoss(0.66);

  // You have to set LeaveDoor before every teleport or else it will send you to the wrong room
  g.l.LeaveDoor = -1;

  // Teleport
  g.g.StartRoomTransition(
    gridIndex,
    Direction.NO_DIRECTION,
    RoomTransition.TRANSITION_TELEPORT,
  );
  Isaac.DebugString(`Nerfed emperor to room. ${gridIndex}`);

  // This will override the existing Emperor effect because we have already locked in a room
  // transition
}

// Card.CARD_LOVERS (7)
export function lovers(): void {
  for (let i = 0; i < 2; i++) {
    deleteNearestHeart();
  }

  // Spawn a bed
  Isaac.Spawn(
    EntityType.ENTITY_PICKUP,
    PickupVariant.PICKUP_BED,
    0,
    g.r.FindFreePickupSpawnPosition(g.p.Position, 1, true),
    g.zeroVector,
    g.p,
  );
}

function deleteNearestHeart() {
  const hearts = Isaac.FindByType(
    EntityType.ENTITY_PICKUP,
    PickupVariant.PICKUP_HEART,
    HeartSubType.HEART_FULL,
    false,
    false,
  );
  let nearestPickup: EntityPickup | null = null;
  let nearestPickupDistance: int | null = null;
  for (const heart of hearts) {
    const pickup = heart.ToPickup();
    if (
      pickup.FrameCount <= 1 &&
      pickup.SpawnerType === EntityType.ENTITY_PLAYER &&
      pickup.Touched === false &&
      pickup.Price === 0 &&
      pickup.State !== 1 // We set the state to 1 when we are deleting it
    ) {
      const distanceToPlayer = g.p.Position.Distance(pickup.Position);
      if (nearestPickup === null || nearestPickupDistance === null) {
        nearestPickup = pickup;
        nearestPickupDistance = distanceToPlayer;
      } else if (distanceToPlayer < nearestPickupDistance) {
        nearestPickup = pickup;
        nearestPickupDistance = distanceToPlayer;
      }
    }
  }

  if (nearestPickup !== null) {
    nearestPickup.State = 1;
    nearestPickup.Remove();
  }
}

// Card.CARD_WHEEL_OF_FORTUNE (11)
export function wheelOfFortune(): void {
  let slotVariant;
  if (g.run.spawningRestock) {
    g.run.spawningRestock = false;
    slotVariant = SlotVariant.SHOP_RESTOCK_MACHINE;
  } else {
    // 33% chance for a Slot Machine / Fortune Teller Machine / Shop Restock Machine
    g.run.wheelOfFortuneRNG = misc.incrementRNG(g.run.wheelOfFortuneRNG);
    math.randomseed(g.run.wheelOfFortuneRNG);
    const slotChoice = math.random(1, 3);
    if (slotChoice === 1) {
      slotVariant = SlotVariant.SLOT_MACHINE;
    } else if (slotChoice === 2) {
      slotVariant = SlotVariant.FORTUNE_TELLING_MACHINE;
    } else if (slotChoice === 3) {
      slotVariant = SlotVariant.SHOP_RESTOCK_MACHINE;
    } else {
      error(`Unknown slot choice: ${slotChoice}`);
    }
  }

  // Remove the vanilla Slot Machine / Fortune Teller Machine
  const slots = Isaac.FindByType(EntityType.ENTITY_SLOT, -1, -1, false, false);
  for (const slot of slots) {
    if (slot.FrameCount === 0) {
      g.g.Spawn(
        EntityType.ENTITY_SLOT,
        slotVariant,
        slot.Position,
        slot.Velocity,
        slot.Parent,
        slot.SubType,
        slot.InitSeed,
      );
      Isaac.Spawn(
        EntityType.ENTITY_EFFECT,
        EffectVariant.POOF01,
        3, // A subtype of 3 makes a bigger poof
        slot.Position,
        g.zeroVector,
        null,
      );
      slot.Remove();
    }
  }
}

// Card.CARD_SUN (20)
export function sun(): void {
  // Local variables
  const rooms = g.l.GetRooms();

  // Make all the rooms invisible
  for (let i = 0; i < rooms.Size; i++) {
    // This is 0 indexed
    const roomDesc = rooms.Get(i);
    const roomIndexSafe = roomDesc.SafeGridIndex; // This is always the top-left index
    // We have to use the "GetRoomByIdx()" function in order to modify the DisplayFlags
    const room = g.l.GetRoomByIdx(roomIndexSafe);
    room.DisplayFlags = 0;
  }

  // Reveal 3 random rooms
  const randomIndexes: Array<int> = [];
  do {
    let randomIndex;
    do {
      g.run.sunCardRNG = misc.incrementRNG(g.run.sunCardRNG);
      math.randomseed(g.run.sunCardRNG);
      randomIndex = math.random(0, rooms.Size - 1);
    } while (randomIndexes.includes(randomIndex));
    randomIndexes.push(randomIndex);
  } while (randomIndexes.length < 3);

  for (const randomIndex of randomIndexes) {
    const roomDesc = rooms.Get(randomIndex);
    const roomIndexSafe = roomDesc.SafeGridIndex; // This is always the top-left index
    // We have to use the "GetRoomByIdx()" function in order to modify the DisplayFlags
    const room = g.l.GetRoomByIdx(roomIndexSafe);
    room.DisplayFlags = 5;
  }

  g.l.UpdateVisibility();
}

// Card.CARD_WORLD (22)
export function world(): void {
  // Local variables
  const rooms = g.l.GetRooms();

  // If they already have the compass effect, then this card will have no effect
  if (g.l.GetStateFlag(LevelStateFlag.STATE_COMPASS_EFFECT)) {
    return;
  }

  // Make all the rooms invisible except for the Boss Room
  for (let i = 0; i < rooms.Size; i++) {
    // This is 0 indexed
    const roomDesc = rooms.Get(i);
    const roomIndexSafe = roomDesc.SafeGridIndex; // This is always the top-left index
    const roomData = roomDesc.Data;
    const roomType = roomData.Type;

    if (roomType !== RoomType.ROOM_BOSS) {
      // We have to use the "GetRoomByIdx()" function in order to modify the DisplayFlags
      const room = g.l.GetRoomByIdx(roomIndexSafe);
      room.DisplayFlags = 0;
    }
  }

  g.l.UpdateVisibility();
}

// Card.RUNE_ANSUZ (36)
export function ansuz(): void {
  // Local variables
  const rooms = g.l.GetRooms();

  // Remove all the icons (so that the rune only reveals the map)
  for (let i = 0; i < rooms.Size; i++) {
    // This is 0 indexed
    const roomDesc = rooms.Get(i);
    const roomIndexSafe = roomDesc.SafeGridIndex; // This is always the top-left index
    // We have to use the "GetRoomByIdx()" function in order to modify the DisplayFlags
    const room = g.l.GetRoomByIdx(roomIndexSafe);
    room.DisplayFlags &= ~(1 << 2);
  }

  g.l.UpdateVisibility();
}
