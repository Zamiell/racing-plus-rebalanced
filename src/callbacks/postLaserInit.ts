import { ModCallback } from "isaac-typescript-definitions";
import g from "../globals";

export function init(mod: Mod): void {
  mod.AddCallback(ModCallback.POST_LASER_INIT, main); // 47
}

export function main(laser: EntityLaser): void {
  isaacsHeart(laser); // 276
}

// CollectibleType.ISAACS_HEART (276)
function isaacsHeart(laser: EntityLaser) {
  // We don't want to check for the Isaac's Heart collectible because we might have Isaac's Heart
  // from a Monster Manual.
  if (!g.run.spawningIsaacsHeartLaser) {
    return;
  }

  // Brimstones are supposed to originate from Isaac's Heart, but it takes a frame to change the
  // position. Thus, manually make it invisible as soon as it spawns, and then we will make it
  // visible later.
  laser.Visible = false;
}
