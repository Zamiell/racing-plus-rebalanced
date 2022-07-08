import { CollectibleType, EntityType } from "isaac-typescript-definitions";
import g from "../globals";

export function main(tear: EntityTear, collider: Entity): boolean | undefined {
  lostContact(tear, collider); // 213

  return undefined;
}

function lostContact(tear: EntityTear, collider: Entity) {
  if (
    collider.Type === EntityType.PROJECTILE &&
    g.p.HasCollectible(CollectibleType.LOST_CONTACT)
  ) {
    // If we return true here, the tear will not block the shot. Instead, spawn another tear.
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
