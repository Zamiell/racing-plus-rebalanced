import {
  BatterySubType,
  CollectibleType,
  FamiliarVariant,
} from "isaac-typescript-definitions";
import {
  getFamiliars,
  ModCallbackCustom,
  ModUpgraded,
  spawnBattery,
} from "isaacscript-common";
import g from "../globals";

export function init(mod: ModUpgraded): void {
  mod.AddCallbackCustom(
    ModCallbackCustom.POST_ROOM_CLEAR_CHANGED,
    roomClearChangedTrue,
    true,
  );
}

// true
function roomClearChangedTrue() {
  chargedBaby(); // 372
}

// CollectibleType.CHARGED_BABY (372)
function chargedBaby() {
  if (!g.p.HasCollectible(CollectibleType.CHARGED_BABY)) {
    return;
  }

  // Charged Baby should drop a battery every 4 rooms.
  g.run.chargedBabyCounters += 1;
  if (g.run.chargedBabyCounters !== 4) {
    return;
  }
  g.run.chargedBabyCounters = 0;

  const chargedBabies = getFamiliars(FamiliarVariant.CHARGED_BABY);
  for (const familiar of chargedBabies) {
    spawnBattery(BatterySubType.NULL, familiar.Position);
  }
}
