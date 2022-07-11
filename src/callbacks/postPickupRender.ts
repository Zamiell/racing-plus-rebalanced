import {
  ModCallback,
  PickupVariant,
  RoomShape,
} from "isaac-typescript-definitions";
import g from "../globals";

const shopItemNumbersYellow = Sprite();
shopItemNumbersYellow.Load("gfx/005.150_shop item custom.anm2", true);
shopItemNumbersYellow.Play("NumbersYellow", true);

export function init(mod: Mod): void {
  mod.AddCallback(
    ModCallback.POST_PICKUP_RENDER,
    collectible,
    PickupVariant.COLLECTIBLE, // 100
  );
}

// PickupVariant.COLLECTIBLE (100)
function collectible(pickup: EntityPickup) {
  const roomShape = g.r.GetRoomShape();

  // The special yellow rendering will not work in large rooms.
  if (roomShape >= RoomShape.SHAPE_1x2) {
    return;
  }

  // Make shop pedestal items always have yellow price text so that it is easier to distinguish them
  // from other pickups.
  if (pickup.Price <= 0) {
    return;
  }

  const sprite = pickup.GetSprite();
  sprite.SetLayerFrame(0, -1);

  const position = Isaac.WorldToRenderPosition(pickup.Position);
  if (pickup.Price >= 10) {
    shopItemNumbersYellow.SetLayerFrame(0, 1);
    shopItemNumbersYellow.SetLayerFrame(1, pickup.Price - 10);
    shopItemNumbersYellow.SetLayerFrame(2, 10);
    shopItemNumbersYellow.RenderLayer(0, position);
    shopItemNumbersYellow.RenderLayer(1, position);
    shopItemNumbersYellow.RenderLayer(2, position);
  } else {
    shopItemNumbersYellow.SetLayerFrame(0, pickup.Price);
    shopItemNumbersYellow.SetLayerFrame(1, 10);
    shopItemNumbersYellow.RenderLayer(0, position.add(Vector(11, 0)));
    shopItemNumbersYellow.RenderLayer(1, position.add(Vector(9, 1)));
  }
}
