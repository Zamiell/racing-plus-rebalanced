import { DamageFlag, ModCallback } from "isaac-typescript-definitions";
import g from "../globals";
import entityTakeDmgNPC from "./entityTakeDmgNPC";
import entityTakeDmgPlayer from "./entityTakeDmgPlayer";

export function init(mod: Mod): void {
  mod.AddCallback(ModCallback.ENTITY_TAKE_DMG, main);
}

function main(
  entity: Entity,
  damageAmount: float,
  damageFlags: BitFlags<DamageFlag>,
  damageSource: EntityRef,
  damageCountdownFrames: int,
): boolean {
  if (g.run.dealingExtraDamage) {
    return false;
  }

  const player = entity.ToPlayer();
  if (player !== undefined) {
    return entityTakeDmgPlayer(
      player,
      damageAmount,
      damageFlags,
      damageSource,
      damageCountdownFrames,
    );
  }

  const npc = entity.ToNPC();
  if (npc !== undefined) {
    return entityTakeDmgNPC(
      npc,
      damageAmount,
      damageFlags,
      damageSource,
      damageCountdownFrames,
    );
  }

  return true;
}
