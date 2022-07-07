import g from "../globals";

// FamiliarVariant.MOMS_RAZOR (117)
export function momsRazor(
  familiar: EntityFamiliar,
  collider: Entity,
): null | boolean {
  const npc = collider.ToNPC();
  if (npc === null) {
    return null;
  }

  // Local variables
  const gameFrameCount = g.g.GetFrameCount();

  // Mom's Razor only ticks once every two frames
  let damage = 10;
  if (g.p.HasCollectible(CollectibleType.BFFS)) {
    damage *= 2;
  }

  if (gameFrameCount % 2 === 0) {
    collider.TakeDamage(damage, 0, EntityRef(familiar), 0);
  }

  // We want the vanilla bleed effect to work in conjunction with the extra damage
  return true;
}
