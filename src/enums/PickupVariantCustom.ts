import { PickupVariant } from "isaac-typescript-definitions";

export const PickupVariantCustom = {
  INVISIBLE_PICKUP: Isaac.GetEntityVariantByName(
    "Invisible Pickup",
  ) as PickupVariant,
} as const;
