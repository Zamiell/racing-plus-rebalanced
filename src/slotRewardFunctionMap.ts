import { ZERO_VECTOR } from "./constants";
import g from "./globals";
import * as misc from "./misc";
import { SlotVariantCustom } from "./types/enums";

const slotRewardFunctionMap = new Map<int, (slot: Entity) => boolean>();
export default slotRewardFunctionMap;

// 13
slotRewardFunctionMap.set(
  SlotVariantCustom.TRANSMUTATION_MACHINE,
  (): boolean => {
    g.p.UseActiveItem(CollectibleType.D6, false, false, false, false);
    return true;
  },
);

// 14
slotRewardFunctionMap.set(SlotVariantCustom.BOMB_DONATION_MACHINE, spawn3Coins);

// 15
slotRewardFunctionMap.set(SlotVariantCustom.KEY_DONATION_MACHINE, spawn3Coins);

// 16
slotRewardFunctionMap.set(
  SlotVariantCustom.ROULETTE_TABLE,
  (slot: Entity): boolean => {
    g.run.rouletteTableRNG = misc.incrementRNG(g.run.rouletteTableRNG);
    math.randomseed(g.run.rouletteTableRNG);
    const success = math.random(1, 10);

    // 40%
    if (success <= 4) {
      for (let i = 0; i < 10; i++) {
        spawnCoin(slot);
      }

      return true;
    }

    g.p.AnimateSad();
    return false;
  },
);

// 17
slotRewardFunctionMap.set(
  SlotVariantCustom.HOLY_MACHINE,
  (slot: Entity): boolean => {
    // Spawn a heaven door (which will be replaced by Racing+ on the next frame)
    Isaac.Spawn(
      EntityType.EFFECT,
      EffectVariant.HEAVEN_LIGHT_DOOR,
      0,
      slot.Position,
      ZERO_VECTOR,
      slot,
    );

    // Break the machine so that it cannot be used again
    slot.GetSprite().Play("Death", true);

    return true;
  },
);

function spawnCoin(slot: Entity) {
  Isaac.Spawn(
    EntityType.PICKUP,
    PickupVariant.COIN,
    0,
    slot.Position,
    RandomVector().mul(3),
    slot,
  );
}

function spawn3Coins(slot: Entity) {
  for (let i = 0; i < 3; i++) {
    spawnCoin(slot);
  }

  return true;
}
