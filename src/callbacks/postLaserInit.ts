import g from "../globals";

export function main(laser: EntityLaser): void {
  isaacsHeart(laser); // 276
}

// CollectibleType.COLLECTIBLE_ISAACS_HEART (276)
function isaacsHeart(laser: EntityLaser) {
  // We don't want to check for "!g.p.HasCollectible(CollectibleType.COLLECTIBLE_ISAACS_HEART)"
  // because we might have Isaac's Heart from a Monster Manual
  if (!g.run.spawningIsaacsHeartLaser) {
    return;
  }

  // Brimstones are supposed to originate from Isaac's Heart,
  // but it takes a frame to change the position
  // Thus, manually make it invisible as soon as it spawns, and then we will make it visible later
  laser.Visible = false;
}
