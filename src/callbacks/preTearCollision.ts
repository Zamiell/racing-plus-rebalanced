import { CollectibleType, EntityType } from "isaac-typescript-definitions";
import g from "../globals";

export function main(tear: EntityTear, collider: Entity): null | boolean {
  lostContact(tear, collider); // 213

  return null;
}

function lostContact(tear: EntityTear, collider: Entity) {
  if (
    collider.Type === EntityType.PROJECTILE &&
    g.p.HasCollectible(CollectibleType.LOST_CONTACT)
  ) {
    CacheFlag. keep going If we return true here, the
    // tear will not block the shot Instead, spawn another tear
    g.g.Spawn(
      tear.Type,
      tear.Variant,
      tear.Position,
      tear.Velocity,
      tear.SpawnerEntity,
      tear.SubType,
      tear.InitSeed,
    );
  }
}
