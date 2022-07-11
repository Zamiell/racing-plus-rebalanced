import { CollectibleType } from "isaac-typescript-definitions";
import { sfxManager, spawnCollectible } from "isaacscript-common";
import { CATALOG_ILLEGAL_ROOM_TYPES, CATALOG_ITEM_PRICE } from "../constants";
import { SoundEffectCustom } from "../enums/SoundEffectCustom";
import g from "../globals";
import * as misc from "../misc";

// ModCallback.POST_USE_ITEM (3)
export function useItem(): boolean {
  const position = g.r.FindFreePickupSpawnPosition(g.p.Position, 1, true);
  spawnCatalogCollectible(position);
  sfxManager.Play(SoundEffectCustom.SANTA, 1, 0, false, 1);
  return true;
}

export function spawnCatalogCollectible(position: Vector): void {
  g.run.catalogRNG = misc.incrementRNG(g.run.catalogRNG);
  const collectible = spawnCollectible(
    CollectibleType.NULL,
    position,
    g.run.catalogRNG,
  );

  // Mark that this is a pedestal item spawned from a Catalog.
  const data = collectible.GetData();
  data["catalogItem"] = true;

  // Set the initial price.
  collectible.AutoUpdatePrice = false;
  collectible.Price = CATALOG_ITEM_PRICE;
}

// ModCallback.PRE_USE_ITEM (23)
export function preUseItem(): boolean {
  const gameFrameCount = g.g.GetFrameCount();

  // Prevent the player from using the Catalog in certain rooms.
  if (inIllegalRoomType()) {
    g.p.AnimateSad();

    // Mark to recharge the item on the next frame.
    RacingPlusGlobals.run.rechargeItemFrame = gameFrameCount + 1;

    // Cancel the effect
    return true;
  }

  return false;
}

export function inIllegalRoomType(): boolean {
  const roomType = g.r.GetType();

  return CATALOG_ILLEGAL_ROOM_TYPES.includes(roomType);
}
