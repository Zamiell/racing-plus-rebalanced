import g from "./globals";
import { SlotVariantCustom } from "./types/enums.custom";

const slotRewardTouchedMap = new Map<int, (slot: Entity) => void>();
export default slotRewardTouchedMap;

// 13
slotRewardTouchedMap.set(
  SlotVariantCustom.TRANSMUTATION_MACHINE,
  (slot: Entity) => {
    g.p.TakeDamage(1, DamageFlag.DAMAGE_RED_HEARTS, EntityRef(slot), 0);
    touchSuccess(slot.GetSprite());
  },
);

// 14
slotRewardTouchedMap.set(
  SlotVariantCustom.BOMB_DONATION_MACHINE,
  (slot: Entity) => {
    // Local variables
    const numBombs = g.p.GetNumBombs();
    const price = 1;

    // Don't do anything if we don't have enough bombs
    if (numBombs < price) {
      return;
    }

    g.p.AddBombs(-price);
    touchSuccess(slot.GetSprite());
  },
);

// 15
slotRewardTouchedMap.set(
  SlotVariantCustom.KEY_DONATION_MACHINE,
  (slot: Entity) => {
    // Local variables
    const numKeys = g.p.GetNumKeys();
    const price = 1;

    // Don't do anything if we don't have enough keys
    if (numKeys < price) {
      return;
    }

    g.p.AddKeys(-price);
    touchSuccess(slot.GetSprite());
  },
);

// 16
slotRewardTouchedMap.set(SlotVariantCustom.ROULETTE_TABLE, (slot: Entity) => {
  // Local variables
  const numCoins = g.p.GetNumCoins();
  const price = 5;

  // Don't do anything if we don't have enough coins
  if (numCoins < price) {
    return;
  }

  g.p.AddCoins(-price);
  touchSuccess(slot.GetSprite());
});

// 17
slotRewardTouchedMap.set(SlotVariantCustom.HOLY_MACHINE, (slot: Entity) => {
  // Local variables
  const numCoins = g.p.GetNumCoins();
  const price = 20;

  // Don't do anything if we don't have enough coins
  if (numCoins < price) {
    return;
  }

  g.p.AddCoins(-price);
  touchSuccess(slot.GetSprite());
});

function touchSuccess(sprite: Sprite) {
  g.sfx.Play(SoundEffect.SOUND_COIN_SLOT, 1, 0, false, 1);
  sprite.Play("Initiate", true);
}
