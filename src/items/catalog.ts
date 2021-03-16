import {
  CATALOG_ILLEGAL_ROOM_TYPES,
  CATALOG_ITEM_PRICE,
  ZERO_VECTOR,
} from "../constants";
import g from "../globals";
import * as misc from "../misc";
import { SoundEffectCustom } from "../types/enums.custom";

// ModCallbacks.MC_USE_ITEM (3)
export function useItem(): boolean {
  const position = g.r.FindFreePickupSpawnPosition(g.p.Position, 1, true);
  spawnItem(position);
  g.sfx.Play(SoundEffectCustom.SOUND_SANTA, 1, 0, false, 1);
  return true;
}

export function spawnItem(position: Vector): void {
  g.run.catalogRNG = misc.incrementRNG(g.run.catalogRNG);
  const spawnedItem = g.g
    .Spawn(
      EntityType.ENTITY_PICKUP,
      PickupVariant.PICKUP_COLLECTIBLE,
      position,
      ZERO_VECTOR,
      null,
      0, // Random item
      g.run.catalogRNG,
    )
    .ToPickup();

  if (spawnedItem !== null) {
    // Mark that this is a pedestal item spawned from a Catalog
    const data = spawnedItem.GetData();
    data.catalogItem = true;

    // Set the initial price
    spawnedItem.AutoUpdatePrice = false;
    spawnedItem.Price = CATALOG_ITEM_PRICE;
  }
}

// ModCallbacks.MC_PRE_USE_ITEM (23)
export function preUseItem(): boolean {
  // Local variables
  const gameFrameCount = g.g.GetFrameCount();

  // Prevent the player from using the Catalog in certain rooms
  if (inIllegalRoomType()) {
    g.p.AnimateSad();

    // Mark to recharge the item on the next frame
    RacingPlusGlobals.run.rechargeItemFrame = gameFrameCount + 1;

    // Cancel the effect
    return true;
  }

  return false;
}

export function inIllegalRoomType(): boolean {
  // Local variables
  const roomType = g.r.GetType();

  return CATALOG_ILLEGAL_ROOM_TYPES.includes(roomType);
}
