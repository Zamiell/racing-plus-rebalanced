import {
  Card,
  Direction,
  DisplayFlag,
  DisplayFlagZero,
  DoorSlot,
  EffectVariant,
  EntityType,
  HeartSubType,
  LaserVariant,
  LevelStateFlag,
  ModCallback,
  PickupVariant,
  PoofSubType,
  RoomTransitionAnim,
  RoomType,
  SlotVariant,
  TearFlag,
} from "isaac-typescript-definitions";
import {
  addFlag,
  clearFloorDisplayFlags,
  getLasers,
  getRandomInt,
  log,
  removeFlag,
  repeat,
  spawnEffect,
} from "isaacscript-common";
import { CollectibleTypeCustom } from "../enums/CollectibleTypeCustom";
import g from "../globals";
import * as path from "../path";

export function init(mod: Mod): void {
  mod.AddCallback(
    ModCallback.POST_USE_CARD,
    magician,
    Card.MAGICIAN, // 2
  );

  mod.AddCallback(
    ModCallback.POST_USE_CARD,
    emperor,
    Card.EMPEROR, // 5
  );

  mod.AddCallback(
    ModCallback.POST_USE_CARD,
    lovers,
    Card.LOVERS, // 7
  );

  mod.AddCallback(
    ModCallback.POST_USE_CARD,
    wheelOfFortune,
    Card.WHEEL_OF_FORTUNE, // 11
  );

  mod.AddCallback(
    ModCallback.POST_USE_CARD,
    sun,
    Card.SUN, // 20
  );

  mod.AddCallback(
    ModCallback.POST_USE_CARD,
    world,
    Card.WORLD, // 22
  );

  mod.AddCallback(
    ModCallback.POST_USE_CARD,
    ansuz,
    Card.RUNE_ANSUZ, // 36
  );
}

// Card.MAGICIAN (2)
export function magician(): void {
  if (!g.p.HasCollectible(CollectibleTypeCustom.TECHNOLOGY_2_5)) {
    return;
  }

  // The Technology 2.5 laser was spawned when we entered the room We need to update the laser ring
  // to account for now having homing.
  const lasers = getLasers(LaserVariant.THIN_RED);
  for (const laser of lasers) {
    if (laser.SpawnerType === EntityType.PLAYER) {
      laser.TearFlags = addFlag(laser.TearFlags, TearFlag.HOMING);
    }
  }
}

// Card.EMPEROR (5)
export function emperor(): void {
  if (RacingPlusGlobals.run.bossCommand) {
    return;
  }

  // Find a room 66% of the way to the boss.
  const gridIndex = path.findMidBoss(0.66);

  // You have to set LeaveDoor before every teleport or else it will send you to the wrong room.
  g.l.LeaveDoor = DoorSlot.NO_DOOR_SLOT;

  // Teleport
  g.g.StartRoomTransition(
    gridIndex,
    Direction.NO_DIRECTION,
    RoomTransitionAnim.TELEPORT,
  );
  log(`Nerfed emperor to room. ${gridIndex}`);

  // This will override the existing Emperor effect because we have already locked in a room
  // transition.
}

// Card.LOVERS (7)
export function lovers(): void {
  for (let i = 0; i < 2; i++) {
    deleteNearestHeart();
  }

  // Spawn a bed
  Isaac.Spawn(
    EntityType.PICKUP,
    PickupVariant.BED,
    0,
    g.r.FindFreePickupSpawnPosition(g.p.Position, 1, true),
    ZERO_VECTOR,
    g.p,
  );
}

function deleteNearestHeart() {
  const hearts = Isaac.FindByType(
    EntityType.PICKUP,
    PickupVariant.HEART,
    HeartSubType.FULL,
    false,
    false,
  );
  let nearestPickup: EntityPickup | null = null;
  let nearestPickupDistance: int | null = null;
  for (const heart of hearts) {
    const pickup = heart.ToPickup();
    if (pickup === undefined) {
      continue;
    }
    if (
      pickup.FrameCount <= 1 &&
      pickup.SpawnerType === EntityType.PLAYER &&
      !pickup.Touched &&
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

// Card.WHEEL_OF_FORTUNE (11)
export function wheelOfFortune(): void {
  let slotVariant: int;
  if (g.run.spawningRestock) {
    g.run.spawningRestock = false;
    slotVariant = SlotVariant.SHOP_RESTOCK_MACHINE;
  } else {
    // 33% chance for a Slot Machine / Fortune Teller Machine / Shop Restock Machine.
    const slotChoice = getRandomInt(1, 3, g.run.wheelOfFortuneRNG);
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

  // Remove the vanilla Slot Machine / Fortune Teller Machine.
  const slots = Isaac.FindByType(EntityType.SLOT, -1, -1, false, false);
  for (const slot of slots) {
    if (slot.FrameCount === 0) {
      g.g.Spawn(
        EntityType.SLOT,
        slotVariant,
        slot.Position,
        slot.Velocity,
        slot.Parent,
        slot.SubType,
        slot.InitSeed,
      );
      spawnEffect(EffectVariant.POOF_1, PoofSubType.LARGE, slot.Position);
      slot.Remove();
    }
  }
}

// Card.SUN (20)
export function sun(): void {
  // Local variables
  const rooms = g.l.GetRooms();

  // Make all the rooms invisible.
  clearFloorDisplayFlags();

  // Reveal 3 random rooms.
  const randomIndexes: int[] = [];
  repeat(3, () => {
    const randomIndex = getRandomInt(
      0,
      rooms.Size - 1,
      g.run.sunCardRNG,
      randomIndexes,
    );
    randomIndexes.push(randomIndex);
  });

  for (const randomIndex of randomIndexes) {
    const roomDescription = rooms.Get(randomIndex);
    if (roomDescription !== undefined) {
      roomDescription.DisplayFlags = addFlag(
        DisplayFlag.VISIBLE,
        DisplayFlag.SHOW_ICON,
      );
    }
  }

  g.l.UpdateVisibility();
}

// Card.WORLD (22)
export function world(): void {
  // Local variables
  const rooms = g.l.GetRooms();

  // If they already have the compass effect, then this card will have no effect.
  if (g.l.GetStateFlag(LevelStateFlag.COMPASS_EFFECT)) {
    return;
  }

  // Make all the rooms invisible except for the Boss Room.
  for (let i = 0; i < rooms.Size; i++) {
    // This is 0 indexed.
    const roomDescription = rooms.Get(i);
    if (roomDescription === undefined) {
      continue;
    }

    const roomData = roomDescription.Data;
    if (roomData === undefined) {
      continue;
    }

    if (roomData.Type !== RoomType.BOSS) {
      roomDescription.DisplayFlags = DisplayFlagZero;
    }
  }

  g.l.UpdateVisibility();
}

// Card.RUNE_ANSUZ (36)
export function ansuz(): void {
  // Local variables
  const rooms = g.l.GetRooms();

  // Remove all the icons (so that the rune only reveals the map).
  for (let i = 0; i < rooms.Size; i++) {
    // This is 0 indexed.
    const roomDescription = rooms.Get(i);
    if (roomDescription !== undefined) {
      roomDescription.DisplayFlags = removeFlag(
        roomDescription.DisplayFlags,
        DisplayFlag.SHOW_ICON,
      );
    }
  }

  g.l.UpdateVisibility();
}
