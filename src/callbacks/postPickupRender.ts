const shopItemNumbersYellow = Sprite();
shopItemNumbersYellow.Load("gfx/005.150_shop item custom.anm2", true);
shopItemNumbersYellow.Play("NumbersYellow", true);

// PickupVariant.PICKUP_COLLECTIBLE (100)
export function collectible(pickup: EntityPickup): void {
  // Make shop pedestal items always have yellow price text so that it is easier to distinguish them
  // from other pickups
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
    shopItemNumbersYellow.RenderLayer(0, position.__add(Vector(11, 0)));
    shopItemNumbersYellow.RenderLayer(1, position.__add(Vector(9, 1)));
  }
}
