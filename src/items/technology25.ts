import { CollectibleType, TearFlag } from "isaac-typescript-definitions";
import { addCollectibleCostume, addFlag } from "isaacscript-common";
import { ZERO_VECTOR } from "../constants";
import { CollectibleTypeCustom } from "../enums/CollectibleTypeCustom";
import g from "../globals";

export function postNewRoom(): void {
  if (!g.p.HasCollectible(CollectibleTypeCustom.TECHNOLOGY_2_5)) {
    return;
  }

  // Spawn a laser ring around the player
  const radius = 66; // Copied from Samael's Tech X ability
  const laser = g.p.FireTechXLaser(g.p.Position, ZERO_VECTOR, radius).ToLaser();
  if (laser !== undefined) {
    if (laser.Variant !== 2) {
      laser.Variant = 2;
      laser.SpriteScale = Vector(0.5, 1);
    }
    laser.TearFlags = addFlag(laser.TearFlags, TearFlag.CONTINUUM);
    laser.CollisionDamage *= 0.33;
    const data = laser.GetData();
    data["ring"] = true;
  }
}

export function postItemPickup(): void {
  addCollectibleCostume(g.p, CollectibleType.TECHNOLOGY_2);

  postNewRoom();
}
