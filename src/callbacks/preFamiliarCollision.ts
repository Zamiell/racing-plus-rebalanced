import {
  CollectibleType,
  DamageFlagZero,
  FamiliarVariant,
  ModCallback,
} from "isaac-typescript-definitions";
import g from "../globals";

export function init(mod: Mod): void {
  mod.AddCallback(
    ModCallback.PRE_FAMILIAR_COLLISION,
    momsRazor,
    FamiliarVariant.MOMS_RAZOR, // 117
  );
}

// FamiliarVariant.MOMS_RAZOR (117)
function momsRazor(
  familiar: EntityFamiliar,
  collider: Entity,
): boolean | undefined {
  const npc = collider.ToNPC();
  if (npc === undefined) {
    return undefined;
  }

  const gameFrameCount = g.g.GetFrameCount();

  // Mom's Razor only ticks once every two frames.
  let damage = 10;
  if (g.p.HasCollectible(CollectibleType.BFFS)) {
    damage *= 2;
  }

  if (gameFrameCount % 2 === 0) {
    collider.TakeDamage(damage, DamageFlagZero, EntityRef(familiar), 0);
  }

  // We want the vanilla bleed effect to work in conjunction with the extra damage.
  return true;
}
