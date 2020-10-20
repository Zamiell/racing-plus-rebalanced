import g from "../globals";
import entityTakeDmgNPC from "./entityTakeDmgNPC";
import entityTakeDmgPlayer from "./entityTakeDmgPlayer";

export function main(
  entity: Entity,
  damageAmount: float,
  damageFlags: int,
  damageSource: EntityRef,
  damageCountdownFrames: int,
): boolean {
  if (g.run.dealingExtraDamage) {
    return false;
  }

  const player = entity.ToPlayer();
  if (player !== null) {
    return entityTakeDmgPlayer(
      player,
      damageAmount,
      damageFlags,
      damageSource,
      damageCountdownFrames,
    );
  }

  const npc = entity.ToNPC();
  if (npc !== null) {
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
