import g from "../globals";

export function main(bomb: EntityBomb): void {
  if (bomb.SpawnerType !== EntityType.ENTITY_PLAYER || bomb.FrameCount !== 1) {
    return;
  }

  drFetus(bomb); // 52
  sacredHeart(bomb); // 182
}

// CollectibleType.COLLECTIBLE_DR_FETUS (52)
function drFetus(bomb: EntityBomb) {
  if (!g.p.HasCollectible(CollectibleType.COLLECTIBLE_DR_FETUS)) {
    return;
  }

  if (!bomb.IsFetus) {
    return;
  }

  // Familiars shoot twice for each Dr. Fetus bomb to make up for the fact that it takes you from
  // 10 tear delay to 25
  // (we can't shoot on the same frame like we do in the laser callback because this code happens
  // before PostUpdate)
  g.run.familiarMultiShot = 2;
  g.run.familiarMultiShotVelocity = bomb.Velocity;
}

// CollectibleType.COLLECTIBLE_SACRED_HEART (182)
function sacredHeart(bomb: EntityBomb) {
  if (!g.p.HasCollectible(CollectibleType.COLLECTIBLE_SACRED_HEART)) {
    return;
  }

  // Find out if this bomb has the homing flag
  const homing = (bomb.Flags & (1 << 2)) >>> 2;
  if (homing === 0) {
    return;
  }

  // Don't do anything if we have Bobby Bomb (normal homing bombs)
  if (g.p.HasCollectible(CollectibleType.COLLECTIBLE_BOBBY_BOMB)) {
    return;
  }

  // Remove the homing bombs from Sacred Heart
  // (bombs use tear flags for some reason)
  bomb.Flags &= ~TearFlags.TEAR_HOMING; // 1 << 2
}
