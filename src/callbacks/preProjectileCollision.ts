import {
  EntityType,
  FamiliarVariant,
  ModCallback,
} from "isaac-typescript-definitions";
import g from "../globals";

export function init(mod: Mod): void {
  mod.AddCallback(ModCallback.PRE_PROJECTILE_COLLISION, main);
}

function main(
  projectile: EntityProjectile,
  collider: Entity,
): boolean | undefined {
  fartingBaby(projectile, collider); // 404

  return undefined;
}

function fartingBaby(projectile: EntityProjectile, collider: Entity) {
  if (
    collider.Type !== EntityType.FAMILIAR ||
    collider.Variant !== (FamiliarVariant.FARTING_BABY as int)
  ) {
    return;
  }

  g.run.fartingBabyCounters += 1;
  if (g.run.fartingBabyCounters !== 5) {
    return;
  }
  g.run.fartingBabyCounters = 0;

  // Spawn a shockwave
  const gameFrameCount = g.g.GetFrameCount();
  g.run.room.fartingBabyShockwaves.push({
    frame: gameFrameCount,
    position: projectile.Position,
    velocity: projectile.Velocity.mul(-2),
  });
}
