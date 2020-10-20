import g from "../globals";
import { CollectibleTypeCustom } from "../types/enums.custom";

// CollectibleType.COLLECTIBLE_ISAACS_TEARS (323)
export function isaacsTears(): boolean {
  let vel = Vector(10, 0);
  for (let i = 0; i < 8; i++) {
    vel = vel.Rotated(45);
    const tear = g.p.FireTear(g.p.Position, vel, false, false, false);

    // Increase the damage && make it look more impressive
    const buff = 2.5;
    tear.CollisionDamage = g.p.Damage * buff;
    tear.Scale = buff;
    tear.KnockbackMultiplier = 20;
  }

  // When we return from the function below,
  // no animation will play, so we have to explicitly perform one
  g.p.AnimateCollectible(
    CollectibleType.COLLECTIBLE_ISAACS_TEARS,
    "UseItem",
    "PlayerPickup",
  );

  // Cancel the original effect
  return true;
}

// CollectibleType.COLLECTIBLE_VOID (477)
export function voidItem(): boolean {
  const megaBlasts = Isaac.FindByType(
    EntityType.ENTITY_PICKUP, // 5
    PickupVariant.PICKUP_COLLECTIBLE, // 100
    CollectibleTypeCustom.COLLECTIBLE_MEGA_BLAST_SINGLE,
    false,
    false,
  );
  if (megaBlasts.length > 0) {
    g.p.AnimateSad();

    // Mark to recharge the item on the next frame
    RacingPlusGlobals.run.rechargeItemFrame = g.g.GetFrameCount() + 1;

    // Cancel the effect
    return true;
  }

  return false;
}
