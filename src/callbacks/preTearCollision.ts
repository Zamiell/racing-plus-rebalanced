import {
  CollectibleType,
  EntityType,
  ModCallback,
} from "isaac-typescript-definitions";
import g from "../globals";

export function init(mod: Mod): void {
  mod.AddCallback(ModCallback.PRE_TEAR_COLLISION, main);
}

function main(tear: EntityTear, collider: Entity): boolean | undefined {
  lostContact(tear, collider); // 213

  return undefined;
}

function lostContact(tear: EntityTear, collider: Entity) {
  const player = Isaac.GetPlayer();

  if (
    collider.Type === EntityType.PROJECTILE &&
    player.HasCollectible(CollectibleType.LOST_CONTACT)
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
