export function main(projectile: EntityProjectile): void {
  if (!projectile.HasEntityFlags(EntityFlag.FRIENDLY)) {
    return;
  }

  // Fade the projectiles of charmed enemies so that it is easier to see everything We do this on
  // every frame since the MC_POST_PROJECTILE_INIT callback is bugged
  const color = projectile.GetColor();
  const fadeAmount = 0.25;
  const newColor = Color(color.R, color.G, color.B, fadeAmount, 0, 0, 0);
  // (for some reason, in this callback, RO, GO, and BO will be float values, but the Color
  // constructor only wants integers, so manually use 0 for these 3 values instead of the existing
  // ones)
  projectile.SetColor(newColor, 0, 0, true, true);
}
