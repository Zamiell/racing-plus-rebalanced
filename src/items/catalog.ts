import g from "../globals";
import * as misc from "../misc";

const CATALOG_ITEM_PRICE = 10;
const CATALOG_ILLEGAL_ROOM_TYPES = [
  RoomType.ROOM_SHOP, // 2
  RoomType.ROOM_CURSE, // 10
  RoomType.ROOM_DEVIL, // 14
  RoomType.ROOM_ANGEL, // 15
  RoomType.ROOM_BLACK_MARKET, // 22
];

// ModCallbacks.MC_USE_ITEM (3)
export function useItem(): boolean {
  const position = g.r.FindFreePickupSpawnPosition(g.p.Position, 1, true);
  spawnItem(position);
  return true;
}

export function spawnItem(position: Vector): void {
  g.run.catalogRNG = misc.incrementRNG(g.run.catalogRNG);
  const item = g.g
    .Spawn(
      EntityType.ENTITY_PICKUP, // 5
      PickupVariant.PICKUP_COLLECTIBLE, // 100
      position,
      g.zeroVector,
      null,
      0, // Random item
      g.run.catalogRNG,
    )
    .ToPickup();

  // Set a price for the item
  item.Price = CATALOG_ITEM_PRICE;
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
