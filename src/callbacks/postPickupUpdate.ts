import {
  CollectibleType,
  EntityType,
  FamiliarVariant,
  HeartSubType,
  ModCallback,
  PickupVariant,
  RoomType,
} from "isaac-typescript-definitions";
import {
  spawnCollectible,
  spawnHeart,
  spawnHeartWithSeed,
} from "isaacscript-common";
import * as postNewRoom from "../callbacksCustom/postNewRoomReordered";
import { CollectibleState } from "../enums/CollectibleState";
import { TrinketTypeCustom } from "../enums/TrinketTypeCustom";
import g from "../globals";
import * as catalog from "../items/catalog";
import * as misc from "../misc";
import { COLORS } from "../pills";

export function init(mod: Mod): void {
  mod.AddCallback(ModCallback.POST_PICKUP_UPDATE, main);

  mod.AddCallback(
    ModCallback.POST_PICKUP_UPDATE,
    heart,
    PickupVariant.HEART, // 10
  );

  mod.AddCallback(
    ModCallback.POST_PICKUP_UPDATE,
    pill,
    PickupVariant.PILL, // 70
  );

  mod.AddCallback(
    ModCallback.POST_PICKUP_UPDATE,
    collectible,
    PickupVariant.COLLECTIBLE, // 100
  );
}

function main(pickup: EntityPickup) {
  checkTouched(pickup);
}

function checkTouched(pickup: EntityPickup) {
  const sprite = pickup.GetSprite();
  const data = pickup.GetData();

  // Keep track of pickups that are touched.
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
  spawnHeartWithSeed(HeartSubType.HALF_SOUL, position, g.run.etherealPennyRNG);
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

  // Get a new random color.
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
  // Replace soul hearts from The Relic with half soul hearts.
  if (
    pickup.SubType === HeartSubType.SOUL &&
    pickup.SpawnerType === EntityType.FAMILIAR &&
    pickup.SpawnerVariant === FamiliarVariant.RELIC
  ) {
    spawnHeart(
      HeartSubType.HALF_SOUL,
      pickup.Position,
      pickup.Velocity,
      pickup.SpawnerEntity,
      pickup.InitSeed,
    );
    pickup.Remove();
  }
}

// For some reason, items rerolled in Curse Rooms change to red hearts. Delete them and respawn
// another pedestal item.
function heartCheckDDReroll(pickup: EntityPickup) {
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

// For some reason, rolled Catalog items change to red hearts. Delete them and respawn another
// pedestal item.
function heartCheckCatalogReroll(pickup: EntityPickup) {
  if (
    pickup.FrameCount === 1 &&
    pickup.SubType === HeartSubType.FULL &&
    pickup.Price === 3 &&
    !catalog.inIllegalRoomType()
  ) {
    catalog.spawnCatalogCollectible(pickup.Position);
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

  // Double every pedestal item that spawns. (We can't do this in the `POST_PICKUP_INIT` callback
  // because the position is not set.)
  const gameFrameCount = g.g.GetFrameCount();
  if (
    g.r.IsFirstVisit() &&
    // Frame 0 does not work. Frame 1 works but we need to wait an extra frame for Racing+ to
    // replace the pedestal.
    pickup.FrameCount === 2 &&
    pickup.State !== 2 && // We mark a state of 2 to indicate a duplicated pedestal.
    (g.run.room.doubleItemsFrame === 0 ||
      g.run.room.doubleItemsFrame === gameFrameCount)
  ) {
    const position = g.r.FindFreePickupSpawnPosition(pickup.Position, 1, true);
    g.run.randomSeed = misc.incrementRNG(g.run.randomSeed);
    const collectible = spawnCollectible(
      CollectibleType.NULL,
      position,
      g.run.randomSeed,
    );

    // We don't want it to automatically be bought.
    collectible.Price = pickup.Price;

    // We want it to keep the behavior of the room.
    collectible.OptionsPickupIndex = pickup.OptionsPickupIndex;

    // Mark it so that we don't duplicate it again.
    collectible.State = CollectibleState.DUPLICATED;

    // We only want to duplicate pedestals once per room to avoid duplicating rerolled pedestals.
    // (The state will go back to 0 for a rerolled pedestal.)
    g.run.room.doubleItemsFrame = gameFrameCount;
  }
}
