import g from "./globals";
import slotRewardFunctionMap from "./slotRewardFunctionMap";
import slotTouchedFunctionMap from "./slotTouchedFunctionMap";

export function postUpdate(): void {
  const slots = Isaac.FindByType(EntityType.ENTITY_SLOT, -1, -1, false, false);
  for (const slot of slots) {
    if (slot.Variant > SlotVariant.MOMS_DRESSING_TABLE) {
      const sprite = slot.GetSprite();

      if (sprite.IsFinished("Initiate")) {
        sprite.Play("Wiggle", true);
      }

      if (sprite.IsFinished("Wiggle")) {
        sprite.Play("Prize", true);

        const rewardFunction = slotRewardFunctionMap.get(slot.Variant);
        if (rewardFunction !== undefined) {
          const success = rewardFunction(slot);
          if (success) {
            g.sfx.Play(SoundEffect.SOUND_BLOODBANK_SPAWN, 1, 0, false, 1);
            g.sfx.Play(SoundEffect.SOUND_SLOTSPAWN, 1, 0, false, 1);
          }
        }
      }

      if (sprite.IsFinished("Prize")) {
        sprite.Play("Idle", true);
      }

      if (sprite.IsFinished("Death")) {
        sprite.Play("Broken", true);
      }

      const exploded =
        slot.GridCollisionClass === EntityGridCollisionClass.GRIDCOLL_GROUND;
      if (exploded) {
        if (!sprite.IsPlaying("Death") && !sprite.IsPlaying("Broken")) {
          sprite.Play("Death", true);
        }
      } else if (
        sprite.IsPlaying("Idle") && // The machine is idle and ready to be interacted with
        slot.Position.Distance(g.p.Position) <= slot.Size + g.p.Size
      ) {
        const touchedFunction = slotTouchedFunctionMap.get(slot.Variant);
        if (touchedFunction !== undefined) {
          touchedFunction(slot);
        }
      }
    }
  }
}
