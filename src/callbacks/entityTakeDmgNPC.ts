import g from "../globals";

export default function entityTakeDmgNPC(
  npc: EntityNPC,
  _damageAmount: float,
  _damageFlags: int,
  damageSource: EntityRef,
  damageCountdownFrames: int,
): boolean {
  spearOfDestiny(npc, damageSource, damageCountdownFrames);

  return true;
}

// CollectibleType.SPEAR_OF_DESTINY (400)
function spearOfDestiny(
  npc: EntityNPC,
  damageSource: EntityRef,
  damageCountdownFrames: int,
) {
  // Make the Spear of Destiny do extra damage (this does not work if we set effect.CollisionDamage
  // in the PostEffectInit callback; the damage appears to be hard-coded)
  if (
    damageSource.Type === EntityType.EFFECT &&
    damageSource.Variant === EffectVariant.SPEAR_OF_DESTINY
  ) {
    const damage = g.p.Damage * 3;
    g.run.dealingExtraDamage = true;
    npc.TakeDamage(damage, 0, EntityRef(g.p), damageCountdownFrames);
    g.run.dealingExtraDamage = false;
    return false;
  }

  return true;
}
