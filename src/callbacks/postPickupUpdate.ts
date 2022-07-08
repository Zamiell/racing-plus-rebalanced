import * as postNewRoom from "../callbacksCustom/postNewRoomReordered";
import { ZERO_VECTOR } from "../constants";
import g from "../globals";
import * as catalog from "../items/catalog";
import * as misc from "../misc";
import { COLORS } from "../pills";
import { CollectibleState, TrinketTypeCustom } from "../types/enums";

export function main(pickup: EntityPickup): void {
  checkTouched(pickup);
}

function checkTouched(pickup: EntityPickup) {
  // Local variables
  const sprite = pickup.GetSprite();
  const data = pickup.GetData();

  // Keep track of pickups that are touched
  if (sprite.IsPlaying("Collect") && data.touched === undefined) {
    data.touched = true;
    Isaac.DebugString(
      `Touched pickup. ${pickup.Type}.${pickup.Variant}.${pickup.SubType} (RPR)`,
    );
    touched(pickup);
  }
}

function touched(pickup: EntityPickup) {
  touchedEtherealPenny(pickup);
}

function touchedEtherealPenny(pickup: EntityPickup) {
  if (
    pickup.Variant !== PickupVariant.COIN ||
    !g.p.HasTrinket(TrinketTypeCustom.ETHEREAL_PENNY)
  ) {
    return;
  }

  // 20% chance for a half soul heart
  g.run.etherealPennyRNG = misc.incrementRNG(g.run.etherealPennyRNG);
  math.randomseed(g.run.etherealPennyRNG);
  const slotChoice = math.random(1, 5);
  if (slotChoice !== 1) {
    return;
  }
  const position = g.r.FindFreePickupSpawnPosition(g.p.Position, 1, true);
  g.g.Spawn(
    EntityType.PICKUP,
    PickupVariant.HEART,
    position,
    ZERO_VECTOR,
    null,
    HeartSubType.HALF_SOUL,
    g.run.etherealPennyRNG,
  );
}

// PickupVariant.HEART (10)
export function heart(pickup: EntityPickup): void {
  // Items
  heartRelic(pickup); // 98

  // Miscellaneous
  heartCheckDDReroll(pickup);
  heartCheckCatalogReroll(pickup);
}

// PickupVariant.PILL (70)
export function pill(pickup: EntityPickup): void {
  // Sometimes, pills can spawn from sources that will not go through the GetPillColor callback
  // (e.g. champions) We need to delete and replace these pills with pills that have the correct
  // pill color
  if (COLORS.includes(pickup.SubType)) {
    return;
  }

  pickup.Remove();

  // Get a new random color
  math.randomseed(pickup.InitSeed);
  const colorIndex = math.random(0, COLORS.length - 1);
  const color = COLORS[colorIndex];

  g.g.Spawn(
    pickup.Type,
    pickup.Variant,
    pickup.Position,
    pickup.Velocity,
    pickup.SpawnerEntity,
    color,
    pickup.InitSeed,
  );
}

// CollectibleType.RELIC (98)
function heartRelic(pickup: EntityPickup) {
  // Replace soul hearts from The Relic with half soul hearts (5.10.8)
  if (
    pickup.SubType === HeartSubType.SOUL &&
    pickup.SpawnerType === EntityType.FAMILIAR &&
    pickup.SpawnerVariant === FamiliarVariant.RELIC
  ) {
    g.g.Spawn(
      EntityType.PICKUP,
      PickupVariant.HEART,
      pickup.Position,
      pickup.Velocity,
      pickup.SpawnerEntity,
      HeartSubType.HALF_SOUL,
      pickup.InitSeed,
    );
    pickup.Remove();
  }
}

// For some reason, items rerolled in Curse Rooms change to red hearts Delete them and respawn
// another pedestal item
function heartCheckDDReroll(pickup: EntityPickup) {
  // Local variables
  const roomType = g.r.GetType();

  if (
    pickup.FrameCount === 1 &&
    pickup.SubType === HeartSubType.FULL &&
    pickup.Price === 3 &&
    roomType === RoomType.CURSE
  ) {
    postNewRoom.spawnCurseRoomPedestalItem();
    pickup.Remove();
  }
}

// For some reason, rolled Catalog items change to red hearts Delete them and respawn another
// pedestal item
function heartCheckCatalogReroll(pickup: EntityPickup) {
  if (
    pickup.FrameCount === 1 &&
    pickup.SubType === HeartSubType.FULL &&
    pickup.Price === 3 &&
    !catalog.inIllegalRoomType()
  ) {
    catalog.spawnItem(pickup.Position);
    pickup.Remove();
  }
}

// PickupVariant.COLLECTIBLE (100)
export function collectible(pickup: EntityPickup): void {
  collectibleCheckDouble(pickup);
}

function collectibleCheckDouble(pickup: EntityPickup) {
  if (!g.run.level.doubleItems) {
    return;
  }

  // Double every pedestal item that spawns (we can't do this in the MC_POST_PICKUP_INIT callback
  // because the position is not set)
  const gameFrameCount = g.g.GetFrameCount();
  if (
    g.r.IsFirstVisit() &&
    // Frame 0 does not work Frame 1 works but we need to wait an extra frame for Racing+ to replace
    // the pedestal
    pickup.FrameCount === 2 &&
    pickup.State !== 2 && // We mark a state of 2 to indicate a duplicated pedestal
    (g.run.room.doubleItemsFrame === 0 ||
      g.run.room.doubleItemsFrame === gameFrameCount)
  ) {
    const position = g.r.FindFreePickupSpawnPosition(pickup.Position, 1, true);
    g.run.randomSeed = misc.incrementRNG(g.run.randomSeed);
    const pedestal = g.g
      .Spawn(
        EntityType.PICKUP,
        PickupVariant.COLLECTIBLE,
        position,
        ZERO_VECTOR,
        null,
        0,
        g.run.randomSeed,
      )
      .ToPickup();

    if (pedestal !== null) {
      // We don't want it to automatically be bought
      pedestal.Price = pickup.Price;

      // We want it to keep the behavior of the room
      pedestal.TheresOptionsPickup = pickup.TheresOptionsPickup;

      // Mark it so that we don't duplicate it again
      pedestal.State = CollectibleState.DUPLICATED;

      // We only want to duplicate pedestals once per room to avoid duplicating rerolled pedestals
      // (the state will go back to 0 for a rerolled pedestal)
      g.run.room.doubleItemsFrame = gameFrameCount;
    }
  }
}
