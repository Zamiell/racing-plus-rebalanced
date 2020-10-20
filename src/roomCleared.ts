import g from "./globals";

export function main(): void {
  // If the room just got changed to a cleared state, perform some additional tasks
  chargedBaby(); // 372
}

// CollectibleType.COLLECTIBLE_CHARGED_BABY (372)
function chargedBaby() {
  if (!g.p.HasCollectible(CollectibleType.COLLECTIBLE_CHARGED_BABY)) {
    return;
  }

  // Charged Baby should drop a battery every 4 rooms
  g.run.chargedBabyCounters += 1;
  if (g.run.chargedBabyCounters !== 4) {
    return;
  }
  g.run.chargedBabyCounters = 0;

  const chargedBabies = Isaac.FindByType(
    EntityType.ENTITY_FAMILIAR, // 3
    FamiliarVariant.CHARGED_BABY, // 86
    -1,
    false,
    false,
  );
  for (const chargedBabyEntity of chargedBabies) {
    Isaac.Spawn(
      EntityType.ENTITY_PICKUP, // 5
      PickupVariant.PICKUP_LIL_BATTERY, // 90
      0,
      chargedBabyEntity.Position,
      g.zeroVector,
      null,
    );
  }
}
