import { ZERO_VECTOR } from "../constants";
import g from "../globals";
import { CollectibleTypeCustom } from "../types/enums";

export function postNewRoom(): void {
  if (!g.p.HasCollectible(CollectibleTypeCustom.COLLECTIBLE_TECHNOLOGY_2_5)) {
    return;
  }

  // Spawn a laser ring around the player
  const radius = 66; // Copied from Samael's Tech X ability
  const laser = g.p.FireTechXLaser(g.p.Position, ZERO_VECTOR, radius).ToLaser();
  if (laser !== null) {
    if (laser.Variant !== 2) {
      laser.Variant = 2;
      laser.SpriteScale = Vector(0.5, 1);
    }
    laser.TearFlags |= TearFlags.TEAR_CONTINUUM;
    laser.CollisionDamage *= 0.33;
    const data = laser.GetData();
    data.ring = true;
  }
}

export function postItemPickup(): void {
  const item = g.itemConfig.GetCollectible(
    CollectibleType.COLLECTIBLE_TECHNOLOGY_2,
  );
  g.p.AddCostume(item, false);

  postNewRoom();
}
