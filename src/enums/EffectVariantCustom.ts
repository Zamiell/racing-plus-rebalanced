import { EffectVariant } from "isaac-typescript-definitions";

export const EffectVariantCustom = {
  DICE_ROOM_FLOOR_CUSTOM: Isaac.GetEntityVariantByName(
    "Dice Room Floor (Custom)",
  ) as EffectVariant,
} as const;
