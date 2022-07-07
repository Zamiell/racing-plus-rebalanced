import { ZERO_VECTOR } from "./constants";
import g from "./globals";

export function main(): void {
  // If the room just got changed to a cleared state, perform some additional tasks
  chargedBaby(); // 372
}

// CollectibleType.CHARGED_BABY (372)
function chargedBaby() {
  if (!g.p.HasCollectible(CollectibleType.CHARGED_BABY)) {
    return;
  }

  // Charged Baby should drop a battery every 4 rooms
  g.run.chargedBabyCounters += 1;
  if (g.run.chargedBabyCounters !== 4) {
    return;
  }
  g.run.chargedBabyCounters = 0;

  const chargedBabies = Isaac.FindByType(
    EntityType.FAMILIAR,
    FamiliarVariant.CHARGED_BABY,
    -1,
    false,
    false,
  );
  for (const chargedBabyEntity of chargedBabies) {
    Isaac.Spawn(
      EntityType.PICKUP,
      PickupVariant.LIL_BATTERY,
      0,
      chargedBabyEntity.Position,
      ZERO_VECTOR,
      null,
    );
  }
}
