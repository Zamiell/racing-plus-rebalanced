import g from "../globals";

export function main(
  projectile: EntityProjectile,
  collider: Entity,
): null | boolean {
  fartingBaby(projectile, collider); // 404

  return null;
}

function fartingBaby(projectile: EntityProjectile, collider: Entity) {
  if (
    collider.Type !== EntityType.FAMILIAR ||
    collider.Variant !== FamiliarVariant.FARTING_BABY
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
