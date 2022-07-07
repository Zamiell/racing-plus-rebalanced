import { SlotVariant } from "isaac-typescript-definitions";

export const SlotVariantCustom = {
  TRANSMUTATION_MACHINE: Isaac.GetEntityVariantByName(
    "Transmutation Machine",
  ) as SlotVariant,
  BOMB_DONATION_MACHINE: Isaac.GetEntityVariantByName(
    "Bomb Donation Machine",
  ) as SlotVariant,
  KEY_DONATION_MACHINE: Isaac.GetEntityVariantByName(
    "Key Donation Machine",
  ) as SlotVariant,
  ROULETTE_TABLE: Isaac.GetEntityVariantByName("Roulette Table") as SlotVariant,
  HOLY_MACHINE: Isaac.GetEntityVariantByName("Holy Machine") as SlotVariant,
} as const;
