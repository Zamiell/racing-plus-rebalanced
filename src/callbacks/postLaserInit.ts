import g from "../globals";

export function main(laser: EntityLaser): void {
  isaacsHeart(laser); // 276
}

// CollectibleType.COLLECTIBLE_ISAACS_HEART (276)
function isaacsHeart(laser: EntityLaser) {
  if (!g.run.spawningLaser) {
    return;
  }

  // Brimstones are supposed to originate from Isaac's Heart,
  // but it takes a frame to change the position
  // Thus, manually make it invisible as soon as it spawns, and then we will make it visible later
  laser.Visible = false;
}
