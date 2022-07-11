import {
  CollectibleType,
  EntityType,
  ModCallback,
  PickupVariant,
} from "isaac-typescript-definitions";
import { CollectibleTypeCustom } from "../enums/CollectibleTypeCustom";
import g from "../globals";
import * as catalog from "../items/catalog";

export function init(mod: Mod): void {
  mod.AddCallback(
    ModCallback.PRE_USE_ITEM,
    isaacsTears,
    CollectibleType.ISAACS_TEARS, // 323
  );

  mod.AddCallback(
    ModCallback.PRE_USE_ITEM,
    voidItem,
    CollectibleType.VOID, // 477
  );

  mod.AddCallback(
    ModCallback.PRE_USE_ITEM,
    catalog.preUseItem,
    CollectibleTypeCustom.CATALOG,
  );
}

// CollectibleType.ISAACS_TEARS (323)
export function isaacsTears(): boolean {
  let vel = Vector(10, 0);
  for (let i = 0; i < 8; i++) {
    vel = vel.Rotated(45);
    const tear = g.p.FireTear(g.p.Position, vel, false, false, false);

    // Make it look more impressive.
    const buff = 2.5;
    tear.CollisionDamage = g.p.Damage * buff;
    tear.Scale = buff;
    tear.KnockbackMultiplier = 20;
  }

  // When we return from the function below, no animation will play, so we have to explicitly
  // perform one.
  g.p.AnimateCollectible(
    CollectibleType.ISAACS_TEARS,
    "UseItem",
    "PlayerPickup",
  );

  // Cancel the original effect.
  return true;
}

// CollectibleType.VOID (477)
export function voidItem(): boolean {
  const megaBlasts = Isaac.FindByType(
    EntityType.PICKUP,
    PickupVariant.COLLECTIBLE,
    CollectibleTypeCustom.MEGA_BLAST_SINGLE,
    false,
    false,
  );
  if (megaBlasts.length > 0) {
    g.p.AnimateSad();

    // Mark to recharge the item on the next frame.
    RacingPlusGlobals.run.rechargeItemFrame = g.g.GetFrameCount() + 1;

    // Cancel the effect
    return true;
  }

  return false;
}
