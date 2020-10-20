import g from "../globals";

// We do not want the Technology double laser buff to apply when the player has certain powerful
// items
const EXCEPTION_ITEMS = [
  CollectibleType.COLLECTIBLE_DR_FETUS, // 52
  CollectibleType.COLLECTIBLE_MOMS_KNIFE, // 114
  CollectibleType.COLLECTIBLE_BRIMSTONE, // 118
  CollectibleType.COLLECTIBLE_IPECAC, // 149
  CollectibleType.COLLECTIBLE_EPIC_FETUS, // 168
  CollectibleType.COLLECTIBLE_TINY_PLANET, // 233
  CollectibleType.COLLECTIBLE_TECH_X, // 395
];

export function postUpdate(): void {
  // Technology grants 2 lasers, but only if they do not have a powerful other item
  // Check to see if they got a powerful item after they have picked up Technology
  if (g.run.technologyAdded2020 && hasPowerfulItem()) {
    g.run.technologyAdded2020 = false;
    g.p.RemoveCollectible(CollectibleType.COLLECTIBLE_20_20); // 245
  }
}

function hasPowerfulItem(): boolean {
  for (const item of EXCEPTION_ITEMS) {
    if (g.p.HasCollectible(item)) {
      return true;
    }
  }

  return false;
}
